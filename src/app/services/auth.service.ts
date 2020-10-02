import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  getTokenFromLocalStorage() {
    return localStorage.getItem('token')
  }

  setTokenInLocalStorage(value) {
    localStorage.setItem('token', value);
  }

}