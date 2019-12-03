import axios from 'axios';

let _token = null;

export default class network {
  constructor(token) {
    this.setToken(token);
  }

  setToken = token => {
    if (token) {
      _token = token;
    } else {
      _token = localStorage.getItem('auth_token')
        ? localStorage.getItem('auth_token')
        : null;
    }
  };

  getToken = () => {
    return _token;
  };

  prepareHeader = (addHeaders, noToken) => {
    let headers = {};
    if (noToken) {
      headers = { ...addHeaders };
    } else {
      headers = { ...addHeaders, Authorization: `Bearer ${_token}` };
    }
    return headers;
  };

  async post(url, data, additionalHeaders = {}, noToken) {
    const headers = this.prepareHeader(additionalHeaders, noToken);
    return await axios.post(url, data, {
      headers,
    });
  }

  async get(url, additionalHeaders = {}, noToken) {
    const headers = this.prepareHeader(additionalHeaders, noToken);
    return await axios.get(url, {
      headers,
    });
  }
}
