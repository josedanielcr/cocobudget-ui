import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {CreatePeriodRequest} from '../../models/contracts/period/CreatePeriodRequest';
import {map, Observable, Subscription} from 'rxjs';
import {Result} from '../../shared/Result';
import {Period} from '../../models/Period';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AccountService} from '../accounts/account.service';
import {
  CreateExpiredPeriodComponent
} from '../../components/core/create-expired-period/create-expired-period.component';
import {MessageService} from '../utils/message.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  private readonly _budgetServiceEndpoint = environment.budgetService;
  private readonly _periodServicePrefix = 'period';
  activePeriod : WritableSignal<Period | null> =  signal<Period | null>(null);
  createPeriodComponent : CreateExpiredPeriodComponent | undefined;
  private userPeriodsEffect = effect(() => {
    const user = this.accountService.user();
    if (user) {
      this.managePeriodOnStart(user.id);
      this.getActivePeriod().subscribe({
        error : (error : Result<Period>) => {
          this.activePeriod.update(() => null);
        }
      });
    }
  });

  constructor(private httpClient : HttpClient,
              private accountService : AccountService,
              private messageService : MessageService) { }

  setCreatePeriodComponent(createPeriodComponent : CreateExpiredPeriodComponent){
    this.createPeriodComponent = createPeriodComponent;
  }

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

  public validateIfPeriodActive(userId : string) : Observable<Result<Period>>{
    return this.httpClient.get(`${this._budgetServiceEndpoint}${this._periodServicePrefix}/validate/${userId}/active`)
      .pipe(
        map((response: any)=> {
          return response as Result<Period>;
        })
      );
  }

  private managePeriodOnStart(id: string) {
    this.validateIfPeriodActive(id).subscribe({
      error : (error : Result<Period>) => {
        this.createPeriodComponent?.open();
      }
    })
  }

  public clonePeriod(userId : string) {
    return this.httpClient.post(`${this._budgetServiceEndpoint}${this._periodServicePrefix}/clone/${userId}`, {})
      .pipe(
        map((response: any)=> {
          const period = response as Result<Period>;
          this.activePeriod.update(() => period.value);
          return period;
        })
      );
  }
}
