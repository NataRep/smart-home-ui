
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  form!: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;
  isPasswordVisible = false;

  constructor() {
    console.log('User: Warner', "Pass: ea")
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)])
    })

    this.form.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }


  onSubmit() {
    if (this.form.valid) {
      const { name, password } = this.form.value;
      if (name && password) {
        this.isLoading = true;
        this.authService.login(name, password)
          .subscribe({
            next: () => {
              this.isLoading = false;
              this.router.navigate(['/dashboard'])
            },
            error: (error) => {
              this.errorMessage = error?.error?.message || 'Invalid username or password';;
              this.isLoading = false;
            },
          });
      }
    } else {
      this.errorMessage = 'Please fill in all required fields correctly';
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible
  }

  get name() { return this.form.get('name')!; }
  get password() { return this.form.get('password')!; }

}
