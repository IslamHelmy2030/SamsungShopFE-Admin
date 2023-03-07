import { Component, OnInit } from '@angular/core';
import { IUserData } from 'src/app/shared/dtos/common/models';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: IUserData;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.userValue;

    document
      .getElementById('toggleSidebar')
      ?.addEventListener('click', function (event) {
        document.querySelector('body')?.classList.toggle('toggle-sidebar');
      });
  }
}
