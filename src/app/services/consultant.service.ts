import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConsultantsWithReviewer } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class ConsultantService {
  constructor(private http: HttpClient) {}

  getConsultants(managerId?: string) {
    const params = managerId ? { managerId } : undefined;

    return this.http.get<ConsultantsWithReviewer[]>(
      '/api/consultant/reviewers',
      {
        params,
      }
    );
  }
}
