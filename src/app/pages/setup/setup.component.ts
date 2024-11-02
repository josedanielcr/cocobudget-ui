import { Component } from '@angular/core';
import {AccountService} from '../../services/accounts/account.service';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css'
})
export class SetupComponent {

  constructor(public accountService : AccountService) {
  }
}
