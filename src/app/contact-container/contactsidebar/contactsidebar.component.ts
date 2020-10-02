import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-contactsidebar',
  templateUrl: './contactsidebar.component.html',
  styleUrls: ['./contactsidebar.component.css']
})
export class ContactsidebarComponent implements OnInit {

  favs$;
  subcription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log(this);
    this.favs$ = this.userService.favs$;
    // this.userService.favsSubject.subscribe( data => { 
    //   console.log(data);
    //   this.favoris = data 
    //   } );
    
  }

  // ngOnDestroy() {
  //   this.subcription.unsubcribe()
  // }

}