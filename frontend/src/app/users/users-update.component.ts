import { Component, OnInit, OnChanges ,SimpleChange } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './users.model';

@Component({
  selector: 'app-users-update',
  templateUrl: './users-update.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersUpdateComponent implements OnInit {
    id: number;
    user: any = new User('', '', '', '', '', '', '');
    users: User[] = [];
    selectedFile = null;
    filename = null;

    constructor(public _user_obj: UsersService,private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this._user_obj.showUser(params['id']).subscribe(res => {
    this.user = new User(res['name'], res['email'], res['password'], res['address'], res['work_number'], res['personal_number'], res['image_path']);
    this.id = params['id'];
     /*this._user_obj.getUsers().subscribe(res => {
         for(let i = 0; i < res['data'].length; i++) {
             this.users[i]['value'] = res['data'][i].id;
             this.users[i]['viewValue'] = res['data'][i].name;
         }*/
        // console.log(res);
        // this.selectedValue = this.users[0].value;
     }));
     //this.selectedValue = this.users[0].value.toString();
  //   console.log(this.users[0].value);
}
    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
        console.log(this.selectedFile);
    }

   updateUser() {
       if (this.selectedFile != null) {
       const fd = new FormData();
       fd.append('image_path', this.selectedFile, this.selectedFile.name);
       this._user_obj.fileUpload(fd).subscribe(res => {
           console.log(res);
       });
       this.filename = this.selectedFile.name;
       }
        this.users.push(new User(this.user.name, this.user.email, this.user.password, this.user.address, this.user.work_number, this.user.personal_number, this.filename));
       // console.log(this.clients[0]['name']);
       // this.selected = this.client.user_id;
        this._user_obj.updateUser(this.id, this.users).subscribe(res => {
            this.users.length = 0;
        console.log(res);
    });


    }

}
