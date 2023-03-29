import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ConsultantsWithReviewer } from 'models';
import { mockConsultantsWithReviewers } from '../mocks/consultantsWithReviewer';

@Injectable({
  providedIn: 'root',
})
export class ConsultantService {
  constructor(private http: HttpClient) {}

  getConsultants(managerId?: string): Observable<ConsultantsWithReviewer[]> {
    return of(mockConsultantsWithReviewers);
  }
}
