const initalState = {
  inProgress: false,
  error: null,
};

export const AuthAction = {
  InProgress: 'Auth/InProgress',
  Success: 'Auth/Success',
  Failed: 'Auth/Failed',
};

export const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case AuthAction.InProgress:
      return {
        ...state,
        error: null,
        inProgress: true,
      }
    case AuthAction.Success:
      return {
        ...state,
        error: null,
        inProgress: false,
      }
    case AuthAction.Failed:
      return {
        ...state,
        inProgress: false,
        error: action.payload.error,
      }
    case AuthAction.Logout:
      return {
        ...state,
        error: action.payload || null,
      }
    default:
      return state;
  }
};
