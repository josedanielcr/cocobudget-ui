import { Component } from '@angular/core';
import {CustomCurrencyPipePipe} from '../../../../pipes/custom-currency-pipe.pipe';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-bank-account',
  standalone: true,
  imports: [
    CustomCurrencyPipePipe,
    FormsModule
  ],
  templateUrl: './create-bank-account.component.html',
  styleUrl: './create-bank-account.component.css'
})
export class CreateBankAccountComponent {

}
