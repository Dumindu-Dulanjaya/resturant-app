# Optional Steward Role Configuration - Implementation Summary

## Overview
This feature allows Restaurant Admins to enable/disable optional modules (Steward, Housekeeping, KDS, Reports) per restaurant. When a module is disabled, related menu items are hidden and access to those features is blocked.

---

## Backend Implementation (NestJS)

### 1. Database Migration
**File:** `migrations/add-restaurant-feature-flags.sql`

```sql
ALTER TABLE restaurant_tbl
ADD COLUMN enable_steward TINYINT(1) DEFAULT 1,
ADD COLUMN enable_housekeeping TINYINT(1) DEFAULT 1,
ADD COLUMN enable_kds TINYINT(1) DEFAULT 1,
ADD COLUMN enable_reports TINYINT(1) DEFAULT 1;
```

**Run the migration:**
```bash
cd restaurant-backend-nestjs
# Connect to your MySQL database and run:
mysql -u [username] -p [database_name] < migrations/add-restaurant-feature-flags.sql
```

### 2. Restaurant Entity Updates
**File:** `src/restaurants/entities/restaurant.entity.ts`

Added 4 new boolean columns:
- `enableSteward`
- `enableHousekeeping`
- `enableKds`
- `enableReports`

### 3. Restaurant Settings API

#### Endpoints:
- **GET /api/restaurant/settings** - Get current restaurant settings (Admin only)
- **PATCH /api/restaurant/settings** - Update restaurant settings (Admin only)

#### Request/Response Example:
```json
{
  "enableSteward": true,
  "enableHousekeeping": false,
  "enableKds": true,
  "enableReports": true
}
```

**Files Created:**
- `src/restaurants/restaurants.controller.ts`
- `src/restaurants/dto/update-restaurant-settings.dto.ts`
- `src/restaurants/dto/restaurant-settings-response.dto.ts`

**Files Updated:**
- `src/restaurants/restaurants.service.ts` - Added `getSettings()` and `updateSettings()` methods
- `src/restaurants/restaurants.module.ts` - Added controller

### 4. Feature Flag Guard

**File:** `src/common/guards/feature-flag.guard.ts`

This guard checks if a required feature is enabled before allowing access to protected routes.

**Usage:**
```typescript
@UseGuards(JwtAuthGuard, RolesGuard, FeatureFlagGuard)
@Roles(UserRole.STEWARD)
@RequiresFeature(RestaurantFeature.STEWARD)
@Get('steward-only-route')
async getSomething() {
  // ...
}
```

**Files Created:**
- `src/common/enums/restaurant-feature.enum.ts` - Feature enum (STEWARD, HOUSEKEEPING, KDS, REPORTS)
- `src/common/decorators/requires-feature.decorator.ts` - `@RequiresFeature()` decorator

### 5. Auth Profile Update

**File:** `src/auth/auth.controller.ts`

The `/api/auth/profile` endpoint now includes `restaurantSettings` in the response:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "admin@restaurant.com",
    "role": "admin",
    "restaurantId": 5,
    "restaurantSettings": {
      "enableSteward": true,
      "enableHousekeeping": true,
      "enableKds": true,
      "enableReports": true
    }
  }
}
```

**Files Updated:**
- `src/auth/auth.controller.ts` - Inject RestaurantsService, fetch settings
- `src/auth/auth.module.ts` - Import RestaurantsModule

---

## Frontend Implementation (React)

### 1. Restaurant Settings Page

**Files Created:**
- `src/pages/RestaurantSettings.js` - Settings page with toggle switches
- `src/pages/RestaurantSettings.css` - Professional styling

**Features:**
- Toggle switches for each module
- Real-time save with SweetAlert2 feedback
- Only accessible by Admin/Super Admin
- Page reloads after save to refresh user profile

**Route:** `/settings/restaurant`

### 2. Sidebar Updates

**File:** `src/components/common/Sidebar.js`

**Changes:**
- Added feature flag checks (`isStewardEnabled`, `isHousekeepingEnabled`, etc.)
- Updated permission helpers to include feature checks
- Added "Restaurant Settings" link in Settings submenu (Admin only)

**Logic:**
```javascript
const canAccessKitchen = (isSuperAdmin || isAdmin || isKitchen || isSteward) && isKdsEnabled;
const canAccessHousekeeping = (isSuperAdmin || isAdmin || isHousekeeper) && isHousekeepingEnabled;
const canAccessReports = canAccessAdminFeatures && isReportsEnabled;
```

### 3. FeatureRoute Component

**File:** `src/components/auth/FeatureRoute.js`

Protects routes based on feature flags. Shows a friendly error page when a feature is disabled.

**Usage:**
```jsx
<FeatureRoute requiredFeature="KDS">
  <KitchenKDS />
