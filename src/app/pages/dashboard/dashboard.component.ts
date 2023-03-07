import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IPaginationDto } from 'src/app/shared/dtos/common/models';
import { Users } from 'src/app/shared/dtos/models';
import { ConnectionService } from 'src/app/shared/services/connection.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  listArr: Users[] = [];
  data: any;

  dtOptions: DataTables.Settings = {};

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
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.spinner.show();
    this.connectionService
      .get('Dashboard/GetClientUsers/', this.paginationDto.currentPage)
      .subscribe((res: any) => {
        if (res.isSuccess) {
          this.listArr = res.data;
          this.paginationDto.totalRowsCount = res.totalRowsCount;

          setTimeout(() => {
            $('#datatableexample').DataTable({
              paging: false,
              pagingType: 'full_numbers',
              pageLength: 10,
              processing: true,
              lengthMenu: [5, 10, 25],
              dom: 'Bfrtip',
            });
          }, 1);
        } else {
          this.toasterService.error('Something Went Worng');
        }
        this.spinner.hide();
      });
  }

  loadPage(page: number) {
    window.scrollTo(0, 0);
    this.paginationDto.currentPage = page;
    this.getList();
  }
}
