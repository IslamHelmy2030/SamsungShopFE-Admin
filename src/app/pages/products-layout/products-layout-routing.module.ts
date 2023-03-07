import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsLayoutComponent } from './products-layout.component';

const routes: Routes = [
  { path: '', component: ProductsLayoutComponent },
  {
    path: 'add',
    component: ProductDetailsComponent,
  },
  {
    path: 'view/:Id',
    component: ProductDetailsComponent,
  },
  {
    path: 'edit/:Id',
    component: ProductDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsLayoutRoutingModule {}
