import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {CreatePeriodRequest} from '../../models/contracts/period/CreatePeriodRequest';
import {map, Observable} from 'rxjs';
import {Result} from '../../shared/Result';
import {Period} from '../../models/Period';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AccountService} from '../accounts/account.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  private readonly _budgetServiceEndpoint = environment.budgetService;
  private readonly _periodServicePrefix = 'period';
  activePeriod : WritableSignal<Period | null> =  signal<Period | null>(null);
  private userPeriodsEffect = effect(() => {
    const user = this.accountService.user();
    if (user) {
      this.getActivePeriod().subscribe({
        error : (error : Result<Period>) => {
          this.activePeriod.update(() => null);
        }
      });
    }
  });

  constructor(private httpClient : HttpClient,
              private accountService : AccountService) { }

  public createPeriod(createPeriodRequest : CreatePeriodRequest) : Observable<Result<Period>>{
    return this.httpClient.post(`${this._budgetServiceEndpoint}${this._periodServicePrefix}`, createPeriodRequest)
      .pipe(
        map((response: any)=> {
          return response as Result<Period>;
        })
      );
  }

  public getActivePeriod() : Observable<Result<Period>>{
    return this.httpClient.get(`${this._budgetServiceEndpoint}${this._periodServicePrefix}/active/${this.accountService.user()?.id}`)
      .pipe(
        map((response: any)=> {
          const period = response as Result<Period>;
          this.activePeriod.update(() => period.value);
          return period;
        })
      );
  }
}
