import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeodataFilterComponent } from '@dbresource/filter/geodata-filter/geodata-filter.component';

describe('DataFilterComponent', () => {
  let component: GeodataFilterComponent;
  let fixture: ComponentFixture<GeodataFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeodataFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeodataFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
