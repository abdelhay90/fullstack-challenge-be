import axios from 'axios';

// Stored outside class since private
let _accessToken = null;
let _expiresAt = null;

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
  constructor(history) {
    this.history = history;
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.setSession(token);
    }
  }

  login = async ({ username, password }) => {
    const res = await axios.post('/api/auth/signin', {
      name: username,
      password,
    });
    localStorage.setItem('auth_token', res.data.token);
    this.setSession(res.data.token);
  };

  setSession = token => {
    _accessToken = token;
    // set the time that the access token will expire
    _expiresAt = parseJwt(token).exp * 1000;
  };

  isAuthenticated = () => {
    return new Date().getTime() < _expiresAt;
  };

  logout = () => {};

  getAccessToken = () => {
    if (!_accessToken) {
      throw new Error('No access token found.');
    }
    return _accessToken;
  };
}
