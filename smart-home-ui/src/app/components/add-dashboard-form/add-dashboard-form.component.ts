// component.ts
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ModalService } from '../../services/modal.service';
import { clearDashboardsError, createDashboard } from '../../store/dashboard/dashboard.actions';
import { selectErrorDashboards, selectLoadingDashboards } from '../../store/dashboard/dashboards.selectors';

@Component({
  selector: 'app-add-dashboard-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-dashboard-form.component.html',
  styleUrl: './add-dashboard-form.component.scss'
})
export class AddDashboardFormComponent implements OnInit {
  private modalService = inject(ModalService);
  private store = inject(Store);

  isLoading = this.store.selectSignal(selectLoadingDashboards);
  errorMessage = this.store.selectSignal(selectErrorDashboards)

  form!: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  get id() { return this.form.get('id')!; }
  get title() { return this.form.get('title')!; }
  get icon() { return this.form.get('icon')!; }

  createForm() {
    this.form = new FormGroup(
      {
        id: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z\s'-]*$/)]),
        title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z\s'-]*$/)]),
        icon: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z\s'-]*$/)])
      }
    )

    this.form.valueChanges.subscribe(() => {
      this.store.dispatch(clearDashboardsError());
    });
  }

  onSubmit() {
    const dashboard = this.form.value;
    this.store.dispatch(createDashboard({ dashboard }));
  }

  onCancel() {
    this.modalService.close();
  }
}
