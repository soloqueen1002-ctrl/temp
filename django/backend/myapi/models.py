from django.db import models
from django.utils import timezone

# -----------------------
# USER SIGNUP MODEL
# -----------------------
class UserSignup(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    gender = models.CharField(max_length=10)
    flag = models.IntegerField(default=0)  # 0 = active, 1 = deleted
    set_date = models.DateTimeField(default=timezone.now)
    update_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

# -----------------------
# HOTEL BOOKING MODEL
# -----------------------
class HotelBooking(models.Model):
    id = models.AutoField(primary_key=True)
    customer_name = models.CharField(max_length=100)
    customer_email = models.EmailField()
    phone = models.CharField(max_length=15)
    address = models.TextField()
    hotel_name = models.CharField(max_length=100)
    hotel_price = models.DecimalField(max_digits=10, decimal_places=2)
    check_in = models.DateField()
    check_out = models.DateField()
    order_date = models.DateTimeField(default=timezone.now)
    update_date = models.DateTimeField(auto_now=True)
    flag = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.customer_name} - {self.hotel_name}"

# -----------------------
# FOOD ORDERING MODEL
# -----------------------
class FoodOrder(models.Model):
    id = models.AutoField(primary_key=True)
    customer_name = models.CharField(max_length=100)
    customer_email = models.EmailField()
    phone = models.CharField(max_length=15)
    address = models.TextField()
    food_item = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=1)
    food_price = models.DecimalField(max_digits=10, decimal_places=2)
    order_date = models.DateTimeField(default=timezone.now)
    update_date = models.DateTimeField(auto_now=True)
    flag = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.customer_name} - {self.food_item}"
