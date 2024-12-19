import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountsOverviewComponent } from './bank-accounts-overview.component';

describe('BankAccountsOverviewComponent', () => {
  let component: BankAccountsOverviewComponent;
  let fixture: ComponentFixture<BankAccountsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccountsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
