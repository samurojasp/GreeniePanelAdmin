import { Component } from '@angular/core';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { MatrixService } from 'src/app/services/departments/matrix.service';
import { SpinnerModule, CardModule, TableModule, UtilitiesModule } from '@coreui/angular';

interface Department {
  id: number;
  name: string;
}

interface Categorie {
  id: number;
  name: string;
}

interface Matrix {
  departmentName: string;
  categories:{
    id: number;
    potencially:boolean;
    quantity: number;
  }
}

@Component({
  selector: 'app-matrix',
  standalone: true,
  imports: [CommonModule, SpinnerModule, NgIf, NgStyle, CardModule, TableModule, UtilitiesModule],
  templateUrl: './matrix.component.html',
  styleUrl: './matrix.component.scss'
})
export class MatrixComponent {

  constructor(
    private matrixService: MatrixService
  ) { }

  matrix: Matrix[] = [];
  departments: Department[] = [];
  categories: Categorie[] = [];

  headers = [
    { color: '#74b72e' },
    { color: '#ffae6a' }, 
    { color: '#ade8f4' },
    { color: '#bca89f' },
    { color: '#48cae4' },
    { color: '#f2a6d7' },
    { color: '#c4adeb' },
  ];

  getDepartments() {
    this.matrixService.getDepartments().subscribe({
      next: (response) => {
        console.log(response);
        this.departments = response.data;
      },
      error: (error) =>
        console.error('Error al realizar la solicitud:', error),
    })
  }

  getCategories() {
    this.matrixService.getAllCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = response.data;
      },
      error: (error) =>
        console.error('Error al realizar la solicitud:', error),
    })
  }

  getMatrixData() {
    this.matrixService.getMatrix().subscribe({
      next: (response) => {
        console.log(response);
        this.matrix = response.data;
      },
      error: (error) =>
        console.error('Error al realizar la solicitud:', error),
    });
  }

  ngOnInit(): void {
    this.getMatrixData();
    this.getDepartments();
    this.getCategories();
  }

}
