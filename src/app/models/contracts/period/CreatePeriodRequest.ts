
export class CreatePeriodRequest {
  startDate : Date;
  length : number;
  dayLength : number;
  userId : string;
  shouldClone : boolean = false;

  constructor(
    startDate : Date,
    length : number,
    dayLength : number,
    userId : string,
    shouldClone : boolean = false
  ) {
    this.startDate = startDate;
    this.length = length;
    this.dayLength = dayLength;
    this.userId = userId;
    this.shouldClone = shouldClone;
  }
}
