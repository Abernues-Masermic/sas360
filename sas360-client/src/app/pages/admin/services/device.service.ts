import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Device } from '@shared/models/device.interface';
import { getLocalInstallation } from '@shared/utils/local-storage';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private http: HttpClient) {}

  private _refreshRequired = new Subject<void>();
  get RefreshRequired() {
    return this._refreshRequired;
  }

  getAll(): Observable<Device[]> {
    let installation: string = getLocalInstallation();
    console.log(`SERVICE GET ALL DEVICES`);
    return this.http
      .get<Device[]>(`${environment.API_URL}/device`)
      .pipe(
        map(items =>
          items.filter(device => {
            return installation === null
              ? true
              : device.installation.indexOf(installation) > -1;
          })
        )
      )
      .pipe(catchError(this.handleError));
  }

  getById(deviceId: number): Observable<Device> {
    console.log(`SERVICE GET DEVICE BY ID ${deviceId}`);
    return this.http
      .get<Device>(`${environment.API_URL}/device/${deviceId}`)
      .pipe(catchError(this.handleError));
  }

  new(device: Device): Observable<any> {
    console.log('SERVICE NEW DEVICE', device);
    return this.http
      .post<Device>(`${environment.API_URL}/device`, device)
      .pipe(tap(() => this.RefreshRequired.next()))
      .pipe(catchError(this.handleError));
  }

  update(deviceId: number, device: Device): Observable<Device> {
    console.log(`SERVICE UPDATE DEVICE ID ${deviceId}`, device);
    return this.http
      .patch<Device>(`${environment.API_URL}/device/${deviceId}`, device)
      .pipe(tap(() => this.RefreshRequired.next()))
      .pipe(catchError(this.handleError));
  }

  delete(deviceId: number): Observable<any> {
    console.log(`SERVICE DELETE DEVICE ID ${deviceId}`);
    return this.http
      .delete<Device>(`${environment.API_URL}/device/${deviceId}`)
      .pipe(tap(() => this.RefreshRequired.next()))
      .pipe(catchError(this.handleError));
  }

  handleError(error: any): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
      if (Array.isArray(error.error)) {
        error.error.forEach(function (value: any) {
          console.log(value.constraints);
        });
      } else {
        console.log('Device handle error', error.error);
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
