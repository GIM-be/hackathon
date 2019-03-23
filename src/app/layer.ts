export class Layer {
  baseUrl: string;
  name: string;
  layerName: string;
  extent: number[];
  dataProjection: string;
  layerType: string;
  opacity: number;
  visible: boolean;

  constructor(baseUrl: string, name: string, layerName: string, extent: number[], dataProjection: string, layerType: string) {
    this.baseUrl = baseUrl;
    this.name = name;
    this.layerName = layerName;
    this.extent = extent;
    this.dataProjection = dataProjection;
    this.layerType = layerType;
    this.opacity = 1;
    this.visible = true;
  }
}
