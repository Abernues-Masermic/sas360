export interface Geodata {
  devicename: string;
  instant: Date;
  positionx: Number;
  positiony: Number;
}

export interface GeodataChart {
  devicename: string;
  name: Number;
  value: Number;
}

export interface GeodataBublechart {
  devicename: string;
  name: Number;
  x: Number;
  y: Number;
  r: Number;
}
