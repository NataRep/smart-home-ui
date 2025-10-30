import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteDashboardComponent } from './Confirm-delete-dashboard.component';

describe('ConfirmDeleteDashboardComponent', () => {
  let component: ConfirmDeleteDashboardComponent;
  let fixture: ComponentFixture<ConfirmDeleteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteDashboardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
