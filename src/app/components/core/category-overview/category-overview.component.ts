import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Category} from '../../../models/Category';
import {HSOverlay} from 'preline/preline';

@Component({
  selector: 'app-category-overview',
  standalone: true,
  imports: [],
  templateUrl: './category-overview.component.html',
  styleUrl: './category-overview.component.css'
})
export class CategoryOverviewComponent {

  @ViewChild('learnMoreModal') learnMoreModal : ElementRef | undefined;
  @Input() categories : Category[] | undefined = [];

  constructor() {
  }

  openLearnMoreModal() {
    HSOverlay.open(this.learnMoreModal?.nativeElement);
  }
}
