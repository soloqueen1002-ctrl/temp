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
            name = data.get('name')
            email = data.get('email')
            phone = data.get('phone')
            gender = data.get('gender')
            password = data.get('password')

            if UserSignup.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already exists'}, status=400)

            UserSignup.objects.create(
                name=name,
                email=email,
                phone=phone,
                gender=gender,
                password=password,  # Plain text for now (can hash later)
                created_at=timezone.now()
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
def book_hotel(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            HotelBooking.objects.create(
                name=data['name'],
                email=data['email'],
                phone=data['phone'],
                address=data['address'],
                hotel_name=data['hotel_name'],
                hotel_price=data['hotel_price'],
                booking_date=timezone.now()
            )
            return JsonResponse({'message': 'Hotel booked successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# ✅ Food Ordering
@csrf_exempt
def order_food(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            FoodOrder.objects.create(
                name=data['name'],
                email=data['email'],
                phone=data['phone'],
                address=data['address'],
                food_name=data['food_name'],
                food_price=data['food_price'],
                order_time=timezone.now()
            )
            return JsonResponse({'message': 'Food ordered successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)
