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
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import {
  Category,
  ContributionFile,
  ContributionLink,
  Indicator,
} from 'src/app/types';
import { IndicatorsService } from 'src/app/services/indicators/indicators.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { v4 as uuidv4 } from 'uuid';

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
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  uuid: string = '';
  description: string = '';
  categoryId: number = 0;
  indicatorId: number = 0;
  links: ContributionLink[] = [];
  files: ContributionFile[] = [];

  categoryOptions: Category[] = [];
  indicatorOptions: Indicator[] = [];

  constructor(
    private contributionsService: ContributionsService,
    private indicatorsService: IndicatorsService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  getIndicators(): void {
    this.indicatorsService.getAllIndicators().subscribe({
      next: (response) => {
        this.indicatorOptions = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getCategories(): void {
    this.categoriesService.getPaginatedCategories().subscribe({
      next: (response) => {
        this.categoryOptions = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addFile(): void {
    const newFile = { name: '', description: '', file: null };
    this.files.push(newFile);
  }

  addLink(): void {
    const newLink = { URL: '', description: '' };
    this.links.push(newLink);
  }

  deleteFile(index: number): void {
    console.log(index);
    this.files.splice(index, 1);
    console.log(this.files);
  }

  postContribution(): void {
    this.uuid = uuidv4();
    this.contributionsService
      .postContribution({
        uuid: this.uuid,
        description: this.description,
        categoryId: this.categoryId,
        indicatorID: this.indicatorId,
        links: this.links,
        file: this.files,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/contributions']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit(): void {
    this.getIndicators();
    this.getCategories();
  }
}
