import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IPaginationDto } from 'src/app/shared/dtos/common/models';
import { Users } from 'src/app/shared/dtos/models';
import { ConnectionService } from 'src/app/shared/services/connection.service';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css'],
})
export class AdminUsersListComponent implements OnInit {
  listArr: Users[] = [];
  paginationDto: IPaginationDto = {
    boundaryLinks: true,
    rotate: true,
    currentPage: 1,
    maxSizePagesLinks: 5,
    ellipses: false,
    pageSize: 12,
    totalRowsCount: 0,
  };
  constructor(
    private spinner: NgxSpinnerService,
    private connectionService: ConnectionService,
    private toasterService: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.spinner.show();
    this.connectionService
      .get('Dashboard/GetAdminUsers/', this.paginationDto.currentPage)
      .subscribe((res: any) => {
        if (res.isSuccess) {
          this.listArr = res.data;
          this.paginationDto.totalRowsCount = res.totalRowsCount;

          setTimeout(() => {
            $('#datatableAdmin').DataTable({ paging: false });
          });
        } else {
          this.toasterService.error('Something Went Worng');
        }
        this.spinner.hide();
      });
  }

  AddUser() {
    const modalRef = this.modalService.open(AddUserComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Add Amin User';

    modalRef.componentInstance.refresh.subscribe((res: boolean) => {
      if (res) {
        this.getList();
      }
    });
  }

  loadPage(page: number) {
    window.scrollTo(0, 0);
    this.paginationDto.currentPage = page;
    this.getList();
  }
}
