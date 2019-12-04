import { urls } from '../common/constants';

// Stored outside class since private
let _accessToken = null;
let _expiresAt = null;
let _network = null;
export const parseJwt = token => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(c => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export default class Auth {
  constructor(history, network) {
    _network = network;
    this.history = history;
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.setSession(token);
    }
  }

  /**
   * login with username and password, throws error if failed
   * @param username
   * @param password
   * @returns {Promise<void>}
   */
  login = async ({ username, password }) => {
    try {
      const res = await _network.post(urls.SIGN_IN(), {
        name: username,
        password,
      });
      this.setSession(res.data.token);
      localStorage.setItem('auth_token', res.data.token);
    } catch (e) {
      throw new Error('Bad Authentication');
    }
  };

  /**
   * set session token and expiration date
   * @param token
   */
  setSession = token => {
    _accessToken = token;
    _network.setToken(token);
    // set the time that the access token will expire
    _expiresAt = parseJwt(token).exp * 1000;
  };

  /**
   * check if the current user is authenticated or not
   * @returns {boolean}
   */
  isAuthenticated = () => {
    return new Date().getTime() < _expiresAt;
  };

  /**
   * logout and clear session data
   */
  logout = () => {
    localStorage.removeItem('auth_token');
    _expiresAt = null;
    _accessToken = null;
  };

  /**
   * get current user access token
   * @returns {null}
   */
  getAccessToken = () => {
    if (!_accessToken) {
      throw new Error('No access token found.');
    }
    return _accessToken;
  };
}
