import { Component } from '@angular/core';
import { CreateDepartmentService } from '../../../services/departments/create-department.service';
import { Router } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
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
  ProgressComponent,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Categorie } from 'src/app/types';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    MatSelectModule,
    MatFormFieldModule,
    NgxSpinnerModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  name = '';
  email = '';
  password = '';
  birthdate = '';
  departmentId = 0;
  pagination = {
    page: 1,
    take: 1,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: true,
  };
  role = '';
  position = 'top-end';
  visible = false;
  percentage = 0;
  toastMessage = '';
  toastClass: string = '';
  categoryId: number[] = [];
  categories: Categorie[] = [];

  constructor(
    private createDepartmentService: CreateDepartmentService,
    private router: Router,
    private categoriesService: CategoriesService
  ) {}

  createDepartment(): void {
    const categoryIdNumbers = this.categoryId.map((categoryId) =>
      Number(categoryId)
    );
    this.createDepartmentService
      .postDepartment({ name: this.name, categoriesIDs: categoryIdNumbers })
      .subscribe({
        next: () => {
          this.toggleToast('Departamento creado exitosamente', true); // Mostrar toast de éxito
          setTimeout(() => {
            this.router.navigate([`departments`]);
          }, 1500);
        },
        error: (error) => {
          if (error.error.error.message && error.error.error.detail[0].message)
            this.toggleToast(error.error.error.detail[0].message, false);
          if (error.error.error.message && !error.error.error.detail[0].message)
            this.toggleToast(error.error.error.message, false);
        },
      });
  }

  getCategories(): void {
    this.categoriesService
      .getPaginatedCategories(this.pagination.page, this.pagination.take)
      .subscribe({
        next: (response) => {
          this.categories = response.data;
        },
        error: (error) => {
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
    this.getCategories();
  }
}
