import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {ProjectionLike} from './projection-like';
import * as proj4x from 'proj4';
const proj4 = (proj4x as any).default;
import {register} from 'ol/proj/proj4.js';
import {extent, proj} from 'openlayers';
import {get as getProjection, getTransform} from 'ol/proj.js';
import {applyTransform} from 'ol/extent.js';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: Map;
  drawLayer: VectorLayer;
  constructor(private http: HttpClient) { }

  initMap() {
    const source = new VectorSource({wrapX: false});

    this.drawLayer = new VectorLayer({
      source
    });
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.drawLayer
      ],
      target: 'map',
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 1
      })
    });
    this.map.on('rendercomplete', event => {
      console.log('rendered');
    });
    this.searchProjection('31370');
  }

  searchProjection(code) {
    this.http.get<any>('https://epsg.io/?format=json&q=' + code).subscribe(response => {
      response.results.forEach(result => {
        this.setProjection(new ProjectionLike(result));
      });
    });
  }

  setProjection(projection) {
    if (projection.code === null || projection.name === null || projection.proj4 === null || projection.bbox === null) {
      this.map.setView(new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 1
      }));
      return;
    }

    const newProjCode = 'EPSG:' + projection.code;
    proj4.defs(newProjCode, projection.proj4);
    register(proj4);
    const newProj = getProjection(newProjCode);
    const fromLonLat = getTransform('EPSG:4326', newProj);

    // very approximate calculation of projection extent
    const newExtent = applyTransform(
        [projection.bbox[1], projection.bbox[2], projection.bbox[3], projection.bbox[0]], fromLonLat);
    newProj.setExtent(newExtent);
    const newView = new View({
      projection: newProj
    });
    this.map.setView(newView);
    newView.fit(newExtent);
  }

  getDrawLayer(): VectorLayer {
    return this.drawLayer;
  }
}