</FeatureRoute>
```

**Features:**
- Checks `user.restaurantSettings` from authStore
- Shows "Feature Disabled" page with back to dashboard button
- Supports features: STEWARD, HOUSEKEEPING, KDS, REPORTS

### 4. App.js Route Updates

**File:** `src/App.js`

**Changes:**
- Imported `RestaurantSettings` and `FeatureRoute`
- Added `/settings/restaurant` route (Admin/Super Admin only)
- Wrapped KDS routes with `<FeatureRoute requiredFeature="KDS">`
- Wrapped Reports routes with `<FeatureRoute requiredFeature="REPORTS">`

---

## How to Use

### For Restaurant Admins:

1. **Login** as Admin or Super Admin
2. **Navigate** to Settings → Restaurant Settings (in sidebar)
3. **Toggle** the modules you want to enable/disable:
   - **Steward Module** - Table service features
   - **Housekeeping** - Hotel room management
   - **Kitchen Display System** - Real-time order tracking
   - **Reports** - Analytics and reports
4. **Click** "Save Settings"
5. **Page reloads** and sidebar updates automatically

### For Developers:

#### Protecting New Routes:

**Backend:**
```typescript
@UseGuards(JwtAuthGuard, RolesGuard, FeatureFlagGuard)
@Roles(UserRole.ADMIN)
@RequiresFeature(RestaurantFeature.STEWARD)
@Get('my-steward-route')
async myRoute() {
  // Only accessible if Steward module is enabled
}
```

**Frontend:**
```jsx
<Route path="/steward/tasks" element={
  <PrivateRoute>
    <RoleRoute allowedRoles={['admin', 'steward']}>
      <FeatureRoute requiredFeature="STEWARD">
        <StewardTasks />
      </FeatureRoute>
    </RoleRoute>
  </PrivateRoute>
} />
```

#### Adding New Feature Flags:

1. **Migration:** Add column to `restaurant_tbl`
2. **Entity:** Add property to `Restaurant` entity
3. **Enum:** Add to `RestaurantFeature` enum
4. **Guard:** Add case in `FeatureFlagGuard.canActivate()`
5. **DTOs:** Add to `UpdateRestaurantSettingsDto` and `RestaurantSettingsResponseDto`
6. **Frontend:** Add to `RestaurantSettings.js` UI
7. **Sidebar:** Add permission helper

---

## Testing

### Backend Testing:

1. **Run migration** to add columns
2. **Start backend:** `npm run start:dev`
3. **Test endpoints:**
   ```bash
   # Get settings (requires auth token)
   GET http://localhost:3000/api/restaurant/settings
   
   # Update settings
   PATCH http://localhost:3000/api/restaurant/settings
   Body: { "enableSteward": false }
   ```

### Frontend Testing:

1. **Login** as Admin
2. **Verify** Settings menu shows "Restaurant Settings" link
3. **Navigate** to Restaurant Settings page
4. **Disable** Steward module
5. **Save** and verify:
   - Sidebar no longer shows steward-related items (based on role)
   - Navigating to steward routes shows "Feature Disabled" page
   - Kitchen section disappears if user is steward-only

### Integration Testing:

**Scenario 1: Disable Steward**
- Admin disables Steward module
- Steward users can no longer see Kitchen/Orders menus
- Attempting to access `/kitchen/kds` shows "Feature Disabled"
- API returns 403 for steward-only endpoints

**Scenario 2: Disable Reports**
- Admin disables Reports module
- Reports section disappears from sidebar
- Navigating to `/reports/daily` shows "Feature Disabled"
- API returns 403 for reports endpoints

---

## Role vs Feature Matrix

| Role | Menus | QR | Kitchen | Housekeeping | Reports | Settings |
|------|-------|-----|---------|--------------|---------|----------|
| **Super Admin** | ✅ | ✅ | ✅* | ✅* | ✅* | ✅ (All) |
| **Admin** | ✅ | ✅ | ✅* | ✅* | ✅* | ✅ (Restaurant) |
| **Kitchen** | ❌ | ❌ | ✅* | ❌ | ❌ | ✅ (Profile) |
| **Steward** | ❌ | ❌ | ✅* | ❌ | ❌ | ✅ (Profile) |
| **Housekeeper** | ❌ | ❌ | ❌ | ✅* | ❌ | ✅ (Profile) |

*Subject to feature flag being enabled

---

## API Endpoints Summary

| Method | Endpoint | Auth | Roles | Feature | Description |
|--------|----------|------|-------|---------|-------------|
| GET | /api/restaurant/settings | JWT | Admin, Super Admin | - | Get restaurant settings |
| PATCH | /api/restaurant/settings | JWT | Admin, Super Admin | - | Update restaurant settings |
| GET | /api/auth/profile | JWT | All | - | Get user profile (includes settings) |

---

## File Structure

```
restaurant-backend-nestjs/
├── migrations/
│   └── add-restaurant-feature-flags.sql
├── src/
│   ├── common/
│   │   ├── decorators/
│   │   │   └── requires-feature.decorator.ts
│   │   ├── enums/
│   │   │   └── restaurant-feature.enum.ts
│   │   └── guards/
│   │       └── feature-flag.guard.ts
│   ├── restaurants/
│   │   ├── dto/
│   │   │   ├── restaurant-settings-response.dto.ts
│   │   │   └── update-restaurant-settings.dto.ts
│   │   ├── entities/
│   │   │   └── restaurant.entity.ts (updated)
│   │   ├── restaurants.controller.ts (new)
│   │   ├── restaurants.module.ts (updated)
│   │   └── restaurants.service.ts (updated)
│   └── auth/
│       ├── auth.controller.ts (updated)
│       └── auth.module.ts (updated)

