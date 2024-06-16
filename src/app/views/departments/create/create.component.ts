import { Component } from '@angular/core';
import { CreateDepartmentService } from '../../../services/departments/create-department.service';
import { Router } from '@angular/router';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  FormSelectDirective,
  RowComponent,
  ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent,
  TextColorDirective,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    IconDirective,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    CardHeaderComponent,
    TextColorDirective,
    FormSelectDirective,
    FormsModule,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent,
    ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
    
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  name = '';
  email = "";
  password = "";
  birthdate = "";
  departmentId = 0;
  role = ""; 
  position = 'top-end';
  visible = false;
  percentage = 0;
  toastMessage = ''; 
  toastClass: string = ''; 

  constructor(
    private createDepartmentService: CreateDepartmentService,
    private router: Router
  ) {}

  createDepartment(): void {
    this.createDepartmentService.postDepartment({ name: this.name }).subscribe({
      next: (response) => {
        this.toggleToast('Departamento creado exitosamente', true); // Mostrar toast de éxito
        setTimeout(() => {
          this.router.navigate([`departments`]); 
        },1500)
      },
      error: (error) => {
        this.toggleToast('Error al crear departamento', false); 
        console.log(error);
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

}
