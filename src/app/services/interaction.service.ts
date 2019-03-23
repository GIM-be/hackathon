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
import {Proposition} from '../classes/proposition';
import {Vector as VectorLayer} from 'ol/layer';
import {FormDataService} from './form-data.service';
import {ConfirmBeforeAction} from '../classes/confirm-before-action';
import * as jsts from 'jsts';
import Feature from 'ol/Feature.js';
import MultiLineString from 'ol/geom/MultiLineString';


@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  @ViewChild('content') private content;
  map: Map;
  interactions: any = {};
  currentInteraction: string;
  showProposalModalValue: any = {value: false};
  selectedProposal: Proposition;
  confirmBeformAction: ConfirmBeforeAction;
  constructor(private layerService: LayerService, private dataService: DataService, private formDataService: FormDataService) { }

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

  createSelectRoad() {
    this.interactions.selectRoad = new Select({
      layers: [this.layerService.layers.routeCyclable.olLayer],
      hitTolerance: 15,
      multi: true
    });

    this.interactions.selectRoad.on('select', e => {
      if (!this.confirmBeformAction) {
        this.confirmBeformAction = new ConfirmBeforeAction(() => {
          const features = e.selected;
          const result = new MultiLineString(_.map(features, feature => feature.getGeometry()));
          let newProposition = new Proposition(null, new Feature({geometry: result}), null, null);
          this.layerService.layers.proposals.olLayer.getSource().addFeature(newProposition.feature);
          this.formDataService.setFormDataToTreat(newProposition);
          this.confirmBeformAction = null;
        }, () => {
          this.interactions.selectRoad.getFeatures().clear();
          this.confirmBeformAction = null;
        });
      }
    });
  }

  deselectProposal() {
    this.interactions.selectProposal.getFeatures().clear();
    this.showProposalModalValue.value = false;
  }

  showProposalModal(proposal?: Proposition) {
    if(proposal) {
      this.showProposalModalValue.value = true;
      this.selectedProposal = proposal;
    }
    return this.showProposalModalValue;
  }

  getSelectedProposal() {
    return this.selectedProposal;
  }
  createAddPointInteraction(name: string) {
    let draw; // global so we can remove it later
    draw = new Draw({
      source: this.layerService.layers.proposals.olLayer.getSource(),
      type: 'Point'
    });
    this.interactions[name] = draw;
    return draw;
  }

  createAddLineInteraction(name: string) {
    let draw; // global so we can remove it later
    draw = new Draw({
      source: this.layerService.layers.proposals.olLayer.getSource(),
      type: 'LineString'
    });
    this.interactions[name] = draw;
    return draw;
  }

  createAddPolygonInteraction(name: string) {
    let draw; // global so we can remove it later
    draw = new Draw({
      source: this.layerService.layers.proposals.olLayer.getSource(),
      type: 'Polygon'
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
      this.currentInteraction = 'selectProposal';
      this.map.addInteraction(this.interactions.selectProposal);
    }
  }
}
