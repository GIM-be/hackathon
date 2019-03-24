import { Component, OnInit } from '@angular/core';
import {Proposition} from '../../classes/proposition';
import {InteractionService} from '../../services/interaction.service';
import {FormDataService} from '../../services/form-data.service';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent implements OnInit {

  drawPoint: any;
  drawLine: any;
  drawPolygon: any;
  createSelectRoad: any;

  constructor(private interactionService: InteractionService,
              private formDataService: FormDataService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.drawPoint = this.interactionService.createAddPointInteraction('drawPoint');
    this.drawLine = this.interactionService.createAddLineInteraction('drawLine');
    this.drawPolygon = this.interactionService.createAddPolygonInteraction('drawPolygon');
    this.createSelectRoad = this.interactionService.createSelectRoad();
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

  toggleLoginForm() {
    this.loginService.toggleLoginForm();
  }

  confirmInteractionAction() {
    this.interactionService.confirmBeformAction.ok();
  }

  cancelInteractionAction() {
    if(this.interactionService.confirmBeformAction){
      this.interactionService.confirmBeformAction.cancel();
    }
    this.interactionService.toggleInteraction('selectRoad');
  }

}
