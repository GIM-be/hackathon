import { Component, OnInit } from '@angular/core';
import {Proposition} from '../../classes/proposition';
import {InteractionService} from '../../services/interaction.service';
import {FormDataService} from '../../services/form-data.service';

@Component({
  selector: 'app-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.less']
})
export class BottomPanelComponent implements OnInit {

  drawPoint: any;
  drawLine: any;
  drawPolygon: any;
  constructor(private interactionService: InteractionService, private formDataService: FormDataService) { }

  ngOnInit() {
    this.drawPoint = this.interactionService.createAddPointInteraction('drawPoint');
    this.drawLine = this.interactionService.createAddLineInteraction('drawLine');
    this.drawPolygon = this.interactionService.createAddPolygonInteraction('drawPolygon');
    this.drawPoint.on('drawend', e => {
      this.formDataService.setFormDataToTreat(
        new Proposition(null, e.feature, '', '')
      );
    });
    this.drawLine.on('drawend', e => {
      this.formDataService.setFormDataToTreat(
        new Proposition(null, e.feature, '', '')
      );
    });
    this.drawPolygon.on('drawend', e => {
      this.formDataService.setFormDataToTreat(
        new Proposition(null, e.feature, '', '')
      );
    });
  }

  activateInteraction(type) {
    this.interactionService.toggleInteraction(type);
  }

  isInteractionActive(type) {
    return type === this.interactionService.currentInteraction;
  }
}
