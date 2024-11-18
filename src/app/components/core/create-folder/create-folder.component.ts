import {AfterViewInit, Component, ElementRef, signal, ViewChild, WritableSignal} from '@angular/core';
import {NgClass} from '@angular/common';
import {HSOverlay} from 'preline/preline';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';
import {MessageService} from '../../../services/utils/message.service';
import {FolderService} from '../../../services/folders/folder.service';
import {ToastType} from '../../../models/Enums/ToastType.enum';
import {CreateFolderRequest} from '../../../models/contracts/folder/CreateFolderRequest';
import {AccountService} from '../../../services/accounts/account.service';

@Component({
  selector: 'app-create-folder',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './create-folder.component.html',
  styleUrl: './create-folder.component.css'
})
export class CreateFolderComponent implements AfterViewInit {

  @ViewChild('modal') modalElementRef! : ElementRef;

  //form controls
  readonly folderName: FormControl<string | null> = new FormControl('', [Validators.required]);
  folderNameErrorMessage: WritableSignal<string> = signal('');


  constructor(private messageService : MessageService,
              private folderService : FolderService,
              private accountService : AccountService) {
    this.setFormControls();
  }

  ngAfterViewInit(): void {
    HSOverlay.autoInit();
  }

  private setFormControls() {
    merge(
      this.folderName.statusChanges,
      this.folderName.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateErrorMessages();
      });
  }

  private updateErrorMessages() {
    this.folderNameErrorMessage.set(this.folderName.hasError('required') ? 'Folder name is required' : '');
  }

  createFolder() {
    if (this.folderName.invalid) {
      this.messageService.showToastMessage('Please fill in all required fields', ToastType.Error);
    }
    const folderRequest : CreateFolderRequest = new CreateFolderRequest(this.folderName.value as string, this.accountService.user()!.id as string);

    this.executeFolderCreation(folderRequest);

  }

  private executeFolderCreation(folderRequest: CreateFolderRequest) {
    this.folderService.createFolder(folderRequest).subscribe({
      next: (result) => {
        this.messageService.showToastMessage('Folder created successfully', ToastType.Success);
        this.folderName.reset();
        this.close();
      },
      error: (error) => {
        this.messageService.showToastMessage('Failed to create folder', ToastType.Error);
      }
    });
  }

  close() {
    HSOverlay.close(this.modalElementRef.nativeElement);
  }
}
