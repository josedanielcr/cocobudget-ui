export class CreateTransactionRequest {
  amount : number | undefined;
  type : number | undefined;
  linkedAccountId : string | undefined;
  linkedCategoryId : string | undefined;
  note : string | undefined;
}
