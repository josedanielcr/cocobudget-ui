import {BaseClass} from './BaseClass';
import {PeriodLength} from '../PeriodLength';

export class Period extends BaseClass {
  StartDate : Date;
  EndDate : Date;
  Length : PeriodLength;
  DayLength : number;
  UserId : string;
  AmountSpent : number;
  BudgetAmount : number

  constructor(
    id : string,
    startDate : Date,
    endDate : Date,
    length : PeriodLength,
    dayLength : number,
    userId : string,
    amountSpent : number,
    budgetAmount : number
  ) {
    super();
    this.StartDate = startDate;
    this.EndDate = endDate;
    this.Length = length;
    this.DayLength = dayLength;
    this.UserId = userId;
    this.AmountSpent = amountSpent;
    this.BudgetAmount = budgetAmount;
  }
}
