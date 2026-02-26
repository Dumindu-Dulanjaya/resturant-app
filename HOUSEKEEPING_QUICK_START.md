# Housekeeping Module - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Run Database Migration (1 min)

```bash
# Open MySQL
mysql -u root -p

# Paste this SQL:
USE restaurant_db;

CREATE TABLE IF NOT EXISTS room_qr_tbl (
  room_qr_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  restaurant_id INT UNSIGNED NOT NULL,
  room_no VARCHAR(50) NOT NULL,
  room_key VARCHAR(64) NOT NULL UNIQUE,
  qr_url TEXT,
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_restaurant_id (restaurant_id),
  INDEX idx_room_key (room_key),
  CONSTRAINT fk_room_qr_restaurant FOREIGN KEY (restaurant_id) 
    REFERENCES restaurant_tbl(restaurant_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS housekeeping_requests_tbl (
  request_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  restaurant_id INT UNSIGNED NOT NULL,
  room_no VARCHAR(50) NOT NULL,
  request_type ENUM('CLEANING', 'TOWELS', 'WATER', 'OTHER') DEFAULT 'CLEANING',
  message TEXT,
  status ENUM('NEW', 'IN_PROGRESS', 'DONE', 'CANCELLED') DEFAULT 'NEW',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_restaurant_id (restaurant_id),
  INDEX idx_status (status),
  CONSTRAINT fk_housekeeping_restaurant FOREIGN KEY (restaurant_id) 
    REFERENCES restaurant_tbl(restaurant_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

# Verify
DESCRIBE room_qr_tbl;
DESCRIBE housekeeping_requests_tbl;
```

### Step 2: Restart Backend (if not running)

```bash
cd restaurant-backend-nestjs
npm run start:dev
```

**Look for these routes in logs:**
```
[Nest] Mapped {/room-qr, GET} route
[Nest] Mapped {/room-qr, POST} route
[Nest] Mapped {/room-qr/bulk, POST} route
[Nest] Mapped {/housekeeping/request, POST} route
[Nest] Mapped {/housekeeping/requests, GET} route
```

### Step 3: Frontend (Auto-Compiles)

```bash
# If needed:
cd restaurant-frontend
npm install qrcode.react
npm start
```

---

## 🧪 Quick Test Flow (3 minutes)

### Test 1: Enable Feature (30 seconds)

1. Login: http://localhost:3001/login (as Admin)
2. Go to: **Settings → Restaurant Settings**
3. Toggle **"Housekeeping Module"** to **ON**
4. Click **Save Settings**
5. ✅ Sidebar now shows "Room Service"

### Test 2: Generate QR Codes (1 minute)

1. Click: **Room Service → Generate Room QR Codes**
2. In "Bulk Room QR Codes" card:
   - Enter: `10`
   - Click **"Generate QR Codes"**
3. ✅ Success message: "10 room QR code(s) generated successfully"
4. ✅ Preview grid shows Room 1, Room 2, ..., Room 10

### Test 3: View QR Codes (30 seconds)

1. Click: **Room Service → All Room QR codes**
2. ✅ See grid of 10 QR cards
3. Hover over a card (smooth lift animation)
4. Click **Download** on any card
5. ✅ QR code PNG downloads

### Test 4: Submit Request as Guest (1 minute)

```bash
# Get a room key from database
mysql -u root -p -e "SELECT room_key FROM restaurant_db.room_qr_tbl LIMIT 1"

# Copy the room_key value, then run:
curl -X POST http://localhost:3000/api/housekeeping/request \
  -H "Content-Type: application/json" \
  -H "x-room-key: PASTE_ROOM_KEY_HERE" \
  -d '{
    "requestType": "CLEANING",
    "message": "Please clean the bathroom"
  }'
```

**Expected:**
```json
{
  "success": true,
  "message": "Housekeeping request submitted successfully"
}
```

### Test 5: Manage Requests (1 minute)

1. Click: **Room Service → Messages**
2. ✅ See the request in table (NEW status)
3. Click **Play icon** → Status: IN_PROGRESS
4. Click **Check icon** → Status: DONE
5. Enable **"Auto Refresh"** toggle
6. ✅ Page refreshes every 10 seconds

---

## 📊 Test Data Generator

### Create 50 Rooms + 20 Requests

```sql
-- Already have 10 rooms from Quick Test
-- This adds 40 more (total 50)

-- Get your restaurant_id
SELECT restaurant_id FROM restaurant_tbl LIMIT 1;

-- Generate sample requests (replace 1 with your restaurant_id)
INSERT INTO housekeeping_requests_tbl (restaurant_id, room_no, request_type, message, status)
VALUES
(1, 'Room 1', 'CLEANING', 'Need fresh towels', 'NEW'),
(1, 'Room 3', 'WATER', 'Need water bottles', 'NEW'),
(1, 'Room 5', 'TOWELS', 'Extra towels please', 'IN_PROGRESS'),
(1, 'Room 7', 'OTHER', 'AC not working', 'NEW'),
(1, 'Room 2', 'CLEANING', 'Daily cleaning', 'DONE'),
(1, 'Room 4', 'WATER', 'Room service', 'CANCELLED'),
(1, 'Room 6', 'CLEANING', 'Cleanup needed', 'NEW'),
(1, 'Room 8', 'TOWELS', 'Towel replacement', 'IN_PROGRESS'),
(1, 'Room 9', 'OTHER', 'Light bulb out', 'NEW'),
(1, 'Room 10', 'CLEANING', 'Deep clean please', 'NEW');

-- Verify
SELECT * FROM housekeeping_requests_tbl;
```

