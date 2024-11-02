import {BaseClass} from './BaseClass';

export class User extends BaseClass {
  id : string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;

  constructor(
    id : string,
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string = '',
  ) {
    super();  // Call to the base class constructor
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.profilePicture = profilePicture;
  }
}
