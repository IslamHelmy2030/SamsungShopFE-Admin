import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHotDeals } from '../dtos/models';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root',
})
export class HotDealService {
  constructor(private connectionService: ConnectionService) {}

  GetVisibleHotDeals(data: any): Observable<IHotDeals[]> {
    const url = `HotDeals/${data}`;
    return this.connectionService.get(url);
  }

  GetAllHotDeals(data: any): Observable<IHotDeals[]> {
    const url = `HotDeals/All/${data}`;
    return this.connectionService.get(url);
  }

  AddHotDeal(data: IHotDeals) {
    const url = 'HotDeals/Add';
    return this.connectionService.post(url, data);
  }

  DeleteHotDeal(productId: number) {
    const url = 'HotDeals/Delete/' + productId;
    return this.connectionService.delete(url);
  }
}
