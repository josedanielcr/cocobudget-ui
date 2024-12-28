import {Component, effect, ElementRef, Input, ViewChild} from '@angular/core';
import {Category} from '../../../../models/Category';
import {FolderService} from '../../../../services/folders/folder.service';
import {CustomCurrencyPipePipe} from '../../../../pipes/custom-currency-pipe.pipe';
import {
  CategoryAmountsProgressBarComponent
} from '../../../shared/category-amounts-progress-bar/category-amounts-progress-bar.component';
import {CategoryType} from '../../../../models/Enums/CategoryType.enum';
import {CategoryService} from '../../../../services/categories/category.service';
import {MessageService} from '../../../../services/utils/message.service';
import {Result} from '../../../../shared/Result';
import {ToastType} from '../../../../models/Enums/ToastType.enum';
import {HSOverlay} from 'preline/preline';
import {UpdateCategoryComponent} from '../update-category/update-category.component';
import {TransactionService} from '../../../../services/transactions/transaction.service';
import {Transaction} from '../../../../models/Transaction';
import {SlicePipe} from '@angular/common';
import {BankAccountService} from '../../../../services/bankAccounts/bank-account.service';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CustomCurrencyPipePipe, CategoryAmountsProgressBarComponent, UpdateCategoryComponent, SlicePipe],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent {

  @Input() category : Category | undefined;
  public folderName : string = '';
  public categoryTransactions : Transaction[] = [];
  private foldersEffect = effect(() => {
    const folders = this.folderService.folders();
    if(folders) {
      const folder = folders.find(folder => folder.id === this.category?.folderId);
      this.folderName = folder ? folder.name : '';
    }
  });

  constructor(private folderService : FolderService,
              private categoryService : CategoryService,
              private messageService : MessageService,
              private transactionService : TransactionService,
              private bankAccountService : BankAccountService) {}

  protected readonly CategoryType = CategoryType;

  getLocateDateString(finalDate: Date | undefined) {
    const date = new Date(finalDate || '');
    return date.toLocaleDateString();
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.category?.id as string).subscribe({
      next : (result : Result<Category>) => {
        this.messageService.showToastMessage(result.value?.name + ', was deleted successfully', ToastType.Success);
      },
      error : (result : Result<Category>) => {
        this.messageService.showToastMessage(result.error.message, ToastType.Error);
      }, complete: () => {
        this.closeOffCanvas();
      }
    })
  }

  private closeOffCanvas() {
    const offCanvasId = 'hs-ai-offcanvas-' + this.category?.id;
    const offCanvas = document.getElementById(offCanvasId);
    const backdrop = document.getElementById(offCanvasId + '-backdrop');
    if(offCanvas && backdrop) {
      HSOverlay.close(offCanvas);
      backdrop.remove();
    }
  }

  openOffCanvas() {
    this.transactionService.getCategoryTransaction(this.category?.id as string).subscribe({
      next : (result : Result<Transaction[]>) => {
        this.categoryTransactions = result.value as Transaction[];
      },
      error : (result : Result<Transaction[]>) => {
        this.messageService.showToastMessage(result.error.message, ToastType.Error);
      }
    });
  }

  getBankAccountCurrency(transaction: Transaction) {
    const bankAccount = this.bankAccountService.accounts();
    if(bankAccount) {
      const account = bankAccount.find(account => account.id === transaction.linkedAccountId);
      return account?.currency;
    }
    return '';
  }
}
