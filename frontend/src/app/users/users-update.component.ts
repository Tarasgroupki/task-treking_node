import { Component, OnInit, OnChanges , SimpleChange } from '@angular/core';
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

    constructor(public usersService: UsersService, private route: ActivatedRoute) { }

    ngOnInit() {
    this.route.params.subscribe( params => this.usersService.showUser(params['id']).subscribe(resUser => {
    this.user = new User(resUser['name'], resUser['email'], resUser['password'], resUser['address'], resUser['work_number'], resUser['personal_number'], resUser['image_path']);
    this.id = params['id'];
    }));
}
    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
        console.log(this.selectedFile);
    }

   updateUser() {
       if (this.selectedFile != null) {
       const fd = new FormData();
       fd.append('image_path', this.selectedFile, this.selectedFile.name);
       this.usersService.fileUpload(fd).subscribe(() => {});
       this.filename = this.selectedFile.name;
       }
        this.users.push(new User(this.user.name, this.user.email, this.user.password, this.user.address, this.user.work_number, this.user.personal_number, this.filename));
        this.usersService.updateUser(this.id, this.users).subscribe(() => {
            this.users.length = 0;
    });
    }
}
