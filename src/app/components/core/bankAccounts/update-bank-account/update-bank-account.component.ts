import {AfterViewInit, Component, Input} from '@angular/core';
import {BankAccount} from '../../../../models/BankAccount';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HSSelect} from 'preline/preline';

@Component({
  selector: 'app-update-bank-account',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-bank-account.component.html',
  styleUrl: './update-bank-account.component.css'
})
export class UpdateBankAccountComponent implements AfterViewInit {

  @Input() bankAccount : BankAccount | undefined;

  readonly name : FormControl = new FormControl('',[Validators.required]);
  readonly bankName : FormControl = new FormControl('',[ Validators.required]);
  readonly currentBalance : FormControl = new FormControl('',[Validators.required]);
  readonly accountNumber : FormControl = new FormControl('',[Validators.required]);
  readonly notes : FormControl = new FormControl('', [Validators.required]);

  constructor() {
  }

  ngAfterViewInit(): void {
    this.setFormValues();
  }

  private setFormValues() {
    this.name.setValue(this.bankAccount?.name);
    this.bankName.setValue(this.bankAccount?.bankName);
    this.currentBalance.setValue(this.bankAccount?.currentBalance);
    this.accountNumber.setValue(this.bankAccount?.accountNumber);
    this.notes.setValue(this.bankAccount?.notes);
  }

  onInputTargetChange($event: Event) {

  }

  formatValue() {

  }

  update() {

  }
}
