export class UpdateBankAccountRequest {
  name : string = '';
  bankName : string = '';
  currentBalance : number | undefined;
  accountNumber : string = '';
  notes : string = '';
}
