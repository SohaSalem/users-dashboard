import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserAddEditDialogComponent } from "./user-add-edit-dialog/user-add-edit-dialog.component";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import {
  loadMoreUsers,
  loadUsers,
  selectUser,
} from "../../../domain/store/actions/user.actions";
import {
  Observable,
  combineLatest,
  debounceTime,
  fromEvent,
  map,
  startWith,
} from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import {
  selectLoading,
  selectUsers,
} from "../../../domain/store/selectors/user.selectors";
import { AppState } from "../../../domain/store/reducers/app.reducer";
import { User } from "../../../domain/models/user.model";
import { SubheaderComponent } from "../subheader/subheader.component";
import { AlertComponent } from "../alert/alert.component";
import {
  selectSuccessMessage,
  selectErrorMessage,
} from "../../../domain/store/selectors/message.selectors";
import {
  clearErrorMessage,
  clearSuccessMessage,
} from "../../../domain/store/actions/message.actions";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-user",
  standalone: true,
  imports: [
    CommonModule,
    UserAddEditDialogComponent,
    HttpClientModule,
    SubheaderComponent,
    AlertComponent,
    FormsModule,
  ],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  users$!: Observable<Partial<User>[]>;
  loading$!: Observable<boolean>;
  successMessage$?: Observable<string | null>;
  errorMessage$?: Observable<string | null>;

  isLoading: boolean = false;
  currentPage: number = 1;
  filteredUsers: Partial<User>[] = [];
  searchTerm: string = "";

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers({ page: this.currentPage }));
    this.users$ = this.store.select(selectUsers);
    this.users$.subscribe((users) => {
      this.filteredUsers = users;
    });
    this.successMessage$ = this.store.select(selectSuccessMessage);
    this.errorMessage$ = this.store.select(selectErrorMessage);
  }

  onSearch() {
    if (this.searchTerm) {
      this.users$.subscribe((users) => {
        this.filteredUsers = users.filter((user) =>
          user.id?.toString().includes(this.searchTerm)
        );
      });
    } else {
      this.users$.subscribe((users) => {
        this.filteredUsers = users;
      });
    }
  }

  openAddUserModal(user?: Partial<User>): void {
    const modalRef = this.modalService.open(UserAddEditDialogComponent);
    if (user?.id !== undefined) {
      // Proceed with the operation
      modalRef.componentInstance.user = user;
      modalRef.componentInstance.isEdit = !!user;

      if (user) {
        this.store.dispatch(selectUser({ user }));
      }
    }
  }

  userDetail(userId: number | undefined): void {
    if (userId !== undefined) {
      this.router.navigate(["/user", userId]);
    } else {
      console.error("User ID is undefined");
    }
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(event: any): void {
    if (this.isLoading) {
      return;
    }

    const scrollTop = (
      event.target.scrollingElement || document.documentElement
    ).scrollTop;
    const scrollHeight = (
      event.target.scrollingElement || document.documentElement
    ).scrollHeight;
    const clientHeight = (
      event.target.scrollingElement || document.documentElement
    ).clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 1) {
      this.loadMoreUsers();
    }
  }

  loadMoreUsers(): void {
    this.store.dispatch(loadMoreUsers());
  }

  clearSuccessMessage() {
    this.store.dispatch(clearSuccessMessage());
  }
  clearErrorMessage() {
    this.store.dispatch(clearErrorMessage());
  }
}
