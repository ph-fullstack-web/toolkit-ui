import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Manager } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(private http: HttpClient) {}

  getManagers() {
    return this.http.get<{ managers: Manager[] }>('/api/manager/list');
  }
}
