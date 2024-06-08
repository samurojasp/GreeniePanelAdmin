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
import { Categorie } from '../list-categories/categories.component';
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
    ToastBodyComponent
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
  currentId = 0;

  indicators: Indicator[] = [];
  criteria: Criteria[] = [];

  getCategorieById(id: number): void {
    this.categoriesService.getCategorieById(id).subscribe({
      next: (response) => {
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

  editUser(): void {
    this.categoriesService.editCategorie( this.currentId,
       { id: this.id, name: this.name, description: this.description, indicatorID: this.indicatorID }).subscribe({
     next: (response) => {
        this.router.navigate([`users`]); 
     },
     error: (error) => {
      console.log(error);
     },
   });
 }

 ngOnInit(): void {
  this.getIndicators();
  this.route.params.subscribe((params) => {
    this.currentId = params['id'];

  });

  this.getCategorieById(this.currentId);
}

}
