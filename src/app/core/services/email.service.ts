import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  SendEmailToReviewersData,
  SendEmailToReviewersResponse,
} from '@models';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendEmailToReviewers(data: SendEmailToReviewersData = {}) {
    const formData = new FormData();

    for (const key in data) {
      const value = data[key as keyof SendEmailToReviewersData];

      if (value) formData.append(key, value!);
    }

    return this.http.post<SendEmailToReviewersResponse>(
      '/api/consultant/emailreviewers',
      formData,
      {
        headers: new HttpHeaders().delete('Content-Type'),
      }
    );
  }
}
