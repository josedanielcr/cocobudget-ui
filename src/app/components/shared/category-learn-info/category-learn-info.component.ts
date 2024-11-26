import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-category-learn-info',
  standalone: true,
  imports: [],
  templateUrl: './category-learn-info.component.html',
  styleUrl: './category-learn-info.component.css'
})
export class CategoryLearnInfoComponent {

  @Input() folderId : string | undefined;

}
