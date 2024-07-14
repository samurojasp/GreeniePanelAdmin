import { Component } from '@angular/core';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IconDirective, IconModule } from '@coreui/icons-angular';
import { ContributionsComponent } from 'src/app/views/contributions/list/contributions.component';
import { MatrixService } from 'src/app/services/departments/matrix.service';
import { SpinnerModule, CardModule, TableModule, UtilitiesModule } from '@coreui/angular';
import { Indicator } from 'src/app/types';

interface Department {
  id: number;
  name: string;
}

interface Categorie {
  id: number;
  name: string;
  indicator: Indicator;
}

interface Matrix {
  departmentName: string;
  categories:[{
    id: number;
    potencially:boolean;
    quantity: number;
  }]
}

@Component({
  selector: 'app-matrix',
  standalone: true,
  imports: [ ContributionsComponent, CommonModule, SpinnerModule, NgIf, NgStyle, IconDirective, IconModule, CardModule, TableModule, UtilitiesModule, RouterLink],
  templateUrl: './matrix.component.html',
  styleUrl: './matrix.component.scss'
})
export class MatrixComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matrixService: MatrixService
  ) { }

  matrix: Matrix[] = [];
  departments: Department[] = [];
  categories: Categorie[] = [];

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
        console.log(response.data);
        this.matrix = response.data;
      },
      error: (error) =>
        console.error('Error al realizar la solicitud:', error),
    });
  }

  navigateToContributions(categoryID: number, indicatorID: number): void {
    this.router.navigate(['/contributions'], { queryParams: { categoryID: categoryID, indicatorID: indicatorID } });
  }

  ngOnInit(): void {
    this.getMatrixData();
    this.getDepartments();
    this.getCategories();
  }

}
