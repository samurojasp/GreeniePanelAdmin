import { Component } from '@angular/core';
import { ContributionsService } from '../../../services/contributions/contributions.service';
import { Router } from '@angular/router';
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
} from 'src/app/types';
import { IndicatorsService } from 'src/app/services/indicators/indicators.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { v4 as uuidv4 } from 'uuid';
import { NgFor } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

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
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  categoryOptions: Category[] = [];
  indicatorOptions: Indicator[] = [];

  position = 'top-end';
  visible = false;
  percentage = 0;
  toastMessage = '';
  toastClass: string = '';

  newFiles: File[] = [];

  constructor(
    private contributionsService: ContributionsService,
    private indicatorsService: IndicatorsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.contributionForm = this.formBuilder.group({
      uuid: [''],
      description: [''],
      categoryId: [0],
      indicatorId: [0],
      links: this.formBuilder.array([]),
      files: this.formBuilder.array([]),
    });
  }

  contributionForm: FormGroup;

  createFileFormGroup(): FormGroup {
    return this.formBuilder.group({
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

  getIndicators(): void {
    this.indicatorsService.getAllIndicators().subscribe({
      next: (response) => {
        this.indicatorOptions = response.data;
      },
      error: (error) => {
        this.toggleToast(error.message, false);
      },
    });
  }

  getCategories(): void {
    this.categoriesService.getPaginatedCategories().subscribe({
      next: (response) => {
        this.categoryOptions = response.data;
      },
      error: (error) => {
        this.toggleToast(error.message, false);
      },
    });
  }

  handleFileChange(event: any, index: number): void {
    this.newFiles[index] = event.target.files[0];
  }

  addLink(): void {
    this.files.push(this.createFileFormGroup());
  }

  postContribution(): void {
    this.contributionsService
      .postContribution({
        uuid: uuidv4(),
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
          this.router.navigate([`contributions`]);
        },
        error: (error) => {
          console.log(error);
          this.toggleToast(error.message, false);
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
    this.getIndicators();
    this.getCategories();
  }
}