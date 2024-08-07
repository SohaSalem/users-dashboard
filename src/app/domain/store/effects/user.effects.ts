import { Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { USER_SERVICE, UserService } from "../../outbound/user.service";
import { UserActions } from "../actions/action-types";
import { AppState } from "../reducers/app.reducer";
import {
  selectPageNumber,
  selectSelectedUser,
  selectTotalPages,
  selectUsers,
} from "../selectors/user.selectors";
import { setErrorMessage, setSuccessMessage } from "../actions/message.actions";

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      withLatestFrom(this.store.select(selectUsers)),
      switchMap(([action, users]) => {
        const page = action.page;
        console.log(users);
        if (users && users.length > 0) {
          console.log(users);
          debugger;
          return of(UserActions.usersLoaded({ users, page }));
        } else {
          this.store.dispatch(UserActions.setLoading({ loading: true }));
          return this.userService.getUsers(page).pipe(
            map((users) => UserActions.usersLoaded({ users, page })),
            catchError((error) => of(UserActions.loadUsersFailure({ error })))
          );
        }
      })
    )
  );

  loadMoreUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadMoreUsers),
      withLatestFrom(
        this.store.select(selectPageNumber),
        this.store.select(selectTotalPages)
      ),
      switchMap(([action, pageNumber, totalPages]) => {
        if (pageNumber >= totalPages) {
          return of();
        }

        this.store.dispatch(UserActions.setLoading({ loading: true }));
        return this.userService.getUsers(pageNumber + 1).pipe(
          map((response) => {
            const { data: users, total_pages: totalPages } = response;
            if (users.length > 0) {
              // Set totalPages only on the first call or when it changes
              if (pageNumber === 1) {
                this.store.dispatch(UserActions.setUsersMeta({ totalPages }));
              }
              return UserActions.moreUsersLoaded({ users });
            } else {
              return UserActions.noMoreUsers();
            }
          }),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        );
      })
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      switchMap((action) => {
        return this.userService
          .createUser({
            ...action.user,
          })
          .pipe(
            map((user) => UserActions.userAdded({ user })),
            catchError((error) => of(UserActions.userAddedFailure({ error })))
          );
      })
    )
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      withLatestFrom(this.store.select(selectSelectedUser)),
      switchMap(([action, selectedUser]) => {
        return this.userService
          .updateUser(selectedUser?.id || 0, action.user)
          .pipe(
            map((updatedUser: any) =>
              UserActions.userUpdated({
                user: updatedUser,
                id: selectedUser?.id,
              })
            ),
            catchError((error) => of(UserActions.userUpdatedFailure({ error })))
          );
      })
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap((action) => {
        return this.userService.deleteUser(action.userId || 0).pipe(
          map(() => UserActions.userDeleted({ userId: action.userId || 0 })),
          catchError((error) => of(UserActions.userDeletedFailure({ error })))
        );
      })
    )
  );

  userAdded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userAdded),
      map(() => setSuccessMessage({ message: "User added successfully" }))
    )
  );
  userDeleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userDeleted),
      map(() => setSuccessMessage({ message: "User deleted successfully" }))
    )
  );
  userUpdated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userUpdated),
      map(() => setSuccessMessage({ message: "User updated successfully" }))
    )
  );

  userAddedFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userAddedFailure),
      map((action) => setErrorMessage({ message: action.error }))
    )
  );
  userDeletedFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userDeletedFailure),
      map((action) => setErrorMessage({ message: action.error }))
    )
  );
  userUpdatedFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userUpdatedFailure),
      map((action) => setErrorMessage({ message: action.error }))
    )
  );

  constructor(
    private actions$: Actions,
    @Inject(USER_SERVICE)
    private userService: UserService,
    private store: Store<AppState>
  ) {}
}
