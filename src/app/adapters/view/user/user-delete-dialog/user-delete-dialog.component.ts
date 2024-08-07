import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../../domain/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../domain/store/reducers/app.reducer';
import { deleteUser } from '../../../../domain/store/actions/user.actions';

@Component({
  selector: 'app-user-delete-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-delete-dialog.component.html',
  styleUrl: './user-delete-dialog.component.scss',
})
export class UserDeleteDialogComponent implements OnInit {
  @Input() user!: User;
  name!: string;

  constructor(
    public activeModal: NgbActiveModal,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.name = this.user?.first_name + ' ' + this.user?.last_name;
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }

  delete() {
    this.store.dispatch(deleteUser({ userId: this.user?.id }));
    this.activeModal.dismiss('delete');
  }
}
