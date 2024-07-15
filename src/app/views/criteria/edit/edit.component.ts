import { Component } from '@angular/core';
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
  ToasterComponent,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
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
    NgxSpinnerModule,
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  currentId = 0;
  name = '';
  englishName = '';
  description = '';
  index = 0;
  indicatorID = 0;
  departmentId = 0;
  role = '';
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
      next: (response) => {
        this.indicators = response.data;
      },
      error: (error) => {
        if (error.error.error.message && error.error.error.detail[0].message)
          this.toggleToast(error.error.error.detail[0].message, false);
        if (error.error.error.message && !error.error.error.detail[0].message)
          this.toggleToast(error.error.error.message, false);
      },
    });
  }

  getCriterionById(id: number): void {
    this.getCriterionByIdService.getCriterionById(id).subscribe({
      next: (response) => {
        this.name = response.name;
        this.englishName = response.englishName;
        this.description = response.description;
        this.indicatorID = response.indicator.id;
        this.index = response.index;
      },
      error: (error) => {
        if (error.error.error.message && error.error.error.detail[0].message)
          this.toggleToast(error.error.error.detail[0].message, false);
        if (error.error.error.message && !error.error.error.detail[0].message)
          this.toggleToast(error.error.error.message, false);
      },
    });
  }

  editCriterion(): void {
    this.editCriterionService
      .patchCriterion(this.currentId, {
        name: this.name,
        englishName: this.englishName,
        description: this.description,
        indicatorID: this.indicatorID,
        index: this.index,
      })
      .subscribe({
        next: () => {
          this.toggleToast('Se ha editado el criterio correctamente', true); // Mostrar toast de éxito
          setTimeout(() => {
            this.router.navigate([`criteria`]);
          }, 1500);
        },
        error: (error) => {
          if (error.error.error.message && error.error.error.detail[0].message)
            this.toggleToast(error.error.error.detail[0].message, false);
          if (error.error.error.message && !error.error.error.detail[0].message)
            this.toggleToast(error.error.error.message, false);
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
    this.getCriterionById(this.currentId);
  }
}
