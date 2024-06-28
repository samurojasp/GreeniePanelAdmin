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
import { ContributionFile, ContributionLink } from 'src/app/types';
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

  constructor(
    private createDepartmentService: CreateDepartmentService,
    private router: Router
  ) {}

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

  createDepartment(): void {
    /*this.createDepartmentService.postDepartment({ name: this.name }).subscribe({
      next: () => {
        this.router.navigate(['/departments']);
      },
      error: (error) => {
        console.log(error);
      },
    });*/
  }
}
