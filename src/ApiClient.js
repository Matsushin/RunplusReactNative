class ApiClient {
  constructor(user) {
    this.user = user;
  }

  isStaging() {
    return false;
    // return true;
  }

  isLocalhost() {
    return true;
  }

  host() {
    if (this.isStaging()) {
      return 'https://runplus.herokuapp.com';
    }
    if (this.isLocalhost()) {
      // return 'https://runplus.192.168.0.15.xip.io';
      return 'http://runplus.dev';
    }
    return 'https://runplus.jp';
  }

  headers() {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (this.user) {
      headers['X-AUTH-TOKEN'] = this.user.authentication_token;
    } else {
      headers['X-AUTH-TOKEN'] = 'NOT_SIGN_IN';
    }
    return headers;
  }

  requestUrl(path, options) {
    if (options.fullPath) {
      return `${this.host()}${path}`;
    }
    return `${this.host()}/api/v1${path}`;
  }

  requestOptions(options) {
    return Object.assign(options, {
      headers: this.headers(),
    });
  }

  request(path, options = {}) {
    console.log(this.requestUrl(path, options), this.requestOptions(options));
    return fetch(this.requestUrl(path, options), this.requestOptions(options))
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
  }
}

module.exports = ApiClient;
