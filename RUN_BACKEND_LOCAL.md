# How to Install and Run the Backend Locally

## 1. Open a terminal and navigate to the backend folder:
```sh
cd "c:\Users\Rahul\Documents\My Learnigs - Python\MyParkingSpace\backend"
```

## 2. Install dependencies:
```sh
npm install
```

## 3. Configure PostgreSQL connection:
- Edit `db.js` and set your local PostgreSQL credentials (user, password, host, database, port).

## 4. Create the database tables:
- Make sure PostgreSQL is running.
- Run the SQL script to create tables:
```sh
psql -U your_username -d your_database -f sql/create_tables.sql
```
Replace `your_username` and `your_database` with your actual PostgreSQL username and database name.

## 5. Start the backend server:
```sh
npm run dev
```
or
```sh
npm start
```

- The backend will run on [http://localhost:5000](http://localhost:5000) by default.

---
**Note:**  
If you use `npm run dev`, make sure `nodemon` is installed (it is listed as a dev dependency).
