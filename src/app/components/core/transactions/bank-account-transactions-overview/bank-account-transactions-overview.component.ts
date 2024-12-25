import {Component, Input} from '@angular/core';
import {BankAccount} from '../../../../models/BankAccount';
import {CreateTransactionComponent} from '../create-transaction/create-transaction.component';

@Component({
  selector: 'app-bank-account-transactions-overview',
  standalone: true,
  imports: [
    CreateTransactionComponent
  ],
  templateUrl: './bank-account-transactions-overview.component.html',
  styleUrl: './bank-account-transactions-overview.component.css'
})
export class BankAccountTransactionsOverviewComponent {

  @Input() bankAccount : BankAccount | undefined;
}
