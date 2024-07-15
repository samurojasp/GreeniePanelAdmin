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
  ToasterComponent,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetDepartmentByIdService } from 'src/app/services/departments/get-department-by-id.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Category } from 'src/app/types';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
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
    ToasterComponent,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgFor,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  currentId = 0;
  name = '';
  departmentId = 0;
  role = '';
  position = 'top-end';
  visible = false;
  percentage = 0;
  toastMessage = '';
  toastClass: string = '';
  categoryId: number[] = [];
  categories: Category[] = [];
  pagination = {
    page: 1,
    take: 10,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: true,
  };
  constructor(
    private editDepartmentService: EditDepartmentService,
    private getDepartmentByIdService: GetDepartmentByIdService,
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  getDepartmentById(id: number): void {
    this.getDepartmentByIdService.getDepartmentById(id).subscribe({
      next: (response) => {
        this.name = response.name;
        this.categoryId = response.categories.map(
          (category: Category) => category.id
        );
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
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

  editDepartment(): void {
    const categoryIdNumbers = this.categoryId.map((categoryId) =>
      Number(categoryId)
    );
    this.editDepartmentService
      .patchDepartment(this.currentId, {
        name: this.name,
        categoriesIDs: categoryIdNumbers,
      })
      .subscribe({
        next: () => {
          this.toggleToast('Departamento editado exitosamente', true);
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

  trackById(index: number, cate: Category): number {
    return cate.id;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentId = params['id'];
    });
    this.getDepartmentById(this.currentId);
    this.getCategories();
  }
}
