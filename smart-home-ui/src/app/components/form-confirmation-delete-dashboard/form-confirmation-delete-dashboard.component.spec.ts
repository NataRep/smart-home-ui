import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfirmationDeleteDashboardComponent } from './form-confirmation-delete-dashboard.component';

describe('FormConfirmationDeleteDashboardComponent', () => {
  let component: FormConfirmationDeleteDashboardComponent;
  let fixture: ComponentFixture<FormConfirmationDeleteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormConfirmationDeleteDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormConfirmationDeleteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
