import { Component, OnInit } from '@angular/core';
import Select from 'ol/interaction/Select.js';
import {InteractionService} from '../../../services/interaction.service';
import {MapService} from '../../../services/map.service';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON.js';
import WKT from 'ol/format/WKT';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-select-notif-zone',
  templateUrl: './select-notif-zone.component.html',
  styleUrls: ['./select-notif-zone.component.less']
})
export class SelectNotifZoneComponent implements OnInit {
  selector: Select;
  selectorName: string;
  vectorLayers: VectorLayer;
  isSelecting: boolean;

  constructor(private interactionService: InteractionService, private mapService: MapService, private http: HttpClient, public userService: UserService) {}

  ngOnInit() {
    this.selectorName = "notifZoneSelector";
    this.vectorLayers = new VectorLayer({
      source: new VectorSource({
        url: '../assets/data/namur-limites-de-46-quartiers.geojson',
        format: new GeoJSON()
      })
    });
    this.selector = this.interactionService.createSelectMultiInteraction(this.selectorName, this.vectorLayers);

    this.isSelecting = false;
  }

  onSelectionStart() {
    this.mapService.getMap().addLayer(this.vectorLayers);
    this.isSelecting = true;
    this.interactionService.toggleInteraction(this.selectorName);
  }

  onSelectionEnd(canceled: boolean) {
    if(!canceled) {
      var notifZoneJson = {
        name: 'Notification zone',
        geometry: new WKT().writeFeatures(this.selector.getFeatures().getArray())
      };

      var options = {headers: {'Content-Type': 'application/json'}};
      this.http.post(`http://localhost:8080/hackathon/user/${this.userService.getuserId()}/notificationZone/add`, notifZoneJson, options).subscribe(
      response => {
        this.isSelecting = false;
        this.mapService.getMap().removeLayer(this.vectorLayers);
        this.interactionService.toggleInteraction(this.selectorName);
      }, error => {
        console.log('error');
      });
    } else {
      this.isSelecting = false;
      this.mapService.getMap().removeLayer(this.vectorLayers);
      this.interactionService.toggleInteraction(this.selectorName);
    }
  }
}
