import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientUsersListComponent } from './client-users-list.component';

describe('ClientUsersListComponent', () => {
  let component: ClientUsersListComponent;
  let fixture: ComponentFixture<ClientUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientUsersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
