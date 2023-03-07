import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesLayoutRoutingModule } from './categories-layout-routing.module';
import { CategoriesLayoutComponent } from './categories-layout.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryDetailsListComponent } from './category-details-list/category-details-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CategoriesLayoutComponent,
    CategoryDetailsComponent,
    CategoryDetailsListComponent,
  ],
  imports: [CommonModule, CategoriesLayoutRoutingModule, SharedModule],
})
export class CategoriesLayoutModule {}
