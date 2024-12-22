import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {BankAccount} from '../../../../models/BankAccount';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {BankAccountService} from '../../../../services/bankAccounts/bank-account.service';
import {MessageService} from '../../../../services/utils/message.service';
import {ToastType} from '../../../../models/Enums/ToastType.enum';
import {UpdateBankAccountRequest} from '../../../../models/contracts/bankAccounts/UpdateBankAccountRequest';
import {Result} from '../../../../shared/Result';

@Component({
  selector: 'app-update-bank-account',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-bank-account.component.html',
  styleUrl: './update-bank-account.component.css',
  providers: [CurrencyPipe]
})
export class UpdateBankAccountComponent implements AfterViewInit {

  @Input() bankAccount : BankAccount | undefined;
  @ViewChild('button', {static : false}) button : ElementRef | undefined;

  readonly name : FormControl = new FormControl('',[Validators.required]);
  readonly bankName : FormControl = new FormControl('',[ Validators.required]);
  readonly currentBalance : FormControl = new FormControl('',[Validators.required]);
  readonly accountNumber : FormControl = new FormControl('',[Validators.required]);
  readonly notes : FormControl = new FormControl('', [Validators.required]);

  constructor(private currencyPipe : CurrencyPipe,
              private bankAccountService : BankAccountService,
              private messageService : MessageService) {
  }

  ngAfterViewInit(): void {
    this.setFormValues();
    this.formatValueOnBlur();
  }

  simulateOnClick(){
    if(this.button){
      this.button.nativeElement.click();
    }
  }

  private setFormValues() {
    this.name.setValue(this.bankAccount?.name);
    this.bankName.setValue(this.bankAccount?.bankName);
    this.currentBalance.setValue(this.bankAccount?.currentBalance);
    this.accountNumber.setValue(this.bankAccount?.accountNumber);
    this.notes.setValue(this.bankAccount?.notes);
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

  formatValueOnBlur() {
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

  update() {
    const [result, message] = this.validateForm();
    if(!result){
      this.messageService.showToastMessage(message, ToastType.Error);
      return;
    }
    this.executeUpdateReq();
  }

  private validateForm(): [boolean , string] {
    if(this.name.invalid || this.bankName.invalid || this.accountNumber.invalid){
      return [false, 'Please fill all the required fields'];
    }
    return [true, ''];
  }

  private executeUpdateReq() {
    const req = this.createRequest();
    this.bankAccountService.updateBankAccount(req, this.bankAccount?.id as string).subscribe({
      next : (result : Result<BankAccount>) => {
        this.messageService.showToastMessage('Bank Account updated successfully', ToastType.Success);
        this.simulateOnClick();
      },
      error : (result : Result<BankAccount>) => {
        this.messageService.showToastMessage(result.error.message, ToastType.Error);
      }
    })
  }

  private createRequest() {
    const updateBankAccountReq: UpdateBankAccountRequest = new UpdateBankAccountRequest();
    updateBankAccountReq.name = this.name.value;
    updateBankAccountReq.bankName = this.bankName.value;
    updateBankAccountReq.currentBalance = parseFloat(this.currentBalance.value.replace(/,/g, ''));
    updateBankAccountReq.accountNumber = this.accountNumber.value;
    updateBankAccountReq.notes = this.notes.value;
    return updateBankAccountReq;
  }
}
