import {Component, Input} from '@angular/core';
import {BankAccount} from '../../../../models/BankAccount';
import {CustomCurrencyPipePipe} from '../../../../pipes/custom-currency-pipe.pipe';

@Component({
  selector: 'app-bank-account-card',
  standalone: true,
  imports: [
    CustomCurrencyPipePipe
  ],
  templateUrl: './bank-account-card.component.html',
  styleUrl: './bank-account-card.component.css'
})
export class BankAccountCardComponent {

  @Input() bankAccount : BankAccount | undefined;

}
