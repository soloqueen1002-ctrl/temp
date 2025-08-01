#!/usr/bin/env python3
"""
Test script to verify MySQL database connection
Run this script to check if Django can connect to MySQL
"""

import os
import sys
import django

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.db import connection
from django.core.management import execute_from_command_line

def test_connection():
    """Test if Django can connect to MySQL database"""
    try:
        # Test the connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
            print("✅ Database connection successful!")
            print(f"Query result: {result}")
            
            # Check if our database exists
            cursor.execute("SHOW DATABASES LIKE 'travel-planner'")
            databases = cursor.fetchall()
            if databases:
                print("✅ Database 'travel-planner' exists")
            else:
                print("❌ Database 'travel-planner' does not exist")
                print("Please create the database in phpMyAdmin")
                
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        print("\nTroubleshooting tips:")
        print("1. Make sure WAMP Server is running (green icon)")
        print("2. Check if MySQL service is started")
        print("3. Verify database name is 'travel-planner'")
        print("4. Check if port 3306 is not blocked")

def check_tables():
    """Check if our tables exist"""
    try:
        with connection.cursor() as cursor:
            cursor.execute("SHOW TABLES")
            tables = cursor.fetchall()
            table_names = [table[0] for table in tables]
            
            print(f"\n📋 Available tables: {table_names}")
            
            # Check for our specific tables
            expected_tables = ['myapi_usersignup', 'myapi_hotelbooking', 'myapi_foodorder']
            for table in expected_tables:
                if table in table_names:
                    print(f"✅ Table '{table}' exists")
                else:
                    print(f"❌ Table '{table}' does not exist")
                    
    except Exception as e:
        print(f"❌ Error checking tables: {e}")

if __name__ == "__main__":
    print("🔍 Testing MySQL Database Connection...")
    print("=" * 50)
    
    test_connection()
    check_tables()
    
    print("\n" + "=" * 50)
    print("💡 If connection fails, make sure:")
    print("   - WAMP Server is running")
    print("   - MySQL service is started")
    print("   - Database 'travel-planner' exists")
    print("   - Run 'python manage.py migrate' after connection is established") 