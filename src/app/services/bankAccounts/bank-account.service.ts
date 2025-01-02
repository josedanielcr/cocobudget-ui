import {effect, Injectable, Injector, signal, WritableSignal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Result} from '../../shared/Result';
import {BankAccount} from '../../models/BankAccount';
import {AccountService} from '../accounts/account.service';
import {TransactionTypeEnum} from '../../models/Enums/TransactionType.enum';
import {TransactionInsight} from '../../models/TransactionInsight';
import {TransactionService} from '../transactions/transaction.service';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  private readonly _budgetServiceEndpoint = environment.budgetService;
  private readonly _folderServicePrefix = 'accounts';
  public accounts : WritableSignal<BankAccount[] | null> = signal<BankAccount[] | null>(null);
  private transactionService: TransactionService | undefined;

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
              private accountService : AccountService,
              private injector : Injector) { }

  getUserBankAccounts(userId: string) : Observable<Result<BankAccount[]>> {
    return this.httpClient.get(`${this._budgetServiceEndpoint}${this._folderServicePrefix}/${userId}`)
      .pipe(
        map((response: any) => {
          const bankAccounts = response as Result<BankAccount[]>;
          this.accounts.update(() => bankAccounts.value);
          this.updateBankAccountInsights();
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

  delete(id : string) : Observable<Result<BankAccount>> {
    return this.httpClient.delete(`${this._budgetServiceEndpoint}${this._folderServicePrefix}/bank/${id}`)
      .pipe(
        map((response: any) => {
          const bankAccount = response as Result<BankAccount>;
          this.accounts.update((accounts) => {
            if(!accounts){
              accounts = [];
            }
            const index = accounts.findIndex((account) => account.id === bankAccount.value?.id);
            accounts.splice(index, 1);
            return accounts;
          });
          return bankAccount;
        })
      );
  }

  updateBankAccountBalance(amount : number, transactionType : TransactionTypeEnum, bankAccountId : string, isDelete : boolean = false) {
    const bankAccount = this.accounts()?.find((account) => account.id === bankAccountId);
    if (!bankAccount) return;

    if (!isDelete && (transactionType === TransactionTypeEnum.Expense || transactionType === TransactionTypeEnum.NotTrackable)) {
      bankAccount.currentBalance! -= amount;
    } else if (!isDelete && transactionType === TransactionTypeEnum.Income) {
      bankAccount.currentBalance! += amount;
    }

    if(isDelete && (transactionType === TransactionTypeEnum.Expense || transactionType === TransactionTypeEnum.NotTrackable)){
      bankAccount.currentBalance! += amount;
    } else if (isDelete && transactionType === TransactionTypeEnum.Income){
      bankAccount.currentBalance! -= amount;
    }

    this.accounts.update((accounts) => {
      if (!accounts) return [];
      const index = accounts.findIndex((account) => account.id === bankAccountId);
      if (index !== -1) {
        accounts[index] = bankAccount;
      }
      return accounts;
    });
  }

  private updateBankAccountInsights() {
    this.transactionService = this.injector.get(TransactionService);
    if(!this.transactionService) return;
    this.accounts()?.forEach((bankAccount : BankAccount) => {
      // @ts-ignore
      this.transactionService.getInsights(bankAccount.id as string).subscribe({
        next : (insights : Result<TransactionInsight[]>) => {
          bankAccount.insights = insights.value;
          this.accounts.update((accounts) => {
            if (!accounts) return [];
            const index = accounts.findIndex((account) => account.id === bankAccount.id);
            if (index !== -1) {
              accounts[index] = bankAccount;
            }
            return accounts;
          });
        }
      })
    });
  }
}
