import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
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
  private router = inject(Router)
  private dashboardService = inject(DashboardService);
  private destroyRef = inject(DestroyRef);

  tabs = signal<Tab[]>([]);
  isLoading = signal(true);
  dashboardId = signal<string | null>(null);
  activeTabId = signal<string | null>(null);
  activeTabCards = computed(this.getActiveTabCards.bind(this));

  constructor() {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    this.route.paramMap.subscribe(paramMap => {
      const dashboardId = paramMap.get('dashboardId');
      const tabId = paramMap.get('tabId');

      this.dashboardId.set(dashboardId);
      this.activeTabId.set(tabId);
      this.loadTabs();
    });

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
    const id = this.dashboardId();
    const tabId = this.activeTabId();
    if (!id || !tabId) return;

    this.isLoading.set(true);
    this.dashboardService.getDashboardTabs(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(response => {
          this.tabs.set(response.tabs);
          if (!response.tabs.find(tab => tab.id === tabId)) {
            // если tabId не найден, ставим первый
            this.activeTabId.set(response.tabs[0]?.id ?? null);
          }
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe();
  }

  onTabButton(tabId: string) {
    this.router.navigate([`dashboard`, this.dashboardId(), tabId]);
  }
}
