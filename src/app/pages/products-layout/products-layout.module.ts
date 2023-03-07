import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsLayoutRoutingModule } from './products-layout-routing.module';
import { ProductsLayoutComponent } from './products-layout.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsListComponent } from './product-details-list/product-details-list.component';

import { DeleteModalModule } from 'src/app/shared/delete-modal/delete-modal.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProductsLayoutComponent,
    ProductDetailsComponent,
    ProductDetailsListComponent,
  ],
  imports: [
    CommonModule,
    ProductsLayoutRoutingModule,
    DeleteModalModule,
    SharedModule
  ],
})
export class ProductsLayoutModule {}
