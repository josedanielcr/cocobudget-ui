import {BaseClass} from './BaseClass';
import {PeriodLength} from './utils/PeriodLength';

export class Period extends BaseClass {
  startDate: Date;
  endDate: Date;
  lengthVal: PeriodLength | undefined;
  length : number
  dayLength: number;
  userId: string;
  amountSpent: number;
  budgetAmount: number;

  constructor(
    id: string,
    startDate: Date,
    endDate: Date,
    length: number,
    dayLength: number,
    userId: string,
    amountSpent: number,
    budgetAmount: number
  ) {
    super();
    this.startDate = startDate;
    this.endDate = endDate;
    this.length = length;
    this.dayLength = dayLength;
    this.userId = userId;
    this.amountSpent = amountSpent;
    this.budgetAmount = budgetAmount;
  }
}
