export enum EventSeverityType {
  LOW,
  MEDIUM,
  HIGH,
  CRITICAL,
}

export const EventSeverityKeys = Object.keys(EventSeverityType).filter(v =>
  isNaN(Number(v))
);

export enum EventStateType {
  ACTIVE,
  CLOSED,
  ARCHIVED,
}
export const EventStateKeys = Object.keys(EventStateType).filter(v =>
  isNaN(Number(v))
);

export interface Eventdata {
  id: number;
  devicename: string;
  instant: Date;
  closedinstant: Date;
  severity: EventSeverityType;
  sSeverity: string;
  info: string;
  state: number;
  sState: string;
}
