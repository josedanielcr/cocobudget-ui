import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {FolderService} from '../../../../services/folders/folder.service';
import {CreateFolderComponent} from '../create-folder/create-folder.component';
import {HSAccordion, HSOverlay} from 'preline/preline';
import {Folder} from '../../../../models/Folder';
import {Result} from '../../../../shared/Result';
import {MessageService} from '../../../../services/utils/message.service';
import {ToastType} from '../../../../models/Enums/ToastType.enum';
import {FolderState} from './FolderState';
import {NgClass} from '@angular/common';
import {UpdateFolderRequest} from '../../../../models/contracts/folder/UpdateFolderRequest';
import {CategoryOverviewComponent} from '../../categories/category-overview/category-overview.component';
import {CreateCategoryComponent} from '../../categories/create-category/create-category.component';

@Component({
  selector: 'app-folders-overview',
  standalone: true,
  imports: [
    CreateFolderComponent,
    NgClass,
    CategoryOverviewComponent,
    CreateCategoryComponent
  ],
  templateUrl: './folders-overview.component.html',
  styleUrl: './folders-overview.component.css'
})
export class FoldersOverviewComponent implements AfterViewChecked{

  @ViewChild('accordion') accordion: ElementRef | undefined;
  @ViewChildren('updateInput') updateInputs: QueryList<ElementRef> | undefined;

  inputFolderStates : FolderState[] = [];
  private foldersEffect = effect(() => {
    const folders = this.foldersService.folders();
    if(folders) {
      this.inputFolderStates = folders.map((folder : Folder) => {
        return {
          id : folder.id,
          isDisabled : true,
          isOpened : false
        };
      });
    }
  });

  constructor(public foldersService : FolderService,
              private messageService : MessageService) {
    this.onFolderSignalChange();
  }

  //necessary to reinit PrelineUI components after some content of folders is changed to prevent things to not work properly
  ngAfterViewChecked(): void {
    window.HSStaticMethods.autoInit('overlay');
    window.HSStaticMethods.autoInit('accordion');
    window.HSStaticMethods.autoInit('select');
  }

  isInputDisabled(folderId : string) {
    const folderInputState = this.inputFolderStates.find((inputState : FolderState) => inputState.id === folderId);
    return folderInputState?.isDisabled;
  }

  expandAllFolders() {
    for(const child of this.accordion?.nativeElement.children) {
      HSAccordion.show(child);
      this.inputFolderStates.forEach((folderState : FolderState) => {
        folderState.isOpened = true;
      });
    }
  }

  collapseAllFolders() {
    for(const child of this.accordion?.nativeElement.children) {
      HSAccordion.hide(child);
      this.inputFolderStates.forEach((folderState : FolderState) => {
        folderState.isOpened = false;
      });
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

  isFolderOpened(id: string) {
    const folderState = this.inputFolderStates.find((folderState : FolderState) => folderState.id === id);
    return folderState?.isOpened;
  }

  toggleFolder(id: string) {
    const folderState = this.inputFolderStates.find((folderState : FolderState) => folderState.id === id);
    folderState?.isOpened ? folderState.isOpened = false : folderState!.isOpened = true;
  }

  disableFolder(id: string) {
    const folderInputState = this.inputFolderStates.find((inputState : FolderState) => inputState.id === id);
    folderInputState!.isDisabled = true;
  }

  enableFolder(id: string) {
    const folderInputState = this.inputFolderStates.find((inputState : FolderState) => inputState.id === id);
    folderInputState!.isDisabled = false;
  }

  updateFolder(folder: Folder) {
    this.disableFolder(folder.id);
    let input : ElementRef | undefined;
    this.updateInputs?.forEach((inputEl : ElementRef) => {
      if(inputEl.nativeElement.id === folder.id) input = inputEl;
    });
    const value = input?.nativeElement.value;
    if(!value || value === '') {
      this.messageService.showToastMessage('Folder name cannot be empty',ToastType.Error);
      this.enableFolder(folder.id);
      return;
    }
    this.executeUpdateAsync(folder, value);
  }

  private executeUpdateAsync(folder: Folder, value : string) {
    const updateFolderRequest : UpdateFolderRequest = new UpdateFolderRequest(folder.id, value);
    this.foldersService.updateFolder(updateFolderRequest).subscribe({
      next: (result : Result<Folder>) => {
        this.messageService.showToastMessage('Folder updated successfully',ToastType.Success);
        this.enableFolder(folder.id);
      },
      error : (result : Result<Folder>) => {
        this.messageService.showToastMessage(result.error.message,ToastType.Error);
        this.enableFolder(folder.id);
      }
    });
  }
}
