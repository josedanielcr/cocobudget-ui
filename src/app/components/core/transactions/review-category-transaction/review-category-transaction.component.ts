import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {BankAccount} from '../../../../models/BankAccount';
import {Transaction} from '../../../../models/Transaction';
import {CustomCurrencyPipePipe} from '../../../../pipes/custom-currency-pipe.pipe';
import {DatePipe} from '@angular/common';
import {TransactionService} from '../../../../services/transactions/transaction.service';
import {Result} from '../../../../shared/Result';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {FolderService} from '../../../../services/folders/folder.service';
import {Folder} from '../../../../models/Folder';
import {Category} from '../../../../models/Category';
import {MessageService} from '../../../../services/utils/message.service';
import {ToastType} from '../../../../models/Enums/ToastType.enum';
import {ReviewTransactionRequest} from '../../../../models/contracts/transactions/ReviewTransactionRequest';

@Component({
  selector: 'app-review-category-transaction',
  standalone: true,
  imports: [
    CustomCurrencyPipePipe,
    DatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './review-category-transaction.component.html',
  styleUrl: './review-category-transaction.component.css'
})
export class ReviewCategoryTransactionComponent {

  @ViewChild('exchangeRateInputE') exchangeRateInputE : ElementRef | undefined;
  @ViewChild('closeButton') closeButton : ElementRef | undefined;
  @Input() bankAccount : BankAccount | undefined;
  @Input() transaction : Transaction | undefined;
  public exchangeRate : number | null = null;

  //form element
  readonly exchangeRateInput : FormControl = new FormControl<number | undefined>(0, [Validators.required]);

  constructor(private transactionService : TransactionService,
              private folderService : FolderService,
              private messageService : MessageService) {
  }

  simulateCloseButtonClicked() {
    const closeButton = this.closeButton?.nativeElement as HTMLElement;
    closeButton.click();
  }

  review() {
    if(this.exchangeRateInput.invalid) {
      this.messageService.showToastMessage('Exchange rate is required', ToastType.Error);
      return;
    }
    const reviewTransactionRequest : ReviewTransactionRequest = new ReviewTransactionRequest();
    reviewTransactionRequest.transactionId = this.transaction?.id as string;
    reviewTransactionRequest.exchangeRate = this.exchangeRateInput.value;
    this.executeReviewTransactionReq(reviewTransactionRequest);
  }

  getRecommendedExchangeRate() {
    this.transactionService.getRecommendedTransactionExchangeRate(this.transaction?.id as string).subscribe({
      next: (exchangeRate : Result<number>) => {
        this.exchangeRate = exchangeRate.value;
        this.exchangeRateInput.setValue(this.exchangeRate);
        const input = this.exchangeRateInputE?.nativeElement as HTMLInputElement;
        input.disabled = true;
      },
      error: (error : Result<number>) => {
        this.messageService.showToastMessage(error.error.message, ToastType.Error);
      }
    });
  }

  getCategoryCurrency() {
    let currency;
    const folders = this.folderService.folders();
    folders?.forEach((folder : Folder) => {
      folder.categories?.forEach((category : Category) => {
        if (category.id === this.transaction?.linkedCategoryId) {
          currency = category.generalCategory.currency;
        }
      })
    })
    return currency;
  }

  setAutomaticExchangeRateValue() {
    this.exchangeRateInput.setValue(this.exchangeRate);
    const input = this.exchangeRateInputE?.nativeElement as HTMLInputElement;
    input.disabled = true;
  }

  setManualExchangeRateValue() {
    const input = this.exchangeRateInputE?.nativeElement as HTMLInputElement;
    input.disabled = false;
  }

  private executeReviewTransactionReq(reviewTransactionRequest: ReviewTransactionRequest) {
    this.transactionService.reviewCategoryOfTransaction(reviewTransactionRequest).subscribe({
      next: (result : Result<Transaction>) => {
        this.messageService.showToastMessage('Transaction reviewed successfully', ToastType.Success);
        this.simulateCloseButtonClicked();
      },
      error: (error : Result<Transaction>) => {
        this.messageService.showToastMessage(error.error.message, ToastType.Error);
      }
    });
  }
}
