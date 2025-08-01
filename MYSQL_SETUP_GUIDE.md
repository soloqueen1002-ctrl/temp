# MySQL Setup Guide for Travel Planner

## Problem

Your Django application is currently using SQLite database, but you want to see the data in phpMyAdmin (MySQL). The data is being saved to SQLite instead of MySQL.

## Solution

### Step 1: Database Configuration (Already Done)

✅ Updated `django/backend/backend/settings.py` to use MySQL instead of SQLite
✅ Installed PyMySQL connector

### Step 2: For Windows (WAMP Server)

1. **Start WAMP Server**

   - Open WAMP Server
   - Wait for the icon to turn green (indicating all services are running)
   - Make sure MySQL service is running

2. **Create Database**

   - Open phpMyAdmin: http://localhost/phpmyadmin
   - Create a new database named `travel-planner`
   - Or use the existing database if it already exists

3. **Run Django Migrations**

   ```bash
   cd django/backend
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Test the Connection**
   ```bash
   python manage.py runserver
   ```

### Step 3: For Mac (Development)

1. **Install MySQL on Mac**

   ```bash
   brew install mysql
   brew services start mysql
   ```

2. **Create Database**

   ```bash
   mysql -u root -p
   CREATE DATABASE `travel-planner`;
   exit;
   ```

3. **Run Migrations**
   ```bash
   cd django/backend
   python manage.py makemigrations
   python manage.py migrate
   ```

### Step 4: Verify Data Storage

1. **Test Signup/Login**

   - Use your frontend to sign up a new user
   - Check phpMyAdmin to see if data appears in `myapi_usersignup` table

2. **Check Database Tables**
   - In phpMyAdmin, navigate to `travel-planner` database
   - You should see these tables:
     - `myapi_usersignup`
     - `myapi_hotelbooking`
     - `myapi_foodorder`
     - Django system tables

### Troubleshooting

**If you get connection errors:**

1. Make sure WAMP Server is running (green icon)
2. Check if MySQL service is started in WAMP
3. Verify database name is exactly `travel-planner`
4. Check if port 3306 is not blocked

**If tables don't exist:**

1. Run `python manage.py makemigrations myapi`
2. Run `python manage.py migrate`

**If data still doesn't appear:**

1. Check Django logs for errors
2. Verify the API endpoints are working
3. Test with a simple database query

### Current Status

- ✅ Django settings updated for MySQL
- ✅ PyMySQL connector installed
- ⏳ Waiting for MySQL server to be available
- ⏳ Need to run migrations when MySQL is running

### Next Steps

1. Start WAMP Server on Windows
2. Run the migration commands
3. Test signup/login functionality
4. Check phpMyAdmin for data
