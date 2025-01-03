import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryType} from '../../../../models/Enums/CategoryType.enum';
import {EnumArray} from '../../../../models/utils/EnumArray';
import {CurrencyPipe, NgClass} from '@angular/common';
import {MessageService} from '../../../../services/utils/message.service';
import {ToastType} from '../../../../models/Enums/ToastType.enum';
import {CategoryService} from '../../../../services/categories/category.service';
import {CreateCategoryRequest} from '../../../../models/contracts/categories/CreateCategoryRequest';
import {Category} from '../../../../models/Category';
import {Result} from '../../../../shared/Result';
import {AccountService} from '../../../../services/accounts/account.service';
import {PrelineService} from '../../../../services/utils/preline.service';
import {EnumsService} from '../../../../services/utils/enums.service';

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

  @ViewChild('createCategoryButton', { static : false}) createCategoryButton : ElementRef | undefined;
  @Input() folderId : string | undefined;
  @Input() isIcon : boolean = false;

  //form elements
  readonly name: FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly categoryType: FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly currency: FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly finalDate : FormControl<string | null> = new FormControl(new Date().toISOString().split('T')[0]);
  readonly generalTargetAmount : FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly targetAmount : FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly isFinalDateNeeded : FormControl<boolean | null> = new FormControl(false);

  // utils
  public categoryTypes : EnumArray[] | undefined;
  protected readonly CategoryType = CategoryType;
  public readonly today: string;

  constructor(/*public currencyService : CurrencyService*/
              private currencyPipe : CurrencyPipe,
              private messageService : MessageService,
              private categoryService : CategoryService,
              private accountService : AccountService,
              private enumService : EnumsService) {
    this.today = new Date().toISOString().split('T')[0];
    this.categoryTypes = this.createCategoryTypeArr();
  }

  private createCategoryTypeArr() : EnumArray[] {
    return this.enumService.createEnumArray(CategoryType);
  }

  triggerButtonClick() {
    if (this.createCategoryButton) {
      this.createCategoryButton.nativeElement.click();
    }
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

  createCategory() {
    const [result, message] = this.createCategoryValidations();
    if(!result){
      this.messageService.showToastMessage(message, ToastType.Error);
      return;
    }
    this.createCategoryReq();
  }

  private clearForm() {
    this.name.reset();
    this.finalDate.reset();
    this.generalTargetAmount.reset();
    this.targetAmount.reset();
  }


  private createCategoryValidations(): [boolean, string]  {
    if (this.name.invalid || this.currency.invalid || this.categoryType.invalid) {
      return [false, 'You must add all the general information'];
    }
    if(this.categoryType.invalid){
      return [false, 'You must select a category type'];
    }

    if(this.generalTargetAmount.invalid){
      return [false, 'You must add your target amount'];
    }

    if(this.categoryType.value == this.CategoryType.Fixed.toString()){
      return [true, ''];
    }

    if(this.isFinalDateNeeded.value === true && this.finalDate.value == null){
      return [false, 'You must select a final date'];
    }

    const finalDate = new Date(this.finalDate.value as string);
    const today = new Date(this.today);

    if(this.isFinalDateNeeded.value === true && finalDate <= today){
      return [false, 'You must select a final date that is different from today'];
    }
    return [true, ''];
  }

  private createCategoryReq() {
    const createCategoryRequest = this.createCategoryRequest();
    this.categoryService.createCategory(createCategoryRequest).subscribe({
      next: (result : Result<Category>) => {
        this.messageService.showToastMessage('Category created successfully', ToastType.Success);
        this.clearForm();
        this.triggerButtonClick();
      },
      error: (error: Result<Category>) => {
        this.messageService.showToastMessage(error.error.message, ToastType.Error);
      }
    });
  }

  private createCategoryRequest() : CreateCategoryRequest {
    let req = new CreateCategoryRequest();
    req.name = (this.name.value as string);
    req.currency = (this.currency.value as string);
    req.generalTargetAmount = parseFloat(this.generalTargetAmount.value?.replace(/,/g, "") as string);
    req.userId = this.accountService.user()?.id;
    req.folderId = this.folderId;
    if(this.categoryType.value === this.CategoryType.Custom.toString()) return this.createCustomCreateCategoryRequest(req);
    else return this.createFixedCreateCategoryRequest(req);
  }

  private createCustomCreateCategoryRequest(req : CreateCategoryRequest) : CreateCategoryRequest {
    req.categoryType = CategoryType.Custom;
    if(this.isFinalDateNeeded.value === false){
      req.finalDate = undefined;
      req.targetAmount = parseFloat(this.targetAmount.value?.replace(/,/g, "") as string);
      return req;
    }
    req.finalDate = new Date(this.finalDate.value as string);
    req.targetAmount = undefined;
    return req;
  }

  private createFixedCreateCategoryRequest(req : CreateCategoryRequest) : CreateCategoryRequest {
    req.categoryType = CategoryType.Fixed;
    req.finalDate = undefined;
    return req;
  }
}
