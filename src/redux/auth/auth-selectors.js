const getIsLoggedIn = state => state.auth.isLoggedIn;

const getUsername = state => state.auth.name;

const getToken = state => state.auth.token;

const getGoogleAvatar = state => state.auth.avatarGoogle;

const getIsLogging = state => state.auth.isLogging;

const getLoginError = state => state.auth.loginError;

const authSelectors = {
  getIsLoggedIn,
  getUsername,
  getToken,
  getIsLogging,
  getLoginError,
  getGoogleAvatar,
};
export default authSelectors;
