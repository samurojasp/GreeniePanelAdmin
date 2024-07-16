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
  ProgressBarComponent,
  ToastBodyComponent,
  ToastComponent,
  PageItemDirective,
  PageLinkDirective,
  PaginationComponent,
  ToastHeaderComponent,
  ToasterComponent,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { IndicatorsService } from 'src/app/services/indicators/indicators.service';
import { NgxPaginationModule } from 'ngx-pagination';

interface indicator {
  id: number;
  name: string;
  index: number;
  description: string;
}

@Component({
  selector: 'app-indicators',
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
    ProgressBarComponent,
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
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent,
    NgxSpinnerModule,
    NgxPaginationModule,
  ],
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.scss',
})
export class IndicatorsComponent {
  constructor(
    private router: Router,
    private indicatorsService: IndicatorsService
  ) {}

  currentId = 0;
  position = 'top-end';
  percentage = 0;
  toastMessage = '';
  toastClass = '';
  visibleModal = false;
  visible = false;

  pagination = {
    page: 1,
    take: 10,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: true,
  };

  public indicators: indicator[] = [];

  toggleLiveDemo(id: number) {
    this.currentId = id;
    this.visibleModal = !this.visibleModal;
  }

  handleLiveDemoChange(event: any) {
    this.visibleModal = event;
  }

  getPaginatedIndicator(): void {
    this.indicatorsService
      .getPaginatedIndicator(this.pagination.page, this.pagination.take)
      .subscribe({
        next: (response) => {
          this.indicators = response.data;
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

  deleteIndicator(): void {
    this.indicatorsService.deleteIndicator(this.currentId).subscribe({
      next: () => {
        this.getPaginatedIndicator();
        this.visible = false;
        this.toggleToast('El indicador se ha eliminado exitosamente', true);
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

  redirectToEdit(id: number): void {
    this.router.navigate([`editIndicators/${id}`]);
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

  setPage(page: number): void {
    if (page < 1 || page > this.pagination.pageCount) {
      return;
    }
    this.pagination.page = page;

    this.getPaginatedIndicator();
  }

  onTimerChange($event: number) {
    this.percentage = $event * 34;
  }

  ngOnInit(): void {
    this.getPaginatedIndicator();
  }
}
