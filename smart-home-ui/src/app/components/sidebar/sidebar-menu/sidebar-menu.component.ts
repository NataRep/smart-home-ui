import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { Tab } from '../../../models/api.model';
import { MENU_LINKS } from '../../../models/constants';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { IconMapperPipe } from '../../../pipes/icon-mapper.pipe';
import { ModalService } from '../../../services/modal.service';
import * as DashboardActions from '../../../store/dashboard/dashboard.actions';
import { selectDashboardsList } from '../../../store/dashboard/dashboards.selectors';
import { loadTabsAndNavigate } from '../../../store/tabs/tabs.actions';
import { AddDashboardFormComponent } from '../../add-dashboard-form/add-dashboard-form.component';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [RouterModule, NgClass, IconMapperPipe, AddDashboardFormComponent, CapitalizePipe],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SidebarMenuComponent implements OnInit {
  @Input() isSidebarOpen = false;
  @ViewChild('addDashboardTemplate', { static: true })
  addDashboardTemplate!: TemplateRef<unknown>;

  private router = inject(Router);
  private store = inject(Store);
  private modalService = inject(ModalService);
  private route = inject(ActivatedRoute);

  dashboards = this.store.selectSignal(selectDashboardsList);
  activeDashboardId = signal<string | null>(null);
  activeDashboardTabId = signal<string | null>(null);
  dashboardTabs = signal<Tab[]>([]);
  linkList = MENU_LINKS;

  constructor() {
    this.initRouteListener();
    this.store.dispatch(DashboardActions.loadDashboards());
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let snapshot = this.route.snapshot;
        while (snapshot.firstChild) {
          snapshot = snapshot.firstChild;
        }
        const dashboardId = snapshot.paramMap.get('dashboardId');
        const tabId = snapshot.paramMap.get('tabId');
        this.activeDashboardId.set(dashboardId);
        this.activeDashboardTabId.set(tabId);
      });
  }

  private initRouteListener() {
    this.route.paramMap.subscribe(paramMap => {
      const dashboardId = paramMap.get('dashboardId');
      const tabId = paramMap.get('tabId');
      this.activeDashboardId.set(dashboardId);
      this.activeDashboardTabId.set(tabId);
    });
  }

  onClickDashboard(id: string) {
    this.activeDashboardId.set(id);
    this.store.dispatch(loadTabsAndNavigate({ dashboardId: id }));
    this.store.dispatch(DashboardActions.selectDashboard({ dashboardId: id, }));
  }

  onAddDashboard() {
    this.modalService.open(this.addDashboardTemplate, 'addDashboard');
  }
}
