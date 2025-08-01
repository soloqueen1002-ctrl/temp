@echo off
setlocal enabledelayedexpansion

echo 🚀 Starting Travel Planner Application...
echo ========================================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!

REM Start Django backend
echo 🔧 Starting Django Backend...
cd django\backend

REM Check if virtual environment exists
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔌 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install Django dependencies
echo 📥 Installing Django dependencies...
pip install django djangorestframework django-cors-headers

REM Run migrations
echo 🗄️ Running database migrations...
python manage.py migrate

REM Start Django server in a new window
echo 🚀 Starting Django server on http://localhost:8000
start "Django Backend" cmd /k "call venv\Scripts\activate.bat && python manage.py runserver"

cd ..\..

REM Start Ionic frontend
echo 🔧 Starting Ionic Frontend...
cd travel-planner

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📥 Installing Node.js dependencies...
    npm install
)

REM Install Ionic CLI globally if not installed
ionic --version >nul 2>&1
if errorlevel 1 (
    echo 📥 Installing Ionic CLI...
    npm install -g @ionic/cli
)

REM Start Ionic server in a new window
echo 🚀 Starting Ionic server on http://localhost:4200
start "Ionic Frontend" cmd /k "ionic serve"

cd ..

echo.
echo 🎉 Travel Planner Application is starting up!
echo ==============================================
echo 📱 Frontend: http://localhost:4200
echo 🔧 Backend API: http://localhost:8000
echo ⚙️  Django Admin: http://localhost:8000/admin
echo.
echo ⏳ Both servers are starting in separate windows...
echo 🛑 Close the server windows to stop them
echo.

REM Wait a moment for servers to start
timeout /t 5 /nobreak >nul

echo ✅ Application should be ready!
echo 🌐 Open your browser and go to: http://localhost:4200
echo.

pause 