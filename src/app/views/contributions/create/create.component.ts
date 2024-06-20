import { Component } from '@angular/core';
import { CreateDepartmentService } from '../../../services/departments/create-department.service';
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
  name = '';

  constructor(
    private createDepartmentService: CreateDepartmentService,
    private router: Router
  ) {}

  createDepartment(): void {
    this.createDepartmentService.postDepartment({ name: this.name }).subscribe({
      next: (response) => {
        this.router.navigate(['/departments']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
