import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeodataTableComponent } from '@dbresource/table/geodata-table/geodata-table.component';

describe('DataTableComponent', () => {
  let component: GeodataTableComponent;
  let fixture: ComponentFixture<GeodataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeodataTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeodataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
