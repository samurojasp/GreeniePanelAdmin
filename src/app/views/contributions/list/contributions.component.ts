import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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
import { NgStyle } from '@angular/common';
import { Categorie, Department, contribution } from 'src/app/types';
import { ContributionsService } from 'src/app/services/contributions/contributions.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';

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
  ],
  templateUrl: './contributions.component.html',
  styleUrl: './contributions.component.scss',
})
export class ContributionsComponent {
  constructor(
    private contributionsService: ContributionsService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  contributions: contribution[] = [];
  categories: Categorie[] = [];
  departments: Department[] = [];

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
        this.departmentFilter
      )
      .subscribe({
        next: (response) => {
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

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 34;
  }

  ngOnInit(): void {
    this.getPaginatedContributions();
    this.getAllCategories();
    this.getAllDepartments();
  }
}
