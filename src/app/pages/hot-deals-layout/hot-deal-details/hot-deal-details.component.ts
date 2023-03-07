import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {
  ICategory,
  IHotDeals,
  IProductDetails,
  IProductRequestDto,
} from 'src/app/shared/dtos/models';
import { CategoryService } from 'src/app/shared/services/category.service';
import { HotDealService } from 'src/app/shared/services/hot-deal.service';
import { productService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-hot-deal-details',
  templateUrl: './hot-deal-details.component.html',
  styleUrls: ['./hot-deal-details.component.css'],
})
export class HotDealDetailsComponent implements OnInit {
  hotDealsForm!: FormGroup;
  productId!: number;
  categoriesList: ICategory[] = [];

  data: IHotDeals = {
    imageFile: '',
    priceAfterDiscount: 0,
    id: 0,
    price: 0,
    discount: 0,
    productId: 0,
    productName: '',
    summary: '',
    isVisible: false,
  };

  productList: IProductDetails[] = [];
  totalRowsCount = 0;

  selectedData: IProductRequestDto = {
    categoryId: 0,
    pageNumber: 0,
  };

  constructor(
    private hotDealService: HotDealService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private productService: productService,
    public categorySrv: CategoryService,
    private location: Location
  ) {
    this.hotDealsForm = fb.group({
      productId: ['', Validators.required],
      categoryId: [0, Validators.required],
      discount: ['', Validators.min(0)],
    });
  }

  selectChangeHandler(event: any) {
    this.selectedData.categoryId = Number(event.target.value);

    this.getProducts();
  }

  isView: boolean = false;

  ngOnInit(): void {
    this.getCategories();

    this.route.params.subscribe((params) => {
      this.productId = params['Id'];

      // if (this.productId) this.getProductDetails();

      if (this.router.url.includes('view')) {
        this.isView = true;
        this.hotDealsForm.disable();
      }
    });
  }

  getProducts(infinite?: boolean) {
    this.productService.getAllProducts(this.selectedData).subscribe(
      (res) => {
        this.totalRowsCount = res?.totalRowsCount;
        if (infinite) {
          this.productList = [...this.productList, ...res?.data];
        } else {
          this.productList = res.data;
        }
      },
      (err) => {}
    );
  }

  getCategories() {
    this.categorySrv.GetAllCategories().subscribe(
      (res) => {
        this.categoriesList = res.data;
      },
      (err) => {}
    );
  }

  mainImageFile: string = '';
  selectedMainFile?: FileList;
  previewMainImage!: string;
  MainImageBase: any;

  selectMainImage(event: any): void {
    this.selectedMainFile = event.target.files;

    if (this.selectedMainFile && this.selectedMainFile[0]) {
      const numberOfFiles = this.selectedMainFile.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewMainImage = e.target.result;
          this.MainImageBase = e.target.result.split('4,');
          this.mainImageFile = this.MainImageBase[1];
        };
        reader.readAsDataURL(this.selectedMainFile[i]);
      }
    }
  }

  submitProduct() {
    this.hotDealsForm.markAllAsTouched();

    this.data = this.hotDealsForm.value;

    if (this.hotDealsForm.valid) {
      this.hotDealService.AddHotDeal(this.data).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.hotDealsForm.reset();
            this.toastr.success('Added Successfully', '', { timeOut: 10000 });
          } else {
            this.toastr.error('Can not Add', '', { timeOut: 10000 });
          }
        },
        (err) => this.toastr.error('error', err),
        () => this.router.navigate(['hotdeals'])
      );
    }
  }

  backButton(): void {
    this.location.back();
  }

  onSrollToEnd() {
    this.selectedData.pageNumber += 1;
    if (this.productList?.length < this.totalRowsCount) {
      this.getProducts(true);
    }
  }
}
