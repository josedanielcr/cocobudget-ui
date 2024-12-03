import {Component, effect, Input} from '@angular/core';
import {Category} from '../../../models/Category';
import {FolderService} from '../../../services/folders/folder.service';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent {

  @Input() category : Category | undefined;
  public folderName : string = '';
  private foldersEffect = effect(() => {
    const folders = this.folderService.folders();
    if(folders) {
      const folder = folders.find(folder => folder.id === this.category?.folderId);
      this.folderName = folder ? folder.name : '';
    }
  });

  constructor(private folderService : FolderService) {}
}
