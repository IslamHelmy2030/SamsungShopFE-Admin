import { ICategory } from '../dtos/models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionService } from './connection.service';
import { IListDataResponseDto, IPaginationDto } from '../dtos/common/models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  paginationDto: IPaginationDto = {
    boundaryLinks: true,
    rotate: true,
    currentPage: 1,
    maxSizePagesLinks: 5,
    ellipses: false,
    pageSize: 12,
    totalRowsCount: 0,
  };

  constructor(private connectionService: ConnectionService) {}

  categoriesList: ICategory[] = [];

  GetVisibleCategories(): Observable<ICategory[]> {
    const url = 'Category';
    return this.connectionService.get(url);
  }

  GetAllCategories(): Observable<any> {
    const url = 'Category/All';
    return this.connectionService.get(url);
  }

  GetCategoryDetails(categoryId: number): Observable<any> {
    const url = `Category/${categoryId}`;
    return this.connectionService.get(url);
  }

  refreshList() {
    this.GetAllCategories().subscribe(
      (res) => {
        this.categoriesList = res.data;
        this.paginationDto.totalRowsCount = res.totalRowsCount;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  AddCategory(category: ICategory) {
    const url = 'Category/Add';
    return this.connectionService.post(url, category);
  }

  UpdateCategory(category: ICategory) {
    const url = 'Category/Update';
    return this.connectionService.post(url, category);
  }

  DeleteCategory(category: ICategory) {
    const url = `Category/Delete/${category.id}`;
    return this.connectionService.delete(url);
  }
}
