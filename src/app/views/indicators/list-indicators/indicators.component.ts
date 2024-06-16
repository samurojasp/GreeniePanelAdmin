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

import { IndicatorsService } from 'src/app/services/indicators/indicators.service';

interface indicator {
  id: number;
  name: string;
  index: number;
  description: string;
}

@Component({
  selector: 'app-indicators',
  standalone: true,
  imports: [ TextColorDirective,
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
          PageItemDirective,
          PageLinkDirective,
          PaginationComponent,
          ModalBodyComponent,
          ModalComponent,
          ModalFooterComponent,
          ModalHeaderComponent,
          ModalTitleDirective,
          ThemeDirective,
          IconDirective,
          RouterLink,
          ToastBodyComponent,
          ToastComponent,
          ToastHeaderComponent,
          ToasterComponent,
          ModalModule,
          ProgressBarComponent],
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.scss'
})
export class IndicatorsComponent {

  constructor(
    private router: Router,
    private indicatorsService: IndicatorsService
    ) { }

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

  public indicators: indicator[] = []

  toggleLiveDemo(id: number) {
    this.currentId = id;
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  getPaginatedIndicator(): void {
    this.indicatorsService.getPaginatedIndicator().subscribe({
      next: (response) => {
        console.log(response);
        this.indicators = response.data;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  deleteIndicator(): void {
    this.indicatorsService.deleteIndicator(this.currentId).subscribe({
      next:  () => {
        this.getPaginatedIndicator();
        this.visible = false;
        this.toggleToast('El indicador se ha eliminado exitosamente', true); 
      },
      error: (error) => {
        this.toggleToast('Error al eliminar el indicador', false); 
        console.log(error);
      },
    });
  }


  redirectToEdit(id: number): void {
     this.router.navigate([`editIndicators/${id}`]);
  }

  ngOnInit(): void {
     this.getPaginatedIndicator();
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
