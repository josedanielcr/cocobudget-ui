import {Component, ElementRef, ViewChild} from '@angular/core';
import {HSOverlay} from 'preline/preline';
import {PeriodService} from '../../../services/periods/period.service';
import {AccountService} from '../../../services/accounts/account.service';
import {Result} from '../../../shared/Result';
import {Period} from '../../../models/Period';
import {MessageService} from '../../../services/utils/message.service';
import {ToastType} from '../../../models/Enums/ToastType.enum';

@Component({
  selector: 'app-create-expired-period',
  standalone: true,
  imports: [],
  templateUrl: './create-expired-period.component.html',
  styleUrl: './create-expired-period.component.css'
})
export class CreateExpiredPeriodComponent {

  @ViewChild('modal') modal : ElementRef | undefined;

  constructor(public periodService : PeriodService,
              private accountService : AccountService,
              private messageService : MessageService) { }

  open(){
    HSOverlay.open(this.modal?.nativeElement);
  }

  close(){
    HSOverlay.close(this.modal?.nativeElement);
  }

  clonePeriod() {
    this.periodService.clonePeriod(this.accountService.user()?.id as string).subscribe({
      next : (result : Result<Period>) => {
        this.messageService.showToastMessage('Your last budget has been cloned!', ToastType.Success);
        this.close();
      },
      error : (result : Result<Period>)=> {
        this.messageService.showToastMessage(result.error.message, ToastType.Error);
      }
    });
  }
}
