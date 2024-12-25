export class Transaction {
  id : string | undefined;
  createOn : Date | undefined;
  modifiedOn : Date | undefined;
  isActive : boolean | undefined;
  amount : number | undefined;
  type : number | undefined;
  linkedAccountId : string | undefined;
  linkedCategoryId : string | undefined;
  note : string | undefined;
  requireCategoryReview : boolean | undefined;
}
