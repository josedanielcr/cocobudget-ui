import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {CurrencyFormatEnum} from '../models/Enums/CurrencyFormat.enum';

@Pipe({
  name: 'customCurrencyPipe',
  standalone: true
})
export class CustomCurrencyPipePipe implements PipeTransform {

  constructor(private currencyPipe : CurrencyPipe) {
  }

  transform(value : number | undefined | null, type : CurrencyFormatEnum = CurrencyFormatEnum.Standard): unknown {
    if(!value) return '0.00';
    return this.currencyPipe.transform(value, '', '', type) || '';
  }
}
