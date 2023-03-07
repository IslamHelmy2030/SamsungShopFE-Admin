import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/shared/dtos/models';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Location } from '@angular/common';
import { error } from 'jquery';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent implements OnInit {
  category!: FormGroup;
  categoryId: number = 0;

  imageSrc!: string;

  imageButtons: any[] = [];
  selectedFiles?: FileList;
  selectedMainFile?: FileList;
  categoryImage: string[] = [];
  categoryDetails!: ICategory;
  MainImageBase: any;

  constructor(
    private route: ActivatedRoute,
    public categorySrv: CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private location: Location
  ) {
    this.category = fb.group({
      name: [
        '',
        [
          Validators.minLength(3),
          Validators.required,
          Validators.maxLength(50),
        ],
      ],
      description: ['', [Validators.minLength(3), Validators.maxLength(500)]],
      imageFile: [''],
      isVisible: [false],
    });
  }

  isView: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['Id'];

      if (this.categoryId) this.getCategoryDetails();

      if (this.router.url.includes('view')) {
        this.isView = true;
        this.category.disable();
      }
    });
  }

  getCategoryDetails() {
    this.spinner.show();

    this.categorySrv.GetCategoryDetails(this.categoryId).subscribe(
      (res: any) => {
        this.categoryDetails = res.data;

        this.imageSrc = this.categoryDetails.imageFile;

        this.category.setValue({
          name: this.categoryDetails.name,
          description: this.categoryDetails.description,
          imageFile: '',
          isVisible: this.categoryDetails.isVisible,
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
    this.category.value['isVisible'] === true;
  }

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

  backButton(): void {
    this.location.back();
  }

  submitCategory() {
    this.category.markAllAsTouched();

    if (this.category.valid) {
      if (this.router.url.includes('edit')) {
        this.category.value.id = this.categoryId;

        this.category.value.imageBase64 = this.mainImageFile;

        this.updateCategory(this.category.value);
      } else {
        this.category.value.imageBase64 = this.mainImageFile;
        this.category.value.imageFile = this.mainImageFile;
        //Add New Product
        this.addCategory();
      }
    }
  }

  addCategory() {
    this.spinner.show();
    if (this.category.valid) {
      this.categorySrv.AddCategory(this.category.value).subscribe(
        (res) => {
          if (res) {
            this.resetForm();

            this.toastr.success('Added Successfully', '', { timeOut: 10000 });
          } else {
            this.toastr.error('Can not Add', '', { timeOut: 10000 });
          }
        },
        (err) => console.log('error', err),
        () => this.router.navigate(['categories'])
      );
    }
    this.spinner.hide();
  }

  updateCategory(data: ICategory) {
    if (this.category.valid) {
      console.log(data);
      debugger;
      this.categorySrv.UpdateCategory(data).subscribe(
        (res) => {
          if (res.isSuccess) {
            console.log('res', res);

            this.toastr.success('Update Successfully', '', { timeOut: 10000 });
          } else {
            this.toastr.error('Can not Update', '', { timeOut: 10000 });
          }
        },
        (err) => this.toastr.error('error', err),
        () => this.router.navigate(['categories'])
      );
    }
  }

  deleteMainImage() {
    this.imageSrc = '';
  }

  resetForm() {
    this.category.reset();
    this.categoryImage = [];
    this.imageButtons = [];
    this.imageSrc = '';
  }

  get f() {
    return this.category.controls;
  }
}
