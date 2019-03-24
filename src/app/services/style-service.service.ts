import { Injectable } from '@angular/core';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
import {RegularShape, Icon} from 'ol/style.js';

@Injectable({
  providedIn: 'root'
})
export class StyleServiceService {

  styles: any = {};
  constructor() {
    this.styles.proposal = (feature, resolution) => {
      let style;
      let color;
      const type = feature.get('type') ? feature.get('type').toUpperCase() : '';
      switch (type) {
        case 'BENCH': color = [204, 122, 0];
                      break;
        case 'BULLES_VERRE': color = [51, 153, 51];
                             break;
        case 'PLAINE_JEUX': color = [255, 0, 102];
                            break;
        case 'BICYCLE_PARKING': color = [255, 153, 51];
                                break;
        case 'BICYCLE_LANE': color = [153, 0, 153];
                             break;
        case 'TRASH_BIN': color = [204, 153, 0];
                          break;
        default: color = [0, 153, 153];
                 break;
      }
      const colorBase = 'rgba(' + color.join(',') + ',1)';
      color.push(0.6);
      const colorFill = 'rgba(' + color.join(',') + ')';
      style = new Style({
        image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: '../assets/data/icon.png',
          color,
          scale: 0.5
        })),
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
    this.styles.bench = (feature, resolution) => {
      let style;
      const color = [204, 122, 0];
      const colorBase = 'rgba(' + color.join(',') + ',1)';
      color.push(0.6);
      const colorFill = 'rgba(' + color.join(',') + ')';
      style = new Style({
        image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: '../assets/data/bench.png',
          color,
          scale: 0.2
        })),
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
    this.styles.bulles = (feature, resolution) => {
      let style;
      const color = [51, 153, 51];
      const colorBase = 'rgba(' + color.join(',') + ',1)';
      color.push(0.6);
      const colorFill = 'rgba(' + color.join(',') + ')';
      style = new Style({
          image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: '../assets/data/bulle.png',
            color,
            scale: 0.2
          })),
          stroke: new Stroke({
            color: colorBase,
            width: 3
          }),
          fill: new Fill({
            color: colorFill
          })
        });
      return [style];
    };

    this.styles.plaineJeux = (feature, resolution) => {
      let style;
      const color = [255, 0, 102];
      const colorBase = 'rgba(' + color.join(',') + ',1)';
      color.push(0.6);
      const colorFill = 'rgba(' + color.join(',') + ')';
      style = new Style({
        image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: '../assets/data/playground.png',
          color,
          scale: 0.2
        })),
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
