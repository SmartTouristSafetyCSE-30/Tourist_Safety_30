# 🔧 MySQL Integration & Authentication Fix

## Issues Fixed
1. ✅ Data now stores in MySQL database
2. ✅ Dashboard authentication properly enforced
3. ✅ Login redirects to dashboard only after authentication
4. ✅ All API endpoints connected to MySQL

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Install MySQL
Download and install MySQL from: https://dev.mysql.com/downloads/installer/

**During installation:**
- Set root password: `root` (or update `.env` file)
- Start MySQL service

### Step 2: Create Database
Open MySQL Command Line or MySQL Workbench and run:
```sql
CREATE DATABASE tourist_safety_db;
```

Or simply run:
```bash
mysql -u root -p < setup-database.sql
```

### Step 3: Run Setup Script
```bash
setup-and-start.bat
```

This will:
- Install all dependencies
- Create database tables
- Insert demo users with hashed passwords
- Start the server

---

## 📋 Manual Setup (Alternative)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database
Edit `.env` file if needed:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=tourist_safety_db
DB_PORT=3306
```

### 3. Setup Database
```bash
node setup-demo-users.js
```

### 4. Start Server
```bash
npm start
```

---

## 🔐 Demo Credentials

All passwords are now hashed with bcrypt in MySQL:

| Role | Username | Password |
|------|----------|----------|
| Tourist | demo_tourist | tourist123 |
| Police | demo_police | police123 |
| Tourism | demo_tourism | tourism123 |
| Admin | demo_admin | admin123 |

---

## 🗄️ Database Tables Created

### 1. users
- Stores user accounts with hashed passwords
- Fields: id, username, password, email, full_name, phone, role, digital_id

### 2. panic_alerts
- Stores emergency panic button alerts
- Fields: id, alert_id, tourist_id, alert_type, latitude, longitude, message, status

### 3. digital_ids
- Stores digital tourist IDs
- Fields: id, digital_id, user_id, qr_code, blockchain_hash

### 4. gps_logs
- Stores GPS location tracking data
- Fields: id, tourist_id, latitude, longitude, accuracy

---

## 🔒 Authentication Flow

### Login Process:
1. User enters credentials on login page
2. Frontend sends POST to `/api/auth/login`
3. Server validates against MySQL database
4. Password verified using bcrypt
5. JWT token generated and returned
6. Token stored in localStorage
7. User redirected to dashboard

### Dashboard Protection:
1. Dashboard checks localStorage for:
   - `touristLoggedIn` flag
   - `userType` role
   - `authToken` JWT
2. If missing, redirects to login page
3. If present, loads user data from localStorage

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login (MySQL)
- `POST /api/auth/register` - User registration (MySQL)

### Emergency
- `POST /api/panic/trigger` - Trigger panic alert (MySQL)

### Digital ID
- `POST /api/digital-id/generate` - Generate digital ID (MySQL)

### Location
- `POST /api/gps/location` - Save GPS location (MySQL)

### AI Assistant
- `POST /api/ai/chat` - AI chatbot responses

---

## ✅ Testing the Fix

### Test 1: Registration
1. Go to `tourist-register.html`
2. Fill registration form
3. Submit
4. Check MySQL: `SELECT * FROM users;`
5. Verify new user is stored

### Test 2: Login
1. Go to `tourist-login.html`
2. Enter: demo_tourist / tourist123
3. Should redirect to dashboard
4. Check localStorage has authToken

### Test 3: Dashboard Protection
1. Clear localStorage
2. Try accessing `tourist-dashboard.html` directly
3. Should redirect to login page

### Test 4: Panic Alert
1. Login as tourist
2. Click panic button on dashboard
3. Confirm alert
4. Check MySQL: `SELECT * FROM panic_alerts;`
5. Verify alert is stored

---

## 🐛 Troubleshooting

### Error: "Cannot connect to MySQL"
**Solution:**
```bash
# Check if MySQL is running
net start MySQL80

# Or start MySQL service from Services
services.msc
```

### Error: "Access denied for user 'root'"
**Solution:**
Update `.env` file with correct password:
```env
DB_PASSWORD=your_mysql_password
```

### Error: "Database does not exist"
**Solution:**
```bash
mysql -u root -p
CREATE DATABASE tourist_safety_db;
exit
```

### Dashboard opens without login
**Solution:**
Clear browser localStorage:
```javascript
// Open browser console (F12) and run:
localStorage.clear();
location.reload();
```

---

## 📊 Verify Data Storage

### Check Users
```sql
USE tourist_safety_db;
SELECT * FROM users;
```

### Check Panic Alerts
```sql
SELECT * FROM panic_alerts ORDER BY created_at DESC;
```

### Check GPS Logs
```sql
SELECT * FROM gps_logs ORDER BY created_at DESC LIMIT 10;
```

---

## 🎯 What Changed

### Files Modified:
1. `server.js` - Added MySQL integration
2. `tourist-login.html` - Connected to MySQL API
3. `tourist-dashboard.html` - Fixed authentication check

### Files Created:
1. `db.js` - Database connection module
2. `setup-demo-users.js` - Demo user setup script
3. `setup-database.sql` - SQL schema
4. `setup-and-start.bat` - Automated setup
5. `MYSQL_SETUP.md` - This file

---

## 🚀 Production Deployment

For production, update:

1. Change JWT secret in `.env`:
```env
JWT_SECRET=your_secure_random_secret_key_here
```

2. Use strong database password:
```env
DB_PASSWORD=strong_production_password
```

3. Enable HTTPS
4. Add rate limiting
5. Implement proper session management

---

## 📞 Support

If you encounter issues:
1. Check MySQL is running
2. Verify `.env` configuration
3. Check server console for errors
4. Clear browser cache and localStorage

---

**Built for Smart India Hackathon 2024**
**Ministry of DoNER - Government of India**
