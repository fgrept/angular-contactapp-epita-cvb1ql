import { Component, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  isLoading$:Observable<boolean>;
  constructor(
    private authService:AuthService, 
    public loaderService: LoaderService, 
    private router:Router) { }

  ngOnInit() {
    this.isLoading$ = this.loaderService.isLoading$;
  }

  setToken(ev) {
    ev.preventDefault();
    this.authService.setTokenInLocalStorage('f0cb8a50aa5a42eaf3c68511c73742534dcf51dec7e3c71f8aef0a7541a39d8c');
    this.router.navigate(['login']);
  }

  logout(ev) {
    ev.preventDefault();
    localStorage.clear()
  }
}
