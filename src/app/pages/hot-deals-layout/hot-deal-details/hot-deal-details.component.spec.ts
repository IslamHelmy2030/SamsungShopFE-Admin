import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotDealDetailsComponent } from './hot-deal-details.component';

describe('HotDealDetailsComponent', () => {
  let component: HotDealDetailsComponent;
  let fixture: ComponentFixture<HotDealDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotDealDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotDealDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
