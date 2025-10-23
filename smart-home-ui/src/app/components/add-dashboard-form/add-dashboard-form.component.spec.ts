import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDashboardFormComponent } from './add-dashboard-form.component';

describe('AddDashboardFormComponent', () => {
  let component: AddDashboardFormComponent;
  let fixture: ComponentFixture<AddDashboardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDashboardFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddDashboardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
