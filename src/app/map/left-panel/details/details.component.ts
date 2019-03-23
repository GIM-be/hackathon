import { Component, OnInit } from '@angular/core';
import {Proposition} from '../../../classes/proposition';
import {FormDataService} from '../../../services/form-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {

  formDataToTreat: Proposition;

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
    this.formDataToTreat = this.formDataService.getFormDataToTreat();
  }

  submitProposition() {
    this.formDataService.sendToBackend();
  }
}
