import {Component, Input} from '@angular/core';
import {BankAccount} from '../../../../models/BankAccount';

@Component({
  selector: 'app-bank-account-transactions-overview',
  standalone: true,
  imports: [],
  templateUrl: './bank-account-transactions-overview.component.html',
  styleUrl: './bank-account-transactions-overview.component.css'
})
export class BankAccountTransactionsOverviewComponent {

  @Input() bankAccount : BankAccount | undefined;
}
