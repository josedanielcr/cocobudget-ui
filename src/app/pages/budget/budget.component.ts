import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FolderService} from '../../services/folders/folder.service';
import {CreateFolderComponent} from '../../components/core/create-folder/create-folder.component';
import {PeriodBarComponent} from '../../components/shared/period-bar/period-bar.component';
import {FoldersOverviewComponent} from '../../components/core/folders-overview/folders-overview.component';
import {
  CreateExpiredPeriodComponent
} from '../../components/core/create-expired-period/create-expired-period.component';
import {PeriodService} from '../../services/periods/period.service';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    CreateFolderComponent,
    PeriodBarComponent,
    FoldersOverviewComponent,
    CreateExpiredPeriodComponent
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent implements AfterViewInit{

  @ViewChild(CreateExpiredPeriodComponent) createExpiredPeriodComponent: CreateExpiredPeriodComponent | undefined;

  constructor(public folderService : FolderService,
              public periodService : PeriodService) {
  }

  ngAfterViewInit(): void {
    this.periodService.setCreatePeriodComponent(this.createExpiredPeriodComponent as CreateExpiredPeriodComponent);
  }
}
