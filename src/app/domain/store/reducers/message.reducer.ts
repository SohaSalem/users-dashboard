import { createReducer, on } from '@ngrx/store';
import {
  setSuccessMessage,
  clearSuccessMessage,
  setErrorMessage,
  clearErrorMessage,
} from '../actions/message.actions';

export const messageFeatureKey = 'message';

export interface MessageState {
  successMessage: string | null;
  errorMessage: string | null;
}

export const initialState: MessageState = {
  successMessage: null,
  errorMessage: null,
};

export const messageReducer = createReducer(
  initialState,
  on(setSuccessMessage, (state, { message }) => ({
    ...state,
    successMessage: message,
  })),
  on(clearSuccessMessage, (state) => ({ ...state, successMessage: null })),
  on(setErrorMessage, (state, { message }) => ({
    ...state,
    errorMessage: message,
  })),
  on(clearErrorMessage, (state) => ({ ...state, errorMessage: null }))
);
