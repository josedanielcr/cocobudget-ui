import { Component } from '@angular/core';
import {BankAccountService} from '../../../services/bankAccounts/bank-account.service';

@Component({
  selector: 'app-bank-accounts-overview',
  standalone: true,
  imports: [],
  templateUrl: './bank-accounts-overview.component.html',
  styleUrl: './bank-accounts-overview.component.css'
})
export class BankAccountsOverviewComponent {

  constructor(public bankAccountService : BankAccountService) {
  }
}
