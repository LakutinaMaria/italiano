import Keycloak from "keycloak-js";

import { CLIENT_ROLES } from "./keycloak/roles/index.ts";

type AuthenticatedCallback = () => void;
type SuccessCallback = () => void;

const _kc = new Keycloak({
  realm: process.env.REACT_APP_KEYCLOAK_REALM as string,
  url: process.env.REACT_APP_KEYCLOAK_URL as string,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIEN_ID as string,
});

const initKeycloak = (onAuthenticatedCallback: AuthenticatedCallback): void => {
  _kc
    .init({
      onLoad: "login-required",
      pkceMethod: "S256",
    })
    .then((authenticated: boolean) => {
      if (authenticated) {
        onAuthenticatedCallback();
      } else {
        console.log("Not authenticated");
        doLogin();
      }
    });
};

const doLogin = _kc.login.bind(_kc);
const doLogout = _kc.logout.bind(_kc);

const getToken = (): string | undefined => _kc.token;

const isLoggedIn = (): boolean => !!_kc.token;

async function updateToken(successCallback: SuccessCallback): Promise<void> {
  try {
    await _kc.updateToken(5);
    successCallback();
  } catch (e) {
    doLogin();
    return Promise.reject();
  }
}

const getUserId = (): string | null => {
  if (_kc.tokenParsed) {
    return _kc.tokenParsed.sub || null;
  }
  return null;
};

const clearToken = (): void => _kc.clearToken();

const hasRole = (role: string): boolean => _kc.hasResourceRole(role);

const getUserProfile = (): any => _kc.profile;

const getUserInfo = (): any => _kc.userInfo;

const loadUserInfo = (): Promise<any> => _kc.loadUserInfo();

const loadUserProfile = (): Promise<any> => _kc.loadUserProfile();

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
  getUserId,
  CLIENT_ROLES,
};

export default UserService;
