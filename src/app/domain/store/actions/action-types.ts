import * as UserActions from "./user.actions";
import * as MessageActions from "./message.actions";

export { UserActions, MessageActions };

const actionTypes = {
  ...UserActions,
  ...MessageActions,
};

export const allActionTypes = Object.values(actionTypes);
