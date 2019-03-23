import { Component, OnInit } from '@angular/core';
import {InteractionService} from '../services/interaction.service';
import {olx} from "openlayers";
import interaction = olx.interaction;
import {FormDataService} from "../services/form-data.service";
import {Proposition} from "../classes/proposition";

@Component({
  selector: 'app-create-point-button',
  templateUrl: './create-point-button.component.html',
  styleUrls: ['./create-point-button.component.css']
})
export class CreatePointButtonComponent implements OnInit {

  interaction: any;
  constructor(private interactionService: InteractionService, private formDataService: FormDataService) { }

  ngOnInit() {
    this.interaction = this.interactionService.createAddPointInteraction('drawPoint');
    this.interaction.on('drawend', e => {this.formDataService.setFormDataToTreat(new Proposition(e.feature.getGeometry())); });
  }

  activateCreatePoint() {
    this.interactionService.toggleInteraction('drawPoint');
  }

}
