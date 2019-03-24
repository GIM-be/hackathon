import { Component, OnInit } from '@angular/core';
import {MapService} from '../services/map.service';
import  {ActivatedRoute} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import WKT from 'ol/format/WKT';
import * as extent from 'ol/extent.js';
import {Proposition} from "../classes/proposition";
import {InteractionService} from "../services/interaction.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  wkt: WKT;
  constructor(private mapService: MapService, private route: ActivatedRoute, private http: HttpClient, private interactionService: InteractionService) { }

  ngOnInit() {
    this.mapService.initMap();
    this.wkt = new WKT();
    this.route.queryParams.subscribe(params => {
      if(params.hasOwnProperty('proposal')) {
        this.http.get(`http://localhost:8080/hackathon/proposal/${params['proposal']}`).subscribe(
          (response: any) => {
            console.log(response);
            if(response) {
              var center = extent.getCenter(this.wkt.readGeometry(response.geometry).getExtent());
              var map = this.mapService.getMap();
              map.getView().setCenter(center);
              map.getView().setZoom(15);
              map.updateSize();
              var prop = new Proposition(response.id, this.wkt.readGeometry(response.geometry), response.name, response.description);
              this.interactionService.showProposalModal(prop);
            }
          },
          (error: any) => {
            console.log('error')
          }
        )
      }
    });
  }
}
