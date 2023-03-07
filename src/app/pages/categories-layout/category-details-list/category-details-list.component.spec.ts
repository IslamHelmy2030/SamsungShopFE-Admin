import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailsListComponent } from './category-details-list.component';

describe('CategoryDetailsListComponent', () => {
  let component: CategoryDetailsListComponent;
  let fixture: ComponentFixture<CategoryDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryDetailsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
