# 🚀 Manual Startup for Windows

## **Option 1: Use the Simple Script**

```cmd
start-simple.bat
```

## **Option 2: Manual Startup (Most Reliable)**

### **Step 1: Start Django Backend**

Open **Command Prompt 1** and run:

```cmd
cd django\backend
python -m venv venv
venv\Scripts\activate.bat
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
```

### **Step 2: Start Ionic Frontend**

Open **Command Prompt 2** and run:

```cmd
cd travel-planner
npm install
npm install -g @ionic/cli
ionic serve
```

### **Step 3: Access Your Application**

- **Frontend**: http://localhost:4200
- **Backend**: http://localhost:8000

## **Option 3: PowerShell (Alternative)**

```powershell
# Terminal 1 - Backend
cd django\backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver

# Terminal 2 - Frontend
cd travel-planner
npm install
npm install -g @ionic/cli
ionic serve
```

## **To Stop Servers:**

- Press `Ctrl+C` in each terminal window
- Or close the terminal windows

---

**This manual approach is the most reliable way to start your application on Windows! 🎉**
