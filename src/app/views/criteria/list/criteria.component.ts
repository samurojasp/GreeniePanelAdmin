import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  AvatarComponent,
  ButtonCloseDirective,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  PageItemDirective,
  PageLinkDirective,
  PaginationComponent,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  ThemeDirective,
  ToastBodyComponent,
  ToastComponent,
  ToastHeaderComponent,
  ToasterComponent,
  ModalModule,
  ProgressBarComponent
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';

import { CriteriaService } from '../../../services/criteria/get-paginated-criteria.service';
import { DeleteCriterionService } from '../../../services/criteria/delete-criterion.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'criteria.component.html',
  styleUrls: ['criteria.component.scss'],
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    IconDirective,
    ReactiveFormsModule,
    ButtonGroupComponent,
    FormCheckLabelDirective,
    NgStyle,
    CardFooterComponent,
    GutterDirective,
    ProgressBarDirective,
    ProgressComponent,
    CardHeaderComponent,
    TableDirective,
    AvatarComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    PageItemDirective,
    PageLinkDirective,
    PaginationComponent,
    RouterLink,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent,
    ModalModule,
    ProgressBarComponent
  ],
})
export class CriteriaComponent implements OnInit {
  criteria: any = [];

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

  pages = this.pagination.pageCount;

  constructor(
    private criteriaService: CriteriaService,
    private deleteCriterionService: DeleteCriterionService,
    private router: Router
  ) {}

  getPaginatedCriteria(page: number, take: number): void {
    this.criteriaService.getPaginatedCriteria(page, take).subscribe({
      next: (response) => {
        this.criteria = response.data;
      },
      error: (error) => console.error(error),
    });
  }

  redirectToEdit(id: number): void {
    this.router.navigate([`edit-criterion/${id}`]);
  }


  toggleModal(id: number) {
    this.visibleModal = !this.visibleModal;
    this.currentId = id;
  }

  handleLiveDemoChange(event: any) {
    this.visibleModal = event;
  }

  deleteCriterion(): void {
    this.deleteCriterionService.deleteCriterion(this.currentId).subscribe({
      next:  () => {
        this.getPaginatedCriteria(this.pagination.page, 10);
        this.visibleModal = false;
        this.toggleToast('El Criterio se ha eliminado exitosamente', true); 
      },
      error: (error) => {
        this.toggleToast(error.message, false); 
        console.log(error);
      },
    });
  }

  setPage(page: number): void {
    if (page < 1 || page > this.pagination.pageCount) return;
    this.pagination.page = page;
  }
  ngOnInit(): void {
    this.getPaginatedCriteria(this.pagination.page, 10);
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
}
