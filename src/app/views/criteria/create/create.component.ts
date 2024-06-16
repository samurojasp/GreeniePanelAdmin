import { Component } from '@angular/core';
import { GetAllIndicatorsService } from '../../../services/indicators/get-all-indicators.service';
import { CreateCriterionService } from '../../../services/criteria/create-criterion.service';
import { Router } from '@angular/router';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  FormSelectDirective,
  RowComponent,
  ToastBodyComponent,
  ToastComponent,
  ToastHeaderComponent,
  ToasterComponent,
  TextColorDirective,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { Indicator } from 'src/app/types';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    IconDirective,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    CardHeaderComponent,
    TextColorDirective,
    FormSelectDirective,
    FormsModule,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent,
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  name = '';
  description = '';
  index = 0;
  indicatorID = 0;

  indicators: Indicator[] = [];

  currentId = 0;
  departmentId = 0;
  role = ""; 
  position = 'top-end';
  visible = false;
  percentage = 0;
  toastMessage = ''; 
  toastClass: string = ''; 


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
    private createCriterionService: CreateCriterionService,
    private getIndicatorsService: GetAllIndicatorsService,
    private router: Router
  ) {}

  getIndicators(): void {
    this.getIndicatorsService.getAllIndicators().subscribe({
      next: (response) => {
        this.toggleToast('Criterio creado exitosamente', true);
        this.indicators = response.data;
        setTimeout(() => {
          this.router.navigate([`criteria`]);
        }, 1500);
      },
      error: (error) => {
        this.toggleToast('Error al crear criterio', false);
        console.log(error);
      },
    });
  }

  createCriterion(): void {
    this.createCriterionService
      .postCriterion({
        name: this.name,
        description: this.description,
        index: this.index,
        indicatorID: this.indicatorID,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/criteria']);
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
    this.percentage = $event * 100;
  }

  ngOnInit(): void {
  }


}
