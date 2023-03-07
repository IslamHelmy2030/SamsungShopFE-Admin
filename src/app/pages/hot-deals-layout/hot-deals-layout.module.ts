import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotDealsLayoutRoutingModule } from './hot-deals-layout-routing.module';
import { HotDealsLayoutComponent } from './hot-deals-layout.component';
import { HotDealDetailsListComponent } from './hot-deal-details-list/hot-deal-details-list.component';
import { HotDealDetailsComponent } from './hot-deal-details/hot-deal-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    HotDealsLayoutComponent,
    HotDealDetailsComponent,
    HotDealDetailsListComponent,
  ],
  imports: [
    CommonModule,
    HotDealsLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    NgSelectModule
  ],
})
export class HotDealsLayoutModule {}
