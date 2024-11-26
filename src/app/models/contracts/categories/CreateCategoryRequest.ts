import {CategoryType} from '../../Enums/CategoryType.enum';

export class CreateCategoryRequest {
  userId : string | undefined;
  folderId : string | undefined;
  categoryType : CategoryType = CategoryType.Fixed;
  finalDate : Date | undefined;
  currency : string | undefined;
  generalTargetAmount : number | undefined;
  targetAmount : number | undefined;
  name : string | undefined;
}
