import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FolderService} from '../../services/folders/folder.service';
import {CreateFolderComponent} from '../../components/core/folders/create-folder/create-folder.component';
import {PeriodBarComponent} from '../../components/shared/period-bar/period-bar.component';
import {FoldersOverviewComponent} from '../../components/core/folders/folders-overview/folders-overview.component';
import {
  CreateExpiredPeriodComponent
} from '../../components/core/periods/create-expired-period/create-expired-period.component';
import {PeriodService} from '../../services/periods/period.service';
import {Folder} from '../../models/Folder';

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

  areFoldersAvailable() : boolean {
    if(this.folderService.folders()?.length === 0) return false;
    else {
      if(!this.folderService.folders()) return false;
      const activeFolders = this.folderService.folders()!.filter((folder : Folder) => {
        return folder.isActive;
      });
        return activeFolders.length > 0;
    }
  }
}
