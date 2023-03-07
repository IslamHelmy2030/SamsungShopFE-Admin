import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { IUserData } from '../dtos/common/models';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user: IUserData = this.authService.getUserStoredData();
    if (!user) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
