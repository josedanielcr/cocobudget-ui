export class FolderState {
  id : string;
  isDisabled : boolean;
  isOpened : boolean = false;
  constructor(id : string, isDisabled : boolean, isOpened : boolean = false) {
    this.id = id;
    this.isDisabled = isDisabled;
    this.isOpened = isOpened;
  }
}
