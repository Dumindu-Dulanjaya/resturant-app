# Restaurant App - NestJS Backend Migration Guide

මෙම ගොනුව ඔබේ PHP Restaurant Application එක NestJS වලට migrate කරන ක්‍රියාවලිය විස්තර කරයි.

## ✅ කළ කාර්යයන් (Completed Tasks)

### 1. NestJS Project Setup ✓
- NestJS project නිර්මාණය කරන ලදී
- TypeScript හා සියලුම dependencies install කරන ලදී
- Port 3000 මත server එක run වෙමින් පවතී

### 2. Database Connection ✓
- MySQL database සම්බන්ධතාවය TypeORM භාවිතයෙන් හදන ලදී
- `restaurant_db` database එක සම්බන්ධ කරන ලදී
- Environment variables configuration එක ඇතුළත් කරන ලදී

### 3. Authentication System ✓
මුල්ම කොටස ලෙස authentication system එක සම්පූර්ණයෙන් convert කරන ලදී:

#### Entities Created:
- `Admin` entity (admin_tbl)
- `SuperAdmin` entity (super_admin_tbl)
- `Restaurant` entity (restaurant_tbl)

#### Features Implemented:
- JWT Authentication
- Login endpoint for both Admin and Super Admin
- Password verification (bcrypt compatible with PHP)
- Subscription validation
- Protected routes with JWT guard
- Profile endpoint

## 🚀 භාවිතය (Usage)

### NestJS Backend (Port 3000)

**1. Login API:**
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "contact@seaspray.com",
  "password": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "contact@seaspray.com",
      "role": "admin",
      "restaurantId": 1,
      "type": "admin"
    }
  }
}
```

**2. Get Profile (Protected):**
```bash
GET http://localhost:3000/api/auth/profile
Authorization: Bearer YOUR_JWT_TOKEN
```

### PHP Backend (Port 8000)
PHP application එක තවමත් භාවිතා කළ හැක:
```
http://localhost:8000
```

## 📋 ඉදිරියට කළ යුතු කාර්යයන් (Pending Tasks)

### Phase 2: Restaurant Management APIs
- [ ] Get all restaurants
- [ ] Create restaurant
- [ ] Update restaurant
- [ ] Delete restaurant
- [ ] Restaurant privileges management

### Phase 3: Menu Management APIs
- [ ] Categories CRUD
- [ ] Subcategories CRUD
- [ ] Food items CRUD
- [ ] Menu management
- [ ] Special offers

### Phase 4: Order Management APIs
- [ ] Create order
- [ ] Get orders by table
- [ ] Update order status
- [ ] Order notifications
- [ ] Kitchen display

### Phase 5: Housekeeping System
- [ ] Room management
- [ ] Housekeeping requests
- [ ] QR code generation
- [ ] Request status updates

### Phase 6: Reports & Analytics
- [ ] Daily reports
- [ ] Sales analytics
- [ ] Popular items
- [ ] Revenue tracking

### Phase 7: Payment Integration
- [ ] Stripe payment processing
- [ ] Payment webhooks
- [ ] Bill generation
- [ ] Transaction history

## 🔧 Development Commands

### NestJS Backend:
```bash
# Development mode
cd restaurant-backend-nestjs
npm run start:dev

# Build
npm run build

# Production
npm run start:prod

# Generate new module
npx nest generate module module-name
npx nest generate controller module-name
npx nest generate service module-name
```

### PHP Backend:
```bash
# Start PHP server
C:\wamp64\bin\php\php8.2.13\php.exe -S localhost:8000
```

## 📁 Project Structure

```
restaurant-app-main/
├── menus/                          # PHP Backend (Original)
│   ├── admin/
│   ├── backend/
│   ├── s_admin/
│   └── db.php
│
├── restaurant-backend-nestjs/      # NestJS Backend (New)
│   ├── src/
│   │   ├── auth/                   # ✓ Authentication Module
│   │   │   ├── entities/
│   │   │   ├── dto/
│   │   │   ├── strategies/
│   │   │   ├── guards/
│   │   │   └── interfaces/
│   │   ├── restaurants/            # ✓ Restaurant Module
│   │   │   └── entities/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env
│   └── package.json
│
└── assets/                         # Frontend Assets
```

## 🔐 Environment Variables

`.env` file:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=restaurant_db

JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRATION=7d

PORT=3000
NODE_ENV=development

CORS_ORIGIN=http://localhost:8000,http://localhost:3001
```

## 🌟 Performance Improvements

NestJS භාවිතයෙන් ලැබෙන වාසි:

1. **Better Performance**: Asynchronous processing
2. **Type Safety**: TypeScript භාවිතය
3. **Scalability**: Modular architecture
4. **Modern Stack**: Latest Node.js features
5. **Better Error Handling**: Built-in exception filters
6. **API Documentation**: Easy Swagger integration
7. **Testing**: Built-in testing framework
8. **Dependency Injection**: Better code organization

## 🔄 Migration Strategy

Project එක කොටස් කොටස් migrate කරමින් පවතී:

1. ✅ **Phase 1**: Authentication (Completed)
2. 🔄 **Phase 2**: Restaurant Management (Next)
3. ⏳ **Phase 3**: Menu Management
4. ⏳ **Phase 4**: Order Management
5. ⏳ **Phase 5**: Housekeeping
6. ⏳ **Phase 6**: Reports
7. ⏳ **Phase 7**: Payments

PHP හා NestJS backend එකට එකම database එක භාවිතා කරයි, එබැවින් gradual migration එකක් කළ හැක.

## 📞 Testing

Postman හෝ වෙනත් API client එකක් භාවිතයෙන් test කරන්න:

```bash
# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"contact@seaspray.com","password":"admin"}'
```

## 🎯 Next Steps

1. Phase 2 ආරම්භ කරන්න: Restaurant Management APIs
2. Frontend React application එක create කරන්න
3. Real-time features සඳහා WebSocket add කරන්න
4. API documentation සඳහා Swagger setup කරන්න

---

**සටහන**: PHP backend එක තවමත් fully functional. NestJS backend එක gradually expand වෙමින් පවතී.
