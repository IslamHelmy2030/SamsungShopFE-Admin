import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILogin, IRegisterUser } from '../dtos/models';
import { ConnectionService } from './connection.service';
import { map } from 'rxjs/operators';
import { IUserData } from '../dtos/common/models';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<IUserData>;
  public user: Observable<IUserData>;

  constructor(private connectionService: ConnectionService) {
    let userData = this.getUserStoredData();
    this.userSubject = new BehaviorSubject<IUserData>(userData);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): IUserData {
    return this.userSubject.value;
  }

  loginUser(data: ILogin) {
    const url = 'auth/Login';
    return this.connectionService.post(url, data).pipe(
      map((user: IUserData) => {
        user.data = jwt_decode(user?.message);

        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );
  }

  getUserStoredData() {
    let userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
  }

  registerUser(data: IRegisterUser) {
    const url = 'Auth/Register';
    return this.connectionService.post(url, data);
  }
  registerUserAdmin(data: IRegisterUser) {
    const url = 'Auth/RegisterAdmin';
    return this.connectionService.post(url, data);
  }

  logout() {
    localStorage.removeItem('user');
    window.location.reload();
  }
}
