import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, retry, catchError, timeout } from 'rxjs';
import { Course, ContactForm, InstituteInfo } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly publicUrl = environment.publicApiUrl;
  private readonly timeout = 10000; // 10 seconds

  // Course-related API calls
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.publicUrl}/courses`).pipe(
      timeout(this.timeout),
      retry(2),
      catchError(this.handleError)
    );
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.publicUrl}/courses/${id}`).pipe(
      timeout(this.timeout),
      retry(2),
      catchError(this.handleError)
    );
  }

  // Contact form submission
  submitContactForm(contactForm: ContactForm): Observable<any> {
    return this.http.post(`${this.publicUrl}/contact`, contactForm).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  // Institute information
  getInstituteInfo(): Observable<InstituteInfo> {
    return this.http.get<InstituteInfo>(`${this.publicUrl}/institute-info`).pipe(
      timeout(this.timeout),
      retry(2),
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 0:
          errorMessage = 'Unable to connect to server. Please check your connection.';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          break;
        case 500:
          errorMessage = 'Internal server error. Please try again later.';
          break;
        default:
          errorMessage = `Server Error: ${error.status} - ${error.message}`;
      }
    }
    
    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}