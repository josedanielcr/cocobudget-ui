import {Component} from '@angular/core';
import {FolderService} from '../../services/folders/folder.service';
import {CreateFolderComponent} from '../../components/core/create-folder/create-folder.component';
import {PeriodBarComponent} from '../../components/shared/period-bar/period-bar.component';
import {FoldersOverviewComponent} from '../../components/core/folders-overview/folders-overview.component';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    CreateFolderComponent,
    PeriodBarComponent,
    FoldersOverviewComponent
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent {
  constructor(public folderService : FolderService) {
  }
}
