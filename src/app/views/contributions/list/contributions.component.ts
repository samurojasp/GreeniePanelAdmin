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
import { routes } from '../../auth/login/routes';

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
  styleUrl: './contributions.component.scss'
})
export class ContributionsComponent {

  constructor(
    private router: Router
  ) {}

  currentId = 0;
  position = 'top-end';
  percentage = 0;
  toastMessage = '';
  toastClass = '';
  visibleModal = false;
  visible = false;

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

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 34;
  }

}
