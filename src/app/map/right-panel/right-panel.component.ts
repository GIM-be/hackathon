import { Component, OnInit } from '@angular/core';
import {MapService} from '../../services/map.service';
import {ResponsivenessServiceService} from '../../services/responsiveness-service.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.less']
})
export class RightPanelComponent implements OnInit {

  openRightPanel;
  getNbLayers = this.getNbLayersInLayerManager;
  isMobileScreen = this.responsivenessServiceService.isMobileScreen;

  constructor(private responsivenessServiceService: ResponsivenessServiceService,
              private mapService: MapService) { }

  ngOnInit() {
    this.openRightPanel = !this.responsivenessServiceService.isMobileScreen();
  }

  toggleRightPanel() {
    this.openRightPanel = !this.openRightPanel;
  }

  getNbLayersInLayerManager() {
    return this.mapService.getLayersInLayerManager().getLength();
  }

  backdropActive() {
    return this.responsivenessServiceService.isMobileScreen() && this.openRightPanel;
  }

  backdropClicked() {
    if (this.openRightPanel) {
      this.toggleRightPanel();
    }
  }
}
