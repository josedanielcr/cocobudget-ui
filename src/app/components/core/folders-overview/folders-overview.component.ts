import {AfterViewInit, Component, Renderer2} from '@angular/core';
import {FolderService} from '../../../services/folders/folder.service';
import {HSOverlay} from 'preline/preline';
import {CreateFolderComponent} from '../create-folder/create-folder.component';

declare const window: any; // To access the global Preline UI initialization function

@Component({
  selector: 'app-folders-overview',
  standalone: true,
  imports: [
    CreateFolderComponent
  ],
  templateUrl: './folders-overview.component.html',
  styleUrl: './folders-overview.component.css'
})
export class FoldersOverviewComponent implements AfterViewInit{

  constructor(public foldersService : FolderService, private renderer : Renderer2) {
  }

  ngAfterViewInit() {
    this.renderer.listen('window', 'load', () => {
      if (window.HSAccordion) {
        window.HSAccordion.autoInit();
      }
    });
  }
}
