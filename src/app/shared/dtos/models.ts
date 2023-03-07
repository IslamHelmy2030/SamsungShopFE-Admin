export interface ILogin {
  email: string;
  password: string;
}

export interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  address: string;
  phoneNumber: string;
  birthdate: Date;
}

export interface IProductRequestDto {
  categoryId: number;
  pageNumber: number;
}

export interface ICategory {
  id: number;
  name: string;
  description: string;
  imageFile: string;
  isVisible: boolean;
  imageBase64: string;
}

export interface IProductBase {
  id: number;
  name: string;
  summary: string;
  description: string;
  price: number;
  categoryName?: string;
  categoryId: number;
  isVisible: boolean;
  discountAmount: number;
}

export interface IProductForm extends IProductBase {
  imageBase64: string;
}

export interface IProduct extends IProductBase {
  imageFile: string;
  priceAfterDiscount: number;
  productImages: IProductImages[];
}

export interface IProductImages {
  id?: number;
  name?: string;
  description?: string;
  imageFile: string;
  productName?: string;
  productId?: number;
}

export interface IProductDetails {
  id: number;
  name?: string;
  description?: string;
  summary?: string;
  categoryName?: string;
  imageFile: string;
  price: number;
  categoryId: number;
  isVisible: boolean;
  discountAmount: number;
  productImagesResponsesDto: IProductImagesResponsesDto[];
}

export interface IHotDeals {
  id: number;
  productName?: string;
  imageFile?: string;
  price: number;
  discount: number;
  productId: number;
  summary?: string;
  priceAfterDiscount: number;
  isVisible: boolean;
}

export interface IProductImagesResponsesDto {
  id: number;
  name?: string;
  description?: string;
  imageFile: string;
  productId: number;
  productName: string;
}

export interface Users {
  firstName: string;
  lastName: string;
  address?: string;
  birthdate?: string;
  email: string;
  phoneNumber?: string;
}
