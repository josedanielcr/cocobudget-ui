import {Component, Input, input} from '@angular/core';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {

  @Input() folderId : string | undefined;

  constructor() { }
}
