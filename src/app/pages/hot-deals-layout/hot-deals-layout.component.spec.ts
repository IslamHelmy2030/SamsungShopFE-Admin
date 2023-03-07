import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotDealsLayoutComponent } from './hot-deals-layout.component';

describe('HotDealsLayoutComponent', () => {
  let component: HotDealsLayoutComponent;
  let fixture: ComponentFixture<HotDealsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotDealsLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotDealsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
