export class CreateBankAccountRequest {
  name : string = '';
  bankName : string = '';
  currentBalance : number | undefined;
  accountNumber : string = '';
  notes : string = '';
}
