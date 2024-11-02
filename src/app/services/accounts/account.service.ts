import {Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../../models/User';
import {isUserRegisteredResponse} from '../../models/contracts/account/isUserRegisteredResponse';
import {Result} from '../../shared/Result';
import {CreateUserRequest} from '../../models/contracts/account/CreateUserRequest';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly _accountServiceEndpoint = environment.accountService;
  private readonly _accountServicePrefix = 'user';
  userEmail : WritableSignal<string> = signal('');
  user : WritableSignal<User | null> = signal(null);

  constructor(private httpClient : HttpClient ) { }

  public checkIfUserRegistered(email: string) : Observable<Result<isUserRegisteredResponse>>{
    this.userEmail.set(email);
    return this.httpClient.get(`${this._accountServiceEndpoint}${this._accountServicePrefix}/is-registered/${email}`)
      .pipe(
        map((response: any)=> response as Result<isUserRegisteredResponse>)
      );
  }

  public setupUser(createUserRequest : CreateUserRequest) : Observable<Result<User>>{
    return this.httpClient.post(`${this._accountServiceEndpoint}${this._accountServicePrefix}`, createUserRequest)
      .pipe(
        map((response: any)=> {
          const userResult : Result<User> = response as Result<User>;
          this.user.set(userResult.value);
          return userResult;
        })
      );
  }

  public getUser(email : string) : Observable<Result<User>>{
    return this.httpClient.get(`${this._accountServiceEndpoint}${this._accountServicePrefix}/${email}`)
      .pipe(
        map((response: any)=> response as Result<User>)
      );
  }
}
