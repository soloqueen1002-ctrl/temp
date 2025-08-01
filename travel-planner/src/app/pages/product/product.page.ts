import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: false,
})
export class ProductPage {
  searchQuery = '';
  filter = 'all';

  booking = {
    name: '',
    email: '',
    phone: '',
    destination: '',
    budget: ''
  };

    hotels = [
    { name: 'Hotel Ocean View', image: 'assets/hotel ocean view.jpg', price: 3000, description: 'Sea-facing rooms with modern amenities.' },
    { name: 'Mountain Top Inn', image: 'assets/hotel2.jpg', price: 2500, description: 'A peaceful hill resort with panoramic views.' },
    { name: 'City Lights Hotel', image: 'assets/hotel3.jpg', price: 3200, description: 'Modern hotel in the heart of the city.' },
    { name: 'Desert Palace', image: 'assets/hotel4.jpg', price: 2800, description: 'Experience royalty in the sands of Rajasthan.' },
    { name: 'Rainforest Retreat', image: 'assets/hotel5.jpg', price: 2600, description: 'Eco-luxury stay in a tropical rainforest.' },
    { name: 'Lakeside Residency', image: 'assets/hotel6.jpg', price: 2900, description: 'Peaceful lake view rooms with boating access.' },
    { name: 'Heritage Haveli', image: 'assets/hotel7.jpg', price: 3100, description: 'Traditional Rajasthani palace converted to hotel.' },
    { name: 'Skyline Towers', image: 'assets/hotel8.jpg', price: 3300, description: 'Luxury rooms on high-rise floors with rooftop dining.' }
  ];

  foods = [
    { name: 'South Indian Thali', image: 'assets/food.jpg', price: 400, description: 'Authentic Tamil Nadu-style meal.' },
    { name: 'Sushi Roll', image: 'assets/sushi.jpg', price: 600, description: 'Fresh and delicious Japanese sushi.' },
    { name: 'Punjabi Butter Chicken', image: 'assets/butterchicken.jpg', price: 450, description: 'Rich, spicy and flavorful chicken dish.' },
    { name: 'Italian Pasta Combo', image: 'assets/pasta.jpg', price: 500, description: 'Creamy pasta served with garlic bread.' },
    { name: 'Arabic Shawarma', image: 'assets/shawarma.jpg', price: 350, description: 'Juicy grilled chicken wrapped in pita bread.' },
    { name: 'Chinese Fried Rice & Manchurian', image: 'assets/chinese.jpg', price: 400, description: 'A tangy Indo-Chinese combo meal.' },
    { name: 'Mexican Tacos', image: 'assets/tacos.jpg', price: 380, description: 'Crispy tacos loaded with spicy filling.' },
    { name: 'Continental Breakfast', image: 'assets/breakfast.jpg', price: 300, description: 'Eggs, toast, fruits, and coffee.' }
  ];

  touristSpots = [
    { name: 'Taj Mahal', image: 'assets/taj.jpg', description: 'A symbol of eternal love in Agra.' },
    { name: 'Mount Fuji', image: 'assets/fuji.jpg', description: 'Scenic peak with hiking trails in Japan.' },
    { name: 'Grand Canyon', image: 'assets/canyon.jpg', description: 'Breathtaking canyon views in the USA.' },
    { name: 'Eiffel Tower', image: 'assets/eiffel.jpg', description: 'Iconic tower with panoramic Paris views.' },
    { name: 'Great Wall of China', image: 'assets/greatwall.jpg', description: 'Historic world wonder stretching across China.' },
    { name: 'Statue of Liberty', image: 'assets/liberty.jpg', description: 'Historic symbol of freedom in New York City.' },
    { name: 'Niagara Falls', image: 'assets/niagara.jpg', description: 'Majestic waterfalls on the US-Canada border.' },
    { name: 'Santorini Cliffs', image: 'assets/santorini.jpg', description: 'Greece’s iconic white buildings and blue sea.' }
  ];

  routes = [
    { name: 'Golden Triangle', description: 'Delhi-Agra-Jaipur circuit, ideal for history lovers.' },
    { name: 'Goa Beach Drive', description: 'Scenic routes across coastal Goa.' },
    { name: 'Himalayan Adventure Trail', description: 'A serene drive through the snow-covered Himalayas.' },
    { name: 'Kerala Backwater Route', description: 'A relaxing cruise through Alleppey and Kumarakom.' },
    { name: 'Rajasthan Desert Safari', description: 'Explore sand dunes and heritage forts.' },
    { name: 'Leh-Ladakh Road Trip', description: 'Bikers’ dream with snow, passes, and mountains.' },
    { name: 'Andaman Coastal Drive', description: 'Seaside ride with ferry stops and beach views.' },
    { name: 'North East Silk Route', description: 'Remote hilly roads from Sikkim to Arunachal.' }
  ];

  restaurants = [
    { name: 'Spicy Bites', image: 'assets/restaurant.jpg', specialty: 'Multi-cuisine family dining.' },
    { name: 'Cafe Bloom', image: 'assets/cafe.jpg', specialty: 'Vegan delights and live music ambiance.' },
    { name: 'Royal Tandoor', image: 'assets/tandoor.jpg', specialty: 'Authentic North Indian kebabs and biryanis.' },
    { name: 'Ocean Deck', image: 'assets/oceandeck.jpg', specialty: 'Seafood specialities with beach view dining.' },
    { name: 'The Urban Plate', image: 'assets/urbanplate.jpg', specialty: 'Fusion cuisine in a stylish setting.' },
    { name: 'Bistro Blue', image: 'assets/bistro.jpg', specialty: 'Casual European café with fresh bakes.' },
    { name: 'Spice Street', image: 'assets/spice.jpg', specialty: 'Street food inspired gourmet meals.' },
    { name: 'Heritage Bhojanalay', image: 'assets/bhojanalay.jpg', specialty: 'Traditional Indian thalis in rustic decor.' }
  ];
  viewItem(type: string, item: any) {
    this.router.navigate([`/${type}`], { state: { item } });
  }

  get filteredHotels() {
    return this.hotels.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  get filteredFoods() {
    return this.foods.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  get filteredSpots() {
    return this.touristSpots.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  get filteredRoutes() {
    return this.routes.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  get filteredRestaurants() {
    return this.restaurants.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  constructor(private apiService: ApiService, private router: Router) {}

  selectOption(type: string, name: string, price: number) {
  if (type === 'hotel') {
    this.router.navigate(['/hotel-booking'], {
      queryParams: { name, price }
    });
  } else if (type === 'food') {
    this.router.navigate(['/food-order'], {
      queryParams: { name, price }
    });
  } else if (type === 'spot') {
    this.router.navigate(['/tourist-spot'], {
      queryParams: { name, price }
    });
  } else if (type === 'route') {
    this.router.navigate(['/route'], {
      queryParams: { name, price }
    });
  } else if (type === 'restaurant') {
    this.router.navigate(['/restaurant'], {
      queryParams: { name, price }
    });
  }
}

  submitBooking() {
    this.apiService.storeBooking(this.booking).subscribe({
      next: (res) => alert('Booking saved successfully!'),
      error: (err) => {
        console.error('Booking failed:', err);
        alert('Booking failed!');
      }
    });
  }
}
