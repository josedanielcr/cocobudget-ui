import { Injectable } from '@angular/core';
import {EnumArray} from '../../models/utils/EnumArray';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {

  constructor() { }

  public createEnumArray(enumType: object): EnumArray[] {
    return Object.keys(enumType)
      .filter(key => isNaN(Number(key)))
      .map(key => ({ value: enumType[key as keyof typeof enumType], name: key }));
  }

  public getEnumToString(enumType: object, value: any): string {
    return Object.keys(enumType)
      .filter(key => isNaN(Number(key)))
      .find(key => enumType[key as keyof typeof enumType] === value) as string;
  }
}
