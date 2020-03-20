import { Component, OnInit, OnChanges , SimpleChange } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './users.model';

@Component({
    selector: 'app-users-profile',
    templateUrl: './users-profile.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersProfileComponent implements OnInit {
    id: number;
    public LogginningData = JSON.parse(localStorage.getItem('LoggedIn'));
    user: any = new User('', '', '', '', '', '', '');
    users: User[] = [];
    selectedFile = null;
    filename = null;
    roles = [];
    role_list: string;

    constructor(public _user_obj: UsersService, private route: ActivatedRoute) {

    }
    ngOnInit() {
        for ( let i = 0; i < this.LogginningData['roles'].length; i++) {
            this.roles[i] = this.LogginningData['roles'][i];
        }
        this.role_list = this.roles.join();
        this._user_obj.showUserProfile(this.LogginningData.user[0]['_id']).subscribe(res => {
            this.user = new User(res['name'], res['email'], res['password'], res['address'], res['work_number'], res['personal_number'], res['image_path']);
            console.log(this.user);
        });
    }

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
    }

    updateUser() {
        if (this.selectedFile !== null) {
            const fd = new FormData();
            fd.append('image_path', this.selectedFile, this.selectedFile.name);
        this._user_obj.fileUpload(fd).subscribe(res => {
            console.log(res);
        });
        this.filename = this.selectedFile.name;
        }
        this.users.push(new User(this.user.name, this.user.email, this.user.password, this.user.address, this.user.work_number, this.user.personal_number, this.filename));
        this._user_obj.updateProfileUser(this.LogginningData.user[0]['_id'], this.users).subscribe(res => { (this.filename !== null) ? this.user.image_path = this.filename : null;
            this.users.length = 0;
        });
    }

}
