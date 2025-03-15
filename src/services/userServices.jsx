import Keycloak, { KeycloakTokenParsed } from "keycloak-js";

const _kc = new Keycloak({
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  url: process.env.REACT_APP_KEYCLOAK_URL,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIEN_ID,
});

const initKeycloak = (onAuthenticatedCallback) => {
  if (process.env.REACT_APP_ENABLE_AUTH !== "false") {
    _kc
      .init({
        onLoad: "login-required",
        pkceMethod: "S256",
        enableLogging: process.env.NODE_ENV === "development" ? true : false,
      })
      .then(() => {
        onAuthenticatedCallback();
      });
  } else {
    onAuthenticatedCallback();
  }
};

const doLogin = _kc.login();
const doLogout = _kc.logout();
const getToken = () => _kc.getToken;
const isLoggedIn = () => !!_kc.getToken;

async function updateToken(successCallback) {
  try {
    await _kc.updateToken(5);
    return successCallback?.();
  } catch (e) {
    doLogin();
    return Promise.reject();
  }
}

const clearToken = () => _kc.clearToken();
const hasRole = (role) => _kc.hasResourceRole(role);
const getUserProfile = () => _kc.profile;
const getUserInfo = () => _kc.userInfo;
const loadUserInfo = () => _kc.loadUserInfo();
const loadUserProfile = () => _kc.loadUserProfile();

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
};
