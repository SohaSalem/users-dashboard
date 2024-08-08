import { createAction, props } from '@ngrx/store';

export const setSuccessMessage = createAction(
  '[Message] Set Success Message',
  props<{ message: string }>()
);

export const clearSuccessMessage = createAction(
  '[Message] Clear Success Message'
);

export const setErrorMessage = createAction(
  '[Message] Set Error Message',
  props<{ message: string }>()
);

export const clearErrorMessage = createAction('[Message] Clear Error Message');
