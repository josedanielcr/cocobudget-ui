export class CreateBankAccountRequest {
  name : string = '';
  BankName : string = '';
  currentBalance : number | undefined;
  currency : string = '';
  accountNumber : string = '';
  notes : string = '';
  userId : string = '';
}
