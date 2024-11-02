import {Component, Inject} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';

import { IStaticMethods } from 'preline/preline';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from '@azure/msal-angular';
import {AuthenticationResult, EventMessage, EventType, InteractionStatus, PopupRequest} from '@azure/msal-browser';
import {filter, Subject, takeUntil} from 'rxjs';
import {AccountService} from './services/accounts/account.service';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'cocobudget-ui';
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(private router : Router,
              @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
              private authService: MsalService,
              private msalBroadcastService: MsalBroadcastService,
              private accountService : AccountService) {
  }

  ngOnInit() {
    this.setupMsal();
    this.setupPreline();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  private setupMsal() {
    this.authService.handleRedirectObservable().subscribe();
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
    this.setLoginDisplay();
    this.authService.instance.enableAccountStorageEvents();
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        )
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          this.setLoginDisplay();
        }
      });
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  private setupPreline() {
    // @ts-ignore
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount() {
    let activeAccount = this.authService.instance.getActiveAccount();
    if(activeAccount){
      this.checkIfUserIsRegistered(activeAccount.username);
    }
    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest) {
      this.authService
        .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
          this.checkIfUserIsRegistered(response.account.username);
        });
    } else {
      this.authService
        .loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
          this.checkIfUserIsRegistered(response.account.username);
        });
    }
  }

  checkIfUserIsRegistered(email : string){
    this.accountService.checkIfUserRegistered(email).subscribe((response) => {
      if(response.value?.isRegistered){
        this.getUserDataAndRedirect(email);
        this.router.navigate(['/home']).then();
      } else {
        this.router.navigate(['/home/setup']).then();
      }
    });
  }

  private getUserDataAndRedirect(email: string) {
    this.accountService.getUser(email).subscribe((response) => {
      if(response.value){
        this.accountService.user.set(response.value);
        this.router.navigate(['/home']).then();
      }
    });
  }



}
