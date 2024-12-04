import { Component, Input} from '@angular/core';
import {Category} from '../../../models/Category';
import {CreateCategoryComponent} from '../create-category/create-category.component';
import {CategoryLearnInfoComponent} from '../../shared/category-learn-info/category-learn-info.component';
import {CategoryDetailsComponent} from '../category-details/category-details.component';
import {CustomCurrencyPipePipe} from '../../../pipes/custom-currency-pipe.pipe';

@Component({
  selector: 'app-category-overview',
  standalone: true,
  imports: [
    CreateCategoryComponent,
    CategoryLearnInfoComponent,
    CategoryDetailsComponent,
    CustomCurrencyPipePipe
  ],
  templateUrl: './category-overview.component.html',
  styleUrl: './category-overview.component.css'
})
export class CategoryOverviewComponent {

  @Input() categories : Category[] | undefined = [];
  @Input() folderId : string | undefined;

  constructor() {
  }
}
