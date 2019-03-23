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

  interaction: any;
  constructor(private interactionService: InteractionService, private formDataService: FormDataService) { }

  ngOnInit() {
    this.interaction = this.interactionService.createAddPointInteraction('drawPoint');
    this.interaction.on('drawend', e => {
      this.formDataService.setFormDataToTreat(
        new Proposition(null, e.feature.getGeometry(), '', '')
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
