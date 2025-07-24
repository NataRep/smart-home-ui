import { Component, inject, OnInit, signal } from '@angular/core';
import { Tab } from '../../models/response-models';
import { TabsService } from '../../services/cards.service';

@Component({
  selector: 'app-tab-switcher',
  standalone: true,
  imports: [],
  templateUrl: './tab-switcher.component.html',
  styleUrl: './tab-switcher.component.scss',
})
export class TabSwitcherComponent implements OnInit {
  private tabService = inject(TabsService);
  tabs = signal<Tab[]>([]);
  activeTab = signal<string | null>(null);
  isLoading = signal(true);

  ngOnInit() {
    this.loadTabs();
  }

  loadTabs() {
    this.isLoading.set(true);

    this.tabService.getTabs().subscribe({
      next: (response) => {
        this.tabs.set(response.tabs);
        if (response.tabs.length > 0) {
          this.activeTab.set(response.tabs[0].id);
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  setActiveTab(tabId: string) {
    if (this.tabs().some((tab) => tab.id === tabId)) {
      this.activeTab.set(tabId);
    }
  }

  getActiveTabCards() {
    const activeId = this.activeTab();

    if (!activeId) return [];

    const result = this.tabs().find((tab) => tab.id === activeId)?.cards || [];

    console.log('getActiveTabCards', result);

    return result;
  }
}
