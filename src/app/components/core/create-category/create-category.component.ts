import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryType} from '../../../models/Enums/CategoryType.enum';
import {EnumArray} from '../../../models/utils/EnumArray';
import {CurrencyPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
  providers: [CurrencyPipe]
})
export class CreateCategoryComponent {

  @Input() folderId : string | undefined;

  //form elements
  readonly name: FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly categoryType: FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly currency: FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly finalDate : FormControl<string | null> = new FormControl(new Date().toISOString().split('T')[0]);
  readonly generalTargetAmount : FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly targetAmount : FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly isFinalDateNeeded : FormControl<boolean | null> = new FormControl(false);

  // utils
  public categoryTypes : EnumArray[]  = this.createCategoryTypeArr();
  protected readonly CategoryType = CategoryType;
  public readonly today: string;

  constructor(/*public currencyService : CurrencyService*/
              private currencyPipe : CurrencyPipe) {
    this.today = new Date().toISOString().split('T')[0];
  }

  createCategory() {
    this.clearForm();
  }

  private createCategoryTypeArr() : EnumArray[] {
    let categoryTypes : EnumArray[] = [];
    for (let categoryType in CategoryType) {
      if (isNaN(Number(categoryType))) {
        categoryTypes.push({value: CategoryType[categoryType], name: categoryType});
      }
    }
    return categoryTypes;
  }

  formatGeneralAmountValue(): void {
    this.formatAmountValue(this.generalTargetAmount);
  }

  formatTargetAmountValue(): void {
    this.formatAmountValue(this.targetAmount);
  }

  onInputGeneralTargetChange(event: Event): void {
    this.onInputChange(event, this.generalTargetAmount);
  }

  onInputTargetChange(event: Event): void {
    this.onInputChange(event, this.targetAmount);
  }

  onInputChange(event: Event, formControl: FormControl): void {
    const rawValue = this.sanitizeCurrencyInput(event);

    if (this.isNumericValue(rawValue)) {
      formControl.setValue(rawValue);
    }
  }

  private sanitizeCurrencyInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    return inputValue.replace(/[\$,]/g, '');
  }

  isNumericValue(value: string | number): boolean {
    return !isNaN(+value);
  }

  private formatAsCurrency(value: string | number): string {
    return this.currencyPipe.transform(value, '', '', '1.2-2') || '';
  }

  formatAmountValue(formControl: FormControl): void {
    const rawValue = formControl.value;
    if (rawValue && this.isNumericValue(rawValue)) {
      const formatted = this.formatAsCurrency(rawValue);
      formControl.setValue(formatted, { emitEvent: false });
    }
  }

  private clearForm() {
    this.name.reset();
    this.categoryType.setValue('');
    this.currency.setValue('');
    this.finalDate.reset();
    this.generalTargetAmount.reset();
    this.targetAmount.reset();
  }
}
