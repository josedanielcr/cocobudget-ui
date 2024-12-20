import {Component, ElementRef, ViewChild} from '@angular/core';
import {CustomCurrencyPipePipe} from '../../../../pipes/custom-currency-pipe.pipe';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {CreateBankAccountRequest} from '../../../../models/contracts/bankAccounts/CreateBankAccountRequest';
import {BankAccountService} from '../../../../services/bankAccounts/bank-account.service';
import {MessageService} from '../../../../services/utils/message.service';
import {Result} from '../../../../shared/Result';
import {BankAccount} from '../../../../models/BankAccount';
import {ToastType} from '../../../../models/Enums/ToastType.enum';
import {AccountService} from '../../../../services/accounts/account.service';

@Component({
  selector: 'app-create-bank-account',
  standalone: true,
  imports: [
    CustomCurrencyPipePipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-bank-account.component.html',
  styleUrl: './create-bank-account.component.css',
  providers: [CurrencyPipe]
})
export class CreateBankAccountComponent {

  @ViewChild('button', { static : false}) createBankAccountButton : ElementRef | undefined;

  // form elements
  readonly name : FormControl = new FormControl('',[Validators.required]);
  readonly bankName : FormControl = new FormControl('',[ Validators.required]);
  readonly currentBalance : FormControl = new FormControl('',[Validators.required]);
  readonly currency : FormControl = new FormControl('',[Validators.required]);
  readonly accountNumber : FormControl = new FormControl('',[Validators.required]);
  readonly notes : FormControl = new FormControl('', [Validators.required]);

  constructor(private currencyPipe : CurrencyPipe,
              private bankAccountService : BankAccountService,
              private messageService : MessageService,
              private accountService : AccountService) { }


  simulateButtonClicked() {
    if(this.createBankAccountButton){
      this.createBankAccountButton.nativeElement.click();
    }
  }

  onInputTargetChange(event: Event) {
    this.onInputChange(event, this.currentBalance);
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

  formatValue() {
    this.formatAmountValue(this.currentBalance);
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

  create() {
    if(this.name.invalid || this.bankName.invalid || this.currency.invalid || this.accountNumber.invalid){
      return;
    }
    const createBankAccountRequest = new CreateBankAccountRequest();
    createBankAccountRequest.name = this.name.value;
    createBankAccountRequest.bankName = this.bankName.value;
    createBankAccountRequest.currentBalance = this.currentBalance.value ?? 0;
    createBankAccountRequest.currency = this.currency.value;
    createBankAccountRequest.accountNumber = this.accountNumber.value;
    createBankAccountRequest.notes = this.notes.value;
    createBankAccountRequest.userId = this.accountService.user()?.id as string;

    this.createBankAccountReq(createBankAccountRequest);
  }

  private createBankAccountReq(createBankAccountRequest: CreateBankAccountRequest) {
    this.bankAccountService.createBankAccount(createBankAccountRequest).subscribe({
      next : (result : Result<BankAccount>) => {
        this.messageService.showToastMessage(result.value?.name + ' created successfully', ToastType.Success);
        this.simulateButtonClicked();
      },
      error : (result : Result<BankAccount>) => {
        this.messageService.showToastMessage(result.error.message, ToastType.Error);
      }
    })
  }
}
