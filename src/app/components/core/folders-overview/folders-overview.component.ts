import {Component, effect, ElementRef, ViewChild} from '@angular/core';
import {FolderService} from '../../../services/folders/folder.service';
import {CreateFolderComponent} from '../create-folder/create-folder.component';
import {HSAccordion} from 'preline/preline';
import {Folder} from '../../../models/Folder';
import {Result} from '../../../shared/Result';
import {MessageService} from '../../../services/utils/message.service';
import {ToastType} from '../../../models/Enums/ToastType.enum';

@Component({
  selector: 'app-folders-overview',
  standalone: true,
  imports: [
    CreateFolderComponent
  ],
  templateUrl: './folders-overview.component.html',
  styleUrl: './folders-overview.component.css'
})
export class FoldersOverviewComponent {

  @ViewChild('accordion') accordion: ElementRef | undefined;

  constructor(public foldersService : FolderService,
              private messageService : MessageService) {
    this.onFolderSignalChange();
  }

  expandAllFolders() {
    for(const child of this.accordion?.nativeElement.children) {
      HSAccordion.show(child);
    }
  }

  collapseAllFolders() {
    for(const child of this.accordion?.nativeElement.children) {
      HSAccordion.hide(child);
    }
  }

  onFolderSignalChange() {
    effect(() => {
      const folders = this.foldersService.folders();
      setTimeout(() => {
        window.HSStaticMethods.autoInit();
      }, 500);
    });
  }

  updateFolder(folder: Folder) {

  }

  deleteFolder(folder: Folder) {
    this.foldersService.deleteFolder(folder.id).subscribe({
      next: (result : Result<Folder>) => {
        this.messageService.showToastMessage('Folder deleted successfully',ToastType.Success);
      },
      error : (result : Result<Folder>) => {
        this.messageService.showToastMessage(result.error.message,ToastType.Error);
      }
    });
  }
}
