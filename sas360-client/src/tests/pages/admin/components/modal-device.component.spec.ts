import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeviceComponent } from '../../../../app/pages/admin/modal-components/modal-device/modal-device.component';

describe('ModalDeviceComponent', () => {
  let component: ModalDeviceComponent;
  let fixture: ComponentFixture<ModalDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDeviceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
