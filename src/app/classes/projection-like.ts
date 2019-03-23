export class ProjectionLike {
    constructor(result: any) {
        this.accuracy = result.accuracy;
        this.area = result.area;
        this.bbox = result.bbox;
        this.code = result.code;
        this.defaultTrans = result.default_trans;
        this.kind = result.kind;
        this.name = result.name;
        this.proj4 = result.proj4;
        this.trans = result.trans;
        this.unit = result.unit;
        this.wkt = result.wkt;
    }

    accuracy: string;
    area: string;
    bbox: number[];
    code: string;
    defaultTrans: string;
    kind: string;
    name: string;
    proj4: string;
    trans: number[];
    unit: number;
    wkt: string;


}
