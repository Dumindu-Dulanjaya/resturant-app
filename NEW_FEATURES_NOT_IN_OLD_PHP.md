# New Features in the React + NestJS Project (Not Found in Legacy PHP)

## Purpose
This document lists features that exist in the new React + NestJS implementation and were not found in the legacy PHP codebase.

## Comparison Scope
- Legacy scope checked: `menus/**/*.php` and root `*.php`
- New scope checked: `restaurant-frontend/src/**`, `restaurant-backend-nestjs/src/**`, and implementation docs
- Verification date: 2026-03-18

## Feature Delta

| # | New Feature | New Project Implementation | Legacy PHP Status |
|---|-------------|----------------------------|-------------------|
| 1 | Cashier role with dedicated login/dashboard | Cashier-specific auth and screens: `restaurant-frontend/src/pages/CashierLogin.js`, `restaurant-frontend/src/pages/CashierDashboard.js`, route wiring in `restaurant-frontend/src/App.js` (`/cashier-login`, `/cashier/dashboard`) | No `cashier` implementation found in legacy PHP scan |
| 2 | Kitchen -> Cashier invoice handoff queue | Backend invoice queue and handoff endpoints in `restaurant-backend-nestjs/src/billing/billing.controller.ts` and `restaurant-backend-nestjs/src/billing/billing.service.ts` (`send-to-cashier`, `cashier-queue`) + queue UI in `restaurant-frontend/src/pages/ServiceBillingDashboard.js` | No equivalent cashier queue workflow found in legacy PHP scan |
| 3 | Bill action audit trail (PDF/Print/WhatsApp tracking) | `bill_actions` entity + APIs in `restaurant-backend-nestjs/src/billing/entities/bill-action.entity.ts` and `restaurant-backend-nestjs/src/billing/BILL_ACTIONS_API.md` | No `bill_actions` tracking found in legacy PHP scan |
| 4 | Per-restaurant feature flags with enforcement | DB flags (`enable_steward`, `enable_housekeeping`, `enable_kds`, `enable_reports`) in `restaurant-backend-nestjs/src/restaurants/entities/restaurant.entity.ts`; guarded routes via `restaurant-backend-nestjs/src/common/guards/feature-flag.guard.ts`; UI enforcement via `restaurant-frontend/src/components/auth/FeatureRoute.js` and `restaurant-frontend/src/pages/RestaurantSettings.js` | No `enable_*` feature-flag implementation found in legacy PHP scan |
| 5 | Settings approval workflow (Admin request -> Super Admin review) | `settings_requests` workflow in `restaurant-backend-nestjs/src/settings-requests/**`, integration in `restaurant-backend-nestjs/src/restaurants/restaurants.controller.ts`, and UI pages such as `restaurant-frontend/src/pages/PendingSettingsRequests.js` | No `settings_requests` approval flow found in legacy PHP scan |
| 6 | Registration approval lifecycle (pending/approve/reject) | Pending registration endpoints and status handling in `restaurant-backend-nestjs/src/restaurants/restaurants.controller.ts` and `restaurant-backend-nestjs/src/restaurants/restaurants.service.ts`; login gates for pending/rejected in `restaurant-backend-nestjs/src/auth/auth.service.ts` | No equivalent pending registration lifecycle found in legacy PHP scan |
| 7 | Secure table-level QR ordering with table key guard | `table_qr_tbl` model and resolve endpoint in `restaurant-backend-nestjs/src/table-qr/**`; guarded order creation via `restaurant-backend-nestjs/src/common/guards/table-key.guard.ts`; frontend route `restaurant-frontend/src/App.js` (`/qr/:tableKey`) and implementation in `restaurant-frontend/src/pages/CustomerQROrder.js` | Legacy approach documented as restaurant-level key/manual table model; table-key guarded flow not found in legacy PHP scan |
| 8 | Real-time operational notifications (WebSocket events) | Cashier and settings events emitted in `restaurant-backend-nestjs/src/billing/billing.service.ts` (`cashier:queue-update`) and `restaurant-backend-nestjs/src/settings-requests/settings-requests.service.ts` (`settings-request:new`, `settings-request:reviewed`) with frontend listeners (e.g., `restaurant-frontend/src/pages/SuperAdminDashboard.js`) | No websocket event flow found in legacy PHP scan |

## Legacy Verification Notes
Targeted keyword scan against legacy PHP (`menus/**/*.php`, root `*.php`) returned no matches for:
- `cashier`
- `settings_requests`
- `bill_actions`
- `x-table-key`
- `table_key`
- `enable_kds`, `enable_reports`, `enable_housekeeping`, `enable_steward`

## Related Documentation
- `FEATURE_FLAGS_IMPLEMENTATION.md`
- `SETTINGS_APPROVAL_WORKFLOW.md`
- `CUSTOMER_ORDER_IMPLEMENTATION.md`
- `OLD_SYSTEM_QR_IMPLEMENTATION.md`
- `restaurant-backend-nestjs/API_KEY_SYSTEM.md`
- `restaurant-backend-nestjs/BILL_ACTIONS_IMPLEMENTATION.md`

## Notes
- This document focuses on **feature additions** and workflow/security upgrades.
- Core modules that already existed in the PHP system (menus, reports, basic kitchen/order pages) are intentionally excluded from this delta list unless the workflow/security model is materially different.
