import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Transaction} from '../../../../models/Transaction';
import {BankAccount} from '../../../../models/BankAccount';
import {CustomCurrencyPipePipe} from '../../../../pipes/custom-currency-pipe.pipe';
import {DatePipe} from '@angular/common';
import {FolderService} from '../../../../services/folders/folder.service';
import {EnumsService} from '../../../../services/utils/enums.service';
import {TransactionTypeEnum} from '../../../../models/Enums/TransactionType.enum';
import {TransactionService} from '../../../../services/transactions/transaction.service';
import {Result} from '../../../../shared/Result';
import {MessageService} from '../../../../services/utils/message.service';
import {ToastType} from '../../../../models/Enums/ToastType.enum';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [
    CustomCurrencyPipePipe,
    DatePipe
  ],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent {

  @Input() transaction : Transaction | undefined;
  @Input() bankAccount : BankAccount | undefined;
  @ViewChild('deleteButton', {static: false}) deleteButton : ElementRef | undefined;

  constructor(public folderService : FolderService,
              public enumService : EnumsService,
              private transactionService : TransactionService,
              private messageService : MessageService) {
  }

  protected readonly TransactionTypeEnum = TransactionTypeEnum;

  simulateDeleteButtonOnClick() {
    (this.deleteButton?.nativeElement as HTMLElement).click();
  }

  delete() {
    this.transactionService.deleteTransaction(this.transaction as Transaction).subscribe({
      next : (result : Result<boolean>) => {
        this.messageService.showToastMessage('Transaction deleted successfully', ToastType.Success);
        this.simulateDeleteButtonOnClick();
      },
      error : (error : Result<boolean>) => {
        this.messageService.showToastMessage(error.error.message, ToastType.Error);
      }
    })
  }
}
