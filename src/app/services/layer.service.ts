import {Injectable} from '@angular/core';
import {Layer} from '../classes/layer';
import Image from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import Map from 'ol/Map';
import {Vector as VectorSource} from 'ol/source';
import {Cluster} from 'ol/source.js';
import {Vector as VectorLayer} from 'ol/layer';
import {Style} from 'ol/style.js';
import Stroke from 'ol/style/Stroke';
import GeoJSON from 'ol/format/GeoJSON';
import {bbox as bboxStrategy} from 'ol/loadingstrategy.js';
import {DataService} from './data.service';
import {StyleServiceService} from './style-service.service';
import {Proposition} from '../classes/proposition';
import {Circle as CircleStyle, Text} from 'ol/style.js';
import Fill from 'ol/style/Fill';
import Point from 'ol/geom/Point';
import * as Extent from 'ol/extent.js';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  layers: any = {};
  map: Map;
  drawLayer: VectorLayer;
  constructor(private dataService: DataService, private styleService: StyleServiceService) {
  }

  createLayers(map: Map) {
    this.map = map;
    this.createDrawLayer();
    const piccWms = this.createPiccLayer();
    this.createProposalLayer();
    const routeCyclable = this.createRouteCyclableLayer();
    const benchLayer = this.createBenchLayer();
    this.map.addLayer(piccWms);
    this.map.addLayer(routeCyclable);
    this.map.addLayer(benchLayer);
    this.map.addLayer(this.createBullesLayer());
    this.map.addLayer(this.createPlainesLayer());
    this.map.addLayer(this.layers.proposals.olLayer);
    this.map.addLayer(this.createProposalCluster());
    this.map.addLayer(this.drawLayer);

    this.loadProposals();
    return ;
  }

  private createDrawLayer() {
    let drawLy;
    drawLy = new Layer('', 'Draw Layer', '', [], '', '', false);
    this.drawLayer = this.createEmptyVectorLayer();
    drawLy.olLayer = this.drawLayer;
    this.layers['Draw Layer'] = drawLy;
  }

  private createRouteCyclableLayer() {
    let routeCyclable;

    routeCyclable = new VectorLayer({
      style: this.styleService.styles.roads,
      source: new VectorSource({
        url: '../assets/data/Route_cyclable.json',
        format: new GeoJSON()
      })
    });
    let routeCyclableLayer;
    routeCyclableLayer = new Layer('', 'Routes Cyclables', '', [], '', '', true);
    routeCyclableLayer.olLayer = routeCyclable;
    routeCyclable.set('showInLayerManager', true);
    routeCyclable.set('name', routeCyclableLayer.name);
    this.layers.routeCyclable = routeCyclableLayer;
    return routeCyclable;
  }

  private createProposalLayer() {
    let proposalLayer;
    proposalLayer = new Layer('', 'proposals', '', [], '', '', true);
    const source = new VectorSource({
      url: '../assets/data/sample_propositions.json',
      format: new GeoJSON()
    });
    proposalLayer.olLayer = new VectorLayer({
      style: this.styleService.styles.proposal,
      source
    });
    proposalLayer.olLayer.set('showInLayerManager', proposalLayer.showInLayerManager);
    proposalLayer.olLayer.set('name', proposalLayer.name);
    proposalLayer.olLayer.setMaxResolution(3);
    this.layers.proposals = proposalLayer;
    source.on('addfeature', e => {
      if (e.feature.get('ID')) {
        e.feature.set('techId', e.feature.get('ID'));
        e.feature.set('id', e.feature.get('ID'));
        if (!this.layers.proposals.olLayer.getSource().getFeatureById(e.feature.get('ID'))) {
          this.dataService.proposals.push(new Proposition(e.feature.get('ID'), e.feature, e.feature.get('name'), e.feature.get('description')));
        }
      }
    });
  }

  private createPiccLayer() {
    const picLayer = new Layer('http://geoservices.wallonie.be/arcgis/services/TOPOGRAPHIE/PICC_VDIFF/MapServer/WMSServer?', 'Fond de plan PICC',
      '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27',
      [30000.000000, 15000.000000, 310000.000000, 200000.000000], 'EPSG:3857', 'WMS', true);
    const piccWms = this.createWMSLayer(picLayer);
    piccWms.set('name', picLayer.name);
    piccWms.set('showInLayerManager', true);
    piccWms.setVisible(false);
    picLayer.olLayer = piccWms;
    this.layers['Fond de plan PICC'] = picLayer;
    return piccWms;
  }

  loadProposals() {
    this.dataService.loadProposals().subscribe(response => {
      this.dataService.proposals.forEach(proposal => {
        proposal.feature.set('type', proposal.type);
        this.layers.proposals.olLayer.getSource().addFeature(proposal.feature);
      });
    });
  }

  createEmptyVectorLayer(): VectorLayer {
    return new VectorLayer({
      source: new VectorSource({wrapX: false})
    });
  }

  createWMSLayer(layer: Layer): Image {
    return new Image(
      {
        opacity: layer.opacity,
        visible: layer.visible,
        extent: this.map.getView().getProjection().getExtent(),
        source: new ImageWMS({
          hidpi: false,
          url: layer.baseUrl,
          crossOrigin: null,
          params: {LAYERS: layer.layerName, CRS: layer.dataProjection, FORMAT: 'image/png'},
          projection: layer.dataProjection,
          serverType: 'geoserver'
        })
      }
    );
  }

  createWFSLayer(layer: Layer) {
    const vectorSource = new VectorSource({
      format: new GeoJSON(),
      url(extent) {
        return layer.baseUrl + 'service=WFS&'
        + 'version=1.1.0&'
        + '&request=GetFeature&'
        + 'typename=' + layer.layerName + '&'
        + 'outputformat=application/json&'
        + 'srsname=' + this.map.getView().getProjection().getCode() + '&'
        + 'bbox=' + extent.join(',') + ',' + this.map.getView().getProjection().getCode();
        // return 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
        //   'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
        //   'outputFormat=application/json&srsname=EPSG:3857&' +
        //   'bbox=' + extent.join(',') + ',EPSG:3857';
      },
      strategy: bboxStrategy
    });

    const vector = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(0, 0, 255, 1.0)',
          width: 2
        })
      })
    });
    return vector;
  }

  private createSampleProposaLayer() {
    let sampleProposal;

    sampleProposal = new VectorLayer({
      style: this.styleService.styles.proposal,
      source: new VectorSource({
        url: '../assets/data/sample_propositions.json',
        format: new GeoJSON()
      })
    });
    let sampleProposalLAyer;
    sampleProposalLAyer = new Layer('', 'Propositions existantes', '', [], '', '', true);
    sampleProposalLAyer.olLayer = sampleProposal;
    sampleProposal.set('showInLayerManager', true);
    sampleProposal.set('name', sampleProposalLAyer.name);
    this.layers.sampleProposal = sampleProposalLAyer;
    return sampleProposal;
  }

  private createBenchLayer() {
    let bench;

    bench = new VectorLayer({
      style: this.styleService.styles.bench,
      source: new VectorSource({
        url: '../assets/data/bancs.json',
        format: new GeoJSON()
      })
    });
    let benchLayer;
    benchLayer = new Layer('', 'Bancs', '', [], '', '', true);
    benchLayer.olLayer = bench;
    bench.setVisible(false);
    bench.set('showInLayerManager', true);
    bench.set('name', benchLayer.name);
    this.layers.benchLayer = benchLayer;
    return bench;
  }

  private createBullesLayer() {
    let bulles;

    bulles = new VectorLayer({
      style: this.styleService.styles.bulles,
      source: new VectorSource({
        url: '../assets/data/bulles_verre.json',
        format: new GeoJSON()
      })
    });
    let bullesLayer;
    bullesLayer = new Layer('', 'Bulles à verre', '', [], '', '', true);
    bullesLayer.olLayer = bulles;
    bulles.setVisible(false);
    bulles.set('showInLayerManager', true);
    bulles.set('name', bullesLayer.name);
    this.layers.bullesLayer = bullesLayer;
    return bulles;
  }

  private createPlainesLayer() {
    let plaines;

    plaines = new VectorLayer({
      style: this.styleService.styles.plaineJeux,
      source: new VectorSource({
        url: '../assets/data/plaine_jeux.json',
        format: new GeoJSON()
      })
    });
    let plainesLayer;
    plainesLayer = new Layer('', 'Plaines de jeux', '', [], '', '', true);
    plainesLayer.olLayer = plaines;
    plaines.setVisible(false);
    plaines.set('showInLayerManager', true);
    plaines.set('name', plainesLayer.name);
    this.layers.plaines = plainesLayer;
    return plaines;
  }

  createProposalCluster() {
    const clusterSource = new Cluster({
      distance: 100,
      source: this.layers.proposals.olLayer.getSource(),
      geometryFunction: (feature) => {
        if (feature.getGeometry().getType() !== 'Point') {
          return new Point(Extent.getCenter(feature.getGeometry().getExtent()));
        }
        return feature.getGeometry();
      }
    });

    const clusters = new VectorLayer({
      source: clusterSource,
      style: (feature) => {
        const size = feature.get('features').length;

        const style =  [new Style({
          image: new CircleStyle({
            radius: 15,
            stroke: new Stroke({
              color: [0, 0, 0, 0],
              width: 0
            }),
            fill: new Fill({
              color: [14, 131, 230, 1]
            })
          })
        }), new Style({
          image: new CircleStyle({
            radius: 12,
            stroke: new Stroke({
              color: '#fff',
              width: 1
            }),
            fill: new Fill({
              color: [21, 70, 91, 1]
            })
          }),
          text: new Text({
            font: '11px sans-serif',
            text: size.toString(),
            fill: new Fill({
              color: '#fff'
            })
          })
        })];

        return style;
      }
    });
    clusters.set('showInLayerManager', false);
    clusters.setMinResolution(3);
    return clusters;
  }
}
