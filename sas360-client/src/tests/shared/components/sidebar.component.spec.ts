import { MaterialModule } from '@shared/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilsService } from '@shared/services/utils.service';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [MaterialModule],
      providers: [UtilsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
