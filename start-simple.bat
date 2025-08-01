@echo off
echo 🚀 Travel Planner - Simple Startup
echo ==================================

echo.
echo 📋 This will start both servers in separate windows.
echo 🛑 To stop: Close the server windows when done.
echo.

echo 🔧 Starting Django Backend...
start "Django Backend" cmd /k "cd django\backend && python -m venv venv && venv\Scripts\activate.bat && pip install django djangorestframework django-cors-headers && python manage.py migrate && python manage.py runserver"

echo.
echo 🔧 Starting Ionic Frontend...
start "Ionic Frontend" cmd /k "cd travel-planner && npm install && npm install -g @ionic/cli && ionic serve"

echo.
echo ✅ Both servers are starting in separate windows!
echo.
echo 🌐 Access your application:
echo    📱 Frontend: http://localhost:4200
echo    🔧 Backend: http://localhost:8000
echo.
echo ⏳ Please wait for both servers to fully start...
pause 