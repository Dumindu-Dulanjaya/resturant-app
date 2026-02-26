# Quick Start Guide - Feature Flags Setup

## Step 1: Run Database Migration

### Option A: Direct MySQL Command (Recommended)
```bash
# Windows
mysql -u root -p restaurant_db < "d:\Downloads\restaurant-app-main\restaurant-app-main\restaurant-backend-nestjs\migrations\add-restaurant-feature-flags.sql"

# Or connect to MySQL and run:
USE restaurant_db;
source d:/Downloads/restaurant-app-main/restaurant-app-main/restaurant-backend-nestjs/migrations/add-restaurant-feature-flags.sql;
```

### Option B: Copy-Paste SQL
1. Open MySQL Workbench or phpMyAdmin
2. Select your restaurant database
3. Run this SQL:

```sql
ALTER TABLE restaurant_tbl
ADD COLUMN enable_steward TINYINT(1) DEFAULT 1 COMMENT 'Enable Steward role and features',
ADD COLUMN enable_housekeeping TINYINT(1) DEFAULT 1 COMMENT 'Enable Housekeeping module',
ADD COLUMN enable_kds TINYINT(1) DEFAULT 1 COMMENT 'Enable Kitchen Display System',
ADD COLUMN enable_reports TINYINT(1) DEFAULT 1 COMMENT 'Enable Reports module';

UPDATE restaurant_tbl SET 
  enable_steward = 1,
  enable_housekeeping = 1,
  enable_kds = 1,
  enable_reports = 1
WHERE enable_steward IS NULL;
```

### Verify Migration
```sql
DESCRIBE restaurant_tbl;
-- Should show: enable_steward, enable_housekeeping, enable_kds, enable_reports columns

SELECT restaurant_id, enable_steward, enable_housekeeping, enable_kds, enable_reports 
FROM restaurant_tbl;
-- All values should be 1 (enabled)
```

---

## Step 2: Restart Backend

The backend should pick up the entity changes automatically in dev mode:

```bash
cd restaurant-backend-nestjs
npm run start:dev
```

**Expected output:**
```
[Nest] ... - Application successfully started
[Nest] ... - Mapped {/restaurant/settings, GET} route
[Nest] ... - Mapped {/restaurant/settings, PATCH} route
```

---

## Step 3: Test Backend API

### Get Restaurant Settings
```bash
# Get your JWT token from login
curl -X GET http://localhost:3000/api/restaurant/settings \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "enableSteward": true,
    "enableHousekeeping": true,
    "enableKds": true,
    "enableReports": true
  }
}
```

### Update Settings
```bash
curl -X PATCH http://localhost:3000/api/restaurant/settings \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"enableSteward": false}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Restaurant settings updated successfully",
  "data": {
    "enableSteward": false,
    "enableHousekeeping": true,
    "enableKds": true,
    "enableReports": true
  }
}
```

---

## Step 4: Frontend - No Restart Needed

The frontend should automatically pick up the changes. Just refresh the browser.

### Access Restaurant Settings Page

1. **Login** as Admin at: http://localhost:3001/login
2. **Navigate** to: Settings → Restaurant Settings
3. **Or directly visit:** http://localhost:3001/settings/restaurant

### Test Feature Toggling

1. **Disable Steward Module:**
   - Toggle "Steward Module" to OFF
   - Click "Save Settings"
   - Page reloads

2. **Verify:**
   - Check sidebar - Kitchen section visibility changes based on your role
   - If you're a Steward user, Kitchen menu disappears
   - If you're Admin, Kitchen still shows (admin override)

3. **Try accessing disabled feature:**
   - Navigate to http://localhost:3001/kitchen/kds
   - Should see "Feature Disabled" message

4. **Re-enable:**
   - Go back to Settings → Restaurant Settings
   - Toggle "Steward Module" to ON
   - Save
   - Kitchen section reappears

---

## Step 5: Verify Integration

### Test Case 1: Admin User
```
Login as: admin@restaurant.com
Expected:
✅ Can access Restaurant Settings page
✅ Can toggle all features
✅ All menus visible (even when features disabled)
✅ Can save settings successfully
```

### Test Case 2: Steward User (Steward Enabled)
```
Login as: steward@restaurant.com
Expected:
✅ Can see Kitchen section in sidebar
✅ Can access /kitchen/kds
✅ Cannot see Restaurant Settings
✅ Cannot access /menus/* routes
```

### Test Case 3: Steward User (Steward Disabled)
```
1. Admin disables Steward module
2. Login as: steward@restaurant.com
Expected:
❌ Kitchen section hidden from sidebar
❌ Accessing /kitchen/kds shows "Feature Disabled"
✅ Can still access Dashboard
✅ Can access Profile Settings
```

### Test Case 4: Kitchen User (KDS Disabled)
```
1. Admin disables KDS module
2. Login as: kitchen@restaurant.com
Expected:
❌ Kitchen section hidden
❌ Cannot access Kitchen routes
✅ Gets 403 error from backend API
```

---

## Step 6: Database Verification

Check that settings are persisted:

```sql
-- View current settings
SELECT 
  restaurant_id,
  restaurant_name,
  enable_steward,
  enable_housekeeping,
  enable_kds,
  enable_reports
FROM restaurant_tbl;

-- Change settings directly (for testing)
UPDATE restaurant_tbl 
SET enable_steward = 0, enable_reports = 0 
WHERE restaurant_id = 1;

-- Verify user sees changes after refresh
```

---

## Troubleshooting

### Issue: Migration fails "Duplicate column"
**Solution:** Columns already exist. Check with `DESCRIBE restaurant_tbl;`

### Issue: Backend returns 500 error
**Solution:** 
1. Check backend logs
2. Restart backend: `npm run start:dev`
3. Verify TypeORM connection to database

### Issue: Settings not showing in sidebar
**Solution:**
1. Logout and login again
2. Check: http://localhost:3000/api/auth/profile
3. Verify `restaurantSettings` is in response

### Issue: Frontend shows blank page
**Solution:**
1. Check browser console for errors
2. Verify all imports are correct
3. Check: http://localhost:3001 is running

### Issue: "Feature Disabled" not showing
**Solution:**
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear localStorage
3. Login again

---

## Quick Commands Cheat Sheet

```bash
# Backend
cd restaurant-backend-nestjs
npm run start:dev

# Frontend
cd restaurant-frontend
npm start

# Check ports
netstat -ano | findstr ":3000 "  # Backend
netstat -ano | findstr ":3001 "  # Frontend

# Test API
curl http://localhost:3000/api/restaurant/settings -H "Authorization: Bearer TOKEN"

# Database
mysql -u root -p
USE restaurant_db;
SELECT * FROM restaurant_tbl\G
```

---

## Success Criteria

✅ Migration completes without errors
✅ Backend starts with new routes mapped
✅ GET /restaurant/settings returns current settings
✅ PATCH /restaurant/settings updates database
✅ auth/profile includes restaurantSettings
✅ Restaurant Settings page is accessible at /settings/restaurant
✅ Toggle switches work and save successfully
✅ Sidebar hides/shows menu items based on settings
✅ FeatureRoute blocks access to disabled features
✅ Backend FeatureFlagGuard returns 403 for disabled features

---

## What's Next?

After successful setup:

1. **Customize default settings** for new restaurants
2. **Apply FeatureFlagGuard** to additional backend routes
3. **Test with different user roles** (Kitchen, Steward, Housekeeper)
4. **Monitor feature usage** analytics
5. **Consider subscription tiers** based on enabled features

---

For detailed implementation info, see: **FEATURE_FLAGS_IMPLEMENTATION.md**
