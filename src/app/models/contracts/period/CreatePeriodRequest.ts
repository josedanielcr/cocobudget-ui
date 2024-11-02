
export class CreatePeriodRequest {
  startDate : Date;
  length : number;
  dayLength : number;
  userId : string;

  constructor(
    startDate : Date,
    length : number,
    dayLength : number,
    userId : string
  ) {
    this.startDate = startDate;
    this.length = length;
    this.dayLength = dayLength;
    this.userId = userId;
  }
}
