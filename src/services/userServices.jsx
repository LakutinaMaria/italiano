import Keycloak, { KeycloakTokenParsed } from "keycloak-js";
import { CLIENT_ROLES } from "./keycloak/roles";
const _kc = new Keycloak({
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  url: process.env.REACT_APP_KEYCLOAK_URL,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIEN_ID,
});

const initKeycloak = (onAuthenticatedCallback) => {
  _kc
    .init({
      onLoad: "login-required",
      pkceMethod: "S256",
    })
    .then((authenticated) => {
      if (authenticated) {
        onAuthenticatedCallback();
      } else {
        console.log("Not authenticated");
        doLogin();
      }
    });
};

const doLogin = _kc.login;
const doLogout = _kc.logout;
const getToken = () => _kc.token;
const isLoggedIn = () => !!_kc.token;

async function updateToken(successCallback) {
  try {
    await _kc.updateToken(5);
    return successCallback?.();
  } catch (e) {
    doLogin();
    return Promise.reject();
  }
}

// const updateToken = (successCallback) =>
//   _kc.updateToken(5)
//     .then(successCallback)
//     .catch(doLogin);

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
  loadUserProfile,
  loadUserInfo,
  getUserProfile,
  getUserInfo,
  hasRole,
  clearToken,
  isExpired: _kc.isTokenExpired,
  CLIENT_ROLES,
};

export default UserService;
