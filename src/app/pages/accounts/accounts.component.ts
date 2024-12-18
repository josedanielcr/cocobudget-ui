import { Component } from '@angular/core';
import {
  BankAccountsOverviewComponent
} from '../../components/core/bank-accounts-overview/bank-accounts-overview.component';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    BankAccountsOverviewComponent
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {

  constructor() {
  }
}
