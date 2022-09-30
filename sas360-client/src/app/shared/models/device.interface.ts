export enum DeviceType {
  SAS360_CON,
  SAS360_TAG_DRIVER,
  SAS360_TAG_MAN,
  SAS360_TAG_HEAVY_VEHICLE,
  SAS360_TAG_LIGHT_VEHICLE,
}

export interface Device {
  devicename: string;
  warningrange: number;
  cautionrange: number;
  alarmrange: number;
  type: DeviceType;
  sType: string;
  installation: string;
}
