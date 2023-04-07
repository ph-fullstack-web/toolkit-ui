import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error));
  }

  get<TResponse>(path: string, params: HttpParams = new HttpParams()): Observable<TResponse> {
    return this.http.get<TResponse>(`${environment.api_url}${path}`, { params }).pipe(catchError(this.formatErrors));
  }

  put<TResponse>(path: string, body?: unknown): Observable<TResponse> {
    return this.http
      .put<TResponse>(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  post<TResponse>(path: string, body?: unknown): Observable<TResponse> {
    return this.http
      .post<TResponse>(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  delete<TResponse>(path: string): Observable<TResponse> {
    return this.http.delete<TResponse>(`${environment.api_url}${path}`).pipe(catchError(this.formatErrors));
  }
}
