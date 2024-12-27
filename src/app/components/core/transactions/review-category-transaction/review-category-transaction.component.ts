import {Component, Input} from '@angular/core';
import {BankAccount} from '../../../../models/BankAccount';
import {Transaction} from '../../../../models/Transaction';
import {CustomCurrencyPipePipe} from '../../../../pipes/custom-currency-pipe.pipe';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-review-category-transaction',
  standalone: true,
  imports: [
    CustomCurrencyPipePipe,
    DatePipe
  ],
  templateUrl: './review-category-transaction.component.html',
  styleUrl: './review-category-transaction.component.css'
})
export class ReviewCategoryTransactionComponent {

  @Input() bankAccount : BankAccount | undefined;
  @Input() transaction : Transaction | undefined;

  review() {

  }
}
