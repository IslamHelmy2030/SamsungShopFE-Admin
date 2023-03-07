import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ICategory,
  IProduct,
  IProductDetails,
  IProductForm,
  IProductImages,
} from 'src/app/shared/dtos/models';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { productService } from 'src/app/shared/services/product.service';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: FormGroup;
  productId: number = 0;

  productImageBase: IProductImages = {
    imageFile: '',
  };

  productDetails: IProductDetails = {
    id: 0,
    imageFile: '',
    price: 0,
    categoryId: 0,
    isVisible: false,
    discountAmount: 0,
    productImagesResponsesDto: [],
  };

  updateProductForm: IProductForm = {
    imageBase64: '',
    id: 0,
    price: 0,
    categoryId: 0,
    isVisible: false,
    discountAmount: 0,
    name: '',
    summary: '',
    description: '',
  };

  imageSrc!: string;

  images: any = {
    id: 0,
    name: '',
  };

  imageButtons: any[] = [];
  categoriesList: ICategory[] = [];
  selectedFiles?: FileList;
  selectedMainFile?: FileList;
  productImage: string[] = [];
  productImages: IProductImages[] = [];

  data: IProduct = {
    imageFile: '',
    priceAfterDiscount: 0,
    productImages: [],
    id: 0,
    price: 0,
    categoryId: 0,
    isVisible: false,
    discountAmount: 0,
    name: '',
    summary: '',
    description: '',
  };

  MainImageBase: any;

  constructor(
    private route: ActivatedRoute,
    private productService: productService,
    public categorySrv: CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private location: Location
  ) {
    this.product = fb.group({
      name: [
        '',
        [
          Validators.minLength(3),
          Validators.required,
          Validators.maxLength(50),
        ],
      ],
      price: ['', [Validators.min(0), Validators.required]],
      summary: ['', [, Validators.minLength(3), Validators.maxLength(500)]],
      description: ['', [Validators.minLength(3), Validators.maxLength(500)]],
      imageFile: [''],
      categoryId: [0],
      isVisible: [false],
      discountAmount: ['', [Validators.min(0), Validators.required]],
    });
  }

  isView: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['Id'];

      if (this.productId) this.getProductDetails();

      if (this.router.url.includes('view')) {
        this.isView = true;
        this.product.disable();
      }
    });

    this.getCategories();
  }

  getProductDetails() {
    this.spinner.show();

    this.productService.GetProductDetails(this.productId).subscribe(
      (res: any) => {
        this.productDetails = res.data;

        this.imageSrc = this.productDetails.imageFile;

        this.images = this.productDetails.productImagesResponsesDto;
        for (const item of this.images) {
          this.imageButtons.push(item);
        }

        this.product.setValue({
          name: this.productDetails.name,
          price: this.productDetails.price,
          summary: this.productDetails.summary,
          description: this.productDetails.description,
          imageFile: '',
          categoryId: this.productDetails.categoryId,
          isVisible: this.productDetails.isVisible,
          discountAmount: this.productDetails.discountAmount,
        });

        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        if (err.status == 401) {
          this.toasterService.error(err.statusText);
        }
      }
    );
  }

  checked() {
    this.product.value['isVisible'] === true;
  }

  getCategories() {
    this.categorySrv.GetAllCategories().subscribe(
      (res) => {
        this.categoriesList = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // onFileChanged(event: any) {
  //   const file = event.target.files[0];
  // }

  mainImageFile: string = '';

  selectMainImage(event: any): void {
    this.selectedMainFile = event.target.files;

    if (this.selectedMainFile && this.selectedMainFile[0]) {
      const numberOfFiles = this.selectedMainFile.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageSrc = e.target.result;
          this.MainImageBase = e.target.result.split('4,');
          this.mainImageFile = this.MainImageBase[1];
        };
        reader.readAsDataURL(this.selectedMainFile[i]);
      }
    }
  }

  selectFiles(event: any): void {
    if (this.productImage.length <= 3) {
      this.selectedFiles = event.target.files;

      if (this.selectedFiles && this.selectedFiles[0]) {
        const numberOfFiles = this.selectedFiles.length;
        for (let i = 0; i < numberOfFiles; i++) {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            this.imageButtons.push({
              imageFile: e.target.result,
            });

            this.productImage.push(e?.target?.result);

            //if Update
            if (this.router.url.includes('edit')) {
              //When Upload Image To Save
              const updateImageToSave = e?.target?.result.split('4,');
              this.productImageBase.imageFile = updateImageToSave[1];
              this.productImageBase.productId = this.productDetails.id;

              this.addImage(this.productImageBase);
            }
          };

          reader.readAsDataURL(this.selectedFiles[i]);
        }
      }
    }
  }

  backButton(): void {
    this.location.back();
  }

  submitProduct() {
    this.product.markAllAsTouched();
    if (this.product.valid) {
      this.updateProductForm = this.product.value;

      if (this.router.url.includes('edit')) {
        this.updateProductForm.id = this.productId;

        this.updateProductForm.categoryId = this.product.value['categoryId'];

        this.updateProductForm.categoryName = this.categoriesList.find(
          (x) => x.id == this.updateProductForm.categoryId
        )?.name;

        this.updateProductForm.imageBase64 = this.mainImageFile;
        //this.updateProductForm.discountAmount = 5;

        this.updateProduct(this.updateProductForm);
      } else {
        this.data = this.product.value;
        this.data.productImages = [];
        this.data.categoryName = this.categoriesList.find(
          (x) => x.id == this.data.categoryId
        )?.name;

        for (const img of this.productImage) {
          const baseImage = img.split('4,');

          this.productImageBase.imageFile = baseImage[1];

          this.productImageBase.productName = this.data.name;

          let productImagesObj: IProductImages = Object.assign(
            {},
            this.productImageBase
          );

          this.data.productImages.push(productImagesObj);
        }

        this.data.imageFile = this.mainImageFile;

        // this.data.productImages = this.productImages;

        //Add New Product
        this.addProduct();
      }
    }
  }

  addProduct() {
    this.spinner.show();
    if (this.product.valid) {
      this.productService.AddProductWithImages(this.data).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.resetForm();

            this.toastr.success('Added Successfully', '', { timeOut: 10000 });
          } else {
            this.toastr.error('Can not Add', '', { timeOut: 10000 });
          }
        },
        (err) => console.log('error', err),
        () => this.router.navigate(['products'])
      );
    }
    this.spinner.hide();
  }

  updateProduct(data: IProductForm) {
    if (this.product.valid) {
      console.log(data);

      this.productService.UpdateProduct(data).subscribe(
        (res) => {
          if (res.isSuccess) {
            console.log('res', res);

            this.toastr.success('Update Successfully', '', { timeOut: 10000 });
          } else {
            this.toastr.error('Can not Update', '', { timeOut: 10000 });
          }
        },
        (err) => this.toastr.error('error', err),
        () => this.router.navigate(['products'])
      );
    }
  }

  deleteMainImage() {
    this.imageSrc = '';
  }

  deleteImage(imageId: any, index: number) {
    if (imageId) {
      this.productService.DeleteImage(imageId).subscribe((e) => {
        console.log('image deleted');
      });
    }
    this.imageButtons = this.imageButtons.filter((v, i) => {
      return i != index;
    });

    this.productImage = this.productImage.filter((v, i) => {
      return i != index;
    });
  }

  addImage(data: IProductImages) {
    this.productService.AddImage(this.productImageBase).subscribe((res) => {
      if (res.isSuccess) {
        // this.imageButtons.push({
        //   id: res?.data?.id,
        //   imageFile: res?.data?.imageFile,
        // });
        // this.toastr.success('Added Successfully', '', { timeOut: 10000 });
      } else {
        this.toastr.error('Can not Add', '', { timeOut: 10000 });
      }
    });
  }

  resetForm() {
    this.product.reset();
    this.productImage = [];
    this.productImages = [];
    this.imageButtons = [];
    this.imageSrc = '';
  }

  get f() {
    return this.product.controls;
  }
}
