import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {

  private _isLoadingSubject:BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly isLoading$ = this._isLoadingSubject.asObservable();
  constructor() { }

  showLoader() {
    this._isLoadingSubject.next(true)
  }

  hideLoader() {
    this._isLoadingSubject.next(false);
  }


}