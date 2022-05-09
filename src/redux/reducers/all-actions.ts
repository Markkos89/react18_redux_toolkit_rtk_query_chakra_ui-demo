import { usersActions } from "./users/UsersSlice";
import { asyncUserActions } from "./users/ActionCreators";

export const allActions = {
  // usersActions,
  ...usersActions,
  ...asyncUserActions,
};
