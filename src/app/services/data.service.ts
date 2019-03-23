import { Injectable } from '@angular/core';
import {ProjectionLike} from '../classes/projection-like';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Proposition} from '../classes/proposition';
import WKT from 'ol/format/WKT';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  proposals: Proposition[] = [];
  private wktParser: WKT;

  constructor(private http: HttpClient) { }

  init() {
  }

  loadProposals(): Observable<any> {
    this.wktParser = new WKT();
    return this.http.get<any>('http://localhost:8080/hackathon/proposal/all').pipe(
      tap(response => {
        response.forEach(proposal => {
          this.proposals.push(new Proposition(this.wktParser.readGeometry(proposal.geometry)));
        });
      })
    );
  }
}
