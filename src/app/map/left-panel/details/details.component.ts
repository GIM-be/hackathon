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
  relevant = true;

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
    this.formDataToTreat = this.formDataService.getFormDataToTreat();
    this.formDataToTreat.type = 'BENCH';
    this.checkIfPropositionRelevant();
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

  checkIfPropositionRelevant() {
    this.formDataService.checkIfPropositionRelevant(this.formDataToTreat).subscribe((response: boolean) => {
      this.relevant = response;
    });
  }

  changeType(type) {
    this.formDataToTreat.type = type;
    this.checkIfPropositionRelevant();
  }
}
