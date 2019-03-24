import { Component, OnInit } from '@angular/core';
import {Proposition} from '../../../classes/proposition';
import {FormDataService} from '../../../services/form-data.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {

  formDataToTreat: Proposition = new Proposition(null, null, null, null);
  types = {BENCH: 'Banc',
  BUS_STATION: 'Arrêt de bus',
  TRASH_BIN: 'Poubelle',
  CROSSWALK: 'Passage piétons',
  BICYCLE_PARKING: 'Parking vélo',
  BICYCLE_LANE: 'Piste cyclable'};

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
    this.formDataToTreat = this.formDataService.getFormDataToTreat();
    this.formDataToTreat.type = 'BENCH';
  }

  submitProposition() {
    this.formDataService.sendToBackend();
  }

  cancelProposition() {
    this.formDataService.cancelProposition();
  }

  getTypes() {
    return _.keys(this.types);
  }
}
