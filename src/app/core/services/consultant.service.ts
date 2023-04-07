import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { mockConsultantsWithReviewers } from '@mocks';
import { ConsultantsWithReviewer } from '@models';

@Injectable({
  providedIn: 'root',
})
export class ConsultantService {
  constructor(private http: HttpClient) {}

  getConsultants(): Observable<ConsultantsWithReviewer[]> {
    return of(mockConsultantsWithReviewers);
  }
}
