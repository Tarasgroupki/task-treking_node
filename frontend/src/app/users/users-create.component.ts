import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
//import { ActivatedRoute } from "@angular/router";
//import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from './users.model';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersCreateComponent implements OnInit {
   // log(x) { console.log(x); }
    ///client: any = 1;
    user: any = new User('', '', '', '', '', '', '');
    users: User[] = [];
    //selectedFile = null;

    constructor(public _user_obj: UsersService) {

    }

   /* onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
        //console.log(this.selectedFile);
    }*/

    addUser() {
       // const fd = new FormData();
     //   fd.append('image_path', this.selectedFile, this.selectedFile.name);
        //console.log(fd);
       // this._user_obj.fileUpload(fd).subscribe(res => {
      //      console.log(res);
     //   });
        this.users.push(new User(this.user.name, this.user.email, this.user.password, null , null, null, null));
        console.log(this.users);
        this._user_obj.createUser(this.users).subscribe(res => {
        this.user = res;
        this.users.length = 0;
        console.log(res);
    });
    }
    ngOnInit() {

    }
    /*ngOnInit() {
        this._clients.getClients().subscribe(res => {
            this.clients = res;
        });
    }*/

}
