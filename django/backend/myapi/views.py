# myapp/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from .models import UserSignup, HotelBooking, FoodOrder
import json

# ✅ Signup
@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('name')  # Changed from 'name' to 'username'
            email = data.get('email')
            phone = data.get('phone')
            gender = data.get('gender')
            password = data.get('password')

            if UserSignup.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already exists'}, status=400)

            UserSignup.objects.create(
                username=username,  # Fixed field name
                email=email,
                phone=phone,
                gender=gender,
                password=password,  # Plain text for now (can hash later)
                set_date=timezone.now()  # Fixed field name
            )

            return JsonResponse({'message': 'Signup successful'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# ✅ Login
@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            user = UserSignup.objects.filter(email=email, password=password).first()

            if user:
                return JsonResponse({'message': 'Login successful'}, status=200)
            else:
                return JsonResponse({'error': 'Invalid email or password'}, status=401)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# ✅ Hotel Booking
@csrf_exempt
def hotel_booking_view(request):  # Fixed function name
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            HotelBooking.objects.create(
                customer_name=data['name'],  # Fixed field name
                customer_email=data['email'],  # Fixed field name
                phone=data['phone'],
                address=data['address'],
                hotel_name=data['hotel_name'],
                hotel_price=data['hotel_price'],
                check_in=data.get('check_in'),  # Added missing required fields
                check_out=data.get('check_out'),
                order_date=timezone.now()  # Fixed field name
            )
            return JsonResponse({'message': 'Hotel booked successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# ✅ Food Ordering
@csrf_exempt
def food_order_view(request):  # Fixed function name
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            FoodOrder.objects.create(
                customer_name=data['name'],  # Fixed field name
                customer_email=data['email'],  # Fixed field name
                phone=data['phone'],
                address=data['address'],
                food_item=data['food_name'],  # Fixed field name
                quantity=data.get('quantity', 1),  # Added quantity field
                food_price=data['food_price'],
                order_date=timezone.now()  # Fixed field name
            )
            return JsonResponse({'message': 'Food ordered successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# ✅ Get User Orders - Added missing function
@csrf_exempt
def get_user_orders(request):
    if request.method == 'GET':
        try:
            email = request.GET.get('email')
            if not email:
                return JsonResponse({'error': 'Email parameter required'}, status=400)
            
            # Get hotel bookings
            hotel_bookings = HotelBooking.objects.filter(
                customer_email=email, 
                flag=0
            ).values('hotel_name', 'hotel_price', 'check_in', 'check_out', 'order_date')
            
            # Get food orders
            food_orders = FoodOrder.objects.filter(
                customer_email=email, 
                flag=0
            ).values('food_item', 'quantity', 'food_price', 'order_date')
            
            return JsonResponse({
                'hotel_bookings': list(hotel_bookings),
                'food_orders': list(food_orders)
            }, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)
