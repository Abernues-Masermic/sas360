import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeodataLinechartComponent } from '@dbresource/chart/geodata-linechart/geodata-linechart.component';

describe('GeodataChartComponent', () => {
  let component: GeodataLinechartComponent;
  let fixture: ComponentFixture<GeodataLinechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeodataLinechartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeodataLinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
