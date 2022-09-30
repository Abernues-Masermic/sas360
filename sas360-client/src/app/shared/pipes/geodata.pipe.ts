import { Pipe, PipeTransform } from '@angular/core';
import { Geodata } from '@shared/models/geodata.interface';

@Pipe({
  name: 'devicetype',
})
export class GeodataPipe implements PipeTransform {
  transform(
    geodataItems: Geodata[],
    deviceName: string,
    dateIni: Date | undefined,
    dateEnd: Date | undefined
  ): Geodata[] {
    console.log('DateIni ->', dateIni?.getTime());
    console.log('DateEnd ->', dateEnd?.getTime());

    let result: Geodata[] = [];
    result =
      deviceName !== ''
        ? geodataItems.filter(geodata => geodata.devicename === deviceName)
        : geodataItems;

    result =
      dateIni !== undefined
        ? result.filter(
            geodata => new Date(geodata.instant).getTime() >= dateIni.getTime()
          )
        : result;

    result =
      dateEnd !== undefined
        ? result.filter(
            geodata => new Date(geodata.instant).getTime() <= dateEnd.getTime()
          )
        : result;

    result = result.sort(
      (geo1, geo2) =>
        new Date(geo1.instant).getTime() - new Date(geo2.instant).getTime()
    );

    return result;
  }
}
