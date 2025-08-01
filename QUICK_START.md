# 🚀 Quick Start Guide

## **ONE COMMAND TO START EVERYTHING!**

### **For macOS/Linux:**

```bash
./start.sh
```

### **For Windows:**

```bash
start.bat
```

### **Using npm (All Platforms):**

```bash
npm start
```

---

## **What happens automatically:**

1. ✅ **Checks prerequisites** (Python, Node.js, npm)
2. ✅ **Creates virtual environment** (if needed)
3. ✅ **Installs all dependencies** (Django, Ionic, etc.)
4. ✅ **Runs database migrations**
5. ✅ **Starts Django backend** (http://localhost:8000)
6. ✅ **Starts Ionic frontend** (http://localhost:4200)
7. ✅ **Opens application** in your browser

---

## **Access your application:**

- 📱 **Frontend**: http://localhost:4200
- 🔧 **Backend API**: http://localhost:8000
- ⚙️ **Django Admin**: http://localhost:8000/admin

---

## **To stop the application:**

- Press `Ctrl+C` in the terminal (macOS/Linux)
- Close the command window (Windows)

---

## **Troubleshooting:**

If you get permission errors on macOS/Linux:

```bash
chmod +x start.sh
./start.sh
```

If ports are already in use:

- The script will automatically handle this
- Or manually change ports in the script files

---

**That's it! Your travel planner application is ready to use! 🎉**
