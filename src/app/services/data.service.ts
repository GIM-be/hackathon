import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Proposition} from '../classes/proposition';
import WKT from 'ol/format/WKT';
import Feature from 'ol/Feature.js';

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
          const newPropo = new Proposition(proposal.id, new Feature({geometry: this.wktParser.readGeometry(proposal.geometry), techId: proposal.id}), proposal.name, proposal.description);
          newPropo.type = proposal.type;
          newPropo.positiveCount = proposal.positiveCount ? proposal.positiveCount : 0;
          newPropo.negativeCount = proposal.negativeCount ? proposal.negativeCount : 0;
          this.proposals.push(
            newPropo
          );
        });
      })
    );
  }

  upvote(proposition: Proposition) {
    return this.http.post<any>('http://localhost:8080/hackathon/proposal/' + proposition.id + '/positiveVote', {});
  }

  downvote(proposition: Proposition) {
    return this.http.post<any>('http://localhost:8080/hackathon/proposal/' + proposition.id + '/negativeVote', {});
  }
}
