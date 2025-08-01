from django.urls import path
from .views import (
    signup_view,
    login_view,
    hotel_booking_view,
    food_order_view,
    get_user_orders,
)

urlpatterns = [
    path('api/signup/', signup_view, name='signup'),                # User signup
    path('api/login/', login_view, name='login'),                  # User login
    path('api/book-hotel/', hotel_booking_view, name='book_hotel'),# Hotel booking
    path('api/order-food/', food_order_view, name='order_food'),   # Food ordering
    path('api/my-orders/', get_user_orders, name='my_orders'),     # Get orders by user
]
