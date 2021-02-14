import { UserActions } from '../reducers/user';
import { apiClient } from '../api/client';
import { LoginMutation } from '../api/mutations';
import { formatError } from '../util/handle-error';
import { AuthAction } from '../reducers/auth';

export const loginUser = (dispatch) => async (email, password) => {
  dispatch({ type: AuthAction.InProgress, payload: { email, password } });
  apiClient.mutate({
    mutation: LoginMutation,
    variables: { email, password }
  }).then((result) => {
    const data = result.data.login;
    dispatch({ type: AuthAction.Success, payload: {
      user: data.user,
      refreshToken: data.refreshToken,
      accessToken: data.accessToken
    } });
  }).catch((error) => {
    dispatch({ type: AuthAction.Failed, payload: { error: formatError(error) } });
  })
}

export const logoutUser = (dispatch) => async (history) => {
  dispatch({ type: UserActions.Logout });
  history.push('/login');
}


export const userIsLoggedIn = (user) => user.accessToken;