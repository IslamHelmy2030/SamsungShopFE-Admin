import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IUserData } from 'src/app/shared/dtos/common/models';
import { ILogin } from 'src/app/shared/dtos/models';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authServ: AuthService,
    private spinner: NgxSpinnerService,
    private toasterService: ToastrService,
    private router: Router
  ) {}

  loginData: ILogin = {
    email: '',
    password: '',
  };

  ngOnInit(): void {}

  loginUser() {
    this.spinner.show();
    this.authServ.loginUser(this.loginData).subscribe(
      (user: IUserData) => {
        debugger;
        const decodedRole =
          user.data[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ];
        this.spinner.hide();
        if (user.isSuccess && decodedRole === 'admin') {
          this.toasterService.success('Welcome ' + user.name);
          this.router.navigate(['']);
        } else {
          this.toasterService.error('Username or Password is invalid');
        }
      },
      (err) => {
        this.toasterService.error('Error', err);
      }
    );
    this.spinner.hide();
  }
}
