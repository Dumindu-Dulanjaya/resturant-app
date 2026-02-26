# Old-System Style QR Ordering Implementation

## ✅ Implementation Complete

Successfully implemented the **old-system style QR ordering** where each table has its own unique QR code.

---

## 🎯 Key Features

✅ **One QR per Table** - Each table has unique QR code  
✅ **Auto Table Detection** - Table number auto-filled from QR  
✅ **Restaurant Auto-Resolved** - No manual selection needed  
✅ **Secure** - Cannot guess/spoof table or restaurant ID  
✅ **Direct to Kitchen** - Orders go straight to KDS  
✅ **Can Disable** - Set `is_active=0` to disable QR  

---

## 📊 Database Structure

### Table: `table_qr_tbl`

| Field | Type | Description |
|-------|------|-------------|
| `table_qr_id` | INT (PK) | Primary key |
| `restaurant_id` | INT (FK) | Restaurant reference |
| `table_no` | VARCHAR(50) | Table number (e.g., "T-1") |
| `table_key` | VARCHAR(64) | Unique key (64 chars) |
| `is_active` | TINYINT(1) | Active status (1=active, 0=disabled) |
| `created_at` | TIMESTAMP | Creation timestamp |

**Indexes:**
- `idx_table_key` - Fast lookup by table key
- `idx_restaurant_tables` - Fast lookup by restaurant
- `unique_restaurant_table` - One QR per table per restaurant

---

## 🔄 Data Flow

```
1. Customer scans QR at table
   ↓
2. QR contains: /qr/{table_key}
   ↓
3. Frontend calls: GET /api/qr/resolve/{table_key}
   ↓
4. Backend returns: {restaurantId, restaurantName, tableNo}
   ↓
5. Frontend displays: Restaurant name + Table number
   ↓
6. Customer browses menu & adds items
   ↓
7. Customer places order
   ↓
8. Frontend sends: POST /api/orders with header x-table-key
   ↓
9. Backend resolves: table_key → restaurantId + tableNo
   ↓
10. Order created with resolved data
    ↓
11. Order appears in Kitchen KDS
```

---

## 🚀 Backend Implementation

### Files Created:

1. **Migration**: `restaurant-backend-nestjs/migrations/create-table-qr.sql`
   - Creates `table_qr_tbl` with indexes and constraints

2. **Entity**: `src/table-qr/entities/table-qr.entity.ts`
   - TypeORM entity mapping for table_qr_tbl

3. **Service**: `src/table-qr/table-qr.service.ts`
   - `findByTableKey()` - Find table by key
   - `resolveTableInfo()` - Get restaurant + table info
   - `create()` - Create new table QR
   - `deactivate()` / `activate()` - Enable/disable QR

4. **Controller**: `src/table-qr/table-qr.controller.ts`
   - `GET /api/qr/resolve/:tableKey` - Public endpoint to resolve QR

5. **Module**: `src/table-qr/table-qr.module.ts`
   - NestJS module configuration

6. **Guard**: `src/common/guards/table-key.guard.ts`
   - Validates x-table-key header
   - Resolves restaurantId and tableNo
   - Attaches to request object

7. **Updated**: `src/orders/orders.controller.ts`
   - Changed from `@UseGuards(ApiKeyGuard)` to `@UseGuards(TableKeyGuard)`
   - Table number now comes from QR (more secure)
   - Customer cannot modify table number

8. **Updated**: `src/app.module.ts`
   - Added `TableQrModule` to imports

9. **Updated**: `src/orders/orders.module.ts`
   - Added `TableQrModule` to imports

10. **Setup Script**: `scripts/setup-table-qr.js`
    - Runs migration
    - Generates 5 tables per restaurant
    - Creates unique 64-char keys
    - Displays test URLs

---

## 🎨 Frontend Implementation

### Files Created:

1. **Component**: `src/pages/CustomerQROrder.js`
   - Resolves table key on load
   - Displays restaurant name + table number
   - Shows full menu for that restaurant
   - Shopping cart with qty controls
   - Places order with x-table-key header

2. **Styles**: `src/pages/CustomerQROrder.css`
   - Purple gradient background
   - Table badge in header
   - Responsive design
   - Success screen

3. **Updated**: `src/App.js`
   - Changed route from `/qr/:apiKey` to `/qr/:tableKey`
   - Uses `CustomerQROrder` component

---

## 🧪 Test Data Generated

### Restaurant 1: SeaSpray Café

