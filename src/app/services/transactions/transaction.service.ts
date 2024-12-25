import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CreateTransactionRequest} from '../../models/contracts/transactions/CreateTransactionRequest';
import {map, Observable} from 'rxjs';
import {Result} from '../../shared/Result';
import {Transaction} from '../../models/Transaction';
import {BankAccountService} from '../bankAccounts/bank-account.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly _budgetServiceEndpoint = environment.budgetService;
  private readonly _periodServicePrefix = 'transaction';

  public transactions : WritableSignal<Transaction[] | null> = signal<Transaction[] | null>(null);
  private transactionsEffect = effect(() => {
    const bankAccounts = this.bankAccountService.accounts();
    if (bankAccounts) {
      bankAccounts.forEach(bankAccount => {
        this.getBankAccountTransactions(bankAccount.id as string).subscribe({
          next : (result : Result<Transaction[]>) => {
            const transactions = this.transactions() || [];
            transactions?.push(...result.value as Transaction[]);
            this.transactions.update(() => transactions);
            console.log(this.transactions());
          },
          error : (error : Result<Transaction[]>) => {}
        });
      });
    }
  });

  constructor(private httpClient : HttpClient,
              private bankAccountService : BankAccountService) { }

  public createTransaction(createTransactionRequest : CreateTransactionRequest): Observable<Result<Transaction>>{
    return this.httpClient.post(`${this._budgetServiceEndpoint}${this._periodServicePrefix}`, createTransactionRequest)
      .pipe(
        map((response: any)=> {
          return response as Result<Transaction>;
        })
      );
  }

  public getBankAccountTransactions(bankAccountId : string) : Observable<Result<Transaction[]>>{
    return this.httpClient.get(`${this._budgetServiceEndpoint}${this._periodServicePrefix}/bank/${bankAccountId}`)
      .pipe(
        map((response: any)=> {
          return response as Result<Transaction[]>;
        })
      );
  }
}
