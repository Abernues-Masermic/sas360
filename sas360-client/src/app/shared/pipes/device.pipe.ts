import { DeviceType } from './../models/device.interface';
import { Pipe, PipeTransform } from '@angular/core';
import { Device } from '@shared/models/device.interface';

@Pipe({
  name: 'devicetype',
})
export class DevicePipe implements PipeTransform {
  transform(devices: Device[], _args: any): Device[] {
    let result: Device[] = [];
    for (const device of devices) {
      switch (device.type) {
        case DeviceType.SAS360_CON: {
          device.sType = 'SAS360_CON';
          break;
        }
        case DeviceType.SAS360_TAG_DRIVER: {
          device.sType = 'SAS360_TAG_DRIVER';
          break;
        }
        case DeviceType.SAS360_TAG_MAN: {
          device.sType = 'SAS360_TAG_MAN';
          break;
        }
        case DeviceType.SAS360_TAG_LIGHT_VEHICLE: {
          device.sType = 'SAS360_TAG_LIGHT_VEHICLE';
          break;
        }
        case DeviceType.SAS360_TAG_HEAVY_VEHICLE: {
          device.sType = 'SAS360_TAG_HEAVY_VEHICLE';
          break;
        }
      }

      result = [...result, device];
    }

    return result;
  }
}
