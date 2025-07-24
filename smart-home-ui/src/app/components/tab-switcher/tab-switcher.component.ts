import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
export class TabSwitcherComponent implements OnInit {
  private tabService = inject(TabsService);
  tabs = signal<Tab[]>([]);
  activeTabId = signal<string | null>(null);
  isLoading = signal(true);

  private getActiveTabCards(): Card[] {
    const activeId = this.activeTabId();
    if (!activeId) return [];
    const foundTab = this.tabs().find(function (tab) {
      return tab.id === activeId;
    });
    return foundTab?.cards || [];
  }

  activeTabCards = computed(this.getActiveTabCards.bind(this));

  ngOnInit() {
    this.loadTabs();
  }

  loadTabs() {
    this.isLoading.set(true);

    this.tabService.getTabs().subscribe({
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
