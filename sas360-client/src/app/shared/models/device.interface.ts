export enum DEVICE_TYPE {
  SAS360_CON = 0,
  SAS360_TAG_DRIVER = 1,
  SAS360_TAG_MAN = 2,
  SAS360_TAG_HEAVY_VEHICLE = 3,
  SAS360_TAG_LIGHT_VEHICLE = 4,
}

export interface Device {
  devicename: string;
  warningrange: number;
  cautionrange: number;
  alarmrange: number;
  type: DEVICE_TYPE;
  installation: string;
}
