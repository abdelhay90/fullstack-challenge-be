import axios from 'axios';

let _token = null;

export default class network {
  constructor(token) {
    this.setToken(token);
  }

  /**
   * set current user token to be used in authentication headers
   * @param token
   */
  setToken = token => {
    if (token) {
      _token = token;
    } else {
      _token = localStorage.getItem('auth_token')
        ? localStorage.getItem('auth_token')
        : null;
    }
  };

  /**
   * get current token
   * @returns {string}
   */
  getToken = () => {
    return _token;
  };

  /**
   * preparing headers with authorization header appended to them
   * @param addHeaders
   * @param noToken
   * @returns {*}
   */
  prepareHeader = (addHeaders, noToken) => {
    let headers = {};
    if (noToken) {
      headers = { ...addHeaders };
    } else {
      headers = { ...addHeaders, Authorization: `Bearer ${_token}` };
    }
    return headers;
  };

  /**
   * custom post request with authorization headers
   * @param url
   * @param data
   * @param additionalHeaders
   * @param noToken
   * @returns {Promise<AxiosResponse<T>>}
   */
  async post(url, data, additionalHeaders = {}, noToken) {
    const headers = this.prepareHeader(additionalHeaders, noToken);
    return await axios.post(url, data, {
      headers,
    });
  }

  /**
   * custom get request with authorization headers
   * @param url
   * @param additionalHeaders
   * @param noToken
   * @returns {Promise<AxiosResponse<T>>}
   */
  async get(url, additionalHeaders = {}, noToken) {
    const headers = this.prepareHeader(additionalHeaders, noToken);
    return await axios.get(url, {
      headers,
    });
  }

  /**
   * custom put request with authorization headers
   * @param url
   * @param data
   * @param additionalHeaders
   * @param noToken
   * @returns {Promise<AxiosResponse<T>>}
   */
  async put(url, data, additionalHeaders = {}, noToken) {
    const headers = this.prepareHeader(additionalHeaders, noToken);
    return await axios.put(url, data, {
      headers,
    });
  }
}
