import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Result} from '../../shared/Result';
import {map, Observable} from 'rxjs';
import {Currency} from '../../models/utils/Currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private readonly _budgetServiceEndpoint = environment.budgetService;
  private readonly _currencyServicePrefix = 'currency';
  currencies : WritableSignal<Currency | null> =  signal<Currency | null>(null);
  private currencyEffect = effect(() => {
    this.getCurrency().subscribe({
      next : (result : Result<Currency>) => {
        if (result.value) {
          this.currencies.update(() => result.value);
        }
      }
    });
  });

  constructor(private httpClient : HttpClient) { }

  public getCurrency() : Observable<Result<Currency>>{
    return this.httpClient.get(`${this._budgetServiceEndpoint}${this._currencyServicePrefix}/codes`)
      .pipe(
        map((response: any)=> {
          return response as Result<Currency>;
        })
      );
  }
}
