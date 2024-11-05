import {Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ToastComponent} from '../toast/toast.component';
import {ToastModel} from '../../../models/utils/ToastModel';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css'
})
export class ToastContainerComponent {

  private toastComponentsQueue: ComponentRef<ToastComponent>[] = [];
  @ViewChild('toastContainer', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;

  constructor() {
  }

  addToastMessage(toastModel : ToastModel){
    const componentRef = this.createToastComponentRef(toastModel);
    this.performQueueUpdate(componentRef);
  }

  private createToastComponentRef(toastModel: ToastModel) {
    const componentRef: ComponentRef<ToastComponent> = this.viewContainerRef.createComponent(ToastComponent);
    componentRef.instance.toastModel = toastModel;
    return componentRef;
  }

  private performQueueUpdate(componentRef: ComponentRef<ToastComponent>) {
    this.toastComponentsQueue.push(componentRef);
    setTimeout(() => {
      this.removeToast(componentRef);
    }, componentRef.instance.toastModel?.duration);
  }

  private removeToast(componentRef: ComponentRef<ToastComponent>) {
    const index = this.toastComponentsQueue.indexOf(componentRef);
    if (index >= 0) {
      this.toastComponentsQueue.splice(index, 1);
      componentRef.destroy();
    }
  }
}
