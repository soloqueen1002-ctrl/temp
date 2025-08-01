@echo off
echo ========================================
echo Travel Planner - MySQL Setup for Windows
echo ========================================
echo.

echo Step 1: Checking if WAMP Server is running...
echo Please make sure WAMP Server is running (green icon)
echo.
pause

echo Step 2: Testing database connection...
cd django\backend
python test_db_connection.py
echo.
pause

echo Step 3: Running Django migrations...
python manage.py makemigrations
python manage.py migrate
echo.
pause

echo Step 4: Starting Django server...
echo Django server will start on http://localhost:8000
echo You can now test signup/login functionality
echo Check phpMyAdmin to see the data
echo.
python manage.py runserver

pause 