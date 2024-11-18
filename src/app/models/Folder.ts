import {BaseClass} from './BaseClass';

export class Folder extends BaseClass {
  id : string;
  name : string;
  userId : string;
  periodId : string;

  constructor(
    id : string,
    name : string,
    userId : string,
    periodId : string
  ) {
    super();  // Call to the base class constructor
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.periodId = periodId;
  }
}
