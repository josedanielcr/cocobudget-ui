import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BankAccount} from '../../../../models/BankAccount';
import {CustomCurrencyPipePipe} from '../../../../pipes/custom-currency-pipe.pipe';
import {UpdateBankAccountComponent} from '../update-bank-account/update-bank-account.component';

@Component({
  selector: 'app-bank-account-card',
  standalone: true,
  imports: [
    CustomCurrencyPipePipe,
    UpdateBankAccountComponent
  ],
  templateUrl: './bank-account-card.component.html',
  styleUrl: './bank-account-card.component.css'
})
export class BankAccountCardComponent {

  @Input() bankAccount : BankAccount | undefined;
  @Input() isActive : boolean = false;
  @Output() onActivate = new EventEmitter<string>();

  constructor() { }

  activate() {
    this.onActivate.emit(this.bankAccount?.id);
  }

  rename(bankAccount: BankAccount | undefined) {

  }

  delete(bankAccount: BankAccount | undefined) {

  }
}
