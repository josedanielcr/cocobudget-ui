import {Component, Input} from '@angular/core';
import {Transaction} from '../../../../models/Transaction';
import {BankAccount} from '../../../../models/BankAccount';
import {CustomCurrencyPipePipe} from '../../../../pipes/custom-currency-pipe.pipe';
import {DatePipe} from '@angular/common';
import {FolderService} from '../../../../services/folders/folder.service';
import {EnumsService} from '../../../../services/utils/enums.service';
import {TransactionTypeEnum} from '../../../../models/Enums/TransactionType.enum';

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

  constructor(public folderService : FolderService,
              public enumService : EnumsService) {
  }

  protected readonly TransactionTypeEnum = TransactionTypeEnum;

  delete() {

  }
}
