import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Card, Tab } from '../../models/response-models';
import { TabsService } from '../../services/cards.service';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'app-tab-switcher',
  standalone: true,
  imports: [CardListComponent],
  templateUrl: './tab-switcher.component.html',
  styleUrl: './tab-switcher.component.scss',
})
export class TabSwitcherComponent {
  private tabService = inject(TabsService);

  tabs = signal<Tab[]>([]);
  activeTabId = signal<string | null>(null);
  isLoading = signal(true);
  activeTabCards = computed(this.getActiveTabCards.bind(this));

  constructor() {
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

    this.tabService
      .getTabs()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (response) => {
          this.tabs.set(response.tabs);
          if (response.tabs.length > 0) {
            this.activeTabId.set(response.tabs[0].id);
          }
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }

  setActiveTab(tabId: string) {
    if (
      this.tabs().some(function (tab) {
        return tab.id === tabId;
      })
    ) {
      this.activeTabId.set(tabId);
    }
  }
}
