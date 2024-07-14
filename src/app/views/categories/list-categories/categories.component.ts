import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalModule,
  ThemeDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  PageLinkDirective,
  PaginationComponent,
  PageItemDirective,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Categorie } from 'src/app/types';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    ButtonGroupComponent,
    FormCheckLabelDirective,
    CardFooterComponent,
    GutterDirective,
    ProgressBarDirective,
    ProgressComponent,
    CommonModule,
    CardHeaderComponent,
    TableDirective,
    ButtonCloseDirective,
    ButtonDirective,
    ModalModule,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective,
    PageItemDirective,
    PageLinkDirective,
    PaginationComponent,
    IconDirective,
    RouterLink,
    NgxSpinnerModule,
    NgxPaginationModule,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  constructor(
    private router: Router,
    private categoriesService: CategoriesService
  ) {}

  public categories: Categorie[] = [];

  currentId = 0;
  pagination = {
    page: 1,
    take: 1,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: true,
  };
  position = 'top-end';
  percentage = 0;
  toastMessage = '';
  toastClass = '';
  visibleModal = false;

  public visible = false;

  getPaginatedCategories(): void {
    this.categoriesService
      .getPaginatedCategories(this.pagination.page, this.pagination.take)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.categories = response.data;
          this.pagination = response.meta;
        },
        error: (error) =>
          console.error('Error al realizar la solicitud:', error),
      });
  }

  deleteCategorie(): void {
    this.categoriesService.deleteCategorie(this.currentId).subscribe({
      next: () => {
        this.getPaginatedCategories();
        this.visible = !this.visible;
      },
      error: (error) => {
        console.log(error);
      },
    });
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
    this.percentage = $event * 34;
  }

  redirectToEdit(id: number): void {
    this.router.navigate([`editcategories/${id}`]);
  }

  toggleLiveDemo(id: number) {
    this.currentId = id;
    this.visibleModal = !this.visibleModal;
  }

  handleLiveDemoChange(event: any) {
    this.visibleModal = event;
  }
  ngOnInit(): void {
    this.getPaginatedCategories();
  }

  setPage(page: number): void {
    if (page < 1 || page > this.pagination.pageCount) {
      return;
    }
    this.pagination.page = page;

    this.getPaginatedCategories();
  }
}
