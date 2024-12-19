import { Component } from '@angular/core';
import {BankAccountService} from '../../../../services/bankAccounts/bank-account.service';
import {BankAccountCardComponent} from '../bank-account-card/bank-account-card.component';
import {CreateBankAccountComponent} from '../create-bank-account/create-bank-account.component';
import {
  BankAccountTransactionsOverviewComponent
} from '../../transactions/bank-account-transactions-overview/bank-account-transactions-overview.component';

@Component({
  selector: 'app-bank-accounts-overview',
  standalone: true,
  imports: [
    BankAccountCardComponent,
    CreateBankAccountComponent,
    BankAccountTransactionsOverviewComponent
  ],
  templateUrl: './bank-accounts-overview.component.html',
  styleUrl: './bank-accounts-overview.component.css'
})
export class BankAccountsOverviewComponent {

  constructor(public bankAccountService : BankAccountService) {
  }

  areBankAccountsAvailable() {
    if(!this.bankAccountService.accounts()) return false;
    if(this.bankAccountService.accounts()?.length === 0) return false;
    const bankAccounts = this.bankAccountService.accounts();
    const activeAccounts = bankAccounts!.filter(account => account.isActive);
    return activeAccounts.length > 0;
  }
}
