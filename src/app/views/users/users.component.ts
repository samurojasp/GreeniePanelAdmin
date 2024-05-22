import { DOCUMENT, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AvatarComponent,
  ButtonDirective,
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
  PageItemDirective,
  PageLinkDirective,
  PaginationComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';

interface IUser {
  name: string;
  email: string;
  registered: string;
  activity: string;
  status: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [PaginationComponent,PageItemDirective,PageLinkDirective,RouterLink,WidgetsDropdownComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, FormsModule, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  
  public users: IUser[] = [
    {
      name: "Anna",
      email: "anna@gmail.com",
      registered: "Hoy",
      activity: "Seguridad",
      status: "Proteger a los ucabistas"
    },
    {
      name: "Ana",
      email: "anna@gmail.com",
      registered: "Hoy",
      activity: "Seguridad",
      status: "Proteger a los ucabistas"
    }
  ];

  editUser(user: IUser) {
    console.log(user);
  }

  deleteUser(user: IUser) {
    console.log(user);
  }

}
