import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {BankAccount} from '../../../../models/BankAccount';
import {CustomCurrencyPipePipe} from '../../../../pipes/custom-currency-pipe.pipe';
import {UpdateBankAccountComponent} from '../update-bank-account/update-bank-account.component';
import {BankAccountService} from '../../../../services/bankAccounts/bank-account.service';
import {MessageService} from '../../../../services/utils/message.service';
import {ToastType} from '../../../../models/Enums/ToastType.enum';
import {Result} from '../../../../shared/Result';

@Component({
  selector: 'app-bank-account-card',
  standalone: true,
  imports: [
    CustomCurrencyPipePipe,
    UpdateBankAccountComponent
  ],
  templateUrl: './bank-account-card.component.html',
  styleUrl: './bank-account-card.component.css'
})
export class BankAccountCardComponent {

  @Input() bankAccount : BankAccount | undefined;
  @Input() isActive : boolean = false;
  @Output() onActivate = new EventEmitter<string>();
  @ViewChild('deletionButton', {static : false}) deletionButton : ElementRef | undefined;

  constructor(private bankAccountService : BankAccountService,
              private messageService : MessageService) { }

  activate() {
    this.onActivate.emit(this.bankAccount?.id);
  }

  simulateDeletionButtonClick(){
    if(this.deletionButton){
      this.deletionButton.nativeElement.click();
    }
  }


  delete(){
    this.bankAccountService.delete(this.bankAccount?.id as string).subscribe({
      next : () => {
        this.messageService.showToastMessage('Bank account deleted successfully', ToastType.Success);
        this.simulateDeletionButtonClick();
      },
      error : (result : Result<BankAccount>) => {
        this.messageService.showToastMessage(result.error.message, ToastType.Error);
      }
    })
  }
}
