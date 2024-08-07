import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailedViewComponent } from './user-detailed-view.component';

describe('UserDetailedViewComponent', () => {
  let component: UserDetailedViewComponent;
  let fixture: ComponentFixture<UserDetailedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailedViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
