import { Component } from '@angular/core';
import {ToastModel} from '../../../models/utils/ToastModel';
import {ToastType} from '../../../models/Enums/ToastType.enum';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {

  toastModel : ToastModel | undefined;

  constructor() { }

  protected readonly ToastType = ToastType;
}
