import { Component, OnInit } from '@angular/core';
import {LayerService} from '../services/layer.service';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css']
})
export class LayerComponent implements OnInit {

  constructor(private layerService: LayerService) { }

  ngOnInit() {
  }

}
