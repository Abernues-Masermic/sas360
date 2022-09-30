import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FADE_ANIMATION } from '@shared/animations/pagesAnimation';

@Component({
  selector: 'app-geodata-filter',
  templateUrl: './geodata-filter.component.html',
  styleUrls: ['./geodata-filter.component.scss'],
  animations: [FADE_ANIMATION],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'legacy' },
    },
  ],
})
export class GeodataFilterComponent {
  @Input() deviceFilterArray: string[] = [];
  @Output() deviceFilterEvent = new EventEmitter<string>();
  @Output() dateiniFilterEvent = new EventEmitter<Date>();
  @Output() dateendFilterEvent = new EventEmitter<Date>();

  showFilterEvent: boolean = true;
  showFilterControl: boolean = true;
  deviceFilter: string = '';
  debounce: number = 400;

  //DatetimePickerControl variables
  public formGroup = new FormGroup({
    dateIni: new FormControl(null, [Validators.required]),
    dateEnd: new FormControl(null, [Validators.required]),
  });
  dateIniControl = new FormControl(new Date(2021, 9, 4, 5, 6, 7));
  dateControlMinMax = new FormControl(new Date());
  date = new Date();
  disabled = false;
  showSpinners = true;
  showSeconds = false;
  touchUi = false;
  enableMeridian = false;
  stepHour = 1;
  stepMinute = 1;
  stepSecond = 1;

  constructor() {}

  public onChangeDevice($event: any) {
    this.deviceFilter = $event.value;
    this.deviceFilterEvent.emit(this.deviceFilter);
  }

  public onChangeDateTimeIni($event: Date) {
    this.dateiniFilterEvent.emit($event);
  }
  public onChangeDateTimeEnd($event: any) {
    this.dateendFilterEvent.emit($event);
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
