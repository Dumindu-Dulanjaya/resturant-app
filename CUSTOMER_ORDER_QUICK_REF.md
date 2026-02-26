# Quick Reference - Customer Order Page

## 🔗 Test URLs (localhost)

**Restaurant 1:**  
`http://localhost:3001/qr/9ef2e7e841f5e41dcad95882f5d4ca78bf8d70f7800ef220732d641e7fddef55`

**Restaurant 6:**  
`http://localhost:3001/qr/091b58747d84736476a0d7c7ec9cd556c6ffda5b4c7faa7ff25765b8d27eb2a7`

**Restaurant 8:**  
`http://localhost:3001/qr/4d0e4aa02daa2ae296bc1359a54b97d4b37ec2d2b3dc104ff5cb25069e064a23`

**Restaurant 9:**  
`http://localhost:3001/qr/a1cdd1c028d4de6404862fc3e32b8ee592d339dbb3f9768577644cdd671077ec`

---

## 📋 Testing Checklist

- [ ] Frontend running on port 3001
- [ ] Backend running on port 3000
- [ ] Open test URL in browser
- [ ] Menu loads successfully
- [ ] Categories filter works
- [ ] Add items to cart
- [ ] Cart drawer opens
- [ ] Quantity controls work
- [ ] Table number input works
- [ ] Place order succeeds
- [ ] Success screen shows
- [ ] Order appears in KDS

---

## 🎯 User Flow

```
1. Customer scans QR code
   ↓
2. Opens: /qr/{apiKey}
   ↓
3. Browses menu (no login)
   ↓
4. Adds items to cart
   ↓
5. Enters table number
   ↓
6. Places order
   ↓
7. Backend validates API key
   ↓
8. Order created (status: NEW)
   ↓
9. Success screen shown
   ↓
10. Order appears in Kitchen KDS
```

---

## 🛠️ Files Modified/Created

### Created:
- ✅ `src/pages/CustomerOrder.js` (367 lines)
- ✅ `src/pages/CustomerOrder.css` (500+ lines)
- ✅ `QR_ORDER_FLOW.md` (documentation)
- ✅ `test-qr-order.ps1` (test script)
- ✅ `CUSTOMER_ORDER_IMPLEMENTATION.md` (summary)

### Modified:
- ✅ `src/App.js` (added route)

---

## 🔑 API Key Usage

### In URL Parameter:
```
/qr/9ef2e7e841f5e41dcad95882f5d4ca78bf8d70f7800ef220732d641e7fddef55
```

### In POST Request Header:
```javascript
headers: {
  'x-api-key': '9ef2e7e841f5e41dcad95882f5d4ca78bf8d70f7800ef220732d641e7fddef55'
}
```

### Backend Resolves:
```
API Key → Restaurant ID → Order created with correct restaurant
```

---

## ✅ Features

| Feature | Status |
|---------|--------|
| Public access (no login) | ✅ |
| Menu browsing | ✅ |
| Category filtering | ✅ |
| Shopping cart | ✅ |
| Quantity controls | ✅ |
| Item notes | ✅ |
| Order notes | ✅ |
| Table number | ✅ |
| API key auth | ✅ |
| Success screen | ✅ |
| Mobile responsive | ✅ |
| Error handling | ✅ |

---

## 🐛 Troubleshooting

### Issue: Menu not loading
**Solution:** Check backend is running, verify API endpoints

### Issue: Order fails with 401
**Solution:** Check API key is valid in database

### Issue: Order fails with 429
**Solution:** Rate limit hit (10 req/60s), wait 1 minute

### Issue: Items not showing
**Solution:** Check food items exist in database with proper categoryId

### Issue: Cart not opening
**Solution:** Check browser console for errors, verify CSS loaded

---

## 🚀 Quick Start

```bash
# Terminal 1: Start Backend
cd restaurant-backend-nestjs
npm run start:dev

# Terminal 2: Start Frontend
cd restaurant-frontend
npm start

# Terminal 3: Run Test
.\test-qr-order.ps1
```

---

## 📊 Order Payload Example

```json
{
  "tableNo": "T-5",
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

**Note:** `restaurantId` is NOT in the payload - it's resolved from the API key!

---

## 🎨 UI Components

### Header
- Logo/Title: "Menu"
- Cart Button: Shows item count

### Categories Sidebar (Left)
- "All Items" button
- Category buttons (from database)
- Active state highlights

### Food Items Grid (Main)
- Item image (if available)
- Item name
- Description (2 lines max)
- Price
- "Add" button

### Cart Drawer (Right)
- Cart items list
- Quantity controls (+/-)
- Item notes input
- Remove button
- Table number input (required)
- Order notes textarea (optional)
- Total display
- "Place Order" button

### Success Screen
- Green checkmark icon
- "Order Placed Successfully!" header
- Order number (large)
- Table number
- Status badge
- Total amount
- "Place Another Order" button

---

## 🔐 Security Notes

✅ **What's Secure:**
- API key required for orders
- Restaurant ID cannot be spoofed
- Rate limiting prevents abuse
- Backend validation on all inputs

⚠️ **Public by Design:**
- Menu data is public (no auth needed)
- API key is in URL (intentional for QR codes)
- Anyone with QR can order (expected behavior)

🔄 **API Key Rotation:**
If compromised, update in database:
```sql
UPDATE restaurant_tbl 
SET api_key = 'NEW_KEY_HERE' 
WHERE restaurant_id = 1;
```

---

## 📱 Mobile Testing

1. **Connect to same network** (both computer and phone)
2. **Find your computer's IP**: `ipconfig` (look for IPv4)
3. **Update URL**:
   ```
   http://YOUR_IP:3001/qr/API_KEY_HERE
   ```
4. **Open on phone browser**
5. **Test ordering flow**

**Note:** Make sure Windows Firewall allows port 3001!

---

## 🎉 Done!

The customer QR order system is ready! Customers can now order directly from their table without any app installation or login. 🍽️
