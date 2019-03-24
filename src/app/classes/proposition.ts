export class Proposition {
  id: number;
  feature: any;
  name: string;
  description: string;
  type: string;
  negativeCount: number;
  positiveCount: number;

  removeData() {
    this.id = null;
    this.feature = null;
    this.name = null;
    this.description = null;
  }

  constructor(id: number, feature: any, name: string, description: string) {
    this.id = id;
    this.feature = feature;
    this.name = name;
    this.description = description;
  }
}
