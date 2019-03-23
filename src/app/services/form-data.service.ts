import { Injectable } from '@angular/core';
import {Proposition} from '../classes/proposition';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  formDataToTreat: Proposition;
  constructor() { }

  setFormDataToTreat(formData) {
    this.formDataToTreat = formData;
    console.log(formData);
  }
}
