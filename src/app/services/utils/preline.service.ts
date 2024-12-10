import { Injectable } from '@angular/core';
import {HSOverlay} from 'preline/preline';

@Injectable({
  providedIn: 'root'
})
export class PrelineService {

  constructor() { }

  public reinitializePrelineOverlay() {
    HSOverlay.autoInit();
  }
}
