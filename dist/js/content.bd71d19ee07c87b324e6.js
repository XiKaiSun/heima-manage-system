/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./page/content/index.css"
/*!********************************!*\
  !*** ./page/content/index.css ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./utils/alert.js"
/*!************************!*\
  !*** ./utils/alert.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   myAlert: () => (/* binding */ myAlert)
/* harmony export */ });
// 弹窗插件
// 需要先准备 alert 样式相关的 DOM
/**
 * BS 的 Alert 警告框函数，2秒后自动消失
 * @param {*} isSuccess 成功 true，失败 false
 * @param {*} msg 提示消息
 */
 function myAlert(isSuccess, msg) {
  const myAlert = document.querySelector('.alert')
  myAlert.classList.add(isSuccess ? 'alert-success' : 'alert-danger')
  myAlert.innerHTML = msg
  myAlert.classList.add('show')

  setTimeout(() => {
    myAlert.classList.remove(isSuccess ? 'alert-success' : 'alert-danger')
    myAlert.innerHTML = ''
    myAlert.classList.remove('show')
  }, 2000)
}

/***/ },

/***/ "./utils/auth.js"
/*!***********************!*\
  !*** ./utils/auth.js ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   auth: () => (/* binding */ auth)
/* harmony export */ });
/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/request.js */ "./utils/request.js");

function auth() {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html"
    }
}

function saveToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
}

logout();
function logout() {
    document.querySelector(".quit").addEventListener("click", function () {
        localStorage.removeItem("token");
        location.reload()
    })
}
getProfile()
function getProfile() {
    ;(0,_request_js__WEBPACK_IMPORTED_MODULE_0__.axios)({
        url: "/v1_0/user/profile"
    }).then(r => {
        console.log(r)
        document.querySelector(".nick-name").innerHTML = "昵称 " + r.data.data.name;
    })
}


/***/ },

/***/ "./utils/request.js"
/*!**************************!*\
  !*** ./utils/request.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   axios: () => (/* reexport safe */ axios__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");


axios__WEBPACK_IMPORTED_MODULE_0__["default"].defaults.baseURL = "https://geek.itheima.net/";
axios__WEBPACK_IMPORTED_MODULE_0__["default"].interceptors.request.use(config => {
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).token : "";
    if (token) {
        config.headers.Authorization = `Bears ${token}`;
    }
    return config
})

axios__WEBPACK_IMPORTED_MODULE_0__["default"].interceptors.response.use(null, error => {
    if (error.response.status === 401) {
        window.localStorage.getItem("token") && window.localStorage.removeItem("token");
        myAlert(false, "身份验证失败")
        setTimeout(() => {
            location.href = "./../login/"
        }, 2000)
    }
    throw error
})

/***/ },

/***/ "./node_modules/axios/lib/adapters/adapters.js"
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/adapters/adapters.js ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _http_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./http.js */ "./node_modules/axios/lib/helpers/null.js");
/* harmony import */ var _xhr_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./xhr.js */ "./node_modules/axios/lib/adapters/xhr.js");
/* harmony import */ var _fetch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fetch.js */ "./node_modules/axios/lib/adapters/fetch.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");






/**
 * Known adapters mapping.
 * Provides environment-specific adapters for Axios:
 * - `http` for Node.js
 * - `xhr` for browsers
 * - `fetch` for fetch API-based requests
 *
 * @type {Object<string, Function|Object>}
 */
const knownAdapters = {
  http: _http_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  xhr: _xhr_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  fetch: {
    get: _fetch_js__WEBPACK_IMPORTED_MODULE_3__.getFetch,
  },
};

// Assign adapter names for easier debugging and identification
_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      // Null-proto descriptors so a polluted Object.prototype.get cannot turn
      // these data descriptors into accessor descriptors on the way in.
      Object.defineProperty(fn, 'name', { __proto__: null, value });
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', { __proto__: null, value });
  }
});

/**
 * Render a rejection reason string for unknown or unsupported adapters
 *
 * @param {string} reason
 * @returns {string}
 */
const renderReason = (reason) => `- ${reason}`;

/**
 * Check if the adapter is resolved (function, null, or false)
 *
 * @param {Function|null|false} adapter
 * @returns {boolean}
 */
const isResolvedHandle = (adapter) =>
  _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(adapter) || adapter === null || adapter === false;

/**
 * Get the first suitable adapter from the provided list.
 * Tries each adapter in order until a supported one is found.
 * Throws an AxiosError if no adapter is suitable.
 *
 * @param {Array<string|Function>|string|Function} adapters - Adapter(s) by name or function.
 * @param {Object} config - Axios request configuration
 * @throws {AxiosError} If no suitable adapter is available
 * @returns {Function} The resolved adapter function
 */
function getAdapter(adapters, config) {
  adapters = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(adapters) ? adapters : [adapters];

  const { length } = adapters;
  let nameOrAdapter;
  let adapter;

  const rejectedReasons = {};

  for (let i = 0; i < length; i++) {
    nameOrAdapter = adapters[i];
    let id;

    adapter = nameOrAdapter;

    if (!isResolvedHandle(nameOrAdapter)) {
      adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

      if (adapter === undefined) {
        throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_4__["default"](`Unknown adapter '${id}'`);
      }
    }

    if (adapter && (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(adapter) || (adapter = adapter.get(config)))) {
      break;
    }

    rejectedReasons[id || '#' + i] = adapter;
  }

  if (!adapter) {
    const reasons = Object.entries(rejectedReasons).map(
      ([id, state]) =>
        `adapter ${id} ` +
        (state === false ? 'is not supported by the environment' : 'is not available in the build')
    );

    let s = length
      ? reasons.length > 1
        ? 'since :\n' + reasons.map(renderReason).join('\n')
        : ' ' + renderReason(reasons[0])
      : 'as no adapter specified';

    throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_4__["default"](
      `There is no suitable adapter to dispatch the request ` + s,
      _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_4__["default"].ERR_NOT_SUPPORT
    );
  }

  return adapter;
}

/**
 * Exports Axios adapters and utility to resolve an adapter
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter,

  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: knownAdapters,
});


/***/ },

/***/ "./node_modules/axios/lib/adapters/fetch.js"
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/adapters/fetch.js ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getFetch: () => (/* binding */ getFetch)
/* harmony export */ });
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _helpers_composeSignals_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/composeSignals.js */ "./node_modules/axios/lib/helpers/composeSignals.js");
/* harmony import */ var _helpers_trackStream_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/trackStream.js */ "./node_modules/axios/lib/helpers/trackStream.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/progressEventReducer.js */ "./node_modules/axios/lib/helpers/progressEventReducer.js");
/* harmony import */ var _helpers_resolveConfig_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers/resolveConfig.js */ "./node_modules/axios/lib/helpers/resolveConfig.js");
/* harmony import */ var _core_settle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/settle.js */ "./node_modules/axios/lib/core/settle.js");
/* harmony import */ var _helpers_estimateDataURLDecodedBytes_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../helpers/estimateDataURLDecodedBytes.js */ "./node_modules/axios/lib/helpers/estimateDataURLDecodedBytes.js");
/* harmony import */ var _env_data_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../env/data.js */ "./node_modules/axios/lib/env/data.js");
/* harmony import */ var _helpers_sanitizeHeaderValue_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../helpers/sanitizeHeaderValue.js */ "./node_modules/axios/lib/helpers/sanitizeHeaderValue.js");













const DEFAULT_CHUNK_SIZE = 64 * 1024;

const DEFAULT_REQUEST_OPTIONS = {
  cache: 'default',
  redirect: 'follow',
  referrer: 'about:client',
  referrerPolicy: '',
  mode: 'cors',
  integrity: '',
  keepalive: false,
  priority: 'auto',
  window: null,
};

const { isFunction } = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"];

/**
 * Encode a UTF-8 string to a Latin-1 byte string for use with btoa().
 * This is a modern replacement for the deprecated unescape(encodeURIComponent(str)) pattern.
 *
 * @param {string} str The string to encode
 *
 * @returns {string} UTF-8 bytes as a Latin-1 string
 */
const encodeUTF8 = (str) =>
  encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );

// Node's WHATWG URL parser returns `username` and `password` percent-encoded.
// Decode before composing the `auth` option so credentials such as
// `my%40email.com:pass` are sent as `my@email.com:pass`. Falls back to the
// original value for malformed input so a bad encoding never throws.
const decodeURIComponentSafe = (value) => {
  if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(value)) {
    return value;
  }

  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
};

const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};

const maybeWithAuthCredentials = (url) => {
  const protocolIndex = url.indexOf('://');
  let urlToCheck = url;
  if (protocolIndex !== -1) {
    urlToCheck = urlToCheck.slice(protocolIndex + 3);
  }
  return urlToCheck.includes('@') || urlToCheck.includes(':');
};

const factory = (env) => {
  const globalObject =
    _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].global !== undefined && _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].global !== null ? _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].global : globalThis;
  const { ReadableStream, TextEncoder } = globalObject;

  env = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].merge.call(
    {
      skipUndefined: true,
    },
    {
      Request: globalObject.Request,
      Response: globalObject.Response,
    },
    env
  );

  const { fetch: envFetch, Request, Response } = env;
  const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === 'function';
  const isRequestSupported = isFunction(Request);
  const isResponseSupported = isFunction(Response);

  if (!isFetchSupported) {
    return false;
  }

  const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream);

  const encodeText =
    isFetchSupported &&
    (typeof TextEncoder === 'function'
      ? (
          (encoder) => (str) =>
            encoder.encode(str)
        )(new TextEncoder())
      : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));

  const supportsRequestStream =
    isRequestSupported &&
    isReadableStreamSupported &&
    test(() => {
      let duplexAccessed = false;

      const request = new Request(_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].origin, {
        body: new ReadableStream(),
        method: 'POST',
        get duplex() {
          duplexAccessed = true;
          return 'half';
        },
      });

      const hasContentType = request.headers.has('Content-Type');

      if (request.body != null) {
        request.body.cancel();
      }

      return duplexAccessed && !hasContentType;
    });

  const supportsResponseStream =
    isResponseSupported &&
    isReadableStreamSupported &&
    test(() => _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isReadableStream(new Response('').body));

  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body),
  };

  isFetchSupported &&
    (() => {
      ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach((type) => {
        !resolvers[type] &&
          (resolvers[type] = (res, config) => {
            let method = res && res[type];

            if (method) {
              return method.call(res);
            }

            throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"](
              `Response type '${type}' is not supported`,
              _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].ERR_NOT_SUPPORT,
              config
            );
          });
      });
    })();

  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isBlob(body)) {
      return body.size;
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isSpecCompliantForm(body)) {
      const _request = new Request(_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].origin, {
        method: 'POST',
        body,
      });
      return (await _request.arrayBuffer()).byteLength;
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArrayBufferView(body) || _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArrayBuffer(body)) {
      return body.byteLength;
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isURLSearchParams(body)) {
      body = body + '';
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };

  const resolveBodyLength = async (headers, body) => {
    const length = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].toFiniteNumber(headers.getContentLength());

    return length == null ? getBodyLength(body) : length;
  };

  return async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = 'same-origin',
      fetchOptions,
      maxContentLength,
      maxBodyLength,
      maxRedirects,
    } = (0,_helpers_resolveConfig_js__WEBPACK_IMPORTED_MODULE_7__["default"])(config);

    const hasMaxContentLength = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isNumber(maxContentLength) && maxContentLength > -1;
    const hasMaxBodyLength = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isNumber(maxBodyLength) && maxBodyLength > -1;
    const own = (key) => (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].hasOwnProp(config, key) ? config[key] : undefined);

    let _fetch = envFetch || fetch;

    responseType = responseType ? (responseType + '').toLowerCase() : 'text';

    let composedSignal = (0,_helpers_composeSignals_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
      [signal, cancelToken && cancelToken.toAbortSignal()],
      timeout
    );

    let request = null;

    const unsubscribe =
      composedSignal &&
      composedSignal.unsubscribe &&
      (() => {
        composedSignal.unsubscribe();
      });

    let requestContentLength;

    // AxiosError we raise while the request body is being streamed. Captured
    // by identity so the catch block can surface it directly, regardless of
    // how the runtime wraps the resulting fetch rejection (undici exposes it
    // as `err.cause`; some browsers drop the original error entirely).
    let pendingBodyError = null;

    const maxBodyLengthError = () =>
      new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"](
        'Request body larger than maxBodyLength limit',
        _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].ERR_BAD_REQUEST,
        config,
        request
      );

    try {
      // HTTP basic authentication
      let auth = undefined;
      const configAuth = own('auth');

      if (configAuth) {
        const username = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSafeProp(configAuth, 'username') || '';
        const password = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSafeProp(configAuth, 'password') || '';
        auth = {
          username,
          password,
        };
      }

      if (maybeWithAuthCredentials(url)) {
        const parsedURL = new URL(url, _platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].origin);

        if (!auth && (parsedURL.username || parsedURL.password)) {
          const urlUsername = decodeURIComponentSafe(parsedURL.username);
          const urlPassword = decodeURIComponentSafe(parsedURL.password);
          auth = {
            username: urlUsername,
            password: urlPassword,
          };
        }

        if (parsedURL.username || parsedURL.password) {
          parsedURL.username = '';
          parsedURL.password = '';
          url = parsedURL.href;
        }
      }

      if (auth) {
        headers.delete('authorization');
        headers.set(
          'Authorization',
          'Basic ' + btoa(encodeUTF8((auth.username || '') + ':' + (auth.password || '')))
        );
      }

      // Enforce maxContentLength for data: URLs up-front so we never materialize
      // an oversized payload. The HTTP adapter applies the same check (see http.js
      // "if (protocol === 'data:')" branch).
      if (hasMaxContentLength && typeof url === 'string' && url.startsWith('data:')) {
        const estimated = (0,_helpers_estimateDataURLDecodedBytes_js__WEBPACK_IMPORTED_MODULE_9__["default"])(url);
        if (estimated > maxContentLength) {
          throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"](
            'maxContentLength size of ' + maxContentLength + ' exceeded',
            _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].ERR_BAD_RESPONSE,
            config,
            request
          );
        }
      }

      // Enforce maxBodyLength against known-size bodies before dispatch using
      // the body's *actual* size — never a caller-declared Content-Length,
      // which could under-report to slip an oversized body past the check.
      // Unknown-size streams return undefined here and are counted per-chunk
      // below as fetch consumes them.
      if (hasMaxBodyLength && method !== 'get' && method !== 'head') {
        const outboundLength = await getBodyLength(data);
        if (typeof outboundLength === 'number' && isFinite(outboundLength)) {
          requestContentLength = outboundLength;
          if (outboundLength > maxBodyLength) {
            throw maxBodyLengthError();
          }
        }
      }

      // A streamed body under maxBodyLength must be counted as fetch consumes
      // it; its size is never trusted from a caller-declared Content-Length.
      const mustEnforceStreamBody =
        hasMaxBodyLength && (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isReadableStream(data) || _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isStream(data));

      const trackRequestStream = (stream, onProgress, flush) =>
        (0,_helpers_trackStream_js__WEBPACK_IMPORTED_MODULE_4__.trackStream)(
          stream,
          DEFAULT_CHUNK_SIZE,
          (loadedBytes) => {
            if (hasMaxBodyLength && loadedBytes > maxBodyLength) {
              throw (pendingBodyError = maxBodyLengthError());
            }
            onProgress && onProgress(loadedBytes);
          },
          flush
        );

      if (
        supportsRequestStream &&
        method !== 'get' &&
        method !== 'head' &&
        (onUploadProgress || mustEnforceStreamBody)
      ) {
        requestContentLength =
          requestContentLength == null
            ? await resolveBodyLength(headers, data)
            : requestContentLength;

        // A declared length of 0 is only trusted to skip the wrap when we are
        // not enforcing a stream limit (which must not rely on that header).
        if (requestContentLength !== 0 || mustEnforceStreamBody) {
          let _request = new Request(url, {
            method: 'POST',
            body: data,
            duplex: 'half',
          });

          let contentTypeHeader;

          if (
            _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFormData(data) &&
            (contentTypeHeader = _request.headers.get('content-type'))
          ) {
            headers.setContentType(contentTypeHeader);
          }

          if (_request.body) {
            const [onProgress, flush] =
              (onUploadProgress &&
                (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__.progressEventDecorator)(
                  requestContentLength,
                  (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__.progressEventReducer)((0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__.asyncDecorator)(onUploadProgress))
                )) ||
              [];

            data = trackRequestStream(_request.body, onProgress, flush);
          }
        }
      } else if (
        mustEnforceStreamBody &&
        !isRequestSupported &&
        isReadableStreamSupported &&
        method !== 'get' &&
        method !== 'head'
      ) {
        data = trackRequestStream(data);
      } else if (
        mustEnforceStreamBody &&
        isRequestSupported &&
        !supportsRequestStream &&
        method !== 'get' &&
        method !== 'head'
      ) {
        throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"](
          'Stream request bodies are not supported by the current fetch implementation',
          _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].ERR_NOT_SUPPORT,
          config,
          request
        );
      }

      if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(withCredentials)) {
        withCredentials = withCredentials ? 'include' : 'omit';
      }

      // Cloudflare Workers throws when credentials are defined
      // see https://github.com/cloudflare/workerd/issues/902
      const isCredentialsSupported = isRequestSupported && 'credentials' in Request.prototype;

      // If data is FormData and Content-Type is multipart/form-data without boundary,
      // delete it so fetch can set it correctly with the boundary
      if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFormData(data)) {
        const contentType = headers.getContentType();
        if (
          contentType &&
          /^multipart\/form-data/i.test(contentType) &&
          !/boundary=/i.test(contentType)
        ) {
          headers.delete('content-type');
        }
      }

      // Set User-Agent header if not already set (fetch defaults to 'node' in Node.js)
      headers.set('User-Agent', 'axios/' + _env_data_js__WEBPACK_IMPORTED_MODULE_10__.VERSION, false);

      const safeFetchOptions =
        fetchOptions == null ? fetchOptions : Object.assign(Object.create(null), fetchOptions);

      if (safeFetchOptions) {
        // These options are owned by Axios and are already reflected in the
        // resolved Request passed to fetch.
        delete safeFetchOptions.body;
        delete safeFetchOptions.headers;
        delete safeFetchOptions.method;
        delete safeFetchOptions.signal;
        delete safeFetchOptions.duplex;
        delete safeFetchOptions.credentials;
      }

      const resolvedOptions = Object.assign(Object.create(null), safeFetchOptions, {
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: (0,_helpers_sanitizeHeaderValue_js__WEBPACK_IMPORTED_MODULE_11__.toByteStringHeaderObject)(headers.normalize()),
        body: data,
        duplex: 'half',
        credentials: isCredentialsSupported ? withCredentials : undefined,
      });

      if (isRequestSupported) {
        _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].forEach(DEFAULT_REQUEST_OPTIONS, (value, key) => {
          if (resolvedOptions[key] === undefined) {
            resolvedOptions[key] = value;
          }
        });

        if (resolvedOptions.signal === undefined) {
          resolvedOptions.signal = null;
        }

        if (resolvedOptions.body === undefined) {
          resolvedOptions.body = null;
        }
      }

      if (maxRedirects === 0) {
        resolvedOptions.redirect = 'manual';

        if (safeFetchOptions) {
          safeFetchOptions.redirect = 'manual';
        }
      }

      request = isRequestSupported && new Request(url, resolvedOptions);

      let response = await (isRequestSupported
        ? _fetch(request, safeFetchOptions)
        : _fetch(url, resolvedOptions));

      const responseHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_5__["default"].from(response.headers);

      // Cheap pre-check: if the server honestly declares a content-length that
      // already exceeds the cap, reject before we start streaming.
      if (hasMaxContentLength) {
        const declaredLength = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].toFiniteNumber(responseHeaders.getContentLength());
        if (declaredLength != null && declaredLength > maxContentLength) {
          throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"](
            'maxContentLength size of ' + maxContentLength + ' exceeded',
            _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].ERR_BAD_RESPONSE,
            config,
            request
          );
        }
      }

      const isStreamResponse =
        supportsResponseStream && (responseType === 'stream' || responseType === 'response');

      if (
        supportsResponseStream &&
        response.body &&
        (onDownloadProgress || hasMaxContentLength || (isStreamResponse && unsubscribe))
      ) {
        const options = {};

        ['status', 'statusText', 'headers'].forEach((prop) => {
          options[prop] = response[prop];
        });

        const responseContentLength = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].toFiniteNumber(responseHeaders.getContentLength());

        const [onProgress, flush] =
          (onDownloadProgress &&
            (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__.progressEventDecorator)(
              responseContentLength,
              (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__.progressEventReducer)((0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_6__.asyncDecorator)(onDownloadProgress), true)
            )) ||
          [];

        let bytesRead = 0;
        const onChunkProgress = (loadedBytes) => {
          if (hasMaxContentLength) {
            bytesRead = loadedBytes;
            if (bytesRead > maxContentLength) {
              throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"](
                'maxContentLength size of ' + maxContentLength + ' exceeded',
                _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].ERR_BAD_RESPONSE,
                config,
                request
              );
            }
          }
          onProgress && onProgress(loadedBytes);
        };

        response = new Response(
          (0,_helpers_trackStream_js__WEBPACK_IMPORTED_MODULE_4__.trackStream)(response.body, DEFAULT_CHUNK_SIZE, onChunkProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }

      responseType = responseType || 'text';

      let responseData = await resolvers[_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].findKey(resolvers, responseType) || 'text'](
        response,
        config
      );

      // Fallback enforcement for environments without ReadableStream support
      // (legacy runtimes). Detect materialized size from typed output; skip
      // streams/Response passthrough since the user will read those themselves.
      if (hasMaxContentLength && !supportsResponseStream && !isStreamResponse) {
        let materializedSize;
        if (responseData != null) {
          if (typeof responseData.byteLength === 'number') {
            materializedSize = responseData.byteLength;
          } else if (typeof responseData.size === 'number') {
            materializedSize = responseData.size;
          } else if (typeof responseData === 'string') {
            materializedSize =
              typeof TextEncoder === 'function'
                ? new TextEncoder().encode(responseData).byteLength
                : responseData.length;
          }
        }
        if (typeof materializedSize === 'number' && materializedSize > maxContentLength) {
          throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"](
            'maxContentLength size of ' + maxContentLength + ' exceeded',
            _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].ERR_BAD_RESPONSE,
            config,
            request
          );
        }
      }

      !isStreamResponse && unsubscribe && unsubscribe();

      return await new Promise((resolve, reject) => {
        (0,_core_settle_js__WEBPACK_IMPORTED_MODULE_8__["default"])(resolve, reject, {
          data: responseData,
          headers: _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_5__["default"].from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request,
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();

      // Safari can surface fetch aborts as a DOMException-like object whose
      // branded getters throw. Prefer our composed signal reason before reading
      // the caught error, preserving timeout vs cancellation semantics.
      if (composedSignal && composedSignal.aborted && composedSignal.reason instanceof _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
        const canceledError = composedSignal.reason;
        canceledError.config = config;
        request && (canceledError.request = request);
        if (err !== canceledError) {
          // Non-enumerable to match native Error `cause` semantics so loggers
          // don't recurse into circular fetch internals (see #7205).
          Object.defineProperty(canceledError, 'cause', {
            __proto__: null,
            value: err,
            writable: true,
            enumerable: false,
            configurable: true,
          });
        }
        throw canceledError;
      }

      // Surface a maxBodyLength violation we raised while the request body was
      // being streamed. Matching by identity (rather than reading
      // `err.cause.isAxiosError`) keeps the error deterministic across runtimes
      // and avoids both prototype-pollution reads and mis-attributing a foreign
      // AxiosError that merely happened to land in `err.cause`.
      if (pendingBodyError) {
        request && !pendingBodyError.request && (pendingBodyError.request = request);
        throw pendingBodyError;
      }

      // Re-throw AxiosErrors we raised synchronously (data: URL / content-length
      // pre-checks, response size enforcement) without re-wrapping them.
      if (err instanceof _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
        request && !err.request && (err.request = request);
        throw err;
      }

      if (err && err.name === 'TypeError' && /Load failed|fetch/i.test(err.message)) {
        const networkError = new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"](
          'Network Error',
          _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].ERR_NETWORK,
          config,
          request,
          err && err.response
        );
        // Non-enumerable to match native Error `cause` semantics so loggers
        // don't recurse into circular fetch internals (see #7205).
        Object.defineProperty(networkError, 'cause', {
          __proto__: null,
          value: err.cause || err,
          writable: true,
          enumerable: false,
          configurable: true,
        });
        throw networkError;
      }

      throw _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].from(err, err && err.code, config, request, err && err.response);
    }
  };
};

const seedCache = new Map();

const getFetch = (config) => {
  let env = (config && config.env) || {};
  const { fetch, Request, Response } = env;
  const seeds = [Request, Response, fetch];

  let len = seeds.length,
    i = len,
    seed,
    target,
    map = seedCache;

  while (i--) {
    seed = seeds[i];
    target = map.get(seed);

    target === undefined && map.set(seed, (target = i ? new Map() : factory(env)));

    map = target;
  }

  return target;
};

const adapter = getFetch();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (adapter);


/***/ },

/***/ "./node_modules/axios/lib/adapters/xhr.js"
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_settle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/settle.js */ "./node_modules/axios/lib/core/settle.js");
/* harmony import */ var _defaults_transitional_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../defaults/transitional.js */ "./node_modules/axios/lib/defaults/transitional.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _helpers_normalizeURLForProtocolCheck_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/normalizeURLForProtocolCheck.js */ "./node_modules/axios/lib/helpers/normalizeURLForProtocolCheck.js");
/* harmony import */ var _helpers_parseProtocol_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/parseProtocol.js */ "./node_modules/axios/lib/helpers/parseProtocol.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../helpers/progressEventReducer.js */ "./node_modules/axios/lib/helpers/progressEventReducer.js");
/* harmony import */ var _helpers_resolveConfig_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../helpers/resolveConfig.js */ "./node_modules/axios/lib/helpers/resolveConfig.js");
/* harmony import */ var _helpers_sanitizeHeaderValue_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../helpers/sanitizeHeaderValue.js */ "./node_modules/axios/lib/helpers/sanitizeHeaderValue.js");













const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isXHRAdapterSupported &&
  function (config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      const _config = (0,_helpers_resolveConfig_js__WEBPACK_IMPORTED_MODULE_10__["default"])(config);
      let requestData = _config.data;
      const requestHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_8__["default"].from(_config.headers).normalize();
      let { responseType, onUploadProgress, onDownloadProgress } = _config;
      let onCanceled;
      let uploadThrottled, downloadThrottled;
      let flushUpload, flushDownload, flushDownloadWithEvent;

      function done() {
        flushUpload && flushUpload(); // flush events
        flushDownload && flushDownload(); // flush events

        _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);

        _config.signal && _config.signal.removeEventListener('abort', onCanceled);
      }

      let request = new XMLHttpRequest();

      request.open(_config.method.toUpperCase(), _config.url, true);

      // Set the request timeout in MS
      request.timeout = _config.timeout;

      function onloadend(event) {
        if (!request) {
          return;
        }

        // Status 0 means no response was received, which onerror and onabort normally
        // reject before this runs. Firefox 152 fires only readystatechange and loadend for
        // navigation-canceled requests (https://bugzilla.mozilla.org/show_bug.cgi?id=1505389),
        // leaving settle() to resolve them as an empty success. ECONNABORTED is the error
        // onabort raised on Firefox 151. Reads over file:, which some environments report as
        // status 0 on success, are excluded by the request URL's scheme after browser-style
        // preprocessing, by the page origin's scheme for relative URLs (which inherit it), or
        // by responseURL where implemented.
        if (
          request.status === 0 &&
          ((0,_helpers_parseProtocol_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_helpers_normalizeURLForProtocolCheck_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_config.url)) ||
            (0,_helpers_parseProtocol_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_platform_index_js__WEBPACK_IMPORTED_MODULE_7__["default"].origin)) !== 'file' &&
          !(request.responseURL && request.responseURL.startsWith('file:'))
        ) {
          reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"]('Request aborted', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"].ECONNABORTED, config, request));
          done();

          // Clean up request
          request = null;
          return;
        }

        // When loadend is still dispatching, flushing with it gives progress
        // listeners a final delivery whose event has a live target. The legacy
        // ready-state fallback has no event, so replay its pending progress.
        // A throwing listener must not block settlement; rethrow asynchronously,
        // matching how listener errors surface on the throttle timer path.
        try {
          if (event) {
            flushDownloadWithEvent && flushDownloadWithEvent(event);
          } else {
            flushDownload && flushDownload();
          }
        } catch (err) {
          setTimeout(() => {
            throw err;
          });
        }

        // A final progress callback can cancel the request synchronously.
        if (!request) {
          return;
        }

        // Prepare the response
        const responseHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_8__["default"].from(
          'getAllResponseHeaders' in request && request.getAllResponseHeaders()
        );
        const responseData =
          !responseType || responseType === 'text' || responseType === 'json'
            ? request.responseText
            : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request,
        };

        (0,_core_settle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
          function _resolve(value) {
            resolve(value);
            done();
          },
          function _reject(err) {
            reject(err);
            done();
          },
          response
        );

        // Clean up request
        request = null;
      }

      if ('onloadend' in request) {
        // Use onloadend if available
        request.onloadend = onloadend;
      } else {
        // Listen for ready state to emulate onloadend
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }

          // The request errored out and we didn't get a response, this will be
          // handled by onerror instead
          // With one exception: request that using file: protocol, most browsers
          // will return status as 0 even though it's a successful request
          if (
            request.status === 0 &&
            !(request.responseURL && request.responseURL.startsWith('file:'))
          ) {
            return;
          }
          // readystate handler is calling before onerror or ontimeout handlers,
          // so we should call onloadend on the next 'tick'
          setTimeout(onloadend);
        };
      }

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }

        reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"]('Request aborted', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"].ECONNABORTED, config, request));
        done();

        // Clean up request
        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError(event) {
        // Browsers deliver a ProgressEvent in XHR onerror
        // (message may be empty; when present, surface it)
        // See https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/error_event
        const msg = event && event.message ? event.message : 'Network Error';
        const err = new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"](msg, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"].ERR_NETWORK, config, request);
        // attach the underlying event for consumers who want details
        err.event = event || null;
        reject(err);
        done();
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = _config.timeout
          ? 'timeout of ' + _config.timeout + 'ms exceeded'
          : 'timeout exceeded';
        const transitional = _config.transitional || _defaults_transitional_js__WEBPACK_IMPORTED_MODULE_2__["default"];
        if (_config.timeoutErrorMessage) {
          timeoutErrorMessage = _config.timeoutErrorMessage;
        }
        reject(
          new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"](
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"].ETIMEDOUT : _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"].ECONNABORTED,
            config,
            request
          )
        );
        done();

        // Clean up request
        request = null;
      };

      // Remove Content-Type if data is undefined
      requestData === undefined && requestHeaders.setContentType(null);

      // Add headers to the request
      if ('setRequestHeader' in request) {
        _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach((0,_helpers_sanitizeHeaderValue_js__WEBPACK_IMPORTED_MODULE_11__.toByteStringHeaderObject)(requestHeaders), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }

      // Add withCredentials to request if needed
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(_config.withCredentials)) {
        request.withCredentials = !!_config.withCredentials;
      }

      // Add responseType to request if needed
      if (responseType && responseType !== 'json') {
        request.responseType = _config.responseType;
      }

      // Handle progress if needed
      if (onDownloadProgress) {
        [downloadThrottled, flushDownload, flushDownloadWithEvent] = (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_9__.progressEventReducer)(
          onDownloadProgress,
          true
        );
        request.addEventListener('progress', downloadThrottled);
      }

      // Not all browsers support upload events
      if (onUploadProgress && request.upload) {
        [uploadThrottled, flushUpload] = (0,_helpers_progressEventReducer_js__WEBPACK_IMPORTED_MODULE_9__.progressEventReducer)(onUploadProgress);

        request.upload.addEventListener('progress', uploadThrottled);

        request.upload.addEventListener('loadend', flushUpload);
      }

      if (_config.cancelToken || _config.signal) {
        // Handle cancellation
        // eslint-disable-next-line func-names
        onCanceled = (cancel) => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_4__["default"](null, config, request) : cancel);
          request.abort();
          done();
          request = null;
        };

        _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
        if (_config.signal) {
          _config.signal.aborted
            ? onCanceled()
            : _config.signal.addEventListener('abort', onCanceled);
        }
      }

      const protocol = (0,_helpers_parseProtocol_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_config.url);

      if (protocol && !_platform_index_js__WEBPACK_IMPORTED_MODULE_7__["default"].protocols.includes(protocol)) {
        reject(
          new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"](
            'Unsupported protocol ' + protocol + ':',
            _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"].ERR_BAD_REQUEST,
            config
          )
        );
        done();
        return;
      }

      // Send the request
      request.send(requestData || null);
    });
  });


/***/ },

/***/ "./node_modules/axios/lib/axios.js"
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_bind_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/bind.js */ "./node_modules/axios/lib/helpers/bind.js");
/* harmony import */ var _core_Axios_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/Axios.js */ "./node_modules/axios/lib/core/Axios.js");
/* harmony import */ var _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/formDataToJSON.js */ "./node_modules/axios/lib/helpers/formDataToJSON.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _cancel_CancelToken_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cancel/CancelToken.js */ "./node_modules/axios/lib/cancel/CancelToken.js");
/* harmony import */ var _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cancel/isCancel.js */ "./node_modules/axios/lib/cancel/isCancel.js");
/* harmony import */ var _env_data_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./env/data.js */ "./node_modules/axios/lib/env/data.js");
/* harmony import */ var _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./helpers/toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _helpers_spread_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./helpers/spread.js */ "./node_modules/axios/lib/helpers/spread.js");
/* harmony import */ var _helpers_isAxiosError_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./helpers/isAxiosError.js */ "./node_modules/axios/lib/helpers/isAxiosError.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./adapters/adapters.js */ "./node_modules/axios/lib/adapters/adapters.js");
/* harmony import */ var _helpers_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./helpers/HttpStatusCode.js */ "./node_modules/axios/lib/helpers/HttpStatusCode.js");




















/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new _core_Axios_js__WEBPACK_IMPORTED_MODULE_2__["default"](defaultConfig);
  const instance = (0,_helpers_bind_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_core_Axios_js__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.request, context);

  // Copy axios.prototype to instance
  _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].extend(instance, _core_Axios_js__WEBPACK_IMPORTED_MODULE_2__["default"].prototype, context, { allOwnKeys: true });

  // Copy context to instance
  _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].extend(instance, context, null, { allOwnKeys: true });

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance((0,_core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"])(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(_defaults_index_js__WEBPACK_IMPORTED_MODULE_4__["default"]);

// Expose Axios class to allow class inheritance
axios.Axios = _core_Axios_js__WEBPACK_IMPORTED_MODULE_2__["default"];

// Expose Cancel & CancelToken
axios.CanceledError = _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_6__["default"];
axios.CancelToken = _cancel_CancelToken_js__WEBPACK_IMPORTED_MODULE_7__["default"];
axios.isCancel = _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_8__["default"];
axios.VERSION = _env_data_js__WEBPACK_IMPORTED_MODULE_9__.VERSION;
axios.toFormData = _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_10__["default"];

// Expose AxiosError class
axios.AxiosError = _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_11__["default"];

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = _helpers_spread_js__WEBPACK_IMPORTED_MODULE_12__["default"];

// Expose isAxiosError
axios.isAxiosError = _helpers_isAxiosError_js__WEBPACK_IMPORTED_MODULE_13__["default"];

// Expose mergeConfig
axios.mergeConfig = _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"];

axios.AxiosHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_14__["default"];

axios.formToJSON = (thing) => (0,_helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_15__["default"].getAdapter;

axios.HttpStatusCode = _helpers_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_16__["default"];

axios.default = axios;

// this module should only have a default export
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (axios);


/***/ },

/***/ "./node_modules/axios/lib/cancel/CancelToken.js"
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CanceledError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");




/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then((cancel) => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = (onfulfilled) => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new _CanceledError_js__WEBPACK_IMPORTED_MODULE_0__["default"](message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  toAbortSignal() {
    const controller = new AbortController();

    const abort = (err) => {
      controller.abort(err);
    };

    this.subscribe(abort);

    controller.signal.unsubscribe = () => this.unsubscribe(abort);

    return controller.signal;
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel,
    };
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CancelToken);


/***/ },

/***/ "./node_modules/axios/lib/cancel/CanceledError.js"
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CanceledError.js ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");




class CanceledError extends _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(message, config, request) {
    super(message == null ? 'canceled' : message, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_CANCELED, config, request);
    this.name = 'CanceledError';
    this.__CANCEL__ = true;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanceledError);


/***/ },

/***/ "./node_modules/axios/lib/cancel/isCancel.js"
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isCancel)
/* harmony export */ });


function isCancel(value) {
  return !!(value && value.__CANCEL__);
}


/***/ },

/***/ "./node_modules/axios/lib/core/Axios.js"
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/buildURL.js */ "./node_modules/axios/lib/helpers/buildURL.js");
/* harmony import */ var _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InterceptorManager.js */ "./node_modules/axios/lib/core/InterceptorManager.js");
/* harmony import */ var _dispatchRequest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dispatchRequest.js */ "./node_modules/axios/lib/core/dispatchRequest.js");
/* harmony import */ var _mergeConfig_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _buildFullPath_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./buildFullPath.js */ "./node_modules/axios/lib/core/buildFullPath.js");
/* harmony import */ var _methodList_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./methodList.js */ "./node_modules/axios/lib/core/methodList.js");
/* harmony import */ var _helpers_validator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers/validator.js */ "./node_modules/axios/lib/helpers/validator.js");
/* harmony import */ var _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _defaults_transitional_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../defaults/transitional.js */ "./node_modules/axios/lib/defaults/transitional.js");













const validators = _helpers_validator_js__WEBPACK_IMPORTED_MODULE_7__["default"].validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_2__["default"](),
      response: new _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_2__["default"](),
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        try {
          let dummy = {};

          Error.captureStackTrace ? Error.captureStackTrace(dummy) : (dummy = new Error());

          const dummyStack = dummy.stack;
          let stack = '';

          // slice off the Error: ... line
          if (typeof dummyStack === 'string') {
            const firstNewlineIndex = dummyStack.indexOf('\n');

            stack = firstNewlineIndex === -1 ? '' : dummyStack.slice(firstNewlineIndex + 1);
          }

          if (!err.stack) {
            err.stack = stack;
            // match without the 2 top stack lines
          } else if (stack) {
            const firstNewlineIndex = stack.indexOf('\n');
            const secondNewlineIndex =
              firstNewlineIndex === -1 ? -1 : stack.indexOf('\n', firstNewlineIndex + 1);
            const stackWithoutTwoTopLines =
              secondNewlineIndex === -1 ? '' : stack.slice(secondNewlineIndex + 1);

            if (!String(err.stack).endsWith(stackWithoutTwoTopLines)) {
              err.stack += '\n' + stack;
            }
          }
        } catch (e) {
          // Ignore failures from custom stack hooks or un-writable stack properties.
        }
      }

      throw err;
    }
  }

  _request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = (0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this.defaults, config);

    const { transitional, paramsSerializer, headers } = config;

    if (transitional !== undefined) {
      _helpers_validator_js__WEBPACK_IMPORTED_MODULE_7__["default"].assertOptions(
        transitional,
        {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean),
          legacyInterceptorReqResOrdering: validators.transitional(validators.boolean),
          advertiseZstdAcceptEncoding: validators.transitional(validators.boolean),
          validateStatusUndefinedResolves: validators.transitional(validators.boolean),
        },
        false
      );
    }

    if (paramsSerializer != null) {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer,
        };
      } else {
        _helpers_validator_js__WEBPACK_IMPORTED_MODULE_7__["default"].assertOptions(
          paramsSerializer,
          {
            encode: validators.function,
            serialize: validators.function,
          },
          true
        );
      }
    }

    // Set config.allowAbsoluteUrls
    if (config.allowAbsoluteUrls !== undefined) {
      // do nothing
    } else if (this.defaults.allowAbsoluteUrls !== undefined) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }

    _helpers_validator_js__WEBPACK_IMPORTED_MODULE_7__["default"].assertOptions(
      config,
      {
        baseUrl: validators.spelling('baseURL'),
        withXsrfToken: validators.spelling('withXSRFToken'),
      },
      true
    );

    // Set config.method
    config.method = (
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSafeProp(config, 'method') ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSafeProp(this.defaults, 'method') ||
      'get'
    ).toLowerCase();

    // Flatten headers
    let contextHeaders = headers && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].merge(headers.common, headers[config.method]);

    headers &&
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(_methodList_js__WEBPACK_IMPORTED_MODULE_6__["default"].concat('common'), (method) => {
        delete headers[method];
      });

    config.headers = _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_8__["default"].concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      const transitional = config.transitional || _defaults_transitional_js__WEBPACK_IMPORTED_MODULE_9__["default"];
      const legacyInterceptorReqResOrdering =
        transitional && transitional.legacyInterceptorReqResOrdering;

      if (legacyInterceptorReqResOrdering) {
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      } else {
        requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      }
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [_dispatchRequest_js__WEBPACK_IMPORTED_MODULE_3__["default"].bind(this), undefined];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled ? onFulfilled(newConfig) : newConfig;
      } catch (error) {
        if (!onRejected) {
          promise = Promise.reject(error);
          break;
        }

        try {
          const rejectedResult = onRejected.call(this, error);

          if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isThenable(rejectedResult)) {
            promise = Promise.resolve(rejectedResult).then(() =>
              _dispatchRequest_js__WEBPACK_IMPORTED_MODULE_3__["default"].call(this, newConfig)
            );
          }
        } catch (rejectedError) {
          promise = Promise.reject(rejectedError);
        }

        break;
      }
    }

    if (!promise) {
      try {
        promise = _dispatchRequest_js__WEBPACK_IMPORTED_MODULE_3__["default"].call(this, newConfig);
      } catch (error) {
        promise = Promise.reject(error);
      }
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = (0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this.defaults, config);
    const fullPath = (0,_buildFullPath_js__WEBPACK_IMPORTED_MODULE_5__["default"])(config.baseURL, config.url, config.allowAbsoluteUrls, config);
    return (0,_helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(
      (0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_4__["default"])(config || {}, {
        method,
        url,
        data: config && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(config, 'data') ? config.data : undefined,
      })
    );
  };
});

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(['post', 'put', 'patch', 'query'], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(
        (0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_4__["default"])(config || {}, {
          method,
          headers: isForm
            ? {
                'Content-Type': 'multipart/form-data',
              }
            : {},
          url,
          data,
        })
      );
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  // QUERY is a safe/idempotent read method; multipart form bodies don't fit
  // its semantics, so no queryForm shorthand is generated.
  if (method !== 'query') {
    Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
  }
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Axios);


/***/ },

/***/ "./node_modules/axios/lib/core/AxiosError.js"
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosError.js ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   REDACTED: () => (/* binding */ REDACTED),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");





const REDACTED = '[REDACTED ****]';

function hasOwnOrPrototypeToJSON(source) {
  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(source, 'toJSON')) {
    return true;
  }

  let prototype = Object.getPrototypeOf(source);

  while (prototype && prototype !== Object.prototype) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(prototype, 'toJSON')) {
      return true;
    }

    prototype = Object.getPrototypeOf(prototype);
  }

  return false;
}

// Build a plain-object snapshot of `config` and replace the value of any key
// (case-insensitive) listed in `redactKeys` with REDACTED. Walks through arrays
// and AxiosHeaders, and short-circuits on circular references.
function redactConfig(config, redactKeys) {
  const lowerKeys = new Set(redactKeys.map((k) => String(k).toLowerCase()));
  const seen = [];

  const visit = (source) => {
    if (source === null || typeof source !== 'object') return source;
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBuffer(source)) return source;
    if (seen.indexOf(source) !== -1) return undefined;

    if (source instanceof _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
      source = source.toJSON();
    }

    seen.push(source);

    let result;
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(source)) {
      result = [];
      source.forEach((v, i) => {
        const reducedValue = visit(v);
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(reducedValue)) {
          result[i] = reducedValue;
        }
      });
    } else {
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(source) && hasOwnOrPrototypeToJSON(source)) {
        seen.pop();
        return source;
      }

      result = Object.create(null);
      for (const [key, value] of Object.entries(source)) {
        const reducedValue = lowerKeys.has(key.toLowerCase()) ? REDACTED : visit(value);
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(reducedValue)) {
          result[key] = reducedValue;
        }
      }
    }

    seen.pop();
    return result;
  };

  return visit(config);
}

function stringifySafely(value) {
  try {
    return String(value);
  } catch (err) {
    return '';
  }
}

function aggregateErrorMessage(error) {
  const message = error.errors
    .map((entry) => {
      try {
        return entry && entry.message ? stringifySafely(entry.message) : stringifySafely(entry);
      } catch (err) {
        return '';
      }
    })
    .filter(Boolean)
    .join('; ');

  return message || error.name || 'AggregateError';
}

class AxiosError extends Error {
  static from(error, code, config, request, response, customProps) {
    // `AggregateError` (thrown by Node on dual-stack/Happy-Eyeballs connection
    // failures) has an empty `message`; its detail lives in `errors[]`. Without
    // this, the wrapped error surfaces with a blank message (see #6721).
    let message = error.message;
    if (!message && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(error.errors) && error.errors.length) {
      message = aggregateErrorMessage(error);
    }

    const axiosError = new AxiosError(message, code || error.code, config, request, response);
    // Match native `Error` `cause` semantics: non-enumerable. The wrapped
    // error often carries circular internals (sockets, requests, agents), so
    // an enumerable `cause` makes structured loggers (pino/winston) and any
    // own-property walk throw "Converting circular structure to JSON".
    // Regression from #6982; see #7205. `__proto__: null` mirrors the
    // `message` descriptor below (prototype-pollution-safe descriptor).
    Object.defineProperty(axiosError, 'cause', {
      __proto__: null,
      value: error,
      writable: true,
      enumerable: false,
      configurable: true,
    });
    axiosError.name = error.name;

    // Preserve status from the original error if not already set from response
    if (error.status != null && axiosError.status == null) {
      axiosError.status = error.status;
    }

    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  }

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  constructor(message, code, config, request, response) {
    super(message);

    // Make message enumerable to maintain backward compatibility
    // The native Error constructor sets message as non-enumerable,
    // but axios < v1.13.3 had it as enumerable
    Object.defineProperty(this, 'message', {
      // Null-proto descriptor so a polluted Object.prototype.get cannot turn
      // this data descriptor into an accessor descriptor on the way in.
      __proto__: null,
      value: message,
      enumerable: true,
      writable: true,
      configurable: true,
    });

    this.name = 'AxiosError';
    this.isAxiosError = true;
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    if (response) {
      this.response = response;
      this.status = response.status;
    }
  }

  toJSON() {
    // Opt-in redaction: when the request config carries a `redact` array, the
    // value of any matching key (case-insensitive, at any depth) is replaced
    // with REDACTED in the serialized snapshot. Undefined or empty leaves the
    // existing serialization behavior unchanged.
    const config = this.config;
    const redactKeys = config && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(config, 'redact') ? config.redact : undefined;
    const serializedConfig =
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(redactKeys) && redactKeys.length > 0
        ? redactConfig(config, redactKeys)
        : _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toJSONObject(config);

    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: serializedConfig,
      code: this.code,
      status: this.status,
    };
  }
}

// This can be changed to static properties as soon as the parser options in .eslint.cjs are updated.
AxiosError.ERR_BAD_OPTION_VALUE = 'ERR_BAD_OPTION_VALUE';
AxiosError.ERR_BAD_OPTION = 'ERR_BAD_OPTION';
AxiosError.ECONNABORTED = 'ECONNABORTED';
AxiosError.ETIMEDOUT = 'ETIMEDOUT';
AxiosError.ECONNREFUSED = 'ECONNREFUSED';
AxiosError.ERR_NETWORK = 'ERR_NETWORK';
AxiosError.ERR_FR_TOO_MANY_REDIRECTS = 'ERR_FR_TOO_MANY_REDIRECTS';
AxiosError.ERR_DEPRECATED = 'ERR_DEPRECATED';
AxiosError.ERR_BAD_RESPONSE = 'ERR_BAD_RESPONSE';
AxiosError.ERR_BAD_REQUEST = 'ERR_BAD_REQUEST';
AxiosError.ERR_CANCELED = 'ERR_CANCELED';
AxiosError.ERR_NOT_SUPPORT = 'ERR_NOT_SUPPORT';
AxiosError.ERR_INVALID_URL = 'ERR_INVALID_URL';
AxiosError.ERR_FORM_DATA_DEPTH_EXCEEDED = 'ERR_FORM_DATA_DEPTH_EXCEEDED';

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxiosError);


/***/ },

/***/ "./node_modules/axios/lib/core/AxiosHeaders.js"
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosHeaders.js ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_parseHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/parseHeaders.js */ "./node_modules/axios/lib/helpers/parseHeaders.js");
/* harmony import */ var _helpers_sanitizeHeaderValue_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/sanitizeHeaderValue.js */ "./node_modules/axios/lib/helpers/sanitizeHeaderValue.js");






const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) ? value.map(normalizeValue) : (0,_helpers_sanitizeHeaderValue_js__WEBPACK_IMPORTED_MODULE_2__.sanitizeHeaderValue)(String(value));
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const parameterNameRE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;

function trimOWS(value) {
  let start = 0;
  let end = value.length;

  while (start < end) {
    const code = value.charCodeAt(start);

    if (code !== 0x09 && code !== 0x20) {
      break;
    }

    start += 1;
  }

  while (end > start) {
    const code = value.charCodeAt(end - 1);

    if (code !== 0x09 && code !== 0x20) {
      break;
    }

    end -= 1;
  }

  return start === 0 && end === value.length ? value : value.slice(start, end);
}

function decodeQuotedString(value) {
  const last = value.length - 1;

  if (last < 1 || value.charCodeAt(0) !== 0x22 || value.charCodeAt(last) !== 0x22) {
    return value;
  }

  let decoded = '';

  for (let i = 1; i < last; i++) {
    const code = value.charCodeAt(i);

    if (code === 0x22) {
      return value;
    }

    if (code === 0x5c) {
      i += 1;

      if (i >= last) {
        return value;
      }
    }

    decoded += value[i];
  }

  return decoded;
}

function parseParameters(value) {
  const parameters = Object.create(null);
  const str = String(value);
  let start = 0;
  let quoted = false;
  let escaped = false;

  function parseParameter(end) {
    const part = trimOWS(str.slice(start, end));
    const equals = part.indexOf('=');

    if (equals < 1) {
      return;
    }

    const name = trimOWS(part.slice(0, equals));

    if (!parameterNameRE.test(name)) {
      return;
    }

    const normalizedName = name.toLowerCase();

    if (
      normalizedName === '__proto__' ||
      normalizedName === 'constructor' ||
      normalizedName === 'prototype'
    ) {
      return;
    }

    const parameterValue = trimOWS(part.slice(equals + 1));
    parameters[normalizedName] = decodeQuotedString(parameterValue);
  }

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);

    if (quoted) {
      if (escaped) {
        escaped = false;
      } else if (code === 0x5c) {
        escaped = true;
      } else if (code === 0x22) {
        quoted = false;
      }
    } else if (code === 0x22) {
      quoted = true;
    } else if (code === 0x2c || code === 0x3b) {
      parseParameter(i);
      start = i + 1;
    }
  }

  parseParameter(str.length);

  return parameters;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(value)) return;

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      // Null-proto descriptor so a polluted Object.prototype.get cannot turn
      // this data descriptor into an accessor descriptor on the way in.
      __proto__: null,
      value: function (arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true,
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        return;
      }

      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(self, lHeader);

      if (
        !key ||
        self[key] === undefined ||
        _rewrite === true ||
        (_rewrite === undefined && self[key] !== false)
      ) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders((0,_helpers_parseHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"])(header), valueOrRewrite);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(header) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isSafeIterable(header)) {
      let obj = Object.create(null),
        dest,
        key;
      for (const entry of header) {
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(entry)) {
          throw new TypeError('Object iterator must return a key-value pair');
        }

        key = entry[0];

        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(obj, key)) {
          dest = obj[key];
          obj[key] = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]];
        } else {
          obj[key] = entry[1];
        }
      }

      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(this, header);

      return !!(
        key &&
        this[key] !== undefined &&
        (!matcher || matchHeaderValue(this, this[key], key, matcher))
      );
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this, (value, header) => {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this, (value, header) => {
      value != null &&
        value !== false &&
        (obj[header] = asStrings && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON())
      .map(([header, value]) => header + ': ' + value)
      .join('\n');
  }

  getSetCookie() {
    const value = this.get('set-cookie');
    return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) ? value : value == null || value === false ? [] : [value];
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static parseParameters(value) {
    return parseParameters(value);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals =
      (this[$internals] =
      this[$internals] =
        {
          accessors: {},
        });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor([
  'Content-Type',
  'Content-Length',
  'Accept',
  'Accept-Encoding',
  'User-Agent',
  'Authorization',
]);

// reserved names hotfix
_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    },
  };
});

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].freezeMethods(AxiosHeaders);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxiosHeaders);


/***/ },

/***/ "./node_modules/axios/lib/core/InterceptorManager.js"
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




const $internals = Symbol('internals');

// `handlers` is public and may be replaced with a nullish value by user code;
// `clear()` has always tolerated that. Treat it as an empty stack rather than
// dereferencing it.
function countHandlers(handlers) {
  return handlers ? handlers.length : 0;
}

function trimHandlers(handlers) {
  if (!handlers) {
    return;
  }

  while (handlers.length && handlers[handlers.length - 1] === null) {
    handlers.pop();
  }
}

function syncHandlerEntries(manager, internals) {
  const handlers = manager.handlers;
  const length = countHandlers(handlers);

  if (handlers !== internals.handlersRef) {
    internals.handlersRef = handlers;
    internals.handlerEntries.clear();
  } else if (length !== internals.handlersLength) {
    if (!length) {
      internals.handlerEntries.clear();
    } else {
      internals.handlerEntries.forEach(function removeStaleEntry(entry, id) {
        if (handlers[entry.index] !== entry.handler) {
          internals.handlerEntries.delete(id);
        }
      });
    }
  }

  internals.handlersLength = length;
}

class InterceptorManager {
  constructor() {
    this.handlers = [];
    this[$internals] = {
      handlersRef: this.handlers,
      handlersLength: this.handlers.length,
      handlerEntries: new Map(),
      iterationDepth: 0,
      nextId: 0,
    };
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    const handler = {
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null,
    };
    const internals = this[$internals];

    if (this.handlers == null) {
      this.handlers = [];
    }

    syncHandlerEntries(this, internals);

    const id = internals.nextId++;

    this.handlers.push(handler);
    internals.handlerEntries.set(id, {
      handler,
      index: this.handlers.length - 1,
    });
    internals.handlersLength = this.handlers.length;

    return id;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(id) {
    const internals = this[$internals];

    syncHandlerEntries(this, internals);

    const entry = internals.handlerEntries.get(id);

    if (entry) {
      internals.handlerEntries.delete(id);

      // Ignore IDs invalidated by clear or direct replacement of handlers.
      if (this.handlers[entry.index] !== entry.handler) {
        return;
      }

      this.handlers[entry.index] = null;

      // Do not reuse an index while forEach is walking its length snapshot.
      if (!internals.iterationDepth) {
        trimHandlers(this.handlers);
        internals.handlersLength = this.handlers.length;
      }
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
      syncHandlerEntries(this, this[$internals]);
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    const internals = this[$internals];

    syncHandlerEntries(this, internals);

    internals.iterationDepth++;

    try {
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    } finally {
      if (!--internals.iterationDepth) {
        syncHandlerEntries(this, internals);
        trimHandlers(this.handlers);
        internals.handlersLength = countHandlers(this.handlers);
      }
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InterceptorManager);


/***/ },

/***/ "./node_modules/axios/lib/core/buildFullPath.js"
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildFullPath)
/* harmony export */ });
/* harmony import */ var _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _helpers_isAbsoluteURL_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/isAbsoluteURL.js */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
/* harmony import */ var _helpers_combineURLs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/combineURLs.js */ "./node_modules/axios/lib/helpers/combineURLs.js");
/* harmony import */ var _helpers_normalizeURLForProtocolCheck_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/normalizeURLForProtocolCheck.js */ "./node_modules/axios/lib/helpers/normalizeURLForProtocolCheck.js");







const malformedHttpProtocol = /^https?:(?!\/\/)/i;

// Redact the parts of a URL that can carry secrets before it is embedded in an
// error message. AxiosError.toJSON() serializes `message` verbatim and errors
// are commonly logged, while the opt-in `config.redact` model only cleans
// config keys — it cannot reach the message. Redact only the genuinely
// sensitive substrings — userinfo (credentials), query parameter values and
// fragment contents — with the same REDACTED marker the config redaction uses,
// while keeping the scheme, host, path and parameter names so the offending
// request stays accurately identifiable.
function redactFragment(fragment) {
  if (!fragment) {
    return fragment;
  }

  return fragment.replace(/(^|&)([^=&]*=)?[^&]+/g, (match, separator, parameterName = '') => {
    return `${separator}${parameterName}${_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__.REDACTED}`;
  });
}

function redactSensitiveURLParts(url) {
  const redactedURL = url.replace(/^(https?:\/{0,2})[^/?#]*@/i, `$1${_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__.REDACTED}@`);
  const fragmentIndex = redactedURL.indexOf('#');
  const urlWithoutFragment =
    fragmentIndex === -1 ? redactedURL : redactedURL.slice(0, fragmentIndex);
  const redactedURLWithoutFragment = urlWithoutFragment.replace(
    /([?&][^=&#]*=)[^&#]*/g,
    `$1${_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__.REDACTED}`
  );

  if (fragmentIndex === -1) {
    return redactedURLWithoutFragment;
  }

  return `${redactedURLWithoutFragment}#${redactFragment(redactedURL.slice(fragmentIndex + 1))}`;
}

function assertValidHttpProtocolURL(url, config) {
  if (typeof url === 'string') {
    const normalizedURL = (0,_helpers_normalizeURLForProtocolCheck_js__WEBPACK_IMPORTED_MODULE_3__["default"])(url);
    if (malformedHttpProtocol.test(normalizedURL)) {
      throw new _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"](
        `Invalid URL ${JSON.stringify(redactSensitiveURLParts(normalizedURL))}: missing "//" after protocol`,
        _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_INVALID_URL,
        config
      );
    }
  }
}

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls, config) {
  assertValidHttpProtocolURL(requestedURL, config);
  let isRelativeUrl = !(0,_helpers_isAbsoluteURL_js__WEBPACK_IMPORTED_MODULE_1__["default"])(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls === false)) {
    assertValidHttpProtocolURL(baseURL, config);
    return (0,_helpers_combineURLs_js__WEBPACK_IMPORTED_MODULE_2__["default"])(baseURL, requestedURL);
  }
  return requestedURL;
}


/***/ },

/***/ "./node_modules/axios/lib/core/dispatchRequest.js"
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dispatchRequest)
/* harmony export */ });
/* harmony import */ var _transformData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transformData.js */ "./node_modules/axios/lib/core/transformData.js");
/* harmony import */ var _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cancel/isCancel.js */ "./node_modules/axios/lib/cancel/isCancel.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../adapters/adapters.js */ "./node_modules/axios/lib/adapters/adapters.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");










/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_3__["default"](null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(_config) {
  // Interceptors may replace the merged config with an ordinary object. Flatten
  // it at the dispatch boundary so shared prototype members cannot become
  // request behavior, while preserving intentional template/class members.
  const config = _utils_js__WEBPACK_IMPORTED_MODULE_6__["default"].toSafeFlatObject(_config);

  throwIfCancellationRequested(config);

  config.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__["default"].from(_utils_js__WEBPACK_IMPORTED_MODULE_6__["default"].getSafeProp(config, 'headers'));

  // Transform request data
  config.data = _transformData_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(config, config.transformRequest);

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_5__["default"].getAdapter(config.adapter || _defaults_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].adapter, config);

  return adapter(config).then(
    function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Expose the current response on config so that transformResponse can
      // attach it to any AxiosError it throws (e.g. on JSON parse failure).
      // We clean it up afterwards to avoid polluting the config object.
      config.response = response;
      try {
        response.data = _transformData_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(config, config.transformResponse, response);
      } finally {
        delete config.response;
      }

      response.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__["default"].from(response.headers);

      return response;
    },
    function onAdapterRejection(reason) {
      if (!(0,_cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          config.response = reason.response;
          try {
            reason.response.data = _transformData_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(
              config,
              config.transformResponse,
              reason.response
            );
          } finally {
            delete config.response;
          }
          reason.response.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__["default"].from(reason.response.headers);
        }
      }

      return Promise.reject(reason);
    }
  );
}


/***/ },

/***/ "./node_modules/axios/lib/core/mergeConfig.js"
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeConfig)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");





const headersToObject = (thing) => (thing instanceof _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"] ? { ...thing } : thing);

const ownEnumerableKeys = (thing) => {
  if (Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor) {
    return Object.keys(thing).concat(
      Object.getOwnPropertySymbols(thing).filter(
        (symbol) => Object.getOwnPropertyDescriptor(thing, symbol).enumerable
      )
    );
  }
  return Object.keys(thing);
};

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config1 = config1 || {};
  config2 = config2 || {};

  // Use a null-prototype object so that downstream reads such as `config.auth`
  // or `config.baseURL` cannot inherit polluted values from Object.prototype.
  // `hasOwnProperty` is restored as a non-enumerable own slot to preserve
  // ergonomics for user code that relies on it.
  const config = Object.create(null);
  Object.defineProperty(config, 'hasOwnProperty', {
    // Null-proto descriptor so a polluted Object.prototype.get cannot turn
    // this data descriptor into an accessor descriptor on the way in.
    __proto__: null,
    value: Object.prototype.hasOwnProperty,
    enumerable: false,
    writable: true,
    configurable: true,
  });

  function getMergedValue(target, source, prop, caseless) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(target) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(source)) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].merge.call({ caseless }, target, source);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(source)) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].merge({}, source);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(a, b, prop, caseless) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(a)) {
      return getMergedValue(undefined, a, prop, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  function getMergedTransitionalOption(prop) {
    const transitional2 = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(config2, 'transitional')
      ? config2.transitional
      : undefined;

    if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(transitional2)) {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(transitional2)) {
        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(transitional2, prop)) {
          return transitional2[prop];
        }
      } else {
        return undefined;
      }
    }

    const transitional1 = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(config1, 'transitional')
      ? config1.transitional
      : undefined;

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(transitional1) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(transitional1, prop)) {
      return transitional1[prop];
    }

    return undefined;
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(config2, prop)) {
      return getMergedValue(a, b);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(config1, prop)) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutErrorMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    allowedSocketPaths: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) =>
      mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true),
  };

  _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(ownEnumerableKeys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    if (prop === '__proto__' || prop === 'constructor' || prop === 'prototype') return;
    const merge = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
    const a = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(config1, prop) ? config1[prop] : undefined;
    const b = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(config2, prop) ? config2[prop] : undefined;
    const configValue = merge(a, b, prop);
    (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  if (
    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(config2, 'validateStatus') &&
    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(config2.validateStatus) &&
    getMergedTransitionalOption('validateStatusUndefinedResolves') === false
  ) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(config1, 'validateStatus')) {
      config.validateStatus = getMergedValue(undefined, config1.validateStatus);
    } else {
      delete config.validateStatus;
    }
  }

  return config;
}


/***/ },

/***/ "./node_modules/axios/lib/core/methodList.js"
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/core/methodList.js ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


const methodList = Object.freeze([
  'get',
  'delete',
  'head',
  'options',
  'post',
  'put',
  'patch',
  'purge',
  'link',
  'unlink',
  'query',
]);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (methodList);


/***/ },

/***/ "./node_modules/axios/lib/core/setFormDataHeaders.js"
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/setFormDataHeaders.js ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setFormDataHeaders)
/* harmony export */ });


const FORM_DATA_CONTENT_HEADERS = ['content-type', 'content-length'];

/**
 * Apply the headers generated by a FormData implementation to the request headers,
 * honoring the `formDataHeaderPolicy` option: with 'content-only', copy only the
 * content-* headers; otherwise merge all of them.
 *
 * @param {AxiosHeaders} headers - the request headers to mutate
 * @param {Object | null | undefined} formHeaders - headers produced by the FormData implementation
 * @param {String} [policy] - the resolved `formDataHeaderPolicy` config value
 *
 * @returns {void}
 */
function setFormDataHeaders(headers, formHeaders, policy) {
  if (policy !== 'content-only') {
    headers.set(formHeaders);
    return;
  }

  Object.entries(formHeaders || {}).forEach(([key, val]) => {
    if (FORM_DATA_CONTENT_HEADERS.includes(key.toLowerCase())) {
      headers.set(key, val);
    }
  });
}


/***/ },

/***/ "./node_modules/axios/lib/core/settle.js"
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ settle)
/* harmony export */ });
/* harmony import */ var _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");




/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"](
      'Request failed with status code ' + response.status,
      response.status >= 400 && response.status < 500 ? _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_BAD_REQUEST : _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_BAD_RESPONSE,
      response.config,
      response.request,
      response
    ));
  }
}


/***/ },

/***/ "./node_modules/axios/lib/core/transformData.js"
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ transformData)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");






/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || _defaults_index_js__WEBPACK_IMPORTED_MODULE_1__["default"];
  const context = response || config;
  const headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_2__["default"].from(context.headers);
  let data = context.data;

  _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}


/***/ },

/***/ "./node_modules/axios/lib/defaults/index.js"
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _transitional_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transitional.js */ "./node_modules/axios/lib/defaults/transitional.js");
/* harmony import */ var _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _helpers_toURLEncodedForm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/toURLEncodedForm.js */ "./node_modules/axios/lib/helpers/toURLEncodedForm.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");
/* harmony import */ var _helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/formDataToJSON.js */ "./node_modules/axios/lib/helpers/formDataToJSON.js");
/* harmony import */ var _core_methodList_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/methodList.js */ "./node_modules/axios/lib/core/methodList.js");











const own = (obj, key) => (obj != null && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(obj, key) ? obj[key] : undefined);

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {
  transitional: _transitional_js__WEBPACK_IMPORTED_MODULE_2__["default"],

  adapter: ['xhr', 'http', 'fetch'],

  transformRequest: [
    function transformRequest(data, headers) {
      const contentType = headers.getContentType() || '';
      const hasJSONContentType = contentType.indexOf('application/json') > -1;
      const isObjectPayload = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(data);

      if (isObjectPayload && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isHTMLForm(data)) {
        data = new FormData(data);
      }

      const isFormData = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFormData(data);

      if (isFormData) {
        return hasJSONContentType ? JSON.stringify((0,_helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_6__["default"])(data)) : data;
      }

      if (
        _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBuffer(data) ||
        _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBuffer(data) ||
        _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStream(data) ||
        _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFile(data) ||
        _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBlob(data) ||
        _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isReadableStream(data)
      ) {
        return data;
      }
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBufferView(data)) {
        return data.buffer;
      }
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isURLSearchParams(data)) {
        headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
        return data.toString();
      }

      let isFileList;

      if (isObjectPayload) {
        const formSerializer = own(this, 'formSerializer');
        if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
          return (0,_helpers_toURLEncodedForm_js__WEBPACK_IMPORTED_MODULE_4__["default"])(data, formSerializer).toString();
        }

        if (
          (isFileList = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFileList(data)) ||
          contentType.indexOf('multipart/form-data') > -1
        ) {
          const env = own(this, 'env');
          const _FormData = env && env.FormData;

          return (0,_helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
            isFileList ? { 'files[]': data } : data,
            _FormData && new _FormData(),
            formSerializer
          );
        }
      }

      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType('application/json', false);
        return stringifySafely(data);
      }

      return data;
    },
  ],

  transformResponse: [
    function transformResponse(data) {
      const transitional = own(this, 'transitional') || defaults.transitional;
      const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      const responseType = own(this, 'responseType');
      const JSONRequested = responseType === 'json';

      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isResponse(data) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isReadableStream(data)) {
        return data;
      }

      if (
        data &&
        _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(data) &&
        ((forcedJSONParsing && !responseType) || JSONRequested)
      ) {
        const silentJSONParsing = transitional && transitional.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;

        try {
          return JSON.parse(data, own(this, 'parseReviver'));
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === 'SyntaxError') {
              throw _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(e, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_RESPONSE, this, null, own(this, 'response'));
            }
            throw e;
          }
        }
      }

      return data;
    },
  ],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: _platform_index_js__WEBPACK_IMPORTED_MODULE_5__["default"].classes.FormData,
    Blob: _platform_index_js__WEBPACK_IMPORTED_MODULE_5__["default"].classes.Blob,
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': undefined,
    },
  },
};

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(_core_methodList_js__WEBPACK_IMPORTED_MODULE_7__["default"], (method) => {
  defaults.headers[method] = {};
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaults);


/***/ },

/***/ "./node_modules/axios/lib/defaults/transitional.js"
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false,
  legacyInterceptorReqResOrdering: true,
  advertiseZstdAcceptEncoding: false,
  validateStatusUndefinedResolves: true,
});


/***/ },

/***/ "./node_modules/axios/lib/env/data.js"
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VERSION: () => (/* binding */ VERSION)
/* harmony export */ });
const VERSION = "1.20.0";

/***/ },

/***/ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js"
/*!****************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/AxiosURLSearchParams.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _toFormData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");




/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && (0,_toFormData_js__WEBPACK_IMPORTED_MODULE_0__["default"])(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder
    ? (value) => encoder.call(this, value, encode)
    : encode;

  return this._pairs
    .map(function each(pair) {
      return _encode(pair[0]) + '=' + _encode(pair[1]);
    }, '')
    .join('&');
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxiosURLSearchParams);


/***/ },

/***/ "./node_modules/axios/lib/helpers/HttpStatusCode.js"
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/HttpStatusCode.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  /**
   * @deprecated Use `ContentTooLarge` instead.
   */
  PayloadTooLarge: 413,
  ContentTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  /**
   * @deprecated Use `UnprocessableContent` instead.
   */
  UnprocessableEntity: 422,
  UnprocessableContent: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerReturnsAnUnknownError: 520,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  if (HttpStatusCode[value] === undefined) {
    HttpStatusCode[value] = key;
  }
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HttpStatusCode);


/***/ },

/***/ "./node_modules/axios/lib/helpers/bind.js"
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ bind)
/* harmony export */ });


/**
 * Create a bound version of a function with a specified `this` context
 *
 * @param {Function} fn - The function to bind
 * @param {*} thisArg - The value to be passed as the `this` parameter
 * @returns {Function} A new function that will call the original function with the specified `this` context
 */
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/buildURL.js"
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildURL),
/* harmony export */   encode: () => (/* binding */ encode)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AxiosURLSearchParams.js */ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js");





/**
 * It replaces URL-encoded forms of `:`, `$`, `,`, and spaces with
 * their plain counterparts (`:`, `$`, `,`, `+`).
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?(object|Function)} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  url = url || '';

  const _options = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(options)
    ? {
        serialize: options,
      }
    : options;

  // Read serializer options pollution-safely: own properties and methods on a
  // class/template prototype are honored, but values injected onto a polluted
  // Object.prototype are ignored.
  const _encode = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSafeProp(_options, 'encode') || encode;
  const serializeFn = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSafeProp(_options, 'serialize');

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, _options);
  } else {
    serializedParams = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isURLSearchParams(params)
      ? params.toString()
      : new _AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_1__["default"](params, _options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/combineURLs.js"
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ combineURLs)
/* harmony export */ });


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  if (!relativeURL) {
    return baseURL;
  }

  let end = baseURL.length;

  while (end > 0 && baseURL.charCodeAt(end - 1) === 47) {
    end--;
  }

  return baseURL.slice(0, end) + '/' + relativeURL.replace(/^\/+/, '');
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/composeSignals.js"
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/composeSignals.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




const composeSignals = (signals, timeout) => {
  signals = signals ? signals.filter(Boolean) : [];

  if (!timeout && !signals.length) {
    return;
  }

  const controller = new AbortController();

  let aborted = false;

  const onabort = function (reason) {
    if (!aborted) {
      aborted = true;
      unsubscribe();
      const err = reason instanceof Error ? reason : this.reason;
      controller.abort(
        err instanceof _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]
          ? err
          : new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_0__["default"](err instanceof Error ? err.message : err)
      );
    }
  };

  let timer =
    timeout &&
    setTimeout(() => {
      timer = null;
      onabort(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"](`timeout of ${timeout}ms exceeded`, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ETIMEDOUT));
    }, timeout);

  const unsubscribe = () => {
    if (!signals) { return; }
    timer && clearTimeout(timer);
    timer = null;
    signals.forEach((signal) => {
      signal.unsubscribe
        ? signal.unsubscribe(onabort)
        : signal.removeEventListener('abort', onabort);
    });
    signals = null;
  };

  signals.forEach((signal) => {
    if (aborted) {
      return;
    }

    if (signal.aborted) {
      onabort.call(signal);
      return;
    }

    signal.addEventListener('abort', onabort, { once: true });
  });

  const { signal } = controller;

  signal.unsubscribe = () => _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].asap(unsubscribe);

  return signal;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (composeSignals);


/***/ },

/***/ "./node_modules/axios/lib/helpers/cookies.js"
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_platform_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].hasStandardBrowserEnv
  ? // Standard browser envs support document.cookie
    {
      write(name, value, expires, path, domain, secure, sameSite) {
        if (typeof document === 'undefined') return;

        const cookie = [`${name}=${encodeURIComponent(value)}`];

        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(expires)) {
          cookie.push(`expires=${new Date(expires).toUTCString()}`);
        }
        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(path)) {
          cookie.push(`path=${path}`);
        }
        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(domain)) {
          cookie.push(`domain=${domain}`);
        }
        if (secure === true) {
          cookie.push('secure');
        }
        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(sameSite)) {
          cookie.push(`SameSite=${sameSite}`);
        }

        document.cookie = cookie.join('; ');
      },

      read(name) {
        if (typeof document === 'undefined') return null;
        // Match name=value by splitting on the semicolon separator instead of building a
        // RegExp from `name` — interpolating an unescaped string into a RegExp would let
        // metacharacters (e.g. `.+?` in an attacker-influenced cookie name) cause ReDoS or
        // match the wrong cookie. Browsers may serialize cookie pairs as either ";" or
        // "; ", so ignore optional whitespace before each cookie name.
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].replace(/^\s+/, '');
          const eq = cookie.indexOf('=');
          if (eq !== -1 && cookie.slice(0, eq) === name) {
            try {
              return decodeURIComponent(cookie.slice(eq + 1));
            } catch (e) {
              return cookie.slice(eq + 1);
            }
          }
        }
        return null;
      },

      remove(name) {
        this.write(name, '', Date.now() - 86400000, '/');
      },
    }
  : // Non-standard browser env (web workers, react-native) lack needed support.
    {
      write() {},
      read() {
        return null;
      },
      remove() {},
    });


/***/ },

/***/ "./node_modules/axios/lib/helpers/estimateDataURLDecodedBytes.js"
/*!***********************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/estimateDataURLDecodedBytes.js ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ estimateDataURLDecodedBytes),
/* harmony export */   estimateDataURLBufferAllocation: () => (/* binding */ estimateDataURLBufferAllocation)
/* harmony export */ });
/**
 * Estimate data: URL byte lengths *without* allocating large buffers.
 * - Fetch percent-decodes a base64 body before decoding it.
 * - Node's Buffer.from(body, 'base64') sizes its backing allocation from the
 *   raw body, including ignored characters and content after padding.
 * - Non-base64 data is percent-decoded and then encoded as UTF-8.
 */
const isHexDigit = (charCode) =>
  (charCode >= 48 && charCode <= 57) ||
  (charCode >= 65 && charCode <= 70) ||
  (charCode >= 97 && charCode <= 102);

const isPercentEncodedByte = (str, i, len) =>
  i + 2 < len && isHexDigit(str.charCodeAt(i + 1)) && isHexDigit(str.charCodeAt(i + 2));

const hexValue = (charCode) => (charCode <= 57 ? charCode - 48 : (charCode & 0xdf) - 55);

const isBase64Char = (charCode) =>
  (charCode >= 65 && charCode <= 90) || // A-Z
  (charCode >= 97 && charCode <= 122) || // a-z
  (charCode >= 48 && charCode <= 57) || // 0-9
  charCode === 43 || // +
  charCode === 47 || // /
  charCode === 45 || // - (base64url)
  charCode === 95; // _ (base64url)

const isBase64Whitespace = (charCode) =>
  charCode === 9 || charCode === 10 || charCode === 12 || charCode === 13 || charCode === 32;

const base64Bytes = (significant) => {
  const groups = Math.floor(significant / 4);
  const remainder = significant % 4;
  return groups * 3 + (remainder === 2 ? 1 : remainder === 3 ? 2 : 0);
};

// Buffer.byteLength(body, 'base64') uses the raw string length as an allocation
// upper bound even when Buffer.from later ignores characters or stops at '='.
const estimateBase64BufferAllocation = (body) => {
  const len = body.length;
  let padding = 0;

  if (len > 0 && body.charCodeAt(len - 1) === 61 /* '=' */) {
    padding++;

    if (len > 1 && body.charCodeAt(len - 2) === 61 /* '=' */) {
      padding++;
    }
  }

  return Math.floor(((len - padding) * 3) / 4);
};

const estimatePercentDecodedBase64Bytes = (body) => {
  const len = body.length;
  let significant = 0;
  let padding = 0;
  let invalid = false;

  for (let i = 0; i < len; i++) {
    let code = body.charCodeAt(i);

    if (code === 37 /* '%' */ && isPercentEncodedByte(body, i, len)) {
      code = hexValue(body.charCodeAt(i + 1)) * 16 + hexValue(body.charCodeAt(i + 2));
      i += 2;
    }

    if (isBase64Whitespace(code)) {
      continue;
    }

    if (code === 61 /* '=' */) {
      padding++;
      continue;
    }

    if (!isBase64Char(code) || padding > 0) {
      invalid = true;
      continue;
    }

    significant++;
  }

  // Fetch rejects malformed forgiving-base64 input. Returning the raw-size
  // allocation bound keeps that invalid input from becoming a pre-check bypass.
  if (
    invalid ||
    padding > 2 ||
    (padding > 0 && (significant + padding) % 4 !== 0) ||
    significant % 4 === 1
  ) {
    return estimateBase64BufferAllocation(body);
  }

  return base64Bytes(significant);
};

const estimateDataURLBytes = (url, estimateBase64) => {
  if (!url || typeof url !== 'string') return 0;
  if (!url.startsWith('data:')) return 0;

  const comma = url.indexOf(',');
  if (comma < 0) return 0;

  const meta = url.slice(5, comma);
  const body = url.slice(comma + 1);
  const isBase64 = /;base64/i.test(meta);

  if (isBase64) {
    return estimateBase64(body);
  }

  // Compute UTF-8 byte length directly from UTF-16 code units without allocating
  // a byte buffer (TextEncoder.encode would defeat the DoS guard on large bodies).
  // Valid %XX triplets count as one decoded byte; this matches the bytes that
  // decodeURIComponent(body) would produce before Buffer re-encodes the string.
  let bytes = 0;
  for (let i = 0, len = body.length; i < len; i++) {
    const c = body.charCodeAt(i);
    if (c === 37 /* '%' */ && isPercentEncodedByte(body, i, len)) {
      bytes += 1;
      i += 2;
    } else if (c < 0x80) {
      bytes += 1;
    } else if (c < 0x800) {
      bytes += 2;
    } else if (c >= 0xd800 && c <= 0xdbff && i + 1 < len) {
      const next = body.charCodeAt(i + 1);
      if (next >= 0xdc00 && next <= 0xdfff) {
        bytes += 4;
        i++;
      } else {
        bytes += 3;
      }
    } else {
      bytes += 3;
    }
  }
  return bytes;
};

/**
 * Estimate the percent-decoded payload size used by Fetch data: URLs.
 *
 * @param {string} url
 * @returns {number}
 */
function estimateDataURLDecodedBytes(url) {
  // Fetch removes URL fragments before processing a data: URL.
  const fragmentIndex = typeof url === 'string' ? url.indexOf('#') : -1;

  return estimateDataURLBytes(
    fragmentIndex === -1 ? url : url.slice(0, fragmentIndex),
    estimatePercentDecodedBase64Bytes
  );
}

/**
 * Estimate the Buffer backing allocation used by Node's raw base64 decoder.
 *
 * @param {string} url
 * @returns {number}
 */
function estimateDataURLBufferAllocation(url) {
  return estimateDataURLBytes(url, estimateBase64BufferAllocation);
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/formDataToJSON.js"
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/formDataToJSON.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _toFormData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");






const MAX_DEPTH = _toFormData_js__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_FORM_DATA_MAX_DEPTH;

function throwIfDepthExceeded(index) {
  if (index > MAX_DEPTH) {
    throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"](
      'FormData field is too deeply nested (' + index + ' levels). Max depth: ' + MAX_DEPTH,
      _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_FORM_DATA_DEPTH_EXCEEDED
    );
  }
}

/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z] -> ['foo', 'x', 'y', 'z']
  // foo.x.y.z    -> ['foo', 'x', 'y', 'z']
  // A path is split on `.` and on `[...]` groups. A segment — whether written
  // in dot notation or captured inside brackets — may contain any character
  // except `.`, `[` and `]`, so a key like `user-name` or `user name` is kept
  // literal instead of being split (#5402). `.`, `[` and `]` keep their existing
  // meaning, e.g. `foo[bar.baz]` -> ['foo', 'bar', 'baz'] and `[]` is an array push.
  // Excluding `[` from the bracket group also makes the match fail fast at the
  // next `[`, so a malformed name cannot rescan to the end of the string from
  // every unmatched `[` — parsing stays linear in the length of the name.
  const path = [];
  const pattern = /[^.[\]]+|\[([^.[\]]*)]/g;
  let match;

  while ((match = pattern.exec(name)) !== null) {
    throwIfDepthExceeded(path.length);
    path.push(match[0] === '[]' ? '' : match[1] || match[0]);
  }

  return path;
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    throwIfDepthExceeded(index);

    let name = path[index++];

    if (name === '__proto__') return true;

    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(target) ? target.length : name;

    if (isLast) {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(target, name)) {
        target[name] = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(target[name])
          ? target[name].concat(value)
          : [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(target, name) || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFormData(formData) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(formData.entries)) {
    const obj = {};

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formDataToJSON);


/***/ },

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js"
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isAbsoluteURL)
/* harmony export */ });


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  if (typeof url !== 'string') {
    return false;
  }

  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js"
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isAxiosError)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(payload) && payload.isAxiosError === true;
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js"
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasStandardBrowserEnv
  ? ((origin, isMSIE) => (url) => {
      url = new URL(url, _platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].origin);

      return (
        origin.protocol === url.protocol &&
        origin.host === url.host &&
        (isMSIE || origin.port === url.port)
      );
    })(
      new URL(_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].origin),
      _platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].navigator && /(msie|trident)/i.test(_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].navigator.userAgent)
    )
  : () => true);


/***/ },

/***/ "./node_modules/axios/lib/helpers/normalizeURLForProtocolCheck.js"
/*!************************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeURLForProtocolCheck.js ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeURLForProtocolCheck)
/* harmony export */ });


const urlParserControlCharacters = /[\t\n\r]/g;

/**
 * Match WHATWG URL preprocessing before checking a URL's protocol.
 *
 * @param {string} url
 *
 * @returns {string}
 */
function normalizeURLForProtocolCheck(url) {
  if (typeof url !== 'string') {
    return url;
  }

  let start = 0;

  while (start < url.length && url.charCodeAt(start) <= 0x20) {
    start++;
  }

  return url.slice(start).replace(urlParserControlCharacters, '');
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/null.js"
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/null.js ***!
  \************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// eslint-disable-next-line strict
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (null);


/***/ },

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js"
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toObjectSet([
  'age',
  'authorization',
  'content-length',
  'content-type',
  'etag',
  'expires',
  'from',
  'host',
  'if-modified-since',
  'if-unmodified-since',
  'last-modified',
  'location',
  'max-forwards',
  'proxy-authorization',
  'referer',
  'retry-after',
  'user-agent',
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders &&
    rawHeaders.split('\n').forEach(function parser(line) {
      i = line.indexOf(':');
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();

      const hasKey = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(parsed, key);

      if (!key || (hasKey && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(ignoreDuplicateOf, key))) {
        return;
      }

      if (key === 'set-cookie') {
        if (hasKey) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = hasKey ? parsed[key] + ', ' + val : val;
      }
    });

  return parsed;
});
__webpack_require__.dn(__WEBPACK_DEFAULT_EXPORT__);


/***/ },

/***/ "./node_modules/axios/lib/helpers/parseProtocol.js"
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseProtocol.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseProtocol)
/* harmony export */ });


function parseProtocol(url) {
  const match = /^([-+\w]{1,25}):(?:\/\/)?/.exec(url);
  return (match && match[1]) || '';
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/progressEventReducer.js"
/*!****************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/progressEventReducer.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   asyncDecorator: () => (/* binding */ asyncDecorator),
/* harmony export */   progressEventDecorator: () => (/* binding */ progressEventDecorator),
/* harmony export */   progressEventReducer: () => (/* binding */ progressEventReducer)
/* harmony export */ });
/* harmony import */ var _speedometer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./speedometer.js */ "./node_modules/axios/lib/helpers/speedometer.js");
/* harmony import */ var _throttle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./throttle.js */ "./node_modules/axios/lib/helpers/throttle.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = (0,_speedometer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(50, 250);

  return (0,_throttle_js__WEBPACK_IMPORTED_MODULE_1__["default"])((e) => {
    if (!e || !_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isNumber(e.loaded)) {
      return;
    }
    const rawLoaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const loaded = Math.max(0, total != null ? Math.min(rawLoaded, total) : rawLoaded);
    const progressBytes = Math.max(0, loaded - bytesNotified);
    const rate = _speedometer(progressBytes);

    bytesNotified = Math.max(bytesNotified, loaded);

    const data = {
      loaded,
      total,
      progress: total ? loaded / total : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total ? (total - loaded) / rate : undefined,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? 'download' : 'upload']: true,
    };

    listener(data);
  }, freq);
};

const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;

  return [
    (loaded) =>
      throttled[0]({
        lengthComputable,
        total,
        loaded,
      }),
    throttled[1],
  ];
};

const asyncDecorator =
  (fn, scheduler = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].asap) =>
  (...args) =>
    scheduler(() => fn(...args));


/***/ },

/***/ "./node_modules/axios/lib/helpers/resolveConfig.js"
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/resolveConfig.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _isURLSameOrigin_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isURLSameOrigin.js */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
/* harmony import */ var _cookies_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cookies.js */ "./node_modules/axios/lib/helpers/cookies.js");
/* harmony import */ var _core_buildFullPath_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/buildFullPath.js */ "./node_modules/axios/lib/core/buildFullPath.js");
/* harmony import */ var _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _core_setFormDataHeaders_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/setFormDataHeaders.js */ "./node_modules/axios/lib/core/setFormDataHeaders.js");
/* harmony import */ var _buildURL_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./buildURL.js */ "./node_modules/axios/lib/helpers/buildURL.js");











/**
 * Encode a UTF-8 string to a Latin-1 byte string for use with btoa().
 * This is a modern replacement for the deprecated unescape(encodeURIComponent(str)) pattern.
 *
 * @param {string} str The string to encode
 *
 * @returns {string} UTF-8 bytes as a Latin-1 string
 */
const encodeUTF8 = (str) =>
  encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );

function resolveConfig(config) {
  const newConfig = (0,_core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, config);

  // Read only own properties to prevent prototype pollution gadgets
  // (e.g. Object.prototype.baseURL = 'https://evil.com').
  const own = (key) => (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].hasOwnProp(newConfig, key) ? newConfig[key] : undefined);

  const data = own('data');
  let withXSRFToken = own('withXSRFToken');
  const xsrfHeaderName = own('xsrfHeaderName');
  const xsrfCookieName = own('xsrfCookieName');
  let headers = own('headers');
  const auth = own('auth');
  const baseURL = own('baseURL');
  const allowAbsoluteUrls = own('allowAbsoluteUrls');
  const url = own('url');

  newConfig.headers = headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_7__["default"].from(headers);

  newConfig.url = (0,_buildURL_js__WEBPACK_IMPORTED_MODULE_9__["default"])(
    (0,_core_buildFullPath_js__WEBPACK_IMPORTED_MODULE_5__["default"])(baseURL, url, allowAbsoluteUrls, newConfig),
    own('params'),
    own('paramsSerializer')
  );

  // HTTP basic authentication
  if (auth) {
    const username = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSafeProp(auth, 'username') || '';
    const password = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSafeProp(auth, 'password') || '';

    try {
      headers.set(
        'Authorization',
        'Basic ' + btoa(username + ':' + (password ? encodeUTF8(password) : ''))
      );
    } catch (e) {
      throw _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].from(e, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"].ERR_BAD_OPTION_VALUE, config);
    }
  }

  if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFormData(data)) {
    const getHeaders = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSafeProp(data, 'getHeaders');

    if (
      _platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasStandardBrowserEnv ||
      _platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasStandardBrowserWebWorkerEnv ||
      _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isReactNative(data)
    ) {
      headers.setContentType(undefined); // browser/web worker/RN handles it
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFunction(getHeaders)) {
      // Node.js FormData (like form-data package)
      (0,_core_setFormDataHeaders_js__WEBPACK_IMPORTED_MODULE_8__["default"])(headers, getHeaders.call(data), own('formDataHeaderPolicy'));
    }
  }

  // Add xsrf header
  // This is only done if running in a standard browser environment.
  // Specifically not if we're in a web worker, or react-native.

  if (_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasStandardBrowserEnv) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isFunction(withXSRFToken)) {
      withXSRFToken = withXSRFToken(newConfig);
    }

    // Strict boolean check — prevents proto-pollution gadgets (e.g. Object.prototype.withXSRFToken = 1)
    // and misconfigurations (e.g. "false") from short-circuiting the same-origin check and leaking
    // the XSRF token cross-origin.
    const shouldSendXSRF =
      withXSRFToken === true || (withXSRFToken == null && (0,_isURLSameOrigin_js__WEBPACK_IMPORTED_MODULE_3__["default"])(newConfig.url));

    if (shouldSendXSRF) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && _cookies_js__WEBPACK_IMPORTED_MODULE_4__["default"].read(xsrfCookieName);

      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }

  return newConfig;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (resolveConfig);


/***/ },

/***/ "./node_modules/axios/lib/helpers/sanitizeHeaderValue.js"
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/sanitizeHeaderValue.js ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sanitizeByteStringHeaderValue: () => (/* binding */ sanitizeByteStringHeaderValue),
/* harmony export */   sanitizeHeaderValue: () => (/* binding */ sanitizeHeaderValue),
/* harmony export */   toByteStringHeaderObject: () => (/* binding */ toByteStringHeaderObject)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




function trimSPorHTAB(str) {
  let start = 0;
  let end = str.length;

  while (start < end) {
    const code = str.charCodeAt(start);

    if (code !== 0x09 && code !== 0x20) {
      break;
    }

    start += 1;
  }

  while (end > start) {
    const code = str.charCodeAt(end - 1);

    if (code !== 0x09 && code !== 0x20) {
      break;
    }

    end -= 1;
  }

  return start === 0 && end === str.length ? str : str.slice(start, end);
}

// The control-code ranges are intentional: header sanitization strips C0/DEL bytes.
// eslint-disable-next-line no-control-regex
const INVALID_UNICODE_HEADER_VALUE_CHARS = new RegExp('[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+', 'g');
// eslint-disable-next-line no-control-regex
const INVALID_BYTE_STRING_HEADER_VALUE_CHARS = new RegExp('[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+', 'g');

function sanitizeValue(value, invalidChars) {
  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value)) {
    return value.map((item) => sanitizeValue(item, invalidChars));
  }

  return trimSPorHTAB(String(value).replace(invalidChars, ''));
}

const sanitizeHeaderValue = (value) =>
  sanitizeValue(value, INVALID_UNICODE_HEADER_VALUE_CHARS);

const sanitizeByteStringHeaderValue = (value) =>
  sanitizeValue(value, INVALID_BYTE_STRING_HEADER_VALUE_CHARS);

function toByteStringHeaderObject(headers) {
  const byteStringHeaders = Object.create(null);

  _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(headers.toJSON(), (value, header) => {
    byteStringHeaders[header] = sanitizeByteStringHeaderValue(value);
  });

  return byteStringHeaders;
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/speedometer.js"
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/speedometer.js ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round((bytesCount * 1000) / passed) : undefined;
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (speedometer);


/***/ },

/***/ "./node_modules/axios/lib/helpers/spread.js"
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ spread)
/* harmony export */ });


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  const args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/throttle.js"
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/throttle.js ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Throttle decorator
 * @param {Function} fn
 * @param {Number} freq
 * @return {Array<Function>}
 */
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1000 / freq;
  let lastArgs;
  let timer;

  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };

  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };

  const flush = () => lastArgs && invoke(lastArgs);
  const flushWith = (...args) => invoke(args);

  return [throttled, flush, flushWith];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (throttle);


/***/ },

/***/ "./node_modules/axios/lib/helpers/toFormData.js"
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toFormData.js ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_FORM_DATA_MAX_DEPTH: () => (/* binding */ DEFAULT_FORM_DATA_MAX_DEPTH),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _platform_node_classes_FormData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../platform/node/classes/Buffer.js */ "./node_modules/axios/lib/helpers/null.js");




// temporary hotfix to avoid circular references until AxiosURLSearchParams is refactored



// Default nesting limit shared with the inverse transform (formDataToJSON) so
// the FormData <-> JSON round-trip stays symmetric.
const DEFAULT_FORM_DATA_MAX_DEPTH = 100;

/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(thing) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path
    .concat(key)
    .map(function each(token, i) {
      // eslint-disable-next-line no-param-reassign
      token = removeBrackets(token);
      return !dots && i ? '[' + token + ']' : token;
    })
    .join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(arr) && !arr.some(isVisitable);
}

const predicates = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"], {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (_platform_node_classes_FormData_js__WEBPACK_IMPORTED_MODULE_2__["default"] || FormData)();

  const option = (name, fallback) => {
    const value = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSafeProp(options, name);
    return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(value) ? fallback : value;
  };

  const metaTokens = option('metaTokens', true);
  // eslint-disable-next-line no-use-before-define
  const visitor = option('visitor') || defaultVisitor;
  const dots = option('dots', false);
  const indexes = option('indexes', false);
  const _Blob = option('Blob') || (typeof Blob !== 'undefined' && Blob);
  const maxDepth = option('maxDepth', DEFAULT_FORM_DATA_MAX_DEPTH);
  const useBlob = _Blob && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isSpecCompliantForm(formData);
  const stack = [];

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isDate(value)) {
      return value.toISOString();
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(value)) {
      return value.toString();
    }

    if (!useBlob && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBlob(value)) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('Blob is not supported. Use a Buffer instead.');
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBuffer(value) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isTypedArray(value)) {
      if (useBlob && typeof _Blob === 'function') {
        return new _Blob([value]);
      }
      if (_platform_node_classes_FormData_js__WEBPACK_IMPORTED_MODULE_2__["default"] && _platform_node_classes_FormData_js__WEBPACK_IMPORTED_MODULE_2__["default"].isBufferAvailable()) {
        return _platform_node_classes_FormData_js__WEBPACK_IMPORTED_MODULE_2__["default"].from(value);
      }
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"](
        'Blob is not supported. Use a Buffer instead.',
        _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_NOT_SUPPORT
      );
    }

    return value;
  }

  function throwIfMaxDepthExceeded(depth) {
    if (depth > maxDepth) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"](
        'Object is too deeply nested (' + depth + ' levels). Max depth: ' + maxDepth,
        _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_FORM_DATA_DEPTH_EXCEEDED
      );
    }
  }

  function stringifyWithDepthLimit(value, depth) {
    if (maxDepth === Infinity) {
      return JSON.stringify(value);
    }

    const ancestors = [];

    return JSON.stringify(value, function limitDepth(_key, currentValue) {
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(currentValue)) {
        return currentValue;
      }

      while (ancestors.length && ancestors[ancestors.length - 1] !== this) {
        ancestors.pop();
      }

      ancestors.push(currentValue);
      throwIfMaxDepthExceeded(depth + ancestors.length - 1);

      return currentValue;
    });
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isReactNative(formData) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isReactNativeBlob(value)) {
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }

    if (value && !path && typeof value === 'object') {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = stringifyWithDepthLimit(value, 1);
      } else if (
        (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) && isFlatArray(value)) ||
        ((_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFileList(value) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '[]')) && (arr = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toArray(value)))
      ) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(el) || el === null) &&
            formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true
                ? renderKey([key], index, dots)
                : indexes === null
                  ? key
                  : key + '[]',
              convertValue(el)
            );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable,
  });

  function build(value, path, depth = 0) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(value)) return;

    throwIfMaxDepthExceeded(depth);

    if (stack.indexOf(value) !== -1) {
      throw new Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(value, function each(el, key) {
      const result =
        !(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(el) || el === null) &&
        visitor.call(formData, el, _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(key) ? key.trim() : key, path, exposedHelpers);

      if (result === true) {
        build(el, path ? path.concat(key) : [key], depth + 1);
      }
    });

    stack.pop();
  }

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toFormData);


/***/ },

/***/ "./node_modules/axios/lib/helpers/toURLEncodedForm.js"
/*!************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toURLEncodedForm.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toURLEncodedForm)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _toFormData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");






function toURLEncodedForm(data, options) {
  return (0,_toFormData_js__WEBPACK_IMPORTED_MODULE_1__["default"])(data, new _platform_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].classes.URLSearchParams(), {
    visitor: function (value, key, path, helpers) {
      if (_platform_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].isNode && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options,
  });
}


/***/ },

/***/ "./node_modules/axios/lib/helpers/trackStream.js"
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/trackStream.js ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   readBytes: () => (/* binding */ readBytes),
/* harmony export */   streamChunk: () => (/* binding */ streamChunk),
/* harmony export */   trackStream: () => (/* binding */ trackStream)
/* harmony export */ });
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;

  if (!chunkSize || len < chunkSize) {
    yield chunk;
    return;
  }

  let pos = 0;
  let end;

  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};

const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};

const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }

  const reader = stream.getReader();
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};

const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator = readBytes(stream, chunkSize);

  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };

  return new ReadableStream(
    {
      async pull(controller) {
        try {
          const { done, value } = await iterator.next();

          if (done) {
            _onFinish();
            controller.close();
            return;
          }

          let len = value.byteLength;
          if (onProgress) {
            let loadedBytes = (bytes += len);
            onProgress(loadedBytes);
          }
          controller.enqueue(new Uint8Array(value));
        } catch (err) {
          _onFinish(err);
          throw err;
        }
      },
      cancel(reason) {
        _onFinish(reason);
        return iterator.return();
      },
    },
    {
      highWaterMark: 2,
    }
  );
};


/***/ },

/***/ "./node_modules/axios/lib/helpers/validator.js"
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _env_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env/data.js */ "./node_modules/axios/lib/env/data.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");





const validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return (
      '[Axios v' +
      _env_data_js__WEBPACK_IMPORTED_MODULE_0__.VERSION +
      "] Transitional option '" +
      opt +
      "'" +
      desc +
      (message ? '. ' + message : '')
    );
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"](
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

validators.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    // eslint-disable-next-line no-console
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object' || options === null) {
    throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('options must be an object', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    // Use hasOwnProperty so a polluted Object.prototype.<opt> cannot supply
    // a non-function validator and cause a TypeError.
    const validator = Object.prototype.hasOwnProperty.call(schema, opt) ? schema[opt] : undefined;
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"](
          'option ' + opt + ' must be ' + result,
          _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION_VALUE
        );
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('Unknown option ' + opt, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  assertOptions,
  validators,
});


/***/ },

/***/ "./node_modules/axios/lib/platform/browser/classes/Blob.js"
/*!*****************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/Blob.js ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof Blob !== 'undefined' ? Blob : null);


/***/ },

/***/ "./node_modules/axios/lib/platform/browser/classes/FormData.js"
/*!*********************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/FormData.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof FormData !== 'undefined' ? FormData : null);


/***/ },

/***/ "./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js"
/*!****************************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/AxiosURLSearchParams.js */ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof URLSearchParams !== 'undefined' ? URLSearchParams : _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ },

/***/ "./node_modules/axios/lib/platform/browser/index.js"
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/index.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _classes_URLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/URLSearchParams.js */ "./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js");
/* harmony import */ var _classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/FormData.js */ "./node_modules/axios/lib/platform/browser/classes/FormData.js");
/* harmony import */ var _classes_Blob_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Blob.js */ "./node_modules/axios/lib/platform/browser/classes/Blob.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  isBrowser: true,
  classes: {
    URLSearchParams: _classes_URLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    FormData: _classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    Blob: _classes_Blob_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  },
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
});


/***/ },

/***/ "./node_modules/axios/lib/platform/common/utils.js"
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/platform/common/utils.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasBrowserEnv: () => (/* binding */ hasBrowserEnv),
/* harmony export */   hasStandardBrowserEnv: () => (/* binding */ hasStandardBrowserEnv),
/* harmony export */   hasStandardBrowserWebWorkerEnv: () => (/* binding */ hasStandardBrowserWebWorkerEnv),
/* harmony export */   navigator: () => (/* binding */ _navigator),
/* harmony export */   origin: () => (/* binding */ origin)
/* harmony export */ });
const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

const _navigator = (typeof navigator === 'object' && navigator) || undefined;

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const hasStandardBrowserEnv =
  hasBrowserEnv &&
  (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
const hasStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();

const origin = (hasBrowserEnv && window.location.href) || 'http://localhost';




/***/ },

/***/ "./node_modules/axios/lib/platform/index.js"
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/platform/index.js ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node/index.js */ "./node_modules/axios/lib/platform/browser/index.js");
/* harmony import */ var _common_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/utils.js */ "./node_modules/axios/lib/platform/common/utils.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  ..._common_utils_js__WEBPACK_IMPORTED_MODULE_1__,
  ..._node_index_js__WEBPACK_IMPORTED_MODULE_0__["default"],
});


/***/ },

/***/ "./node_modules/axios/lib/utils.js"
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/bind.js */ "./node_modules/axios/lib/helpers/bind.js");




// utils is a library of generic helper functions non-specific to axios

const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (
  ({ hasOwnProperty }) =>
  (obj, prop) =>
    hasOwnProperty.call(obj, prop)
)(Object.prototype);

const isUnsafeObjectKey = (prop) =>
  typeof prop === 'string' &&
  (prop === '__proto__' || prop === 'constructor' || prop === 'prototype');

/**
 * Determine whether an inherited object must be treated as a shared-prototype
 * boundary. Cross-realm Object.prototype objects cannot be distinguished
 * reliably from application-created null-prototype objects because their
 * properties are mutable, so all inherited terminal prototypes are excluded
 * as a fail-closed boundary. A null-prototype source still keeps its own
 * properties, as produced by mergeConfig and other safe materialization paths.
 *
 * @param {*} obj The object to inspect
 * @param {*} prototype The object's prototype
 * @param {boolean} source Whether obj is the original traversal source
 *
 * @returns {boolean} True when obj is a safe prototype traversal boundary
 */
const isPrototypeBoundary = (obj, prototype, source) =>
  obj === Object.prototype || (!source && prototype === null);

/**
 * Determine whether an object can retain its identity through code paths that
 * add, replace, and remove config properties without bypassing unsafe-key
 * filtering. Immutable objects, unsafe-key-bearing objects, and objects with
 * accessor or restricted data properties must be materialized instead.
 *
 * @param {*} obj The object to inspect
 *
 * @returns {boolean} True when every own property is safe and fully mutable
 */
const isSafeAndFullyMutable = (obj) => {
  if (!Object.isExtensible(obj)) {
    return false;
  }

  const props = Object.getOwnPropertyNames(obj);

  if (Object.getOwnPropertySymbols) {
    props.push(...Object.getOwnPropertySymbols(obj));
  }

  return props.every((prop) => {
    if (isUnsafeObjectKey(prop)) {
      return false;
    }

    const descriptor = Object.getOwnPropertyDescriptor(obj, prop);

    return !!descriptor && descriptor.configurable && descriptor.writable === true;
  });
};

/**
 * Walk the prototype chain (excluding the source realm's Object.prototype)
 * looking for an own `prop`. This distinguishes genuine own/inherited members
 * — including class accessors and template prototypes — from members injected
 * via Object.prototype pollution (e.g. `Object.prototype.username = '...'`),
 * which live on Object.prototype itself and are therefore never matched.
 *
 * @param {*} thing The value whose chain to inspect
 * @param {string|symbol} prop The property key to look for
 *
 * @returns {boolean} True when `prop` is owned below Object.prototype
 */
const hasOwnInPrototypeChain = (thing, prop) => {
  let obj = thing;
  const seen = [];

  while (obj != null) {
    if (seen.indexOf(obj) !== -1) {
      return false;
    }
    seen.push(obj);

    const prototype = getPrototypeOf(obj);

    if (isPrototypeBoundary(obj, prototype, obj === thing)) {
      return false;
    }

    if (hasOwnProperty(obj, prop)) {
      return true;
    }
    obj = prototype;
  }
  return false;
};

/**
 * Read `obj[prop]` only when it is safe from Object.prototype pollution. Own
 * properties and members inherited from a non-Object.prototype source (a class
 * instance or template object) are honored; a value reachable only through a
 * polluted Object.prototype is ignored and `undefined` is returned.
 *
 * @param {*} obj The source object
 * @param {string|symbol} prop The property key to read
 *
 * @returns {*} The resolved value, or undefined when unsafe/absent
 */
const getSafeProp = (obj, prop) =>
  obj != null && hasOwnInPrototypeChain(obj, prop) ? obj[prop] : undefined;

/**
 * Flatten an object and its application-defined prototype chain into a
 * null-prototype object. Members inherited only from the source realm's
 * Object.prototype are deliberately excluded, while class/template members
 * below that boundary are preserved.
 *
 * @param {*} thing The value to flatten
 *
 * @returns {*} A null-prototype copy, or the original value when it is already
 * structurally safe or is not an object
 */
const toSafeFlatObject = (thing) => {
  if (thing == null || (typeof thing !== 'object' && typeof thing !== 'function')) {
    return thing;
  }

  const sourcePrototype = getPrototypeOf(thing);

  if (sourcePrototype === null && isSafeAndFullyMutable(thing)) {
    return thing;
  }

  const result = Object.create(null);
  const merged = Object.create(null);
  const seen = [];
  let current = thing;

  while (current != null) {
    if (seen.indexOf(current) !== -1) {
      break;
    }

    seen.push(current);

    const prototype = current === thing ? sourcePrototype : getPrototypeOf(current);

    if (isPrototypeBoundary(current, prototype, current === thing)) {
      break;
    }

    const props = Object.getOwnPropertyNames(current);

    if (Object.getOwnPropertySymbols) {
      props.push(...Object.getOwnPropertySymbols(current));
    }

    for (const prop of props) {
      if (isUnsafeObjectKey(prop)) {
        continue;
      }

      if (!hasOwnProperty(merged, prop)) {
        result[prop] = thing[prop];
        merged[prop] = true;
      }
    }

    current = prototype;
  }

  return result;
};

const kindOf = ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};

const typeOfTest = (type) => (thing) => typeof thing === type;

/**
 * Determine if a value is a non-null object
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const { isArray } = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return (
    val !== null &&
    !isUndefined(val) &&
    val.constructor !== null &&
    !isUndefined(val.constructor) &&
    isFunction(val.constructor.isBuffer) &&
    val.constructor.isBuffer(val)
  );
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = (thing) => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (!isObject(val)) {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (
    (prototype === null || prototype === Object.prototype || getPrototypeOf(prototype) === null) &&
    // Treat safe own/inherited Symbol.toStringTag or Symbol.iterator members as
    // evidence the value is tagged/iterable, while ignoring members reachable
    // only through shared or terminal prototype boundaries.
    !hasOwnInPrototypeChain(val, toStringTag) &&
    !hasOwnInPrototypeChain(val, iterator)
  );
};

/**
 * Determine if a value is an empty object (safely handles Buffers)
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an empty object, otherwise false
 */
const isEmptyObject = (val) => {
  // Early return for non-objects or Buffers to prevent RangeError
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }

  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    // Fallback for any other objects that might cause RangeError with Object.keys()
    return false;
  }
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a React Native Blob
 * React Native "blob": an object with a `uri` attribute. Optionally, it can
 * also have a `name` and `type` attribute to specify filename and content type
 *
 * @see https://github.com/facebook/react-native/blob/26684cf3adf4094eb6c405d345a75bf8c7c0bf88/Libraries/Network/FormData.js#L68-L71
 *
 * @param {*} value The value to test
 *
 * @returns {boolean} True if value is a React Native Blob, otherwise false
 */
const isReactNativeBlob = (value) => {
  return !!(value && typeof value.uri !== 'undefined');
};

/**
 * Determine if environment is React Native
 * ReactNative `FormData` has a non-standard `getParts()` method
 *
 * @param {*} formData The formData to test
 *
 * @returns {boolean} True if environment is React Native, otherwise false
 */
const isReactNative = (formData) => formData && typeof formData.getParts !== 'undefined';

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a FileList, otherwise false
 */
const isFileList = kindOfTest('FileList');
const isSet = kindOfTest('Set');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function getGlobal() {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof __webpack_require__.g !== 'undefined') return __webpack_require__.g;
  return {};
}

const G = getGlobal();
const FormDataCtor = typeof G.FormData !== 'undefined' ? G.FormData : undefined;

const isFormData = (thing) => {
  if (!thing) return false;
  if (FormDataCtor && thing instanceof FormDataCtor) return true;
  // Reject plain objects inheriting directly from Object.prototype so prototype-pollution gadgets can't spoof FormData.
  const proto = getPrototypeOf(thing);
  if (!proto || proto === Object.prototype) return false;
  if (!isFunction(thing.append)) return false;
  const kind = kindOf(thing);
  return (
    kind === 'formdata' ||
    // detect form-data instance
    (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
  );
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

const [isReadableStream, isRequest, isResponse, isHeaders] = [
  'ReadableStream',
  'Request',
  'Response',
  'Headers',
].map(kindOfTest);

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => {
  return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array<unknown>} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Object} [options]
 * @param {Boolean} [options.allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Buffer check
    if (isBuffer(obj)) {
      return;
    }

    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

/**
 * Finds a key in an object, case-insensitive, returning the actual key name.
 * Returns null if the object is a Buffer or if no match is found.
 *
 * @param {Object} obj - The object to search.
 * @param {string} key - The key to find (case-insensitive).
 * @returns {?string} The actual key name if found, otherwise null.
 */
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }

  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== 'undefined') return globalThis;
  return typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : __webpack_require__.g;
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * const result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(...objs) {
  const { caseless, skipUndefined } = (isContextDefined(this) && this) || {};
  const result = {};
  const assignValue = (val, key) => {
    // Skip dangerous property names to prevent prototype pollution
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return;
    }

    // findKey lowercases the key, so caseless lookup only applies to strings —
    // symbol keys are identity-matched.
    const targetKey = (caseless && typeof key === 'string' && findKey(result, key)) || key;
    // Read via own-prop only — a bare `result[targetKey]` walks the prototype
    // chain, so a polluted Object.prototype value could surface here and get
    // copied into the merged result.
    const existing = hasOwnProperty(result, targetKey) ? result[targetKey] : undefined;
    if (isPlainObject(existing) && isPlainObject(val)) {
      result[targetKey] = merge(existing, val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else if (!skipUndefined || !isUndefined(val)) {
      result[targetKey] = val;
    }
  };

  for (let i = 0, l = objs.length; i < l; i++) {
    const source = objs[i];
    if (!source || isBuffer(source)) {
      continue;
    }

    forEach(source, assignValue);

    if (typeof source !== 'object' || isArray(source)) {
      continue;
    }

    const symbols = Object.getOwnPropertySymbols(source);
    for (let j = 0; j < symbols.length; j++) {
      const symbol = symbols[j];
      if (propertyIsEnumerable.call(source, symbol)) {
        assignValue(source[symbol], symbol);
      }
    }
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Object} [options]
 * @param {Boolean} [options.allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(
    b,
    (val, key) => {
      if (thisArg && isFunction(val)) {
        Object.defineProperty(a, key, {
          // Null-proto descriptor so a polluted Object.prototype.get cannot
          // hijack defineProperty's accessor-vs-data resolution.
          __proto__: null,
          value: (0,_helpers_bind_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val, thisArg),
          writable: true,
          enumerable: true,
          configurable: true,
        });
      } else {
        Object.defineProperty(a, key, {
          __proto__: null,
          value: val,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
    },
    { allOwnKeys }
  );
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  Object.defineProperty(constructor.prototype, 'constructor', {
    __proto__: null,
    value: constructor,
    writable: true,
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(constructor, 'super', {
    __proto__: null,
    value: superConstructor.prototype,
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};

/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = ((TypedArray) => {
  // eslint-disable-next-line func-names
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];

  const _iterator = generator.call(obj);

  let result;

  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = (str) => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
    return p1.toUpperCase() + p2;
  });
};

const { propertyIsEnumerable } = Object.prototype;

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].includes(name)) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};

/**
 * Converts an array or a delimited string into an object set with values as keys and true as values.
 * Useful for fast membership checks.
 *
 * @param {Array|string} arrayOrString - The array or string to convert.
 * @param {string} delimiter - The delimiter to use if input is a string.
 * @returns {Object} An object with keys from the array or string, values set to true.
 */
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
};

const noop = () => {};

const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite((value = +value)) ? value : defaultValue;
};

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(
    thing &&
    isFunction(thing.append) &&
    thing[toStringTag] === 'FormData' &&
    thing[iterator]
  );
}

/**
 * Recursively converts an object to a JSON-compatible object, handling circular references and Buffers.
 *
 * @param {Object} obj - The object to convert.
 * @returns {Object} The JSON-compatible object.
 */
const toJSONObject = (obj) => {
  const visited = new WeakSet();

  const visit = (source) => {
    if (isObject(source)) {
      if (visited.has(source)) {
        return;
      }

      //Buffer check
      if (isBuffer(source)) {
        return source;
      }

      if (!('toJSON' in source)) {
        // add-on descent / delete-on-ascent: preserves path semantics, so DAG nodes serialise at every occurrence (see #7230).
        visited.add(source);

        let target;

        if (isSet(source)) {
          target = [];
          for (const value of source) {
            const reducedValue = visit(value);
            !isUndefined(reducedValue) && target.push(reducedValue);
          }
        } else {
          target = isArray(source) ? [] : {};

          forEach(source, (value, key) => {
            const reducedValue = visit(value);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });
        }

        visited.delete(source);

        return target;
      }
    }

    return source;
  };

  return visit(obj);
};

/**
 * Determines if a value is an async function.
 *
 * @param {*} thing - The value to test.
 * @returns {boolean} True if value is an async function, otherwise false.
 */
const isAsyncFn = kindOfTest('AsyncFunction');

/**
 * Determines if a value is thenable (has then and catch methods).
 *
 * @param {*} thing - The value to test.
 * @returns {boolean} True if value is thenable, otherwise false.
 */
const isThenable = (thing) =>
  thing &&
  (isObject(thing) || isFunction(thing)) &&
  isFunction(thing.then) &&
  isFunction(thing.catch);

// original code
// https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

/**
 * Provides a cross-platform setImmediate implementation.
 * Uses native setImmediate if available, otherwise falls back to postMessage or setTimeout.
 *
 * @param {boolean} setImmediateSupported - Whether setImmediate is supported.
 * @param {boolean} postMessageSupported - Whether postMessage is supported.
 * @returns {Function} A function to schedule a callback asynchronously.
 */
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }

  return postMessageSupported
    ? ((token, callbacks) => {
        _global.addEventListener(
          'message',
          ({ source, data }) => {
            if (source === _global && data === token) {
              callbacks.length && callbacks.shift()();
            }
          },
          false
        );

        return (cb) => {
          callbacks.push(cb);
          _global.postMessage(token, '*');
        };
      })(`axios@${Math.random()}`, [])
    : (cb) => setTimeout(cb);
})(typeof setImmediate === 'function', isFunction(_global.postMessage));

/**
 * Schedules a microtask or asynchronous callback as soon as possible.
 * Uses queueMicrotask if available, otherwise falls back to process.nextTick or _setImmediate.
 *
 * @type {Function}
 */
const asap =
  typeof queueMicrotask !== 'undefined'
    ? queueMicrotask.bind(_global)
    : (typeof process !== 'undefined' && process.nextTick) || _setImmediate;

// *********************

const isIterable = (thing) => thing != null && isFunction(thing[iterator]);

/**
 * Determine if a value is iterable via an iterator that is NOT sourced solely
 * from a polluted Object.prototype. Use this instead of `isIterable` whenever
 * the iterable comes from untrusted input (e.g. user-supplied header sources),
 * so `Object.prototype[Symbol.iterator] = ...` cannot turn an ordinary object
 * into an attacker-controlled entries iterator.
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value has a non-polluted iterator
 */
const isSafeIterable = (thing) =>
  thing != null && hasOwnInPrototypeChain(thing, iterator) && isIterable(thing);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isReactNativeBlob,
  isReactNative,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  hasOwnInPrototypeChain,
  getSafeProp,
  toSafeFlatObject,
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable,
  isSafeIterable,
});


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/set anonymous default export name */
/******/ 	// set .name for anonymous default exports per ES spec
/******/ 	// skipped when the property is non-configurable (pre-ES2015 engines),
/******/ 	// where Object.defineProperty would throw
/******/ 	__webpack_require__.dn = (x) => {
/******/ 		var descriptor = Object.getOwnPropertyDescriptor(x, "name");
/******/ 		if (!descriptor || (!descriptor.writable && descriptor.configurable)) Object.defineProperty(x, "name", { value: "default", configurable: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./page/content/index.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./page/content/index.css");
/* harmony import */ var _utils_alert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/alert.js */ "./utils/alert.js");
/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/request.js */ "./utils/request.js");
/* harmony import */ var _utils_auth_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/auth.js */ "./utils/auth.js");




/**
 * 目标1：获取文章列表并展示
 *  1.1 准备查询参数对象
 *  1.2 获取文章列表数据
 *  1.3 展示到指定的标签结构中
 */

/**
 * 目标2：筛选文章列表
 *  2.1 设置频道列表数据
 *  2.2 监听筛选条件改变，保存查询信息到查询参数对象
 *  2.3 点击筛选时，传递查询参数对象到服务器
 *  2.4 获取匹配数据，覆盖到页面展示
 */

/**
 * 目标3：分页功能
 *  3.1 保存并设置文章总条数
 *  3.2 点击下一页，做临界值判断，并切换页码参数并请求最新数据
 *  3.3 点击上一页，做临界值判断，并切换页码参数并请求最新数据
 */

/**
 * 目标4：删除功能
 *  4.1 关联文章 id 到删除图标
 *  4.2 点击删除时，获取文章 id
 *  4.3 调用删除接口，传递文章 id 到服务器
 *  4.4 重新获取文章列表，并覆盖展示
 *  4.5 删除最后一页的最后一条，需要自动向前翻页
 */

// 点击编辑时，获取文章 id，跳转到发布文章页面传递文章 id 过去

const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
  placeholder: 'Type here...',
  onChange(editor) {
    const html = editor.getHtml()
    document.querySelector("textarea").value = html;
    console.log(document.querySelector("textarea").value)
  }
}


const editor = createEditor({
  selector: '#editor-container',
  html: '<p><br></p>',
  config: editorConfig,
  mode: 'default', // or 'simple'
})
const toolbarConfig = {}

const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: toolbarConfig,
  mode: 'default', // or 'simple'
})


const editModal = new bootstrap.Modal("#edit-modal");
const deleteModal = new bootstrap.Modal("#delete-modal");

console.log(editor)
let selectedArticle;
(0,_utils_auth_js__WEBPACK_IMPORTED_MODULE_3__.auth)();

getArticleList();
console.log("test")
getChannelList();

document.querySelector(".pagination").addEventListener("click", function (e) {
  e.preventDefault();
  console.log("!")
  const currentPage = document.querySelector(".page-now").dataset.id;
  const totalCount = document.querySelector(".total-count").dataset.id;
  const params = {};
  if (e.target.classList.contains("next")) {
    params.page = +currentPage + 1
    if (+currentPage * 10 >= +totalCount) {
      myAlert(false, "当前为最后一页")
      return
    }
  } else if (e.target.classList.contains("last")) {
    if (+currentPage === 1) {
      myAlert(false, "当前为第一页");
      return;
    }
    params.page = +currentPage - 1
  }
  getArticleList(params).then(r => {
    console.log(r)
  })
})

document.querySelector("body").addEventListener("hide.bs.modal", function (e) {
  if (document.activeElement) {
    document.activeElement.blur();
  }
  console.log(1)
  this.querySelector(".modal form").reset();
  editor.clear()
})

document.querySelector(".table.table-striped").addEventListener("click", function (e) {
  if (e.target.tagName === "I") {
    selectedArticle = e.target.id;
    if (e.target.classList.contains("edit")) {
      // getChannelList();
      // getArticleDetail(e.target.id);
      //等待所有promise完成进行数据回显
      Promise.all([getChannelList(), getArticleDetail(e.target.id)]).then(r => {
        document.querySelector(".modal .form-select").innerHTML = '<option value="" selected>请选择文章频道</option>' + r[0].data.data.channels.map(item => {
          return ` <option value="${item.id}">${item.name}</option>`
        }).join("")
        document.querySelector(`.modal .form-select option[selected]`).selected = false
        console.log(r[1])
        for (let k in r[1].data.data) {
          console.log(k)
          if (document.querySelector(`form [name="${k}"]`)) {
            if (k === "channel_id") {

              document.querySelector(`.modal .form-select option[value="${r[1].data.data[k]}"]`).selected = true
            } else {
              document.querySelector(`form [name="${k}"]`).value = r[1].data.data[k]
            }
          }
        }
        editor.setHtml(r[1].data.data.content)
        document.querySelector(".cover").classList.add("show");
        document.querySelector(".cover img").src = r[1].data.data.cover.images[0] || ""
      })
    } else if (e.target.classList.contains("del")) {
      deleteModal.show();
    }
  }
})
document.querySelector("#delete-modal .btn-primary").addEventListener("click", async function () {
  if (selectedArticle) {
    await deleteArticle(selectedArticle);
  }
  deleteModal.hide()
})
document.querySelector("#edit-modal .modal-footer .btn-primary").addEventListener("click", function () {
  document.querySelector(".modal form").requestSubmit();
})


document.querySelector(".cover input").addEventListener("change", function () {
  console.log(this.files)
  document.querySelector(".cover img").src = URL.createObjectURL(this.files[0])
})

document.querySelector(".modal form").addEventListener("submit", async function (e) {
  e.preventDefault();
  //发送照片数据拿到照片连接
  let url = document.querySelector(".cover img").src;
  if (document.querySelector("input.img-file").files.length > 0) {
    const formData = new FormData();
    formData.append("image", document.querySelector("input.img-file").files[0])
    const result = await (0,_request_js__WEBPACK_IMPORTED_MODULE_2__.axios)({
      url: "/v1_0/upload",
      method: "POST",
      data: formData
    })
    url = result.data.data.url
  }

  const data = {};
  $(this).serializeArray().forEach(item => {
    data[item.name] = item.value
  })

  data.cover = {
    type: 1,
    images: [url]
  }

  console.log(data);

  const r = await editArticle(data.id, data);

  editModal.hide();
  console.log(r)
  getArticleList();
})




document.querySelector(".sel-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const data = {}
  console.log($(this).serializeArray())
  $(this).serializeArray().forEach(item => {
    if (item) {
      data[item.name] = item.value;
    }
  })

  const result = await getArticleList(data)

})


async function getArticleDetail(id) {
  const result = await (0,_request_js__WEBPACK_IMPORTED_MODULE_2__.axios)({
    url: `/v1_0/mp/articles/${id}`,
  })
  console.log(result)
  return result;
}
async function editArticle(id, data) {
  const result = await (0,_request_js__WEBPACK_IMPORTED_MODULE_2__.axios)({
    url: `/v1_0/mp/articles/${id}`,
    method: "PUT",
    data
  })
  console.log(result);
}

async function deleteArticle(id) {
  const result = await (0,_request_js__WEBPACK_IMPORTED_MODULE_2__.axios)({
    url: `/v1_0/mp/articles/${id}`,
    method: "DELETE"
  })
  getArticleList()
  console.log(result)
}
async function getChannelList() {
  const result = await (0,_request_js__WEBPACK_IMPORTED_MODULE_2__.axios)({
    url: "/v1_0/channels"
  });
  document.querySelector(".form-select").innerHTML = '<option value="" selected>请选择文章频道</option>' + result.data.data.channels.map(item => {
    return ` <option value="${item.id}">${item.name}</option>`
  }).join("")
  return result;
}

async function getArticleList(params) {
  const data = await (0,_request_js__WEBPACK_IMPORTED_MODULE_2__.axios)({
    url: "/v1_0/mp/articles",
    params: {
      ...params
    }
  })
  document.querySelector(".card .align-middle.art-list").innerHTML = data.data.data.results.map(item => {
    return ` <tr>
                      <td>
                        <img
                          src="${item.cover.images[0] || ""}"
                          alt="">
                      </td>
                      <td>${item.title}</td>
                      <td>
                        ${item.status === 2 ? '<span class="badge text-bg-success">审核通过</span>' : '<span class="badge text-bg-primary">待审核</span>'}
                      </td>
                      <td>
                        <span>${item.pubdate}</span>
                      </td>
                      <td>
                        <span>${item.read_count}</span>
                      </td>
                      <td>
                        <span>${item.comment_count}</span>
                      </td>
                      <td>
                        <span>${item.like_count}</span>
                      </td>
                      <td>
                        <i class="bi bi-pencil-square edit" id="${item.id}" data-bs-toggle="modal" data-bs-target="#edit-modal"></i>
                        <i class="bi bi-trash3 del" id="${item.id}" data-bs-toggle="modal" data-bs-target="#delete-modal"></i>
                      </td>
                    </tr>`
  }).join("")
  console.log(data)
  document.querySelector(".page-item.page-now").innerHTML = `第${data.data.data.page}页`
  document.querySelector(".page-item.page-now").dataset.id = data.data.data.page
  document.querySelector(".total-count").innerHTML = `共${data.data.data.total_count}条`
  document.querySelector(".total-count").dataset.id = data.data.data.total_count
  return data;
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY29udGVudC5iZDcxZDE5ZWUwN2M4N2IzMjRlNi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLFdBQVcsR0FBRztBQUNkO0FBQ0EsQ0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEM7Ozs7Ozs7Ozs7Ozs7OztBQ2xCa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLG1EQUFLO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7OztBQzFCMEI7QUFDWjtBQUNkLDZDQUFLO0FBQ0wsNkNBQUs7QUFDTDtBQUNBO0FBQ0EsZ0RBQWdELE1BQU07QUFDdEQ7QUFDQTtBQUNBLENBQUM7O0FBRUQsNkNBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQitCO0FBQ0k7QUFDRjtBQUNTO0FBQ0k7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxRQUFRLGdEQUFXO0FBQ25CLE9BQU8sK0NBQVU7QUFDakI7QUFDQSxTQUFTLCtDQUFxQjtBQUM5QixHQUFHO0FBQ0g7O0FBRUE7QUFDQSxpREFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHdCQUF3QjtBQUNsRSxNQUFNO0FBQ047QUFDQTtBQUNBLCtDQUErQyx3QkFBd0I7QUFDdkU7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQSxzQ0FB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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2QsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEscUJBQU0seUJBQXlCLHFCQUFNO0FBQ2xEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsdUJBQXVCO0FBQ2xDLFdBQVcsVUFBVTtBQUNyQjtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFNBQVM7QUFDcEIsYUFBYTtBQUNiO0FBQ0EsNEJBQTRCLHFCQUFxQixJQUFJO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLE9BQU87QUFDdkM7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUZBQXVGLHFCQUFNO0FBQzdGLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsU0FBUyxHQUFHLFNBQVM7QUFDOUMsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBLFVBQVUsMEJBQTBCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sa0NBQWtDO0FBQ2xDLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUEsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLG9CQUFvQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsU0FBUztBQUNwQixhQUFhLFFBQVE7QUFDckI7QUFDQSxpQ0FBaUMsYUFBYSxJQUFJO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsNERBQUk7QUFDckI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0wsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixXQUFXLFVBQVU7QUFDckIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxrQkFBa0I7QUFDN0IsV0FBVyxVQUFVO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsa0JBQWtCO0FBQzdCLFdBQVcsVUFBVTtBQUNyQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLFFBQVEsdUJBQXVCOztBQUUvQjtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGNBQWM7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLFdBQVcsY0FBYztBQUNoQztBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQzs7Ozs7OztVQzduQ0Y7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVQzVCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBLEU7OztVQ1BBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EsR0FBRztVQUNIO1VBQ0E7VUFDQSxDQUFDLEk7OztVQ1BELHlGOzs7VUNBQTtVQUNBO1VBQ0Esc0RBQXNELGlCQUFpQjtVQUN2RSxnREFBZ0QsYUFBYTtVQUM3RCxFOzs7VUNKQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EsMEdBQTBHLHNDQUFzQztVQUNoSixFOzs7Ozs7Ozs7Ozs7OztBQ05vQjtBQUNTO0FBQ087QUFDTTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUSw4QkFBOEI7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9EQUFJOztBQUVKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsUUFBUSxJQUFJLFVBQVU7QUFDMUQsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELEVBQUU7QUFDdEQ7O0FBRUEsMEVBQTBFLGtCQUFrQjtBQUM1RixjQUFjO0FBQ2Qsb0RBQW9ELEVBQUU7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixrREFBSztBQUM5QjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7O0FBS0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUEsQ0FBQzs7O0FBR0Q7QUFDQSx1QkFBdUIsa0RBQUs7QUFDNUIsOEJBQThCLEdBQUc7QUFDakMsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtEQUFLO0FBQzVCLDhCQUE4QixHQUFHO0FBQ2pDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixrREFBSztBQUM1Qiw4QkFBOEIsR0FBRztBQUNqQztBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrREFBSztBQUM1QjtBQUNBLEdBQUc7QUFDSDtBQUNBLDhCQUE4QixRQUFRLElBQUksVUFBVTtBQUNwRCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixrREFBSztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQywyQkFBMkI7QUFDNUQ7QUFDQTtBQUNBLDRCQUE0QixXQUFXO0FBQ3ZDO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQSxnQ0FBZ0MsYUFBYTtBQUM3QztBQUNBO0FBQ0EsZ0NBQWdDLGdCQUFnQjtBQUNoRDtBQUNBO0FBQ0EsZ0NBQWdDLG1CQUFtQjtBQUNuRDtBQUNBO0FBQ0EsZ0NBQWdDLGdCQUFnQjtBQUNoRDtBQUNBO0FBQ0Esa0VBQWtFLFFBQVE7QUFDMUUsMERBQTBELFFBQVE7QUFDbEU7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGdFQUFnRSxvQkFBb0I7QUFDcEY7QUFDQSx5REFBeUQsMkJBQTJCO0FBQ3BGO0FBQ0E7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZS9jb250ZW50L2luZGV4LmNzcz9iYjA4Iiwid2VicGFjazovLy8uL3V0aWxzL2FsZXJ0LmpzIiwid2VicGFjazovLy8uL3V0aWxzL2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NIZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2J1aWxkRnVsbFBhdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21ldGhvZExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldEZvcm1EYXRhSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9lbnYvZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL0h0dHBTdGF0dXNDb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9lc3RpbWF0ZURhdGFVUkxEZWNvZGVkQnl0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0F4aW9zRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplVVJMRm9yUHJvdG9jb2xDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbnVsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZVByb3RvY29sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc2FuaXRpemVIZWFkZXJWYWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3BlZWRvbWV0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdGhyb3R0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvRm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy92YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvQmxvYi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9Gb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9VUkxTZWFyY2hQYXJhbXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vY29tbW9uL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL3NldCBhbm9ueW1vdXMgZGVmYXVsdCBleHBvcnQgbmFtZSIsIndlYnBhY2s6Ly8vLi9wYWdlL2NvbnRlbnQvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8g5by556qX5o+S5Lu2XG4vLyDpnIDopoHlhYjlh4blpIcgYWxlcnQg5qC35byP55u45YWz55qEIERPTVxuLyoqXG4gKiBCUyDnmoQgQWxlcnQg6K2m5ZGK5qGG5Ye95pWw77yMMuenkuWQjuiHquWKqOa2iOWksVxuICogQHBhcmFtIHsqfSBpc1N1Y2Nlc3Mg5oiQ5YqfIHRydWXvvIzlpLHotKUgZmFsc2VcbiAqIEBwYXJhbSB7Kn0gbXNnIOaPkOekuua2iOaBr1xuICovXG4gZXhwb3J0IGZ1bmN0aW9uIG15QWxlcnQoaXNTdWNjZXNzLCBtc2cpIHtcbiAgY29uc3QgbXlBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydCcpXG4gIG15QWxlcnQuY2xhc3NMaXN0LmFkZChpc1N1Y2Nlc3MgPyAnYWxlcnQtc3VjY2VzcycgOiAnYWxlcnQtZGFuZ2VyJylcbiAgbXlBbGVydC5pbm5lckhUTUwgPSBtc2dcbiAgbXlBbGVydC5jbGFzc0xpc3QuYWRkKCdzaG93JylcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBteUFsZXJ0LmNsYXNzTGlzdC5yZW1vdmUoaXNTdWNjZXNzID8gJ2FsZXJ0LXN1Y2Nlc3MnIDogJ2FsZXJ0LWRhbmdlcicpXG4gICAgbXlBbGVydC5pbm5lckhUTUwgPSAnJ1xuICAgIG15QWxlcnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpXG4gIH0sIDIwMDApXG59IiwiaW1wb3J0IHtheGlvc30gZnJvbSBcIkAvcmVxdWVzdC5qc1wiXG5mdW5jdGlvbiBhdXRoKCkge1xuICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKSkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwibG9naW4uaHRtbFwiXG4gICAgfVxufVxuXG5mdW5jdGlvbiBzYXZlVG9rZW4odG9rZW4pIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRva2VuXCIsIEpTT04uc3RyaW5naWZ5KHRva2VuKSk7XG59XG5cbmxvZ291dCgpO1xuZnVuY3Rpb24gbG9nb3V0KCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucXVpdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInRva2VuXCIpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxuICAgIH0pXG59XG5nZXRQcm9maWxlKClcbmZ1bmN0aW9uIGdldFByb2ZpbGUoKSB7XG4gICAgYXhpb3Moe1xuICAgICAgICB1cmw6IFwiL3YxXzAvdXNlci9wcm9maWxlXCJcbiAgICB9KS50aGVuKHIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5pY2stbmFtZVwiKS5pbm5lckhUTUwgPSBcIuaYteensCBcIiArIHIuZGF0YS5kYXRhLm5hbWU7XG4gICAgfSlcbn1cbmV4cG9ydCB7YXV0aH0iLCJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5leHBvcnQge2F4aW9zfVxuYXhpb3MuZGVmYXVsdHMuYmFzZVVSTCA9IFwiaHR0cHM6Ly9nZWVrLml0aGVpbWEubmV0L1wiO1xuYXhpb3MuaW50ZXJjZXB0b3JzLnJlcXVlc3QudXNlKGNvbmZpZyA9PiB7XG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpKS50b2tlbiA6IFwiXCI7XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICAgIGNvbmZpZy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcnMgJHt0b2tlbn1gO1xuICAgIH1cbiAgICByZXR1cm4gY29uZmlnXG59KVxuXG5heGlvcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKG51bGwsIGVycm9yID0+IHtcbiAgICBpZiAoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIikgJiYgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwidG9rZW5cIik7XG4gICAgICAgIG15QWxlcnQoZmFsc2UsIFwi6Lqr5Lu96aqM6K+B5aSx6LSlXCIpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IFwiLi8uLi9sb2dpbi9cIlxuICAgICAgICB9LCAyMDAwKVxuICAgIH1cbiAgICB0aHJvdyBlcnJvclxufSkiLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IGh0dHBBZGFwdGVyIGZyb20gJy4vaHR0cC5qcyc7XG5pbXBvcnQgeGhyQWRhcHRlciBmcm9tICcuL3hoci5qcyc7XG5pbXBvcnQgKiBhcyBmZXRjaEFkYXB0ZXIgZnJvbSAnLi9mZXRjaC5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuXG4vKipcbiAqIEtub3duIGFkYXB0ZXJzIG1hcHBpbmcuXG4gKiBQcm92aWRlcyBlbnZpcm9ubWVudC1zcGVjaWZpYyBhZGFwdGVycyBmb3IgQXhpb3M6XG4gKiAtIGBodHRwYCBmb3IgTm9kZS5qc1xuICogLSBgeGhyYCBmb3IgYnJvd3NlcnNcbiAqIC0gYGZldGNoYCBmb3IgZmV0Y2ggQVBJLWJhc2VkIHJlcXVlc3RzXG4gKlxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIEZ1bmN0aW9ufE9iamVjdD59XG4gKi9cbmNvbnN0IGtub3duQWRhcHRlcnMgPSB7XG4gIGh0dHA6IGh0dHBBZGFwdGVyLFxuICB4aHI6IHhockFkYXB0ZXIsXG4gIGZldGNoOiB7XG4gICAgZ2V0OiBmZXRjaEFkYXB0ZXIuZ2V0RmV0Y2gsXG4gIH0sXG59O1xuXG4vLyBBc3NpZ24gYWRhcHRlciBuYW1lcyBmb3IgZWFzaWVyIGRlYnVnZ2luZyBhbmQgaWRlbnRpZmljYXRpb25cbnV0aWxzLmZvckVhY2goa25vd25BZGFwdGVycywgKGZuLCB2YWx1ZSkgPT4ge1xuICBpZiAoZm4pIHtcbiAgICB0cnkge1xuICAgICAgLy8gTnVsbC1wcm90byBkZXNjcmlwdG9ycyBzbyBhIHBvbGx1dGVkIE9iamVjdC5wcm90b3R5cGUuZ2V0IGNhbm5vdCB0dXJuXG4gICAgICAvLyB0aGVzZSBkYXRhIGRlc2NyaXB0b3JzIGludG8gYWNjZXNzb3IgZGVzY3JpcHRvcnMgb24gdGhlIHdheSBpbi5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ25hbWUnLCB7IF9fcHJvdG9fXzogbnVsbCwgdmFsdWUgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ2FkYXB0ZXJOYW1lJywgeyBfX3Byb3RvX186IG51bGwsIHZhbHVlIH0pO1xuICB9XG59KTtcblxuLyoqXG4gKiBSZW5kZXIgYSByZWplY3Rpb24gcmVhc29uIHN0cmluZyBmb3IgdW5rbm93biBvciB1bnN1cHBvcnRlZCBhZGFwdGVyc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWFzb25cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHJlbmRlclJlYXNvbiA9IChyZWFzb24pID0+IGAtICR7cmVhc29ufWA7XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGFkYXB0ZXIgaXMgcmVzb2x2ZWQgKGZ1bmN0aW9uLCBudWxsLCBvciBmYWxzZSlcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufG51bGx8ZmFsc2V9IGFkYXB0ZXJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBpc1Jlc29sdmVkSGFuZGxlID0gKGFkYXB0ZXIpID0+XG4gIHV0aWxzLmlzRnVuY3Rpb24oYWRhcHRlcikgfHwgYWRhcHRlciA9PT0gbnVsbCB8fCBhZGFwdGVyID09PSBmYWxzZTtcblxuLyoqXG4gKiBHZXQgdGhlIGZpcnN0IHN1aXRhYmxlIGFkYXB0ZXIgZnJvbSB0aGUgcHJvdmlkZWQgbGlzdC5cbiAqIFRyaWVzIGVhY2ggYWRhcHRlciBpbiBvcmRlciB1bnRpbCBhIHN1cHBvcnRlZCBvbmUgaXMgZm91bmQuXG4gKiBUaHJvd3MgYW4gQXhpb3NFcnJvciBpZiBubyBhZGFwdGVyIGlzIHN1aXRhYmxlLlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nfEZ1bmN0aW9uPnxzdHJpbmd8RnVuY3Rpb259IGFkYXB0ZXJzIC0gQWRhcHRlcihzKSBieSBuYW1lIG9yIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIEF4aW9zIHJlcXVlc3QgY29uZmlndXJhdGlvblxuICogQHRocm93cyB7QXhpb3NFcnJvcn0gSWYgbm8gc3VpdGFibGUgYWRhcHRlciBpcyBhdmFpbGFibGVcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIHJlc29sdmVkIGFkYXB0ZXIgZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZ2V0QWRhcHRlcihhZGFwdGVycywgY29uZmlnKSB7XG4gIGFkYXB0ZXJzID0gdXRpbHMuaXNBcnJheShhZGFwdGVycykgPyBhZGFwdGVycyA6IFthZGFwdGVyc107XG5cbiAgY29uc3QgeyBsZW5ndGggfSA9IGFkYXB0ZXJzO1xuICBsZXQgbmFtZU9yQWRhcHRlcjtcbiAgbGV0IGFkYXB0ZXI7XG5cbiAgY29uc3QgcmVqZWN0ZWRSZWFzb25zID0ge307XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIG5hbWVPckFkYXB0ZXIgPSBhZGFwdGVyc1tpXTtcbiAgICBsZXQgaWQ7XG5cbiAgICBhZGFwdGVyID0gbmFtZU9yQWRhcHRlcjtcblxuICAgIGlmICghaXNSZXNvbHZlZEhhbmRsZShuYW1lT3JBZGFwdGVyKSkge1xuICAgICAgYWRhcHRlciA9IGtub3duQWRhcHRlcnNbKGlkID0gU3RyaW5nKG5hbWVPckFkYXB0ZXIpKS50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgaWYgKGFkYXB0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihgVW5rbm93biBhZGFwdGVyICcke2lkfSdgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWRhcHRlciAmJiAodXRpbHMuaXNGdW5jdGlvbihhZGFwdGVyKSB8fCAoYWRhcHRlciA9IGFkYXB0ZXIuZ2V0KGNvbmZpZykpKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmVqZWN0ZWRSZWFzb25zW2lkIHx8ICcjJyArIGldID0gYWRhcHRlcjtcbiAgfVxuXG4gIGlmICghYWRhcHRlcikge1xuICAgIGNvbnN0IHJlYXNvbnMgPSBPYmplY3QuZW50cmllcyhyZWplY3RlZFJlYXNvbnMpLm1hcChcbiAgICAgIChbaWQsIHN0YXRlXSkgPT5cbiAgICAgICAgYGFkYXB0ZXIgJHtpZH0gYCArXG4gICAgICAgIChzdGF0ZSA9PT0gZmFsc2UgPyAnaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgZW52aXJvbm1lbnQnIDogJ2lzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGJ1aWxkJylcbiAgICApO1xuXG4gICAgbGV0IHMgPSBsZW5ndGhcbiAgICAgID8gcmVhc29ucy5sZW5ndGggPiAxXG4gICAgICAgID8gJ3NpbmNlIDpcXG4nICsgcmVhc29ucy5tYXAocmVuZGVyUmVhc29uKS5qb2luKCdcXG4nKVxuICAgICAgICA6ICcgJyArIHJlbmRlclJlYXNvbihyZWFzb25zWzBdKVxuICAgICAgOiAnYXMgbm8gYWRhcHRlciBzcGVjaWZpZWQnO1xuXG4gICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICBgVGhlcmUgaXMgbm8gc3VpdGFibGUgYWRhcHRlciB0byBkaXNwYXRjaCB0aGUgcmVxdWVzdCBgICsgcyxcbiAgICAgIEF4aW9zRXJyb3IuRVJSX05PVF9TVVBQT1JUXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG4vKipcbiAqIEV4cG9ydHMgQXhpb3MgYWRhcHRlcnMgYW5kIHV0aWxpdHkgdG8gcmVzb2x2ZSBhbiBhZGFwdGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIFJlc29sdmUgYW4gYWRhcHRlciBmcm9tIGEgbGlzdCBvZiBhZGFwdGVyIG5hbWVzIG9yIGZ1bmN0aW9ucy5cbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgZ2V0QWRhcHRlcixcblxuICAvKipcbiAgICogRXhwb3NlcyBhbGwga25vd24gYWRhcHRlcnNcbiAgICogQHR5cGUge09iamVjdDxzdHJpbmcsIEZ1bmN0aW9ufE9iamVjdD59XG4gICAqL1xuICBhZGFwdGVyczoga25vd25BZGFwdGVycyxcbn07XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgY29tcG9zZVNpZ25hbHMgZnJvbSAnLi4vaGVscGVycy9jb21wb3NlU2lnbmFscy5qcyc7XG5pbXBvcnQgeyB0cmFja1N0cmVhbSB9IGZyb20gJy4uL2hlbHBlcnMvdHJhY2tTdHJlYW0uanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQge1xuICBwcm9ncmVzc0V2ZW50UmVkdWNlcixcbiAgcHJvZ3Jlc3NFdmVudERlY29yYXRvcixcbiAgYXN5bmNEZWNvcmF0b3IsXG59IGZyb20gJy4uL2hlbHBlcnMvcHJvZ3Jlc3NFdmVudFJlZHVjZXIuanMnO1xuaW1wb3J0IHJlc29sdmVDb25maWcgZnJvbSAnLi4vaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzJztcbmltcG9ydCBzZXR0bGUgZnJvbSAnLi4vY29yZS9zZXR0bGUuanMnO1xuaW1wb3J0IGVzdGltYXRlRGF0YVVSTERlY29kZWRCeXRlcyBmcm9tICcuLi9oZWxwZXJzL2VzdGltYXRlRGF0YVVSTERlY29kZWRCeXRlcy5qcyc7XG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnLi4vZW52L2RhdGEuanMnO1xuaW1wb3J0IHsgdG9CeXRlU3RyaW5nSGVhZGVyT2JqZWN0IH0gZnJvbSAnLi4vaGVscGVycy9zYW5pdGl6ZUhlYWRlclZhbHVlLmpzJztcblxuY29uc3QgREVGQVVMVF9DSFVOS19TSVpFID0gNjQgKiAxMDI0O1xuXG5jb25zdCBERUZBVUxUX1JFUVVFU1RfT1BUSU9OUyA9IHtcbiAgY2FjaGU6ICdkZWZhdWx0JyxcbiAgcmVkaXJlY3Q6ICdmb2xsb3cnLFxuICByZWZlcnJlcjogJ2Fib3V0OmNsaWVudCcsXG4gIHJlZmVycmVyUG9saWN5OiAnJyxcbiAgbW9kZTogJ2NvcnMnLFxuICBpbnRlZ3JpdHk6ICcnLFxuICBrZWVwYWxpdmU6IGZhbHNlLFxuICBwcmlvcml0eTogJ2F1dG8nLFxuICB3aW5kb3c6IG51bGwsXG59O1xuXG5jb25zdCB7IGlzRnVuY3Rpb24gfSA9IHV0aWxzO1xuXG4vKipcbiAqIEVuY29kZSBhIFVURi04IHN0cmluZyB0byBhIExhdGluLTEgYnl0ZSBzdHJpbmcgZm9yIHVzZSB3aXRoIGJ0b2EoKS5cbiAqIFRoaXMgaXMgYSBtb2Rlcm4gcmVwbGFjZW1lbnQgZm9yIHRoZSBkZXByZWNhdGVkIHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKSBwYXR0ZXJuLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byBlbmNvZGVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBVVEYtOCBieXRlcyBhcyBhIExhdGluLTEgc3RyaW5nXG4gKi9cbmNvbnN0IGVuY29kZVVURjggPSAoc3RyKSA9PlxuICBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC8lKFswLTlBLUZdezJ9KS9naSwgKF8sIGhleCkgPT5cbiAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGhleCwgMTYpKVxuICApO1xuXG4vLyBOb2RlJ3MgV0hBVFdHIFVSTCBwYXJzZXIgcmV0dXJucyBgdXNlcm5hbWVgIGFuZCBgcGFzc3dvcmRgIHBlcmNlbnQtZW5jb2RlZC5cbi8vIERlY29kZSBiZWZvcmUgY29tcG9zaW5nIHRoZSBgYXV0aGAgb3B0aW9uIHNvIGNyZWRlbnRpYWxzIHN1Y2ggYXNcbi8vIGBteSU0MGVtYWlsLmNvbTpwYXNzYCBhcmUgc2VudCBhcyBgbXlAZW1haWwuY29tOnBhc3NgLiBGYWxscyBiYWNrIHRvIHRoZVxuLy8gb3JpZ2luYWwgdmFsdWUgZm9yIG1hbGZvcm1lZCBpbnB1dCBzbyBhIGJhZCBlbmNvZGluZyBuZXZlciB0aHJvd3MuXG5jb25zdCBkZWNvZGVVUklDb21wb25lbnRTYWZlID0gKHZhbHVlKSA9PiB7XG4gIGlmICghdXRpbHMuaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn07XG5cbmNvbnN0IHRlc3QgPSAoZm4sIC4uLmFyZ3MpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFmbiguLi5hcmdzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgbWF5YmVXaXRoQXV0aENyZWRlbnRpYWxzID0gKHVybCkgPT4ge1xuICBjb25zdCBwcm90b2NvbEluZGV4ID0gdXJsLmluZGV4T2YoJzovLycpO1xuICBsZXQgdXJsVG9DaGVjayA9IHVybDtcbiAgaWYgKHByb3RvY29sSW5kZXggIT09IC0xKSB7XG4gICAgdXJsVG9DaGVjayA9IHVybFRvQ2hlY2suc2xpY2UocHJvdG9jb2xJbmRleCArIDMpO1xuICB9XG4gIHJldHVybiB1cmxUb0NoZWNrLmluY2x1ZGVzKCdAJykgfHwgdXJsVG9DaGVjay5pbmNsdWRlcygnOicpO1xufTtcblxuY29uc3QgZmFjdG9yeSA9IChlbnYpID0+IHtcbiAgY29uc3QgZ2xvYmFsT2JqZWN0ID1cbiAgICB1dGlscy5nbG9iYWwgIT09IHVuZGVmaW5lZCAmJiB1dGlscy5nbG9iYWwgIT09IG51bGwgPyB1dGlscy5nbG9iYWwgOiBnbG9iYWxUaGlzO1xuICBjb25zdCB7IFJlYWRhYmxlU3RyZWFtLCBUZXh0RW5jb2RlciB9ID0gZ2xvYmFsT2JqZWN0O1xuXG4gIGVudiA9IHV0aWxzLm1lcmdlLmNhbGwoXG4gICAge1xuICAgICAgc2tpcFVuZGVmaW5lZDogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIFJlcXVlc3Q6IGdsb2JhbE9iamVjdC5SZXF1ZXN0LFxuICAgICAgUmVzcG9uc2U6IGdsb2JhbE9iamVjdC5SZXNwb25zZSxcbiAgICB9LFxuICAgIGVudlxuICApO1xuXG4gIGNvbnN0IHsgZmV0Y2g6IGVudkZldGNoLCBSZXF1ZXN0LCBSZXNwb25zZSB9ID0gZW52O1xuICBjb25zdCBpc0ZldGNoU3VwcG9ydGVkID0gZW52RmV0Y2ggPyBpc0Z1bmN0aW9uKGVudkZldGNoKSA6IHR5cGVvZiBmZXRjaCA9PT0gJ2Z1bmN0aW9uJztcbiAgY29uc3QgaXNSZXF1ZXN0U3VwcG9ydGVkID0gaXNGdW5jdGlvbihSZXF1ZXN0KTtcbiAgY29uc3QgaXNSZXNwb25zZVN1cHBvcnRlZCA9IGlzRnVuY3Rpb24oUmVzcG9uc2UpO1xuXG4gIGlmICghaXNGZXRjaFN1cHBvcnRlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgPSBpc0ZldGNoU3VwcG9ydGVkICYmIGlzRnVuY3Rpb24oUmVhZGFibGVTdHJlYW0pO1xuXG4gIGNvbnN0IGVuY29kZVRleHQgPVxuICAgIGlzRmV0Y2hTdXBwb3J0ZWQgJiZcbiAgICAodHlwZW9mIFRleHRFbmNvZGVyID09PSAnZnVuY3Rpb24nXG4gICAgICA/IChcbiAgICAgICAgICAoZW5jb2RlcikgPT4gKHN0cikgPT5cbiAgICAgICAgICAgIGVuY29kZXIuZW5jb2RlKHN0cilcbiAgICAgICAgKShuZXcgVGV4dEVuY29kZXIoKSlcbiAgICAgIDogYXN5bmMgKHN0cikgPT4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgbmV3IFJlcXVlc3Qoc3RyKS5hcnJheUJ1ZmZlcigpKSk7XG5cbiAgY29uc3Qgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtID1cbiAgICBpc1JlcXVlc3RTdXBwb3J0ZWQgJiZcbiAgICBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmXG4gICAgdGVzdCgoKSA9PiB7XG4gICAgICBsZXQgZHVwbGV4QWNjZXNzZWQgPSBmYWxzZTtcblxuICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHBsYXRmb3JtLm9yaWdpbiwge1xuICAgICAgICBib2R5OiBuZXcgUmVhZGFibGVTdHJlYW0oKSxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGdldCBkdXBsZXgoKSB7XG4gICAgICAgICAgZHVwbGV4QWNjZXNzZWQgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiAnaGFsZic7XG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgaGFzQ29udGVudFR5cGUgPSByZXF1ZXN0LmhlYWRlcnMuaGFzKCdDb250ZW50LVR5cGUnKTtcblxuICAgICAgaWYgKHJlcXVlc3QuYm9keSAhPSBudWxsKSB7XG4gICAgICAgIHJlcXVlc3QuYm9keS5jYW5jZWwoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGR1cGxleEFjY2Vzc2VkICYmICFoYXNDb250ZW50VHlwZTtcbiAgICB9KTtcblxuICBjb25zdCBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtID1cbiAgICBpc1Jlc3BvbnNlU3VwcG9ydGVkICYmXG4gICAgaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJlxuICAgIHRlc3QoKCkgPT4gdXRpbHMuaXNSZWFkYWJsZVN0cmVhbShuZXcgUmVzcG9uc2UoJycpLmJvZHkpKTtcblxuICBjb25zdCByZXNvbHZlcnMgPSB7XG4gICAgc3RyZWFtOiBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmICgocmVzKSA9PiByZXMuYm9keSksXG4gIH07XG5cbiAgaXNGZXRjaFN1cHBvcnRlZCAmJlxuICAgICgoKSA9PiB7XG4gICAgICBbJ3RleHQnLCAnYXJyYXlCdWZmZXInLCAnYmxvYicsICdmb3JtRGF0YScsICdzdHJlYW0nXS5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgICFyZXNvbHZlcnNbdHlwZV0gJiZcbiAgICAgICAgICAocmVzb2x2ZXJzW3R5cGVdID0gKHJlcywgY29uZmlnKSA9PiB7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gcmVzICYmIHJlc1t0eXBlXTtcblxuICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kLmNhbGwocmVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgICAgIGBSZXNwb25zZSB0eXBlICcke3R5cGV9JyBpcyBub3Qgc3VwcG9ydGVkYCxcbiAgICAgICAgICAgICAgQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlQsXG4gICAgICAgICAgICAgIGNvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pKCk7XG5cbiAgY29uc3QgZ2V0Qm9keUxlbmd0aCA9IGFzeW5jIChib2R5KSA9PiB7XG4gICAgaWYgKGJvZHkgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQmxvYihib2R5KSkge1xuICAgICAgcmV0dXJuIGJvZHkuc2l6ZTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNTcGVjQ29tcGxpYW50Rm9ybShib2R5KSkge1xuICAgICAgY29uc3QgX3JlcXVlc3QgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHksXG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoYXdhaXQgX3JlcXVlc3QuYXJyYXlCdWZmZXIoKSkuYnl0ZUxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkgfHwgdXRpbHMuaXNBcnJheUJ1ZmZlcihib2R5KSkge1xuICAgICAgcmV0dXJuIGJvZHkuYnl0ZUxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcbiAgICAgIGJvZHkgPSBib2R5ICsgJyc7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzU3RyaW5nKGJvZHkpKSB7XG4gICAgICByZXR1cm4gKGF3YWl0IGVuY29kZVRleHQoYm9keSkpLmJ5dGVMZW5ndGg7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlc29sdmVCb2R5TGVuZ3RoID0gYXN5bmMgKGhlYWRlcnMsIGJvZHkpID0+IHtcbiAgICBjb25zdCBsZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihoZWFkZXJzLmdldENvbnRlbnRMZW5ndGgoKSk7XG5cbiAgICByZXR1cm4gbGVuZ3RoID09IG51bGwgPyBnZXRCb2R5TGVuZ3RoKGJvZHkpIDogbGVuZ3RoO1xuICB9O1xuXG4gIHJldHVybiBhc3luYyAoY29uZmlnKSA9PiB7XG4gICAgbGV0IHtcbiAgICAgIHVybCxcbiAgICAgIG1ldGhvZCxcbiAgICAgIGRhdGEsXG4gICAgICBzaWduYWwsXG4gICAgICBjYW5jZWxUb2tlbixcbiAgICAgIHRpbWVvdXQsXG4gICAgICBvbkRvd25sb2FkUHJvZ3Jlc3MsXG4gICAgICBvblVwbG9hZFByb2dyZXNzLFxuICAgICAgcmVzcG9uc2VUeXBlLFxuICAgICAgaGVhZGVycyxcbiAgICAgIHdpdGhDcmVkZW50aWFscyA9ICdzYW1lLW9yaWdpbicsXG4gICAgICBmZXRjaE9wdGlvbnMsXG4gICAgICBtYXhDb250ZW50TGVuZ3RoLFxuICAgICAgbWF4Qm9keUxlbmd0aCxcbiAgICAgIG1heFJlZGlyZWN0cyxcbiAgICB9ID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuXG4gICAgY29uc3QgaGFzTWF4Q29udGVudExlbmd0aCA9IHV0aWxzLmlzTnVtYmVyKG1heENvbnRlbnRMZW5ndGgpICYmIG1heENvbnRlbnRMZW5ndGggPiAtMTtcbiAgICBjb25zdCBoYXNNYXhCb2R5TGVuZ3RoID0gdXRpbHMuaXNOdW1iZXIobWF4Qm9keUxlbmd0aCkgJiYgbWF4Qm9keUxlbmd0aCA+IC0xO1xuICAgIGNvbnN0IG93biA9IChrZXkpID0+ICh1dGlscy5oYXNPd25Qcm9wKGNvbmZpZywga2V5KSA/IGNvbmZpZ1trZXldIDogdW5kZWZpbmVkKTtcblxuICAgIGxldCBfZmV0Y2ggPSBlbnZGZXRjaCB8fCBmZXRjaDtcblxuICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSA/IChyZXNwb25zZVR5cGUgKyAnJykudG9Mb3dlckNhc2UoKSA6ICd0ZXh0JztcblxuICAgIGxldCBjb21wb3NlZFNpZ25hbCA9IGNvbXBvc2VTaWduYWxzKFxuICAgICAgW3NpZ25hbCwgY2FuY2VsVG9rZW4gJiYgY2FuY2VsVG9rZW4udG9BYm9ydFNpZ25hbCgpXSxcbiAgICAgIHRpbWVvdXRcbiAgICApO1xuXG4gICAgbGV0IHJlcXVlc3QgPSBudWxsO1xuXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPVxuICAgICAgY29tcG9zZWRTaWduYWwgJiZcbiAgICAgIGNvbXBvc2VkU2lnbmFsLnVuc3Vic2NyaWJlICYmXG4gICAgICAoKCkgPT4ge1xuICAgICAgICBjb21wb3NlZFNpZ25hbC51bnN1YnNjcmliZSgpO1xuICAgICAgfSk7XG5cbiAgICBsZXQgcmVxdWVzdENvbnRlbnRMZW5ndGg7XG5cbiAgICAvLyBBeGlvc0Vycm9yIHdlIHJhaXNlIHdoaWxlIHRoZSByZXF1ZXN0IGJvZHkgaXMgYmVpbmcgc3RyZWFtZWQuIENhcHR1cmVkXG4gICAgLy8gYnkgaWRlbnRpdHkgc28gdGhlIGNhdGNoIGJsb2NrIGNhbiBzdXJmYWNlIGl0IGRpcmVjdGx5LCByZWdhcmRsZXNzIG9mXG4gICAgLy8gaG93IHRoZSBydW50aW1lIHdyYXBzIHRoZSByZXN1bHRpbmcgZmV0Y2ggcmVqZWN0aW9uICh1bmRpY2kgZXhwb3NlcyBpdFxuICAgIC8vIGFzIGBlcnIuY2F1c2VgOyBzb21lIGJyb3dzZXJzIGRyb3AgdGhlIG9yaWdpbmFsIGVycm9yIGVudGlyZWx5KS5cbiAgICBsZXQgcGVuZGluZ0JvZHlFcnJvciA9IG51bGw7XG5cbiAgICBjb25zdCBtYXhCb2R5TGVuZ3RoRXJyb3IgPSAoKSA9PlxuICAgICAgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICdSZXF1ZXN0IGJvZHkgbGFyZ2VyIHRoYW4gbWF4Qm9keUxlbmd0aCBsaW1pdCcsXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgICk7XG5cbiAgICB0cnkge1xuICAgICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgICAgbGV0IGF1dGggPSB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBjb25maWdBdXRoID0gb3duKCdhdXRoJyk7XG5cbiAgICAgIGlmIChjb25maWdBdXRoKSB7XG4gICAgICAgIGNvbnN0IHVzZXJuYW1lID0gdXRpbHMuZ2V0U2FmZVByb3AoY29uZmlnQXV0aCwgJ3VzZXJuYW1lJykgfHwgJyc7XG4gICAgICAgIGNvbnN0IHBhc3N3b3JkID0gdXRpbHMuZ2V0U2FmZVByb3AoY29uZmlnQXV0aCwgJ3Bhc3N3b3JkJykgfHwgJyc7XG4gICAgICAgIGF1dGggPSB7XG4gICAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXliZVdpdGhBdXRoQ3JlZGVudGlhbHModXJsKSkge1xuICAgICAgICBjb25zdCBwYXJzZWRVUkwgPSBuZXcgVVJMKHVybCwgcGxhdGZvcm0ub3JpZ2luKTtcblxuICAgICAgICBpZiAoIWF1dGggJiYgKHBhcnNlZFVSTC51c2VybmFtZSB8fCBwYXJzZWRVUkwucGFzc3dvcmQpKSB7XG4gICAgICAgICAgY29uc3QgdXJsVXNlcm5hbWUgPSBkZWNvZGVVUklDb21wb25lbnRTYWZlKHBhcnNlZFVSTC51c2VybmFtZSk7XG4gICAgICAgICAgY29uc3QgdXJsUGFzc3dvcmQgPSBkZWNvZGVVUklDb21wb25lbnRTYWZlKHBhcnNlZFVSTC5wYXNzd29yZCk7XG4gICAgICAgICAgYXV0aCA9IHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB1cmxVc2VybmFtZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiB1cmxQYXNzd29yZCxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlZFVSTC51c2VybmFtZSB8fCBwYXJzZWRVUkwucGFzc3dvcmQpIHtcbiAgICAgICAgICBwYXJzZWRVUkwudXNlcm5hbWUgPSAnJztcbiAgICAgICAgICBwYXJzZWRVUkwucGFzc3dvcmQgPSAnJztcbiAgICAgICAgICB1cmwgPSBwYXJzZWRVUkwuaHJlZjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYXV0aCkge1xuICAgICAgICBoZWFkZXJzLmRlbGV0ZSgnYXV0aG9yaXphdGlvbicpO1xuICAgICAgICBoZWFkZXJzLnNldChcbiAgICAgICAgICAnQXV0aG9yaXphdGlvbicsXG4gICAgICAgICAgJ0Jhc2ljICcgKyBidG9hKGVuY29kZVVURjgoKGF1dGgudXNlcm5hbWUgfHwgJycpICsgJzonICsgKGF1dGgucGFzc3dvcmQgfHwgJycpKSlcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gRW5mb3JjZSBtYXhDb250ZW50TGVuZ3RoIGZvciBkYXRhOiBVUkxzIHVwLWZyb250IHNvIHdlIG5ldmVyIG1hdGVyaWFsaXplXG4gICAgICAvLyBhbiBvdmVyc2l6ZWQgcGF5bG9hZC4gVGhlIEhUVFAgYWRhcHRlciBhcHBsaWVzIHRoZSBzYW1lIGNoZWNrIChzZWUgaHR0cC5qc1xuICAgICAgLy8gXCJpZiAocHJvdG9jb2wgPT09ICdkYXRhOicpXCIgYnJhbmNoKS5cbiAgICAgIGlmIChoYXNNYXhDb250ZW50TGVuZ3RoICYmIHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnICYmIHVybC5zdGFydHNXaXRoKCdkYXRhOicpKSB7XG4gICAgICAgIGNvbnN0IGVzdGltYXRlZCA9IGVzdGltYXRlRGF0YVVSTERlY29kZWRCeXRlcyh1cmwpO1xuICAgICAgICBpZiAoZXN0aW1hdGVkID4gbWF4Q29udGVudExlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgJ21heENvbnRlbnRMZW5ndGggc2l6ZSBvZiAnICsgbWF4Q29udGVudExlbmd0aCArICcgZXhjZWVkZWQnLFxuICAgICAgICAgICAgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gRW5mb3JjZSBtYXhCb2R5TGVuZ3RoIGFnYWluc3Qga25vd24tc2l6ZSBib2RpZXMgYmVmb3JlIGRpc3BhdGNoIHVzaW5nXG4gICAgICAvLyB0aGUgYm9keSdzICphY3R1YWwqIHNpemUg4oCUIG5ldmVyIGEgY2FsbGVyLWRlY2xhcmVkIENvbnRlbnQtTGVuZ3RoLFxuICAgICAgLy8gd2hpY2ggY291bGQgdW5kZXItcmVwb3J0IHRvIHNsaXAgYW4gb3ZlcnNpemVkIGJvZHkgcGFzdCB0aGUgY2hlY2suXG4gICAgICAvLyBVbmtub3duLXNpemUgc3RyZWFtcyByZXR1cm4gdW5kZWZpbmVkIGhlcmUgYW5kIGFyZSBjb3VudGVkIHBlci1jaHVua1xuICAgICAgLy8gYmVsb3cgYXMgZmV0Y2ggY29uc3VtZXMgdGhlbS5cbiAgICAgIGlmIChoYXNNYXhCb2R5TGVuZ3RoICYmIG1ldGhvZCAhPT0gJ2dldCcgJiYgbWV0aG9kICE9PSAnaGVhZCcpIHtcbiAgICAgICAgY29uc3Qgb3V0Ym91bmRMZW5ndGggPSBhd2FpdCBnZXRCb2R5TGVuZ3RoKGRhdGEpO1xuICAgICAgICBpZiAodHlwZW9mIG91dGJvdW5kTGVuZ3RoID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZShvdXRib3VuZExlbmd0aCkpIHtcbiAgICAgICAgICByZXF1ZXN0Q29udGVudExlbmd0aCA9IG91dGJvdW5kTGVuZ3RoO1xuICAgICAgICAgIGlmIChvdXRib3VuZExlbmd0aCA+IG1heEJvZHlMZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG1heEJvZHlMZW5ndGhFcnJvcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBBIHN0cmVhbWVkIGJvZHkgdW5kZXIgbWF4Qm9keUxlbmd0aCBtdXN0IGJlIGNvdW50ZWQgYXMgZmV0Y2ggY29uc3VtZXNcbiAgICAgIC8vIGl0OyBpdHMgc2l6ZSBpcyBuZXZlciB0cnVzdGVkIGZyb20gYSBjYWxsZXItZGVjbGFyZWQgQ29udGVudC1MZW5ndGguXG4gICAgICBjb25zdCBtdXN0RW5mb3JjZVN0cmVhbUJvZHkgPVxuICAgICAgICBoYXNNYXhCb2R5TGVuZ3RoICYmICh1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpIHx8IHV0aWxzLmlzU3RyZWFtKGRhdGEpKTtcblxuICAgICAgY29uc3QgdHJhY2tSZXF1ZXN0U3RyZWFtID0gKHN0cmVhbSwgb25Qcm9ncmVzcywgZmx1c2gpID0+XG4gICAgICAgIHRyYWNrU3RyZWFtKFxuICAgICAgICAgIHN0cmVhbSxcbiAgICAgICAgICBERUZBVUxUX0NIVU5LX1NJWkUsXG4gICAgICAgICAgKGxvYWRlZEJ5dGVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoaGFzTWF4Qm9keUxlbmd0aCAmJiBsb2FkZWRCeXRlcyA+IG1heEJvZHlMZW5ndGgpIHtcbiAgICAgICAgICAgICAgdGhyb3cgKHBlbmRpbmdCb2R5RXJyb3IgPSBtYXhCb2R5TGVuZ3RoRXJyb3IoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvblByb2dyZXNzICYmIG9uUHJvZ3Jlc3MobG9hZGVkQnl0ZXMpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmx1c2hcbiAgICAgICAgKTtcblxuICAgICAgaWYgKFxuICAgICAgICBzdXBwb3J0c1JlcXVlc3RTdHJlYW0gJiZcbiAgICAgICAgbWV0aG9kICE9PSAnZ2V0JyAmJlxuICAgICAgICBtZXRob2QgIT09ICdoZWFkJyAmJlxuICAgICAgICAob25VcGxvYWRQcm9ncmVzcyB8fCBtdXN0RW5mb3JjZVN0cmVhbUJvZHkpXG4gICAgICApIHtcbiAgICAgICAgcmVxdWVzdENvbnRlbnRMZW5ndGggPVxuICAgICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoID09IG51bGxcbiAgICAgICAgICAgID8gYXdhaXQgcmVzb2x2ZUJvZHlMZW5ndGgoaGVhZGVycywgZGF0YSlcbiAgICAgICAgICAgIDogcmVxdWVzdENvbnRlbnRMZW5ndGg7XG5cbiAgICAgICAgLy8gQSBkZWNsYXJlZCBsZW5ndGggb2YgMCBpcyBvbmx5IHRydXN0ZWQgdG8gc2tpcCB0aGUgd3JhcCB3aGVuIHdlIGFyZVxuICAgICAgICAvLyBub3QgZW5mb3JjaW5nIGEgc3RyZWFtIGxpbWl0ICh3aGljaCBtdXN0IG5vdCByZWx5IG9uIHRoYXQgaGVhZGVyKS5cbiAgICAgICAgaWYgKHJlcXVlc3RDb250ZW50TGVuZ3RoICE9PSAwIHx8IG11c3RFbmZvcmNlU3RyZWFtQm9keSkge1xuICAgICAgICAgIGxldCBfcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICAgICAgZHVwbGV4OiAnaGFsZicsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBsZXQgY29udGVudFR5cGVIZWFkZXI7XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB1dGlscy5pc0Zvcm1EYXRhKGRhdGEpICYmXG4gICAgICAgICAgICAoY29udGVudFR5cGVIZWFkZXIgPSBfcmVxdWVzdC5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKGNvbnRlbnRUeXBlSGVhZGVyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX3JlcXVlc3QuYm9keSkge1xuICAgICAgICAgICAgY29uc3QgW29uUHJvZ3Jlc3MsIGZsdXNoXSA9XG4gICAgICAgICAgICAgIChvblVwbG9hZFByb2dyZXNzICYmXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NFdmVudERlY29yYXRvcihcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIoYXN5bmNEZWNvcmF0b3Iob25VcGxvYWRQcm9ncmVzcykpXG4gICAgICAgICAgICAgICAgKSkgfHxcbiAgICAgICAgICAgICAgW107XG5cbiAgICAgICAgICAgIGRhdGEgPSB0cmFja1JlcXVlc3RTdHJlYW0oX3JlcXVlc3QuYm9keSwgb25Qcm9ncmVzcywgZmx1c2gpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgbXVzdEVuZm9yY2VTdHJlYW1Cb2R5ICYmXG4gICAgICAgICFpc1JlcXVlc3RTdXBwb3J0ZWQgJiZcbiAgICAgICAgaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJlxuICAgICAgICBtZXRob2QgIT09ICdnZXQnICYmXG4gICAgICAgIG1ldGhvZCAhPT0gJ2hlYWQnXG4gICAgICApIHtcbiAgICAgICAgZGF0YSA9IHRyYWNrUmVxdWVzdFN0cmVhbShkYXRhKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIG11c3RFbmZvcmNlU3RyZWFtQm9keSAmJlxuICAgICAgICBpc1JlcXVlc3RTdXBwb3J0ZWQgJiZcbiAgICAgICAgIXN1cHBvcnRzUmVxdWVzdFN0cmVhbSAmJlxuICAgICAgICBtZXRob2QgIT09ICdnZXQnICYmXG4gICAgICAgIG1ldGhvZCAhPT0gJ2hlYWQnXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgJ1N0cmVhbSByZXF1ZXN0IGJvZGllcyBhcmUgbm90IHN1cHBvcnRlZCBieSB0aGUgY3VycmVudCBmZXRjaCBpbXBsZW1lbnRhdGlvbicsXG4gICAgICAgICAgQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlQsXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF1dGlscy5pc1N0cmluZyh3aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICAgIHdpdGhDcmVkZW50aWFscyA9IHdpdGhDcmVkZW50aWFscyA/ICdpbmNsdWRlJyA6ICdvbWl0JztcbiAgICAgIH1cblxuICAgICAgLy8gQ2xvdWRmbGFyZSBXb3JrZXJzIHRocm93cyB3aGVuIGNyZWRlbnRpYWxzIGFyZSBkZWZpbmVkXG4gICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2Nsb3VkZmxhcmUvd29ya2VyZC9pc3N1ZXMvOTAyXG4gICAgICBjb25zdCBpc0NyZWRlbnRpYWxzU3VwcG9ydGVkID0gaXNSZXF1ZXN0U3VwcG9ydGVkICYmICdjcmVkZW50aWFscycgaW4gUmVxdWVzdC5wcm90b3R5cGU7XG5cbiAgICAgIC8vIElmIGRhdGEgaXMgRm9ybURhdGEgYW5kIENvbnRlbnQtVHlwZSBpcyBtdWx0aXBhcnQvZm9ybS1kYXRhIHdpdGhvdXQgYm91bmRhcnksXG4gICAgICAvLyBkZWxldGUgaXQgc28gZmV0Y2ggY2FuIHNldCBpdCBjb3JyZWN0bHkgd2l0aCB0aGUgYm91bmRhcnlcbiAgICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gaGVhZGVycy5nZXRDb250ZW50VHlwZSgpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY29udGVudFR5cGUgJiZcbiAgICAgICAgICAvXm11bHRpcGFydFxcL2Zvcm0tZGF0YS9pLnRlc3QoY29udGVudFR5cGUpICYmXG4gICAgICAgICAgIS9ib3VuZGFyeT0vaS50ZXN0KGNvbnRlbnRUeXBlKVxuICAgICAgICApIHtcbiAgICAgICAgICBoZWFkZXJzLmRlbGV0ZSgnY29udGVudC10eXBlJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gU2V0IFVzZXItQWdlbnQgaGVhZGVyIGlmIG5vdCBhbHJlYWR5IHNldCAoZmV0Y2ggZGVmYXVsdHMgdG8gJ25vZGUnIGluIE5vZGUuanMpXG4gICAgICBoZWFkZXJzLnNldCgnVXNlci1BZ2VudCcsICdheGlvcy8nICsgVkVSU0lPTiwgZmFsc2UpO1xuXG4gICAgICBjb25zdCBzYWZlRmV0Y2hPcHRpb25zID1cbiAgICAgICAgZmV0Y2hPcHRpb25zID09IG51bGwgPyBmZXRjaE9wdGlvbnMgOiBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUobnVsbCksIGZldGNoT3B0aW9ucyk7XG5cbiAgICAgIGlmIChzYWZlRmV0Y2hPcHRpb25zKSB7XG4gICAgICAgIC8vIFRoZXNlIG9wdGlvbnMgYXJlIG93bmVkIGJ5IEF4aW9zIGFuZCBhcmUgYWxyZWFkeSByZWZsZWN0ZWQgaW4gdGhlXG4gICAgICAgIC8vIHJlc29sdmVkIFJlcXVlc3QgcGFzc2VkIHRvIGZldGNoLlxuICAgICAgICBkZWxldGUgc2FmZUZldGNoT3B0aW9ucy5ib2R5O1xuICAgICAgICBkZWxldGUgc2FmZUZldGNoT3B0aW9ucy5oZWFkZXJzO1xuICAgICAgICBkZWxldGUgc2FmZUZldGNoT3B0aW9ucy5tZXRob2Q7XG4gICAgICAgIGRlbGV0ZSBzYWZlRmV0Y2hPcHRpb25zLnNpZ25hbDtcbiAgICAgICAgZGVsZXRlIHNhZmVGZXRjaE9wdGlvbnMuZHVwbGV4O1xuICAgICAgICBkZWxldGUgc2FmZUZldGNoT3B0aW9ucy5jcmVkZW50aWFscztcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzb2x2ZWRPcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKG51bGwpLCBzYWZlRmV0Y2hPcHRpb25zLCB7XG4gICAgICAgIHNpZ25hbDogY29tcG9zZWRTaWduYWwsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICAgIGhlYWRlcnM6IHRvQnl0ZVN0cmluZ0hlYWRlck9iamVjdChoZWFkZXJzLm5vcm1hbGl6ZSgpKSxcbiAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgZHVwbGV4OiAnaGFsZicsXG4gICAgICAgIGNyZWRlbnRpYWxzOiBpc0NyZWRlbnRpYWxzU3VwcG9ydGVkID8gd2l0aENyZWRlbnRpYWxzIDogdW5kZWZpbmVkLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChpc1JlcXVlc3RTdXBwb3J0ZWQpIHtcbiAgICAgICAgdXRpbHMuZm9yRWFjaChERUZBVUxUX1JFUVVFU1RfT1BUSU9OUywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICBpZiAocmVzb2x2ZWRPcHRpb25zW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzb2x2ZWRPcHRpb25zW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXNvbHZlZE9wdGlvbnMuc2lnbmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXNvbHZlZE9wdGlvbnMuc2lnbmFsID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXNvbHZlZE9wdGlvbnMuYm9keSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzb2x2ZWRPcHRpb25zLmJvZHkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXhSZWRpcmVjdHMgPT09IDApIHtcbiAgICAgICAgcmVzb2x2ZWRPcHRpb25zLnJlZGlyZWN0ID0gJ21hbnVhbCc7XG5cbiAgICAgICAgaWYgKHNhZmVGZXRjaE9wdGlvbnMpIHtcbiAgICAgICAgICBzYWZlRmV0Y2hPcHRpb25zLnJlZGlyZWN0ID0gJ21hbnVhbCc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmVxdWVzdCA9IGlzUmVxdWVzdFN1cHBvcnRlZCAmJiBuZXcgUmVxdWVzdCh1cmwsIHJlc29sdmVkT3B0aW9ucyk7XG5cbiAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IChpc1JlcXVlc3RTdXBwb3J0ZWRcbiAgICAgICAgPyBfZmV0Y2gocmVxdWVzdCwgc2FmZUZldGNoT3B0aW9ucylcbiAgICAgICAgOiBfZmV0Y2godXJsLCByZXNvbHZlZE9wdGlvbnMpKTtcblxuICAgICAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20ocmVzcG9uc2UuaGVhZGVycyk7XG5cbiAgICAgIC8vIENoZWFwIHByZS1jaGVjazogaWYgdGhlIHNlcnZlciBob25lc3RseSBkZWNsYXJlcyBhIGNvbnRlbnQtbGVuZ3RoIHRoYXRcbiAgICAgIC8vIGFscmVhZHkgZXhjZWVkcyB0aGUgY2FwLCByZWplY3QgYmVmb3JlIHdlIHN0YXJ0IHN0cmVhbWluZy5cbiAgICAgIGlmIChoYXNNYXhDb250ZW50TGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGRlY2xhcmVkTGVuZ3RoID0gdXRpbHMudG9GaW5pdGVOdW1iZXIocmVzcG9uc2VIZWFkZXJzLmdldENvbnRlbnRMZW5ndGgoKSk7XG4gICAgICAgIGlmIChkZWNsYXJlZExlbmd0aCAhPSBudWxsICYmIGRlY2xhcmVkTGVuZ3RoID4gbWF4Q29udGVudExlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgJ21heENvbnRlbnRMZW5ndGggc2l6ZSBvZiAnICsgbWF4Q29udGVudExlbmd0aCArICcgZXhjZWVkZWQnLFxuICAgICAgICAgICAgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNTdHJlYW1SZXNwb25zZSA9XG4gICAgICAgIHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKHJlc3BvbnNlVHlwZSA9PT0gJ3N0cmVhbScgfHwgcmVzcG9uc2VUeXBlID09PSAncmVzcG9uc2UnKTtcblxuICAgICAgaWYgKFxuICAgICAgICBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmXG4gICAgICAgIHJlc3BvbnNlLmJvZHkgJiZcbiAgICAgICAgKG9uRG93bmxvYWRQcm9ncmVzcyB8fCBoYXNNYXhDb250ZW50TGVuZ3RoIHx8IChpc1N0cmVhbVJlc3BvbnNlICYmIHVuc3Vic2NyaWJlKSlcbiAgICAgICkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge307XG5cbiAgICAgICAgWydzdGF0dXMnLCAnc3RhdHVzVGV4dCcsICdoZWFkZXJzJ10uZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgICAgIG9wdGlvbnNbcHJvcF0gPSByZXNwb25zZVtwcm9wXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2VDb250ZW50TGVuZ3RoID0gdXRpbHMudG9GaW5pdGVOdW1iZXIocmVzcG9uc2VIZWFkZXJzLmdldENvbnRlbnRMZW5ndGgoKSk7XG5cbiAgICAgICAgY29uc3QgW29uUHJvZ3Jlc3MsIGZsdXNoXSA9XG4gICAgICAgICAgKG9uRG93bmxvYWRQcm9ncmVzcyAmJlxuICAgICAgICAgICAgcHJvZ3Jlc3NFdmVudERlY29yYXRvcihcbiAgICAgICAgICAgICAgcmVzcG9uc2VDb250ZW50TGVuZ3RoLFxuICAgICAgICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihhc3luY0RlY29yYXRvcihvbkRvd25sb2FkUHJvZ3Jlc3MpLCB0cnVlKVxuICAgICAgICAgICAgKSkgfHxcbiAgICAgICAgICBbXTtcblxuICAgICAgICBsZXQgYnl0ZXNSZWFkID0gMDtcbiAgICAgICAgY29uc3Qgb25DaHVua1Byb2dyZXNzID0gKGxvYWRlZEJ5dGVzKSA9PiB7XG4gICAgICAgICAgaWYgKGhhc01heENvbnRlbnRMZW5ndGgpIHtcbiAgICAgICAgICAgIGJ5dGVzUmVhZCA9IGxvYWRlZEJ5dGVzO1xuICAgICAgICAgICAgaWYgKGJ5dGVzUmVhZCA+IG1heENvbnRlbnRMZW5ndGgpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgICAgICAgJ21heENvbnRlbnRMZW5ndGggc2l6ZSBvZiAnICsgbWF4Q29udGVudExlbmd0aCArICcgZXhjZWVkZWQnLFxuICAgICAgICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSxcbiAgICAgICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBvblByb2dyZXNzICYmIG9uUHJvZ3Jlc3MobG9hZGVkQnl0ZXMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKFxuICAgICAgICAgIHRyYWNrU3RyZWFtKHJlc3BvbnNlLmJvZHksIERFRkFVTFRfQ0hVTktfU0laRSwgb25DaHVua1Byb2dyZXNzLCAoKSA9PiB7XG4gICAgICAgICAgICBmbHVzaCAmJiBmbHVzaCgpO1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBvcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSB8fCAndGV4dCc7XG5cbiAgICAgIGxldCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNvbHZlcnNbdXRpbHMuZmluZEtleShyZXNvbHZlcnMsIHJlc3BvbnNlVHlwZSkgfHwgJ3RleHQnXShcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgIGNvbmZpZ1xuICAgICAgKTtcblxuICAgICAgLy8gRmFsbGJhY2sgZW5mb3JjZW1lbnQgZm9yIGVudmlyb25tZW50cyB3aXRob3V0IFJlYWRhYmxlU3RyZWFtIHN1cHBvcnRcbiAgICAgIC8vIChsZWdhY3kgcnVudGltZXMpLiBEZXRlY3QgbWF0ZXJpYWxpemVkIHNpemUgZnJvbSB0eXBlZCBvdXRwdXQ7IHNraXBcbiAgICAgIC8vIHN0cmVhbXMvUmVzcG9uc2UgcGFzc3Rocm91Z2ggc2luY2UgdGhlIHVzZXIgd2lsbCByZWFkIHRob3NlIHRoZW1zZWx2ZXMuXG4gICAgICBpZiAoaGFzTWF4Q29udGVudExlbmd0aCAmJiAhc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAhaXNTdHJlYW1SZXNwb25zZSkge1xuICAgICAgICBsZXQgbWF0ZXJpYWxpemVkU2l6ZTtcbiAgICAgICAgaWYgKHJlc3BvbnNlRGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZURhdGEuYnl0ZUxlbmd0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIG1hdGVyaWFsaXplZFNpemUgPSByZXNwb25zZURhdGEuYnl0ZUxlbmd0aDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXNwb25zZURhdGEuc2l6ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIG1hdGVyaWFsaXplZFNpemUgPSByZXNwb25zZURhdGEuc2l6ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXNwb25zZURhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBtYXRlcmlhbGl6ZWRTaXplID1cbiAgICAgICAgICAgICAgdHlwZW9mIFRleHRFbmNvZGVyID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgPyBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUocmVzcG9uc2VEYXRhKS5ieXRlTGVuZ3RoXG4gICAgICAgICAgICAgICAgOiByZXNwb25zZURhdGEubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG1hdGVyaWFsaXplZFNpemUgPT09ICdudW1iZXInICYmIG1hdGVyaWFsaXplZFNpemUgPiBtYXhDb250ZW50TGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgICAnbWF4Q29udGVudExlbmd0aCBzaXplIG9mICcgKyBtYXhDb250ZW50TGVuZ3RoICsgJyBleGNlZWRlZCcsXG4gICAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsXG4gICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAhaXNTdHJlYW1SZXNwb25zZSAmJiB1bnN1YnNjcmliZSAmJiB1bnN1YnNjcmliZSgpO1xuXG4gICAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB7XG4gICAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAgIGhlYWRlcnM6IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpLFxuICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB1bnN1YnNjcmliZSAmJiB1bnN1YnNjcmliZSgpO1xuXG4gICAgICAvLyBTYWZhcmkgY2FuIHN1cmZhY2UgZmV0Y2ggYWJvcnRzIGFzIGEgRE9NRXhjZXB0aW9uLWxpa2Ugb2JqZWN0IHdob3NlXG4gICAgICAvLyBicmFuZGVkIGdldHRlcnMgdGhyb3cuIFByZWZlciBvdXIgY29tcG9zZWQgc2lnbmFsIHJlYXNvbiBiZWZvcmUgcmVhZGluZ1xuICAgICAgLy8gdGhlIGNhdWdodCBlcnJvciwgcHJlc2VydmluZyB0aW1lb3V0IHZzIGNhbmNlbGxhdGlvbiBzZW1hbnRpY3MuXG4gICAgICBpZiAoY29tcG9zZWRTaWduYWwgJiYgY29tcG9zZWRTaWduYWwuYWJvcnRlZCAmJiBjb21wb3NlZFNpZ25hbC5yZWFzb24gaW5zdGFuY2VvZiBBeGlvc0Vycm9yKSB7XG4gICAgICAgIGNvbnN0IGNhbmNlbGVkRXJyb3IgPSBjb21wb3NlZFNpZ25hbC5yZWFzb247XG4gICAgICAgIGNhbmNlbGVkRXJyb3IuY29uZmlnID0gY29uZmlnO1xuICAgICAgICByZXF1ZXN0ICYmIChjYW5jZWxlZEVycm9yLnJlcXVlc3QgPSByZXF1ZXN0KTtcbiAgICAgICAgaWYgKGVyciAhPT0gY2FuY2VsZWRFcnJvcikge1xuICAgICAgICAgIC8vIE5vbi1lbnVtZXJhYmxlIHRvIG1hdGNoIG5hdGl2ZSBFcnJvciBgY2F1c2VgIHNlbWFudGljcyBzbyBsb2dnZXJzXG4gICAgICAgICAgLy8gZG9uJ3QgcmVjdXJzZSBpbnRvIGNpcmN1bGFyIGZldGNoIGludGVybmFscyAoc2VlICM3MjA1KS5cbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2FuY2VsZWRFcnJvciwgJ2NhdXNlJywge1xuICAgICAgICAgICAgX19wcm90b19fOiBudWxsLFxuICAgICAgICAgICAgdmFsdWU6IGVycixcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgY2FuY2VsZWRFcnJvcjtcbiAgICAgIH1cblxuICAgICAgLy8gU3VyZmFjZSBhIG1heEJvZHlMZW5ndGggdmlvbGF0aW9uIHdlIHJhaXNlZCB3aGlsZSB0aGUgcmVxdWVzdCBib2R5IHdhc1xuICAgICAgLy8gYmVpbmcgc3RyZWFtZWQuIE1hdGNoaW5nIGJ5IGlkZW50aXR5IChyYXRoZXIgdGhhbiByZWFkaW5nXG4gICAgICAvLyBgZXJyLmNhdXNlLmlzQXhpb3NFcnJvcmApIGtlZXBzIHRoZSBlcnJvciBkZXRlcm1pbmlzdGljIGFjcm9zcyBydW50aW1lc1xuICAgICAgLy8gYW5kIGF2b2lkcyBib3RoIHByb3RvdHlwZS1wb2xsdXRpb24gcmVhZHMgYW5kIG1pcy1hdHRyaWJ1dGluZyBhIGZvcmVpZ25cbiAgICAgIC8vIEF4aW9zRXJyb3IgdGhhdCBtZXJlbHkgaGFwcGVuZWQgdG8gbGFuZCBpbiBgZXJyLmNhdXNlYC5cbiAgICAgIGlmIChwZW5kaW5nQm9keUVycm9yKSB7XG4gICAgICAgIHJlcXVlc3QgJiYgIXBlbmRpbmdCb2R5RXJyb3IucmVxdWVzdCAmJiAocGVuZGluZ0JvZHlFcnJvci5yZXF1ZXN0ID0gcmVxdWVzdCk7XG4gICAgICAgIHRocm93IHBlbmRpbmdCb2R5RXJyb3I7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlLXRocm93IEF4aW9zRXJyb3JzIHdlIHJhaXNlZCBzeW5jaHJvbm91c2x5IChkYXRhOiBVUkwgLyBjb250ZW50LWxlbmd0aFxuICAgICAgLy8gcHJlLWNoZWNrcywgcmVzcG9uc2Ugc2l6ZSBlbmZvcmNlbWVudCkgd2l0aG91dCByZS13cmFwcGluZyB0aGVtLlxuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEF4aW9zRXJyb3IpIHtcbiAgICAgICAgcmVxdWVzdCAmJiAhZXJyLnJlcXVlc3QgJiYgKGVyci5yZXF1ZXN0ID0gcmVxdWVzdCk7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cblxuICAgICAgaWYgKGVyciAmJiBlcnIubmFtZSA9PT0gJ1R5cGVFcnJvcicgJiYgL0xvYWQgZmFpbGVkfGZldGNoL2kudGVzdChlcnIubWVzc2FnZSkpIHtcbiAgICAgICAgY29uc3QgbmV0d29ya0Vycm9yID0gbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgJ05ldHdvcmsgRXJyb3InLFxuICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgZXJyICYmIGVyci5yZXNwb25zZVxuICAgICAgICApO1xuICAgICAgICAvLyBOb24tZW51bWVyYWJsZSB0byBtYXRjaCBuYXRpdmUgRXJyb3IgYGNhdXNlYCBzZW1hbnRpY3Mgc28gbG9nZ2Vyc1xuICAgICAgICAvLyBkb24ndCByZWN1cnNlIGludG8gY2lyY3VsYXIgZmV0Y2ggaW50ZXJuYWxzIChzZWUgIzcyMDUpLlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV0d29ya0Vycm9yLCAnY2F1c2UnLCB7XG4gICAgICAgICAgX19wcm90b19fOiBudWxsLFxuICAgICAgICAgIHZhbHVlOiBlcnIuY2F1c2UgfHwgZXJyLFxuICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRocm93IG5ldHdvcmtFcnJvcjtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGVyciwgZXJyICYmIGVyci5jb2RlLCBjb25maWcsIHJlcXVlc3QsIGVyciAmJiBlcnIucmVzcG9uc2UpO1xuICAgIH1cbiAgfTtcbn07XG5cbmNvbnN0IHNlZWRDYWNoZSA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGNvbnN0IGdldEZldGNoID0gKGNvbmZpZykgPT4ge1xuICBsZXQgZW52ID0gKGNvbmZpZyAmJiBjb25maWcuZW52KSB8fCB7fTtcbiAgY29uc3QgeyBmZXRjaCwgUmVxdWVzdCwgUmVzcG9uc2UgfSA9IGVudjtcbiAgY29uc3Qgc2VlZHMgPSBbUmVxdWVzdCwgUmVzcG9uc2UsIGZldGNoXTtcblxuICBsZXQgbGVuID0gc2VlZHMubGVuZ3RoLFxuICAgIGkgPSBsZW4sXG4gICAgc2VlZCxcbiAgICB0YXJnZXQsXG4gICAgbWFwID0gc2VlZENhY2hlO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICBzZWVkID0gc2VlZHNbaV07XG4gICAgdGFyZ2V0ID0gbWFwLmdldChzZWVkKTtcblxuICAgIHRhcmdldCA9PT0gdW5kZWZpbmVkICYmIG1hcC5zZXQoc2VlZCwgKHRhcmdldCA9IGkgPyBuZXcgTWFwKCkgOiBmYWN0b3J5KGVudikpKTtcblxuICAgIG1hcCA9IHRhcmdldDtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5jb25zdCBhZGFwdGVyID0gZ2V0RmV0Y2goKTtcblxuZXhwb3J0IGRlZmF1bHQgYWRhcHRlcjtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgc2V0dGxlIGZyb20gJy4uL2NvcmUvc2V0dGxlLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBub3JtYWxpemVVUkxGb3JQcm90b2NvbENoZWNrIGZyb20gJy4uL2hlbHBlcnMvbm9ybWFsaXplVVJMRm9yUHJvdG9jb2xDaGVjay5qcyc7XG5pbXBvcnQgcGFyc2VQcm90b2NvbCBmcm9tICcuLi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IHsgcHJvZ3Jlc3NFdmVudFJlZHVjZXIgfSBmcm9tICcuLi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzJztcbmltcG9ydCByZXNvbHZlQ29uZmlnIGZyb20gJy4uL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qcyc7XG5pbXBvcnQgeyB0b0J5dGVTdHJpbmdIZWFkZXJPYmplY3QgfSBmcm9tICcuLi9oZWxwZXJzL3Nhbml0aXplSGVhZGVyVmFsdWUuanMnO1xuXG5jb25zdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnO1xuXG5leHBvcnQgZGVmYXVsdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgJiZcbiAgZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBjb25zdCBfY29uZmlnID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuICAgICAgbGV0IHJlcXVlc3REYXRhID0gX2NvbmZpZy5kYXRhO1xuICAgICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShfY29uZmlnLmhlYWRlcnMpLm5vcm1hbGl6ZSgpO1xuICAgICAgbGV0IHsgcmVzcG9uc2VUeXBlLCBvblVwbG9hZFByb2dyZXNzLCBvbkRvd25sb2FkUHJvZ3Jlc3MgfSA9IF9jb25maWc7XG4gICAgICBsZXQgb25DYW5jZWxlZDtcbiAgICAgIGxldCB1cGxvYWRUaHJvdHRsZWQsIGRvd25sb2FkVGhyb3R0bGVkO1xuICAgICAgbGV0IGZsdXNoVXBsb2FkLCBmbHVzaERvd25sb2FkLCBmbHVzaERvd25sb2FkV2l0aEV2ZW50O1xuXG4gICAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgICBmbHVzaFVwbG9hZCAmJiBmbHVzaFVwbG9hZCgpOyAvLyBmbHVzaCBldmVudHNcbiAgICAgICAgZmx1c2hEb3dubG9hZCAmJiBmbHVzaERvd25sb2FkKCk7IC8vIGZsdXNoIGV2ZW50c1xuXG4gICAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi51bnN1YnNjcmliZShvbkNhbmNlbGVkKTtcblxuICAgICAgICBfY29uZmlnLnNpZ25hbCAmJiBfY29uZmlnLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuXG4gICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICByZXF1ZXN0Lm9wZW4oX2NvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgX2NvbmZpZy51cmwsIHRydWUpO1xuXG4gICAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgICAgcmVxdWVzdC50aW1lb3V0ID0gX2NvbmZpZy50aW1lb3V0O1xuXG4gICAgICBmdW5jdGlvbiBvbmxvYWRlbmQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3RhdHVzIDAgbWVhbnMgbm8gcmVzcG9uc2Ugd2FzIHJlY2VpdmVkLCB3aGljaCBvbmVycm9yIGFuZCBvbmFib3J0IG5vcm1hbGx5XG4gICAgICAgIC8vIHJlamVjdCBiZWZvcmUgdGhpcyBydW5zLiBGaXJlZm94IDE1MiBmaXJlcyBvbmx5IHJlYWR5c3RhdGVjaGFuZ2UgYW5kIGxvYWRlbmQgZm9yXG4gICAgICAgIC8vIG5hdmlnYXRpb24tY2FuY2VsZWQgcmVxdWVzdHMgKGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE1MDUzODkpLFxuICAgICAgICAvLyBsZWF2aW5nIHNldHRsZSgpIHRvIHJlc29sdmUgdGhlbSBhcyBhbiBlbXB0eSBzdWNjZXNzLiBFQ09OTkFCT1JURUQgaXMgdGhlIGVycm9yXG4gICAgICAgIC8vIG9uYWJvcnQgcmFpc2VkIG9uIEZpcmVmb3ggMTUxLiBSZWFkcyBvdmVyIGZpbGU6LCB3aGljaCBzb21lIGVudmlyb25tZW50cyByZXBvcnQgYXNcbiAgICAgICAgLy8gc3RhdHVzIDAgb24gc3VjY2VzcywgYXJlIGV4Y2x1ZGVkIGJ5IHRoZSByZXF1ZXN0IFVSTCdzIHNjaGVtZSBhZnRlciBicm93c2VyLXN0eWxlXG4gICAgICAgIC8vIHByZXByb2Nlc3NpbmcsIGJ5IHRoZSBwYWdlIG9yaWdpbidzIHNjaGVtZSBmb3IgcmVsYXRpdmUgVVJMcyAod2hpY2ggaW5oZXJpdCBpdCksIG9yXG4gICAgICAgIC8vIGJ5IHJlc3BvbnNlVVJMIHdoZXJlIGltcGxlbWVudGVkLlxuICAgICAgICBpZiAoXG4gICAgICAgICAgcmVxdWVzdC5zdGF0dXMgPT09IDAgJiZcbiAgICAgICAgICAocGFyc2VQcm90b2NvbChub3JtYWxpemVVUkxGb3JQcm90b2NvbENoZWNrKF9jb25maWcudXJsKSkgfHxcbiAgICAgICAgICAgIHBhcnNlUHJvdG9jb2wocGxhdGZvcm0ub3JpZ2luKSkgIT09ICdmaWxlJyAmJlxuICAgICAgICAgICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLnN0YXJ0c1dpdGgoJ2ZpbGU6JykpXG4gICAgICAgICkge1xuICAgICAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsIGNvbmZpZywgcmVxdWVzdCkpO1xuICAgICAgICAgIGRvbmUoKTtcblxuICAgICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXaGVuIGxvYWRlbmQgaXMgc3RpbGwgZGlzcGF0Y2hpbmcsIGZsdXNoaW5nIHdpdGggaXQgZ2l2ZXMgcHJvZ3Jlc3NcbiAgICAgICAgLy8gbGlzdGVuZXJzIGEgZmluYWwgZGVsaXZlcnkgd2hvc2UgZXZlbnQgaGFzIGEgbGl2ZSB0YXJnZXQuIFRoZSBsZWdhY3lcbiAgICAgICAgLy8gcmVhZHktc3RhdGUgZmFsbGJhY2sgaGFzIG5vIGV2ZW50LCBzbyByZXBsYXkgaXRzIHBlbmRpbmcgcHJvZ3Jlc3MuXG4gICAgICAgIC8vIEEgdGhyb3dpbmcgbGlzdGVuZXIgbXVzdCBub3QgYmxvY2sgc2V0dGxlbWVudDsgcmV0aHJvdyBhc3luY2hyb25vdXNseSxcbiAgICAgICAgLy8gbWF0Y2hpbmcgaG93IGxpc3RlbmVyIGVycm9ycyBzdXJmYWNlIG9uIHRoZSB0aHJvdHRsZSB0aW1lciBwYXRoLlxuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZmx1c2hEb3dubG9hZFdpdGhFdmVudCAmJiBmbHVzaERvd25sb2FkV2l0aEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmx1c2hEb3dubG9hZCAmJiBmbHVzaERvd25sb2FkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEEgZmluYWwgcHJvZ3Jlc3MgY2FsbGJhY2sgY2FuIGNhbmNlbCB0aGUgcmVxdWVzdCBzeW5jaHJvbm91c2x5LlxuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgICBjb25zdCByZXNwb25zZUhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShcbiAgICAgICAgICAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ICYmIHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID1cbiAgICAgICAgICAhcmVzcG9uc2VUeXBlIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nXG4gICAgICAgICAgICA/IHJlcXVlc3QucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgIH07XG5cbiAgICAgICAgc2V0dGxlKFxuICAgICAgICAgIGZ1bmN0aW9uIF9yZXNvbHZlKHZhbHVlKSB7XG4gICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlc3BvbnNlXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCdvbmxvYWRlbmQnIGluIHJlcXVlc3QpIHtcbiAgICAgICAgLy8gVXNlIG9ubG9hZGVuZCBpZiBhdmFpbGFibGVcbiAgICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlIHRvIGVtdWxhdGUgb25sb2FkZW5kXG4gICAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICByZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJlxuICAgICAgICAgICAgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuc3RhcnRzV2l0aCgnZmlsZTonKSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVhZHlzdGF0ZSBoYW5kbGVyIGlzIGNhbGxpbmcgYmVmb3JlIG9uZXJyb3Igb3Igb250aW1lb3V0IGhhbmRsZXJzLFxuICAgICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcbiAgICAgICAgZG9uZSgpO1xuXG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcihldmVudCkge1xuICAgICAgICAvLyBCcm93c2VycyBkZWxpdmVyIGEgUHJvZ3Jlc3NFdmVudCBpbiBYSFIgb25lcnJvclxuICAgICAgICAvLyAobWVzc2FnZSBtYXkgYmUgZW1wdHk7IHdoZW4gcHJlc2VudCwgc3VyZmFjZSBpdClcbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0FQSS9YTUxIdHRwUmVxdWVzdC9lcnJvcl9ldmVudFxuICAgICAgICBjb25zdCBtc2cgPSBldmVudCAmJiBldmVudC5tZXNzYWdlID8gZXZlbnQubWVzc2FnZSA6ICdOZXR3b3JrIEVycm9yJztcbiAgICAgICAgY29uc3QgZXJyID0gbmV3IEF4aW9zRXJyb3IobXNnLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QpO1xuICAgICAgICAvLyBhdHRhY2ggdGhlIHVuZGVybHlpbmcgZXZlbnQgZm9yIGNvbnN1bWVycyB3aG8gd2FudCBkZXRhaWxzXG4gICAgICAgIGVyci5ldmVudCA9IGV2ZW50IHx8IG51bGw7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgICAgbGV0IHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXRcbiAgICAgICAgICA/ICd0aW1lb3V0IG9mICcgKyBfY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnXG4gICAgICAgICAgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IF9jb25maWcudHJhbnNpdGlvbmFsIHx8IHRyYW5zaXRpb25hbERlZmF1bHRzO1xuICAgICAgICBpZiAoX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoXG4gICAgICAgICAgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgdHJhbnNpdGlvbmFsLmNsYXJpZnlUaW1lb3V0RXJyb3IgPyBBeGlvc0Vycm9yLkVUSU1FRE9VVCA6IEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgZG9uZSgpO1xuXG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICByZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkICYmIHJlcXVlc3RIZWFkZXJzLnNldENvbnRlbnRUeXBlKG51bGwpO1xuXG4gICAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICAgIHV0aWxzLmZvckVhY2godG9CeXRlU3RyaW5nSGVhZGVyT2JqZWN0KHJlcXVlc3RIZWFkZXJzKSwgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKF9jb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhX2NvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICAgIGlmIChyZXNwb25zZVR5cGUgJiYgcmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBfY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH1cblxuICAgICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgICAgaWYgKG9uRG93bmxvYWRQcm9ncmVzcykge1xuICAgICAgICBbZG93bmxvYWRUaHJvdHRsZWQsIGZsdXNoRG93bmxvYWQsIGZsdXNoRG93bmxvYWRXaXRoRXZlbnRdID0gcHJvZ3Jlc3NFdmVudFJlZHVjZXIoXG4gICAgICAgICAgb25Eb3dubG9hZFByb2dyZXNzLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGRvd25sb2FkVGhyb3R0bGVkKTtcbiAgICAgIH1cblxuICAgICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICAgIGlmIChvblVwbG9hZFByb2dyZXNzICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICAgIFt1cGxvYWRUaHJvdHRsZWQsIGZsdXNoVXBsb2FkXSA9IHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uVXBsb2FkUHJvZ3Jlc3MpO1xuXG4gICAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgdXBsb2FkVGhyb3R0bGVkKTtcblxuICAgICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgZmx1c2hVcGxvYWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoX2NvbmZpZy5jYW5jZWxUb2tlbiB8fCBfY29uZmlnLnNpZ25hbCkge1xuICAgICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICAgIG9uQ2FuY2VsZWQgPSAoY2FuY2VsKSA9PiB7XG4gICAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlamVjdCghY2FuY2VsIHx8IGNhbmNlbC50eXBlID8gbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnLCByZXF1ZXN0KSA6IGNhbmNlbCk7XG4gICAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgICAgfTtcblxuICAgICAgICBfY29uZmlnLmNhbmNlbFRva2VuICYmIF9jb25maWcuY2FuY2VsVG9rZW4uc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgICBpZiAoX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgICBfY29uZmlnLnNpZ25hbC5hYm9ydGVkXG4gICAgICAgICAgICA/IG9uQ2FuY2VsZWQoKVxuICAgICAgICAgICAgOiBfY29uZmlnLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3RvY29sID0gcGFyc2VQcm90b2NvbChfY29uZmlnLnVybCk7XG5cbiAgICAgIGlmIChwcm90b2NvbCAmJiAhcGxhdGZvcm0ucHJvdG9jb2xzLmluY2x1ZGVzKHByb3RvY29sKSkge1xuICAgICAgICByZWplY3QoXG4gICAgICAgICAgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgICAnVW5zdXBwb3J0ZWQgcHJvdG9jb2wgJyArIHByb3RvY29sICsgJzonLFxuICAgICAgICAgICAgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsXG4gICAgICAgICAgICBjb25maWdcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEgfHwgbnVsbCk7XG4gICAgfSk7XG4gIH07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCBiaW5kIGZyb20gJy4vaGVscGVycy9iaW5kLmpzJztcbmltcG9ydCBBeGlvcyBmcm9tICcuL2NvcmUvQXhpb3MuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vY29yZS9tZXJnZUNvbmZpZy5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IENhbmNlbFRva2VuIGZyb20gJy4vY2FuY2VsL0NhbmNlbFRva2VuLmpzJztcbmltcG9ydCBpc0NhbmNlbCBmcm9tICcuL2NhbmNlbC9pc0NhbmNlbC5qcyc7XG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnLi9lbnYvZGF0YS5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgc3ByZWFkIGZyb20gJy4vaGVscGVycy9zcHJlYWQuanMnO1xuaW1wb3J0IGlzQXhpb3NFcnJvciBmcm9tICcuL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgYWRhcHRlcnMgZnJvbSAnLi9hZGFwdGVycy9hZGFwdGVycy5qcyc7XG5pbXBvcnQgSHR0cFN0YXR1c0NvZGUgZnJvbSAnLi9oZWxwZXJzL0h0dHBTdGF0dXNDb2RlLmpzJztcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm5zIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICBjb25zdCBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICBjb25zdCBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0LCB7IGFsbE93bktleXM6IHRydWUgfSk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCwgbnVsbCwgeyBhbGxPd25LZXlzOiB0cnVlIH0pO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbmNvbnN0IGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IENhbmNlbGVkRXJyb3I7XG5heGlvcy5DYW5jZWxUb2tlbiA9IENhbmNlbFRva2VuO1xuYXhpb3MuaXNDYW5jZWwgPSBpc0NhbmNlbDtcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xuYXhpb3MudG9Gb3JtRGF0YSA9IHRvRm9ybURhdGE7XG5cbi8vIEV4cG9zZSBBeGlvc0Vycm9yIGNsYXNzXG5heGlvcy5BeGlvc0Vycm9yID0gQXhpb3NFcnJvcjtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHNwcmVhZDtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gaXNBeGlvc0Vycm9yO1xuXG4vLyBFeHBvc2UgbWVyZ2VDb25maWdcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XG5cbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycztcblxuYXhpb3MuZm9ybVRvSlNPTiA9ICh0aGluZykgPT4gZm9ybURhdGFUb0pTT04odXRpbHMuaXNIVE1MRm9ybSh0aGluZykgPyBuZXcgRm9ybURhdGEodGhpbmcpIDogdGhpbmcpO1xuXG5heGlvcy5nZXRBZGFwdGVyID0gYWRhcHRlcnMuZ2V0QWRhcHRlcjtcblxuYXhpb3MuSHR0cFN0YXR1c0NvZGUgPSBIdHRwU3RhdHVzQ29kZTtcblxuYXhpb3MuZGVmYXVsdCA9IGF4aW9zO1xuXG4vLyB0aGlzIG1vZHVsZSBzaG91bGQgb25seSBoYXZlIGEgZGVmYXVsdCBleHBvcnRcbmV4cG9ydCBkZWZhdWx0IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL0NhbmNlbGVkRXJyb3IuanMnO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxUb2tlbn1cbiAqL1xuY2xhc3MgQ2FuY2VsVG9rZW4ge1xuICBjb25zdHJ1Y3RvcihleGVjdXRvcikge1xuICAgIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZVByb21pc2U7XG5cbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdG9rZW4gPSB0aGlzO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbigoY2FuY2VsKSA9PiB7XG4gICAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgICAgbGV0IGkgPSB0b2tlbi5fbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgICAgfVxuICAgICAgdG9rZW4uX2xpc3RlbmVycyA9IG51bGw7XG4gICAgfSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuID0gKG9uZnVsZmlsbGVkKSA9PiB7XG4gICAgICBsZXQgX3Jlc29sdmU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHRva2VuLnN1YnNjcmliZShyZXNvbHZlKTtcbiAgICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgfSkudGhlbihvbmZ1bGZpbGxlZCk7XG5cbiAgICAgIHByb21pc2UuY2FuY2VsID0gZnVuY3Rpb24gcmVqZWN0KCkge1xuICAgICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuXG4gICAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAgICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpO1xuICAgICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAgICovXG4gIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgbGlzdGVuZXIodGhpcy5yZWFzb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW2xpc3RlbmVyXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHRvQWJvcnRTaWduYWwoKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgIGNvbnN0IGFib3J0ID0gKGVycikgPT4ge1xuICAgICAgY29udHJvbGxlci5hYm9ydChlcnIpO1xuICAgIH07XG5cbiAgICB0aGlzLnN1YnNjcmliZShhYm9ydCk7XG5cbiAgICBjb250cm9sbGVyLnNpZ25hbC51bnN1YnNjcmliZSA9ICgpID0+IHRoaXMudW5zdWJzY3JpYmUoYWJvcnQpO1xuXG4gICAgcmV0dXJuIGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAgICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAgICovXG4gIHN0YXRpYyBzb3VyY2UoKSB7XG4gICAgbGV0IGNhbmNlbDtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgICBjYW5jZWwgPSBjO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbixcbiAgICAgIGNhbmNlbCxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuXG5jbGFzcyBDYW5jZWxlZEVycm9yIGV4dGVuZHMgQXhpb3NFcnJvciB7XG4gIC8qKlxuICAgKiBBIGBDYW5jZWxlZEVycm9yYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtPYmplY3Q9fSBjb25maWcgVGhlIGNvbmZpZy5cbiAgICogQHBhcmFtIHtPYmplY3Q9fSByZXF1ZXN0IFRoZSByZXF1ZXN0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7Q2FuY2VsZWRFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcbiAgICBzdXBlcihtZXNzYWdlID09IG51bGwgPyAnY2FuY2VsZWQnIDogbWVzc2FnZSwgQXhpb3NFcnJvci5FUlJfQ0FOQ0VMRUQsIGNvbmZpZywgcmVxdWVzdCk7XG4gICAgdGhpcy5uYW1lID0gJ0NhbmNlbGVkRXJyb3InO1xuICAgIHRoaXMuX19DQU5DRUxfXyA9IHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsZWRFcnJvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IGJ1aWxkVVJMIGZyb20gJy4uL2hlbHBlcnMvYnVpbGRVUkwuanMnO1xuaW1wb3J0IEludGVyY2VwdG9yTWFuYWdlciBmcm9tICcuL0ludGVyY2VwdG9yTWFuYWdlci5qcyc7XG5pbXBvcnQgZGlzcGF0Y2hSZXF1ZXN0IGZyb20gJy4vZGlzcGF0Y2hSZXF1ZXN0LmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL21lcmdlQ29uZmlnLmpzJztcbmltcG9ydCBidWlsZEZ1bGxQYXRoIGZyb20gJy4vYnVpbGRGdWxsUGF0aC5qcyc7XG5pbXBvcnQgbWV0aG9kTGlzdCBmcm9tICcuL21ldGhvZExpc3QuanMnO1xuaW1wb3J0IHZhbGlkYXRvciBmcm9tICcuLi9oZWxwZXJzL3ZhbGlkYXRvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4vQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMnO1xuXG5jb25zdCB2YWxpZGF0b3JzID0gdmFsaWRhdG9yLnZhbGlkYXRvcnM7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKlxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmNsYXNzIEF4aW9zIHtcbiAgY29uc3RydWN0b3IoaW5zdGFuY2VDb25maWcpIHtcbiAgICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWcgfHwge307XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gY29uZmlnT3JVcmwgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICAgKiBAcGFyYW0gez9PYmplY3R9IGNvbmZpZ1xuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gICAqL1xuICBhc3luYyByZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3JlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsZXQgZHVtbXkgPSB7fTtcblxuICAgICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID8gRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZHVtbXkpIDogKGR1bW15ID0gbmV3IEVycm9yKCkpO1xuXG4gICAgICAgICAgY29uc3QgZHVtbXlTdGFjayA9IGR1bW15LnN0YWNrO1xuICAgICAgICAgIGxldCBzdGFjayA9ICcnO1xuXG4gICAgICAgICAgLy8gc2xpY2Ugb2ZmIHRoZSBFcnJvcjogLi4uIGxpbmVcbiAgICAgICAgICBpZiAodHlwZW9mIGR1bW15U3RhY2sgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdE5ld2xpbmVJbmRleCA9IGR1bW15U3RhY2suaW5kZXhPZignXFxuJyk7XG5cbiAgICAgICAgICAgIHN0YWNrID0gZmlyc3ROZXdsaW5lSW5kZXggPT09IC0xID8gJycgOiBkdW1teVN0YWNrLnNsaWNlKGZpcnN0TmV3bGluZUluZGV4ICsgMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFlcnIuc3RhY2spIHtcbiAgICAgICAgICAgIGVyci5zdGFjayA9IHN0YWNrO1xuICAgICAgICAgICAgLy8gbWF0Y2ggd2l0aG91dCB0aGUgMiB0b3Agc3RhY2sgbGluZXNcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YWNrKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdE5ld2xpbmVJbmRleCA9IHN0YWNrLmluZGV4T2YoJ1xcbicpO1xuICAgICAgICAgICAgY29uc3Qgc2Vjb25kTmV3bGluZUluZGV4ID1cbiAgICAgICAgICAgICAgZmlyc3ROZXdsaW5lSW5kZXggPT09IC0xID8gLTEgOiBzdGFjay5pbmRleE9mKCdcXG4nLCBmaXJzdE5ld2xpbmVJbmRleCArIDEpO1xuICAgICAgICAgICAgY29uc3Qgc3RhY2tXaXRob3V0VHdvVG9wTGluZXMgPVxuICAgICAgICAgICAgICBzZWNvbmROZXdsaW5lSW5kZXggPT09IC0xID8gJycgOiBzdGFjay5zbGljZShzZWNvbmROZXdsaW5lSW5kZXggKyAxKTtcblxuICAgICAgICAgICAgaWYgKCFTdHJpbmcoZXJyLnN0YWNrKS5lbmRzV2l0aChzdGFja1dpdGhvdXRUd29Ub3BMaW5lcykpIHtcbiAgICAgICAgICAgICAgZXJyLnN0YWNrICs9ICdcXG4nICsgc3RhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gSWdub3JlIGZhaWx1cmVzIGZyb20gY3VzdG9tIHN0YWNrIGhvb2tzIG9yIHVuLXdyaXRhYmxlIHN0YWNrIHByb3BlcnRpZXMuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIF9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gICAgaWYgKHR5cGVvZiBjb25maWdPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgIGNvbmZpZy51cmwgPSBjb25maWdPclVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnID0gY29uZmlnT3JVcmwgfHwge307XG4gICAgfVxuXG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAgIGNvbnN0IHsgdHJhbnNpdGlvbmFsLCBwYXJhbXNTZXJpYWxpemVyLCBoZWFkZXJzIH0gPSBjb25maWc7XG5cbiAgICBpZiAodHJhbnNpdGlvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKFxuICAgICAgICB0cmFuc2l0aW9uYWwsXG4gICAgICAgIHtcbiAgICAgICAgICBzaWxlbnRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgICBmb3JjZWRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgICBjbGFyaWZ5VGltZW91dEVycm9yOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICAgIGxlZ2FjeUludGVyY2VwdG9yUmVxUmVzT3JkZXJpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgICAgYWR2ZXJ0aXNlWnN0ZEFjY2VwdEVuY29kaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICAgIHZhbGlkYXRlU3RhdHVzVW5kZWZpbmVkUmVzb2x2ZXM6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXNTZXJpYWxpemVyICE9IG51bGwpIHtcbiAgICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKHBhcmFtc1NlcmlhbGl6ZXIpKSB7XG4gICAgICAgIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyID0ge1xuICAgICAgICAgIHNlcmlhbGl6ZTogcGFyYW1zU2VyaWFsaXplcixcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKFxuICAgICAgICAgIHBhcmFtc1NlcmlhbGl6ZXIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZW5jb2RlOiB2YWxpZGF0b3JzLmZ1bmN0aW9uLFxuICAgICAgICAgICAgc2VyaWFsaXplOiB2YWxpZGF0b3JzLmZ1bmN0aW9uLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCBjb25maWcuYWxsb3dBYnNvbHV0ZVVybHNcbiAgICBpZiAoY29uZmlnLmFsbG93QWJzb2x1dGVVcmxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGVmYXVsdHMuYWxsb3dBYnNvbHV0ZVVybHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uZmlnLmFsbG93QWJzb2x1dGVVcmxzID0gdGhpcy5kZWZhdWx0cy5hbGxvd0Fic29sdXRlVXJscztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnLmFsbG93QWJzb2x1dGVVcmxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyhcbiAgICAgIGNvbmZpZyxcbiAgICAgIHtcbiAgICAgICAgYmFzZVVybDogdmFsaWRhdG9ycy5zcGVsbGluZygnYmFzZVVSTCcpLFxuICAgICAgICB3aXRoWHNyZlRva2VuOiB2YWxpZGF0b3JzLnNwZWxsaW5nKCd3aXRoWFNSRlRva2VuJyksXG4gICAgICB9LFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICAgIGNvbmZpZy5tZXRob2QgPSAoXG4gICAgICB1dGlscy5nZXRTYWZlUHJvcChjb25maWcsICdtZXRob2QnKSB8fFxuICAgICAgdXRpbHMuZ2V0U2FmZVByb3AodGhpcy5kZWZhdWx0cywgJ21ldGhvZCcpIHx8XG4gICAgICAnZ2V0J1xuICAgICkudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICAgIGxldCBjb250ZXh0SGVhZGVycyA9IGhlYWRlcnMgJiYgdXRpbHMubWVyZ2UoaGVhZGVycy5jb21tb24sIGhlYWRlcnNbY29uZmlnLm1ldGhvZF0pO1xuXG4gICAgaGVhZGVycyAmJlxuICAgICAgdXRpbHMuZm9yRWFjaChtZXRob2RMaXN0LmNvbmNhdCgnY29tbW9uJyksIChtZXRob2QpID0+IHtcbiAgICAgICAgZGVsZXRlIGhlYWRlcnNbbWV0aG9kXTtcbiAgICAgIH0pO1xuXG4gICAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuY29uY2F0KGNvbnRleHRIZWFkZXJzLCBoZWFkZXJzKTtcblxuICAgIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIGxldCBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IGNvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICBjb25zdCBsZWdhY3lJbnRlcmNlcHRvclJlcVJlc09yZGVyaW5nID1cbiAgICAgICAgdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5sZWdhY3lJbnRlcmNlcHRvclJlcVJlc09yZGVyaW5nO1xuXG4gICAgICBpZiAobGVnYWN5SW50ZXJjZXB0b3JSZXFSZXNPcmRlcmluZykge1xuICAgICAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgICByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICB9KTtcblxuICAgIGxldCBwcm9taXNlO1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgbGVuO1xuXG4gICAgaWYgKCFzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMpIHtcbiAgICAgIGNvbnN0IGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdC5iaW5kKHRoaXMpLCB1bmRlZmluZWRdO1xuICAgICAgY2hhaW4udW5zaGlmdCguLi5yZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBjaGFpbi5wdXNoKC4uLnJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBsZW4gPSBjaGFpbi5sZW5ndGg7XG5cbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbltpKytdLCBjaGFpbltpKytdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgbGVuID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgbGV0IG5ld0NvbmZpZyA9IGNvbmZpZztcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBjb25zdCBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICBjb25zdCBvblJlamVjdGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkID8gb25GdWxmaWxsZWQobmV3Q29uZmlnKSA6IG5ld0NvbmZpZztcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmICghb25SZWplY3RlZCkge1xuICAgICAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHJlamVjdGVkUmVzdWx0ID0gb25SZWplY3RlZC5jYWxsKHRoaXMsIGVycm9yKTtcblxuICAgICAgICAgIGlmICh1dGlscy5pc1RoZW5hYmxlKHJlamVjdGVkUmVzdWx0KSkge1xuICAgICAgICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShyZWplY3RlZFJlc3VsdCkudGhlbigoKSA9PlxuICAgICAgICAgICAgICBkaXNwYXRjaFJlcXVlc3QuY2FsbCh0aGlzLCBuZXdDb25maWcpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAocmVqZWN0ZWRFcnJvcikge1xuICAgICAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlamVjdChyZWplY3RlZEVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdC5jYWxsKHRoaXMsIG5ld0NvbmZpZyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGkgPSAwO1xuICAgIGxlbiA9IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihyZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSwgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10pO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgZ2V0VXJpKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gICAgY29uc3QgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsLCBjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMsIGNvbmZpZyk7XG4gICAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG4gIH1cbn1cblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAodXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFxuICAgICAgbWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgdXJsLFxuICAgICAgICBkYXRhOiBjb25maWcgJiYgdXRpbHMuaGFzT3duUHJvcChjb25maWcsICdkYXRhJykgPyBjb25maWcuZGF0YSA6IHVuZGVmaW5lZCxcbiAgICAgIH0pXG4gICAgKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAncXVlcnknXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBmdW5jdGlvbiBnZW5lcmF0ZUhUVFBNZXRob2QoaXNGb3JtKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGh0dHBNZXRob2QodXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXG4gICAgICAgIG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICBoZWFkZXJzOiBpc0Zvcm1cbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDoge30sXG4gICAgICAgICAgdXJsLFxuICAgICAgICAgIGRhdGEsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH07XG4gIH1cblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCgpO1xuXG4gIC8vIFFVRVJZIGlzIGEgc2FmZS9pZGVtcG90ZW50IHJlYWQgbWV0aG9kOyBtdWx0aXBhcnQgZm9ybSBib2RpZXMgZG9uJ3QgZml0XG4gIC8vIGl0cyBzZW1hbnRpY3MsIHNvIG5vIHF1ZXJ5Rm9ybSBzaG9ydGhhbmQgaXMgZ2VuZXJhdGVkLlxuICBpZiAobWV0aG9kICE9PSAncXVlcnknKSB7XG4gICAgQXhpb3MucHJvdG90eXBlW21ldGhvZCArICdGb3JtJ10gPSBnZW5lcmF0ZUhUVFBNZXRob2QodHJ1ZSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi9BeGlvc0hlYWRlcnMuanMnO1xuXG5leHBvcnQgY29uc3QgUkVEQUNURUQgPSAnW1JFREFDVEVEICoqKipdJztcblxuZnVuY3Rpb24gaGFzT3duT3JQcm90b3R5cGVUb0pTT04oc291cmNlKSB7XG4gIGlmICh1dGlscy5oYXNPd25Qcm9wKHNvdXJjZSwgJ3RvSlNPTicpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBsZXQgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHNvdXJjZSk7XG5cbiAgd2hpbGUgKHByb3RvdHlwZSAmJiBwcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICBpZiAodXRpbHMuaGFzT3duUHJvcChwcm90b3R5cGUsICd0b0pTT04nKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIEJ1aWxkIGEgcGxhaW4tb2JqZWN0IHNuYXBzaG90IG9mIGBjb25maWdgIGFuZCByZXBsYWNlIHRoZSB2YWx1ZSBvZiBhbnkga2V5XG4vLyAoY2FzZS1pbnNlbnNpdGl2ZSkgbGlzdGVkIGluIGByZWRhY3RLZXlzYCB3aXRoIFJFREFDVEVELiBXYWxrcyB0aHJvdWdoIGFycmF5c1xuLy8gYW5kIEF4aW9zSGVhZGVycywgYW5kIHNob3J0LWNpcmN1aXRzIG9uIGNpcmN1bGFyIHJlZmVyZW5jZXMuXG5mdW5jdGlvbiByZWRhY3RDb25maWcoY29uZmlnLCByZWRhY3RLZXlzKSB7XG4gIGNvbnN0IGxvd2VyS2V5cyA9IG5ldyBTZXQocmVkYWN0S2V5cy5tYXAoKGspID0+IFN0cmluZyhrKS50b0xvd2VyQ2FzZSgpKSk7XG4gIGNvbnN0IHNlZW4gPSBbXTtcblxuICBjb25zdCB2aXNpdCA9IChzb3VyY2UpID0+IHtcbiAgICBpZiAoc291cmNlID09PSBudWxsIHx8IHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSByZXR1cm4gc291cmNlO1xuICAgIGlmICh1dGlscy5pc0J1ZmZlcihzb3VyY2UpKSByZXR1cm4gc291cmNlO1xuICAgIGlmIChzZWVuLmluZGV4T2Yoc291cmNlKSAhPT0gLTEpIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoc291cmNlIGluc3RhbmNlb2YgQXhpb3NIZWFkZXJzKSB7XG4gICAgICBzb3VyY2UgPSBzb3VyY2UudG9KU09OKCk7XG4gICAgfVxuXG4gICAgc2Vlbi5wdXNoKHNvdXJjZSk7XG5cbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgc291cmNlLmZvckVhY2goKHYsIGkpID0+IHtcbiAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gdmlzaXQodik7XG4gICAgICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSkge1xuICAgICAgICAgIHJlc3VsdFtpXSA9IHJlZHVjZWRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpICYmIGhhc093bk9yUHJvdG90eXBlVG9KU09OKHNvdXJjZSkpIHtcbiAgICAgICAgc2Vlbi5wb3AoKTtcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgIH1cblxuICAgICAgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHNvdXJjZSkpIHtcbiAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gbG93ZXJLZXlzLmhhcyhrZXkudG9Mb3dlckNhc2UoKSkgPyBSRURBQ1RFRCA6IHZpc2l0KHZhbHVlKTtcbiAgICAgICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChyZWR1Y2VkVmFsdWUpKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSByZWR1Y2VkVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZWVuLnBvcCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgcmV0dXJuIHZpc2l0KGNvbmZpZyk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseSh2YWx1ZSkge1xuICB0cnkge1xuICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWdncmVnYXRlRXJyb3JNZXNzYWdlKGVycm9yKSB7XG4gIGNvbnN0IG1lc3NhZ2UgPSBlcnJvci5lcnJvcnNcbiAgICAubWFwKChlbnRyeSkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5Lm1lc3NhZ2UgPyBzdHJpbmdpZnlTYWZlbHkoZW50cnkubWVzc2FnZSkgOiBzdHJpbmdpZnlTYWZlbHkoZW50cnkpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9KVxuICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAuam9pbignOyAnKTtcblxuICByZXR1cm4gbWVzc2FnZSB8fCBlcnJvci5uYW1lIHx8ICdBZ2dyZWdhdGVFcnJvcic7XG59XG5cbmNsYXNzIEF4aW9zRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIHN0YXRpYyBmcm9tKGVycm9yLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlLCBjdXN0b21Qcm9wcykge1xuICAgIC8vIGBBZ2dyZWdhdGVFcnJvcmAgKHRocm93biBieSBOb2RlIG9uIGR1YWwtc3RhY2svSGFwcHktRXllYmFsbHMgY29ubmVjdGlvblxuICAgIC8vIGZhaWx1cmVzKSBoYXMgYW4gZW1wdHkgYG1lc3NhZ2VgOyBpdHMgZGV0YWlsIGxpdmVzIGluIGBlcnJvcnNbXWAuIFdpdGhvdXRcbiAgICAvLyB0aGlzLCB0aGUgd3JhcHBlZCBlcnJvciBzdXJmYWNlcyB3aXRoIGEgYmxhbmsgbWVzc2FnZSAoc2VlICM2NzIxKS5cbiAgICBsZXQgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgaWYgKCFtZXNzYWdlICYmIHV0aWxzLmlzQXJyYXkoZXJyb3IuZXJyb3JzKSAmJiBlcnJvci5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICBtZXNzYWdlID0gYWdncmVnYXRlRXJyb3JNZXNzYWdlKGVycm9yKTtcbiAgICB9XG5cbiAgICBjb25zdCBheGlvc0Vycm9yID0gbmV3IEF4aW9zRXJyb3IobWVzc2FnZSwgY29kZSB8fCBlcnJvci5jb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbiAgICAvLyBNYXRjaCBuYXRpdmUgYEVycm9yYCBgY2F1c2VgIHNlbWFudGljczogbm9uLWVudW1lcmFibGUuIFRoZSB3cmFwcGVkXG4gICAgLy8gZXJyb3Igb2Z0ZW4gY2FycmllcyBjaXJjdWxhciBpbnRlcm5hbHMgKHNvY2tldHMsIHJlcXVlc3RzLCBhZ2VudHMpLCBzb1xuICAgIC8vIGFuIGVudW1lcmFibGUgYGNhdXNlYCBtYWtlcyBzdHJ1Y3R1cmVkIGxvZ2dlcnMgKHBpbm8vd2luc3RvbikgYW5kIGFueVxuICAgIC8vIG93bi1wcm9wZXJ0eSB3YWxrIHRocm93IFwiQ29udmVydGluZyBjaXJjdWxhciBzdHJ1Y3R1cmUgdG8gSlNPTlwiLlxuICAgIC8vIFJlZ3Jlc3Npb24gZnJvbSAjNjk4Mjsgc2VlICM3MjA1LiBgX19wcm90b19fOiBudWxsYCBtaXJyb3JzIHRoZVxuICAgIC8vIGBtZXNzYWdlYCBkZXNjcmlwdG9yIGJlbG93IChwcm90b3R5cGUtcG9sbHV0aW9uLXNhZmUgZGVzY3JpcHRvcikuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGF4aW9zRXJyb3IsICdjYXVzZScsIHtcbiAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgIHZhbHVlOiBlcnJvcixcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgfSk7XG4gICAgYXhpb3NFcnJvci5uYW1lID0gZXJyb3IubmFtZTtcblxuICAgIC8vIFByZXNlcnZlIHN0YXR1cyBmcm9tIHRoZSBvcmlnaW5hbCBlcnJvciBpZiBub3QgYWxyZWFkeSBzZXQgZnJvbSByZXNwb25zZVxuICAgIGlmIChlcnJvci5zdGF0dXMgIT0gbnVsbCAmJiBheGlvc0Vycm9yLnN0YXR1cyA9PSBudWxsKSB7XG4gICAgICBheGlvc0Vycm9yLnN0YXR1cyA9IGVycm9yLnN0YXR1cztcbiAgICB9XG5cbiAgICBjdXN0b21Qcm9wcyAmJiBPYmplY3QuYXNzaWduKGF4aW9zRXJyb3IsIGN1c3RvbVByb3BzKTtcbiAgICByZXR1cm4gYXhpb3NFcnJvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIGNvbmZpZy5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICAgKi9cbiAgY29uc3RydWN0b3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuXG4gICAgLy8gTWFrZSBtZXNzYWdlIGVudW1lcmFibGUgdG8gbWFpbnRhaW4gYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgIC8vIFRoZSBuYXRpdmUgRXJyb3IgY29uc3RydWN0b3Igc2V0cyBtZXNzYWdlIGFzIG5vbi1lbnVtZXJhYmxlLFxuICAgIC8vIGJ1dCBheGlvcyA8IHYxLjEzLjMgaGFkIGl0IGFzIGVudW1lcmFibGVcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ21lc3NhZ2UnLCB7XG4gICAgICAvLyBOdWxsLXByb3RvIGRlc2NyaXB0b3Igc28gYSBwb2xsdXRlZCBPYmplY3QucHJvdG90eXBlLmdldCBjYW5ub3QgdHVyblxuICAgICAgLy8gdGhpcyBkYXRhIGRlc2NyaXB0b3IgaW50byBhbiBhY2Nlc3NvciBkZXNjcmlwdG9yIG9uIHRoZSB3YXkgaW4uXG4gICAgICBfX3Byb3RvX186IG51bGwsXG4gICAgICB2YWx1ZTogbWVzc2FnZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHRoaXMubmFtZSA9ICdBeGlvc0Vycm9yJztcbiAgICB0aGlzLmlzQXhpb3NFcnJvciA9IHRydWU7XG4gICAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XG4gICAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gICAgcmVxdWVzdCAmJiAodGhpcy5yZXF1ZXN0ID0gcmVxdWVzdCk7XG4gICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICB0aGlzLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICB9XG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgLy8gT3B0LWluIHJlZGFjdGlvbjogd2hlbiB0aGUgcmVxdWVzdCBjb25maWcgY2FycmllcyBhIGByZWRhY3RgIGFycmF5LCB0aGVcbiAgICAvLyB2YWx1ZSBvZiBhbnkgbWF0Y2hpbmcga2V5IChjYXNlLWluc2Vuc2l0aXZlLCBhdCBhbnkgZGVwdGgpIGlzIHJlcGxhY2VkXG4gICAgLy8gd2l0aCBSRURBQ1RFRCBpbiB0aGUgc2VyaWFsaXplZCBzbmFwc2hvdC4gVW5kZWZpbmVkIG9yIGVtcHR5IGxlYXZlcyB0aGVcbiAgICAvLyBleGlzdGluZyBzZXJpYWxpemF0aW9uIGJlaGF2aW9yIHVuY2hhbmdlZC5cbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICBjb25zdCByZWRhY3RLZXlzID0gY29uZmlnICYmIHV0aWxzLmhhc093blByb3AoY29uZmlnLCAncmVkYWN0JykgPyBjb25maWcucmVkYWN0IDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHNlcmlhbGl6ZWRDb25maWcgPVxuICAgICAgdXRpbHMuaXNBcnJheShyZWRhY3RLZXlzKSAmJiByZWRhY3RLZXlzLmxlbmd0aCA+IDBcbiAgICAgICAgPyByZWRhY3RDb25maWcoY29uZmlnLCByZWRhY3RLZXlzKVxuICAgICAgICA6IHV0aWxzLnRvSlNPTk9iamVjdChjb25maWcpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogc2VyaWFsaXplZENvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgfTtcbiAgfVxufVxuXG4vLyBUaGlzIGNhbiBiZSBjaGFuZ2VkIHRvIHN0YXRpYyBwcm9wZXJ0aWVzIGFzIHNvb24gYXMgdGhlIHBhcnNlciBvcHRpb25zIGluIC5lc2xpbnQuY2pzIGFyZSB1cGRhdGVkLlxuQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSA9ICdFUlJfQkFEX09QVElPTl9WQUxVRSc7XG5BeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OID0gJ0VSUl9CQURfT1BUSU9OJztcbkF4aW9zRXJyb3IuRUNPTk5BQk9SVEVEID0gJ0VDT05OQUJPUlRFRCc7XG5BeGlvc0Vycm9yLkVUSU1FRE9VVCA9ICdFVElNRURPVVQnO1xuQXhpb3NFcnJvci5FQ09OTlJFRlVTRUQgPSAnRUNPTk5SRUZVU0VEJztcbkF4aW9zRXJyb3IuRVJSX05FVFdPUksgPSAnRVJSX05FVFdPUksnO1xuQXhpb3NFcnJvci5FUlJfRlJfVE9PX01BTllfUkVESVJFQ1RTID0gJ0VSUl9GUl9UT09fTUFOWV9SRURJUkVDVFMnO1xuQXhpb3NFcnJvci5FUlJfREVQUkVDQVRFRCA9ICdFUlJfREVQUkVDQVRFRCc7XG5BeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UgPSAnRVJSX0JBRF9SRVNQT05TRSc7XG5BeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCA9ICdFUlJfQkFEX1JFUVVFU1QnO1xuQXhpb3NFcnJvci5FUlJfQ0FOQ0VMRUQgPSAnRVJSX0NBTkNFTEVEJztcbkF4aW9zRXJyb3IuRVJSX05PVF9TVVBQT1JUID0gJ0VSUl9OT1RfU1VQUE9SVCc7XG5BeGlvc0Vycm9yLkVSUl9JTlZBTElEX1VSTCA9ICdFUlJfSU5WQUxJRF9VUkwnO1xuQXhpb3NFcnJvci5FUlJfRk9STV9EQVRBX0RFUFRIX0VYQ0VFREVEID0gJ0VSUl9GT1JNX0RBVEFfREVQVEhfRVhDRUVERUQnO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0Vycm9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHBhcnNlSGVhZGVycyBmcm9tICcuLi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyc7XG5pbXBvcnQgeyBzYW5pdGl6ZUhlYWRlclZhbHVlIH0gZnJvbSAnLi4vaGVscGVycy9zYW5pdGl6ZUhlYWRlclZhbHVlLmpzJztcblxuY29uc3QgJGludGVybmFscyA9IFN5bWJvbCgnaW50ZXJuYWxzJyk7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpIHtcbiAgcmV0dXJuIGhlYWRlciAmJiBTdHJpbmcoaGVhZGVyKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUubWFwKG5vcm1hbGl6ZVZhbHVlKSA6IHNhbml0aXplSGVhZGVyVmFsdWUoU3RyaW5nKHZhbHVlKSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW5zKHN0cikge1xuICBjb25zdCB0b2tlbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBjb25zdCB0b2tlbnNSRSA9IC8oW15cXHMsOz1dKylcXHMqKD86PVxccyooW14sO10rKSk/L2c7XG4gIGxldCBtYXRjaDtcblxuICB3aGlsZSAoKG1hdGNoID0gdG9rZW5zUkUuZXhlYyhzdHIpKSkge1xuICAgIHRva2Vuc1ttYXRjaFsxXV0gPSBtYXRjaFsyXTtcbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG5cbmNvbnN0IHBhcmFtZXRlck5hbWVSRSA9IC9eWyEjJCUmJyorXFwtLl5fYHx+MC05QS1aYS16XSskLztcblxuZnVuY3Rpb24gdHJpbU9XUyh2YWx1ZSkge1xuICBsZXQgc3RhcnQgPSAwO1xuICBsZXQgZW5kID0gdmFsdWUubGVuZ3RoO1xuXG4gIHdoaWxlIChzdGFydCA8IGVuZCkge1xuICAgIGNvbnN0IGNvZGUgPSB2YWx1ZS5jaGFyQ29kZUF0KHN0YXJ0KTtcblxuICAgIGlmIChjb2RlICE9PSAweDA5ICYmIGNvZGUgIT09IDB4MjApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN0YXJ0ICs9IDE7XG4gIH1cblxuICB3aGlsZSAoZW5kID4gc3RhcnQpIHtcbiAgICBjb25zdCBjb2RlID0gdmFsdWUuY2hhckNvZGVBdChlbmQgLSAxKTtcblxuICAgIGlmIChjb2RlICE9PSAweDA5ICYmIGNvZGUgIT09IDB4MjApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGVuZCAtPSAxO1xuICB9XG5cbiAgcmV0dXJuIHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gdmFsdWUubGVuZ3RoID8gdmFsdWUgOiB2YWx1ZS5zbGljZShzdGFydCwgZW5kKTtcbn1cblxuZnVuY3Rpb24gZGVjb2RlUXVvdGVkU3RyaW5nKHZhbHVlKSB7XG4gIGNvbnN0IGxhc3QgPSB2YWx1ZS5sZW5ndGggLSAxO1xuXG4gIGlmIChsYXN0IDwgMSB8fCB2YWx1ZS5jaGFyQ29kZUF0KDApICE9PSAweDIyIHx8IHZhbHVlLmNoYXJDb2RlQXQobGFzdCkgIT09IDB4MjIpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBsZXQgZGVjb2RlZCA9ICcnO1xuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbGFzdDsgaSsrKSB7XG4gICAgY29uc3QgY29kZSA9IHZhbHVlLmNoYXJDb2RlQXQoaSk7XG5cbiAgICBpZiAoY29kZSA9PT0gMHgyMikge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGlmIChjb2RlID09PSAweDVjKSB7XG4gICAgICBpICs9IDE7XG5cbiAgICAgIGlmIChpID49IGxhc3QpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRlY29kZWQgKz0gdmFsdWVbaV07XG4gIH1cblxuICByZXR1cm4gZGVjb2RlZDtcbn1cblxuZnVuY3Rpb24gcGFyc2VQYXJhbWV0ZXJzKHZhbHVlKSB7XG4gIGNvbnN0IHBhcmFtZXRlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBjb25zdCBzdHIgPSBTdHJpbmcodmFsdWUpO1xuICBsZXQgc3RhcnQgPSAwO1xuICBsZXQgcXVvdGVkID0gZmFsc2U7XG4gIGxldCBlc2NhcGVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gcGFyc2VQYXJhbWV0ZXIoZW5kKSB7XG4gICAgY29uc3QgcGFydCA9IHRyaW1PV1Moc3RyLnNsaWNlKHN0YXJ0LCBlbmQpKTtcbiAgICBjb25zdCBlcXVhbHMgPSBwYXJ0LmluZGV4T2YoJz0nKTtcblxuICAgIGlmIChlcXVhbHMgPCAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmFtZSA9IHRyaW1PV1MocGFydC5zbGljZSgwLCBlcXVhbHMpKTtcblxuICAgIGlmICghcGFyYW1ldGVyTmFtZVJFLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBub3JtYWxpemVkTmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmIChcbiAgICAgIG5vcm1hbGl6ZWROYW1lID09PSAnX19wcm90b19fJyB8fFxuICAgICAgbm9ybWFsaXplZE5hbWUgPT09ICdjb25zdHJ1Y3RvcicgfHxcbiAgICAgIG5vcm1hbGl6ZWROYW1lID09PSAncHJvdG90eXBlJ1xuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcmFtZXRlclZhbHVlID0gdHJpbU9XUyhwYXJ0LnNsaWNlKGVxdWFscyArIDEpKTtcbiAgICBwYXJhbWV0ZXJzW25vcm1hbGl6ZWROYW1lXSA9IGRlY29kZVF1b3RlZFN0cmluZyhwYXJhbWV0ZXJWYWx1ZSk7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNvZGUgPSBzdHIuY2hhckNvZGVBdChpKTtcblxuICAgIGlmIChxdW90ZWQpIHtcbiAgICAgIGlmIChlc2NhcGVkKSB7XG4gICAgICAgIGVzY2FwZWQgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHg1Yykge1xuICAgICAgICBlc2NhcGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHgyMikge1xuICAgICAgICBxdW90ZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4MjIpIHtcbiAgICAgIHF1b3RlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChjb2RlID09PSAweDJjIHx8IGNvZGUgPT09IDB4M2IpIHtcbiAgICAgIHBhcnNlUGFyYW1ldGVyKGkpO1xuICAgICAgc3RhcnQgPSBpICsgMTtcbiAgICB9XG4gIH1cblxuICBwYXJzZVBhcmFtZXRlcihzdHIubGVuZ3RoKTtcblxuICByZXR1cm4gcGFyYW1ldGVycztcbn1cblxuY29uc3QgaXNWYWxpZEhlYWRlck5hbWUgPSAoc3RyKSA9PiAvXlstX2EtekEtWjAtOV5gfH4sISMkJSYnKisuXSskLy50ZXN0KHN0ci50cmltKCkpO1xuXG5mdW5jdGlvbiBtYXRjaEhlYWRlclZhbHVlKGNvbnRleHQsIHZhbHVlLCBoZWFkZXIsIGZpbHRlciwgaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gIGlmICh1dGlscy5pc0Z1bmN0aW9uKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLmNhbGwodGhpcywgdmFsdWUsIGhlYWRlcik7XG4gIH1cblxuICBpZiAoaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gICAgdmFsdWUgPSBoZWFkZXI7XG4gIH1cblxuICBpZiAoIXV0aWxzLmlzU3RyaW5nKHZhbHVlKSkgcmV0dXJuO1xuXG4gIGlmICh1dGlscy5pc1N0cmluZyhmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmluZGV4T2YoZmlsdGVyKSAhPT0gLTE7XG4gIH1cblxuICBpZiAodXRpbHMuaXNSZWdFeHAoZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIudGVzdCh2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0SGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyXG4gICAgLnRyaW0oKVxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UoLyhbYS16XFxkXSkoXFx3KikvZywgKHcsIGNoYXIsIHN0cikgPT4ge1xuICAgICAgcmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKSArIHN0cjtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRBY2Nlc3NvcnMob2JqLCBoZWFkZXIpIHtcbiAgY29uc3QgYWNjZXNzb3JOYW1lID0gdXRpbHMudG9DYW1lbENhc2UoJyAnICsgaGVhZGVyKTtcblxuICBbJ2dldCcsICdzZXQnLCAnaGFzJ10uZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIC8vIE51bGwtcHJvdG8gZGVzY3JpcHRvciBzbyBhIHBvbGx1dGVkIE9iamVjdC5wcm90b3R5cGUuZ2V0IGNhbm5vdCB0dXJuXG4gICAgICAvLyB0aGlzIGRhdGEgZGVzY3JpcHRvciBpbnRvIGFuIGFjY2Vzc29yIGRlc2NyaXB0b3Igb24gdGhlIHdheSBpbi5cbiAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiAoYXJnMSwgYXJnMiwgYXJnMykge1xuICAgICAgICByZXR1cm4gdGhpc1ttZXRob2ROYW1lXS5jYWxsKHRoaXMsIGhlYWRlciwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIH0pO1xuICB9KTtcbn1cblxuY2xhc3MgQXhpb3NIZWFkZXJzIHtcbiAgY29uc3RydWN0b3IoaGVhZGVycykge1xuICAgIGhlYWRlcnMgJiYgdGhpcy5zZXQoaGVhZGVycyk7XG4gIH1cblxuICBzZXQoaGVhZGVyLCB2YWx1ZU9yUmV3cml0ZSwgcmV3cml0ZSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpIHtcbiAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmICghbEhlYWRlcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoc2VsZiwgbEhlYWRlcik7XG5cbiAgICAgIGlmIChcbiAgICAgICAgIWtleSB8fFxuICAgICAgICBzZWxmW2tleV0gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICBfcmV3cml0ZSA9PT0gdHJ1ZSB8fFxuICAgICAgICAoX3Jld3JpdGUgPT09IHVuZGVmaW5lZCAmJiBzZWxmW2tleV0gIT09IGZhbHNlKVxuICAgICAgKSB7XG4gICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PlxuICAgICAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCAoX3ZhbHVlLCBfaGVhZGVyKSA9PiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkpO1xuXG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNTdHJpbmcoaGVhZGVyKSAmJiAoaGVhZGVyID0gaGVhZGVyLnRyaW0oKSkgJiYgIWlzVmFsaWRIZWFkZXJOYW1lKGhlYWRlcikpIHtcbiAgICAgIHNldEhlYWRlcnMocGFyc2VIZWFkZXJzKGhlYWRlciksIHZhbHVlT3JSZXdyaXRlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KGhlYWRlcikgJiYgdXRpbHMuaXNTYWZlSXRlcmFibGUoaGVhZGVyKSkge1xuICAgICAgbGV0IG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAgIGRlc3QsXG4gICAgICAgIGtleTtcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgaGVhZGVyKSB7XG4gICAgICAgIGlmICghdXRpbHMuaXNBcnJheShlbnRyeSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QgaXRlcmF0b3IgbXVzdCByZXR1cm4gYSBrZXktdmFsdWUgcGFpcicpO1xuICAgICAgICB9XG5cbiAgICAgICAga2V5ID0gZW50cnlbMF07XG5cbiAgICAgICAgaWYgKHV0aWxzLmhhc093blByb3Aob2JqLCBrZXkpKSB7XG4gICAgICAgICAgZGVzdCA9IG9ialtrZXldO1xuICAgICAgICAgIG9ialtrZXldID0gdXRpbHMuaXNBcnJheShkZXN0KSA/IFsuLi5kZXN0LCBlbnRyeVsxXV0gOiBbZGVzdCwgZW50cnlbMV1dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ialtrZXldID0gZW50cnlbMV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2V0SGVhZGVycyhvYmosIHZhbHVlT3JSZXdyaXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyICE9IG51bGwgJiYgc2V0SGVhZGVyKHZhbHVlT3JSZXdyaXRlLCBoZWFkZXIsIHJld3JpdGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KGhlYWRlciwgcGFyc2VyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzW2tleV07XG5cbiAgICAgICAgaWYgKCFwYXJzZXIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyc2VyID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlVG9rZW5zKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmNhbGwodGhpcywgdmFsdWUsIGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNSZWdFeHAocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuZXhlYyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJzZXIgbXVzdCBiZSBib29sZWFufHJlZ2V4cHxmdW5jdGlvbicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhcyhoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgcmV0dXJuICEhKFxuICAgICAgICBrZXkgJiZcbiAgICAgICAgdGhpc1trZXldICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIpKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBkZWxldGUoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgbGV0IGRlbGV0ZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGRlbGV0ZUhlYWRlcihfaGVhZGVyKSB7XG4gICAgICBfaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoX2hlYWRlcikge1xuICAgICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIF9oZWFkZXIpO1xuXG4gICAgICAgIGlmIChrZXkgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUoc2VsZiwgc2VsZltrZXldLCBrZXksIG1hdGNoZXIpKSkge1xuICAgICAgICAgIGRlbGV0ZSBzZWxmW2tleV07XG5cbiAgICAgICAgICBkZWxldGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5KGhlYWRlcikpIHtcbiAgICAgIGhlYWRlci5mb3JFYWNoKGRlbGV0ZUhlYWRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZUhlYWRlcihoZWFkZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgY2xlYXIobWF0Y2hlcikge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcbiAgICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIsIHRydWUpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgbm9ybWFsaXplKGZvcm1hdCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoaGVhZGVycywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBzZWxmW2tleV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGZvcm1hdCA/IGZvcm1hdEhlYWRlcihoZWFkZXIpIDogU3RyaW5nKGhlYWRlcikudHJpbSgpO1xuXG4gICAgICBpZiAobm9ybWFsaXplZCAhPT0gaGVhZGVyKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICB9XG5cbiAgICAgIHNlbGZbbm9ybWFsaXplZF0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZF0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25jYXQoLi4udGFyZ2V0cykge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNvbmNhdCh0aGlzLCAuLi50YXJnZXRzKTtcbiAgfVxuXG4gIHRvSlNPTihhc1N0cmluZ3MpIHtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgdmFsdWUgIT0gbnVsbCAmJlxuICAgICAgICB2YWx1ZSAhPT0gZmFsc2UgJiZcbiAgICAgICAgKG9ialtoZWFkZXJdID0gYXNTdHJpbmdzICYmIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbignLCAnKSA6IHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpXG4gICAgICAubWFwKChbaGVhZGVyLCB2YWx1ZV0pID0+IGhlYWRlciArICc6ICcgKyB2YWx1ZSlcbiAgICAgIC5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIGdldFNldENvb2tpZSgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0KCdzZXQtY29va2llJyk7XG4gICAgcmV0dXJuIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSBmYWxzZSA/IFtdIDogW3ZhbHVlXTtcbiAgfVxuXG4gIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcbiAgICByZXR1cm4gJ0F4aW9zSGVhZGVycyc7XG4gIH1cblxuICBzdGF0aWMgZnJvbSh0aGluZykge1xuICAgIHJldHVybiB0aGluZyBpbnN0YW5jZW9mIHRoaXMgPyB0aGluZyA6IG5ldyB0aGlzKHRoaW5nKTtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZVBhcmFtZXRlcnModmFsdWUpIHtcbiAgICByZXR1cm4gcGFyc2VQYXJhbWV0ZXJzKHZhbHVlKTtcbiAgfVxuXG4gIHN0YXRpYyBjb25jYXQoZmlyc3QsIC4uLnRhcmdldHMpIHtcbiAgICBjb25zdCBjb21wdXRlZCA9IG5ldyB0aGlzKGZpcnN0KTtcblxuICAgIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiBjb21wdXRlZC5zZXQodGFyZ2V0KSk7XG5cbiAgICByZXR1cm4gY29tcHV0ZWQ7XG4gIH1cblxuICBzdGF0aWMgYWNjZXNzb3IoaGVhZGVyKSB7XG4gICAgY29uc3QgaW50ZXJuYWxzID1cbiAgICAgICh0aGlzWyRpbnRlcm5hbHNdID1cbiAgICAgIHRoaXNbJGludGVybmFsc10gPVxuICAgICAgICB7XG4gICAgICAgICAgYWNjZXNzb3JzOiB7fSxcbiAgICAgICAgfSk7XG5cbiAgICBjb25zdCBhY2Nlc3NvcnMgPSBpbnRlcm5hbHMuYWNjZXNzb3JzO1xuICAgIGNvbnN0IHByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuXG4gICAgZnVuY3Rpb24gZGVmaW5lQWNjZXNzb3IoX2hlYWRlcikge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFhY2Nlc3NvcnNbbEhlYWRlcl0pIHtcbiAgICAgICAgYnVpbGRBY2Nlc3NvcnMocHJvdG90eXBlLCBfaGVhZGVyKTtcbiAgICAgICAgYWNjZXNzb3JzW2xIZWFkZXJdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlscy5pc0FycmF5KGhlYWRlcikgPyBoZWFkZXIuZm9yRWFjaChkZWZpbmVBY2Nlc3NvcikgOiBkZWZpbmVBY2Nlc3NvcihoZWFkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQXhpb3NIZWFkZXJzLmFjY2Vzc29yKFtcbiAgJ0NvbnRlbnQtVHlwZScsXG4gICdDb250ZW50LUxlbmd0aCcsXG4gICdBY2NlcHQnLFxuICAnQWNjZXB0LUVuY29kaW5nJyxcbiAgJ1VzZXItQWdlbnQnLFxuICAnQXV0aG9yaXphdGlvbicsXG5dKTtcblxuLy8gcmVzZXJ2ZWQgbmFtZXMgaG90Zml4XG51dGlscy5yZWR1Y2VEZXNjcmlwdG9ycyhBeGlvc0hlYWRlcnMucHJvdG90eXBlLCAoeyB2YWx1ZSB9LCBrZXkpID0+IHtcbiAgbGV0IG1hcHBlZCA9IGtleVswXS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpOyAvLyBtYXAgYHNldGAgPT4gYFNldGBcbiAgcmV0dXJuIHtcbiAgICBnZXQ6ICgpID0+IHZhbHVlLFxuICAgIHNldChoZWFkZXJWYWx1ZSkge1xuICAgICAgdGhpc1ttYXBwZWRdID0gaGVhZGVyVmFsdWU7XG4gICAgfSxcbiAgfTtcbn0pO1xuXG51dGlscy5mcmVlemVNZXRob2RzKEF4aW9zSGVhZGVycyk7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zSGVhZGVycztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuY29uc3QgJGludGVybmFscyA9IFN5bWJvbCgnaW50ZXJuYWxzJyk7XG5cbi8vIGBoYW5kbGVyc2AgaXMgcHVibGljIGFuZCBtYXkgYmUgcmVwbGFjZWQgd2l0aCBhIG51bGxpc2ggdmFsdWUgYnkgdXNlciBjb2RlO1xuLy8gYGNsZWFyKClgIGhhcyBhbHdheXMgdG9sZXJhdGVkIHRoYXQuIFRyZWF0IGl0IGFzIGFuIGVtcHR5IHN0YWNrIHJhdGhlciB0aGFuXG4vLyBkZXJlZmVyZW5jaW5nIGl0LlxuZnVuY3Rpb24gY291bnRIYW5kbGVycyhoYW5kbGVycykge1xuICByZXR1cm4gaGFuZGxlcnMgPyBoYW5kbGVycy5sZW5ndGggOiAwO1xufVxuXG5mdW5jdGlvbiB0cmltSGFuZGxlcnMoaGFuZGxlcnMpIHtcbiAgaWYgKCFoYW5kbGVycykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHdoaWxlIChoYW5kbGVycy5sZW5ndGggJiYgaGFuZGxlcnNbaGFuZGxlcnMubGVuZ3RoIC0gMV0gPT09IG51bGwpIHtcbiAgICBoYW5kbGVycy5wb3AoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzeW5jSGFuZGxlckVudHJpZXMobWFuYWdlciwgaW50ZXJuYWxzKSB7XG4gIGNvbnN0IGhhbmRsZXJzID0gbWFuYWdlci5oYW5kbGVycztcbiAgY29uc3QgbGVuZ3RoID0gY291bnRIYW5kbGVycyhoYW5kbGVycyk7XG5cbiAgaWYgKGhhbmRsZXJzICE9PSBpbnRlcm5hbHMuaGFuZGxlcnNSZWYpIHtcbiAgICBpbnRlcm5hbHMuaGFuZGxlcnNSZWYgPSBoYW5kbGVycztcbiAgICBpbnRlcm5hbHMuaGFuZGxlckVudHJpZXMuY2xlYXIoKTtcbiAgfSBlbHNlIGlmIChsZW5ndGggIT09IGludGVybmFscy5oYW5kbGVyc0xlbmd0aCkge1xuICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICBpbnRlcm5hbHMuaGFuZGxlckVudHJpZXMuY2xlYXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW50ZXJuYWxzLmhhbmRsZXJFbnRyaWVzLmZvckVhY2goZnVuY3Rpb24gcmVtb3ZlU3RhbGVFbnRyeShlbnRyeSwgaWQpIHtcbiAgICAgICAgaWYgKGhhbmRsZXJzW2VudHJ5LmluZGV4XSAhPT0gZW50cnkuaGFuZGxlcikge1xuICAgICAgICAgIGludGVybmFscy5oYW5kbGVyRW50cmllcy5kZWxldGUoaWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpbnRlcm5hbHMuaGFuZGxlcnNMZW5ndGggPSBsZW5ndGg7XG59XG5cbmNsYXNzIEludGVyY2VwdG9yTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICB0aGlzWyRpbnRlcm5hbHNdID0ge1xuICAgICAgaGFuZGxlcnNSZWY6IHRoaXMuaGFuZGxlcnMsXG4gICAgICBoYW5kbGVyc0xlbmd0aDogdGhpcy5oYW5kbGVycy5sZW5ndGgsXG4gICAgICBoYW5kbGVyRW50cmllczogbmV3IE1hcCgpLFxuICAgICAgaXRlcmF0aW9uRGVwdGg6IDAsXG4gICAgICBuZXh0SWQ6IDAsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIG9wdGlvbnMgZm9yIHRoZSBpbnRlcmNlcHRvciwgc3luY2hyb25vdXMgYW5kIHJ1bldoZW5cbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICAgKi9cbiAgdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBoYW5kbGVyID0ge1xuICAgICAgZnVsZmlsbGVkLFxuICAgICAgcmVqZWN0ZWQsXG4gICAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsLFxuICAgIH07XG4gICAgY29uc3QgaW50ZXJuYWxzID0gdGhpc1skaW50ZXJuYWxzXTtcblxuICAgIGlmICh0aGlzLmhhbmRsZXJzID09IG51bGwpIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICB9XG5cbiAgICBzeW5jSGFuZGxlckVudHJpZXModGhpcywgaW50ZXJuYWxzKTtcblxuICAgIGNvbnN0IGlkID0gaW50ZXJuYWxzLm5leHRJZCsrO1xuXG4gICAgdGhpcy5oYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuICAgIGludGVybmFscy5oYW5kbGVyRW50cmllcy5zZXQoaWQsIHtcbiAgICAgIGhhbmRsZXIsXG4gICAgICBpbmRleDogdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxLFxuICAgIH0pO1xuICAgIGludGVybmFscy5oYW5kbGVyc0xlbmd0aCA9IHRoaXMuaGFuZGxlcnMubGVuZ3RoO1xuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZWplY3QoaWQpIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPSB0aGlzWyRpbnRlcm5hbHNdO1xuXG4gICAgc3luY0hhbmRsZXJFbnRyaWVzKHRoaXMsIGludGVybmFscyk7XG5cbiAgICBjb25zdCBlbnRyeSA9IGludGVybmFscy5oYW5kbGVyRW50cmllcy5nZXQoaWQpO1xuXG4gICAgaWYgKGVudHJ5KSB7XG4gICAgICBpbnRlcm5hbHMuaGFuZGxlckVudHJpZXMuZGVsZXRlKGlkKTtcblxuICAgICAgLy8gSWdub3JlIElEcyBpbnZhbGlkYXRlZCBieSBjbGVhciBvciBkaXJlY3QgcmVwbGFjZW1lbnQgb2YgaGFuZGxlcnMuXG4gICAgICBpZiAodGhpcy5oYW5kbGVyc1tlbnRyeS5pbmRleF0gIT09IGVudHJ5LmhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmhhbmRsZXJzW2VudHJ5LmluZGV4XSA9IG51bGw7XG5cbiAgICAgIC8vIERvIG5vdCByZXVzZSBhbiBpbmRleCB3aGlsZSBmb3JFYWNoIGlzIHdhbGtpbmcgaXRzIGxlbmd0aCBzbmFwc2hvdC5cbiAgICAgIGlmICghaW50ZXJuYWxzLml0ZXJhdGlvbkRlcHRoKSB7XG4gICAgICAgIHRyaW1IYW5kbGVycyh0aGlzLmhhbmRsZXJzKTtcbiAgICAgICAgaW50ZXJuYWxzLmhhbmRsZXJzTGVuZ3RoID0gdGhpcy5oYW5kbGVycy5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBpbnRlcmNlcHRvcnMgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycykge1xuICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgICAgc3luY0hhbmRsZXJFbnRyaWVzKHRoaXMsIHRoaXNbJGludGVybmFsc10pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICAgKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmb3JFYWNoKGZuKSB7XG4gICAgY29uc3QgaW50ZXJuYWxzID0gdGhpc1skaW50ZXJuYWxzXTtcblxuICAgIHN5bmNIYW5kbGVyRW50cmllcyh0aGlzLCBpbnRlcm5hbHMpO1xuXG4gICAgaW50ZXJuYWxzLml0ZXJhdGlvbkRlcHRoKys7XG5cbiAgICB0cnkge1xuICAgICAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICAgICAgZm4oaCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoIS0taW50ZXJuYWxzLml0ZXJhdGlvbkRlcHRoKSB7XG4gICAgICAgIHN5bmNIYW5kbGVyRW50cmllcyh0aGlzLCBpbnRlcm5hbHMpO1xuICAgICAgICB0cmltSGFuZGxlcnModGhpcy5oYW5kbGVycyk7XG4gICAgICAgIGludGVybmFscy5oYW5kbGVyc0xlbmd0aCA9IGNvdW50SGFuZGxlcnModGhpcy5oYW5kbGVycyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zRXJyb3IsIHsgUkVEQUNURUQgfSBmcm9tICcuL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IGlzQWJzb2x1dGVVUkwgZnJvbSAnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMLmpzJztcbmltcG9ydCBjb21iaW5lVVJMcyBmcm9tICcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzJztcbmltcG9ydCBub3JtYWxpemVVUkxGb3JQcm90b2NvbENoZWNrIGZyb20gJy4uL2hlbHBlcnMvbm9ybWFsaXplVVJMRm9yUHJvdG9jb2xDaGVjay5qcyc7XG5cbmNvbnN0IG1hbGZvcm1lZEh0dHBQcm90b2NvbCA9IC9eaHR0cHM/Oig/IVxcL1xcLykvaTtcblxuLy8gUmVkYWN0IHRoZSBwYXJ0cyBvZiBhIFVSTCB0aGF0IGNhbiBjYXJyeSBzZWNyZXRzIGJlZm9yZSBpdCBpcyBlbWJlZGRlZCBpbiBhblxuLy8gZXJyb3IgbWVzc2FnZS4gQXhpb3NFcnJvci50b0pTT04oKSBzZXJpYWxpemVzIGBtZXNzYWdlYCB2ZXJiYXRpbSBhbmQgZXJyb3JzXG4vLyBhcmUgY29tbW9ubHkgbG9nZ2VkLCB3aGlsZSB0aGUgb3B0LWluIGBjb25maWcucmVkYWN0YCBtb2RlbCBvbmx5IGNsZWFuc1xuLy8gY29uZmlnIGtleXMg4oCUIGl0IGNhbm5vdCByZWFjaCB0aGUgbWVzc2FnZS4gUmVkYWN0IG9ubHkgdGhlIGdlbnVpbmVseVxuLy8gc2Vuc2l0aXZlIHN1YnN0cmluZ3Mg4oCUIHVzZXJpbmZvIChjcmVkZW50aWFscyksIHF1ZXJ5IHBhcmFtZXRlciB2YWx1ZXMgYW5kXG4vLyBmcmFnbWVudCBjb250ZW50cyDigJQgd2l0aCB0aGUgc2FtZSBSRURBQ1RFRCBtYXJrZXIgdGhlIGNvbmZpZyByZWRhY3Rpb24gdXNlcyxcbi8vIHdoaWxlIGtlZXBpbmcgdGhlIHNjaGVtZSwgaG9zdCwgcGF0aCBhbmQgcGFyYW1ldGVyIG5hbWVzIHNvIHRoZSBvZmZlbmRpbmdcbi8vIHJlcXVlc3Qgc3RheXMgYWNjdXJhdGVseSBpZGVudGlmaWFibGUuXG5mdW5jdGlvbiByZWRhY3RGcmFnbWVudChmcmFnbWVudCkge1xuICBpZiAoIWZyYWdtZW50KSB7XG4gICAgcmV0dXJuIGZyYWdtZW50O1xuICB9XG5cbiAgcmV0dXJuIGZyYWdtZW50LnJlcGxhY2UoLyhefCYpKFtePSZdKj0pP1teJl0rL2csIChtYXRjaCwgc2VwYXJhdG9yLCBwYXJhbWV0ZXJOYW1lID0gJycpID0+IHtcbiAgICByZXR1cm4gYCR7c2VwYXJhdG9yfSR7cGFyYW1ldGVyTmFtZX0ke1JFREFDVEVEfWA7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWRhY3RTZW5zaXRpdmVVUkxQYXJ0cyh1cmwpIHtcbiAgY29uc3QgcmVkYWN0ZWRVUkwgPSB1cmwucmVwbGFjZSgvXihodHRwcz86XFwvezAsMn0pW14vPyNdKkAvaSwgYCQxJHtSRURBQ1RFRH1AYCk7XG4gIGNvbnN0IGZyYWdtZW50SW5kZXggPSByZWRhY3RlZFVSTC5pbmRleE9mKCcjJyk7XG4gIGNvbnN0IHVybFdpdGhvdXRGcmFnbWVudCA9XG4gICAgZnJhZ21lbnRJbmRleCA9PT0gLTEgPyByZWRhY3RlZFVSTCA6IHJlZGFjdGVkVVJMLnNsaWNlKDAsIGZyYWdtZW50SW5kZXgpO1xuICBjb25zdCByZWRhY3RlZFVSTFdpdGhvdXRGcmFnbWVudCA9IHVybFdpdGhvdXRGcmFnbWVudC5yZXBsYWNlKFxuICAgIC8oWz8mXVtePSYjXSo9KVteJiNdKi9nLFxuICAgIGAkMSR7UkVEQUNURUR9YFxuICApO1xuXG4gIGlmIChmcmFnbWVudEluZGV4ID09PSAtMSkge1xuICAgIHJldHVybiByZWRhY3RlZFVSTFdpdGhvdXRGcmFnbWVudDtcbiAgfVxuXG4gIHJldHVybiBgJHtyZWRhY3RlZFVSTFdpdGhvdXRGcmFnbWVudH0jJHtyZWRhY3RGcmFnbWVudChyZWRhY3RlZFVSTC5zbGljZShmcmFnbWVudEluZGV4ICsgMSkpfWA7XG59XG5cbmZ1bmN0aW9uIGFzc2VydFZhbGlkSHR0cFByb3RvY29sVVJMKHVybCwgY29uZmlnKSB7XG4gIGlmICh0eXBlb2YgdXJsID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRVUkwgPSBub3JtYWxpemVVUkxGb3JQcm90b2NvbENoZWNrKHVybCk7XG4gICAgaWYgKG1hbGZvcm1lZEh0dHBQcm90b2NvbC50ZXN0KG5vcm1hbGl6ZWRVUkwpKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgYEludmFsaWQgVVJMICR7SlNPTi5zdHJpbmdpZnkocmVkYWN0U2Vuc2l0aXZlVVJMUGFydHMobm9ybWFsaXplZFVSTCkpfTogbWlzc2luZyBcIi8vXCIgYWZ0ZXIgcHJvdG9jb2xgLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9JTlZBTElEX1VSTCxcbiAgICAgICAgY29uZmlnXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgYmFzZVVSTCB3aXRoIHRoZSByZXF1ZXN0ZWRVUkwsXG4gKiBvbmx5IHdoZW4gdGhlIHJlcXVlc3RlZFVSTCBpcyBub3QgYWxyZWFkeSBhbiBhYnNvbHV0ZSBVUkwuXG4gKiBJZiB0aGUgcmVxdWVzdFVSTCBpcyBhYnNvbHV0ZSwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXF1ZXN0ZWRVUkwgdW50b3VjaGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZFVSTCBBYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgdG8gY29tYmluZVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwsIGFsbG93QWJzb2x1dGVVcmxzLCBjb25maWcpIHtcbiAgYXNzZXJ0VmFsaWRIdHRwUHJvdG9jb2xVUkwocmVxdWVzdGVkVVJMLCBjb25maWcpO1xuICBsZXQgaXNSZWxhdGl2ZVVybCA9ICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCk7XG4gIGlmIChiYXNlVVJMICYmIChpc1JlbGF0aXZlVXJsIHx8IGFsbG93QWJzb2x1dGVVcmxzID09PSBmYWxzZSkpIHtcbiAgICBhc3NlcnRWYWxpZEh0dHBQcm90b2NvbFVSTChiYXNlVVJMLCBjb25maWcpO1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB0cmFuc2Zvcm1EYXRhIGZyb20gJy4vdHJhbnNmb3JtRGF0YS5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi4vY2FuY2VsL2lzQ2FuY2VsLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCBhZGFwdGVycyBmcm9tICcuLi9hZGFwdGVycy9hZGFwdGVycy5qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5zaWduYWwgJiYgY29uZmlnLnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChfY29uZmlnKSB7XG4gIC8vIEludGVyY2VwdG9ycyBtYXkgcmVwbGFjZSB0aGUgbWVyZ2VkIGNvbmZpZyB3aXRoIGFuIG9yZGluYXJ5IG9iamVjdC4gRmxhdHRlblxuICAvLyBpdCBhdCB0aGUgZGlzcGF0Y2ggYm91bmRhcnkgc28gc2hhcmVkIHByb3RvdHlwZSBtZW1iZXJzIGNhbm5vdCBiZWNvbWVcbiAgLy8gcmVxdWVzdCBiZWhhdmlvciwgd2hpbGUgcHJlc2VydmluZyBpbnRlbnRpb25hbCB0ZW1wbGF0ZS9jbGFzcyBtZW1iZXJzLlxuICBjb25zdCBjb25maWcgPSB1dGlscy50b1NhZmVGbGF0T2JqZWN0KF9jb25maWcpO1xuXG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICBjb25maWcuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHV0aWxzLmdldFNhZmVQcm9wKGNvbmZpZywgJ2hlYWRlcnMnKSk7XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChjb25maWcsIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0KTtcblxuICBpZiAoWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLmluZGV4T2YoY29uZmlnLm1ldGhvZCkgIT09IC0xKSB7XG4gICAgY29uZmlnLmhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsIGZhbHNlKTtcbiAgfVxuXG4gIGNvbnN0IGFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyKGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXIsIGNvbmZpZyk7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKFxuICAgIGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gRXhwb3NlIHRoZSBjdXJyZW50IHJlc3BvbnNlIG9uIGNvbmZpZyBzbyB0aGF0IHRyYW5zZm9ybVJlc3BvbnNlIGNhblxuICAgICAgLy8gYXR0YWNoIGl0IHRvIGFueSBBeGlvc0Vycm9yIGl0IHRocm93cyAoZS5nLiBvbiBKU09OIHBhcnNlIGZhaWx1cmUpLlxuICAgICAgLy8gV2UgY2xlYW4gaXQgdXAgYWZ0ZXJ3YXJkcyB0byBhdm9pZCBwb2xsdXRpbmcgdGhlIGNvbmZpZyBvYmplY3QuXG4gICAgICBjb25maWcucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoY29uZmlnLCBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsIHJlc3BvbnNlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGRlbGV0ZSBjb25maWcucmVzcG9uc2U7XG4gICAgICB9XG5cbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShyZXNwb25zZS5oZWFkZXJzKTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0sXG4gICAgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICAgIGNvbmZpZy5yZXNwb25zZSA9IHJlYXNvbi5yZXNwb25zZTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgICAgICAgICByZWFzb24ucmVzcG9uc2VcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGRlbGV0ZSBjb25maWcucmVzcG9uc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20ocmVhc29uLnJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICAgIH1cbiAgKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi9BeGlvc0hlYWRlcnMuanMnO1xuXG5jb25zdCBoZWFkZXJzVG9PYmplY3QgPSAodGhpbmcpID0+ICh0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyA/IHsgLi4udGhpbmcgfSA6IHRoaW5nKTtcblxuY29uc3Qgb3duRW51bWVyYWJsZUtleXMgPSAodGhpbmcpID0+IHtcbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcikge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGluZykuY29uY2F0KFxuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0aGluZykuZmlsdGVyKFxuICAgICAgICAoc3ltYm9sKSA9PiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaW5nLCBzeW1ib2wpLmVudW1lcmFibGVcbiAgICAgIClcbiAgICApO1xuICB9XG4gIHJldHVybiBPYmplY3Qua2V5cyh0aGluZyk7XG59O1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzEgPSBjb25maWcxIHx8IHt9O1xuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcblxuICAvLyBVc2UgYSBudWxsLXByb3RvdHlwZSBvYmplY3Qgc28gdGhhdCBkb3duc3RyZWFtIHJlYWRzIHN1Y2ggYXMgYGNvbmZpZy5hdXRoYFxuICAvLyBvciBgY29uZmlnLmJhc2VVUkxgIGNhbm5vdCBpbmhlcml0IHBvbGx1dGVkIHZhbHVlcyBmcm9tIE9iamVjdC5wcm90b3R5cGUuXG4gIC8vIGBoYXNPd25Qcm9wZXJ0eWAgaXMgcmVzdG9yZWQgYXMgYSBub24tZW51bWVyYWJsZSBvd24gc2xvdCB0byBwcmVzZXJ2ZVxuICAvLyBlcmdvbm9taWNzIGZvciB1c2VyIGNvZGUgdGhhdCByZWxpZXMgb24gaXQuXG4gIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25maWcsICdoYXNPd25Qcm9wZXJ0eScsIHtcbiAgICAvLyBOdWxsLXByb3RvIGRlc2NyaXB0b3Igc28gYSBwb2xsdXRlZCBPYmplY3QucHJvdG90eXBlLmdldCBjYW5ub3QgdHVyblxuICAgIC8vIHRoaXMgZGF0YSBkZXNjcmlwdG9yIGludG8gYW4gYWNjZXNzb3IgZGVzY3JpcHRvciBvbiB0aGUgd2F5IGluLlxuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICB2YWx1ZTogT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlLCBwcm9wLCBjYXNlbGVzcykge1xuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2UuY2FsbCh7IGNhc2VsZXNzIH0sIHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIHByb3AsIGNhc2VsZXNzKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIsIHByb3AsIGNhc2VsZXNzKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSwgcHJvcCwgY2FzZWxlc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFRyYW5zaXRpb25hbE9wdGlvbihwcm9wKSB7XG4gICAgY29uc3QgdHJhbnNpdGlvbmFsMiA9IHV0aWxzLmhhc093blByb3AoY29uZmlnMiwgJ3RyYW5zaXRpb25hbCcpXG4gICAgICA/IGNvbmZpZzIudHJhbnNpdGlvbmFsXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQodHJhbnNpdGlvbmFsMikpIHtcbiAgICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRyYW5zaXRpb25hbDIpKSB7XG4gICAgICAgIGlmICh1dGlscy5oYXNPd25Qcm9wKHRyYW5zaXRpb25hbDIsIHByb3ApKSB7XG4gICAgICAgICAgcmV0dXJuIHRyYW5zaXRpb25hbDJbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdHJhbnNpdGlvbmFsMSA9IHV0aWxzLmhhc093blByb3AoY29uZmlnMSwgJ3RyYW5zaXRpb25hbCcpXG4gICAgICA/IGNvbmZpZzEudHJhbnNpdGlvbmFsXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRyYW5zaXRpb25hbDEpICYmIHV0aWxzLmhhc093blByb3AodHJhbnNpdGlvbmFsMSwgcHJvcCkpIHtcbiAgICAgIHJldHVybiB0cmFuc2l0aW9uYWwxW3Byb3BdO1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gbWVyZ2VEaXJlY3RLZXlzKGEsIGIsIHByb3ApIHtcbiAgICBpZiAodXRpbHMuaGFzT3duUHJvcChjb25maWcyLCBwcm9wKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaGFzT3duUHJvcChjb25maWcxLCBwcm9wKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWVyZ2VNYXAgPSB7XG4gICAgdXJsOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIG1ldGhvZDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBkYXRhOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGJhc2VVUkw6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVxdWVzdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXNwb25zZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBwYXJhbXNTZXJpYWxpemVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dEVycm9yTWVzc2FnZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aFhTUkZUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBhZGFwdGVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlVHlwZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmQ29va2llTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmSGVhZGVyTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvblVwbG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uRG93bmxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBkZWNvbXByZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heENvbnRlbnRMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Qm9keUxlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBiZWZvcmVSZWRpcmVjdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc3BvcnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cEFnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBzQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgY2FuY2VsVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgc29ja2V0UGF0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBhbGxvd2VkU29ja2V0UGF0aHM6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VFbmNvZGluZzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB2YWxpZGF0ZVN0YXR1czogbWVyZ2VEaXJlY3RLZXlzLFxuICAgIGhlYWRlcnM6IChhLCBiLCBwcm9wKSA9PlxuICAgICAgbWVyZ2VEZWVwUHJvcGVydGllcyhoZWFkZXJzVG9PYmplY3QoYSksIGhlYWRlcnNUb09iamVjdChiKSwgcHJvcCwgdHJ1ZSksXG4gIH07XG5cbiAgdXRpbHMuZm9yRWFjaChvd25FbnVtZXJhYmxlS2V5cyh7IC4uLmNvbmZpZzEsIC4uLmNvbmZpZzIgfSksIGZ1bmN0aW9uIGNvbXB1dGVDb25maWdWYWx1ZShwcm9wKSB7XG4gICAgaWYgKHByb3AgPT09ICdfX3Byb3RvX18nIHx8IHByb3AgPT09ICdjb25zdHJ1Y3RvcicgfHwgcHJvcCA9PT0gJ3Byb3RvdHlwZScpIHJldHVybjtcbiAgICBjb25zdCBtZXJnZSA9IHV0aWxzLmhhc093blByb3AobWVyZ2VNYXAsIHByb3ApID8gbWVyZ2VNYXBbcHJvcF0gOiBtZXJnZURlZXBQcm9wZXJ0aWVzO1xuICAgIGNvbnN0IGEgPSB1dGlscy5oYXNPd25Qcm9wKGNvbmZpZzEsIHByb3ApID8gY29uZmlnMVtwcm9wXSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBiID0gdXRpbHMuaGFzT3duUHJvcChjb25maWcyLCBwcm9wKSA/IGNvbmZpZzJbcHJvcF0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgY29uZmlnVmFsdWUgPSBtZXJnZShhLCBiLCBwcm9wKTtcbiAgICAodXRpbHMuaXNVbmRlZmluZWQoY29uZmlnVmFsdWUpICYmIG1lcmdlICE9PSBtZXJnZURpcmVjdEtleXMpIHx8IChjb25maWdbcHJvcF0gPSBjb25maWdWYWx1ZSk7XG4gIH0pO1xuXG4gIGlmIChcbiAgICB1dGlscy5oYXNPd25Qcm9wKGNvbmZpZzIsICd2YWxpZGF0ZVN0YXR1cycpICYmXG4gICAgdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMi52YWxpZGF0ZVN0YXR1cykgJiZcbiAgICBnZXRNZXJnZWRUcmFuc2l0aW9uYWxPcHRpb24oJ3ZhbGlkYXRlU3RhdHVzVW5kZWZpbmVkUmVzb2x2ZXMnKSA9PT0gZmFsc2VcbiAgKSB7XG4gICAgaWYgKHV0aWxzLmhhc093blByb3AoY29uZmlnMSwgJ3ZhbGlkYXRlU3RhdHVzJykpIHtcbiAgICAgIGNvbmZpZy52YWxpZGF0ZVN0YXR1cyA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMS52YWxpZGF0ZVN0YXR1cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBjb25maWcudmFsaWRhdGVTdGF0dXM7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbWV0aG9kTGlzdCA9IE9iamVjdC5mcmVlemUoW1xuICAnZ2V0JyxcbiAgJ2RlbGV0ZScsXG4gICdoZWFkJyxcbiAgJ29wdGlvbnMnLFxuICAncG9zdCcsXG4gICdwdXQnLFxuICAncGF0Y2gnLFxuICAncHVyZ2UnLFxuICAnbGluaycsXG4gICd1bmxpbmsnLFxuICAncXVlcnknLFxuXSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1ldGhvZExpc3Q7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEZPUk1fREFUQV9DT05URU5UX0hFQURFUlMgPSBbJ2NvbnRlbnQtdHlwZScsICdjb250ZW50LWxlbmd0aCddO1xuXG4vKipcbiAqIEFwcGx5IHRoZSBoZWFkZXJzIGdlbmVyYXRlZCBieSBhIEZvcm1EYXRhIGltcGxlbWVudGF0aW9uIHRvIHRoZSByZXF1ZXN0IGhlYWRlcnMsXG4gKiBob25vcmluZyB0aGUgYGZvcm1EYXRhSGVhZGVyUG9saWN5YCBvcHRpb246IHdpdGggJ2NvbnRlbnQtb25seScsIGNvcHkgb25seSB0aGVcbiAqIGNvbnRlbnQtKiBoZWFkZXJzOyBvdGhlcndpc2UgbWVyZ2UgYWxsIG9mIHRoZW0uXG4gKlxuICogQHBhcmFtIHtBeGlvc0hlYWRlcnN9IGhlYWRlcnMgLSB0aGUgcmVxdWVzdCBoZWFkZXJzIHRvIG11dGF0ZVxuICogQHBhcmFtIHtPYmplY3QgfCBudWxsIHwgdW5kZWZpbmVkfSBmb3JtSGVhZGVycyAtIGhlYWRlcnMgcHJvZHVjZWQgYnkgdGhlIEZvcm1EYXRhIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0ge1N0cmluZ30gW3BvbGljeV0gLSB0aGUgcmVzb2x2ZWQgYGZvcm1EYXRhSGVhZGVyUG9saWN5YCBjb25maWcgdmFsdWVcbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0Rm9ybURhdGFIZWFkZXJzKGhlYWRlcnMsIGZvcm1IZWFkZXJzLCBwb2xpY3kpIHtcbiAgaWYgKHBvbGljeSAhPT0gJ2NvbnRlbnQtb25seScpIHtcbiAgICBoZWFkZXJzLnNldChmb3JtSGVhZGVycyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgT2JqZWN0LmVudHJpZXMoZm9ybUhlYWRlcnMgfHwge30pLmZvckVhY2goKFtrZXksIHZhbF0pID0+IHtcbiAgICBpZiAoRk9STV9EQVRBX0NPTlRFTlRfSEVBREVSUy5pbmNsdWRlcyhrZXkudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgIGhlYWRlcnMuc2V0KGtleSwgdmFsKTtcbiAgICB9XG4gIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuL0F4aW9zRXJyb3IuanMnO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSByZXNwb25zZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgY29uc3QgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLnN0YXR1cyA+PSA0MDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgNTAwID8gQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QgOiBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcGFyYW0gez9PYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZSBvYmplY3RcbiAqXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZm5zLCByZXNwb25zZSkge1xuICBjb25zdCBjb25maWcgPSB0aGlzIHx8IGRlZmF1bHRzO1xuICBjb25zdCBjb250ZXh0ID0gcmVzcG9uc2UgfHwgY29uZmlnO1xuICBjb25zdCBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oY29udGV4dC5oZWFkZXJzKTtcbiAgbGV0IGRhdGEgPSBjb250ZXh0LmRhdGE7XG5cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbi5jYWxsKGNvbmZpZywgZGF0YSwgaGVhZGVycy5ub3JtYWxpemUoKSwgcmVzcG9uc2UgPyByZXNwb25zZS5zdGF0dXMgOiB1bmRlZmluZWQpO1xuICB9KTtcblxuICBoZWFkZXJzLm5vcm1hbGl6ZSgpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IHRvVVJMRW5jb2RlZEZvcm0gZnJvbSAnLi4vaGVscGVycy90b1VSTEVuY29kZWRGb3JtLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5pbXBvcnQgbWV0aG9kTGlzdCBmcm9tICcuLi9jb3JlL21ldGhvZExpc3QuanMnO1xuXG5jb25zdCBvd24gPSAob2JqLCBrZXkpID0+IChvYmogIT0gbnVsbCAmJiB1dGlscy5oYXNPd25Qcm9wKG9iaiwga2V5KSA/IG9ialtrZXldIDogdW5kZWZpbmVkKTtcblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZywgdHJpZXMgdG8gcGFyc2UgaXQsIGFuZCBpZiBpdCBmYWlscywgaXQgcmV0dXJucyB0aGUgc3RyaW5naWZpZWQgdmVyc2lvblxuICogb2YgdGhlIGlucHV0XG4gKlxuICogQHBhcmFtIHthbnl9IHJhd1ZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHN0cmluZ2lmaWVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyc2VyIC0gQSBmdW5jdGlvbiB0aGF0IHBhcnNlcyBhIHN0cmluZyBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmNvZGVyIC0gQSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgdmFsdWUgYW5kIHJldHVybnMgYSBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gQSBzdHJpbmdpZmllZCB2ZXJzaW9uIG9mIHRoZSByYXdWYWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5naWZ5U2FmZWx5KHJhd1ZhbHVlLCBwYXJzZXIsIGVuY29kZXIpIHtcbiAgaWYgKHV0aWxzLmlzU3RyaW5nKHJhd1ZhbHVlKSkge1xuICAgIHRyeSB7XG4gICAgICAocGFyc2VyIHx8IEpTT04ucGFyc2UpKHJhd1ZhbHVlKTtcbiAgICAgIHJldHVybiB1dGlscy50cmltKHJhd1ZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZS5uYW1lICE9PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChlbmNvZGVyIHx8IEpTT04uc3RyaW5naWZ5KShyYXdWYWx1ZSk7XG59XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICB0cmFuc2l0aW9uYWw6IHRyYW5zaXRpb25hbERlZmF1bHRzLFxuXG4gIGFkYXB0ZXI6IFsneGhyJywgJ2h0dHAnLCAnZmV0Y2gnXSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbXG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgICBjb25zdCBjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSB8fCAnJztcbiAgICAgIGNvbnN0IGhhc0pTT05Db250ZW50VHlwZSA9IGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL2pzb24nKSA+IC0xO1xuICAgICAgY29uc3QgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMuaXNPYmplY3QoZGF0YSk7XG5cbiAgICAgIGlmIChpc09iamVjdFBheWxvYWQgJiYgdXRpbHMuaXNIVE1MRm9ybShkYXRhKSkge1xuICAgICAgICBkYXRhID0gbmV3IEZvcm1EYXRhKGRhdGEpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpc0Zvcm1EYXRhID0gdXRpbHMuaXNGb3JtRGF0YShkYXRhKTtcblxuICAgICAgaWYgKGlzRm9ybURhdGEpIHtcbiAgICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpIHx8XG4gICAgICAgIHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cbiAgICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgICB9XG4gICAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLCBmYWxzZSk7XG4gICAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBpc0ZpbGVMaXN0O1xuXG4gICAgICBpZiAoaXNPYmplY3RQYXlsb2FkKSB7XG4gICAgICAgIGNvbnN0IGZvcm1TZXJpYWxpemVyID0gb3duKHRoaXMsICdmb3JtU2VyaWFsaXplcicpO1xuICAgICAgICBpZiAoY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgPiAtMSkge1xuICAgICAgICAgIHJldHVybiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIGZvcm1TZXJpYWxpemVyKS50b1N0cmluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIChpc0ZpbGVMaXN0ID0gdXRpbHMuaXNGaWxlTGlzdChkYXRhKSkgfHxcbiAgICAgICAgICBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBlbnYgPSBvd24odGhpcywgJ2VudicpO1xuICAgICAgICAgIGNvbnN0IF9Gb3JtRGF0YSA9IGVudiAmJiBlbnYuRm9ybURhdGE7XG5cbiAgICAgICAgICByZXR1cm4gdG9Gb3JtRGF0YShcbiAgICAgICAgICAgIGlzRmlsZUxpc3QgPyB7ICdmaWxlc1tdJzogZGF0YSB9IDogZGF0YSxcbiAgICAgICAgICAgIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCksXG4gICAgICAgICAgICBmb3JtU2VyaWFsaXplclxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGlzT2JqZWN0UGF5bG9hZCB8fCBoYXNKU09OQ29udGVudFR5cGUpIHtcbiAgICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHN0cmluZ2lmeVNhZmVseShkYXRhKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSxcbiAgXSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW1xuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IG93bih0aGlzLCAndHJhbnNpdGlvbmFsJykgfHwgZGVmYXVsdHMudHJhbnNpdGlvbmFsO1xuICAgICAgY29uc3QgZm9yY2VkSlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLmZvcmNlZEpTT05QYXJzaW5nO1xuICAgICAgY29uc3QgcmVzcG9uc2VUeXBlID0gb3duKHRoaXMsICdyZXNwb25zZVR5cGUnKTtcbiAgICAgIGNvbnN0IEpTT05SZXF1ZXN0ZWQgPSByZXNwb25zZVR5cGUgPT09ICdqc29uJztcblxuICAgICAgaWYgKHV0aWxzLmlzUmVzcG9uc2UoZGF0YSkgfHwgdXRpbHMuaXNSZWFkYWJsZVN0cmVhbShkYXRhKSkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBkYXRhICYmXG4gICAgICAgIHV0aWxzLmlzU3RyaW5nKGRhdGEpICYmXG4gICAgICAgICgoZm9yY2VkSlNPTlBhcnNpbmcgJiYgIXJlc3BvbnNlVHlwZSkgfHwgSlNPTlJlcXVlc3RlZClcbiAgICAgICkge1xuICAgICAgICBjb25zdCBzaWxlbnRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuc2lsZW50SlNPTlBhcnNpbmc7XG4gICAgICAgIGNvbnN0IHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIEpTT05SZXF1ZXN0ZWQ7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhLCBvd24odGhpcywgJ3BhcnNlUmV2aXZlcicpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmIChzdHJpY3RKU09OUGFyc2luZykge1xuICAgICAgICAgICAgaWYgKGUubmFtZSA9PT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICAgICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCB0aGlzLCBudWxsLCBvd24odGhpcywgJ3Jlc3BvbnNlJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSxcbiAgXSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXG4gICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iLFxuICB9LFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH0sXG5cbiAgaGVhZGVyczoge1xuICAgIGNvbW1vbjoge1xuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICdDb250ZW50LVR5cGUnOiB1bmRlZmluZWQsXG4gICAgfSxcbiAgfSxcbn07XG5cbnV0aWxzLmZvckVhY2gobWV0aG9kTGlzdCwgKG1ldGhvZCkgPT4ge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzaWxlbnRKU09OUGFyc2luZzogdHJ1ZSxcbiAgZm9yY2VkSlNPTlBhcnNpbmc6IHRydWUsXG4gIGNsYXJpZnlUaW1lb3V0RXJyb3I6IGZhbHNlLFxuICBsZWdhY3lJbnRlcmNlcHRvclJlcVJlc09yZGVyaW5nOiB0cnVlLFxuICBhZHZlcnRpc2Vac3RkQWNjZXB0RW5jb2Rpbmc6IGZhbHNlLFxuICB2YWxpZGF0ZVN0YXR1c1VuZGVmaW5lZFJlc29sdmVzOiB0cnVlLFxufTtcbiIsImV4cG9ydCBjb25zdCBWRVJTSU9OID0gXCIxLjIwLjBcIjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5cbi8qKlxuICogSXQgZW5jb2RlcyBhIHN0cmluZyBieSByZXBsYWNpbmcgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IGluIHRoZSB1bnJlc2VydmVkIHNldCB3aXRoXG4gKiB0aGVpciBwZXJjZW50LWVuY29kZWQgZXF1aXZhbGVudHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBlbmNvZGUuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlbmNvZGUoc3RyKSB7XG4gIGNvbnN0IGNoYXJNYXAgPSB7XG4gICAgJyEnOiAnJTIxJyxcbiAgICBcIidcIjogJyUyNycsXG4gICAgJygnOiAnJTI4JyxcbiAgICAnKSc6ICclMjknLFxuICAgICd+JzogJyU3RScsXG4gICAgJyUyMCc6ICcrJyxcbiAgfTtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpfl18JTIwL2csIGZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoKSB7XG4gICAgcmV0dXJuIGNoYXJNYXBbbWF0Y2hdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhcmFtcyBvYmplY3QgYW5kIGNvbnZlcnRzIGl0IHRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyB0byBiZSBjb252ZXJ0ZWQgdG8gYSBGb3JtRGF0YSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgcGFzc2VkIHRvIHRoZSBBeGlvcyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKSB7XG4gIHRoaXMuX3BhaXJzID0gW107XG5cbiAgcGFyYW1zICYmIHRvRm9ybURhdGEocGFyYW1zLCB0aGlzLCBvcHRpb25zKTtcbn1cblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xuXG5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX3BhaXJzLnB1c2goW25hbWUsIHZhbHVlXSk7XG59O1xuXG5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhlbmNvZGVyKSB7XG4gIGNvbnN0IF9lbmNvZGUgPSBlbmNvZGVyXG4gICAgPyAodmFsdWUpID0+IGVuY29kZXIuY2FsbCh0aGlzLCB2YWx1ZSwgZW5jb2RlKVxuICAgIDogZW5jb2RlO1xuXG4gIHJldHVybiB0aGlzLl9wYWlyc1xuICAgIC5tYXAoZnVuY3Rpb24gZWFjaChwYWlyKSB7XG4gICAgICByZXR1cm4gX2VuY29kZShwYWlyWzBdKSArICc9JyArIF9lbmNvZGUocGFpclsxXSk7XG4gICAgfSwgJycpXG4gICAgLmpvaW4oJyYnKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zVVJMU2VhcmNoUGFyYW1zO1xuIiwiY29uc3QgSHR0cFN0YXR1c0NvZGUgPSB7XG4gIENvbnRpbnVlOiAxMDAsXG4gIFN3aXRjaGluZ1Byb3RvY29sczogMTAxLFxuICBQcm9jZXNzaW5nOiAxMDIsXG4gIEVhcmx5SGludHM6IDEwMyxcbiAgT2s6IDIwMCxcbiAgQ3JlYXRlZDogMjAxLFxuICBBY2NlcHRlZDogMjAyLFxuICBOb25BdXRob3JpdGF0aXZlSW5mb3JtYXRpb246IDIwMyxcbiAgTm9Db250ZW50OiAyMDQsXG4gIFJlc2V0Q29udGVudDogMjA1LFxuICBQYXJ0aWFsQ29udGVudDogMjA2LFxuICBNdWx0aVN0YXR1czogMjA3LFxuICBBbHJlYWR5UmVwb3J0ZWQ6IDIwOCxcbiAgSW1Vc2VkOiAyMjYsXG4gIE11bHRpcGxlQ2hvaWNlczogMzAwLFxuICBNb3ZlZFBlcm1hbmVudGx5OiAzMDEsXG4gIEZvdW5kOiAzMDIsXG4gIFNlZU90aGVyOiAzMDMsXG4gIE5vdE1vZGlmaWVkOiAzMDQsXG4gIFVzZVByb3h5OiAzMDUsXG4gIFVudXNlZDogMzA2LFxuICBUZW1wb3JhcnlSZWRpcmVjdDogMzA3LFxuICBQZXJtYW5lbnRSZWRpcmVjdDogMzA4LFxuICBCYWRSZXF1ZXN0OiA0MDAsXG4gIFVuYXV0aG9yaXplZDogNDAxLFxuICBQYXltZW50UmVxdWlyZWQ6IDQwMixcbiAgRm9yYmlkZGVuOiA0MDMsXG4gIE5vdEZvdW5kOiA0MDQsXG4gIE1ldGhvZE5vdEFsbG93ZWQ6IDQwNSxcbiAgTm90QWNjZXB0YWJsZTogNDA2LFxuICBQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDQwNyxcbiAgUmVxdWVzdFRpbWVvdXQ6IDQwOCxcbiAgQ29uZmxpY3Q6IDQwOSxcbiAgR29uZTogNDEwLFxuICBMZW5ndGhSZXF1aXJlZDogNDExLFxuICBQcmVjb25kaXRpb25GYWlsZWQ6IDQxMixcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBgQ29udGVudFRvb0xhcmdlYCBpbnN0ZWFkLlxuICAgKi9cbiAgUGF5bG9hZFRvb0xhcmdlOiA0MTMsXG4gIENvbnRlbnRUb29MYXJnZTogNDEzLFxuICBVcmlUb29Mb25nOiA0MTQsXG4gIFVuc3VwcG9ydGVkTWVkaWFUeXBlOiA0MTUsXG4gIFJhbmdlTm90U2F0aXNmaWFibGU6IDQxNixcbiAgRXhwZWN0YXRpb25GYWlsZWQ6IDQxNyxcbiAgSW1BVGVhcG90OiA0MTgsXG4gIE1pc2RpcmVjdGVkUmVxdWVzdDogNDIxLFxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBVbnByb2Nlc3NhYmxlQ29udGVudGAgaW5zdGVhZC5cbiAgICovXG4gIFVucHJvY2Vzc2FibGVFbnRpdHk6IDQyMixcbiAgVW5wcm9jZXNzYWJsZUNvbnRlbnQ6IDQyMixcbiAgTG9ja2VkOiA0MjMsXG4gIEZhaWxlZERlcGVuZGVuY3k6IDQyNCxcbiAgVG9vRWFybHk6IDQyNSxcbiAgVXBncmFkZVJlcXVpcmVkOiA0MjYsXG4gIFByZWNvbmRpdGlvblJlcXVpcmVkOiA0MjgsXG4gIFRvb01hbnlSZXF1ZXN0czogNDI5LFxuICBSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2U6IDQzMSxcbiAgVW5hdmFpbGFibGVGb3JMZWdhbFJlYXNvbnM6IDQ1MSxcbiAgSW50ZXJuYWxTZXJ2ZXJFcnJvcjogNTAwLFxuICBOb3RJbXBsZW1lbnRlZDogNTAxLFxuICBCYWRHYXRld2F5OiA1MDIsXG4gIFNlcnZpY2VVbmF2YWlsYWJsZTogNTAzLFxuICBHYXRld2F5VGltZW91dDogNTA0LFxuICBIdHRwVmVyc2lvbk5vdFN1cHBvcnRlZDogNTA1LFxuICBWYXJpYW50QWxzb05lZ290aWF0ZXM6IDUwNixcbiAgSW5zdWZmaWNpZW50U3RvcmFnZTogNTA3LFxuICBMb29wRGV0ZWN0ZWQ6IDUwOCxcbiAgTm90RXh0ZW5kZWQ6IDUxMCxcbiAgTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDUxMSxcbiAgV2ViU2VydmVyUmV0dXJuc0FuVW5rbm93bkVycm9yOiA1MjAsXG4gIFdlYlNlcnZlcklzRG93bjogNTIxLFxuICBDb25uZWN0aW9uVGltZWRPdXQ6IDUyMixcbiAgT3JpZ2luSXNVbnJlYWNoYWJsZTogNTIzLFxuICBUaW1lb3V0T2NjdXJyZWQ6IDUyNCxcbiAgU3NsSGFuZHNoYWtlRmFpbGVkOiA1MjUsXG4gIEludmFsaWRTc2xDZXJ0aWZpY2F0ZTogNTI2LFxufTtcblxuT2JqZWN0LmVudHJpZXMoSHR0cFN0YXR1c0NvZGUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICBpZiAoSHR0cFN0YXR1c0NvZGVbdmFsdWVdID09PSB1bmRlZmluZWQpIHtcbiAgICBIdHRwU3RhdHVzQ29kZVt2YWx1ZV0gPSBrZXk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBIdHRwU3RhdHVzQ29kZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGUgYSBib3VuZCB2ZXJzaW9uIG9mIGEgZnVuY3Rpb24gd2l0aCBhIHNwZWNpZmllZCBgdGhpc2AgY29udGV4dFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGJpbmRcbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyAtIFRoZSB2YWx1ZSB0byBiZSBwYXNzZWQgYXMgdGhlIGB0aGlzYCBwYXJhbWV0ZXJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCB3aWxsIGNhbGwgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHNwZWNpZmllZCBgdGhpc2AgY29udGV4dFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4vQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xuXG4vKipcbiAqIEl0IHJlcGxhY2VzIFVSTC1lbmNvZGVkIGZvcm1zIG9mIGA6YCwgYCRgLCBgLGAsIGFuZCBzcGFjZXMgd2l0aFxuICogdGhlaXIgcGxhaW4gY291bnRlcnBhcnRzIChgOmAsIGAkYCwgYCxgLCBgK2ApLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWwgVGhlIHZhbHVlIHRvIGJlIGVuY29kZWQuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgdmFsdWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKVxuICAgIC5yZXBsYWNlKC8lM0EvZ2ksICc6JylcbiAgICAucmVwbGFjZSgvJTI0L2csICckJylcbiAgICAucmVwbGFjZSgvJTJDL2dpLCAnLCcpXG4gICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEBwYXJhbSB7PyhvYmplY3R8RnVuY3Rpb24pfSBvcHRpb25zXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIG9wdGlvbnMpIHtcbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IHVybCB8fCAnJztcblxuICBjb25zdCBfb3B0aW9ucyA9IHV0aWxzLmlzRnVuY3Rpb24ob3B0aW9ucylcbiAgICA/IHtcbiAgICAgICAgc2VyaWFsaXplOiBvcHRpb25zLFxuICAgICAgfVxuICAgIDogb3B0aW9ucztcblxuICAvLyBSZWFkIHNlcmlhbGl6ZXIgb3B0aW9ucyBwb2xsdXRpb24tc2FmZWx5OiBvd24gcHJvcGVydGllcyBhbmQgbWV0aG9kcyBvbiBhXG4gIC8vIGNsYXNzL3RlbXBsYXRlIHByb3RvdHlwZSBhcmUgaG9ub3JlZCwgYnV0IHZhbHVlcyBpbmplY3RlZCBvbnRvIGEgcG9sbHV0ZWRcbiAgLy8gT2JqZWN0LnByb3RvdHlwZSBhcmUgaWdub3JlZC5cbiAgY29uc3QgX2VuY29kZSA9IHV0aWxzLmdldFNhZmVQcm9wKF9vcHRpb25zLCAnZW5jb2RlJykgfHwgZW5jb2RlO1xuICBjb25zdCBzZXJpYWxpemVGbiA9IHV0aWxzLmdldFNhZmVQcm9wKF9vcHRpb25zLCAnc2VyaWFsaXplJyk7XG5cbiAgbGV0IHNlcmlhbGl6ZWRQYXJhbXM7XG5cbiAgaWYgKHNlcmlhbGl6ZUZuKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHNlcmlhbGl6ZUZuKHBhcmFtcywgX29wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSB1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpXG4gICAgICA/IHBhcmFtcy50b1N0cmluZygpXG4gICAgICA6IG5ldyBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIF9vcHRpb25zKS50b1N0cmluZyhfZW5jb2RlKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgY29uc3QgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XG5cbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgaWYgKCFyZWxhdGl2ZVVSTCkge1xuICAgIHJldHVybiBiYXNlVVJMO1xuICB9XG5cbiAgbGV0IGVuZCA9IGJhc2VVUkwubGVuZ3RoO1xuXG4gIHdoaWxlIChlbmQgPiAwICYmIGJhc2VVUkwuY2hhckNvZGVBdChlbmQgLSAxKSA9PT0gNDcpIHtcbiAgICBlbmQtLTtcbiAgfVxuXG4gIHJldHVybiBiYXNlVVJMLnNsaWNlKDAsIGVuZCkgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKTtcbn1cbiIsImltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5jb25zdCBjb21wb3NlU2lnbmFscyA9IChzaWduYWxzLCB0aW1lb3V0KSA9PiB7XG4gIHNpZ25hbHMgPSBzaWduYWxzID8gc2lnbmFscy5maWx0ZXIoQm9vbGVhbikgOiBbXTtcblxuICBpZiAoIXRpbWVvdXQgJiYgIXNpZ25hbHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICBsZXQgYWJvcnRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0IG9uYWJvcnQgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgaWYgKCFhYm9ydGVkKSB7XG4gICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICBjb25zdCBlcnIgPSByZWFzb24gaW5zdGFuY2VvZiBFcnJvciA/IHJlYXNvbiA6IHRoaXMucmVhc29uO1xuICAgICAgY29udHJvbGxlci5hYm9ydChcbiAgICAgICAgZXJyIGluc3RhbmNlb2YgQXhpb3NFcnJvclxuICAgICAgICAgID8gZXJyXG4gICAgICAgICAgOiBuZXcgQ2FuY2VsZWRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogZXJyKVxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgbGV0IHRpbWVyID1cbiAgICB0aW1lb3V0ICYmXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgICBvbmFib3J0KG5ldyBBeGlvc0Vycm9yKGB0aW1lb3V0IG9mICR7dGltZW91dH1tcyBleGNlZWRlZGAsIEF4aW9zRXJyb3IuRVRJTUVET1VUKSk7XG4gICAgfSwgdGltZW91dCk7XG5cbiAgY29uc3QgdW5zdWJzY3JpYmUgPSAoKSA9PiB7XG4gICAgaWYgKCFzaWduYWxzKSB7IHJldHVybjsgfVxuICAgIHRpbWVyICYmIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgdGltZXIgPSBudWxsO1xuICAgIHNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiB7XG4gICAgICBzaWduYWwudW5zdWJzY3JpYmVcbiAgICAgICAgPyBzaWduYWwudW5zdWJzY3JpYmUob25hYm9ydClcbiAgICAgICAgOiBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KTtcbiAgICB9KTtcbiAgICBzaWduYWxzID0gbnVsbDtcbiAgfTtcblxuICBzaWduYWxzLmZvckVhY2goKHNpZ25hbCkgPT4ge1xuICAgIGlmIChhYm9ydGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHNpZ25hbC5hYm9ydGVkKSB7XG4gICAgICBvbmFib3J0LmNhbGwoc2lnbmFsKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0LCB7IG9uY2U6IHRydWUgfSk7XG4gIH0pO1xuXG4gIGNvbnN0IHsgc2lnbmFsIH0gPSBjb250cm9sbGVyO1xuXG4gIHNpZ25hbC51bnN1YnNjcmliZSA9ICgpID0+IHV0aWxzLmFzYXAodW5zdWJzY3JpYmUpO1xuXG4gIHJldHVybiBzaWduYWw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb21wb3NlU2lnbmFscztcbiIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnZcbiAgPyAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICB7XG4gICAgICB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUsIHNhbWVTaXRlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY29va2llID0gW2Ake25hbWV9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKX1gXTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICBjb29raWUucHVzaChgZXhwaXJlcz0ke25ldyBEYXRlKGV4cGlyZXMpLnRvVVRDU3RyaW5nKCl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goYHBhdGg9JHtwYXRofWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgY29va2llLnB1c2goYGRvbWFpbj0ke2RvbWFpbn1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhzYW1lU2l0ZSkpIHtcbiAgICAgICAgICBjb29raWUucHVzaChgU2FtZVNpdGU9JHtzYW1lU2l0ZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgfSxcblxuICAgICAgcmVhZChuYW1lKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gbnVsbDtcbiAgICAgICAgLy8gTWF0Y2ggbmFtZT12YWx1ZSBieSBzcGxpdHRpbmcgb24gdGhlIHNlbWljb2xvbiBzZXBhcmF0b3IgaW5zdGVhZCBvZiBidWlsZGluZyBhXG4gICAgICAgIC8vIFJlZ0V4cCBmcm9tIGBuYW1lYCDigJQgaW50ZXJwb2xhdGluZyBhbiB1bmVzY2FwZWQgc3RyaW5nIGludG8gYSBSZWdFeHAgd291bGQgbGV0XG4gICAgICAgIC8vIG1ldGFjaGFyYWN0ZXJzIChlLmcuIGAuKz9gIGluIGFuIGF0dGFja2VyLWluZmx1ZW5jZWQgY29va2llIG5hbWUpIGNhdXNlIFJlRG9TIG9yXG4gICAgICAgIC8vIG1hdGNoIHRoZSB3cm9uZyBjb29raWUuIEJyb3dzZXJzIG1heSBzZXJpYWxpemUgY29va2llIHBhaXJzIGFzIGVpdGhlciBcIjtcIiBvclxuICAgICAgICAvLyBcIjsgXCIsIHNvIGlnbm9yZSBvcHRpb25hbCB3aGl0ZXNwYWNlIGJlZm9yZSBlYWNoIGNvb2tpZSBuYW1lLlxuICAgICAgICBjb25zdCBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29va2llcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGNvb2tpZSA9IGNvb2tpZXNbaV0ucmVwbGFjZSgvXlxccysvLCAnJyk7XG4gICAgICAgICAgY29uc3QgZXEgPSBjb29raWUuaW5kZXhPZignPScpO1xuICAgICAgICAgIGlmIChlcSAhPT0gLTEgJiYgY29va2llLnNsaWNlKDAsIGVxKSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChjb29raWUuc2xpY2UoZXEgKyAxKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjb29raWUuc2xpY2UoZXEgKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDAsICcvJyk7XG4gICAgICB9LFxuICAgIH1cbiAgOiAvLyBOb24tc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAge1xuICAgICAgd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZSgpIHt9LFxuICAgIH07XG4iLCIvKipcbiAqIEVzdGltYXRlIGRhdGE6IFVSTCBieXRlIGxlbmd0aHMgKndpdGhvdXQqIGFsbG9jYXRpbmcgbGFyZ2UgYnVmZmVycy5cbiAqIC0gRmV0Y2ggcGVyY2VudC1kZWNvZGVzIGEgYmFzZTY0IGJvZHkgYmVmb3JlIGRlY29kaW5nIGl0LlxuICogLSBOb2RlJ3MgQnVmZmVyLmZyb20oYm9keSwgJ2Jhc2U2NCcpIHNpemVzIGl0cyBiYWNraW5nIGFsbG9jYXRpb24gZnJvbSB0aGVcbiAqICAgcmF3IGJvZHksIGluY2x1ZGluZyBpZ25vcmVkIGNoYXJhY3RlcnMgYW5kIGNvbnRlbnQgYWZ0ZXIgcGFkZGluZy5cbiAqIC0gTm9uLWJhc2U2NCBkYXRhIGlzIHBlcmNlbnQtZGVjb2RlZCBhbmQgdGhlbiBlbmNvZGVkIGFzIFVURi04LlxuICovXG5jb25zdCBpc0hleERpZ2l0ID0gKGNoYXJDb2RlKSA9PlxuICAoY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpIHx8XG4gIChjaGFyQ29kZSA+PSA2NSAmJiBjaGFyQ29kZSA8PSA3MCkgfHxcbiAgKGNoYXJDb2RlID49IDk3ICYmIGNoYXJDb2RlIDw9IDEwMik7XG5cbmNvbnN0IGlzUGVyY2VudEVuY29kZWRCeXRlID0gKHN0ciwgaSwgbGVuKSA9PlxuICBpICsgMiA8IGxlbiAmJiBpc0hleERpZ2l0KHN0ci5jaGFyQ29kZUF0KGkgKyAxKSkgJiYgaXNIZXhEaWdpdChzdHIuY2hhckNvZGVBdChpICsgMikpO1xuXG5jb25zdCBoZXhWYWx1ZSA9IChjaGFyQ29kZSkgPT4gKGNoYXJDb2RlIDw9IDU3ID8gY2hhckNvZGUgLSA0OCA6IChjaGFyQ29kZSAmIDB4ZGYpIC0gNTUpO1xuXG5jb25zdCBpc0Jhc2U2NENoYXIgPSAoY2hhckNvZGUpID0+XG4gIChjaGFyQ29kZSA+PSA2NSAmJiBjaGFyQ29kZSA8PSA5MCkgfHwgLy8gQS1aXG4gIChjaGFyQ29kZSA+PSA5NyAmJiBjaGFyQ29kZSA8PSAxMjIpIHx8IC8vIGEtelxuICAoY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpIHx8IC8vIDAtOVxuICBjaGFyQ29kZSA9PT0gNDMgfHwgLy8gK1xuICBjaGFyQ29kZSA9PT0gNDcgfHwgLy8gL1xuICBjaGFyQ29kZSA9PT0gNDUgfHwgLy8gLSAoYmFzZTY0dXJsKVxuICBjaGFyQ29kZSA9PT0gOTU7IC8vIF8gKGJhc2U2NHVybClcblxuY29uc3QgaXNCYXNlNjRXaGl0ZXNwYWNlID0gKGNoYXJDb2RlKSA9PlxuICBjaGFyQ29kZSA9PT0gOSB8fCBjaGFyQ29kZSA9PT0gMTAgfHwgY2hhckNvZGUgPT09IDEyIHx8IGNoYXJDb2RlID09PSAxMyB8fCBjaGFyQ29kZSA9PT0gMzI7XG5cbmNvbnN0IGJhc2U2NEJ5dGVzID0gKHNpZ25pZmljYW50KSA9PiB7XG4gIGNvbnN0IGdyb3VwcyA9IE1hdGguZmxvb3Ioc2lnbmlmaWNhbnQgLyA0KTtcbiAgY29uc3QgcmVtYWluZGVyID0gc2lnbmlmaWNhbnQgJSA0O1xuICByZXR1cm4gZ3JvdXBzICogMyArIChyZW1haW5kZXIgPT09IDIgPyAxIDogcmVtYWluZGVyID09PSAzID8gMiA6IDApO1xufTtcblxuLy8gQnVmZmVyLmJ5dGVMZW5ndGgoYm9keSwgJ2Jhc2U2NCcpIHVzZXMgdGhlIHJhdyBzdHJpbmcgbGVuZ3RoIGFzIGFuIGFsbG9jYXRpb25cbi8vIHVwcGVyIGJvdW5kIGV2ZW4gd2hlbiBCdWZmZXIuZnJvbSBsYXRlciBpZ25vcmVzIGNoYXJhY3RlcnMgb3Igc3RvcHMgYXQgJz0nLlxuY29uc3QgZXN0aW1hdGVCYXNlNjRCdWZmZXJBbGxvY2F0aW9uID0gKGJvZHkpID0+IHtcbiAgY29uc3QgbGVuID0gYm9keS5sZW5ndGg7XG4gIGxldCBwYWRkaW5nID0gMDtcblxuICBpZiAobGVuID4gMCAmJiBib2R5LmNoYXJDb2RlQXQobGVuIC0gMSkgPT09IDYxIC8qICc9JyAqLykge1xuICAgIHBhZGRpbmcrKztcblxuICAgIGlmIChsZW4gPiAxICYmIGJvZHkuY2hhckNvZGVBdChsZW4gLSAyKSA9PT0gNjEgLyogJz0nICovKSB7XG4gICAgICBwYWRkaW5nKys7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE1hdGguZmxvb3IoKChsZW4gLSBwYWRkaW5nKSAqIDMpIC8gNCk7XG59O1xuXG5jb25zdCBlc3RpbWF0ZVBlcmNlbnREZWNvZGVkQmFzZTY0Qnl0ZXMgPSAoYm9keSkgPT4ge1xuICBjb25zdCBsZW4gPSBib2R5Lmxlbmd0aDtcbiAgbGV0IHNpZ25pZmljYW50ID0gMDtcbiAgbGV0IHBhZGRpbmcgPSAwO1xuICBsZXQgaW52YWxpZCA9IGZhbHNlO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBsZXQgY29kZSA9IGJvZHkuY2hhckNvZGVBdChpKTtcblxuICAgIGlmIChjb2RlID09PSAzNyAvKiAnJScgKi8gJiYgaXNQZXJjZW50RW5jb2RlZEJ5dGUoYm9keSwgaSwgbGVuKSkge1xuICAgICAgY29kZSA9IGhleFZhbHVlKGJvZHkuY2hhckNvZGVBdChpICsgMSkpICogMTYgKyBoZXhWYWx1ZShib2R5LmNoYXJDb2RlQXQoaSArIDIpKTtcbiAgICAgIGkgKz0gMjtcbiAgICB9XG5cbiAgICBpZiAoaXNCYXNlNjRXaGl0ZXNwYWNlKGNvZGUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoY29kZSA9PT0gNjEgLyogJz0nICovKSB7XG4gICAgICBwYWRkaW5nKys7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoIWlzQmFzZTY0Q2hhcihjb2RlKSB8fCBwYWRkaW5nID4gMCkge1xuICAgICAgaW52YWxpZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBzaWduaWZpY2FudCsrO1xuICB9XG5cbiAgLy8gRmV0Y2ggcmVqZWN0cyBtYWxmb3JtZWQgZm9yZ2l2aW5nLWJhc2U2NCBpbnB1dC4gUmV0dXJuaW5nIHRoZSByYXctc2l6ZVxuICAvLyBhbGxvY2F0aW9uIGJvdW5kIGtlZXBzIHRoYXQgaW52YWxpZCBpbnB1dCBmcm9tIGJlY29taW5nIGEgcHJlLWNoZWNrIGJ5cGFzcy5cbiAgaWYgKFxuICAgIGludmFsaWQgfHxcbiAgICBwYWRkaW5nID4gMiB8fFxuICAgIChwYWRkaW5nID4gMCAmJiAoc2lnbmlmaWNhbnQgKyBwYWRkaW5nKSAlIDQgIT09IDApIHx8XG4gICAgc2lnbmlmaWNhbnQgJSA0ID09PSAxXG4gICkge1xuICAgIHJldHVybiBlc3RpbWF0ZUJhc2U2NEJ1ZmZlckFsbG9jYXRpb24oYm9keSk7XG4gIH1cblxuICByZXR1cm4gYmFzZTY0Qnl0ZXMoc2lnbmlmaWNhbnQpO1xufTtcblxuY29uc3QgZXN0aW1hdGVEYXRhVVJMQnl0ZXMgPSAodXJsLCBlc3RpbWF0ZUJhc2U2NCkgPT4ge1xuICBpZiAoIXVybCB8fCB0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykgcmV0dXJuIDA7XG4gIGlmICghdXJsLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHJldHVybiAwO1xuXG4gIGNvbnN0IGNvbW1hID0gdXJsLmluZGV4T2YoJywnKTtcbiAgaWYgKGNvbW1hIDwgMCkgcmV0dXJuIDA7XG5cbiAgY29uc3QgbWV0YSA9IHVybC5zbGljZSg1LCBjb21tYSk7XG4gIGNvbnN0IGJvZHkgPSB1cmwuc2xpY2UoY29tbWEgKyAxKTtcbiAgY29uc3QgaXNCYXNlNjQgPSAvO2Jhc2U2NC9pLnRlc3QobWV0YSk7XG5cbiAgaWYgKGlzQmFzZTY0KSB7XG4gICAgcmV0dXJuIGVzdGltYXRlQmFzZTY0KGJvZHkpO1xuICB9XG5cbiAgLy8gQ29tcHV0ZSBVVEYtOCBieXRlIGxlbmd0aCBkaXJlY3RseSBmcm9tIFVURi0xNiBjb2RlIHVuaXRzIHdpdGhvdXQgYWxsb2NhdGluZ1xuICAvLyBhIGJ5dGUgYnVmZmVyIChUZXh0RW5jb2Rlci5lbmNvZGUgd291bGQgZGVmZWF0IHRoZSBEb1MgZ3VhcmQgb24gbGFyZ2UgYm9kaWVzKS5cbiAgLy8gVmFsaWQgJVhYIHRyaXBsZXRzIGNvdW50IGFzIG9uZSBkZWNvZGVkIGJ5dGU7IHRoaXMgbWF0Y2hlcyB0aGUgYnl0ZXMgdGhhdFxuICAvLyBkZWNvZGVVUklDb21wb25lbnQoYm9keSkgd291bGQgcHJvZHVjZSBiZWZvcmUgQnVmZmVyIHJlLWVuY29kZXMgdGhlIHN0cmluZy5cbiAgbGV0IGJ5dGVzID0gMDtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGJvZHkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBjID0gYm9keS5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjID09PSAzNyAvKiAnJScgKi8gJiYgaXNQZXJjZW50RW5jb2RlZEJ5dGUoYm9keSwgaSwgbGVuKSkge1xuICAgICAgYnl0ZXMgKz0gMTtcbiAgICAgIGkgKz0gMjtcbiAgICB9IGVsc2UgaWYgKGMgPCAweDgwKSB7XG4gICAgICBieXRlcyArPSAxO1xuICAgIH0gZWxzZSBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICBieXRlcyArPSAyO1xuICAgIH0gZWxzZSBpZiAoYyA+PSAweGQ4MDAgJiYgYyA8PSAweGRiZmYgJiYgaSArIDEgPCBsZW4pIHtcbiAgICAgIGNvbnN0IG5leHQgPSBib2R5LmNoYXJDb2RlQXQoaSArIDEpO1xuICAgICAgaWYgKG5leHQgPj0gMHhkYzAwICYmIG5leHQgPD0gMHhkZmZmKSB7XG4gICAgICAgIGJ5dGVzICs9IDQ7XG4gICAgICAgIGkrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ5dGVzICs9IDM7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ5dGVzICs9IDM7XG4gICAgfVxuICB9XG4gIHJldHVybiBieXRlcztcbn07XG5cbi8qKlxuICogRXN0aW1hdGUgdGhlIHBlcmNlbnQtZGVjb2RlZCBwYXlsb2FkIHNpemUgdXNlZCBieSBGZXRjaCBkYXRhOiBVUkxzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVzdGltYXRlRGF0YVVSTERlY29kZWRCeXRlcyh1cmwpIHtcbiAgLy8gRmV0Y2ggcmVtb3ZlcyBVUkwgZnJhZ21lbnRzIGJlZm9yZSBwcm9jZXNzaW5nIGEgZGF0YTogVVJMLlxuICBjb25zdCBmcmFnbWVudEluZGV4ID0gdHlwZW9mIHVybCA9PT0gJ3N0cmluZycgPyB1cmwuaW5kZXhPZignIycpIDogLTE7XG5cbiAgcmV0dXJuIGVzdGltYXRlRGF0YVVSTEJ5dGVzKFxuICAgIGZyYWdtZW50SW5kZXggPT09IC0xID8gdXJsIDogdXJsLnNsaWNlKDAsIGZyYWdtZW50SW5kZXgpLFxuICAgIGVzdGltYXRlUGVyY2VudERlY29kZWRCYXNlNjRCeXRlc1xuICApO1xufVxuXG4vKipcbiAqIEVzdGltYXRlIHRoZSBCdWZmZXIgYmFja2luZyBhbGxvY2F0aW9uIHVzZWQgYnkgTm9kZSdzIHJhdyBiYXNlNjQgZGVjb2Rlci5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXN0aW1hdGVEYXRhVVJMQnVmZmVyQWxsb2NhdGlvbih1cmwpIHtcbiAgcmV0dXJuIGVzdGltYXRlRGF0YVVSTEJ5dGVzKHVybCwgZXN0aW1hdGVCYXNlNjRCdWZmZXJBbGxvY2F0aW9uKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgeyBERUZBVUxUX0ZPUk1fREFUQV9NQVhfREVQVEggfSBmcm9tICcuL3RvRm9ybURhdGEuanMnO1xuXG5jb25zdCBNQVhfREVQVEggPSBERUZBVUxUX0ZPUk1fREFUQV9NQVhfREVQVEg7XG5cbmZ1bmN0aW9uIHRocm93SWZEZXB0aEV4Y2VlZGVkKGluZGV4KSB7XG4gIGlmIChpbmRleCA+IE1BWF9ERVBUSCkge1xuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgJ0Zvcm1EYXRhIGZpZWxkIGlzIHRvbyBkZWVwbHkgbmVzdGVkICgnICsgaW5kZXggKyAnIGxldmVscykuIE1heCBkZXB0aDogJyArIE1BWF9ERVBUSCxcbiAgICAgIEF4aW9zRXJyb3IuRVJSX0ZPUk1fREFUQV9ERVBUSF9FWENFRURFRFxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZyBsaWtlIGBmb29beF1beV1bel1gIGFuZCByZXR1cm5zIGFuIGFycmF5IGxpa2UgYFsnZm9vJywgJ3gnLCAneScsICd6J11cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKlxuICogQHJldHVybnMgQW4gYXJyYXkgb2Ygc3RyaW5ncy5cbiAqL1xuZnVuY3Rpb24gcGFyc2VQcm9wUGF0aChuYW1lKSB7XG4gIC8vIGZvb1t4XVt5XVt6XSAtPiBbJ2ZvbycsICd4JywgJ3knLCAneiddXG4gIC8vIGZvby54LnkueiAgICAtPiBbJ2ZvbycsICd4JywgJ3knLCAneiddXG4gIC8vIEEgcGF0aCBpcyBzcGxpdCBvbiBgLmAgYW5kIG9uIGBbLi4uXWAgZ3JvdXBzLiBBIHNlZ21lbnQg4oCUIHdoZXRoZXIgd3JpdHRlblxuICAvLyBpbiBkb3Qgbm90YXRpb24gb3IgY2FwdHVyZWQgaW5zaWRlIGJyYWNrZXRzIOKAlCBtYXkgY29udGFpbiBhbnkgY2hhcmFjdGVyXG4gIC8vIGV4Y2VwdCBgLmAsIGBbYCBhbmQgYF1gLCBzbyBhIGtleSBsaWtlIGB1c2VyLW5hbWVgIG9yIGB1c2VyIG5hbWVgIGlzIGtlcHRcbiAgLy8gbGl0ZXJhbCBpbnN0ZWFkIG9mIGJlaW5nIHNwbGl0ICgjNTQwMikuIGAuYCwgYFtgIGFuZCBgXWAga2VlcCB0aGVpciBleGlzdGluZ1xuICAvLyBtZWFuaW5nLCBlLmcuIGBmb29bYmFyLmJhel1gIC0+IFsnZm9vJywgJ2JhcicsICdiYXonXSBhbmQgYFtdYCBpcyBhbiBhcnJheSBwdXNoLlxuICAvLyBFeGNsdWRpbmcgYFtgIGZyb20gdGhlIGJyYWNrZXQgZ3JvdXAgYWxzbyBtYWtlcyB0aGUgbWF0Y2ggZmFpbCBmYXN0IGF0IHRoZVxuICAvLyBuZXh0IGBbYCwgc28gYSBtYWxmb3JtZWQgbmFtZSBjYW5ub3QgcmVzY2FuIHRvIHRoZSBlbmQgb2YgdGhlIHN0cmluZyBmcm9tXG4gIC8vIGV2ZXJ5IHVubWF0Y2hlZCBgW2Ag4oCUIHBhcnNpbmcgc3RheXMgbGluZWFyIGluIHRoZSBsZW5ndGggb2YgdGhlIG5hbWUuXG4gIGNvbnN0IHBhdGggPSBbXTtcbiAgY29uc3QgcGF0dGVybiA9IC9bXi5bXFxdXSt8XFxbKFteLltcXF1dKildL2c7XG4gIGxldCBtYXRjaDtcblxuICB3aGlsZSAoKG1hdGNoID0gcGF0dGVybi5leGVjKG5hbWUpKSAhPT0gbnVsbCkge1xuICAgIHRocm93SWZEZXB0aEV4Y2VlZGVkKHBhdGgubGVuZ3RoKTtcbiAgICBwYXRoLnB1c2gobWF0Y2hbMF0gPT09ICdbXScgPyAnJyA6IG1hdGNoWzFdIHx8IG1hdGNoWzBdKTtcbiAgfVxuXG4gIHJldHVybiBwYXRoO1xufVxuXG4vKipcbiAqIENvbnZlcnQgYW4gYXJyYXkgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyIC0gVGhlIGFycmF5IHRvIGNvbnZlcnQgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIGtleXMgYW5kIHZhbHVlcyBhcyB0aGUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5VG9PYmplY3QoYXJyKSB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYXJyKTtcbiAgbGV0IGk7XG4gIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICBsZXQga2V5O1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBrZXkgPSBrZXlzW2ldO1xuICAgIG9ialtrZXldID0gYXJyW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIEZvcm1EYXRhIG9iamVjdCBhbmQgcmV0dXJucyBhIEphdmFTY3JpcHQgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1EYXRhIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gY29udmVydCB0byBKU09OLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3Q8c3RyaW5nLCBhbnk+IHwgbnVsbH0gVGhlIGNvbnZlcnRlZCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGZvcm1EYXRhVG9KU09OKGZvcm1EYXRhKSB7XG4gIGZ1bmN0aW9uIGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0LCBpbmRleCkge1xuICAgIHRocm93SWZEZXB0aEV4Y2VlZGVkKGluZGV4KTtcblxuICAgIGxldCBuYW1lID0gcGF0aFtpbmRleCsrXTtcblxuICAgIGlmIChuYW1lID09PSAnX19wcm90b19fJykgcmV0dXJuIHRydWU7XG5cbiAgICBjb25zdCBpc051bWVyaWNLZXkgPSBOdW1iZXIuaXNGaW5pdGUoK25hbWUpO1xuICAgIGNvbnN0IGlzTGFzdCA9IGluZGV4ID49IHBhdGgubGVuZ3RoO1xuICAgIG5hbWUgPSAhbmFtZSAmJiB1dGlscy5pc0FycmF5KHRhcmdldCkgPyB0YXJnZXQubGVuZ3RoIDogbmFtZTtcblxuICAgIGlmIChpc0xhc3QpIHtcbiAgICAgIGlmICh1dGlscy5oYXNPd25Qcm9wKHRhcmdldCwgbmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gdXRpbHMuaXNBcnJheSh0YXJnZXRbbmFtZV0pXG4gICAgICAgICAgPyB0YXJnZXRbbmFtZV0uY29uY2F0KHZhbHVlKVxuICAgICAgICAgIDogW3RhcmdldFtuYW1lXSwgdmFsdWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICAgIH1cblxuICAgIGlmICghdXRpbHMuaGFzT3duUHJvcCh0YXJnZXQsIG5hbWUpIHx8ICF1dGlscy5pc09iamVjdCh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBbXTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBidWlsZFBhdGgocGF0aCwgdmFsdWUsIHRhcmdldFtuYW1lXSwgaW5kZXgpO1xuXG4gICAgaWYgKHJlc3VsdCAmJiB1dGlscy5pc0FycmF5KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IGFycmF5VG9PYmplY3QodGFyZ2V0W25hbWVdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gIWlzTnVtZXJpY0tleTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc0Zvcm1EYXRhKGZvcm1EYXRhKSAmJiB1dGlscy5pc0Z1bmN0aW9uKGZvcm1EYXRhLmVudHJpZXMpKSB7XG4gICAgY29uc3Qgb2JqID0ge307XG5cbiAgICB1dGlscy5mb3JFYWNoRW50cnkoZm9ybURhdGEsIChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgYnVpbGRQYXRoKHBhcnNlUHJvcFBhdGgobmFtZSksIHZhbHVlLCBvYmosIDApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JtRGF0YVRvSlNPTjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiAvXihbYS16XVthLXpcXGQrXFwtLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0F4aW9zRXJyb3IocGF5bG9hZCkge1xuICByZXR1cm4gdXRpbHMuaXNPYmplY3QocGF5bG9hZCkgJiYgcGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWU7XG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnZcbiAgPyAoKG9yaWdpbiwgaXNNU0lFKSA9PiAodXJsKSA9PiB7XG4gICAgICB1cmwgPSBuZXcgVVJMKHVybCwgcGxhdGZvcm0ub3JpZ2luKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgb3JpZ2luLnByb3RvY29sID09PSB1cmwucHJvdG9jb2wgJiZcbiAgICAgICAgb3JpZ2luLmhvc3QgPT09IHVybC5ob3N0ICYmXG4gICAgICAgIChpc01TSUUgfHwgb3JpZ2luLnBvcnQgPT09IHVybC5wb3J0KVxuICAgICAgKTtcbiAgICB9KShcbiAgICAgIG5ldyBVUkwocGxhdGZvcm0ub3JpZ2luKSxcbiAgICAgIHBsYXRmb3JtLm5hdmlnYXRvciAmJiAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KHBsYXRmb3JtLm5hdmlnYXRvci51c2VyQWdlbnQpXG4gICAgKVxuICA6ICgpID0+IHRydWU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHVybFBhcnNlckNvbnRyb2xDaGFyYWN0ZXJzID0gL1tcXHRcXG5cXHJdL2c7XG5cbi8qKlxuICogTWF0Y2ggV0hBVFdHIFVSTCBwcmVwcm9jZXNzaW5nIGJlZm9yZSBjaGVja2luZyBhIFVSTCdzIHByb3RvY29sLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3JtYWxpemVVUkxGb3JQcm90b2NvbENoZWNrKHVybCkge1xuICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgbGV0IHN0YXJ0ID0gMDtcblxuICB3aGlsZSAoc3RhcnQgPCB1cmwubGVuZ3RoICYmIHVybC5jaGFyQ29kZUF0KHN0YXJ0KSA8PSAweDIwKSB7XG4gICAgc3RhcnQrKztcbiAgfVxuXG4gIHJldHVybiB1cmwuc2xpY2Uoc3RhcnQpLnJlcGxhY2UodXJsUGFyc2VyQ29udHJvbENoYXJhY3RlcnMsICcnKTtcbn1cbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBzdHJpY3RcbmV4cG9ydCBkZWZhdWx0IG51bGw7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbi8vIFJhd0F4aW9zSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbmNvbnN0IGlnbm9yZUR1cGxpY2F0ZU9mID0gdXRpbHMudG9PYmplY3RTZXQoW1xuICAnYWdlJyxcbiAgJ2F1dGhvcml6YXRpb24nLFxuICAnY29udGVudC1sZW5ndGgnLFxuICAnY29udGVudC10eXBlJyxcbiAgJ2V0YWcnLFxuICAnZXhwaXJlcycsXG4gICdmcm9tJyxcbiAgJ2hvc3QnLFxuICAnaWYtbW9kaWZpZWQtc2luY2UnLFxuICAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJyxcbiAgJ2xvY2F0aW9uJyxcbiAgJ21heC1mb3J3YXJkcycsXG4gICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLFxuICAncmV0cnktYWZ0ZXInLFxuICAndXNlci1hZ2VudCcsXG5dKTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJhd0hlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IChyYXdIZWFkZXJzKSA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHt9O1xuICBsZXQga2V5O1xuICBsZXQgdmFsO1xuICBsZXQgaTtcblxuICByYXdIZWFkZXJzICYmXG4gICAgcmF3SGVhZGVycy5zcGxpdCgnXFxuJykuZm9yRWFjaChmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgICAga2V5ID0gbGluZS5zdWJzdHJpbmcoMCwgaSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICB2YWwgPSBsaW5lLnN1YnN0cmluZyhpICsgMSkudHJpbSgpO1xuXG4gICAgICBjb25zdCBoYXNLZXkgPSB1dGlscy5oYXNPd25Qcm9wKHBhcnNlZCwga2V5KTtcblxuICAgICAgaWYgKCFrZXkgfHwgKGhhc0tleSAmJiB1dGlscy5oYXNPd25Qcm9wKGlnbm9yZUR1cGxpY2F0ZU9mLCBrZXkpKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBpZiAoaGFzS2V5KSB7XG4gICAgICAgICAgcGFyc2VkW2tleV0ucHVzaCh2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcnNlZFtrZXldID0gW3ZhbF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gaGFzS2V5ID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZVByb3RvY29sKHVybCkge1xuICBjb25zdCBtYXRjaCA9IC9eKFstK1xcd117MSwyNX0pOig/OlxcL1xcLyk/Ly5leGVjKHVybCk7XG4gIHJldHVybiAobWF0Y2ggJiYgbWF0Y2hbMV0pIHx8ICcnO1xufVxuIiwiaW1wb3J0IHNwZWVkb21ldGVyIGZyb20gJy4vc3BlZWRvbWV0ZXIuanMnO1xuaW1wb3J0IHRocm90dGxlIGZyb20gJy4vdGhyb3R0bGUuanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuZXhwb3J0IGNvbnN0IHByb2dyZXNzRXZlbnRSZWR1Y2VyID0gKGxpc3RlbmVyLCBpc0Rvd25sb2FkU3RyZWFtLCBmcmVxID0gMykgPT4ge1xuICBsZXQgYnl0ZXNOb3RpZmllZCA9IDA7XG4gIGNvbnN0IF9zcGVlZG9tZXRlciA9IHNwZWVkb21ldGVyKDUwLCAyNTApO1xuXG4gIHJldHVybiB0aHJvdHRsZSgoZSkgPT4ge1xuICAgIGlmICghZSB8fCAhdXRpbHMuaXNOdW1iZXIoZS5sb2FkZWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJhd0xvYWRlZCA9IGUubG9hZGVkO1xuICAgIGNvbnN0IHRvdGFsID0gZS5sZW5ndGhDb21wdXRhYmxlID8gZS50b3RhbCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBsb2FkZWQgPSBNYXRoLm1heCgwLCB0b3RhbCAhPSBudWxsID8gTWF0aC5taW4ocmF3TG9hZGVkLCB0b3RhbCkgOiByYXdMb2FkZWQpO1xuICAgIGNvbnN0IHByb2dyZXNzQnl0ZXMgPSBNYXRoLm1heCgwLCBsb2FkZWQgLSBieXRlc05vdGlmaWVkKTtcbiAgICBjb25zdCByYXRlID0gX3NwZWVkb21ldGVyKHByb2dyZXNzQnl0ZXMpO1xuXG4gICAgYnl0ZXNOb3RpZmllZCA9IE1hdGgubWF4KGJ5dGVzTm90aWZpZWQsIGxvYWRlZCk7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbG9hZGVkLFxuICAgICAgdG90YWwsXG4gICAgICBwcm9ncmVzczogdG90YWwgPyBsb2FkZWQgLyB0b3RhbCA6IHVuZGVmaW5lZCxcbiAgICAgIGJ5dGVzOiBwcm9ncmVzc0J5dGVzLFxuICAgICAgcmF0ZTogcmF0ZSA/IHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBlc3RpbWF0ZWQ6IHJhdGUgJiYgdG90YWwgPyAodG90YWwgLSBsb2FkZWQpIC8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGV2ZW50OiBlLFxuICAgICAgbGVuZ3RoQ29tcHV0YWJsZTogdG90YWwgIT0gbnVsbCxcbiAgICAgIFtpc0Rvd25sb2FkU3RyZWFtID8gJ2Rvd25sb2FkJyA6ICd1cGxvYWQnXTogdHJ1ZSxcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIoZGF0YSk7XG4gIH0sIGZyZXEpO1xufTtcblxuZXhwb3J0IGNvbnN0IHByb2dyZXNzRXZlbnREZWNvcmF0b3IgPSAodG90YWwsIHRocm90dGxlZCkgPT4ge1xuICBjb25zdCBsZW5ndGhDb21wdXRhYmxlID0gdG90YWwgIT0gbnVsbDtcblxuICByZXR1cm4gW1xuICAgIChsb2FkZWQpID0+XG4gICAgICB0aHJvdHRsZWRbMF0oe1xuICAgICAgICBsZW5ndGhDb21wdXRhYmxlLFxuICAgICAgICB0b3RhbCxcbiAgICAgICAgbG9hZGVkLFxuICAgICAgfSksXG4gICAgdGhyb3R0bGVkWzFdLFxuICBdO1xufTtcblxuZXhwb3J0IGNvbnN0IGFzeW5jRGVjb3JhdG9yID1cbiAgKGZuLCBzY2hlZHVsZXIgPSB1dGlscy5hc2FwKSA9PlxuICAoLi4uYXJncykgPT5cbiAgICBzY2hlZHVsZXIoKCkgPT4gZm4oLi4uYXJncykpO1xuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IGlzVVJMU2FtZU9yaWdpbiBmcm9tICcuL2lzVVJMU2FtZU9yaWdpbi5qcyc7XG5pbXBvcnQgY29va2llcyBmcm9tICcuL2Nvb2tpZXMuanMnO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSAnLi4vY29yZS9idWlsZEZ1bGxQYXRoLmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuLi9jb3JlL21lcmdlQ29uZmlnLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IHNldEZvcm1EYXRhSGVhZGVycyBmcm9tICcuLi9jb3JlL3NldEZvcm1EYXRhSGVhZGVycy5qcyc7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSAnLi9idWlsZFVSTC5qcyc7XG5cbi8qKlxuICogRW5jb2RlIGEgVVRGLTggc3RyaW5nIHRvIGEgTGF0aW4tMSBieXRlIHN0cmluZyBmb3IgdXNlIHdpdGggYnRvYSgpLlxuICogVGhpcyBpcyBhIG1vZGVybiByZXBsYWNlbWVudCBmb3IgdGhlIGRlcHJlY2F0ZWQgdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpIHBhdHRlcm4uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIGVuY29kZVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFVURi04IGJ5dGVzIGFzIGEgTGF0aW4tMSBzdHJpbmdcbiAqL1xuY29uc3QgZW5jb2RlVVRGOCA9IChzdHIpID0+XG4gIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoLyUoWzAtOUEtRl17Mn0pL2dpLCAoXywgaGV4KSA9PlxuICAgIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQoaGV4LCAxNikpXG4gICk7XG5cbmZ1bmN0aW9uIHJlc29sdmVDb25maWcoY29uZmlnKSB7XG4gIGNvbnN0IG5ld0NvbmZpZyA9IG1lcmdlQ29uZmlnKHt9LCBjb25maWcpO1xuXG4gIC8vIFJlYWQgb25seSBvd24gcHJvcGVydGllcyB0byBwcmV2ZW50IHByb3RvdHlwZSBwb2xsdXRpb24gZ2FkZ2V0c1xuICAvLyAoZS5nLiBPYmplY3QucHJvdG90eXBlLmJhc2VVUkwgPSAnaHR0cHM6Ly9ldmlsLmNvbScpLlxuICBjb25zdCBvd24gPSAoa2V5KSA9PiAodXRpbHMuaGFzT3duUHJvcChuZXdDb25maWcsIGtleSkgPyBuZXdDb25maWdba2V5XSA6IHVuZGVmaW5lZCk7XG5cbiAgY29uc3QgZGF0YSA9IG93bignZGF0YScpO1xuICBsZXQgd2l0aFhTUkZUb2tlbiA9IG93bignd2l0aFhTUkZUb2tlbicpO1xuICBjb25zdCB4c3JmSGVhZGVyTmFtZSA9IG93bigneHNyZkhlYWRlck5hbWUnKTtcbiAgY29uc3QgeHNyZkNvb2tpZU5hbWUgPSBvd24oJ3hzcmZDb29raWVOYW1lJyk7XG4gIGxldCBoZWFkZXJzID0gb3duKCdoZWFkZXJzJyk7XG4gIGNvbnN0IGF1dGggPSBvd24oJ2F1dGgnKTtcbiAgY29uc3QgYmFzZVVSTCA9IG93bignYmFzZVVSTCcpO1xuICBjb25zdCBhbGxvd0Fic29sdXRlVXJscyA9IG93bignYWxsb3dBYnNvbHV0ZVVybHMnKTtcbiAgY29uc3QgdXJsID0gb3duKCd1cmwnKTtcblxuICBuZXdDb25maWcuaGVhZGVycyA9IGhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShoZWFkZXJzKTtcblxuICBuZXdDb25maWcudXJsID0gYnVpbGRVUkwoXG4gICAgYnVpbGRGdWxsUGF0aChiYXNlVVJMLCB1cmwsIGFsbG93QWJzb2x1dGVVcmxzLCBuZXdDb25maWcpLFxuICAgIG93bigncGFyYW1zJyksXG4gICAgb3duKCdwYXJhbXNTZXJpYWxpemVyJylcbiAgKTtcblxuICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gIGlmIChhdXRoKSB7XG4gICAgY29uc3QgdXNlcm5hbWUgPSB1dGlscy5nZXRTYWZlUHJvcChhdXRoLCAndXNlcm5hbWUnKSB8fCAnJztcbiAgICBjb25zdCBwYXNzd29yZCA9IHV0aWxzLmdldFNhZmVQcm9wKGF1dGgsICdwYXNzd29yZCcpIHx8ICcnO1xuXG4gICAgdHJ5IHtcbiAgICAgIGhlYWRlcnMuc2V0KFxuICAgICAgICAnQXV0aG9yaXphdGlvbicsXG4gICAgICAgICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIChwYXNzd29yZCA/IGVuY29kZVVURjgocGFzc3dvcmQpIDogJycpKVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSwgY29uZmlnKTtcbiAgICB9XG4gIH1cblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSkge1xuICAgIGNvbnN0IGdldEhlYWRlcnMgPSB1dGlscy5nZXRTYWZlUHJvcChkYXRhLCAnZ2V0SGVhZGVycycpO1xuXG4gICAgaWYgKFxuICAgICAgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52IHx8XG4gICAgICBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYgfHxcbiAgICAgIHV0aWxzLmlzUmVhY3ROYXRpdmUoZGF0YSlcbiAgICApIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUodW5kZWZpbmVkKTsgLy8gYnJvd3Nlci93ZWIgd29ya2VyL1JOIGhhbmRsZXMgaXRcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzRnVuY3Rpb24oZ2V0SGVhZGVycykpIHtcbiAgICAgIC8vIE5vZGUuanMgRm9ybURhdGEgKGxpa2UgZm9ybS1kYXRhIHBhY2thZ2UpXG4gICAgICBzZXRGb3JtRGF0YUhlYWRlcnMoaGVhZGVycywgZ2V0SGVhZGVycy5jYWxsKGRhdGEpLCBvd24oJ2Zvcm1EYXRhSGVhZGVyUG9saWN5JykpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCB4c3JmIGhlYWRlclxuICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cblxuICBpZiAocGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52KSB7XG4gICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24od2l0aFhTUkZUb2tlbikpIHtcbiAgICAgIHdpdGhYU1JGVG9rZW4gPSB3aXRoWFNSRlRva2VuKG5ld0NvbmZpZyk7XG4gICAgfVxuXG4gICAgLy8gU3RyaWN0IGJvb2xlYW4gY2hlY2sg4oCUIHByZXZlbnRzIHByb3RvLXBvbGx1dGlvbiBnYWRnZXRzIChlLmcuIE9iamVjdC5wcm90b3R5cGUud2l0aFhTUkZUb2tlbiA9IDEpXG4gICAgLy8gYW5kIG1pc2NvbmZpZ3VyYXRpb25zIChlLmcuIFwiZmFsc2VcIikgZnJvbSBzaG9ydC1jaXJjdWl0aW5nIHRoZSBzYW1lLW9yaWdpbiBjaGVjayBhbmQgbGVha2luZ1xuICAgIC8vIHRoZSBYU1JGIHRva2VuIGNyb3NzLW9yaWdpbi5cbiAgICBjb25zdCBzaG91bGRTZW5kWFNSRiA9XG4gICAgICB3aXRoWFNSRlRva2VuID09PSB0cnVlIHx8ICh3aXRoWFNSRlRva2VuID09IG51bGwgJiYgaXNVUkxTYW1lT3JpZ2luKG5ld0NvbmZpZy51cmwpKTtcblxuICAgIGlmIChzaG91bGRTZW5kWFNSRikge1xuICAgICAgY29uc3QgeHNyZlZhbHVlID0geHNyZkhlYWRlck5hbWUgJiYgeHNyZkNvb2tpZU5hbWUgJiYgY29va2llcy5yZWFkKHhzcmZDb29raWVOYW1lKTtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICBoZWFkZXJzLnNldCh4c3JmSGVhZGVyTmFtZSwgeHNyZlZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3Q29uZmlnO1xufVxuXG5leHBvcnQgZGVmYXVsdCByZXNvbHZlQ29uZmlnO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5mdW5jdGlvbiB0cmltU1BvckhUQUIoc3RyKSB7XG4gIGxldCBzdGFydCA9IDA7XG4gIGxldCBlbmQgPSBzdHIubGVuZ3RoO1xuXG4gIHdoaWxlIChzdGFydCA8IGVuZCkge1xuICAgIGNvbnN0IGNvZGUgPSBzdHIuY2hhckNvZGVBdChzdGFydCk7XG5cbiAgICBpZiAoY29kZSAhPT0gMHgwOSAmJiBjb2RlICE9PSAweDIwKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzdGFydCArPSAxO1xuICB9XG5cbiAgd2hpbGUgKGVuZCA+IHN0YXJ0KSB7XG4gICAgY29uc3QgY29kZSA9IHN0ci5jaGFyQ29kZUF0KGVuZCAtIDEpO1xuXG4gICAgaWYgKGNvZGUgIT09IDB4MDkgJiYgY29kZSAhPT0gMHgyMCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZW5kIC09IDE7XG4gIH1cblxuICByZXR1cm4gc3RhcnQgPT09IDAgJiYgZW5kID09PSBzdHIubGVuZ3RoID8gc3RyIDogc3RyLnNsaWNlKHN0YXJ0LCBlbmQpO1xufVxuXG4vLyBUaGUgY29udHJvbC1jb2RlIHJhbmdlcyBhcmUgaW50ZW50aW9uYWw6IGhlYWRlciBzYW5pdGl6YXRpb24gc3RyaXBzIEMwL0RFTCBieXRlcy5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4XG5jb25zdCBJTlZBTElEX1VOSUNPREVfSEVBREVSX1ZBTFVFX0NIQVJTID0gbmV3IFJlZ0V4cCgnW1xcXFx1MDAwMC1cXFxcdTAwMDhcXFxcdTAwMGEtXFxcXHUwMDFmXFxcXHUwMDdmXSsnLCAnZycpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRyb2wtcmVnZXhcbmNvbnN0IElOVkFMSURfQllURV9TVFJJTkdfSEVBREVSX1ZBTFVFX0NIQVJTID0gbmV3IFJlZ0V4cCgnW15cXFxcdTAwMDlcXFxcdTAwMjAtXFxcXHUwMDdlXFxcXHUwMDgwLVxcXFx1MDBmZl0rJywgJ2cnKTtcblxuZnVuY3Rpb24gc2FuaXRpemVWYWx1ZSh2YWx1ZSwgaW52YWxpZENoYXJzKSB7XG4gIGlmICh1dGlscy5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5tYXAoKGl0ZW0pID0+IHNhbml0aXplVmFsdWUoaXRlbSwgaW52YWxpZENoYXJzKSk7XG4gIH1cblxuICByZXR1cm4gdHJpbVNQb3JIVEFCKFN0cmluZyh2YWx1ZSkucmVwbGFjZShpbnZhbGlkQ2hhcnMsICcnKSk7XG59XG5cbmV4cG9ydCBjb25zdCBzYW5pdGl6ZUhlYWRlclZhbHVlID0gKHZhbHVlKSA9PlxuICBzYW5pdGl6ZVZhbHVlKHZhbHVlLCBJTlZBTElEX1VOSUNPREVfSEVBREVSX1ZBTFVFX0NIQVJTKTtcblxuZXhwb3J0IGNvbnN0IHNhbml0aXplQnl0ZVN0cmluZ0hlYWRlclZhbHVlID0gKHZhbHVlKSA9PlxuICBzYW5pdGl6ZVZhbHVlKHZhbHVlLCBJTlZBTElEX0JZVEVfU1RSSU5HX0hFQURFUl9WQUxVRV9DSEFSUyk7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0J5dGVTdHJpbmdIZWFkZXJPYmplY3QoaGVhZGVycykge1xuICBjb25zdCBieXRlU3RyaW5nSGVhZGVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnRvSlNPTigpLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgIGJ5dGVTdHJpbmdIZWFkZXJzW2hlYWRlcl0gPSBzYW5pdGl6ZUJ5dGVTdHJpbmdIZWFkZXJWYWx1ZSh2YWx1ZSk7XG4gIH0pO1xuXG4gIHJldHVybiBieXRlU3RyaW5nSGVhZGVycztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDYWxjdWxhdGUgZGF0YSBtYXhSYXRlXG4gKiBAcGFyYW0ge051bWJlcn0gW3NhbXBsZXNDb3VudD0gMTBdXG4gKiBAcGFyYW0ge051bWJlcn0gW21pbj0gMTAwMF1cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gc3BlZWRvbWV0ZXIoc2FtcGxlc0NvdW50LCBtaW4pIHtcbiAgc2FtcGxlc0NvdW50ID0gc2FtcGxlc0NvdW50IHx8IDEwO1xuICBjb25zdCBieXRlcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBjb25zdCB0aW1lc3RhbXBzID0gbmV3IEFycmF5KHNhbXBsZXNDb3VudCk7XG4gIGxldCBoZWFkID0gMDtcbiAgbGV0IHRhaWwgPSAwO1xuICBsZXQgZmlyc3RTYW1wbGVUUztcblxuICBtaW4gPSBtaW4gIT09IHVuZGVmaW5lZCA/IG1pbiA6IDEwMDA7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHB1c2goY2h1bmtMZW5ndGgpIHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuXG4gICAgY29uc3Qgc3RhcnRlZEF0ID0gdGltZXN0YW1wc1t0YWlsXTtcblxuICAgIGlmICghZmlyc3RTYW1wbGVUUykge1xuICAgICAgZmlyc3RTYW1wbGVUUyA9IG5vdztcbiAgICB9XG5cbiAgICBieXRlc1toZWFkXSA9IGNodW5rTGVuZ3RoO1xuICAgIHRpbWVzdGFtcHNbaGVhZF0gPSBub3c7XG5cbiAgICBsZXQgaSA9IHRhaWw7XG4gICAgbGV0IGJ5dGVzQ291bnQgPSAwO1xuXG4gICAgd2hpbGUgKGkgIT09IGhlYWQpIHtcbiAgICAgIGJ5dGVzQ291bnQgKz0gYnl0ZXNbaSsrXTtcbiAgICAgIGkgPSBpICUgc2FtcGxlc0NvdW50O1xuICAgIH1cblxuICAgIGhlYWQgPSAoaGVhZCArIDEpICUgc2FtcGxlc0NvdW50O1xuXG4gICAgaWYgKGhlYWQgPT09IHRhaWwpIHtcbiAgICAgIHRhaWwgPSAodGFpbCArIDEpICUgc2FtcGxlc0NvdW50O1xuICAgIH1cblxuICAgIGlmIChub3cgLSBmaXJzdFNhbXBsZVRTIDwgbWluKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGFzc2VkID0gc3RhcnRlZEF0ICYmIG5vdyAtIHN0YXJ0ZWRBdDtcblxuICAgIHJldHVybiBwYXNzZWQgPyBNYXRoLnJvdW5kKChieXRlc0NvdW50ICogMTAwMCkgLyBwYXNzZWQpIDogdW5kZWZpbmVkO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzcGVlZG9tZXRlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIGNvbnN0IGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn1cbiIsIi8qKlxuICogVGhyb3R0bGUgZGVjb3JhdG9yXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtOdW1iZXJ9IGZyZXFcbiAqIEByZXR1cm4ge0FycmF5PEZ1bmN0aW9uPn1cbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZm4sIGZyZXEpIHtcbiAgbGV0IHRpbWVzdGFtcCA9IDA7XG4gIGxldCB0aHJlc2hvbGQgPSAxMDAwIC8gZnJlcTtcbiAgbGV0IGxhc3RBcmdzO1xuICBsZXQgdGltZXI7XG5cbiAgY29uc3QgaW52b2tlID0gKGFyZ3MsIG5vdyA9IERhdGUubm93KCkpID0+IHtcbiAgICB0aW1lc3RhbXAgPSBub3c7XG4gICAgbGFzdEFyZ3MgPSBudWxsO1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICB9XG4gICAgZm4oLi4uYXJncyk7XG4gIH07XG5cbiAgY29uc3QgdGhyb3R0bGVkID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBhc3NlZCA9IG5vdyAtIHRpbWVzdGFtcDtcbiAgICBpZiAocGFzc2VkID49IHRocmVzaG9sZCkge1xuICAgICAgaW52b2tlKGFyZ3MsIG5vdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RBcmdzID0gYXJncztcbiAgICAgIGlmICghdGltZXIpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgaW52b2tlKGxhc3RBcmdzKTtcbiAgICAgICAgfSwgdGhyZXNob2xkIC0gcGFzc2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZmx1c2ggPSAoKSA9PiBsYXN0QXJncyAmJiBpbnZva2UobGFzdEFyZ3MpO1xuICBjb25zdCBmbHVzaFdpdGggPSAoLi4uYXJncykgPT4gaW52b2tlKGFyZ3MpO1xuXG4gIHJldHVybiBbdGhyb3R0bGVkLCBmbHVzaCwgZmx1c2hXaXRoXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGhyb3R0bGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuLy8gdGVtcG9yYXJ5IGhvdGZpeCB0byBhdm9pZCBjaXJjdWxhciByZWZlcmVuY2VzIHVudGlsIEF4aW9zVVJMU2VhcmNoUGFyYW1zIGlzIHJlZmFjdG9yZWRcbmltcG9ydCBQbGF0Zm9ybUZvcm1EYXRhIGZyb20gJy4uL3BsYXRmb3JtL25vZGUvY2xhc3Nlcy9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgUGxhdGZvcm1CdWZmZXIgZnJvbSAnLi4vcGxhdGZvcm0vbm9kZS9jbGFzc2VzL0J1ZmZlci5qcyc7XG5cbi8vIERlZmF1bHQgbmVzdGluZyBsaW1pdCBzaGFyZWQgd2l0aCB0aGUgaW52ZXJzZSB0cmFuc2Zvcm0gKGZvcm1EYXRhVG9KU09OKSBzb1xuLy8gdGhlIEZvcm1EYXRhIDwtPiBKU09OIHJvdW5kLXRyaXAgc3RheXMgc3ltbWV0cmljLlxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRk9STV9EQVRBX01BWF9ERVBUSCA9IDEwMDtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBnaXZlbiB0aGluZyBpcyBhIGFycmF5IG9yIGpzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGhpbmcgLSBUaGUgb2JqZWN0IG9yIGFycmF5IHRvIGJlIHZpc2l0ZWQuXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVmlzaXRhYmxlKHRoaW5nKSB7XG4gIHJldHVybiB1dGlscy5pc1BsYWluT2JqZWN0KHRoaW5nKSB8fCB1dGlscy5pc0FycmF5KHRoaW5nKTtcbn1cblxuLyoqXG4gKiBJdCByZW1vdmVzIHRoZSBicmFja2V0cyBmcm9tIHRoZSBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgcGFyYW1ldGVyLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBrZXkgd2l0aG91dCB0aGUgYnJhY2tldHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUJyYWNrZXRzKGtleSkge1xuICByZXR1cm4gdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSA/IGtleS5zbGljZSgwLCAtMikgOiBrZXk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXRoLCBhIGtleSwgYW5kIGEgYm9vbGVhbiwgYW5kIHJldHVybnMgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBjdXJyZW50IG9iamVjdCBiZWluZyBpdGVyYXRlZCBvdmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGRvdHMgLSBJZiB0cnVlLCB0aGUga2V5IHdpbGwgYmUgcmVuZGVyZWQgd2l0aCBkb3RzIGluc3RlYWQgb2YgYnJhY2tldHMuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICovXG5mdW5jdGlvbiByZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSB7XG4gIGlmICghcGF0aCkgcmV0dXJuIGtleTtcbiAgcmV0dXJuIHBhdGhcbiAgICAuY29uY2F0KGtleSlcbiAgICAubWFwKGZ1bmN0aW9uIGVhY2godG9rZW4sIGkpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgdG9rZW4gPSByZW1vdmVCcmFja2V0cyh0b2tlbik7XG4gICAgICByZXR1cm4gIWRvdHMgJiYgaSA/ICdbJyArIHRva2VuICsgJ10nIDogdG9rZW47XG4gICAgfSlcbiAgICAuam9pbihkb3RzID8gJy4nIDogJycpO1xufVxuXG4vKipcbiAqIElmIHRoZSBhcnJheSBpcyBhbiBhcnJheSBhbmQgbm9uZSBvZiBpdHMgZWxlbWVudHMgYXJlIHZpc2l0YWJsZSwgdGhlbiBpdCdzIGEgZmxhdCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0ZsYXRBcnJheShhcnIpIHtcbiAgcmV0dXJuIHV0aWxzLmlzQXJyYXkoYXJyKSAmJiAhYXJyLnNvbWUoaXNWaXNpdGFibGUpO1xufVxuXG5jb25zdCBwcmVkaWNhdGVzID0gdXRpbHMudG9GbGF0T2JqZWN0KHV0aWxzLCB7fSwgbnVsbCwgZnVuY3Rpb24gZmlsdGVyKHByb3ApIHtcbiAgcmV0dXJuIC9eaXNbQS1aXS8udGVzdChwcm9wKTtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBkYXRhIG9iamVjdCB0byBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7P09iamVjdH0gW2Zvcm1EYXRhXVxuICogQHBhcmFtIHs/T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZpc2l0b3JdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1ldGFUb2tlbnMgPSB0cnVlXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kb3RzID0gZmFsc2VdXG4gKiBAcGFyYW0gez9Cb29sZWFufSBbb3B0aW9ucy5pbmRleGVzID0gZmFsc2VdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqKi9cblxuLyoqXG4gKiBJdCBjb252ZXJ0cyBhbiBvYmplY3QgaW50byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGZvcm0gZGF0YS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSAtIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gYXBwZW5kIHRvLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zXG4gKlxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gdG9Gb3JtRGF0YShvYmosIGZvcm1EYXRhLCBvcHRpb25zKSB7XG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RhcmdldCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGZvcm1EYXRhID0gZm9ybURhdGEgfHwgbmV3IChQbGF0Zm9ybUZvcm1EYXRhIHx8IEZvcm1EYXRhKSgpO1xuXG4gIGNvbnN0IG9wdGlvbiA9IChuYW1lLCBmYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gdXRpbHMuZ2V0U2FmZVByb3Aob3B0aW9ucywgbmFtZSk7XG4gICAgcmV0dXJuIHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSA/IGZhbGxiYWNrIDogdmFsdWU7XG4gIH07XG5cbiAgY29uc3QgbWV0YVRva2VucyA9IG9wdGlvbignbWV0YVRva2VucycsIHRydWUpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgY29uc3QgdmlzaXRvciA9IG9wdGlvbigndmlzaXRvcicpIHx8IGRlZmF1bHRWaXNpdG9yO1xuICBjb25zdCBkb3RzID0gb3B0aW9uKCdkb3RzJywgZmFsc2UpO1xuICBjb25zdCBpbmRleGVzID0gb3B0aW9uKCdpbmRleGVzJywgZmFsc2UpO1xuICBjb25zdCBfQmxvYiA9IG9wdGlvbignQmxvYicpIHx8ICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgQmxvYik7XG4gIGNvbnN0IG1heERlcHRoID0gb3B0aW9uKCdtYXhEZXB0aCcsIERFRkFVTFRfRk9STV9EQVRBX01BWF9ERVBUSCk7XG4gIGNvbnN0IHVzZUJsb2IgPSBfQmxvYiAmJiB1dGlscy5pc1NwZWNDb21wbGlhbnRGb3JtKGZvcm1EYXRhKTtcbiAgY29uc3Qgc3RhY2sgPSBbXTtcblxuICBpZiAoIXV0aWxzLmlzRnVuY3Rpb24odmlzaXRvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2aXNpdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udmVydFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gJyc7XG5cbiAgICBpZiAodXRpbHMuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICghdXNlQmxvYiAmJiB1dGlscy5pc0Jsb2IodmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignQmxvYiBpcyBub3Qgc3VwcG9ydGVkLiBVc2UgYSBCdWZmZXIgaW5zdGVhZC4nKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHwgdXRpbHMuaXNUeXBlZEFycmF5KHZhbHVlKSkge1xuICAgICAgaWYgKHVzZUJsb2IgJiYgdHlwZW9mIF9CbG9iID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgX0Jsb2IoW3ZhbHVlXSk7XG4gICAgICB9XG4gICAgICBpZiAoUGxhdGZvcm1CdWZmZXIgJiYgUGxhdGZvcm1CdWZmZXIuaXNCdWZmZXJBdmFpbGFibGUoKSkge1xuICAgICAgICByZXR1cm4gUGxhdGZvcm1CdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgJ0Jsb2IgaXMgbm90IHN1cHBvcnRlZC4gVXNlIGEgQnVmZmVyIGluc3RlYWQuJyxcbiAgICAgICAgQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gdGhyb3dJZk1heERlcHRoRXhjZWVkZWQoZGVwdGgpIHtcbiAgICBpZiAoZGVwdGggPiBtYXhEZXB0aCkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICdPYmplY3QgaXMgdG9vIGRlZXBseSBuZXN0ZWQgKCcgKyBkZXB0aCArICcgbGV2ZWxzKS4gTWF4IGRlcHRoOiAnICsgbWF4RGVwdGgsXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0ZPUk1fREFUQV9ERVBUSF9FWENFRURFRFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdHJpbmdpZnlXaXRoRGVwdGhMaW1pdCh2YWx1ZSwgZGVwdGgpIHtcbiAgICBpZiAobWF4RGVwdGggPT09IEluZmluaXR5KSB7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIH1cblxuICAgIGNvbnN0IGFuY2VzdG9ycyA9IFtdO1xuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlLCBmdW5jdGlvbiBsaW1pdERlcHRoKF9rZXksIGN1cnJlbnRWYWx1ZSkge1xuICAgICAgaWYgKCF1dGlscy5pc09iamVjdChjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50VmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChhbmNlc3RvcnMubGVuZ3RoICYmIGFuY2VzdG9yc1thbmNlc3RvcnMubGVuZ3RoIC0gMV0gIT09IHRoaXMpIHtcbiAgICAgICAgYW5jZXN0b3JzLnBvcCgpO1xuICAgICAgfVxuXG4gICAgICBhbmNlc3RvcnMucHVzaChjdXJyZW50VmFsdWUpO1xuICAgICAgdGhyb3dJZk1heERlcHRoRXhjZWVkZWQoZGVwdGggKyBhbmNlc3RvcnMubGVuZ3RoIC0gMSk7XG5cbiAgICAgIHJldHVybiBjdXJyZW50VmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVmYXVsdCB2aXNpdG9yLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0ga2V5XG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nfE51bWJlcj59IHBhdGhcbiAgICogQHRoaXMge0Zvcm1EYXRhfVxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gcmV0dXJuIHRydWUgdG8gdmlzaXQgdGhlIGVhY2ggcHJvcCBvZiB0aGUgdmFsdWUgcmVjdXJzaXZlbHlcbiAgICovXG4gIGZ1bmN0aW9uIGRlZmF1bHRWaXNpdG9yKHZhbHVlLCBrZXksIHBhdGgpIHtcbiAgICBsZXQgYXJyID0gdmFsdWU7XG5cbiAgICBpZiAodXRpbHMuaXNSZWFjdE5hdGl2ZShmb3JtRGF0YSkgJiYgdXRpbHMuaXNSZWFjdE5hdGl2ZUJsb2IodmFsdWUpKSB7XG4gICAgICBmb3JtRGF0YS5hcHBlbmQocmVuZGVyS2V5KHBhdGgsIGtleSwgZG90cyksIGNvbnZlcnRWYWx1ZSh2YWx1ZSkpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSAmJiAhcGF0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodXRpbHMuZW5kc1dpdGgoa2V5LCAne30nKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gbWV0YVRva2VucyA/IGtleSA6IGtleS5zbGljZSgwLCAtMik7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICB2YWx1ZSA9IHN0cmluZ2lmeVdpdGhEZXB0aExpbWl0KHZhbHVlLCAxKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICh1dGlscy5pc0FycmF5KHZhbHVlKSAmJiBpc0ZsYXRBcnJheSh2YWx1ZSkpIHx8XG4gICAgICAgICgodXRpbHMuaXNGaWxlTGlzdCh2YWx1ZSkgfHwgdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSkgJiYgKGFyciA9IHV0aWxzLnRvQXJyYXkodmFsdWUpKSlcbiAgICAgICkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gcmVtb3ZlQnJhY2tldHMoa2V5KTtcblxuICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiBlYWNoKGVsLCBpbmRleCkge1xuICAgICAgICAgICEodXRpbHMuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJlxuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKFxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgICAgICAgICAgICAgaW5kZXhlcyA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgID8gcmVuZGVyS2V5KFtrZXldLCBpbmRleCwgZG90cylcbiAgICAgICAgICAgICAgICA6IGluZGV4ZXMgPT09IG51bGxcbiAgICAgICAgICAgICAgICAgID8ga2V5XG4gICAgICAgICAgICAgICAgICA6IGtleSArICdbXScsXG4gICAgICAgICAgICAgIGNvbnZlcnRWYWx1ZShlbClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzVmlzaXRhYmxlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9ybURhdGEuYXBwZW5kKHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpLCBjb252ZXJ0VmFsdWUodmFsdWUpKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGV4cG9zZWRIZWxwZXJzID0gT2JqZWN0LmFzc2lnbihwcmVkaWNhdGVzLCB7XG4gICAgZGVmYXVsdFZpc2l0b3IsXG4gICAgY29udmVydFZhbHVlLFxuICAgIGlzVmlzaXRhYmxlLFxuICB9KTtcblxuICBmdW5jdGlvbiBidWlsZCh2YWx1ZSwgcGF0aCwgZGVwdGggPSAwKSB7XG4gICAgaWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgdGhyb3dJZk1heERlcHRoRXhjZWVkZWQoZGVwdGgpO1xuXG4gICAgaWYgKHN0YWNrLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgZGV0ZWN0ZWQgaW4gJyArIHBhdGguam9pbignLicpKTtcbiAgICB9XG5cbiAgICBzdGFjay5wdXNoKHZhbHVlKTtcblxuICAgIHV0aWxzLmZvckVhY2godmFsdWUsIGZ1bmN0aW9uIGVhY2goZWwsIGtleSkge1xuICAgICAgY29uc3QgcmVzdWx0ID1cbiAgICAgICAgISh1dGlscy5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmXG4gICAgICAgIHZpc2l0b3IuY2FsbChmb3JtRGF0YSwgZWwsIHV0aWxzLmlzU3RyaW5nKGtleSkgPyBrZXkudHJpbSgpIDoga2V5LCBwYXRoLCBleHBvc2VkSGVscGVycyk7XG5cbiAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgYnVpbGQoZWwsIHBhdGggPyBwYXRoLmNvbmNhdChrZXkpIDogW2tleV0sIGRlcHRoICsgMSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzdGFjay5wb3AoKTtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2RhdGEgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIGJ1aWxkKG9iaik7XG5cbiAgcmV0dXJuIGZvcm1EYXRhO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b0Zvcm1EYXRhO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgb3B0aW9ucykge1xuICByZXR1cm4gdG9Gb3JtRGF0YShkYXRhLCBuZXcgcGxhdGZvcm0uY2xhc3Nlcy5VUkxTZWFyY2hQYXJhbXMoKSwge1xuICAgIHZpc2l0b3I6IGZ1bmN0aW9uICh2YWx1ZSwga2V5LCBwYXRoLCBoZWxwZXJzKSB7XG4gICAgICBpZiAocGxhdGZvcm0uaXNOb2RlICYmIHV0aWxzLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgICB0aGlzLmFwcGVuZChrZXksIHZhbHVlLnRvU3RyaW5nKCdiYXNlNjQnKSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlbHBlcnMuZGVmYXVsdFZpc2l0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIC4uLm9wdGlvbnMsXG4gIH0pO1xufVxuIiwiZXhwb3J0IGNvbnN0IHN0cmVhbUNodW5rID0gZnVuY3Rpb24qIChjaHVuaywgY2h1bmtTaXplKSB7XG4gIGxldCBsZW4gPSBjaHVuay5ieXRlTGVuZ3RoO1xuXG4gIGlmICghY2h1bmtTaXplIHx8IGxlbiA8IGNodW5rU2l6ZSkge1xuICAgIHlpZWxkIGNodW5rO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBwb3MgPSAwO1xuICBsZXQgZW5kO1xuXG4gIHdoaWxlIChwb3MgPCBsZW4pIHtcbiAgICBlbmQgPSBwb3MgKyBjaHVua1NpemU7XG4gICAgeWllbGQgY2h1bmsuc2xpY2UocG9zLCBlbmQpO1xuICAgIHBvcyA9IGVuZDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlYWRCeXRlcyA9IGFzeW5jIGZ1bmN0aW9uKiAoaXRlcmFibGUsIGNodW5rU2l6ZSkge1xuICBmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIHJlYWRTdHJlYW0oaXRlcmFibGUpKSB7XG4gICAgeWllbGQqIHN0cmVhbUNodW5rKGNodW5rLCBjaHVua1NpemUpO1xuICB9XG59O1xuXG5jb25zdCByZWFkU3RyZWFtID0gYXN5bmMgZnVuY3Rpb24qIChzdHJlYW0pIHtcbiAgaWYgKHN0cmVhbVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0pIHtcbiAgICB5aWVsZCogc3RyZWFtO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5nZXRSZWFkZXIoKTtcbiAgdHJ5IHtcbiAgICBmb3IgKDs7KSB7XG4gICAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB5aWVsZCB2YWx1ZTtcbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgYXdhaXQgcmVhZGVyLmNhbmNlbCgpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgdHJhY2tTdHJlYW0gPSAoc3RyZWFtLCBjaHVua1NpemUsIG9uUHJvZ3Jlc3MsIG9uRmluaXNoKSA9PiB7XG4gIGNvbnN0IGl0ZXJhdG9yID0gcmVhZEJ5dGVzKHN0cmVhbSwgY2h1bmtTaXplKTtcblxuICBsZXQgYnl0ZXMgPSAwO1xuICBsZXQgZG9uZTtcbiAgbGV0IF9vbkZpbmlzaCA9IChlKSA9PiB7XG4gICAgaWYgKCFkb25lKSB7XG4gICAgICBkb25lID0gdHJ1ZTtcbiAgICAgIG9uRmluaXNoICYmIG9uRmluaXNoKGUpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbmV3IFJlYWRhYmxlU3RyZWFtKFxuICAgIHtcbiAgICAgIGFzeW5jIHB1bGwoY29udHJvbGxlcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IGF3YWl0IGl0ZXJhdG9yLm5leHQoKTtcblxuICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICBfb25GaW5pc2goKTtcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuY2xvc2UoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgbGVuID0gdmFsdWUuYnl0ZUxlbmd0aDtcbiAgICAgICAgICBpZiAob25Qcm9ncmVzcykge1xuICAgICAgICAgICAgbGV0IGxvYWRlZEJ5dGVzID0gKGJ5dGVzICs9IGxlbik7XG4gICAgICAgICAgICBvblByb2dyZXNzKGxvYWRlZEJ5dGVzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKG5ldyBVaW50OEFycmF5KHZhbHVlKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIF9vbkZpbmlzaChlcnIpO1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNhbmNlbChyZWFzb24pIHtcbiAgICAgICAgX29uRmluaXNoKHJlYXNvbik7XG4gICAgICAgIHJldHVybiBpdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBoaWdoV2F0ZXJNYXJrOiAyLFxuICAgIH1cbiAgKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IFZFUlNJT04gfSBmcm9tICcuLi9lbnYvZGF0YS5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuXG5jb25zdCB2YWxpZGF0b3JzID0ge307XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5bJ29iamVjdCcsICdib29sZWFuJywgJ251bWJlcicsICdmdW5jdGlvbicsICdzdHJpbmcnLCAnc3ltYm9sJ10uZm9yRWFjaCgodHlwZSwgaSkgPT4ge1xuICB2YWxpZGF0b3JzW3R5cGVdID0gZnVuY3Rpb24gdmFsaWRhdG9yKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gdHlwZSB8fCAnYScgKyAoaSA8IDEgPyAnbiAnIDogJyAnKSArIHR5cGU7XG4gIH07XG59KTtcblxuY29uc3QgZGVwcmVjYXRlZFdhcm5pbmdzID0ge307XG5cbi8qKlxuICogVHJhbnNpdGlvbmFsIG9wdGlvbiB2YWxpZGF0b3JcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufGJvb2xlYW4/fSB2YWxpZGF0b3IgLSBzZXQgdG8gZmFsc2UgaWYgdGhlIHRyYW5zaXRpb25hbCBvcHRpb24gaGFzIGJlZW4gcmVtb3ZlZFxuICogQHBhcmFtIHtzdHJpbmc/fSB2ZXJzaW9uIC0gZGVwcmVjYXRlZCB2ZXJzaW9uIC8gcmVtb3ZlZCBzaW5jZSB2ZXJzaW9uXG4gKiBAcGFyYW0ge3N0cmluZz99IG1lc3NhZ2UgLSBzb21lIG1lc3NhZ2Ugd2l0aCBhZGRpdGlvbmFsIGluZm9cbiAqXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbnZhbGlkYXRvcnMudHJhbnNpdGlvbmFsID0gZnVuY3Rpb24gdHJhbnNpdGlvbmFsKHZhbGlkYXRvciwgdmVyc2lvbiwgbWVzc2FnZSkge1xuICBmdW5jdGlvbiBmb3JtYXRNZXNzYWdlKG9wdCwgZGVzYykge1xuICAgIHJldHVybiAoXG4gICAgICAnW0F4aW9zIHYnICtcbiAgICAgIFZFUlNJT04gK1xuICAgICAgXCJdIFRyYW5zaXRpb25hbCBvcHRpb24gJ1wiICtcbiAgICAgIG9wdCArXG4gICAgICBcIidcIiArXG4gICAgICBkZXNjICtcbiAgICAgIChtZXNzYWdlID8gJy4gJyArIG1lc3NhZ2UgOiAnJylcbiAgICApO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuICh2YWx1ZSwgb3B0LCBvcHRzKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKG9wdCwgJyBoYXMgYmVlbiByZW1vdmVkJyArICh2ZXJzaW9uID8gJyBpbiAnICsgdmVyc2lvbiA6ICcnKSksXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0RFUFJFQ0FURURcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24gJiYgIWRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdKSB7XG4gICAgICBkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICAnIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdicgKyB2ZXJzaW9uICsgJyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZWFyIGZ1dHVyZSdcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yID8gdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdHMpIDogdHJ1ZTtcbiAgfTtcbn07XG5cbnZhbGlkYXRvcnMuc3BlbGxpbmcgPSBmdW5jdGlvbiBzcGVsbGluZyhjb3JyZWN0U3BlbGxpbmcpIHtcbiAgcmV0dXJuICh2YWx1ZSwgb3B0KSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLndhcm4oYCR7b3B0fSBpcyBsaWtlbHkgYSBtaXNzcGVsbGluZyBvZiAke2NvcnJlY3RTcGVsbGluZ31gKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn07XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCdzIHByb3BlcnRpZXMgdHlwZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBhbGxvd1Vua25vd25cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIGFzc2VydE9wdGlvbnMob3B0aW9ucywgc2NoZW1hLCBhbGxvd1Vua25vd24pIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JyB8fCBvcHRpb25zID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnLCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgY29uc3Qgb3B0ID0ga2V5c1tpXTtcbiAgICAvLyBVc2UgaGFzT3duUHJvcGVydHkgc28gYSBwb2xsdXRlZCBPYmplY3QucHJvdG90eXBlLjxvcHQ+IGNhbm5vdCBzdXBwbHlcbiAgICAvLyBhIG5vbi1mdW5jdGlvbiB2YWxpZGF0b3IgYW5kIGNhdXNlIGEgVHlwZUVycm9yLlxuICAgIGNvbnN0IHZhbGlkYXRvciA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzY2hlbWEsIG9wdCkgPyBzY2hlbWFbb3B0XSA6IHVuZGVmaW5lZDtcbiAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdGlvbnMpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAnb3B0aW9uICcgKyBvcHQgKyAnIG11c3QgYmUgJyArIHJlc3VsdCxcbiAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGFsbG93VW5rbm93biAhPT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ1Vua25vd24gb3B0aW9uICcgKyBvcHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT04pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFzc2VydE9wdGlvbnMsXG4gIHZhbGlkYXRvcnMsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgPyBCbG9iIDogbnVsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEZvcm1EYXRhIDogbnVsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgPyBVUkxTZWFyY2hQYXJhbXMgOiBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsImltcG9ydCBVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi9jbGFzc2VzL1VSTFNlYXJjaFBhcmFtcy5qcyc7XG5pbXBvcnQgRm9ybURhdGEgZnJvbSAnLi9jbGFzc2VzL0Zvcm1EYXRhLmpzJztcbmltcG9ydCBCbG9iIGZyb20gJy4vY2xhc3Nlcy9CbG9iLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0Jyb3dzZXI6IHRydWUsXG4gIGNsYXNzZXM6IHtcbiAgICBVUkxTZWFyY2hQYXJhbXMsXG4gICAgRm9ybURhdGEsXG4gICAgQmxvYixcbiAgfSxcbiAgcHJvdG9jb2xzOiBbJ2h0dHAnLCAnaHR0cHMnLCAnZmlsZScsICdibG9iJywgJ3VybCcsICdkYXRhJ10sXG59O1xuIiwiY29uc3QgaGFzQnJvd3NlckVudiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbmNvbnN0IF9uYXZpZ2F0b3IgPSAodHlwZW9mIG5hdmlnYXRvciA9PT0gJ29iamVjdCcgJiYgbmF2aWdhdG9yKSB8fCB1bmRlZmluZWQ7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJFbnYgPVxuICBoYXNCcm93c2VyRW52ICYmXG4gICghX25hdmlnYXRvciB8fCBbJ1JlYWN0TmF0aXZlJywgJ05hdGl2ZVNjcmlwdCcsICdOUyddLmluZGV4T2YoX25hdmlnYXRvci5wcm9kdWN0KSA8IDApO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciB3ZWJXb3JrZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBBbHRob3VnaCB0aGUgYGlzU3RhbmRhcmRCcm93c2VyRW52YCBtZXRob2QgaW5kaWNhdGVzIHRoYXRcbiAqIGBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlcmAsIHRoZSBXZWJXb3JrZXIgd2lsbCBzdGlsbCBiZVxuICogZmlsdGVyZWQgb3V0IGR1ZSB0byBpdHMganVkZ21lbnQgc3RhbmRhcmRcbiAqIGB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnYC5cbiAqIFRoaXMgbGVhZHMgdG8gYSBwcm9ibGVtIHdoZW4gYXhpb3MgcG9zdCBgRm9ybURhdGFgIGluIHdlYldvcmtlclxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYgPSAoKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiZcbiAgICB0eXBlb2Ygc2VsZi5pbXBvcnRTY3JpcHRzID09PSAnZnVuY3Rpb24nXG4gICk7XG59KSgpO1xuXG5jb25zdCBvcmlnaW4gPSAoaGFzQnJvd3NlckVudiAmJiB3aW5kb3cubG9jYXRpb24uaHJlZikgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnO1xuXG5leHBvcnQge1xuICBoYXNCcm93c2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlckVudixcbiAgX25hdmlnYXRvciBhcyBuYXZpZ2F0b3IsXG4gIG9yaWdpbixcbn07XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi9ub2RlL2luZGV4LmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vY29tbW9uL3V0aWxzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAuLi51dGlscyxcbiAgLi4ucGxhdGZvcm0sXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbmNvbnN0IHsgdG9TdHJpbmcgfSA9IE9iamVjdC5wcm90b3R5cGU7XG5jb25zdCB7IGdldFByb3RvdHlwZU9mIH0gPSBPYmplY3Q7XG5jb25zdCB7IGl0ZXJhdG9yLCB0b1N0cmluZ1RhZyB9ID0gU3ltYm9sO1xuXG4vKiBDcmVhdGluZyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjaGVjayBpZiBhbiBvYmplY3QgaGFzIGEgcHJvcGVydHkuICovXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9IChcbiAgKHsgaGFzT3duUHJvcGVydHkgfSkgPT5cbiAgKG9iaiwgcHJvcCkgPT5cbiAgICBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcClcbikoT2JqZWN0LnByb3RvdHlwZSk7XG5cbmNvbnN0IGlzVW5zYWZlT2JqZWN0S2V5ID0gKHByb3ApID0+XG4gIHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJyAmJlxuICAocHJvcCA9PT0gJ19fcHJvdG9fXycgfHwgcHJvcCA9PT0gJ2NvbnN0cnVjdG9yJyB8fCBwcm9wID09PSAncHJvdG90eXBlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgYW4gaW5oZXJpdGVkIG9iamVjdCBtdXN0IGJlIHRyZWF0ZWQgYXMgYSBzaGFyZWQtcHJvdG90eXBlXG4gKiBib3VuZGFyeS4gQ3Jvc3MtcmVhbG0gT2JqZWN0LnByb3RvdHlwZSBvYmplY3RzIGNhbm5vdCBiZSBkaXN0aW5ndWlzaGVkXG4gKiByZWxpYWJseSBmcm9tIGFwcGxpY2F0aW9uLWNyZWF0ZWQgbnVsbC1wcm90b3R5cGUgb2JqZWN0cyBiZWNhdXNlIHRoZWlyXG4gKiBwcm9wZXJ0aWVzIGFyZSBtdXRhYmxlLCBzbyBhbGwgaW5oZXJpdGVkIHRlcm1pbmFsIHByb3RvdHlwZXMgYXJlIGV4Y2x1ZGVkXG4gKiBhcyBhIGZhaWwtY2xvc2VkIGJvdW5kYXJ5LiBBIG51bGwtcHJvdG90eXBlIHNvdXJjZSBzdGlsbCBrZWVwcyBpdHMgb3duXG4gKiBwcm9wZXJ0aWVzLCBhcyBwcm9kdWNlZCBieSBtZXJnZUNvbmZpZyBhbmQgb3RoZXIgc2FmZSBtYXRlcmlhbGl6YXRpb24gcGF0aHMuXG4gKlxuICogQHBhcmFtIHsqfSBvYmogVGhlIG9iamVjdCB0byBpbnNwZWN0XG4gKiBAcGFyYW0geyp9IHByb3RvdHlwZSBUaGUgb2JqZWN0J3MgcHJvdG90eXBlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNvdXJjZSBXaGV0aGVyIG9iaiBpcyB0aGUgb3JpZ2luYWwgdHJhdmVyc2FsIHNvdXJjZVxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIHdoZW4gb2JqIGlzIGEgc2FmZSBwcm90b3R5cGUgdHJhdmVyc2FsIGJvdW5kYXJ5XG4gKi9cbmNvbnN0IGlzUHJvdG90eXBlQm91bmRhcnkgPSAob2JqLCBwcm90b3R5cGUsIHNvdXJjZSkgPT5cbiAgb2JqID09PSBPYmplY3QucHJvdG90eXBlIHx8ICghc291cmNlICYmIHByb3RvdHlwZSA9PT0gbnVsbCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgYW4gb2JqZWN0IGNhbiByZXRhaW4gaXRzIGlkZW50aXR5IHRocm91Z2ggY29kZSBwYXRocyB0aGF0XG4gKiBhZGQsIHJlcGxhY2UsIGFuZCByZW1vdmUgY29uZmlnIHByb3BlcnRpZXMgd2l0aG91dCBieXBhc3NpbmcgdW5zYWZlLWtleVxuICogZmlsdGVyaW5nLiBJbW11dGFibGUgb2JqZWN0cywgdW5zYWZlLWtleS1iZWFyaW5nIG9iamVjdHMsIGFuZCBvYmplY3RzIHdpdGhcbiAqIGFjY2Vzc29yIG9yIHJlc3RyaWN0ZWQgZGF0YSBwcm9wZXJ0aWVzIG11c3QgYmUgbWF0ZXJpYWxpemVkIGluc3RlYWQuXG4gKlxuICogQHBhcmFtIHsqfSBvYmogVGhlIG9iamVjdCB0byBpbnNwZWN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgd2hlbiBldmVyeSBvd24gcHJvcGVydHkgaXMgc2FmZSBhbmQgZnVsbHkgbXV0YWJsZVxuICovXG5jb25zdCBpc1NhZmVBbmRGdWxseU11dGFibGUgPSAob2JqKSA9PiB7XG4gIGlmICghT2JqZWN0LmlzRXh0ZW5zaWJsZShvYmopKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xuXG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgcHJvcHMucHVzaCguLi5PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iaikpO1xuICB9XG5cbiAgcmV0dXJuIHByb3BzLmV2ZXJ5KChwcm9wKSA9PiB7XG4gICAgaWYgKGlzVW5zYWZlT2JqZWN0S2V5KHByb3ApKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBwcm9wKTtcblxuICAgIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5jb25maWd1cmFibGUgJiYgZGVzY3JpcHRvci53cml0YWJsZSA9PT0gdHJ1ZTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFdhbGsgdGhlIHByb3RvdHlwZSBjaGFpbiAoZXhjbHVkaW5nIHRoZSBzb3VyY2UgcmVhbG0ncyBPYmplY3QucHJvdG90eXBlKVxuICogbG9va2luZyBmb3IgYW4gb3duIGBwcm9wYC4gVGhpcyBkaXN0aW5ndWlzaGVzIGdlbnVpbmUgb3duL2luaGVyaXRlZCBtZW1iZXJzXG4gKiDigJQgaW5jbHVkaW5nIGNsYXNzIGFjY2Vzc29ycyBhbmQgdGVtcGxhdGUgcHJvdG90eXBlcyDigJQgZnJvbSBtZW1iZXJzIGluamVjdGVkXG4gKiB2aWEgT2JqZWN0LnByb3RvdHlwZSBwb2xsdXRpb24gKGUuZy4gYE9iamVjdC5wcm90b3R5cGUudXNlcm5hbWUgPSAnLi4uJ2ApLFxuICogd2hpY2ggbGl2ZSBvbiBPYmplY3QucHJvdG90eXBlIGl0c2VsZiBhbmQgYXJlIHRoZXJlZm9yZSBuZXZlciBtYXRjaGVkLlxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHdob3NlIGNoYWluIHRvIGluc3BlY3RcbiAqIEBwYXJhbSB7c3RyaW5nfHN5bWJvbH0gcHJvcCBUaGUgcHJvcGVydHkga2V5IHRvIGxvb2sgZm9yXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgd2hlbiBgcHJvcGAgaXMgb3duZWQgYmVsb3cgT2JqZWN0LnByb3RvdHlwZVxuICovXG5jb25zdCBoYXNPd25JblByb3RvdHlwZUNoYWluID0gKHRoaW5nLCBwcm9wKSA9PiB7XG4gIGxldCBvYmogPSB0aGluZztcbiAgY29uc3Qgc2VlbiA9IFtdO1xuXG4gIHdoaWxlIChvYmogIT0gbnVsbCkge1xuICAgIGlmIChzZWVuLmluZGV4T2Yob2JqKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc2Vlbi5wdXNoKG9iaik7XG5cbiAgICBjb25zdCBwcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihvYmopO1xuXG4gICAgaWYgKGlzUHJvdG90eXBlQm91bmRhcnkob2JqLCBwcm90b3R5cGUsIG9iaiA9PT0gdGhpbmcpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBvYmogPSBwcm90b3R5cGU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZWFkIGBvYmpbcHJvcF1gIG9ubHkgd2hlbiBpdCBpcyBzYWZlIGZyb20gT2JqZWN0LnByb3RvdHlwZSBwb2xsdXRpb24uIE93blxuICogcHJvcGVydGllcyBhbmQgbWVtYmVycyBpbmhlcml0ZWQgZnJvbSBhIG5vbi1PYmplY3QucHJvdG90eXBlIHNvdXJjZSAoYSBjbGFzc1xuICogaW5zdGFuY2Ugb3IgdGVtcGxhdGUgb2JqZWN0KSBhcmUgaG9ub3JlZDsgYSB2YWx1ZSByZWFjaGFibGUgb25seSB0aHJvdWdoIGFcbiAqIHBvbGx1dGVkIE9iamVjdC5wcm90b3R5cGUgaXMgaWdub3JlZCBhbmQgYHVuZGVmaW5lZGAgaXMgcmV0dXJuZWQuXG4gKlxuICogQHBhcmFtIHsqfSBvYmogVGhlIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7c3RyaW5nfHN5bWJvbH0gcHJvcCBUaGUgcHJvcGVydHkga2V5IHRvIHJlYWRcbiAqXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc29sdmVkIHZhbHVlLCBvciB1bmRlZmluZWQgd2hlbiB1bnNhZmUvYWJzZW50XG4gKi9cbmNvbnN0IGdldFNhZmVQcm9wID0gKG9iaiwgcHJvcCkgPT5cbiAgb2JqICE9IG51bGwgJiYgaGFzT3duSW5Qcm90b3R5cGVDaGFpbihvYmosIHByb3ApID8gb2JqW3Byb3BdIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEZsYXR0ZW4gYW4gb2JqZWN0IGFuZCBpdHMgYXBwbGljYXRpb24tZGVmaW5lZCBwcm90b3R5cGUgY2hhaW4gaW50byBhXG4gKiBudWxsLXByb3RvdHlwZSBvYmplY3QuIE1lbWJlcnMgaW5oZXJpdGVkIG9ubHkgZnJvbSB0aGUgc291cmNlIHJlYWxtJ3NcbiAqIE9iamVjdC5wcm90b3R5cGUgYXJlIGRlbGliZXJhdGVseSBleGNsdWRlZCwgd2hpbGUgY2xhc3MvdGVtcGxhdGUgbWVtYmVyc1xuICogYmVsb3cgdGhhdCBib3VuZGFyeSBhcmUgcHJlc2VydmVkLlxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIGZsYXR0ZW5cbiAqXG4gKiBAcmV0dXJucyB7Kn0gQSBudWxsLXByb3RvdHlwZSBjb3B5LCBvciB0aGUgb3JpZ2luYWwgdmFsdWUgd2hlbiBpdCBpcyBhbHJlYWR5XG4gKiBzdHJ1Y3R1cmFsbHkgc2FmZSBvciBpcyBub3QgYW4gb2JqZWN0XG4gKi9cbmNvbnN0IHRvU2FmZUZsYXRPYmplY3QgPSAodGhpbmcpID0+IHtcbiAgaWYgKHRoaW5nID09IG51bGwgfHwgKHR5cGVvZiB0aGluZyAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIHRoaW5nICE9PSAnZnVuY3Rpb24nKSkge1xuICAgIHJldHVybiB0aGluZztcbiAgfVxuXG4gIGNvbnN0IHNvdXJjZVByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKHRoaW5nKTtcblxuICBpZiAoc291cmNlUHJvdG90eXBlID09PSBudWxsICYmIGlzU2FmZUFuZEZ1bGx5TXV0YWJsZSh0aGluZykpIHtcbiAgICByZXR1cm4gdGhpbmc7XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBjb25zdCBtZXJnZWQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBjb25zdCBzZWVuID0gW107XG4gIGxldCBjdXJyZW50ID0gdGhpbmc7XG5cbiAgd2hpbGUgKGN1cnJlbnQgIT0gbnVsbCkge1xuICAgIGlmIChzZWVuLmluZGV4T2YoY3VycmVudCkgIT09IC0xKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzZWVuLnB1c2goY3VycmVudCk7XG5cbiAgICBjb25zdCBwcm90b3R5cGUgPSBjdXJyZW50ID09PSB0aGluZyA/IHNvdXJjZVByb3RvdHlwZSA6IGdldFByb3RvdHlwZU9mKGN1cnJlbnQpO1xuXG4gICAgaWYgKGlzUHJvdG90eXBlQm91bmRhcnkoY3VycmVudCwgcHJvdG90eXBlLCBjdXJyZW50ID09PSB0aGluZykpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCk7XG5cbiAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAgcHJvcHMucHVzaCguLi5PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGN1cnJlbnQpKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcHMpIHtcbiAgICAgIGlmIChpc1Vuc2FmZU9iamVjdEtleShwcm9wKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShtZXJnZWQsIHByb3ApKSB7XG4gICAgICAgIHJlc3VsdFtwcm9wXSA9IHRoaW5nW3Byb3BdO1xuICAgICAgICBtZXJnZWRbcHJvcF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGN1cnJlbnQgPSBwcm90b3R5cGU7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuY29uc3Qga2luZE9mID0gKChjYWNoZSkgPT4gKHRoaW5nKSA9PiB7XG4gIGNvbnN0IHN0ciA9IHRvU3RyaW5nLmNhbGwodGhpbmcpO1xuICByZXR1cm4gY2FjaGVbc3RyXSB8fCAoY2FjaGVbc3RyXSA9IHN0ci5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKSk7XG59KShPYmplY3QuY3JlYXRlKG51bGwpKTtcblxuY29uc3Qga2luZE9mVGVzdCA9ICh0eXBlKSA9PiB7XG4gIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiAodGhpbmcpID0+IGtpbmRPZih0aGluZykgPT09IHR5cGU7XG59O1xuXG5jb25zdCB0eXBlT2ZUZXN0ID0gKHR5cGUpID0+ICh0aGluZykgPT4gdHlwZW9mIHRoaW5nID09PSB0eXBlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgbm9uLW51bGwgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgeyBpc0FycmF5IH0gPSBBcnJheTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VuZGVmaW5lZCA9IHR5cGVPZlRlc3QoJ3VuZGVmaW5lZCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gKFxuICAgIHZhbCAhPT0gbnVsbCAmJlxuICAgICFpc1VuZGVmaW5lZCh2YWwpICYmXG4gICAgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmXG4gICAgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcikgJiZcbiAgICBpc0Z1bmN0aW9uKHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcikgJiZcbiAgICB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKVxuICApO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQXJyYXlCdWZmZXIgPSBraW5kT2ZUZXN0KCdBcnJheUJ1ZmZlcicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIGxldCByZXN1bHQ7XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIEFycmF5QnVmZmVyLmlzVmlldykge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHZhbCAmJiB2YWwuYnVmZmVyICYmIGlzQXJyYXlCdWZmZXIodmFsLmJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmluZyA9IHR5cGVPZlRlc3QoJ3N0cmluZycpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRnVuY3Rpb24gPSB0eXBlT2ZUZXN0KCdmdW5jdGlvbicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzTnVtYmVyID0gdHlwZU9mVGVzdCgnbnVtYmVyJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpbmcgPT09ICdvYmplY3QnO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQm9vbGVhblxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQm9vbGVhbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQm9vbGVhbiA9ICh0aGluZykgPT4gdGhpbmcgPT09IHRydWUgfHwgdGhpbmcgPT09IGZhbHNlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUGxhaW5PYmplY3QgPSAodmFsKSA9PiB7XG4gIGlmICghaXNPYmplY3QodmFsKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiAoXG4gICAgKHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGUgfHwgZ2V0UHJvdG90eXBlT2YocHJvdG90eXBlKSA9PT0gbnVsbCkgJiZcbiAgICAvLyBUcmVhdCBzYWZlIG93bi9pbmhlcml0ZWQgU3ltYm9sLnRvU3RyaW5nVGFnIG9yIFN5bWJvbC5pdGVyYXRvciBtZW1iZXJzIGFzXG4gICAgLy8gZXZpZGVuY2UgdGhlIHZhbHVlIGlzIHRhZ2dlZC9pdGVyYWJsZSwgd2hpbGUgaWdub3JpbmcgbWVtYmVycyByZWFjaGFibGVcbiAgICAvLyBvbmx5IHRocm91Z2ggc2hhcmVkIG9yIHRlcm1pbmFsIHByb3RvdHlwZSBib3VuZGFyaWVzLlxuICAgICFoYXNPd25JblByb3RvdHlwZUNoYWluKHZhbCwgdG9TdHJpbmdUYWcpICYmXG4gICAgIWhhc093bkluUHJvdG90eXBlQ2hhaW4odmFsLCBpdGVyYXRvcilcbiAgKTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gZW1wdHkgb2JqZWN0IChzYWZlbHkgaGFuZGxlcyBCdWZmZXJzKVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gZW1wdHkgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNFbXB0eU9iamVjdCA9ICh2YWwpID0+IHtcbiAgLy8gRWFybHkgcmV0dXJuIGZvciBub24tb2JqZWN0cyBvciBCdWZmZXJzIHRvIHByZXZlbnQgUmFuZ2VFcnJvclxuICBpZiAoIWlzT2JqZWN0KHZhbCkgfHwgaXNCdWZmZXIodmFsKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoID09PSAwICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpID09PSBPYmplY3QucHJvdG90eXBlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gRmFsbGJhY2sgZm9yIGFueSBvdGhlciBvYmplY3RzIHRoYXQgbWlnaHQgY2F1c2UgUmFuZ2VFcnJvciB3aXRoIE9iamVjdC5rZXlzKClcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGUgPSBraW5kT2ZUZXN0KCdGaWxlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBSZWFjdCBOYXRpdmUgQmxvYlxuICogUmVhY3QgTmF0aXZlIFwiYmxvYlwiOiBhbiBvYmplY3Qgd2l0aCBhIGB1cmlgIGF0dHJpYnV0ZS4gT3B0aW9uYWxseSwgaXQgY2FuXG4gKiBhbHNvIGhhdmUgYSBgbmFtZWAgYW5kIGB0eXBlYCBhdHRyaWJ1dGUgdG8gc3BlY2lmeSBmaWxlbmFtZSBhbmQgY29udGVudCB0eXBlXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL2Jsb2IvMjY2ODRjZjNhZGY0MDk0ZWI2YzQwNWQzNDVhNzViZjhjN2MwYmY4OC9MaWJyYXJpZXMvTmV0d29yay9Gb3JtRGF0YS5qcyNMNjgtTDcxXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVhY3QgTmF0aXZlIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1JlYWN0TmF0aXZlQmxvYiA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gISEodmFsdWUgJiYgdHlwZW9mIHZhbHVlLnVyaSAhPT0gJ3VuZGVmaW5lZCcpO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgZW52aXJvbm1lbnQgaXMgUmVhY3QgTmF0aXZlXG4gKiBSZWFjdE5hdGl2ZSBgRm9ybURhdGFgIGhhcyBhIG5vbi1zdGFuZGFyZCBgZ2V0UGFydHMoKWAgbWV0aG9kXG4gKlxuICogQHBhcmFtIHsqfSBmb3JtRGF0YSBUaGUgZm9ybURhdGEgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGVudmlyb25tZW50IGlzIFJlYWN0IE5hdGl2ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVhY3ROYXRpdmUgPSAoZm9ybURhdGEpID0+IGZvcm1EYXRhICYmIHR5cGVvZiBmb3JtRGF0YS5nZXRQYXJ0cyAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jsb2IgPSBraW5kT2ZUZXN0KCdCbG9iJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlTGlzdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlTGlzdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZUxpc3QgPSBraW5kT2ZUZXN0KCdGaWxlTGlzdCcpO1xuY29uc3QgaXNTZXQgPSBraW5kT2ZUZXN0KCdTZXQnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmVhbSA9ICh2YWwpID0+IGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGdldEdsb2JhbCgpIHtcbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBzZWxmO1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiB3aW5kb3c7XG4gIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGdsb2JhbDtcbiAgcmV0dXJuIHt9O1xufVxuXG5jb25zdCBHID0gZ2V0R2xvYmFsKCk7XG5jb25zdCBGb3JtRGF0YUN0b3IgPSB0eXBlb2YgRy5Gb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgPyBHLkZvcm1EYXRhIDogdW5kZWZpbmVkO1xuXG5jb25zdCBpc0Zvcm1EYXRhID0gKHRoaW5nKSA9PiB7XG4gIGlmICghdGhpbmcpIHJldHVybiBmYWxzZTtcbiAgaWYgKEZvcm1EYXRhQ3RvciAmJiB0aGluZyBpbnN0YW5jZW9mIEZvcm1EYXRhQ3RvcikgcmV0dXJuIHRydWU7XG4gIC8vIFJlamVjdCBwbGFpbiBvYmplY3RzIGluaGVyaXRpbmcgZGlyZWN0bHkgZnJvbSBPYmplY3QucHJvdG90eXBlIHNvIHByb3RvdHlwZS1wb2xsdXRpb24gZ2FkZ2V0cyBjYW4ndCBzcG9vZiBGb3JtRGF0YS5cbiAgY29uc3QgcHJvdG8gPSBnZXRQcm90b3R5cGVPZih0aGluZyk7XG4gIGlmICghcHJvdG8gfHwgcHJvdG8gPT09IE9iamVjdC5wcm90b3R5cGUpIHJldHVybiBmYWxzZTtcbiAgaWYgKCFpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qga2luZCA9IGtpbmRPZih0aGluZyk7XG4gIHJldHVybiAoXG4gICAga2luZCA9PT0gJ2Zvcm1kYXRhJyB8fFxuICAgIC8vIGRldGVjdCBmb3JtLWRhdGEgaW5zdGFuY2VcbiAgICAoa2luZCA9PT0gJ29iamVjdCcgJiYgaXNGdW5jdGlvbih0aGluZy50b1N0cmluZykgJiYgdGhpbmcudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgRm9ybURhdGFdJylcbiAgKTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VSTFNlYXJjaFBhcmFtcyA9IGtpbmRPZlRlc3QoJ1VSTFNlYXJjaFBhcmFtcycpO1xuXG5jb25zdCBbaXNSZWFkYWJsZVN0cmVhbSwgaXNSZXF1ZXN0LCBpc1Jlc3BvbnNlLCBpc0hlYWRlcnNdID0gW1xuICAnUmVhZGFibGVTdHJlYW0nLFxuICAnUmVxdWVzdCcsXG4gICdSZXNwb25zZScsXG4gICdIZWFkZXJzJyxcbl0ubWFwKGtpbmRPZlRlc3QpO1xuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5jb25zdCB0cmltID0gKHN0cikgPT4ge1xuICByZXR1cm4gc3RyLnRyaW0gPyBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG59O1xuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXk8dW5rbm93bj59IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYWxsT3duS2V5cyA9IGZhbHNlXVxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuLCB7IGFsbE93bktleXMgPSBmYWxzZSB9ID0ge30pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgaTtcbiAgbGV0IGw7XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEJ1ZmZlciBjaGVja1xuICAgIGlmIChpc0J1ZmZlcihvYmopKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgY29uc3Qga2V5cyA9IGFsbE93bktleXMgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopIDogT2JqZWN0LmtleXMob2JqKTtcbiAgICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQga2V5O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEZpbmRzIGEga2V5IGluIGFuIG9iamVjdCwgY2FzZS1pbnNlbnNpdGl2ZSwgcmV0dXJuaW5nIHRoZSBhY3R1YWwga2V5IG5hbWUuXG4gKiBSZXR1cm5zIG51bGwgaWYgdGhlIG9iamVjdCBpcyBhIEJ1ZmZlciBvciBpZiBubyBtYXRjaCBpcyBmb3VuZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gVGhlIG9iamVjdCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSB0byBmaW5kIChjYXNlLWluc2Vuc2l0aXZlKS5cbiAqIEByZXR1cm5zIHs/c3RyaW5nfSBUaGUgYWN0dWFsIGtleSBuYW1lIGlmIGZvdW5kLCBvdGhlcndpc2UgbnVsbC5cbiAqL1xuZnVuY3Rpb24gZmluZEtleShvYmosIGtleSkge1xuICBpZiAoaXNCdWZmZXIob2JqKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICBsZXQgX2tleTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBfa2V5ID0ga2V5c1tpXTtcbiAgICBpZiAoa2V5ID09PSBfa2V5LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiBfa2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuY29uc3QgX2dsb2JhbCA9ICgoKSA9PiB7XG4gIC8qZXNsaW50IG5vLXVuZGVmOjAqL1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZ2xvYmFsVGhpcztcbiAgcmV0dXJuIHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbDtcbn0pKCk7XG5cbmNvbnN0IGlzQ29udGV4dERlZmluZWQgPSAoY29udGV4dCkgPT4gIWlzVW5kZWZpbmVkKGNvbnRleHQpICYmIGNvbnRleHQgIT09IF9nbG9iYWw7XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKlxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC4uLm9ianMpIHtcbiAgY29uc3QgeyBjYXNlbGVzcywgc2tpcFVuZGVmaW5lZCB9ID0gKGlzQ29udGV4dERlZmluZWQodGhpcykgJiYgdGhpcykgfHwge307XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBjb25zdCBhc3NpZ25WYWx1ZSA9ICh2YWwsIGtleSkgPT4ge1xuICAgIC8vIFNraXAgZGFuZ2Vyb3VzIHByb3BlcnR5IG5hbWVzIHRvIHByZXZlbnQgcHJvdG90eXBlIHBvbGx1dGlvblxuICAgIGlmIChrZXkgPT09ICdfX3Byb3RvX18nIHx8IGtleSA9PT0gJ2NvbnN0cnVjdG9yJyB8fCBrZXkgPT09ICdwcm90b3R5cGUnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZmluZEtleSBsb3dlcmNhc2VzIHRoZSBrZXksIHNvIGNhc2VsZXNzIGxvb2t1cCBvbmx5IGFwcGxpZXMgdG8gc3RyaW5ncyDigJRcbiAgICAvLyBzeW1ib2wga2V5cyBhcmUgaWRlbnRpdHktbWF0Y2hlZC5cbiAgICBjb25zdCB0YXJnZXRLZXkgPSAoY2FzZWxlc3MgJiYgdHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYgZmluZEtleShyZXN1bHQsIGtleSkpIHx8IGtleTtcbiAgICAvLyBSZWFkIHZpYSBvd24tcHJvcCBvbmx5IOKAlCBhIGJhcmUgYHJlc3VsdFt0YXJnZXRLZXldYCB3YWxrcyB0aGUgcHJvdG90eXBlXG4gICAgLy8gY2hhaW4sIHNvIGEgcG9sbHV0ZWQgT2JqZWN0LnByb3RvdHlwZSB2YWx1ZSBjb3VsZCBzdXJmYWNlIGhlcmUgYW5kIGdldFxuICAgIC8vIGNvcGllZCBpbnRvIHRoZSBtZXJnZWQgcmVzdWx0LlxuICAgIGNvbnN0IGV4aXN0aW5nID0gaGFzT3duUHJvcGVydHkocmVzdWx0LCB0YXJnZXRLZXkpID8gcmVzdWx0W3RhcmdldEtleV0gOiB1bmRlZmluZWQ7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QoZXhpc3RpbmcpICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZShleGlzdGluZywgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWwuc2xpY2UoKTtcbiAgICB9IGVsc2UgaWYgKCFza2lwVW5kZWZpbmVkIHx8ICFpc1VuZGVmaW5lZCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbDtcbiAgICB9XG4gIH07XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBvYmpzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNvbnN0IHNvdXJjZSA9IG9ianNbaV07XG4gICAgaWYgKCFzb3VyY2UgfHwgaXNCdWZmZXIoc291cmNlKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgZm9yRWFjaChzb3VyY2UsIGFzc2lnblZhbHVlKTtcblxuICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0JyB8fCBpc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSk7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBzeW1ib2xzLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBzeW1ib2wgPSBzeW1ib2xzW2pdO1xuICAgICAgaWYgKHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoc291cmNlLCBzeW1ib2wpKSB7XG4gICAgICAgIGFzc2lnblZhbHVlKHNvdXJjZVtzeW1ib2xdLCBzeW1ib2wpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5hbGxPd25LZXlzXVxuICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5jb25zdCBleHRlbmQgPSAoYSwgYiwgdGhpc0FyZywgeyBhbGxPd25LZXlzIH0gPSB7fSkgPT4ge1xuICBmb3JFYWNoKFxuICAgIGIsXG4gICAgKHZhbCwga2V5KSA9PiB7XG4gICAgICBpZiAodGhpc0FyZyAmJiBpc0Z1bmN0aW9uKHZhbCkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsIGtleSwge1xuICAgICAgICAgIC8vIE51bGwtcHJvdG8gZGVzY3JpcHRvciBzbyBhIHBvbGx1dGVkIE9iamVjdC5wcm90b3R5cGUuZ2V0IGNhbm5vdFxuICAgICAgICAgIC8vIGhpamFjayBkZWZpbmVQcm9wZXJ0eSdzIGFjY2Vzc29yLXZzLWRhdGEgcmVzb2x1dGlvbi5cbiAgICAgICAgICBfX3Byb3RvX186IG51bGwsXG4gICAgICAgICAgdmFsdWU6IGJpbmQodmFsLCB0aGlzQXJnKSxcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYSwga2V5LCB7XG4gICAgICAgICAgX19wcm90b19fOiBudWxsLFxuICAgICAgICAgIHZhbHVlOiB2YWwsXG4gICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgeyBhbGxPd25LZXlzIH1cbiAgKTtcbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBieXRlIG9yZGVyIG1hcmtlci4gVGhpcyBjYXRjaGVzIEVGIEJCIEJGICh0aGUgVVRGLTggQk9NKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHdpdGggQk9NXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5jb25zdCBzdHJpcEJPTSA9IChjb250ZW50KSA9PiB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4ZmVmZikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufTtcblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gW3Byb3BzXVxuICogQHBhcmFtIHtvYmplY3R9IFtkZXNjcmlwdG9yc11cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgaW5oZXJpdHMgPSAoY29uc3RydWN0b3IsIHN1cGVyQ29uc3RydWN0b3IsIHByb3BzLCBkZXNjcmlwdG9ycykgPT4ge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLCBkZXNjcmlwdG9ycyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3Rvci5wcm90b3R5cGUsICdjb25zdHJ1Y3RvcicsIHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgdmFsdWU6IGNvbnN0cnVjdG9yLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3RvciwgJ3N1cGVyJywge1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICB2YWx1ZTogc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGUsXG4gIH0pO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufTtcblxuLyoqXG4gKiBSZXNvbHZlIG9iamVjdCB3aXRoIGRlZXAgcHJvdG90eXBlIGNoYWluIHRvIGEgZmxhdCBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2VPYmogc291cmNlIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IFtkZXN0T2JqXVxuICogQHBhcmFtIHtGdW5jdGlvbnxCb29sZWFufSBbZmlsdGVyXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Byb3BGaWx0ZXJdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuY29uc3QgdG9GbGF0T2JqZWN0ID0gKHNvdXJjZU9iaiwgZGVzdE9iaiwgZmlsdGVyLCBwcm9wRmlsdGVyKSA9PiB7XG4gIGxldCBwcm9wcztcbiAgbGV0IGk7XG4gIGxldCBwcm9wO1xuICBjb25zdCBtZXJnZWQgPSB7fTtcblxuICBkZXN0T2JqID0gZGVzdE9iaiB8fCB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gIGlmIChzb3VyY2VPYmogPT0gbnVsbCkgcmV0dXJuIGRlc3RPYmo7XG5cbiAgZG8ge1xuICAgIHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlT2JqKTtcbiAgICBpID0gcHJvcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICBwcm9wID0gcHJvcHNbaV07XG4gICAgICBpZiAoKCFwcm9wRmlsdGVyIHx8IHByb3BGaWx0ZXIocHJvcCwgc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgIW1lcmdlZFtwcm9wXSkge1xuICAgICAgICBkZXN0T2JqW3Byb3BdID0gc291cmNlT2JqW3Byb3BdO1xuICAgICAgICBtZXJnZWRbcHJvcF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBzb3VyY2VPYmogPSBmaWx0ZXIgIT09IGZhbHNlICYmIGdldFByb3RvdHlwZU9mKHNvdXJjZU9iaik7XG4gIH0gd2hpbGUgKHNvdXJjZU9iaiAmJiAoIWZpbHRlciB8fCBmaWx0ZXIoc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgc291cmNlT2JqICE9PSBPYmplY3QucHJvdG90eXBlKTtcblxuICByZXR1cm4gZGVzdE9iajtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3RyaW5nIGVuZHMgd2l0aCB0aGUgY2hhcmFjdGVycyBvZiBhIHNwZWNpZmllZCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gW3Bvc2l0aW9uPSAwXVxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBlbmRzV2l0aCA9IChzdHIsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pID0+IHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHBvc2l0aW9uID4gc3RyLmxlbmd0aCkge1xuICAgIHBvc2l0aW9uID0gc3RyLmxlbmd0aDtcbiAgfVxuICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICBjb25zdCBsYXN0SW5kZXggPSBzdHIuaW5kZXhPZihzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKTtcbiAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3NpdGlvbjtcbn07XG5cbi8qKlxuICogUmV0dXJucyBuZXcgYXJyYXkgZnJvbSBhcnJheSBsaWtlIG9iamVjdCBvciBudWxsIGlmIGZhaWxlZFxuICpcbiAqIEBwYXJhbSB7Kn0gW3RoaW5nXVxuICpcbiAqIEByZXR1cm5zIHs/QXJyYXl9XG4gKi9cbmNvbnN0IHRvQXJyYXkgPSAodGhpbmcpID0+IHtcbiAgaWYgKCF0aGluZykgcmV0dXJuIG51bGw7XG4gIGlmIChpc0FycmF5KHRoaW5nKSkgcmV0dXJuIHRoaW5nO1xuICBsZXQgaSA9IHRoaW5nLmxlbmd0aDtcbiAgaWYgKCFpc051bWJlcihpKSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGFyciA9IG5ldyBBcnJheShpKTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBhcnJbaV0gPSB0aGluZ1tpXTtcbiAgfVxuICByZXR1cm4gYXJyO1xufTtcblxuLyoqXG4gKiBDaGVja2luZyBpZiB0aGUgVWludDhBcnJheSBleGlzdHMgYW5kIGlmIGl0IGRvZXMsIGl0IHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiB0aGVcbiAqIHRoaW5nIHBhc3NlZCBpbiBpcyBhbiBpbnN0YW5jZSBvZiBVaW50OEFycmF5XG4gKlxuICogQHBhcmFtIHtUeXBlZEFycmF5fVxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbmNvbnN0IGlzVHlwZWRBcnJheSA9ICgoVHlwZWRBcnJheSkgPT4ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gKHRoaW5nKSA9PiB7XG4gICAgcmV0dXJuIFR5cGVkQXJyYXkgJiYgdGhpbmcgaW5zdGFuY2VvZiBUeXBlZEFycmF5O1xuICB9O1xufSkodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIGdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxuLyoqXG4gKiBGb3IgZWFjaCBlbnRyeSBpbiB0aGUgb2JqZWN0LCBjYWxsIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBrZXkgYW5kIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGVudHJ5LlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBmb3JFYWNoRW50cnkgPSAob2JqLCBmbikgPT4ge1xuICBjb25zdCBnZW5lcmF0b3IgPSBvYmogJiYgb2JqW2l0ZXJhdG9yXTtcblxuICBjb25zdCBfaXRlcmF0b3IgPSBnZW5lcmF0b3IuY2FsbChvYmopO1xuXG4gIGxldCByZXN1bHQ7XG5cbiAgd2hpbGUgKChyZXN1bHQgPSBfaXRlcmF0b3IubmV4dCgpKSAmJiAhcmVzdWx0LmRvbmUpIHtcbiAgICBjb25zdCBwYWlyID0gcmVzdWx0LnZhbHVlO1xuICAgIGZuLmNhbGwob2JqLCBwYWlyWzBdLCBwYWlyWzFdKTtcbiAgfVxufTtcblxuLyoqXG4gKiBJdCB0YWtlcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhbmQgYSBzdHJpbmcsIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIGFsbCB0aGUgbWF0Y2hlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWdFeHAgLSBUaGUgcmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIGFnYWluc3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBzZWFyY2guXG4gKlxuICogQHJldHVybnMge0FycmF5PGJvb2xlYW4+fVxuICovXG5jb25zdCBtYXRjaEFsbCA9IChyZWdFeHAsIHN0cikgPT4ge1xuICBsZXQgbWF0Y2hlcztcbiAgY29uc3QgYXJyID0gW107XG5cbiAgd2hpbGUgKChtYXRjaGVzID0gcmVnRXhwLmV4ZWMoc3RyKSkgIT09IG51bGwpIHtcbiAgICBhcnIucHVzaChtYXRjaGVzKTtcbiAgfVxuXG4gIHJldHVybiBhcnI7XG59O1xuXG4vKiBDaGVja2luZyBpZiB0aGUga2luZE9mVGVzdCBmdW5jdGlvbiByZXR1cm5zIHRydWUgd2hlbiBwYXNzZWQgYW4gSFRNTEZvcm1FbGVtZW50LiAqL1xuY29uc3QgaXNIVE1MRm9ybSA9IGtpbmRPZlRlc3QoJ0hUTUxGb3JtRWxlbWVudCcpO1xuXG5jb25zdCB0b0NhbWVsQ2FzZSA9IChzdHIpID0+IHtcbiAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1stX1xcc10oW2EtelxcZF0pKFxcdyopL2csIGZ1bmN0aW9uIHJlcGxhY2VyKG0sIHAxLCBwMikge1xuICAgIHJldHVybiBwMS50b1VwcGVyQ2FzZSgpICsgcDI7XG4gIH0pO1xufTtcblxuY29uc3QgeyBwcm9wZXJ0eUlzRW51bWVyYWJsZSB9ID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgbGV0IHJldDtcbiAgICBpZiAoKHJldCA9IHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSkgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSByZXQgfHwgZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn07XG5cbi8qKlxuICogTWFrZXMgYWxsIG1ldGhvZHMgcmVhZC1vbmx5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKi9cblxuY29uc3QgZnJlZXplTWV0aG9kcyA9IChvYmopID0+IHtcbiAgcmVkdWNlRGVzY3JpcHRvcnMob2JqLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIC8vIHNraXAgcmVzdHJpY3RlZCBwcm9wcyBpbiBzdHJpY3QgbW9kZVxuICAgIGlmIChpc0Z1bmN0aW9uKG9iaikgJiYgWydhcmd1bWVudHMnLCAnY2FsbGVyJywgJ2NhbGxlZSddLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBvYmpbbmFtZV07XG5cbiAgICBpZiAoIWlzRnVuY3Rpb24odmFsdWUpKSByZXR1cm47XG5cbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBmYWxzZTtcblxuICAgIGlmICgnd3JpdGFibGUnIGluIGRlc2NyaXB0b3IpIHtcbiAgICAgIGRlc2NyaXB0b3Iud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICBkZXNjcmlwdG9yLnNldCA9ICgpID0+IHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJDYW4gbm90IHJld3JpdGUgcmVhZC1vbmx5IG1ldGhvZCAnXCIgKyBuYW1lICsgXCInXCIpO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBhcnJheSBvciBhIGRlbGltaXRlZCBzdHJpbmcgaW50byBhbiBvYmplY3Qgc2V0IHdpdGggdmFsdWVzIGFzIGtleXMgYW5kIHRydWUgYXMgdmFsdWVzLlxuICogVXNlZnVsIGZvciBmYXN0IG1lbWJlcnNoaXAgY2hlY2tzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBhcnJheU9yU3RyaW5nIC0gVGhlIGFycmF5IG9yIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHBhcmFtIHtzdHJpbmd9IGRlbGltaXRlciAtIFRoZSBkZWxpbWl0ZXIgdG8gdXNlIGlmIGlucHV0IGlzIGEgc3RyaW5nLlxuICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IHdpdGgga2V5cyBmcm9tIHRoZSBhcnJheSBvciBzdHJpbmcsIHZhbHVlcyBzZXQgdG8gdHJ1ZS5cbiAqL1xuY29uc3QgdG9PYmplY3RTZXQgPSAoYXJyYXlPclN0cmluZywgZGVsaW1pdGVyKSA9PiB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuXG4gIGNvbnN0IGRlZmluZSA9IChhcnIpID0+IHtcbiAgICBhcnIuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgIG9ialt2YWx1ZV0gPSB0cnVlO1xuICAgIH0pO1xuICB9O1xuXG4gIGlzQXJyYXkoYXJyYXlPclN0cmluZykgPyBkZWZpbmUoYXJyYXlPclN0cmluZykgOiBkZWZpbmUoU3RyaW5nKGFycmF5T3JTdHJpbmcpLnNwbGl0KGRlbGltaXRlcikpO1xuXG4gIHJldHVybiBvYmo7XG59O1xuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbmNvbnN0IHRvRmluaXRlTnVtYmVyID0gKHZhbHVlLCBkZWZhdWx0VmFsdWUpID0+IHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgTnVtYmVyLmlzRmluaXRlKCh2YWx1ZSA9ICt2YWx1ZSkpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59O1xuXG4vKipcbiAqIElmIHRoZSB0aGluZyBpcyBhIEZvcm1EYXRhIG9iamVjdCwgcmV0dXJuIHRydWUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB0aGluZyAtIFRoZSB0aGluZyB0byBjaGVjay5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNTcGVjQ29tcGxpYW50Rm9ybSh0aGluZykge1xuICByZXR1cm4gISEoXG4gICAgdGhpbmcgJiZcbiAgICBpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkgJiZcbiAgICB0aGluZ1t0b1N0cmluZ1RhZ10gPT09ICdGb3JtRGF0YScgJiZcbiAgICB0aGluZ1tpdGVyYXRvcl1cbiAgKTtcbn1cblxuLyoqXG4gKiBSZWN1cnNpdmVseSBjb252ZXJ0cyBhbiBvYmplY3QgdG8gYSBKU09OLWNvbXBhdGlibGUgb2JqZWN0LCBoYW5kbGluZyBjaXJjdWxhciByZWZlcmVuY2VzIGFuZCBCdWZmZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBUaGUgb2JqZWN0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgSlNPTi1jb21wYXRpYmxlIG9iamVjdC5cbiAqL1xuY29uc3QgdG9KU09OT2JqZWN0ID0gKG9iaikgPT4ge1xuICBjb25zdCB2aXNpdGVkID0gbmV3IFdlYWtTZXQoKTtcblxuICBjb25zdCB2aXNpdCA9IChzb3VyY2UpID0+IHtcbiAgICBpZiAoaXNPYmplY3Qoc291cmNlKSkge1xuICAgICAgaWYgKHZpc2l0ZWQuaGFzKHNvdXJjZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvL0J1ZmZlciBjaGVja1xuICAgICAgaWYgKGlzQnVmZmVyKHNvdXJjZSkpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCEoJ3RvSlNPTicgaW4gc291cmNlKSkge1xuICAgICAgICAvLyBhZGQtb24gZGVzY2VudCAvIGRlbGV0ZS1vbi1hc2NlbnQ6IHByZXNlcnZlcyBwYXRoIHNlbWFudGljcywgc28gREFHIG5vZGVzIHNlcmlhbGlzZSBhdCBldmVyeSBvY2N1cnJlbmNlIChzZWUgIzcyMzApLlxuICAgICAgICB2aXNpdGVkLmFkZChzb3VyY2UpO1xuXG4gICAgICAgIGxldCB0YXJnZXQ7XG5cbiAgICAgICAgaWYgKGlzU2V0KHNvdXJjZSkpIHtcbiAgICAgICAgICB0YXJnZXQgPSBbXTtcbiAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHNvdXJjZSkge1xuICAgICAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gdmlzaXQodmFsdWUpO1xuICAgICAgICAgICAgIWlzVW5kZWZpbmVkKHJlZHVjZWRWYWx1ZSkgJiYgdGFyZ2V0LnB1c2gocmVkdWNlZFZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0ID0gaXNBcnJheShzb3VyY2UpID8gW10gOiB7fTtcblxuICAgICAgICAgIGZvckVhY2goc291cmNlLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gdmlzaXQodmFsdWUpO1xuICAgICAgICAgICAgIWlzVW5kZWZpbmVkKHJlZHVjZWRWYWx1ZSkgJiYgKHRhcmdldFtrZXldID0gcmVkdWNlZFZhbHVlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZpc2l0ZWQuZGVsZXRlKHNvdXJjZSk7XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc291cmNlO1xuICB9O1xuXG4gIHJldHVybiB2aXNpdChvYmopO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgdmFsdWUgaXMgYW4gYXN5bmMgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyAtIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gYXN5bmMgZnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZS5cbiAqL1xuY29uc3QgaXNBc3luY0ZuID0ga2luZE9mVGVzdCgnQXN5bmNGdW5jdGlvbicpO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSB2YWx1ZSBpcyB0aGVuYWJsZSAoaGFzIHRoZW4gYW5kIGNhdGNoIG1ldGhvZHMpLlxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgLSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIHRoZW5hYmxlLCBvdGhlcndpc2UgZmFsc2UuXG4gKi9cbmNvbnN0IGlzVGhlbmFibGUgPSAodGhpbmcpID0+XG4gIHRoaW5nICYmXG4gIChpc09iamVjdCh0aGluZykgfHwgaXNGdW5jdGlvbih0aGluZykpICYmXG4gIGlzRnVuY3Rpb24odGhpbmcudGhlbikgJiZcbiAgaXNGdW5jdGlvbih0aGluZy5jYXRjaCk7XG5cbi8vIG9yaWdpbmFsIGNvZGVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EaWdpdGFsQnJhaW5KUy9BeGlvc1Byb21pc2UvYmxvYi8xNmRlYWIxMzcxMGVjMDk3Nzk5MjIxMzFmM2ZhNTk1NDMyMGY4M2FiL2xpYi91dGlscy5qcyNMMTEtTDM0XG5cbi8qKlxuICogUHJvdmlkZXMgYSBjcm9zcy1wbGF0Zm9ybSBzZXRJbW1lZGlhdGUgaW1wbGVtZW50YXRpb24uXG4gKiBVc2VzIG5hdGl2ZSBzZXRJbW1lZGlhdGUgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgZmFsbHMgYmFjayB0byBwb3N0TWVzc2FnZSBvciBzZXRUaW1lb3V0LlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2V0SW1tZWRpYXRlU3VwcG9ydGVkIC0gV2hldGhlciBzZXRJbW1lZGlhdGUgaXMgc3VwcG9ydGVkLlxuICogQHBhcmFtIHtib29sZWFufSBwb3N0TWVzc2FnZVN1cHBvcnRlZCAtIFdoZXRoZXIgcG9zdE1lc3NhZ2UgaXMgc3VwcG9ydGVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRvIHNjaGVkdWxlIGEgY2FsbGJhY2sgYXN5bmNocm9ub3VzbHkuXG4gKi9cbmNvbnN0IF9zZXRJbW1lZGlhdGUgPSAoKHNldEltbWVkaWF0ZVN1cHBvcnRlZCwgcG9zdE1lc3NhZ2VTdXBwb3J0ZWQpID0+IHtcbiAgaWYgKHNldEltbWVkaWF0ZVN1cHBvcnRlZCkge1xuICAgIHJldHVybiBzZXRJbW1lZGlhdGU7XG4gIH1cblxuICByZXR1cm4gcG9zdE1lc3NhZ2VTdXBwb3J0ZWRcbiAgICA/ICgodG9rZW4sIGNhbGxiYWNrcykgPT4ge1xuICAgICAgICBfZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgJ21lc3NhZ2UnLFxuICAgICAgICAgICh7IHNvdXJjZSwgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoc291cmNlID09PSBfZ2xvYmFsICYmIGRhdGEgPT09IHRva2VuKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrcy5sZW5ndGggJiYgY2FsbGJhY2tzLnNoaWZ0KCkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIChjYikgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICAgICAgICBfZ2xvYmFsLnBvc3RNZXNzYWdlKHRva2VuLCAnKicpO1xuICAgICAgICB9O1xuICAgICAgfSkoYGF4aW9zQCR7TWF0aC5yYW5kb20oKX1gLCBbXSlcbiAgICA6IChjYikgPT4gc2V0VGltZW91dChjYik7XG59KSh0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nLCBpc0Z1bmN0aW9uKF9nbG9iYWwucG9zdE1lc3NhZ2UpKTtcblxuLyoqXG4gKiBTY2hlZHVsZXMgYSBtaWNyb3Rhc2sgb3IgYXN5bmNocm9ub3VzIGNhbGxiYWNrIGFzIHNvb24gYXMgcG9zc2libGUuXG4gKiBVc2VzIHF1ZXVlTWljcm90YXNrIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGZhbGxzIGJhY2sgdG8gcHJvY2Vzcy5uZXh0VGljayBvciBfc2V0SW1tZWRpYXRlLlxuICpcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqL1xuY29uc3QgYXNhcCA9XG4gIHR5cGVvZiBxdWV1ZU1pY3JvdGFzayAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IHF1ZXVlTWljcm90YXNrLmJpbmQoX2dsb2JhbClcbiAgICA6ICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5uZXh0VGljaykgfHwgX3NldEltbWVkaWF0ZTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqXG5cbmNvbnN0IGlzSXRlcmFibGUgPSAodGhpbmcpID0+IHRoaW5nICE9IG51bGwgJiYgaXNGdW5jdGlvbih0aGluZ1tpdGVyYXRvcl0pO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGl0ZXJhYmxlIHZpYSBhbiBpdGVyYXRvciB0aGF0IGlzIE5PVCBzb3VyY2VkIHNvbGVseVxuICogZnJvbSBhIHBvbGx1dGVkIE9iamVjdC5wcm90b3R5cGUuIFVzZSB0aGlzIGluc3RlYWQgb2YgYGlzSXRlcmFibGVgIHdoZW5ldmVyXG4gKiB0aGUgaXRlcmFibGUgY29tZXMgZnJvbSB1bnRydXN0ZWQgaW5wdXQgKGUuZy4gdXNlci1zdXBwbGllZCBoZWFkZXIgc291cmNlcyksXG4gKiBzbyBgT2JqZWN0LnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gLi4uYCBjYW5ub3QgdHVybiBhbiBvcmRpbmFyeSBvYmplY3RcbiAqIGludG8gYW4gYXR0YWNrZXItY29udHJvbGxlZCBlbnRyaWVzIGl0ZXJhdG9yLlxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBoYXMgYSBub24tcG9sbHV0ZWQgaXRlcmF0b3JcbiAqL1xuY29uc3QgaXNTYWZlSXRlcmFibGUgPSAodGhpbmcpID0+XG4gIHRoaW5nICE9IG51bGwgJiYgaGFzT3duSW5Qcm90b3R5cGVDaGFpbih0aGluZywgaXRlcmF0b3IpICYmIGlzSXRlcmFibGUodGhpbmcpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBpc0VtcHR5T2JqZWN0LFxuICBpc1JlYWRhYmxlU3RyZWFtLFxuICBpc1JlcXVlc3QsXG4gIGlzUmVzcG9uc2UsXG4gIGlzSGVhZGVycyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc1JlYWN0TmF0aXZlQmxvYixcbiAgaXNSZWFjdE5hdGl2ZSxcbiAgaXNCbG9iLFxuICBpc1JlZ0V4cCxcbiAgaXNGdW5jdGlvbixcbiAgaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3QsXG4gIGZvckVhY2gsXG4gIG1lcmdlLFxuICBleHRlbmQsXG4gIHRyaW0sXG4gIHN0cmlwQk9NLFxuICBpbmhlcml0cyxcbiAgdG9GbGF0T2JqZWN0LFxuICBraW5kT2YsXG4gIGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoLFxuICB0b0FycmF5LFxuICBmb3JFYWNoRW50cnksXG4gIG1hdGNoQWxsLFxuICBpc0hUTUxGb3JtLFxuICBoYXNPd25Qcm9wZXJ0eSxcbiAgaGFzT3duUHJvcDogaGFzT3duUHJvcGVydHksIC8vIGFuIGFsaWFzIHRvIGF2b2lkIEVTTGludCBuby1wcm90b3R5cGUtYnVpbHRpbnMgZGV0ZWN0aW9uXG4gIGhhc093bkluUHJvdG90eXBlQ2hhaW4sXG4gIGdldFNhZmVQcm9wLFxuICB0b1NhZmVGbGF0T2JqZWN0LFxuICByZWR1Y2VEZXNjcmlwdG9ycyxcbiAgZnJlZXplTWV0aG9kcyxcbiAgdG9PYmplY3RTZXQsXG4gIHRvQ2FtZWxDYXNlLFxuICBub29wLFxuICB0b0Zpbml0ZU51bWJlcixcbiAgZmluZEtleSxcbiAgZ2xvYmFsOiBfZ2xvYmFsLFxuICBpc0NvbnRleHREZWZpbmVkLFxuICBpc1NwZWNDb21wbGlhbnRGb3JtLFxuICB0b0pTT05PYmplY3QsXG4gIGlzQXN5bmNGbixcbiAgaXNUaGVuYWJsZSxcbiAgc2V0SW1tZWRpYXRlOiBfc2V0SW1tZWRpYXRlLFxuICBhc2FwLFxuICBpc0l0ZXJhYmxlLFxuICBpc1NhZmVJdGVyYWJsZSxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG5jb25zdCBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGNvbnN0IGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHRjb25zdCBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0Y29uc3QgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIvdmFsdWUgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc2V0IC5uYW1lIGZvciBhbm9ueW1vdXMgZGVmYXVsdCBleHBvcnRzIHBlciBFUyBzcGVjXG4vLyBza2lwcGVkIHdoZW4gdGhlIHByb3BlcnR5IGlzIG5vbi1jb25maWd1cmFibGUgKHByZS1FUzIwMTUgZW5naW5lcyksXG4vLyB3aGVyZSBPYmplY3QuZGVmaW5lUHJvcGVydHkgd291bGQgdGhyb3dcbl9fd2VicGFja19yZXF1aXJlX18uZG4gPSAoeCkgPT4ge1xuXHR2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoeCwgXCJuYW1lXCIpO1xuXHRpZiAoIWRlc2NyaXB0b3IgfHwgKCFkZXNjcmlwdG9yLndyaXRhYmxlICYmIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlKSkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHgsIFwibmFtZVwiLCB7IHZhbHVlOiBcImRlZmF1bHRcIiwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiXG5pbXBvcnQgXCIuLi8uLi91dGlscy9hbGVydC5qc1wiXG5pbXBvcnQgeyBheGlvcyB9IGZyb20gXCJAL3JlcXVlc3QuanNcIlxuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCIuLi8uLi91dGlscy9hdXRoLmpzXCJcbi8qKlxuICog55uu5qCHMe+8muiOt+WPluaWh+eroOWIl+ihqOW5tuWxleekulxuICogIDEuMSDlh4blpIfmn6Xor6Llj4LmlbDlr7nosaFcbiAqICAxLjIg6I635Y+W5paH56ug5YiX6KGo5pWw5o2uXG4gKiAgMS4zIOWxleekuuWIsOaMh+WumueahOagh+etvue7k+aehOS4rVxuICovXG5cbi8qKlxuICog55uu5qCHMu+8muetm+mAieaWh+eroOWIl+ihqFxuICogIDIuMSDorr7nva7popHpgZPliJfooajmlbDmja5cbiAqICAyLjIg55uR5ZCs562b6YCJ5p2h5Lu25pS55Y+Y77yM5L+d5a2Y5p+l6K+i5L+h5oGv5Yiw5p+l6K+i5Y+C5pWw5a+56LGhXG4gKiAgMi4zIOeCueWHu+etm+mAieaXtu+8jOS8oOmAkuafpeivouWPguaVsOWvueixoeWIsOacjeWKoeWZqFxuICogIDIuNCDojrflj5bljLnphY3mlbDmja7vvIzopobnm5bliLDpobXpnaLlsZXnpLpcbiAqL1xuXG4vKipcbiAqIOebruaghzPvvJrliIbpobXlip/og71cbiAqICAzLjEg5L+d5a2Y5bm26K6+572u5paH56ug5oC75p2h5pWwXG4gKiAgMy4yIOeCueWHu+S4i+S4gOmhte+8jOWBmuS4tOeVjOWAvOWIpOaWre+8jOW5tuWIh+aNoumhteeggeWPguaVsOW5tuivt+axguacgOaWsOaVsOaNrlxuICogIDMuMyDngrnlh7vkuIrkuIDpobXvvIzlgZrkuLTnlYzlgLzliKTmlq3vvIzlubbliIfmjaLpobXnoIHlj4LmlbDlubbor7fmsYLmnIDmlrDmlbDmja5cbiAqL1xuXG4vKipcbiAqIOebruaghzTvvJrliKDpmaTlip/og71cbiAqICA0LjEg5YWz6IGU5paH56ugIGlkIOWIsOWIoOmZpOWbvuagh1xuICogIDQuMiDngrnlh7vliKDpmaTml7bvvIzojrflj5bmlofnq6AgaWRcbiAqICA0LjMg6LCD55So5Yig6Zmk5o6l5Y+j77yM5Lyg6YCS5paH56ugIGlkIOWIsOacjeWKoeWZqFxuICogIDQuNCDph43mlrDojrflj5bmlofnq6DliJfooajvvIzlubbopobnm5blsZXnpLpcbiAqICA0LjUg5Yig6Zmk5pyA5ZCO5LiA6aG155qE5pyA5ZCO5LiA5p2h77yM6ZyA6KaB6Ieq5Yqo5ZCR5YmN57+76aG1XG4gKi9cblxuLy8g54K55Ye757yW6L6R5pe277yM6I635Y+W5paH56ugIGlk77yM6Lez6L2s5Yiw5Y+R5biD5paH56ug6aG16Z2i5Lyg6YCS5paH56ugIGlkIOi/h+WOu1xuXG5jb25zdCB7IGNyZWF0ZUVkaXRvciwgY3JlYXRlVG9vbGJhciB9ID0gd2luZG93LndhbmdFZGl0b3JcblxuY29uc3QgZWRpdG9yQ29uZmlnID0ge1xuICBwbGFjZWhvbGRlcjogJ1R5cGUgaGVyZS4uLicsXG4gIG9uQ2hhbmdlKGVkaXRvcikge1xuICAgIGNvbnN0IGh0bWwgPSBlZGl0b3IuZ2V0SHRtbCgpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInRleHRhcmVhXCIpLnZhbHVlID0gaHRtbDtcbiAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidGV4dGFyZWFcIikudmFsdWUpXG4gIH1cbn1cblxuXG5jb25zdCBlZGl0b3IgPSBjcmVhdGVFZGl0b3Ioe1xuICBzZWxlY3RvcjogJyNlZGl0b3ItY29udGFpbmVyJyxcbiAgaHRtbDogJzxwPjxicj48L3A+JyxcbiAgY29uZmlnOiBlZGl0b3JDb25maWcsXG4gIG1vZGU6ICdkZWZhdWx0JywgLy8gb3IgJ3NpbXBsZSdcbn0pXG5jb25zdCB0b29sYmFyQ29uZmlnID0ge31cblxuY29uc3QgdG9vbGJhciA9IGNyZWF0ZVRvb2xiYXIoe1xuICBlZGl0b3IsXG4gIHNlbGVjdG9yOiAnI3Rvb2xiYXItY29udGFpbmVyJyxcbiAgY29uZmlnOiB0b29sYmFyQ29uZmlnLFxuICBtb2RlOiAnZGVmYXVsdCcsIC8vIG9yICdzaW1wbGUnXG59KVxuXG5cbmNvbnN0IGVkaXRNb2RhbCA9IG5ldyBib290c3RyYXAuTW9kYWwoXCIjZWRpdC1tb2RhbFwiKTtcbmNvbnN0IGRlbGV0ZU1vZGFsID0gbmV3IGJvb3RzdHJhcC5Nb2RhbChcIiNkZWxldGUtbW9kYWxcIik7XG5cbmNvbnNvbGUubG9nKGVkaXRvcilcbmxldCBzZWxlY3RlZEFydGljbGU7XG5hdXRoKCk7XG5cbmdldEFydGljbGVMaXN0KCk7XG5jb25zb2xlLmxvZyhcInRlc3RcIilcbmdldENoYW5uZWxMaXN0KCk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnaW5hdGlvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zb2xlLmxvZyhcIiFcIilcbiAgY29uc3QgY3VycmVudFBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2Utbm93XCIpLmRhdGFzZXQuaWQ7XG4gIGNvbnN0IHRvdGFsQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvdGFsLWNvdW50XCIpLmRhdGFzZXQuaWQ7XG4gIGNvbnN0IHBhcmFtcyA9IHt9O1xuICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibmV4dFwiKSkge1xuICAgIHBhcmFtcy5wYWdlID0gK2N1cnJlbnRQYWdlICsgMVxuICAgIGlmICgrY3VycmVudFBhZ2UgKiAxMCA+PSArdG90YWxDb3VudCkge1xuICAgICAgbXlBbGVydChmYWxzZSwgXCLlvZPliY3kuLrmnIDlkI7kuIDpobVcIilcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJsYXN0XCIpKSB7XG4gICAgaWYgKCtjdXJyZW50UGFnZSA9PT0gMSkge1xuICAgICAgbXlBbGVydChmYWxzZSwgXCLlvZPliY3kuLrnrKzkuIDpobVcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHBhcmFtcy5wYWdlID0gK2N1cnJlbnRQYWdlIC0gMVxuICB9XG4gIGdldEFydGljbGVMaXN0KHBhcmFtcykudGhlbihyID0+IHtcbiAgICBjb25zb2xlLmxvZyhyKVxuICB9KVxufSlcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImhpZGUuYnMubW9kYWxcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgfVxuICBjb25zb2xlLmxvZygxKVxuICB0aGlzLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwgZm9ybVwiKS5yZXNldCgpO1xuICBlZGl0b3IuY2xlYXIoKVxufSlcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZS50YWJsZS1zdHJpcGVkXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PT0gXCJJXCIpIHtcbiAgICBzZWxlY3RlZEFydGljbGUgPSBlLnRhcmdldC5pZDtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdFwiKSkge1xuICAgICAgLy8gZ2V0Q2hhbm5lbExpc3QoKTtcbiAgICAgIC8vIGdldEFydGljbGVEZXRhaWwoZS50YXJnZXQuaWQpO1xuICAgICAgLy/nrYnlvoXmiYDmnIlwcm9taXNl5a6M5oiQ6L+b6KGM5pWw5o2u5Zue5pi+XG4gICAgICBQcm9taXNlLmFsbChbZ2V0Q2hhbm5lbExpc3QoKSwgZ2V0QXJ0aWNsZURldGFpbChlLnRhcmdldC5pZCldKS50aGVuKHIgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsIC5mb3JtLXNlbGVjdFwiKS5pbm5lckhUTUwgPSAnPG9wdGlvbiB2YWx1ZT1cIlwiIHNlbGVjdGVkPuivt+mAieaLqeaWh+eroOmikemBkzwvb3B0aW9uPicgKyByWzBdLmRhdGEuZGF0YS5jaGFubmVscy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGAgPG9wdGlvbiB2YWx1ZT1cIiR7aXRlbS5pZH1cIj4ke2l0ZW0ubmFtZX08L29wdGlvbj5gXG4gICAgICAgIH0pLmpvaW4oXCJcIilcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLm1vZGFsIC5mb3JtLXNlbGVjdCBvcHRpb25bc2VsZWN0ZWRdYCkuc2VsZWN0ZWQgPSBmYWxzZVxuICAgICAgICBjb25zb2xlLmxvZyhyWzFdKVxuICAgICAgICBmb3IgKGxldCBrIGluIHJbMV0uZGF0YS5kYXRhKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coaylcbiAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgZm9ybSBbbmFtZT1cIiR7a31cIl1gKSkge1xuICAgICAgICAgICAgaWYgKGsgPT09IFwiY2hhbm5lbF9pZFwiKSB7XG5cbiAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLm1vZGFsIC5mb3JtLXNlbGVjdCBvcHRpb25bdmFsdWU9XCIke3JbMV0uZGF0YS5kYXRhW2tdfVwiXWApLnNlbGVjdGVkID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgZm9ybSBbbmFtZT1cIiR7a31cIl1gKS52YWx1ZSA9IHJbMV0uZGF0YS5kYXRhW2tdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5zZXRIdG1sKHJbMV0uZGF0YS5kYXRhLmNvbnRlbnQpXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY292ZXJcIikuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY292ZXIgaW1nXCIpLnNyYyA9IHJbMV0uZGF0YS5kYXRhLmNvdmVyLmltYWdlc1swXSB8fCBcIlwiXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsXCIpKSB7XG4gICAgICBkZWxldGVNb2RhbC5zaG93KCk7XG4gICAgfVxuICB9XG59KVxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZWxldGUtbW9kYWwgLmJ0bi1wcmltYXJ5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGlmIChzZWxlY3RlZEFydGljbGUpIHtcbiAgICBhd2FpdCBkZWxldGVBcnRpY2xlKHNlbGVjdGVkQXJ0aWNsZSk7XG4gIH1cbiAgZGVsZXRlTW9kYWwuaGlkZSgpXG59KVxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0LW1vZGFsIC5tb2RhbC1mb290ZXIgLmJ0bi1wcmltYXJ5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwgZm9ybVwiKS5yZXF1ZXN0U3VibWl0KCk7XG59KVxuXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY292ZXIgaW5wdXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUubG9nKHRoaXMuZmlsZXMpXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY292ZXIgaW1nXCIpLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5maWxlc1swXSlcbn0pXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwgZm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGFzeW5jIGZ1bmN0aW9uIChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgLy/lj5HpgIHnhafniYfmlbDmja7mi7/liLDnhafniYfov57mjqVcbiAgbGV0IHVybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY292ZXIgaW1nXCIpLnNyYztcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dC5pbWctZmlsZVwiKS5maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoXCJpbWFnZVwiLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXQuaW1nLWZpbGVcIikuZmlsZXNbMF0pXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXhpb3Moe1xuICAgICAgdXJsOiBcIi92MV8wL3VwbG9hZFwiLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGRhdGE6IGZvcm1EYXRhXG4gICAgfSlcbiAgICB1cmwgPSByZXN1bHQuZGF0YS5kYXRhLnVybFxuICB9XG5cbiAgY29uc3QgZGF0YSA9IHt9O1xuICAkKHRoaXMpLnNlcmlhbGl6ZUFycmF5KCkuZm9yRWFjaChpdGVtID0+IHtcbiAgICBkYXRhW2l0ZW0ubmFtZV0gPSBpdGVtLnZhbHVlXG4gIH0pXG5cbiAgZGF0YS5jb3ZlciA9IHtcbiAgICB0eXBlOiAxLFxuICAgIGltYWdlczogW3VybF1cbiAgfVxuXG4gIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gIGNvbnN0IHIgPSBhd2FpdCBlZGl0QXJ0aWNsZShkYXRhLmlkLCBkYXRhKTtcblxuICBlZGl0TW9kYWwuaGlkZSgpO1xuICBjb25zb2xlLmxvZyhyKVxuICBnZXRBcnRpY2xlTGlzdCgpO1xufSlcblxuXG5cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWwtZm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGFzeW5jIGZ1bmN0aW9uIChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgZGF0YSA9IHt9XG4gIGNvbnNvbGUubG9nKCQodGhpcykuc2VyaWFsaXplQXJyYXkoKSlcbiAgJCh0aGlzKS5zZXJpYWxpemVBcnJheSgpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGRhdGFbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWU7XG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGdldEFydGljbGVMaXN0KGRhdGEpXG5cbn0pXG5cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QXJ0aWNsZURldGFpbChpZCkge1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBheGlvcyh7XG4gICAgdXJsOiBgL3YxXzAvbXAvYXJ0aWNsZXMvJHtpZH1gLFxuICB9KVxuICBjb25zb2xlLmxvZyhyZXN1bHQpXG4gIHJldHVybiByZXN1bHQ7XG59XG5hc3luYyBmdW5jdGlvbiBlZGl0QXJ0aWNsZShpZCwgZGF0YSkge1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBheGlvcyh7XG4gICAgdXJsOiBgL3YxXzAvbXAvYXJ0aWNsZXMvJHtpZH1gLFxuICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICBkYXRhXG4gIH0pXG4gIGNvbnNvbGUubG9nKHJlc3VsdCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUFydGljbGUoaWQpIHtcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXhpb3Moe1xuICAgIHVybDogYC92MV8wL21wL2FydGljbGVzLyR7aWR9YCxcbiAgICBtZXRob2Q6IFwiREVMRVRFXCJcbiAgfSlcbiAgZ2V0QXJ0aWNsZUxpc3QoKVxuICBjb25zb2xlLmxvZyhyZXN1bHQpXG59XG5hc3luYyBmdW5jdGlvbiBnZXRDaGFubmVsTGlzdCgpIHtcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXhpb3Moe1xuICAgIHVybDogXCIvdjFfMC9jaGFubmVsc1wiXG4gIH0pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tc2VsZWN0XCIpLmlubmVySFRNTCA9ICc8b3B0aW9uIHZhbHVlPVwiXCIgc2VsZWN0ZWQ+6K+36YCJ5oup5paH56ug6aKR6YGTPC9vcHRpb24+JyArIHJlc3VsdC5kYXRhLmRhdGEuY2hhbm5lbHMubWFwKGl0ZW0gPT4ge1xuICAgIHJldHVybiBgIDxvcHRpb24gdmFsdWU9XCIke2l0ZW0uaWR9XCI+JHtpdGVtLm5hbWV9PC9vcHRpb24+YFxuICB9KS5qb2luKFwiXCIpXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFydGljbGVMaXN0KHBhcmFtcykge1xuICBjb25zdCBkYXRhID0gYXdhaXQgYXhpb3Moe1xuICAgIHVybDogXCIvdjFfMC9tcC9hcnRpY2xlc1wiLFxuICAgIHBhcmFtczoge1xuICAgICAgLi4ucGFyYW1zXG4gICAgfVxuICB9KVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmQgLmFsaWduLW1pZGRsZS5hcnQtbGlzdFwiKS5pbm5lckhUTUwgPSBkYXRhLmRhdGEuZGF0YS5yZXN1bHRzLm1hcChpdGVtID0+IHtcbiAgICByZXR1cm4gYCA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCIke2l0ZW0uY292ZXIuaW1hZ2VzWzBdIHx8IFwiXCJ9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHtpdGVtLnRpdGxlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgJHtpdGVtLnN0YXR1cyA9PT0gMiA/ICc8c3BhbiBjbGFzcz1cImJhZGdlIHRleHQtYmctc3VjY2Vzc1wiPuWuoeaguOmAmui/hzwvc3Bhbj4nIDogJzxzcGFuIGNsYXNzPVwiYmFkZ2UgdGV4dC1iZy1wcmltYXJ5XCI+5b6F5a6h5qC4PC9zcGFuPid9XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2l0ZW0ucHViZGF0ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2l0ZW0ucmVhZF9jb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2l0ZW0uY29tbWVudF9jb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2l0ZW0ubGlrZV9jb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJpIGJpLXBlbmNpbC1zcXVhcmUgZWRpdFwiIGlkPVwiJHtpdGVtLmlkfVwiIGRhdGEtYnMtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLWJzLXRhcmdldD1cIiNlZGl0LW1vZGFsXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaSBiaS10cmFzaDMgZGVsXCIgaWQ9XCIke2l0ZW0uaWR9XCIgZGF0YS1icy10b2dnbGU9XCJtb2RhbFwiIGRhdGEtYnMtdGFyZ2V0PVwiI2RlbGV0ZS1tb2RhbFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPmBcbiAgfSkuam9pbihcIlwiKVxuICBjb25zb2xlLmxvZyhkYXRhKVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtaXRlbS5wYWdlLW5vd1wiKS5pbm5lckhUTUwgPSBg56ysJHtkYXRhLmRhdGEuZGF0YS5wYWdlfemhtWBcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWl0ZW0ucGFnZS1ub3dcIikuZGF0YXNldC5pZCA9IGRhdGEuZGF0YS5kYXRhLnBhZ2VcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b3RhbC1jb3VudFwiKS5pbm5lckhUTUwgPSBg5YWxJHtkYXRhLmRhdGEuZGF0YS50b3RhbF9jb3VudH3mnaFgXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG90YWwtY291bnRcIikuZGF0YXNldC5pZCA9IGRhdGEuZGF0YS5kYXRhLnRvdGFsX2NvdW50XG4gIHJldHVybiBkYXRhO1xufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==