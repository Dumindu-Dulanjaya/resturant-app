# Quick Reference - Old-System QR Ordering

## 🔑 Key Concept

**One QR code per table** (not per restaurant)

Each table has unique 64-character key → Customer scans → Table + Restaurant auto-detected

---

## 🔗 Test URLs

### SeaSpray Café - Table T-1
```
http://localhost:3001/qr/9ef1760341f428a417b453ed4e376d2ab932dcfb0932d2fdcd3d53ad0773359a
```

### SeaSpray Café - Table T-2
```
http://localhost:3001/qr/36a80a20b993118587cb82b3d61cec26896d6b8ac201f19f30e628d9fc969bb2
```

### Test Restaurant - Table T-1
```
http://localhost:3001/qr/07dfb64441b783978142b53e0a8c4cf1236aca58221b09c31f6db3d793573ceb
```

---

## 📊 Architecture

### Backend Flow:
```
POST /api/orders
  ↓
Header: x-table-key
  ↓
TableKeyGuard validates key
  ↓
Resolves: restaurantId + tableNo
  ↓
Order created with resolved data
```

### Frontend Flow:
```
/qr/{tableKey}
  ↓
GET /api/qr/resolve/{tableKey}
  ↓
Display: Restaurant Name + Table Number
  ↓
Customer orders
  ↓
POST /api/orders with x-table-key header
```

---

## 🗂️ Files Created

### Backend:
- `migrations/create-table-qr.sql` - Database schema
- `src/table-qr/entities/table-qr.entity.ts` - Entity
- `src/table-qr/table-qr.service.ts` - Business logic
- `src/table-qr/table-qr.controller.ts` - API endpoint
- `src/table-qr/table-qr.module.ts` - Module
- `src/common/guards/table-key.guard.ts` - Authentication
- `scripts/setup-table-qr.js` - Setup script

### Frontend:
- `src/pages/CustomerQROrder.js` - Main component
- `src/pages/CustomerQROrder.css` - Styles

### Updated:
- `src/app.module.ts` - Added TableQrModule
- `src/orders/orders.module.ts` - Added TableQrModule
- `src/orders/orders.controller.ts` - Use TableKeyGuard
- `src/App.js` - Route /qr/:tableKey

---

## 🧪 Testing

### Quick Test:
```bash
.\test-old-system-qr.ps1
```

### Manual Test:
1. Start backend: `cd restaurant-backend-nestjs && npm run start:dev`
2. Start frontend: `cd restaurant-frontend && npm start`
3. Open: http://localhost:3001/qr/9ef1760...
4. Should see: Restaurant name + Table badge
5. Order → Check Kitchen KDS

---

## 🔐 Security

| Feature | Old (API Key) | New (Table QR) |
|---------|---------------|----------------|
| Key Level | Restaurant | Table |
| Table Input | Customer enters | Auto from QR |
| Can Spoof Table | ✅ Yes | ❌ No |
| Disable Specific Table | ❌ No | ✅ Yes |
| Security Level | Medium | High |

---

## 📝 API Reference

### Resolve QR (Public)
```http
GET /api/qr/resolve/:tableKey
```

**Response:**
```json
{
  "restaurantId": 1,
  "restaurantName": "SeaSpray Café",
  "tableNo": "T-1"
}
```

---

### Create Order (Public)
```http
POST /api/orders
Headers:
  x-table-key: {table_key}
  Content-Type: application/json

Body:
{
  "notes": "Optional notes",
  "items": [
    {"foodItemId": 1, "qty": 2, "notes": "No onions"}
  ]
}
```

**Note:** NO `restaurantId` or `tableNo` in body!

---

## 🗄️ Database

### Check All Tables:
```sql
SELECT tq.*, r.restaurant_name 
FROM table_qr_tbl tq
JOIN restaurant_tbl r ON tq.restaurant_id = r.restaurant_id
WHERE tq.is_active = 1;
```

### Add New Table:
```bash
node scripts/setup-table-qr.js
```

### Disable Table:
```sql
UPDATE table_qr_tbl SET is_active = 0 WHERE table_qr_id = 1;
```

---

## ✅ Checklist

- [x] Database table created
- [x] 20 test tables generated (5 per restaurant)
- [x] Backend endpoints working
- [x] Frontend page created
- [x] Route updated
- [x] Test script created
- [ ] Test order placement
- [ ] Generate production QR codes

---

## 🚀 Production

### Generate QR Codes:
```bash
npm install qrcode
node scripts/generate-production-qr-codes.js
```

### Print QR Codes:
1. Export as PNG (300x300px)
2. Print on waterproof paper
3. Laminate
4. Place on tables

### QR Contains:
```
https://order.yourdomain.com/qr/{table_key}
```

---

## 🎉 Summary

✅ **Implementation Complete**
- One QR per table
- Table auto-detected from QR
- Cannot spoof table number
- More secure than API key system
- Ready for testing!

**Test Now:** http://localhost:3001/qr/9ef1760341f428a417b453ed4e376d2ab932dcfb0932d2fdcd3d53ad0773359a
