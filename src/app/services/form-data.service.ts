import { Injectable } from '@angular/core';
import { Proposition } from '../classes/proposition';
import { HttpClient } from '@angular/common/http';
import WKT from 'ol/format/WKT';
import {DataService} from './data.service';
import Feature from 'ol/Feature.js';
import * as _ from 'lodash';
import {LayerService} from './layer.service';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  formDataToTreat: Proposition = new Proposition(null, null, null, null);
  constructor(private http: HttpClient, private dataService: DataService, private layerService: LayerService) { }

  setFormDataToTreat(formData) {
    this.formDataToTreat.feature = formData.feature;
  }

  cancelProposition() {
    this.layerService.layers.proposals.olLayer.getSource().removeFeature(this.formDataToTreat.feature);
    this.formDataToTreat.removeData();
  }

  sendToBackend(proposition?: Proposition)  {
    proposition = proposition ? proposition : this.formDataToTreat;

    const geoJsonFormatter = new WKT();
    const propositionJson: any = {};
    propositionJson.geometry = geoJsonFormatter.writeGeometry(proposition.feature.getGeometry());
    propositionJson.name = proposition.name;
    propositionJson.description = proposition.description;

    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post('http://localhost:8080/hackathon/proposal/isRelevant', propositionJson, options).subscribe(
      (response: any) => {
        console.log(response);
        return this.http.post('http://localhost:8080/hackathon/proposal/create', propositionJson, options).subscribe((response: any) => {
          console.log('success');
          let newPropo;
          newPropo = new Proposition(response.id, new Feature({geometry: geoJsonFormatter.readGeometry(response.geometry), techId: response.id}), response.name, response.description);
          this.layerService.layers.proposals.olLayer.getSource().removeFeature(this.formDataToTreat.feature);
          this.layerService.layers.proposals.olLayer.getSource().addFeature(newPropo.feature);
          this.dataService.proposals.push(newPropo);
          this.formDataToTreat.removeData();
        }, error => {
          console.log('error');
        });
      }, (error => {
        console.log('error');
      })
    );

  }

  getFormDataToTreat() {
    if (!this.formDataToTreat) {
      return new Proposition(null, null, '', '');
    }
    return this.formDataToTreat;
  }
}
