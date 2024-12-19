import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountTransactionsOverviewComponent } from './bank-account-transactions-overview.component';

describe('BankAccountTransactionsOverviewComponent', () => {
  let component: BankAccountTransactionsOverviewComponent;
  let fixture: ComponentFixture<BankAccountTransactionsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccountTransactionsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountTransactionsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
