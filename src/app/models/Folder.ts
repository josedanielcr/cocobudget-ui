import {BaseClass} from './BaseClass';

export class Folder extends BaseClass {
  id : string;
  name : string;
  icon : string;
  color : string;
  userId : string;

  constructor(
    id : string,
    name : string,
    icon : string,
    color : string,
    userId : string
  ) {
    super();  // Call to the base class constructor
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.color = color;
    this.userId = userId;
  }
}
