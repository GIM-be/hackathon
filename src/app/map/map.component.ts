import { Component, OnInit } from '@angular/core';
import {MapService} from '../services/map.service';
import  {ActivatedRoute} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import WKT from 'ol/format/WKT';
import * as extent from 'ol/extent.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  wkt: WKT;
  constructor(private mapService: MapService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.mapService.initMap();
    this.wkt = new WKT();
    this.route.queryParams.subscribe(params => {
      if(params.hasOwnProperty('proposition')) {
        this.http.get(`http://localhost:8080/hackathon/proposal/${params['proposition']}`).subscribe(
          (response: any) => {
            if(response) {
              var center = extent.getCenter(this.wkt.readGeometry(response.geometry).getExtent());
              var map = this.mapService.getMap();
              map.getView().setCenter(center);
              map.getView().setZoom(11);
              map.updateSize();
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
