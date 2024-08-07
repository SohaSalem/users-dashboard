import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers/app.reducer';
import { UserState } from '../reducers/user.reducer';

export const selectUserState = (state: AppState) => state.users;

export const selectUsers = createSelector(
  selectUserState,
  (userState: UserState) => {
    return userState.users;
  }
);

export const selectPageNumber = createSelector(
  selectUserState,
  (state: UserState) => state.page
);

export const selectTotalPages = createSelector(
  selectUserState,
  (state: UserState) => state.totalPages
);

export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectSelectedUser = createSelector(
  selectUserState,
  (userState: UserState) => {
    return userState.selectedUser;
  }
);
