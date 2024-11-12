import {Component} from '@angular/core';
import {FolderService} from '../../services/folders/folder.service';
import {CreateFolderComponent} from '../../components/budget/create-folder/create-folder.component';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    CreateFolderComponent
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent {
  constructor(public folderService : FolderService) {
  }
}
