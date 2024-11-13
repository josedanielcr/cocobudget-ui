import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PeriodService} from '../../../services/periods/period.service';
import {DatePipe, NgStyle} from '@angular/common';

@Component({
  selector: 'app-period-bar',
  standalone: true,
  imports: [
    DatePipe,
    NgStyle
  ],
  templateUrl: './period-bar.component.html',
  styleUrl: './period-bar.component.css'
})
export class PeriodBarComponent {


  constructor(public periodService : PeriodService) {
  }

  calculateProgress(): number {
    if (this.periodService.activePeriod()) {
      const now = new Date();
      const startDate = new Date(this.periodService.activePeriod()?.startDate as Date);
      const endDate = new Date(this.periodService.activePeriod()?.endDate as Date);
      const total = endDate.getTime() - startDate.getTime();
      const progress = now.getTime() - startDate.getTime();
      return Math.floor(progress / total * 100);
    }
    return 0;
  }

  calculateRemainingDays(): number {
    if (this.periodService.activePeriod()) {
      const now = new Date();
      const endDate = new Date(this.periodService.activePeriod()?.endDate as Date);
      const total = endDate.getTime() - now.getTime();
      return Math.ceil(total / (1000 * 60 * 60 * 24));
    }
    return 0;
  }
}
