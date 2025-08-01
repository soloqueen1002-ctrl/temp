#!/bin/bash

# Travel Planner Application Startup Script
# This script starts both the Django backend and Ionic frontend

echo "🚀 Starting Travel Planner Application..."
echo "========================================"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Python is installed
if ! command_exists python3; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Function to start Django backend
start_backend() {
    echo "🔧 Starting Django Backend..."
    cd django/backend
    
    # Check if virtual environment exists
    if [ ! -d "venv" ]; then
        echo "📦 Creating virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    echo "🔌 Activating virtual environment..."
    source venv/bin/activate
    
    # Install Django dependencies if not already installed
    echo "📥 Installing Django dependencies..."
    pip install django djangorestframework django-cors-headers
    
    # Run migrations
    echo "🗄️ Running database migrations..."
    python manage.py migrate
    
    # Start Django server in background
    echo "🚀 Starting Django server on http://localhost:8000"
    python manage.py runserver &
    DJANGO_PID=$!
    echo $DJANGO_PID > django.pid
    
    cd ../..
}

# Function to start Ionic frontend
start_frontend() {
    echo "🔧 Starting Ionic Frontend..."
    cd travel-planner
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo "📥 Installing Node.js dependencies..."
        npm install
    fi
    
    # Install Ionic CLI globally if not installed
    if ! command_exists ionic; then
        echo "📥 Installing Ionic CLI..."
        npm install -g @ionic/cli
    fi
    
    # Start Ionic server
    echo "🚀 Starting Ionic server on http://localhost:4200"
    ionic serve &
    IONIC_PID=$!
    echo $IONIC_PID > ionic.pid
    
    cd ..
}

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    
    # Kill Django server
    if [ -f "django/backend/django.pid" ]; then
        DJANGO_PID=$(cat django/backend/django.pid)
        kill $DJANGO_PID 2>/dev/null
        rm django/backend/django.pid
    fi
    
    # Kill Ionic server
    if [ -f "travel-planner/ionic.pid" ]; then
        IONIC_PID=$(cat travel-planner/ionic.pid)
        kill $IONIC_PID 2>/dev/null
        rm travel-planner/ionic.pid
    fi
    
    echo "✅ Servers stopped."
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start both servers
start_backend
sleep 3  # Wait a bit for Django to start
start_frontend

echo ""
echo "🎉 Travel Planner Application is starting up!"
echo "=============================================="
echo "📱 Frontend: http://localhost:4200"
echo "🔧 Backend API: http://localhost:8000"
echo "⚙️  Django Admin: http://localhost:8000/admin"
echo ""
echo "⏳ Please wait a moment for both servers to fully start..."
echo "🛑 Press Ctrl+C to stop both servers"
echo ""

# Wait for user to stop
wait 