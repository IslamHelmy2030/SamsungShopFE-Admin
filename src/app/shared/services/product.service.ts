import {
  IProduct,
  IProductDetails,
  IProductForm,
  IProductImages,
  IProductRequestDto,
} from '../dtos/models';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root',
})
export class productService {
  public CRUDSubject = new BehaviorSubject<string>('');

  constructor(private connectionService: ConnectionService) {}

  productsList: IProduct[] = [];
  formData: IProduct = {
    id: 0,
    name: '',
    categoryId: 0,
    discountAmount: 0,
    isVisible: false,
    price: 0,
    categoryName: '',
    description: '',
    summary: '',
    imageFile: '',
    priceAfterDiscount: 0,
    productImages: [],
  };

  // GetVisibleProducts(data: IProductRequestDto) {
  //   const url = 'Product';
  //   return this.connectionService.post(url, data);
  // }

  getAllProducts(data?: IProductRequestDto): Observable<any> {
    const url = `Product/All`;
    return this.connectionService.post(url, data);
  }

  refreshList(searchData: IProductRequestDto) {
    this.getAllProducts(searchData).subscribe(
      (res) => {
        this.productsList = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  AddProductWithImages(data: IProduct) {
    const url = 'product/AddWithImages';
    return this.connectionService.post(url, data);
  }

  // AddProduct(data: IProduct) {
  //   const url = 'Product/Add';
  //   return this.connectionService.post(url, data);
  // }

  UpdateProduct(data: any) {
    const url = 'Product/update';
    return this.connectionService.put(url, data);
  }

  DeleteProduct(productId: number) {
    const url = `Product/Delete/${productId}`;
    return this.connectionService.delete(url);
  }

  AddImage(data: IProductImages) {
    const url = `Image/Add`;
    return this.connectionService.post(url, data);
  }

  DeleteImage(imageId: number) {
    const url = `Image/Delete/${imageId}`;
    return this.connectionService.delete(url);
  }

  GetProductDetails(productId: number): Observable<IProductDetails> {
    const url = `Product/Details/${productId}`;
    return this.connectionService.get(url);
  }
}
