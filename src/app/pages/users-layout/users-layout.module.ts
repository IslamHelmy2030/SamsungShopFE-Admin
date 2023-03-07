import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersLayoutRoutingModule } from './users-layout-routing.module';
import { UsersLayoutComponent } from './users-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientUsersListComponent } from './client-users-list/client-users-list.component';
import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { AddUserComponent } from './add-user/add-user.component';


@NgModule({
  declarations: [
    UsersLayoutComponent,
    ClientUsersListComponent,
    AdminUsersListComponent,
    AddUserComponent,
  ],
  imports: [
    CommonModule,
    UsersLayoutRoutingModule,
    SharedModule
  ]
})
export class UsersLayoutModule { }
