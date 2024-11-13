import {Component, effect, ElementRef, ViewChild} from '@angular/core';
import {FolderService} from '../../../services/folders/folder.service';
import {CreateFolderComponent} from '../create-folder/create-folder.component';
import {HSAccordion} from 'preline/preline';

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

  constructor(public foldersService : FolderService) {
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
}
