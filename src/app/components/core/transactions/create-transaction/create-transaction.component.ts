import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {BankAccount} from '../../../../models/BankAccount';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {FolderService} from '../../../../services/folders/folder.service';
import {Category} from '../../../../models/Category';
import {HSSelect} from 'preline/preline';
import {MessageService} from '../../../../services/utils/message.service';
import {ToastType} from '../../../../models/Enums/ToastType.enum';
import {CreateTransactionRequest} from '../../../../models/contracts/transactions/CreateTransactionRequest';
import {TransactionService} from '../../../../services/transactions/transaction.service';
import {EnumsService} from '../../../../services/utils/enums.service';
import {TransactionTypeEnum} from '../../../../models/Enums/TransactionType.enum';
import {EnumArray} from '../../../../models/utils/EnumArray';

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.css',
  providers: [CurrencyPipe]
})
export class CreateTransactionComponent {

  @Input() bankAccount : BankAccount | undefined;
  public categories : Category[] = [];
  @ViewChild('inputCategory') inputCategory : ElementRef | undefined;
  @ViewChild('button') button : ElementRef | undefined;

  //form elements
  readonly amount : FormControl = new FormControl<string | undefined>('',[Validators.required]);
  readonly type : FormControl = new FormControl<number | undefined>(0,[Validators.required]);
  readonly categoryId : FormControl = new FormControl<string | undefined>('',[Validators.required]);
  readonly folderId : FormControl = new FormControl<string | undefined>('',[Validators.required]);
  readonly notes : FormControl = new FormControl<string | undefined>('', [Validators.required]);

  constructor(private currencyPipe : CurrencyPipe,
              public folderService : FolderService,
              private messageService : MessageService,
              private transactionService : TransactionService,
              private enumService : EnumsService) {
  }

  simulateButtonOnClick() {
    this.button?.nativeElement.click();
  }

  onInputTargetChange(event: Event) {
    this.onInputChange(event, this.amount);
  }

  onInputChange(event: Event, formControl: FormControl): void {
    const rawValue = this.sanitizeCurrencyInput(event);

    if (this.isNumericValue(rawValue)) {
      formControl.setValue(rawValue);
    }
  }

  isNumericValue(value: string | number): boolean {
    return !isNaN(+value);
  }

  private sanitizeCurrencyInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    return inputValue.replace(/[\$,]/g, '');
  }

  formatValueOnBlur() {
    this.formatAmountValue(this.amount);
  }

  formatAmountValue(formControl: FormControl): void {
    const rawValue = formControl.value;
    if (rawValue && this.isNumericValue(rawValue)) {
      const formatted = this.formatAsCurrency(rawValue);
      formControl.setValue(formatted, { emitEvent: false });
    }
  }

  private formatAsCurrency(value: string | number): string {
    return this.currencyPipe.transform(value, '', '', '1.2-2') || '';
  }

  showCategoriesByFolder() {
    this.categories = this.folderService.folders()?.find(folder => folder.id === this.folderId.value)?.categories || [];
    const element = HSSelect.getInstance('#input-category',true) as any;
    const select = element.element as HSSelect;
    //@ts-ignore
    const options = select.selectOptions;
    options.forEach((option : any) => {
      select.removeOption(option.val);
    });
    this.categories.forEach(category => {
      select.addOption({val : category.id, title : category.name});
    });
  }

  create() {
    const [result , message] = this.validateForm();
    if(!result){
      this.messageService.showToastMessage(message, ToastType.Error);
      return;
    }

    const createTransactionReq : CreateTransactionRequest = new CreateTransactionRequest();
    createTransactionReq.amount = this.amount.value;
    createTransactionReq.type = this.type.value;
    createTransactionReq.linkedCategoryId = this.categoryId.value;
    createTransactionReq.linkedAccountId = this.bankAccount?.id || '';
    createTransactionReq.note = this.notes.value;

    this.executeCreateTransactionReq(createTransactionReq);
  }

  private validateForm(): [boolean, string] {
    if(this.amount.invalid || this.type.invalid || this.categoryId.invalid || this.folderId.invalid){
      return [false, 'Please fill all required fields'];
    }

    if(this.amount.value <= 0){
      return [false, 'Amount must be greater than 0'];
    }

    return [true, ''];
  }

  private executeCreateTransactionReq(createTransactionReq: CreateTransactionRequest) {
    this.transactionService.createTransaction(createTransactionReq).subscribe({
      next : (result) => {
          this.messageService.showToastMessage('Transaction created successfully', ToastType.Success);
          this.resetForm();
          this.simulateButtonOnClick();
      },
      error : (error) => {
        this.messageService.showToastMessage('An error occurred while creating transaction', ToastType.Error);
      }
    });
  }

  private resetForm() {
    this.amount.setValue('');
    this.type.setValue(0);
    this.categoryId.setValue('');
    this.folderId.setValue('');
    this.notes.setValue('');
  }

  getTransactionTypes(): EnumArray[] {
    return this.enumService.createEnumArray(TransactionTypeEnum);
  }
}
