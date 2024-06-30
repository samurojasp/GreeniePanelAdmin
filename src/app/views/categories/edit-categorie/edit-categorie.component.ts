import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { 
  ButtonDirective,
  ButtonGroupComponent,
  ButtonCloseDirective,
  CardBodyComponent,
  CardComponent,
  FormDirective,
  FormControlDirective,
  FormLabelDirective,
  FormSelectDirective,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  ToastBodyComponent,
  ToastComponent,
  ToastHeaderComponent,
  ToasterComponent
} from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Categorie } from 'src/app/types';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Indicator, Criteria } from '../types';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    ButtonDirective,
    ButtonGroupComponent,
    ButtonCloseDirective,
    CardBodyComponent,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    FormSelectDirective,
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
    RouterLink,
    ToasterComponent, 
    ToastComponent, 
    ToastHeaderComponent,
    ToastBodyComponent,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './edit-categorie.component.html',
  styleUrl: './edit-categorie.component.scss'
})
export class EditCategorieComponent {
  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public categories: Categorie[] = []

  id = 0;
  name = '';
  description = '';
  indicatorID = 0;
  criteriaID: number[] = [];
  currentId = 0;

  indicators: Indicator[] = [];
  criteria: Criteria[] = [];

  getCategorieById(id: number): void {
    this.categoriesService.getCategorieById(id).subscribe({
      next: (response) => {
        this.id = response.id;
        this.name = response.name;
        this.description = response.description;
        this.indicatorID = response.indicatorID;
        this.criteriaID = response.criteriaID;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  getIndicators(): void {
    this.categoriesService.getAllIndicators().subscribe({
      next: (response) => {
        console.log(response);
        this.indicators = response.data;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  getCriteria(): void {
    this.categoriesService.getAllCriteria().subscribe({
      next: (response) => {
        console.log(response);
        this.criteria = response.data;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }


  editCategorie(): void {

    const criteriaIdNumber = this.criteriaID.map((criterionId) =>
      Number(criterionId)
    );

    this.categoriesService.editCategorie( this.currentId,
       { id: this.id, name: this.name, description: this.description, indicatorID: Number(this.indicatorID), criteriaID: criteriaIdNumber, }).subscribe({
     next: (response) => {
        this.router.navigate([`categories`]); 
     },
     error: (error) => {
      console.log(this.id, this.name, this.indicatorID, this.criteriaID)
      console.log(error);
     },
   });
 }

 ngOnInit(): void {
  this.getIndicators();
  this.getCriteria();
  this.route.params.subscribe((params) => {
    this.currentId = params['id'];

  });

  this.getCategorieById(this.currentId);
}

}
