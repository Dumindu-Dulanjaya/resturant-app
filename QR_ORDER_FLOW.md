# Customer QR Order Flow - Test URLs

This document contains test URLs for the customer ordering page accessible via QR code.

## How It Works

1. Customer scans a QR code at their table
2. QR code contains a URL with the restaurant's API key: `http://localhost:3001/qr/{API_KEY}`
3. Customer browses menu, adds items to cart
4. Customer enters table number and places order
5. Order is sent to kitchen with the correct restaurant ID (determined by API key)

## Test URLs

Use these URLs to test the customer ordering flow for each restaurant:

### Restaurant ID 1
```
http://localhost:3001/qr/9ef2e7e841f5e41dcad95882f5d4ca78bf8d70f7800ef220732d641e7fddef55
```

### Restaurant ID 6
```
http://localhost:3001/qr/091b58747d84736476a0d7c7ec9cd556c6ffda5b4c7faa7ff25765b8d27eb2a7
```

### Restaurant ID 8
```
http://localhost:3001/qr/4d0e4aa02daa2ae296bc1359a54b97d4b37ec2d2b3dc104ff5cb25069e064a23
```

### Restaurant ID 9
```
http://localhost:3001/qr/a1cdd1c028d4de6404862fc3e32b8ee592d339dbb3f9768577644cdd671077ec
```

## Testing Steps

1. **Start Backend**:
   ```bash
   cd restaurant-backend-nestjs
   npm run start:dev
   ```

2. **Start Frontend**:
   ```bash
   cd restaurant-frontend
   npm start
   ```

3. **Open Test URL**:
   - Copy one of the URLs above
   - Open in your browser
   - Should see the menu page (no login required)

4. **Place an Order**:
   - Browse categories and food items
   - Click "Add" to add items to cart
   - Click the cart button to open the cart drawer
   - Enter a table number (e.g., "T-5")
   - Add order notes if needed
   - Click "Place Order"
   - Should see success screen with order number

5. **Check in Kitchen KDS**:
   - Login to admin dashboard: http://localhost:3001/login
   - Navigate to Kitchen > KDS
   - Your order should appear in the "NEW" column

## Features

✅ **No Login Required** - Public access via API key in URL
✅ **Category Filtering** - Browse items by category
✅ **Shopping Cart** - Add/remove items, adjust quantities
✅ **Item Notes** - Special instructions per item
✅ **Order Notes** - General order notes
✅ **Table Number** - Required field for delivery
✅ **Real-time Validation** - API key authentication
✅ **Success Screen** - Shows order number and status
✅ **Mobile Responsive** - Works on tablets and phones

## Validation

- ✅ **API Key Required**: Order will fail without valid API key
- ✅ **Table Number Required**: User must enter table number
- ✅ **At Least One Item**: Cart must have at least one item
- ✅ **Quantity Minimum**: Each item must have qty >= 1

## QR Code Generation (Future)

To generate QR codes for production:

1. **Use QR Code Library**:
   ```bash
   npm install qrcode
   ```

2. **Generate QR Codes**:
   ```javascript
   const QRCode = require('qrcode');
   
   const generateTableQR = async (restaurantId, apiKey, tableNumber) => {
     const url = `https://yourdomain.com/qr/${apiKey}`;
     const qrCodeImage = await QRCode.toDataURL(url);
     return qrCodeImage; // Base64 image
   };
   ```

3. **Print QR Codes**:
   - Generate unique QR code per table
   - Include table number as pre-filled value (optional enhancement)
   - Print and laminate for each table

## Security Notes

🔒 **API Key Protection**:
- API keys are embedded in QR codes (public)
- Each key is tied to a specific restaurant
- Orders are rate-limited (10 per minute per IP)
- Cannot access other restaurant's data
- Keys can be rotated if compromised

🔒 **What Customers Cannot Do**:
- ❌ Access admin features
- ❌ View other tables' orders
- ❌ Modify existing orders
- ❌ Access restaurant data
- ❌ Create orders for other restaurants

## Production Deployment

For production deployment, update the URLs:

1. **Frontend** (restaurant-frontend/.env):
   ```
   REACT_APP_API_URL=https://api.yourdomain.com/api
   ```

2. **QR Codes**:
   ```
   https://order.yourdomain.com/qr/{API_KEY}
   ```

3. **CORS** (backend main.ts):
   ```typescript
   app.enableCors({
     origin: ['https://order.yourdomain.com', 'https://admin.yourdomain.com'],
     credentials: true,
   });
   ```
