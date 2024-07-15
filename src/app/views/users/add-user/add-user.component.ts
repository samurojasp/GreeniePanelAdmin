import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  ButtonDirective,
  ButtonGroupComponent,
  ButtonCloseDirective,
  CardBodyComponent,
  CardComponent,
  FormDirective,
  FormControlDirective,
  FormLabelDirective,
  FormSelectDirective,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  ToastBodyComponent,
  ToastComponent,
  ToastHeaderComponent,
  ToasterComponent,
} from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IconDirective } from '@coreui/icons-angular';
import { User, Department } from 'src/app/types';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    ButtonDirective,
    ButtonGroupComponent,
    ButtonCloseDirective,
    CardBodyComponent,
    CardComponent,
    FormDirective,
    FormControlDirective,
    FormLabelDirective,
    FormSelectDirective,
    FormsModule,
    IconDirective,
    ReactiveFormsModule,
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
    RouterLink,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent,
    NgxSpinnerModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  toastMessage = '';
  toastClass: string = '';

  constructor(private usersService: UsersService, private router: Router) {}

  users: User[] = [];
  departments: Department[] = [];
  name = '';
  email = '';
  password = '';
  birthdate = '';
  departmentId = 0;
  role = '';
  position = 'top-end';
  visible = false;
  percentage = 0;

  getDepartments(): void {
    this.usersService.getAllDepartments().subscribe({
      next: (response) => {
        console.log(response);
        this.departments = response.data;
      },
      error: (error) => {
        if (error.error.error.message && error.error.error.detail[0].message)
          this.toggleToast(error.error.error.detail[0].message, false);
        if (error.error.error.message && !error.error.error.detail[0].message)
          this.toggleToast(error.error.error.message, false);
      },
    });
  }

  createUser(): void {
    this.usersService
      .createUser({
        name: this.name,
        email: this.email,
        password: this.password,
        birthdate: this.birthdate,
        departmentId: Number(this.departmentId),
        role: this.role,
      })
      .subscribe({
        next: () => {
          this.toggleToast('Usuario creado exitosamente', true); // Mostrar toast de éxito
          setTimeout(() => {
            this.router.navigate([`users`]);
          }, 1500);
        },
        error: (error) => {
          if (error.error.error.message && !error.error.error.detail)
            this.toggleToast(error.error.error.message, false);
          if (error.error.error.message && error.error.error.detail[0].message)
            this.toggleToast(error.error.error.detail[0].message, false);
          if (error.error.error.message && !error.error.error.detail[0].message)
            this.toggleToast(error.error.error.message, false);
        },
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
    this.percentage = $event * 100;
  }

  ngOnInit(): void {
    this.getDepartments();
  }
}
