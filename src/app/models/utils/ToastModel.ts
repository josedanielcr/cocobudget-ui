import {ToastType} from '../Enums/ToastType.enum';

export class ToastModel {
  public type: ToastType;
  public duration: any;
  public message: string;

  constructor(message: string, type : ToastType, durationMs : number ) {
      this.message = message;
      this.type = type;
      this.duration = durationMs;
  }
}
