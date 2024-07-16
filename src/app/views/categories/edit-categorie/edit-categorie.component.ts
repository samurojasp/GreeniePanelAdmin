import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Category, Indicator, Criterion } from 'src/app/types';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    ButtonDirective,
    ButtonGroupComponent,
    ButtonCloseDirective,
    CardBodyComponent,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    FormSelectDirective,
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
    RouterLink,
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent,
    MatSelectModule,
    MatFormFieldModule,
    NgxSpinnerModule,
    NgFor,
  ],
  templateUrl: './edit-categorie.component.html',
  styleUrl: './edit-categorie.component.scss',
})
export class EditCategorieComponent {
  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  categories: Category[] = [];

  id = 0;
  name = '';
  description = '';
  indicatorID = 0;
  position = 'top-end';
  visible = false;
  percentage = 0;
  toastMessage = '';
  toastClass: string = '';
  criteriaID: number[] = [];
  currentId = 0;

  indicators: Indicator[] = [];
  criteria: Criterion[] = [];

  getCategorieById(id: number): void {
    this.categoriesService.getCategorieById(id).subscribe({
      next: (response) => {
        this.id = response.id;
        this.name = response.name;
        this.description = response.description;
        this.indicatorID = response.indicator.id;
        this.criteriaID = response.criteria.map(
          (criteria: Criterion) => criteria.id
        );
        console.log(response);
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

  getIndicators(): void {
    this.categoriesService.getAllIndicators().subscribe({
      next: (response) => {
        this.indicators = response.data;
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

  getCriteria(): void {
    this.categoriesService.getAllCriteria().subscribe({
      next: (response) => {
        if (this.indicatorID == 0) this.criteria = response.data;
        if (this.indicatorID != 0) {
          this.criteria = response.data.filter(
            (criterion: Criterion) => criterion.indicator.id == this.indicatorID
          );
        }
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

  editCategorie(): void {
    const criteriaIdNumber = this.criteriaID.map((criterionId) =>
      Number(criterionId)
    );

    this.categoriesService
      .editCategorie(this.currentId, {
        name: this.name,
        description: this.description,
        indicatorID: Number(this.indicatorID),
        criteriaID: criteriaIdNumber,
      })
      .subscribe({
        next: () => {
          this.toggleToast('Se ha editado la categoría correctamente', true);
          setTimeout(() => {
            this.router.navigate([`categories`]);
          }, 1500);
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

  onIndicatorChange(target: any): void {
    this.indicatorID = parseInt(target.value);
    this.getCriteria();
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

  trackById(index: number, criterion: Criterion): number {
    return criterion.id;
  }

  ngOnInit(): void {
    this.getIndicators();
    this.getCriteria();
    this.route.params.subscribe((params) => {
      this.currentId = params['id'];
    });
    this.getCategorieById(this.currentId);
  }
}
