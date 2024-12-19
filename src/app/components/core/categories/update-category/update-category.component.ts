import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Category} from '../../../../models/Category';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryType} from '../../../../models/Enums/CategoryType.enum';
import {CurrencyPipe} from '@angular/common';
import {EnumsService} from '../../../../services/utils/enums.service';
import {MessageService} from '../../../../services/utils/message.service';
import {ToastType} from '../../../../models/Enums/ToastType.enum';
import {UpdateCategoryRequest} from '../../../../models/contracts/categories/UpdateCategoryRequest';
import {CategoryService} from '../../../../services/categories/category.service';
import {Result} from '../../../../shared/Result';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css',
  providers: [CurrencyPipe]
})
export class UpdateCategoryComponent implements AfterViewInit {

  public readonly today: string;
  @ViewChild('updateCategoryButton') updateCategoryButton: ElementRef | undefined;

  // form controls
  name: FormControl<string | undefined | null> = new FormControl('', [Validators.required]);
  generalTargetAmount : FormControl<number | undefined | null> = new FormControl(0, [Validators.required]);
  targetAmount : FormControl<number | undefined | null> = new FormControl(0, [Validators.required]);
  finalDate : FormControl<string | undefined | null> = new FormControl(new Date().toISOString().split('T')[0]);

  constructor(private currencyPipe: CurrencyPipe,
              public enumService : EnumsService,
              private messageService : MessageService,
              private categoryService : CategoryService) {
    this.today = new Date().toISOString().split('T')[0];
  }

  ngAfterViewInit(): void {
    this.name = new FormControl(this.category?.name, [Validators.required]);
    this.generalTargetAmount = new FormControl(this.category?.generalCategory.targetAmount, [Validators.required]);
    this.targetAmount = new FormControl(this.category?.targetAmount, [Validators.required]);
    this.finalDate = new FormControl(new Date(this.category?.generalCategory.finalDate as Date).toISOString().split('T')[0]);
  }

  @Input() category : Category | undefined;

  protected readonly CategoryType = CategoryType;

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

  updateCategory() {
    let [result, message] = this.validateUpdateForm();
    if(!result){
      this.messageService.showToastMessage(message, ToastType.Error);
      return;
    }
    const updateCategoryRequest : UpdateCategoryRequest = new UpdateCategoryRequest(
      this.category?.id,
      this.name.value as string,
      this.category?.generalCategory.categoryType,
      this.category?.generalCategory.categoryType == CategoryType.Fixed
        ? this.targetAmount.value as number
        : this.category?.generalCategory?.finalDate == null
          ? this.targetAmount.value as number
          : undefined,
      this.generalTargetAmount.value as number,
      this.category?.generalCategory.categoryType == CategoryType.Fixed ? undefined : new Date(this.finalDate.value as string)
    )
    this.updateCategoryReq(updateCategoryRequest);
  }

  private validateUpdateForm(): [boolean, string] {
    if(this.name.invalid){
      return [false, 'The name cannot be empty'];
    }
    if(this.generalTargetAmount.invalid){
      return [false, 'The general target amount cannot be empty'];
    }
    if(this.category?.generalCategory?.finalDate == null){
      if(this.targetAmount.invalid){
        return [false, 'The target amount cannot be empty'];
      }
    } else {
      const finalDate = new Date(this.finalDate.value as string);
      const today = new Date(this.today);
      if(finalDate <= today){
        return [false, 'You must select a final date that is different from today'];
      }
    }
    return [true, ''];
  }

  private updateCategoryReq(updateCategoryRequest: UpdateCategoryRequest) {
    this.categoryService.updateCategory(updateCategoryRequest).subscribe({
      next : () => {
        this.messageService.showToastMessage('Category updated successfully', ToastType.Success);
      },
      error : (result : Result<Category>) => {
        this.messageService.showToastMessage(result.error.message, ToastType.Error);
      },
      complete : () => {
        this.clearForm();
        this.triggerButtonClick();
      }
    })
  }

  private clearForm() {
    this.name.reset();
    this.generalTargetAmount.reset();
    this.targetAmount.reset();
    this.finalDate.reset();
  }

  private triggerButtonClick() {
    this.updateCategoryButton?.nativeElement.click();
  }
}
