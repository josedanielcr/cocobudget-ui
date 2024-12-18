export class CreditCard {
  id : string | undefined;
  isActivate : boolean | undefined;
  createdOn : Date | undefined;
  modifiedOn : Date | undefined;
  name : string | undefined;
  currentBalance : number | undefined;
  currency : string | undefined;
  accountNumber : string | undefined;
  notes : string | undefined;
  creditLimit : number | undefined;
  statementClosingDay : number | undefined;
  paymentOffset : number | undefined;
  supportedCurrencies : string[] | undefined;
  userId : string | undefined;

  constructor(id : string | undefined, isActivate : boolean | undefined, createdOn : Date | undefined, modifiedOn : Date | undefined, name : string | undefined, currentBalance : number | undefined, currency : string | undefined, accountNumber : string | undefined, notes : string | undefined, creditLimit : number | undefined, statementClosingDay : number | undefined, paymentOffset : number | undefined, supportedCurrencies : string[] | undefined, userId : string | undefined) {
    this.id = id;
    this.isActivate = isActivate;
    this.createdOn = createdOn;
    this.modifiedOn = modifiedOn;
    this.name = name;
    this.currentBalance = currentBalance;
    this.currency = currency;
    this.accountNumber = accountNumber;
    this.notes = notes;
    this.creditLimit = creditLimit;
    this.statementClosingDay = statementClosingDay;
    this.paymentOffset = paymentOffset;
    this.supportedCurrencies = supportedCurrencies;
    this.userId = userId;
  }
}
