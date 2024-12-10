import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CreateCategoryRequest} from '../../models/contracts/categories/CreateCategoryRequest';
import {map, Observable} from 'rxjs';
import {Result} from '../../shared/Result';
import {Category} from '../../models/Category';
import {FolderService} from '../folders/folder.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly _budgetServiceEndpoint = environment.budgetService;
  private readonly _folderServicePrefix = 'category';

  constructor(private httpClient : HttpClient,
              private folderService : FolderService) { }


  public createCategory(createCategoryRequest : CreateCategoryRequest) : Observable<Result<Category>> {
    return this.httpClient.post(`${this._budgetServiceEndpoint}${this._folderServicePrefix}`, createCategoryRequest)
      .pipe(
        map((response: any) => {
          const category = (response as Result<Category>).value;
          if (category) {
            const folders = this.folderService.folders();
            folders?.forEach(folder => {
              if (folder.id === category.folderId) {
                folder.categories = folder.categories ? [...folder.categories, category] : [category];
              }
            });
            this.folderService.folders.update(value => folders);
          }
          return response as Result<Category>;
        })
      );
  }

  public deleteCategory(categoryId : string) : Observable<Result<Category>> {
    return this.httpClient.delete(`${this._budgetServiceEndpoint}${this._folderServicePrefix}/${categoryId}`)
      .pipe(
        map((response: any) => {
          const category = (response as Result<Category>).value;
          if (category) {
            const folders = this.folderService.folders();
            folders?.forEach(folder => {
              if (folder.id === category.folderId) {
                folder.categories = folder.categories?.filter(c => c.id !== category.id);
              }
            });
            this.folderService.folders.update(value => folders);
          }
          return response as Result<Category>;
        })
      );
  }
}
