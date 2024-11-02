import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {MsalGuard} from '@azure/msal-angular';
import {AppComponent} from './app.component';
import {LoginFailedComponent} from './login-failed/login-failed.component';
import {BudgetComponent} from './pages/budget/budget.component';
import {SetupComponent} from './pages/setup/setup.component';
import {AccountsComponent} from './pages/accounts/accounts.component';
import {TransactionsComponent} from './pages/transactions/transactions.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [MsalGuard],
    children: [
      {
        path : '',
        redirectTo: 'budget',
        pathMatch: 'full'
      },
      {
        path : 'budget',
        component: BudgetComponent
      },
      {
        path : 'setup',
        component: SetupComponent
      },
      {
        path : 'accounts',
        component: AccountsComponent
      },
      {
        path : 'transactions',
        component: TransactionsComponent
      }
    ]
  },
  {
    path: 'start',
    component: AppComponent
  },
  {
    path: 'login-failed',
    component: LoginFailedComponent
  }
];
