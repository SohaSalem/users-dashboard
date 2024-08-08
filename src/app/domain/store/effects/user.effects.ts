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
  selectTotalPages,
  selectUsers,
} from "../selectors/user.selectors";
import { setErrorMessage, setSuccessMessage } from "../actions/message.actions";

const cache = new Map<string, any>();

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      withLatestFrom(this.store.select(selectUsers)),
      switchMap(([action, users]) => {
        const page = action.page;
        const cacheKey = JSON.stringify(action);

        if (cache.has(cacheKey)) {
          const cachedResponse = cache.get(cacheKey);
          return of(UserActions.usersLoaded({ users: cachedResponse, page }));
        } else {
          this.store.dispatch(UserActions.setLoading({ loading: true }));
          return this.userService.getUsers(page).pipe(
            map((users) => {
              cache.set(cacheKey, users);
              return UserActions.usersLoaded({ users, page });
            }),
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

        const cacheKey = `loadMoreUsers-${pageNumber + 1}`;

        if (cache.has(cacheKey)) {
          const cachedResponse = cache.get(cacheKey);
          return of(UserActions.moreUsersLoaded({ users: cachedResponse }));
        } else {
          this.store.dispatch(UserActions.setLoading({ loading: true }));
          return this.userService.getUsers(pageNumber + 1).pipe(
            map((response) => {
              const { data: users, total_pages: totalPages } = response;
              cache.set(cacheKey, users);

              if (users.length > 0) {
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
        }
      })
    )
  );

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserById),
      switchMap((action) => {
        const cacheKey = `user-${action.userId}`;

        if (cache.has(cacheKey)) {
          const cachedUser = cache.get(cacheKey);
          return of(UserActions.loadUserByIdSuccess({ user: cachedUser }));
        } else {
          return this.userService.getUserById(action.userId).pipe(
            map((user) => {
              cache.set(cacheKey, user);
              return UserActions.loadUserByIdSuccess({ user });
            }),
            catchError((error) =>
              of(UserActions.loadUserByIdFailure({ error }))
            )
          );
        }
      })
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      switchMap((action) => {
        return this.userService.createUser({ ...action.user }).pipe(
          map((user) => UserActions.userAdded({ user })),
          catchError((error) => of(UserActions.userAddedFailure({ error })))
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

  userAddedFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userAddedFailure),
      map((action) => setErrorMessage({ message: action.error }))
    )
  );

  constructor(
    private actions$: Actions,
    @Inject(USER_SERVICE) private userService: UserService,
    private store: Store<AppState>
  ) {}
}
