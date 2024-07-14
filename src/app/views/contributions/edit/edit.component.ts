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
} from 'src/app/types';
import { IndicatorsService } from 'src/app/services/indicators/indicators.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { v4 as uuidv4 } from 'uuid';
import { NgFor, NgIf } from '@angular/common';
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
    NgIf,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  categoryOptions: Category[] = [];
  indicatorOptions: Indicator[] = [];
  currentId = 0;
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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
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

  getContribution(): void {
    this.contributionsService.getContributionById(this.currentId).subscribe({
      next: (response) => {
        console.log(response);
        this.contributionForm = this.formBuilder.group({
          uuid: [response.uuid],
          description: [response.description],
          categoryId: [response.categoryId],
          indicatorId: [response.indicatorID],
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
            name: file.name,
            description: file.description,
          });
          this.files.push(fileFormGroup);
          const blob = new Blob([file.path], {
            type: file.type,
          });
          const newFile = new File([blob], file.name, { type: file.type });
          this.newFiles.push(newFile);
        });
      },
    });
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
          console.log(this.newFiles);
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
    this.route.params.subscribe((params) => {
      this.currentId = params['id'];
    });
    this.getIndicators();
    this.getCategories();
    this.getContribution();
  }
}
