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
        window.location.href = "./../login/"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY29udGVudC42ZDg2ZWUzMjllYmUzNGNjYWU4My5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLFdBQVcsR0FBRztBQUNkO0FBQ0EsQ0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEM7Ozs7Ozs7Ozs7Ozs7OztBQ2xCa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLG1EQUFLO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7OztBQzFCMEI7QUFDWjtBQUNkLDZDQUFLO0FBQ0wsNkNBQUs7QUFDTDtBQUNBO0FBQ0EsZ0RBQWdELE1BQU07QUFDdEQ7QUFDQTtBQUNBLENBQUM7O0FBRUQsNkNBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQitCO0FBQ0k7QUFDRjtBQUNTO0FBQ0k7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxRQUFRLGdEQUFXO0FBQ25CLE9BQU8sK0NBQVU7QUFDakI7QUFDQSxTQUFTLCtDQUFxQjtBQUM5QixHQUFHO0FBQ0g7O0FBRUE7QUFDQSxpREFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHdCQUF3QjtBQUNsRSxNQUFNO0FBQ047QUFDQTtBQUNBLCtDQUErQyx3QkFBd0I7QUFDdkU7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQSxzQ0FB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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2QsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7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QUFRLElBQUksVUFBVTtBQUNwRCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixrREFBSztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQywyQkFBMkI7QUFDNUQ7QUFDQTtBQUNBLDRCQUE0QixXQUFXO0FBQ3ZDO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQSxnQ0FBZ0MsYUFBYTtBQUM3QztBQUNBO0FBQ0EsZ0NBQWdDLGdCQUFnQjtBQUNoRDtBQUNBO0FBQ0EsZ0NBQWdDLG1CQUFtQjtBQUNuRDtBQUNBO0FBQ0EsZ0NBQWdDLGdCQUFnQjtBQUNoRDtBQUNBO0FBQ0Esa0VBQWtFLFFBQVE7QUFDMUUsMERBQTBELFFBQVE7QUFDbEU7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGdFQUFnRSxvQkFBb0I7QUFDcEY7QUFDQSx5REFBeUQsMkJBQTJCO0FBQ3BGO0FBQ0E7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZS9jb250ZW50L2luZGV4LmNzcz9iYjA4Iiwid2VicGFjazovLy8uL3V0aWxzL2FsZXJ0LmpzIiwid2VicGFjazovLy8uL3V0aWxzL2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NIZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2J1aWxkRnVsbFBhdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21ldGhvZExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldEZvcm1EYXRhSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9lbnYvZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL0h0dHBTdGF0dXNDb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9lc3RpbWF0ZURhdGFVUkxEZWNvZGVkQnl0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0F4aW9zRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplVVJMRm9yUHJvdG9jb2xDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbnVsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZVByb3RvY29sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc2FuaXRpemVIZWFkZXJWYWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3BlZWRvbWV0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdGhyb3R0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvRm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy92YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvQmxvYi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9Gb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9VUkxTZWFyY2hQYXJhbXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vY29tbW9uL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL3NldCBhbm9ueW1vdXMgZGVmYXVsdCBleHBvcnQgbmFtZSIsIndlYnBhY2s6Ly8vLi9wYWdlL2NvbnRlbnQvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8g5by556qX5o+S5Lu2XG4vLyDpnIDopoHlhYjlh4blpIcgYWxlcnQg5qC35byP55u45YWz55qEIERPTVxuLyoqXG4gKiBCUyDnmoQgQWxlcnQg6K2m5ZGK5qGG5Ye95pWw77yMMuenkuWQjuiHquWKqOa2iOWksVxuICogQHBhcmFtIHsqfSBpc1N1Y2Nlc3Mg5oiQ5YqfIHRydWXvvIzlpLHotKUgZmFsc2VcbiAqIEBwYXJhbSB7Kn0gbXNnIOaPkOekuua2iOaBr1xuICovXG4gZXhwb3J0IGZ1bmN0aW9uIG15QWxlcnQoaXNTdWNjZXNzLCBtc2cpIHtcbiAgY29uc3QgbXlBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydCcpXG4gIG15QWxlcnQuY2xhc3NMaXN0LmFkZChpc1N1Y2Nlc3MgPyAnYWxlcnQtc3VjY2VzcycgOiAnYWxlcnQtZGFuZ2VyJylcbiAgbXlBbGVydC5pbm5lckhUTUwgPSBtc2dcbiAgbXlBbGVydC5jbGFzc0xpc3QuYWRkKCdzaG93JylcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBteUFsZXJ0LmNsYXNzTGlzdC5yZW1vdmUoaXNTdWNjZXNzID8gJ2FsZXJ0LXN1Y2Nlc3MnIDogJ2FsZXJ0LWRhbmdlcicpXG4gICAgbXlBbGVydC5pbm5lckhUTUwgPSAnJ1xuICAgIG15QWxlcnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpXG4gIH0sIDIwMDApXG59IiwiaW1wb3J0IHtheGlvc30gZnJvbSBcIkAvcmVxdWVzdC5qc1wiXG5mdW5jdGlvbiBhdXRoKCkge1xuICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKSkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLi8uLi9sb2dpbi9cIlxuICAgIH1cbn1cblxuZnVuY3Rpb24gc2F2ZVRva2VuKHRva2VuKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2tlblwiLCBKU09OLnN0cmluZ2lmeSh0b2tlbikpO1xufVxuXG5sb2dvdXQoKTtcbmZ1bmN0aW9uIGxvZ291dCgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnF1aXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ0b2tlblwiKTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKClcbiAgICB9KVxufVxuZ2V0UHJvZmlsZSgpXG5mdW5jdGlvbiBnZXRQcm9maWxlKCkge1xuICAgIGF4aW9zKHtcbiAgICAgICAgdXJsOiBcIi92MV8wL3VzZXIvcHJvZmlsZVwiXG4gICAgfSkudGhlbihyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocilcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uaWNrLW5hbWVcIikuaW5uZXJIVE1MID0gXCLmmLXnp7AgXCIgKyByLmRhdGEuZGF0YS5uYW1lO1xuICAgIH0pXG59XG5leHBvcnQge2F1dGh9IiwiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuZXhwb3J0IHtheGlvc31cbmF4aW9zLmRlZmF1bHRzLmJhc2VVUkwgPSBcImh0dHBzOi8vZ2Vlay5pdGhlaW1hLm5ldC9cIjtcbmF4aW9zLmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZShjb25maWcgPT4ge1xuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKSA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKSkudG9rZW4gOiBcIlwiO1xuICAgIGlmICh0b2tlbikge1xuICAgICAgICBjb25maWcuaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJzICR7dG9rZW59YDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZ1xufSlcblxuYXhpb3MuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnVzZShudWxsLCBlcnJvciA9PiB7XG4gICAgaWYgKGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpICYmIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInRva2VuXCIpO1xuICAgICAgICBteUFsZXJ0KGZhbHNlLCBcIui6q+S7vemqjOivgeWksei0pVwiKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBcIi4vLi4vbG9naW4vXCJcbiAgICAgICAgfSwgMjAwMClcbiAgICB9XG4gICAgdGhyb3cgZXJyb3Jcbn0pIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBodHRwQWRhcHRlciBmcm9tICcuL2h0dHAuanMnO1xuaW1wb3J0IHhockFkYXB0ZXIgZnJvbSAnLi94aHIuanMnO1xuaW1wb3J0ICogYXMgZmV0Y2hBZGFwdGVyIGZyb20gJy4vZmV0Y2guanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcblxuLyoqXG4gKiBLbm93biBhZGFwdGVycyBtYXBwaW5nLlxuICogUHJvdmlkZXMgZW52aXJvbm1lbnQtc3BlY2lmaWMgYWRhcHRlcnMgZm9yIEF4aW9zOlxuICogLSBgaHR0cGAgZm9yIE5vZGUuanNcbiAqIC0gYHhocmAgZm9yIGJyb3dzZXJzXG4gKiAtIGBmZXRjaGAgZm9yIGZldGNoIEFQSS1iYXNlZCByZXF1ZXN0c1xuICpcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBGdW5jdGlvbnxPYmplY3Q+fVxuICovXG5jb25zdCBrbm93bkFkYXB0ZXJzID0ge1xuICBodHRwOiBodHRwQWRhcHRlcixcbiAgeGhyOiB4aHJBZGFwdGVyLFxuICBmZXRjaDoge1xuICAgIGdldDogZmV0Y2hBZGFwdGVyLmdldEZldGNoLFxuICB9LFxufTtcblxuLy8gQXNzaWduIGFkYXB0ZXIgbmFtZXMgZm9yIGVhc2llciBkZWJ1Z2dpbmcgYW5kIGlkZW50aWZpY2F0aW9uXG51dGlscy5mb3JFYWNoKGtub3duQWRhcHRlcnMsIChmbiwgdmFsdWUpID0+IHtcbiAgaWYgKGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIE51bGwtcHJvdG8gZGVzY3JpcHRvcnMgc28gYSBwb2xsdXRlZCBPYmplY3QucHJvdG90eXBlLmdldCBjYW5ub3QgdHVyblxuICAgICAgLy8gdGhlc2UgZGF0YSBkZXNjcmlwdG9ycyBpbnRvIGFjY2Vzc29yIGRlc2NyaXB0b3JzIG9uIHRoZSB3YXkgaW4uXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICduYW1lJywgeyBfX3Byb3RvX186IG51bGwsIHZhbHVlIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICdhZGFwdGVyTmFtZScsIHsgX19wcm90b19fOiBudWxsLCB2YWx1ZSB9KTtcbiAgfVxufSk7XG5cbi8qKlxuICogUmVuZGVyIGEgcmVqZWN0aW9uIHJlYXNvbiBzdHJpbmcgZm9yIHVua25vd24gb3IgdW5zdXBwb3J0ZWQgYWRhcHRlcnNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVhc29uXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5jb25zdCByZW5kZXJSZWFzb24gPSAocmVhc29uKSA9PiBgLSAke3JlYXNvbn1gO1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBhZGFwdGVyIGlzIHJlc29sdmVkIChmdW5jdGlvbiwgbnVsbCwgb3IgZmFsc2UpXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbnxudWxsfGZhbHNlfSBhZGFwdGVyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNSZXNvbHZlZEhhbmRsZSA9IChhZGFwdGVyKSA9PlxuICB1dGlscy5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IGFkYXB0ZXIgPT09IG51bGwgfHwgYWRhcHRlciA9PT0gZmFsc2U7XG5cbi8qKlxuICogR2V0IHRoZSBmaXJzdCBzdWl0YWJsZSBhZGFwdGVyIGZyb20gdGhlIHByb3ZpZGVkIGxpc3QuXG4gKiBUcmllcyBlYWNoIGFkYXB0ZXIgaW4gb3JkZXIgdW50aWwgYSBzdXBwb3J0ZWQgb25lIGlzIGZvdW5kLlxuICogVGhyb3dzIGFuIEF4aW9zRXJyb3IgaWYgbm8gYWRhcHRlciBpcyBzdWl0YWJsZS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PHN0cmluZ3xGdW5jdGlvbj58c3RyaW5nfEZ1bmN0aW9ufSBhZGFwdGVycyAtIEFkYXB0ZXIocykgYnkgbmFtZSBvciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBBeGlvcyByZXF1ZXN0IGNvbmZpZ3VyYXRpb25cbiAqIEB0aHJvd3Mge0F4aW9zRXJyb3J9IElmIG5vIHN1aXRhYmxlIGFkYXB0ZXIgaXMgYXZhaWxhYmxlXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFRoZSByZXNvbHZlZCBhZGFwdGVyIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldEFkYXB0ZXIoYWRhcHRlcnMsIGNvbmZpZykge1xuICBhZGFwdGVycyA9IHV0aWxzLmlzQXJyYXkoYWRhcHRlcnMpID8gYWRhcHRlcnMgOiBbYWRhcHRlcnNdO1xuXG4gIGNvbnN0IHsgbGVuZ3RoIH0gPSBhZGFwdGVycztcbiAgbGV0IG5hbWVPckFkYXB0ZXI7XG4gIGxldCBhZGFwdGVyO1xuXG4gIGNvbnN0IHJlamVjdGVkUmVhc29ucyA9IHt9O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBuYW1lT3JBZGFwdGVyID0gYWRhcHRlcnNbaV07XG4gICAgbGV0IGlkO1xuXG4gICAgYWRhcHRlciA9IG5hbWVPckFkYXB0ZXI7XG5cbiAgICBpZiAoIWlzUmVzb2x2ZWRIYW5kbGUobmFtZU9yQWRhcHRlcikpIHtcbiAgICAgIGFkYXB0ZXIgPSBrbm93bkFkYXB0ZXJzWyhpZCA9IFN0cmluZyhuYW1lT3JBZGFwdGVyKSkudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgIGlmIChhZGFwdGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoYFVua25vd24gYWRhcHRlciAnJHtpZH0nYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFkYXB0ZXIgJiYgKHV0aWxzLmlzRnVuY3Rpb24oYWRhcHRlcikgfHwgKGFkYXB0ZXIgPSBhZGFwdGVyLmdldChjb25maWcpKSkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJlamVjdGVkUmVhc29uc1tpZCB8fCAnIycgKyBpXSA9IGFkYXB0ZXI7XG4gIH1cblxuICBpZiAoIWFkYXB0ZXIpIHtcbiAgICBjb25zdCByZWFzb25zID0gT2JqZWN0LmVudHJpZXMocmVqZWN0ZWRSZWFzb25zKS5tYXAoXG4gICAgICAoW2lkLCBzdGF0ZV0pID0+XG4gICAgICAgIGBhZGFwdGVyICR7aWR9IGAgK1xuICAgICAgICAoc3RhdGUgPT09IGZhbHNlID8gJ2lzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGVudmlyb25tZW50JyA6ICdpcyBub3QgYXZhaWxhYmxlIGluIHRoZSBidWlsZCcpXG4gICAgKTtcblxuICAgIGxldCBzID0gbGVuZ3RoXG4gICAgICA/IHJlYXNvbnMubGVuZ3RoID4gMVxuICAgICAgICA/ICdzaW5jZSA6XFxuJyArIHJlYXNvbnMubWFwKHJlbmRlclJlYXNvbikuam9pbignXFxuJylcbiAgICAgICAgOiAnICcgKyByZW5kZXJSZWFzb24ocmVhc29uc1swXSlcbiAgICAgIDogJ2FzIG5vIGFkYXB0ZXIgc3BlY2lmaWVkJztcblxuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgYFRoZXJlIGlzIG5vIHN1aXRhYmxlIGFkYXB0ZXIgdG8gZGlzcGF0Y2ggdGhlIHJlcXVlc3QgYCArIHMsXG4gICAgICBBeGlvc0Vycm9yLkVSUl9OT1RfU1VQUE9SVFxuICAgICk7XG4gIH1cblxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxuLyoqXG4gKiBFeHBvcnRzIEF4aW9zIGFkYXB0ZXJzIGFuZCB1dGlsaXR5IHRvIHJlc29sdmUgYW4gYWRhcHRlclxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBSZXNvbHZlIGFuIGFkYXB0ZXIgZnJvbSBhIGxpc3Qgb2YgYWRhcHRlciBuYW1lcyBvciBmdW5jdGlvbnMuXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIGdldEFkYXB0ZXIsXG5cbiAgLyoqXG4gICAqIEV4cG9zZXMgYWxsIGtub3duIGFkYXB0ZXJzXG4gICAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBGdW5jdGlvbnxPYmplY3Q+fVxuICAgKi9cbiAgYWRhcHRlcnM6IGtub3duQWRhcHRlcnMsXG59O1xuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IGNvbXBvc2VTaWduYWxzIGZyb20gJy4uL2hlbHBlcnMvY29tcG9zZVNpZ25hbHMuanMnO1xuaW1wb3J0IHsgdHJhY2tTdHJlYW0gfSBmcm9tICcuLi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IHtcbiAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIsXG4gIHByb2dyZXNzRXZlbnREZWNvcmF0b3IsXG4gIGFzeW5jRGVjb3JhdG9yLFxufSBmcm9tICcuLi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzJztcbmltcG9ydCByZXNvbHZlQ29uZmlnIGZyb20gJy4uL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qcyc7XG5pbXBvcnQgc2V0dGxlIGZyb20gJy4uL2NvcmUvc2V0dGxlLmpzJztcbmltcG9ydCBlc3RpbWF0ZURhdGFVUkxEZWNvZGVkQnl0ZXMgZnJvbSAnLi4vaGVscGVycy9lc3RpbWF0ZURhdGFVUkxEZWNvZGVkQnl0ZXMuanMnO1xuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gJy4uL2Vudi9kYXRhLmpzJztcbmltcG9ydCB7IHRvQnl0ZVN0cmluZ0hlYWRlck9iamVjdCB9IGZyb20gJy4uL2hlbHBlcnMvc2FuaXRpemVIZWFkZXJWYWx1ZS5qcyc7XG5cbmNvbnN0IERFRkFVTFRfQ0hVTktfU0laRSA9IDY0ICogMTAyNDtcblxuY29uc3QgREVGQVVMVF9SRVFVRVNUX09QVElPTlMgPSB7XG4gIGNhY2hlOiAnZGVmYXVsdCcsXG4gIHJlZGlyZWN0OiAnZm9sbG93JyxcbiAgcmVmZXJyZXI6ICdhYm91dDpjbGllbnQnLFxuICByZWZlcnJlclBvbGljeTogJycsXG4gIG1vZGU6ICdjb3JzJyxcbiAgaW50ZWdyaXR5OiAnJyxcbiAga2VlcGFsaXZlOiBmYWxzZSxcbiAgcHJpb3JpdHk6ICdhdXRvJyxcbiAgd2luZG93OiBudWxsLFxufTtcblxuY29uc3QgeyBpc0Z1bmN0aW9uIH0gPSB1dGlscztcblxuLyoqXG4gKiBFbmNvZGUgYSBVVEYtOCBzdHJpbmcgdG8gYSBMYXRpbi0xIGJ5dGUgc3RyaW5nIGZvciB1c2Ugd2l0aCBidG9hKCkuXG4gKiBUaGlzIGlzIGEgbW9kZXJuIHJlcGxhY2VtZW50IGZvciB0aGUgZGVwcmVjYXRlZCB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkgcGF0dGVybi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gZW5jb2RlXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVVRGLTggYnl0ZXMgYXMgYSBMYXRpbi0xIHN0cmluZ1xuICovXG5jb25zdCBlbmNvZGVVVEY4ID0gKHN0cikgPT5cbiAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvJShbMC05QS1GXXsyfSkvZ2ksIChfLCBoZXgpID0+XG4gICAgU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChoZXgsIDE2KSlcbiAgKTtcblxuLy8gTm9kZSdzIFdIQVRXRyBVUkwgcGFyc2VyIHJldHVybnMgYHVzZXJuYW1lYCBhbmQgYHBhc3N3b3JkYCBwZXJjZW50LWVuY29kZWQuXG4vLyBEZWNvZGUgYmVmb3JlIGNvbXBvc2luZyB0aGUgYGF1dGhgIG9wdGlvbiBzbyBjcmVkZW50aWFscyBzdWNoIGFzXG4vLyBgbXklNDBlbWFpbC5jb206cGFzc2AgYXJlIHNlbnQgYXMgYG15QGVtYWlsLmNvbTpwYXNzYC4gRmFsbHMgYmFjayB0byB0aGVcbi8vIG9yaWdpbmFsIHZhbHVlIGZvciBtYWxmb3JtZWQgaW5wdXQgc28gYSBiYWQgZW5jb2RpbmcgbmV2ZXIgdGhyb3dzLlxuY29uc3QgZGVjb2RlVVJJQ29tcG9uZW50U2FmZSA9ICh2YWx1ZSkgPT4ge1xuICBpZiAoIXV0aWxzLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59O1xuXG5jb25zdCB0ZXN0ID0gKGZuLCAuLi5hcmdzKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZm4oLi4uYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IG1heWJlV2l0aEF1dGhDcmVkZW50aWFscyA9ICh1cmwpID0+IHtcbiAgY29uc3QgcHJvdG9jb2xJbmRleCA9IHVybC5pbmRleE9mKCc6Ly8nKTtcbiAgbGV0IHVybFRvQ2hlY2sgPSB1cmw7XG4gIGlmIChwcm90b2NvbEluZGV4ICE9PSAtMSkge1xuICAgIHVybFRvQ2hlY2sgPSB1cmxUb0NoZWNrLnNsaWNlKHByb3RvY29sSW5kZXggKyAzKTtcbiAgfVxuICByZXR1cm4gdXJsVG9DaGVjay5pbmNsdWRlcygnQCcpIHx8IHVybFRvQ2hlY2suaW5jbHVkZXMoJzonKTtcbn07XG5cbmNvbnN0IGZhY3RvcnkgPSAoZW52KSA9PiB7XG4gIGNvbnN0IGdsb2JhbE9iamVjdCA9XG4gICAgdXRpbHMuZ2xvYmFsICE9PSB1bmRlZmluZWQgJiYgdXRpbHMuZ2xvYmFsICE9PSBudWxsID8gdXRpbHMuZ2xvYmFsIDogZ2xvYmFsVGhpcztcbiAgY29uc3QgeyBSZWFkYWJsZVN0cmVhbSwgVGV4dEVuY29kZXIgfSA9IGdsb2JhbE9iamVjdDtcblxuICBlbnYgPSB1dGlscy5tZXJnZS5jYWxsKFxuICAgIHtcbiAgICAgIHNraXBVbmRlZmluZWQ6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBSZXF1ZXN0OiBnbG9iYWxPYmplY3QuUmVxdWVzdCxcbiAgICAgIFJlc3BvbnNlOiBnbG9iYWxPYmplY3QuUmVzcG9uc2UsXG4gICAgfSxcbiAgICBlbnZcbiAgKTtcblxuICBjb25zdCB7IGZldGNoOiBlbnZGZXRjaCwgUmVxdWVzdCwgUmVzcG9uc2UgfSA9IGVudjtcbiAgY29uc3QgaXNGZXRjaFN1cHBvcnRlZCA9IGVudkZldGNoID8gaXNGdW5jdGlvbihlbnZGZXRjaCkgOiB0eXBlb2YgZmV0Y2ggPT09ICdmdW5jdGlvbic7XG4gIGNvbnN0IGlzUmVxdWVzdFN1cHBvcnRlZCA9IGlzRnVuY3Rpb24oUmVxdWVzdCk7XG4gIGNvbnN0IGlzUmVzcG9uc2VTdXBwb3J0ZWQgPSBpc0Z1bmN0aW9uKFJlc3BvbnNlKTtcblxuICBpZiAoIWlzRmV0Y2hTdXBwb3J0ZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkID0gaXNGZXRjaFN1cHBvcnRlZCAmJiBpc0Z1bmN0aW9uKFJlYWRhYmxlU3RyZWFtKTtcblxuICBjb25zdCBlbmNvZGVUZXh0ID1cbiAgICBpc0ZldGNoU3VwcG9ydGVkICYmXG4gICAgKHR5cGVvZiBUZXh0RW5jb2RlciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyAoXG4gICAgICAgICAgKGVuY29kZXIpID0+IChzdHIpID0+XG4gICAgICAgICAgICBlbmNvZGVyLmVuY29kZShzdHIpXG4gICAgICAgICkobmV3IFRleHRFbmNvZGVyKCkpXG4gICAgICA6IGFzeW5jIChzdHIpID0+IG5ldyBVaW50OEFycmF5KGF3YWl0IG5ldyBSZXF1ZXN0KHN0cikuYXJyYXlCdWZmZXIoKSkpO1xuXG4gIGNvbnN0IHN1cHBvcnRzUmVxdWVzdFN0cmVhbSA9XG4gICAgaXNSZXF1ZXN0U3VwcG9ydGVkICYmXG4gICAgaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJlxuICAgIHRlc3QoKCkgPT4ge1xuICAgICAgbGV0IGR1cGxleEFjY2Vzc2VkID0gZmFsc2U7XG5cbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICAgICAgYm9keTogbmV3IFJlYWRhYmxlU3RyZWFtKCksXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBnZXQgZHVwbGV4KCkge1xuICAgICAgICAgIGR1cGxleEFjY2Vzc2VkID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gJ2hhbGYnO1xuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGhhc0NvbnRlbnRUeXBlID0gcmVxdWVzdC5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJyk7XG5cbiAgICAgIGlmIChyZXF1ZXN0LmJvZHkgIT0gbnVsbCkge1xuICAgICAgICByZXF1ZXN0LmJvZHkuY2FuY2VsKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkdXBsZXhBY2Nlc3NlZCAmJiAhaGFzQ29udGVudFR5cGU7XG4gICAgfSk7XG5cbiAgY29uc3Qgc3VwcG9ydHNSZXNwb25zZVN0cmVhbSA9XG4gICAgaXNSZXNwb25zZVN1cHBvcnRlZCAmJlxuICAgIGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiZcbiAgICB0ZXN0KCgpID0+IHV0aWxzLmlzUmVhZGFibGVTdHJlYW0obmV3IFJlc3BvbnNlKCcnKS5ib2R5KSk7XG5cbiAgY29uc3QgcmVzb2x2ZXJzID0ge1xuICAgIHN0cmVhbTogc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAoKHJlcykgPT4gcmVzLmJvZHkpLFxuICB9O1xuXG4gIGlzRmV0Y2hTdXBwb3J0ZWQgJiZcbiAgICAoKCkgPT4ge1xuICAgICAgWyd0ZXh0JywgJ2FycmF5QnVmZmVyJywgJ2Jsb2InLCAnZm9ybURhdGEnLCAnc3RyZWFtJ10uZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICAhcmVzb2x2ZXJzW3R5cGVdICYmXG4gICAgICAgICAgKHJlc29sdmVyc1t0eXBlXSA9IChyZXMsIGNvbmZpZykgPT4ge1xuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IHJlcyAmJiByZXNbdHlwZV07XG5cbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5jYWxsKHJlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgICBgUmVzcG9uc2UgdHlwZSAnJHt0eXBlfScgaXMgbm90IHN1cHBvcnRlZGAsXG4gICAgICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX05PVF9TVVBQT1JULFxuICAgICAgICAgICAgICBjb25maWdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KSgpO1xuXG4gIGNvbnN0IGdldEJvZHlMZW5ndGggPSBhc3luYyAoYm9keSkgPT4ge1xuICAgIGlmIChib2R5ID09IG51bGwpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0Jsb2IoYm9keSkpIHtcbiAgICAgIHJldHVybiBib2R5LnNpemU7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzU3BlY0NvbXBsaWFudEZvcm0oYm9keSkpIHtcbiAgICAgIGNvbnN0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QocGxhdGZvcm0ub3JpZ2luLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5LFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gKGF3YWl0IF9yZXF1ZXN0LmFycmF5QnVmZmVyKCkpLmJ5dGVMZW5ndGg7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpIHx8IHV0aWxzLmlzQXJyYXlCdWZmZXIoYm9keSkpIHtcbiAgICAgIHJldHVybiBib2R5LmJ5dGVMZW5ndGg7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGJvZHkpKSB7XG4gICAgICBib2R5ID0gYm9keSArICcnO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc1N0cmluZyhib2R5KSkge1xuICAgICAgcmV0dXJuIChhd2FpdCBlbmNvZGVUZXh0KGJvZHkpKS5ieXRlTGVuZ3RoO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZXNvbHZlQm9keUxlbmd0aCA9IGFzeW5jIChoZWFkZXJzLCBib2R5KSA9PiB7XG4gICAgY29uc3QgbGVuZ3RoID0gdXRpbHMudG9GaW5pdGVOdW1iZXIoaGVhZGVycy5nZXRDb250ZW50TGVuZ3RoKCkpO1xuXG4gICAgcmV0dXJuIGxlbmd0aCA9PSBudWxsID8gZ2V0Qm9keUxlbmd0aChib2R5KSA6IGxlbmd0aDtcbiAgfTtcblxuICByZXR1cm4gYXN5bmMgKGNvbmZpZykgPT4ge1xuICAgIGxldCB7XG4gICAgICB1cmwsXG4gICAgICBtZXRob2QsXG4gICAgICBkYXRhLFxuICAgICAgc2lnbmFsLFxuICAgICAgY2FuY2VsVG9rZW4sXG4gICAgICB0aW1lb3V0LFxuICAgICAgb25Eb3dubG9hZFByb2dyZXNzLFxuICAgICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICAgIHJlc3BvbnNlVHlwZSxcbiAgICAgIGhlYWRlcnMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHMgPSAnc2FtZS1vcmlnaW4nLFxuICAgICAgZmV0Y2hPcHRpb25zLFxuICAgICAgbWF4Q29udGVudExlbmd0aCxcbiAgICAgIG1heEJvZHlMZW5ndGgsXG4gICAgICBtYXhSZWRpcmVjdHMsXG4gICAgfSA9IHJlc29sdmVDb25maWcoY29uZmlnKTtcblxuICAgIGNvbnN0IGhhc01heENvbnRlbnRMZW5ndGggPSB1dGlscy5pc051bWJlcihtYXhDb250ZW50TGVuZ3RoKSAmJiBtYXhDb250ZW50TGVuZ3RoID4gLTE7XG4gICAgY29uc3QgaGFzTWF4Qm9keUxlbmd0aCA9IHV0aWxzLmlzTnVtYmVyKG1heEJvZHlMZW5ndGgpICYmIG1heEJvZHlMZW5ndGggPiAtMTtcbiAgICBjb25zdCBvd24gPSAoa2V5KSA9PiAodXRpbHMuaGFzT3duUHJvcChjb25maWcsIGtleSkgPyBjb25maWdba2V5XSA6IHVuZGVmaW5lZCk7XG5cbiAgICBsZXQgX2ZldGNoID0gZW52RmV0Y2ggfHwgZmV0Y2g7XG5cbiAgICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUgPyAocmVzcG9uc2VUeXBlICsgJycpLnRvTG93ZXJDYXNlKCkgOiAndGV4dCc7XG5cbiAgICBsZXQgY29tcG9zZWRTaWduYWwgPSBjb21wb3NlU2lnbmFscyhcbiAgICAgIFtzaWduYWwsIGNhbmNlbFRva2VuICYmIGNhbmNlbFRva2VuLnRvQWJvcnRTaWduYWwoKV0sXG4gICAgICB0aW1lb3V0XG4gICAgKTtcblxuICAgIGxldCByZXF1ZXN0ID0gbnVsbDtcblxuICAgIGNvbnN0IHVuc3Vic2NyaWJlID1cbiAgICAgIGNvbXBvc2VkU2lnbmFsICYmXG4gICAgICBjb21wb3NlZFNpZ25hbC51bnN1YnNjcmliZSAmJlxuICAgICAgKCgpID0+IHtcbiAgICAgICAgY29tcG9zZWRTaWduYWwudW5zdWJzY3JpYmUoKTtcbiAgICAgIH0pO1xuXG4gICAgbGV0IHJlcXVlc3RDb250ZW50TGVuZ3RoO1xuXG4gICAgLy8gQXhpb3NFcnJvciB3ZSByYWlzZSB3aGlsZSB0aGUgcmVxdWVzdCBib2R5IGlzIGJlaW5nIHN0cmVhbWVkLiBDYXB0dXJlZFxuICAgIC8vIGJ5IGlkZW50aXR5IHNvIHRoZSBjYXRjaCBibG9jayBjYW4gc3VyZmFjZSBpdCBkaXJlY3RseSwgcmVnYXJkbGVzcyBvZlxuICAgIC8vIGhvdyB0aGUgcnVudGltZSB3cmFwcyB0aGUgcmVzdWx0aW5nIGZldGNoIHJlamVjdGlvbiAodW5kaWNpIGV4cG9zZXMgaXRcbiAgICAvLyBhcyBgZXJyLmNhdXNlYDsgc29tZSBicm93c2VycyBkcm9wIHRoZSBvcmlnaW5hbCBlcnJvciBlbnRpcmVseSkuXG4gICAgbGV0IHBlbmRpbmdCb2R5RXJyb3IgPSBudWxsO1xuXG4gICAgY29uc3QgbWF4Qm9keUxlbmd0aEVycm9yID0gKCkgPT5cbiAgICAgIG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAnUmVxdWVzdCBib2R5IGxhcmdlciB0aGFuIG1heEJvZHlMZW5ndGggbGltaXQnLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0XG4gICAgICApO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICAgIGxldCBhdXRoID0gdW5kZWZpbmVkO1xuICAgICAgY29uc3QgY29uZmlnQXV0aCA9IG93bignYXV0aCcpO1xuXG4gICAgICBpZiAoY29uZmlnQXV0aCkge1xuICAgICAgICBjb25zdCB1c2VybmFtZSA9IHV0aWxzLmdldFNhZmVQcm9wKGNvbmZpZ0F1dGgsICd1c2VybmFtZScpIHx8ICcnO1xuICAgICAgICBjb25zdCBwYXNzd29yZCA9IHV0aWxzLmdldFNhZmVQcm9wKGNvbmZpZ0F1dGgsICdwYXNzd29yZCcpIHx8ICcnO1xuICAgICAgICBhdXRoID0ge1xuICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAobWF5YmVXaXRoQXV0aENyZWRlbnRpYWxzKHVybCkpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkVVJMID0gbmV3IFVSTCh1cmwsIHBsYXRmb3JtLm9yaWdpbik7XG5cbiAgICAgICAgaWYgKCFhdXRoICYmIChwYXJzZWRVUkwudXNlcm5hbWUgfHwgcGFyc2VkVVJMLnBhc3N3b3JkKSkge1xuICAgICAgICAgIGNvbnN0IHVybFVzZXJuYW1lID0gZGVjb2RlVVJJQ29tcG9uZW50U2FmZShwYXJzZWRVUkwudXNlcm5hbWUpO1xuICAgICAgICAgIGNvbnN0IHVybFBhc3N3b3JkID0gZGVjb2RlVVJJQ29tcG9uZW50U2FmZShwYXJzZWRVUkwucGFzc3dvcmQpO1xuICAgICAgICAgIGF1dGggPSB7XG4gICAgICAgICAgICB1c2VybmFtZTogdXJsVXNlcm5hbWUsXG4gICAgICAgICAgICBwYXNzd29yZDogdXJsUGFzc3dvcmQsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZWRVUkwudXNlcm5hbWUgfHwgcGFyc2VkVVJMLnBhc3N3b3JkKSB7XG4gICAgICAgICAgcGFyc2VkVVJMLnVzZXJuYW1lID0gJyc7XG4gICAgICAgICAgcGFyc2VkVVJMLnBhc3N3b3JkID0gJyc7XG4gICAgICAgICAgdXJsID0gcGFyc2VkVVJMLmhyZWY7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGF1dGgpIHtcbiAgICAgICAgaGVhZGVycy5kZWxldGUoJ2F1dGhvcml6YXRpb24nKTtcbiAgICAgICAgaGVhZGVycy5zZXQoXG4gICAgICAgICAgJ0F1dGhvcml6YXRpb24nLFxuICAgICAgICAgICdCYXNpYyAnICsgYnRvYShlbmNvZGVVVEY4KChhdXRoLnVzZXJuYW1lIHx8ICcnKSArICc6JyArIChhdXRoLnBhc3N3b3JkIHx8ICcnKSkpXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIEVuZm9yY2UgbWF4Q29udGVudExlbmd0aCBmb3IgZGF0YTogVVJMcyB1cC1mcm9udCBzbyB3ZSBuZXZlciBtYXRlcmlhbGl6ZVxuICAgICAgLy8gYW4gb3ZlcnNpemVkIHBheWxvYWQuIFRoZSBIVFRQIGFkYXB0ZXIgYXBwbGllcyB0aGUgc2FtZSBjaGVjayAoc2VlIGh0dHAuanNcbiAgICAgIC8vIFwiaWYgKHByb3RvY29sID09PSAnZGF0YTonKVwiIGJyYW5jaCkuXG4gICAgICBpZiAoaGFzTWF4Q29udGVudExlbmd0aCAmJiB0eXBlb2YgdXJsID09PSAnc3RyaW5nJyAmJiB1cmwuc3RhcnRzV2l0aCgnZGF0YTonKSkge1xuICAgICAgICBjb25zdCBlc3RpbWF0ZWQgPSBlc3RpbWF0ZURhdGFVUkxEZWNvZGVkQnl0ZXModXJsKTtcbiAgICAgICAgaWYgKGVzdGltYXRlZCA+IG1heENvbnRlbnRMZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAgICdtYXhDb250ZW50TGVuZ3RoIHNpemUgb2YgJyArIG1heENvbnRlbnRMZW5ndGggKyAnIGV4Y2VlZGVkJyxcbiAgICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSxcbiAgICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEVuZm9yY2UgbWF4Qm9keUxlbmd0aCBhZ2FpbnN0IGtub3duLXNpemUgYm9kaWVzIGJlZm9yZSBkaXNwYXRjaCB1c2luZ1xuICAgICAgLy8gdGhlIGJvZHkncyAqYWN0dWFsKiBzaXplIOKAlCBuZXZlciBhIGNhbGxlci1kZWNsYXJlZCBDb250ZW50LUxlbmd0aCxcbiAgICAgIC8vIHdoaWNoIGNvdWxkIHVuZGVyLXJlcG9ydCB0byBzbGlwIGFuIG92ZXJzaXplZCBib2R5IHBhc3QgdGhlIGNoZWNrLlxuICAgICAgLy8gVW5rbm93bi1zaXplIHN0cmVhbXMgcmV0dXJuIHVuZGVmaW5lZCBoZXJlIGFuZCBhcmUgY291bnRlZCBwZXItY2h1bmtcbiAgICAgIC8vIGJlbG93IGFzIGZldGNoIGNvbnN1bWVzIHRoZW0uXG4gICAgICBpZiAoaGFzTWF4Qm9keUxlbmd0aCAmJiBtZXRob2QgIT09ICdnZXQnICYmIG1ldGhvZCAhPT0gJ2hlYWQnKSB7XG4gICAgICAgIGNvbnN0IG91dGJvdW5kTGVuZ3RoID0gYXdhaXQgZ2V0Qm9keUxlbmd0aChkYXRhKTtcbiAgICAgICAgaWYgKHR5cGVvZiBvdXRib3VuZExlbmd0aCA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUob3V0Ym91bmRMZW5ndGgpKSB7XG4gICAgICAgICAgcmVxdWVzdENvbnRlbnRMZW5ndGggPSBvdXRib3VuZExlbmd0aDtcbiAgICAgICAgICBpZiAob3V0Ym91bmRMZW5ndGggPiBtYXhCb2R5TGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBtYXhCb2R5TGVuZ3RoRXJyb3IoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQSBzdHJlYW1lZCBib2R5IHVuZGVyIG1heEJvZHlMZW5ndGggbXVzdCBiZSBjb3VudGVkIGFzIGZldGNoIGNvbnN1bWVzXG4gICAgICAvLyBpdDsgaXRzIHNpemUgaXMgbmV2ZXIgdHJ1c3RlZCBmcm9tIGEgY2FsbGVyLWRlY2xhcmVkIENvbnRlbnQtTGVuZ3RoLlxuICAgICAgY29uc3QgbXVzdEVuZm9yY2VTdHJlYW1Cb2R5ID1cbiAgICAgICAgaGFzTWF4Qm9keUxlbmd0aCAmJiAodXRpbHMuaXNSZWFkYWJsZVN0cmVhbShkYXRhKSB8fCB1dGlscy5pc1N0cmVhbShkYXRhKSk7XG5cbiAgICAgIGNvbnN0IHRyYWNrUmVxdWVzdFN0cmVhbSA9IChzdHJlYW0sIG9uUHJvZ3Jlc3MsIGZsdXNoKSA9PlxuICAgICAgICB0cmFja1N0cmVhbShcbiAgICAgICAgICBzdHJlYW0sXG4gICAgICAgICAgREVGQVVMVF9DSFVOS19TSVpFLFxuICAgICAgICAgIChsb2FkZWRCeXRlcykgPT4ge1xuICAgICAgICAgICAgaWYgKGhhc01heEJvZHlMZW5ndGggJiYgbG9hZGVkQnl0ZXMgPiBtYXhCb2R5TGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHRocm93IChwZW5kaW5nQm9keUVycm9yID0gbWF4Qm9keUxlbmd0aEVycm9yKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKGxvYWRlZEJ5dGVzKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZsdXNoXG4gICAgICAgICk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtICYmXG4gICAgICAgIG1ldGhvZCAhPT0gJ2dldCcgJiZcbiAgICAgICAgbWV0aG9kICE9PSAnaGVhZCcgJiZcbiAgICAgICAgKG9uVXBsb2FkUHJvZ3Jlc3MgfHwgbXVzdEVuZm9yY2VTdHJlYW1Cb2R5KVxuICAgICAgKSB7XG4gICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoID1cbiAgICAgICAgICByZXF1ZXN0Q29udGVudExlbmd0aCA9PSBudWxsXG4gICAgICAgICAgICA/IGF3YWl0IHJlc29sdmVCb2R5TGVuZ3RoKGhlYWRlcnMsIGRhdGEpXG4gICAgICAgICAgICA6IHJlcXVlc3RDb250ZW50TGVuZ3RoO1xuXG4gICAgICAgIC8vIEEgZGVjbGFyZWQgbGVuZ3RoIG9mIDAgaXMgb25seSB0cnVzdGVkIHRvIHNraXAgdGhlIHdyYXAgd2hlbiB3ZSBhcmVcbiAgICAgICAgLy8gbm90IGVuZm9yY2luZyBhIHN0cmVhbSBsaW1pdCAod2hpY2ggbXVzdCBub3QgcmVseSBvbiB0aGF0IGhlYWRlcikuXG4gICAgICAgIGlmIChyZXF1ZXN0Q29udGVudExlbmd0aCAhPT0gMCB8fCBtdXN0RW5mb3JjZVN0cmVhbUJvZHkpIHtcbiAgICAgICAgICBsZXQgX3JlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgICAgIGR1cGxleDogJ2hhbGYnLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgbGV0IGNvbnRlbnRUeXBlSGVhZGVyO1xuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdXRpbHMuaXNGb3JtRGF0YShkYXRhKSAmJlxuICAgICAgICAgICAgKGNvbnRlbnRUeXBlSGVhZGVyID0gX3JlcXVlc3QuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShjb250ZW50VHlwZUhlYWRlcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKF9yZXF1ZXN0LmJvZHkpIHtcbiAgICAgICAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPVxuICAgICAgICAgICAgICAob25VcGxvYWRQcm9ncmVzcyAmJlxuICAgICAgICAgICAgICAgIHByb2dyZXNzRXZlbnREZWNvcmF0b3IoXG4gICAgICAgICAgICAgICAgICByZXF1ZXN0Q29udGVudExlbmd0aCxcbiAgICAgICAgICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGFzeW5jRGVjb3JhdG9yKG9uVXBsb2FkUHJvZ3Jlc3MpKVxuICAgICAgICAgICAgICAgICkpIHx8XG4gICAgICAgICAgICAgIFtdO1xuXG4gICAgICAgICAgICBkYXRhID0gdHJhY2tSZXF1ZXN0U3RyZWFtKF9yZXF1ZXN0LmJvZHksIG9uUHJvZ3Jlc3MsIGZsdXNoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIG11c3RFbmZvcmNlU3RyZWFtQm9keSAmJlxuICAgICAgICAhaXNSZXF1ZXN0U3VwcG9ydGVkICYmXG4gICAgICAgIGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiZcbiAgICAgICAgbWV0aG9kICE9PSAnZ2V0JyAmJlxuICAgICAgICBtZXRob2QgIT09ICdoZWFkJ1xuICAgICAgKSB7XG4gICAgICAgIGRhdGEgPSB0cmFja1JlcXVlc3RTdHJlYW0oZGF0YSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBtdXN0RW5mb3JjZVN0cmVhbUJvZHkgJiZcbiAgICAgICAgaXNSZXF1ZXN0U3VwcG9ydGVkICYmXG4gICAgICAgICFzdXBwb3J0c1JlcXVlc3RTdHJlYW0gJiZcbiAgICAgICAgbWV0aG9kICE9PSAnZ2V0JyAmJlxuICAgICAgICBtZXRob2QgIT09ICdoZWFkJ1xuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICdTdHJlYW0gcmVxdWVzdCBib2RpZXMgYXJlIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGN1cnJlbnQgZmV0Y2ggaW1wbGVtZW50YXRpb24nLFxuICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX05PVF9TVVBQT1JULFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdXRpbHMuaXNTdHJpbmcod2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgICB3aXRoQ3JlZGVudGlhbHMgPSB3aXRoQ3JlZGVudGlhbHMgPyAnaW5jbHVkZScgOiAnb21pdCc7XG4gICAgICB9XG5cbiAgICAgIC8vIENsb3VkZmxhcmUgV29ya2VycyB0aHJvd3Mgd2hlbiBjcmVkZW50aWFscyBhcmUgZGVmaW5lZFxuICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jbG91ZGZsYXJlL3dvcmtlcmQvaXNzdWVzLzkwMlxuICAgICAgY29uc3QgaXNDcmVkZW50aWFsc1N1cHBvcnRlZCA9IGlzUmVxdWVzdFN1cHBvcnRlZCAmJiAnY3JlZGVudGlhbHMnIGluIFJlcXVlc3QucHJvdG90eXBlO1xuXG4gICAgICAvLyBJZiBkYXRhIGlzIEZvcm1EYXRhIGFuZCBDb250ZW50LVR5cGUgaXMgbXVsdGlwYXJ0L2Zvcm0tZGF0YSB3aXRob3V0IGJvdW5kYXJ5LFxuICAgICAgLy8gZGVsZXRlIGl0IHNvIGZldGNoIGNhbiBzZXQgaXQgY29ycmVjdGx5IHdpdGggdGhlIGJvdW5kYXJ5XG4gICAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSkge1xuICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNvbnRlbnRUeXBlICYmXG4gICAgICAgICAgL15tdWx0aXBhcnRcXC9mb3JtLWRhdGEvaS50ZXN0KGNvbnRlbnRUeXBlKSAmJlxuICAgICAgICAgICEvYm91bmRhcnk9L2kudGVzdChjb250ZW50VHlwZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaGVhZGVycy5kZWxldGUoJ2NvbnRlbnQtdHlwZScpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBVc2VyLUFnZW50IGhlYWRlciBpZiBub3QgYWxyZWFkeSBzZXQgKGZldGNoIGRlZmF1bHRzIHRvICdub2RlJyBpbiBOb2RlLmpzKVxuICAgICAgaGVhZGVycy5zZXQoJ1VzZXItQWdlbnQnLCAnYXhpb3MvJyArIFZFUlNJT04sIGZhbHNlKTtcblxuICAgICAgY29uc3Qgc2FmZUZldGNoT3B0aW9ucyA9XG4gICAgICAgIGZldGNoT3B0aW9ucyA9PSBudWxsID8gZmV0Y2hPcHRpb25zIDogT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKG51bGwpLCBmZXRjaE9wdGlvbnMpO1xuXG4gICAgICBpZiAoc2FmZUZldGNoT3B0aW9ucykge1xuICAgICAgICAvLyBUaGVzZSBvcHRpb25zIGFyZSBvd25lZCBieSBBeGlvcyBhbmQgYXJlIGFscmVhZHkgcmVmbGVjdGVkIGluIHRoZVxuICAgICAgICAvLyByZXNvbHZlZCBSZXF1ZXN0IHBhc3NlZCB0byBmZXRjaC5cbiAgICAgICAgZGVsZXRlIHNhZmVGZXRjaE9wdGlvbnMuYm9keTtcbiAgICAgICAgZGVsZXRlIHNhZmVGZXRjaE9wdGlvbnMuaGVhZGVycztcbiAgICAgICAgZGVsZXRlIHNhZmVGZXRjaE9wdGlvbnMubWV0aG9kO1xuICAgICAgICBkZWxldGUgc2FmZUZldGNoT3B0aW9ucy5zaWduYWw7XG4gICAgICAgIGRlbGV0ZSBzYWZlRmV0Y2hPcHRpb25zLmR1cGxleDtcbiAgICAgICAgZGVsZXRlIHNhZmVGZXRjaE9wdGlvbnMuY3JlZGVudGlhbHM7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc29sdmVkT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShudWxsKSwgc2FmZUZldGNoT3B0aW9ucywge1xuICAgICAgICBzaWduYWw6IGNvbXBvc2VkU2lnbmFsLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuICAgICAgICBoZWFkZXJzOiB0b0J5dGVTdHJpbmdIZWFkZXJPYmplY3QoaGVhZGVycy5ub3JtYWxpemUoKSksXG4gICAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAgIGR1cGxleDogJ2hhbGYnLFxuICAgICAgICBjcmVkZW50aWFsczogaXNDcmVkZW50aWFsc1N1cHBvcnRlZCA/IHdpdGhDcmVkZW50aWFscyA6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaXNSZXF1ZXN0U3VwcG9ydGVkKSB7XG4gICAgICAgIHV0aWxzLmZvckVhY2goREVGQVVMVF9SRVFVRVNUX09QVElPTlMsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgaWYgKHJlc29sdmVkT3B0aW9uc1trZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc29sdmVkT3B0aW9uc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzb2x2ZWRPcHRpb25zLnNpZ25hbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzb2x2ZWRPcHRpb25zLnNpZ25hbCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzb2x2ZWRPcHRpb25zLmJvZHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlc29sdmVkT3B0aW9ucy5ib2R5ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWF4UmVkaXJlY3RzID09PSAwKSB7XG4gICAgICAgIHJlc29sdmVkT3B0aW9ucy5yZWRpcmVjdCA9ICdtYW51YWwnO1xuXG4gICAgICAgIGlmIChzYWZlRmV0Y2hPcHRpb25zKSB7XG4gICAgICAgICAgc2FmZUZldGNoT3B0aW9ucy5yZWRpcmVjdCA9ICdtYW51YWwnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QgPSBpc1JlcXVlc3RTdXBwb3J0ZWQgJiYgbmV3IFJlcXVlc3QodXJsLCByZXNvbHZlZE9wdGlvbnMpO1xuXG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCAoaXNSZXF1ZXN0U3VwcG9ydGVkXG4gICAgICAgID8gX2ZldGNoKHJlcXVlc3QsIHNhZmVGZXRjaE9wdGlvbnMpXG4gICAgICAgIDogX2ZldGNoKHVybCwgcmVzb2x2ZWRPcHRpb25zKSk7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlSGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpO1xuXG4gICAgICAvLyBDaGVhcCBwcmUtY2hlY2s6IGlmIHRoZSBzZXJ2ZXIgaG9uZXN0bHkgZGVjbGFyZXMgYSBjb250ZW50LWxlbmd0aCB0aGF0XG4gICAgICAvLyBhbHJlYWR5IGV4Y2VlZHMgdGhlIGNhcCwgcmVqZWN0IGJlZm9yZSB3ZSBzdGFydCBzdHJlYW1pbmcuXG4gICAgICBpZiAoaGFzTWF4Q29udGVudExlbmd0aCkge1xuICAgICAgICBjb25zdCBkZWNsYXJlZExlbmd0aCA9IHV0aWxzLnRvRmluaXRlTnVtYmVyKHJlc3BvbnNlSGVhZGVycy5nZXRDb250ZW50TGVuZ3RoKCkpO1xuICAgICAgICBpZiAoZGVjbGFyZWRMZW5ndGggIT0gbnVsbCAmJiBkZWNsYXJlZExlbmd0aCA+IG1heENvbnRlbnRMZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAgICdtYXhDb250ZW50TGVuZ3RoIHNpemUgb2YgJyArIG1heENvbnRlbnRMZW5ndGggKyAnIGV4Y2VlZGVkJyxcbiAgICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSxcbiAgICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzU3RyZWFtUmVzcG9uc2UgPVxuICAgICAgICBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChyZXNwb25zZVR5cGUgPT09ICdzdHJlYW0nIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3Jlc3BvbnNlJyk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJlxuICAgICAgICByZXNwb25zZS5ib2R5ICYmXG4gICAgICAgIChvbkRvd25sb2FkUHJvZ3Jlc3MgfHwgaGFzTWF4Q29udGVudExlbmd0aCB8fCAoaXNTdHJlYW1SZXNwb25zZSAmJiB1bnN1YnNjcmliZSkpXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuXG4gICAgICAgIFsnc3RhdHVzJywgJ3N0YXR1c1RleHQnLCAnaGVhZGVycyddLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgICBvcHRpb25zW3Byb3BdID0gcmVzcG9uc2VbcHJvcF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlQ29udGVudExlbmd0aCA9IHV0aWxzLnRvRmluaXRlTnVtYmVyKHJlc3BvbnNlSGVhZGVycy5nZXRDb250ZW50TGVuZ3RoKCkpO1xuXG4gICAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPVxuICAgICAgICAgIChvbkRvd25sb2FkUHJvZ3Jlc3MgJiZcbiAgICAgICAgICAgIHByb2dyZXNzRXZlbnREZWNvcmF0b3IoXG4gICAgICAgICAgICAgIHJlc3BvbnNlQ29udGVudExlbmd0aCxcbiAgICAgICAgICAgICAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIoYXN5bmNEZWNvcmF0b3Iob25Eb3dubG9hZFByb2dyZXNzKSwgdHJ1ZSlcbiAgICAgICAgICAgICkpIHx8XG4gICAgICAgICAgW107XG5cbiAgICAgICAgbGV0IGJ5dGVzUmVhZCA9IDA7XG4gICAgICAgIGNvbnN0IG9uQ2h1bmtQcm9ncmVzcyA9IChsb2FkZWRCeXRlcykgPT4ge1xuICAgICAgICAgIGlmIChoYXNNYXhDb250ZW50TGVuZ3RoKSB7XG4gICAgICAgICAgICBieXRlc1JlYWQgPSBsb2FkZWRCeXRlcztcbiAgICAgICAgICAgIGlmIChieXRlc1JlYWQgPiBtYXhDb250ZW50TGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgICAgICdtYXhDb250ZW50TGVuZ3RoIHNpemUgb2YgJyArIG1heENvbnRlbnRMZW5ndGggKyAnIGV4Y2VlZGVkJyxcbiAgICAgICAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsXG4gICAgICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKGxvYWRlZEJ5dGVzKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXNwb25zZSA9IG5ldyBSZXNwb25zZShcbiAgICAgICAgICB0cmFja1N0cmVhbShyZXNwb25zZS5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uQ2h1bmtQcm9ncmVzcywgKCkgPT4ge1xuICAgICAgICAgICAgZmx1c2ggJiYgZmx1c2goKTtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlICYmIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgb3B0aW9uc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUgfHwgJ3RleHQnO1xuXG4gICAgICBsZXQgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzb2x2ZXJzW3V0aWxzLmZpbmRLZXkocmVzb2x2ZXJzLCByZXNwb25zZVR5cGUpIHx8ICd0ZXh0J10oXG4gICAgICAgIHJlc3BvbnNlLFxuICAgICAgICBjb25maWdcbiAgICAgICk7XG5cbiAgICAgIC8vIEZhbGxiYWNrIGVuZm9yY2VtZW50IGZvciBlbnZpcm9ubWVudHMgd2l0aG91dCBSZWFkYWJsZVN0cmVhbSBzdXBwb3J0XG4gICAgICAvLyAobGVnYWN5IHJ1bnRpbWVzKS4gRGV0ZWN0IG1hdGVyaWFsaXplZCBzaXplIGZyb20gdHlwZWQgb3V0cHV0OyBza2lwXG4gICAgICAvLyBzdHJlYW1zL1Jlc3BvbnNlIHBhc3N0aHJvdWdoIHNpbmNlIHRoZSB1c2VyIHdpbGwgcmVhZCB0aG9zZSB0aGVtc2VsdmVzLlxuICAgICAgaWYgKGhhc01heENvbnRlbnRMZW5ndGggJiYgIXN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgIWlzU3RyZWFtUmVzcG9uc2UpIHtcbiAgICAgICAgbGV0IG1hdGVyaWFsaXplZFNpemU7XG4gICAgICAgIGlmIChyZXNwb25zZURhdGEgIT0gbnVsbCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2VEYXRhLmJ5dGVMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBtYXRlcmlhbGl6ZWRTaXplID0gcmVzcG9uc2VEYXRhLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzcG9uc2VEYXRhLnNpemUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBtYXRlcmlhbGl6ZWRTaXplID0gcmVzcG9uc2VEYXRhLnNpemU7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzcG9uc2VEYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgbWF0ZXJpYWxpemVkU2l6ZSA9XG4gICAgICAgICAgICAgIHR5cGVvZiBUZXh0RW5jb2RlciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgID8gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKHJlc3BvbnNlRGF0YSkuYnl0ZUxlbmd0aFxuICAgICAgICAgICAgICAgIDogcmVzcG9uc2VEYXRhLmxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBtYXRlcmlhbGl6ZWRTaXplID09PSAnbnVtYmVyJyAmJiBtYXRlcmlhbGl6ZWRTaXplID4gbWF4Q29udGVudExlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgJ21heENvbnRlbnRMZW5ndGggc2l6ZSBvZiAnICsgbWF4Q29udGVudExlbmd0aCArICcgZXhjZWVkZWQnLFxuICAgICAgICAgICAgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgIWlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwge1xuICAgICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgICBoZWFkZXJzOiBBeGlvc0hlYWRlcnMuZnJvbShyZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgICAgLy8gU2FmYXJpIGNhbiBzdXJmYWNlIGZldGNoIGFib3J0cyBhcyBhIERPTUV4Y2VwdGlvbi1saWtlIG9iamVjdCB3aG9zZVxuICAgICAgLy8gYnJhbmRlZCBnZXR0ZXJzIHRocm93LiBQcmVmZXIgb3VyIGNvbXBvc2VkIHNpZ25hbCByZWFzb24gYmVmb3JlIHJlYWRpbmdcbiAgICAgIC8vIHRoZSBjYXVnaHQgZXJyb3IsIHByZXNlcnZpbmcgdGltZW91dCB2cyBjYW5jZWxsYXRpb24gc2VtYW50aWNzLlxuICAgICAgaWYgKGNvbXBvc2VkU2lnbmFsICYmIGNvbXBvc2VkU2lnbmFsLmFib3J0ZWQgJiYgY29tcG9zZWRTaWduYWwucmVhc29uIGluc3RhbmNlb2YgQXhpb3NFcnJvcikge1xuICAgICAgICBjb25zdCBjYW5jZWxlZEVycm9yID0gY29tcG9zZWRTaWduYWwucmVhc29uO1xuICAgICAgICBjYW5jZWxlZEVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgcmVxdWVzdCAmJiAoY2FuY2VsZWRFcnJvci5yZXF1ZXN0ID0gcmVxdWVzdCk7XG4gICAgICAgIGlmIChlcnIgIT09IGNhbmNlbGVkRXJyb3IpIHtcbiAgICAgICAgICAvLyBOb24tZW51bWVyYWJsZSB0byBtYXRjaCBuYXRpdmUgRXJyb3IgYGNhdXNlYCBzZW1hbnRpY3Mgc28gbG9nZ2Vyc1xuICAgICAgICAgIC8vIGRvbid0IHJlY3Vyc2UgaW50byBjaXJjdWxhciBmZXRjaCBpbnRlcm5hbHMgKHNlZSAjNzIwNSkuXG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNhbmNlbGVkRXJyb3IsICdjYXVzZScsIHtcbiAgICAgICAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgICAgICAgIHZhbHVlOiBlcnIsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGNhbmNlbGVkRXJyb3I7XG4gICAgICB9XG5cbiAgICAgIC8vIFN1cmZhY2UgYSBtYXhCb2R5TGVuZ3RoIHZpb2xhdGlvbiB3ZSByYWlzZWQgd2hpbGUgdGhlIHJlcXVlc3QgYm9keSB3YXNcbiAgICAgIC8vIGJlaW5nIHN0cmVhbWVkLiBNYXRjaGluZyBieSBpZGVudGl0eSAocmF0aGVyIHRoYW4gcmVhZGluZ1xuICAgICAgLy8gYGVyci5jYXVzZS5pc0F4aW9zRXJyb3JgKSBrZWVwcyB0aGUgZXJyb3IgZGV0ZXJtaW5pc3RpYyBhY3Jvc3MgcnVudGltZXNcbiAgICAgIC8vIGFuZCBhdm9pZHMgYm90aCBwcm90b3R5cGUtcG9sbHV0aW9uIHJlYWRzIGFuZCBtaXMtYXR0cmlidXRpbmcgYSBmb3JlaWduXG4gICAgICAvLyBBeGlvc0Vycm9yIHRoYXQgbWVyZWx5IGhhcHBlbmVkIHRvIGxhbmQgaW4gYGVyci5jYXVzZWAuXG4gICAgICBpZiAocGVuZGluZ0JvZHlFcnJvcikge1xuICAgICAgICByZXF1ZXN0ICYmICFwZW5kaW5nQm9keUVycm9yLnJlcXVlc3QgJiYgKHBlbmRpbmdCb2R5RXJyb3IucmVxdWVzdCA9IHJlcXVlc3QpO1xuICAgICAgICB0aHJvdyBwZW5kaW5nQm9keUVycm9yO1xuICAgICAgfVxuXG4gICAgICAvLyBSZS10aHJvdyBBeGlvc0Vycm9ycyB3ZSByYWlzZWQgc3luY2hyb25vdXNseSAoZGF0YTogVVJMIC8gY29udGVudC1sZW5ndGhcbiAgICAgIC8vIHByZS1jaGVja3MsIHJlc3BvbnNlIHNpemUgZW5mb3JjZW1lbnQpIHdpdGhvdXQgcmUtd3JhcHBpbmcgdGhlbS5cbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBBeGlvc0Vycm9yKSB7XG4gICAgICAgIHJlcXVlc3QgJiYgIWVyci5yZXF1ZXN0ICYmIChlcnIucmVxdWVzdCA9IHJlcXVlc3QpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG5cbiAgICAgIGlmIChlcnIgJiYgZXJyLm5hbWUgPT09ICdUeXBlRXJyb3InICYmIC9Mb2FkIGZhaWxlZHxmZXRjaC9pLnRlc3QoZXJyLm1lc3NhZ2UpKSB7XG4gICAgICAgIGNvbnN0IG5ldHdvcmtFcnJvciA9IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICdOZXR3b3JrIEVycm9yJyxcbiAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICAgIGVyciAmJiBlcnIucmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgICAgLy8gTm9uLWVudW1lcmFibGUgdG8gbWF0Y2ggbmF0aXZlIEVycm9yIGBjYXVzZWAgc2VtYW50aWNzIHNvIGxvZ2dlcnNcbiAgICAgICAgLy8gZG9uJ3QgcmVjdXJzZSBpbnRvIGNpcmN1bGFyIGZldGNoIGludGVybmFscyAoc2VlICM3MjA1KS5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ldHdvcmtFcnJvciwgJ2NhdXNlJywge1xuICAgICAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgICAgICB2YWx1ZTogZXJyLmNhdXNlIHx8IGVycixcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aHJvdyBuZXR3b3JrRXJyb3I7XG4gICAgICB9XG5cbiAgICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlcnIsIGVyciAmJiBlcnIuY29kZSwgY29uZmlnLCByZXF1ZXN0LCBlcnIgJiYgZXJyLnJlc3BvbnNlKTtcbiAgICB9XG4gIH07XG59O1xuXG5jb25zdCBzZWVkQ2FjaGUgPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjb25zdCBnZXRGZXRjaCA9IChjb25maWcpID0+IHtcbiAgbGV0IGVudiA9IChjb25maWcgJiYgY29uZmlnLmVudikgfHwge307XG4gIGNvbnN0IHsgZmV0Y2gsIFJlcXVlc3QsIFJlc3BvbnNlIH0gPSBlbnY7XG4gIGNvbnN0IHNlZWRzID0gW1JlcXVlc3QsIFJlc3BvbnNlLCBmZXRjaF07XG5cbiAgbGV0IGxlbiA9IHNlZWRzLmxlbmd0aCxcbiAgICBpID0gbGVuLFxuICAgIHNlZWQsXG4gICAgdGFyZ2V0LFxuICAgIG1hcCA9IHNlZWRDYWNoZTtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgc2VlZCA9IHNlZWRzW2ldO1xuICAgIHRhcmdldCA9IG1hcC5nZXQoc2VlZCk7XG5cbiAgICB0YXJnZXQgPT09IHVuZGVmaW5lZCAmJiBtYXAuc2V0KHNlZWQsICh0YXJnZXQgPSBpID8gbmV3IE1hcCgpIDogZmFjdG9yeShlbnYpKSk7XG5cbiAgICBtYXAgPSB0YXJnZXQ7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuY29uc3QgYWRhcHRlciA9IGdldEZldGNoKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFkYXB0ZXI7XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHNldHRsZSBmcm9tICcuLi9jb3JlL3NldHRsZS5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgbm9ybWFsaXplVVJMRm9yUHJvdG9jb2xDaGVjayBmcm9tICcuLi9oZWxwZXJzL25vcm1hbGl6ZVVSTEZvclByb3RvY29sQ2hlY2suanMnO1xuaW1wb3J0IHBhcnNlUHJvdG9jb2wgZnJvbSAnLi4vaGVscGVycy9wYXJzZVByb3RvY29sLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCB7IHByb2dyZXNzRXZlbnRSZWR1Y2VyIH0gZnJvbSAnLi4vaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyc7XG5pbXBvcnQgcmVzb2x2ZUNvbmZpZyBmcm9tICcuLi9oZWxwZXJzL3Jlc29sdmVDb25maWcuanMnO1xuaW1wb3J0IHsgdG9CeXRlU3RyaW5nSGVhZGVyT2JqZWN0IH0gZnJvbSAnLi4vaGVscGVycy9zYW5pdGl6ZUhlYWRlclZhbHVlLmpzJztcblxuY29uc3QgaXNYSFJBZGFwdGVyU3VwcG9ydGVkID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJztcblxuZXhwb3J0IGRlZmF1bHQgaXNYSFJBZGFwdGVyU3VwcG9ydGVkICYmXG4gIGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgY29uc3QgX2NvbmZpZyA9IHJlc29sdmVDb25maWcoY29uZmlnKTtcbiAgICAgIGxldCByZXF1ZXN0RGF0YSA9IF9jb25maWcuZGF0YTtcbiAgICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oX2NvbmZpZy5oZWFkZXJzKS5ub3JtYWxpemUoKTtcbiAgICAgIGxldCB7IHJlc3BvbnNlVHlwZSwgb25VcGxvYWRQcm9ncmVzcywgb25Eb3dubG9hZFByb2dyZXNzIH0gPSBfY29uZmlnO1xuICAgICAgbGV0IG9uQ2FuY2VsZWQ7XG4gICAgICBsZXQgdXBsb2FkVGhyb3R0bGVkLCBkb3dubG9hZFRocm90dGxlZDtcbiAgICAgIGxldCBmbHVzaFVwbG9hZCwgZmx1c2hEb3dubG9hZCwgZmx1c2hEb3dubG9hZFdpdGhFdmVudDtcblxuICAgICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgICAgZmx1c2hVcGxvYWQgJiYgZmx1c2hVcGxvYWQoKTsgLy8gZmx1c2ggZXZlbnRzXG4gICAgICAgIGZsdXNoRG93bmxvYWQgJiYgZmx1c2hEb3dubG9hZCgpOyAvLyBmbHVzaCBldmVudHNcblxuICAgICAgICBfY29uZmlnLmNhbmNlbFRva2VuICYmIF9jb25maWcuY2FuY2VsVG9rZW4udW5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG5cbiAgICAgICAgX2NvbmZpZy5zaWduYWwgJiYgX2NvbmZpZy5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgcmVxdWVzdC5vcGVuKF9jb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIF9jb25maWcudXJsLCB0cnVlKTtcblxuICAgICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICAgIHJlcXVlc3QudGltZW91dCA9IF9jb25maWcudGltZW91dDtcblxuICAgICAgZnVuY3Rpb24gb25sb2FkZW5kKGV2ZW50KSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN0YXR1cyAwIG1lYW5zIG5vIHJlc3BvbnNlIHdhcyByZWNlaXZlZCwgd2hpY2ggb25lcnJvciBhbmQgb25hYm9ydCBub3JtYWxseVxuICAgICAgICAvLyByZWplY3QgYmVmb3JlIHRoaXMgcnVucy4gRmlyZWZveCAxNTIgZmlyZXMgb25seSByZWFkeXN0YXRlY2hhbmdlIGFuZCBsb2FkZW5kIGZvclxuICAgICAgICAvLyBuYXZpZ2F0aW9uLWNhbmNlbGVkIHJlcXVlc3RzIChodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTA1Mzg5KSxcbiAgICAgICAgLy8gbGVhdmluZyBzZXR0bGUoKSB0byByZXNvbHZlIHRoZW0gYXMgYW4gZW1wdHkgc3VjY2Vzcy4gRUNPTk5BQk9SVEVEIGlzIHRoZSBlcnJvclxuICAgICAgICAvLyBvbmFib3J0IHJhaXNlZCBvbiBGaXJlZm94IDE1MS4gUmVhZHMgb3ZlciBmaWxlOiwgd2hpY2ggc29tZSBlbnZpcm9ubWVudHMgcmVwb3J0IGFzXG4gICAgICAgIC8vIHN0YXR1cyAwIG9uIHN1Y2Nlc3MsIGFyZSBleGNsdWRlZCBieSB0aGUgcmVxdWVzdCBVUkwncyBzY2hlbWUgYWZ0ZXIgYnJvd3Nlci1zdHlsZVxuICAgICAgICAvLyBwcmVwcm9jZXNzaW5nLCBieSB0aGUgcGFnZSBvcmlnaW4ncyBzY2hlbWUgZm9yIHJlbGF0aXZlIFVSTHMgKHdoaWNoIGluaGVyaXQgaXQpLCBvclxuICAgICAgICAvLyBieSByZXNwb25zZVVSTCB3aGVyZSBpbXBsZW1lbnRlZC5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHJlcXVlc3Quc3RhdHVzID09PSAwICYmXG4gICAgICAgICAgKHBhcnNlUHJvdG9jb2wobm9ybWFsaXplVVJMRm9yUHJvdG9jb2xDaGVjayhfY29uZmlnLnVybCkpIHx8XG4gICAgICAgICAgICBwYXJzZVByb3RvY29sKHBsYXRmb3JtLm9yaWdpbikpICE9PSAnZmlsZScgJiZcbiAgICAgICAgICAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5zdGFydHNXaXRoKCdmaWxlOicpKVxuICAgICAgICApIHtcbiAgICAgICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcbiAgICAgICAgICBkb25lKCk7XG5cbiAgICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2hlbiBsb2FkZW5kIGlzIHN0aWxsIGRpc3BhdGNoaW5nLCBmbHVzaGluZyB3aXRoIGl0IGdpdmVzIHByb2dyZXNzXG4gICAgICAgIC8vIGxpc3RlbmVycyBhIGZpbmFsIGRlbGl2ZXJ5IHdob3NlIGV2ZW50IGhhcyBhIGxpdmUgdGFyZ2V0LiBUaGUgbGVnYWN5XG4gICAgICAgIC8vIHJlYWR5LXN0YXRlIGZhbGxiYWNrIGhhcyBubyBldmVudCwgc28gcmVwbGF5IGl0cyBwZW5kaW5nIHByb2dyZXNzLlxuICAgICAgICAvLyBBIHRocm93aW5nIGxpc3RlbmVyIG11c3Qgbm90IGJsb2NrIHNldHRsZW1lbnQ7IHJldGhyb3cgYXN5bmNocm9ub3VzbHksXG4gICAgICAgIC8vIG1hdGNoaW5nIGhvdyBsaXN0ZW5lciBlcnJvcnMgc3VyZmFjZSBvbiB0aGUgdGhyb3R0bGUgdGltZXIgcGF0aC5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGZsdXNoRG93bmxvYWRXaXRoRXZlbnQgJiYgZmx1c2hEb3dubG9hZFdpdGhFdmVudChldmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZsdXNoRG93bmxvYWQgJiYgZmx1c2hEb3dubG9hZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBIGZpbmFsIHByb2dyZXNzIGNhbGxiYWNrIGNhbiBjYW5jZWwgdGhlIHJlcXVlc3Qgc3luY2hyb25vdXNseS5cbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgICAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oXG4gICAgICAgICAgJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCAmJiByZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9XG4gICAgICAgICAgIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCByZXNwb25zZVR5cGUgPT09ICdqc29uJ1xuICAgICAgICAgICAgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICB9O1xuXG4gICAgICAgIHNldHRsZShcbiAgICAgICAgICBmdW5jdGlvbiBfcmVzb2x2ZSh2YWx1ZSkge1xuICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmdW5jdGlvbiBfcmVqZWN0KGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXNwb25zZVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICgnb25sb2FkZW5kJyBpbiByZXF1ZXN0KSB7XG4gICAgICAgIC8vIFVzZSBvbmxvYWRlbmQgaWYgYXZhaWxhYmxlXG4gICAgICAgIHJlcXVlc3Qub25sb2FkZW5kID0gb25sb2FkZW5kO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZSB0byBlbXVsYXRlIG9ubG9hZGVuZFxuICAgICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgcmVxdWVzdC5zdGF0dXMgPT09IDAgJiZcbiAgICAgICAgICAgICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLnN0YXJ0c1dpdGgoJ2ZpbGU6JykpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlYWR5c3RhdGUgaGFuZGxlciBpcyBjYWxsaW5nIGJlZm9yZSBvbmVycm9yIG9yIG9udGltZW91dCBoYW5kbGVycyxcbiAgICAgICAgICAvLyBzbyB3ZSBzaG91bGQgY2FsbCBvbmxvYWRlbmQgb24gdGhlIG5leHQgJ3RpY2snXG4gICAgICAgICAgc2V0VGltZW91dChvbmxvYWRlbmQpO1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCwgY29uZmlnLCByZXF1ZXN0KSk7XG4gICAgICAgIGRvbmUoKTtcblxuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXZlbnQpIHtcbiAgICAgICAgLy8gQnJvd3NlcnMgZGVsaXZlciBhIFByb2dyZXNzRXZlbnQgaW4gWEhSIG9uZXJyb3JcbiAgICAgICAgLy8gKG1lc3NhZ2UgbWF5IGJlIGVtcHR5OyB3aGVuIHByZXNlbnQsIHN1cmZhY2UgaXQpXG4gICAgICAgIC8vIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL1dlYi9BUEkvWE1MSHR0cFJlcXVlc3QvZXJyb3JfZXZlbnRcbiAgICAgICAgY29uc3QgbXNnID0gZXZlbnQgJiYgZXZlbnQubWVzc2FnZSA/IGV2ZW50Lm1lc3NhZ2UgOiAnTmV0d29yayBFcnJvcic7XG4gICAgICAgIGNvbnN0IGVyciA9IG5ldyBBeGlvc0Vycm9yKG1zZywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgY29uZmlnLCByZXF1ZXN0KTtcbiAgICAgICAgLy8gYXR0YWNoIHRoZSB1bmRlcmx5aW5nIGV2ZW50IGZvciBjb25zdW1lcnMgd2hvIHdhbnQgZGV0YWlsc1xuICAgICAgICBlcnIuZXZlbnQgPSBldmVudCB8fCBudWxsO1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICAgIGxldCB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0XG4gICAgICAgICAgPyAndGltZW91dCBvZiAnICsgX2NvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJ1xuICAgICAgICAgIDogJ3RpbWVvdXQgZXhjZWVkZWQnO1xuICAgICAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSBfY29uZmlnLnRyYW5zaXRpb25hbCB8fCB0cmFuc2l0aW9uYWxEZWZhdWx0cztcbiAgICAgICAgaWYgKF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgcmVqZWN0KFxuICAgICAgICAgIG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgIHRyYW5zaXRpb25hbC5jbGFyaWZ5VGltZW91dEVycm9yID8gQXhpb3NFcnJvci5FVElNRURPVVQgOiBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCxcbiAgICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIGRvbmUoKTtcblxuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgcmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCAmJiByZXF1ZXN0SGVhZGVycy5zZXRDb250ZW50VHlwZShudWxsKTtcblxuICAgICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgICB1dGlscy5mb3JFYWNoKHRvQnl0ZVN0cmluZ0hlYWRlck9iamVjdChyZXF1ZXN0SGVhZGVycyksIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChfY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIV9jb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgICBpZiAocmVzcG9uc2VUeXBlICYmIHJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gX2NvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9XG5cbiAgICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICAgIGlmIChvbkRvd25sb2FkUHJvZ3Jlc3MpIHtcbiAgICAgICAgW2Rvd25sb2FkVGhyb3R0bGVkLCBmbHVzaERvd25sb2FkLCBmbHVzaERvd25sb2FkV2l0aEV2ZW50XSA9IHByb2dyZXNzRXZlbnRSZWR1Y2VyKFxuICAgICAgICAgIG9uRG93bmxvYWRQcm9ncmVzcyxcbiAgICAgICAgICB0cnVlXG4gICAgICAgICk7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBkb3dubG9hZFRocm90dGxlZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgICBpZiAob25VcGxvYWRQcm9ncmVzcyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgICBbdXBsb2FkVGhyb3R0bGVkLCBmbHVzaFVwbG9hZF0gPSBwcm9ncmVzc0V2ZW50UmVkdWNlcihvblVwbG9hZFByb2dyZXNzKTtcblxuICAgICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZFRocm90dGxlZCk7XG5cbiAgICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGZsdXNoVXBsb2FkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9jb25maWcuY2FuY2VsVG9rZW4gfHwgX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgICBvbkNhbmNlbGVkID0gKGNhbmNlbCkgPT4ge1xuICAgICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZWplY3QoIWNhbmNlbCB8fCBjYW5jZWwudHlwZSA/IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZywgcmVxdWVzdCkgOiBjYW5jZWwpO1xuICAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICAgIH07XG5cbiAgICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgICAgaWYgKF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAgICAgX2NvbmZpZy5zaWduYWwuYWJvcnRlZFxuICAgICAgICAgICAgPyBvbkNhbmNlbGVkKClcbiAgICAgICAgICAgIDogX2NvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm90b2NvbCA9IHBhcnNlUHJvdG9jb2woX2NvbmZpZy51cmwpO1xuXG4gICAgICBpZiAocHJvdG9jb2wgJiYgIXBsYXRmb3JtLnByb3RvY29scy5pbmNsdWRlcyhwcm90b2NvbCkpIHtcbiAgICAgICAgcmVqZWN0KFxuICAgICAgICAgIG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCArICc6JyxcbiAgICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULFxuICAgICAgICAgICAgY29uZmlnXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICBkb25lKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhIHx8IG51bGwpO1xuICAgIH0pO1xuICB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5pbXBvcnQgQXhpb3MgZnJvbSAnLi9jb3JlL0F4aW9zLmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL2NvcmUvbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBDYW5jZWxUb2tlbiBmcm9tICcuL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gJy4vZW52L2RhdGEuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHNwcmVhZCBmcm9tICcuL2hlbHBlcnMvc3ByZWFkLmpzJztcbmltcG9ydCBpc0F4aW9zRXJyb3IgZnJvbSAnLi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gJy4vYWRhcHRlcnMvYWRhcHRlcnMuanMnO1xuaW1wb3J0IEh0dHBTdGF0dXNDb2RlIGZyb20gJy4vaGVscGVycy9IdHRwU3RhdHVzQ29kZS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJucyB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgY29uc3QgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgY29uc3QgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCwgeyBhbGxPd25LZXlzOiB0cnVlIH0pO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQsIG51bGwsIHsgYWxsT3duS2V5czogdHJ1ZSB9KTtcblxuICAvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG4gIGluc3RhbmNlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICAgIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhkZWZhdWx0Q29uZmlnLCBpbnN0YW5jZUNvbmZpZykpO1xuICB9O1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG5jb25zdCBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbGVkRXJyb3IgPSBDYW5jZWxlZEVycm9yO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSBDYW5jZWxUb2tlbjtcbmF4aW9zLmlzQ2FuY2VsID0gaXNDYW5jZWw7XG5heGlvcy5WRVJTSU9OID0gVkVSU0lPTjtcbmF4aW9zLnRvRm9ybURhdGEgPSB0b0Zvcm1EYXRhO1xuXG4vLyBFeHBvc2UgQXhpb3NFcnJvciBjbGFzc1xuYXhpb3MuQXhpb3NFcnJvciA9IEF4aW9zRXJyb3I7XG5cbi8vIGFsaWFzIGZvciBDYW5jZWxlZEVycm9yIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5heGlvcy5DYW5jZWwgPSBheGlvcy5DYW5jZWxlZEVycm9yO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG5heGlvcy5zcHJlYWQgPSBzcHJlYWQ7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IGlzQXhpb3NFcnJvcjtcblxuLy8gRXhwb3NlIG1lcmdlQ29uZmlnXG5heGlvcy5tZXJnZUNvbmZpZyA9IG1lcmdlQ29uZmlnO1xuXG5heGlvcy5BeGlvc0hlYWRlcnMgPSBBeGlvc0hlYWRlcnM7XG5cbmF4aW9zLmZvcm1Ub0pTT04gPSAodGhpbmcpID0+IGZvcm1EYXRhVG9KU09OKHV0aWxzLmlzSFRNTEZvcm0odGhpbmcpID8gbmV3IEZvcm1EYXRhKHRoaW5nKSA6IHRoaW5nKTtcblxuYXhpb3MuZ2V0QWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXI7XG5cbmF4aW9zLkh0dHBTdGF0dXNDb2RlID0gSHR0cFN0YXR1c0NvZGU7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxuLy8gdGhpcyBtb2R1bGUgc2hvdWxkIG9ubHkgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBheGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi9DYW5jZWxlZEVycm9yLmpzJztcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsVG9rZW59XG4gKi9cbmNsYXNzIENhbmNlbFRva2VuIHtcbiAgY29uc3RydWN0b3IoZXhlY3V0b3IpIHtcbiAgICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgbGV0IHJlc29sdmVQcm9taXNlO1xuXG4gICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHRva2VuID0gdGhpcztcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgdGhpcy5wcm9taXNlLnRoZW4oKGNhbmNlbCkgPT4ge1xuICAgICAgaWYgKCF0b2tlbi5fbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICAgIGxldCBpID0gdG9rZW4uX2xpc3RlbmVycy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgIHRva2VuLl9saXN0ZW5lcnNbaV0oY2FuY2VsKTtcbiAgICAgIH1cbiAgICAgIHRva2VuLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbiA9IChvbmZ1bGZpbGxlZCkgPT4ge1xuICAgICAgbGV0IF9yZXNvbHZlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICB0b2tlbi5zdWJzY3JpYmUocmVzb2x2ZSk7XG4gICAgICAgIF9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIH0pLnRoZW4ob25mdWxmaWxsZWQpO1xuXG4gICAgICBwcm9taXNlLmNhbmNlbCA9IGZ1bmN0aW9uIHJlamVjdCgpIHtcbiAgICAgICAgdG9rZW4udW5zdWJzY3JpYmUoX3Jlc29sdmUpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfTtcblxuICAgIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcbiAgICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KTtcbiAgICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gICAqL1xuICB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgdGhyb3cgdGhpcy5yZWFzb247XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZSB0byB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIGxpc3RlbmVyKHRoaXMucmVhc29uKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycyA9IFtsaXN0ZW5lcl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlIGZyb20gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgdW5zdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICB0b0Fib3J0U2lnbmFsKCkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICBjb25zdCBhYm9ydCA9IChlcnIpID0+IHtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoZXJyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zdWJzY3JpYmUoYWJvcnQpO1xuXG4gICAgY29udHJvbGxlci5zaWduYWwudW5zdWJzY3JpYmUgPSAoKSA9PiB0aGlzLnVuc3Vic2NyaWJlKGFib3J0KTtcblxuICAgIHJldHVybiBjb250cm9sbGVyLnNpZ25hbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gICAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gICAqL1xuICBzdGF0aWMgc291cmNlKCkge1xuICAgIGxldCBjYW5jZWw7XG4gICAgY29uc3QgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgICAgY2FuY2VsID0gYztcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW4sXG4gICAgICBjYW5jZWwsXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcblxuY2xhc3MgQ2FuY2VsZWRFcnJvciBleHRlbmRzIEF4aW9zRXJyb3Ige1xuICAvKipcbiAgICogQSBgQ2FuY2VsZWRFcnJvcmAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gY29uZmlnIFRoZSBjb25maWcuXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gcmVxdWVzdCBUaGUgcmVxdWVzdC5cbiAgICpcbiAgICogQHJldHVybnMge0NhbmNlbGVkRXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICAgKi9cbiAgY29uc3RydWN0b3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gICAgc3VwZXIobWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVELCBjb25maWcsIHJlcXVlc3QpO1xuICAgIHRoaXMubmFtZSA9ICdDYW5jZWxlZEVycm9yJztcbiAgICB0aGlzLl9fQ0FOQ0VMX18gPSB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbGVkRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBidWlsZFVSTCBmcm9tICcuLi9oZWxwZXJzL2J1aWxkVVJMLmpzJztcbmltcG9ydCBJbnRlcmNlcHRvck1hbmFnZXIgZnJvbSAnLi9JbnRlcmNlcHRvck1hbmFnZXIuanMnO1xuaW1wb3J0IGRpc3BhdGNoUmVxdWVzdCBmcm9tICcuL2Rpc3BhdGNoUmVxdWVzdC5qcyc7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSAnLi9tZXJnZUNvbmZpZy5qcyc7XG5pbXBvcnQgYnVpbGRGdWxsUGF0aCBmcm9tICcuL2J1aWxkRnVsbFBhdGguanMnO1xuaW1wb3J0IG1ldGhvZExpc3QgZnJvbSAnLi9tZXRob2RMaXN0LmpzJztcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vaGVscGVycy92YWxpZGF0b3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHZhbGlkYXRvci52YWxpZGF0b3JzO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5jbGFzcyBBeGlvcyB7XG4gIGNvbnN0cnVjdG9yKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnIHx8IHt9O1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGNvbmZpZ09yVXJsIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBjb25maWdcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICAgKi9cbiAgYXN5bmMgcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGV0IGR1bW15ID0ge307XG5cbiAgICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA/IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGR1bW15KSA6IChkdW1teSA9IG5ldyBFcnJvcigpKTtcblxuICAgICAgICAgIGNvbnN0IGR1bW15U3RhY2sgPSBkdW1teS5zdGFjaztcbiAgICAgICAgICBsZXQgc3RhY2sgPSAnJztcblxuICAgICAgICAgIC8vIHNsaWNlIG9mZiB0aGUgRXJyb3I6IC4uLiBsaW5lXG4gICAgICAgICAgaWYgKHR5cGVvZiBkdW1teVN0YWNrID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uc3QgZmlyc3ROZXdsaW5lSW5kZXggPSBkdW1teVN0YWNrLmluZGV4T2YoJ1xcbicpO1xuXG4gICAgICAgICAgICBzdGFjayA9IGZpcnN0TmV3bGluZUluZGV4ID09PSAtMSA/ICcnIDogZHVtbXlTdGFjay5zbGljZShmaXJzdE5ld2xpbmVJbmRleCArIDEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghZXJyLnN0YWNrKSB7XG4gICAgICAgICAgICBlcnIuc3RhY2sgPSBzdGFjaztcbiAgICAgICAgICAgIC8vIG1hdGNoIHdpdGhvdXQgdGhlIDIgdG9wIHN0YWNrIGxpbmVzXG4gICAgICAgICAgfSBlbHNlIGlmIChzdGFjaykge1xuICAgICAgICAgICAgY29uc3QgZmlyc3ROZXdsaW5lSW5kZXggPSBzdGFjay5pbmRleE9mKCdcXG4nKTtcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZE5ld2xpbmVJbmRleCA9XG4gICAgICAgICAgICAgIGZpcnN0TmV3bGluZUluZGV4ID09PSAtMSA/IC0xIDogc3RhY2suaW5kZXhPZignXFxuJywgZmlyc3ROZXdsaW5lSW5kZXggKyAxKTtcbiAgICAgICAgICAgIGNvbnN0IHN0YWNrV2l0aG91dFR3b1RvcExpbmVzID1cbiAgICAgICAgICAgICAgc2Vjb25kTmV3bGluZUluZGV4ID09PSAtMSA/ICcnIDogc3RhY2suc2xpY2Uoc2Vjb25kTmV3bGluZUluZGV4ICsgMSk7XG5cbiAgICAgICAgICAgIGlmICghU3RyaW5nKGVyci5zdGFjaykuZW5kc1dpdGgoc3RhY2tXaXRob3V0VHdvVG9wTGluZXMpKSB7XG4gICAgICAgICAgICAgIGVyci5zdGFjayArPSAnXFxuJyArIHN0YWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIElnbm9yZSBmYWlsdXJlcyBmcm9tIGN1c3RvbSBzdGFjayBob29rcyBvciB1bi13cml0YWJsZSBzdGFjayBwcm9wZXJ0aWVzLlxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBfcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICAgIGlmICh0eXBlb2YgY29uZmlnT3JVcmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICBjb25maWcudXJsID0gY29uZmlnT3JVcmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZ09yVXJsIHx8IHt9O1xuICAgIH1cblxuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBjb25zdCB7IHRyYW5zaXRpb25hbCwgcGFyYW1zU2VyaWFsaXplciwgaGVhZGVycyB9ID0gY29uZmlnO1xuXG4gICAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyhcbiAgICAgICAgdHJhbnNpdGlvbmFsLFxuICAgICAgICB7XG4gICAgICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgICAgY2xhcmlmeVRpbWVvdXRFcnJvcjogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgICBsZWdhY3lJbnRlcmNlcHRvclJlcVJlc09yZGVyaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICAgIGFkdmVydGlzZVpzdGRBY2NlcHRFbmNvZGluZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgICB2YWxpZGF0ZVN0YXR1c1VuZGVmaW5lZFJlc29sdmVzOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zU2VyaWFsaXplciAhPSBudWxsKSB7XG4gICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJhbXNTZXJpYWxpemVyKSkge1xuICAgICAgICBjb25maWcucGFyYW1zU2VyaWFsaXplciA9IHtcbiAgICAgICAgICBzZXJpYWxpemU6IHBhcmFtc1NlcmlhbGl6ZXIsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyhcbiAgICAgICAgICBwYXJhbXNTZXJpYWxpemVyLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVuY29kZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZXQgY29uZmlnLmFsbG93QWJzb2x1dGVVcmxzXG4gICAgaWYgKGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLmFsbG93QWJzb2x1dGVVcmxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyA9IHRoaXMuZGVmYXVsdHMuYWxsb3dBYnNvbHV0ZVVybHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMoXG4gICAgICBjb25maWcsXG4gICAgICB7XG4gICAgICAgIGJhc2VVcmw6IHZhbGlkYXRvcnMuc3BlbGxpbmcoJ2Jhc2VVUkwnKSxcbiAgICAgICAgd2l0aFhzcmZUb2tlbjogdmFsaWRhdG9ycy5zcGVsbGluZygnd2l0aFhTUkZUb2tlbicpLFxuICAgICAgfSxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgICBjb25maWcubWV0aG9kID0gKFxuICAgICAgdXRpbHMuZ2V0U2FmZVByb3AoY29uZmlnLCAnbWV0aG9kJykgfHxcbiAgICAgIHV0aWxzLmdldFNhZmVQcm9wKHRoaXMuZGVmYXVsdHMsICdtZXRob2QnKSB8fFxuICAgICAgJ2dldCdcbiAgICApLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgICBsZXQgY29udGV4dEhlYWRlcnMgPSBoZWFkZXJzICYmIHV0aWxzLm1lcmdlKGhlYWRlcnMuY29tbW9uLCBoZWFkZXJzW2NvbmZpZy5tZXRob2RdKTtcblxuICAgIGhlYWRlcnMgJiZcbiAgICAgIHV0aWxzLmZvckVhY2gobWV0aG9kTGlzdC5jb25jYXQoJ2NvbW1vbicpLCAobWV0aG9kKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBoZWFkZXJzW21ldGhvZF07XG4gICAgICB9KTtcblxuICAgIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmNvbmNhdChjb250ZXh0SGVhZGVycywgaGVhZGVycyk7XG5cbiAgICAvLyBmaWx0ZXIgb3V0IHNraXBwZWQgaW50ZXJjZXB0b3JzXG4gICAgY29uc3QgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICBsZXQgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gdHJ1ZTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIGlmICh0eXBlb2YgaW50ZXJjZXB0b3IucnVuV2hlbiA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnRlcmNlcHRvci5ydW5XaGVuKGNvbmZpZykgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzICYmIGludGVyY2VwdG9yLnN5bmNocm9ub3VzO1xuXG4gICAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSBjb25maWcudHJhbnNpdGlvbmFsIHx8IHRyYW5zaXRpb25hbERlZmF1bHRzO1xuICAgICAgY29uc3QgbGVnYWN5SW50ZXJjZXB0b3JSZXFSZXNPcmRlcmluZyA9XG4gICAgICAgIHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwubGVnYWN5SW50ZXJjZXB0b3JSZXFSZXNPcmRlcmluZztcblxuICAgICAgaWYgKGxlZ2FjeUludGVyY2VwdG9yUmVxUmVzT3JkZXJpbmcpIHtcbiAgICAgICAgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBsZXQgcHJvbWlzZTtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxlbjtcblxuICAgIGlmICghc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzKSB7XG4gICAgICBjb25zdCBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QuYmluZCh0aGlzKSwgdW5kZWZpbmVkXTtcbiAgICAgIGNoYWluLnVuc2hpZnQoLi4ucmVxdWVzdEludGVyY2VwdG9yQ2hhaW4pO1xuICAgICAgY2hhaW4ucHVzaCguLi5yZXNwb25zZUludGVyY2VwdG9yQ2hhaW4pO1xuICAgICAgbGVuID0gY2hhaW4ubGVuZ3RoO1xuXG4gICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW5baSsrXSwgY2hhaW5baSsrXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIGxlbiA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIGxldCBuZXdDb25maWcgPSBjb25maWc7XG5cbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgY29uc3Qgb25GdWxmaWxsZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgY29uc3Qgb25SZWplY3RlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICB0cnkge1xuICAgICAgICBuZXdDb25maWcgPSBvbkZ1bGZpbGxlZCA/IG9uRnVsZmlsbGVkKG5ld0NvbmZpZykgOiBuZXdDb25maWc7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoIW9uUmVqZWN0ZWQpIHtcbiAgICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZWplY3RlZFJlc3VsdCA9IG9uUmVqZWN0ZWQuY2FsbCh0aGlzLCBlcnJvcik7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNUaGVuYWJsZShyZWplY3RlZFJlc3VsdCkpIHtcbiAgICAgICAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUocmVqZWN0ZWRSZXN1bHQpLnRoZW4oKCkgPT5cbiAgICAgICAgICAgICAgZGlzcGF0Y2hSZXF1ZXN0LmNhbGwodGhpcywgbmV3Q29uZmlnKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKHJlamVjdGVkRXJyb3IpIHtcbiAgICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZWplY3QocmVqZWN0ZWRFcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXByb21pc2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHByb21pc2UgPSBkaXNwYXRjaFJlcXVlc3QuY2FsbCh0aGlzLCBuZXdDb25maWcpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpID0gMDtcbiAgICBsZW4gPSByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4ocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGdldFVyaShjb25maWcpIHtcbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICAgIGNvbnN0IGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCwgY29uZmlnLmFsbG93QWJzb2x1dGVVcmxzLCBjb25maWcpO1xuICAgIHJldHVybiBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xuICB9XG59XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgIG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIHVybCxcbiAgICAgICAgZGF0YTogY29uZmlnICYmIHV0aWxzLmhhc093blByb3AoY29uZmlnLCAnZGF0YScpID8gY29uZmlnLmRhdGEgOiB1bmRlZmluZWQsXG4gICAgICB9KVxuICAgICk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ3F1ZXJ5J10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZnVuY3Rpb24gZ2VuZXJhdGVIVFRQTWV0aG9kKGlzRm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBodHRwTWV0aG9kKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFxuICAgICAgICBtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgaGVhZGVyczogaXNGb3JtXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHt9LFxuICAgICAgICAgIHVybCxcbiAgICAgICAgICBkYXRhLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9O1xuICB9XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBnZW5lcmF0ZUhUVFBNZXRob2QoKTtcblxuICAvLyBRVUVSWSBpcyBhIHNhZmUvaWRlbXBvdGVudCByZWFkIG1ldGhvZDsgbXVsdGlwYXJ0IGZvcm0gYm9kaWVzIGRvbid0IGZpdFxuICAvLyBpdHMgc2VtYW50aWNzLCBzbyBubyBxdWVyeUZvcm0gc2hvcnRoYW5kIGlzIGdlbmVyYXRlZC5cbiAgaWYgKG1ldGhvZCAhPT0gJ3F1ZXJ5Jykge1xuICAgIEF4aW9zLnByb3RvdHlwZVttZXRob2QgKyAnRm9ybSddID0gZ2VuZXJhdGVIVFRQTWV0aG9kKHRydWUpO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4vQXhpb3NIZWFkZXJzLmpzJztcblxuZXhwb3J0IGNvbnN0IFJFREFDVEVEID0gJ1tSRURBQ1RFRCAqKioqXSc7XG5cbmZ1bmN0aW9uIGhhc093bk9yUHJvdG90eXBlVG9KU09OKHNvdXJjZSkge1xuICBpZiAodXRpbHMuaGFzT3duUHJvcChzb3VyY2UsICd0b0pTT04nKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgbGV0IHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzb3VyY2UpO1xuXG4gIHdoaWxlIChwcm90b3R5cGUgJiYgcHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgaWYgKHV0aWxzLmhhc093blByb3AocHJvdG90eXBlLCAndG9KU09OJykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90b3R5cGUpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBCdWlsZCBhIHBsYWluLW9iamVjdCBzbmFwc2hvdCBvZiBgY29uZmlnYCBhbmQgcmVwbGFjZSB0aGUgdmFsdWUgb2YgYW55IGtleVxuLy8gKGNhc2UtaW5zZW5zaXRpdmUpIGxpc3RlZCBpbiBgcmVkYWN0S2V5c2Agd2l0aCBSRURBQ1RFRC4gV2Fsa3MgdGhyb3VnaCBhcnJheXNcbi8vIGFuZCBBeGlvc0hlYWRlcnMsIGFuZCBzaG9ydC1jaXJjdWl0cyBvbiBjaXJjdWxhciByZWZlcmVuY2VzLlxuZnVuY3Rpb24gcmVkYWN0Q29uZmlnKGNvbmZpZywgcmVkYWN0S2V5cykge1xuICBjb25zdCBsb3dlcktleXMgPSBuZXcgU2V0KHJlZGFjdEtleXMubWFwKChrKSA9PiBTdHJpbmcoaykudG9Mb3dlckNhc2UoKSkpO1xuICBjb25zdCBzZWVuID0gW107XG5cbiAgY29uc3QgdmlzaXQgPSAoc291cmNlKSA9PiB7XG4gICAgaWYgKHNvdXJjZSA9PT0gbnVsbCB8fCB0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0JykgcmV0dXJuIHNvdXJjZTtcbiAgICBpZiAodXRpbHMuaXNCdWZmZXIoc291cmNlKSkgcmV0dXJuIHNvdXJjZTtcbiAgICBpZiAoc2Vlbi5pbmRleE9mKHNvdXJjZSkgIT09IC0xKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycykge1xuICAgICAgc291cmNlID0gc291cmNlLnRvSlNPTigpO1xuICAgIH1cblxuICAgIHNlZW4ucHVzaChzb3VyY2UpO1xuXG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXN1bHQgPSBbXTtcbiAgICAgIHNvdXJjZS5mb3JFYWNoKCh2LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlZHVjZWRWYWx1ZSA9IHZpc2l0KHYpO1xuICAgICAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKHJlZHVjZWRWYWx1ZSkpIHtcbiAgICAgICAgICByZXN1bHRbaV0gPSByZWR1Y2VkVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSAmJiBoYXNPd25PclByb3RvdHlwZVRvSlNPTihzb3VyY2UpKSB7XG4gICAgICAgIHNlZW4ucG9wKCk7XG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhzb3VyY2UpKSB7XG4gICAgICAgIGNvbnN0IHJlZHVjZWRWYWx1ZSA9IGxvd2VyS2V5cy5oYXMoa2V5LnRvTG93ZXJDYXNlKCkpID8gUkVEQUNURUQgOiB2aXNpdCh2YWx1ZSk7XG4gICAgICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSkge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gcmVkdWNlZFZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2Vlbi5wb3AoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiB2aXNpdChjb25maWcpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlTYWZlbHkodmFsdWUpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFnZ3JlZ2F0ZUVycm9yTWVzc2FnZShlcnJvcikge1xuICBjb25zdCBtZXNzYWdlID0gZXJyb3IuZXJyb3JzXG4gICAgLm1hcCgoZW50cnkpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeS5tZXNzYWdlID8gc3RyaW5naWZ5U2FmZWx5KGVudHJ5Lm1lc3NhZ2UpIDogc3RyaW5naWZ5U2FmZWx5KGVudHJ5KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgLmpvaW4oJzsgJyk7XG5cbiAgcmV0dXJuIG1lc3NhZ2UgfHwgZXJyb3IubmFtZSB8fCAnQWdncmVnYXRlRXJyb3InO1xufVxuXG5jbGFzcyBBeGlvc0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBzdGF0aWMgZnJvbShlcnJvciwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSwgY3VzdG9tUHJvcHMpIHtcbiAgICAvLyBgQWdncmVnYXRlRXJyb3JgICh0aHJvd24gYnkgTm9kZSBvbiBkdWFsLXN0YWNrL0hhcHB5LUV5ZWJhbGxzIGNvbm5lY3Rpb25cbiAgICAvLyBmYWlsdXJlcykgaGFzIGFuIGVtcHR5IGBtZXNzYWdlYDsgaXRzIGRldGFpbCBsaXZlcyBpbiBgZXJyb3JzW11gLiBXaXRob3V0XG4gICAgLy8gdGhpcywgdGhlIHdyYXBwZWQgZXJyb3Igc3VyZmFjZXMgd2l0aCBhIGJsYW5rIG1lc3NhZ2UgKHNlZSAjNjcyMSkuXG4gICAgbGV0IG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgIGlmICghbWVzc2FnZSAmJiB1dGlscy5pc0FycmF5KGVycm9yLmVycm9ycykgJiYgZXJyb3IuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgbWVzc2FnZSA9IGFnZ3JlZ2F0ZUVycm9yTWVzc2FnZShlcnJvcik7XG4gICAgfVxuXG4gICAgY29uc3QgYXhpb3NFcnJvciA9IG5ldyBBeGlvc0Vycm9yKG1lc3NhZ2UsIGNvZGUgfHwgZXJyb3IuY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSk7XG4gICAgLy8gTWF0Y2ggbmF0aXZlIGBFcnJvcmAgYGNhdXNlYCBzZW1hbnRpY3M6IG5vbi1lbnVtZXJhYmxlLiBUaGUgd3JhcHBlZFxuICAgIC8vIGVycm9yIG9mdGVuIGNhcnJpZXMgY2lyY3VsYXIgaW50ZXJuYWxzIChzb2NrZXRzLCByZXF1ZXN0cywgYWdlbnRzKSwgc29cbiAgICAvLyBhbiBlbnVtZXJhYmxlIGBjYXVzZWAgbWFrZXMgc3RydWN0dXJlZCBsb2dnZXJzIChwaW5vL3dpbnN0b24pIGFuZCBhbnlcbiAgICAvLyBvd24tcHJvcGVydHkgd2FsayB0aHJvdyBcIkNvbnZlcnRpbmcgY2lyY3VsYXIgc3RydWN0dXJlIHRvIEpTT05cIi5cbiAgICAvLyBSZWdyZXNzaW9uIGZyb20gIzY5ODI7IHNlZSAjNzIwNS4gYF9fcHJvdG9fXzogbnVsbGAgbWlycm9ycyB0aGVcbiAgICAvLyBgbWVzc2FnZWAgZGVzY3JpcHRvciBiZWxvdyAocHJvdG90eXBlLXBvbGx1dGlvbi1zYWZlIGRlc2NyaXB0b3IpLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShheGlvc0Vycm9yLCAnY2F1c2UnLCB7XG4gICAgICBfX3Byb3RvX186IG51bGwsXG4gICAgICB2YWx1ZTogZXJyb3IsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIH0pO1xuICAgIGF4aW9zRXJyb3IubmFtZSA9IGVycm9yLm5hbWU7XG5cbiAgICAvLyBQcmVzZXJ2ZSBzdGF0dXMgZnJvbSB0aGUgb3JpZ2luYWwgZXJyb3IgaWYgbm90IGFscmVhZHkgc2V0IGZyb20gcmVzcG9uc2VcbiAgICBpZiAoZXJyb3Iuc3RhdHVzICE9IG51bGwgJiYgYXhpb3NFcnJvci5zdGF0dXMgPT0gbnVsbCkge1xuICAgICAgYXhpb3NFcnJvci5zdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gICAgfVxuXG4gICAgY3VzdG9tUHJvcHMgJiYgT2JqZWN0LmFzc2lnbihheGlvc0Vycm9yLCBjdXN0b21Qcm9wcyk7XG4gICAgcmV0dXJuIGF4aW9zRXJyb3I7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtjb25maWddIFRoZSBjb25maWcuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAgICpcbiAgICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcblxuICAgIC8vIE1ha2UgbWVzc2FnZSBlbnVtZXJhYmxlIHRvIG1haW50YWluIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICAvLyBUaGUgbmF0aXZlIEVycm9yIGNvbnN0cnVjdG9yIHNldHMgbWVzc2FnZSBhcyBub24tZW51bWVyYWJsZSxcbiAgICAvLyBidXQgYXhpb3MgPCB2MS4xMy4zIGhhZCBpdCBhcyBlbnVtZXJhYmxlXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZXNzYWdlJywge1xuICAgICAgLy8gTnVsbC1wcm90byBkZXNjcmlwdG9yIHNvIGEgcG9sbHV0ZWQgT2JqZWN0LnByb3RvdHlwZS5nZXQgY2Fubm90IHR1cm5cbiAgICAgIC8vIHRoaXMgZGF0YSBkZXNjcmlwdG9yIGludG8gYW4gYWNjZXNzb3IgZGVzY3JpcHRvciBvbiB0aGUgd2F5IGluLlxuICAgICAgX19wcm90b19fOiBudWxsLFxuICAgICAgdmFsdWU6IG1lc3NhZ2UsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgfSk7XG5cbiAgICB0aGlzLm5hbWUgPSAnQXhpb3NFcnJvcic7XG4gICAgdGhpcy5pc0F4aW9zRXJyb3IgPSB0cnVlO1xuICAgIGNvZGUgJiYgKHRoaXMuY29kZSA9IGNvZGUpO1xuICAgIGNvbmZpZyAmJiAodGhpcy5jb25maWcgPSBjb25maWcpO1xuICAgIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xuICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgdGhpcy5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgfVxuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIC8vIE9wdC1pbiByZWRhY3Rpb246IHdoZW4gdGhlIHJlcXVlc3QgY29uZmlnIGNhcnJpZXMgYSBgcmVkYWN0YCBhcnJheSwgdGhlXG4gICAgLy8gdmFsdWUgb2YgYW55IG1hdGNoaW5nIGtleSAoY2FzZS1pbnNlbnNpdGl2ZSwgYXQgYW55IGRlcHRoKSBpcyByZXBsYWNlZFxuICAgIC8vIHdpdGggUkVEQUNURUQgaW4gdGhlIHNlcmlhbGl6ZWQgc25hcHNob3QuIFVuZGVmaW5lZCBvciBlbXB0eSBsZWF2ZXMgdGhlXG4gICAgLy8gZXhpc3Rpbmcgc2VyaWFsaXphdGlvbiBiZWhhdmlvciB1bmNoYW5nZWQuXG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgY29uc3QgcmVkYWN0S2V5cyA9IGNvbmZpZyAmJiB1dGlscy5oYXNPd25Qcm9wKGNvbmZpZywgJ3JlZGFjdCcpID8gY29uZmlnLnJlZGFjdCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBzZXJpYWxpemVkQ29uZmlnID1cbiAgICAgIHV0aWxzLmlzQXJyYXkocmVkYWN0S2V5cykgJiYgcmVkYWN0S2V5cy5sZW5ndGggPiAwXG4gICAgICAgID8gcmVkYWN0Q29uZmlnKGNvbmZpZywgcmVkYWN0S2V5cylcbiAgICAgICAgOiB1dGlscy50b0pTT05PYmplY3QoY29uZmlnKTtcblxuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHNlcmlhbGl6ZWRDb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgIH07XG4gIH1cbn1cblxuLy8gVGhpcyBjYW4gYmUgY2hhbmdlZCB0byBzdGF0aWMgcHJvcGVydGllcyBhcyBzb29uIGFzIHRoZSBwYXJzZXIgb3B0aW9ucyBpbiAuZXNsaW50LmNqcyBhcmUgdXBkYXRlZC5cbkF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUgPSAnRVJSX0JBRF9PUFRJT05fVkFMVUUnO1xuQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTiA9ICdFUlJfQkFEX09QVElPTic7XG5BeGlvc0Vycm9yLkVDT05OQUJPUlRFRCA9ICdFQ09OTkFCT1JURUQnO1xuQXhpb3NFcnJvci5FVElNRURPVVQgPSAnRVRJTUVET1VUJztcbkF4aW9zRXJyb3IuRUNPTk5SRUZVU0VEID0gJ0VDT05OUkVGVVNFRCc7XG5BeGlvc0Vycm9yLkVSUl9ORVRXT1JLID0gJ0VSUl9ORVRXT1JLJztcbkF4aW9zRXJyb3IuRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUyA9ICdFUlJfRlJfVE9PX01BTllfUkVESVJFQ1RTJztcbkF4aW9zRXJyb3IuRVJSX0RFUFJFQ0FURUQgPSAnRVJSX0RFUFJFQ0FURUQnO1xuQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFID0gJ0VSUl9CQURfUkVTUE9OU0UnO1xuQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QgPSAnRVJSX0JBRF9SRVFVRVNUJztcbkF4aW9zRXJyb3IuRVJSX0NBTkNFTEVEID0gJ0VSUl9DQU5DRUxFRCc7XG5BeGlvc0Vycm9yLkVSUl9OT1RfU1VQUE9SVCA9ICdFUlJfTk9UX1NVUFBPUlQnO1xuQXhpb3NFcnJvci5FUlJfSU5WQUxJRF9VUkwgPSAnRVJSX0lOVkFMSURfVVJMJztcbkF4aW9zRXJyb3IuRVJSX0ZPUk1fREFUQV9ERVBUSF9FWENFRURFRCA9ICdFUlJfRk9STV9EQVRBX0RFUFRIX0VYQ0VFREVEJztcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3NFcnJvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBwYXJzZUhlYWRlcnMgZnJvbSAnLi4vaGVscGVycy9wYXJzZUhlYWRlcnMuanMnO1xuaW1wb3J0IHsgc2FuaXRpemVIZWFkZXJWYWx1ZSB9IGZyb20gJy4uL2hlbHBlcnMvc2FuaXRpemVIZWFkZXJWYWx1ZS5qcyc7XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIgJiYgU3RyaW5nKGhlYWRlcikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChub3JtYWxpemVWYWx1ZSkgOiBzYW5pdGl6ZUhlYWRlclZhbHVlKFN0cmluZyh2YWx1ZSkpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VucyhzdHIpIHtcbiAgY29uc3QgdG9rZW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3QgdG9rZW5zUkUgPSAvKFteXFxzLDs9XSspXFxzKig/Oj1cXHMqKFteLDtdKykpPy9nO1xuICBsZXQgbWF0Y2g7XG5cbiAgd2hpbGUgKChtYXRjaCA9IHRva2Vuc1JFLmV4ZWMoc3RyKSkpIHtcbiAgICB0b2tlbnNbbWF0Y2hbMV1dID0gbWF0Y2hbMl07XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5jb25zdCBwYXJhbWV0ZXJOYW1lUkUgPSAvXlshIyQlJicqK1xcLS5eX2B8fjAtOUEtWmEtel0rJC87XG5cbmZ1bmN0aW9uIHRyaW1PV1ModmFsdWUpIHtcbiAgbGV0IHN0YXJ0ID0gMDtcbiAgbGV0IGVuZCA9IHZhbHVlLmxlbmd0aDtcblxuICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcbiAgICBjb25zdCBjb2RlID0gdmFsdWUuY2hhckNvZGVBdChzdGFydCk7XG5cbiAgICBpZiAoY29kZSAhPT0gMHgwOSAmJiBjb2RlICE9PSAweDIwKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzdGFydCArPSAxO1xuICB9XG5cbiAgd2hpbGUgKGVuZCA+IHN0YXJ0KSB7XG4gICAgY29uc3QgY29kZSA9IHZhbHVlLmNoYXJDb2RlQXQoZW5kIC0gMSk7XG5cbiAgICBpZiAoY29kZSAhPT0gMHgwOSAmJiBjb2RlICE9PSAweDIwKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBlbmQgLT0gMTtcbiAgfVxuXG4gIHJldHVybiBzdGFydCA9PT0gMCAmJiBlbmQgPT09IHZhbHVlLmxlbmd0aCA/IHZhbHVlIDogdmFsdWUuc2xpY2Uoc3RhcnQsIGVuZCk7XG59XG5cbmZ1bmN0aW9uIGRlY29kZVF1b3RlZFN0cmluZyh2YWx1ZSkge1xuICBjb25zdCBsYXN0ID0gdmFsdWUubGVuZ3RoIC0gMTtcblxuICBpZiAobGFzdCA8IDEgfHwgdmFsdWUuY2hhckNvZGVBdCgwKSAhPT0gMHgyMiB8fCB2YWx1ZS5jaGFyQ29kZUF0KGxhc3QpICE9PSAweDIyKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgbGV0IGRlY29kZWQgPSAnJztcblxuICBmb3IgKGxldCBpID0gMTsgaSA8IGxhc3Q7IGkrKykge1xuICAgIGNvbnN0IGNvZGUgPSB2YWx1ZS5jaGFyQ29kZUF0KGkpO1xuXG4gICAgaWYgKGNvZGUgPT09IDB4MjIpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoY29kZSA9PT0gMHg1Yykge1xuICAgICAgaSArPSAxO1xuXG4gICAgICBpZiAoaSA+PSBsYXN0KSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWNvZGVkICs9IHZhbHVlW2ldO1xuICB9XG5cbiAgcmV0dXJuIGRlY29kZWQ7XG59XG5cbmZ1bmN0aW9uIHBhcnNlUGFyYW1ldGVycyh2YWx1ZSkge1xuICBjb25zdCBwYXJhbWV0ZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3Qgc3RyID0gU3RyaW5nKHZhbHVlKTtcbiAgbGV0IHN0YXJ0ID0gMDtcbiAgbGV0IHF1b3RlZCA9IGZhbHNlO1xuICBsZXQgZXNjYXBlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIHBhcnNlUGFyYW1ldGVyKGVuZCkge1xuICAgIGNvbnN0IHBhcnQgPSB0cmltT1dTKHN0ci5zbGljZShzdGFydCwgZW5kKSk7XG4gICAgY29uc3QgZXF1YWxzID0gcGFydC5pbmRleE9mKCc9Jyk7XG5cbiAgICBpZiAoZXF1YWxzIDwgMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5hbWUgPSB0cmltT1dTKHBhcnQuc2xpY2UoMCwgZXF1YWxzKSk7XG5cbiAgICBpZiAoIXBhcmFtZXRlck5hbWVSRS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgbm9ybWFsaXplZE5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAoXG4gICAgICBub3JtYWxpemVkTmFtZSA9PT0gJ19fcHJvdG9fXycgfHxcbiAgICAgIG5vcm1hbGl6ZWROYW1lID09PSAnY29uc3RydWN0b3InIHx8XG4gICAgICBub3JtYWxpemVkTmFtZSA9PT0gJ3Byb3RvdHlwZSdcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJhbWV0ZXJWYWx1ZSA9IHRyaW1PV1MocGFydC5zbGljZShlcXVhbHMgKyAxKSk7XG4gICAgcGFyYW1ldGVyc1tub3JtYWxpemVkTmFtZV0gPSBkZWNvZGVRdW90ZWRTdHJpbmcocGFyYW1ldGVyVmFsdWUpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjb2RlID0gc3RyLmNoYXJDb2RlQXQoaSk7XG5cbiAgICBpZiAocXVvdGVkKSB7XG4gICAgICBpZiAoZXNjYXBlZCkge1xuICAgICAgICBlc2NhcGVkID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4NWMpIHtcbiAgICAgICAgZXNjYXBlZCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4MjIpIHtcbiAgICAgICAgcXVvdGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjb2RlID09PSAweDIyKSB7XG4gICAgICBxdW90ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHgyYyB8fCBjb2RlID09PSAweDNiKSB7XG4gICAgICBwYXJzZVBhcmFtZXRlcihpKTtcbiAgICAgIHN0YXJ0ID0gaSArIDE7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VQYXJhbWV0ZXIoc3RyLmxlbmd0aCk7XG5cbiAgcmV0dXJuIHBhcmFtZXRlcnM7XG59XG5cbmNvbnN0IGlzVmFsaWRIZWFkZXJOYW1lID0gKHN0cikgPT4gL15bLV9hLXpBLVowLTleYHx+LCEjJCUmJyorLl0rJC8udGVzdChzdHIudHJpbSgpKTtcblxuZnVuY3Rpb24gbWF0Y2hIZWFkZXJWYWx1ZShjb250ZXh0LCB2YWx1ZSwgaGVhZGVyLCBmaWx0ZXIsIGlzSGVhZGVyTmFtZUZpbHRlcikge1xuICBpZiAodXRpbHMuaXNGdW5jdGlvbihmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci5jYWxsKHRoaXMsIHZhbHVlLCBoZWFkZXIpO1xuICB9XG5cbiAgaWYgKGlzSGVhZGVyTmFtZUZpbHRlcikge1xuICAgIHZhbHVlID0gaGVhZGVyO1xuICB9XG5cbiAgaWYgKCF1dGlscy5pc1N0cmluZyh2YWx1ZSkpIHJldHVybjtcblxuICBpZiAodXRpbHMuaXNTdHJpbmcoZmlsdGVyKSkge1xuICAgIHJldHVybiB2YWx1ZS5pbmRleE9mKGZpbHRlcikgIT09IC0xO1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzUmVnRXhwKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLnRlc3QodmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEhlYWRlcihoZWFkZXIpIHtcbiAgcmV0dXJuIGhlYWRlclxuICAgIC50cmltKClcbiAgICAudG9Mb3dlckNhc2UoKVxuICAgIC5yZXBsYWNlKC8oW2EtelxcZF0pKFxcdyopL2csICh3LCBjaGFyLCBzdHIpID0+IHtcbiAgICAgIHJldHVybiBjaGFyLnRvVXBwZXJDYXNlKCkgKyBzdHI7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkQWNjZXNzb3JzKG9iaiwgaGVhZGVyKSB7XG4gIGNvbnN0IGFjY2Vzc29yTmFtZSA9IHV0aWxzLnRvQ2FtZWxDYXNlKCcgJyArIGhlYWRlcik7XG5cbiAgWydnZXQnLCAnc2V0JywgJ2hhcyddLmZvckVhY2goKG1ldGhvZE5hbWUpID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBtZXRob2ROYW1lICsgYWNjZXNzb3JOYW1lLCB7XG4gICAgICAvLyBOdWxsLXByb3RvIGRlc2NyaXB0b3Igc28gYSBwb2xsdXRlZCBPYmplY3QucHJvdG90eXBlLmdldCBjYW5ub3QgdHVyblxuICAgICAgLy8gdGhpcyBkYXRhIGRlc2NyaXB0b3IgaW50byBhbiBhY2Nlc3NvciBkZXNjcmlwdG9yIG9uIHRoZSB3YXkgaW4uXG4gICAgICBfX3Byb3RvX186IG51bGwsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gKGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbbWV0aG9kTmFtZV0uY2FsbCh0aGlzLCBoZWFkZXIsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNsYXNzIEF4aW9zSGVhZGVycyB7XG4gIGNvbnN0cnVjdG9yKGhlYWRlcnMpIHtcbiAgICBoZWFkZXJzICYmIHRoaXMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgc2V0KGhlYWRlciwgdmFsdWVPclJld3JpdGUsIHJld3JpdGUpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWxIZWFkZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIGxIZWFkZXIpO1xuXG4gICAgICBpZiAoXG4gICAgICAgICFrZXkgfHxcbiAgICAgICAgc2VsZltrZXldID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgX3Jld3JpdGUgPT09IHRydWUgfHxcbiAgICAgICAgKF9yZXdyaXRlID09PSB1bmRlZmluZWQgJiYgc2VsZltrZXldICE9PSBmYWxzZSlcbiAgICAgICkge1xuICAgICAgICBzZWxmW2tleSB8fCBfaGVhZGVyXSA9IG5vcm1hbGl6ZVZhbHVlKF92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0SGVhZGVycyA9IChoZWFkZXJzLCBfcmV3cml0ZSkgPT5cbiAgICAgIHV0aWxzLmZvckVhY2goaGVhZGVycywgKF92YWx1ZSwgX2hlYWRlcikgPT4gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpKTtcblxuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KGhlYWRlcikgfHwgaGVhZGVyIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3Rvcikge1xuICAgICAgc2V0SGVhZGVycyhoZWFkZXIsIHZhbHVlT3JSZXdyaXRlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzU3RyaW5nKGhlYWRlcikgJiYgKGhlYWRlciA9IGhlYWRlci50cmltKCkpICYmICFpc1ZhbGlkSGVhZGVyTmFtZShoZWFkZXIpKSB7XG4gICAgICBzZXRIZWFkZXJzKHBhcnNlSGVhZGVycyhoZWFkZXIpLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdChoZWFkZXIpICYmIHV0aWxzLmlzU2FmZUl0ZXJhYmxlKGhlYWRlcikpIHtcbiAgICAgIGxldCBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICBkZXN0LFxuICAgICAgICBrZXk7XG4gICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGhlYWRlcikge1xuICAgICAgICBpZiAoIXV0aWxzLmlzQXJyYXkoZW50cnkpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0IGl0ZXJhdG9yIG11c3QgcmV0dXJuIGEga2V5LXZhbHVlIHBhaXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGtleSA9IGVudHJ5WzBdO1xuXG4gICAgICAgIGlmICh1dGlscy5oYXNPd25Qcm9wKG9iaiwga2V5KSkge1xuICAgICAgICAgIGRlc3QgPSBvYmpba2V5XTtcbiAgICAgICAgICBvYmpba2V5XSA9IHV0aWxzLmlzQXJyYXkoZGVzdCkgPyBbLi4uZGVzdCwgZW50cnlbMV1dIDogW2Rlc3QsIGVudHJ5WzFdXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYmpba2V5XSA9IGVudHJ5WzFdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNldEhlYWRlcnMob2JqLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlciAhPSBudWxsICYmIHNldEhlYWRlcih2YWx1ZU9yUmV3cml0ZSwgaGVhZGVyLCByZXdyaXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChoZWFkZXIsIHBhcnNlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgIGlmICghcGFyc2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZVRva2Vucyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5jYWxsKHRoaXMsIHZhbHVlLCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzUmVnRXhwKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmV4ZWModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyc2VyIG11c3QgYmUgYm9vbGVhbnxyZWdleHB8ZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXMoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIHJldHVybiAhIShcbiAgICAgICAga2V5ICYmXG4gICAgICAgIHRoaXNba2V5XSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHRoaXMsIHRoaXNba2V5XSwga2V5LCBtYXRjaGVyKSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGVsZXRlKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVIZWFkZXIoX2hlYWRlcikge1xuICAgICAgX2hlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKF9oZWFkZXIpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBfaGVhZGVyKTtcblxuICAgICAgICBpZiAoa2V5ICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHNlbGYsIHNlbGZba2V5XSwga2V5LCBtYXRjaGVyKSkpIHtcbiAgICAgICAgICBkZWxldGUgc2VsZltrZXldO1xuXG4gICAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheShoZWFkZXIpKSB7XG4gICAgICBoZWFkZXIuZm9yRWFjaChkZWxldGVIZWFkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGVIZWFkZXIoaGVhZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIGNsZWFyKG1hdGNoZXIpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gICAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHRoaXMsIHRoaXNba2V5XSwga2V5LCBtYXRjaGVyLCB0cnVlKSkge1xuICAgICAgICBkZWxldGUgdGhpc1trZXldO1xuICAgICAgICBkZWxldGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIG5vcm1hbGl6ZShmb3JtYXQpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBjb25zdCBoZWFkZXJzID0ge307XG5cbiAgICB1dGlscy5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KGhlYWRlcnMsIGhlYWRlcik7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgc2VsZltrZXldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICAgICAgICBkZWxldGUgc2VsZltoZWFkZXJdO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBmb3JtYXQgPyBmb3JtYXRIZWFkZXIoaGVhZGVyKSA6IFN0cmluZyhoZWFkZXIpLnRyaW0oKTtcblxuICAgICAgaWYgKG5vcm1hbGl6ZWQgIT09IGhlYWRlcikge1xuICAgICAgICBkZWxldGUgc2VsZltoZWFkZXJdO1xuICAgICAgfVxuXG4gICAgICBzZWxmW25vcm1hbGl6ZWRdID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuXG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWRdID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29uY2F0KC4uLnRhcmdldHMpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5jb25jYXQodGhpcywgLi4udGFyZ2V0cyk7XG4gIH1cblxuICB0b0pTT04oYXNTdHJpbmdzKSB7XG4gICAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIHV0aWxzLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIHZhbHVlICE9IG51bGwgJiZcbiAgICAgICAgdmFsdWUgIT09IGZhbHNlICYmXG4gICAgICAgIChvYmpbaGVhZGVyXSA9IGFzU3RyaW5ncyAmJiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmpvaW4oJywgJykgOiB2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKVxuICAgICAgLm1hcCgoW2hlYWRlciwgdmFsdWVdKSA9PiBoZWFkZXIgKyAnOiAnICsgdmFsdWUpXG4gICAgICAuam9pbignXFxuJyk7XG4gIH1cblxuICBnZXRTZXRDb29raWUoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldCgnc2V0LWNvb2tpZScpO1xuICAgIHJldHVybiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PT0gZmFsc2UgPyBbXSA6IFt2YWx1ZV07XG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgcmV0dXJuICdBeGlvc0hlYWRlcnMnO1xuICB9XG5cbiAgc3RhdGljIGZyb20odGhpbmcpIHtcbiAgICByZXR1cm4gdGhpbmcgaW5zdGFuY2VvZiB0aGlzID8gdGhpbmcgOiBuZXcgdGhpcyh0aGluZyk7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VQYXJhbWV0ZXJzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHBhcnNlUGFyYW1ldGVycyh2YWx1ZSk7XG4gIH1cblxuICBzdGF0aWMgY29uY2F0KGZpcnN0LCAuLi50YXJnZXRzKSB7XG4gICAgY29uc3QgY29tcHV0ZWQgPSBuZXcgdGhpcyhmaXJzdCk7XG5cbiAgICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4gY29tcHV0ZWQuc2V0KHRhcmdldCkpO1xuXG4gICAgcmV0dXJuIGNvbXB1dGVkO1xuICB9XG5cbiAgc3RhdGljIGFjY2Vzc29yKGhlYWRlcikge1xuICAgIGNvbnN0IGludGVybmFscyA9XG4gICAgICAodGhpc1skaW50ZXJuYWxzXSA9XG4gICAgICB0aGlzWyRpbnRlcm5hbHNdID1cbiAgICAgICAge1xuICAgICAgICAgIGFjY2Vzc29yczoge30sXG4gICAgICAgIH0pO1xuXG4gICAgY29uc3QgYWNjZXNzb3JzID0gaW50ZXJuYWxzLmFjY2Vzc29ycztcbiAgICBjb25zdCBwcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcblxuICAgIGZ1bmN0aW9uIGRlZmluZUFjY2Vzc29yKF9oZWFkZXIpIHtcbiAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmICghYWNjZXNzb3JzW2xIZWFkZXJdKSB7XG4gICAgICAgIGJ1aWxkQWNjZXNzb3JzKHByb3RvdHlwZSwgX2hlYWRlcik7XG4gICAgICAgIGFjY2Vzc29yc1tsSGVhZGVyXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXRpbHMuaXNBcnJheShoZWFkZXIpID8gaGVhZGVyLmZvckVhY2goZGVmaW5lQWNjZXNzb3IpIDogZGVmaW5lQWNjZXNzb3IoaGVhZGVyKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbkF4aW9zSGVhZGVycy5hY2Nlc3NvcihbXG4gICdDb250ZW50LVR5cGUnLFxuICAnQ29udGVudC1MZW5ndGgnLFxuICAnQWNjZXB0JyxcbiAgJ0FjY2VwdC1FbmNvZGluZycsXG4gICdVc2VyLUFnZW50JyxcbiAgJ0F1dGhvcml6YXRpb24nLFxuXSk7XG5cbi8vIHJlc2VydmVkIG5hbWVzIGhvdGZpeFxudXRpbHMucmVkdWNlRGVzY3JpcHRvcnMoQXhpb3NIZWFkZXJzLnByb3RvdHlwZSwgKHsgdmFsdWUgfSwga2V5KSA9PiB7XG4gIGxldCBtYXBwZWQgPSBrZXlbMF0udG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKTsgLy8gbWFwIGBzZXRgID0+IGBTZXRgXG4gIHJldHVybiB7XG4gICAgZ2V0OiAoKSA9PiB2YWx1ZSxcbiAgICBzZXQoaGVhZGVyVmFsdWUpIHtcbiAgICAgIHRoaXNbbWFwcGVkXSA9IGhlYWRlclZhbHVlO1xuICAgIH0sXG4gIH07XG59KTtcblxudXRpbHMuZnJlZXplTWV0aG9kcyhBeGlvc0hlYWRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0hlYWRlcnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG4vLyBgaGFuZGxlcnNgIGlzIHB1YmxpYyBhbmQgbWF5IGJlIHJlcGxhY2VkIHdpdGggYSBudWxsaXNoIHZhbHVlIGJ5IHVzZXIgY29kZTtcbi8vIGBjbGVhcigpYCBoYXMgYWx3YXlzIHRvbGVyYXRlZCB0aGF0LiBUcmVhdCBpdCBhcyBhbiBlbXB0eSBzdGFjayByYXRoZXIgdGhhblxuLy8gZGVyZWZlcmVuY2luZyBpdC5cbmZ1bmN0aW9uIGNvdW50SGFuZGxlcnMoaGFuZGxlcnMpIHtcbiAgcmV0dXJuIGhhbmRsZXJzID8gaGFuZGxlcnMubGVuZ3RoIDogMDtcbn1cblxuZnVuY3Rpb24gdHJpbUhhbmRsZXJzKGhhbmRsZXJzKSB7XG4gIGlmICghaGFuZGxlcnMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB3aGlsZSAoaGFuZGxlcnMubGVuZ3RoICYmIGhhbmRsZXJzW2hhbmRsZXJzLmxlbmd0aCAtIDFdID09PSBudWxsKSB7XG4gICAgaGFuZGxlcnMucG9wKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3luY0hhbmRsZXJFbnRyaWVzKG1hbmFnZXIsIGludGVybmFscykge1xuICBjb25zdCBoYW5kbGVycyA9IG1hbmFnZXIuaGFuZGxlcnM7XG4gIGNvbnN0IGxlbmd0aCA9IGNvdW50SGFuZGxlcnMoaGFuZGxlcnMpO1xuXG4gIGlmIChoYW5kbGVycyAhPT0gaW50ZXJuYWxzLmhhbmRsZXJzUmVmKSB7XG4gICAgaW50ZXJuYWxzLmhhbmRsZXJzUmVmID0gaGFuZGxlcnM7XG4gICAgaW50ZXJuYWxzLmhhbmRsZXJFbnRyaWVzLmNsZWFyKCk7XG4gIH0gZWxzZSBpZiAobGVuZ3RoICE9PSBpbnRlcm5hbHMuaGFuZGxlcnNMZW5ndGgpIHtcbiAgICBpZiAoIWxlbmd0aCkge1xuICAgICAgaW50ZXJuYWxzLmhhbmRsZXJFbnRyaWVzLmNsZWFyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGludGVybmFscy5oYW5kbGVyRW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uIHJlbW92ZVN0YWxlRW50cnkoZW50cnksIGlkKSB7XG4gICAgICAgIGlmIChoYW5kbGVyc1tlbnRyeS5pbmRleF0gIT09IGVudHJ5LmhhbmRsZXIpIHtcbiAgICAgICAgICBpbnRlcm5hbHMuaGFuZGxlckVudHJpZXMuZGVsZXRlKGlkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW50ZXJuYWxzLmhhbmRsZXJzTGVuZ3RoID0gbGVuZ3RoO1xufVxuXG5jbGFzcyBJbnRlcmNlcHRvck1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gICAgdGhpc1skaW50ZXJuYWxzXSA9IHtcbiAgICAgIGhhbmRsZXJzUmVmOiB0aGlzLmhhbmRsZXJzLFxuICAgICAgaGFuZGxlcnNMZW5ndGg6IHRoaXMuaGFuZGxlcnMubGVuZ3RoLFxuICAgICAgaGFuZGxlckVudHJpZXM6IG5ldyBNYXAoKSxcbiAgICAgIGl0ZXJhdGlvbkRlcHRoOiAwLFxuICAgICAgbmV4dElkOiAwLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFRoZSBvcHRpb25zIGZvciB0aGUgaW50ZXJjZXB0b3IsIHN5bmNocm9ub3VzIGFuZCBydW5XaGVuXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAgICovXG4gIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XG4gICAgY29uc3QgaGFuZGxlciA9IHtcbiAgICAgIGZ1bGZpbGxlZCxcbiAgICAgIHJlamVjdGVkLFxuICAgICAgc3luY2hyb25vdXM6IG9wdGlvbnMgPyBvcHRpb25zLnN5bmNocm9ub3VzIDogZmFsc2UsXG4gICAgICBydW5XaGVuOiBvcHRpb25zID8gb3B0aW9ucy5ydW5XaGVuIDogbnVsbCxcbiAgICB9O1xuICAgIGNvbnN0IGludGVybmFscyA9IHRoaXNbJGludGVybmFsc107XG5cbiAgICBpZiAodGhpcy5oYW5kbGVycyA9PSBudWxsKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gICAgfVxuXG4gICAgc3luY0hhbmRsZXJFbnRyaWVzKHRoaXMsIGludGVybmFscyk7XG5cbiAgICBjb25zdCBpZCA9IGludGVybmFscy5uZXh0SWQrKztcblxuICAgIHRoaXMuaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgICBpbnRlcm5hbHMuaGFuZGxlckVudHJpZXMuc2V0KGlkLCB7XG4gICAgICBoYW5kbGVyLFxuICAgICAgaW5kZXg6IHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMSxcbiAgICB9KTtcbiAgICBpbnRlcm5hbHMuaGFuZGxlcnNMZW5ndGggPSB0aGlzLmhhbmRsZXJzLmxlbmd0aDtcblxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICAgKlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGVqZWN0KGlkKSB7XG4gICAgY29uc3QgaW50ZXJuYWxzID0gdGhpc1skaW50ZXJuYWxzXTtcblxuICAgIHN5bmNIYW5kbGVyRW50cmllcyh0aGlzLCBpbnRlcm5hbHMpO1xuXG4gICAgY29uc3QgZW50cnkgPSBpbnRlcm5hbHMuaGFuZGxlckVudHJpZXMuZ2V0KGlkKTtcblxuICAgIGlmIChlbnRyeSkge1xuICAgICAgaW50ZXJuYWxzLmhhbmRsZXJFbnRyaWVzLmRlbGV0ZShpZCk7XG5cbiAgICAgIC8vIElnbm9yZSBJRHMgaW52YWxpZGF0ZWQgYnkgY2xlYXIgb3IgZGlyZWN0IHJlcGxhY2VtZW50IG9mIGhhbmRsZXJzLlxuICAgICAgaWYgKHRoaXMuaGFuZGxlcnNbZW50cnkuaW5kZXhdICE9PSBlbnRyeS5oYW5kbGVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5oYW5kbGVyc1tlbnRyeS5pbmRleF0gPSBudWxsO1xuXG4gICAgICAvLyBEbyBub3QgcmV1c2UgYW4gaW5kZXggd2hpbGUgZm9yRWFjaCBpcyB3YWxraW5nIGl0cyBsZW5ndGggc25hcHNob3QuXG4gICAgICBpZiAoIWludGVybmFscy5pdGVyYXRpb25EZXB0aCkge1xuICAgICAgICB0cmltSGFuZGxlcnModGhpcy5oYW5kbGVycyk7XG4gICAgICAgIGludGVybmFscy5oYW5kbGVyc0xlbmd0aCA9IHRoaXMuaGFuZGxlcnMubGVuZ3RoO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgaW50ZXJjZXB0b3JzIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnMpIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICAgIHN5bmNIYW5kbGVyRW50cmllcyh0aGlzLCB0aGlzWyRpbnRlcm5hbHNdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAgICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZm9yRWFjaChmbikge1xuICAgIGNvbnN0IGludGVybmFscyA9IHRoaXNbJGludGVybmFsc107XG5cbiAgICBzeW5jSGFuZGxlckVudHJpZXModGhpcywgaW50ZXJuYWxzKTtcblxuICAgIGludGVybmFscy5pdGVyYXRpb25EZXB0aCsrO1xuXG4gICAgdHJ5IHtcbiAgICAgIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgICAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgICAgIGZuKGgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKCEtLWludGVybmFscy5pdGVyYXRpb25EZXB0aCkge1xuICAgICAgICBzeW5jSGFuZGxlckVudHJpZXModGhpcywgaW50ZXJuYWxzKTtcbiAgICAgICAgdHJpbUhhbmRsZXJzKHRoaXMuaGFuZGxlcnMpO1xuICAgICAgICBpbnRlcm5hbHMuaGFuZGxlcnNMZW5ndGggPSBjb3VudEhhbmRsZXJzKHRoaXMuaGFuZGxlcnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yLCB7IFJFREFDVEVEIH0gZnJvbSAnLi9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBpc0Fic29sdXRlVVJMIGZyb20gJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyc7XG5pbXBvcnQgY29tYmluZVVSTHMgZnJvbSAnLi4vaGVscGVycy9jb21iaW5lVVJMcy5qcyc7XG5pbXBvcnQgbm9ybWFsaXplVVJMRm9yUHJvdG9jb2xDaGVjayBmcm9tICcuLi9oZWxwZXJzL25vcm1hbGl6ZVVSTEZvclByb3RvY29sQ2hlY2suanMnO1xuXG5jb25zdCBtYWxmb3JtZWRIdHRwUHJvdG9jb2wgPSAvXmh0dHBzPzooPyFcXC9cXC8pL2k7XG5cbi8vIFJlZGFjdCB0aGUgcGFydHMgb2YgYSBVUkwgdGhhdCBjYW4gY2Fycnkgc2VjcmV0cyBiZWZvcmUgaXQgaXMgZW1iZWRkZWQgaW4gYW5cbi8vIGVycm9yIG1lc3NhZ2UuIEF4aW9zRXJyb3IudG9KU09OKCkgc2VyaWFsaXplcyBgbWVzc2FnZWAgdmVyYmF0aW0gYW5kIGVycm9yc1xuLy8gYXJlIGNvbW1vbmx5IGxvZ2dlZCwgd2hpbGUgdGhlIG9wdC1pbiBgY29uZmlnLnJlZGFjdGAgbW9kZWwgb25seSBjbGVhbnNcbi8vIGNvbmZpZyBrZXlzIOKAlCBpdCBjYW5ub3QgcmVhY2ggdGhlIG1lc3NhZ2UuIFJlZGFjdCBvbmx5IHRoZSBnZW51aW5lbHlcbi8vIHNlbnNpdGl2ZSBzdWJzdHJpbmdzIOKAlCB1c2VyaW5mbyAoY3JlZGVudGlhbHMpLCBxdWVyeSBwYXJhbWV0ZXIgdmFsdWVzIGFuZFxuLy8gZnJhZ21lbnQgY29udGVudHMg4oCUIHdpdGggdGhlIHNhbWUgUkVEQUNURUQgbWFya2VyIHRoZSBjb25maWcgcmVkYWN0aW9uIHVzZXMsXG4vLyB3aGlsZSBrZWVwaW5nIHRoZSBzY2hlbWUsIGhvc3QsIHBhdGggYW5kIHBhcmFtZXRlciBuYW1lcyBzbyB0aGUgb2ZmZW5kaW5nXG4vLyByZXF1ZXN0IHN0YXlzIGFjY3VyYXRlbHkgaWRlbnRpZmlhYmxlLlxuZnVuY3Rpb24gcmVkYWN0RnJhZ21lbnQoZnJhZ21lbnQpIHtcbiAgaWYgKCFmcmFnbWVudCkge1xuICAgIHJldHVybiBmcmFnbWVudDtcbiAgfVxuXG4gIHJldHVybiBmcmFnbWVudC5yZXBsYWNlKC8oXnwmKShbXj0mXSo9KT9bXiZdKy9nLCAobWF0Y2gsIHNlcGFyYXRvciwgcGFyYW1ldGVyTmFtZSA9ICcnKSA9PiB7XG4gICAgcmV0dXJuIGAke3NlcGFyYXRvcn0ke3BhcmFtZXRlck5hbWV9JHtSRURBQ1RFRH1gO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVkYWN0U2Vuc2l0aXZlVVJMUGFydHModXJsKSB7XG4gIGNvbnN0IHJlZGFjdGVkVVJMID0gdXJsLnJlcGxhY2UoL14oaHR0cHM/OlxcL3swLDJ9KVteLz8jXSpAL2ksIGAkMSR7UkVEQUNURUR9QGApO1xuICBjb25zdCBmcmFnbWVudEluZGV4ID0gcmVkYWN0ZWRVUkwuaW5kZXhPZignIycpO1xuICBjb25zdCB1cmxXaXRob3V0RnJhZ21lbnQgPVxuICAgIGZyYWdtZW50SW5kZXggPT09IC0xID8gcmVkYWN0ZWRVUkwgOiByZWRhY3RlZFVSTC5zbGljZSgwLCBmcmFnbWVudEluZGV4KTtcbiAgY29uc3QgcmVkYWN0ZWRVUkxXaXRob3V0RnJhZ21lbnQgPSB1cmxXaXRob3V0RnJhZ21lbnQucmVwbGFjZShcbiAgICAvKFs/Jl1bXj0mI10qPSlbXiYjXSovZyxcbiAgICBgJDEke1JFREFDVEVEfWBcbiAgKTtcblxuICBpZiAoZnJhZ21lbnRJbmRleCA9PT0gLTEpIHtcbiAgICByZXR1cm4gcmVkYWN0ZWRVUkxXaXRob3V0RnJhZ21lbnQ7XG4gIH1cblxuICByZXR1cm4gYCR7cmVkYWN0ZWRVUkxXaXRob3V0RnJhZ21lbnR9IyR7cmVkYWN0RnJhZ21lbnQocmVkYWN0ZWRVUkwuc2xpY2UoZnJhZ21lbnRJbmRleCArIDEpKX1gO1xufVxuXG5mdW5jdGlvbiBhc3NlcnRWYWxpZEh0dHBQcm90b2NvbFVSTCh1cmwsIGNvbmZpZykge1xuICBpZiAodHlwZW9mIHVybCA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBub3JtYWxpemVkVVJMID0gbm9ybWFsaXplVVJMRm9yUHJvdG9jb2xDaGVjayh1cmwpO1xuICAgIGlmIChtYWxmb3JtZWRIdHRwUHJvdG9jb2wudGVzdChub3JtYWxpemVkVVJMKSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIGBJbnZhbGlkIFVSTCAke0pTT04uc3RyaW5naWZ5KHJlZGFjdFNlbnNpdGl2ZVVSTFBhcnRzKG5vcm1hbGl6ZWRVUkwpKX06IG1pc3NpbmcgXCIvL1wiIGFmdGVyIHByb3RvY29sYCxcbiAgICAgICAgQXhpb3NFcnJvci5FUlJfSU5WQUxJRF9VUkwsXG4gICAgICAgIGNvbmZpZ1xuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMLCBhbGxvd0Fic29sdXRlVXJscywgY29uZmlnKSB7XG4gIGFzc2VydFZhbGlkSHR0cFByb3RvY29sVVJMKHJlcXVlc3RlZFVSTCwgY29uZmlnKTtcbiAgbGV0IGlzUmVsYXRpdmVVcmwgPSAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpO1xuICBpZiAoYmFzZVVSTCAmJiAoaXNSZWxhdGl2ZVVybCB8fCBhbGxvd0Fic29sdXRlVXJscyA9PT0gZmFsc2UpKSB7XG4gICAgYXNzZXJ0VmFsaWRIdHRwUHJvdG9jb2xVUkwoYmFzZVVSTCwgY29uZmlnKTtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdHJhbnNmb3JtRGF0YSBmcm9tICcuL3RyYW5zZm9ybURhdGEuanMnO1xuaW1wb3J0IGlzQ2FuY2VsIGZyb20gJy4uL2NhbmNlbC9pc0NhbmNlbC5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgYWRhcHRlcnMgZnJvbSAnLi4vYWRhcHRlcnMvYWRhcHRlcnMuanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxuXG4gIGlmIChjb25maWcuc2lnbmFsICYmIGNvbmZpZy5zaWduYWwuYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZyk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoX2NvbmZpZykge1xuICAvLyBJbnRlcmNlcHRvcnMgbWF5IHJlcGxhY2UgdGhlIG1lcmdlZCBjb25maWcgd2l0aCBhbiBvcmRpbmFyeSBvYmplY3QuIEZsYXR0ZW5cbiAgLy8gaXQgYXQgdGhlIGRpc3BhdGNoIGJvdW5kYXJ5IHNvIHNoYXJlZCBwcm90b3R5cGUgbWVtYmVycyBjYW5ub3QgYmVjb21lXG4gIC8vIHJlcXVlc3QgYmVoYXZpb3IsIHdoaWxlIHByZXNlcnZpbmcgaW50ZW50aW9uYWwgdGVtcGxhdGUvY2xhc3MgbWVtYmVycy5cbiAgY29uc3QgY29uZmlnID0gdXRpbHMudG9TYWZlRmxhdE9iamVjdChfY29uZmlnKTtcblxuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbSh1dGlscy5nZXRTYWZlUHJvcChjb25maWcsICdoZWFkZXJzJykpO1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoY29uZmlnLCBjb25maWcudHJhbnNmb3JtUmVxdWVzdCk7XG5cbiAgaWYgKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXS5pbmRleE9mKGNvbmZpZy5tZXRob2QpICE9PSAtMSkge1xuICAgIGNvbmZpZy5oZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLCBmYWxzZSk7XG4gIH1cblxuICBjb25zdCBhZGFwdGVyID0gYWRhcHRlcnMuZ2V0QWRhcHRlcihjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyLCBjb25maWcpO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihcbiAgICBmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIEV4cG9zZSB0aGUgY3VycmVudCByZXNwb25zZSBvbiBjb25maWcgc28gdGhhdCB0cmFuc2Zvcm1SZXNwb25zZSBjYW5cbiAgICAgIC8vIGF0dGFjaCBpdCB0byBhbnkgQXhpb3NFcnJvciBpdCB0aHJvd3MgKGUuZy4gb24gSlNPTiBwYXJzZSBmYWlsdXJlKS5cbiAgICAgIC8vIFdlIGNsZWFuIGl0IHVwIGFmdGVyd2FyZHMgdG8gYXZvaWQgcG9sbHV0aW5nIHRoZSBjb25maWcgb2JqZWN0LlxuICAgICAgY29uZmlnLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICB0cnkge1xuICAgICAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKGNvbmZpZywgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLCByZXNwb25zZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBkZWxldGUgY29uZmlnLnJlc3BvbnNlO1xuICAgICAgfVxuXG4gICAgICByZXNwb25zZS5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20ocmVzcG9uc2UuaGVhZGVycyk7XG5cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9LFxuICAgIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgICBjb25maWcucmVzcG9uc2UgPSByZWFzb24ucmVzcG9uc2U7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgICAgICAgICAgcmVhc29uLnJlc3BvbnNlXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLnJlc3BvbnNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgICB9XG4gICk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4vQXhpb3NIZWFkZXJzLmpzJztcblxuY29uc3QgaGVhZGVyc1RvT2JqZWN0ID0gKHRoaW5nKSA9PiAodGhpbmcgaW5zdGFuY2VvZiBBeGlvc0hlYWRlcnMgPyB7IC4uLnRoaW5nIH0gOiB0aGluZyk7XG5cbmNvbnN0IG93bkVudW1lcmFibGVLZXlzID0gKHRoaW5nKSA9PiB7XG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpbmcpLmNvbmNhdChcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGhpbmcpLmZpbHRlcihcbiAgICAgICAgKHN5bWJvbCkgPT4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGluZywgc3ltYm9sKS5lbnVtZXJhYmxlXG4gICAgICApXG4gICAgKTtcbiAgfVxuICByZXR1cm4gT2JqZWN0LmtleXModGhpbmcpO1xufTtcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcxID0gY29uZmlnMSB8fCB7fTtcbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG5cbiAgLy8gVXNlIGEgbnVsbC1wcm90b3R5cGUgb2JqZWN0IHNvIHRoYXQgZG93bnN0cmVhbSByZWFkcyBzdWNoIGFzIGBjb25maWcuYXV0aGBcbiAgLy8gb3IgYGNvbmZpZy5iYXNlVVJMYCBjYW5ub3QgaW5oZXJpdCBwb2xsdXRlZCB2YWx1ZXMgZnJvbSBPYmplY3QucHJvdG90eXBlLlxuICAvLyBgaGFzT3duUHJvcGVydHlgIGlzIHJlc3RvcmVkIGFzIGEgbm9uLWVudW1lcmFibGUgb3duIHNsb3QgdG8gcHJlc2VydmVcbiAgLy8gZXJnb25vbWljcyBmb3IgdXNlciBjb2RlIHRoYXQgcmVsaWVzIG9uIGl0LlxuICBjb25zdCBjb25maWcgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uZmlnLCAnaGFzT3duUHJvcGVydHknLCB7XG4gICAgLy8gTnVsbC1wcm90byBkZXNjcmlwdG9yIHNvIGEgcG9sbHV0ZWQgT2JqZWN0LnByb3RvdHlwZS5nZXQgY2Fubm90IHR1cm5cbiAgICAvLyB0aGlzIGRhdGEgZGVzY3JpcHRvciBpbnRvIGFuIGFjY2Vzc29yIGRlc2NyaXB0b3Igb24gdGhlIHdheSBpbi5cbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgdmFsdWU6IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICB9KTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgcHJvcCwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlLmNhbGwoeyBjYXNlbGVzcyB9LCB0YXJnZXQsIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhhLCBiLCBwcm9wLCBjYXNlbGVzcykge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiLCBwcm9wLCBjYXNlbGVzcyk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEsIHByb3AsIGNhc2VsZXNzKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIoYSwgYikge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGIpO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRNZXJnZWRUcmFuc2l0aW9uYWxPcHRpb24ocHJvcCkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25hbDIgPSB1dGlscy5oYXNPd25Qcm9wKGNvbmZpZzIsICd0cmFuc2l0aW9uYWwnKVxuICAgICAgPyBjb25maWcyLnRyYW5zaXRpb25hbFxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKHRyYW5zaXRpb25hbDIpKSB7XG4gICAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0cmFuc2l0aW9uYWwyKSkge1xuICAgICAgICBpZiAodXRpbHMuaGFzT3duUHJvcCh0cmFuc2l0aW9uYWwyLCBwcm9wKSkge1xuICAgICAgICAgIHJldHVybiB0cmFuc2l0aW9uYWwyW3Byb3BdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHRyYW5zaXRpb25hbDEgPSB1dGlscy5oYXNPd25Qcm9wKGNvbmZpZzEsICd0cmFuc2l0aW9uYWwnKVxuICAgICAgPyBjb25maWcxLnRyYW5zaXRpb25hbFxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0cmFuc2l0aW9uYWwxKSAmJiB1dGlscy5oYXNPd25Qcm9wKHRyYW5zaXRpb25hbDEsIHByb3ApKSB7XG4gICAgICByZXR1cm4gdHJhbnNpdGlvbmFsMVtwcm9wXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGlyZWN0S2V5cyhhLCBiLCBwcm9wKSB7XG4gICAgaWYgKHV0aWxzLmhhc093blByb3AoY29uZmlnMiwgcHJvcCkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmhhc093blByb3AoY29uZmlnMSwgcHJvcCkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1lcmdlTWFwID0ge1xuICAgIHVybDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBtZXRob2Q6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgZGF0YTogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBiYXNlVVJMOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVzcG9uc2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcGFyYW1zU2VyaWFsaXplcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXRFcnJvck1lc3NhZ2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aENyZWRlbnRpYWxzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhYU1JGVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYWRhcHRlcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZVR5cGU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkNvb2tpZU5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkhlYWRlck5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25VcGxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgZGVjb21wcmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhDb250ZW50TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heEJvZHlMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYmVmb3JlUmVkaXJlY3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNwb3J0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwc0FnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGNhbmNlbFRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHNvY2tldFBhdGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYWxsb3dlZFNvY2tldFBhdGhzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlRW5jb2Rpbmc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdmFsaWRhdGVTdGF0dXM6IG1lcmdlRGlyZWN0S2V5cyxcbiAgICBoZWFkZXJzOiAoYSwgYiwgcHJvcCkgPT5cbiAgICAgIG1lcmdlRGVlcFByb3BlcnRpZXMoaGVhZGVyc1RvT2JqZWN0KGEpLCBoZWFkZXJzVG9PYmplY3QoYiksIHByb3AsIHRydWUpLFxuICB9O1xuXG4gIHV0aWxzLmZvckVhY2gob3duRW51bWVyYWJsZUtleXMoeyAuLi5jb25maWcxLCAuLi5jb25maWcyIH0pLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIGlmIChwcm9wID09PSAnX19wcm90b19fJyB8fCBwcm9wID09PSAnY29uc3RydWN0b3InIHx8IHByb3AgPT09ICdwcm90b3R5cGUnKSByZXR1cm47XG4gICAgY29uc3QgbWVyZ2UgPSB1dGlscy5oYXNPd25Qcm9wKG1lcmdlTWFwLCBwcm9wKSA/IG1lcmdlTWFwW3Byb3BdIDogbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICBjb25zdCBhID0gdXRpbHMuaGFzT3duUHJvcChjb25maWcxLCBwcm9wKSA/IGNvbmZpZzFbcHJvcF0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgYiA9IHV0aWxzLmhhc093blByb3AoY29uZmlnMiwgcHJvcCkgPyBjb25maWcyW3Byb3BdIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGNvbmZpZ1ZhbHVlID0gbWVyZ2UoYSwgYiwgcHJvcCk7XG4gICAgKHV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZ1ZhbHVlKSAmJiBtZXJnZSAhPT0gbWVyZ2VEaXJlY3RLZXlzKSB8fCAoY29uZmlnW3Byb3BdID0gY29uZmlnVmFsdWUpO1xuICB9KTtcblxuICBpZiAoXG4gICAgdXRpbHMuaGFzT3duUHJvcChjb25maWcyLCAndmFsaWRhdGVTdGF0dXMnKSAmJlxuICAgIHV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzIudmFsaWRhdGVTdGF0dXMpICYmXG4gICAgZ2V0TWVyZ2VkVHJhbnNpdGlvbmFsT3B0aW9uKCd2YWxpZGF0ZVN0YXR1c1VuZGVmaW5lZFJlc29sdmVzJykgPT09IGZhbHNlXG4gICkge1xuICAgIGlmICh1dGlscy5oYXNPd25Qcm9wKGNvbmZpZzEsICd2YWxpZGF0ZVN0YXR1cycpKSB7XG4gICAgICBjb25maWcudmFsaWRhdGVTdGF0dXMgPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzEudmFsaWRhdGVTdGF0dXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb25maWc7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG1ldGhvZExpc3QgPSBPYmplY3QuZnJlZXplKFtcbiAgJ2dldCcsXG4gICdkZWxldGUnLFxuICAnaGVhZCcsXG4gICdvcHRpb25zJyxcbiAgJ3Bvc3QnLFxuICAncHV0JyxcbiAgJ3BhdGNoJyxcbiAgJ3B1cmdlJyxcbiAgJ2xpbmsnLFxuICAndW5saW5rJyxcbiAgJ3F1ZXJ5Jyxcbl0pO1xuXG5leHBvcnQgZGVmYXVsdCBtZXRob2RMaXN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBGT1JNX0RBVEFfQ09OVEVOVF9IRUFERVJTID0gWydjb250ZW50LXR5cGUnLCAnY29udGVudC1sZW5ndGgnXTtcblxuLyoqXG4gKiBBcHBseSB0aGUgaGVhZGVycyBnZW5lcmF0ZWQgYnkgYSBGb3JtRGF0YSBpbXBsZW1lbnRhdGlvbiB0byB0aGUgcmVxdWVzdCBoZWFkZXJzLFxuICogaG9ub3JpbmcgdGhlIGBmb3JtRGF0YUhlYWRlclBvbGljeWAgb3B0aW9uOiB3aXRoICdjb250ZW50LW9ubHknLCBjb3B5IG9ubHkgdGhlXG4gKiBjb250ZW50LSogaGVhZGVyczsgb3RoZXJ3aXNlIG1lcmdlIGFsbCBvZiB0aGVtLlxuICpcbiAqIEBwYXJhbSB7QXhpb3NIZWFkZXJzfSBoZWFkZXJzIC0gdGhlIHJlcXVlc3QgaGVhZGVycyB0byBtdXRhdGVcbiAqIEBwYXJhbSB7T2JqZWN0IHwgbnVsbCB8IHVuZGVmaW5lZH0gZm9ybUhlYWRlcnMgLSBoZWFkZXJzIHByb2R1Y2VkIGJ5IHRoZSBGb3JtRGF0YSBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtIHtTdHJpbmd9IFtwb2xpY3ldIC0gdGhlIHJlc29sdmVkIGBmb3JtRGF0YUhlYWRlclBvbGljeWAgY29uZmlnIHZhbHVlXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldEZvcm1EYXRhSGVhZGVycyhoZWFkZXJzLCBmb3JtSGVhZGVycywgcG9saWN5KSB7XG4gIGlmIChwb2xpY3kgIT09ICdjb250ZW50LW9ubHknKSB7XG4gICAgaGVhZGVycy5zZXQoZm9ybUhlYWRlcnMpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIE9iamVjdC5lbnRyaWVzKGZvcm1IZWFkZXJzIHx8IHt9KS5mb3JFYWNoKChba2V5LCB2YWxdKSA9PiB7XG4gICAgaWYgKEZPUk1fREFUQV9DT05URU5UX0hFQURFUlMuaW5jbHVkZXMoa2V5LnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICBoZWFkZXJzLnNldChrZXksIHZhbCk7XG4gICAgfVxuICB9KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi9BeGlvc0Vycm9yLmpzJztcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgcmVzcG9uc2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5zdGF0dXMgPj0gNDAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDUwMCA/IEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNUIDogQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHBhcmFtIHs/T2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2Ugb2JqZWN0XG4gKlxuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGZucywgcmVzcG9uc2UpIHtcbiAgY29uc3QgY29uZmlnID0gdGhpcyB8fCBkZWZhdWx0cztcbiAgY29uc3QgY29udGV4dCA9IHJlc3BvbnNlIHx8IGNvbmZpZztcbiAgY29uc3QgaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGNvbnRleHQuaGVhZGVycyk7XG4gIGxldCBkYXRhID0gY29udGV4dC5kYXRhO1xuXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb25maWcsIGRhdGEsIGhlYWRlcnMubm9ybWFsaXplKCksIHJlc3BvbnNlID8gcmVzcG9uc2Uuc3RhdHVzIDogdW5kZWZpbmVkKTtcbiAgfSk7XG5cbiAgaGVhZGVycy5ub3JtYWxpemUoKTtcblxuICByZXR1cm4gZGF0YTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi90cmFuc2l0aW9uYWwuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi4vaGVscGVycy90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCB0b1VSTEVuY29kZWRGb3JtIGZyb20gJy4uL2hlbHBlcnMvdG9VUkxFbmNvZGVkRm9ybS5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4uL2hlbHBlcnMvZm9ybURhdGFUb0pTT04uanMnO1xuaW1wb3J0IG1ldGhvZExpc3QgZnJvbSAnLi4vY29yZS9tZXRob2RMaXN0LmpzJztcblxuY29uc3Qgb3duID0gKG9iaiwga2V5KSA9PiAob2JqICE9IG51bGwgJiYgdXRpbHMuaGFzT3duUHJvcChvYmosIGtleSkgPyBvYmpba2V5XSA6IHVuZGVmaW5lZCk7XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcsIHRyaWVzIHRvIHBhcnNlIGl0LCBhbmQgaWYgaXQgZmFpbHMsIGl0IHJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb25cbiAqIG9mIHRoZSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7YW55fSByYXdWYWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzdHJpbmdpZmllZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcnNlciAtIEEgZnVuY3Rpb24gdGhhdCBwYXJzZXMgYSBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5jb2RlciAtIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHZhbHVlIGFuZCByZXR1cm5zIGEgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgcmF3VmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgdHJhbnNpdGlvbmFsOiB0cmFuc2l0aW9uYWxEZWZhdWx0cyxcblxuICBhZGFwdGVyOiBbJ3hocicsICdodHRwJywgJ2ZldGNoJ10sXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW1xuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgICBjb25zdCBoYXNKU09OQ29udGVudFR5cGUgPSBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgPiAtMTtcbiAgICAgIGNvbnN0IGlzT2JqZWN0UGF5bG9hZCA9IHV0aWxzLmlzT2JqZWN0KGRhdGEpO1xuXG4gICAgICBpZiAoaXNPYmplY3RQYXlsb2FkICYmIHV0aWxzLmlzSFRNTEZvcm0oZGF0YSkpIHtcbiAgICAgICAgZGF0YSA9IG5ldyBGb3JtRGF0YShkYXRhKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNGb3JtRGF0YSA9IHV0aWxzLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICAgIGlmIChpc0Zvcm1EYXRhKSB7XG4gICAgICAgIHJldHVybiBoYXNKU09OQ29udGVudFR5cGUgPyBKU09OLnN0cmluZ2lmeShmb3JtRGF0YVRvSlNPTihkYXRhKSkgOiBkYXRhO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICAgIHV0aWxzLmlzQmxvYihkYXRhKSB8fFxuICAgICAgICB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9XG4gICAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgICAgfVxuICAgICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JywgZmFsc2UpO1xuICAgICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBsZXQgaXNGaWxlTGlzdDtcblxuICAgICAgaWYgKGlzT2JqZWN0UGF5bG9hZCkge1xuICAgICAgICBjb25zdCBmb3JtU2VyaWFsaXplciA9IG93bih0aGlzLCAnZm9ybVNlcmlhbGl6ZXInKTtcbiAgICAgICAgaWYgKGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpID4gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCBmb3JtU2VyaWFsaXplcikudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAoaXNGaWxlTGlzdCA9IHV0aWxzLmlzRmlsZUxpc3QoZGF0YSkpIHx8XG4gICAgICAgICAgY29udGVudFR5cGUuaW5kZXhPZignbXVsdGlwYXJ0L2Zvcm0tZGF0YScpID4gLTFcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgZW52ID0gb3duKHRoaXMsICdlbnYnKTtcbiAgICAgICAgICBjb25zdCBfRm9ybURhdGEgPSBlbnYgJiYgZW52LkZvcm1EYXRhO1xuXG4gICAgICAgICAgcmV0dXJuIHRvRm9ybURhdGEoXG4gICAgICAgICAgICBpc0ZpbGVMaXN0ID8geyAnZmlsZXNbXSc6IGRhdGEgfSA6IGRhdGEsXG4gICAgICAgICAgICBfRm9ybURhdGEgJiYgbmV3IF9Gb3JtRGF0YSgpLFxuICAgICAgICAgICAgZm9ybVNlcmlhbGl6ZXJcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL2pzb24nLCBmYWxzZSk7XG4gICAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG4gIF0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtcbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSBvd24odGhpcywgJ3RyYW5zaXRpb25hbCcpIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICAgIGNvbnN0IGZvcmNlZEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5mb3JjZWRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHJlc3BvbnNlVHlwZSA9IG93bih0aGlzLCAncmVzcG9uc2VUeXBlJyk7XG4gICAgICBjb25zdCBKU09OUmVxdWVzdGVkID0gcmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICAgIGlmICh1dGlscy5pc1Jlc3BvbnNlKGRhdGEpIHx8IHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSkpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgZGF0YSAmJlxuICAgICAgICB1dGlscy5pc1N0cmluZyhkYXRhKSAmJlxuICAgICAgICAoKGZvcmNlZEpTT05QYXJzaW5nICYmICFyZXNwb25zZVR5cGUpIHx8IEpTT05SZXF1ZXN0ZWQpXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgc2lsZW50SlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLnNpbGVudEpTT05QYXJzaW5nO1xuICAgICAgICBjb25zdCBzdHJpY3RKU09OUGFyc2luZyA9ICFzaWxlbnRKU09OUGFyc2luZyAmJiBKU09OUmVxdWVzdGVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSwgb3duKHRoaXMsICdwYXJzZVJldml2ZXInKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICAgIGlmIChlLm5hbWUgPT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGUsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSwgdGhpcywgbnVsbCwgb3duKHRoaXMsICdyZXNwb25zZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG4gIF0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIG1heEJvZHlMZW5ndGg6IC0xLFxuXG4gIGVudjoge1xuICAgIEZvcm1EYXRhOiBwbGF0Zm9ybS5jbGFzc2VzLkZvcm1EYXRhLFxuICAgIEJsb2I6IHBsYXRmb3JtLmNsYXNzZXMuQmxvYixcbiAgfSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9LFxuXG4gIGhlYWRlcnM6IHtcbiAgICBjb21tb246IHtcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkLFxuICAgIH0sXG4gIH0sXG59O1xuXG51dGlscy5mb3JFYWNoKG1ldGhvZExpc3QsIChtZXRob2QpID0+IHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZSxcbiAgbGVnYWN5SW50ZXJjZXB0b3JSZXFSZXNPcmRlcmluZzogdHJ1ZSxcbiAgYWR2ZXJ0aXNlWnN0ZEFjY2VwdEVuY29kaW5nOiBmYWxzZSxcbiAgdmFsaWRhdGVTdGF0dXNVbmRlZmluZWRSZXNvbHZlczogdHJ1ZSxcbn07XG4iLCJleHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMS4yMC4wXCI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuL3RvRm9ybURhdGEuanMnO1xuXG4vKipcbiAqIEl0IGVuY29kZXMgYSBzdHJpbmcgYnkgcmVwbGFjaW5nIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBpbiB0aGUgdW5yZXNlcnZlZCBzZXQgd2l0aFxuICogdGhlaXIgcGVyY2VudC1lbmNvZGVkIGVxdWl2YWxlbnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gZW5jb2RlLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlKHN0cikge1xuICBjb25zdCBjaGFyTWFwID0ge1xuICAgICchJzogJyUyMScsXG4gICAgXCInXCI6ICclMjcnLFxuICAgICcoJzogJyUyOCcsXG4gICAgJyknOiAnJTI5JyxcbiAgICAnfic6ICclN0UnLFxuICAgICclMjAnOiAnKycsXG4gIH07XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC9bIScoKX5dfCUyMC9nLCBmdW5jdGlvbiByZXBsYWNlcihtYXRjaCkge1xuICAgIHJldHVybiBjaGFyTWFwW21hdGNoXTtcbiAgfSk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXJhbXMgb2JqZWN0IGFuZCBjb252ZXJ0cyBpdCB0byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gcGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgdG8gYmUgY29udmVydGVkIHRvIGEgRm9ybURhdGEgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IHBhc3NlZCB0byB0aGUgQXhpb3MgY29uc3RydWN0b3IuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgb3B0aW9ucykge1xuICB0aGlzLl9wYWlycyA9IFtdO1xuXG4gIHBhcmFtcyAmJiB0b0Zvcm1EYXRhKHBhcmFtcywgdGhpcywgb3B0aW9ucyk7XG59XG5cbmNvbnN0IHByb3RvdHlwZSA9IEF4aW9zVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZTtcblxucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuICB0aGlzLl9wYWlycy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xufTtcblxucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoZW5jb2Rlcikge1xuICBjb25zdCBfZW5jb2RlID0gZW5jb2RlclxuICAgID8gKHZhbHVlKSA9PiBlbmNvZGVyLmNhbGwodGhpcywgdmFsdWUsIGVuY29kZSlcbiAgICA6IGVuY29kZTtcblxuICByZXR1cm4gdGhpcy5fcGFpcnNcbiAgICAubWFwKGZ1bmN0aW9uIGVhY2gocGFpcikge1xuICAgICAgcmV0dXJuIF9lbmNvZGUocGFpclswXSkgKyAnPScgKyBfZW5jb2RlKHBhaXJbMV0pO1xuICAgIH0sICcnKVxuICAgIC5qb2luKCcmJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsImNvbnN0IEh0dHBTdGF0dXNDb2RlID0ge1xuICBDb250aW51ZTogMTAwLFxuICBTd2l0Y2hpbmdQcm90b2NvbHM6IDEwMSxcbiAgUHJvY2Vzc2luZzogMTAyLFxuICBFYXJseUhpbnRzOiAxMDMsXG4gIE9rOiAyMDAsXG4gIENyZWF0ZWQ6IDIwMSxcbiAgQWNjZXB0ZWQ6IDIwMixcbiAgTm9uQXV0aG9yaXRhdGl2ZUluZm9ybWF0aW9uOiAyMDMsXG4gIE5vQ29udGVudDogMjA0LFxuICBSZXNldENvbnRlbnQ6IDIwNSxcbiAgUGFydGlhbENvbnRlbnQ6IDIwNixcbiAgTXVsdGlTdGF0dXM6IDIwNyxcbiAgQWxyZWFkeVJlcG9ydGVkOiAyMDgsXG4gIEltVXNlZDogMjI2LFxuICBNdWx0aXBsZUNob2ljZXM6IDMwMCxcbiAgTW92ZWRQZXJtYW5lbnRseTogMzAxLFxuICBGb3VuZDogMzAyLFxuICBTZWVPdGhlcjogMzAzLFxuICBOb3RNb2RpZmllZDogMzA0LFxuICBVc2VQcm94eTogMzA1LFxuICBVbnVzZWQ6IDMwNixcbiAgVGVtcG9yYXJ5UmVkaXJlY3Q6IDMwNyxcbiAgUGVybWFuZW50UmVkaXJlY3Q6IDMwOCxcbiAgQmFkUmVxdWVzdDogNDAwLFxuICBVbmF1dGhvcml6ZWQ6IDQwMSxcbiAgUGF5bWVudFJlcXVpcmVkOiA0MDIsXG4gIEZvcmJpZGRlbjogNDAzLFxuICBOb3RGb3VuZDogNDA0LFxuICBNZXRob2ROb3RBbGxvd2VkOiA0MDUsXG4gIE5vdEFjY2VwdGFibGU6IDQwNixcbiAgUHJveHlBdXRoZW50aWNhdGlvblJlcXVpcmVkOiA0MDcsXG4gIFJlcXVlc3RUaW1lb3V0OiA0MDgsXG4gIENvbmZsaWN0OiA0MDksXG4gIEdvbmU6IDQxMCxcbiAgTGVuZ3RoUmVxdWlyZWQ6IDQxMSxcbiAgUHJlY29uZGl0aW9uRmFpbGVkOiA0MTIsXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgYENvbnRlbnRUb29MYXJnZWAgaW5zdGVhZC5cbiAgICovXG4gIFBheWxvYWRUb29MYXJnZTogNDEzLFxuICBDb250ZW50VG9vTGFyZ2U6IDQxMyxcbiAgVXJpVG9vTG9uZzogNDE0LFxuICBVbnN1cHBvcnRlZE1lZGlhVHlwZTogNDE1LFxuICBSYW5nZU5vdFNhdGlzZmlhYmxlOiA0MTYsXG4gIEV4cGVjdGF0aW9uRmFpbGVkOiA0MTcsXG4gIEltQVRlYXBvdDogNDE4LFxuICBNaXNkaXJlY3RlZFJlcXVlc3Q6IDQyMSxcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBgVW5wcm9jZXNzYWJsZUNvbnRlbnRgIGluc3RlYWQuXG4gICAqL1xuICBVbnByb2Nlc3NhYmxlRW50aXR5OiA0MjIsXG4gIFVucHJvY2Vzc2FibGVDb250ZW50OiA0MjIsXG4gIExvY2tlZDogNDIzLFxuICBGYWlsZWREZXBlbmRlbmN5OiA0MjQsXG4gIFRvb0Vhcmx5OiA0MjUsXG4gIFVwZ3JhZGVSZXF1aXJlZDogNDI2LFxuICBQcmVjb25kaXRpb25SZXF1aXJlZDogNDI4LFxuICBUb29NYW55UmVxdWVzdHM6IDQyOSxcbiAgUmVxdWVzdEhlYWRlckZpZWxkc1Rvb0xhcmdlOiA0MzEsXG4gIFVuYXZhaWxhYmxlRm9yTGVnYWxSZWFzb25zOiA0NTEsXG4gIEludGVybmFsU2VydmVyRXJyb3I6IDUwMCxcbiAgTm90SW1wbGVtZW50ZWQ6IDUwMSxcbiAgQmFkR2F0ZXdheTogNTAyLFxuICBTZXJ2aWNlVW5hdmFpbGFibGU6IDUwMyxcbiAgR2F0ZXdheVRpbWVvdXQ6IDUwNCxcbiAgSHR0cFZlcnNpb25Ob3RTdXBwb3J0ZWQ6IDUwNSxcbiAgVmFyaWFudEFsc29OZWdvdGlhdGVzOiA1MDYsXG4gIEluc3VmZmljaWVudFN0b3JhZ2U6IDUwNyxcbiAgTG9vcERldGVjdGVkOiA1MDgsXG4gIE5vdEV4dGVuZGVkOiA1MTAsXG4gIE5ldHdvcmtBdXRoZW50aWNhdGlvblJlcXVpcmVkOiA1MTEsXG4gIFdlYlNlcnZlclJldHVybnNBblVua25vd25FcnJvcjogNTIwLFxuICBXZWJTZXJ2ZXJJc0Rvd246IDUyMSxcbiAgQ29ubmVjdGlvblRpbWVkT3V0OiA1MjIsXG4gIE9yaWdpbklzVW5yZWFjaGFibGU6IDUyMyxcbiAgVGltZW91dE9jY3VycmVkOiA1MjQsXG4gIFNzbEhhbmRzaGFrZUZhaWxlZDogNTI1LFxuICBJbnZhbGlkU3NsQ2VydGlmaWNhdGU6IDUyNixcbn07XG5cbk9iamVjdC5lbnRyaWVzKEh0dHBTdGF0dXNDb2RlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgaWYgKEh0dHBTdGF0dXNDb2RlW3ZhbHVlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgSHR0cFN0YXR1c0NvZGVbdmFsdWVdID0ga2V5O1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgSHR0cFN0YXR1c0NvZGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlIGEgYm91bmQgdmVyc2lvbiBvZiBhIGZ1bmN0aW9uIHdpdGggYSBzcGVjaWZpZWQgYHRoaXNgIGNvbnRleHRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBiaW5kXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgLSBUaGUgdmFsdWUgdG8gYmUgcGFzc2VkIGFzIHRoZSBgdGhpc2AgcGFyYW1ldGVyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHRoYXQgd2lsbCBjYWxsIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiB3aXRoIHRoZSBzcGVjaWZpZWQgYHRoaXNgIGNvbnRleHRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBmcm9tICcuL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzJztcblxuLyoqXG4gKiBJdCByZXBsYWNlcyBVUkwtZW5jb2RlZCBmb3JtcyBvZiBgOmAsIGAkYCwgYCxgLCBhbmQgc3BhY2VzIHdpdGhcbiAqIHRoZWlyIHBsYWluIGNvdW50ZXJwYXJ0cyAoYDpgLCBgJGAsIGAsYCwgYCtgKS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsIFRoZSB2YWx1ZSB0byBiZSBlbmNvZGVkLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbClcbiAgICAucmVwbGFjZSgvJTNBL2dpLCAnOicpXG4gICAgLnJlcGxhY2UoLyUyNC9nLCAnJCcpXG4gICAgLnJlcGxhY2UoLyUyQy9naSwgJywnKVxuICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcGFyYW0gez8ob2JqZWN0fEZ1bmN0aW9uKX0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBvcHRpb25zKSB7XG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSB1cmwgfHwgJyc7XG5cbiAgY29uc3QgX29wdGlvbnMgPSB1dGlscy5pc0Z1bmN0aW9uKG9wdGlvbnMpXG4gICAgPyB7XG4gICAgICAgIHNlcmlhbGl6ZTogb3B0aW9ucyxcbiAgICAgIH1cbiAgICA6IG9wdGlvbnM7XG5cbiAgLy8gUmVhZCBzZXJpYWxpemVyIG9wdGlvbnMgcG9sbHV0aW9uLXNhZmVseTogb3duIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgb24gYVxuICAvLyBjbGFzcy90ZW1wbGF0ZSBwcm90b3R5cGUgYXJlIGhvbm9yZWQsIGJ1dCB2YWx1ZXMgaW5qZWN0ZWQgb250byBhIHBvbGx1dGVkXG4gIC8vIE9iamVjdC5wcm90b3R5cGUgYXJlIGlnbm9yZWQuXG4gIGNvbnN0IF9lbmNvZGUgPSB1dGlscy5nZXRTYWZlUHJvcChfb3B0aW9ucywgJ2VuY29kZScpIHx8IGVuY29kZTtcbiAgY29uc3Qgc2VyaWFsaXplRm4gPSB1dGlscy5nZXRTYWZlUHJvcChfb3B0aW9ucywgJ3NlcmlhbGl6ZScpO1xuXG4gIGxldCBzZXJpYWxpemVkUGFyYW1zO1xuXG4gIGlmIChzZXJpYWxpemVGbikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBzZXJpYWxpemVGbihwYXJhbXMsIF9vcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gdXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKVxuICAgICAgPyBwYXJhbXMudG9TdHJpbmcoKVxuICAgICAgOiBuZXcgQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBfb3B0aW9ucykudG9TdHJpbmcoX2VuY29kZSk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIGNvbnN0IGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuXG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIGlmICghcmVsYXRpdmVVUkwpIHtcbiAgICByZXR1cm4gYmFzZVVSTDtcbiAgfVxuXG4gIGxldCBlbmQgPSBiYXNlVVJMLmxlbmd0aDtcblxuICB3aGlsZSAoZW5kID4gMCAmJiBiYXNlVVJMLmNoYXJDb2RlQXQoZW5kIC0gMSkgPT09IDQ3KSB7XG4gICAgZW5kLS07XG4gIH1cblxuICByZXR1cm4gYmFzZVVSTC5zbGljZSgwLCBlbmQpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJyk7XG59XG4iLCJpbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuY29uc3QgY29tcG9zZVNpZ25hbHMgPSAoc2lnbmFscywgdGltZW91dCkgPT4ge1xuICBzaWduYWxzID0gc2lnbmFscyA/IHNpZ25hbHMuZmlsdGVyKEJvb2xlYW4pIDogW107XG5cbiAgaWYgKCF0aW1lb3V0ICYmICFzaWduYWxzLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgbGV0IGFib3J0ZWQgPSBmYWxzZTtcblxuICBjb25zdCBvbmFib3J0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIGlmICghYWJvcnRlZCkge1xuICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgY29uc3QgZXJyID0gcmVhc29uIGluc3RhbmNlb2YgRXJyb3IgPyByZWFzb24gOiB0aGlzLnJlYXNvbjtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoXG4gICAgICAgIGVyciBpbnN0YW5jZW9mIEF4aW9zRXJyb3JcbiAgICAgICAgICA/IGVyclxuICAgICAgICAgIDogbmV3IENhbmNlbGVkRXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6IGVycilcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGxldCB0aW1lciA9XG4gICAgdGltZW91dCAmJlxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgb25hYm9ydChuZXcgQXhpb3NFcnJvcihgdGltZW91dCBvZiAke3RpbWVvdXR9bXMgZXhjZWVkZWRgLCBBeGlvc0Vycm9yLkVUSU1FRE9VVCkpO1xuICAgIH0sIHRpbWVvdXQpO1xuXG4gIGNvbnN0IHVuc3Vic2NyaWJlID0gKCkgPT4ge1xuICAgIGlmICghc2lnbmFscykgeyByZXR1cm47IH1cbiAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIHRpbWVyID0gbnVsbDtcbiAgICBzaWduYWxzLmZvckVhY2goKHNpZ25hbCkgPT4ge1xuICAgICAgc2lnbmFsLnVuc3Vic2NyaWJlXG4gICAgICAgID8gc2lnbmFsLnVuc3Vic2NyaWJlKG9uYWJvcnQpXG4gICAgICAgIDogc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25hYm9ydCk7XG4gICAgfSk7XG4gICAgc2lnbmFscyA9IG51bGw7XG4gIH07XG5cbiAgc2lnbmFscy5mb3JFYWNoKChzaWduYWwpID0+IHtcbiAgICBpZiAoYWJvcnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChzaWduYWwuYWJvcnRlZCkge1xuICAgICAgb25hYm9ydC5jYWxsKHNpZ25hbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25hYm9ydCwgeyBvbmNlOiB0cnVlIH0pO1xuICB9KTtcblxuICBjb25zdCB7IHNpZ25hbCB9ID0gY29udHJvbGxlcjtcblxuICBzaWduYWwudW5zdWJzY3JpYmUgPSAoKSA9PiB1dGlscy5hc2FwKHVuc3Vic2NyaWJlKTtcblxuICByZXR1cm4gc2lnbmFsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9zZVNpZ25hbHM7XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52XG4gID8gLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gICAge1xuICAgICAgd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlLCBzYW1lU2l0ZSkge1xuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGNvb2tpZSA9IFtgJHtuYW1lfT0ke2VuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSl9YF07XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goYGV4cGlyZXM9JHtuZXcgRGF0ZShleHBpcmVzKS50b1VUQ1N0cmluZygpfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKGBwYXRoPSR7cGF0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKGBkb21haW49JHtkb21haW59YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoc2FtZVNpdGUpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goYFNhbWVTaXRlPSR7c2FtZVNpdGV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlYWQobmFtZSkge1xuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykgcmV0dXJuIG51bGw7XG4gICAgICAgIC8vIE1hdGNoIG5hbWU9dmFsdWUgYnkgc3BsaXR0aW5nIG9uIHRoZSBzZW1pY29sb24gc2VwYXJhdG9yIGluc3RlYWQgb2YgYnVpbGRpbmcgYVxuICAgICAgICAvLyBSZWdFeHAgZnJvbSBgbmFtZWAg4oCUIGludGVycG9sYXRpbmcgYW4gdW5lc2NhcGVkIHN0cmluZyBpbnRvIGEgUmVnRXhwIHdvdWxkIGxldFxuICAgICAgICAvLyBtZXRhY2hhcmFjdGVycyAoZS5nLiBgLis/YCBpbiBhbiBhdHRhY2tlci1pbmZsdWVuY2VkIGNvb2tpZSBuYW1lKSBjYXVzZSBSZURvUyBvclxuICAgICAgICAvLyBtYXRjaCB0aGUgd3JvbmcgY29va2llLiBCcm93c2VycyBtYXkgc2VyaWFsaXplIGNvb2tpZSBwYWlycyBhcyBlaXRoZXIgXCI7XCIgb3JcbiAgICAgICAgLy8gXCI7IFwiLCBzbyBpZ25vcmUgb3B0aW9uYWwgd2hpdGVzcGFjZSBiZWZvcmUgZWFjaCBjb29raWUgbmFtZS5cbiAgICAgICAgY29uc3QgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjb29raWUgPSBjb29raWVzW2ldLnJlcGxhY2UoL15cXHMrLywgJycpO1xuICAgICAgICAgIGNvbnN0IGVxID0gY29va2llLmluZGV4T2YoJz0nKTtcbiAgICAgICAgICBpZiAoZXEgIT09IC0xICYmIGNvb2tpZS5zbGljZSgwLCBlcSkgPT09IG5hbWUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoY29va2llLnNsaWNlKGVxICsgMSkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICByZXR1cm4gY29va2llLnNsaWNlKGVxICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwLCAnLycpO1xuICAgICAgfSxcbiAgICB9XG4gIDogLy8gTm9uLXN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIHtcbiAgICAgIHdyaXRlKCkge30sXG4gICAgICByZWFkKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sXG4gICAgICByZW1vdmUoKSB7fSxcbiAgICB9O1xuIiwiLyoqXG4gKiBFc3RpbWF0ZSBkYXRhOiBVUkwgYnl0ZSBsZW5ndGhzICp3aXRob3V0KiBhbGxvY2F0aW5nIGxhcmdlIGJ1ZmZlcnMuXG4gKiAtIEZldGNoIHBlcmNlbnQtZGVjb2RlcyBhIGJhc2U2NCBib2R5IGJlZm9yZSBkZWNvZGluZyBpdC5cbiAqIC0gTm9kZSdzIEJ1ZmZlci5mcm9tKGJvZHksICdiYXNlNjQnKSBzaXplcyBpdHMgYmFja2luZyBhbGxvY2F0aW9uIGZyb20gdGhlXG4gKiAgIHJhdyBib2R5LCBpbmNsdWRpbmcgaWdub3JlZCBjaGFyYWN0ZXJzIGFuZCBjb250ZW50IGFmdGVyIHBhZGRpbmcuXG4gKiAtIE5vbi1iYXNlNjQgZGF0YSBpcyBwZXJjZW50LWRlY29kZWQgYW5kIHRoZW4gZW5jb2RlZCBhcyBVVEYtOC5cbiAqL1xuY29uc3QgaXNIZXhEaWdpdCA9IChjaGFyQ29kZSkgPT5cbiAgKGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KSB8fFxuICAoY2hhckNvZGUgPj0gNjUgJiYgY2hhckNvZGUgPD0gNzApIHx8XG4gIChjaGFyQ29kZSA+PSA5NyAmJiBjaGFyQ29kZSA8PSAxMDIpO1xuXG5jb25zdCBpc1BlcmNlbnRFbmNvZGVkQnl0ZSA9IChzdHIsIGksIGxlbikgPT5cbiAgaSArIDIgPCBsZW4gJiYgaXNIZXhEaWdpdChzdHIuY2hhckNvZGVBdChpICsgMSkpICYmIGlzSGV4RGlnaXQoc3RyLmNoYXJDb2RlQXQoaSArIDIpKTtcblxuY29uc3QgaGV4VmFsdWUgPSAoY2hhckNvZGUpID0+IChjaGFyQ29kZSA8PSA1NyA/IGNoYXJDb2RlIC0gNDggOiAoY2hhckNvZGUgJiAweGRmKSAtIDU1KTtcblxuY29uc3QgaXNCYXNlNjRDaGFyID0gKGNoYXJDb2RlKSA9PlxuICAoY2hhckNvZGUgPj0gNjUgJiYgY2hhckNvZGUgPD0gOTApIHx8IC8vIEEtWlxuICAoY2hhckNvZGUgPj0gOTcgJiYgY2hhckNvZGUgPD0gMTIyKSB8fCAvLyBhLXpcbiAgKGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KSB8fCAvLyAwLTlcbiAgY2hhckNvZGUgPT09IDQzIHx8IC8vICtcbiAgY2hhckNvZGUgPT09IDQ3IHx8IC8vIC9cbiAgY2hhckNvZGUgPT09IDQ1IHx8IC8vIC0gKGJhc2U2NHVybClcbiAgY2hhckNvZGUgPT09IDk1OyAvLyBfIChiYXNlNjR1cmwpXG5cbmNvbnN0IGlzQmFzZTY0V2hpdGVzcGFjZSA9IChjaGFyQ29kZSkgPT5cbiAgY2hhckNvZGUgPT09IDkgfHwgY2hhckNvZGUgPT09IDEwIHx8IGNoYXJDb2RlID09PSAxMiB8fCBjaGFyQ29kZSA9PT0gMTMgfHwgY2hhckNvZGUgPT09IDMyO1xuXG5jb25zdCBiYXNlNjRCeXRlcyA9IChzaWduaWZpY2FudCkgPT4ge1xuICBjb25zdCBncm91cHMgPSBNYXRoLmZsb29yKHNpZ25pZmljYW50IC8gNCk7XG4gIGNvbnN0IHJlbWFpbmRlciA9IHNpZ25pZmljYW50ICUgNDtcbiAgcmV0dXJuIGdyb3VwcyAqIDMgKyAocmVtYWluZGVyID09PSAyID8gMSA6IHJlbWFpbmRlciA9PT0gMyA/IDIgOiAwKTtcbn07XG5cbi8vIEJ1ZmZlci5ieXRlTGVuZ3RoKGJvZHksICdiYXNlNjQnKSB1c2VzIHRoZSByYXcgc3RyaW5nIGxlbmd0aCBhcyBhbiBhbGxvY2F0aW9uXG4vLyB1cHBlciBib3VuZCBldmVuIHdoZW4gQnVmZmVyLmZyb20gbGF0ZXIgaWdub3JlcyBjaGFyYWN0ZXJzIG9yIHN0b3BzIGF0ICc9Jy5cbmNvbnN0IGVzdGltYXRlQmFzZTY0QnVmZmVyQWxsb2NhdGlvbiA9IChib2R5KSA9PiB7XG4gIGNvbnN0IGxlbiA9IGJvZHkubGVuZ3RoO1xuICBsZXQgcGFkZGluZyA9IDA7XG5cbiAgaWYgKGxlbiA+IDAgJiYgYm9keS5jaGFyQ29kZUF0KGxlbiAtIDEpID09PSA2MSAvKiAnPScgKi8pIHtcbiAgICBwYWRkaW5nKys7XG5cbiAgICBpZiAobGVuID4gMSAmJiBib2R5LmNoYXJDb2RlQXQobGVuIC0gMikgPT09IDYxIC8qICc9JyAqLykge1xuICAgICAgcGFkZGluZysrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBNYXRoLmZsb29yKCgobGVuIC0gcGFkZGluZykgKiAzKSAvIDQpO1xufTtcblxuY29uc3QgZXN0aW1hdGVQZXJjZW50RGVjb2RlZEJhc2U2NEJ5dGVzID0gKGJvZHkpID0+IHtcbiAgY29uc3QgbGVuID0gYm9keS5sZW5ndGg7XG4gIGxldCBzaWduaWZpY2FudCA9IDA7XG4gIGxldCBwYWRkaW5nID0gMDtcbiAgbGV0IGludmFsaWQgPSBmYWxzZTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgbGV0IGNvZGUgPSBib2R5LmNoYXJDb2RlQXQoaSk7XG5cbiAgICBpZiAoY29kZSA9PT0gMzcgLyogJyUnICovICYmIGlzUGVyY2VudEVuY29kZWRCeXRlKGJvZHksIGksIGxlbikpIHtcbiAgICAgIGNvZGUgPSBoZXhWYWx1ZShib2R5LmNoYXJDb2RlQXQoaSArIDEpKSAqIDE2ICsgaGV4VmFsdWUoYm9keS5jaGFyQ29kZUF0KGkgKyAyKSk7XG4gICAgICBpICs9IDI7XG4gICAgfVxuXG4gICAgaWYgKGlzQmFzZTY0V2hpdGVzcGFjZShjb2RlKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPT09IDYxIC8qICc9JyAqLykge1xuICAgICAgcGFkZGluZysrO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKCFpc0Jhc2U2NENoYXIoY29kZSkgfHwgcGFkZGluZyA+IDApIHtcbiAgICAgIGludmFsaWQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgc2lnbmlmaWNhbnQrKztcbiAgfVxuXG4gIC8vIEZldGNoIHJlamVjdHMgbWFsZm9ybWVkIGZvcmdpdmluZy1iYXNlNjQgaW5wdXQuIFJldHVybmluZyB0aGUgcmF3LXNpemVcbiAgLy8gYWxsb2NhdGlvbiBib3VuZCBrZWVwcyB0aGF0IGludmFsaWQgaW5wdXQgZnJvbSBiZWNvbWluZyBhIHByZS1jaGVjayBieXBhc3MuXG4gIGlmIChcbiAgICBpbnZhbGlkIHx8XG4gICAgcGFkZGluZyA+IDIgfHxcbiAgICAocGFkZGluZyA+IDAgJiYgKHNpZ25pZmljYW50ICsgcGFkZGluZykgJSA0ICE9PSAwKSB8fFxuICAgIHNpZ25pZmljYW50ICUgNCA9PT0gMVxuICApIHtcbiAgICByZXR1cm4gZXN0aW1hdGVCYXNlNjRCdWZmZXJBbGxvY2F0aW9uKGJvZHkpO1xuICB9XG5cbiAgcmV0dXJuIGJhc2U2NEJ5dGVzKHNpZ25pZmljYW50KTtcbn07XG5cbmNvbnN0IGVzdGltYXRlRGF0YVVSTEJ5dGVzID0gKHVybCwgZXN0aW1hdGVCYXNlNjQpID0+IHtcbiAgaWYgKCF1cmwgfHwgdHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHJldHVybiAwO1xuICBpZiAoIXVybC5zdGFydHNXaXRoKCdkYXRhOicpKSByZXR1cm4gMDtcblxuICBjb25zdCBjb21tYSA9IHVybC5pbmRleE9mKCcsJyk7XG4gIGlmIChjb21tYSA8IDApIHJldHVybiAwO1xuXG4gIGNvbnN0IG1ldGEgPSB1cmwuc2xpY2UoNSwgY29tbWEpO1xuICBjb25zdCBib2R5ID0gdXJsLnNsaWNlKGNvbW1hICsgMSk7XG4gIGNvbnN0IGlzQmFzZTY0ID0gLztiYXNlNjQvaS50ZXN0KG1ldGEpO1xuXG4gIGlmIChpc0Jhc2U2NCkge1xuICAgIHJldHVybiBlc3RpbWF0ZUJhc2U2NChib2R5KTtcbiAgfVxuXG4gIC8vIENvbXB1dGUgVVRGLTggYnl0ZSBsZW5ndGggZGlyZWN0bHkgZnJvbSBVVEYtMTYgY29kZSB1bml0cyB3aXRob3V0IGFsbG9jYXRpbmdcbiAgLy8gYSBieXRlIGJ1ZmZlciAoVGV4dEVuY29kZXIuZW5jb2RlIHdvdWxkIGRlZmVhdCB0aGUgRG9TIGd1YXJkIG9uIGxhcmdlIGJvZGllcykuXG4gIC8vIFZhbGlkICVYWCB0cmlwbGV0cyBjb3VudCBhcyBvbmUgZGVjb2RlZCBieXRlOyB0aGlzIG1hdGNoZXMgdGhlIGJ5dGVzIHRoYXRcbiAgLy8gZGVjb2RlVVJJQ29tcG9uZW50KGJvZHkpIHdvdWxkIHByb2R1Y2UgYmVmb3JlIEJ1ZmZlciByZS1lbmNvZGVzIHRoZSBzdHJpbmcuXG4gIGxldCBieXRlcyA9IDA7XG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBib2R5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgYyA9IGJvZHkuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoYyA9PT0gMzcgLyogJyUnICovICYmIGlzUGVyY2VudEVuY29kZWRCeXRlKGJvZHksIGksIGxlbikpIHtcbiAgICAgIGJ5dGVzICs9IDE7XG4gICAgICBpICs9IDI7XG4gICAgfSBlbHNlIGlmIChjIDwgMHg4MCkge1xuICAgICAgYnl0ZXMgKz0gMTtcbiAgICB9IGVsc2UgaWYgKGMgPCAweDgwMCkge1xuICAgICAgYnl0ZXMgKz0gMjtcbiAgICB9IGVsc2UgaWYgKGMgPj0gMHhkODAwICYmIGMgPD0gMHhkYmZmICYmIGkgKyAxIDwgbGVuKSB7XG4gICAgICBjb25zdCBuZXh0ID0gYm9keS5jaGFyQ29kZUF0KGkgKyAxKTtcbiAgICAgIGlmIChuZXh0ID49IDB4ZGMwMCAmJiBuZXh0IDw9IDB4ZGZmZikge1xuICAgICAgICBieXRlcyArPSA0O1xuICAgICAgICBpKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBieXRlcyArPSAzO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBieXRlcyArPSAzO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYnl0ZXM7XG59O1xuXG4vKipcbiAqIEVzdGltYXRlIHRoZSBwZXJjZW50LWRlY29kZWQgcGF5bG9hZCBzaXplIHVzZWQgYnkgRmV0Y2ggZGF0YTogVVJMcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlc3RpbWF0ZURhdGFVUkxEZWNvZGVkQnl0ZXModXJsKSB7XG4gIC8vIEZldGNoIHJlbW92ZXMgVVJMIGZyYWdtZW50cyBiZWZvcmUgcHJvY2Vzc2luZyBhIGRhdGE6IFVSTC5cbiAgY29uc3QgZnJhZ21lbnRJbmRleCA9IHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnID8gdXJsLmluZGV4T2YoJyMnKSA6IC0xO1xuXG4gIHJldHVybiBlc3RpbWF0ZURhdGFVUkxCeXRlcyhcbiAgICBmcmFnbWVudEluZGV4ID09PSAtMSA/IHVybCA6IHVybC5zbGljZSgwLCBmcmFnbWVudEluZGV4KSxcbiAgICBlc3RpbWF0ZVBlcmNlbnREZWNvZGVkQmFzZTY0Qnl0ZXNcbiAgKTtcbn1cblxuLyoqXG4gKiBFc3RpbWF0ZSB0aGUgQnVmZmVyIGJhY2tpbmcgYWxsb2NhdGlvbiB1c2VkIGJ5IE5vZGUncyByYXcgYmFzZTY0IGRlY29kZXIuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVzdGltYXRlRGF0YVVSTEJ1ZmZlckFsbG9jYXRpb24odXJsKSB7XG4gIHJldHVybiBlc3RpbWF0ZURhdGFVUkxCeXRlcyh1cmwsIGVzdGltYXRlQmFzZTY0QnVmZmVyQWxsb2NhdGlvbik7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHsgREVGQVVMVF9GT1JNX0RBVEFfTUFYX0RFUFRIIH0gZnJvbSAnLi90b0Zvcm1EYXRhLmpzJztcblxuY29uc3QgTUFYX0RFUFRIID0gREVGQVVMVF9GT1JNX0RBVEFfTUFYX0RFUFRIO1xuXG5mdW5jdGlvbiB0aHJvd0lmRGVwdGhFeGNlZWRlZChpbmRleCkge1xuICBpZiAoaW5kZXggPiBNQVhfREVQVEgpIHtcbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICdGb3JtRGF0YSBmaWVsZCBpcyB0b28gZGVlcGx5IG5lc3RlZCAoJyArIGluZGV4ICsgJyBsZXZlbHMpLiBNYXggZGVwdGg6ICcgKyBNQVhfREVQVEgsXG4gICAgICBBeGlvc0Vycm9yLkVSUl9GT1JNX0RBVEFfREVQVEhfRVhDRUVERURcbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcgbGlrZSBgZm9vW3hdW3ldW3pdYCBhbmQgcmV0dXJucyBhbiBhcnJheSBsaWtlIGBbJ2ZvbycsICd4JywgJ3knLCAneiddXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICpcbiAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHN0cmluZ3MuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlUHJvcFBhdGgobmFtZSkge1xuICAvLyBmb29beF1beV1bel0gLT4gWydmb28nLCAneCcsICd5JywgJ3onXVxuICAvLyBmb28ueC55LnogICAgLT4gWydmb28nLCAneCcsICd5JywgJ3onXVxuICAvLyBBIHBhdGggaXMgc3BsaXQgb24gYC5gIGFuZCBvbiBgWy4uLl1gIGdyb3Vwcy4gQSBzZWdtZW50IOKAlCB3aGV0aGVyIHdyaXR0ZW5cbiAgLy8gaW4gZG90IG5vdGF0aW9uIG9yIGNhcHR1cmVkIGluc2lkZSBicmFja2V0cyDigJQgbWF5IGNvbnRhaW4gYW55IGNoYXJhY3RlclxuICAvLyBleGNlcHQgYC5gLCBgW2AgYW5kIGBdYCwgc28gYSBrZXkgbGlrZSBgdXNlci1uYW1lYCBvciBgdXNlciBuYW1lYCBpcyBrZXB0XG4gIC8vIGxpdGVyYWwgaW5zdGVhZCBvZiBiZWluZyBzcGxpdCAoIzU0MDIpLiBgLmAsIGBbYCBhbmQgYF1gIGtlZXAgdGhlaXIgZXhpc3RpbmdcbiAgLy8gbWVhbmluZywgZS5nLiBgZm9vW2Jhci5iYXpdYCAtPiBbJ2ZvbycsICdiYXInLCAnYmF6J10gYW5kIGBbXWAgaXMgYW4gYXJyYXkgcHVzaC5cbiAgLy8gRXhjbHVkaW5nIGBbYCBmcm9tIHRoZSBicmFja2V0IGdyb3VwIGFsc28gbWFrZXMgdGhlIG1hdGNoIGZhaWwgZmFzdCBhdCB0aGVcbiAgLy8gbmV4dCBgW2AsIHNvIGEgbWFsZm9ybWVkIG5hbWUgY2Fubm90IHJlc2NhbiB0byB0aGUgZW5kIG9mIHRoZSBzdHJpbmcgZnJvbVxuICAvLyBldmVyeSB1bm1hdGNoZWQgYFtgIOKAlCBwYXJzaW5nIHN0YXlzIGxpbmVhciBpbiB0aGUgbGVuZ3RoIG9mIHRoZSBuYW1lLlxuICBjb25zdCBwYXRoID0gW107XG4gIGNvbnN0IHBhdHRlcm4gPSAvW14uW1xcXV0rfFxcWyhbXi5bXFxdXSopXS9nO1xuICBsZXQgbWF0Y2g7XG5cbiAgd2hpbGUgKChtYXRjaCA9IHBhdHRlcm4uZXhlYyhuYW1lKSkgIT09IG51bGwpIHtcbiAgICB0aHJvd0lmRGVwdGhFeGNlZWRlZChwYXRoLmxlbmd0aCk7XG4gICAgcGF0aC5wdXNoKG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXSk7XG4gIH1cblxuICByZXR1cm4gcGF0aDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGFuIGFycmF5IHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjb252ZXJ0IHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJucyBBbiBvYmplY3Qgd2l0aCB0aGUgc2FtZSBrZXlzIGFuZCB2YWx1ZXMgYXMgdGhlIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheVRvT2JqZWN0KGFycikge1xuICBjb25zdCBvYmogPSB7fTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGFycik7XG4gIGxldCBpO1xuICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgbGV0IGtleTtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAga2V5ID0ga2V5c1tpXTtcbiAgICBvYmpba2V5XSA9IGFycltrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBGb3JtRGF0YSBvYmplY3QgYW5kIHJldHVybnMgYSBKYXZhU2NyaXB0IG9iamVjdFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSBUaGUgRm9ybURhdGEgb2JqZWN0IHRvIGNvbnZlcnQgdG8gSlNPTi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0PHN0cmluZywgYW55PiB8IG51bGx9IFRoZSBjb252ZXJ0ZWQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBmb3JtRGF0YVRvSlNPTihmb3JtRGF0YSkge1xuICBmdW5jdGlvbiBidWlsZFBhdGgocGF0aCwgdmFsdWUsIHRhcmdldCwgaW5kZXgpIHtcbiAgICB0aHJvd0lmRGVwdGhFeGNlZWRlZChpbmRleCk7XG5cbiAgICBsZXQgbmFtZSA9IHBhdGhbaW5kZXgrK107XG5cbiAgICBpZiAobmFtZSA9PT0gJ19fcHJvdG9fXycpIHJldHVybiB0cnVlO1xuXG4gICAgY29uc3QgaXNOdW1lcmljS2V5ID0gTnVtYmVyLmlzRmluaXRlKCtuYW1lKTtcbiAgICBjb25zdCBpc0xhc3QgPSBpbmRleCA+PSBwYXRoLmxlbmd0aDtcbiAgICBuYW1lID0gIW5hbWUgJiYgdXRpbHMuaXNBcnJheSh0YXJnZXQpID8gdGFyZ2V0Lmxlbmd0aCA6IG5hbWU7XG5cbiAgICBpZiAoaXNMYXN0KSB7XG4gICAgICBpZiAodXRpbHMuaGFzT3duUHJvcCh0YXJnZXQsIG5hbWUpKSB7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IHV0aWxzLmlzQXJyYXkodGFyZ2V0W25hbWVdKVxuICAgICAgICAgID8gdGFyZ2V0W25hbWVdLmNvbmNhdCh2YWx1ZSlcbiAgICAgICAgICA6IFt0YXJnZXRbbmFtZV0sIHZhbHVlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gIWlzTnVtZXJpY0tleTtcbiAgICB9XG5cbiAgICBpZiAoIXV0aWxzLmhhc093blByb3AodGFyZ2V0LCBuYW1lKSB8fCAhdXRpbHMuaXNPYmplY3QodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gW107XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXRbbmFtZV0sIGluZGV4KTtcblxuICAgIGlmIChyZXN1bHQgJiYgdXRpbHMuaXNBcnJheSh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBhcnJheVRvT2JqZWN0KHRhcmdldFtuYW1lXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gIH1cblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShmb3JtRGF0YSkgJiYgdXRpbHMuaXNGdW5jdGlvbihmb3JtRGF0YS5lbnRyaWVzKSkge1xuICAgIGNvbnN0IG9iaiA9IHt9O1xuXG4gICAgdXRpbHMuZm9yRWFjaEVudHJ5KGZvcm1EYXRhLCAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGJ1aWxkUGF0aChwYXJzZVByb3BQYXRoKG5hbWUpLCB2YWx1ZSwgb2JqLCAwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZm9ybURhdGFUb0pTT047XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gL14oW2Etel1bYS16XFxkK1xcLS5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zXG4gKlxuICogQHBhcmFtIHsqfSBwYXlsb2FkIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBeGlvc0Vycm9yKHBheWxvYWQpIHtcbiAgcmV0dXJuIHV0aWxzLmlzT2JqZWN0KHBheWxvYWQpICYmIHBheWxvYWQuaXNBeGlvc0Vycm9yID09PSB0cnVlO1xufVxuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52XG4gID8gKChvcmlnaW4sIGlzTVNJRSkgPT4gKHVybCkgPT4ge1xuICAgICAgdXJsID0gbmV3IFVSTCh1cmwsIHBsYXRmb3JtLm9yaWdpbik7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIG9yaWdpbi5wcm90b2NvbCA9PT0gdXJsLnByb3RvY29sICYmXG4gICAgICAgIG9yaWdpbi5ob3N0ID09PSB1cmwuaG9zdCAmJlxuICAgICAgICAoaXNNU0lFIHx8IG9yaWdpbi5wb3J0ID09PSB1cmwucG9ydClcbiAgICAgICk7XG4gICAgfSkoXG4gICAgICBuZXcgVVJMKHBsYXRmb3JtLm9yaWdpbiksXG4gICAgICBwbGF0Zm9ybS5uYXZpZ2F0b3IgJiYgLyhtc2llfHRyaWRlbnQpL2kudGVzdChwbGF0Zm9ybS5uYXZpZ2F0b3IudXNlckFnZW50KVxuICAgIClcbiAgOiAoKSA9PiB0cnVlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB1cmxQYXJzZXJDb250cm9sQ2hhcmFjdGVycyA9IC9bXFx0XFxuXFxyXS9nO1xuXG4vKipcbiAqIE1hdGNoIFdIQVRXRyBVUkwgcHJlcHJvY2Vzc2luZyBiZWZvcmUgY2hlY2tpbmcgYSBVUkwncyBwcm90b2NvbC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9ybWFsaXplVVJMRm9yUHJvdG9jb2xDaGVjayh1cmwpIHtcbiAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGxldCBzdGFydCA9IDA7XG5cbiAgd2hpbGUgKHN0YXJ0IDwgdXJsLmxlbmd0aCAmJiB1cmwuY2hhckNvZGVBdChzdGFydCkgPD0gMHgyMCkge1xuICAgIHN0YXJ0Kys7XG4gIH1cblxuICByZXR1cm4gdXJsLnNsaWNlKHN0YXJ0KS5yZXBsYWNlKHVybFBhcnNlckNvbnRyb2xDaGFyYWN0ZXJzLCAnJyk7XG59XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc3RyaWN0XG5leHBvcnQgZGVmYXVsdCBudWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vLyBSYXdBeGlvc0hlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5jb25zdCBpZ25vcmVEdXBsaWNhdGVPZiA9IHV0aWxzLnRvT2JqZWN0U2V0KFtcbiAgJ2FnZScsXG4gICdhdXRob3JpemF0aW9uJyxcbiAgJ2NvbnRlbnQtbGVuZ3RoJyxcbiAgJ2NvbnRlbnQtdHlwZScsXG4gICdldGFnJyxcbiAgJ2V4cGlyZXMnLFxuICAnZnJvbScsXG4gICdob3N0JyxcbiAgJ2lmLW1vZGlmaWVkLXNpbmNlJyxcbiAgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsXG4gICdsb2NhdGlvbicsXG4gICdtYXgtZm9yd2FyZHMnLFxuICAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJyxcbiAgJ3JldHJ5LWFmdGVyJyxcbiAgJ3VzZXItYWdlbnQnLFxuXSk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByYXdIZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5leHBvcnQgZGVmYXVsdCAocmF3SGVhZGVycykgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB7fTtcbiAgbGV0IGtleTtcbiAgbGV0IHZhbDtcbiAgbGV0IGk7XG5cbiAgcmF3SGVhZGVycyAmJlxuICAgIHJhd0hlYWRlcnMuc3BsaXQoJ1xcbicpLmZvckVhY2goZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICAgIGtleSA9IGxpbmUuc3Vic3RyaW5nKDAsIGkpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFsID0gbGluZS5zdWJzdHJpbmcoaSArIDEpLnRyaW0oKTtcblxuICAgICAgY29uc3QgaGFzS2V5ID0gdXRpbHMuaGFzT3duUHJvcChwYXJzZWQsIGtleSk7XG5cbiAgICAgIGlmICgha2V5IHx8IChoYXNLZXkgJiYgdXRpbHMuaGFzT3duUHJvcChpZ25vcmVEdXBsaWNhdGVPZiwga2V5KSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgaWYgKGhhc0tleSkge1xuICAgICAgICAgIHBhcnNlZFtrZXldLnB1c2godmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJzZWRba2V5XSA9IFt2YWxdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IGhhc0tleSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KTooPzpcXC9cXC8pPy8uZXhlYyh1cmwpO1xuICByZXR1cm4gKG1hdGNoICYmIG1hdGNoWzFdKSB8fCAnJztcbn1cbiIsImltcG9ydCBzcGVlZG9tZXRlciBmcm9tICcuL3NwZWVkb21ldGVyLmpzJztcbmltcG9ydCB0aHJvdHRsZSBmcm9tICcuL3Rocm90dGxlLmpzJztcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbmV4cG9ydCBjb25zdCBwcm9ncmVzc0V2ZW50UmVkdWNlciA9IChsaXN0ZW5lciwgaXNEb3dubG9hZFN0cmVhbSwgZnJlcSA9IDMpID0+IHtcbiAgbGV0IGJ5dGVzTm90aWZpZWQgPSAwO1xuICBjb25zdCBfc3BlZWRvbWV0ZXIgPSBzcGVlZG9tZXRlcig1MCwgMjUwKTtcblxuICByZXR1cm4gdGhyb3R0bGUoKGUpID0+IHtcbiAgICBpZiAoIWUgfHwgIXV0aWxzLmlzTnVtYmVyKGUubG9hZGVkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByYXdMb2FkZWQgPSBlLmxvYWRlZDtcbiAgICBjb25zdCB0b3RhbCA9IGUubGVuZ3RoQ29tcHV0YWJsZSA/IGUudG90YWwgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgbG9hZGVkID0gTWF0aC5tYXgoMCwgdG90YWwgIT0gbnVsbCA/IE1hdGgubWluKHJhd0xvYWRlZCwgdG90YWwpIDogcmF3TG9hZGVkKTtcbiAgICBjb25zdCBwcm9ncmVzc0J5dGVzID0gTWF0aC5tYXgoMCwgbG9hZGVkIC0gYnl0ZXNOb3RpZmllZCk7XG4gICAgY29uc3QgcmF0ZSA9IF9zcGVlZG9tZXRlcihwcm9ncmVzc0J5dGVzKTtcblxuICAgIGJ5dGVzTm90aWZpZWQgPSBNYXRoLm1heChieXRlc05vdGlmaWVkLCBsb2FkZWQpO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGxvYWRlZCxcbiAgICAgIHRvdGFsLFxuICAgICAgcHJvZ3Jlc3M6IHRvdGFsID8gbG9hZGVkIC8gdG90YWwgOiB1bmRlZmluZWQsXG4gICAgICBieXRlczogcHJvZ3Jlc3NCeXRlcyxcbiAgICAgIHJhdGU6IHJhdGUgPyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXN0aW1hdGVkOiByYXRlICYmIHRvdGFsID8gKHRvdGFsIC0gbG9hZGVkKSAvIHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBldmVudDogZSxcbiAgICAgIGxlbmd0aENvbXB1dGFibGU6IHRvdGFsICE9IG51bGwsXG4gICAgICBbaXNEb3dubG9hZFN0cmVhbSA/ICdkb3dubG9hZCcgOiAndXBsb2FkJ106IHRydWUsXG4gICAgfTtcblxuICAgIGxpc3RlbmVyKGRhdGEpO1xuICB9LCBmcmVxKTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yID0gKHRvdGFsLCB0aHJvdHRsZWQpID0+IHtcbiAgY29uc3QgbGVuZ3RoQ29tcHV0YWJsZSA9IHRvdGFsICE9IG51bGw7XG5cbiAgcmV0dXJuIFtcbiAgICAobG9hZGVkKSA9PlxuICAgICAgdGhyb3R0bGVkWzBdKHtcbiAgICAgICAgbGVuZ3RoQ29tcHV0YWJsZSxcbiAgICAgICAgdG90YWwsXG4gICAgICAgIGxvYWRlZCxcbiAgICAgIH0pLFxuICAgIHRocm90dGxlZFsxXSxcbiAgXTtcbn07XG5cbmV4cG9ydCBjb25zdCBhc3luY0RlY29yYXRvciA9XG4gIChmbiwgc2NoZWR1bGVyID0gdXRpbHMuYXNhcCkgPT5cbiAgKC4uLmFyZ3MpID0+XG4gICAgc2NoZWR1bGVyKCgpID0+IGZuKC4uLmFyZ3MpKTtcbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBpc1VSTFNhbWVPcmlnaW4gZnJvbSAnLi9pc1VSTFNhbWVPcmlnaW4uanMnO1xuaW1wb3J0IGNvb2tpZXMgZnJvbSAnLi9jb29raWVzLmpzJztcbmltcG9ydCBidWlsZEZ1bGxQYXRoIGZyb20gJy4uL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyc7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSAnLi4vY29yZS9tZXJnZUNvbmZpZy5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCBzZXRGb3JtRGF0YUhlYWRlcnMgZnJvbSAnLi4vY29yZS9zZXRGb3JtRGF0YUhlYWRlcnMuanMnO1xuaW1wb3J0IGJ1aWxkVVJMIGZyb20gJy4vYnVpbGRVUkwuanMnO1xuXG4vKipcbiAqIEVuY29kZSBhIFVURi04IHN0cmluZyB0byBhIExhdGluLTEgYnl0ZSBzdHJpbmcgZm9yIHVzZSB3aXRoIGJ0b2EoKS5cbiAqIFRoaXMgaXMgYSBtb2Rlcm4gcmVwbGFjZW1lbnQgZm9yIHRoZSBkZXByZWNhdGVkIHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKSBwYXR0ZXJuLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byBlbmNvZGVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBVVEYtOCBieXRlcyBhcyBhIExhdGluLTEgc3RyaW5nXG4gKi9cbmNvbnN0IGVuY29kZVVURjggPSAoc3RyKSA9PlxuICBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC8lKFswLTlBLUZdezJ9KS9naSwgKF8sIGhleCkgPT5cbiAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGhleCwgMTYpKVxuICApO1xuXG5mdW5jdGlvbiByZXNvbHZlQ29uZmlnKGNvbmZpZykge1xuICBjb25zdCBuZXdDb25maWcgPSBtZXJnZUNvbmZpZyh7fSwgY29uZmlnKTtcblxuICAvLyBSZWFkIG9ubHkgb3duIHByb3BlcnRpZXMgdG8gcHJldmVudCBwcm90b3R5cGUgcG9sbHV0aW9uIGdhZGdldHNcbiAgLy8gKGUuZy4gT2JqZWN0LnByb3RvdHlwZS5iYXNlVVJMID0gJ2h0dHBzOi8vZXZpbC5jb20nKS5cbiAgY29uc3Qgb3duID0gKGtleSkgPT4gKHV0aWxzLmhhc093blByb3AobmV3Q29uZmlnLCBrZXkpID8gbmV3Q29uZmlnW2tleV0gOiB1bmRlZmluZWQpO1xuXG4gIGNvbnN0IGRhdGEgPSBvd24oJ2RhdGEnKTtcbiAgbGV0IHdpdGhYU1JGVG9rZW4gPSBvd24oJ3dpdGhYU1JGVG9rZW4nKTtcbiAgY29uc3QgeHNyZkhlYWRlck5hbWUgPSBvd24oJ3hzcmZIZWFkZXJOYW1lJyk7XG4gIGNvbnN0IHhzcmZDb29raWVOYW1lID0gb3duKCd4c3JmQ29va2llTmFtZScpO1xuICBsZXQgaGVhZGVycyA9IG93bignaGVhZGVycycpO1xuICBjb25zdCBhdXRoID0gb3duKCdhdXRoJyk7XG4gIGNvbnN0IGJhc2VVUkwgPSBvd24oJ2Jhc2VVUkwnKTtcbiAgY29uc3QgYWxsb3dBYnNvbHV0ZVVybHMgPSBvd24oJ2FsbG93QWJzb2x1dGVVcmxzJyk7XG4gIGNvbnN0IHVybCA9IG93bigndXJsJyk7XG5cbiAgbmV3Q29uZmlnLmhlYWRlcnMgPSBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKFxuICAgIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgdXJsLCBhbGxvd0Fic29sdXRlVXJscywgbmV3Q29uZmlnKSxcbiAgICBvd24oJ3BhcmFtcycpLFxuICAgIG93bigncGFyYW1zU2VyaWFsaXplcicpXG4gICk7XG5cbiAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICBpZiAoYXV0aCkge1xuICAgIGNvbnN0IHVzZXJuYW1lID0gdXRpbHMuZ2V0U2FmZVByb3AoYXV0aCwgJ3VzZXJuYW1lJykgfHwgJyc7XG4gICAgY29uc3QgcGFzc3dvcmQgPSB1dGlscy5nZXRTYWZlUHJvcChhdXRoLCAncGFzc3dvcmQnKSB8fCAnJztcblxuICAgIHRyeSB7XG4gICAgICBoZWFkZXJzLnNldChcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nLFxuICAgICAgICAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyAocGFzc3dvcmQgPyBlbmNvZGVVVEY4KHBhc3N3b3JkKSA6ICcnKSlcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGUsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUsIGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkpIHtcbiAgICBjb25zdCBnZXRIZWFkZXJzID0gdXRpbHMuZ2V0U2FmZVByb3AoZGF0YSwgJ2dldEhlYWRlcnMnKTtcblxuICAgIGlmIChcbiAgICAgIHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiB8fFxuICAgICAgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52IHx8XG4gICAgICB1dGlscy5pc1JlYWN0TmF0aXZlKGRhdGEpXG4gICAgKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKHVuZGVmaW5lZCk7IC8vIGJyb3dzZXIvd2ViIHdvcmtlci9STiBoYW5kbGVzIGl0XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0Z1bmN0aW9uKGdldEhlYWRlcnMpKSB7XG4gICAgICAvLyBOb2RlLmpzIEZvcm1EYXRhIChsaWtlIGZvcm0tZGF0YSBwYWNrYWdlKVxuICAgICAgc2V0Rm9ybURhdGFIZWFkZXJzKGhlYWRlcnMsIGdldEhlYWRlcnMuY2FsbChkYXRhKSwgb3duKCdmb3JtRGF0YUhlYWRlclBvbGljeScpKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG5cbiAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudikge1xuICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKHdpdGhYU1JGVG9rZW4pKSB7XG4gICAgICB3aXRoWFNSRlRva2VuID0gd2l0aFhTUkZUb2tlbihuZXdDb25maWcpO1xuICAgIH1cblxuICAgIC8vIFN0cmljdCBib29sZWFuIGNoZWNrIOKAlCBwcmV2ZW50cyBwcm90by1wb2xsdXRpb24gZ2FkZ2V0cyAoZS5nLiBPYmplY3QucHJvdG90eXBlLndpdGhYU1JGVG9rZW4gPSAxKVxuICAgIC8vIGFuZCBtaXNjb25maWd1cmF0aW9ucyAoZS5nLiBcImZhbHNlXCIpIGZyb20gc2hvcnQtY2lyY3VpdGluZyB0aGUgc2FtZS1vcmlnaW4gY2hlY2sgYW5kIGxlYWtpbmdcbiAgICAvLyB0aGUgWFNSRiB0b2tlbiBjcm9zcy1vcmlnaW4uXG4gICAgY29uc3Qgc2hvdWxkU2VuZFhTUkYgPVxuICAgICAgd2l0aFhTUkZUb2tlbiA9PT0gdHJ1ZSB8fCAod2l0aFhTUkZUb2tlbiA9PSBudWxsICYmIGlzVVJMU2FtZU9yaWdpbihuZXdDb25maWcudXJsKSk7XG5cbiAgICBpZiAoc2hvdWxkU2VuZFhTUkYpIHtcbiAgICAgIGNvbnN0IHhzcmZWYWx1ZSA9IHhzcmZIZWFkZXJOYW1lICYmIHhzcmZDb29raWVOYW1lICYmIGNvb2tpZXMucmVhZCh4c3JmQ29va2llTmFtZSk7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgaGVhZGVycy5zZXQoeHNyZkhlYWRlck5hbWUsIHhzcmZWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0NvbmZpZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVzb2x2ZUNvbmZpZztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuZnVuY3Rpb24gdHJpbVNQb3JIVEFCKHN0cikge1xuICBsZXQgc3RhcnQgPSAwO1xuICBsZXQgZW5kID0gc3RyLmxlbmd0aDtcblxuICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcbiAgICBjb25zdCBjb2RlID0gc3RyLmNoYXJDb2RlQXQoc3RhcnQpO1xuXG4gICAgaWYgKGNvZGUgIT09IDB4MDkgJiYgY29kZSAhPT0gMHgyMCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3RhcnQgKz0gMTtcbiAgfVxuXG4gIHdoaWxlIChlbmQgPiBzdGFydCkge1xuICAgIGNvbnN0IGNvZGUgPSBzdHIuY2hhckNvZGVBdChlbmQgLSAxKTtcblxuICAgIGlmIChjb2RlICE9PSAweDA5ICYmIGNvZGUgIT09IDB4MjApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGVuZCAtPSAxO1xuICB9XG5cbiAgcmV0dXJuIHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gc3RyLmxlbmd0aCA/IHN0ciA6IHN0ci5zbGljZShzdGFydCwgZW5kKTtcbn1cblxuLy8gVGhlIGNvbnRyb2wtY29kZSByYW5nZXMgYXJlIGludGVudGlvbmFsOiBoZWFkZXIgc2FuaXRpemF0aW9uIHN0cmlwcyBDMC9ERUwgYnl0ZXMuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udHJvbC1yZWdleFxuY29uc3QgSU5WQUxJRF9VTklDT0RFX0hFQURFUl9WQUxVRV9DSEFSUyA9IG5ldyBSZWdFeHAoJ1tcXFxcdTAwMDAtXFxcXHUwMDA4XFxcXHUwMDBhLVxcXFx1MDAxZlxcXFx1MDA3Zl0rJywgJ2cnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4XG5jb25zdCBJTlZBTElEX0JZVEVfU1RSSU5HX0hFQURFUl9WQUxVRV9DSEFSUyA9IG5ldyBSZWdFeHAoJ1teXFxcXHUwMDA5XFxcXHUwMDIwLVxcXFx1MDA3ZVxcXFx1MDA4MC1cXFxcdTAwZmZdKycsICdnJyk7XG5cbmZ1bmN0aW9uIHNhbml0aXplVmFsdWUodmFsdWUsIGludmFsaWRDaGFycykge1xuICBpZiAodXRpbHMuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUubWFwKChpdGVtKSA9PiBzYW5pdGl6ZVZhbHVlKGl0ZW0sIGludmFsaWRDaGFycykpO1xuICB9XG5cbiAgcmV0dXJuIHRyaW1TUG9ySFRBQihTdHJpbmcodmFsdWUpLnJlcGxhY2UoaW52YWxpZENoYXJzLCAnJykpO1xufVxuXG5leHBvcnQgY29uc3Qgc2FuaXRpemVIZWFkZXJWYWx1ZSA9ICh2YWx1ZSkgPT5cbiAgc2FuaXRpemVWYWx1ZSh2YWx1ZSwgSU5WQUxJRF9VTklDT0RFX0hFQURFUl9WQUxVRV9DSEFSUyk7XG5cbmV4cG9ydCBjb25zdCBzYW5pdGl6ZUJ5dGVTdHJpbmdIZWFkZXJWYWx1ZSA9ICh2YWx1ZSkgPT5cbiAgc2FuaXRpemVWYWx1ZSh2YWx1ZSwgSU5WQUxJRF9CWVRFX1NUUklOR19IRUFERVJfVkFMVUVfQ0hBUlMpO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9CeXRlU3RyaW5nSGVhZGVyT2JqZWN0KGhlYWRlcnMpIHtcbiAgY29uc3QgYnl0ZVN0cmluZ0hlYWRlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy50b0pTT04oKSwgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICBieXRlU3RyaW5nSGVhZGVyc1toZWFkZXJdID0gc2FuaXRpemVCeXRlU3RyaW5nSGVhZGVyVmFsdWUodmFsdWUpO1xuICB9KTtcblxuICByZXR1cm4gYnl0ZVN0cmluZ0hlYWRlcnM7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZCgoYnl0ZXNDb3VudCAqIDEwMDApIC8gcGFzc2VkKSA6IHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3BlZWRvbWV0ZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICBjb25zdCBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59XG4iLCIvKipcbiAqIFRocm90dGxlIGRlY29yYXRvclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSBmcmVxXG4gKiBAcmV0dXJuIHtBcnJheTxGdW5jdGlvbj59XG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZuLCBmcmVxKSB7XG4gIGxldCB0aW1lc3RhbXAgPSAwO1xuICBsZXQgdGhyZXNob2xkID0gMTAwMCAvIGZyZXE7XG4gIGxldCBsYXN0QXJncztcbiAgbGV0IHRpbWVyO1xuXG4gIGNvbnN0IGludm9rZSA9IChhcmdzLCBub3cgPSBEYXRlLm5vdygpKSA9PiB7XG4gICAgdGltZXN0YW1wID0gbm93O1xuICAgIGxhc3RBcmdzID0gbnVsbDtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgfVxuICAgIGZuKC4uLmFyZ3MpO1xuICB9O1xuXG4gIGNvbnN0IHRocm90dGxlZCA9ICguLi5hcmdzKSA9PiB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBwYXNzZWQgPSBub3cgLSB0aW1lc3RhbXA7XG4gICAgaWYgKHBhc3NlZCA+PSB0aHJlc2hvbGQpIHtcbiAgICAgIGludm9rZShhcmdzLCBub3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0QXJncyA9IGFyZ3M7XG4gICAgICBpZiAoIXRpbWVyKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICAgIGludm9rZShsYXN0QXJncyk7XG4gICAgICAgIH0sIHRocmVzaG9sZCAtIHBhc3NlZCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGZsdXNoID0gKCkgPT4gbGFzdEFyZ3MgJiYgaW52b2tlKGxhc3RBcmdzKTtcbiAgY29uc3QgZmx1c2hXaXRoID0gKC4uLmFyZ3MpID0+IGludm9rZShhcmdzKTtcblxuICByZXR1cm4gW3Rocm90dGxlZCwgZmx1c2gsIGZsdXNoV2l0aF07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRocm90dGxlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbi8vIHRlbXBvcmFyeSBob3RmaXggdG8gYXZvaWQgY2lyY3VsYXIgcmVmZXJlbmNlcyB1bnRpbCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBpcyByZWZhY3RvcmVkXG5pbXBvcnQgUGxhdGZvcm1Gb3JtRGF0YSBmcm9tICcuLi9wbGF0Zm9ybS9ub2RlL2NsYXNzZXMvRm9ybURhdGEuanMnO1xuaW1wb3J0IFBsYXRmb3JtQnVmZmVyIGZyb20gJy4uL3BsYXRmb3JtL25vZGUvY2xhc3Nlcy9CdWZmZXIuanMnO1xuXG4vLyBEZWZhdWx0IG5lc3RpbmcgbGltaXQgc2hhcmVkIHdpdGggdGhlIGludmVyc2UgdHJhbnNmb3JtIChmb3JtRGF0YVRvSlNPTikgc29cbi8vIHRoZSBGb3JtRGF0YSA8LT4gSlNPTiByb3VuZC10cmlwIHN0YXlzIHN5bW1ldHJpYy5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0ZPUk1fREFUQV9NQVhfREVQVEggPSAxMDA7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgZ2l2ZW4gdGhpbmcgaXMgYSBhcnJheSBvciBqcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRoaW5nIC0gVGhlIG9iamVjdCBvciBhcnJheSB0byBiZSB2aXNpdGVkLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1Zpc2l0YWJsZSh0aGluZykge1xuICByZXR1cm4gdXRpbHMuaXNQbGFpbk9iamVjdCh0aGluZykgfHwgdXRpbHMuaXNBcnJheSh0aGluZyk7XG59XG5cbi8qKlxuICogSXQgcmVtb3ZlcyB0aGUgYnJhY2tldHMgZnJvbSB0aGUgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIHBhcmFtZXRlci5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUga2V5IHdpdGhvdXQgdGhlIGJyYWNrZXRzLlxuICovXG5mdW5jdGlvbiByZW1vdmVCcmFja2V0cyhrZXkpIHtcbiAgcmV0dXJuIHV0aWxzLmVuZHNXaXRoKGtleSwgJ1tdJykgPyBrZXkuc2xpY2UoMCwgLTIpIDoga2V5O1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcGF0aCwgYSBrZXksIGFuZCBhIGJvb2xlYW4sIGFuZCByZXR1cm5zIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgY3VycmVudCBvYmplY3QgYmVpbmcgaXRlcmF0ZWQgb3Zlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkb3RzIC0gSWYgdHJ1ZSwgdGhlIGtleSB3aWxsIGJlIHJlbmRlcmVkIHdpdGggZG90cyBpbnN0ZWFkIG9mIGJyYWNrZXRzLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqL1xuZnVuY3Rpb24gcmVuZGVyS2V5KHBhdGgsIGtleSwgZG90cykge1xuICBpZiAoIXBhdGgpIHJldHVybiBrZXk7XG4gIHJldHVybiBwYXRoXG4gICAgLmNvbmNhdChrZXkpXG4gICAgLm1hcChmdW5jdGlvbiBlYWNoKHRva2VuLCBpKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIHRva2VuID0gcmVtb3ZlQnJhY2tldHModG9rZW4pO1xuICAgICAgcmV0dXJuICFkb3RzICYmIGkgPyAnWycgKyB0b2tlbiArICddJyA6IHRva2VuO1xuICAgIH0pXG4gICAgLmpvaW4oZG90cyA/ICcuJyA6ICcnKTtcbn1cblxuLyoqXG4gKiBJZiB0aGUgYXJyYXkgaXMgYW4gYXJyYXkgYW5kIG5vbmUgb2YgaXRzIGVsZW1lbnRzIGFyZSB2aXNpdGFibGUsIHRoZW4gaXQncyBhIGZsYXQgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY2hlY2tcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNGbGF0QXJyYXkoYXJyKSB7XG4gIHJldHVybiB1dGlscy5pc0FycmF5KGFycikgJiYgIWFyci5zb21lKGlzVmlzaXRhYmxlKTtcbn1cblxuY29uc3QgcHJlZGljYXRlcyA9IHV0aWxzLnRvRmxhdE9iamVjdCh1dGlscywge30sIG51bGwsIGZ1bmN0aW9uIGZpbHRlcihwcm9wKSB7XG4gIHJldHVybiAvXmlzW0EtWl0vLnRlc3QocHJvcCk7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgZGF0YSBvYmplY3QgdG8gRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gez9PYmplY3R9IFtmb3JtRGF0YV1cbiAqIEBwYXJhbSB7P09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy52aXNpdG9yXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tZXRhVG9rZW5zID0gdHJ1ZV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZG90cyA9IGZhbHNlXVxuICogQHBhcmFtIHs/Qm9vbGVhbn0gW29wdGlvbnMuaW5kZXhlcyA9IGZhbHNlXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiovXG5cbi8qKlxuICogSXQgY29udmVydHMgYW4gb2JqZWN0IGludG8gYSBGb3JtRGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gY29udmVydCB0byBmb3JtIGRhdGEuXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgLSBUaGUgRm9ybURhdGEgb2JqZWN0IHRvIGFwcGVuZCB0by5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIHRvRm9ybURhdGEob2JqLCBmb3JtRGF0YSwgb3B0aW9ucykge1xuICBpZiAoIXV0aWxzLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0YXJnZXQgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBmb3JtRGF0YSA9IGZvcm1EYXRhIHx8IG5ldyAoUGxhdGZvcm1Gb3JtRGF0YSB8fCBGb3JtRGF0YSkoKTtcblxuICBjb25zdCBvcHRpb24gPSAobmFtZSwgZmFsbGJhY2spID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IHV0aWxzLmdldFNhZmVQcm9wKG9wdGlvbnMsIG5hbWUpO1xuICAgIHJldHVybiB1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkgPyBmYWxsYmFjayA6IHZhbHVlO1xuICB9O1xuXG4gIGNvbnN0IG1ldGFUb2tlbnMgPSBvcHRpb24oJ21ldGFUb2tlbnMnLCB0cnVlKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gIGNvbnN0IHZpc2l0b3IgPSBvcHRpb24oJ3Zpc2l0b3InKSB8fCBkZWZhdWx0VmlzaXRvcjtcbiAgY29uc3QgZG90cyA9IG9wdGlvbignZG90cycsIGZhbHNlKTtcbiAgY29uc3QgaW5kZXhlcyA9IG9wdGlvbignaW5kZXhlcycsIGZhbHNlKTtcbiAgY29uc3QgX0Jsb2IgPSBvcHRpb24oJ0Jsb2InKSB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIEJsb2IpO1xuICBjb25zdCBtYXhEZXB0aCA9IG9wdGlvbignbWF4RGVwdGgnLCBERUZBVUxUX0ZPUk1fREFUQV9NQVhfREVQVEgpO1xuICBjb25zdCB1c2VCbG9iID0gX0Jsb2IgJiYgdXRpbHMuaXNTcGVjQ29tcGxpYW50Rm9ybShmb3JtRGF0YSk7XG4gIGNvbnN0IHN0YWNrID0gW107XG5cbiAgaWYgKCF1dGlscy5pc0Z1bmN0aW9uKHZpc2l0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmlzaXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuICcnO1xuXG4gICAgaWYgKHV0aWxzLmlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZUJsb2IgJiYgdXRpbHMuaXNCbG9iKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ0Jsb2IgaXMgbm90IHN1cHBvcnRlZC4gVXNlIGEgQnVmZmVyIGluc3RlYWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIodmFsdWUpIHx8IHV0aWxzLmlzVHlwZWRBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGlmICh1c2VCbG9iICYmIHR5cGVvZiBfQmxvYiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IF9CbG9iKFt2YWx1ZV0pO1xuICAgICAgfVxuICAgICAgaWYgKFBsYXRmb3JtQnVmZmVyICYmIFBsYXRmb3JtQnVmZmVyLmlzQnVmZmVyQXZhaWxhYmxlKCkpIHtcbiAgICAgICAgcmV0dXJuIFBsYXRmb3JtQnVmZmVyLmZyb20odmFsdWUpO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICdCbG9iIGlzIG5vdCBzdXBwb3J0ZWQuIFVzZSBhIEJ1ZmZlciBpbnN0ZWFkLicsXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX05PVF9TVVBQT1JUXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRocm93SWZNYXhEZXB0aEV4Y2VlZGVkKGRlcHRoKSB7XG4gICAgaWYgKGRlcHRoID4gbWF4RGVwdGgpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAnT2JqZWN0IGlzIHRvbyBkZWVwbHkgbmVzdGVkICgnICsgZGVwdGggKyAnIGxldmVscykuIE1heCBkZXB0aDogJyArIG1heERlcHRoLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9GT1JNX0RBVEFfREVQVEhfRVhDRUVERURcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RyaW5naWZ5V2l0aERlcHRoTGltaXQodmFsdWUsIGRlcHRoKSB7XG4gICAgaWYgKG1heERlcHRoID09PSBJbmZpbml0eSkge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBjb25zdCBhbmNlc3RvcnMgPSBbXTtcblxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSwgZnVuY3Rpb24gbGltaXREZXB0aChfa2V5LCBjdXJyZW50VmFsdWUpIHtcbiAgICAgIGlmICghdXRpbHMuaXNPYmplY3QoY3VycmVudFZhbHVlKSkge1xuICAgICAgICByZXR1cm4gY3VycmVudFZhbHVlO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAoYW5jZXN0b3JzLmxlbmd0aCAmJiBhbmNlc3RvcnNbYW5jZXN0b3JzLmxlbmd0aCAtIDFdICE9PSB0aGlzKSB7XG4gICAgICAgIGFuY2VzdG9ycy5wb3AoKTtcbiAgICAgIH1cblxuICAgICAgYW5jZXN0b3JzLnB1c2goY3VycmVudFZhbHVlKTtcbiAgICAgIHRocm93SWZNYXhEZXB0aEV4Y2VlZGVkKGRlcHRoICsgYW5jZXN0b3JzLmxlbmd0aCAtIDEpO1xuXG4gICAgICByZXR1cm4gY3VycmVudFZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmlzaXRvci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleVxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZ3xOdW1iZXI+fSBwYXRoXG4gICAqIEB0aGlzIHtGb3JtRGF0YX1cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybiB0cnVlIHRvIHZpc2l0IHRoZSBlYWNoIHByb3Agb2YgdGhlIHZhbHVlIHJlY3Vyc2l2ZWx5XG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0VmlzaXRvcih2YWx1ZSwga2V5LCBwYXRoKSB7XG4gICAgbGV0IGFyciA9IHZhbHVlO1xuXG4gICAgaWYgKHV0aWxzLmlzUmVhY3ROYXRpdmUoZm9ybURhdGEpICYmIHV0aWxzLmlzUmVhY3ROYXRpdmVCbG9iKHZhbHVlKSkge1xuICAgICAgZm9ybURhdGEuYXBwZW5kKHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpLCBjb252ZXJ0VmFsdWUodmFsdWUpKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgJiYgIXBhdGggJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHV0aWxzLmVuZHNXaXRoKGtleSwgJ3t9JykpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IG1ldGFUb2tlbnMgPyBrZXkgOiBrZXkuc2xpY2UoMCwgLTIpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgdmFsdWUgPSBzdHJpbmdpZnlXaXRoRGVwdGhMaW1pdCh2YWx1ZSwgMSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAodXRpbHMuaXNBcnJheSh2YWx1ZSkgJiYgaXNGbGF0QXJyYXkodmFsdWUpKSB8fFxuICAgICAgICAoKHV0aWxzLmlzRmlsZUxpc3QodmFsdWUpIHx8IHV0aWxzLmVuZHNXaXRoKGtleSwgJ1tdJykpICYmIChhcnIgPSB1dGlscy50b0FycmF5KHZhbHVlKSkpXG4gICAgICApIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IHJlbW92ZUJyYWNrZXRzKGtleSk7XG5cbiAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24gZWFjaChlbCwgaW5kZXgpIHtcbiAgICAgICAgICAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiZcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgICAgICAgICAgIGluZGV4ZXMgPT09IHRydWVcbiAgICAgICAgICAgICAgICA/IHJlbmRlcktleShba2V5XSwgaW5kZXgsIGRvdHMpXG4gICAgICAgICAgICAgICAgOiBpbmRleGVzID09PSBudWxsXG4gICAgICAgICAgICAgICAgICA/IGtleVxuICAgICAgICAgICAgICAgICAgOiBrZXkgKyAnW10nLFxuICAgICAgICAgICAgICBjb252ZXJ0VmFsdWUoZWwpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1Zpc2l0YWJsZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvcm1EYXRhLmFwcGVuZChyZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSwgY29udmVydFZhbHVlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBleHBvc2VkSGVscGVycyA9IE9iamVjdC5hc3NpZ24ocHJlZGljYXRlcywge1xuICAgIGRlZmF1bHRWaXNpdG9yLFxuICAgIGNvbnZlcnRWYWx1ZSxcbiAgICBpc1Zpc2l0YWJsZSxcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYnVpbGQodmFsdWUsIHBhdGgsIGRlcHRoID0gMCkge1xuICAgIGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybjtcblxuICAgIHRocm93SWZNYXhEZXB0aEV4Y2VlZGVkKGRlcHRoKTtcblxuICAgIGlmIChzdGFjay5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluICcgKyBwYXRoLmpvaW4oJy4nKSk7XG4gICAgfVxuXG4gICAgc3RhY2sucHVzaCh2YWx1ZSk7XG5cbiAgICB1dGlscy5mb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiBlYWNoKGVsLCBrZXkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9XG4gICAgICAgICEodXRpbHMuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJlxuICAgICAgICB2aXNpdG9yLmNhbGwoZm9ybURhdGEsIGVsLCB1dGlscy5pc1N0cmluZyhrZXkpID8ga2V5LnRyaW0oKSA6IGtleSwgcGF0aCwgZXhwb3NlZEhlbHBlcnMpO1xuXG4gICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgIGJ1aWxkKGVsLCBwYXRoID8gcGF0aC5jb25jYXQoa2V5KSA6IFtrZXldLCBkZXB0aCArIDEpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3RhY2sucG9wKCk7XG4gIH1cblxuICBpZiAoIXV0aWxzLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdkYXRhIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICBidWlsZChvYmopO1xuXG4gIHJldHVybiBmb3JtRGF0YTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9Gb3JtRGF0YTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRvRm9ybURhdGEoZGF0YSwgbmV3IHBsYXRmb3JtLmNsYXNzZXMuVVJMU2VhcmNoUGFyYW1zKCksIHtcbiAgICB2aXNpdG9yOiBmdW5jdGlvbiAodmFsdWUsIGtleSwgcGF0aCwgaGVscGVycykge1xuICAgICAgaWYgKHBsYXRmb3JtLmlzTm9kZSAmJiB1dGlscy5pc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoa2V5LCB2YWx1ZS50b1N0cmluZygnYmFzZTY0JykpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWxwZXJzLmRlZmF1bHRWaXNpdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICAuLi5vcHRpb25zLFxuICB9KTtcbn1cbiIsImV4cG9ydCBjb25zdCBzdHJlYW1DaHVuayA9IGZ1bmN0aW9uKiAoY2h1bmssIGNodW5rU2l6ZSkge1xuICBsZXQgbGVuID0gY2h1bmsuYnl0ZUxlbmd0aDtcblxuICBpZiAoIWNodW5rU2l6ZSB8fCBsZW4gPCBjaHVua1NpemUpIHtcbiAgICB5aWVsZCBjaHVuaztcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgcG9zID0gMDtcbiAgbGV0IGVuZDtcblxuICB3aGlsZSAocG9zIDwgbGVuKSB7XG4gICAgZW5kID0gcG9zICsgY2h1bmtTaXplO1xuICAgIHlpZWxkIGNodW5rLnNsaWNlKHBvcywgZW5kKTtcbiAgICBwb3MgPSBlbmQ7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCByZWFkQnl0ZXMgPSBhc3luYyBmdW5jdGlvbiogKGl0ZXJhYmxlLCBjaHVua1NpemUpIHtcbiAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiByZWFkU3RyZWFtKGl0ZXJhYmxlKSkge1xuICAgIHlpZWxkKiBzdHJlYW1DaHVuayhjaHVuaywgY2h1bmtTaXplKTtcbiAgfVxufTtcblxuY29uc3QgcmVhZFN0cmVhbSA9IGFzeW5jIGZ1bmN0aW9uKiAoc3RyZWFtKSB7XG4gIGlmIChzdHJlYW1bU3ltYm9sLmFzeW5jSXRlcmF0b3JdKSB7XG4gICAgeWllbGQqIHN0cmVhbTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZWFkZXIgPSBzdHJlYW0uZ2V0UmVhZGVyKCk7XG4gIHRyeSB7XG4gICAgZm9yICg7Oykge1xuICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgIGlmIChkb25lKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgeWllbGQgdmFsdWU7XG4gICAgfVxuICB9IGZpbmFsbHkge1xuICAgIGF3YWl0IHJlYWRlci5jYW5jZWwoKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHRyYWNrU3RyZWFtID0gKHN0cmVhbSwgY2h1bmtTaXplLCBvblByb2dyZXNzLCBvbkZpbmlzaCkgPT4ge1xuICBjb25zdCBpdGVyYXRvciA9IHJlYWRCeXRlcyhzdHJlYW0sIGNodW5rU2l6ZSk7XG5cbiAgbGV0IGJ5dGVzID0gMDtcbiAgbGV0IGRvbmU7XG4gIGxldCBfb25GaW5pc2ggPSAoZSkgPT4ge1xuICAgIGlmICghZG9uZSkge1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgICBvbkZpbmlzaCAmJiBvbkZpbmlzaChlKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbShcbiAgICB7XG4gICAgICBhc3luYyBwdWxsKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCBpdGVyYXRvci5uZXh0KCk7XG5cbiAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgX29uRmluaXNoKCk7XG4gICAgICAgICAgICBjb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IGxlbiA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgaWYgKG9uUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIGxldCBsb2FkZWRCeXRlcyA9IChieXRlcyArPSBsZW4pO1xuICAgICAgICAgICAgb25Qcm9ncmVzcyhsb2FkZWRCeXRlcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShuZXcgVWludDhBcnJheSh2YWx1ZSkpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBfb25GaW5pc2goZXJyKTtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjYW5jZWwocmVhc29uKSB7XG4gICAgICAgIF9vbkZpbmlzaChyZWFzb24pO1xuICAgICAgICByZXR1cm4gaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgaGlnaFdhdGVyTWFyazogMixcbiAgICB9XG4gICk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnLi4vZW52L2RhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbmNvbnN0IGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKlxuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG52YWxpZGF0b3JzLnRyYW5zaXRpb25hbCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25hbCh2YWxpZGF0b3IsIHZlcnNpb24sIG1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShvcHQsIGRlc2MpIHtcbiAgICByZXR1cm4gKFxuICAgICAgJ1tBeGlvcyB2JyArXG4gICAgICBWRVJTSU9OICtcbiAgICAgIFwiXSBUcmFuc2l0aW9uYWwgb3B0aW9uICdcIiArXG4gICAgICBvcHQgK1xuICAgICAgXCInXCIgK1xuICAgICAgZGVzYyArXG4gICAgICAobWVzc2FnZSA/ICcuICcgKyBtZXNzYWdlIDogJycpXG4gICAgKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiAodmFsdWUsIG9wdCwgb3B0cykgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG52YWxpZGF0b3JzLnNwZWxsaW5nID0gZnVuY3Rpb24gc3BlbGxpbmcoY29ycmVjdFNwZWxsaW5nKSB7XG4gIHJldHVybiAodmFsdWUsIG9wdCkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS53YXJuKGAke29wdH0gaXMgbGlrZWx5IGEgbWlzc3BlbGxpbmcgb2YgJHtjb3JyZWN0U3BlbGxpbmd9YCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59O1xuXG4vKipcbiAqIEFzc2VydCBvYmplY3QncyBwcm9wZXJ0aWVzIHR5cGVcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtvYmplY3R9IHNjaGVtYVxuICogQHBhcmFtIHtib29sZWFuP30gYWxsb3dVbmtub3duXG4gKlxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRPcHRpb25zKG9wdGlvbnMsIHNjaGVtYSwgYWxsb3dVbmtub3duKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcgfHwgb3B0aW9ucyA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0JywgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGNvbnN0IG9wdCA9IGtleXNbaV07XG4gICAgLy8gVXNlIGhhc093blByb3BlcnR5IHNvIGEgcG9sbHV0ZWQgT2JqZWN0LnByb3RvdHlwZS48b3B0PiBjYW5ub3Qgc3VwcGx5XG4gICAgLy8gYSBub24tZnVuY3Rpb24gdmFsaWRhdG9yIGFuZCBjYXVzZSBhIFR5cGVFcnJvci5cbiAgICBjb25zdCB2YWxpZGF0b3IgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc2NoZW1hLCBvcHQpID8gc2NoZW1hW29wdF0gOiB1bmRlZmluZWQ7XG4gICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zW29wdF07XG4gICAgICBjb25zdCByZXN1bHQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRpb25zKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgJ29wdGlvbiAnICsgb3B0ICsgJyBtdXN0IGJlICcgKyByZXN1bHQsXG4gICAgICAgICAgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhbGxvd1Vua25vd24gIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdVbmtub3duIG9wdGlvbiAnICsgb3B0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhc3NlcnRPcHRpb25zLFxuICB2YWxpZGF0b3JzLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnID8gQmxvYiA6IG51bGw7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgPyBGb3JtRGF0YSA6IG51bGw7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzJztcbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnID8gVVJMU2VhcmNoUGFyYW1zIDogQXhpb3NVUkxTZWFyY2hQYXJhbXM7XG4iLCJpbXBvcnQgVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4vY2xhc3Nlcy9VUkxTZWFyY2hQYXJhbXMuanMnO1xuaW1wb3J0IEZvcm1EYXRhIGZyb20gJy4vY2xhc3Nlcy9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgQmxvYiBmcm9tICcuL2NsYXNzZXMvQmxvYi5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNCcm93c2VyOiB0cnVlLFxuICBjbGFzc2VzOiB7XG4gICAgVVJMU2VhcmNoUGFyYW1zLFxuICAgIEZvcm1EYXRhLFxuICAgIEJsb2IsXG4gIH0sXG4gIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2ZpbGUnLCAnYmxvYicsICd1cmwnLCAnZGF0YSddLFxufTtcbiIsImNvbnN0IGhhc0Jyb3dzZXJFbnYgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuXG5jb25zdCBfbmF2aWdhdG9yID0gKHR5cGVvZiBuYXZpZ2F0b3IgPT09ICdvYmplY3QnICYmIG5hdmlnYXRvcikgfHwgdW5kZWZpbmVkO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaGFzU3RhbmRhcmRCcm93c2VyRW52ID1cbiAgaGFzQnJvd3NlckVudiAmJlxuICAoIV9uYXZpZ2F0b3IgfHwgWydSZWFjdE5hdGl2ZScsICdOYXRpdmVTY3JpcHQnLCAnTlMnXS5pbmRleE9mKF9uYXZpZ2F0b3IucHJvZHVjdCkgPCAwKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgd2ViV29ya2VyIGVudmlyb25tZW50XG4gKlxuICogQWx0aG91Z2ggdGhlIGBpc1N0YW5kYXJkQnJvd3NlckVudmAgbWV0aG9kIGluZGljYXRlcyB0aGF0XG4gKiBgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXJgLCB0aGUgV2ViV29ya2VyIHdpbGwgc3RpbGwgYmVcbiAqIGZpbHRlcmVkIG91dCBkdWUgdG8gaXRzIGp1ZGdtZW50IHN0YW5kYXJkXG4gKiBgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ2AuXG4gKiBUaGlzIGxlYWRzIHRvIGEgcHJvYmxlbSB3aGVuIGF4aW9zIHBvc3QgYEZvcm1EYXRhYCBpbiB3ZWJXb3JrZXJcbiAqL1xuY29uc3QgaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52ID0gKCgpID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlICYmXG4gICAgdHlwZW9mIHNlbGYuaW1wb3J0U2NyaXB0cyA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufSkoKTtcblxuY29uc3Qgb3JpZ2luID0gKGhhc0Jyb3dzZXJFbnYgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYpIHx8ICdodHRwOi8vbG9jYWxob3N0JztcblxuZXhwb3J0IHtcbiAgaGFzQnJvd3NlckVudixcbiAgaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIF9uYXZpZ2F0b3IgYXMgbmF2aWdhdG9yLFxuICBvcmlnaW4sXG59O1xuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4vbm9kZS9pbmRleC5qcyc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL2NvbW1vbi91dGlscy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4udXRpbHMsXG4gIC4uLnBsYXRmb3JtLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGJpbmQgZnJvbSAnLi9oZWxwZXJzL2JpbmQuanMnO1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5jb25zdCB7IHRvU3RyaW5nIH0gPSBPYmplY3QucHJvdG90eXBlO1xuY29uc3QgeyBnZXRQcm90b3R5cGVPZiB9ID0gT2JqZWN0O1xuY29uc3QgeyBpdGVyYXRvciwgdG9TdHJpbmdUYWcgfSA9IFN5bWJvbDtcblxuLyogQ3JlYXRpbmcgYSBmdW5jdGlvbiB0aGF0IHdpbGwgY2hlY2sgaWYgYW4gb2JqZWN0IGhhcyBhIHByb3BlcnR5LiAqL1xuY29uc3QgaGFzT3duUHJvcGVydHkgPSAoXG4gICh7IGhhc093blByb3BlcnR5IH0pID0+XG4gIChvYmosIHByb3ApID0+XG4gICAgaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApXG4pKE9iamVjdC5wcm90b3R5cGUpO1xuXG5jb25zdCBpc1Vuc2FmZU9iamVjdEtleSA9IChwcm9wKSA9PlxuICB0eXBlb2YgcHJvcCA9PT0gJ3N0cmluZycgJiZcbiAgKHByb3AgPT09ICdfX3Byb3RvX18nIHx8IHByb3AgPT09ICdjb25zdHJ1Y3RvcicgfHwgcHJvcCA9PT0gJ3Byb3RvdHlwZScpO1xuXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIGFuIGluaGVyaXRlZCBvYmplY3QgbXVzdCBiZSB0cmVhdGVkIGFzIGEgc2hhcmVkLXByb3RvdHlwZVxuICogYm91bmRhcnkuIENyb3NzLXJlYWxtIE9iamVjdC5wcm90b3R5cGUgb2JqZWN0cyBjYW5ub3QgYmUgZGlzdGluZ3Vpc2hlZFxuICogcmVsaWFibHkgZnJvbSBhcHBsaWNhdGlvbi1jcmVhdGVkIG51bGwtcHJvdG90eXBlIG9iamVjdHMgYmVjYXVzZSB0aGVpclxuICogcHJvcGVydGllcyBhcmUgbXV0YWJsZSwgc28gYWxsIGluaGVyaXRlZCB0ZXJtaW5hbCBwcm90b3R5cGVzIGFyZSBleGNsdWRlZFxuICogYXMgYSBmYWlsLWNsb3NlZCBib3VuZGFyeS4gQSBudWxsLXByb3RvdHlwZSBzb3VyY2Ugc3RpbGwga2VlcHMgaXRzIG93blxuICogcHJvcGVydGllcywgYXMgcHJvZHVjZWQgYnkgbWVyZ2VDb25maWcgYW5kIG90aGVyIHNhZmUgbWF0ZXJpYWxpemF0aW9uIHBhdGhzLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqIFRoZSBvYmplY3QgdG8gaW5zcGVjdFxuICogQHBhcmFtIHsqfSBwcm90b3R5cGUgVGhlIG9iamVjdCdzIHByb3RvdHlwZVxuICogQHBhcmFtIHtib29sZWFufSBzb3VyY2UgV2hldGhlciBvYmogaXMgdGhlIG9yaWdpbmFsIHRyYXZlcnNhbCBzb3VyY2VcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSB3aGVuIG9iaiBpcyBhIHNhZmUgcHJvdG90eXBlIHRyYXZlcnNhbCBib3VuZGFyeVxuICovXG5jb25zdCBpc1Byb3RvdHlwZUJvdW5kYXJ5ID0gKG9iaiwgcHJvdG90eXBlLCBzb3VyY2UpID0+XG4gIG9iaiA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCAoIXNvdXJjZSAmJiBwcm90b3R5cGUgPT09IG51bGwpO1xuXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIGFuIG9iamVjdCBjYW4gcmV0YWluIGl0cyBpZGVudGl0eSB0aHJvdWdoIGNvZGUgcGF0aHMgdGhhdFxuICogYWRkLCByZXBsYWNlLCBhbmQgcmVtb3ZlIGNvbmZpZyBwcm9wZXJ0aWVzIHdpdGhvdXQgYnlwYXNzaW5nIHVuc2FmZS1rZXlcbiAqIGZpbHRlcmluZy4gSW1tdXRhYmxlIG9iamVjdHMsIHVuc2FmZS1rZXktYmVhcmluZyBvYmplY3RzLCBhbmQgb2JqZWN0cyB3aXRoXG4gKiBhY2Nlc3NvciBvciByZXN0cmljdGVkIGRhdGEgcHJvcGVydGllcyBtdXN0IGJlIG1hdGVyaWFsaXplZCBpbnN0ZWFkLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqIFRoZSBvYmplY3QgdG8gaW5zcGVjdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIHdoZW4gZXZlcnkgb3duIHByb3BlcnR5IGlzIHNhZmUgYW5kIGZ1bGx5IG11dGFibGVcbiAqL1xuY29uc3QgaXNTYWZlQW5kRnVsbHlNdXRhYmxlID0gKG9iaikgPT4ge1xuICBpZiAoIU9iamVjdC5pc0V4dGVuc2libGUob2JqKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHByb3BzLnB1c2goLi4uT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopKTtcbiAgfVxuXG4gIHJldHVybiBwcm9wcy5ldmVyeSgocHJvcCkgPT4ge1xuICAgIGlmIChpc1Vuc2FmZU9iamVjdEtleShwcm9wKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgcHJvcCk7XG5cbiAgICByZXR1cm4gISFkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlICYmIGRlc2NyaXB0b3Iud3JpdGFibGUgPT09IHRydWU7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBXYWxrIHRoZSBwcm90b3R5cGUgY2hhaW4gKGV4Y2x1ZGluZyB0aGUgc291cmNlIHJlYWxtJ3MgT2JqZWN0LnByb3RvdHlwZSlcbiAqIGxvb2tpbmcgZm9yIGFuIG93biBgcHJvcGAuIFRoaXMgZGlzdGluZ3Vpc2hlcyBnZW51aW5lIG93bi9pbmhlcml0ZWQgbWVtYmVyc1xuICog4oCUIGluY2x1ZGluZyBjbGFzcyBhY2Nlc3NvcnMgYW5kIHRlbXBsYXRlIHByb3RvdHlwZXMg4oCUIGZyb20gbWVtYmVycyBpbmplY3RlZFxuICogdmlhIE9iamVjdC5wcm90b3R5cGUgcG9sbHV0aW9uIChlLmcuIGBPYmplY3QucHJvdG90eXBlLnVzZXJuYW1lID0gJy4uLidgKSxcbiAqIHdoaWNoIGxpdmUgb24gT2JqZWN0LnByb3RvdHlwZSBpdHNlbGYgYW5kIGFyZSB0aGVyZWZvcmUgbmV2ZXIgbWF0Y2hlZC5cbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB3aG9zZSBjaGFpbiB0byBpbnNwZWN0XG4gKiBAcGFyYW0ge3N0cmluZ3xzeW1ib2x9IHByb3AgVGhlIHByb3BlcnR5IGtleSB0byBsb29rIGZvclxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIHdoZW4gYHByb3BgIGlzIG93bmVkIGJlbG93IE9iamVjdC5wcm90b3R5cGVcbiAqL1xuY29uc3QgaGFzT3duSW5Qcm90b3R5cGVDaGFpbiA9ICh0aGluZywgcHJvcCkgPT4ge1xuICBsZXQgb2JqID0gdGhpbmc7XG4gIGNvbnN0IHNlZW4gPSBbXTtcblxuICB3aGlsZSAob2JqICE9IG51bGwpIHtcbiAgICBpZiAoc2Vlbi5pbmRleE9mKG9iaikgIT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHNlZW4ucHVzaChvYmopO1xuXG4gICAgY29uc3QgcHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2Yob2JqKTtcblxuICAgIGlmIChpc1Byb3RvdHlwZUJvdW5kYXJ5KG9iaiwgcHJvdG90eXBlLCBvYmogPT09IHRoaW5nKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgb2JqID0gcHJvdG90eXBlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogUmVhZCBgb2JqW3Byb3BdYCBvbmx5IHdoZW4gaXQgaXMgc2FmZSBmcm9tIE9iamVjdC5wcm90b3R5cGUgcG9sbHV0aW9uLiBPd25cbiAqIHByb3BlcnRpZXMgYW5kIG1lbWJlcnMgaW5oZXJpdGVkIGZyb20gYSBub24tT2JqZWN0LnByb3RvdHlwZSBzb3VyY2UgKGEgY2xhc3NcbiAqIGluc3RhbmNlIG9yIHRlbXBsYXRlIG9iamVjdCkgYXJlIGhvbm9yZWQ7IGEgdmFsdWUgcmVhY2hhYmxlIG9ubHkgdGhyb3VnaCBhXG4gKiBwb2xsdXRlZCBPYmplY3QucHJvdG90eXBlIGlzIGlnbm9yZWQgYW5kIGB1bmRlZmluZWRgIGlzIHJldHVybmVkLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqIFRoZSBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ3xzeW1ib2x9IHByb3AgVGhlIHByb3BlcnR5IGtleSB0byByZWFkXG4gKlxuICogQHJldHVybnMgeyp9IFRoZSByZXNvbHZlZCB2YWx1ZSwgb3IgdW5kZWZpbmVkIHdoZW4gdW5zYWZlL2Fic2VudFxuICovXG5jb25zdCBnZXRTYWZlUHJvcCA9IChvYmosIHByb3ApID0+XG4gIG9iaiAhPSBudWxsICYmIGhhc093bkluUHJvdG90eXBlQ2hhaW4ob2JqLCBwcm9wKSA/IG9ialtwcm9wXSA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBGbGF0dGVuIGFuIG9iamVjdCBhbmQgaXRzIGFwcGxpY2F0aW9uLWRlZmluZWQgcHJvdG90eXBlIGNoYWluIGludG8gYVxuICogbnVsbC1wcm90b3R5cGUgb2JqZWN0LiBNZW1iZXJzIGluaGVyaXRlZCBvbmx5IGZyb20gdGhlIHNvdXJjZSByZWFsbSdzXG4gKiBPYmplY3QucHJvdG90eXBlIGFyZSBkZWxpYmVyYXRlbHkgZXhjbHVkZWQsIHdoaWxlIGNsYXNzL3RlbXBsYXRlIG1lbWJlcnNcbiAqIGJlbG93IHRoYXQgYm91bmRhcnkgYXJlIHByZXNlcnZlZC5cbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byBmbGF0dGVuXG4gKlxuICogQHJldHVybnMgeyp9IEEgbnVsbC1wcm90b3R5cGUgY29weSwgb3IgdGhlIG9yaWdpbmFsIHZhbHVlIHdoZW4gaXQgaXMgYWxyZWFkeVxuICogc3RydWN0dXJhbGx5IHNhZmUgb3IgaXMgbm90IGFuIG9iamVjdFxuICovXG5jb25zdCB0b1NhZmVGbGF0T2JqZWN0ID0gKHRoaW5nKSA9PiB7XG4gIGlmICh0aGluZyA9PSBudWxsIHx8ICh0eXBlb2YgdGhpbmcgIT09ICdvYmplY3QnICYmIHR5cGVvZiB0aGluZyAhPT0gJ2Z1bmN0aW9uJykpIHtcbiAgICByZXR1cm4gdGhpbmc7XG4gIH1cblxuICBjb25zdCBzb3VyY2VQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZih0aGluZyk7XG5cbiAgaWYgKHNvdXJjZVByb3RvdHlwZSA9PT0gbnVsbCAmJiBpc1NhZmVBbmRGdWxseU11dGFibGUodGhpbmcpKSB7XG4gICAgcmV0dXJuIHRoaW5nO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3QgbWVyZ2VkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3Qgc2VlbiA9IFtdO1xuICBsZXQgY3VycmVudCA9IHRoaW5nO1xuXG4gIHdoaWxlIChjdXJyZW50ICE9IG51bGwpIHtcbiAgICBpZiAoc2Vlbi5pbmRleE9mKGN1cnJlbnQpICE9PSAtMSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc2Vlbi5wdXNoKGN1cnJlbnQpO1xuXG4gICAgY29uc3QgcHJvdG90eXBlID0gY3VycmVudCA9PT0gdGhpbmcgPyBzb3VyY2VQcm90b3R5cGUgOiBnZXRQcm90b3R5cGVPZihjdXJyZW50KTtcblxuICAgIGlmIChpc1Byb3RvdHlwZUJvdW5kYXJ5KGN1cnJlbnQsIHByb3RvdHlwZSwgY3VycmVudCA9PT0gdGhpbmcpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpO1xuXG4gICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgIHByb3BzLnB1c2goLi4uT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhjdXJyZW50KSk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BzKSB7XG4gICAgICBpZiAoaXNVbnNhZmVPYmplY3RLZXkocHJvcCkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaGFzT3duUHJvcGVydHkobWVyZ2VkLCBwcm9wKSkge1xuICAgICAgICByZXN1bHRbcHJvcF0gPSB0aGluZ1twcm9wXTtcbiAgICAgICAgbWVyZ2VkW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjdXJyZW50ID0gcHJvdG90eXBlO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmNvbnN0IGtpbmRPZiA9ICgoY2FjaGUpID0+ICh0aGluZykgPT4ge1xuICBjb25zdCBzdHIgPSB0b1N0cmluZy5jYWxsKHRoaW5nKTtcbiAgcmV0dXJuIGNhY2hlW3N0cl0gfHwgKGNhY2hlW3N0cl0gPSBzdHIuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkpO1xufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbmNvbnN0IGtpbmRPZlRlc3QgPSAodHlwZSkgPT4ge1xuICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKHRoaW5nKSA9PiBraW5kT2YodGhpbmcpID09PSB0eXBlO1xufTtcblxuY29uc3QgdHlwZU9mVGVzdCA9ICh0eXBlKSA9PiAodGhpbmcpID0+IHR5cGVvZiB0aGluZyA9PT0gdHlwZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIG5vbi1udWxsIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IHsgaXNBcnJheSB9ID0gQXJyYXk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVbmRlZmluZWQgPSB0eXBlT2ZUZXN0KCd1bmRlZmluZWQnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIChcbiAgICB2YWwgIT09IG51bGwgJiZcbiAgICAhaXNVbmRlZmluZWQodmFsKSAmJlxuICAgIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJlxuICAgICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpICYmXG4gICAgaXNGdW5jdGlvbih2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIpICYmXG4gICAgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbClcbiAgKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0FycmF5QnVmZmVyID0ga2luZE9mVGVzdCgnQXJyYXlCdWZmZXInKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICBsZXQgcmVzdWx0O1xuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBBcnJheUJ1ZmZlci5pc1ZpZXcpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSB2YWwgJiYgdmFsLmJ1ZmZlciAmJiBpc0FycmF5QnVmZmVyKHZhbC5idWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJpbmcgPSB0eXBlT2ZUZXN0KCdzdHJpbmcnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Z1bmN0aW9uID0gdHlwZU9mVGVzdCgnZnVuY3Rpb24nKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc051bWJlciA9IHR5cGVPZlRlc3QoJ251bWJlcicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc09iamVjdCA9ICh0aGluZykgPT4gdGhpbmcgIT09IG51bGwgJiYgdHlwZW9mIHRoaW5nID09PSAnb2JqZWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJvb2xlYW5cbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJvb2xlYW4sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jvb2xlYW4gPSAodGhpbmcpID0+IHRoaW5nID09PSB0cnVlIHx8IHRoaW5nID09PSBmYWxzZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1BsYWluT2JqZWN0ID0gKHZhbCkgPT4ge1xuICBpZiAoIWlzT2JqZWN0KHZhbCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBwcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gKFxuICAgIChwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlIHx8IGdldFByb3RvdHlwZU9mKHByb3RvdHlwZSkgPT09IG51bGwpICYmXG4gICAgLy8gVHJlYXQgc2FmZSBvd24vaW5oZXJpdGVkIFN5bWJvbC50b1N0cmluZ1RhZyBvciBTeW1ib2wuaXRlcmF0b3IgbWVtYmVycyBhc1xuICAgIC8vIGV2aWRlbmNlIHRoZSB2YWx1ZSBpcyB0YWdnZWQvaXRlcmFibGUsIHdoaWxlIGlnbm9yaW5nIG1lbWJlcnMgcmVhY2hhYmxlXG4gICAgLy8gb25seSB0aHJvdWdoIHNoYXJlZCBvciB0ZXJtaW5hbCBwcm90b3R5cGUgYm91bmRhcmllcy5cbiAgICAhaGFzT3duSW5Qcm90b3R5cGVDaGFpbih2YWwsIHRvU3RyaW5nVGFnKSAmJlxuICAgICFoYXNPd25JblByb3RvdHlwZUNoYWluKHZhbCwgaXRlcmF0b3IpXG4gICk7XG59O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIGVtcHR5IG9iamVjdCAoc2FmZWx5IGhhbmRsZXMgQnVmZmVycylcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIGVtcHR5IG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRW1wdHlPYmplY3QgPSAodmFsKSA9PiB7XG4gIC8vIEVhcmx5IHJldHVybiBmb3Igbm9uLW9iamVjdHMgb3IgQnVmZmVycyB0byBwcmV2ZW50IFJhbmdlRXJyb3JcbiAgaWYgKCFpc09iamVjdCh2YWwpIHx8IGlzQnVmZmVyKHZhbCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWwpLmxlbmd0aCA9PT0gMCAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsKSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIEZhbGxiYWNrIGZvciBhbnkgb3RoZXIgb2JqZWN0cyB0aGF0IG1pZ2h0IGNhdXNlIFJhbmdlRXJyb3Igd2l0aCBPYmplY3Qua2V5cygpXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNEYXRlID0ga2luZE9mVGVzdCgnRGF0ZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlID0ga2luZE9mVGVzdCgnRmlsZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgUmVhY3QgTmF0aXZlIEJsb2JcbiAqIFJlYWN0IE5hdGl2ZSBcImJsb2JcIjogYW4gb2JqZWN0IHdpdGggYSBgdXJpYCBhdHRyaWJ1dGUuIE9wdGlvbmFsbHksIGl0IGNhblxuICogYWxzbyBoYXZlIGEgYG5hbWVgIGFuZCBgdHlwZWAgYXR0cmlidXRlIHRvIHNwZWNpZnkgZmlsZW5hbWUgYW5kIGNvbnRlbnQgdHlwZVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9ibG9iLzI2Njg0Y2YzYWRmNDA5NGViNmM0MDVkMzQ1YTc1YmY4YzdjMGJmODgvTGlicmFyaWVzL05ldHdvcmsvRm9ybURhdGEuanMjTDY4LUw3MVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFJlYWN0IE5hdGl2ZSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNSZWFjdE5hdGl2ZUJsb2IgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHR5cGVvZiB2YWx1ZS51cmkgIT09ICd1bmRlZmluZWQnKTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGVudmlyb25tZW50IGlzIFJlYWN0IE5hdGl2ZVxuICogUmVhY3ROYXRpdmUgYEZvcm1EYXRhYCBoYXMgYSBub24tc3RhbmRhcmQgYGdldFBhcnRzKClgIG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7Kn0gZm9ybURhdGEgVGhlIGZvcm1EYXRhIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBlbnZpcm9ubWVudCBpcyBSZWFjdCBOYXRpdmUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1JlYWN0TmF0aXZlID0gKGZvcm1EYXRhKSA9PiBmb3JtRGF0YSAmJiB0eXBlb2YgZm9ybURhdGEuZ2V0UGFydHMgIT09ICd1bmRlZmluZWQnO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCbG9iID0ga2luZE9mVGVzdCgnQmxvYicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZUxpc3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZUxpc3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGVMaXN0ID0ga2luZE9mVGVzdCgnRmlsZUxpc3QnKTtcbmNvbnN0IGlzU2V0ID0ga2luZE9mVGVzdCgnU2V0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJlYW0gPSAodmFsKSA9PiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBnZXRHbG9iYWwoKSB7XG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBnbG9iYWxUaGlzO1xuICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gc2VsZjtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gd2luZG93O1xuICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBnbG9iYWw7XG4gIHJldHVybiB7fTtcbn1cblxuY29uc3QgRyA9IGdldEdsb2JhbCgpO1xuY29uc3QgRm9ybURhdGFDdG9yID0gdHlwZW9mIEcuRm9ybURhdGEgIT09ICd1bmRlZmluZWQnID8gRy5Gb3JtRGF0YSA6IHVuZGVmaW5lZDtcblxuY29uc3QgaXNGb3JtRGF0YSA9ICh0aGluZykgPT4ge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gZmFsc2U7XG4gIGlmIChGb3JtRGF0YUN0b3IgJiYgdGhpbmcgaW5zdGFuY2VvZiBGb3JtRGF0YUN0b3IpIHJldHVybiB0cnVlO1xuICAvLyBSZWplY3QgcGxhaW4gb2JqZWN0cyBpbmhlcml0aW5nIGRpcmVjdGx5IGZyb20gT2JqZWN0LnByb3RvdHlwZSBzbyBwcm90b3R5cGUtcG9sbHV0aW9uIGdhZGdldHMgY2FuJ3Qgc3Bvb2YgRm9ybURhdGEuXG4gIGNvbnN0IHByb3RvID0gZ2V0UHJvdG90eXBlT2YodGhpbmcpO1xuICBpZiAoIXByb3RvIHx8IHByb3RvID09PSBPYmplY3QucHJvdG90eXBlKSByZXR1cm4gZmFsc2U7XG4gIGlmICghaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IGtpbmQgPSBraW5kT2YodGhpbmcpO1xuICByZXR1cm4gKFxuICAgIGtpbmQgPT09ICdmb3JtZGF0YScgfHxcbiAgICAvLyBkZXRlY3QgZm9ybS1kYXRhIGluc3RhbmNlXG4gICAgKGtpbmQgPT09ICdvYmplY3QnICYmIGlzRnVuY3Rpb24odGhpbmcudG9TdHJpbmcpICYmIHRoaW5nLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IEZvcm1EYXRhXScpXG4gICk7XG59O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVUkxTZWFyY2hQYXJhbXMgPSBraW5kT2ZUZXN0KCdVUkxTZWFyY2hQYXJhbXMnKTtcblxuY29uc3QgW2lzUmVhZGFibGVTdHJlYW0sIGlzUmVxdWVzdCwgaXNSZXNwb25zZSwgaXNIZWFkZXJzXSA9IFtcbiAgJ1JlYWRhYmxlU3RyZWFtJyxcbiAgJ1JlcXVlc3QnLFxuICAnUmVzcG9uc2UnLFxuICAnSGVhZGVycycsXG5dLm1hcChraW5kT2ZUZXN0KTtcblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuY29uc3QgdHJpbSA9IChzdHIpID0+IHtcbiAgcmV0dXJuIHN0ci50cmltID8gc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xufTtcbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5PHVua25vd24+fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmFsbE93bktleXMgPSBmYWxzZV1cbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbiwgeyBhbGxPd25LZXlzID0gZmFsc2UgfSA9IHt9KSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGk7XG4gIGxldCBsO1xuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yIChpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBCdWZmZXIgY2hlY2tcbiAgICBpZiAoaXNCdWZmZXIob2JqKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGNvbnN0IGtleXMgPSBhbGxPd25LZXlzID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSA6IE9iamVjdC5rZXlzKG9iaik7XG4gICAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGtleTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBGaW5kcyBhIGtleSBpbiBhbiBvYmplY3QsIGNhc2UtaW5zZW5zaXRpdmUsIHJldHVybmluZyB0aGUgYWN0dWFsIGtleSBuYW1lLlxuICogUmV0dXJucyBudWxsIGlmIHRoZSBvYmplY3QgaXMgYSBCdWZmZXIgb3IgaWYgbm8gbWF0Y2ggaXMgZm91bmQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIFRoZSBvYmplY3QgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgdG8gZmluZCAoY2FzZS1pbnNlbnNpdGl2ZSkuXG4gKiBAcmV0dXJucyB7P3N0cmluZ30gVGhlIGFjdHVhbCBrZXkgbmFtZSBpZiBmb3VuZCwgb3RoZXJ3aXNlIG51bGwuXG4gKi9cbmZ1bmN0aW9uIGZpbmRLZXkob2JqLCBrZXkpIHtcbiAgaWYgKGlzQnVmZmVyKG9iaikpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgbGV0IF9rZXk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgX2tleSA9IGtleXNbaV07XG4gICAgaWYgKGtleSA9PT0gX2tleS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICByZXR1cm4gX2tleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmNvbnN0IF9nbG9iYWwgPSAoKCkgPT4ge1xuICAvKmVzbGludCBuby11bmRlZjowKi9cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIHJldHVybiB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWw7XG59KSgpO1xuXG5jb25zdCBpc0NvbnRleHREZWZpbmVkID0gKGNvbnRleHQpID0+ICFpc1VuZGVmaW5lZChjb250ZXh0KSAmJiBjb250ZXh0ICE9PSBfZ2xvYmFsO1xuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogY29uc3QgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSguLi5vYmpzKSB7XG4gIGNvbnN0IHsgY2FzZWxlc3MsIHNraXBVbmRlZmluZWQgfSA9IChpc0NvbnRleHREZWZpbmVkKHRoaXMpICYmIHRoaXMpIHx8IHt9O1xuICBjb25zdCByZXN1bHQgPSB7fTtcbiAgY29uc3QgYXNzaWduVmFsdWUgPSAodmFsLCBrZXkpID0+IHtcbiAgICAvLyBTa2lwIGRhbmdlcm91cyBwcm9wZXJ0eSBuYW1lcyB0byBwcmV2ZW50IHByb3RvdHlwZSBwb2xsdXRpb25cbiAgICBpZiAoa2V5ID09PSAnX19wcm90b19fJyB8fCBrZXkgPT09ICdjb25zdHJ1Y3RvcicgfHwga2V5ID09PSAncHJvdG90eXBlJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGZpbmRLZXkgbG93ZXJjYXNlcyB0aGUga2V5LCBzbyBjYXNlbGVzcyBsb29rdXAgb25seSBhcHBsaWVzIHRvIHN0cmluZ3Mg4oCUXG4gICAgLy8gc3ltYm9sIGtleXMgYXJlIGlkZW50aXR5LW1hdGNoZWQuXG4gICAgY29uc3QgdGFyZ2V0S2V5ID0gKGNhc2VsZXNzICYmIHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnICYmIGZpbmRLZXkocmVzdWx0LCBrZXkpKSB8fCBrZXk7XG4gICAgLy8gUmVhZCB2aWEgb3duLXByb3Agb25seSDigJQgYSBiYXJlIGByZXN1bHRbdGFyZ2V0S2V5XWAgd2Fsa3MgdGhlIHByb3RvdHlwZVxuICAgIC8vIGNoYWluLCBzbyBhIHBvbGx1dGVkIE9iamVjdC5wcm90b3R5cGUgdmFsdWUgY291bGQgc3VyZmFjZSBoZXJlIGFuZCBnZXRcbiAgICAvLyBjb3BpZWQgaW50byB0aGUgbWVyZ2VkIHJlc3VsdC5cbiAgICBjb25zdCBleGlzdGluZyA9IGhhc093blByb3BlcnR5KHJlc3VsdCwgdGFyZ2V0S2V5KSA/IHJlc3VsdFt0YXJnZXRLZXldIDogdW5kZWZpbmVkO1xuICAgIGlmIChpc1BsYWluT2JqZWN0KGV4aXN0aW5nKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gbWVyZ2UoZXhpc3RpbmcsIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIGlmICghc2tpcFVuZGVmaW5lZCB8fCAhaXNVbmRlZmluZWQodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWw7XG4gICAgfVxuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gb2Jqcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBzb3VyY2UgPSBvYmpzW2ldO1xuICAgIGlmICghc291cmNlIHx8IGlzQnVmZmVyKHNvdXJjZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGZvckVhY2goc291cmNlLCBhc3NpZ25WYWx1ZSk7XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcgfHwgaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBjb25zdCBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3ltYm9scy5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3Qgc3ltYm9sID0gc3ltYm9sc1tqXTtcbiAgICAgIGlmIChwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwgc3ltYm9sKSkge1xuICAgICAgICBhc3NpZ25WYWx1ZShzb3VyY2Vbc3ltYm9sXSwgc3ltYm9sKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYWxsT3duS2V5c11cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuY29uc3QgZXh0ZW5kID0gKGEsIGIsIHRoaXNBcmcsIHsgYWxsT3duS2V5cyB9ID0ge30pID0+IHtcbiAgZm9yRWFjaChcbiAgICBiLFxuICAgICh2YWwsIGtleSkgPT4ge1xuICAgICAgaWYgKHRoaXNBcmcgJiYgaXNGdW5jdGlvbih2YWwpKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCBrZXksIHtcbiAgICAgICAgICAvLyBOdWxsLXByb3RvIGRlc2NyaXB0b3Igc28gYSBwb2xsdXRlZCBPYmplY3QucHJvdG90eXBlLmdldCBjYW5ub3RcbiAgICAgICAgICAvLyBoaWphY2sgZGVmaW5lUHJvcGVydHkncyBhY2Nlc3Nvci12cy1kYXRhIHJlc29sdXRpb24uXG4gICAgICAgICAgX19wcm90b19fOiBudWxsLFxuICAgICAgICAgIHZhbHVlOiBiaW5kKHZhbCwgdGhpc0FyZyksXG4gICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsIGtleSwge1xuICAgICAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgICAgICB2YWx1ZTogdmFsLFxuICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHsgYWxsT3duS2V5cyB9XG4gICk7XG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuY29uc3Qgc3RyaXBCT00gPSAoY29udGVudCkgPT4ge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweGZlZmYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn07XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGluaGVyaXRzID0gKGNvbnN0cnVjdG9yLCBzdXBlckNvbnN0cnVjdG9yLCBwcm9wcywgZGVzY3JpcHRvcnMpID0+IHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IucHJvdG90eXBlLCAnY29uc3RydWN0b3InLCB7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIHZhbHVlOiBjb25zdHJ1Y3RvcixcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IsICdzdXBlcicsIHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgdmFsdWU6IHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLFxuICB9KTtcbiAgcHJvcHMgJiYgT2JqZWN0LmFzc2lnbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3BzKTtcbn07XG5cbi8qKlxuICogUmVzb2x2ZSBvYmplY3Qgd2l0aCBkZWVwIHByb3RvdHlwZSBjaGFpbiB0byBhIGZsYXQgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlT2JqIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGVzdE9ial1cbiAqIEBwYXJhbSB7RnVuY3Rpb258Qm9vbGVhbn0gW2ZpbHRlcl1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9wRmlsdGVyXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IHRvRmxhdE9iamVjdCA9IChzb3VyY2VPYmosIGRlc3RPYmosIGZpbHRlciwgcHJvcEZpbHRlcikgPT4ge1xuICBsZXQgcHJvcHM7XG4gIGxldCBpO1xuICBsZXQgcHJvcDtcbiAgY29uc3QgbWVyZ2VkID0ge307XG5cbiAgZGVzdE9iaiA9IGRlc3RPYmogfHwge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBpZiAoc291cmNlT2JqID09IG51bGwpIHJldHVybiBkZXN0T2JqO1xuXG4gIGRvIHtcbiAgICBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZU9iaik7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgaWYgKCghcHJvcEZpbHRlciB8fCBwcm9wRmlsdGVyKHByb3AsIHNvdXJjZU9iaiwgZGVzdE9iaikpICYmICFtZXJnZWRbcHJvcF0pIHtcbiAgICAgICAgZGVzdE9ialtwcm9wXSA9IHNvdXJjZU9ialtwcm9wXTtcbiAgICAgICAgbWVyZ2VkW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlT2JqID0gZmlsdGVyICE9PSBmYWxzZSAmJiBnZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZW5kc1dpdGggPSAoc3RyLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSA9PiB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcbiAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgY29uc3QgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59O1xuXG4vKipcbiAqIFJldHVybnMgbmV3IGFycmF5IGZyb20gYXJyYXkgbGlrZSBvYmplY3Qgb3IgbnVsbCBpZiBmYWlsZWRcbiAqXG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqXG4gKiBAcmV0dXJucyB7P0FycmF5fVxuICovXG5jb25zdCB0b0FycmF5ID0gKHRoaW5nKSA9PiB7XG4gIGlmICghdGhpbmcpIHJldHVybiBudWxsO1xuICBpZiAoaXNBcnJheSh0aGluZykpIHJldHVybiB0aGluZztcbiAgbGV0IGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmICghaXNOdW1iZXIoaSkpIHJldHVybiBudWxsO1xuICBjb25zdCBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn07XG5cbi8qKlxuICogQ2hlY2tpbmcgaWYgdGhlIFVpbnQ4QXJyYXkgZXhpc3RzIGFuZCBpZiBpdCBkb2VzLCBpdCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlXG4gKiB0aGluZyBwYXNzZWQgaW4gaXMgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheVxuICpcbiAqIEBwYXJhbSB7VHlwZWRBcnJheX1cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBpc1R5cGVkQXJyYXkgPSAoKFR5cGVkQXJyYXkpID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuICh0aGluZykgPT4ge1xuICAgIHJldHVybiBUeXBlZEFycmF5ICYmIHRoaW5nIGluc3RhbmNlb2YgVHlwZWRBcnJheTtcbiAgfTtcbn0pKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBnZXRQcm90b3R5cGVPZihVaW50OEFycmF5KSk7XG5cbi8qKlxuICogRm9yIGVhY2ggZW50cnkgaW4gdGhlIG9iamVjdCwgY2FsbCB0aGUgZnVuY3Rpb24gd2l0aCB0aGUga2V5IGFuZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBlbnRyeS5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgZm9yRWFjaEVudHJ5ID0gKG9iaiwgZm4pID0+IHtcbiAgY29uc3QgZ2VuZXJhdG9yID0gb2JqICYmIG9ialtpdGVyYXRvcl07XG5cbiAgY29uc3QgX2l0ZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwob2JqKTtcblxuICBsZXQgcmVzdWx0O1xuXG4gIHdoaWxlICgocmVzdWx0ID0gX2l0ZXJhdG9yLm5leHQoKSkgJiYgIXJlc3VsdC5kb25lKSB7XG4gICAgY29uc3QgcGFpciA9IHJlc3VsdC52YWx1ZTtcbiAgICBmbi5jYWxsKG9iaiwgcGFpclswXSwgcGFpclsxXSk7XG4gIH1cbn07XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufTtcblxuLyogQ2hlY2tpbmcgaWYgdGhlIGtpbmRPZlRlc3QgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHdoZW4gcGFzc2VkIGFuIEhUTUxGb3JtRWxlbWVudC4gKi9cbmNvbnN0IGlzSFRNTEZvcm0gPSBraW5kT2ZUZXN0KCdIVE1MRm9ybUVsZW1lbnQnKTtcblxuY29uc3QgdG9DYW1lbENhc2UgPSAoc3RyKSA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLCBmdW5jdGlvbiByZXBsYWNlcihtLCBwMSwgcDIpIHtcbiAgICByZXR1cm4gcDEudG9VcHBlckNhc2UoKSArIHAyO1xuICB9KTtcbn07XG5cbmNvbnN0IHsgcHJvcGVydHlJc0VudW1lcmFibGUgfSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1JlZ0V4cCA9IGtpbmRPZlRlc3QoJ1JlZ0V4cCcpO1xuXG5jb25zdCByZWR1Y2VEZXNjcmlwdG9ycyA9IChvYmosIHJlZHVjZXIpID0+IHtcbiAgY29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmopO1xuICBjb25zdCByZWR1Y2VkRGVzY3JpcHRvcnMgPSB7fTtcblxuICBmb3JFYWNoKGRlc2NyaXB0b3JzLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIGxldCByZXQ7XG4gICAgaWYgKChyZXQgPSByZWR1Y2VyKGRlc2NyaXB0b3IsIG5hbWUsIG9iaikpICE9PSBmYWxzZSkge1xuICAgICAgcmVkdWNlZERlc2NyaXB0b3JzW25hbWVdID0gcmV0IHx8IGRlc2NyaXB0b3I7XG4gICAgfVxuICB9KTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhvYmosIHJlZHVjZWREZXNjcmlwdG9ycyk7XG59O1xuXG4vKipcbiAqIE1ha2VzIGFsbCBtZXRob2RzIHJlYWQtb25seVxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICovXG5cbmNvbnN0IGZyZWV6ZU1ldGhvZHMgPSAob2JqKSA9PiB7XG4gIHJlZHVjZURlc2NyaXB0b3JzKG9iaiwgKGRlc2NyaXB0b3IsIG5hbWUpID0+IHtcbiAgICAvLyBza2lwIHJlc3RyaWN0ZWQgcHJvcHMgaW4gc3RyaWN0IG1vZGVcbiAgICBpZiAoaXNGdW5jdGlvbihvYmopICYmIFsnYXJndW1lbnRzJywgJ2NhbGxlcicsICdjYWxsZWUnXS5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlID0gb2JqW25hbWVdO1xuXG4gICAgaWYgKCFpc0Z1bmN0aW9uKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZmFsc2U7XG5cbiAgICBpZiAoJ3dyaXRhYmxlJyBpbiBkZXNjcmlwdG9yKSB7XG4gICAgICBkZXNjcmlwdG9yLndyaXRhYmxlID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFkZXNjcmlwdG9yLnNldCkge1xuICAgICAgZGVzY3JpcHRvci5zZXQgPSAoKSA9PiB7XG4gICAgICAgIHRocm93IEVycm9yKFwiQ2FuIG5vdCByZXdyaXRlIHJlYWQtb25seSBtZXRob2QgJ1wiICsgbmFtZSArIFwiJ1wiKTtcbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYW4gYXJyYXkgb3IgYSBkZWxpbWl0ZWQgc3RyaW5nIGludG8gYW4gb2JqZWN0IHNldCB3aXRoIHZhbHVlcyBhcyBrZXlzIGFuZCB0cnVlIGFzIHZhbHVlcy5cbiAqIFVzZWZ1bCBmb3IgZmFzdCBtZW1iZXJzaGlwIGNoZWNrcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gYXJyYXlPclN0cmluZyAtIFRoZSBhcnJheSBvciBzdHJpbmcgdG8gY29udmVydC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkZWxpbWl0ZXIgLSBUaGUgZGVsaW1pdGVyIHRvIHVzZSBpZiBpbnB1dCBpcyBhIHN0cmluZy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIGtleXMgZnJvbSB0aGUgYXJyYXkgb3Igc3RyaW5nLCB2YWx1ZXMgc2V0IHRvIHRydWUuXG4gKi9cbmNvbnN0IHRvT2JqZWN0U2V0ID0gKGFycmF5T3JTdHJpbmcsIGRlbGltaXRlcikgPT4ge1xuICBjb25zdCBvYmogPSB7fTtcblxuICBjb25zdCBkZWZpbmUgPSAoYXJyKSA9PiB7XG4gICAgYXJyLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICBvYmpbdmFsdWVdID0gdHJ1ZTtcbiAgICB9KTtcbiAgfTtcblxuICBpc0FycmF5KGFycmF5T3JTdHJpbmcpID8gZGVmaW5lKGFycmF5T3JTdHJpbmcpIDogZGVmaW5lKFN0cmluZyhhcnJheU9yU3RyaW5nKS5zcGxpdChkZWxpbWl0ZXIpKTtcblxuICByZXR1cm4gb2JqO1xufTtcblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5jb25zdCB0b0Zpbml0ZU51bWJlciA9ICh2YWx1ZSwgZGVmYXVsdFZhbHVlKSA9PiB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIE51bWJlci5pc0Zpbml0ZSgodmFsdWUgPSArdmFsdWUpKSA/IHZhbHVlIDogZGVmYXVsdFZhbHVlO1xufTtcblxuLyoqXG4gKiBJZiB0aGUgdGhpbmcgaXMgYSBGb3JtRGF0YSBvYmplY3QsIHJldHVybiB0cnVlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gdGhpbmcgLSBUaGUgdGhpbmcgdG8gY2hlY2suXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzU3BlY0NvbXBsaWFudEZvcm0odGhpbmcpIHtcbiAgcmV0dXJuICEhKFxuICAgIHRoaW5nICYmXG4gICAgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmXG4gICAgdGhpbmdbdG9TdHJpbmdUYWddID09PSAnRm9ybURhdGEnICYmXG4gICAgdGhpbmdbaXRlcmF0b3JdXG4gICk7XG59XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgY29udmVydHMgYW4gb2JqZWN0IHRvIGEgSlNPTi1jb21wYXRpYmxlIG9iamVjdCwgaGFuZGxpbmcgY2lyY3VsYXIgcmVmZXJlbmNlcyBhbmQgQnVmZmVycy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gVGhlIG9iamVjdCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge09iamVjdH0gVGhlIEpTT04tY29tcGF0aWJsZSBvYmplY3QuXG4gKi9cbmNvbnN0IHRvSlNPTk9iamVjdCA9IChvYmopID0+IHtcbiAgY29uc3QgdmlzaXRlZCA9IG5ldyBXZWFrU2V0KCk7XG5cbiAgY29uc3QgdmlzaXQgPSAoc291cmNlKSA9PiB7XG4gICAgaWYgKGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIGlmICh2aXNpdGVkLmhhcyhzb3VyY2UpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy9CdWZmZXIgY2hlY2tcbiAgICAgIGlmIChpc0J1ZmZlcihzb3VyY2UpKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICB9XG5cbiAgICAgIGlmICghKCd0b0pTT04nIGluIHNvdXJjZSkpIHtcbiAgICAgICAgLy8gYWRkLW9uIGRlc2NlbnQgLyBkZWxldGUtb24tYXNjZW50OiBwcmVzZXJ2ZXMgcGF0aCBzZW1hbnRpY3MsIHNvIERBRyBub2RlcyBzZXJpYWxpc2UgYXQgZXZlcnkgb2NjdXJyZW5jZSAoc2VlICM3MjMwKS5cbiAgICAgICAgdmlzaXRlZC5hZGQoc291cmNlKTtcblxuICAgICAgICBsZXQgdGFyZ2V0O1xuXG4gICAgICAgIGlmIChpc1NldChzb3VyY2UpKSB7XG4gICAgICAgICAgdGFyZ2V0ID0gW107XG4gICAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlZHVjZWRWYWx1ZSA9IHZpc2l0KHZhbHVlKTtcbiAgICAgICAgICAgICFpc1VuZGVmaW5lZChyZWR1Y2VkVmFsdWUpICYmIHRhcmdldC5wdXNoKHJlZHVjZWRWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldCA9IGlzQXJyYXkoc291cmNlKSA/IFtdIDoge307XG5cbiAgICAgICAgICBmb3JFYWNoKHNvdXJjZSwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlZHVjZWRWYWx1ZSA9IHZpc2l0KHZhbHVlKTtcbiAgICAgICAgICAgICFpc1VuZGVmaW5lZChyZWR1Y2VkVmFsdWUpICYmICh0YXJnZXRba2V5XSA9IHJlZHVjZWRWYWx1ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2aXNpdGVkLmRlbGV0ZShzb3VyY2UpO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfTtcblxuICByZXR1cm4gdmlzaXQob2JqKTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIHZhbHVlIGlzIGFuIGFzeW5jIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgLSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIGFzeW5jIGZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2UuXG4gKi9cbmNvbnN0IGlzQXN5bmNGbiA9IGtpbmRPZlRlc3QoJ0FzeW5jRnVuY3Rpb24nKTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgdmFsdWUgaXMgdGhlbmFibGUgKGhhcyB0aGVuIGFuZCBjYXRjaCBtZXRob2RzKS5cbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIC0gVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyB0aGVuYWJsZSwgb3RoZXJ3aXNlIGZhbHNlLlxuICovXG5jb25zdCBpc1RoZW5hYmxlID0gKHRoaW5nKSA9PlxuICB0aGluZyAmJlxuICAoaXNPYmplY3QodGhpbmcpIHx8IGlzRnVuY3Rpb24odGhpbmcpKSAmJlxuICBpc0Z1bmN0aW9uKHRoaW5nLnRoZW4pICYmXG4gIGlzRnVuY3Rpb24odGhpbmcuY2F0Y2gpO1xuXG4vLyBvcmlnaW5hbCBjb2RlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vRGlnaXRhbEJyYWluSlMvQXhpb3NQcm9taXNlL2Jsb2IvMTZkZWFiMTM3MTBlYzA5Nzc5OTIyMTMxZjNmYTU5NTQzMjBmODNhYi9saWIvdXRpbHMuanMjTDExLUwzNFxuXG4vKipcbiAqIFByb3ZpZGVzIGEgY3Jvc3MtcGxhdGZvcm0gc2V0SW1tZWRpYXRlIGltcGxlbWVudGF0aW9uLlxuICogVXNlcyBuYXRpdmUgc2V0SW1tZWRpYXRlIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGZhbGxzIGJhY2sgdG8gcG9zdE1lc3NhZ2Ugb3Igc2V0VGltZW91dC5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNldEltbWVkaWF0ZVN1cHBvcnRlZCAtIFdoZXRoZXIgc2V0SW1tZWRpYXRlIGlzIHN1cHBvcnRlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcG9zdE1lc3NhZ2VTdXBwb3J0ZWQgLSBXaGV0aGVyIHBvc3RNZXNzYWdlIGlzIHN1cHBvcnRlZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0byBzY2hlZHVsZSBhIGNhbGxiYWNrIGFzeW5jaHJvbm91c2x5LlxuICovXG5jb25zdCBfc2V0SW1tZWRpYXRlID0gKChzZXRJbW1lZGlhdGVTdXBwb3J0ZWQsIHBvc3RNZXNzYWdlU3VwcG9ydGVkKSA9PiB7XG4gIGlmIChzZXRJbW1lZGlhdGVTdXBwb3J0ZWQpIHtcbiAgICByZXR1cm4gc2V0SW1tZWRpYXRlO1xuICB9XG5cbiAgcmV0dXJuIHBvc3RNZXNzYWdlU3VwcG9ydGVkXG4gICAgPyAoKHRva2VuLCBjYWxsYmFja3MpID0+IHtcbiAgICAgICAgX2dsb2JhbC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICdtZXNzYWdlJyxcbiAgICAgICAgICAoeyBzb3VyY2UsIGRhdGEgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHNvdXJjZSA9PT0gX2dsb2JhbCAmJiBkYXRhID09PSB0b2tlbikge1xuICAgICAgICAgICAgICBjYWxsYmFja3MubGVuZ3RoICYmIGNhbGxiYWNrcy5zaGlmdCgpKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiAoY2IpID0+IHtcbiAgICAgICAgICBjYWxsYmFja3MucHVzaChjYik7XG4gICAgICAgICAgX2dsb2JhbC5wb3N0TWVzc2FnZSh0b2tlbiwgJyonKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKGBheGlvc0Ake01hdGgucmFuZG9tKCl9YCwgW10pXG4gICAgOiAoY2IpID0+IHNldFRpbWVvdXQoY2IpO1xufSkodHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJywgaXNGdW5jdGlvbihfZ2xvYmFsLnBvc3RNZXNzYWdlKSk7XG5cbi8qKlxuICogU2NoZWR1bGVzIGEgbWljcm90YXNrIG9yIGFzeW5jaHJvbm91cyBjYWxsYmFjayBhcyBzb29uIGFzIHBvc3NpYmxlLlxuICogVXNlcyBxdWV1ZU1pY3JvdGFzayBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBmYWxscyBiYWNrIHRvIHByb2Nlc3MubmV4dFRpY2sgb3IgX3NldEltbWVkaWF0ZS5cbiAqXG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKi9cbmNvbnN0IGFzYXAgPVxuICB0eXBlb2YgcXVldWVNaWNyb3Rhc2sgIT09ICd1bmRlZmluZWQnXG4gICAgPyBxdWV1ZU1pY3JvdGFzay5iaW5kKF9nbG9iYWwpXG4gICAgOiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MubmV4dFRpY2spIHx8IF9zZXRJbW1lZGlhdGU7XG5cbi8vICoqKioqKioqKioqKioqKioqKioqKlxuXG5jb25zdCBpc0l0ZXJhYmxlID0gKHRoaW5nKSA9PiB0aGluZyAhPSBudWxsICYmIGlzRnVuY3Rpb24odGhpbmdbaXRlcmF0b3JdKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBpdGVyYWJsZSB2aWEgYW4gaXRlcmF0b3IgdGhhdCBpcyBOT1Qgc291cmNlZCBzb2xlbHlcbiAqIGZyb20gYSBwb2xsdXRlZCBPYmplY3QucHJvdG90eXBlLiBVc2UgdGhpcyBpbnN0ZWFkIG9mIGBpc0l0ZXJhYmxlYCB3aGVuZXZlclxuICogdGhlIGl0ZXJhYmxlIGNvbWVzIGZyb20gdW50cnVzdGVkIGlucHV0IChlLmcuIHVzZXItc3VwcGxpZWQgaGVhZGVyIHNvdXJjZXMpLFxuICogc28gYE9iamVjdC5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IC4uLmAgY2Fubm90IHR1cm4gYW4gb3JkaW5hcnkgb2JqZWN0XG4gKiBpbnRvIGFuIGF0dGFja2VyLWNvbnRyb2xsZWQgZW50cmllcyBpdGVyYXRvci5cbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaGFzIGEgbm9uLXBvbGx1dGVkIGl0ZXJhdG9yXG4gKi9cbmNvbnN0IGlzU2FmZUl0ZXJhYmxlID0gKHRoaW5nKSA9PlxuICB0aGluZyAhPSBudWxsICYmIGhhc093bkluUHJvdG90eXBlQ2hhaW4odGhpbmcsIGl0ZXJhdG9yKSAmJiBpc0l0ZXJhYmxlKHRoaW5nKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nLFxuICBpc051bWJlcixcbiAgaXNCb29sZWFuLFxuICBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdCxcbiAgaXNFbXB0eU9iamVjdCxcbiAgaXNSZWFkYWJsZVN0cmVhbSxcbiAgaXNSZXF1ZXN0LFxuICBpc1Jlc3BvbnNlLFxuICBpc0hlYWRlcnMsXG4gIGlzVW5kZWZpbmVkLFxuICBpc0RhdGUsXG4gIGlzRmlsZSxcbiAgaXNSZWFjdE5hdGl2ZUJsb2IsXG4gIGlzUmVhY3ROYXRpdmUsXG4gIGlzQmxvYixcbiAgaXNSZWdFeHAsXG4gIGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNUeXBlZEFycmF5LFxuICBpc0ZpbGVMaXN0LFxuICBmb3JFYWNoLFxuICBtZXJnZSxcbiAgZXh0ZW5kLFxuICB0cmltLFxuICBzdHJpcEJPTSxcbiAgaW5oZXJpdHMsXG4gIHRvRmxhdE9iamVjdCxcbiAga2luZE9mLFxuICBraW5kT2ZUZXN0LFxuICBlbmRzV2l0aCxcbiAgdG9BcnJheSxcbiAgZm9yRWFjaEVudHJ5LFxuICBtYXRjaEFsbCxcbiAgaXNIVE1MRm9ybSxcbiAgaGFzT3duUHJvcGVydHksXG4gIGhhc093blByb3A6IGhhc093blByb3BlcnR5LCAvLyBhbiBhbGlhcyB0byBhdm9pZCBFU0xpbnQgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIGRldGVjdGlvblxuICBoYXNPd25JblByb3RvdHlwZUNoYWluLFxuICBnZXRTYWZlUHJvcCxcbiAgdG9TYWZlRmxhdE9iamVjdCxcbiAgcmVkdWNlRGVzY3JpcHRvcnMsXG4gIGZyZWV6ZU1ldGhvZHMsXG4gIHRvT2JqZWN0U2V0LFxuICB0b0NhbWVsQ2FzZSxcbiAgbm9vcCxcbiAgdG9GaW5pdGVOdW1iZXIsXG4gIGZpbmRLZXksXG4gIGdsb2JhbDogX2dsb2JhbCxcbiAgaXNDb250ZXh0RGVmaW5lZCxcbiAgaXNTcGVjQ29tcGxpYW50Rm9ybSxcbiAgdG9KU09OT2JqZWN0LFxuICBpc0FzeW5jRm4sXG4gIGlzVGhlbmFibGUsXG4gIHNldEltbWVkaWF0ZTogX3NldEltbWVkaWF0ZSxcbiAgYXNhcCxcbiAgaXNJdGVyYWJsZSxcbiAgaXNTYWZlSXRlcmFibGUsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxuY29uc3QgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRjb25zdCBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0Y29uc3QgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdGNvbnN0IGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyL3ZhbHVlIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSk7IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHNldCAubmFtZSBmb3IgYW5vbnltb3VzIGRlZmF1bHQgZXhwb3J0cyBwZXIgRVMgc3BlY1xuLy8gc2tpcHBlZCB3aGVuIHRoZSBwcm9wZXJ0eSBpcyBub24tY29uZmlndXJhYmxlIChwcmUtRVMyMDE1IGVuZ2luZXMpLFxuLy8gd2hlcmUgT2JqZWN0LmRlZmluZVByb3BlcnR5IHdvdWxkIHRocm93XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmRuID0gKHgpID0+IHtcblx0dmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHgsIFwibmFtZVwiKTtcblx0aWYgKCFkZXNjcmlwdG9yIHx8ICghZGVzY3JpcHRvci53cml0YWJsZSAmJiBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSkpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh4LCBcIm5hbWVcIiwgeyB2YWx1ZTogXCJkZWZhdWx0XCIsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9pbmRleC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vdXRpbHMvYWxlcnQuanNcIlxuaW1wb3J0IHsgYXhpb3MgfSBmcm9tIFwiQC9yZXF1ZXN0LmpzXCJcbmltcG9ydCB7IGF1dGggfSBmcm9tIFwiLi4vLi4vdXRpbHMvYXV0aC5qc1wiXG4vKipcbiAqIOebruaghzHvvJrojrflj5bmlofnq6DliJfooajlubblsZXnpLpcbiAqICAxLjEg5YeG5aSH5p+l6K+i5Y+C5pWw5a+56LGhXG4gKiAgMS4yIOiOt+WPluaWh+eroOWIl+ihqOaVsOaNrlxuICogIDEuMyDlsZXnpLrliLDmjIflrprnmoTmoIfnrb7nu5PmnoTkuK1cbiAqL1xuXG4vKipcbiAqIOebruaghzLvvJrnrZvpgInmlofnq6DliJfooahcbiAqICAyLjEg6K6+572u6aKR6YGT5YiX6KGo5pWw5o2uXG4gKiAgMi4yIOebkeWQrOetm+mAieadoeS7tuaUueWPmO+8jOS/neWtmOafpeivouS/oeaBr+WIsOafpeivouWPguaVsOWvueixoVxuICogIDIuMyDngrnlh7vnrZvpgInml7bvvIzkvKDpgJLmn6Xor6Llj4LmlbDlr7nosaHliLDmnI3liqHlmahcbiAqICAyLjQg6I635Y+W5Yy56YWN5pWw5o2u77yM6KaG55uW5Yiw6aG16Z2i5bGV56S6XG4gKi9cblxuLyoqXG4gKiDnm67moIcz77ya5YiG6aG15Yqf6IO9XG4gKiAgMy4xIOS/neWtmOW5tuiuvue9ruaWh+eroOaAu+adoeaVsFxuICogIDMuMiDngrnlh7vkuIvkuIDpobXvvIzlgZrkuLTnlYzlgLzliKTmlq3vvIzlubbliIfmjaLpobXnoIHlj4LmlbDlubbor7fmsYLmnIDmlrDmlbDmja5cbiAqICAzLjMg54K55Ye75LiK5LiA6aG177yM5YGa5Li055WM5YC85Yik5pat77yM5bm25YiH5o2i6aG156CB5Y+C5pWw5bm26K+35rGC5pyA5paw5pWw5o2uXG4gKi9cblxuLyoqXG4gKiDnm67moIc077ya5Yig6Zmk5Yqf6IO9XG4gKiAgNC4xIOWFs+iBlOaWh+eroCBpZCDliLDliKDpmaTlm77moIdcbiAqICA0LjIg54K55Ye75Yig6Zmk5pe277yM6I635Y+W5paH56ugIGlkXG4gKiAgNC4zIOiwg+eUqOWIoOmZpOaOpeWPo++8jOS8oOmAkuaWh+eroCBpZCDliLDmnI3liqHlmahcbiAqICA0LjQg6YeN5paw6I635Y+W5paH56ug5YiX6KGo77yM5bm26KaG55uW5bGV56S6XG4gKiAgNC41IOWIoOmZpOacgOWQjuS4gOmhteeahOacgOWQjuS4gOadoe+8jOmcgOimgeiHquWKqOWQkeWJjee/u+mhtVxuICovXG5cbi8vIOeCueWHu+e8lui+keaXtu+8jOiOt+WPluaWh+eroCBpZO+8jOi3s+i9rOWIsOWPkeW4g+aWh+eroOmhtemdouS8oOmAkuaWh+eroCBpZCDov4fljrtcblxuY29uc3QgeyBjcmVhdGVFZGl0b3IsIGNyZWF0ZVRvb2xiYXIgfSA9IHdpbmRvdy53YW5nRWRpdG9yXG5cbmNvbnN0IGVkaXRvckNvbmZpZyA9IHtcbiAgcGxhY2Vob2xkZXI6ICdUeXBlIGhlcmUuLi4nLFxuICBvbkNoYW5nZShlZGl0b3IpIHtcbiAgICBjb25zdCBodG1sID0gZWRpdG9yLmdldEh0bWwoKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0ZXh0YXJlYVwiKS52YWx1ZSA9IGh0bWw7XG4gICAgY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInRleHRhcmVhXCIpLnZhbHVlKVxuICB9XG59XG5cblxuY29uc3QgZWRpdG9yID0gY3JlYXRlRWRpdG9yKHtcbiAgc2VsZWN0b3I6ICcjZWRpdG9yLWNvbnRhaW5lcicsXG4gIGh0bWw6ICc8cD48YnI+PC9wPicsXG4gIGNvbmZpZzogZWRpdG9yQ29uZmlnLFxuICBtb2RlOiAnZGVmYXVsdCcsIC8vIG9yICdzaW1wbGUnXG59KVxuY29uc3QgdG9vbGJhckNvbmZpZyA9IHt9XG5cbmNvbnN0IHRvb2xiYXIgPSBjcmVhdGVUb29sYmFyKHtcbiAgZWRpdG9yLFxuICBzZWxlY3RvcjogJyN0b29sYmFyLWNvbnRhaW5lcicsXG4gIGNvbmZpZzogdG9vbGJhckNvbmZpZyxcbiAgbW9kZTogJ2RlZmF1bHQnLCAvLyBvciAnc2ltcGxlJ1xufSlcblxuXG5jb25zdCBlZGl0TW9kYWwgPSBuZXcgYm9vdHN0cmFwLk1vZGFsKFwiI2VkaXQtbW9kYWxcIik7XG5jb25zdCBkZWxldGVNb2RhbCA9IG5ldyBib290c3RyYXAuTW9kYWwoXCIjZGVsZXRlLW1vZGFsXCIpO1xuXG5jb25zb2xlLmxvZyhlZGl0b3IpXG5sZXQgc2VsZWN0ZWRBcnRpY2xlO1xuYXV0aCgpO1xuXG5nZXRBcnRpY2xlTGlzdCgpO1xuY29uc29sZS5sb2coXCJ0ZXN0XCIpXG5nZXRDaGFubmVsTGlzdCgpO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2luYXRpb25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc29sZS5sb2coXCIhXCIpXG4gIGNvbnN0IGN1cnJlbnRQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLW5vd1wiKS5kYXRhc2V0LmlkO1xuICBjb25zdCB0b3RhbENvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b3RhbC1jb3VudFwiKS5kYXRhc2V0LmlkO1xuICBjb25zdCBwYXJhbXMgPSB7fTtcbiAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm5leHRcIikpIHtcbiAgICBwYXJhbXMucGFnZSA9ICtjdXJyZW50UGFnZSArIDFcbiAgICBpZiAoK2N1cnJlbnRQYWdlICogMTAgPj0gK3RvdGFsQ291bnQpIHtcbiAgICAgIG15QWxlcnQoZmFsc2UsIFwi5b2T5YmN5Li65pyA5ZCO5LiA6aG1XCIpXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibGFzdFwiKSkge1xuICAgIGlmICgrY3VycmVudFBhZ2UgPT09IDEpIHtcbiAgICAgIG15QWxlcnQoZmFsc2UsIFwi5b2T5YmN5Li656ys5LiA6aG1XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwYXJhbXMucGFnZSA9ICtjdXJyZW50UGFnZSAtIDFcbiAgfVxuICBnZXRBcnRpY2xlTGlzdChwYXJhbXMpLnRoZW4ociA9PiB7XG4gICAgY29uc29sZS5sb2cocilcbiAgfSlcbn0pXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJoaWRlLmJzLm1vZGFsXCIsIGZ1bmN0aW9uIChlKSB7XG4gIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gIH1cbiAgY29uc29sZS5sb2coMSlcbiAgdGhpcy5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsIGZvcm1cIikucmVzZXQoKTtcbiAgZWRpdG9yLmNsZWFyKClcbn0pXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUudGFibGUtc3RyaXBlZFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09IFwiSVwiKSB7XG4gICAgc2VsZWN0ZWRBcnRpY2xlID0gZS50YXJnZXQuaWQ7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRcIikpIHtcbiAgICAgIC8vIGdldENoYW5uZWxMaXN0KCk7XG4gICAgICAvLyBnZXRBcnRpY2xlRGV0YWlsKGUudGFyZ2V0LmlkKTtcbiAgICAgIC8v562J5b6F5omA5pyJcHJvbWlzZeWujOaIkOi/m+ihjOaVsOaNruWbnuaYvlxuICAgICAgUHJvbWlzZS5hbGwoW2dldENoYW5uZWxMaXN0KCksIGdldEFydGljbGVEZXRhaWwoZS50YXJnZXQuaWQpXSkudGhlbihyID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbCAuZm9ybS1zZWxlY3RcIikuaW5uZXJIVE1MID0gJzxvcHRpb24gdmFsdWU9XCJcIiBzZWxlY3RlZD7or7fpgInmi6nmlofnq6DpopHpgZM8L29wdGlvbj4nICsgclswXS5kYXRhLmRhdGEuY2hhbm5lbHMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgIHJldHVybiBgIDxvcHRpb24gdmFsdWU9XCIke2l0ZW0uaWR9XCI+JHtpdGVtLm5hbWV9PC9vcHRpb24+YFxuICAgICAgICB9KS5qb2luKFwiXCIpXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5tb2RhbCAuZm9ybS1zZWxlY3Qgb3B0aW9uW3NlbGVjdGVkXWApLnNlbGVjdGVkID0gZmFsc2VcbiAgICAgICAgY29uc29sZS5sb2coclsxXSlcbiAgICAgICAgZm9yIChsZXQgayBpbiByWzFdLmRhdGEuZGF0YSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGspXG4gICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGZvcm0gW25hbWU9XCIke2t9XCJdYCkpIHtcbiAgICAgICAgICAgIGlmIChrID09PSBcImNoYW5uZWxfaWRcIikge1xuXG4gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5tb2RhbCAuZm9ybS1zZWxlY3Qgb3B0aW9uW3ZhbHVlPVwiJHtyWzFdLmRhdGEuZGF0YVtrXX1cIl1gKS5zZWxlY3RlZCA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGZvcm0gW25hbWU9XCIke2t9XCJdYCkudmFsdWUgPSByWzFdLmRhdGEuZGF0YVtrXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlZGl0b3Iuc2V0SHRtbChyWzFdLmRhdGEuZGF0YS5jb250ZW50KVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvdmVyXCIpLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvdmVyIGltZ1wiKS5zcmMgPSByWzFdLmRhdGEuZGF0YS5jb3Zlci5pbWFnZXNbMF0gfHwgXCJcIlxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbFwiKSkge1xuICAgICAgZGVsZXRlTW9kYWwuc2hvdygpO1xuICAgIH1cbiAgfVxufSlcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVsZXRlLW1vZGFsIC5idG4tcHJpbWFyeVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICBpZiAoc2VsZWN0ZWRBcnRpY2xlKSB7XG4gICAgYXdhaXQgZGVsZXRlQXJ0aWNsZShzZWxlY3RlZEFydGljbGUpO1xuICB9XG4gIGRlbGV0ZU1vZGFsLmhpZGUoKVxufSlcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdC1tb2RhbCAubW9kYWwtZm9vdGVyIC5idG4tcHJpbWFyeVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsIGZvcm1cIikucmVxdWVzdFN1Ym1pdCgpO1xufSlcblxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvdmVyIGlucHV0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICBjb25zb2xlLmxvZyh0aGlzLmZpbGVzKVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvdmVyIGltZ1wiKS5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHRoaXMuZmlsZXNbMF0pXG59KVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsIGZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBhc3luYyBmdW5jdGlvbiAoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIC8v5Y+R6YCB54Wn54mH5pWw5o2u5ou/5Yiw54Wn54mH6L+e5o6lXG4gIGxldCB1cmwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvdmVyIGltZ1wiKS5zcmM7XG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXQuaW1nLWZpbGVcIikuZmlsZXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZm9ybURhdGEuYXBwZW5kKFwiaW1hZ2VcIiwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0LmltZy1maWxlXCIpLmZpbGVzWzBdKVxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGF4aW9zKHtcbiAgICAgIHVybDogXCIvdjFfMC91cGxvYWRcIixcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBkYXRhOiBmb3JtRGF0YVxuICAgIH0pXG4gICAgdXJsID0gcmVzdWx0LmRhdGEuZGF0YS51cmxcbiAgfVxuXG4gIGNvbnN0IGRhdGEgPSB7fTtcbiAgJCh0aGlzKS5zZXJpYWxpemVBcnJheSgpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgZGF0YVtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZVxuICB9KVxuXG4gIGRhdGEuY292ZXIgPSB7XG4gICAgdHlwZTogMSxcbiAgICBpbWFnZXM6IFt1cmxdXG4gIH1cblxuICBjb25zb2xlLmxvZyhkYXRhKTtcblxuICBjb25zdCByID0gYXdhaXQgZWRpdEFydGljbGUoZGF0YS5pZCwgZGF0YSk7XG5cbiAgZWRpdE1vZGFsLmhpZGUoKTtcbiAgY29uc29sZS5sb2cocilcbiAgZ2V0QXJ0aWNsZUxpc3QoKTtcbn0pXG5cblxuXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsLWZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBhc3luYyBmdW5jdGlvbiAoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGRhdGEgPSB7fVxuICBjb25zb2xlLmxvZygkKHRoaXMpLnNlcmlhbGl6ZUFycmF5KCkpXG4gICQodGhpcykuc2VyaWFsaXplQXJyYXkoKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICBkYXRhW2l0ZW0ubmFtZV0gPSBpdGVtLnZhbHVlO1xuICAgIH1cbiAgfSlcblxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBnZXRBcnRpY2xlTGlzdChkYXRhKVxuXG59KVxuXG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFydGljbGVEZXRhaWwoaWQpIHtcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXhpb3Moe1xuICAgIHVybDogYC92MV8wL21wL2FydGljbGVzLyR7aWR9YCxcbiAgfSlcbiAgY29uc29sZS5sb2cocmVzdWx0KVxuICByZXR1cm4gcmVzdWx0O1xufVxuYXN5bmMgZnVuY3Rpb24gZWRpdEFydGljbGUoaWQsIGRhdGEpIHtcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXhpb3Moe1xuICAgIHVybDogYC92MV8wL21wL2FydGljbGVzLyR7aWR9YCxcbiAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgZGF0YVxuICB9KVxuICBjb25zb2xlLmxvZyhyZXN1bHQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkZWxldGVBcnRpY2xlKGlkKSB7XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGF4aW9zKHtcbiAgICB1cmw6IGAvdjFfMC9tcC9hcnRpY2xlcy8ke2lkfWAsXG4gICAgbWV0aG9kOiBcIkRFTEVURVwiXG4gIH0pXG4gIGdldEFydGljbGVMaXN0KClcbiAgY29uc29sZS5sb2cocmVzdWx0KVxufVxuYXN5bmMgZnVuY3Rpb24gZ2V0Q2hhbm5lbExpc3QoKSB7XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGF4aW9zKHtcbiAgICB1cmw6IFwiL3YxXzAvY2hhbm5lbHNcIlxuICB9KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtLXNlbGVjdFwiKS5pbm5lckhUTUwgPSAnPG9wdGlvbiB2YWx1ZT1cIlwiIHNlbGVjdGVkPuivt+mAieaLqeaWh+eroOmikemBkzwvb3B0aW9uPicgKyByZXN1bHQuZGF0YS5kYXRhLmNoYW5uZWxzLm1hcChpdGVtID0+IHtcbiAgICByZXR1cm4gYCA8b3B0aW9uIHZhbHVlPVwiJHtpdGVtLmlkfVwiPiR7aXRlbS5uYW1lfTwvb3B0aW9uPmBcbiAgfSkuam9pbihcIlwiKVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBcnRpY2xlTGlzdChwYXJhbXMpIHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGF4aW9zKHtcbiAgICB1cmw6IFwiL3YxXzAvbXAvYXJ0aWNsZXNcIixcbiAgICBwYXJhbXM6IHtcbiAgICAgIC4uLnBhcmFtc1xuICAgIH1cbiAgfSlcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkIC5hbGlnbi1taWRkbGUuYXJ0LWxpc3RcIikuaW5uZXJIVE1MID0gZGF0YS5kYXRhLmRhdGEucmVzdWx0cy5tYXAoaXRlbSA9PiB7XG4gICAgcmV0dXJuIGAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPVwiJHtpdGVtLmNvdmVyLmltYWdlc1swXSB8fCBcIlwifVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPiR7aXRlbS50aXRsZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICR7aXRlbS5zdGF0dXMgPT09IDIgPyAnPHNwYW4gY2xhc3M9XCJiYWRnZSB0ZXh0LWJnLXN1Y2Nlc3NcIj7lrqHmoLjpgJrov4c8L3NwYW4+JyA6ICc8c3BhbiBjbGFzcz1cImJhZGdlIHRleHQtYmctcHJpbWFyeVwiPuW+heWuoeaguDwvc3Bhbj4nfVxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtpdGVtLnB1YmRhdGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtpdGVtLnJlYWRfY291bnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtpdGVtLmNvbW1lbnRfY291bnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtpdGVtLmxpa2VfY291bnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaSBiaS1wZW5jaWwtc3F1YXJlIGVkaXRcIiBpZD1cIiR7aXRlbS5pZH1cIiBkYXRhLWJzLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS1icy10YXJnZXQ9XCIjZWRpdC1tb2RhbFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmkgYmktdHJhc2gzIGRlbFwiIGlkPVwiJHtpdGVtLmlkfVwiIGRhdGEtYnMtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLWJzLXRhcmdldD1cIiNkZWxldGUtbW9kYWxcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5gXG4gIH0pLmpvaW4oXCJcIilcbiAgY29uc29sZS5sb2coZGF0YSlcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWl0ZW0ucGFnZS1ub3dcIikuaW5uZXJIVE1MID0gYOesrCR7ZGF0YS5kYXRhLmRhdGEucGFnZX3pobVgXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1pdGVtLnBhZ2Utbm93XCIpLmRhdGFzZXQuaWQgPSBkYXRhLmRhdGEuZGF0YS5wYWdlXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG90YWwtY291bnRcIikuaW5uZXJIVE1MID0gYOWFsSR7ZGF0YS5kYXRhLmRhdGEudG90YWxfY291bnR95p2hYFxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvdGFsLWNvdW50XCIpLmRhdGFzZXQuaWQgPSBkYXRhLmRhdGEuZGF0YS50b3RhbF9jb3VudFxuICByZXR1cm4gZGF0YTtcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=