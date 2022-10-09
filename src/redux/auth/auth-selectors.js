const getIsLoggedIn = state => state.auth.isLoggedIn;

const getUsername = state => state.auth.name;

const getToken = state => state.auth.token;

const getGoogleAvatar = state => state.auth.avatarGoogle;

const getIsLogging = state => state.auth.isLogging;

const getLoginError = state => state.auth.loginError;

const getTrainingStatus = state => state.auth.trainingStatus;

const getTrainingStatusJustCompleted = state => state.auth.trainingStatusJustCompleted;


const authSelectors = {
  getIsLoggedIn,
  getUsername,
  getToken,
  getIsLogging,
  getLoginError,
  getGoogleAvatar,
  getTrainingStatus,
  getTrainingStatusJustCompleted,
};
export default authSelectors;