restaurant-frontend/
└── src/
    ├── components/
    │   ├── auth/
    │   │   └── FeatureRoute.js (new)
    │   └── common/
    │       └── Sidebar.js (updated)
    ├── pages/
    │   ├── RestaurantSettings.js (new)
    │   └── RestaurantSettings.css (new)
    └── App.js (updated)
```

---

## Environment Variables

No new environment variables are required. Uses existing:
- `JWT_SECRET` - JWT token secret
- `DATABASE_HOST`, `DATABASE_PORT`, etc. - Database config

---

## Troubleshooting

### Issue: Settings not saving
**Solution:** Check that:
1. User has Admin role
2. JWT token is valid
3. `restaurantId` is present in token payload

### Issue: Feature still accessible after disabling
**Solution:**
1. Refresh the page (frontend caches user profile)
2. Verify settings saved in database: `SELECT * FROM restaurant_tbl WHERE restaurant_id = X`

### Issue: Backend returns 403 Forbidden
**Solution:** Ensure:
1. `FeatureFlagGuard` is applied to the route
2. Restaurant settings are loaded in database
3. Backend logs show no errors in guard execution

---

## Production Considerations

1. **Migration Strategy:**
   - Run migration during low-traffic period
   - Default all features to `1` (enabled) for existing restaurants
   - New restaurants can set preferences during onboarding

2. **Performance:**
   - Restaurant settings are cached in JWT payload
   - Settings fetched once per login session
   - No additional DB queries on every request

3. **Security:**
   - Only Admins can change settings
   - Feature flags enforced on both frontend and backend
   - Guards run after authentication and authorization

4. **User Experience:**
   - Disabled features are hidden, not grayed out
   - Friendly error pages when accessing disabled features
   - Settings page is intuitive with toggle switches

---

## Future Enhancements

1. **Granular Permissions:** Role-level feature overrides
2. **Feature Analytics:** Track which features are most used
3. **Conditional Pricing:** Different subscription tiers based on enabled features
4. **Feature Previews:** Allow trial periods for premium features
5. **Bulk Operations:** Super Admin can enable/disable features across multiple restaurants

---

## Maintenance

### Adding New Features:
1. Add column to database
2. Update Restaurant entity
3. Add to feature enum
4. Update DTOs
5. Add UI toggle in RestaurantSettings.js
6. Apply guards to protected routes

### Removing Features:
1. Remove from UI
2. Keep database columns for backward compatibility
3. Deprecate guard checks over time

---

## Support

For issues or questions:
1. Check error logs: `restaurant-backend-nestjs/logs`
2. Verify database state: `SELECT * FROM restaurant_tbl`
3. Test API endpoints with Postman/Insomnia
4. Check browser console for frontend errors

---

**Implementation Complete ✅**
- ✅ Database migration
- ✅ Backend entities & DTOs
- ✅ Restaurant settings controller/service
- ✅ Feature flag guard & decorator
- ✅ Auth profile includes settings
- ✅ Frontend settings page
- ✅ Sidebar conditional rendering
- ✅ FeatureRoute component
- ✅ Route protection applied
