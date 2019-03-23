import { Component, OnInit } from '@angular/core';
import {MapService} from '../../../services/map.service';

@Component({
  selector: 'app-layermanager',
  templateUrl: './layermanager.component.html',
  styleUrls: ['./layermanager.component.less']
})
export class LayermanagerComponent implements OnInit {

  layers = [];

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.refreshLayers();
    this.mapService.getMap().getLayers().on('propertychange', () => {
      console.log('A layer property has changed');
      this.refreshLayers();
    });
  }

  refreshLayers() {
    let newLayersList = [];
    this.mapService.getLayersInLayerManager().getArray().forEach(layer => {
      const layerProperty = layer.getProperties();
      layer.on('propertychange', e => {
        layerProperty.visible = e.target.getVisible();
      });
      newLayersList.push(layerProperty);
    });
    this.layers = newLayersList;
  }

  toggleLayerVisibility(layer, visible) {
    const layerObject = this.mapService.findLayerByName(layer.name);
    if (layerObject) {
      const visibility = (visible != null) ? visible : !layerObject.getVisible();
      layerObject.setVisible(visibility);
    }
  }
}
