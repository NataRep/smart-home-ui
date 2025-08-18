import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard, DashboardTabs, Device } from '../models/api.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private http = inject(HttpClient);

  getDashboards(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>('dashboards');
  }

  createDashboard(data: Dashboard): Observable<Dashboard> {
    return this.http.post<Dashboard>('dashboards', data)
  }

  getDashboardTabs(id: string): Observable<DashboardTabs> {
    return this.http.get<DashboardTabs>(`dashboards/${id}`);
  }

  putDashboardTabs(id: string, data: DashboardTabs): Observable<DashboardTabs> {
    return this.http.put<DashboardTabs>(`dashboards/${id}`, data);
  }

  deleteDashboardById(id: string): Observable<void> {
    return this.http.delete<void>(`dashboards/${id}`);
  }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`devices`);
  }

  changeStateDeviceById(id: string, state: boolean): Observable<Device> {
    const body = { state };
    return this.http.patch<Device>(`devices/${id}`, body);
  }
}