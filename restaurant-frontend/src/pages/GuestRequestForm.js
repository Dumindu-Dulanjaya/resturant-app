import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './GuestRequestForm.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

function GuestRequestForm() {
  const { roomKey } = useParams();
  const [roomInfo, setRoomInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    requestType: 'CLEANING',
    message: ''
  });

  const fetchRoomInfo = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/qr/room/resolve/${roomKey}`);
      setRoomInfo(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching room info:', error);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Invalid QR Code',
        text: 'This QR code is not valid or has expired.',
        confirmButtonColor: '#6366f1'
      });
    }
  }, [roomKey]);

  useEffect(() => {
    fetchRoomInfo();
  }, [fetchRoomInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const requestUrl = `${API_BASE_URL}/housekeeping/request`;
    console.log('Submitting request to:', requestUrl);
    console.log('Room Key:', roomKey);
    console.log('Form Data:', formData);

    try {
      const response = await axios.post(
        requestUrl,
        formData,
        {
          headers: {
            'x-room-key': roomKey,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Response:', response);

      Swal.fire({
        icon: 'success',
        title: 'Request Submitted!',
        text: 'Your housekeeping request has been sent. Our staff will attend to it shortly.',
        confirmButtonColor: '#10b981'
      });

      // Reset form
      setFormData({
        requestType: 'CLEANING',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting request:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      console.error('API Base URL:', API_BASE_URL);
      
      let errorMessage = 'Failed to submit request. Please try again.';
      if (error.response?.status === 429) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: errorMessage,
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="guest-request-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!roomInfo) {
    return (
      <div className="guest-request-container">
        <div className="error-card">
          <i className="fas fa-exclamation-circle"></i>
          <h2>Invalid QR Code</h2>
          <p>This QR code is not valid or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="guest-request-container">
      <div className="guest-request-card">
        {/* Header */}
        <div className="request-header">
          <div className="header-icon">
            <i className="fas fa-concierge-bell"></i>
          </div>
          <h1>Room Service Request</h1>
          <p className="room-number">{roomInfo.roomNo}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="request-form">
          {/* Request Type */}
          <div className="form-group">
            <label htmlFor="requestType">
              <i className="fas fa-list"></i>
              Request Type
            </label>
            <select
              id="requestType"
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="CLEANING">🧹 Room Cleaning</option>
              <option value="TOWELS">🛁 Fresh Towels</option>
              <option value="WATER">💧 Water Bottles</option>
              <option value="OTHER">📋 Other Service</option>
            </select>
          </div>

          {/* Message */}
          <div className="form-group">
            <label htmlFor="message">
              <i className="fas fa-comment-alt"></i>
              Additional Details (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="form-control"
              placeholder="Any special requests or additional information..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="btn-spinner"></span>
                Submitting...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                Submit Request
              </>
            )}
          </button>
        </form>

        {/* Footer Info */}
        <div className="request-footer">
          <p>
            <i className="fas fa-info-circle"></i>
            Our staff will respond to your request as soon as possible
          </p>
        </div>
      </div>
    </div>
  );
}

export default GuestRequestForm;
