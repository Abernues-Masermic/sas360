import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FADE_ANIMATION } from '@shared/animations/pagesAnimation';
import { EventStateKeys } from '@shared/models/eventdata.interface';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.scss'],
  animations: [FADE_ANIMATION],
})
export class EventFilterComponent implements OnInit {
  @Output() stateEvent = new EventEmitter<string>();

  EventStateKeys?: typeof EventStateKeys;
  EventStateList: any[] = [];
  eventStateSelected: string = '';

  showFilterEvent: boolean = true;
  showFilterControl: boolean = true;

  constructor() {}

  ngOnInit(): void {
    //----------Event state radio button--------
    EventStateKeys.forEach(statekeys => {
      var json = {
        name: statekeys,
        checked: statekeys === 'ACTIVE' ? true : false,
      };
      this.EventStateList.push(json);
    });
    this.EventStateList.push({
      name: 'ALL',
      checked: false,
    });
    console.log('State keys [EventTable] -> ', this.EventStateList);
    this.eventStateSelected = 'ACTIVE';
    this.stateEvent.emit(this.eventStateSelected);
    //----------------------------------------------
  }

  onStateKeyChange(): void {
    console.log('Event state change (Event table) ->', this.eventStateSelected);
    this.stateEvent.emit(this.eventStateSelected);
  }

  public onAnimationStart(event: any) {
    if (event.toState === 'open') {
      this.showFilterControl = true;
    }
  }
  public onAnimationDone(event: any) {
    if (event.toState === 'close') {
      this.showFilterControl = false;
    }
  }
}
