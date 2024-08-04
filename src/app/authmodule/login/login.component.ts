import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthserviceService } from '../../services/authservice.service';
import { Login } from '../../models/loginuser.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  subscribe = Subscription
  login!: FormGroup;
  isPasswordVisible: boolean = true;
  userData: any;

  constructor(private fb: FormBuilder, private router: Router,private auth :AuthserviceService) { }

  ngOnInit(): void {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.login.get(controlName);
    return !!control && control.hasError(errorName) && (control.dirty || control.touched);
  }
 loginUser() {
  if (this.login.invalid) {
    // Display errors
    this.login.markAllAsTouched();
    return;
  }
  const userlogin = {
    Email: this.login.value.email,
    password: this.login.value.password
  };

  const response = this.auth.login(userlogin.Email, userlogin.password);

  if (response.token) {
    console.log('JWT Token:', response.token);
    localStorage.setItem('token', response.token);
    
    // Navigate to top headlines after login
    this.router.navigate(['/home/view-list', 'top-headlines']); // Redirect to specific view
  } else {
    this.login.controls['password'].setErrors({ invalidPassword: true });
    console.log('Invalid login');
  }
}
}
