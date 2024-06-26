import { Component } from '@angular/core';
//import { EditCriteriaervice } from '../../../services/criteria/edit-criterion.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  TextColorDirective,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  ToastBodyComponent,
  ToastComponent,
  ToastHeaderComponent,
  ToasterComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { GetCriterionByIdService } from 'src/app/services/criteria/get-criterion-by-id.service';
import { GetAllIndicatorsService } from 'src/app/services/indicators/get-all-indicators.service';
import { EditCriterionService } from 'src/app/services/criteria/edit-criterion.service';

import { Indicator } from 'src/app/types';
@Component({
  selector: 'app-edit',
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
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  currentId = 0;
  name = '';
  description = '';
  index = 0;
  indicatorID = 0;
  departmentId= 0;
  role= "";
  position = 'top-end';
  visible = false;
  percentage = 0;
  toastMessage = ''; 
  toastClass: string = ''; 

  indicators: Indicator[] = [];

  constructor(
    private editCriterionService: EditCriterionService,
    private getCriterionByIdService: GetCriterionByIdService,
    private router: Router,
    private getIndicatorsService: GetAllIndicatorsService,
    private route: ActivatedRoute
  ) {}

  getIndicators(): void {
    this.getIndicatorsService.getAllIndicators().subscribe({
      next:  (response) => {
        this.indicators = response.data;
       },
    });
  }

  getCriterionById(id: number): void {
    this.getCriterionByIdService.getCriterionById(id).subscribe({
      next: (response) => {
        this.name = response.name;
        this.description = response.description;
        this.indicatorID = response.indicator.id;
        this.index = response.index;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  editCriterion(): void {
    this.editCriterionService
      .patchCriterion(this.currentId, {
        name: this.name,
        description: this.description,
        indicatorID: this.indicatorID,
        index: this.index,
      })
      .subscribe({
        next: () => {
          this.toggleToast('Se ha editado el criterio correctamente', true); // Mostrar toast de éxito
          setTimeout(() => {
            this.router.navigate([`criteria`]); 
          },1500)
        },
        error: (error) => {
          this.toggleToast(error.message, false); 
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
    this.route.params.subscribe((params) => {
      this.currentId = params['id'];
    });
    this.getIndicators();
  }

}
