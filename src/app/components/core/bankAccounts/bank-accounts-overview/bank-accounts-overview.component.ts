import {AfterViewChecked, Component} from '@angular/core';
import {BankAccountService} from '../../../../services/bankAccounts/bank-account.service';
import {BankAccountCardComponent} from '../bank-account-card/bank-account-card.component';
import {CreateBankAccountComponent} from '../create-bank-account/create-bank-account.component';
import {
  BankAccountTransactionsOverviewComponent
} from '../../transactions/bank-account-transactions-overview/bank-account-transactions-overview.component';
import {BankAccount} from '../../../../models/BankAccount';

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
export class BankAccountsOverviewComponent implements AfterViewChecked{

  activeBankAccount : BankAccount | undefined = undefined;

  constructor(public bankAccountService : BankAccountService) {
  }

  ngAfterViewChecked(): void {
    window.HSStaticMethods.autoInit('overlay');
    window.HSStaticMethods.autoInit('accordion');
    window.HSStaticMethods.autoInit('select');
  }

  areBankAccountsAvailable() {
    if(!this.bankAccountService.accounts()) return false;
    if(this.bankAccountService.accounts()?.length === 0) return false;
    const bankAccounts = this.bankAccountService.accounts();
    const activeAccounts = bankAccounts!.filter(account => account.isActive);
    this.setActiveBankAccount(activeAccounts[0]);
    return activeAccounts.length > 0;
  }

  isBankAccountActive(account: BankAccount) {
    return account.id === this.activeBankAccount?.id;
  }

  activate($event: string) {
    this.activeBankAccount = this.bankAccountService.accounts()?.find(account => account.id === $event);
  }

  private setActiveBankAccount(bankAccount: BankAccount) {
    if(!bankAccount) return;
    if(this.activeBankAccount) return;
    this.activeBankAccount = bankAccount;
  }
}
