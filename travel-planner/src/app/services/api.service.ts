// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpContext } from '@angular/common/http'; // Import HttpContext
import { Observable, Subscription, of } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';

// Define interfaces for better type safety, as seen in your PPT
interface GenericJSONobj {
  [key: string]: any;
}

interface PostDataType {
  url: string;
  modname: string;
  actionName?: string;
  isFormData?: boolean;
  data?: FormData | GenericJSONobj;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  successCb?: (response: any) => void;
  errorCb?: (error: any) => void;
  afterError?: (error: any) => void;
  completeCb?: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Backend API base URL
  private readonly API_BASE_URL = 'http://localhost:8000/api';

  // You might want to get this from a proper authentication service
  // or a global state management. For now, a placeholder.
  private get_session_id_login(): string {
    // Replace with actual logic to retrieve session ID or auth token
    return 'Bearer your_auth_token_here';
  }

  // Placeholder for a global spinner control
  private show_spinner: boolean = false;

  constructor(private http: HttpClient) {}

  // Placeholder for default error handler
  private defaultErrHandler(error: any, afterErrorCallback?: () => void) {
    console.error('Default Error Handler:', error);
    // You might want to use Ionic's AlertController or ToastController here
    // For example: this.alertController.create(...)
    if (afterErrorCallback) {
      afterErrorCallback();
    }
  }

  // Placeholder for default complete handler
  private defaultCompleteHandler(): void {
    console.log('Request completed.');
  }

  /**
   * Performs an HTTP POST request based on the provided PostDataType object.
   * This method mimics the structure and logic from your mentor's PPT.
   *
   * @param postObj - An object containing details for the POST request (url, data, callbacks, etc.).
   * @param control_spinner_locally - A boolean to control the spinner visibility locally.
   * @returns A Subscription to the HTTP request.
   */
  call_http_post(
    postObj: PostDataType,
    control_spinner_locally: boolean = false // Default to false as in PPT
  ): Subscription {
    const {
      url,
      modname,
      actionName,
      isFormData = false, // Default to false as in PPT
      responseType,
      successCb = (response: any) => {
        console.log('Success (default):', response);
      }, // Default success callback
      errorCb,
      afterError,
      completeCb = () => this.defaultCompleteHandler(), // Default complete callback
    } = postObj;

    let data: FormData | GenericJSONobj | undefined = postObj.data;

    if (!data) {
      if (isFormData) {
        data = new FormData();
      } else {
        data = {};
      }
    }

    if (isFormData) {
      // Ensure data is FormData for these operations
      const formDataData = data as FormData;
      if (!formDataData.get('modname')) {
        formDataData.append('modname', modname);
      }
      if (!formDataData.get('actionName')) {
        formDataData.append('actionName', actionName || modname); // Use modname if actionName is not provided
      }
    } else {
      // Ensure data is GenericJSONobj for these operations
      const jsonObjectData = data as GenericJSONobj;
      if (!('modname' in jsonObjectData)) {
        data = { ...jsonObjectData, modname };
      }
      if (!('actionName' in jsonObjectData)) {
        data = { ...data, actionName: actionName || modname }; // Use modname if actionName is not provided
      }
    }

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: this.get_session_id_login(),
      // 'Content-Type' is usually set automatically by HttpClient for JSON,
      // but explicitly setting it for non-FormData requests as per PPT.
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    });

    // Fix for TS2769: Use the correct HttpClient.post overload.
    // When 'data' is an object, HttpClient expects 'responseType' to be 'json' by default.
    // If we want other response types, we need to explicitly cast or use a different overload.
    // The safest way to allow flexible responseType with an object body is to use the
    // HttpClient.post<any>(url, body, options) overload and pass the options as 'any'.
    const requestOptions: {
      headers?: HttpHeaders;
      context?: HttpContext;
      observe?: 'body';
      params?: any; // HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; };
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'; // This is the key property
      withCredentials?: boolean;
      transferCache?: boolean;
    } = {
      headers: headers,
    };

    if (responseType) {
      requestOptions.responseType = responseType;
    }

    let errorHandlerCb: (error: any) => void = (error: any) => {}; // Initialize with a no-op function

    if (errorCb && !afterError) {
      errorHandlerCb = (err: any) => {
        this.defaultErrHandler(err);
        errorCb(err); // Call the provided errorCb
      };
    } else if (errorCb) {
      errorHandlerCb = errorCb; // Use the provided errorCb directly
    } else if (afterError) {
      errorHandlerCb = (error: any) => {
        this.defaultErrHandler(error, () => {
          afterError(error); // Call the provided afterError callback
        });
      };
    } else {
      // Fallback if no specific error handling is provided
      errorHandlerCb = (error: any) => {
        this.defaultErrHandler(error);
      };
    }

    if (!control_spinner_locally) {
      this.show_spinner = true; // Show spinner
    }

    // Explicitly cast requestOptions to 'any' to satisfy the HttpClient.post overload
    // when responseType might not be 'json' but data is an object.
    return this.http
      .post<any>(url, data, requestOptions as any) // Cast to any to resolve TS2769
      .pipe(
        finalize(() => {
          if (!control_spinner_locally) {
            this.show_spinner = false; // Hide spinner
          }
          completeCb(); // Call the complete callback
        }),
        catchError((err: any) => {
          // Explicitly type err here
          // Re-throw the error after handling it, so the subscriber's errorCb is still called
          errorHandlerCb(err);
          return new Observable((observer) => observer.error(err)); // Re-throw the error
        })
      )
      .subscribe({
        next: successCb,
        error: (err: any) => {
          // Explicitly type err here
          // This error handler will only be called if catchError re-throws or doesn't handle it.
          console.error('Subscription error handler:', err);
        },
      });
  }

  /**
   * User signup method
   */
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/signup/`, userData);
  }

  /**
   * User login method
   */
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/login/`, credentials);
  }

  /**
   * Hotel booking method
   */
  bookHotel(bookingData: any): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/book-hotel/`, bookingData);
  }

  /**
   * Food ordering method
   */
  orderFood(foodData: any): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/order-food/`, foodData);
  }

  /**
   * Get user orders method
   */
  getUserOrders(email: string): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/my-orders/?email=${email}`);
  }

  /**
   * A specific method to store booking data, wrapping call_http_post.
   * This addresses the 'storeBooking' method not found error.
   *
   * @param bookingData - The booking object to store.
   * @returns An Observable of the API response.
   */
  storeBooking(bookingData: any): Observable<any> {
    return this.bookHotel(bookingData);
  }
}
