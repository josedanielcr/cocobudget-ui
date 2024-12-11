import {CategoryType} from '../../Enums/CategoryType.enum';

export class UpdateCategoryRequest {
  id : string | undefined;
  name : string | undefined;
  categoryType : CategoryType | undefined;
  targetAmount : number | undefined;
  generalTargetAmount : number | undefined;
  finalDate : Date | undefined;

  constructor(id : string | undefined, name : string | undefined, categoryType : CategoryType | undefined, targetAmount : number | undefined, generalTargetAmount : number | undefined, finalDate : Date | undefined) {
    this.id = id;
    this.name = name;
    this.categoryType = categoryType;
    this.targetAmount = targetAmount;
    this.generalTargetAmount = generalTargetAmount;
    this.finalDate = finalDate;
  }
}
