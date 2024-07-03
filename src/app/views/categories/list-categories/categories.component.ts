import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalModule,
  ThemeDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  PageLinkDirective,
  PaginationComponent,
  PageItemDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';

import { CategoriesService } from 'src/app/services/categories/categories.service';

export interface Categorie {
  id: number;
  name: string;
  indicator: {
    id: number;
    name: string;
  };
  description: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ TextColorDirective,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    ButtonGroupComponent,
    FormCheckLabelDirective,
    CardFooterComponent,
    GutterDirective,
    ProgressBarDirective,
    ProgressComponent,
    CommonModule,
    CardHeaderComponent,
    TableDirective,
    ButtonCloseDirective,
    ButtonDirective,
    ModalModule,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective,
    PageItemDirective,
    PageLinkDirective,
    PaginationComponent,
    IconDirective,
    RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  constructor(
    private router: Router,
    private categoriesService: CategoriesService
  ) { }

  public categories: Categorie[] = []

  currentId = 0;
  public visible = false;


  getPaginatedCategories(): void {
    this.categoriesService.getPaginatedCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = response.data;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  deleteCategorie(): void {
    this.categoriesService.deleteCategorie(this.currentId).subscribe({
      next: () => {
        this.getPaginatedCategories();
        this.visible = !this.visible;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  redirectToEdit(id: number): void {
    this.router.navigate([`editcategories/${id}`]);
  }

  toggleLiveDemo(id: number) {
    this.currentId = id;
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
   ngOnInit(): void {
    this.getPaginatedCategories();
  }

}
