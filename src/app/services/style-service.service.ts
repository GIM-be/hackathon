import { Injectable } from '@angular/core';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';

@Injectable({
  providedIn: 'root'
})
export class StyleServiceService {

  styles: any = {};
  constructor() {
    this.styles.proposal = (feature, resolution) => {
      let style;
      let color;
      console.log(feature.get('type'));
      switch (feature.get('type')) {
        case 'bench': color = [204, 122, 0];
                      break;
        case 'bulles_verre': color = [51, 153, 51];
                             break;
        case 'plaine_jeux': color = [255, 0, 102];
                            break;
        case 'parking_velo': color = [255, 153, 51];
                             break;
        case 'piste_cyclable': color = [153, 0, 153];
                               break;
        default: color = [0, 153, 153];
                 break;
      }
      const colorBase = 'rgba(' + color.join(',') + ',1)';
      color.push(0.6);
      const colorFill = 'rgba(' + color.join(',') + ')';
      style = new Style({
        image: new CircleStyle({
          radius: 10,
          fill: new Fill({
            color: colorFill
          }),
          stroke: new Stroke({
            color: colorBase
          })
        }),
        stroke: new Stroke({
          color: colorBase,
          width: 3
        }),
        fill: new Fill({
          color: colorFill
        }),
      });
      return [style];
    };
    this.styles.roads = (feature, resolution) => {
      let style;
      let color;
      switch (feature.get('Amenagement_cyclable')) {
        case 'oui': color = [51, 204, 51];
                      break;
        default: color = [255, 204, 0];
                 break;
      }
      const colorBase = 'rgba(' + color.join(',') + ',1)';
      color.push(0.6);
      const colorFill = 'rgba(' + color.join(',') + ')';
      style = new Style({
        image: new CircleStyle({
          radius: 10,
          fill: new Fill({
            color: colorFill
          }),
          stroke: new Stroke({
            color: colorBase
          })
        }),
        stroke: new Stroke({
          color: colorBase,
          width: 3
        }),
        fill: new Fill({
          color: colorFill
        }),
      });
      return [style];
    };
  }
}
