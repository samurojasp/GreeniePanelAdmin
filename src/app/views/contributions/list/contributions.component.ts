import { Component } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

import {
  ButtonDirective,
  ButtonGroupComponent,
  ButtonCloseDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ThemeDirective,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  PageItemDirective,
  PageLinkDirective,
  PaginationComponent,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  ToastBodyComponent,
  ToastComponent,
  ToastHeaderComponent,
  ToasterComponent,
  ModalModule,
  FormControlDirective,
  FormSelectDirective,
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Category, Department, Indicator, contribution } from 'src/app/types';
import { ContributionsService } from 'src/app/services/contributions/contributions.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { GetAllIndicatorsService } from 'src/app/services/indicators/get-all-indicators.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-contributions',
  standalone: true,
  imports: [
    TextColorDirective,
    DropdownComponent,
    DropdownItemDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
    PaginationComponent,
    PageItemDirective,
    PageLinkDirective,
    CardComponent,
    ModalModule,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    IconDirective,
    ReactiveFormsModule,
    ButtonGroupComponent,
    NgStyle,
    NgIf,
    CardFooterComponent,
    CardHeaderComponent,
    TableDirective,
    FormsModule,
    ReactiveFormsModule,
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent,
    RouterLink,
    NgxSpinnerModule,
    FormControlDirective,
    FormSelectDirective,
    NgxPaginationModule,
  ],
  templateUrl: './contributions.component.html',
  styleUrl: './contributions.component.scss',
})
export class ContributionsComponent {
  contributions: contribution[] = [];
  categories: Category[] = [];
  departments: Department[] = [];
  indicators: Indicator[] = [];
  role = localStorage.getItem('role');

  pagination = {
    page: 1,
    take: 10,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: true,
  };

  currentId = 0;
  position = 'top-end';
  percentage = 0;
  toastMessage = '';
  toastClass = '';
  visibleModal = false;
  visible = false;

  categoryFilter = 0;
  departmentFilter = 0;
  indicatorFilter = 0;

  constructor(
    private contributionsService: ContributionsService,
    private categoriesService: CategoriesService,
    private getAllIndicatorsService: GetAllIndicatorsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  transformDate(dateString: string): string {
    const formattedDate = new Date(dateString);
    return formattedDate.toLocaleDateString('es-ES', { timeZone: 'UTC' });
  }

  getCategoryFilterTitle(categoryId: number): string {
    const category = this.categories.find(
      (category) => category.id === categoryId
    );
    return category
      ? `${category.id} - ${category.name}`
      : 'Todas las categorías';
  }

  getIndicatorFilterTitle(indicatorId: number): string {
    const indicator = this.indicators.find(
      (indicator) => indicator.id === indicatorId
    );
    return indicator
      ? `${indicator.id} - ${indicator.name}`
      : 'Todos los indicadores';
  }

  getDepartmentFilterTitle(departmentId: number): string {
    const department = this.departments.find(
      (department) => department.id === departmentId
    );
    return department
      ? `${department.id} - ${department.name}`
      : 'Todos los departamentos';
  }

  getPaginatedContributions(): void {
    this.contributionsService
      .getPaginatedContributions(
        this.pagination.page,
        this.pagination.take,
        this.categoryFilter,
        this.departmentFilter,
        this.indicatorFilter
      )
      .subscribe({
        next: (response) => {
          this.contributions = response.data;
          this.pagination = response.meta;
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

  getAllCategories(): void {
    this.categoriesService.getPaginatedCategories(1, 10).subscribe({
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

  getAllDepartments(): void {
    this.contributionsService.getAllDepartment().subscribe({
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

  getAllIndicators(): void {
    this.getAllIndicatorsService.getAllIndicators().subscribe({
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

  deleteContribution(): void {
    this.contributionsService.deleteContribution(this.currentId).subscribe({
      next: () => {
        this.toggleToast('Contribución eliminada exitosamente', true);
        this.getPaginatedContributions();
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

  toggleLiveDemo(id: number) {
    this.currentId = id;
    this.visibleModal = !this.visibleModal;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
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

  setCategoryFilter(categoryId: number): void {
    this.indicatorFilter = 0;
    this.departmentFilter = 0;
    this.categoryFilter = categoryId;
    this.getPaginatedContributions();
  }

  setDepartmentFilter(departmentId: number): void {
    this.indicatorFilter = 0;
    this.categoryFilter = 0;
    this.departmentFilter = departmentId;
    this.getPaginatedContributions();
  }

  setIndicatorFilter(indicatorId: number): void {
    this.categoryFilter = 0;
    this.departmentFilter = 0;
    this.indicatorFilter = indicatorId;
    this.getPaginatedContributions();
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 34;
  }

  goToCreate(): void {
    this.router.navigate(['/create-contribution']);
  }

  goToEdit(currentContributionId: number): void {
    console.log('entro');
    console.log(currentContributionId);
    this.router.navigate([`/edit-contribution/${currentContributionId}`]);
  }

  setPage(page: number): void {
    if (page < 1 || page > this.pagination.pageCount) {
      return;
    }
    this.pagination.page = page;

    this.getPaginatedContributions();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const categoryId = params.get('CategoryID');
      const indicatorId = params.get('IndicatorID');
      const departmentId = params.get('DepartmentID');

      if (categoryId) {
        this.categoryFilter = Number(categoryId);
      }

      if (indicatorId) {
        this.indicatorFilter = Number(indicatorId);
      }

      if (departmentId) {
        this.departmentFilter = Number(departmentId);
      }
      this.getPaginatedContributions();
      this.getAllCategories();
      this.getAllDepartments();
      this.getAllIndicators();
    });
  }
}
