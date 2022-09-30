import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UtilsService {
  private sidebarOpenned = new BehaviorSubject<boolean>(false);
  public sidebarOpenned$ = this.sidebarOpenned.asObservable();

  private editingModeOpenned = new BehaviorSubject<boolean>(false);
  public editingModeOpenned$ = this.editingModeOpenned.asObservable();

  openSidebar(value: boolean): void {
    this.sidebarOpenned.next(value);
  }

  editingMode(value: boolean): void {
    this.editingModeOpenned.next(value);
  }
}
