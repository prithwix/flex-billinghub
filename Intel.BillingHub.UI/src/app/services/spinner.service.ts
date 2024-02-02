import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor() { }

  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  showLoadingSpinner() {
    this.showSpinner.next(true);
  }

  hideLoadingSpinner() {
    this.showSpinner.next(false);
  }
}
