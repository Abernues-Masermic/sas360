import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInstallationComponent } from '../../../../app/pages/admin/components/modal-installation/modal-installation.component';

describe('ModalInstallationComponent', () => {
  let component: ModalInstallationComponent;
  let fixture: ComponentFixture<ModalInstallationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalInstallationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
