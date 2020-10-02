import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css']
})
export class ContactlistComponent implements OnInit {

  // contacts:Array<User>;
  users$:Observable<User[]>;
  meta$:Observable<any>;

  sortByNameAscOrDsc:string='ASC';

  constructor(private userService:UserService ) { }

  ngOnInit() {
   // 1 Je fais la requete AJAX
   this.userService.loadUsersWithMeta();
   // 2 j'assigne en valeur mon Observable local = mon usersSubject
   this.users$ = this.userService.users$;
   this.meta$ = this.userService.meta$;

    // this.subscription = this.userService.users$.subscribe( data => this.contacts = data )
    //console.log('subscription : ', this.subscription)
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe()
  // }

  addUserToFavs(ev, contact:User):void {
    ev.stopPropagation();
    // console.log(this.userService.getFavsValue()); // []
    let indexOfContact =  this.userService.getFavsValue().indexOf(contact);
    let favs = [];
    if(indexOfContact != -1) {
      // suppression
      favs = this.userService.getFavsValue();
      favs.splice(indexOfContact, 1);
    }
    else {
      // ajout
      favs = [contact, ...this.userService.getFavsValue()];
    }
    // je push mon nouveau tableau de favoris dans mon subject
    this.userService.setFavsSubject(favs);
  }

  search(userSearch) {
    console.log(userSearch);
    userSearch = userSearch.toLowerCase();
    // this.users$ = this.userService.users$.pipe( 
    //   map( users => 
    //     users.filter( user => user.name.includes(userSearch) ) 
    //   )
    // )
    let users = this.userService.getUsersValue();
    users = users.filter( user => 
      user.name.toLowerCase().includes(userSearch) ||
      user.id == userSearch
    );
    this.users$ = of(users);
  }

  searchOnDb(userSearch) {
     this.userService.searchUsers(userSearch);
  }

  nextPage(actualPage:number) {
    this.userService.loadUsersWithMetaPagination(actualPage+1)
    
  }
  previousPage(actualPage:number) {
    if((actualPage == 1)) {

    }
    else {
      this.userService.loadUsersWithMetaPagination(actualPage-1)
    }
     
  }

  async deleteContact(ev, contact){
    ev.stopPropagation();
    if(confirm('Supprimer ce contact ?')) {
      try {
        // await va attendre que la promise soit résolue; 
        let response:any = await this.userService.removeContactOnDb(contact.id);
        // Si la suppression est OK et que l'API répond 204
        if(response.code == 204) {
            let index = this.userService.getUsersValue()
                        .indexOf(this.userService.getUsersValue().find(user => user.id === contact.id));
            this.userService.getUsersValue().splice(index, 1);
            // Je remet à jour la vue
            this.userService.setUsersSubject(this.userService.getUsersValue());
            let meta = this.userService.getUsersMetaValue();
            meta.pagination.total = meta.pagination.total -1;
            // Je remet à jour la vue
            this.userService.setUsersMetaSubject(meta)
        }

      }
      catch(err) {
        console.log(err)
      }
    }
  }




  sortByName() {
    this.sortByNameAscOrDsc=='ASC' ? this.sortByNameAscOrDsc='DSC' :this.sortByNameAscOrDsc='ASC';
    this.userService.getUsersValue().sort( (a, b) => {
      if(this.sortByNameAscOrDsc=='ASC') {
        return a.name<b.name ? -1 : 1
      }
      else {
        return b.name<a.name ? -1 : 1
      }
    })
  }

  isFav(contact:User): boolean {
    // console.log('contact : ', contact);
    // console.log('getFavsValue() : ', this.userService.getFavsValue());
    let contactInFavs = this.userService.getFavsValue().find( user => user.id == contact.id);
    if(contactInFavs != undefined) {
      return true;
    }
    else {
      return false;
    }
    // return this.userService.getFavsValue().includes(contact)
  }






}