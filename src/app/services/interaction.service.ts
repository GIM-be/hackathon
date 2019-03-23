import {Component, Injectable} from '@angular/core';
import {MapService} from './map.service';
import Map from 'ol/Map';
import Draw from 'ol/interaction/Draw.js';
import {LayerService} from './layer.service';
import * as _ from 'lodash';
import {olx} from 'openlayers';
import interaction = olx.interaction;
import Select from 'ol/interaction/Select.js';
import {click, shiftKeyOnly, pointerMove, altKeyOnly, singleClick} from '../../../node_modules/ol/events/condition.js';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import {DataService} from './data.service';
import {Proposition} from "../classes/proposition";
import {Vector as VectorLayer} from 'ol/layer';


@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  @ViewChild('content') private content;
  map: Map;
  interactions: any = {};
  currentInteraction: string;
  showProposalModalValue: any= {value: false};
  selectedProposal: Proposition;
  constructor(private layerService: LayerService, private dataService: DataService) { }

  init(map: Map) {
    this.map = map;
    this.createSelectProposal();
    this.toggleInteraction('selectProposal');
  }

  createSelectProposal() {
    this.interactions.selectProposal = new Select({
      layers: [this.layerService.layers.proposals.olLayer],
      hitTolerance: 15
    });
    this.interactions.selectProposal.on('select', e => {
      this.selectedProposal = _.find(this.dataService.proposals, proposal => {
        return proposal.id === e.selected[0].get('techId');
      });
      this.showProposalModalValue.value = true;
    });
  }

  deselectProposal(){
    this.interactions.selectProposal.getFeatures().clear();
    this.showProposalModalValue.value = false;
  }

  showProposalModal() {
    return this.showProposalModalValue;
  }

  getSelectedProposal() {
    return this.selectedProposal;
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

  createSelectMultiInteraction(name: string, layer: VectorLayer) {
    let select;
    select = new Select({
      condition: click,
      toggleCondition: shiftKeyOnly,
      layers: l => {
        return l === layer;
      }
    });
    this.interactions[name] = select;
    return select;
  }

  toggleInteraction(name) {
    this.map.removeInteraction(this.interactions[this.currentInteraction]);
    if (name !== this.currentInteraction) {
      this.map.addInteraction(this.interactions[name]);
      this.currentInteraction = name;
    } else {
      this.currentInteraction = this.interactions.selectProposal;
    }
  }
}
