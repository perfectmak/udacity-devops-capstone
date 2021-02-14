export const formatError = (error) => {
  let errorMessage = error.message;
  if (error.graphQLErrors && error.graphQLErrors.length !== 0) {
    errorMessage = error.graphQLErrors[0].message;
  }

  if (error.networkError) {
    // console.log('network', error.networkError);
  }

  if (errorMessage.includes('Failed to fetch')) {
    errorMessage = 'Cannot connect to server. Try reloading page.';
  }

  return errorMessage;
}