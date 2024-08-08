import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { UserState, userFeatureKey, userReducer } from './user.reducer';
import { MessageState, messageFeatureKey, messageReducer } from './message.reducer';

export interface AppState {
  [userFeatureKey]: UserState;
  [messageFeatureKey]: MessageState;
}

export const reducers: ActionReducerMap<AppState> = {
  [userFeatureKey]: userReducer,
  [messageFeatureKey]: messageReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];
