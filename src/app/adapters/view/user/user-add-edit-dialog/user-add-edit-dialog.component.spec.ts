import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddEditDialogComponent } from './user-add-edit-dialog.component';

describe('UserAddEditDialogComponent', () => {
  let component: UserAddEditDialogComponent;
  let fixture: ComponentFixture<UserAddEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
