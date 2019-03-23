import { Injectable } from '@angular/core';
import {Proposition} from '../classes/proposition';
import {HttpClient} from '@angular/common/http';
import WKT from 'ol/format/WKT';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  formDataToTreat: Proposition;
  constructor(private http: HttpClient) { }

  setFormDataToTreat(formData) {
    this.formDataToTreat = formData;
  }

  sendToBackend(proposition: Proposition) {
    proposition = proposition ? proposition : this.formDataToTreat;
    let geoJsonFormatter;
    geoJsonFormatter = new WKT();
    const propositionJson: any = {};
    propositionJson.geometry = geoJsonFormatter.writeGeometry(proposition.geometry);
    propositionJson.name = 'testname';
    propositionJson.description = 'testdesc';
    const options = {headers: {'Content-Type': 'application/json'}};
    this.http.post('http://localhost:8080/hackathon/proposal/create', propositionJson, options).subscribe(response => {
      console.log('success');
    }, error => {
      console.log('error');
    });
  }
}
