import { Component, OnInit } from '@angular/core';
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
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Categorie, Department, Indicator, contribution } from 'src/app/types';
import { ContributionsService } from 'src/app/services/contributions/contributions.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { GetAllIndicatorsService } from 'src/app/services/indicators/get-all-indicators.service';

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
  ],
  templateUrl: './contributions.component.html',
  styleUrl: './contributions.component.scss',
})
export class ContributionsComponent {

  contributions: contribution[] = [];
  categories: Categorie[] = [];
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
  ) {
    this.route.queryParams.subscribe((params) => {
      this.categoryFilter = params['CategoryID'];
      this.indicatorFilter = params['IndicatorID'];
    });
  }

  transformDate(dateString: string): string {
    const formattedDate = new Date(dateString);
    return formattedDate.toLocaleDateString('es-ES', { timeZone: 'UTC' });
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
          console.log(this.role);
          this.contributions = response.data;
          this.pagination = response.meta;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getAllCategories(): void {
    this.categoriesService.getPaginatedCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAllDepartments(): void {
    this.contributionsService.getAllDepartment().subscribe({
      next: (response) => {
        this.departments = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAllIndicators(): void {
    this.getAllIndicatorsService.getAllIndicators().subscribe({
      next: (response) => {
        this.indicators = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteContribution(): void {
    this.contributionsService.deleteContribution(this.currentId).subscribe({
      next: () => {
        alert('Contribución eliminada exitosamente');
        this.getPaginatedContributions();
      },
      error: (error) => {
        console.log(error);
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
    this.categoryFilter = categoryId;
    this.getPaginatedContributions();
  }

  setDepartmentFilter(departmentId: number): void {
    this.departmentFilter = departmentId;
    this.getPaginatedContributions();
  }

  setIndicatorFilter(indicatorId: number): void {
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
    console.log(currentContributionId)
    this.router.navigate([`/edit-contribution/${currentContributionId}`]);
  }

  ngOnInit(): void {
    this.getPaginatedContributions();
    this.getAllCategories();
    this.getAllDepartments();
    this.getAllIndicators();
  }
}
