import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeodataBublechartComponent } from '@dbresource/chart/geodata-bublechart/geodata-bublechart.component';

describe('GeodataBublechartComponent', () => {
  let component: GeodataBublechartComponent;
  let fixture: ComponentFixture<GeodataBublechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeodataBublechartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeodataBublechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
