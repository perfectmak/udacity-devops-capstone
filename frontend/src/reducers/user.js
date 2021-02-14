import { AuthAction } from './auth';

const initalState = {
  accessToken: null,
  refreshToken: null,
  user: {},
};

export const UserActions = {
  Logout: 'User/Logout',
};

export const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case AuthAction.Success:
      const { payload } = action;
      return {
        ...state,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        user: payload.user,
      }
    case UserActions.Logout:
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        user: {},
      }
    default:
      return state;
  }
};
