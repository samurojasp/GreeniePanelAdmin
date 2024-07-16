import { Component } from '@angular/core';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IconDirective, IconModule } from '@coreui/icons-angular';
import { ContributionsComponent } from 'src/app/views/contributions/list/contributions.component';
import { MatrixService } from 'src/app/services/departments/matrix.service';
import {
  SpinnerModule,
  CardModule,
  TableModule,
  UtilitiesModule,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  ToastBodyComponent,
  ToastComponent,
  ToastHeaderComponent,
  ToasterComponent
} from '@coreui/angular';
import { Indicator, Matrix, Category, Department} from 'src/app/types';

@Component({
  selector: 'app-matrix',
  standalone: true,
  imports: [
    ContributionsComponent,
    CommonModule,
    SpinnerModule,
    NgIf,
    NgStyle,
    IconDirective,
    IconModule,
    CardModule,
    TableModule,
    UtilitiesModule,
    RouterLink,
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent
  ],
  templateUrl: './matrix.component.html',
  styleUrl: './matrix.component.scss',
})
export class MatrixComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matrixService: MatrixService
  ) {}

  matrix: Matrix[] = [];
  departments: Department[] = [];
  categories: Category[] = [];
  position = 'top-end';
  visible = false;
  percentage = 0;
  toastMessage = '';
  toastClass: string = '';

  headers = [
    { color: '#74b72e' },
    { color: '#ffae6a' },
    { color: '#26a4be' },
    { color: '#bca89f' },
    { color: '#48cae4' },
    { color: '#f2a6d7' },
    { color: '#c4adeb' },
  ];

  getDepartments() {
    this.matrixService.getDepartments().subscribe({
      next: (response) => {
        this.departments = response.data;
      },
      error: (error) => {
        if (error.message) this.toggleToast(error.message, false);
        if (error.error.error.message && !error.error.error.detail)
          this.toggleToast(error.error.error.message, false);
        if (error.error.error.message && error.error.error.detail[0].message)
          this.toggleToast(error.error.error.detail[0].message, false);
        if (error.error.error.message && !error.error.error.detail[0].message)
          this.toggleToast(error.error.error.message, false);
      },
    });
  }

  getCategories() {
    this.matrixService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (error) => {
        if (error.message) this.toggleToast(error.message, false);
        if (error.error.error.message && !error.error.error.detail)
          this.toggleToast(error.error.error.message, false);
        if (error.error.error.message && error.error.error.detail[0].message)
          this.toggleToast(error.error.error.detail[0].message, false);
        if (error.error.error.message && !error.error.error.detail[0].message)
          this.toggleToast(error.error.error.message, false);
      },
    });
  }

  getMatrixData() {
    this.matrixService.getMatrix().subscribe({
      next: (response) => {
        console.log(response);
        console.log(response.data);
        this.matrix = response.data;
      },
      error: (error) => {
        if (error.message) this.toggleToast(error.message, false);
        if (error.error.error.message && !error.error.error.detail)
          this.toggleToast(error.error.error.message, false);
        if (error.error.error.message && error.error.error.detail[0].message)
          this.toggleToast(error.error.error.detail[0].message, false);
        if (error.error.error.message && !error.error.error.detail[0].message)
          this.toggleToast(error.error.error.message, false);
      },
    });
  }

  navigateToContributions(categoryID: number, indicatorID: number): void {
    this.router.navigate([
      `/contributions/category/${categoryID}/indicator/${indicatorID}`,
    ]);
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
    this.getMatrixData();
    this.getDepartments();
    this.getCategories();
  }
}
