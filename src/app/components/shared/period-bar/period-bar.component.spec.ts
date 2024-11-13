import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodBarComponent } from './period-bar.component';

describe('PeriodBarComponent', () => {
  let component: PeriodBarComponent;
  let fixture: ComponentFixture<PeriodBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
