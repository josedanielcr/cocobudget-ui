export class Category {
  public id : string;
  public generalId : string;
  public name : string;
  public folderId : string;
  public GeneralCategoryId : string;
  public targetAmount : number;
  public budgetAmount : number;
  public amountSpent : number;
  public amountRemaining : number;
  public userId : string;
  public isActive : boolean;
  public createdOn : Date;
  public modifiedOn : Date;

  constructor(id: string, generalId: string, name: string, folderId: string, GeneralCategoryId: string, targetAmount: number, budgetAmount: number,
              amountSpent: number, amountRemaining: number, userId: string, isActive: boolean, createdOn: Date, modifiedOn: Date) {
    this.id = id;
    this.generalId = generalId;
    this.name = name;
    this.folderId = folderId;
    this.GeneralCategoryId = GeneralCategoryId;
    this.targetAmount = targetAmount;
    this.budgetAmount = budgetAmount;
    this.amountSpent = amountSpent;
    this.amountRemaining = amountRemaining;
    this.userId = userId;
    this.isActive = isActive;
    this.createdOn = createdOn;
    this.modifiedOn = modifiedOn
  }
}
