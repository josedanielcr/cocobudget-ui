import { Injectable } from '@angular/core';
import {ToastContainerComponent} from '../../components/shared/toast-container/toast-container.component';
import {ToastType} from '../../models/Enums/ToastType.enum';
import {ToastModel} from '../../models/utils/ToastModel';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private toastContainer: ToastContainerComponent | undefined;

  constructor() { }

  setToastContainer(toastContainer: ToastContainerComponent) {
    this.toastContainer = toastContainer;
  }

  public showToastMessage(message: string, type : ToastType, duration: number = 5000) {
    if (this.toastContainer) {
      this.toastContainer.addToastMessage(new ToastModel(message, type, duration));
    }
  }
}
