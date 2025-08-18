import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { Card, Tab } from '../../models/api.model';
import { DashboardService } from '../../services/dashboard.service';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  private route = inject(ActivatedRoute)
  private dashboardService = inject(DashboardService);

  private params = toSignal(this.route.paramMap);
  //TODO
  // здесь нужно брать изURL параметры и смотреть какой дашборд и какую его вкладку показывать

  tabs = signal<Tab[]>([]);
  isLoading = signal(true);
  dashboardId = signal<string | null>(null);
  activeTabId = signal<string | null>(null);
  activeTabCards = computed(this.getActiveTabCards.bind(this));

  constructor() {

    // Подписка на изменения параметров маршрута
    this.route.paramMap.subscribe(paramMap => {
      const dashboardId = paramMap.get('dashboardId');
      const tabId = paramMap.get('tabId');

      this.dashboardId.set(dashboardId);
      this.activeTabId.set(tabId);

      console.log('DashboardId:', dashboardId, 'TabId:', tabId);
    });

    this.loadTabs();

  }

  private getActiveTabCards(): Card[] {
    const activeId = this.activeTabId();
    if (!activeId) return [];
    const foundTab = this.tabs().find(function (tab) {
      return tab.id === activeId;
    });
    return foundTab?.cards || [];
  }

  loadTabs() {
    this.isLoading.set(true);

    const id = this.dashboardId();
    const tabId = this.activeTabId();
    if (!id || !tabId) return;

    this.dashboardService.getDashboardTabs(id)
      .pipe(
        takeUntilDestroyed(),
        tap(response => {
          this.tabs.set(response.tabs);
          this.activeTabId.set(tabId);
          this.isLoading.set(false);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe();
  }

  setActiveTab(tabId: string) {
    const isValidId = this.tabs().some(function (tab) {
      return tab.id === tabId;
    })
    if (isValidId) {
      this.activeTabId.set(tabId);
    }
  }
}
