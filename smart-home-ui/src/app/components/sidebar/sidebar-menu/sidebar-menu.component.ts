import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit, signal, TemplateRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, finalize, tap } from 'rxjs';
import { Dashboard, Tab } from '../../../models/api.model';
import { MENU_LINKS } from '../../../models/constants';
import { IconMapperPipe } from '../../../pipes/icon-mapper.pipe';
import { DashboardService } from '../../../services/dashboard.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [RouterModule, NgClass, IconMapperPipe],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuComponent implements OnInit {
  @Input() isSidebarOpen: boolean = false;
  @Input() addDashboardTemplate!: TemplateRef<unknown>;

  private modalService = inject(ModalService)
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dashboardService = inject(DashboardService);
  private destroyRef = inject(DestroyRef);

  dashboards = signal<Dashboard[]>([]);
  dashboardTabs = signal<Tab[]>([]);
  isLoading = signal(true);
  activeDashboardId = signal<string | null>(null);
  activeDashboardTabId = signal<string | null>(null);

  linkList = MENU_LINKS;

  constructor() {
    this.route.paramMap.subscribe(paramMap => {
      const dashboardId = paramMap.get('dashboardId');
      const tabId = paramMap.get('tabId');

      this.activeDashboardId.set(dashboardId);
      this.activeDashboardTabId.set(tabId);
    });

    this.loadDashboards();
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

  loadDashboards() {
    this.isLoading.set(true);
    this.dashboardService.getDashboards()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(response => this.dashboards.set(response)),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe();
  }

  onClickDashboard(id: string) {
    this.activeDashboardId.set(id);
    this.isLoading.set(true);

    this.dashboardService.getDashboardTabs(id).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(response => {
        const firstTabId = response.tabs[0]?.id;
        this.router.navigate(['dashboard', id, firstTabId]);
      }),
      finalize(() => this.isLoading.set(false))
    ).subscribe();
  }

  onAddDashboard() {
    if (this.addDashboardTemplate) {
      this.modalService.open(this.addDashboardTemplate);
    }
  }
}