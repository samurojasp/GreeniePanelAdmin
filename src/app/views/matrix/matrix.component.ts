import { Component } from '@angular/core';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { MatrixService } from 'src/app/services/departments/matrix.service';
import {
  SpinnerModule,
  CardModule,
  TableModule,
  UtilitiesModule,
} from '@coreui/angular';
import { GetSettingService } from '../../services/settings/get-settings.service';

interface Department {
  id: number;
  name: string;
}

interface Categorie {
  id: number;
  name: string;
}

interface SettingBody {
  key: string;
  contributionSettings: {
    initDate: Date;
    endDate: Date;
    getNotificationForContribution: boolean;
    recordatory: boolean;
  };
}

interface Matrix {
  departmentName: string;
  categories: [
    {
      id: number;
      potencially: boolean;
      quantity: number;
    }
  ];
}

@Component({
  selector: 'app-matrix',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerModule,
    NgIf,
    NgStyle,
    CardModule,
    TableModule,
    UtilitiesModule,
  ],
  templateUrl: './matrix.component.html',
  styleUrl: './matrix.component.scss',
})
export class MatrixComponent {
  constructor(
    private matrixService: MatrixService,
    private getSettingService: GetSettingService
  ) {}

  matrix: Matrix[] = [];
  departments: Department[] = [];
  categories: Categorie[] = [];
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
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  getCategories() {
    this.matrixService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  getMatrixData() {
    this.matrixService.getMatrix().subscribe({
      next: (response) => {
        console.log(response);
        this.matrix = response.data;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
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

  ngOnInit(): void {
    this.getMatrixData();
    this.getDepartments();
    this.getCategories();
    this.getSettings();
  }
}
