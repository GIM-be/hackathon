export class Proposition {
  id: number;
  geometry: any;
  name: string;
  description: string;

  constructor(id: number, geometry: any, name: string, description: string) {
    this.id = id;
    this.geometry = geometry;
    this.name = name;
    this.description = description;
  }
}
