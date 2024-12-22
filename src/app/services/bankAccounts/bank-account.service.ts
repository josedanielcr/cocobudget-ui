import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Result} from '../../shared/Result';
import {BankAccount} from '../../models/BankAccount';
import {AccountService} from '../accounts/account.service';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  private readonly _budgetServiceEndpoint = environment.budgetService;
  private readonly _folderServicePrefix = 'accounts';
  public accounts : WritableSignal<BankAccount[] | null> = signal<BankAccount[] | null>(null);

  private userAccountsEffect = effect(() => {
    const user = this.accountService.user();
    if (user) {
      this.getUserBankAccounts(user.id).subscribe({
        error : (error : Result<BankAccount[]>) => {
          this.accounts.update(() => []);
        }
      });
    }
  });

  constructor(private httpClient : HttpClient,
              private accountService : AccountService) { }

  getUserBankAccounts(userId: string) : Observable<Result<BankAccount[]>> {
    return this.httpClient.get(`${this._budgetServiceEndpoint}${this._folderServicePrefix}/${userId}`)
      .pipe(
        map((response: any) => {
          const bankAccounts = response as Result<BankAccount[]>;
          this.accounts.update(() => bankAccounts.value);
          return bankAccounts;
        }
      ));
  }

  createBankAccount(createBankAccountRequest: any) : Observable<Result<BankAccount>> {
    return this.httpClient.post(`${this._budgetServiceEndpoint}${this._folderServicePrefix}/bank`, createBankAccountRequest)
      .pipe(
        map((response: any) => {
          const bankAccount = response as Result<BankAccount>;
          this.accounts.update((accounts) => {
            if(!accounts){
              accounts = [];
            }
            accounts.push(bankAccount.value!);
            return accounts;
          });
          return bankAccount;
        })
      );
  }

  updateBankAccount(updateBankAccountRequest: any, id : string) : Observable<Result<BankAccount>> {
    return this.httpClient.put(`${this._budgetServiceEndpoint}${this._folderServicePrefix}/bank/${id}`, updateBankAccountRequest)
      .pipe(
        map((response: any) => {
          const bankAccount = response as Result<BankAccount>;
          this.accounts.update((accounts) => {
            if(!accounts){
              accounts = [];
            }
            const index = accounts.findIndex((account) => account.id === bankAccount.value?.id);
            accounts[index] = bankAccount.value!;
            return accounts;
          });
          return bankAccount;
        })
      );
  }
}
