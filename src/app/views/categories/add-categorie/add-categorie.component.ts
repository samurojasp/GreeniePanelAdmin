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
import { IconDirective } from '@coreui/icons-angular';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Categorie } from 'src/app/types';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Indicator, Criteria } from '../types';

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
    ReactiveFormsModule,
    IconDirective,
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
    RouterLink,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent,
    MatFormFieldModule,
    MatSelectModule,
    NgxSpinnerModule
  ],
  templateUrl: './add-categorie.component.html',
  styleUrl: './add-categorie.component.scss',
})
export class AddCategorieComponent {
  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  name = '';
  description = '';
  indicatorID = 0;
  criteriaID: number[] = [];
  categories: Categorie[] = [];
  indicators: Indicator[] = [];
  criteria: Criteria[] = [];

  getIndicators(): void {
    this.categoriesService.getAllIndicators().subscribe({
      next: (response) => {
        this.indicators = response.data;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  getCriteria(): void {
    this.categoriesService.getAllCriteria().subscribe({
      next: (response) => {
        this.criteria = response.data;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  createCategorie(): void {
    const criteriaIdNumber = this.criteriaID.map((criterionId) =>
      Number(criterionId)
    );

    this.categoriesService
      .addCategorie({
        name: this.name,
        description: this.description,
        indicatorID: Number(this.indicatorID),
        criteriaID: criteriaIdNumber,
      })
      .subscribe({
        next: () => {
          this.router.navigate([`categories`]);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit(): void {
    this.getIndicators();
    this.getCriteria();
  }
}
