export class Proposition {
  geometry: any;
  name: string;
  description: string;

  constructor(geometry: any, name: string, description: string) {
    this.geometry = geometry;
    this.name = name;
    this.description = description;
  }
}
