import {Component, ElementRef, ViewChild} from '@angular/core';
import {HSOverlay} from 'preline/preline';

@Component({
  selector: 'app-create-expired-period',
  standalone: true,
  imports: [],
  templateUrl: './create-expired-period.component.html',
  styleUrl: './create-expired-period.component.css'
})
export class CreateExpiredPeriodComponent {

  @ViewChild('modal') modal : ElementRef | undefined;

  constructor() { }

  open(){
    HSOverlay.open(this.modal?.nativeElement);
  }

  close(){
    HSOverlay.close(this.modal?.nativeElement);
  }
}
