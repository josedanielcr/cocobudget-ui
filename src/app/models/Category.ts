import {CategoryType} from './Enums/CategoryType.enum';

export class GeneralCategory {
  targetAmount : number | undefined;
  categoryType : CategoryType | undefined;
  finalDate : Date | undefined;
  userId : string | undefined;
  currency : string | undefined;
  id : string | undefined;
  isActive : boolean | undefined;
  createdOn : Date | undefined;
  modifiedOn : Date | undefined;

  constructor(targetAmount: number, categoryType: CategoryType, finalDate: Date, userId: string, currency: string, id: string, isActive: boolean, createdOn: Date, modifiedOn: Date) {
    this.targetAmount = targetAmount;
    this.categoryType = categoryType;
    this.finalDate = finalDate;
    this.userId = userId;
    this.currency = currency;
    this.id = id;
    this.isActive = isActive;
    this.createdOn = createdOn;
    this.modifiedOn = modifiedOn;
  }
}

export class Category {
  public id : string;
  public generalId : string;
  public name : string;
  public folderId : string;
  public GeneralCategoryId : string;
  public generalCategory : GeneralCategory;
  public targetAmount : number;
  public budgetAmount : number;
  public amountSpent : number;
  public amountRemaining : number;
  public userId : string;
  public isActive : boolean;
  public createdOn : Date;
  public modifiedOn : Date;

  constructor(id: string, generalId: string, name: string, folderId: string, GeneralCategoryId: string, targetAmount: number, budgetAmount: number,
              amountSpent: number, amountRemaining: number, userId: string, isActive: boolean, createdOn: Date, modifiedOn: Date, generalCategory: GeneralCategory) {
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
    this.modifiedOn = modifiedOn;
    this.generalCategory = generalCategory;
  }
}
