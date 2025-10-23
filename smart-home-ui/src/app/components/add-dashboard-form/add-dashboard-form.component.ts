// component.ts
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-add-dashboard-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-dashboard-form.component.html',
  styleUrl: './add-dashboard-form.component.scss'
})
export class AddDashboardFormComponent implements OnInit {
  private modalService = inject(ModalService);
  form!: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;

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
      this.errorMessage = null;
    });
  }

  onSubmit() {
    console.log("Submit!");
    this.modalService.close();
  }

  onCancel() {
    this.modalService.close();
  }

}
