import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Folder} from '../../models/Folder';
import {HttpClient} from '@angular/common/http';
import {AccountService} from '../accounts/account.service';
import {CreateFolderRequest} from '../../models/contracts/account/CreateFolderRequest';
import {map, Observable} from 'rxjs';
import {Result} from '../../shared/Result';

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
}
