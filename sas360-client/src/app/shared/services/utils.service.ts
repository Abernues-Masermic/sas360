import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UtilsService {
  private sidebarOpenned = new BehaviorSubject<boolean>(false);
  public sidebarOpenned$ = this.sidebarOpenned.asObservable();

  openSidebar(value: boolean): void {
    this.sidebarOpenned.next(value);
  }
}
