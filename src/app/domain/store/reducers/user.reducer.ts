import { createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/action-types';
import { User } from '../../models/user.model';

export const userFeatureKey = 'users';

export interface UserState {
  users: Partial<User>[];
  selectedUser?: Partial<User>;
  page: number;
  loading: boolean;
  totalPages: number;
}

export const initialState: UserState = {
  users: [],
  selectedUser: undefined,
  page: 1,
  totalPages: 1,
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.usersLoaded, (state, action) => {
    const { data, total_pages } = action.users;
    return {
      ...state,
      users: [...data],
      page: action.page,
      loading: false,
      totalPages: total_pages,
    };
  }),
  on(UserActions.moreUsersLoaded, (state, action) => {
    return {
      ...state,
      users: [...state.users, ...action.users],
      loading: false,
      page: state.page + 1,
    };
  }),

  on(UserActions.setUsersMeta, (state, { totalPages }) => ({
    ...state,
    totalPages,
  })),

  on(UserActions.loadUsersFailure, (state, action) => ({
    ...state,
    loading: false,
  })),

  on(UserActions.addUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.userAdded, (state, action) => {
    const newUser = {
      ...action.user,
      first_name: action.user.name, // Map `name` to `first_name`
      avatar: 'https://via.placeholder.com/250', // Add default avatar as its not provided when add new user
    };
    return {
      ...state,
      users: [...state.users, newUser],
      loading: false,
    };
  }),
  on(UserActions.userAddedFailure, (state, action) => ({
    ...state,
    loading: false,
  })),

  on(UserActions.updateUser, (state) => ({
    ...state,
    loading: true,
  })),

  on(UserActions.userUpdated, (state, action) => ({
    ...state,
    users: state.users.map((user) =>
      user.id === action.id
        ? {
            ...user,
            first_name: action.user.name ?? user.first_name, // Map `name` to `first_name`
            ...action.user,
          }
        : user
    ),
    loading: false,
  })),
  on(UserActions.userUpdatedFailure, (state, action) => ({
    ...state,
    loading: false,
  })),

  on(UserActions.userDeleted, (state, action) => ({
    ...state,
    users: [
      ...(state.users?.filter((user) => user.id !== action.userId) ?? []),
    ],
    loading: false,
  })),
  on(UserActions.userDeletedFailure, (state, action) => ({
    ...state,
    loading: false,
  })),

  on(UserActions.selectUser, (state, action) => {
    return {
      ...state,
      selectedUser: action.user,
    };
  }),

  on(UserActions.noMoreUsers, (state) => {
    return state;
  }),

  on(UserActions.setLoading, (state, { loading }) => ({
    ...state,
    loading,
  }))
);
