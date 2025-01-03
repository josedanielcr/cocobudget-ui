import {TransactionInsight} from './TransactionInsight';

export class BankAccount {
  id : string | undefined;
  isActive : boolean | undefined;
  createdOn : Date | undefined;
  modifiedOn : Date | undefined;
  name : string | undefined;
  insights : TransactionInsight[] | null = null;
  bankName : string | undefined;
  currentBalance : number | undefined;
  currency : string | undefined;
  accountNumber : string | undefined;
  notes : string | undefined;
  userId : string | undefined;

  constructor(id : string | undefined, isActivate : boolean | undefined, createdOn : Date | undefined,
            bankName : string | undefined,  modifiedOn : Date | undefined, name : string | undefined, currentBalance : number | undefined, currency : string | undefined, accountNumber : string | undefined, notes : string | undefined, userId : string | undefined) {
    this.id = id;
    this.isActive = isActivate;
    this.createdOn = createdOn;
    this.modifiedOn = modifiedOn;
    this.bankName = bankName;
    this.name = name;
    this.currentBalance = currentBalance;
    this.currency = currency;
    this.accountNumber = accountNumber;
    this.notes = notes;
    this.userId = userId;
  }
}
