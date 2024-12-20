export class CreateBankAccountRequest {
  name : string = '';
  bankName : string = '';
  currentBalance : number | undefined;
  currency : string = '';
  accountNumber : string = '';
  notes : string = '';
  userId : string = '';
}
