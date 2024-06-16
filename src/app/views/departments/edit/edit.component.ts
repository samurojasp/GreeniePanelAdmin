import { Component } from '@angular/core';
import { EditDepartmentService } from '../../../services/departments/edit-department.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  TextColorDirective,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  ToastBodyComponent,
  ToastComponent,
  ToastHeaderComponent,
  ToasterComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { GetDepartmentByIdService } from 'src/app/services/departments/get-department-by-id.service';
@Component({
  selector: 'app-edit',
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
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  currentId = 0;
  name = '';
  departmentId= 0;
  role= "";
  position = 'top-end';
  visible = false;
  percentage = 0;
  toastMessage = ''; 
  toastClass: string = ''; 


  constructor(
    private editDepartmentService: EditDepartmentService,
    private getDepartmentByIdService: GetDepartmentByIdService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getDepartmentById(id: number): void {
    this.getDepartmentByIdService.getDepartmentById(id).subscribe({
      next: (response) => {
        this.name = response.name;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  editDepartment(): void {
    this.editDepartmentService
      .patchDepartment(this.currentId, { name: this.name })
      .subscribe({
        next: (response) => {
          this.toggleToast('Usuario editado exitosamente', true);
          setTimeout(() => {
            this.router.navigate([`departments`]); 
          },1500)
         },
         error: (error) => {
          this.toggleToast('Error al editar usuario', false); 
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
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentId = params['id'];
    });
    this.getDepartmentById(this.currentId);
  }

}
