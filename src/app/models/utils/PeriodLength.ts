import {PeriodsLengthEnum} from '../Enums/PeriodsLength.enum';

export class PeriodLength {
  constructor(public readonly name: PeriodsLengthEnum,
              public readonly value: number,
              public numberOfDays: number) {
  }
}
