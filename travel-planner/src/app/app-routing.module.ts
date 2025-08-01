import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'frontpage',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'frontpage',
    loadChildren: () => import('./pages/frontpage/frontpage.module').then( m => m.FrontpagePageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'plan-results',
    loadChildren: () => import('./pages/plan-results/plan-results.module').then( m => m.PlanResultsPageModule)
  },
  {
    path: 'hotel-booking',
    loadChildren: () => import('./pages/hotel-booking/hotel-booking.module').then( m => m.HotelBookingPageModule)
  },
  {
    path: 'food-order',
    loadChildren: () => import('./pages/food-order/food-order.module').then( m => m.FoodOrderPageModule)
  },
  {
    path: 'tourist-spot',
    loadChildren: () => import('./pages/tourist-spot/tourist-spot.module').then( m => m.TouristSpotPageModule)
  },
  {
    path: 'route',
    loadChildren: () => import('./pages/route/route.module').then( m => m.RoutePageModule)
  },
  {
    path: 'restaurant',
    loadChildren: () => import('./pages/restaurant/restaurant.module').then( m => m.RestaurantPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
