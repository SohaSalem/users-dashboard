import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers/app.reducer';
import { MessageState } from '../reducers/message.reducer';

export const selectMessageState = (state: AppState) => state.message;

export const selectSuccessMessage = createSelector(
  selectMessageState,
  (state: MessageState) => state.successMessage
);

export const selectErrorMessage = createSelector(
  selectMessageState,
  (state: MessageState) => state.errorMessage
);
