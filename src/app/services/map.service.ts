import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {ProjectionLike} from '../classes/projection-like';
import BaseLayer from 'ol/layer/Base';
import Collection from 'ol/Collection';
import * as proj4x from 'proj4';
const proj4 = (proj4x as any).default;
import {register} from 'ol/proj/proj4.js';
import {get as getProjection, getTransform} from 'ol/proj.js';
import {applyTransform} from 'ol/extent.js';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';
import {LayerService} from './layer.service';
import * as extent from 'ol/extent.js';
import {InteractionService} from "./interaction.service";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: Map;
  drawLayer: VectorLayer;
  projectionObject = {code: '31370', kind: 'CRS-PROJCRS', bbox: [51.51, 2.5, 49.5, 6.4], wkt: 'PROJCS["Belge 1972 / Belgian Lambert 72",GEOGCS["Belge 1972",DATUM["Reseau_National_Belge_1972",SPHEROID["International 1924",6378388,297,AUTHORITY["EPSG","7022"]],TOWGS84[-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747],AUTHORITY["EPSG","6313"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4313"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",51.16666723333333],PARAMETER["standard_parallel_2",49.8333339],PARAMETER["latitude_of_origin",90],PARAMETER["central_meridian",4.367486666666666],PARAMETER["false_easting",150000.013],PARAMETER["false_northing",5400088.438],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AXIS["X",EAST],AXIS["Y",NORTH],AUTHORITY["EPSG","31370"]]', unit: 'metre', proj4: '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs', name: 'Belge 1972 / Belgian Lambert 72', area: 'Belgium - onshore.', default_trans: 0, trans: [15749, 15929, 1609, 1610], accuracy: ''};
  constructor(private http: HttpClient, private layerService: LayerService, private interactionService: InteractionService) { }

  initMap() {
    const wallExtent: [number, number, number, number] = [295477.314255, 6347477.319654, 740430.033845, 6640885.073618];
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map',
      view: new View({
        extent: wallExtent,
        projection: 'EPSG:3857',
        center: extent.getCenter(wallExtent),
        zoom: 1
      })
    });
    this.map.on('rendercomplete', event => {
      console.log('rendered');
    });
    this.map.getView().fit(wallExtent);
    this.layerService.createLayers(this.map);
    this.interactionService.init(this.map);
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

  getMap(): Map {
    return this.map;
  }

  findLayerByName(name) {
    let layerObject = null;
    this.map.getLayers().forEach(l => {
      if (!layerObject && l.get('name') === name) {
        layerObject = l;
      }
    });
    return layerObject;
  }

  getLayersInLayerManager(): Collection<BaseLayer> {
    if (!this.map) {
      return new Collection();
    }
    return new Collection(
      this.map.getLayers().getArray().filter(layer => {
        return layer.get('showInLayerManager') === true;
      })
    );
  }
}
