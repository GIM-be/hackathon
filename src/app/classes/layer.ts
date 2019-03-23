export class Layer {
  baseUrl: string;
  name: string;
  layerName: string;
  extent: number[];
  dataProjection: string;
  layerType: string;
  opacity: number;
  visible: boolean;
  olLayer: any;
  showInLayerManager: boolean;

  constructor(baseUrl: string, name: string, layerName: string, extent: number[],
              dataProjection: string, layerType: string, showInLayerManager: boolean) {
    this.baseUrl = baseUrl;
    this.name = name;
    this.layerName = layerName;
    this.extent = extent;
    this.dataProjection = dataProjection;
    this.layerType = layerType;
    this.opacity = 1;
    this.visible = true;
    this.showInLayerManager = showInLayerManager;
  }
}
