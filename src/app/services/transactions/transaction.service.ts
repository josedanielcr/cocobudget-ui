import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CreateTransactionRequest} from '../../models/contracts/transactions/CreateTransactionRequest';
import {map, Observable} from 'rxjs';
import {Result} from '../../shared/Result';
import {Transaction} from '../../models/Transaction';
import {BankAccountService} from '../bankAccounts/bank-account.service';
import {ReviewTransactionRequest} from '../../models/contracts/transactions/ReviewTransactionRequest';
import {TransactionTypeEnum} from '../../models/Enums/TransactionType.enum';
import {FolderService} from '../folders/folder.service';
import {TransactionInsight} from '../../models/TransactionInsight';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly _budgetServiceEndpoint = environment.budgetService;
  private readonly _periodServicePrefix = 'transaction';

  public transactions : WritableSignal<Transaction[] | null> = signal<Transaction[] | null>(null);
  private transactionsEffect = effect(() => {
    this.updateTransactionsSignal();
  });

  constructor(private httpClient : HttpClient,
              private bankAccountService : BankAccountService,
              private folderService : FolderService) { }

  public createTransaction(createTransactionRequest : CreateTransactionRequest): Observable<Result<Transaction>>{
    return this.httpClient.post(`${this._budgetServiceEndpoint}${this._periodServicePrefix}`, createTransactionRequest)
      .pipe(
        map((response: any)=> {
          const transaction = response as Result<Transaction>;
          this.bankAccountService.updateBankAccountBalance(transaction.value?.amount as number,
            transaction.value?.type as TransactionTypeEnum,
            transaction.value?.linkedAccountId as string);
          const transactions = this.transactions() || [];
          transactions.push(transaction.value as Transaction);
          this.transactions.update(() => transactions);
          this.folderService.loadUserFolders();
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

  private updateTransactionsSignal() {
    const bankAccounts = this.bankAccountService.accounts();
    if (bankAccounts) {
      bankAccounts.forEach(bankAccount => {
        this.getBankAccountTransactions(bankAccount.id as string).subscribe({
          next : (result : Result<Transaction[]>) => {
            const transactions = this.transactions() || [];
            transactions?.push(...result.value as Transaction[]);
            this.transactions.update(() => transactions);
          },
          error : (error : Result<Transaction[]>) => {}
        });
      });
    }
  }

  public getRecommendedTransactionExchangeRate(transactionId : string): Observable<Result<number>>{
    return this.httpClient.get(`${this._budgetServiceEndpoint}${this._periodServicePrefix}/exchange-rate/${transactionId}`)
      .pipe(
        map((response: any)=> {
          return response as Result<number>;
        })
      );
  }

  public reviewCategoryOfTransaction(reviewTransactionRequest : ReviewTransactionRequest): Observable<Result<Transaction>>{
    return this.httpClient.post(`${this._budgetServiceEndpoint}${this._periodServicePrefix}/review`, reviewTransactionRequest)
      .pipe(
        map((response: any)=> {
          const transaction = response as Result<Transaction>;
          const transactions = this.transactions() || [];
          const index = transactions.findIndex(t => t.id === transaction.value!.id);
          transactions[index] = transaction.value as Transaction;
          this.transactions.update(() => transactions);
          this.folderService.loadUserFolders();
          return response as Result<Transaction>;
        })
      );
  }

  public getCategoryTransaction(categoryId : string): Observable<Result<Transaction[]>>{
    return this.httpClient.get(`${this._budgetServiceEndpoint}${this._periodServicePrefix}/category/${categoryId}`)
      .pipe(
        map((response: any)=> {
          return response as Result<Transaction[]>;
        })
      );
  }

  public deleteTransaction(transaction : Transaction): Observable<Result<boolean>>{
    return this.httpClient.delete(`${this._budgetServiceEndpoint}${this._periodServicePrefix}/${transaction.id}`)
      .pipe(
        map((response: any)=> {
          const transactions = this.transactions() || [];
          const index = transactions.findIndex(t => t.id === transaction.id);
          transactions.splice(index, 1);
          this.transactions.update(() => transactions);
          this.bankAccountService.updateBankAccountBalance(transaction.amount as number, transaction.type as TransactionTypeEnum,
            transaction.linkedAccountId as string, true);
          this.folderService.loadUserFolders();
          return response as Result<boolean>;
        })
      );
  }

  public getInsights(bankAccountId : string): Observable<Result<TransactionInsight[]>>{
    return this.httpClient.get(`${this._budgetServiceEndpoint}${this._periodServicePrefix}/insights/${bankAccountId}`)
      .pipe(
        map((response: any)=> {
          return response as Result<TransactionInsight[]>;
        })
      );
  }
}
