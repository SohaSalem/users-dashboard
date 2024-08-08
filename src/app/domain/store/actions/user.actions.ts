import { createAction, props } from "@ngrx/store";
import {
  PaginatedUserResponse,
  User,
  UserCreateRequest,
  UserCreateResponse,
} from "../../models/user.model";

export const loadUsers = createAction(
  "[User List] Load Users",
  props<{ page: number }>()
);

export const usersLoaded = createAction(
  "[Load Users Effect] Users Loaded",
  props<{ users: PaginatedUserResponse; page: number }>()
);

export const loadUsersFailure = createAction(
  "[Load Users Effect] Load Users Failure",
  props<{ error: string }>()
);

export const loadMoreUsers = createAction("[User List] Load More Users");

export const moreUsersLoaded = createAction(
  "[Load More Users Effect] More Users Loaded",
  props<{ users: User[] }>()
);

export const setUsersMeta = createAction(
  "[User API] Set Users Meta",
  props<{ totalPages: number }>()
);

export const setLoading = createAction(
  "[User List] Set Loading",
  props<{ loading: boolean }>()
);

export const addUser = createAction(
  "[User Page] Add User",
  props<{ user: UserCreateRequest }>()
);

export const userAdded = createAction(
  "[Add User Effect] User Added",
  props<{ user: Partial<UserCreateResponse> }>()
);

export const userAddedFailure = createAction(
  "[Add User Effect] Add User Failure",
  props<{ error: string }>()
);

export const selectUser = createAction(
  "[User Page] Select User",
  props<{ user: Partial<User> }>()
);

export const loadUserById = createAction(
  "[User] Load User By Id",
  props<{ userId: number }>()
);

export const loadUserByIdSuccess = createAction(
  "[User] Load User By Id Success",
  props<{ user: Partial<User> }>()
);

export const loadUserByIdFailure = createAction(
  "[User] Load User By Id Failure",
  props<{ error: any }>()
);

export const noMoreUsers = createAction("[User List] No More Users");
