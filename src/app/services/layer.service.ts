import { Injectable } from '@angular/core';
import {Layer} from '../classes/layer';
import Image from 'ol/layer/Image';
import {projection} from '@angular/core/src/render3';
import {MapService} from './map.service';
import ImageWMS from 'ol/source/ImageWMS';
import Map from 'ol/Map';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  layers: Layer[];
  map: Map;
  drawLayer: VectorLayer;
  constructor() {
  }

  createLayers(map: Map) {
    this.map = map;

    // draw layer
    this.drawLayer = new VectorLayer({
      source: new VectorSource({wrapX: false})
    });
    map.addLayer(this.drawLayer);

    // picc wms
    const picLayer = new Layer('http://geoservices.wallonie.be/arcgis/services/TOPOGRAPHIE/PICC_VDIFF/MapServer/WMSServer?', 'Fond de plan PICC',
      '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27',
      [30000.000000, 15000.000000, 310000.000000, 200000.000000], 'EPSG:3857', 'WMS')
    const piccWms = this.createWMSLayer(picLayer);
    piccWms.set('name', picLayer.name);
    piccWms.set('showInLayerManager', true);
    map.addLayer(piccWms);
    return ;
  }

  createWMSLayer(layer: Layer): Image {
    return new Image(
      {
        opacity: layer.opacity,
        visible: layer.visible,
        extent: this.map.getView().getProjection().getExtent(),
        source: new ImageWMS({
          hidpi: false,
          url: layer.baseUrl,
          crossOrigin: null,
          params: {LAYERS: layer.layerName, CRS: layer.dataProjection, FORMAT: 'image/png'},
          projection: layer.dataProjection,
          serverType: 'geoserver'
        })
      }
    );
  }
}
