import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { MOCK_DATA } from '../../assets/mock-data';
import { ResponseTabs } from '../models/response-models';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  private mockTabs: ResponseTabs = MOCK_DATA;

  constructor() {}

  getTabs() {
    return of(this.mockTabs).pipe(delay(800));
  }

  getTabById(id: string) {
    return of(this.mockTabs.tabs.find((tab) => tab.id === id)).pipe(delay(300));
  }
}
