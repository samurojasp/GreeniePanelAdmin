import { NgIf, NgStyle } from '@angular/common';
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
  ProgressBarComponent,
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
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../../widgets/widgets-dropdown/widgets-dropdown.component';

import { DepartmentsService } from '../../../services/departments/get-paginated-departments.service';
import { DeleteDepartmentService } from '../../../services/departments/delete-department.service';
import { Router } from '@angular/router';

import { Department } from '../../../types';

@Component({
  templateUrl: 'departments.component.html',
  styleUrls: ['departments.component.scss'],
  standalone: true,
  imports: [
    WidgetsDropdownComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    IconDirective,
    ReactiveFormsModule,
    ButtonGroupComponent,
    FormCheckLabelDirective,
    ChartjsComponent,
    NgStyle,
    CardFooterComponent,
    GutterDirective,
    ProgressBarDirective,
    ProgressComponent,
    WidgetsBrandComponent,
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
    ProgressBarComponent,
    NgIf,
  ],
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];
  currentId = 0;
  position = 'top-end';
  percentage = 0;
  toastMessage = '';
  toastClass = '';
  visibleModal = false;
  visible = false;

  pagination = {
    page: 1,
    take: 1,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: true,
  };

  constructor(
    private departmentsService: DepartmentsService,
    private deleteDepartmentService: DeleteDepartmentService,
    private router: Router
  ) {}


  toggleModal(id: number) {
    this.visibleModal = !this.visibleModal;
    this.currentId = id;
  }

  handleLiveDemoChange(event: any) {
    this.visibleModal = event;
  }

  getPaginatedDepartments(page: number, take: number): void {
    this.departmentsService.getPaginatedDepartments(page, take).subscribe({
      next: (response) => {
        this.departments = response.data;
        this.pagination = response.meta;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }
  
  deleteDepartment(): void {
    this.deleteDepartmentService.deleteDepartment(this.currentId).subscribe({
      next:  () => {
        this.getPaginatedDepartments(this.pagination.page, 10);
        this.visibleModal = false;
        this.toggleToast('El departamento se ha eliminado exitosamente', true); 
      },
      error: (error) => {
        this.toggleToast(error.message, false); 
        console.log(error);
      },
    });
  }

  setPage(page: number): void {
    if (page < 1 || page > this.pagination.pageCount) {
      return;
    }
    this.pagination.page = page;

    console.log(this.pagination.page);
    this.getPaginatedDepartments(this.pagination.page, this.pagination.take);
  }

  redirectToEdit(id: number): void {
    this.router.navigate([`edit-department/${id}`]);
  }

  ngOnInit(): void {
    this.getPaginatedDepartments(this.pagination.page, this.pagination.take);
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
