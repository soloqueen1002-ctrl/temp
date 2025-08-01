# Travel Planner Application

A full-stack travel planning application built with **Ionic Angular** (frontend) and **Django REST API** (backend). This application allows users to book hotels, order food, and manage their travel plans.

## 🏗️ Project Structure

```
temp/
├── django/                    # Backend Django API
│   ├── backend/              # Django project root
│   │   ├── backend/          # Django settings and config
│   │   ├── myapi/           # Main API application
│   │   ├── manage.py        # Django management script
│   │   └── db.sqlite3       # SQLite database
│   └── venv/                # Python virtual environment
└── travel-planner/          # Frontend Ionic Angular app
    ├── src/
    │   ├── app/
    │   │   ├── pages/       # Application pages
    │   │   ├── services/    # API services
    │   │   └── home/        # Home module
    │   ├── assets/          # Static assets
    │   └── environments/    # Environment configs
    ├── package.json         # Node.js dependencies
    └── angular.json         # Angular configuration
```

## 🚀 Features

### Backend (Django REST API)

- **User Authentication**: Signup and login functionality
- **Hotel Booking**: Book hotels with check-in/check-out dates
- **Food Ordering**: Order food items with quantity and pricing
- **Order Management**: View user's booking and order history
- **RESTful API**: Clean API endpoints for frontend integration

### Frontend (Ionic Angular)

- **Responsive Design**: Mobile-first approach with Ionic components
- **Multiple Pages**:
  - Home page
  - Login/Signup pages
  - Hotel booking interface
  - Food ordering interface
  - Tourist spot information
  - Route planning
  - Order results display
- **Modern UI**: Beautiful and intuitive user interface
- **Cross-platform**: Works on web, iOS, and Android

## 🛠️ Prerequisites

Before running this application, make sure you have the following installed:

### For Backend (Django)

- **Python 3.8+**
- **pip** (Python package manager)
- **Virtual environment** (recommended)

### For Frontend (Ionic Angular)

- **Node.js 18+**
- **npm** or **yarn** package manager
- **Ionic CLI** (will be installed globally)

## 📦 Installation & Setup

### 1. Backend Setup (Django)

#### Navigate to Django directory and activate virtual environment:

```bash
cd django/backend
```

#### If you need to create a virtual environment:

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

#### Install Django dependencies:

```bash
pip install django
pip install djangorestframework
pip install django-cors-headers
```

#### Run Django migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

#### Start Django development server:

```bash
python manage.py runserver
```

The Django API will be available at: `http://localhost:8000`

### 2. Frontend Setup (Ionic Angular)

#### Navigate to the frontend directory:

```bash
cd travel-planner
```

#### Install Node.js dependencies:

```bash
npm install
```

#### Install Ionic CLI globally (if not already installed):

```bash
npm install -g @ionic/cli
```

#### Start the Ionic development server:

```bash
ionic serve
```

The frontend application will be available at: `http://localhost:4200`

## 🔧 API Endpoints

The Django backend provides the following REST API endpoints:

### Authentication

- `POST /api/signup/` - User registration
- `POST /api/login/` - User login

### Hotel Booking

- `POST /api/book-hotel/` - Book a hotel

### Food Ordering

- `POST /api/order-food/` - Order food items

### User Orders

- `GET /api/my-orders/?email={email}` - Get user's booking and order history

## 📱 Application Pages

The Ionic frontend includes the following pages:

1. **Home** (`/home`) - Main landing page
2. **Frontpage** (`/frontpage`) - Welcome page
3. **Login** (`/login`) - User authentication
4. **Signup** (`/signup`) - User registration
5. **Hotel Booking** (`/hotel-booking`) - Book hotels
6. **Food Order** (`/food-order`) - Order food
7. **Restaurant** (`/restaurant`) - Restaurant information
8. **Tourist Spot** (`/tourist-spot`) - Tourist attractions
9. **Route** (`/route`) - Route planning
10. **Product** (`/product`) - Product details
11. **Plan Results** (`/plan-results`) - Display booking results

