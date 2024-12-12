import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Folder} from '../../models/Folder';
import {HttpClient} from '@angular/common/http';
import {AccountService} from '../accounts/account.service';
import {CreateFolderRequest} from '../../models/contracts/folder/CreateFolderRequest';
import {map, Observable} from 'rxjs';
import {Result} from '../../shared/Result';
import {UpdateFolderRequest} from '../../models/contracts/folder/UpdateFolderRequest';
import {Category} from '../../models/Category';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private readonly _budgetServiceEndpoint = environment.budgetService;
  private readonly _folderServicePrefix = 'folder';

  folders : WritableSignal<Folder[] | null> =  signal<Folder[] | null>(null);
  private userFoldersEffect = effect(() => {
    const user = this.accountService.user();
    if (user) {
      this.getUserFolders(user.id).subscribe({
        error : (error : Result<Folder[]>) => {
          this.folders.update(() => []);
        }
      });
    }
  });

  constructor(private httpClient : HttpClient,
              private accountService : AccountService) { }

  public updateFolderCategories(category : Category){
    const folder = this.folders()?.find(folder => folder.id === category.folderId);
    if(!folder) return;
    folder.categories = folder.categories ? [...folder.categories, category] : [category];

  }

  public createFolder(createFolderRequest : CreateFolderRequest) : Observable<Result<Folder>>{
    return this.httpClient.post(`${this._budgetServiceEndpoint}${this._folderServicePrefix}`, createFolderRequest)
      .pipe(
        map((response: any)=> {
          const folderResult = response as Result<Folder>;
          this.folders.update((currentFolders) =>
            folderResult.value
              ? [...(currentFolders ?? []), folderResult.value]
              : currentFolders
          );
          return folderResult;
        })
      );
  }

  public getUserFolders(userId : string) : Observable<Result<Folder[]>>{
    return this.httpClient.get(`${this._budgetServiceEndpoint}${this._folderServicePrefix}/${userId}`)
      .pipe(
        map((response: any)=> {
          const folders = response as Result<Folder[]>;
          this.folders.update(value => folders.value);
          return folders;
        })
      );
  }

  public deleteFolder(folderId : string) : Observable<Result<Folder>>{
    return this.httpClient.delete(`${this._budgetServiceEndpoint}${this._folderServicePrefix}/${folderId}`)
      .pipe(
        map((response: any)=> {
          const folderResult = response as Result<Folder>;
          this.folders.update((currentFolders) =>
            folderResult.value
              ? (currentFolders ?? []).filter(folder => folder.id !== folderId)
              : currentFolders
          );
          return folderResult;
        })
      );
  }

  public updateFolder(updateFolderReq : UpdateFolderRequest) : Observable<Result<Folder>>{
    return this.httpClient.patch(`${this._budgetServiceEndpoint}${this._folderServicePrefix}/${updateFolderReq.id}`, updateFolderReq)
      .pipe(
        map((response: any)=> {
          const folderResult = response as Result<Folder>;
          this.folders.update((currentFolders) =>
            folderResult.value
              ? (currentFolders ?? []).map(folder => folder.id === folderResult.value?.id ? folderResult.value : folder)
              : currentFolders
          );
          return folderResult;
        })
      );
  }
}
