import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./products-layout/products-layout.module').then(
            (m) => m.ProductsLayoutModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories-layout/categories-layout.module').then(
            (m) => m.CategoriesLayoutModule
          ),
      },
      {
        path: 'hotdeals',
        loadChildren: () =>
          import('./hot-deals-layout/hot-deals-layout.module').then(
            (m) => m.HotDealsLayoutModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users-layout/users-layout.module').then(
            (m) => m.UsersLayoutModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
