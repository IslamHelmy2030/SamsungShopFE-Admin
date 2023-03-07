import { CategoryDetailsComponent } from './category-details/category-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesLayoutComponent } from './categories-layout.component';

const routes: Routes = [
  { path: '', component: CategoriesLayoutComponent },
  {
    path: 'add',
    component: CategoryDetailsComponent,
  },
  {
    path: 'view/:Id',
    component: CategoryDetailsComponent,
  },
  {
    path: 'edit/:Id',
    component: CategoryDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesLayoutRoutingModule {}