| Table | Table Key | Test URL |
|-------|-----------|----------|
| T-1 | `9ef1760341f428a417b453ed4e376d2ab932dcfb0932d2fdcd3d53ad0773359a` | http://localhost:3001/qr/9ef1760... |
| T-2 | `36a80a20b993118587cb82b3d61cec26896d6b8ac201f19f30e628d9fc969bb2` | http://localhost:3001/qr/36a80a2... |
| T-3 | `0638e494b224f0efc55ada3a5912615802151518f7bab22d2da8d97cfaa803f3` | http://localhost:3001/qr/0638e49... |
| T-4 | `8d08e9e8676780aba8d12f86efdc3a5eaeb2611a9a5dafdc61a1f94a9c60967b` | http://localhost:3001/qr/8d08e9e... |
| T-5 | `0a2335aa8de7b33a439a2f6928593904fb2e0f566f505892a4d2f4d311acbea3` | http://localhost:3001/qr/0a2335a... |

**Total Generated:** 20 table QR codes (5 per restaurant × 4 restaurants)

---

## 📝 API Documentation

### 1. Resolve Table QR (Public)

**Endpoint:** `GET /api/qr/resolve/:tableKey`

**Description:** Resolves table key to restaurant and table info

**Request:**
```
GET /api/qr/resolve/9ef1760341f428a417b453ed4e376d2ab932dcfb0932d2fdcd3d53ad0773359a
```

**Response (200 OK):**
```json
{
  "restaurantId": 1,
  "restaurantName": "SeaSpray Café",
  "tableNo": "T-1"
}
```

**Response (404 Not Found):**
```json
{
  "statusCode": 404,
  "message": "Invalid or inactive QR code"
}
```

---

### 2. Create Order with Table Key (Public)

**Endpoint:** `POST /api/orders`

**Description:** Creates order using table key authentication

**Headers:**
```
x-table-key: 9ef1760341f428a417b453ed4e376d2ab932dcfb0932d2fdcd3d53ad0773359a
Content-Type: application/json
```

**Request Body:**
```json
{
  "notes": "Please bring extra napkins",
  "items": [
    {
      "foodItemId": 1,
      "qty": 2,
      "notes": "No onions"
    },
    {
      "foodItemId": 3,
      "qty": 1,
      "notes": null
    }
  ]
}
```

**Note:** 
- ❌ NO `restaurantId` in body (auto-resolved from table key)
- ❌ NO `tableNo` in body (auto-resolved from table key)
- ✅ Only `notes` and `items` required

**Response (201 Created):**
```json
{
  "orderId": 54,
  "orderNo": "ORD-1772015423789",
  "restaurantId": 1,
  "tableNo": "T-1",
  "status": "NEW",
  "totalAmount": "45.50",
  "notes": "Please bring extra napkins",
  "items": [...]
}
```

**Response (401 Unauthorized):**
```json
{
  "statusCode": 401,
  "message": "Invalid or inactive table QR code"
}
```

---

## 🔐 Security

### What's Protected:

✅ **Table Key Required** - Cannot create orders without valid table key  
✅ **Restaurant ID Auto-Resolved** - Cannot spoof restaurant ID  
✅ **Table Number Auto-Resolved** - Cannot spoof table number  
✅ **Active Check** - Only active QRs work (is_active=1)  
✅ **Rate Limiting** - 10 POST requests per 60 seconds per IP  

### What Customers Can Do:

✅ Browse menu (public data)  
✅ Create orders for their table (via QR key)  

### What Customers CANNOT Do:

❌ Access admin features  
❌ View/modify other orders  
❌ Order for other tables  
❌ Change table number  
❌ Change restaurant  

---

## 🧪 Testing

### Option 1: Run Test Script

```bash
cd restaurant-backend-nestjs
node scripts/setup-table-qr.js
```

This will:
1. Create table_qr_tbl
2. Generate table keys
3. Display test URLs

### Option 2: Manual Testing

1. **Start Backend:**
   ```bash
   cd restaurant-backend-nestjs
   npm run start:dev
   ```

2. **Start Frontend:**
   ```bash
   cd restaurant-frontend
   npm start
   ```

3. **Test QR Flow:**
   - Open: `http://localhost:3001/qr/9ef1760341f428a417b453ed4e376d2ab932dcfb0932d2fdcd3d53ad0773359a`
   - Should see: Restaurant name + Table number
   - Browse menu and add items
   - Place order
   - Check Kitchen KDS

### Option 3: API Testing (Postman/curl)

**Test 1: Resolve Table QR**
```bash
curl http://localhost:3000/api/qr/resolve/9ef1760341f428a417b453ed4e376d2ab932dcfb0932d2fdcd3d53ad0773359a
```

**Test 2: Create Order**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "x-table-key: 9ef1760341f428a417b453ed4e376d2ab932dcfb0932d2fdcd3d53ad0773359a" \
  -H "Content-Type: application/json" \
  -d '{
    "notes": "Test order",
    "items": [
      {"foodItemId": 1, "qty": 2, "notes": null}
    ]
  }'
```

---

## 📱 QR Code Generation (Production)

### Step 1: Install QR Code Library

```bash
npm install qrcode
```

### Step 2: Generate QR Codes

```javascript
const QRCode = require('qrcode');

