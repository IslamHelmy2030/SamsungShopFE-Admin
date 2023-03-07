import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotDealDetailsComponent } from './hot-deal-details/hot-deal-details.component';
import { HotDealsLayoutComponent } from './hot-deals-layout.component';

const routes: Routes = [
  { path: '', component: HotDealsLayoutComponent },
  {
    path: 'add',
    component: HotDealDetailsComponent,
  },
  {
    path: 'view/:Id',
    component: HotDealDetailsComponent,
  },
  {
    path: 'edit/:Id',
    component: HotDealDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotDealsLayoutRoutingModule {}
