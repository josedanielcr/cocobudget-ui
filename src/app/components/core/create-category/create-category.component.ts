import {Component, Input, signal, WritableSignal} from '@angular/core';
import {CurrencyService} from '../../../services/utils/currency.service';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {merge} from 'rxjs';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {

  @Input() folderId : string | undefined;

  //form elements
  readonly name: FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly categoryType: FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly currency: FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly finalDate : FormControl<string | null> = new FormControl(new Date().toISOString().split('T')[0]);
  readonly generalTargetAmount : FormControl<number | null> = new FormControl(0);
  readonly targetAmount : FormControl<number | null> = new FormControl(0);
  nameErrorMessage: WritableSignal<string> = signal('');
  categoryTypeErrorMessage: WritableSignal<string> = signal('');
  currencyErrorMessage: WritableSignal<string> = signal('');
  finalDateErrorMessage: WritableSignal<string> = signal('');
  generalTargetAmountErrorMessage: WritableSignal<string> = signal('');
  targetAmountErrorMessage: WritableSignal<string> = signal('');

  constructor(/*public currencyService : CurrencyService*/) {
    this.mergeFormControls();
  }

  createCategory() {
  }

  private mergeFormControls() {
    merge(
      this.name.statusChanges,
      this.name.valueChanges,
      this.categoryType.statusChanges,
      this.categoryType.valueChanges,
      this.currency.statusChanges,
      this.currency.valueChanges,
      this.generalTargetAmount.statusChanges,
      this.generalTargetAmount.valueChanges,
      this.targetAmount.statusChanges,
      this.targetAmount.valueChanges
    ).subscribe(() => {
      this.updateErrorMessages();
    });
  }

  private updateErrorMessages() {
    this.nameErrorMessage.set(this.name.hasError('required') ? 'Name is required' : '');
    this.categoryTypeErrorMessage.set(this.categoryType.hasError('required') ? 'Category type is required' : '');
    this.currencyErrorMessage.set(this.currency.hasError('required') ? 'Currency is required' : '');
    this.generalTargetAmountErrorMessage.set(this.generalTargetAmount.hasError('required') ? 'General target amount is required' : '');
    this.targetAmountErrorMessage.set(this.targetAmount.hasError('required') ? 'Target amount is required' : '');
  }
}
