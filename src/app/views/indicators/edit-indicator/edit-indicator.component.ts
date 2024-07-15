import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  CardHeaderComponent,
  TextColorDirective,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  ToastBodyComponent,
  ToastComponent,
  ToastHeaderComponent,
  ToasterComponent,
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';

import { IndicatorsService } from 'src/app/services/indicators/indicators.service';

@Component({
  selector: 'app-edit-indicator',
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
    FormControlDirective,
    FormDirective,
    FormLabelDirective,
    FormSelectDirective,
    TextColorDirective,
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent,
  ],
  templateUrl: './edit-indicator.component.html',
  styleUrl: './edit-indicator.component.scss',
})
export class EditIndicatorComponent {
  currentId = 0;
  currentName = '';
  departmentId = 0;
  role = '';
  position = 'top-end';
  visible = false;
  percentage = 0;
  toastMessage = '';
  toastClass: string = '';

  name = '';
  index = 1;
  description = '';
  constructor(
    private indicatorsService: IndicatorsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getIndicatorById(id: number): void {
    this.indicatorsService.getIndicatorById(id).subscribe({
      next: (response) => {
        this.name = response.name;
        this.index = response.index;
        this.description = response.description;
      },
      error: (error) => {
        if (error.error.error.message && error.error.error.detail[0].message)
          this.toggleToast(error.error.error.detail[0].message, false);
        if (error.error.error.message && !error.error.error.detail[0].message)
          this.toggleToast(error.error.error.message, false);
      },
    });
  }

  editIndicator(): void {
    this.indicatorsService
      .editIndicator(this.currentId, {
        name: this.name,
        index: this.index,
        description: this.description,
      })
      .subscribe({
        next: () => {
          this.toggleToast('Indicador editado exitosamente', true);
          setTimeout(() => {
            this.router.navigate([`indicators`]);
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

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentId = params['id'];
      this.currentName = params['name'];
    });

    this.getIndicatorById(this.currentId);
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