## 🗄️ Database Models

### UserSignup

- User registration with username, email, phone, gender, and password

### HotelBooking

- Hotel booking information including customer details, hotel name, pricing, and dates

### FoodOrder

- Food ordering with customer details, food items, quantity, and pricing

## 🔌 API Service Integration

The frontend uses a centralized `ApiService` that provides:

- **HTTP POST wrapper** (`call_http_post`) for making API calls
- **Specific methods** for each API endpoint:
  - `signup()` - User registration
  - `login()` - User authentication
  - `bookHotel()` - Hotel booking
  - `orderFood()` - Food ordering
  - `getUserOrders()` - Retrieve user orders

## 🚀 Running the Application

### 🎯 **SIMPLE STARTUP (Recommended)**

#### **Option 1: Direct Script (macOS/Linux)**

```bash
./start.sh
```

#### **Option 2: Direct Script (Windows)**

```bash
start.bat
```

#### **Option 3: Using npm (All Platforms)**

```bash
npm start
```

**That's it!** The script will automatically:

- ✅ Check prerequisites (Python, Node.js, npm)
- ✅ Create virtual environment if needed
- ✅ Install all dependencies
- ✅ Start both Django backend and Ionic frontend
- ✅ Open the application in your browser

**Access the application:**

- 📱 Frontend: http://localhost:4200
- 🔧 Backend API: http://localhost:8000
- ⚙️ Django Admin: http://localhost:8000/admin

---

### Manual Startup (Alternative)

If you prefer to start servers manually:

1. **Start the Backend** (Terminal 1):

```bash
cd django/backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python manage.py runserver
```

2. **Start the Frontend** (Terminal 2):

```bash
cd travel-planner
ionic serve
```

3. **Access the Application**:
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8000
   - Django Admin: http://localhost:8000/admin

### Production Build

#### Build the frontend:

```bash
cd travel-planner
ionic build --prod
```

#### Deploy Django backend:

```bash
cd django/backend
python manage.py collectstatic
python manage.py runserver 0.0.0.0:8000
```

## 🔧 Configuration

### Backend Configuration

- Database: SQLite (development) / MySQL (production)
- CORS: Configured for frontend integration
- Debug: Enabled for development

### Frontend Configuration

- API Base URL: `http://localhost:8000/api`
- Environment files for different deployment stages
- Ionic configuration for mobile deployment

## 📱 Mobile Deployment

### Build for Android:

```bash
cd travel-planner
ionic capacitor add android
ionic capacitor build android
```

### Build for iOS:

```bash
cd travel-planner
ionic capacitor add ios
ionic capacitor build ios
```

## 🛠️ Development Tools

### Backend Development

- **Django Admin**: Access at `/admin` for database management
- **Django Debug Toolbar**: For debugging (if installed)
- **SQLite Browser**: For database inspection

### Frontend Development

- **Ionic DevTools**: Browser extension for debugging
- **Angular DevTools**: Browser extension for Angular debugging
- **Chrome DevTools**: For mobile testing

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**:

   - Change Django port: `python manage.py runserver 8001`
   - Change Ionic port: `ionic serve --port 4201`

2. **CORS errors**:

   - Ensure Django CORS headers are properly configured
   - Check that frontend URL is in `ALLOWED_HOSTS`

3. **Database issues**:

   - Run migrations: `python manage.py migrate`
   - Reset database: `python manage.py flush`

4. **Node modules issues**:
   - Clear cache: `npm cache clean --force`
   - Reinstall: `rm -rf node_modules && npm install`

## 📝 Environment Variables

Create a `.env` file in the Django backend directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:

- Check the Django documentation: https://docs.djangoproject.com/
- Check the Ionic documentation: https://ionicframework.com/docs/
- Check the Angular documentation: https://angular.io/docs/

---

**Happy Travel Planning! 🌍✈️**
