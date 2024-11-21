import {BaseClass} from './BaseClass';
import {Category} from './Category';

export class Folder extends BaseClass {
  id : string;
  name : string;
  userId : string;
  periodId : string;
  categories : Category[] | undefined;

  constructor(
    id : string,
    name : string,
    userId : string,
    periodId : string,
    categories : Category[] | undefined
  ) {
    super();  // Call to the base class constructor
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.periodId = periodId;
    this.categories = categories;
  }
}
