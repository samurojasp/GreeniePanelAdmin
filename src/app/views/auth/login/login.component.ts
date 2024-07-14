import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
  ToastBodyComponent,
  ToastComponent,
  ToastHeaderComponent,
  ToasterComponent,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginService } from '../../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    FormsModule,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent,
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
    NgxSpinnerModule
  ],
})
export class LoginComponent {
  email = '';
  password = '';
  currentId = 0;
  position = 'top-end';
  percentage = 0;
  toastMessage = '';
  toastClass = '';
  visibleModal = false;
  visible = false;

  constructor(private loginService: LoginService, private router: Router) {}

  login(): void {
    this.loginService
      .postLogin({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.id);
          localStorage.setItem('email', response.email);
          localStorage.setItem('role', response.role);
          this.router.navigate(['/matrix']);
        },
        error: (error) =>
          this.toggleToast(error.message, false)
      });
  }

  toggleToast(message: string, success: boolean): void {
    this.visible = true;
    this.percentage = 100;
    if (success) {
      this.toastMessage = message;
      this.toastClass = 'toast-success';
    } else {
      this.toastMessage = message;
      this.toastClass = 'toast-error';
    }
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 34;
  }
}
