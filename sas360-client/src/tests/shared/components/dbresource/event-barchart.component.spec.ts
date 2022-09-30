import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBarchartComponent } from '@dbresource/chart/event-barchart/event-barchart.component';

describe('EventBarchartComponent', () => {
  let component: EventBarchartComponent;
  let fixture: ComponentFixture<EventBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventBarchartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
