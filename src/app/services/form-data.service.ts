import { Injectable } from '@angular/core';
import { Proposition } from '../classes/proposition';
import { HttpClient } from '@angular/common/http';
import WKT from 'ol/format/WKT';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  formDataToTreat: Proposition;
  constructor(private http: HttpClient, private dataService: DataService) { }

  setFormDataToTreat(formData) {
    formData.name = 'testNAme';
    formData.description = 'testdescription';
    this.formDataToTreat = formData;
  }

  sendToBackend(proposition?: Proposition)  {
    proposition = proposition ? proposition : this.formDataToTreat;

    const geoJsonFormatter = new WKT();
    const propositionJson: any = {};
    propositionJson.geometry = geoJsonFormatter.writeGeometry(proposition.geometry);
    propositionJson.name = proposition.name;
    propositionJson.description = proposition.description;

    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post('http://localhost:8080/hackathon/proposal/create', propositionJson, options).subscribe((response: any) => {
      console.log('success');
      this.dataService.proposals.push(new Proposition(response.id, geoJsonFormatter.readGeometry(response.geometry), response.name, response.description));
      this.formDataToTreat = null;
    }, error => {
      console.log('error');
    });
  }

  getFormDataToTreat() {
    if (!this.formDataToTreat) {
      return new Proposition(null, null, '', '');
    }
    return this.formDataToTreat;
  }
}
