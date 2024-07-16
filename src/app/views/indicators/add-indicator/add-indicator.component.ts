import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CardBodyComponent,
  CardComponent,
  FormDirective,
  FormLabelDirective,
  FormSelectDirective,
  FormControlDirective,
  ButtonDirective,
  ButtonGroupComponent,
  ButtonCloseDirective,
  RowComponent,
  ToastBodyComponent,
  ToastComponent,
  ToastHeaderComponent,
  ToasterComponent,
  TextColorDirective,
  ProgressBarComponent,
  ProgressBarDirective,
  CardHeaderComponent,
  ColComponent,
  ProgressComponent,
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IndicatorsService } from 'src/app/services/indicators/indicators.service';

@Component({
  selector: 'app-add-indicator',
  standalone: true,
  imports: [
    CardBodyComponent,
    CardComponent,
    FormsModule,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    FormSelectDirective,
    ButtonDirective,
    ButtonGroupComponent,
    ButtonCloseDirective,
    RouterLink,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ButtonDirective,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
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
  templateUrl: './add-indicator.component.html',
  styleUrl: './add-indicator.component.scss',
})
export class AddIndicatorComponent {
  constructor(
    private indicatorsService: IndicatorsService,
    private router: Router
  ) {}

  name = '';
  englishName = '';
  index = 1;
  description = '';
  position = 'top-end';
  visible = false;
  percentage = 0;
  toastMessage = '';
  toastClass: string = '';

  addIndicator(): void {
    this.indicatorsService.addIndicator({ name: this.name, englishName: this.englishName , index: this.index, description: this.description }).subscribe({
     next: () => {
       this.toggleToast('El indicador se ha creado exitosamente', true); 
       setTimeout(() => {
         this.router.navigate([`indicators`]); 
       },1500)
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
}