---

## 🎯 Feature Checklist

After setup, you should be able to:

**Admin Features:**
- ✅ Generate single room QR code (custom name)
- ✅ Generate bulk room QR codes (1-500)
- ✅ View all room QR codes in grid
- ✅ Search room QR codes by room number
- ✅ Download QR codes as PNG
- ✅ Delete individual QR codes
- ✅ Delete all QR codes (with confirmation)
- ✅ View all housekeeping requests
- ✅ Filter by status (NEW, IN_PROGRESS, DONE, CANCELLED)
- ✅ Filter by room number
- ✅ Filter by request type
- ✅ Mark request as In Progress
- ✅ Mark request as Done
- ✅ Cancel request
- ✅ Delete request
- ✅ Auto-refresh requests every 10 seconds

**Guest Features (Public API):**
- ✅ Submit housekeeping request via QR code
- ✅ Resolve room info from QR key

**Security Features:**
- ✅ Feature flag enforcement (frontend + backend)
- ✅ JWT authentication
- ✅ Restaurant isolation
- ✅ Rate limiting (10 requests / 60s on public endpoint)

---

## 🎨 UI Features to Test

### Animations
- ✅ Header cards fade in
- ✅ Filter cards slide in
- ✅ Table rows slide in from left (with stagger)
- ✅ QR cards slide up (with delay)
- ✅ Hover lift on cards
- ✅ Button hover effects

### Responsive Design
- ✅ Open on mobile (Chrome DevTools → Toggle Device)
- ✅ Grid adapts: 1 col → 2 cols → 3+ cols
- ✅ Table scrolls horizontally on mobile
- ✅ Filters stack vertically

### Empty States
- ✅ No requests: Shows inbox icon + message
- ✅ No QR codes: Shows QR icon + CTA button
- ✅ No search results: Shows "Try adjusting filters"

### Loading States
- ✅ Spinner on page load
- ✅ Button loading states (spinner + disabled)
- ✅ Auto-refresh spinner

---

## 🐛 Troubleshooting

### "Feature Disabled" Error
**Fix:** Enable housekeeping module:
```sql
UPDATE restaurant_tbl SET enable_housekeeping = 1 WHERE restaurant_id = 1;
```
Then logout and login.

### Routes Not Found (404)
**Fix:** Clear browser cache or hard refresh:
- Chrome: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

### QR Codes Not Showing
**Fix:** Check if generated:
```sql
SELECT COUNT(*) FROM room_qr_tbl;
```
If 0, generate via UI or API.

### Requests Not Appearing
**Fix:** Check status filter. Click "Clear Filters" button.

### Backend Not Starting
**Fix:**
```bash
cd restaurant-backend-nestjs
rm -rf dist
rm -rf node_modules
npm install
npm run start:dev
```

### Frontend Compile Error
**Fix:**
```bash
cd restaurant-frontend
npm install qrcode.react
rm -rf node_modules
npm install
npm start
```

---

## 📸 Screenshot Checklist

Take screenshots of:
1. ✅ Room Service menu in sidebar
2. ✅ Generate Room QR Codes page (3 cards)
3. ✅ Generated QR preview grid
4. ✅ All Room QR codes grid view
5. ✅ Housekeeping Messages page
6. ✅ Request filters in action
7. ✅ Mobile responsive view
8. ✅ Feature Disabled error page

---

## 🔗 Quick Links

- **Login:** http://localhost:3001/login
- **Messages:** http://localhost:3001/housekeeping/messages
- **All QR Codes:** http://localhost:3001/housekeeping/room-qr
- **Generate QR:** http://localhost:3001/housekeeping/room-qr/generate
- **Settings:** http://localhost:3001/settings/restaurant

**Backend API:**
- **Swagger (if enabled):** http://localhost:3000/api
- **Health Check:** http://localhost:3000

---

## ✅ Success Criteria

You're done when:
- ✅ Database tables created
- ✅ Backend compiles (no errors in terminal)
- ✅ Frontend compiles (no errors in browser console)
- ✅ Room Service menu appears in sidebar
- ✅ Can generate QR codes
- ✅ Can view QR codes in grid
- ✅ Can submit request via API
- ✅ Can manage requests in Messages page
- ✅ Feature flag works (toggle ON/OFF)

---

**Total Setup Time: ~5 minutes**
**Total Test Time: ~3 minutes**

🎉 **Enjoy your new Housekeeping Module!**
