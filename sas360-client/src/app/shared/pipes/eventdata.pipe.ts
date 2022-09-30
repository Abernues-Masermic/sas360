import { Pipe, PipeTransform } from '@angular/core';
import {
  Eventdata,
  EventSeverityType,
  EventStateType,
} from '@shared/models/eventdata.interface';

@Pipe({
  name: 'devicetype',
})
export class EventdataPipe implements PipeTransform {
  transform(
    eventdataItems: Eventdata[],
    deviceName: string,
    dateIni: Date | undefined,
    dateEnd: Date | undefined,
    eventState: number
  ): Eventdata[] {
    console.log('DateIni ->', dateIni?.getTime());
    console.log('DateEnd ->', dateEnd?.getTime());
    console.log('EventState ->', eventState);

    let result: Eventdata[] = [];
    result =
      deviceName !== ''
        ? eventdataItems.filter(
            eventdata => eventdata.devicename === deviceName
          )
        : eventdataItems;

    result =
      dateIni !== undefined
        ? result.filter(
            eventdata =>
              new Date(eventdata.instant).getTime() >= dateIni.getTime()
          )
        : result;

    result =
      dateEnd !== undefined
        ? result.filter(
            eventdata =>
              new Date(eventdata.instant).getTime() <= dateEnd.getTime()
          )
        : result;

    result =
      eventState > -1
        ? result.filter(eventdata => eventdata.state === eventState)
        : result;

    console.log('EventData pipe ->', result);

    let resultPipe: Eventdata[] = [];
    for (const eventdata of result) {
      switch (eventdata.severity) {
        case EventSeverityType.LOW: {
          eventdata.sSeverity = 'LOW';
          break;
        }
        case EventSeverityType.MEDIUM: {
          eventdata.sSeverity = 'MEDIUM';
          break;
        }
        case EventSeverityType.HIGH: {
          eventdata.sSeverity = 'HIGH';
          break;
        }
        case EventSeverityType.CRITICAL: {
          eventdata.sSeverity = 'CRITICAL';
          break;
        }
      }

      switch (eventdata.state) {
        case EventStateType.ACTIVE: {
          eventdata.sState = 'ACTIVE';
          break;
        }
        case EventStateType.CLOSED: {
          eventdata.sState = 'CLOSED';
          break;
        }
        case EventStateType.ARCHIVED: {
          eventdata.sState = 'ARCHIVED';
          break;
        }
      }

      resultPipe = [...resultPipe, eventdata];
    }

    resultPipe = resultPipe.sort(
      (event1, event2) =>
        new Date(event1.instant).getTime() - new Date(event2.instant).getTime()
    );

    console.log('Result event pipe ->', resultPipe);

    return resultPipe;
  }
}
