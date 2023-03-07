import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotDealDetailsListComponent } from './hot-deal-details-list.component';

describe('HotDealDetailsListComponent', () => {
  let component: HotDealDetailsListComponent;
  let fixture: ComponentFixture<HotDealDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotDealDetailsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotDealDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
