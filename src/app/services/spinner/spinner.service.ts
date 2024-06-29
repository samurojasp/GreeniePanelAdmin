import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinnerService: NgxSpinnerService) { }

  public show() {
    this.spinnerService.show();
    console.log('Buenas tardes...');
  }

  public hide() { 
    this.spinnerService.hide();
    console.log('Hasta luego...');
  }

}
