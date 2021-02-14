import ApolloClient from 'apollo-boost';
import { UserActions } from '../reducers/user';

/**
 * @type ApolloClient
 */
export let apiClient;

const HOST = process.env.REACT_APP_API_URL || 'http://localhost:9797';

export const buildApiClient = (store, history) => {
  apiClient = new ApolloClient({
    uri: `${HOST}/graphql`,
    request: (operation) => {
      const state = store.getState();
      if (state.user.accessToken) {
        operation.setContext({
          headers: {
            authorization: `Bearer ${state.user.accessToken}`,
          },
        })
      }
    },
    onError: (error) => {
      if (error.graphQLErrors && error.graphQLErrors.length !== 0) {
        const firstError = error.graphQLErrors[0];
        if (firstError.extensions.code === "UNAUTHENTICATED" && firstError.path !== 'login') {
          // not authenticated for request redirect to login
          const redirectPath = `${history.location.pathname}${history.location.search}`;
          store.dispatch({ type: UserActions.Logout, payload: firstError.message });
          history.push(`/login?redirectTo=${encodeURIComponent(redirectPath)}`);
        }
      }
    }
  });

  return apiClient;
}
