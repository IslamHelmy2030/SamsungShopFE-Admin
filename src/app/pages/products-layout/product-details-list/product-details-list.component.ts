import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { IPaginationDto } from 'src/app/shared/dtos/common/models';
import {
  ICategory,
  IProduct,
  IProductRequestDto,
} from 'src/app/shared/dtos/models';
import { CategoryService } from 'src/app/shared/services/category.service';
import { productService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-details-list',
  templateUrl: './product-details-list.component.html',
  styleUrls: ['./product-details-list.component.css'],
})
export class ProductDetailsListComponent implements OnInit {
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
    public productSrv: productService,
    public categorySrv: CategoryService,
    private toasterService: ToastrService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {}

  productsList: IProduct[] = [];

  categoriesList: ICategory[] = [];

  selectedCategoryId: number = 0;

  data: IProductRequestDto = {
    categoryId: 0,
    pageNumber: 0,
  };

  ngOnInit(): void {
    this.getCategories();
  }

  selectOption(selectedCategory: any) {
    this.selectedCategoryId = selectedCategory;

    this.data.categoryId = this.selectedCategoryId;

    this.paginationDto.currentPage = 0;
    this.getProductList();
  }

  getCategories() {
    this.spinner.show();
    this.categorySrv.GetAllCategories().subscribe(
      (res) => {
        this.categoriesList = res.data;
        this.selectedCategoryId = this.categoriesList[0].id;
        this.data.categoryId = this.selectedCategoryId;
        this.data.pageNumber = 0;
        this.getProductList();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  datatableDrawed: boolean = false;
  getProductList() {
    this.data.categoryId =
      this.selectedCategoryId == 0 ? 1 : this.selectedCategoryId;
    this.data.pageNumber = this.paginationDto.currentPage;
    this.productSrv.getAllProducts(this.data).subscribe(
      (res: any) => {
        this.productsList = res.data;
        this.paginationDto.totalRowsCount = res.totalRowsCount;

        // if (this.datatableDrawed == false) {
        //   setTimeout(() => {
        //     $('#datatableexample').DataTable({
        //       paging: false,
        //       pagingType: 'full_numbers',
        //       pageLength: 10,
        //       processing: true,
        //       lengthMenu: [5, 10, 25],
        //     });
        //     this.datatableDrawed = true;
        //   }, 1);
        // }
      },
      (err) => {
        this.productsList = [];
        console.log(err);
      }
    );

    this.spinner.hide();
  }

  // populateForm(product: IProduct) {
  //   this.productSrv.formData = Object.assign({}, product);
  // }

  loadPage(page: number) {
    window.scrollTo(0, 0);
    this.paginationDto.currentPage = page;
    this.getProductList();
  }

  onDeleteClicked(data: IProduct) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.additionalData =
      'hint: when you delete the product you will delete all related photos and hot deals.';

    modalRef.componentInstance.passEntry.subscribe((res: boolean) => {
      if (res) {
        this.deleteProduct(data);
        modalRef.close();
      }
    });
  }

  deleteProduct(product: IProduct) {
    this.productSrv.DeleteProduct(product.id).subscribe(
      (r) => {
        if (r.isSuccess) {
          this.toasterService.success('Deleted Successfully');

          this.getProductList();
        } else {
          this.toasterService.error('Can not Deleted this Product');
        }
      },
      (err) =>
        this.toasterService.error('The product is invisible or not found')
    );
  }
}
