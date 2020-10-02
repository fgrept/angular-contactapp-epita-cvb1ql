import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from '../models/user.interface';
import { AuthService } from './auth.service';
import { LoaderService } from './loader.service';

@Injectable()
export class UserService {

  constructor(
    private http:HttpClient, 
    private authService:AuthService,
    private loaderService:LoaderService
    ) { }

  // LA DONNEE UNIQUE QUI PEUT ÊTRE DISTRIBUÉE à TOUS LES COMPONENTS
  private _usersSubject:BehaviorSubject<User[]> = new BehaviorSubject([]);
  private _usersMetaSubject:BehaviorSubject<any> = new BehaviorSubject({})

  private _favsSubject:BehaviorSubject<User[]> = new BehaviorSubject([]);

  // users$ est un Observable qui peut être consommé par nos components
  readonly users$:Observable<User[]> = this._usersSubject.asObservable()
  readonly meta$:Observable<any> = this._usersMetaSubject.asObservable()
  // favs$ est un Observable qui peut être consommé par nos components;
  public favs$:Observable<User[]> = this._favsSubject.asObservable();

  loadUsers() {
    // 1 faire la requete API
    return this.http.get('https://gorest.co.in/public-api/users').pipe(
      map((response:any) => response.data)
    ).toPromise()
     .then( data => this._usersSubject.next(data) ) 
  }

  loadUsersWithMeta() {
    return this.http.get('https://gorest.co.in/public-api/users').toPromise()
    .then((response:any) => {
      this._usersSubject.next(response.data);
      this._usersMetaSubject.next(response.meta);
    })
  }

  loadUsersWithMetaPagination(pageNumber:number) {
     return this.http.get('https://gorest.co.in/public-api/users?page='+pageNumber).toPromise()
     .then((response:any) => {
      this._usersSubject.next(response.data);
      this._usersMetaSubject.next(response.meta);
    })
  }

  searchUsers(name:string) {
    // this.loaderService.showLoader();
    return this.http.get('https://gorest.co.in/public-api/users?name='+name).pipe(delay(2000)).toPromise()
    .then( (res:any) => {
      this._usersSubject.next(res.data);
      this._usersMetaSubject.next(res.meta);
      // this.loaderService.hideLoader()
      })
  }

  async removeContactOnDb(contactId) {
    return this.http.delete('https://gorest.co.in/public-api/users/'+contactId
    // , 
    // {
    //   headers: new HttpHeaders().set(
    //     'Authorization', 'Bearer ' + this.authService.getTokenFromLocalStorage()
    //   )
    // }
    ).toPromise()
  }


  sortUsersByName(sens) {
     return this.http.get('https://gorest.co.in/public-api/users?sort='+sens).pipe(
      map((response:any) => response.data)
    ).toPromise()
    .then( data => this._usersSubject.next(data) ) 
  }

  /*
    setter _usersSubject
  */
  setUsersSubject(data:User[]) {
    this._usersSubject.next(data)
  }
  /*
    setter _favsSubject
  */
  setFavsSubject(data:User[]) {
    this._favsSubject.next(data)
  }
   /*
    setter _usersMetaSubject
  */
  setUsersMetaSubject(meta) {
    this._usersMetaSubject.next(meta)
  }
  /*
    getter _favsSubject.getValue()
  */
  getFavsValue() {
    return this._favsSubject.getValue();
  }
  /*
    getter _favsSubject.getValue()
  */
  getUsersValue() {
    return this._usersSubject.getValue();
  }
  /*
    getter _favsSubject.getValue()
  */
  getUsersMetaValue() {
    return this._usersMetaSubject.getValue();
  }

  addUser() {
   
  }

  



  

}