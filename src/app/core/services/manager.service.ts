import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { Manager } from 'models';
import { mockManagers } from 'mocks';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(private http: HttpClient) {}

  getManagers() {
    return of({ managers: mockManagers });
    //return this.http.get<{ managers: Manager[] }>('/api/manager/list');
  }
}
