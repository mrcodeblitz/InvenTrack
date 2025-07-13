# Deployment Instructions for Azure

## 1. PostgreSQL Database
- Create an Azure Database for PostgreSQL.
- Run `backend/sql/create_tables.sql` to create tables.

## 2. Backend (Express)
- Deploy backend to Azure App Service.
- Set environment variables for DB connection.
- Update `backend/db.js` with Azure DB credentials.

## 3. Frontend (React)
- Build React app: `npm run build`.
- Deploy `build` folder to Azure App Service or Static Web Apps.

## 4. Configuration
- Ensure frontend API calls point to backend Azure endpoint.
- Set CORS in backend to allow frontend domain.

## 5. Test
- Access frontend URL, login, and verify all features.
