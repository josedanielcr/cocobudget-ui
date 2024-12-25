import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CreateTransactionRequest} from '../../models/contracts/transactions/CreateTransactionRequest';
import {map, Observable} from 'rxjs';
import {Result} from '../../shared/Result';
import {Transaction} from '../../models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly _budgetServiceEndpoint = environment.budgetService;
  private readonly _periodServicePrefix = 'transaction';

  constructor(private httpClient : HttpClient) { }

  public createTransaction(createTransactionRequest : CreateTransactionRequest): Observable<Result<Transaction>>{
    return this.httpClient.post(`${this._budgetServiceEndpoint}${this._periodServicePrefix}`, createTransactionRequest)
      .pipe(
        map((response: any)=> {
          return response as Result<Transaction>;
        })
      );
  }
}
