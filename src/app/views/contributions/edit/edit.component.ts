import { Component } from '@angular/core';
import { ContributionsService } from '../../../services/contributions/contributions.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormControlDirective,
  FormDirective,
  ImgDirective,
  FormLabelDirective,
  FormSelectDirective,
  RowComponent,
  TextColorDirective,
  ToastBodyComponent,
  ToastComponent,
  ToastHeaderComponent,
  ToasterComponent,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import {
  FormBuilder,
  FormsModule,
  FormGroup,
  FormArray,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Category,
  ContributionFile,
  ContributionLink,
  Indicator,
  SettingBody,
} from 'src/app/types';
import { IndicatorsService } from 'src/app/services/indicators/indicators.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { v4 as uuidv4 } from 'uuid';
import { NgFor, NgIf } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GetSettingService } from 'src/app/services/settings/get-settings.service';

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
    ImgDirective,
    ReactiveFormsModule,
    NgFor,
    NgxSpinnerModule,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent,
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
    NgIf,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  categoryOptions: Category[] = [];
  indicatorOptions: Indicator[] = [];
  indicatorId = 0;
  currentId = 0;
  position = 'top-end';
  visible = false;
  percentage = 0;
  toastMessage = '';
  toastClass: string = '';

  setting: SettingBody = {
    key: '',
    contributionSettings: {
      initDate: new Date(),
      endDate: new Date(),
      getNotificationForContribution: false,
      recordatory: true,
    },
  };

  isLate: boolean = false;
  isDisabled: boolean = false;
  remainingTime: number = 0;
  message: string = '';

  newFiles: File[] = [];

  constructor(
    private contributionsService: ContributionsService,
    private indicatorsService: IndicatorsService,
    private categoriesService: CategoriesService,
    private getSettingService: GetSettingService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.contributionForm = this.formBuilder.group({
      uuid: [''],
      description: ['', this.isDisabled],
      categoryId: [0],
      indicatorId: [0],
      links: this.formBuilder.array([]),
      files: this.formBuilder.array([]),
    });
  }

  contributionForm: FormGroup;

  createFileFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: 0,
      name: [''],
      description: [''],
    });
  }

  createLinkFormGroup(): FormGroup {
    return this.formBuilder.group({
      URL: [''],
      description: [''],
    });
  }

  get files() {
    return this.contributionForm!.get('files') as FormArray;
  }

  get links() {
    return this.contributionForm!.get('links') as FormArray;
  }

  addFiles(): void {
    this.files.push(this.createFileFormGroup());
  }

  addLinks(): void {
    this.links.push(this.createLinkFormGroup());
  }

  removeLink(index: number): void {
    this.links.removeAt(index);
  }

  removeFile(index: number): void {
    this.files.removeAt(index);
    this.newFiles.splice(index, 1);
  }

  getContribution(): void {
    this.contributionsService.getContributionById(this.currentId).subscribe({
      next: (response) => {
        this.indicatorId = response.category.indicator.id;
        this.contributionForm = this.formBuilder.group({
          uuid: [response.uuid],
          description: [response.description],
          categoryId: [response.category.id],
          indicatorId: [response.category.indicator.id],
          links: this.formBuilder.array([]),
          files: this.formBuilder.array([]),
        });

        response.link.map((link: ContributionLink) =>
          this.links.push(
            this.formBuilder.group({
              URL: [link.URL],
              description: [link.description],
            })
          )
        );
        response.files.map((file: any) => {
          const fileFormGroup = this.createFileFormGroup();
          fileFormGroup.patchValue({
            id: file.id,
            name: file.name,
            description: file.description,
          });
          this.files.push(fileFormGroup);
          console.log(this.files.controls[0].value.name);
        });
      },
    });
  }

  getIndicators(): void {
    this.indicatorsService.getAllIndicators().subscribe({
      next: (response) => {
        console.log('Indicadores =>', response.data);
        this.indicatorOptions = response.data;
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

  onIndicatorChange(target: any): void {
    this.indicatorId = parseInt(target.value);
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        if (this.indicatorId == 0) this.categoryOptions = response.data;
        if (this.indicatorId != 0) {
          this.categoryOptions = response.data.filter(
            (category: Category) => category.indicator.id === this.indicatorId
          );
        }
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

  handleFileChange(event: any, index: number): void {
    this.newFiles[index] = event.target.files[0];
    this.files.at(index).patchValue({ name: event.target.files[0].name });
  }

  patchContribution(): void {
    this.contributionsService
      .postContribution({
        uuid: this.contributionForm.value.uuid,
        description: this.contributionForm.value.description,
        categoryId: this.contributionForm.value.categoryId,
        indicatorID: this.contributionForm.value.indicatorId,
        links: this.contributionForm.value.links,
        file: this.contributionForm.value.files,
        files: this.newFiles,
      })
      .subscribe({
        next: () => {
          this.toggleToast('El aporte se ha creado exitosamente', true);
          setTimeout(() => {}, 1500);
          console.log({
            uuid: this.contributionForm.value.uuid,
            description: this.contributionForm.value.description,
            categoryId: this.contributionForm.value.categoryId,
            indicatorID: this.contributionForm.value.indicatorId,
            links: this.contributionForm.value.links,
            file: this.contributionForm.value.files,
            files: this.newFiles,
          });
          this.router.navigate([`contributions`]);
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

  getSettings(): void {
    this.getSettingService
      .getSetting('81ed6231-5be6-4166-9118-d982038a2fc7')
      .subscribe({
        next: (response) => {
          this.setting = response;
          this.calculateTime();
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

  calculateTime(): void {
    const tiempoLimite =
      (new Date(this.setting.contributionSettings.endDate).getTime() -
        new Date(this.setting.contributionSettings.initDate).getTime()) *
      0.3;

    this.remainingTime =
      new Date(this.setting.contributionSettings.endDate).getTime() -
      new Date().getTime();

    if (tiempoLimite >= this.remainingTime) {
      this.isLate = true;
      this.remainingTime = Math.ceil(
        this.remainingTime / (1000 * 60 * 60 * 24)
      );

      if (this.remainingTime == 1) {
        this.message = `Advertencia, queda apróximadamente ${this.remainingTime} día para realizar aportes`;
      } else {
        this.message = `Advertencia, quedan apróximadamente ${this.remainingTime} días para realizar aportes`;
      }
    } else {
      this.isLate = false;
    }

    if (this.remainingTime <= 0) this.isDisabled = true;

    if (this.isDisabled) {
      //this.contributionForm.disable();
    } else {
      this.contributionForm.enable();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentId = params['id'];
    });
    this.getIndicators();
    this.getCategories();
    this.getContribution();
    this.getSettings();
    this.calculateTime();
  }
}
