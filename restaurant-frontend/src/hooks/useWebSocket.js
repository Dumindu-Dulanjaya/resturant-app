import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { user } = useAuthStore();
  const socketRef = useRef(null);
  const retryTimeoutRef = useRef(null);
  const hasLoggedUnavailableRef = useRef(false);

  const clearRetryTimer = useCallback(() => {
    if (retryTimeoutRef.current) {
      window.clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, []);

  const disconnectSocket = useCallback(() => {
    clearRetryTimer();

    if (socketRef.current) {
      socketRef.current.removeAllListeners();
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    setSocket(null);
    setConnected(false);
  }, [clearRetryTimer]);

  useEffect(() => {
    if (!user) {
      hasLoggedUnavailableRef.current = false;
      disconnectSocket();
      return;
    }

    const API_URL = (() => {
      const envApiUrl = (
        process.env.REACT_APP_API_URL ||
        process.env.REACT_APP_API_BASE_URL ||
        'http://localhost:3000/api'
      ).trim();

      if (typeof window !== 'undefined') {
        const host = window.location.hostname;
        const isLocalFrontend = host === 'localhost' || host === '127.0.0.1';
        if (isLocalFrontend) {
          return 'http://localhost:3000';
        }
      }

      return envApiUrl.replace(/\/api\/?$/, '');
    })();

    let disposed = false;

    const scheduleReconnect = () => {
      if (disposed || retryTimeoutRef.current || socketRef.current) {
        return;
      }

      retryTimeoutRef.current = window.setTimeout(() => {
        retryTimeoutRef.current = null;
        void connectSocket();
      }, 10000);
    };

    const logUnavailableOnce = () => {
      if (hasLoggedUnavailableRef.current) {
        return;
      }

      console.warn(
        'Backend is unavailable on port 3000. WebSocket connection will retry automatically once the API is reachable.',
      );
      hasLoggedUnavailableRef.current = true;
    };

    const connectSocket = async () => {
      if (disposed || socketRef.current) {
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/health`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Health check failed with status ${response.status}`);
        }
      } catch (error) {
        setConnected(false);
        logUnavailableOnce();
        scheduleReconnect();
        return;
      }

      hasLoggedUnavailableRef.current = false;

      const newSocket = io(`${API_URL}/events`, {
        transports: ['websocket', 'polling'],
        reconnection: false,
        timeout: 10000,
        autoConnect: true,
      });

      socketRef.current = newSocket;
      setSocket(newSocket);

      newSocket.on('connect', () => {
        if (disposed) {
          return;
        }

        setConnected(true);
        newSocket.emit('authenticate', {
          userId: user.id,
          role: user.role,
        });
      });

      newSocket.on('disconnect', (reason) => {
        if (disposed) {
          return;
        }

        if (socketRef.current === newSocket) {
          socketRef.current = null;
          setSocket(null);
        }

        setConnected(false);

        if (reason !== 'io client disconnect') {
          scheduleReconnect();
        }
      });

      newSocket.on('connect_error', () => {
        if (disposed) {
          return;
        }

        if (socketRef.current === newSocket) {
          socketRef.current = null;
          setSocket(null);
        }

        setConnected(false);
        logUnavailableOnce();
        newSocket.disconnect();
        scheduleReconnect();
      });
    };

    void connectSocket();

    return () => {
      disposed = true;
      disconnectSocket();
    };
  }, [user, disconnectSocket]);

  const subscribe = useCallback((event, callback) => {
    if (socket) {
      socket.on(event, callback);
      return () => socket.off(event, callback);
    }
    return () => {};
  }, [socket]);

  const emit = useCallback((event, data) => {
    if (socket && connected) {
      socket.emit(event, data);
    }
  }, [socket, connected]);

  const value = {
    socket,
    connected,
    isConnected: connected,
    subscribe,
    emit,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
