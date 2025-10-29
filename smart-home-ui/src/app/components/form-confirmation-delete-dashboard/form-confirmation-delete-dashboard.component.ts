import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalService } from '../../services/modal.service';
import { selectErrorDashboards, selectLoadingDashboards } from '../../store/dashboard/dashboards.selectors';

@Component({
  selector: 'app-form-confirmation-delete-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './form-confirmation-delete-dashboard.component.html',
  styleUrl: './form-confirmation-delete-dashboard.component.scss'
})
export class FormConfirmationDeleteDashboardComponent {
  @Input() dashboardsId!: string;

  private modalService = inject(ModalService);
  private store = inject(Store);

  isLoading = this.store.selectSignal(selectLoadingDashboards);
  errorMessage = this.store.selectSignal(selectErrorDashboards)


  onSubmit() {
    this.modalService.close();
  }

  onCancel() {
    this.modalService.close();
  }
}
