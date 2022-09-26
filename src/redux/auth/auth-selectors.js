const getIsLoggedIn = state => state.auth.isLoggedIn;

const getUsername = state => state.auth.user.name;

const getToken = state => state.auth.token;

const getIsLogging = state => state.auth.isLogging;

const getLoginError = state => state.auth.loginError;

const authSelectors = {
  getIsLoggedIn,
  getUsername,
  getToken,
  getIsLogging,
  getLoginError,
};
export default authSelectors;
