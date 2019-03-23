import { Injectable } from '@angular/core';
import {MapService} from './map.service';
import Map from 'ol/Map';
import Draw from 'ol/interaction/Draw.js';
import {LayerService} from './layer.service';
import * as _ from 'lodash';
import Select from 'ol/interaction/Select.js';
import {click, shiftKeyOnly} from '../../../node_modules/ol/events/condition.js';


@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  map: Map;
  interactions: any = {};
  currentInteraction: string;

  constructor(private layerService: LayerService) { }

  init(map: Map) {
    this.map = map;
  }

  createAddPointInteraction(name: string) {
    let draw; // global so we can remove it later
    draw = new Draw({
      source: this.layerService.drawLayer.getSource(),
      type: 'Point'
    });
    this.interactions[name] = draw;
    return draw;
  }

  createSelectMultiInteraction(name: string) {
    let select;
    select = new Select({
      condition: click,
      toggleCondition: shiftKeyOnly,
    });
    this.interactions[name] = select;
    return select;
  }

  toggleInteraction(name) {
    this.map.removeInteraction(this.interactions[this.currentInteraction]);
    if(name !== this.currentInteraction){
      this.map.addInteraction(this.interactions[name]);
      this.currentInteraction = name;
    } else{
      this.currentInteraction = null;
    }
  }
}