async function generateTableQR(tableKey, tableNo) {
  const url = `https://order.yourdomain.com/qr/${tableKey}`;
  
  // Generate QR as Data URL (for web)
  const qrDataURL = await QRCode.toDataURL(url, {
    width: 300,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  });
  
  // Or generate as file
  await QRCode.toFile(`./qr-codes/table-${tableNo}.png`, url, {
    width: 500
  });
  
  return qrDataURL;
}
```

### Step 3: Print QR Codes

1. Generate QR images for all tables
2. Print on waterproof paper
3. Laminate for durability
4. Place on tables with instructions

**QR Code Design:**
```
┌─────────────────────┐
│   [Restaurant Logo]  │
│                      │
│   ████████████████   │
│   ████████████████   │
│   ████████████████   │
│   [QR Code Here]     │
│   ████████████████   │
│   ████████████████   │
│   ████████████████   │
│                      │
│   Scan to Order      │
│   Table: T-5         │
└─────────────────────┘
```

---

## 🔧 Database Management

### View All Table QRs

```sql
SELECT tq.*, r.restaurant_name 
FROM table_qr_tbl tq
JOIN restaurant_tbl r ON tq.restaurant_id = r.restaurant_id
WHERE tq.is_active = 1
ORDER BY r.restaurant_name, tq.table_no;
```

### Add New Table QR

```sql
INSERT INTO table_qr_tbl (restaurant_id, table_no, table_key, is_active)
VALUES (1, 'T-6', 'NEW_64_CHAR_KEY_HERE', 1);
```

### Disable Table QR

```sql
UPDATE table_qr_tbl 
SET is_active = 0 
WHERE table_qr_id = 1;
```

### Enable Table QR

```sql
UPDATE table_qr_tbl 
SET is_active = 1 
WHERE table_qr_id = 1;
```

### Regenerate Table Key (if compromised)

```javascript
const crypto = require('crypto');
const newKey = crypto.randomBytes(32).toString('hex');

// Update in database
UPDATE table_qr_tbl 
SET table_key = 'NEW_KEY_HERE' 
WHERE table_qr_id = 1;
```

---

## 📊 Comparison: Old vs New System

### Old System (Restaurant-Level API Keys):

- ❌ One key per restaurant
- ❌ Customer must select table number
- ❌ Table number can be spoofed
- ✅ Fewer QR codes to manage

### New System (Table-Level Keys):

- ✅ One key per table
- ✅ Table auto-detected from QR
- ✅ Table number cannot be changed
- ✅ More secure (table-level isolation)
- ✅ Can disable specific tables
- ⚠️  More QR codes to manage

---

## 🚀 Production Deployment

### 1. Environment Variables

```env
# Backend (.env)
DB_HOST=your-database-host
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password
DB_DATABASE=hotel_db
```

### 2. Frontend URL Update

```env
# Frontend (.env)
REACT_APP_API_URL=https://api.yourdomain.com/api
```

### 3. QR Code URLs

Update script to generate production URLs:
```javascript
const url = `https://order.yourdomain.com/qr/${tableKey}`;
```

### 4. CORS Configuration

```typescript
// Backend main.ts
app.enableCors({
  origin: ['https://order.yourdomain.com'],
  credentials: true,
});
```

### 5. Generate All QR Codes

```bash
node scripts/generate-all-qr-codes.js
```

---

## ✅ Implementation Checklist

- [x] Create table_qr_tbl migration
- [x] Create TableQr entity
- [x] Create TableQrService
- [x] Create TableQrController with resolve endpoint
- [x] Create TableQrModule
- [x] Create TableKeyGuard
- [x] Update OrdersController to use TableKeyGuard
- [x] Update OrdersModule imports
- [x] Update AppModule imports
- [x] Create CustomerQROrder.js frontend page
- [x] Create CustomerQROrder.css styles
- [x] Update App.js route to /qr/:tableKey
- [x] Create setup-table-qr.js script
- [x] Generate test data (20 tables)
- [x] Test resolve endpoint
- [ ] Test order creation with table key
- [ ] Generate production QR codes
- [ ] Print and deploy QR codes

---

## 🎉 Summary

The **old-system style QR ordering** is now fully implemented and ready for testing!

**Key Advantages:**
1. More secure (table-level keys)
2. Cannot spoof table number
3. Auto-filled restaurant + table info
4. Can disable individual tables
5. Better for analytics (per-table tracking)

**Next Steps:**
1. Test the QR flow end-to-end
2. Generate production QR codes
3. Print and laminate QR codes
4. Deploy to production
5. Train staff on QR system

**Questions/Issues:**
- Frontend: Open browser with test URL
- Backend: Check logs for errors
- Database: Verify tables created correctly
- QR Generation: Use provided script for production

🚀 **Ready to test!** Open one of the test URLs and place an order!
