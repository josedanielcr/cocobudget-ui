import {Component, Input} from '@angular/core';
import {BankAccount} from '../../../../models/BankAccount';
import {CreateTransactionComponent} from '../create-transaction/create-transaction.component';
import {TransactionService} from '../../../../services/transactions/transaction.service';
import {CustomCurrencyPipePipe} from '../../../../pipes/custom-currency-pipe.pipe';
import {FolderService} from '../../../../services/folders/folder.service';
import {DatePipe} from '@angular/common';
import {TransactionDetailsComponent} from '../transaction-details/transaction-details.component';
import {EnumsService} from '../../../../services/utils/enums.service';
import {TransactionTypeEnum} from '../../../../models/Enums/TransactionType.enum';
import {ReviewCategoryTransactionComponent} from '../review-category-transaction/review-category-transaction.component';

@Component({
  selector: 'app-bank-account-transactions-overview',
  standalone: true,
  imports: [
    CreateTransactionComponent,
    CustomCurrencyPipePipe,
    DatePipe,
    TransactionDetailsComponent,
    ReviewCategoryTransactionComponent
  ],
  templateUrl: './bank-account-transactions-overview.component.html',
  styleUrl: './bank-account-transactions-overview.component.css'
})
export class BankAccountTransactionsOverviewComponent {

  @Input() bankAccount : BankAccount | undefined;

  constructor(public transactionService : TransactionService,
              public folderService : FolderService,
              public enumService : EnumsService) { }

  countTransactionsByAccountId() {
    return this.transactionService.transactions()?.filter((transaction) => transaction.linkedAccountId === this.bankAccount?.id).length;
  }

  protected readonly TransactionTypeEnum = TransactionTypeEnum;
}
