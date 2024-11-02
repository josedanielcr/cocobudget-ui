import { Injectable } from '@angular/core';
import {CreatePeriodRequest} from '../../models/contracts/period/CreatePeriodRequest';
import {map, Observable} from 'rxjs';
import {Result} from '../../shared/Result';
import {Period} from '../../models/Period';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  private readonly _budgetServiceEndpoint = environment.budgetService;
  private readonly _periodServicePrefix = 'period';

  constructor(private httpClient : HttpClient,) { }

  public createPeriod(createPeriodRequest : CreatePeriodRequest) : Observable<Result<Period>>{
    return this.httpClient.post(`${this._budgetServiceEndpoint}${this._periodServicePrefix}`, createPeriodRequest)
      .pipe(
        map((response: any)=> {
          return response as Result<Period>;
        })
      );
  }
}
