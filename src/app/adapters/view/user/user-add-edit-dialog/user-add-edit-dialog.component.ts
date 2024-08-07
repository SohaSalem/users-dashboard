import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../../domain/models/user.model';
import { Store } from '@ngrx/store';
import {
  addUser,
  updateUser,
} from '../../../../domain/store/actions/user.actions';
import { AppState } from '../../../../domain/store/reducers/app.reducer';

@Component({
  selector: 'app-user-add-edit-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './user-add-edit-dialog.component.html',
  styleUrl: './user-add-edit-dialog.component.scss',
})
export class UserAddEditDialogComponent implements OnInit {
  @Input() user!: User;
  @Input() isEdit: boolean = false;

  name: string = '';
  userForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.name = this.user?.first_name;
    this.userForm = this.fb.group({
      name: [this.name, Validators.required],
      job: [''],
    });
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }

  addUpdateUser() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const userData = {
        name: formValue.name,
        job: formValue.job,
      };

      if (this.isEdit) {
        this.store.dispatch(updateUser({ user: userData }));
      } else {
        this.store.dispatch(addUser({ user: userData }));
      }

      this.activeModal.close(userData);
    }
  }
}
