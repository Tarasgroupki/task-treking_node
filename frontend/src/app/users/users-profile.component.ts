import { Component, OnInit, OnChanges , SimpleChange } from '@angular/core';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
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
    roleList: string;

    constructor(public usersService: UsersService, private route: ActivatedRoute, private authService: AuthService) {

    }
    ngOnInit() {
        for (let i = 0; i < this.LogginningData['roles'].length; i++) {
            this.roles[i] = this.LogginningData['roles'][i];
        }
        this.roleList = this.roles.join();
        this.usersService.showUserProfile(this.LogginningData.user[0]['_id']).subscribe(resUser => {
            this.user = new User(resUser['name'], resUser['email'], resUser['password'], resUser['address'], resUser['work_number'], resUser['personal_number'], resUser['image_path']);
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
        this.usersService.fileUpload(fd).subscribe(() => {});
        this.filename = this.selectedFile.name;
        }
        this.users.push(new User(this.user.name, this.user.email, this.user.password, this.user.address, this.user.work_number, this.user.personal_number, this.filename));
        this.usersService.updateProfileUser((this.LogginningData.user[0]['_id']) ? this.LogginningData.user[0]['_id'] : this.authService.currentUser[0]['_id'], this.users).subscribe(() => { (this.filename !== null) ? this.user.image_path = this.filename : null;
            this.users.length = 0;
        });
    }

}
