import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AccountService} from '../../../services/accounts/account.service';
import {NullProfileImagePipe} from '../../../pipes/null-profile-image.pipe';
import {MenuOption} from '../../../models/utils/menuOption';
import {NgClass} from '@angular/common';
import {MsalService} from '@azure/msal-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterOutlet,
    NullProfileImagePipe,
    NgClass
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public currRoute : string | undefined;

  menuOptions : MenuOption[] = [
    {name: 'Budget', route: '/home/budget'},
    {name: 'Accounts', route: '/home/accounts'},
    {name: 'Profile', route: '/home/profile'},
  ];

  constructor(public accountService : AccountService,
              private router : Router,
              private authService : MsalService) {
  }

  protected readonly AccountService = AccountService;

  getCurrentLocation() {
    const routeParts : string[] = window.location.pathname.split('/');
    const currRoute : string = routeParts[routeParts.length - 1];
    this.currRoute = currRoute.charAt(0).toUpperCase() + currRoute.slice(1);
    return this.currRoute;
  }

  goToPage(number: number) {
    this.router.navigate([this.menuOptions[number].route]).then();
  }

  getRouteNameByNumber(number: number) {
    return this.menuOptions[number].name;
  }

  signOut() {
    this.authService.logout()
  }
}
