import { Injectable } from '@angular/core';
import {Layer} from '../classes/layer';
import Image from 'ol/layer/Image';
import {projection} from '@angular/core/src/render3';
import {MapService} from './map.service';
import ImageWMS from 'ol/source/ImageWMS';
import Map from 'ol/Map';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';
import {Style} from 'ol/style.js';
import Stroke from 'ol/style/Stroke';
import GeoJSON from 'ol/format/GeoJSON';
import {bbox as bboxStrategy} from 'ol/loadingstrategy.js';
import {DataService} from "./data.service";
import Feature from 'ol/Feature.js';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  layers: any = {};
  map: Map;
  drawLayer: VectorLayer;
  constructor(private dataService: DataService) {
  }

  createLayers(map: Map) {
    this.map = map;

    // draw layer
    let drawLy;
    drawLy = new Layer('', 'Draw Layer', '', [], '', '', false);
    this.drawLayer = this.createEmptyVectorLayer();
    drawLy.olLayer = this.drawLayer;
    this.layers['Draw Layer'] = drawLy;

    // picc wms
    const picLayer = new Layer('http://geoservices.wallonie.be/arcgis/services/TOPOGRAPHIE/PICC_VDIFF/MapServer/WMSServer?', 'Fond de plan PICC',
      '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27',
      [30000.000000, 15000.000000, 310000.000000, 200000.000000], 'EPSG:3857', 'WMS', true);
    const piccWms = this.createWMSLayer(picLayer);
    piccWms.set('name', picLayer.name);
    piccWms.set('showInLayerManager', true);
    picLayer.olLayer = piccWms;
    this.layers['Fond de plan PICC'] = picLayer;
    map.addLayer(piccWms);
    // proposal
    let proposalLayer;
    proposalLayer = new Layer('', 'proposals', '', [], '', '', true);
    proposalLayer.olLayer = this.createEmptyVectorLayer();
    proposalLayer.olLayer.set('showInLayerManager', proposalLayer.showInLayerManager);
    proposalLayer.olLayer.set('name', proposalLayer.name);
    this.layers.proposals = proposalLayer;
    this.map.addLayer(this.layers.proposals.olLayer);
    this.map.addLayer(this.drawLayer);

    this.loadProposals();
    return ;
  }

  loadProposals() {
    this.dataService.loadProposals().subscribe(response => {
      this.dataService.proposals.forEach(proposal => {
        this.layers.proposals.olLayer.getSource().addFeature(new Feature({geometry: proposal.geometry}));
      });
    });
  }

  createEmptyVectorLayer(): VectorLayer {
    return new VectorLayer({
      source: new VectorSource({wrapX: false})
    });
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

  createWFSLayer(layer: Layer) {
    const vectorSource = new VectorSource({
      format: new GeoJSON(),
      url(extent) {
        return layer.baseUrl + 'service=WFS&'
        + 'version=1.1.0&'
        + '&request=GetFeature&'
        + 'typename=' + layer.layerName + '&'
        + 'outputformat=application/json&'
        + 'srsname=' + this.map.getView().getProjection().getCode() + '&'
        + 'bbox=' + extent.join(',') + ',' + this.map.getView().getProjection().getCode();
        // return 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
        //   'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
        //   'outputFormat=application/json&srsname=EPSG:3857&' +
        //   'bbox=' + extent.join(',') + ',EPSG:3857';
      },
      strategy: bboxStrategy
    });

    const vector = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(0, 0, 255, 1.0)',
          width: 2
        })
      })
    });
    return vector;
  }

}
