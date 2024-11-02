export class CreateFolderRequest {
  name : string;
  icon : string;
  color : string;
  userId : string;

  constructor(name : string, icon : string, color : string, userId : string){
    this.name = name;
    this.icon = icon;
    this.color = color;
    this.userId = userId;
  }
}
