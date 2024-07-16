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
} from '@coreui/angular';
import { GetSettingService } from '../../services/settings/get-settings.service';

import {
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  ToastBodyComponent,
  ToastComponent,
  ToastHeaderComponent,
  ToasterComponent,
} from '@coreui/angular';
import { Category, Department, Matrix, SettingBody } from 'src/app/types';

@Component({
  selector: 'app-matrix',
  standalone: true,
  imports: [
    ContributionsComponent,
    CommonModule,
    SpinnerModule,
    NgIf,
    NgStyle,
    CardModule,
    TableModule,
    UtilitiesModule,
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
    ToasterComponent,
  ],
  templateUrl: './matrix.component.html',
  styleUrl: './matrix.component.scss',
})
export class MatrixComponent {
  constructor(
    private matrixService: MatrixService,
    private getSettingService: GetSettingService,
    private router: Router
  ) {}

  role = localStorage.getItem('role');

  matrix: Matrix[] = [];
  departments: Department[] = [];
  setting: SettingBody = {
    key: '',
    contributionSettings: {
      initDate: new Date(),
      endDate: new Date(),
      getNotificationForContribution: false,
      recordatory: true,
    },
  };

  isLate: boolean = false;
  remainingTime: number = 0;
  message: string = '';
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

  getSettings(): void {
    this.getSettingService
      .getSetting('81ed6231-5be6-4166-9118-d982038a2fc7')
      .subscribe({
        next: (response) => {
          this.setting = response;
          this.calculateTime();
        },
        error: (error) =>
          console.error('Error al realizar la solicitud:', error),
      });
  }

  calculateTime(): void {
    const tiempoLimite =
      (new Date(this.setting.contributionSettings.endDate).getTime() -
        new Date(this.setting.contributionSettings.initDate).getTime()) *
      0.3;

    this.remainingTime =
      new Date(this.setting.contributionSettings.endDate).getTime() -
      new Date().getTime();

    if (tiempoLimite >= this.remainingTime) {
      this.isLate = true;
      this.remainingTime = Math.ceil(
        this.remainingTime / (1000 * 60 * 60 * 24)
      );
      if (this.remainingTime == 1) {
        this.message = `Advertencia, queda apróximadamente ${this.remainingTime} día para realizar aportes`;
      } else {
        this.message = `Advertencia, quedan apróximadamente ${this.remainingTime} días para realizar aportes`;
      }
    } else {
      this.isLate = false;
    }
  }

  navigateToContributions(categoryID: number, departmentID: number): void {
    console.log(departmentID);
    if (this.role == 'dpto') {
      this.router.navigate([`/contributions/category/${categoryID}`]);
    } else {
      this.router.navigate([
        `/contributions/category/${categoryID}/department/${departmentID}`,
      ]);
    }
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
    this.getSettings();
  }
}
