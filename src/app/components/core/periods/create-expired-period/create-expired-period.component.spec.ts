import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExpiredPeriodComponent } from './create-expired-period.component';

describe('CreateExpiredPeriodComponent', () => {
  let component: CreateExpiredPeriodComponent;
  let fixture: ComponentFixture<CreateExpiredPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateExpiredPeriodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateExpiredPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
