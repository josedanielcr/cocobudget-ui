import {Component, Input} from '@angular/core';
import {DatePipe, NgStyle} from '@angular/common';
import {CustomCurrencyPipePipe} from '../../../pipes/custom-currency-pipe.pipe';

@Component({
  selector: 'app-category-amounts-progress-bar',
  standalone: true,
  imports: [
    DatePipe,
    NgStyle,
    CustomCurrencyPipePipe
  ],
  templateUrl: './category-amounts-progress-bar.component.html',
  styleUrl: './category-amounts-progress-bar.component.css'
})
export class CategoryAmountsProgressBarComponent {

  @Input() amountSpent : number | undefined;
  @Input() targetAmount : number | undefined;
  @Input() currency : string | undefined;

  calculateProgress() {
    if(this.amountSpent == null || this.targetAmount == null) return 0;
    return (this.amountSpent / this.targetAmount) * 100;
  }
}
