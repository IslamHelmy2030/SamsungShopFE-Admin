import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { IPaginationDto } from 'src/app/shared/dtos/common/models';
import { ICategory } from 'src/app/shared/dtos/models';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category-details-list',
  templateUrl: './category-details-list.component.html',
  styleUrls: ['./category-details-list.component.css'],
})
export class CategoryDetailsListComponent implements OnInit {
  categoriesList: ICategory[] = [];

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
    public categorySrv: CategoryService,
    private spinner: NgxSpinnerService,
    private toasterService: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    // this.categorySrv.refreshList();
    this.getCategories();
    this.spinner.hide();
  }

  loadPage(page: number) {
    window.scrollTo(0, 0);
    this.paginationDto.currentPage = page;
    this.categorySrv.refreshList();
  }

  getCategories() {
    this.categorySrv.GetAllCategories().subscribe(
      (res) => {
        this.categoriesList = res.data;
        this.paginationDto.totalRowsCount = res.totalRowsCount;
        setTimeout(() => {
          $('#datatableexample').DataTable({
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            lengthMenu: [5, 10, 25],
          });
        }, 1);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onDeleteClicked(category: ICategory) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.data = category;

    modalRef.componentInstance.passEntry.subscribe((res: boolean) => {
      if (res) {
        this.deleteCategory(category);
        modalRef.close();
      }
    });
  }

  deleteCategory(category: ICategory) {
    this.categorySrv.DeleteCategory(category).subscribe(
      (r) => {
        if (r.isSuccess) {
          this.toasterService.success('Deleted Successfully');

          this.getCategories();
        } else {
          this.toasterService.error('Can not Deleted this Product');
        }
      },
      (err) =>
        this.toasterService.error('The product is invisible or not found')
    );
  }
}
