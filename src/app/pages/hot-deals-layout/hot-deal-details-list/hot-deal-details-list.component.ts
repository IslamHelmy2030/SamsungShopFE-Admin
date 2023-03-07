import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { IPaginationDto } from 'src/app/shared/dtos/common/models';
import { IHotDeals } from 'src/app/shared/dtos/models';
import { HotDealService } from 'src/app/shared/services/hot-deal.service';

@Component({
  selector: 'app-hot-deal-details-list',
  templateUrl: './hot-deal-details-list.component.html',
  styleUrls: ['./hot-deal-details-list.component.css'],
})
export class HotDealDetailsListComponent implements OnInit {
  hotDeals: IHotDeals[] = [];

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
    private hotDealService: HotDealService,
    private spinner: NgxSpinnerService,
    private toasterService: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getHotDeals();
  }

  loadPage(page: number) {
    window.scrollTo(0, 0);
    this.paginationDto.currentPage = page;
    this.getHotDeals();
  }

  getHotDeals() {
    this.spinner.show();

    this.hotDealService
      .GetAllHotDeals(this.paginationDto.currentPage)
      .subscribe(
        (res: any) => {
          if (res.isSuccess) {
            this.hotDeals = res.data;
            this.paginationDto.totalRowsCount = res.totalRowsCount;

            this.hotDeals.forEach((hotDeal) => {
              hotDeal.priceAfterDiscount = hotDeal.price - hotDeal.discount;
            });
            setTimeout(() => {
              $('#datatableexample').DataTable({
                paging: false,
                pagingType: 'full_numbers',
                pageLength: 10,
                processing: true,
                lengthMenu: [5, 10, 25],
              });
            }, 1);
          } else {
            this.toasterService.error('Something Went Worng');
          }
        },
        (err) => this.toasterService.error('error', err),
        () => this.spinner.hide()
      );
  }

  onDeleteClicked(data: IHotDeals) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.data = data.productName;

    modalRef.componentInstance.passEntry.subscribe((res: boolean) => {
      if (res) {
        this.deleteHotDeal(data.productId);
        modalRef.close();
      }
    });
  }

  deleteHotDeal(productId: number) {
    this.hotDealService.DeleteHotDeal(productId).subscribe((r) => {
      if (r.isSuccess) {
        this.toasterService.success('Deleted Successfully');

        this.getHotDeals();
      }
    });
  }
}
