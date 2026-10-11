/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./page/publish/index.css"
/*!********************************!*\
  !*** ./page/publish/index.css ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./utils/alert.js"
/*!************************!*\
  !*** ./utils/alert.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

"use strict";
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

/***/ "./utils/editor.js"
/*!*************************!*\
  !*** ./utils/editor.js ***!
  \*************************/
() {

// 富文本编辑器
// 创建编辑器函数，创建工具栏函数

/***/ },

/***/ "./utils/request.js"
/*!**************************!*\
  !*** ./utils/request.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*******************************!*\
  !*** ./page/publish/index.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./page/publish/index.css");
/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/request.js */ "./utils/request.js");
/* harmony import */ var _utils_editor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/editor.js */ "./utils/editor.js");
/* harmony import */ var _utils_editor_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_utils_editor_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/auth.js */ "./utils/auth.js");
/* harmony import */ var _utils_alert_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/alert.js */ "./utils/alert.js");





/**
 * 目标1：设置频道下拉菜单
 *  1.1 获取频道列表数据
 *  1.2 展示到下拉菜单中
 */

/**
 * 目标2：文章封面设置
 *  2.1 准备标签结构和样式
 *  2.2 选择文件并保存在 FormData
 *  2.3 单独上传图片并得到图片 URL 网址
 *  2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）
 */

/**
 * 目标3：发布文章保存
 *  3.1 基于 form-serialize 插件收集表单数据对象
 *  3.2 基于 axios 提交到服务器保存
 *  3.3 调用 Alert 警告框反馈结果给用户
 *  3.4 重置表单并跳转到列表页
 */

/**
 * 目标4：编辑-回显文章
 *  4.1 页面跳转传参（URL 查询参数方式）
 *  4.2 发布文章页面接收参数判断（共用同一套表单）
 *  4.3 修改标题和按钮文字
 *  4.4 获取文章详情数据并回显表单
 */

/**
 * 目标5：编辑-保存文章
 *  5.1 判断按钮文字，区分业务（因为共用一套表单）
 *  5.2 调用编辑文章接口，保存信息到服务器
 *  5.3 基于 Alert 反馈结果消息给用户
 */

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

    ;(0,_auth_js__WEBPACK_IMPORTED_MODULE_3__.auth)();
    getChannelList()
    document.querySelector("form").addEventListener("submit", async function (e) {
      try {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", document.querySelector("input.img-file").files[0])
        const result = await (0,_request_js__WEBPACK_IMPORTED_MODULE_1__.axios)({
          url: "/v1_0/upload",
          method: "POST",
          data: formData
        })

        const data = {};
        console.dir(result)
        $(this).serializeArray().forEach(item => {
          data[item.name] = item.value
        })

        data.cover = {
          type: 1,
          images: [`${result.data.data.url}`]
        }

        console.log(data);

        const r = await (0,_request_js__WEBPACK_IMPORTED_MODULE_1__.axios)({
          url: "/v1_0/mp/articles",
          method: "POST",
          data
        })
        console.log(r)
        location.href = "./../content/"
      } catch (e) {
        myAlert(false, e.response.data.message)
      }
    })



function getChannelList() {
    ;(0,_request_js__WEBPACK_IMPORTED_MODULE_1__.axios)({
      url: "/v1_0/channels"
    }).then(r => {
      document.querySelector(".form-select#channel_id").innerHTML = '<option value="" selected>请选择文章频道</option>' + r.data.data.channels.map(item => {
        return ` <option value="${item.id}">${item.name}</option>`
      }).join("")
    })
  }
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcHVibGlzaC41ZWRlMzJkMjkzNzhlZTI1YjY1Mi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZCxXQUFXLEdBQUc7QUFDZDtBQUNBLENBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDOzs7Ozs7Ozs7Ozs7Ozs7O0FDbEJrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUksbURBQUs7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7OztBQzFCQTtBQUNBLGtCOzs7Ozs7Ozs7Ozs7Ozs7O0FDRDBCO0FBQ1o7QUFDZCw2Q0FBSztBQUNMLDZDQUFLO0FBQ0w7QUFDQTtBQUNBLGdEQUFnRCxNQUFNO0FBQ3REO0FBQ0E7QUFDQSxDQUFDOztBQUVELDZDQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCK0I7QUFDSTtBQUNGO0FBQ1M7QUFDSTs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFFBQVEsZ0RBQVc7QUFDbkIsT0FBTywrQ0FBVTtBQUNqQjtBQUNBLFNBQVMsK0NBQXFCO0FBQzlCLEdBQUc7QUFDSDs7QUFFQTtBQUNBLGlEQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsd0JBQXdCO0FBQ2xFLE1BQU07QUFDTjtBQUNBO0FBQ0EsK0NBQStDLHdCQUF3QjtBQUN2RTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFR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LGVBQWU7QUFDMUI7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZCxXQUFXLGVBQWU7QUFDMUI7QUFDQSxhQUFhLEdBQUc7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxHQUFHO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBLFFBQVEsVUFBVTs7QUFFbEI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZCxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFh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O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZCxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZCxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxjQUFjO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxXQUFXLGNBQWM7QUFDaEM7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7Ozs7Ozs7VUM3bkNGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUM1QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLGlDQUFpQyxXQUFXO1VBQzVDO1VBQ0EsRTs7O1VDUEE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQSxFOzs7VUNQQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLEdBQUc7VUFDSDtVQUNBO1VBQ0EsQ0FBQyxJOzs7VUNQRCx5Rjs7O1VDQUE7VUFDQTtVQUNBLHNEQUFzRCxpQkFBaUI7VUFDdkUsZ0RBQWdELGFBQWE7VUFDN0QsRTs7O1VDSkE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLDBHQUEwRyxzQ0FBc0M7VUFDaEosRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOb0I7QUFDYztBQUNKO0FBQ0Q7QUFDQTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLDhCQUE4Qjs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxJQUFJLCtDQUFJO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGtEQUFLO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxzQkFBc0IscUJBQXFCO0FBQzNDOztBQUVBOztBQUVBLHdCQUF3QixrREFBSztBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSzs7OztBQUlMO0FBQ0EsSUFBSSxtREFBSztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0Esa0NBQWtDLFFBQVEsSUFBSSxVQUFVO0FBQ3hELE9BQU87QUFDUCxLQUFLO0FBQ0wsRyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhZ2UvcHVibGlzaC9pbmRleC5jc3M/YzMxOSIsIndlYnBhY2s6Ly8vLi91dGlscy9hbGVydC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9hdXRoLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2VkaXRvci5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMvYWRhcHRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy9mZXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvc0Vycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvc0hlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9tZXJnZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWV0aG9kTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0Rm9ybURhdGFIZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL3RyYW5zaXRpb25hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2Vudi9kYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9BeGlvc1VSTFNlYXJjaFBhcmFtcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvSHR0cFN0YXR1c0NvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tcG9zZVNpZ25hbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2VzdGltYXRlRGF0YVVSTERlY29kZWRCeXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvZm9ybURhdGFUb0pTT04uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVVUkxGb3JQcm90b2NvbENoZWNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9udWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zYW5pdGl6ZUhlYWRlclZhbHVlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcGVlZG9tZXRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90aHJvdHRsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdG9VUkxFbmNvZGVkRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdHJhY2tTdHJlYW0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9CbG9iLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL0Zvcm1EYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL1VSTFNlYXJjaFBhcmFtcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9jb21tb24vdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL3NldCBhbm9ueW1vdXMgZGVmYXVsdCBleHBvcnQgbmFtZSIsIndlYnBhY2s6Ly8vLi9wYWdlL3B1Ymxpc2gvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8g5by556qX5o+S5Lu2XG4vLyDpnIDopoHlhYjlh4blpIcgYWxlcnQg5qC35byP55u45YWz55qEIERPTVxuLyoqXG4gKiBCUyDnmoQgQWxlcnQg6K2m5ZGK5qGG5Ye95pWw77yMMuenkuWQjuiHquWKqOa2iOWksVxuICogQHBhcmFtIHsqfSBpc1N1Y2Nlc3Mg5oiQ5YqfIHRydWXvvIzlpLHotKUgZmFsc2VcbiAqIEBwYXJhbSB7Kn0gbXNnIOaPkOekuua2iOaBr1xuICovXG4gZXhwb3J0IGZ1bmN0aW9uIG15QWxlcnQoaXNTdWNjZXNzLCBtc2cpIHtcbiAgY29uc3QgbXlBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydCcpXG4gIG15QWxlcnQuY2xhc3NMaXN0LmFkZChpc1N1Y2Nlc3MgPyAnYWxlcnQtc3VjY2VzcycgOiAnYWxlcnQtZGFuZ2VyJylcbiAgbXlBbGVydC5pbm5lckhUTUwgPSBtc2dcbiAgbXlBbGVydC5jbGFzc0xpc3QuYWRkKCdzaG93JylcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBteUFsZXJ0LmNsYXNzTGlzdC5yZW1vdmUoaXNTdWNjZXNzID8gJ2FsZXJ0LXN1Y2Nlc3MnIDogJ2FsZXJ0LWRhbmdlcicpXG4gICAgbXlBbGVydC5pbm5lckhUTUwgPSAnJ1xuICAgIG15QWxlcnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpXG4gIH0sIDIwMDApXG59IiwiaW1wb3J0IHtheGlvc30gZnJvbSBcIkAvcmVxdWVzdC5qc1wiXG5mdW5jdGlvbiBhdXRoKCkge1xuICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKSkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwibG9naW4uaHRtbFwiXG4gICAgfVxufVxuXG5mdW5jdGlvbiBzYXZlVG9rZW4odG9rZW4pIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRva2VuXCIsIEpTT04uc3RyaW5naWZ5KHRva2VuKSk7XG59XG5cbmxvZ291dCgpO1xuZnVuY3Rpb24gbG9nb3V0KCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucXVpdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInRva2VuXCIpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxuICAgIH0pXG59XG5nZXRQcm9maWxlKClcbmZ1bmN0aW9uIGdldFByb2ZpbGUoKSB7XG4gICAgYXhpb3Moe1xuICAgICAgICB1cmw6IFwiL3YxXzAvdXNlci9wcm9maWxlXCJcbiAgICB9KS50aGVuKHIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5pY2stbmFtZVwiKS5pbm5lckhUTUwgPSBcIuaYteensCBcIiArIHIuZGF0YS5kYXRhLm5hbWU7XG4gICAgfSlcbn1cbmV4cG9ydCB7YXV0aH0iLCIvLyDlr4zmlofmnKznvJbovpHlmahcbi8vIOWIm+W7uue8lui+keWZqOWHveaVsO+8jOWIm+W7uuW3peWFt+agj+WHveaVsCIsImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmV4cG9ydCB7YXhpb3N9XG5heGlvcy5kZWZhdWx0cy5iYXNlVVJMID0gXCJodHRwczovL2dlZWsuaXRoZWltYS5uZXQvXCI7XG5heGlvcy5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoY29uZmlnID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIikgPyBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIikpLnRva2VuIDogXCJcIjtcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFycyAke3Rva2VufWA7XG4gICAgfVxuICAgIHJldHVybiBjb25maWdcbn0pXG5cbmF4aW9zLmludGVyY2VwdG9ycy5yZXNwb25zZS51c2UobnVsbCwgZXJyb3IgPT4ge1xuICAgIGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKSAmJiB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ0b2tlblwiKTtcbiAgICAgICAgbXlBbGVydChmYWxzZSwgXCLouqvku73pqozor4HlpLHotKVcIilcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gXCIuLy4uL2xvZ2luL1wiXG4gICAgICAgIH0sIDIwMDApXG4gICAgfVxuICAgIHRocm93IGVycm9yXG59KSIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgaHR0cEFkYXB0ZXIgZnJvbSAnLi9odHRwLmpzJztcbmltcG9ydCB4aHJBZGFwdGVyIGZyb20gJy4veGhyLmpzJztcbmltcG9ydCAqIGFzIGZldGNoQWRhcHRlciBmcm9tICcuL2ZldGNoLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5cbi8qKlxuICogS25vd24gYWRhcHRlcnMgbWFwcGluZy5cbiAqIFByb3ZpZGVzIGVudmlyb25tZW50LXNwZWNpZmljIGFkYXB0ZXJzIGZvciBBeGlvczpcbiAqIC0gYGh0dHBgIGZvciBOb2RlLmpzXG4gKiAtIGB4aHJgIGZvciBicm93c2Vyc1xuICogLSBgZmV0Y2hgIGZvciBmZXRjaCBBUEktYmFzZWQgcmVxdWVzdHNcbiAqXG4gKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgRnVuY3Rpb258T2JqZWN0Pn1cbiAqL1xuY29uc3Qga25vd25BZGFwdGVycyA9IHtcbiAgaHR0cDogaHR0cEFkYXB0ZXIsXG4gIHhocjogeGhyQWRhcHRlcixcbiAgZmV0Y2g6IHtcbiAgICBnZXQ6IGZldGNoQWRhcHRlci5nZXRGZXRjaCxcbiAgfSxcbn07XG5cbi8vIEFzc2lnbiBhZGFwdGVyIG5hbWVzIGZvciBlYXNpZXIgZGVidWdnaW5nIGFuZCBpZGVudGlmaWNhdGlvblxudXRpbHMuZm9yRWFjaChrbm93bkFkYXB0ZXJzLCAoZm4sIHZhbHVlKSA9PiB7XG4gIGlmIChmbikge1xuICAgIHRyeSB7XG4gICAgICAvLyBOdWxsLXByb3RvIGRlc2NyaXB0b3JzIHNvIGEgcG9sbHV0ZWQgT2JqZWN0LnByb3RvdHlwZS5nZXQgY2Fubm90IHR1cm5cbiAgICAgIC8vIHRoZXNlIGRhdGEgZGVzY3JpcHRvcnMgaW50byBhY2Nlc3NvciBkZXNjcmlwdG9ycyBvbiB0aGUgd2F5IGluLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnbmFtZScsIHsgX19wcm90b19fOiBudWxsLCB2YWx1ZSB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnYWRhcHRlck5hbWUnLCB7IF9fcHJvdG9fXzogbnVsbCwgdmFsdWUgfSk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIFJlbmRlciBhIHJlamVjdGlvbiByZWFzb24gc3RyaW5nIGZvciB1bmtub3duIG9yIHVuc3VwcG9ydGVkIGFkYXB0ZXJzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlYXNvblxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuY29uc3QgcmVuZGVyUmVhc29uID0gKHJlYXNvbikgPT4gYC0gJHtyZWFzb259YDtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgYWRhcHRlciBpcyByZXNvbHZlZCAoZnVuY3Rpb24sIG51bGwsIG9yIGZhbHNlKVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb258bnVsbHxmYWxzZX0gYWRhcHRlclxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzUmVzb2x2ZWRIYW5kbGUgPSAoYWRhcHRlcikgPT5cbiAgdXRpbHMuaXNGdW5jdGlvbihhZGFwdGVyKSB8fCBhZGFwdGVyID09PSBudWxsIHx8IGFkYXB0ZXIgPT09IGZhbHNlO1xuXG4vKipcbiAqIEdldCB0aGUgZmlyc3Qgc3VpdGFibGUgYWRhcHRlciBmcm9tIHRoZSBwcm92aWRlZCBsaXN0LlxuICogVHJpZXMgZWFjaCBhZGFwdGVyIGluIG9yZGVyIHVudGlsIGEgc3VwcG9ydGVkIG9uZSBpcyBmb3VuZC5cbiAqIFRocm93cyBhbiBBeGlvc0Vycm9yIGlmIG5vIGFkYXB0ZXIgaXMgc3VpdGFibGUuXG4gKlxuICogQHBhcmFtIHtBcnJheTxzdHJpbmd8RnVuY3Rpb24+fHN0cmluZ3xGdW5jdGlvbn0gYWRhcHRlcnMgLSBBZGFwdGVyKHMpIGJ5IG5hbWUgb3IgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gQXhpb3MgcmVxdWVzdCBjb25maWd1cmF0aW9uXG4gKiBAdGhyb3dzIHtBeGlvc0Vycm9yfSBJZiBubyBzdWl0YWJsZSBhZGFwdGVyIGlzIGF2YWlsYWJsZVxuICogQHJldHVybnMge0Z1bmN0aW9ufSBUaGUgcmVzb2x2ZWQgYWRhcHRlciBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBnZXRBZGFwdGVyKGFkYXB0ZXJzLCBjb25maWcpIHtcbiAgYWRhcHRlcnMgPSB1dGlscy5pc0FycmF5KGFkYXB0ZXJzKSA/IGFkYXB0ZXJzIDogW2FkYXB0ZXJzXTtcblxuICBjb25zdCB7IGxlbmd0aCB9ID0gYWRhcHRlcnM7XG4gIGxldCBuYW1lT3JBZGFwdGVyO1xuICBsZXQgYWRhcHRlcjtcblxuICBjb25zdCByZWplY3RlZFJlYXNvbnMgPSB7fTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgbmFtZU9yQWRhcHRlciA9IGFkYXB0ZXJzW2ldO1xuICAgIGxldCBpZDtcblxuICAgIGFkYXB0ZXIgPSBuYW1lT3JBZGFwdGVyO1xuXG4gICAgaWYgKCFpc1Jlc29sdmVkSGFuZGxlKG5hbWVPckFkYXB0ZXIpKSB7XG4gICAgICBhZGFwdGVyID0ga25vd25BZGFwdGVyc1soaWQgPSBTdHJpbmcobmFtZU9yQWRhcHRlcikpLnRvTG93ZXJDYXNlKCldO1xuXG4gICAgICBpZiAoYWRhcHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBVbmtub3duIGFkYXB0ZXIgJyR7aWR9J2ApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhZGFwdGVyICYmICh1dGlscy5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IChhZGFwdGVyID0gYWRhcHRlci5nZXQoY29uZmlnKSkpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZWplY3RlZFJlYXNvbnNbaWQgfHwgJyMnICsgaV0gPSBhZGFwdGVyO1xuICB9XG5cbiAgaWYgKCFhZGFwdGVyKSB7XG4gICAgY29uc3QgcmVhc29ucyA9IE9iamVjdC5lbnRyaWVzKHJlamVjdGVkUmVhc29ucykubWFwKFxuICAgICAgKFtpZCwgc3RhdGVdKSA9PlxuICAgICAgICBgYWRhcHRlciAke2lkfSBgICtcbiAgICAgICAgKHN0YXRlID09PSBmYWxzZSA/ICdpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudCcgOiAnaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnVpbGQnKVxuICAgICk7XG5cbiAgICBsZXQgcyA9IGxlbmd0aFxuICAgICAgPyByZWFzb25zLmxlbmd0aCA+IDFcbiAgICAgICAgPyAnc2luY2UgOlxcbicgKyByZWFzb25zLm1hcChyZW5kZXJSZWFzb24pLmpvaW4oJ1xcbicpXG4gICAgICAgIDogJyAnICsgcmVuZGVyUmVhc29uKHJlYXNvbnNbMF0pXG4gICAgICA6ICdhcyBubyBhZGFwdGVyIHNwZWNpZmllZCc7XG5cbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgIGBUaGVyZSBpcyBubyBzdWl0YWJsZSBhZGFwdGVyIHRvIGRpc3BhdGNoIHRoZSByZXF1ZXN0IGAgKyBzLFxuICAgICAgQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlRcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbi8qKlxuICogRXhwb3J0cyBBeGlvcyBhZGFwdGVycyBhbmQgdXRpbGl0eSB0byByZXNvbHZlIGFuIGFkYXB0ZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogUmVzb2x2ZSBhbiBhZGFwdGVyIGZyb20gYSBsaXN0IG9mIGFkYXB0ZXIgbmFtZXMgb3IgZnVuY3Rpb25zLlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBnZXRBZGFwdGVyLFxuXG4gIC8qKlxuICAgKiBFeHBvc2VzIGFsbCBrbm93biBhZGFwdGVyc1xuICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgRnVuY3Rpb258T2JqZWN0Pn1cbiAgICovXG4gIGFkYXB0ZXJzOiBrbm93bkFkYXB0ZXJzLFxufTtcbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBjb21wb3NlU2lnbmFscyBmcm9tICcuLi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzJztcbmltcG9ydCB7IHRyYWNrU3RyZWFtIH0gZnJvbSAnLi4vaGVscGVycy90cmFja1N0cmVhbS5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCB7XG4gIHByb2dyZXNzRXZlbnRSZWR1Y2VyLFxuICBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yLFxuICBhc3luY0RlY29yYXRvcixcbn0gZnJvbSAnLi4vaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyc7XG5pbXBvcnQgcmVzb2x2ZUNvbmZpZyBmcm9tICcuLi9oZWxwZXJzL3Jlc29sdmVDb25maWcuanMnO1xuaW1wb3J0IHNldHRsZSBmcm9tICcuLi9jb3JlL3NldHRsZS5qcyc7XG5pbXBvcnQgZXN0aW1hdGVEYXRhVVJMRGVjb2RlZEJ5dGVzIGZyb20gJy4uL2hlbHBlcnMvZXN0aW1hdGVEYXRhVVJMRGVjb2RlZEJ5dGVzLmpzJztcbmltcG9ydCB7IFZFUlNJT04gfSBmcm9tICcuLi9lbnYvZGF0YS5qcyc7XG5pbXBvcnQgeyB0b0J5dGVTdHJpbmdIZWFkZXJPYmplY3QgfSBmcm9tICcuLi9oZWxwZXJzL3Nhbml0aXplSGVhZGVyVmFsdWUuanMnO1xuXG5jb25zdCBERUZBVUxUX0NIVU5LX1NJWkUgPSA2NCAqIDEwMjQ7XG5cbmNvbnN0IERFRkFVTFRfUkVRVUVTVF9PUFRJT05TID0ge1xuICBjYWNoZTogJ2RlZmF1bHQnLFxuICByZWRpcmVjdDogJ2ZvbGxvdycsXG4gIHJlZmVycmVyOiAnYWJvdXQ6Y2xpZW50JyxcbiAgcmVmZXJyZXJQb2xpY3k6ICcnLFxuICBtb2RlOiAnY29ycycsXG4gIGludGVncml0eTogJycsXG4gIGtlZXBhbGl2ZTogZmFsc2UsXG4gIHByaW9yaXR5OiAnYXV0bycsXG4gIHdpbmRvdzogbnVsbCxcbn07XG5cbmNvbnN0IHsgaXNGdW5jdGlvbiB9ID0gdXRpbHM7XG5cbi8qKlxuICogRW5jb2RlIGEgVVRGLTggc3RyaW5nIHRvIGEgTGF0aW4tMSBieXRlIHN0cmluZyBmb3IgdXNlIHdpdGggYnRvYSgpLlxuICogVGhpcyBpcyBhIG1vZGVybiByZXBsYWNlbWVudCBmb3IgdGhlIGRlcHJlY2F0ZWQgdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpIHBhdHRlcm4uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIGVuY29kZVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFVURi04IGJ5dGVzIGFzIGEgTGF0aW4tMSBzdHJpbmdcbiAqL1xuY29uc3QgZW5jb2RlVVRGOCA9IChzdHIpID0+XG4gIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoLyUoWzAtOUEtRl17Mn0pL2dpLCAoXywgaGV4KSA9PlxuICAgIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQoaGV4LCAxNikpXG4gICk7XG5cbi8vIE5vZGUncyBXSEFUV0cgVVJMIHBhcnNlciByZXR1cm5zIGB1c2VybmFtZWAgYW5kIGBwYXNzd29yZGAgcGVyY2VudC1lbmNvZGVkLlxuLy8gRGVjb2RlIGJlZm9yZSBjb21wb3NpbmcgdGhlIGBhdXRoYCBvcHRpb24gc28gY3JlZGVudGlhbHMgc3VjaCBhc1xuLy8gYG15JTQwZW1haWwuY29tOnBhc3NgIGFyZSBzZW50IGFzIGBteUBlbWFpbC5jb206cGFzc2AuIEZhbGxzIGJhY2sgdG8gdGhlXG4vLyBvcmlnaW5hbCB2YWx1ZSBmb3IgbWFsZm9ybWVkIGlucHV0IHNvIGEgYmFkIGVuY29kaW5nIG5ldmVyIHRocm93cy5cbmNvbnN0IGRlY29kZVVSSUNvbXBvbmVudFNhZmUgPSAodmFsdWUpID0+IHtcbiAgaWYgKCF1dGlscy5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufTtcblxuY29uc3QgdGVzdCA9IChmbiwgLi4uYXJncykgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiAhIWZuKC4uLmFyZ3MpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBtYXliZVdpdGhBdXRoQ3JlZGVudGlhbHMgPSAodXJsKSA9PiB7XG4gIGNvbnN0IHByb3RvY29sSW5kZXggPSB1cmwuaW5kZXhPZignOi8vJyk7XG4gIGxldCB1cmxUb0NoZWNrID0gdXJsO1xuICBpZiAocHJvdG9jb2xJbmRleCAhPT0gLTEpIHtcbiAgICB1cmxUb0NoZWNrID0gdXJsVG9DaGVjay5zbGljZShwcm90b2NvbEluZGV4ICsgMyk7XG4gIH1cbiAgcmV0dXJuIHVybFRvQ2hlY2suaW5jbHVkZXMoJ0AnKSB8fCB1cmxUb0NoZWNrLmluY2x1ZGVzKCc6Jyk7XG59O1xuXG5jb25zdCBmYWN0b3J5ID0gKGVudikgPT4ge1xuICBjb25zdCBnbG9iYWxPYmplY3QgPVxuICAgIHV0aWxzLmdsb2JhbCAhPT0gdW5kZWZpbmVkICYmIHV0aWxzLmdsb2JhbCAhPT0gbnVsbCA/IHV0aWxzLmdsb2JhbCA6IGdsb2JhbFRoaXM7XG4gIGNvbnN0IHsgUmVhZGFibGVTdHJlYW0sIFRleHRFbmNvZGVyIH0gPSBnbG9iYWxPYmplY3Q7XG5cbiAgZW52ID0gdXRpbHMubWVyZ2UuY2FsbChcbiAgICB7XG4gICAgICBza2lwVW5kZWZpbmVkOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgUmVxdWVzdDogZ2xvYmFsT2JqZWN0LlJlcXVlc3QsXG4gICAgICBSZXNwb25zZTogZ2xvYmFsT2JqZWN0LlJlc3BvbnNlLFxuICAgIH0sXG4gICAgZW52XG4gICk7XG5cbiAgY29uc3QgeyBmZXRjaDogZW52RmV0Y2gsIFJlcXVlc3QsIFJlc3BvbnNlIH0gPSBlbnY7XG4gIGNvbnN0IGlzRmV0Y2hTdXBwb3J0ZWQgPSBlbnZGZXRjaCA/IGlzRnVuY3Rpb24oZW52RmV0Y2gpIDogdHlwZW9mIGZldGNoID09PSAnZnVuY3Rpb24nO1xuICBjb25zdCBpc1JlcXVlc3RTdXBwb3J0ZWQgPSBpc0Z1bmN0aW9uKFJlcXVlc3QpO1xuICBjb25zdCBpc1Jlc3BvbnNlU3VwcG9ydGVkID0gaXNGdW5jdGlvbihSZXNwb25zZSk7XG5cbiAgaWYgKCFpc0ZldGNoU3VwcG9ydGVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgaXNGdW5jdGlvbihSZWFkYWJsZVN0cmVhbSk7XG5cbiAgY29uc3QgZW5jb2RlVGV4dCA9XG4gICAgaXNGZXRjaFN1cHBvcnRlZCAmJlxuICAgICh0eXBlb2YgVGV4dEVuY29kZXIgPT09ICdmdW5jdGlvbidcbiAgICAgID8gKFxuICAgICAgICAgIChlbmNvZGVyKSA9PiAoc3RyKSA9PlxuICAgICAgICAgICAgZW5jb2Rlci5lbmNvZGUoc3RyKVxuICAgICAgICApKG5ldyBUZXh0RW5jb2RlcigpKVxuICAgICAgOiBhc3luYyAoc3RyKSA9PiBuZXcgVWludDhBcnJheShhd2FpdCBuZXcgUmVxdWVzdChzdHIpLmFycmF5QnVmZmVyKCkpKTtcblxuICBjb25zdCBzdXBwb3J0c1JlcXVlc3RTdHJlYW0gPVxuICAgIGlzUmVxdWVzdFN1cHBvcnRlZCAmJlxuICAgIGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiZcbiAgICB0ZXN0KCgpID0+IHtcbiAgICAgIGxldCBkdXBsZXhBY2Nlc3NlZCA9IGZhbHNlO1xuXG4gICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QocGxhdGZvcm0ub3JpZ2luLCB7XG4gICAgICAgIGJvZHk6IG5ldyBSZWFkYWJsZVN0cmVhbSgpLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgZ2V0IGR1cGxleCgpIHtcbiAgICAgICAgICBkdXBsZXhBY2Nlc3NlZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuICdoYWxmJztcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBoYXNDb250ZW50VHlwZSA9IHJlcXVlc3QuaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpO1xuXG4gICAgICBpZiAocmVxdWVzdC5ib2R5ICE9IG51bGwpIHtcbiAgICAgICAgcmVxdWVzdC5ib2R5LmNhbmNlbCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHVwbGV4QWNjZXNzZWQgJiYgIWhhc0NvbnRlbnRUeXBlO1xuICAgIH0pO1xuXG4gIGNvbnN0IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gPVxuICAgIGlzUmVzcG9uc2VTdXBwb3J0ZWQgJiZcbiAgICBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmXG4gICAgdGVzdCgoKSA9PiB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKG5ldyBSZXNwb25zZSgnJykuYm9keSkpO1xuXG4gIGNvbnN0IHJlc29sdmVycyA9IHtcbiAgICBzdHJlYW06IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKChyZXMpID0+IHJlcy5ib2R5KSxcbiAgfTtcblxuICBpc0ZldGNoU3VwcG9ydGVkICYmXG4gICAgKCgpID0+IHtcbiAgICAgIFsndGV4dCcsICdhcnJheUJ1ZmZlcicsICdibG9iJywgJ2Zvcm1EYXRhJywgJ3N0cmVhbSddLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgICAgIXJlc29sdmVyc1t0eXBlXSAmJlxuICAgICAgICAgIChyZXNvbHZlcnNbdHlwZV0gPSAocmVzLCBjb25maWcpID0+IHtcbiAgICAgICAgICAgIGxldCBtZXRob2QgPSByZXMgJiYgcmVzW3R5cGVdO1xuXG4gICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgIHJldHVybiBtZXRob2QuY2FsbChyZXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAgICAgYFJlc3BvbnNlIHR5cGUgJyR7dHlwZX0nIGlzIG5vdCBzdXBwb3J0ZWRgLFxuICAgICAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9OT1RfU1VQUE9SVCxcbiAgICAgICAgICAgICAgY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSkoKTtcblxuICBjb25zdCBnZXRCb2R5TGVuZ3RoID0gYXN5bmMgKGJvZHkpID0+IHtcbiAgICBpZiAoYm9keSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNCbG9iKGJvZHkpKSB7XG4gICAgICByZXR1cm4gYm9keS5zaXplO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc1NwZWNDb21wbGlhbnRGb3JtKGJvZHkpKSB7XG4gICAgICBjb25zdCBfcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHBsYXRmb3JtLm9yaWdpbiwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIChhd2FpdCBfcmVxdWVzdC5hcnJheUJ1ZmZlcigpKS5ieXRlTGVuZ3RoO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhib2R5KSB8fCB1dGlscy5pc0FycmF5QnVmZmVyKGJvZHkpKSB7XG4gICAgICByZXR1cm4gYm9keS5ieXRlTGVuZ3RoO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhib2R5KSkge1xuICAgICAgYm9keSA9IGJvZHkgKyAnJztcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNTdHJpbmcoYm9keSkpIHtcbiAgICAgIHJldHVybiAoYXdhaXQgZW5jb2RlVGV4dChib2R5KSkuYnl0ZUxlbmd0aDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVzb2x2ZUJvZHlMZW5ndGggPSBhc3luYyAoaGVhZGVycywgYm9keSkgPT4ge1xuICAgIGNvbnN0IGxlbmd0aCA9IHV0aWxzLnRvRmluaXRlTnVtYmVyKGhlYWRlcnMuZ2V0Q29udGVudExlbmd0aCgpKTtcblxuICAgIHJldHVybiBsZW5ndGggPT0gbnVsbCA/IGdldEJvZHlMZW5ndGgoYm9keSkgOiBsZW5ndGg7XG4gIH07XG5cbiAgcmV0dXJuIGFzeW5jIChjb25maWcpID0+IHtcbiAgICBsZXQge1xuICAgICAgdXJsLFxuICAgICAgbWV0aG9kLFxuICAgICAgZGF0YSxcbiAgICAgIHNpZ25hbCxcbiAgICAgIGNhbmNlbFRva2VuLFxuICAgICAgdGltZW91dCxcbiAgICAgIG9uRG93bmxvYWRQcm9ncmVzcyxcbiAgICAgIG9uVXBsb2FkUHJvZ3Jlc3MsXG4gICAgICByZXNwb25zZVR5cGUsXG4gICAgICBoZWFkZXJzLFxuICAgICAgd2l0aENyZWRlbnRpYWxzID0gJ3NhbWUtb3JpZ2luJyxcbiAgICAgIGZldGNoT3B0aW9ucyxcbiAgICAgIG1heENvbnRlbnRMZW5ndGgsXG4gICAgICBtYXhCb2R5TGVuZ3RoLFxuICAgICAgbWF4UmVkaXJlY3RzLFxuICAgIH0gPSByZXNvbHZlQ29uZmlnKGNvbmZpZyk7XG5cbiAgICBjb25zdCBoYXNNYXhDb250ZW50TGVuZ3RoID0gdXRpbHMuaXNOdW1iZXIobWF4Q29udGVudExlbmd0aCkgJiYgbWF4Q29udGVudExlbmd0aCA+IC0xO1xuICAgIGNvbnN0IGhhc01heEJvZHlMZW5ndGggPSB1dGlscy5pc051bWJlcihtYXhCb2R5TGVuZ3RoKSAmJiBtYXhCb2R5TGVuZ3RoID4gLTE7XG4gICAgY29uc3Qgb3duID0gKGtleSkgPT4gKHV0aWxzLmhhc093blByb3AoY29uZmlnLCBrZXkpID8gY29uZmlnW2tleV0gOiB1bmRlZmluZWQpO1xuXG4gICAgbGV0IF9mZXRjaCA9IGVudkZldGNoIHx8IGZldGNoO1xuXG4gICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlID8gKHJlc3BvbnNlVHlwZSArICcnKS50b0xvd2VyQ2FzZSgpIDogJ3RleHQnO1xuXG4gICAgbGV0IGNvbXBvc2VkU2lnbmFsID0gY29tcG9zZVNpZ25hbHMoXG4gICAgICBbc2lnbmFsLCBjYW5jZWxUb2tlbiAmJiBjYW5jZWxUb2tlbi50b0Fib3J0U2lnbmFsKCldLFxuICAgICAgdGltZW91dFxuICAgICk7XG5cbiAgICBsZXQgcmVxdWVzdCA9IG51bGw7XG5cbiAgICBjb25zdCB1bnN1YnNjcmliZSA9XG4gICAgICBjb21wb3NlZFNpZ25hbCAmJlxuICAgICAgY29tcG9zZWRTaWduYWwudW5zdWJzY3JpYmUgJiZcbiAgICAgICgoKSA9PiB7XG4gICAgICAgIGNvbXBvc2VkU2lnbmFsLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9KTtcblxuICAgIGxldCByZXF1ZXN0Q29udGVudExlbmd0aDtcblxuICAgIC8vIEF4aW9zRXJyb3Igd2UgcmFpc2Ugd2hpbGUgdGhlIHJlcXVlc3QgYm9keSBpcyBiZWluZyBzdHJlYW1lZC4gQ2FwdHVyZWRcbiAgICAvLyBieSBpZGVudGl0eSBzbyB0aGUgY2F0Y2ggYmxvY2sgY2FuIHN1cmZhY2UgaXQgZGlyZWN0bHksIHJlZ2FyZGxlc3Mgb2ZcbiAgICAvLyBob3cgdGhlIHJ1bnRpbWUgd3JhcHMgdGhlIHJlc3VsdGluZyBmZXRjaCByZWplY3Rpb24gKHVuZGljaSBleHBvc2VzIGl0XG4gICAgLy8gYXMgYGVyci5jYXVzZWA7IHNvbWUgYnJvd3NlcnMgZHJvcCB0aGUgb3JpZ2luYWwgZXJyb3IgZW50aXJlbHkpLlxuICAgIGxldCBwZW5kaW5nQm9keUVycm9yID0gbnVsbDtcblxuICAgIGNvbnN0IG1heEJvZHlMZW5ndGhFcnJvciA9ICgpID0+XG4gICAgICBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgJ1JlcXVlc3QgYm9keSBsYXJnZXIgdGhhbiBtYXhCb2R5TGVuZ3RoIGxpbWl0JyxcbiAgICAgICAgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdFxuICAgICAgKTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgICBsZXQgYXV0aCA9IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IGNvbmZpZ0F1dGggPSBvd24oJ2F1dGgnKTtcblxuICAgICAgaWYgKGNvbmZpZ0F1dGgpIHtcbiAgICAgICAgY29uc3QgdXNlcm5hbWUgPSB1dGlscy5nZXRTYWZlUHJvcChjb25maWdBdXRoLCAndXNlcm5hbWUnKSB8fCAnJztcbiAgICAgICAgY29uc3QgcGFzc3dvcmQgPSB1dGlscy5nZXRTYWZlUHJvcChjb25maWdBdXRoLCAncGFzc3dvcmQnKSB8fCAnJztcbiAgICAgICAgYXV0aCA9IHtcbiAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1heWJlV2l0aEF1dGhDcmVkZW50aWFscyh1cmwpKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFVSTCA9IG5ldyBVUkwodXJsLCBwbGF0Zm9ybS5vcmlnaW4pO1xuXG4gICAgICAgIGlmICghYXV0aCAmJiAocGFyc2VkVVJMLnVzZXJuYW1lIHx8IHBhcnNlZFVSTC5wYXNzd29yZCkpIHtcbiAgICAgICAgICBjb25zdCB1cmxVc2VybmFtZSA9IGRlY29kZVVSSUNvbXBvbmVudFNhZmUocGFyc2VkVVJMLnVzZXJuYW1lKTtcbiAgICAgICAgICBjb25zdCB1cmxQYXNzd29yZCA9IGRlY29kZVVSSUNvbXBvbmVudFNhZmUocGFyc2VkVVJMLnBhc3N3b3JkKTtcbiAgICAgICAgICBhdXRoID0ge1xuICAgICAgICAgICAgdXNlcm5hbWU6IHVybFVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHVybFBhc3N3b3JkLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyc2VkVVJMLnVzZXJuYW1lIHx8IHBhcnNlZFVSTC5wYXNzd29yZCkge1xuICAgICAgICAgIHBhcnNlZFVSTC51c2VybmFtZSA9ICcnO1xuICAgICAgICAgIHBhcnNlZFVSTC5wYXNzd29yZCA9ICcnO1xuICAgICAgICAgIHVybCA9IHBhcnNlZFVSTC5ocmVmO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhdXRoKSB7XG4gICAgICAgIGhlYWRlcnMuZGVsZXRlKCdhdXRob3JpemF0aW9uJyk7XG4gICAgICAgIGhlYWRlcnMuc2V0KFxuICAgICAgICAgICdBdXRob3JpemF0aW9uJyxcbiAgICAgICAgICAnQmFzaWMgJyArIGJ0b2EoZW5jb2RlVVRGOCgoYXV0aC51c2VybmFtZSB8fCAnJykgKyAnOicgKyAoYXV0aC5wYXNzd29yZCB8fCAnJykpKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBFbmZvcmNlIG1heENvbnRlbnRMZW5ndGggZm9yIGRhdGE6IFVSTHMgdXAtZnJvbnQgc28gd2UgbmV2ZXIgbWF0ZXJpYWxpemVcbiAgICAgIC8vIGFuIG92ZXJzaXplZCBwYXlsb2FkLiBUaGUgSFRUUCBhZGFwdGVyIGFwcGxpZXMgdGhlIHNhbWUgY2hlY2sgKHNlZSBodHRwLmpzXG4gICAgICAvLyBcImlmIChwcm90b2NvbCA9PT0gJ2RhdGE6JylcIiBicmFuY2gpLlxuICAgICAgaWYgKGhhc01heENvbnRlbnRMZW5ndGggJiYgdHlwZW9mIHVybCA9PT0gJ3N0cmluZycgJiYgdXJsLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcbiAgICAgICAgY29uc3QgZXN0aW1hdGVkID0gZXN0aW1hdGVEYXRhVVJMRGVjb2RlZEJ5dGVzKHVybCk7XG4gICAgICAgIGlmIChlc3RpbWF0ZWQgPiBtYXhDb250ZW50TGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgICAnbWF4Q29udGVudExlbmd0aCBzaXplIG9mICcgKyBtYXhDb250ZW50TGVuZ3RoICsgJyBleGNlZWRlZCcsXG4gICAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsXG4gICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBFbmZvcmNlIG1heEJvZHlMZW5ndGggYWdhaW5zdCBrbm93bi1zaXplIGJvZGllcyBiZWZvcmUgZGlzcGF0Y2ggdXNpbmdcbiAgICAgIC8vIHRoZSBib2R5J3MgKmFjdHVhbCogc2l6ZSDigJQgbmV2ZXIgYSBjYWxsZXItZGVjbGFyZWQgQ29udGVudC1MZW5ndGgsXG4gICAgICAvLyB3aGljaCBjb3VsZCB1bmRlci1yZXBvcnQgdG8gc2xpcCBhbiBvdmVyc2l6ZWQgYm9keSBwYXN0IHRoZSBjaGVjay5cbiAgICAgIC8vIFVua25vd24tc2l6ZSBzdHJlYW1zIHJldHVybiB1bmRlZmluZWQgaGVyZSBhbmQgYXJlIGNvdW50ZWQgcGVyLWNodW5rXG4gICAgICAvLyBiZWxvdyBhcyBmZXRjaCBjb25zdW1lcyB0aGVtLlxuICAgICAgaWYgKGhhc01heEJvZHlMZW5ndGggJiYgbWV0aG9kICE9PSAnZ2V0JyAmJiBtZXRob2QgIT09ICdoZWFkJykge1xuICAgICAgICBjb25zdCBvdXRib3VuZExlbmd0aCA9IGF3YWl0IGdldEJvZHlMZW5ndGgoZGF0YSk7XG4gICAgICAgIGlmICh0eXBlb2Ygb3V0Ym91bmRMZW5ndGggPT09ICdudW1iZXInICYmIGlzRmluaXRlKG91dGJvdW5kTGVuZ3RoKSkge1xuICAgICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoID0gb3V0Ym91bmRMZW5ndGg7XG4gICAgICAgICAgaWYgKG91dGJvdW5kTGVuZ3RoID4gbWF4Qm9keUxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbWF4Qm9keUxlbmd0aEVycm9yKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEEgc3RyZWFtZWQgYm9keSB1bmRlciBtYXhCb2R5TGVuZ3RoIG11c3QgYmUgY291bnRlZCBhcyBmZXRjaCBjb25zdW1lc1xuICAgICAgLy8gaXQ7IGl0cyBzaXplIGlzIG5ldmVyIHRydXN0ZWQgZnJvbSBhIGNhbGxlci1kZWNsYXJlZCBDb250ZW50LUxlbmd0aC5cbiAgICAgIGNvbnN0IG11c3RFbmZvcmNlU3RyZWFtQm9keSA9XG4gICAgICAgIGhhc01heEJvZHlMZW5ndGggJiYgKHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSkgfHwgdXRpbHMuaXNTdHJlYW0oZGF0YSkpO1xuXG4gICAgICBjb25zdCB0cmFja1JlcXVlc3RTdHJlYW0gPSAoc3RyZWFtLCBvblByb2dyZXNzLCBmbHVzaCkgPT5cbiAgICAgICAgdHJhY2tTdHJlYW0oXG4gICAgICAgICAgc3RyZWFtLFxuICAgICAgICAgIERFRkFVTFRfQ0hVTktfU0laRSxcbiAgICAgICAgICAobG9hZGVkQnl0ZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChoYXNNYXhCb2R5TGVuZ3RoICYmIGxvYWRlZEJ5dGVzID4gbWF4Qm9keUxlbmd0aCkge1xuICAgICAgICAgICAgICB0aHJvdyAocGVuZGluZ0JvZHlFcnJvciA9IG1heEJvZHlMZW5ndGhFcnJvcigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uUHJvZ3Jlc3MgJiYgb25Qcm9ncmVzcyhsb2FkZWRCeXRlcyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmbHVzaFxuICAgICAgICApO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHN1cHBvcnRzUmVxdWVzdFN0cmVhbSAmJlxuICAgICAgICBtZXRob2QgIT09ICdnZXQnICYmXG4gICAgICAgIG1ldGhvZCAhPT0gJ2hlYWQnICYmXG4gICAgICAgIChvblVwbG9hZFByb2dyZXNzIHx8IG11c3RFbmZvcmNlU3RyZWFtQm9keSlcbiAgICAgICkge1xuICAgICAgICByZXF1ZXN0Q29udGVudExlbmd0aCA9XG4gICAgICAgICAgcmVxdWVzdENvbnRlbnRMZW5ndGggPT0gbnVsbFxuICAgICAgICAgICAgPyBhd2FpdCByZXNvbHZlQm9keUxlbmd0aChoZWFkZXJzLCBkYXRhKVxuICAgICAgICAgICAgOiByZXF1ZXN0Q29udGVudExlbmd0aDtcblxuICAgICAgICAvLyBBIGRlY2xhcmVkIGxlbmd0aCBvZiAwIGlzIG9ubHkgdHJ1c3RlZCB0byBza2lwIHRoZSB3cmFwIHdoZW4gd2UgYXJlXG4gICAgICAgIC8vIG5vdCBlbmZvcmNpbmcgYSBzdHJlYW0gbGltaXQgKHdoaWNoIG11c3Qgbm90IHJlbHkgb24gdGhhdCBoZWFkZXIpLlxuICAgICAgICBpZiAocmVxdWVzdENvbnRlbnRMZW5ndGggIT09IDAgfHwgbXVzdEVuZm9yY2VTdHJlYW1Cb2R5KSB7XG4gICAgICAgICAgbGV0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAgICAgICBkdXBsZXg6ICdoYWxmJyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGxldCBjb250ZW50VHlwZUhlYWRlcjtcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgJiZcbiAgICAgICAgICAgIChjb250ZW50VHlwZUhlYWRlciA9IF9yZXF1ZXN0LmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoY29udGVudFR5cGVIZWFkZXIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfcmVxdWVzdC5ib2R5KSB7XG4gICAgICAgICAgICBjb25zdCBbb25Qcm9ncmVzcywgZmx1c2hdID1cbiAgICAgICAgICAgICAgKG9uVXBsb2FkUHJvZ3Jlc3MgJiZcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yKFxuICAgICAgICAgICAgICAgICAgcmVxdWVzdENvbnRlbnRMZW5ndGgsXG4gICAgICAgICAgICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihhc3luY0RlY29yYXRvcihvblVwbG9hZFByb2dyZXNzKSlcbiAgICAgICAgICAgICAgICApKSB8fFxuICAgICAgICAgICAgICBbXTtcblxuICAgICAgICAgICAgZGF0YSA9IHRyYWNrUmVxdWVzdFN0cmVhbShfcmVxdWVzdC5ib2R5LCBvblByb2dyZXNzLCBmbHVzaCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBtdXN0RW5mb3JjZVN0cmVhbUJvZHkgJiZcbiAgICAgICAgIWlzUmVxdWVzdFN1cHBvcnRlZCAmJlxuICAgICAgICBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmXG4gICAgICAgIG1ldGhvZCAhPT0gJ2dldCcgJiZcbiAgICAgICAgbWV0aG9kICE9PSAnaGVhZCdcbiAgICAgICkge1xuICAgICAgICBkYXRhID0gdHJhY2tSZXF1ZXN0U3RyZWFtKGRhdGEpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgbXVzdEVuZm9yY2VTdHJlYW1Cb2R5ICYmXG4gICAgICAgIGlzUmVxdWVzdFN1cHBvcnRlZCAmJlxuICAgICAgICAhc3VwcG9ydHNSZXF1ZXN0U3RyZWFtICYmXG4gICAgICAgIG1ldGhvZCAhPT0gJ2dldCcgJiZcbiAgICAgICAgbWV0aG9kICE9PSAnaGVhZCdcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAnU3RyZWFtIHJlcXVlc3QgYm9kaWVzIGFyZSBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBjdXJyZW50IGZldGNoIGltcGxlbWVudGF0aW9uJyxcbiAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9OT1RfU1VQUE9SVCxcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgcmVxdWVzdFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXV0aWxzLmlzU3RyaW5nKHdpdGhDcmVkZW50aWFscykpIHtcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzID8gJ2luY2x1ZGUnIDogJ29taXQnO1xuICAgICAgfVxuXG4gICAgICAvLyBDbG91ZGZsYXJlIFdvcmtlcnMgdGhyb3dzIHdoZW4gY3JlZGVudGlhbHMgYXJlIGRlZmluZWRcbiAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vY2xvdWRmbGFyZS93b3JrZXJkL2lzc3Vlcy85MDJcbiAgICAgIGNvbnN0IGlzQ3JlZGVudGlhbHNTdXBwb3J0ZWQgPSBpc1JlcXVlc3RTdXBwb3J0ZWQgJiYgJ2NyZWRlbnRpYWxzJyBpbiBSZXF1ZXN0LnByb3RvdHlwZTtcblxuICAgICAgLy8gSWYgZGF0YSBpcyBGb3JtRGF0YSBhbmQgQ29udGVudC1UeXBlIGlzIG11bHRpcGFydC9mb3JtLWRhdGEgd2l0aG91dCBib3VuZGFyeSxcbiAgICAgIC8vIGRlbGV0ZSBpdCBzbyBmZXRjaCBjYW4gc2V0IGl0IGNvcnJlY3RseSB3aXRoIHRoZSBib3VuZGFyeVxuICAgICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkpIHtcbiAgICAgICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjb250ZW50VHlwZSAmJlxuICAgICAgICAgIC9ebXVsdGlwYXJ0XFwvZm9ybS1kYXRhL2kudGVzdChjb250ZW50VHlwZSkgJiZcbiAgICAgICAgICAhL2JvdW5kYXJ5PS9pLnRlc3QoY29udGVudFR5cGUpXG4gICAgICAgICkge1xuICAgICAgICAgIGhlYWRlcnMuZGVsZXRlKCdjb250ZW50LXR5cGUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBTZXQgVXNlci1BZ2VudCBoZWFkZXIgaWYgbm90IGFscmVhZHkgc2V0IChmZXRjaCBkZWZhdWx0cyB0byAnbm9kZScgaW4gTm9kZS5qcylcbiAgICAgIGhlYWRlcnMuc2V0KCdVc2VyLUFnZW50JywgJ2F4aW9zLycgKyBWRVJTSU9OLCBmYWxzZSk7XG5cbiAgICAgIGNvbnN0IHNhZmVGZXRjaE9wdGlvbnMgPVxuICAgICAgICBmZXRjaE9wdGlvbnMgPT0gbnVsbCA/IGZldGNoT3B0aW9ucyA6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShudWxsKSwgZmV0Y2hPcHRpb25zKTtcblxuICAgICAgaWYgKHNhZmVGZXRjaE9wdGlvbnMpIHtcbiAgICAgICAgLy8gVGhlc2Ugb3B0aW9ucyBhcmUgb3duZWQgYnkgQXhpb3MgYW5kIGFyZSBhbHJlYWR5IHJlZmxlY3RlZCBpbiB0aGVcbiAgICAgICAgLy8gcmVzb2x2ZWQgUmVxdWVzdCBwYXNzZWQgdG8gZmV0Y2guXG4gICAgICAgIGRlbGV0ZSBzYWZlRmV0Y2hPcHRpb25zLmJvZHk7XG4gICAgICAgIGRlbGV0ZSBzYWZlRmV0Y2hPcHRpb25zLmhlYWRlcnM7XG4gICAgICAgIGRlbGV0ZSBzYWZlRmV0Y2hPcHRpb25zLm1ldGhvZDtcbiAgICAgICAgZGVsZXRlIHNhZmVGZXRjaE9wdGlvbnMuc2lnbmFsO1xuICAgICAgICBkZWxldGUgc2FmZUZldGNoT3B0aW9ucy5kdXBsZXg7XG4gICAgICAgIGRlbGV0ZSBzYWZlRmV0Y2hPcHRpb25zLmNyZWRlbnRpYWxzO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXNvbHZlZE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUobnVsbCksIHNhZmVGZXRjaE9wdGlvbnMsIHtcbiAgICAgICAgc2lnbmFsOiBjb21wb3NlZFNpZ25hbCxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QudG9VcHBlckNhc2UoKSxcbiAgICAgICAgaGVhZGVyczogdG9CeXRlU3RyaW5nSGVhZGVyT2JqZWN0KGhlYWRlcnMubm9ybWFsaXplKCkpLFxuICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICBkdXBsZXg6ICdoYWxmJyxcbiAgICAgICAgY3JlZGVudGlhbHM6IGlzQ3JlZGVudGlhbHNTdXBwb3J0ZWQgPyB3aXRoQ3JlZGVudGlhbHMgOiB1bmRlZmluZWQsXG4gICAgICB9KTtcblxuICAgICAgaWYgKGlzUmVxdWVzdFN1cHBvcnRlZCkge1xuICAgICAgICB1dGlscy5mb3JFYWNoKERFRkFVTFRfUkVRVUVTVF9PUFRJT05TLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgIGlmIChyZXNvbHZlZE9wdGlvbnNba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXNvbHZlZE9wdGlvbnNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc29sdmVkT3B0aW9ucy5zaWduYWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlc29sdmVkT3B0aW9ucy5zaWduYWwgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc29sdmVkT3B0aW9ucy5ib2R5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXNvbHZlZE9wdGlvbnMuYm9keSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1heFJlZGlyZWN0cyA9PT0gMCkge1xuICAgICAgICByZXNvbHZlZE9wdGlvbnMucmVkaXJlY3QgPSAnbWFudWFsJztcblxuICAgICAgICBpZiAoc2FmZUZldGNoT3B0aW9ucykge1xuICAgICAgICAgIHNhZmVGZXRjaE9wdGlvbnMucmVkaXJlY3QgPSAnbWFudWFsJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXF1ZXN0ID0gaXNSZXF1ZXN0U3VwcG9ydGVkICYmIG5ldyBSZXF1ZXN0KHVybCwgcmVzb2x2ZWRPcHRpb25zKTtcblxuICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgKGlzUmVxdWVzdFN1cHBvcnRlZFxuICAgICAgICA/IF9mZXRjaChyZXF1ZXN0LCBzYWZlRmV0Y2hPcHRpb25zKVxuICAgICAgICA6IF9mZXRjaCh1cmwsIHJlc29sdmVkT3B0aW9ucykpO1xuXG4gICAgICBjb25zdCByZXNwb25zZUhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShyZXNwb25zZS5oZWFkZXJzKTtcblxuICAgICAgLy8gQ2hlYXAgcHJlLWNoZWNrOiBpZiB0aGUgc2VydmVyIGhvbmVzdGx5IGRlY2xhcmVzIGEgY29udGVudC1sZW5ndGggdGhhdFxuICAgICAgLy8gYWxyZWFkeSBleGNlZWRzIHRoZSBjYXAsIHJlamVjdCBiZWZvcmUgd2Ugc3RhcnQgc3RyZWFtaW5nLlxuICAgICAgaWYgKGhhc01heENvbnRlbnRMZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZGVjbGFyZWRMZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihyZXNwb25zZUhlYWRlcnMuZ2V0Q29udGVudExlbmd0aCgpKTtcbiAgICAgICAgaWYgKGRlY2xhcmVkTGVuZ3RoICE9IG51bGwgJiYgZGVjbGFyZWRMZW5ndGggPiBtYXhDb250ZW50TGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgICAnbWF4Q29udGVudExlbmd0aCBzaXplIG9mICcgKyBtYXhDb250ZW50TGVuZ3RoICsgJyBleGNlZWRlZCcsXG4gICAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsXG4gICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpc1N0cmVhbVJlc3BvbnNlID1cbiAgICAgICAgc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAocmVzcG9uc2VUeXBlID09PSAnc3RyZWFtJyB8fCByZXNwb25zZVR5cGUgPT09ICdyZXNwb25zZScpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiZcbiAgICAgICAgcmVzcG9uc2UuYm9keSAmJlxuICAgICAgICAob25Eb3dubG9hZFByb2dyZXNzIHx8IGhhc01heENvbnRlbnRMZW5ndGggfHwgKGlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUpKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcblxuICAgICAgICBbJ3N0YXR1cycsICdzdGF0dXNUZXh0JywgJ2hlYWRlcnMnXS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgICAgb3B0aW9uc1twcm9wXSA9IHJlc3BvbnNlW3Byb3BdO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZXNwb25zZUNvbnRlbnRMZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihyZXNwb25zZUhlYWRlcnMuZ2V0Q29udGVudExlbmd0aCgpKTtcblxuICAgICAgICBjb25zdCBbb25Qcm9ncmVzcywgZmx1c2hdID1cbiAgICAgICAgICAob25Eb3dubG9hZFByb2dyZXNzICYmXG4gICAgICAgICAgICBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yKFxuICAgICAgICAgICAgICByZXNwb25zZUNvbnRlbnRMZW5ndGgsXG4gICAgICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGFzeW5jRGVjb3JhdG9yKG9uRG93bmxvYWRQcm9ncmVzcyksIHRydWUpXG4gICAgICAgICAgICApKSB8fFxuICAgICAgICAgIFtdO1xuXG4gICAgICAgIGxldCBieXRlc1JlYWQgPSAwO1xuICAgICAgICBjb25zdCBvbkNodW5rUHJvZ3Jlc3MgPSAobG9hZGVkQnl0ZXMpID0+IHtcbiAgICAgICAgICBpZiAoaGFzTWF4Q29udGVudExlbmd0aCkge1xuICAgICAgICAgICAgYnl0ZXNSZWFkID0gbG9hZGVkQnl0ZXM7XG4gICAgICAgICAgICBpZiAoYnl0ZXNSZWFkID4gbWF4Q29udGVudExlbmd0aCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAgICAgICAnbWF4Q29udGVudExlbmd0aCBzaXplIG9mICcgKyBtYXhDb250ZW50TGVuZ3RoICsgJyBleGNlZWRlZCcsXG4gICAgICAgICAgICAgICAgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLFxuICAgICAgICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIG9uUHJvZ3Jlc3MgJiYgb25Qcm9ncmVzcyhsb2FkZWRCeXRlcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoXG4gICAgICAgICAgdHJhY2tTdHJlYW0ocmVzcG9uc2UuYm9keSwgREVGQVVMVF9DSFVOS19TSVpFLCBvbkNodW5rUHJvZ3Jlc3MsICgpID0+IHtcbiAgICAgICAgICAgIGZsdXNoICYmIGZsdXNoKCk7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSAmJiB1bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlIHx8ICd0ZXh0JztcblxuICAgICAgbGV0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc29sdmVyc1t1dGlscy5maW5kS2V5KHJlc29sdmVycywgcmVzcG9uc2VUeXBlKSB8fCAndGV4dCddKFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICAgY29uZmlnXG4gICAgICApO1xuXG4gICAgICAvLyBGYWxsYmFjayBlbmZvcmNlbWVudCBmb3IgZW52aXJvbm1lbnRzIHdpdGhvdXQgUmVhZGFibGVTdHJlYW0gc3VwcG9ydFxuICAgICAgLy8gKGxlZ2FjeSBydW50aW1lcykuIERldGVjdCBtYXRlcmlhbGl6ZWQgc2l6ZSBmcm9tIHR5cGVkIG91dHB1dDsgc2tpcFxuICAgICAgLy8gc3RyZWFtcy9SZXNwb25zZSBwYXNzdGhyb3VnaCBzaW5jZSB0aGUgdXNlciB3aWxsIHJlYWQgdGhvc2UgdGhlbXNlbHZlcy5cbiAgICAgIGlmIChoYXNNYXhDb250ZW50TGVuZ3RoICYmICFzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmICFpc1N0cmVhbVJlc3BvbnNlKSB7XG4gICAgICAgIGxldCBtYXRlcmlhbGl6ZWRTaXplO1xuICAgICAgICBpZiAocmVzcG9uc2VEYXRhICE9IG51bGwpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlRGF0YS5ieXRlTGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgbWF0ZXJpYWxpemVkU2l6ZSA9IHJlc3BvbnNlRGF0YS5ieXRlTGVuZ3RoO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlc3BvbnNlRGF0YS5zaXplID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgbWF0ZXJpYWxpemVkU2l6ZSA9IHJlc3BvbnNlRGF0YS5zaXplO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlc3BvbnNlRGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG1hdGVyaWFsaXplZFNpemUgPVxuICAgICAgICAgICAgICB0eXBlb2YgVGV4dEVuY29kZXIgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICA/IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShyZXNwb25zZURhdGEpLmJ5dGVMZW5ndGhcbiAgICAgICAgICAgICAgICA6IHJlc3BvbnNlRGF0YS5sZW5ndGg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbWF0ZXJpYWxpemVkU2l6ZSA9PT0gJ251bWJlcicgJiYgbWF0ZXJpYWxpemVkU2l6ZSA+IG1heENvbnRlbnRMZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAgICdtYXhDb250ZW50TGVuZ3RoIHNpemUgb2YgJyArIG1heENvbnRlbnRMZW5ndGggKyAnIGV4Y2VlZGVkJyxcbiAgICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSxcbiAgICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICFpc1N0cmVhbVJlc3BvbnNlICYmIHVuc3Vic2NyaWJlICYmIHVuc3Vic2NyaWJlKCk7XG5cbiAgICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHtcbiAgICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgICAgaGVhZGVyczogQXhpb3NIZWFkZXJzLmZyb20ocmVzcG9uc2UuaGVhZGVycyksXG4gICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHVuc3Vic2NyaWJlICYmIHVuc3Vic2NyaWJlKCk7XG5cbiAgICAgIC8vIFNhZmFyaSBjYW4gc3VyZmFjZSBmZXRjaCBhYm9ydHMgYXMgYSBET01FeGNlcHRpb24tbGlrZSBvYmplY3Qgd2hvc2VcbiAgICAgIC8vIGJyYW5kZWQgZ2V0dGVycyB0aHJvdy4gUHJlZmVyIG91ciBjb21wb3NlZCBzaWduYWwgcmVhc29uIGJlZm9yZSByZWFkaW5nXG4gICAgICAvLyB0aGUgY2F1Z2h0IGVycm9yLCBwcmVzZXJ2aW5nIHRpbWVvdXQgdnMgY2FuY2VsbGF0aW9uIHNlbWFudGljcy5cbiAgICAgIGlmIChjb21wb3NlZFNpZ25hbCAmJiBjb21wb3NlZFNpZ25hbC5hYm9ydGVkICYmIGNvbXBvc2VkU2lnbmFsLnJlYXNvbiBpbnN0YW5jZW9mIEF4aW9zRXJyb3IpIHtcbiAgICAgICAgY29uc3QgY2FuY2VsZWRFcnJvciA9IGNvbXBvc2VkU2lnbmFsLnJlYXNvbjtcbiAgICAgICAgY2FuY2VsZWRFcnJvci5jb25maWcgPSBjb25maWc7XG4gICAgICAgIHJlcXVlc3QgJiYgKGNhbmNlbGVkRXJyb3IucmVxdWVzdCA9IHJlcXVlc3QpO1xuICAgICAgICBpZiAoZXJyICE9PSBjYW5jZWxlZEVycm9yKSB7XG4gICAgICAgICAgLy8gTm9uLWVudW1lcmFibGUgdG8gbWF0Y2ggbmF0aXZlIEVycm9yIGBjYXVzZWAgc2VtYW50aWNzIHNvIGxvZ2dlcnNcbiAgICAgICAgICAvLyBkb24ndCByZWN1cnNlIGludG8gY2lyY3VsYXIgZmV0Y2ggaW50ZXJuYWxzIChzZWUgIzcyMDUpLlxuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYW5jZWxlZEVycm9yLCAnY2F1c2UnLCB7XG4gICAgICAgICAgICBfX3Byb3RvX186IG51bGwsXG4gICAgICAgICAgICB2YWx1ZTogZXJyLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBjYW5jZWxlZEVycm9yO1xuICAgICAgfVxuXG4gICAgICAvLyBTdXJmYWNlIGEgbWF4Qm9keUxlbmd0aCB2aW9sYXRpb24gd2UgcmFpc2VkIHdoaWxlIHRoZSByZXF1ZXN0IGJvZHkgd2FzXG4gICAgICAvLyBiZWluZyBzdHJlYW1lZC4gTWF0Y2hpbmcgYnkgaWRlbnRpdHkgKHJhdGhlciB0aGFuIHJlYWRpbmdcbiAgICAgIC8vIGBlcnIuY2F1c2UuaXNBeGlvc0Vycm9yYCkga2VlcHMgdGhlIGVycm9yIGRldGVybWluaXN0aWMgYWNyb3NzIHJ1bnRpbWVzXG4gICAgICAvLyBhbmQgYXZvaWRzIGJvdGggcHJvdG90eXBlLXBvbGx1dGlvbiByZWFkcyBhbmQgbWlzLWF0dHJpYnV0aW5nIGEgZm9yZWlnblxuICAgICAgLy8gQXhpb3NFcnJvciB0aGF0IG1lcmVseSBoYXBwZW5lZCB0byBsYW5kIGluIGBlcnIuY2F1c2VgLlxuICAgICAgaWYgKHBlbmRpbmdCb2R5RXJyb3IpIHtcbiAgICAgICAgcmVxdWVzdCAmJiAhcGVuZGluZ0JvZHlFcnJvci5yZXF1ZXN0ICYmIChwZW5kaW5nQm9keUVycm9yLnJlcXVlc3QgPSByZXF1ZXN0KTtcbiAgICAgICAgdGhyb3cgcGVuZGluZ0JvZHlFcnJvcjtcbiAgICAgIH1cblxuICAgICAgLy8gUmUtdGhyb3cgQXhpb3NFcnJvcnMgd2UgcmFpc2VkIHN5bmNocm9ub3VzbHkgKGRhdGE6IFVSTCAvIGNvbnRlbnQtbGVuZ3RoXG4gICAgICAvLyBwcmUtY2hlY2tzLCByZXNwb25zZSBzaXplIGVuZm9yY2VtZW50KSB3aXRob3V0IHJlLXdyYXBwaW5nIHRoZW0uXG4gICAgICBpZiAoZXJyIGluc3RhbmNlb2YgQXhpb3NFcnJvcikge1xuICAgICAgICByZXF1ZXN0ICYmICFlcnIucmVxdWVzdCAmJiAoZXJyLnJlcXVlc3QgPSByZXF1ZXN0KTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXJyICYmIGVyci5uYW1lID09PSAnVHlwZUVycm9yJyAmJiAvTG9hZCBmYWlsZWR8ZmV0Y2gvaS50ZXN0KGVyci5tZXNzYWdlKSkge1xuICAgICAgICBjb25zdCBuZXR3b3JrRXJyb3IgPSBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAnTmV0d29yayBFcnJvcicsXG4gICAgICAgICAgQXhpb3NFcnJvci5FUlJfTkVUV09SSyxcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICBlcnIgJiYgZXJyLnJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICAgIC8vIE5vbi1lbnVtZXJhYmxlIHRvIG1hdGNoIG5hdGl2ZSBFcnJvciBgY2F1c2VgIHNlbWFudGljcyBzbyBsb2dnZXJzXG4gICAgICAgIC8vIGRvbid0IHJlY3Vyc2UgaW50byBjaXJjdWxhciBmZXRjaCBpbnRlcm5hbHMgKHNlZSAjNzIwNSkuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXR3b3JrRXJyb3IsICdjYXVzZScsIHtcbiAgICAgICAgICBfX3Byb3RvX186IG51bGwsXG4gICAgICAgICAgdmFsdWU6IGVyci5jYXVzZSB8fCBlcnIsXG4gICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhyb3cgbmV0d29ya0Vycm9yO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZXJyLCBlcnIgJiYgZXJyLmNvZGUsIGNvbmZpZywgcmVxdWVzdCwgZXJyICYmIGVyci5yZXNwb25zZSk7XG4gICAgfVxuICB9O1xufTtcblxuY29uc3Qgc2VlZENhY2hlID0gbmV3IE1hcCgpO1xuXG5leHBvcnQgY29uc3QgZ2V0RmV0Y2ggPSAoY29uZmlnKSA9PiB7XG4gIGxldCBlbnYgPSAoY29uZmlnICYmIGNvbmZpZy5lbnYpIHx8IHt9O1xuICBjb25zdCB7IGZldGNoLCBSZXF1ZXN0LCBSZXNwb25zZSB9ID0gZW52O1xuICBjb25zdCBzZWVkcyA9IFtSZXF1ZXN0LCBSZXNwb25zZSwgZmV0Y2hdO1xuXG4gIGxldCBsZW4gPSBzZWVkcy5sZW5ndGgsXG4gICAgaSA9IGxlbixcbiAgICBzZWVkLFxuICAgIHRhcmdldCxcbiAgICBtYXAgPSBzZWVkQ2FjaGU7XG5cbiAgd2hpbGUgKGktLSkge1xuICAgIHNlZWQgPSBzZWVkc1tpXTtcbiAgICB0YXJnZXQgPSBtYXAuZ2V0KHNlZWQpO1xuXG4gICAgdGFyZ2V0ID09PSB1bmRlZmluZWQgJiYgbWFwLnNldChzZWVkLCAodGFyZ2V0ID0gaSA/IG5ldyBNYXAoKSA6IGZhY3RvcnkoZW52KSkpO1xuXG4gICAgbWFwID0gdGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbmNvbnN0IGFkYXB0ZXIgPSBnZXRGZXRjaCgpO1xuXG5leHBvcnQgZGVmYXVsdCBhZGFwdGVyO1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBzZXR0bGUgZnJvbSAnLi4vY29yZS9zZXR0bGUuanMnO1xuaW1wb3J0IHRyYW5zaXRpb25hbERlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IG5vcm1hbGl6ZVVSTEZvclByb3RvY29sQ2hlY2sgZnJvbSAnLi4vaGVscGVycy9ub3JtYWxpemVVUkxGb3JQcm90b2NvbENoZWNrLmpzJztcbmltcG9ydCBwYXJzZVByb3RvY29sIGZyb20gJy4uL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgeyBwcm9ncmVzc0V2ZW50UmVkdWNlciB9IGZyb20gJy4uL2hlbHBlcnMvcHJvZ3Jlc3NFdmVudFJlZHVjZXIuanMnO1xuaW1wb3J0IHJlc29sdmVDb25maWcgZnJvbSAnLi4vaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzJztcbmltcG9ydCB7IHRvQnl0ZVN0cmluZ0hlYWRlck9iamVjdCB9IGZyb20gJy4uL2hlbHBlcnMvc2FuaXRpemVIZWFkZXJWYWx1ZS5qcyc7XG5cbmNvbnN0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCA9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCAmJlxuICBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGNvbnN0IF9jb25maWcgPSByZXNvbHZlQ29uZmlnKGNvbmZpZyk7XG4gICAgICBsZXQgcmVxdWVzdERhdGEgPSBfY29uZmlnLmRhdGE7XG4gICAgICBjb25zdCByZXF1ZXN0SGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKF9jb25maWcuaGVhZGVycykubm9ybWFsaXplKCk7XG4gICAgICBsZXQgeyByZXNwb25zZVR5cGUsIG9uVXBsb2FkUHJvZ3Jlc3MsIG9uRG93bmxvYWRQcm9ncmVzcyB9ID0gX2NvbmZpZztcbiAgICAgIGxldCBvbkNhbmNlbGVkO1xuICAgICAgbGV0IHVwbG9hZFRocm90dGxlZCwgZG93bmxvYWRUaHJvdHRsZWQ7XG4gICAgICBsZXQgZmx1c2hVcGxvYWQsIGZsdXNoRG93bmxvYWQsIGZsdXNoRG93bmxvYWRXaXRoRXZlbnQ7XG5cbiAgICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICAgIGZsdXNoVXBsb2FkICYmIGZsdXNoVXBsb2FkKCk7IC8vIGZsdXNoIGV2ZW50c1xuICAgICAgICBmbHVzaERvd25sb2FkICYmIGZsdXNoRG93bmxvYWQoKTsgLy8gZmx1c2ggZXZlbnRzXG5cbiAgICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuXG4gICAgICAgIF9jb25maWcuc2lnbmFsICYmIF9jb25maWcuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG5cbiAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIHJlcXVlc3Qub3BlbihfY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBfY29uZmlnLnVybCwgdHJ1ZSk7XG5cbiAgICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgICByZXF1ZXN0LnRpbWVvdXQgPSBfY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAgIGZ1bmN0aW9uIG9ubG9hZGVuZChldmVudCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdGF0dXMgMCBtZWFucyBubyByZXNwb25zZSB3YXMgcmVjZWl2ZWQsIHdoaWNoIG9uZXJyb3IgYW5kIG9uYWJvcnQgbm9ybWFsbHlcbiAgICAgICAgLy8gcmVqZWN0IGJlZm9yZSB0aGlzIHJ1bnMuIEZpcmVmb3ggMTUyIGZpcmVzIG9ubHkgcmVhZHlzdGF0ZWNoYW5nZSBhbmQgbG9hZGVuZCBmb3JcbiAgICAgICAgLy8gbmF2aWdhdGlvbi1jYW5jZWxlZCByZXF1ZXN0cyAoaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTUwNTM4OSksXG4gICAgICAgIC8vIGxlYXZpbmcgc2V0dGxlKCkgdG8gcmVzb2x2ZSB0aGVtIGFzIGFuIGVtcHR5IHN1Y2Nlc3MuIEVDT05OQUJPUlRFRCBpcyB0aGUgZXJyb3JcbiAgICAgICAgLy8gb25hYm9ydCByYWlzZWQgb24gRmlyZWZveCAxNTEuIFJlYWRzIG92ZXIgZmlsZTosIHdoaWNoIHNvbWUgZW52aXJvbm1lbnRzIHJlcG9ydCBhc1xuICAgICAgICAvLyBzdGF0dXMgMCBvbiBzdWNjZXNzLCBhcmUgZXhjbHVkZWQgYnkgdGhlIHJlcXVlc3QgVVJMJ3Mgc2NoZW1lIGFmdGVyIGJyb3dzZXItc3R5bGVcbiAgICAgICAgLy8gcHJlcHJvY2Vzc2luZywgYnkgdGhlIHBhZ2Ugb3JpZ2luJ3Mgc2NoZW1lIGZvciByZWxhdGl2ZSBVUkxzICh3aGljaCBpbmhlcml0IGl0KSwgb3JcbiAgICAgICAgLy8gYnkgcmVzcG9uc2VVUkwgd2hlcmUgaW1wbGVtZW50ZWQuXG4gICAgICAgIGlmIChcbiAgICAgICAgICByZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJlxuICAgICAgICAgIChwYXJzZVByb3RvY29sKG5vcm1hbGl6ZVVSTEZvclByb3RvY29sQ2hlY2soX2NvbmZpZy51cmwpKSB8fFxuICAgICAgICAgICAgcGFyc2VQcm90b2NvbChwbGF0Zm9ybS5vcmlnaW4pKSAhPT0gJ2ZpbGUnICYmXG4gICAgICAgICAgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuc3RhcnRzV2l0aCgnZmlsZTonKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCwgY29uZmlnLCByZXF1ZXN0KSk7XG4gICAgICAgICAgZG9uZSgpO1xuXG4gICAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdoZW4gbG9hZGVuZCBpcyBzdGlsbCBkaXNwYXRjaGluZywgZmx1c2hpbmcgd2l0aCBpdCBnaXZlcyBwcm9ncmVzc1xuICAgICAgICAvLyBsaXN0ZW5lcnMgYSBmaW5hbCBkZWxpdmVyeSB3aG9zZSBldmVudCBoYXMgYSBsaXZlIHRhcmdldC4gVGhlIGxlZ2FjeVxuICAgICAgICAvLyByZWFkeS1zdGF0ZSBmYWxsYmFjayBoYXMgbm8gZXZlbnQsIHNvIHJlcGxheSBpdHMgcGVuZGluZyBwcm9ncmVzcy5cbiAgICAgICAgLy8gQSB0aHJvd2luZyBsaXN0ZW5lciBtdXN0IG5vdCBibG9jayBzZXR0bGVtZW50OyByZXRocm93IGFzeW5jaHJvbm91c2x5LFxuICAgICAgICAvLyBtYXRjaGluZyBob3cgbGlzdGVuZXIgZXJyb3JzIHN1cmZhY2Ugb24gdGhlIHRocm90dGxlIHRpbWVyIHBhdGguXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBmbHVzaERvd25sb2FkV2l0aEV2ZW50ICYmIGZsdXNoRG93bmxvYWRXaXRoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmbHVzaERvd25sb2FkICYmIGZsdXNoRG93bmxvYWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQSBmaW5hbCBwcm9ncmVzcyBjYWxsYmFjayBjYW4gY2FuY2VsIHRoZSByZXF1ZXN0IHN5bmNocm9ub3VzbHkuXG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlSGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKFxuICAgICAgICAgICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgJiYgcmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCByZXNwb25zZURhdGEgPVxuICAgICAgICAgICFyZXNwb25zZVR5cGUgfHwgcmVzcG9uc2VUeXBlID09PSAndGV4dCcgfHwgcmVzcG9uc2VUeXBlID09PSAnanNvbidcbiAgICAgICAgICAgID8gcmVxdWVzdC5yZXNwb25zZVRleHRcbiAgICAgICAgICAgIDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgfTtcblxuICAgICAgICBzZXR0bGUoXG4gICAgICAgICAgZnVuY3Rpb24gX3Jlc29sdmUodmFsdWUpIHtcbiAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZnVuY3Rpb24gX3JlamVjdChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzcG9uc2VcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoJ29ubG9hZGVuZCcgaW4gcmVxdWVzdCkge1xuICAgICAgICAvLyBVc2Ugb25sb2FkZW5kIGlmIGF2YWlsYWJsZVxuICAgICAgICByZXF1ZXN0Lm9ubG9hZGVuZCA9IG9ubG9hZGVuZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGUgdG8gZW11bGF0ZSBvbmxvYWRlbmRcbiAgICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHJlcXVlc3Quc3RhdHVzID09PSAwICYmXG4gICAgICAgICAgICAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5zdGFydHNXaXRoKCdmaWxlOicpKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZWFkeXN0YXRlIGhhbmRsZXIgaXMgY2FsbGluZyBiZWZvcmUgb25lcnJvciBvciBvbnRpbWVvdXQgaGFuZGxlcnMsXG4gICAgICAgICAgLy8gc28gd2Ugc2hvdWxkIGNhbGwgb25sb2FkZW5kIG9uIHRoZSBuZXh0ICd0aWNrJ1xuICAgICAgICAgIHNldFRpbWVvdXQob25sb2FkZW5kKTtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsIGNvbmZpZywgcmVxdWVzdCkpO1xuICAgICAgICBkb25lKCk7XG5cbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKGV2ZW50KSB7XG4gICAgICAgIC8vIEJyb3dzZXJzIGRlbGl2ZXIgYSBQcm9ncmVzc0V2ZW50IGluIFhIUiBvbmVycm9yXG4gICAgICAgIC8vIChtZXNzYWdlIG1heSBiZSBlbXB0eTsgd2hlbiBwcmVzZW50LCBzdXJmYWNlIGl0KVxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZG9jcy9XZWIvQVBJL1hNTEh0dHBSZXF1ZXN0L2Vycm9yX2V2ZW50XG4gICAgICAgIGNvbnN0IG1zZyA9IGV2ZW50ICYmIGV2ZW50Lm1lc3NhZ2UgPyBldmVudC5tZXNzYWdlIDogJ05ldHdvcmsgRXJyb3InO1xuICAgICAgICBjb25zdCBlcnIgPSBuZXcgQXhpb3NFcnJvcihtc2csIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCk7XG4gICAgICAgIC8vIGF0dGFjaCB0aGUgdW5kZXJseWluZyBldmVudCBmb3IgY29uc3VtZXJzIHdobyB3YW50IGRldGFpbHNcbiAgICAgICAgZXJyLmV2ZW50ID0gZXZlbnQgfHwgbnVsbDtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgICBsZXQgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dFxuICAgICAgICAgID8gJ3RpbWVvdXQgb2YgJyArIF9jb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCdcbiAgICAgICAgICA6ICd0aW1lb3V0IGV4Y2VlZGVkJztcbiAgICAgICAgY29uc3QgdHJhbnNpdGlvbmFsID0gX2NvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICAgIGlmIChfY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdChcbiAgICAgICAgICBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgICAgICB0cmFuc2l0aW9uYWwuY2xhcmlmeVRpbWVvdXRFcnJvciA/IEF4aW9zRXJyb3IuRVRJTUVET1VUIDogQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsXG4gICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICBkb25lKCk7XG5cbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgIHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQgJiYgcmVxdWVzdEhlYWRlcnMuc2V0Q29udGVudFR5cGUobnVsbCk7XG5cbiAgICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgICAgdXRpbHMuZm9yRWFjaCh0b0J5dGVTdHJpbmdIZWFkZXJPYmplY3QocmVxdWVzdEhlYWRlcnMpLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoX2NvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFfY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IF9jb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfVxuXG4gICAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgICBpZiAob25Eb3dubG9hZFByb2dyZXNzKSB7XG4gICAgICAgIFtkb3dubG9hZFRocm90dGxlZCwgZmx1c2hEb3dubG9hZCwgZmx1c2hEb3dubG9hZFdpdGhFdmVudF0gPSBwcm9ncmVzc0V2ZW50UmVkdWNlcihcbiAgICAgICAgICBvbkRvd25sb2FkUHJvZ3Jlc3MsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZG93bmxvYWRUaHJvdHRsZWQpO1xuICAgICAgfVxuXG4gICAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgICAgaWYgKG9uVXBsb2FkUHJvZ3Jlc3MgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgICAgW3VwbG9hZFRocm90dGxlZCwgZmx1c2hVcGxvYWRdID0gcHJvZ3Jlc3NFdmVudFJlZHVjZXIob25VcGxvYWRQcm9ncmVzcyk7XG5cbiAgICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCB1cGxvYWRUaHJvdHRsZWQpO1xuXG4gICAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBmbHVzaFVwbG9hZCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChfY29uZmlnLmNhbmNlbFRva2VuIHx8IF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgICAgb25DYW5jZWxlZCA9IChjYW5jZWwpID0+IHtcbiAgICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVqZWN0KCFjYW5jZWwgfHwgY2FuY2VsLnR5cGUgPyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcsIHJlcXVlc3QpIDogY2FuY2VsKTtcbiAgICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgICB9O1xuXG4gICAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICAgIGlmIChfY29uZmlnLnNpZ25hbCkge1xuICAgICAgICAgIF9jb25maWcuc2lnbmFsLmFib3J0ZWRcbiAgICAgICAgICAgID8gb25DYW5jZWxlZCgpXG4gICAgICAgICAgICA6IF9jb25maWcuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJvdG9jb2wgPSBwYXJzZVByb3RvY29sKF9jb25maWcudXJsKTtcblxuICAgICAgaWYgKHByb3RvY29sICYmICFwbGF0Zm9ybS5wcm90b2NvbHMuaW5jbHVkZXMocHJvdG9jb2wpKSB7XG4gICAgICAgIHJlamVjdChcbiAgICAgICAgICBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAgICdVbnN1cHBvcnRlZCBwcm90b2NvbCAnICsgcHJvdG9jb2wgKyAnOicsXG4gICAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCxcbiAgICAgICAgICAgIGNvbmZpZ1xuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSB8fCBudWxsKTtcbiAgICB9KTtcbiAgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0IGJpbmQgZnJvbSAnLi9oZWxwZXJzL2JpbmQuanMnO1xuaW1wb3J0IEF4aW9zIGZyb20gJy4vY29yZS9BeGlvcy5qcyc7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSAnLi9jb3JlL21lcmdlQ29uZmlnLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBmb3JtRGF0YVRvSlNPTiBmcm9tICcuL2hlbHBlcnMvZm9ybURhdGFUb0pTT04uanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgQ2FuY2VsVG9rZW4gZnJvbSAnLi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMnO1xuaW1wb3J0IGlzQ2FuY2VsIGZyb20gJy4vY2FuY2VsL2lzQ2FuY2VsLmpzJztcbmltcG9ydCB7IFZFUlNJT04gfSBmcm9tICcuL2Vudi9kYXRhLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vaGVscGVycy90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBzcHJlYWQgZnJvbSAnLi9oZWxwZXJzL3NwcmVhZC5qcyc7XG5pbXBvcnQgaXNBeGlvc0Vycm9yIGZyb20gJy4vaGVscGVycy9pc0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCBhZGFwdGVycyBmcm9tICcuL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzJztcbmltcG9ydCBIdHRwU3RhdHVzQ29kZSBmcm9tICcuL2hlbHBlcnMvSHR0cFN0YXR1c0NvZGUuanMnO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKlxuICogQHJldHVybnMge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIGNvbnN0IGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIGNvbnN0IGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQsIHsgYWxsT3duS2V5czogdHJ1ZSB9KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7IGFsbE93bktleXM6IHRydWUgfSk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxuY29uc3QgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWxlZEVycm9yID0gQ2FuY2VsZWRFcnJvcjtcbmF4aW9zLkNhbmNlbFRva2VuID0gQ2FuY2VsVG9rZW47XG5heGlvcy5pc0NhbmNlbCA9IGlzQ2FuY2VsO1xuYXhpb3MuVkVSU0lPTiA9IFZFUlNJT047XG5heGlvcy50b0Zvcm1EYXRhID0gdG9Gb3JtRGF0YTtcblxuLy8gRXhwb3NlIEF4aW9zRXJyb3IgY2xhc3NcbmF4aW9zLkF4aW9zRXJyb3IgPSBBeGlvc0Vycm9yO1xuXG4vLyBhbGlhcyBmb3IgQ2FuY2VsZWRFcnJvciBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuYXhpb3MuQ2FuY2VsID0gYXhpb3MuQ2FuY2VsZWRFcnJvcjtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuYXhpb3Muc3ByZWFkID0gc3ByZWFkO1xuXG4vLyBFeHBvc2UgaXNBeGlvc0Vycm9yXG5heGlvcy5pc0F4aW9zRXJyb3IgPSBpc0F4aW9zRXJyb3I7XG5cbi8vIEV4cG9zZSBtZXJnZUNvbmZpZ1xuYXhpb3MubWVyZ2VDb25maWcgPSBtZXJnZUNvbmZpZztcblxuYXhpb3MuQXhpb3NIZWFkZXJzID0gQXhpb3NIZWFkZXJzO1xuXG5heGlvcy5mb3JtVG9KU09OID0gKHRoaW5nKSA9PiBmb3JtRGF0YVRvSlNPTih1dGlscy5pc0hUTUxGb3JtKHRoaW5nKSA/IG5ldyBGb3JtRGF0YSh0aGluZykgOiB0aGluZyk7XG5cbmF4aW9zLmdldEFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyO1xuXG5heGlvcy5IdHRwU3RhdHVzQ29kZSA9IEh0dHBTdGF0dXNDb2RlO1xuXG5heGlvcy5kZWZhdWx0ID0gYXhpb3M7XG5cbi8vIHRoaXMgbW9kdWxlIHNob3VsZCBvbmx5IGhhdmUgYSBkZWZhdWx0IGV4cG9ydFxuZXhwb3J0IGRlZmF1bHQgYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4vQ2FuY2VsZWRFcnJvci5qcyc7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybnMge0NhbmNlbFRva2VufVxuICovXG5jbGFzcyBDYW5jZWxUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKGV4ZWN1dG9yKSB7XG4gICAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGxldCByZXNvbHZlUHJvbWlzZTtcblxuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2tlbiA9IHRoaXM7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuKChjYW5jZWwpID0+IHtcbiAgICAgIGlmICghdG9rZW4uX2xpc3RlbmVycykgcmV0dXJuO1xuXG4gICAgICBsZXQgaSA9IHRva2VuLl9saXN0ZW5lcnMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgICB0b2tlbi5fbGlzdGVuZXJzW2ldKGNhbmNlbCk7XG4gICAgICB9XG4gICAgICB0b2tlbi5fbGlzdGVuZXJzID0gbnVsbDtcbiAgICB9KTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgdGhpcy5wcm9taXNlLnRoZW4gPSAob25mdWxmaWxsZWQpID0+IHtcbiAgICAgIGxldCBfcmVzb2x2ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB9KS50aGVuKG9uZnVsZmlsbGVkKTtcblxuICAgICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICAgIHRva2VuLnVuc3Vic2NyaWJlKF9yZXNvbHZlKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH07XG5cbiAgICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gICAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCk7XG4gICAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICAgKi9cbiAgdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIHRocm93IHRoaXMucmVhc29uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgdG9BYm9ydFNpZ25hbCgpIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgY29uc3QgYWJvcnQgPSAoZXJyKSA9PiB7XG4gICAgICBjb250cm9sbGVyLmFib3J0KGVycik7XG4gICAgfTtcblxuICAgIHRoaXMuc3Vic2NyaWJlKGFib3J0KTtcblxuICAgIGNvbnRyb2xsZXIuc2lnbmFsLnVuc3Vic2NyaWJlID0gKCkgPT4gdGhpcy51bnN1YnNjcmliZShhYm9ydCk7XG5cbiAgICByZXR1cm4gY29udHJvbGxlci5zaWduYWw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICAgKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICAgKi9cbiAgc3RhdGljIHNvdXJjZSgpIHtcbiAgICBsZXQgY2FuY2VsO1xuICAgIGNvbnN0IHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICAgIGNhbmNlbCA9IGM7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRva2VuLFxuICAgICAgY2FuY2VsLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5cbmNsYXNzIENhbmNlbGVkRXJyb3IgZXh0ZW5kcyBBeGlvc0Vycm9yIHtcbiAgLyoqXG4gICAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge09iamVjdD19IGNvbmZpZyBUaGUgY29uZmlnLlxuICAgKiBAcGFyYW0ge09iamVjdD19IHJlcXVlc3QgVGhlIHJlcXVlc3QuXG4gICAqXG4gICAqIEByZXR1cm5zIHtDYW5jZWxlZEVycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAgIHN1cGVyKG1lc3NhZ2UgPT0gbnVsbCA/ICdjYW5jZWxlZCcgOiBtZXNzYWdlLCBBeGlvc0Vycm9yLkVSUl9DQU5DRUxFRCwgY29uZmlnLCByZXF1ZXN0KTtcbiAgICB0aGlzLm5hbWUgPSAnQ2FuY2VsZWRFcnJvcic7XG4gICAgdGhpcy5fX0NBTkNFTF9fID0gdHJ1ZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW5jZWxlZEVycm9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSAnLi4vaGVscGVycy9idWlsZFVSTC5qcyc7XG5pbXBvcnQgSW50ZXJjZXB0b3JNYW5hZ2VyIGZyb20gJy4vSW50ZXJjZXB0b3JNYW5hZ2VyLmpzJztcbmltcG9ydCBkaXNwYXRjaFJlcXVlc3QgZnJvbSAnLi9kaXNwYXRjaFJlcXVlc3QuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSAnLi9idWlsZEZ1bGxQYXRoLmpzJztcbmltcG9ydCBtZXRob2RMaXN0IGZyb20gJy4vbWV0aG9kTGlzdC5qcyc7XG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4uL2hlbHBlcnMvdmFsaWRhdG9yLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IHRyYW5zaXRpb25hbERlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL3RyYW5zaXRpb25hbC5qcyc7XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuY2xhc3MgQXhpb3Mge1xuICBjb25zdHJ1Y3RvcihpbnN0YW5jZUNvbmZpZykge1xuICAgIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZyB8fCB7fTtcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBjb25maWdPclVybCBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gICAqIEBwYXJhbSB7P09iamVjdH0gY29uZmlnXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAgICovXG4gIGFzeW5jIHJlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxldCBkdW1teSA9IHt9O1xuXG4gICAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UgPyBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShkdW1teSkgOiAoZHVtbXkgPSBuZXcgRXJyb3IoKSk7XG5cbiAgICAgICAgICBjb25zdCBkdW1teVN0YWNrID0gZHVtbXkuc3RhY2s7XG4gICAgICAgICAgbGV0IHN0YWNrID0gJyc7XG5cbiAgICAgICAgICAvLyBzbGljZSBvZmYgdGhlIEVycm9yOiAuLi4gbGluZVxuICAgICAgICAgIGlmICh0eXBlb2YgZHVtbXlTdGFjayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0TmV3bGluZUluZGV4ID0gZHVtbXlTdGFjay5pbmRleE9mKCdcXG4nKTtcblxuICAgICAgICAgICAgc3RhY2sgPSBmaXJzdE5ld2xpbmVJbmRleCA9PT0gLTEgPyAnJyA6IGR1bW15U3RhY2suc2xpY2UoZmlyc3ROZXdsaW5lSW5kZXggKyAxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWVyci5zdGFjaykge1xuICAgICAgICAgICAgZXJyLnN0YWNrID0gc3RhY2s7XG4gICAgICAgICAgICAvLyBtYXRjaCB3aXRob3V0IHRoZSAyIHRvcCBzdGFjayBsaW5lc1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhY2spIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0TmV3bGluZUluZGV4ID0gc3RhY2suaW5kZXhPZignXFxuJyk7XG4gICAgICAgICAgICBjb25zdCBzZWNvbmROZXdsaW5lSW5kZXggPVxuICAgICAgICAgICAgICBmaXJzdE5ld2xpbmVJbmRleCA9PT0gLTEgPyAtMSA6IHN0YWNrLmluZGV4T2YoJ1xcbicsIGZpcnN0TmV3bGluZUluZGV4ICsgMSk7XG4gICAgICAgICAgICBjb25zdCBzdGFja1dpdGhvdXRUd29Ub3BMaW5lcyA9XG4gICAgICAgICAgICAgIHNlY29uZE5ld2xpbmVJbmRleCA9PT0gLTEgPyAnJyA6IHN0YWNrLnNsaWNlKHNlY29uZE5ld2xpbmVJbmRleCArIDEpO1xuXG4gICAgICAgICAgICBpZiAoIVN0cmluZyhlcnIuc3RhY2spLmVuZHNXaXRoKHN0YWNrV2l0aG91dFR3b1RvcExpbmVzKSkge1xuICAgICAgICAgICAgICBlcnIuc3RhY2sgKz0gJ1xcbicgKyBzdGFjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBJZ25vcmUgZmFpbHVyZXMgZnJvbSBjdXN0b20gc3RhY2sgaG9va3Mgb3IgdW4td3JpdGFibGUgc3RhY2sgcHJvcGVydGllcy5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgX3JlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgICBpZiAodHlwZW9mIGNvbmZpZ09yVXJsID09PSAnc3RyaW5nJykge1xuICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgY29uZmlnLnVybCA9IGNvbmZpZ09yVXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcgPSBjb25maWdPclVybCB8fCB7fTtcbiAgICB9XG5cbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgY29uc3QgeyB0cmFuc2l0aW9uYWwsIHBhcmFtc1NlcmlhbGl6ZXIsIGhlYWRlcnMgfSA9IGNvbmZpZztcblxuICAgIGlmICh0cmFuc2l0aW9uYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMoXG4gICAgICAgIHRyYW5zaXRpb25hbCxcbiAgICAgICAge1xuICAgICAgICAgIHNpbGVudEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICAgIGZvcmNlZEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICAgIGNsYXJpZnlUaW1lb3V0RXJyb3I6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgICAgbGVnYWN5SW50ZXJjZXB0b3JSZXFSZXNPcmRlcmluZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgICBhZHZlcnRpc2Vac3RkQWNjZXB0RW5jb2Rpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgICAgdmFsaWRhdGVTdGF0dXNVbmRlZmluZWRSZXNvbHZlczogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIgIT0gbnVsbCkge1xuICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyYW1zU2VyaWFsaXplcikpIHtcbiAgICAgICAgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIgPSB7XG4gICAgICAgICAgc2VyaWFsaXplOiBwYXJhbXNTZXJpYWxpemVyLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMoXG4gICAgICAgICAgcGFyYW1zU2VyaWFsaXplcixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlbmNvZGU6IHZhbGlkYXRvcnMuZnVuY3Rpb24sXG4gICAgICAgICAgICBzZXJpYWxpemU6IHZhbGlkYXRvcnMuZnVuY3Rpb24sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0cnVlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0IGNvbmZpZy5hbGxvd0Fic29sdXRlVXJsc1xuICAgIGlmIChjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5hbGxvd0Fic29sdXRlVXJscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMgPSB0aGlzLmRlZmF1bHRzLmFsbG93QWJzb2x1dGVVcmxzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKFxuICAgICAgY29uZmlnLFxuICAgICAge1xuICAgICAgICBiYXNlVXJsOiB2YWxpZGF0b3JzLnNwZWxsaW5nKCdiYXNlVVJMJyksXG4gICAgICAgIHdpdGhYc3JmVG9rZW46IHZhbGlkYXRvcnMuc3BlbGxpbmcoJ3dpdGhYU1JGVG9rZW4nKSxcbiAgICAgIH0sXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIC8vIFNldCBjb25maWcubWV0aG9kXG4gICAgY29uZmlnLm1ldGhvZCA9IChcbiAgICAgIHV0aWxzLmdldFNhZmVQcm9wKGNvbmZpZywgJ21ldGhvZCcpIHx8XG4gICAgICB1dGlscy5nZXRTYWZlUHJvcCh0aGlzLmRlZmF1bHRzLCAnbWV0aG9kJykgfHxcbiAgICAgICdnZXQnXG4gICAgKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gICAgbGV0IGNvbnRleHRIZWFkZXJzID0gaGVhZGVycyAmJiB1dGlscy5tZXJnZShoZWFkZXJzLmNvbW1vbiwgaGVhZGVyc1tjb25maWcubWV0aG9kXSk7XG5cbiAgICBoZWFkZXJzICYmXG4gICAgICB1dGlscy5mb3JFYWNoKG1ldGhvZExpc3QuY29uY2F0KCdjb21tb24nKSwgKG1ldGhvZCkgPT4ge1xuICAgICAgICBkZWxldGUgaGVhZGVyc1ttZXRob2RdO1xuICAgICAgfSk7XG5cbiAgICBjb25maWcuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5jb25jYXQoY29udGV4dEhlYWRlcnMsIGhlYWRlcnMpO1xuXG4gICAgLy8gZmlsdGVyIG91dCBza2lwcGVkIGludGVyY2VwdG9yc1xuICAgIGNvbnN0IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluID0gW107XG4gICAgbGV0IHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHRydWU7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgICBpZiAodHlwZW9mIGludGVyY2VwdG9yLnJ1bldoZW4gPT09ICdmdW5jdGlvbicgJiYgaW50ZXJjZXB0b3IucnVuV2hlbihjb25maWcpID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyAmJiBpbnRlcmNlcHRvci5zeW5jaHJvbm91cztcblxuICAgICAgY29uc3QgdHJhbnNpdGlvbmFsID0gY29uZmlnLnRyYW5zaXRpb25hbCB8fCB0cmFuc2l0aW9uYWxEZWZhdWx0cztcbiAgICAgIGNvbnN0IGxlZ2FjeUludGVyY2VwdG9yUmVxUmVzT3JkZXJpbmcgPVxuICAgICAgICB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLmxlZ2FjeUludGVyY2VwdG9yUmVxUmVzT3JkZXJpbmc7XG5cbiAgICAgIGlmIChsZWdhY3lJbnRlcmNlcHRvclJlcVJlc09yZGVyaW5nKSB7XG4gICAgICAgIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluID0gW107XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgbGV0IHByb21pc2U7XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBsZW47XG5cbiAgICBpZiAoIXN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycykge1xuICAgICAgY29uc3QgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LmJpbmQodGhpcyksIHVuZGVmaW5lZF07XG4gICAgICBjaGFpbi51bnNoaWZ0KC4uLnJlcXVlc3RJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGNoYWluLnB1c2goLi4ucmVzcG9uc2VJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGxlbiA9IGNoYWluLmxlbmd0aDtcblxuICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gICAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluW2krK10sIGNoYWluW2krK10pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBsZW4gPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi5sZW5ndGg7XG5cbiAgICBsZXQgbmV3Q29uZmlnID0gY29uZmlnO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIGNvbnN0IG9uRnVsZmlsbGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIGNvbnN0IG9uUmVqZWN0ZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3Q29uZmlnID0gb25GdWxmaWxsZWQgPyBvbkZ1bGZpbGxlZChuZXdDb25maWcpIDogbmV3Q29uZmlnO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKCFvblJlamVjdGVkKSB7XG4gICAgICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVqZWN0ZWRSZXN1bHQgPSBvblJlamVjdGVkLmNhbGwodGhpcywgZXJyb3IpO1xuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzVGhlbmFibGUocmVqZWN0ZWRSZXN1bHQpKSB7XG4gICAgICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHJlamVjdGVkUmVzdWx0KS50aGVuKCgpID0+XG4gICAgICAgICAgICAgIGRpc3BhdGNoUmVxdWVzdC5jYWxsKHRoaXMsIG5ld0NvbmZpZylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChyZWplY3RlZEVycm9yKSB7XG4gICAgICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVqZWN0KHJlamVjdGVkRXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFwcm9taXNlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBwcm9taXNlID0gZGlzcGF0Y2hSZXF1ZXN0LmNhbGwodGhpcywgbmV3Q29uZmlnKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgbGVuID0gcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBnZXRVcmkoY29uZmlnKSB7XG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgICBjb25zdCBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwsIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscywgY29uZmlnKTtcbiAgICByZXR1cm4gYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKTtcbiAgfVxufVxuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICh1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXG4gICAgICBtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICB1cmwsXG4gICAgICAgIGRhdGE6IGNvbmZpZyAmJiB1dGlscy5oYXNPd25Qcm9wKGNvbmZpZywgJ2RhdGEnKSA/IGNvbmZpZy5kYXRhIDogdW5kZWZpbmVkLFxuICAgICAgfSlcbiAgICApO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdxdWVyeSddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGZ1bmN0aW9uIGdlbmVyYXRlSFRUUE1ldGhvZChpc0Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHR0cE1ldGhvZCh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgICAgbWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgIGhlYWRlcnM6IGlzRm9ybVxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB7fSxcbiAgICAgICAgICB1cmwsXG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfTtcbiAgfVxuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZ2VuZXJhdGVIVFRQTWV0aG9kKCk7XG5cbiAgLy8gUVVFUlkgaXMgYSBzYWZlL2lkZW1wb3RlbnQgcmVhZCBtZXRob2Q7IG11bHRpcGFydCBmb3JtIGJvZGllcyBkb24ndCBmaXRcbiAgLy8gaXRzIHNlbWFudGljcywgc28gbm8gcXVlcnlGb3JtIHNob3J0aGFuZCBpcyBnZW5lcmF0ZWQuXG4gIGlmIChtZXRob2QgIT09ICdxdWVyeScpIHtcbiAgICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kICsgJ0Zvcm0nXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCh0cnVlKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5cbmV4cG9ydCBjb25zdCBSRURBQ1RFRCA9ICdbUkVEQUNURUQgKioqKl0nO1xuXG5mdW5jdGlvbiBoYXNPd25PclByb3RvdHlwZVRvSlNPTihzb3VyY2UpIHtcbiAgaWYgKHV0aWxzLmhhc093blByb3Aoc291cmNlLCAndG9KU09OJykpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGxldCBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc291cmNlKTtcblxuICB3aGlsZSAocHJvdG90eXBlICYmIHByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgIGlmICh1dGlscy5oYXNPd25Qcm9wKHByb3RvdHlwZSwgJ3RvSlNPTicpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG90eXBlKTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gQnVpbGQgYSBwbGFpbi1vYmplY3Qgc25hcHNob3Qgb2YgYGNvbmZpZ2AgYW5kIHJlcGxhY2UgdGhlIHZhbHVlIG9mIGFueSBrZXlcbi8vIChjYXNlLWluc2Vuc2l0aXZlKSBsaXN0ZWQgaW4gYHJlZGFjdEtleXNgIHdpdGggUkVEQUNURUQuIFdhbGtzIHRocm91Z2ggYXJyYXlzXG4vLyBhbmQgQXhpb3NIZWFkZXJzLCBhbmQgc2hvcnQtY2lyY3VpdHMgb24gY2lyY3VsYXIgcmVmZXJlbmNlcy5cbmZ1bmN0aW9uIHJlZGFjdENvbmZpZyhjb25maWcsIHJlZGFjdEtleXMpIHtcbiAgY29uc3QgbG93ZXJLZXlzID0gbmV3IFNldChyZWRhY3RLZXlzLm1hcCgoaykgPT4gU3RyaW5nKGspLnRvTG93ZXJDYXNlKCkpKTtcbiAgY29uc3Qgc2VlbiA9IFtdO1xuXG4gIGNvbnN0IHZpc2l0ID0gKHNvdXJjZSkgPT4ge1xuICAgIGlmIChzb3VyY2UgPT09IG51bGwgfHwgdHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHJldHVybiBzb3VyY2U7XG4gICAgaWYgKHV0aWxzLmlzQnVmZmVyKHNvdXJjZSkpIHJldHVybiBzb3VyY2U7XG4gICAgaWYgKHNlZW4uaW5kZXhPZihzb3VyY2UpICE9PSAtMSkgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBBeGlvc0hlYWRlcnMpIHtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS50b0pTT04oKTtcbiAgICB9XG5cbiAgICBzZWVuLnB1c2goc291cmNlKTtcblxuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmVzdWx0ID0gW107XG4gICAgICBzb3VyY2UuZm9yRWFjaCgodiwgaSkgPT4ge1xuICAgICAgICBjb25zdCByZWR1Y2VkVmFsdWUgPSB2aXNpdCh2KTtcbiAgICAgICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChyZWR1Y2VkVmFsdWUpKSB7XG4gICAgICAgICAgcmVzdWx0W2ldID0gcmVkdWNlZFZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkgJiYgaGFzT3duT3JQcm90b3R5cGVUb0pTT04oc291cmNlKSkge1xuICAgICAgICBzZWVuLnBvcCgpO1xuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgfVxuXG4gICAgICByZXN1bHQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc291cmNlKSkge1xuICAgICAgICBjb25zdCByZWR1Y2VkVmFsdWUgPSBsb3dlcktleXMuaGFzKGtleS50b0xvd2VyQ2FzZSgpKSA/IFJFREFDVEVEIDogdmlzaXQodmFsdWUpO1xuICAgICAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKHJlZHVjZWRWYWx1ZSkpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHJlZHVjZWRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHNlZW4ucG9wKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICByZXR1cm4gdmlzaXQoY29uZmlnKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5U2FmZWx5KHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5mdW5jdGlvbiBhZ2dyZWdhdGVFcnJvck1lc3NhZ2UoZXJyb3IpIHtcbiAgY29uc3QgbWVzc2FnZSA9IGVycm9yLmVycm9yc1xuICAgIC5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gZW50cnkgJiYgZW50cnkubWVzc2FnZSA/IHN0cmluZ2lmeVNhZmVseShlbnRyeS5tZXNzYWdlKSA6IHN0cmluZ2lmeVNhZmVseShlbnRyeSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmZpbHRlcihCb29sZWFuKVxuICAgIC5qb2luKCc7ICcpO1xuXG4gIHJldHVybiBtZXNzYWdlIHx8IGVycm9yLm5hbWUgfHwgJ0FnZ3JlZ2F0ZUVycm9yJztcbn1cblxuY2xhc3MgQXhpb3NFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgc3RhdGljIGZyb20oZXJyb3IsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UsIGN1c3RvbVByb3BzKSB7XG4gICAgLy8gYEFnZ3JlZ2F0ZUVycm9yYCAodGhyb3duIGJ5IE5vZGUgb24gZHVhbC1zdGFjay9IYXBweS1FeWViYWxscyBjb25uZWN0aW9uXG4gICAgLy8gZmFpbHVyZXMpIGhhcyBhbiBlbXB0eSBgbWVzc2FnZWA7IGl0cyBkZXRhaWwgbGl2ZXMgaW4gYGVycm9yc1tdYC4gV2l0aG91dFxuICAgIC8vIHRoaXMsIHRoZSB3cmFwcGVkIGVycm9yIHN1cmZhY2VzIHdpdGggYSBibGFuayBtZXNzYWdlIChzZWUgIzY3MjEpLlxuICAgIGxldCBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICBpZiAoIW1lc3NhZ2UgJiYgdXRpbHMuaXNBcnJheShlcnJvci5lcnJvcnMpICYmIGVycm9yLmVycm9ycy5sZW5ndGgpIHtcbiAgICAgIG1lc3NhZ2UgPSBhZ2dyZWdhdGVFcnJvck1lc3NhZ2UoZXJyb3IpO1xuICAgIH1cblxuICAgIGNvbnN0IGF4aW9zRXJyb3IgPSBuZXcgQXhpb3NFcnJvcihtZXNzYWdlLCBjb2RlIHx8IGVycm9yLmNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpO1xuICAgIC8vIE1hdGNoIG5hdGl2ZSBgRXJyb3JgIGBjYXVzZWAgc2VtYW50aWNzOiBub24tZW51bWVyYWJsZS4gVGhlIHdyYXBwZWRcbiAgICAvLyBlcnJvciBvZnRlbiBjYXJyaWVzIGNpcmN1bGFyIGludGVybmFscyAoc29ja2V0cywgcmVxdWVzdHMsIGFnZW50cyksIHNvXG4gICAgLy8gYW4gZW51bWVyYWJsZSBgY2F1c2VgIG1ha2VzIHN0cnVjdHVyZWQgbG9nZ2VycyAocGluby93aW5zdG9uKSBhbmQgYW55XG4gICAgLy8gb3duLXByb3BlcnR5IHdhbGsgdGhyb3cgXCJDb252ZXJ0aW5nIGNpcmN1bGFyIHN0cnVjdHVyZSB0byBKU09OXCIuXG4gICAgLy8gUmVncmVzc2lvbiBmcm9tICM2OTgyOyBzZWUgIzcyMDUuIGBfX3Byb3RvX186IG51bGxgIG1pcnJvcnMgdGhlXG4gICAgLy8gYG1lc3NhZ2VgIGRlc2NyaXB0b3IgYmVsb3cgKHByb3RvdHlwZS1wb2xsdXRpb24tc2FmZSBkZXNjcmlwdG9yKS5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYXhpb3NFcnJvciwgJ2NhdXNlJywge1xuICAgICAgX19wcm90b19fOiBudWxsLFxuICAgICAgdmFsdWU6IGVycm9yLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB9KTtcbiAgICBheGlvc0Vycm9yLm5hbWUgPSBlcnJvci5uYW1lO1xuXG4gICAgLy8gUHJlc2VydmUgc3RhdHVzIGZyb20gdGhlIG9yaWdpbmFsIGVycm9yIGlmIG5vdCBhbHJlYWR5IHNldCBmcm9tIHJlc3BvbnNlXG4gICAgaWYgKGVycm9yLnN0YXR1cyAhPSBudWxsICYmIGF4aW9zRXJyb3Iuc3RhdHVzID09IG51bGwpIHtcbiAgICAgIGF4aW9zRXJyb3Iuc3RhdHVzID0gZXJyb3Iuc3RhdHVzO1xuICAgIH1cblxuICAgIGN1c3RvbVByb3BzICYmIE9iamVjdC5hc3NpZ24oYXhpb3NFcnJvciwgY3VzdG9tUHJvcHMpO1xuICAgIHJldHVybiBheGlvc0Vycm9yO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXSBUaGUgY29uZmlnLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gICAqXG4gICAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG5cbiAgICAvLyBNYWtlIG1lc3NhZ2UgZW51bWVyYWJsZSB0byBtYWludGFpbiBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgLy8gVGhlIG5hdGl2ZSBFcnJvciBjb25zdHJ1Y3RvciBzZXRzIG1lc3NhZ2UgYXMgbm9uLWVudW1lcmFibGUsXG4gICAgLy8gYnV0IGF4aW9zIDwgdjEuMTMuMyBoYWQgaXQgYXMgZW51bWVyYWJsZVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWVzc2FnZScsIHtcbiAgICAgIC8vIE51bGwtcHJvdG8gZGVzY3JpcHRvciBzbyBhIHBvbGx1dGVkIE9iamVjdC5wcm90b3R5cGUuZ2V0IGNhbm5vdCB0dXJuXG4gICAgICAvLyB0aGlzIGRhdGEgZGVzY3JpcHRvciBpbnRvIGFuIGFjY2Vzc29yIGRlc2NyaXB0b3Igb24gdGhlIHdheSBpbi5cbiAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgIHZhbHVlOiBtZXNzYWdlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xuICAgIHRoaXMuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcbiAgICBjb2RlICYmICh0aGlzLmNvZGUgPSBjb2RlKTtcbiAgICBjb25maWcgJiYgKHRoaXMuY29uZmlnID0gY29uZmlnKTtcbiAgICByZXF1ZXN0ICYmICh0aGlzLnJlcXVlc3QgPSByZXF1ZXN0KTtcbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgIHRoaXMuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIH1cbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICAvLyBPcHQtaW4gcmVkYWN0aW9uOiB3aGVuIHRoZSByZXF1ZXN0IGNvbmZpZyBjYXJyaWVzIGEgYHJlZGFjdGAgYXJyYXksIHRoZVxuICAgIC8vIHZhbHVlIG9mIGFueSBtYXRjaGluZyBrZXkgKGNhc2UtaW5zZW5zaXRpdmUsIGF0IGFueSBkZXB0aCkgaXMgcmVwbGFjZWRcbiAgICAvLyB3aXRoIFJFREFDVEVEIGluIHRoZSBzZXJpYWxpemVkIHNuYXBzaG90LiBVbmRlZmluZWQgb3IgZW1wdHkgbGVhdmVzIHRoZVxuICAgIC8vIGV4aXN0aW5nIHNlcmlhbGl6YXRpb24gYmVoYXZpb3IgdW5jaGFuZ2VkLlxuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IHJlZGFjdEtleXMgPSBjb25maWcgJiYgdXRpbHMuaGFzT3duUHJvcChjb25maWcsICdyZWRhY3QnKSA/IGNvbmZpZy5yZWRhY3QgOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc2VyaWFsaXplZENvbmZpZyA9XG4gICAgICB1dGlscy5pc0FycmF5KHJlZGFjdEtleXMpICYmIHJlZGFjdEtleXMubGVuZ3RoID4gMFxuICAgICAgICA/IHJlZGFjdENvbmZpZyhjb25maWcsIHJlZGFjdEtleXMpXG4gICAgICAgIDogdXRpbHMudG9KU09OT2JqZWN0KGNvbmZpZyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiBzZXJpYWxpemVkQ29uZmlnLFxuICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICB9O1xuICB9XG59XG5cbi8vIFRoaXMgY2FuIGJlIGNoYW5nZWQgdG8gc3RhdGljIHByb3BlcnRpZXMgYXMgc29vbiBhcyB0aGUgcGFyc2VyIG9wdGlvbnMgaW4gLmVzbGludC5janMgYXJlIHVwZGF0ZWQuXG5BeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFID0gJ0VSUl9CQURfT1BUSU9OX1ZBTFVFJztcbkF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT04gPSAnRVJSX0JBRF9PUFRJT04nO1xuQXhpb3NFcnJvci5FQ09OTkFCT1JURUQgPSAnRUNPTk5BQk9SVEVEJztcbkF4aW9zRXJyb3IuRVRJTUVET1VUID0gJ0VUSU1FRE9VVCc7XG5BeGlvc0Vycm9yLkVDT05OUkVGVVNFRCA9ICdFQ09OTlJFRlVTRUQnO1xuQXhpb3NFcnJvci5FUlJfTkVUV09SSyA9ICdFUlJfTkVUV09SSyc7XG5BeGlvc0Vycm9yLkVSUl9GUl9UT09fTUFOWV9SRURJUkVDVFMgPSAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUyc7XG5BeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEID0gJ0VSUl9ERVBSRUNBVEVEJztcbkF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSA9ICdFUlJfQkFEX1JFU1BPTlNFJztcbkF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNUID0gJ0VSUl9CQURfUkVRVUVTVCc7XG5BeGlvc0Vycm9yLkVSUl9DQU5DRUxFRCA9ICdFUlJfQ0FOQ0VMRUQnO1xuQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlQgPSAnRVJSX05PVF9TVVBQT1JUJztcbkF4aW9zRXJyb3IuRVJSX0lOVkFMSURfVVJMID0gJ0VSUl9JTlZBTElEX1VSTCc7XG5BeGlvc0Vycm9yLkVSUl9GT1JNX0RBVEFfREVQVEhfRVhDRUVERUQgPSAnRVJSX0ZPUk1fREFUQV9ERVBUSF9FWENFRURFRCc7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgcGFyc2VIZWFkZXJzIGZyb20gJy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzJztcbmltcG9ydCB7IHNhbml0aXplSGVhZGVyVmFsdWUgfSBmcm9tICcuLi9oZWxwZXJzL3Nhbml0aXplSGVhZGVyVmFsdWUuanMnO1xuXG5jb25zdCAkaW50ZXJuYWxzID0gU3ltYm9sKCdpbnRlcm5hbHMnKTtcblxuZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyICYmIFN0cmluZyhoZWFkZXIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5tYXAobm9ybWFsaXplVmFsdWUpIDogc2FuaXRpemVIZWFkZXJWYWx1ZShTdHJpbmcodmFsdWUpKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbnMoc3RyKSB7XG4gIGNvbnN0IHRva2VucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGNvbnN0IHRva2Vuc1JFID0gLyhbXlxccyw7PV0rKVxccyooPzo9XFxzKihbXiw7XSspKT8vZztcbiAgbGV0IG1hdGNoO1xuXG4gIHdoaWxlICgobWF0Y2ggPSB0b2tlbnNSRS5leGVjKHN0cikpKSB7XG4gICAgdG9rZW5zW21hdGNoWzFdXSA9IG1hdGNoWzJdO1xuICB9XG5cbiAgcmV0dXJuIHRva2Vucztcbn1cblxuY29uc3QgcGFyYW1ldGVyTmFtZVJFID0gL15bISMkJSYnKitcXC0uXl9gfH4wLTlBLVphLXpdKyQvO1xuXG5mdW5jdGlvbiB0cmltT1dTKHZhbHVlKSB7XG4gIGxldCBzdGFydCA9IDA7XG4gIGxldCBlbmQgPSB2YWx1ZS5sZW5ndGg7XG5cbiAgd2hpbGUgKHN0YXJ0IDwgZW5kKSB7XG4gICAgY29uc3QgY29kZSA9IHZhbHVlLmNoYXJDb2RlQXQoc3RhcnQpO1xuXG4gICAgaWYgKGNvZGUgIT09IDB4MDkgJiYgY29kZSAhPT0gMHgyMCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3RhcnQgKz0gMTtcbiAgfVxuXG4gIHdoaWxlIChlbmQgPiBzdGFydCkge1xuICAgIGNvbnN0IGNvZGUgPSB2YWx1ZS5jaGFyQ29kZUF0KGVuZCAtIDEpO1xuXG4gICAgaWYgKGNvZGUgIT09IDB4MDkgJiYgY29kZSAhPT0gMHgyMCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZW5kIC09IDE7XG4gIH1cblxuICByZXR1cm4gc3RhcnQgPT09IDAgJiYgZW5kID09PSB2YWx1ZS5sZW5ndGggPyB2YWx1ZSA6IHZhbHVlLnNsaWNlKHN0YXJ0LCBlbmQpO1xufVxuXG5mdW5jdGlvbiBkZWNvZGVRdW90ZWRTdHJpbmcodmFsdWUpIHtcbiAgY29uc3QgbGFzdCA9IHZhbHVlLmxlbmd0aCAtIDE7XG5cbiAgaWYgKGxhc3QgPCAxIHx8IHZhbHVlLmNoYXJDb2RlQXQoMCkgIT09IDB4MjIgfHwgdmFsdWUuY2hhckNvZGVBdChsYXN0KSAhPT0gMHgyMikge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGxldCBkZWNvZGVkID0gJyc7XG5cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBsYXN0OyBpKyspIHtcbiAgICBjb25zdCBjb2RlID0gdmFsdWUuY2hhckNvZGVBdChpKTtcblxuICAgIGlmIChjb2RlID09PSAweDIyKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPT09IDB4NWMpIHtcbiAgICAgIGkgKz0gMTtcblxuICAgICAgaWYgKGkgPj0gbGFzdCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVjb2RlZCArPSB2YWx1ZVtpXTtcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVkO1xufVxuXG5mdW5jdGlvbiBwYXJzZVBhcmFtZXRlcnModmFsdWUpIHtcbiAgY29uc3QgcGFyYW1ldGVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGNvbnN0IHN0ciA9IFN0cmluZyh2YWx1ZSk7XG4gIGxldCBzdGFydCA9IDA7XG4gIGxldCBxdW90ZWQgPSBmYWxzZTtcbiAgbGV0IGVzY2FwZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBwYXJzZVBhcmFtZXRlcihlbmQpIHtcbiAgICBjb25zdCBwYXJ0ID0gdHJpbU9XUyhzdHIuc2xpY2Uoc3RhcnQsIGVuZCkpO1xuICAgIGNvbnN0IGVxdWFscyA9IHBhcnQuaW5kZXhPZignPScpO1xuXG4gICAgaWYgKGVxdWFscyA8IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuYW1lID0gdHJpbU9XUyhwYXJ0LnNsaWNlKDAsIGVxdWFscykpO1xuXG4gICAgaWYgKCFwYXJhbWV0ZXJOYW1lUkUudGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKFxuICAgICAgbm9ybWFsaXplZE5hbWUgPT09ICdfX3Byb3RvX18nIHx8XG4gICAgICBub3JtYWxpemVkTmFtZSA9PT0gJ2NvbnN0cnVjdG9yJyB8fFxuICAgICAgbm9ybWFsaXplZE5hbWUgPT09ICdwcm90b3R5cGUnXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGFyYW1ldGVyVmFsdWUgPSB0cmltT1dTKHBhcnQuc2xpY2UoZXF1YWxzICsgMSkpO1xuICAgIHBhcmFtZXRlcnNbbm9ybWFsaXplZE5hbWVdID0gZGVjb2RlUXVvdGVkU3RyaW5nKHBhcmFtZXRlclZhbHVlKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuXG4gICAgaWYgKHF1b3RlZCkge1xuICAgICAgaWYgKGVzY2FwZWQpIHtcbiAgICAgICAgZXNjYXBlZCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDVjKSB7XG4gICAgICAgIGVzY2FwZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDIyKSB7XG4gICAgICAgIHF1b3RlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHgyMikge1xuICAgICAgcXVvdGVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4MmMgfHwgY29kZSA9PT0gMHgzYikge1xuICAgICAgcGFyc2VQYXJhbWV0ZXIoaSk7XG4gICAgICBzdGFydCA9IGkgKyAxO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlUGFyYW1ldGVyKHN0ci5sZW5ndGgpO1xuXG4gIHJldHVybiBwYXJhbWV0ZXJzO1xufVxuXG5jb25zdCBpc1ZhbGlkSGVhZGVyTmFtZSA9IChzdHIpID0+IC9eWy1fYS16QS1aMC05XmB8fiwhIyQlJicqKy5dKyQvLnRlc3Qoc3RyLnRyaW0oKSk7XG5cbmZ1bmN0aW9uIG1hdGNoSGVhZGVyVmFsdWUoY29udGV4dCwgdmFsdWUsIGhlYWRlciwgZmlsdGVyLCBpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgaWYgKHV0aWxzLmlzRnVuY3Rpb24oZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLCB2YWx1ZSwgaGVhZGVyKTtcbiAgfVxuXG4gIGlmIChpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgICB2YWx1ZSA9IGhlYWRlcjtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNTdHJpbmcodmFsdWUpKSByZXR1cm47XG5cbiAgaWYgKHV0aWxzLmlzU3RyaW5nKGZpbHRlcikpIHtcbiAgICByZXR1cm4gdmFsdWUuaW5kZXhPZihmaWx0ZXIpICE9PSAtMTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc1JlZ0V4cChmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci50ZXN0KHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXJcbiAgICAudHJpbSgpXG4gICAgLnRvTG93ZXJDYXNlKClcbiAgICAucmVwbGFjZSgvKFthLXpcXGRdKShcXHcqKS9nLCAodywgY2hhciwgc3RyKSA9PiB7XG4gICAgICByZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpICsgc3RyO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZEFjY2Vzc29ycyhvYmosIGhlYWRlcikge1xuICBjb25zdCBhY2Nlc3Nvck5hbWUgPSB1dGlscy50b0NhbWVsQ2FzZSgnICcgKyBoZWFkZXIpO1xuXG4gIFsnZ2V0JywgJ3NldCcsICdoYXMnXS5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbWV0aG9kTmFtZSArIGFjY2Vzc29yTmFtZSwge1xuICAgICAgLy8gTnVsbC1wcm90byBkZXNjcmlwdG9yIHNvIGEgcG9sbHV0ZWQgT2JqZWN0LnByb3RvdHlwZS5nZXQgY2Fubm90IHR1cm5cbiAgICAgIC8vIHRoaXMgZGF0YSBkZXNjcmlwdG9yIGludG8gYW4gYWNjZXNzb3IgZGVzY3JpcHRvciBvbiB0aGUgd2F5IGluLlxuICAgICAgX19wcm90b19fOiBudWxsLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIChhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgIHJldHVybiB0aGlzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgaGVhZGVyLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgfSk7XG4gIH0pO1xufVxuXG5jbGFzcyBBeGlvc0hlYWRlcnMge1xuICBjb25zdHJ1Y3RvcihoZWFkZXJzKSB7XG4gICAgaGVhZGVycyAmJiB0aGlzLnNldChoZWFkZXJzKTtcbiAgfVxuXG4gIHNldChoZWFkZXIsIHZhbHVlT3JSZXdyaXRlLCByZXdyaXRlKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFsSGVhZGVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBsSGVhZGVyKTtcblxuICAgICAgaWYgKFxuICAgICAgICAha2V5IHx8XG4gICAgICAgIHNlbGZba2V5XSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIF9yZXdyaXRlID09PSB0cnVlIHx8XG4gICAgICAgIChfcmV3cml0ZSA9PT0gdW5kZWZpbmVkICYmIHNlbGZba2V5XSAhPT0gZmFsc2UpXG4gICAgICApIHtcbiAgICAgICAgc2VsZltrZXkgfHwgX2hlYWRlcl0gPSBub3JtYWxpemVWYWx1ZShfdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNldEhlYWRlcnMgPSAoaGVhZGVycywgX3Jld3JpdGUpID0+XG4gICAgICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIChfdmFsdWUsIF9oZWFkZXIpID0+IHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSk7XG5cbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChoZWFkZXIpIHx8IGhlYWRlciBpbnN0YW5jZW9mIHRoaXMuY29uc3RydWN0b3IpIHtcbiAgICAgIHNldEhlYWRlcnMoaGVhZGVyLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1N0cmluZyhoZWFkZXIpICYmIChoZWFkZXIgPSBoZWFkZXIudHJpbSgpKSAmJiAhaXNWYWxpZEhlYWRlck5hbWUoaGVhZGVyKSkge1xuICAgICAgc2V0SGVhZGVycyhwYXJzZUhlYWRlcnMoaGVhZGVyKSwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QoaGVhZGVyKSAmJiB1dGlscy5pc1NhZmVJdGVyYWJsZShoZWFkZXIpKSB7XG4gICAgICBsZXQgb2JqID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgICAgZGVzdCxcbiAgICAgICAga2V5O1xuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBoZWFkZXIpIHtcbiAgICAgICAgaWYgKCF1dGlscy5pc0FycmF5KGVudHJ5KSkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdCBpdGVyYXRvciBtdXN0IHJldHVybiBhIGtleS12YWx1ZSBwYWlyJyk7XG4gICAgICAgIH1cblxuICAgICAgICBrZXkgPSBlbnRyeVswXTtcblxuICAgICAgICBpZiAodXRpbHMuaGFzT3duUHJvcChvYmosIGtleSkpIHtcbiAgICAgICAgICBkZXN0ID0gb2JqW2tleV07XG4gICAgICAgICAgb2JqW2tleV0gPSB1dGlscy5pc0FycmF5KGRlc3QpID8gWy4uLmRlc3QsIGVudHJ5WzFdXSA6IFtkZXN0LCBlbnRyeVsxXV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JqW2tleV0gPSBlbnRyeVsxXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZXRIZWFkZXJzKG9iaiwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkZXIgIT0gbnVsbCAmJiBzZXRIZWFkZXIodmFsdWVPclJld3JpdGUsIGhlYWRlciwgcmV3cml0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQoaGVhZGVyLCBwYXJzZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXNba2V5XTtcblxuICAgICAgICBpZiAoIXBhcnNlcikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZXIgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlbnModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuY2FsbCh0aGlzLCB2YWx1ZSwga2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1JlZ0V4cChwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5leGVjKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcnNlciBtdXN0IGJlIGJvb2xlYW58cmVnZXhwfGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICByZXR1cm4gISEoXG4gICAgICAgIGtleSAmJlxuICAgICAgICB0aGlzW2tleV0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlcikpXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGRlbGV0ZShoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlSGVhZGVyKF9oZWFkZXIpIHtcbiAgICAgIF9oZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmIChfaGVhZGVyKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoc2VsZiwgX2hlYWRlcik7XG5cbiAgICAgICAgaWYgKGtleSAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZShzZWxmLCBzZWxmW2tleV0sIGtleSwgbWF0Y2hlcikpKSB7XG4gICAgICAgICAgZGVsZXRlIHNlbGZba2V5XTtcblxuICAgICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXkoaGVhZGVyKSkge1xuICAgICAgaGVhZGVyLmZvckVhY2goZGVsZXRlSGVhZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlSGVhZGVyKGhlYWRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBjbGVhcihtYXRjaGVyKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICAgIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGRlbGV0ZWQgPSBmYWxzZTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlciwgdHJ1ZSkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBub3JtYWxpemUoZm9ybWF0KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShoZWFkZXJzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHNlbGZba2V5XSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gZm9ybWF0ID8gZm9ybWF0SGVhZGVyKGhlYWRlcikgOiBTdHJpbmcoaGVhZGVyKS50cmltKCk7XG5cbiAgICAgIGlmIChub3JtYWxpemVkICE9PSBoZWFkZXIpIHtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgIH1cblxuICAgICAgc2VsZltub3JtYWxpemVkXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcblxuICAgICAgaGVhZGVyc1tub3JtYWxpemVkXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvbmNhdCguLi50YXJnZXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuY29uY2F0KHRoaXMsIC4uLnRhcmdldHMpO1xuICB9XG5cbiAgdG9KU09OKGFzU3RyaW5ncykge1xuICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICB1dGlscy5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICB2YWx1ZSAhPSBudWxsICYmXG4gICAgICAgIHZhbHVlICE9PSBmYWxzZSAmJlxuICAgICAgICAob2JqW2hlYWRlcl0gPSBhc1N0cmluZ3MgJiYgdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5qb2luKCcsICcpIDogdmFsdWUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSlcbiAgICAgIC5tYXAoKFtoZWFkZXIsIHZhbHVlXSkgPT4gaGVhZGVyICsgJzogJyArIHZhbHVlKVxuICAgICAgLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgZ2V0U2V0Q29va2llKCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXQoJ3NldC1jb29raWUnKTtcbiAgICByZXR1cm4gdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT09IGZhbHNlID8gW10gOiBbdmFsdWVdO1xuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnQXhpb3NIZWFkZXJzJztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgdGhpcyA/IHRoaW5nIDogbmV3IHRoaXModGhpbmcpO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlUGFyYW1ldGVycyh2YWx1ZSkge1xuICAgIHJldHVybiBwYXJzZVBhcmFtZXRlcnModmFsdWUpO1xuICB9XG5cbiAgc3RhdGljIGNvbmNhdChmaXJzdCwgLi4udGFyZ2V0cykge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gbmV3IHRoaXMoZmlyc3QpO1xuXG4gICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IGNvbXB1dGVkLnNldCh0YXJnZXQpKTtcblxuICAgIHJldHVybiBjb21wdXRlZDtcbiAgfVxuXG4gIHN0YXRpYyBhY2Nlc3NvcihoZWFkZXIpIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPVxuICAgICAgKHRoaXNbJGludGVybmFsc10gPVxuICAgICAgdGhpc1skaW50ZXJuYWxzXSA9XG4gICAgICAgIHtcbiAgICAgICAgICBhY2Nlc3NvcnM6IHt9LFxuICAgICAgICB9KTtcblxuICAgIGNvbnN0IGFjY2Vzc29ycyA9IGludGVybmFscy5hY2Nlc3NvcnM7XG4gICAgY29uc3QgcHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVBY2Nlc3NvcihfaGVhZGVyKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWFjY2Vzc29yc1tsSGVhZGVyXSkge1xuICAgICAgICBidWlsZEFjY2Vzc29ycyhwcm90b3R5cGUsIF9oZWFkZXIpO1xuICAgICAgICBhY2Nlc3NvcnNbbEhlYWRlcl0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHV0aWxzLmlzQXJyYXkoaGVhZGVyKSA/IGhlYWRlci5mb3JFYWNoKGRlZmluZUFjY2Vzc29yKSA6IGRlZmluZUFjY2Vzc29yKGhlYWRlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5BeGlvc0hlYWRlcnMuYWNjZXNzb3IoW1xuICAnQ29udGVudC1UeXBlJyxcbiAgJ0NvbnRlbnQtTGVuZ3RoJyxcbiAgJ0FjY2VwdCcsXG4gICdBY2NlcHQtRW5jb2RpbmcnLFxuICAnVXNlci1BZ2VudCcsXG4gICdBdXRob3JpemF0aW9uJyxcbl0pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzLnJlZHVjZURlc2NyaXB0b3JzKEF4aW9zSGVhZGVycy5wcm90b3R5cGUsICh7IHZhbHVlIH0sIGtleSkgPT4ge1xuICBsZXQgbWFwcGVkID0ga2V5WzBdLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSk7IC8vIG1hcCBgc2V0YCA9PiBgU2V0YFxuICByZXR1cm4ge1xuICAgIGdldDogKCkgPT4gdmFsdWUsXG4gICAgc2V0KGhlYWRlclZhbHVlKSB7XG4gICAgICB0aGlzW21hcHBlZF0gPSBoZWFkZXJWYWx1ZTtcbiAgICB9LFxuICB9O1xufSk7XG5cbnV0aWxzLmZyZWV6ZU1ldGhvZHMoQXhpb3NIZWFkZXJzKTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3NIZWFkZXJzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5jb25zdCAkaW50ZXJuYWxzID0gU3ltYm9sKCdpbnRlcm5hbHMnKTtcblxuLy8gYGhhbmRsZXJzYCBpcyBwdWJsaWMgYW5kIG1heSBiZSByZXBsYWNlZCB3aXRoIGEgbnVsbGlzaCB2YWx1ZSBieSB1c2VyIGNvZGU7XG4vLyBgY2xlYXIoKWAgaGFzIGFsd2F5cyB0b2xlcmF0ZWQgdGhhdC4gVHJlYXQgaXQgYXMgYW4gZW1wdHkgc3RhY2sgcmF0aGVyIHRoYW5cbi8vIGRlcmVmZXJlbmNpbmcgaXQuXG5mdW5jdGlvbiBjb3VudEhhbmRsZXJzKGhhbmRsZXJzKSB7XG4gIHJldHVybiBoYW5kbGVycyA/IGhhbmRsZXJzLmxlbmd0aCA6IDA7XG59XG5cbmZ1bmN0aW9uIHRyaW1IYW5kbGVycyhoYW5kbGVycykge1xuICBpZiAoIWhhbmRsZXJzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgd2hpbGUgKGhhbmRsZXJzLmxlbmd0aCAmJiBoYW5kbGVyc1toYW5kbGVycy5sZW5ndGggLSAxXSA9PT0gbnVsbCkge1xuICAgIGhhbmRsZXJzLnBvcCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN5bmNIYW5kbGVyRW50cmllcyhtYW5hZ2VyLCBpbnRlcm5hbHMpIHtcbiAgY29uc3QgaGFuZGxlcnMgPSBtYW5hZ2VyLmhhbmRsZXJzO1xuICBjb25zdCBsZW5ndGggPSBjb3VudEhhbmRsZXJzKGhhbmRsZXJzKTtcblxuICBpZiAoaGFuZGxlcnMgIT09IGludGVybmFscy5oYW5kbGVyc1JlZikge1xuICAgIGludGVybmFscy5oYW5kbGVyc1JlZiA9IGhhbmRsZXJzO1xuICAgIGludGVybmFscy5oYW5kbGVyRW50cmllcy5jbGVhcigpO1xuICB9IGVsc2UgaWYgKGxlbmd0aCAhPT0gaW50ZXJuYWxzLmhhbmRsZXJzTGVuZ3RoKSB7XG4gICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgIGludGVybmFscy5oYW5kbGVyRW50cmllcy5jbGVhcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnRlcm5hbHMuaGFuZGxlckVudHJpZXMuZm9yRWFjaChmdW5jdGlvbiByZW1vdmVTdGFsZUVudHJ5KGVudHJ5LCBpZCkge1xuICAgICAgICBpZiAoaGFuZGxlcnNbZW50cnkuaW5kZXhdICE9PSBlbnRyeS5oYW5kbGVyKSB7XG4gICAgICAgICAgaW50ZXJuYWxzLmhhbmRsZXJFbnRyaWVzLmRlbGV0ZShpZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGludGVybmFscy5oYW5kbGVyc0xlbmd0aCA9IGxlbmd0aDtcbn1cblxuY2xhc3MgSW50ZXJjZXB0b3JNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIHRoaXNbJGludGVybmFsc10gPSB7XG4gICAgICBoYW5kbGVyc1JlZjogdGhpcy5oYW5kbGVycyxcbiAgICAgIGhhbmRsZXJzTGVuZ3RoOiB0aGlzLmhhbmRsZXJzLmxlbmd0aCxcbiAgICAgIGhhbmRsZXJFbnRyaWVzOiBuZXcgTWFwKCksXG4gICAgICBpdGVyYXRpb25EZXB0aDogMCxcbiAgICAgIG5leHRJZDogMCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgb3B0aW9ucyBmb3IgdGhlIGludGVyY2VwdG9yLCBzeW5jaHJvbm91cyBhbmQgcnVuV2hlblxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gICAqL1xuICB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCwgb3B0aW9ucykge1xuICAgIGNvbnN0IGhhbmRsZXIgPSB7XG4gICAgICBmdWxmaWxsZWQsXG4gICAgICByZWplY3RlZCxcbiAgICAgIHN5bmNocm9ub3VzOiBvcHRpb25zID8gb3B0aW9ucy5zeW5jaHJvbm91cyA6IGZhbHNlLFxuICAgICAgcnVuV2hlbjogb3B0aW9ucyA/IG9wdGlvbnMucnVuV2hlbiA6IG51bGwsXG4gICAgfTtcbiAgICBjb25zdCBpbnRlcm5hbHMgPSB0aGlzWyRpbnRlcm5hbHNdO1xuXG4gICAgaWYgKHRoaXMuaGFuZGxlcnMgPT0gbnVsbCkge1xuICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIH1cblxuICAgIHN5bmNIYW5kbGVyRW50cmllcyh0aGlzLCBpbnRlcm5hbHMpO1xuXG4gICAgY29uc3QgaWQgPSBpbnRlcm5hbHMubmV4dElkKys7XG5cbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goaGFuZGxlcik7XG4gICAgaW50ZXJuYWxzLmhhbmRsZXJFbnRyaWVzLnNldChpZCwge1xuICAgICAgaGFuZGxlcixcbiAgICAgIGluZGV4OiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDEsXG4gICAgfSk7XG4gICAgaW50ZXJuYWxzLmhhbmRsZXJzTGVuZ3RoID0gdGhpcy5oYW5kbGVycy5sZW5ndGg7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBlamVjdChpZCkge1xuICAgIGNvbnN0IGludGVybmFscyA9IHRoaXNbJGludGVybmFsc107XG5cbiAgICBzeW5jSGFuZGxlckVudHJpZXModGhpcywgaW50ZXJuYWxzKTtcblxuICAgIGNvbnN0IGVudHJ5ID0gaW50ZXJuYWxzLmhhbmRsZXJFbnRyaWVzLmdldChpZCk7XG5cbiAgICBpZiAoZW50cnkpIHtcbiAgICAgIGludGVybmFscy5oYW5kbGVyRW50cmllcy5kZWxldGUoaWQpO1xuXG4gICAgICAvLyBJZ25vcmUgSURzIGludmFsaWRhdGVkIGJ5IGNsZWFyIG9yIGRpcmVjdCByZXBsYWNlbWVudCBvZiBoYW5kbGVycy5cbiAgICAgIGlmICh0aGlzLmhhbmRsZXJzW2VudHJ5LmluZGV4XSAhPT0gZW50cnkuaGFuZGxlcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaGFuZGxlcnNbZW50cnkuaW5kZXhdID0gbnVsbDtcblxuICAgICAgLy8gRG8gbm90IHJldXNlIGFuIGluZGV4IHdoaWxlIGZvckVhY2ggaXMgd2Fsa2luZyBpdHMgbGVuZ3RoIHNuYXBzaG90LlxuICAgICAgaWYgKCFpbnRlcm5hbHMuaXRlcmF0aW9uRGVwdGgpIHtcbiAgICAgICAgdHJpbUhhbmRsZXJzKHRoaXMuaGFuZGxlcnMpO1xuICAgICAgICBpbnRlcm5hbHMuaGFuZGxlcnNMZW5ndGggPSB0aGlzLmhhbmRsZXJzLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYWxsIGludGVyY2VwdG9ycyBmcm9tIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGNsZWFyKCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gICAgICBzeW5jSGFuZGxlckVudHJpZXModGhpcywgdGhpc1skaW50ZXJuYWxzXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gICAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICAgKlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGZvckVhY2goZm4pIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPSB0aGlzWyRpbnRlcm5hbHNdO1xuXG4gICAgc3luY0hhbmRsZXJFbnRyaWVzKHRoaXMsIGludGVybmFscyk7XG5cbiAgICBpbnRlcm5hbHMuaXRlcmF0aW9uRGVwdGgrKztcblxuICAgIHRyeSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICAgICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgICAgICBmbihoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmICghLS1pbnRlcm5hbHMuaXRlcmF0aW9uRGVwdGgpIHtcbiAgICAgICAgc3luY0hhbmRsZXJFbnRyaWVzKHRoaXMsIGludGVybmFscyk7XG4gICAgICAgIHRyaW1IYW5kbGVycyh0aGlzLmhhbmRsZXJzKTtcbiAgICAgICAgaW50ZXJuYWxzLmhhbmRsZXJzTGVuZ3RoID0gY291bnRIYW5kbGVycyh0aGlzLmhhbmRsZXJzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NFcnJvciwgeyBSRURBQ1RFRCB9IGZyb20gJy4vQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgaXNBYnNvbHV0ZVVSTCBmcm9tICcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMnO1xuaW1wb3J0IGNvbWJpbmVVUkxzIGZyb20gJy4uL2hlbHBlcnMvY29tYmluZVVSTHMuanMnO1xuaW1wb3J0IG5vcm1hbGl6ZVVSTEZvclByb3RvY29sQ2hlY2sgZnJvbSAnLi4vaGVscGVycy9ub3JtYWxpemVVUkxGb3JQcm90b2NvbENoZWNrLmpzJztcblxuY29uc3QgbWFsZm9ybWVkSHR0cFByb3RvY29sID0gL15odHRwcz86KD8hXFwvXFwvKS9pO1xuXG4vLyBSZWRhY3QgdGhlIHBhcnRzIG9mIGEgVVJMIHRoYXQgY2FuIGNhcnJ5IHNlY3JldHMgYmVmb3JlIGl0IGlzIGVtYmVkZGVkIGluIGFuXG4vLyBlcnJvciBtZXNzYWdlLiBBeGlvc0Vycm9yLnRvSlNPTigpIHNlcmlhbGl6ZXMgYG1lc3NhZ2VgIHZlcmJhdGltIGFuZCBlcnJvcnNcbi8vIGFyZSBjb21tb25seSBsb2dnZWQsIHdoaWxlIHRoZSBvcHQtaW4gYGNvbmZpZy5yZWRhY3RgIG1vZGVsIG9ubHkgY2xlYW5zXG4vLyBjb25maWcga2V5cyDigJQgaXQgY2Fubm90IHJlYWNoIHRoZSBtZXNzYWdlLiBSZWRhY3Qgb25seSB0aGUgZ2VudWluZWx5XG4vLyBzZW5zaXRpdmUgc3Vic3RyaW5ncyDigJQgdXNlcmluZm8gKGNyZWRlbnRpYWxzKSwgcXVlcnkgcGFyYW1ldGVyIHZhbHVlcyBhbmRcbi8vIGZyYWdtZW50IGNvbnRlbnRzIOKAlCB3aXRoIHRoZSBzYW1lIFJFREFDVEVEIG1hcmtlciB0aGUgY29uZmlnIHJlZGFjdGlvbiB1c2VzLFxuLy8gd2hpbGUga2VlcGluZyB0aGUgc2NoZW1lLCBob3N0LCBwYXRoIGFuZCBwYXJhbWV0ZXIgbmFtZXMgc28gdGhlIG9mZmVuZGluZ1xuLy8gcmVxdWVzdCBzdGF5cyBhY2N1cmF0ZWx5IGlkZW50aWZpYWJsZS5cbmZ1bmN0aW9uIHJlZGFjdEZyYWdtZW50KGZyYWdtZW50KSB7XG4gIGlmICghZnJhZ21lbnQpIHtcbiAgICByZXR1cm4gZnJhZ21lbnQ7XG4gIH1cblxuICByZXR1cm4gZnJhZ21lbnQucmVwbGFjZSgvKF58JikoW149Jl0qPSk/W14mXSsvZywgKG1hdGNoLCBzZXBhcmF0b3IsIHBhcmFtZXRlck5hbWUgPSAnJykgPT4ge1xuICAgIHJldHVybiBgJHtzZXBhcmF0b3J9JHtwYXJhbWV0ZXJOYW1lfSR7UkVEQUNURUR9YDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlZGFjdFNlbnNpdGl2ZVVSTFBhcnRzKHVybCkge1xuICBjb25zdCByZWRhY3RlZFVSTCA9IHVybC5yZXBsYWNlKC9eKGh0dHBzPzpcXC97MCwyfSlbXi8/I10qQC9pLCBgJDEke1JFREFDVEVEfUBgKTtcbiAgY29uc3QgZnJhZ21lbnRJbmRleCA9IHJlZGFjdGVkVVJMLmluZGV4T2YoJyMnKTtcbiAgY29uc3QgdXJsV2l0aG91dEZyYWdtZW50ID1cbiAgICBmcmFnbWVudEluZGV4ID09PSAtMSA/IHJlZGFjdGVkVVJMIDogcmVkYWN0ZWRVUkwuc2xpY2UoMCwgZnJhZ21lbnRJbmRleCk7XG4gIGNvbnN0IHJlZGFjdGVkVVJMV2l0aG91dEZyYWdtZW50ID0gdXJsV2l0aG91dEZyYWdtZW50LnJlcGxhY2UoXG4gICAgLyhbPyZdW149JiNdKj0pW14mI10qL2csXG4gICAgYCQxJHtSRURBQ1RFRH1gXG4gICk7XG5cbiAgaWYgKGZyYWdtZW50SW5kZXggPT09IC0xKSB7XG4gICAgcmV0dXJuIHJlZGFjdGVkVVJMV2l0aG91dEZyYWdtZW50O1xuICB9XG5cbiAgcmV0dXJuIGAke3JlZGFjdGVkVVJMV2l0aG91dEZyYWdtZW50fSMke3JlZGFjdEZyYWdtZW50KHJlZGFjdGVkVVJMLnNsaWNlKGZyYWdtZW50SW5kZXggKyAxKSl9YDtcbn1cblxuZnVuY3Rpb24gYXNzZXJ0VmFsaWRIdHRwUHJvdG9jb2xVUkwodXJsLCBjb25maWcpIHtcbiAgaWYgKHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZFVSTCA9IG5vcm1hbGl6ZVVSTEZvclByb3RvY29sQ2hlY2sodXJsKTtcbiAgICBpZiAobWFsZm9ybWVkSHR0cFByb3RvY29sLnRlc3Qobm9ybWFsaXplZFVSTCkpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBgSW52YWxpZCBVUkwgJHtKU09OLnN0cmluZ2lmeShyZWRhY3RTZW5zaXRpdmVVUkxQYXJ0cyhub3JtYWxpemVkVVJMKSl9OiBtaXNzaW5nIFwiLy9cIiBhZnRlciBwcm90b2NvbGAsXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0lOVkFMSURfVVJMLFxuICAgICAgICBjb25maWdcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCwgYWxsb3dBYnNvbHV0ZVVybHMsIGNvbmZpZykge1xuICBhc3NlcnRWYWxpZEh0dHBQcm90b2NvbFVSTChyZXF1ZXN0ZWRVUkwsIGNvbmZpZyk7XG4gIGxldCBpc1JlbGF0aXZlVXJsID0gIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKTtcbiAgaWYgKGJhc2VVUkwgJiYgKGlzUmVsYXRpdmVVcmwgfHwgYWxsb3dBYnNvbHV0ZVVybHMgPT09IGZhbHNlKSkge1xuICAgIGFzc2VydFZhbGlkSHR0cFByb3RvY29sVVJMKGJhc2VVUkwsIGNvbmZpZyk7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHRyYW5zZm9ybURhdGEgZnJvbSAnLi90cmFuc2Zvcm1EYXRhLmpzJztcbmltcG9ydCBpc0NhbmNlbCBmcm9tICcuLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gJy4uL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzJztcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNpZ25hbCAmJiBjb25maWcuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KF9jb25maWcpIHtcbiAgLy8gSW50ZXJjZXB0b3JzIG1heSByZXBsYWNlIHRoZSBtZXJnZWQgY29uZmlnIHdpdGggYW4gb3JkaW5hcnkgb2JqZWN0LiBGbGF0dGVuXG4gIC8vIGl0IGF0IHRoZSBkaXNwYXRjaCBib3VuZGFyeSBzbyBzaGFyZWQgcHJvdG90eXBlIG1lbWJlcnMgY2Fubm90IGJlY29tZVxuICAvLyByZXF1ZXN0IGJlaGF2aW9yLCB3aGlsZSBwcmVzZXJ2aW5nIGludGVudGlvbmFsIHRlbXBsYXRlL2NsYXNzIG1lbWJlcnMuXG4gIGNvbnN0IGNvbmZpZyA9IHV0aWxzLnRvU2FmZUZsYXRPYmplY3QoX2NvbmZpZyk7XG5cbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20odXRpbHMuZ2V0U2FmZVByb3AoY29uZmlnLCAnaGVhZGVycycpKTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKGNvbmZpZywgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3QpO1xuXG4gIGlmIChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10uaW5kZXhPZihjb25maWcubWV0aG9kKSAhPT0gLTEpIHtcbiAgICBjb25maWcuaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJywgZmFsc2UpO1xuICB9XG5cbiAgY29uc3QgYWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXIoY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlciwgY29uZmlnKTtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oXG4gICAgZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBFeHBvc2UgdGhlIGN1cnJlbnQgcmVzcG9uc2Ugb24gY29uZmlnIHNvIHRoYXQgdHJhbnNmb3JtUmVzcG9uc2UgY2FuXG4gICAgICAvLyBhdHRhY2ggaXQgdG8gYW55IEF4aW9zRXJyb3IgaXQgdGhyb3dzIChlLmcuIG9uIEpTT04gcGFyc2UgZmFpbHVyZSkuXG4gICAgICAvLyBXZSBjbGVhbiBpdCB1cCBhZnRlcndhcmRzIHRvIGF2b2lkIHBvbGx1dGluZyB0aGUgY29uZmlnIG9iamVjdC5cbiAgICAgIGNvbmZpZy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChjb25maWcsIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSwgcmVzcG9uc2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5yZXNwb25zZTtcbiAgICAgIH1cblxuICAgICAgcmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSxcbiAgICBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgICAgY29uZmlnLnJlc3BvbnNlID0gcmVhc29uLnJlc3BvbnNlO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICAgICAgICAgIHJlYXNvbi5yZXNwb25zZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5yZXNwb25zZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShyZWFzb24ucmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gICAgfVxuICApO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5cbmNvbnN0IGhlYWRlcnNUb09iamVjdCA9ICh0aGluZykgPT4gKHRoaW5nIGluc3RhbmNlb2YgQXhpb3NIZWFkZXJzID8geyAuLi50aGluZyB9IDogdGhpbmcpO1xuXG5jb25zdCBvd25FbnVtZXJhYmxlS2V5cyA9ICh0aGluZykgPT4ge1xuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaW5nKS5jb25jYXQoXG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRoaW5nKS5maWx0ZXIoXG4gICAgICAgIChzeW1ib2wpID0+IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpbmcsIHN5bWJvbCkuZW51bWVyYWJsZVxuICAgICAgKVxuICAgICk7XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaW5nKTtcbn07XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMSA9IGNvbmZpZzEgfHwge307XG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuXG4gIC8vIFVzZSBhIG51bGwtcHJvdG90eXBlIG9iamVjdCBzbyB0aGF0IGRvd25zdHJlYW0gcmVhZHMgc3VjaCBhcyBgY29uZmlnLmF1dGhgXG4gIC8vIG9yIGBjb25maWcuYmFzZVVSTGAgY2Fubm90IGluaGVyaXQgcG9sbHV0ZWQgdmFsdWVzIGZyb20gT2JqZWN0LnByb3RvdHlwZS5cbiAgLy8gYGhhc093blByb3BlcnR5YCBpcyByZXN0b3JlZCBhcyBhIG5vbi1lbnVtZXJhYmxlIG93biBzbG90IHRvIHByZXNlcnZlXG4gIC8vIGVyZ29ub21pY3MgZm9yIHVzZXIgY29kZSB0aGF0IHJlbGllcyBvbiBpdC5cbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbmZpZywgJ2hhc093blByb3BlcnR5Jywge1xuICAgIC8vIE51bGwtcHJvdG8gZGVzY3JpcHRvciBzbyBhIHBvbGx1dGVkIE9iamVjdC5wcm90b3R5cGUuZ2V0IGNhbm5vdCB0dXJuXG4gICAgLy8gdGhpcyBkYXRhIGRlc2NyaXB0b3IgaW50byBhbiBhY2Nlc3NvciBkZXNjcmlwdG9yIG9uIHRoZSB3YXkgaW4uXG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIHZhbHVlOiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgfSk7XG5cbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVmFsdWUodGFyZ2V0LCBzb3VyY2UsIHByb3AsIGNhc2VsZXNzKSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiB1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZS5jYWxsKHsgY2FzZWxlc3MgfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMoYSwgYiwgcHJvcCwgY2FzZWxlc3MpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYiwgcHJvcCwgY2FzZWxlc3MpO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhLCBwcm9wLCBjYXNlbGVzcyk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIoYSwgYikge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVHJhbnNpdGlvbmFsT3B0aW9uKHByb3ApIHtcbiAgICBjb25zdCB0cmFuc2l0aW9uYWwyID0gdXRpbHMuaGFzT3duUHJvcChjb25maWcyLCAndHJhbnNpdGlvbmFsJylcbiAgICAgID8gY29uZmlnMi50cmFuc2l0aW9uYWxcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZCh0cmFuc2l0aW9uYWwyKSkge1xuICAgICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodHJhbnNpdGlvbmFsMikpIHtcbiAgICAgICAgaWYgKHV0aWxzLmhhc093blByb3AodHJhbnNpdGlvbmFsMiwgcHJvcCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJhbnNpdGlvbmFsMltwcm9wXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2l0aW9uYWwxID0gdXRpbHMuaGFzT3duUHJvcChjb25maWcxLCAndHJhbnNpdGlvbmFsJylcbiAgICAgID8gY29uZmlnMS50cmFuc2l0aW9uYWxcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodHJhbnNpdGlvbmFsMSkgJiYgdXRpbHMuaGFzT3duUHJvcCh0cmFuc2l0aW9uYWwxLCBwcm9wKSkge1xuICAgICAgcmV0dXJuIHRyYW5zaXRpb25hbDFbcHJvcF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMoYSwgYiwgcHJvcCkge1xuICAgIGlmICh1dGlscy5oYXNPd25Qcm9wKGNvbmZpZzIsIHByb3ApKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYik7XG4gICAgfSBlbHNlIGlmICh1dGlscy5oYXNPd25Qcm9wKGNvbmZpZzEsIHByb3ApKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBtZXJnZU1hcCA9IHtcbiAgICB1cmw6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgbWV0aG9kOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGRhdGE6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgYmFzZVVSTDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlc3BvbnNlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHBhcmFtc1NlcmlhbGl6ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0RXJyb3JNZXNzYWdlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhDcmVkZW50aWFsczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB3aXRoWFNSRlRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGFkYXB0ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VUeXBlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZDb29raWVOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZIZWFkZXJOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uVXBsb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25Eb3dubG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGRlY29tcHJlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Q29udGVudExlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhCb2R5TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGJlZm9yZVJlZGlyZWN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zcG9ydDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cHNBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBjYW5jZWxUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBzb2NrZXRQYXRoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGFsbG93ZWRTb2NrZXRQYXRoczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZUVuY29kaW5nOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHZhbGlkYXRlU3RhdHVzOiBtZXJnZURpcmVjdEtleXMsXG4gICAgaGVhZGVyczogKGEsIGIsIHByb3ApID0+XG4gICAgICBtZXJnZURlZXBQcm9wZXJ0aWVzKGhlYWRlcnNUb09iamVjdChhKSwgaGVhZGVyc1RvT2JqZWN0KGIpLCBwcm9wLCB0cnVlKSxcbiAgfTtcblxuICB1dGlscy5mb3JFYWNoKG93bkVudW1lcmFibGVLZXlzKHsgLi4uY29uZmlnMSwgLi4uY29uZmlnMiB9KSwgZnVuY3Rpb24gY29tcHV0ZUNvbmZpZ1ZhbHVlKHByb3ApIHtcbiAgICBpZiAocHJvcCA9PT0gJ19fcHJvdG9fXycgfHwgcHJvcCA9PT0gJ2NvbnN0cnVjdG9yJyB8fCBwcm9wID09PSAncHJvdG90eXBlJykgcmV0dXJuO1xuICAgIGNvbnN0IG1lcmdlID0gdXRpbHMuaGFzT3duUHJvcChtZXJnZU1hcCwgcHJvcCkgPyBtZXJnZU1hcFtwcm9wXSA6IG1lcmdlRGVlcFByb3BlcnRpZXM7XG4gICAgY29uc3QgYSA9IHV0aWxzLmhhc093blByb3AoY29uZmlnMSwgcHJvcCkgPyBjb25maWcxW3Byb3BdIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGIgPSB1dGlscy5oYXNPd25Qcm9wKGNvbmZpZzIsIHByb3ApID8gY29uZmlnMltwcm9wXSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGEsIGIsIHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgaWYgKFxuICAgIHV0aWxzLmhhc093blByb3AoY29uZmlnMiwgJ3ZhbGlkYXRlU3RhdHVzJykgJiZcbiAgICB1dGlscy5pc1VuZGVmaW5lZChjb25maWcyLnZhbGlkYXRlU3RhdHVzKSAmJlxuICAgIGdldE1lcmdlZFRyYW5zaXRpb25hbE9wdGlvbigndmFsaWRhdGVTdGF0dXNVbmRlZmluZWRSZXNvbHZlcycpID09PSBmYWxzZVxuICApIHtcbiAgICBpZiAodXRpbHMuaGFzT3duUHJvcChjb25maWcxLCAndmFsaWRhdGVTdGF0dXMnKSkge1xuICAgICAgY29uZmlnLnZhbGlkYXRlU3RhdHVzID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxLnZhbGlkYXRlU3RhdHVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIGNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29uZmlnO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBtZXRob2RMaXN0ID0gT2JqZWN0LmZyZWV6ZShbXG4gICdnZXQnLFxuICAnZGVsZXRlJyxcbiAgJ2hlYWQnLFxuICAnb3B0aW9ucycsXG4gICdwb3N0JyxcbiAgJ3B1dCcsXG4gICdwYXRjaCcsXG4gICdwdXJnZScsXG4gICdsaW5rJyxcbiAgJ3VubGluaycsXG4gICdxdWVyeScsXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgbWV0aG9kTGlzdDtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRk9STV9EQVRBX0NPTlRFTlRfSEVBREVSUyA9IFsnY29udGVudC10eXBlJywgJ2NvbnRlbnQtbGVuZ3RoJ107XG5cbi8qKlxuICogQXBwbHkgdGhlIGhlYWRlcnMgZ2VuZXJhdGVkIGJ5IGEgRm9ybURhdGEgaW1wbGVtZW50YXRpb24gdG8gdGhlIHJlcXVlc3QgaGVhZGVycyxcbiAqIGhvbm9yaW5nIHRoZSBgZm9ybURhdGFIZWFkZXJQb2xpY3lgIG9wdGlvbjogd2l0aCAnY29udGVudC1vbmx5JywgY29weSBvbmx5IHRoZVxuICogY29udGVudC0qIGhlYWRlcnM7IG90aGVyd2lzZSBtZXJnZSBhbGwgb2YgdGhlbS5cbiAqXG4gKiBAcGFyYW0ge0F4aW9zSGVhZGVyc30gaGVhZGVycyAtIHRoZSByZXF1ZXN0IGhlYWRlcnMgdG8gbXV0YXRlXG4gKiBAcGFyYW0ge09iamVjdCB8IG51bGwgfCB1bmRlZmluZWR9IGZvcm1IZWFkZXJzIC0gaGVhZGVycyBwcm9kdWNlZCBieSB0aGUgRm9ybURhdGEgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSB7U3RyaW5nfSBbcG9saWN5XSAtIHRoZSByZXNvbHZlZCBgZm9ybURhdGFIZWFkZXJQb2xpY3lgIGNvbmZpZyB2YWx1ZVxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXRGb3JtRGF0YUhlYWRlcnMoaGVhZGVycywgZm9ybUhlYWRlcnMsIHBvbGljeSkge1xuICBpZiAocG9saWN5ICE9PSAnY29udGVudC1vbmx5Jykge1xuICAgIGhlYWRlcnMuc2V0KGZvcm1IZWFkZXJzKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBPYmplY3QuZW50cmllcyhmb3JtSGVhZGVycyB8fCB7fSkuZm9yRWFjaCgoW2tleSwgdmFsXSkgPT4ge1xuICAgIGlmIChGT1JNX0RBVEFfQ09OVEVOVF9IRUFERVJTLmluY2x1ZGVzKGtleS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgaGVhZGVycy5zZXQoa2V5LCB2YWwpO1xuICAgIH1cbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vQXhpb3NFcnJvci5qcyc7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHJlc3BvbnNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2Uuc3RhdHVzID49IDQwMCAmJiByZXNwb25zZS5zdGF0dXMgPCA1MDAgPyBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCA6IEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEBwYXJhbSB7P09iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlIG9iamVjdFxuICpcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShmbnMsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IGNvbmZpZyA9IHRoaXMgfHwgZGVmYXVsdHM7XG4gIGNvbnN0IGNvbnRleHQgPSByZXNwb25zZSB8fCBjb25maWc7XG4gIGNvbnN0IGhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShjb250ZXh0LmhlYWRlcnMpO1xuICBsZXQgZGF0YSA9IGNvbnRleHQuZGF0YTtcblxuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuLmNhbGwoY29uZmlnLCBkYXRhLCBoZWFkZXJzLm5vcm1hbGl6ZSgpLCByZXNwb25zZSA/IHJlc3BvbnNlLnN0YXR1cyA6IHVuZGVmaW5lZCk7XG4gIH0pO1xuXG4gIGhlYWRlcnMubm9ybWFsaXplKCk7XG5cbiAgcmV0dXJuIGRhdGE7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHRyYW5zaXRpb25hbERlZmF1bHRzIGZyb20gJy4vdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4uL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgdG9VUkxFbmNvZGVkRm9ybSBmcm9tICcuLi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBmb3JtRGF0YVRvSlNPTiBmcm9tICcuLi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzJztcbmltcG9ydCBtZXRob2RMaXN0IGZyb20gJy4uL2NvcmUvbWV0aG9kTGlzdC5qcyc7XG5cbmNvbnN0IG93biA9IChvYmosIGtleSkgPT4gKG9iaiAhPSBudWxsICYmIHV0aWxzLmhhc093blByb3Aob2JqLCBrZXkpID8gb2JqW2tleV0gOiB1bmRlZmluZWQpO1xuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nLCB0cmllcyB0byBwYXJzZSBpdCwgYW5kIGlmIGl0IGZhaWxzLCBpdCByZXR1cm5zIHRoZSBzdHJpbmdpZmllZCB2ZXJzaW9uXG4gKiBvZiB0aGUgaW5wdXRcbiAqXG4gKiBAcGFyYW0ge2FueX0gcmF3VmFsdWUgLSBUaGUgdmFsdWUgdG8gYmUgc3RyaW5naWZpZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXJzZXIgLSBBIGZ1bmN0aW9uIHRoYXQgcGFyc2VzIGEgc3RyaW5nIGludG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVuY29kZXIgLSBBIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSB2YWx1ZSBhbmQgcmV0dXJucyBhIHN0cmluZy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBIHN0cmluZ2lmaWVkIHZlcnNpb24gb2YgdGhlIHJhd1ZhbHVlLlxuICovXG5mdW5jdGlvbiBzdHJpbmdpZnlTYWZlbHkocmF3VmFsdWUsIHBhcnNlciwgZW5jb2Rlcikge1xuICBpZiAodXRpbHMuaXNTdHJpbmcocmF3VmFsdWUpKSB7XG4gICAgdHJ5IHtcbiAgICAgIChwYXJzZXIgfHwgSlNPTi5wYXJzZSkocmF3VmFsdWUpO1xuICAgICAgcmV0dXJuIHV0aWxzLnRyaW0ocmF3VmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLm5hbWUgIT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gKGVuY29kZXIgfHwgSlNPTi5zdHJpbmdpZnkpKHJhd1ZhbHVlKTtcbn1cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHRyYW5zaXRpb25hbDogdHJhbnNpdGlvbmFsRGVmYXVsdHMsXG5cbiAgYWRhcHRlcjogWyd4aHInLCAnaHR0cCcsICdmZXRjaCddLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtcbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gaGVhZGVycy5nZXRDb250ZW50VHlwZSgpIHx8ICcnO1xuICAgICAgY29uc3QgaGFzSlNPTkNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpID4gLTE7XG4gICAgICBjb25zdCBpc09iamVjdFBheWxvYWQgPSB1dGlscy5pc09iamVjdChkYXRhKTtcblxuICAgICAgaWYgKGlzT2JqZWN0UGF5bG9hZCAmJiB1dGlscy5pc0hUTUxGb3JtKGRhdGEpKSB7XG4gICAgICAgIGRhdGEgPSBuZXcgRm9ybURhdGEoZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzRm9ybURhdGEgPSB1dGlscy5pc0Zvcm1EYXRhKGRhdGEpO1xuXG4gICAgICBpZiAoaXNGb3JtRGF0YSkge1xuICAgICAgICByZXR1cm4gaGFzSlNPTkNvbnRlbnRUeXBlID8gSlNPTi5zdHJpbmdpZnkoZm9ybURhdGFUb0pTT04oZGF0YSkpIDogZGF0YTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgICB1dGlscy5pc0Jsb2IoZGF0YSkgfHxcbiAgICAgICAgdXRpbHMuaXNSZWFkYWJsZVN0cmVhbShkYXRhKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfVxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICAgIH1cbiAgICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGlzRmlsZUxpc3Q7XG5cbiAgICAgIGlmIChpc09iamVjdFBheWxvYWQpIHtcbiAgICAgICAgY29uc3QgZm9ybVNlcmlhbGl6ZXIgPSBvd24odGhpcywgJ2Zvcm1TZXJpYWxpemVyJyk7XG4gICAgICAgIGlmIChjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSA+IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgZm9ybVNlcmlhbGl6ZXIpLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgKGlzRmlsZUxpc3QgPSB1dGlscy5pc0ZpbGVMaXN0KGRhdGEpKSB8fFxuICAgICAgICAgIGNvbnRlbnRUeXBlLmluZGV4T2YoJ211bHRpcGFydC9mb3JtLWRhdGEnKSA+IC0xXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IGVudiA9IG93bih0aGlzLCAnZW52Jyk7XG4gICAgICAgICAgY29uc3QgX0Zvcm1EYXRhID0gZW52ICYmIGVudi5Gb3JtRGF0YTtcblxuICAgICAgICAgIHJldHVybiB0b0Zvcm1EYXRhKFxuICAgICAgICAgICAgaXNGaWxlTGlzdCA/IHsgJ2ZpbGVzW10nOiBkYXRhIH0gOiBkYXRhLFxuICAgICAgICAgICAgX0Zvcm1EYXRhICYmIG5ldyBfRm9ybURhdGEoKSxcbiAgICAgICAgICAgIGZvcm1TZXJpYWxpemVyXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNPYmplY3RQYXlsb2FkIHx8IGhhc0pTT05Db250ZW50VHlwZSkge1xuICAgICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi9qc29uJywgZmFsc2UpO1xuICAgICAgICByZXR1cm4gc3RyaW5naWZ5U2FmZWx5KGRhdGEpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9LFxuICBdLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbXG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgICAgY29uc3QgdHJhbnNpdGlvbmFsID0gb3duKHRoaXMsICd0cmFuc2l0aW9uYWwnKSB8fCBkZWZhdWx0cy50cmFuc2l0aW9uYWw7XG4gICAgICBjb25zdCBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgICBjb25zdCByZXNwb25zZVR5cGUgPSBvd24odGhpcywgJ3Jlc3BvbnNlVHlwZScpO1xuICAgICAgY29uc3QgSlNPTlJlcXVlc3RlZCA9IHJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nO1xuXG4gICAgICBpZiAodXRpbHMuaXNSZXNwb25zZShkYXRhKSB8fCB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGRhdGEgJiZcbiAgICAgICAgdXRpbHMuaXNTdHJpbmcoZGF0YSkgJiZcbiAgICAgICAgKChmb3JjZWRKU09OUGFyc2luZyAmJiAhcmVzcG9uc2VUeXBlKSB8fCBKU09OUmVxdWVzdGVkKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICAgICAgY29uc3Qgc3RyaWN0SlNPTlBhcnNpbmcgPSAhc2lsZW50SlNPTlBhcnNpbmcgJiYgSlNPTlJlcXVlc3RlZDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEsIG93bih0aGlzLCAncGFyc2VSZXZpdmVyJykpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKHN0cmljdEpTT05QYXJzaW5nKSB7XG4gICAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsIHRoaXMsIG51bGwsIG93bih0aGlzLCAncmVzcG9uc2UnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9LFxuICBdLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICBlbnY6IHtcbiAgICBGb3JtRGF0YTogcGxhdGZvcm0uY2xhc3Nlcy5Gb3JtRGF0YSxcbiAgICBCbG9iOiBwbGF0Zm9ybS5jbGFzc2VzLkJsb2IsXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6IHVuZGVmaW5lZCxcbiAgICB9LFxuICB9LFxufTtcblxudXRpbHMuZm9yRWFjaChtZXRob2RMaXN0LCAobWV0aG9kKSA9PiB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNpbGVudEpTT05QYXJzaW5nOiB0cnVlLFxuICBmb3JjZWRKU09OUGFyc2luZzogdHJ1ZSxcbiAgY2xhcmlmeVRpbWVvdXRFcnJvcjogZmFsc2UsXG4gIGxlZ2FjeUludGVyY2VwdG9yUmVxUmVzT3JkZXJpbmc6IHRydWUsXG4gIGFkdmVydGlzZVpzdGRBY2NlcHRFbmNvZGluZzogZmFsc2UsXG4gIHZhbGlkYXRlU3RhdHVzVW5kZWZpbmVkUmVzb2x2ZXM6IHRydWUsXG59O1xuIiwiZXhwb3J0IGNvbnN0IFZFUlNJT04gPSBcIjEuMjAuMFwiOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi90b0Zvcm1EYXRhLmpzJztcblxuLyoqXG4gKiBJdCBlbmNvZGVzIGEgc3RyaW5nIGJ5IHJlcGxhY2luZyBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgaW4gdGhlIHVucmVzZXJ2ZWQgc2V0IHdpdGhcbiAqIHRoZWlyIHBlcmNlbnQtZW5jb2RlZCBlcXVpdmFsZW50c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIGVuY29kZS5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZShzdHIpIHtcbiAgY29uc3QgY2hhck1hcCA9IHtcbiAgICAnISc6ICclMjEnLFxuICAgIFwiJ1wiOiAnJTI3JyxcbiAgICAnKCc6ICclMjgnLFxuICAgICcpJzogJyUyOScsXG4gICAgJ34nOiAnJTdFJyxcbiAgICAnJTIwJzogJysnLFxuICB9O1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCl+XXwlMjAvZywgZnVuY3Rpb24gcmVwbGFjZXIobWF0Y2gpIHtcbiAgICByZXR1cm4gY2hhck1hcFttYXRjaF07XG4gIH0pO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcGFyYW1zIG9iamVjdCBhbmQgY29udmVydHMgaXQgdG8gYSBGb3JtRGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IHBhcmFtcyAtIFRoZSBwYXJhbWV0ZXJzIHRvIGJlIGNvbnZlcnRlZCB0byBhIEZvcm1EYXRhIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdCBwYXNzZWQgdG8gdGhlIEF4aW9zIGNvbnN0cnVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIG9wdGlvbnMpIHtcbiAgdGhpcy5fcGFpcnMgPSBbXTtcblxuICBwYXJhbXMgJiYgdG9Gb3JtRGF0YShwYXJhbXMsIHRoaXMsIG9wdGlvbnMpO1xufVxuXG5jb25zdCBwcm90b3R5cGUgPSBBeGlvc1VSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGU7XG5cbnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiBhcHBlbmQobmFtZSwgdmFsdWUpIHtcbiAgdGhpcy5fcGFpcnMucHVzaChbbmFtZSwgdmFsdWVdKTtcbn07XG5cbnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKGVuY29kZXIpIHtcbiAgY29uc3QgX2VuY29kZSA9IGVuY29kZXJcbiAgICA/ICh2YWx1ZSkgPT4gZW5jb2Rlci5jYWxsKHRoaXMsIHZhbHVlLCBlbmNvZGUpXG4gICAgOiBlbmNvZGU7XG5cbiAgcmV0dXJuIHRoaXMuX3BhaXJzXG4gICAgLm1hcChmdW5jdGlvbiBlYWNoKHBhaXIpIHtcbiAgICAgIHJldHVybiBfZW5jb2RlKHBhaXJbMF0pICsgJz0nICsgX2VuY29kZShwYWlyWzFdKTtcbiAgICB9LCAnJylcbiAgICAuam9pbignJicpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3NVUkxTZWFyY2hQYXJhbXM7XG4iLCJjb25zdCBIdHRwU3RhdHVzQ29kZSA9IHtcbiAgQ29udGludWU6IDEwMCxcbiAgU3dpdGNoaW5nUHJvdG9jb2xzOiAxMDEsXG4gIFByb2Nlc3Npbmc6IDEwMixcbiAgRWFybHlIaW50czogMTAzLFxuICBPazogMjAwLFxuICBDcmVhdGVkOiAyMDEsXG4gIEFjY2VwdGVkOiAyMDIsXG4gIE5vbkF1dGhvcml0YXRpdmVJbmZvcm1hdGlvbjogMjAzLFxuICBOb0NvbnRlbnQ6IDIwNCxcbiAgUmVzZXRDb250ZW50OiAyMDUsXG4gIFBhcnRpYWxDb250ZW50OiAyMDYsXG4gIE11bHRpU3RhdHVzOiAyMDcsXG4gIEFscmVhZHlSZXBvcnRlZDogMjA4LFxuICBJbVVzZWQ6IDIyNixcbiAgTXVsdGlwbGVDaG9pY2VzOiAzMDAsXG4gIE1vdmVkUGVybWFuZW50bHk6IDMwMSxcbiAgRm91bmQ6IDMwMixcbiAgU2VlT3RoZXI6IDMwMyxcbiAgTm90TW9kaWZpZWQ6IDMwNCxcbiAgVXNlUHJveHk6IDMwNSxcbiAgVW51c2VkOiAzMDYsXG4gIFRlbXBvcmFyeVJlZGlyZWN0OiAzMDcsXG4gIFBlcm1hbmVudFJlZGlyZWN0OiAzMDgsXG4gIEJhZFJlcXVlc3Q6IDQwMCxcbiAgVW5hdXRob3JpemVkOiA0MDEsXG4gIFBheW1lbnRSZXF1aXJlZDogNDAyLFxuICBGb3JiaWRkZW46IDQwMyxcbiAgTm90Rm91bmQ6IDQwNCxcbiAgTWV0aG9kTm90QWxsb3dlZDogNDA1LFxuICBOb3RBY2NlcHRhYmxlOiA0MDYsXG4gIFByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZDogNDA3LFxuICBSZXF1ZXN0VGltZW91dDogNDA4LFxuICBDb25mbGljdDogNDA5LFxuICBHb25lOiA0MTAsXG4gIExlbmd0aFJlcXVpcmVkOiA0MTEsXG4gIFByZWNvbmRpdGlvbkZhaWxlZDogNDEyLFxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBDb250ZW50VG9vTGFyZ2VgIGluc3RlYWQuXG4gICAqL1xuICBQYXlsb2FkVG9vTGFyZ2U6IDQxMyxcbiAgQ29udGVudFRvb0xhcmdlOiA0MTMsXG4gIFVyaVRvb0xvbmc6IDQxNCxcbiAgVW5zdXBwb3J0ZWRNZWRpYVR5cGU6IDQxNSxcbiAgUmFuZ2VOb3RTYXRpc2ZpYWJsZTogNDE2LFxuICBFeHBlY3RhdGlvbkZhaWxlZDogNDE3LFxuICBJbUFUZWFwb3Q6IDQxOCxcbiAgTWlzZGlyZWN0ZWRSZXF1ZXN0OiA0MjEsXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgYFVucHJvY2Vzc2FibGVDb250ZW50YCBpbnN0ZWFkLlxuICAgKi9cbiAgVW5wcm9jZXNzYWJsZUVudGl0eTogNDIyLFxuICBVbnByb2Nlc3NhYmxlQ29udGVudDogNDIyLFxuICBMb2NrZWQ6IDQyMyxcbiAgRmFpbGVkRGVwZW5kZW5jeTogNDI0LFxuICBUb29FYXJseTogNDI1LFxuICBVcGdyYWRlUmVxdWlyZWQ6IDQyNixcbiAgUHJlY29uZGl0aW9uUmVxdWlyZWQ6IDQyOCxcbiAgVG9vTWFueVJlcXVlc3RzOiA0MjksXG4gIFJlcXVlc3RIZWFkZXJGaWVsZHNUb29MYXJnZTogNDMxLFxuICBVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29uczogNDUxLFxuICBJbnRlcm5hbFNlcnZlckVycm9yOiA1MDAsXG4gIE5vdEltcGxlbWVudGVkOiA1MDEsXG4gIEJhZEdhdGV3YXk6IDUwMixcbiAgU2VydmljZVVuYXZhaWxhYmxlOiA1MDMsXG4gIEdhdGV3YXlUaW1lb3V0OiA1MDQsXG4gIEh0dHBWZXJzaW9uTm90U3VwcG9ydGVkOiA1MDUsXG4gIFZhcmlhbnRBbHNvTmVnb3RpYXRlczogNTA2LFxuICBJbnN1ZmZpY2llbnRTdG9yYWdlOiA1MDcsXG4gIExvb3BEZXRlY3RlZDogNTA4LFxuICBOb3RFeHRlbmRlZDogNTEwLFxuICBOZXR3b3JrQXV0aGVudGljYXRpb25SZXF1aXJlZDogNTExLFxuICBXZWJTZXJ2ZXJSZXR1cm5zQW5Vbmtub3duRXJyb3I6IDUyMCxcbiAgV2ViU2VydmVySXNEb3duOiA1MjEsXG4gIENvbm5lY3Rpb25UaW1lZE91dDogNTIyLFxuICBPcmlnaW5Jc1VucmVhY2hhYmxlOiA1MjMsXG4gIFRpbWVvdXRPY2N1cnJlZDogNTI0LFxuICBTc2xIYW5kc2hha2VGYWlsZWQ6IDUyNSxcbiAgSW52YWxpZFNzbENlcnRpZmljYXRlOiA1MjYsXG59O1xuXG5PYmplY3QuZW50cmllcyhIdHRwU3RhdHVzQ29kZSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gIGlmIChIdHRwU3RhdHVzQ29kZVt2YWx1ZV0gPT09IHVuZGVmaW5lZCkge1xuICAgIEh0dHBTdGF0dXNDb2RlW3ZhbHVlXSA9IGtleTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHBTdGF0dXNDb2RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZSBhIGJvdW5kIHZlcnNpb24gb2YgYSBmdW5jdGlvbiB3aXRoIGEgc3BlY2lmaWVkIGB0aGlzYCBjb250ZXh0XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gYmluZFxuICogQHBhcmFtIHsqfSB0aGlzQXJnIC0gVGhlIHZhbHVlIHRvIGJlIHBhc3NlZCBhcyB0aGUgYHRoaXNgIHBhcmFtZXRlclxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB0aGF0IHdpbGwgY2FsbCB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gd2l0aCB0aGUgc3BlY2lmaWVkIGB0aGlzYCBjb250ZXh0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi9BeGlvc1VSTFNlYXJjaFBhcmFtcy5qcyc7XG5cbi8qKlxuICogSXQgcmVwbGFjZXMgVVJMLWVuY29kZWQgZm9ybXMgb2YgYDpgLCBgJGAsIGAsYCwgYW5kIHNwYWNlcyB3aXRoXG4gKiB0aGVpciBwbGFpbiBjb3VudGVycGFydHMgKGA6YCwgYCRgLCBgLGAsIGArYCkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbCBUaGUgdmFsdWUgdG8gYmUgZW5jb2RlZC5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpXG4gICAgLnJlcGxhY2UoLyUzQS9naSwgJzonKVxuICAgIC5yZXBsYWNlKC8lMjQvZywgJyQnKVxuICAgIC5yZXBsYWNlKC8lMkMvZ2ksICcsJylcbiAgICAucmVwbGFjZSgvJTIwL2csICcrJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHBhcmFtIHs/KG9iamVjdHxGdW5jdGlvbil9IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgb3B0aW9ucykge1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gdXJsIHx8ICcnO1xuXG4gIGNvbnN0IF9vcHRpb25zID0gdXRpbHMuaXNGdW5jdGlvbihvcHRpb25zKVxuICAgID8ge1xuICAgICAgICBzZXJpYWxpemU6IG9wdGlvbnMsXG4gICAgICB9XG4gICAgOiBvcHRpb25zO1xuXG4gIC8vIFJlYWQgc2VyaWFsaXplciBvcHRpb25zIHBvbGx1dGlvbi1zYWZlbHk6IG93biBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIG9uIGFcbiAgLy8gY2xhc3MvdGVtcGxhdGUgcHJvdG90eXBlIGFyZSBob25vcmVkLCBidXQgdmFsdWVzIGluamVjdGVkIG9udG8gYSBwb2xsdXRlZFxuICAvLyBPYmplY3QucHJvdG90eXBlIGFyZSBpZ25vcmVkLlxuICBjb25zdCBfZW5jb2RlID0gdXRpbHMuZ2V0U2FmZVByb3AoX29wdGlvbnMsICdlbmNvZGUnKSB8fCBlbmNvZGU7XG4gIGNvbnN0IHNlcmlhbGl6ZUZuID0gdXRpbHMuZ2V0U2FmZVByb3AoX29wdGlvbnMsICdzZXJpYWxpemUnKTtcblxuICBsZXQgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAoc2VyaWFsaXplRm4pIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gc2VyaWFsaXplRm4ocGFyYW1zLCBfb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcylcbiAgICAgID8gcGFyYW1zLnRvU3RyaW5nKClcbiAgICAgIDogbmV3IEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgX29wdGlvbnMpLnRvU3RyaW5nKF9lbmNvZGUpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICBjb25zdCBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICBpZiAoIXJlbGF0aXZlVVJMKSB7XG4gICAgcmV0dXJuIGJhc2VVUkw7XG4gIH1cblxuICBsZXQgZW5kID0gYmFzZVVSTC5sZW5ndGg7XG5cbiAgd2hpbGUgKGVuZCA+IDAgJiYgYmFzZVVSTC5jaGFyQ29kZUF0KGVuZCAtIDEpID09PSA0Nykge1xuICAgIGVuZC0tO1xuICB9XG5cbiAgcmV0dXJuIGJhc2VVUkwuc2xpY2UoMCwgZW5kKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpO1xufVxuIiwiaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbmNvbnN0IGNvbXBvc2VTaWduYWxzID0gKHNpZ25hbHMsIHRpbWVvdXQpID0+IHtcbiAgc2lnbmFscyA9IHNpZ25hbHMgPyBzaWduYWxzLmZpbHRlcihCb29sZWFuKSA6IFtdO1xuXG4gIGlmICghdGltZW91dCAmJiAhc2lnbmFscy5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gIGxldCBhYm9ydGVkID0gZmFsc2U7XG5cbiAgY29uc3Qgb25hYm9ydCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICBpZiAoIWFib3J0ZWQpIHtcbiAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgIGNvbnN0IGVyciA9IHJlYXNvbiBpbnN0YW5jZW9mIEVycm9yID8gcmVhc29uIDogdGhpcy5yZWFzb247XG4gICAgICBjb250cm9sbGVyLmFib3J0KFxuICAgICAgICBlcnIgaW5zdGFuY2VvZiBBeGlvc0Vycm9yXG4gICAgICAgICAgPyBlcnJcbiAgICAgICAgICA6IG5ldyBDYW5jZWxlZEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBlcnIpXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBsZXQgdGltZXIgPVxuICAgIHRpbWVvdXQgJiZcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIG9uYWJvcnQobmV3IEF4aW9zRXJyb3IoYHRpbWVvdXQgb2YgJHt0aW1lb3V0fW1zIGV4Y2VlZGVkYCwgQXhpb3NFcnJvci5FVElNRURPVVQpKTtcbiAgICB9LCB0aW1lb3V0KTtcblxuICBjb25zdCB1bnN1YnNjcmliZSA9ICgpID0+IHtcbiAgICBpZiAoIXNpZ25hbHMpIHsgcmV0dXJuOyB9XG4gICAgdGltZXIgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB0aW1lciA9IG51bGw7XG4gICAgc2lnbmFscy5mb3JFYWNoKChzaWduYWwpID0+IHtcbiAgICAgIHNpZ25hbC51bnN1YnNjcmliZVxuICAgICAgICA/IHNpZ25hbC51bnN1YnNjcmliZShvbmFib3J0KVxuICAgICAgICA6IHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpO1xuICAgIH0pO1xuICAgIHNpZ25hbHMgPSBudWxsO1xuICB9O1xuXG4gIHNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiB7XG4gICAgaWYgKGFib3J0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgIG9uYWJvcnQuY2FsbChzaWduYWwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQsIHsgb25jZTogdHJ1ZSB9KTtcbiAgfSk7XG5cbiAgY29uc3QgeyBzaWduYWwgfSA9IGNvbnRyb2xsZXI7XG5cbiAgc2lnbmFsLnVuc3Vic2NyaWJlID0gKCkgPT4gdXRpbHMuYXNhcCh1bnN1YnNjcmliZSk7XG5cbiAgcmV0dXJuIHNpZ25hbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvc2VTaWduYWxzO1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudlxuICA/IC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIHtcbiAgICAgIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSwgc2FtZVNpdGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgICAgICBjb25zdCBjb29raWUgPSBbYCR7bmFtZX09JHtlbmNvZGVVUklDb21wb25lbnQodmFsdWUpfWBdO1xuXG4gICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKGBleHBpcmVzPSR7bmV3IERhdGUoZXhwaXJlcykudG9VVENTdHJpbmcoKX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICBjb29raWUucHVzaChgcGF0aD0ke3BhdGh9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaChgZG9tYWluPSR7ZG9tYWlufWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHNhbWVTaXRlKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKGBTYW1lU2l0ZT0ke3NhbWVTaXRlfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICB9LFxuXG4gICAgICByZWFkKG5hbWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBudWxsO1xuICAgICAgICAvLyBNYXRjaCBuYW1lPXZhbHVlIGJ5IHNwbGl0dGluZyBvbiB0aGUgc2VtaWNvbG9uIHNlcGFyYXRvciBpbnN0ZWFkIG9mIGJ1aWxkaW5nIGFcbiAgICAgICAgLy8gUmVnRXhwIGZyb20gYG5hbWVgIOKAlCBpbnRlcnBvbGF0aW5nIGFuIHVuZXNjYXBlZCBzdHJpbmcgaW50byBhIFJlZ0V4cCB3b3VsZCBsZXRcbiAgICAgICAgLy8gbWV0YWNoYXJhY3RlcnMgKGUuZy4gYC4rP2AgaW4gYW4gYXR0YWNrZXItaW5mbHVlbmNlZCBjb29raWUgbmFtZSkgY2F1c2UgUmVEb1Mgb3JcbiAgICAgICAgLy8gbWF0Y2ggdGhlIHdyb25nIGNvb2tpZS4gQnJvd3NlcnMgbWF5IHNlcmlhbGl6ZSBjb29raWUgcGFpcnMgYXMgZWl0aGVyIFwiO1wiIG9yXG4gICAgICAgIC8vIFwiOyBcIiwgc28gaWdub3JlIG9wdGlvbmFsIHdoaXRlc3BhY2UgYmVmb3JlIGVhY2ggY29va2llIG5hbWUuXG4gICAgICAgIGNvbnN0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29raWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY29va2llID0gY29va2llc1tpXS5yZXBsYWNlKC9eXFxzKy8sICcnKTtcbiAgICAgICAgICBjb25zdCBlcSA9IGNvb2tpZS5pbmRleE9mKCc9Jyk7XG4gICAgICAgICAgaWYgKGVxICE9PSAtMSAmJiBjb29raWUuc2xpY2UoMCwgZXEpID09PSBuYW1lKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGNvb2tpZS5zbGljZShlcSArIDEpKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvb2tpZS5zbGljZShlcSArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZShuYW1lKSB7XG4gICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCwgJy8nKTtcbiAgICAgIH0sXG4gICAgfVxuICA6IC8vIE5vbi1zdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICB7XG4gICAgICB3cml0ZSgpIHt9LFxuICAgICAgcmVhZCgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlKCkge30sXG4gICAgfTtcbiIsIi8qKlxuICogRXN0aW1hdGUgZGF0YTogVVJMIGJ5dGUgbGVuZ3RocyAqd2l0aG91dCogYWxsb2NhdGluZyBsYXJnZSBidWZmZXJzLlxuICogLSBGZXRjaCBwZXJjZW50LWRlY29kZXMgYSBiYXNlNjQgYm9keSBiZWZvcmUgZGVjb2RpbmcgaXQuXG4gKiAtIE5vZGUncyBCdWZmZXIuZnJvbShib2R5LCAnYmFzZTY0Jykgc2l6ZXMgaXRzIGJhY2tpbmcgYWxsb2NhdGlvbiBmcm9tIHRoZVxuICogICByYXcgYm9keSwgaW5jbHVkaW5nIGlnbm9yZWQgY2hhcmFjdGVycyBhbmQgY29udGVudCBhZnRlciBwYWRkaW5nLlxuICogLSBOb24tYmFzZTY0IGRhdGEgaXMgcGVyY2VudC1kZWNvZGVkIGFuZCB0aGVuIGVuY29kZWQgYXMgVVRGLTguXG4gKi9cbmNvbnN0IGlzSGV4RGlnaXQgPSAoY2hhckNvZGUpID0+XG4gIChjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1NykgfHxcbiAgKGNoYXJDb2RlID49IDY1ICYmIGNoYXJDb2RlIDw9IDcwKSB8fFxuICAoY2hhckNvZGUgPj0gOTcgJiYgY2hhckNvZGUgPD0gMTAyKTtcblxuY29uc3QgaXNQZXJjZW50RW5jb2RlZEJ5dGUgPSAoc3RyLCBpLCBsZW4pID0+XG4gIGkgKyAyIDwgbGVuICYmIGlzSGV4RGlnaXQoc3RyLmNoYXJDb2RlQXQoaSArIDEpKSAmJiBpc0hleERpZ2l0KHN0ci5jaGFyQ29kZUF0KGkgKyAyKSk7XG5cbmNvbnN0IGhleFZhbHVlID0gKGNoYXJDb2RlKSA9PiAoY2hhckNvZGUgPD0gNTcgPyBjaGFyQ29kZSAtIDQ4IDogKGNoYXJDb2RlICYgMHhkZikgLSA1NSk7XG5cbmNvbnN0IGlzQmFzZTY0Q2hhciA9IChjaGFyQ29kZSkgPT5cbiAgKGNoYXJDb2RlID49IDY1ICYmIGNoYXJDb2RlIDw9IDkwKSB8fCAvLyBBLVpcbiAgKGNoYXJDb2RlID49IDk3ICYmIGNoYXJDb2RlIDw9IDEyMikgfHwgLy8gYS16XG4gIChjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1NykgfHwgLy8gMC05XG4gIGNoYXJDb2RlID09PSA0MyB8fCAvLyArXG4gIGNoYXJDb2RlID09PSA0NyB8fCAvLyAvXG4gIGNoYXJDb2RlID09PSA0NSB8fCAvLyAtIChiYXNlNjR1cmwpXG4gIGNoYXJDb2RlID09PSA5NTsgLy8gXyAoYmFzZTY0dXJsKVxuXG5jb25zdCBpc0Jhc2U2NFdoaXRlc3BhY2UgPSAoY2hhckNvZGUpID0+XG4gIGNoYXJDb2RlID09PSA5IHx8IGNoYXJDb2RlID09PSAxMCB8fCBjaGFyQ29kZSA9PT0gMTIgfHwgY2hhckNvZGUgPT09IDEzIHx8IGNoYXJDb2RlID09PSAzMjtcblxuY29uc3QgYmFzZTY0Qnl0ZXMgPSAoc2lnbmlmaWNhbnQpID0+IHtcbiAgY29uc3QgZ3JvdXBzID0gTWF0aC5mbG9vcihzaWduaWZpY2FudCAvIDQpO1xuICBjb25zdCByZW1haW5kZXIgPSBzaWduaWZpY2FudCAlIDQ7XG4gIHJldHVybiBncm91cHMgKiAzICsgKHJlbWFpbmRlciA9PT0gMiA/IDEgOiByZW1haW5kZXIgPT09IDMgPyAyIDogMCk7XG59O1xuXG4vLyBCdWZmZXIuYnl0ZUxlbmd0aChib2R5LCAnYmFzZTY0JykgdXNlcyB0aGUgcmF3IHN0cmluZyBsZW5ndGggYXMgYW4gYWxsb2NhdGlvblxuLy8gdXBwZXIgYm91bmQgZXZlbiB3aGVuIEJ1ZmZlci5mcm9tIGxhdGVyIGlnbm9yZXMgY2hhcmFjdGVycyBvciBzdG9wcyBhdCAnPScuXG5jb25zdCBlc3RpbWF0ZUJhc2U2NEJ1ZmZlckFsbG9jYXRpb24gPSAoYm9keSkgPT4ge1xuICBjb25zdCBsZW4gPSBib2R5Lmxlbmd0aDtcbiAgbGV0IHBhZGRpbmcgPSAwO1xuXG4gIGlmIChsZW4gPiAwICYmIGJvZHkuY2hhckNvZGVBdChsZW4gLSAxKSA9PT0gNjEgLyogJz0nICovKSB7XG4gICAgcGFkZGluZysrO1xuXG4gICAgaWYgKGxlbiA+IDEgJiYgYm9keS5jaGFyQ29kZUF0KGxlbiAtIDIpID09PSA2MSAvKiAnPScgKi8pIHtcbiAgICAgIHBhZGRpbmcrKztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gTWF0aC5mbG9vcigoKGxlbiAtIHBhZGRpbmcpICogMykgLyA0KTtcbn07XG5cbmNvbnN0IGVzdGltYXRlUGVyY2VudERlY29kZWRCYXNlNjRCeXRlcyA9IChib2R5KSA9PiB7XG4gIGNvbnN0IGxlbiA9IGJvZHkubGVuZ3RoO1xuICBsZXQgc2lnbmlmaWNhbnQgPSAwO1xuICBsZXQgcGFkZGluZyA9IDA7XG4gIGxldCBpbnZhbGlkID0gZmFsc2U7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGxldCBjb2RlID0gYm9keS5jaGFyQ29kZUF0KGkpO1xuXG4gICAgaWYgKGNvZGUgPT09IDM3IC8qICclJyAqLyAmJiBpc1BlcmNlbnRFbmNvZGVkQnl0ZShib2R5LCBpLCBsZW4pKSB7XG4gICAgICBjb2RlID0gaGV4VmFsdWUoYm9keS5jaGFyQ29kZUF0KGkgKyAxKSkgKiAxNiArIGhleFZhbHVlKGJvZHkuY2hhckNvZGVBdChpICsgMikpO1xuICAgICAgaSArPSAyO1xuICAgIH1cblxuICAgIGlmIChpc0Jhc2U2NFdoaXRlc3BhY2UoY29kZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjb2RlID09PSA2MSAvKiAnPScgKi8pIHtcbiAgICAgIHBhZGRpbmcrKztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmICghaXNCYXNlNjRDaGFyKGNvZGUpIHx8IHBhZGRpbmcgPiAwKSB7XG4gICAgICBpbnZhbGlkID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHNpZ25pZmljYW50Kys7XG4gIH1cblxuICAvLyBGZXRjaCByZWplY3RzIG1hbGZvcm1lZCBmb3JnaXZpbmctYmFzZTY0IGlucHV0LiBSZXR1cm5pbmcgdGhlIHJhdy1zaXplXG4gIC8vIGFsbG9jYXRpb24gYm91bmQga2VlcHMgdGhhdCBpbnZhbGlkIGlucHV0IGZyb20gYmVjb21pbmcgYSBwcmUtY2hlY2sgYnlwYXNzLlxuICBpZiAoXG4gICAgaW52YWxpZCB8fFxuICAgIHBhZGRpbmcgPiAyIHx8XG4gICAgKHBhZGRpbmcgPiAwICYmIChzaWduaWZpY2FudCArIHBhZGRpbmcpICUgNCAhPT0gMCkgfHxcbiAgICBzaWduaWZpY2FudCAlIDQgPT09IDFcbiAgKSB7XG4gICAgcmV0dXJuIGVzdGltYXRlQmFzZTY0QnVmZmVyQWxsb2NhdGlvbihib2R5KTtcbiAgfVxuXG4gIHJldHVybiBiYXNlNjRCeXRlcyhzaWduaWZpY2FudCk7XG59O1xuXG5jb25zdCBlc3RpbWF0ZURhdGFVUkxCeXRlcyA9ICh1cmwsIGVzdGltYXRlQmFzZTY0KSA9PiB7XG4gIGlmICghdXJsIHx8IHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSByZXR1cm4gMDtcbiAgaWYgKCF1cmwuc3RhcnRzV2l0aCgnZGF0YTonKSkgcmV0dXJuIDA7XG5cbiAgY29uc3QgY29tbWEgPSB1cmwuaW5kZXhPZignLCcpO1xuICBpZiAoY29tbWEgPCAwKSByZXR1cm4gMDtcblxuICBjb25zdCBtZXRhID0gdXJsLnNsaWNlKDUsIGNvbW1hKTtcbiAgY29uc3QgYm9keSA9IHVybC5zbGljZShjb21tYSArIDEpO1xuICBjb25zdCBpc0Jhc2U2NCA9IC87YmFzZTY0L2kudGVzdChtZXRhKTtcblxuICBpZiAoaXNCYXNlNjQpIHtcbiAgICByZXR1cm4gZXN0aW1hdGVCYXNlNjQoYm9keSk7XG4gIH1cblxuICAvLyBDb21wdXRlIFVURi04IGJ5dGUgbGVuZ3RoIGRpcmVjdGx5IGZyb20gVVRGLTE2IGNvZGUgdW5pdHMgd2l0aG91dCBhbGxvY2F0aW5nXG4gIC8vIGEgYnl0ZSBidWZmZXIgKFRleHRFbmNvZGVyLmVuY29kZSB3b3VsZCBkZWZlYXQgdGhlIERvUyBndWFyZCBvbiBsYXJnZSBib2RpZXMpLlxuICAvLyBWYWxpZCAlWFggdHJpcGxldHMgY291bnQgYXMgb25lIGRlY29kZWQgYnl0ZTsgdGhpcyBtYXRjaGVzIHRoZSBieXRlcyB0aGF0XG4gIC8vIGRlY29kZVVSSUNvbXBvbmVudChib2R5KSB3b3VsZCBwcm9kdWNlIGJlZm9yZSBCdWZmZXIgcmUtZW5jb2RlcyB0aGUgc3RyaW5nLlxuICBsZXQgYnl0ZXMgPSAwO1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gYm9keS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IGMgPSBib2R5LmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGMgPT09IDM3IC8qICclJyAqLyAmJiBpc1BlcmNlbnRFbmNvZGVkQnl0ZShib2R5LCBpLCBsZW4pKSB7XG4gICAgICBieXRlcyArPSAxO1xuICAgICAgaSArPSAyO1xuICAgIH0gZWxzZSBpZiAoYyA8IDB4ODApIHtcbiAgICAgIGJ5dGVzICs9IDE7XG4gICAgfSBlbHNlIGlmIChjIDwgMHg4MDApIHtcbiAgICAgIGJ5dGVzICs9IDI7XG4gICAgfSBlbHNlIGlmIChjID49IDB4ZDgwMCAmJiBjIDw9IDB4ZGJmZiAmJiBpICsgMSA8IGxlbikge1xuICAgICAgY29uc3QgbmV4dCA9IGJvZHkuY2hhckNvZGVBdChpICsgMSk7XG4gICAgICBpZiAobmV4dCA+PSAweGRjMDAgJiYgbmV4dCA8PSAweGRmZmYpIHtcbiAgICAgICAgYnl0ZXMgKz0gNDtcbiAgICAgICAgaSsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnl0ZXMgKz0gMztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYnl0ZXMgKz0gMztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ5dGVzO1xufTtcblxuLyoqXG4gKiBFc3RpbWF0ZSB0aGUgcGVyY2VudC1kZWNvZGVkIHBheWxvYWQgc2l6ZSB1c2VkIGJ5IEZldGNoIGRhdGE6IFVSTHMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXN0aW1hdGVEYXRhVVJMRGVjb2RlZEJ5dGVzKHVybCkge1xuICAvLyBGZXRjaCByZW1vdmVzIFVSTCBmcmFnbWVudHMgYmVmb3JlIHByb2Nlc3NpbmcgYSBkYXRhOiBVUkwuXG4gIGNvbnN0IGZyYWdtZW50SW5kZXggPSB0eXBlb2YgdXJsID09PSAnc3RyaW5nJyA/IHVybC5pbmRleE9mKCcjJykgOiAtMTtcblxuICByZXR1cm4gZXN0aW1hdGVEYXRhVVJMQnl0ZXMoXG4gICAgZnJhZ21lbnRJbmRleCA9PT0gLTEgPyB1cmwgOiB1cmwuc2xpY2UoMCwgZnJhZ21lbnRJbmRleCksXG4gICAgZXN0aW1hdGVQZXJjZW50RGVjb2RlZEJhc2U2NEJ5dGVzXG4gICk7XG59XG5cbi8qKlxuICogRXN0aW1hdGUgdGhlIEJ1ZmZlciBiYWNraW5nIGFsbG9jYXRpb24gdXNlZCBieSBOb2RlJ3MgcmF3IGJhc2U2NCBkZWNvZGVyLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlc3RpbWF0ZURhdGFVUkxCdWZmZXJBbGxvY2F0aW9uKHVybCkge1xuICByZXR1cm4gZXN0aW1hdGVEYXRhVVJMQnl0ZXModXJsLCBlc3RpbWF0ZUJhc2U2NEJ1ZmZlckFsbG9jYXRpb24pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCB7IERFRkFVTFRfRk9STV9EQVRBX01BWF9ERVBUSCB9IGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5cbmNvbnN0IE1BWF9ERVBUSCA9IERFRkFVTFRfRk9STV9EQVRBX01BWF9ERVBUSDtcblxuZnVuY3Rpb24gdGhyb3dJZkRlcHRoRXhjZWVkZWQoaW5kZXgpIHtcbiAgaWYgKGluZGV4ID4gTUFYX0RFUFRIKSB7XG4gICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAnRm9ybURhdGEgZmllbGQgaXMgdG9vIGRlZXBseSBuZXN0ZWQgKCcgKyBpbmRleCArICcgbGV2ZWxzKS4gTWF4IGRlcHRoOiAnICsgTUFYX0RFUFRILFxuICAgICAgQXhpb3NFcnJvci5FUlJfRk9STV9EQVRBX0RFUFRIX0VYQ0VFREVEXG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nIGxpa2UgYGZvb1t4XVt5XVt6XWAgYW5kIHJldHVybnMgYW4gYXJyYXkgbGlrZSBgWydmb28nLCAneCcsICd5JywgJ3onXVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzdHJpbmdzLlxuICovXG5mdW5jdGlvbiBwYXJzZVByb3BQYXRoKG5hbWUpIHtcbiAgLy8gZm9vW3hdW3ldW3pdIC0+IFsnZm9vJywgJ3gnLCAneScsICd6J11cbiAgLy8gZm9vLngueS56ICAgIC0+IFsnZm9vJywgJ3gnLCAneScsICd6J11cbiAgLy8gQSBwYXRoIGlzIHNwbGl0IG9uIGAuYCBhbmQgb24gYFsuLi5dYCBncm91cHMuIEEgc2VnbWVudCDigJQgd2hldGhlciB3cml0dGVuXG4gIC8vIGluIGRvdCBub3RhdGlvbiBvciBjYXB0dXJlZCBpbnNpZGUgYnJhY2tldHMg4oCUIG1heSBjb250YWluIGFueSBjaGFyYWN0ZXJcbiAgLy8gZXhjZXB0IGAuYCwgYFtgIGFuZCBgXWAsIHNvIGEga2V5IGxpa2UgYHVzZXItbmFtZWAgb3IgYHVzZXIgbmFtZWAgaXMga2VwdFxuICAvLyBsaXRlcmFsIGluc3RlYWQgb2YgYmVpbmcgc3BsaXQgKCM1NDAyKS4gYC5gLCBgW2AgYW5kIGBdYCBrZWVwIHRoZWlyIGV4aXN0aW5nXG4gIC8vIG1lYW5pbmcsIGUuZy4gYGZvb1tiYXIuYmF6XWAgLT4gWydmb28nLCAnYmFyJywgJ2JheiddIGFuZCBgW11gIGlzIGFuIGFycmF5IHB1c2guXG4gIC8vIEV4Y2x1ZGluZyBgW2AgZnJvbSB0aGUgYnJhY2tldCBncm91cCBhbHNvIG1ha2VzIHRoZSBtYXRjaCBmYWlsIGZhc3QgYXQgdGhlXG4gIC8vIG5leHQgYFtgLCBzbyBhIG1hbGZvcm1lZCBuYW1lIGNhbm5vdCByZXNjYW4gdG8gdGhlIGVuZCBvZiB0aGUgc3RyaW5nIGZyb21cbiAgLy8gZXZlcnkgdW5tYXRjaGVkIGBbYCDigJQgcGFyc2luZyBzdGF5cyBsaW5lYXIgaW4gdGhlIGxlbmd0aCBvZiB0aGUgbmFtZS5cbiAgY29uc3QgcGF0aCA9IFtdO1xuICBjb25zdCBwYXR0ZXJuID0gL1teLltcXF1dK3xcXFsoW14uW1xcXV0qKV0vZztcbiAgbGV0IG1hdGNoO1xuXG4gIHdoaWxlICgobWF0Y2ggPSBwYXR0ZXJuLmV4ZWMobmFtZSkpICE9PSBudWxsKSB7XG4gICAgdGhyb3dJZkRlcHRoRXhjZWVkZWQocGF0aC5sZW5ndGgpO1xuICAgIHBhdGgucHVzaChtYXRjaFswXSA9PT0gJ1tdJyA/ICcnIDogbWF0Y2hbMV0gfHwgbWF0Y2hbMF0pO1xuICB9XG5cbiAgcmV0dXJuIHBhdGg7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgdGhyb3dJZkRlcHRoRXhjZWVkZWQoaW5kZXgpO1xuXG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuXG4gICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldC5sZW5ndGggOiBuYW1lO1xuXG4gICAgaWYgKGlzTGFzdCkge1xuICAgICAgaWYgKHV0aWxzLmhhc093blByb3AodGFyZ2V0LCBuYW1lKSkge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSB1dGlscy5pc0FycmF5KHRhcmdldFtuYW1lXSlcbiAgICAgICAgICA/IHRhcmdldFtuYW1lXS5jb25jYXQodmFsdWUpXG4gICAgICAgICAgOiBbdGFyZ2V0W25hbWVdLCB2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gICAgfVxuXG4gICAgaWYgKCF1dGlscy5oYXNPd25Qcm9wKHRhcmdldCwgbmFtZSkgfHwgIXV0aWxzLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gYXJyYXlUb09iamVjdCh0YXJnZXRbbmFtZV0pO1xuICAgIH1cblxuICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZm9ybURhdGEpICYmIHV0aWxzLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2hFbnRyeShmb3JtRGF0YSwgKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBidWlsZFBhdGgocGFyc2VQcm9wUGF0aChuYW1lKSwgdmFsdWUsIG9iaiwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1EYXRhVG9KU09OO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZCtcXC0uXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvc1xuICpcbiAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscy5pc09iamVjdChwYXlsb2FkKSAmJiBwYXlsb2FkLmlzQXhpb3NFcnJvciA9PT0gdHJ1ZTtcbn1cbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudlxuICA/ICgob3JpZ2luLCBpc01TSUUpID0+ICh1cmwpID0+IHtcbiAgICAgIHVybCA9IG5ldyBVUkwodXJsLCBwbGF0Zm9ybS5vcmlnaW4pO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICBvcmlnaW4ucHJvdG9jb2wgPT09IHVybC5wcm90b2NvbCAmJlxuICAgICAgICBvcmlnaW4uaG9zdCA9PT0gdXJsLmhvc3QgJiZcbiAgICAgICAgKGlzTVNJRSB8fCBvcmlnaW4ucG9ydCA9PT0gdXJsLnBvcnQpXG4gICAgICApO1xuICAgIH0pKFxuICAgICAgbmV3IFVSTChwbGF0Zm9ybS5vcmlnaW4pLFxuICAgICAgcGxhdGZvcm0ubmF2aWdhdG9yICYmIC8obXNpZXx0cmlkZW50KS9pLnRlc3QocGxhdGZvcm0ubmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICApXG4gIDogKCkgPT4gdHJ1ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdXJsUGFyc2VyQ29udHJvbENoYXJhY3RlcnMgPSAvW1xcdFxcblxccl0vZztcblxuLyoqXG4gKiBNYXRjaCBXSEFUV0cgVVJMIHByZXByb2Nlc3NpbmcgYmVmb3JlIGNoZWNraW5nIGEgVVJMJ3MgcHJvdG9jb2wuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vcm1hbGl6ZVVSTEZvclByb3RvY29sQ2hlY2sodXJsKSB7XG4gIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICBsZXQgc3RhcnQgPSAwO1xuXG4gIHdoaWxlIChzdGFydCA8IHVybC5sZW5ndGggJiYgdXJsLmNoYXJDb2RlQXQoc3RhcnQpIDw9IDB4MjApIHtcbiAgICBzdGFydCsrO1xuICB9XG5cbiAgcmV0dXJuIHVybC5zbGljZShzdGFydCkucmVwbGFjZSh1cmxQYXJzZXJDb250cm9sQ2hhcmFjdGVycywgJycpO1xufVxuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHN0cmljdFxuZXhwb3J0IGRlZmF1bHQgbnVsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLy8gUmF3QXhpb3NIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuY29uc3QgaWdub3JlRHVwbGljYXRlT2YgPSB1dGlscy50b09iamVjdFNldChbXG4gICdhZ2UnLFxuICAnYXV0aG9yaXphdGlvbicsXG4gICdjb250ZW50LWxlbmd0aCcsXG4gICdjb250ZW50LXR5cGUnLFxuICAnZXRhZycsXG4gICdleHBpcmVzJyxcbiAgJ2Zyb20nLFxuICAnaG9zdCcsXG4gICdpZi1tb2RpZmllZC1zaW5jZScsXG4gICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLFxuICAnbG9jYXRpb24nLFxuICAnbWF4LWZvcndhcmRzJyxcbiAgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsXG4gICdyZXRyeS1hZnRlcicsXG4gICd1c2VyLWFnZW50Jyxcbl0pO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmF3SGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKlxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgKHJhd0hlYWRlcnMpID0+IHtcbiAgY29uc3QgcGFyc2VkID0ge307XG4gIGxldCBrZXk7XG4gIGxldCB2YWw7XG4gIGxldCBpO1xuXG4gIHJhd0hlYWRlcnMgJiZcbiAgICByYXdIZWFkZXJzLnNwbGl0KCdcXG4nKS5mb3JFYWNoKGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAgICBrZXkgPSBsaW5lLnN1YnN0cmluZygwLCBpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIHZhbCA9IGxpbmUuc3Vic3RyaW5nKGkgKyAxKS50cmltKCk7XG5cbiAgICAgIGNvbnN0IGhhc0tleSA9IHV0aWxzLmhhc093blByb3AocGFyc2VkLCBrZXkpO1xuXG4gICAgICBpZiAoIWtleSB8fCAoaGFzS2V5ICYmIHV0aWxzLmhhc093blByb3AoaWdub3JlRHVwbGljYXRlT2YsIGtleSkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIGlmIChoYXNLZXkpIHtcbiAgICAgICAgICBwYXJzZWRba2V5XS5wdXNoKHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFyc2VkW2tleV0gPSBbdmFsXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBoYXNLZXkgPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlUHJvdG9jb2wodXJsKSB7XG4gIGNvbnN0IG1hdGNoID0gL14oWy0rXFx3XXsxLDI1fSk6KD86XFwvXFwvKT8vLmV4ZWModXJsKTtcbiAgcmV0dXJuIChtYXRjaCAmJiBtYXRjaFsxXSkgfHwgJyc7XG59XG4iLCJpbXBvcnQgc3BlZWRvbWV0ZXIgZnJvbSAnLi9zcGVlZG9tZXRlci5qcyc7XG5pbXBvcnQgdGhyb3R0bGUgZnJvbSAnLi90aHJvdHRsZS5qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NFdmVudFJlZHVjZXIgPSAobGlzdGVuZXIsIGlzRG93bmxvYWRTdHJlYW0sIGZyZXEgPSAzKSA9PiB7XG4gIGxldCBieXRlc05vdGlmaWVkID0gMDtcbiAgY29uc3QgX3NwZWVkb21ldGVyID0gc3BlZWRvbWV0ZXIoNTAsIDI1MCk7XG5cbiAgcmV0dXJuIHRocm90dGxlKChlKSA9PiB7XG4gICAgaWYgKCFlIHx8ICF1dGlscy5pc051bWJlcihlLmxvYWRlZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcmF3TG9hZGVkID0gZS5sb2FkZWQ7XG4gICAgY29uc3QgdG90YWwgPSBlLmxlbmd0aENvbXB1dGFibGUgPyBlLnRvdGFsIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGxvYWRlZCA9IE1hdGgubWF4KDAsIHRvdGFsICE9IG51bGwgPyBNYXRoLm1pbihyYXdMb2FkZWQsIHRvdGFsKSA6IHJhd0xvYWRlZCk7XG4gICAgY29uc3QgcHJvZ3Jlc3NCeXRlcyA9IE1hdGgubWF4KDAsIGxvYWRlZCAtIGJ5dGVzTm90aWZpZWQpO1xuICAgIGNvbnN0IHJhdGUgPSBfc3BlZWRvbWV0ZXIocHJvZ3Jlc3NCeXRlcyk7XG5cbiAgICBieXRlc05vdGlmaWVkID0gTWF0aC5tYXgoYnl0ZXNOb3RpZmllZCwgbG9hZGVkKTtcblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBsb2FkZWQsXG4gICAgICB0b3RhbCxcbiAgICAgIHByb2dyZXNzOiB0b3RhbCA/IGxvYWRlZCAvIHRvdGFsIDogdW5kZWZpbmVkLFxuICAgICAgYnl0ZXM6IHByb2dyZXNzQnl0ZXMsXG4gICAgICByYXRlOiByYXRlID8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGVzdGltYXRlZDogcmF0ZSAmJiB0b3RhbCA/ICh0b3RhbCAtIGxvYWRlZCkgLyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXZlbnQ6IGUsXG4gICAgICBsZW5ndGhDb21wdXRhYmxlOiB0b3RhbCAhPSBudWxsLFxuICAgICAgW2lzRG93bmxvYWRTdHJlYW0gPyAnZG93bmxvYWQnIDogJ3VwbG9hZCddOiB0cnVlLFxuICAgIH07XG5cbiAgICBsaXN0ZW5lcihkYXRhKTtcbiAgfSwgZnJlcSk7XG59O1xuXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NFdmVudERlY29yYXRvciA9ICh0b3RhbCwgdGhyb3R0bGVkKSA9PiB7XG4gIGNvbnN0IGxlbmd0aENvbXB1dGFibGUgPSB0b3RhbCAhPSBudWxsO1xuXG4gIHJldHVybiBbXG4gICAgKGxvYWRlZCkgPT5cbiAgICAgIHRocm90dGxlZFswXSh7XG4gICAgICAgIGxlbmd0aENvbXB1dGFibGUsXG4gICAgICAgIHRvdGFsLFxuICAgICAgICBsb2FkZWQsXG4gICAgICB9KSxcbiAgICB0aHJvdHRsZWRbMV0sXG4gIF07XG59O1xuXG5leHBvcnQgY29uc3QgYXN5bmNEZWNvcmF0b3IgPVxuICAoZm4sIHNjaGVkdWxlciA9IHV0aWxzLmFzYXApID0+XG4gICguLi5hcmdzKSA9PlxuICAgIHNjaGVkdWxlcigoKSA9PiBmbiguLi5hcmdzKSk7XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgaXNVUkxTYW1lT3JpZ2luIGZyb20gJy4vaXNVUkxTYW1lT3JpZ2luLmpzJztcbmltcG9ydCBjb29raWVzIGZyb20gJy4vY29va2llcy5qcyc7XG5pbXBvcnQgYnVpbGRGdWxsUGF0aCBmcm9tICcuLi9jb3JlL2J1aWxkRnVsbFBhdGguanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4uL2NvcmUvbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgc2V0Rm9ybURhdGFIZWFkZXJzIGZyb20gJy4uL2NvcmUvc2V0Rm9ybURhdGFIZWFkZXJzLmpzJztcbmltcG9ydCBidWlsZFVSTCBmcm9tICcuL2J1aWxkVVJMLmpzJztcblxuLyoqXG4gKiBFbmNvZGUgYSBVVEYtOCBzdHJpbmcgdG8gYSBMYXRpbi0xIGJ5dGUgc3RyaW5nIGZvciB1c2Ugd2l0aCBidG9hKCkuXG4gKiBUaGlzIGlzIGEgbW9kZXJuIHJlcGxhY2VtZW50IGZvciB0aGUgZGVwcmVjYXRlZCB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkgcGF0dGVybi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gZW5jb2RlXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVVRGLTggYnl0ZXMgYXMgYSBMYXRpbi0xIHN0cmluZ1xuICovXG5jb25zdCBlbmNvZGVVVEY4ID0gKHN0cikgPT5cbiAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvJShbMC05QS1GXXsyfSkvZ2ksIChfLCBoZXgpID0+XG4gICAgU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChoZXgsIDE2KSlcbiAgKTtcblxuZnVuY3Rpb24gcmVzb2x2ZUNvbmZpZyhjb25maWcpIHtcbiAgY29uc3QgbmV3Q29uZmlnID0gbWVyZ2VDb25maWcoe30sIGNvbmZpZyk7XG5cbiAgLy8gUmVhZCBvbmx5IG93biBwcm9wZXJ0aWVzIHRvIHByZXZlbnQgcHJvdG90eXBlIHBvbGx1dGlvbiBnYWRnZXRzXG4gIC8vIChlLmcuIE9iamVjdC5wcm90b3R5cGUuYmFzZVVSTCA9ICdodHRwczovL2V2aWwuY29tJykuXG4gIGNvbnN0IG93biA9IChrZXkpID0+ICh1dGlscy5oYXNPd25Qcm9wKG5ld0NvbmZpZywga2V5KSA/IG5ld0NvbmZpZ1trZXldIDogdW5kZWZpbmVkKTtcblxuICBjb25zdCBkYXRhID0gb3duKCdkYXRhJyk7XG4gIGxldCB3aXRoWFNSRlRva2VuID0gb3duKCd3aXRoWFNSRlRva2VuJyk7XG4gIGNvbnN0IHhzcmZIZWFkZXJOYW1lID0gb3duKCd4c3JmSGVhZGVyTmFtZScpO1xuICBjb25zdCB4c3JmQ29va2llTmFtZSA9IG93bigneHNyZkNvb2tpZU5hbWUnKTtcbiAgbGV0IGhlYWRlcnMgPSBvd24oJ2hlYWRlcnMnKTtcbiAgY29uc3QgYXV0aCA9IG93bignYXV0aCcpO1xuICBjb25zdCBiYXNlVVJMID0gb3duKCdiYXNlVVJMJyk7XG4gIGNvbnN0IGFsbG93QWJzb2x1dGVVcmxzID0gb3duKCdhbGxvd0Fic29sdXRlVXJscycpO1xuICBjb25zdCB1cmwgPSBvd24oJ3VybCcpO1xuXG4gIG5ld0NvbmZpZy5oZWFkZXJzID0gaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGhlYWRlcnMpO1xuXG4gIG5ld0NvbmZpZy51cmwgPSBidWlsZFVSTChcbiAgICBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHVybCwgYWxsb3dBYnNvbHV0ZVVybHMsIG5ld0NvbmZpZyksXG4gICAgb3duKCdwYXJhbXMnKSxcbiAgICBvd24oJ3BhcmFtc1NlcmlhbGl6ZXInKVxuICApO1xuXG4gIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgaWYgKGF1dGgpIHtcbiAgICBjb25zdCB1c2VybmFtZSA9IHV0aWxzLmdldFNhZmVQcm9wKGF1dGgsICd1c2VybmFtZScpIHx8ICcnO1xuICAgIGNvbnN0IHBhc3N3b3JkID0gdXRpbHMuZ2V0U2FmZVByb3AoYXV0aCwgJ3Bhc3N3b3JkJykgfHwgJyc7XG5cbiAgICB0cnkge1xuICAgICAgaGVhZGVycy5zZXQoXG4gICAgICAgICdBdXRob3JpemF0aW9uJyxcbiAgICAgICAgJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgKHBhc3N3b3JkID8gZW5jb2RlVVRGOChwYXNzd29yZCkgOiAnJykpXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlLCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFLCBjb25maWcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpKSB7XG4gICAgY29uc3QgZ2V0SGVhZGVycyA9IHV0aWxzLmdldFNhZmVQcm9wKGRhdGEsICdnZXRIZWFkZXJzJyk7XG5cbiAgICBpZiAoXG4gICAgICBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgfHxcbiAgICAgIHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudiB8fFxuICAgICAgdXRpbHMuaXNSZWFjdE5hdGl2ZShkYXRhKVxuICAgICkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSh1bmRlZmluZWQpOyAvLyBicm93c2VyL3dlYiB3b3JrZXIvUk4gaGFuZGxlcyBpdFxuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNGdW5jdGlvbihnZXRIZWFkZXJzKSkge1xuICAgICAgLy8gTm9kZS5qcyBGb3JtRGF0YSAobGlrZSBmb3JtLWRhdGEgcGFja2FnZSlcbiAgICAgIHNldEZvcm1EYXRhSGVhZGVycyhoZWFkZXJzLCBnZXRIZWFkZXJzLmNhbGwoZGF0YSksIG93bignZm9ybURhdGFIZWFkZXJQb2xpY3knKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuXG4gIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYpIHtcbiAgICBpZiAodXRpbHMuaXNGdW5jdGlvbih3aXRoWFNSRlRva2VuKSkge1xuICAgICAgd2l0aFhTUkZUb2tlbiA9IHdpdGhYU1JGVG9rZW4obmV3Q29uZmlnKTtcbiAgICB9XG5cbiAgICAvLyBTdHJpY3QgYm9vbGVhbiBjaGVjayDigJQgcHJldmVudHMgcHJvdG8tcG9sbHV0aW9uIGdhZGdldHMgKGUuZy4gT2JqZWN0LnByb3RvdHlwZS53aXRoWFNSRlRva2VuID0gMSlcbiAgICAvLyBhbmQgbWlzY29uZmlndXJhdGlvbnMgKGUuZy4gXCJmYWxzZVwiKSBmcm9tIHNob3J0LWNpcmN1aXRpbmcgdGhlIHNhbWUtb3JpZ2luIGNoZWNrIGFuZCBsZWFraW5nXG4gICAgLy8gdGhlIFhTUkYgdG9rZW4gY3Jvc3Mtb3JpZ2luLlxuICAgIGNvbnN0IHNob3VsZFNlbmRYU1JGID1cbiAgICAgIHdpdGhYU1JGVG9rZW4gPT09IHRydWUgfHwgKHdpdGhYU1JGVG9rZW4gPT0gbnVsbCAmJiBpc1VSTFNhbWVPcmlnaW4obmV3Q29uZmlnLnVybCkpO1xuXG4gICAgaWYgKHNob3VsZFNlbmRYU1JGKSB7XG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSB4c3JmSGVhZGVyTmFtZSAmJiB4c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoeHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0KHhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlc29sdmVDb25maWc7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbmZ1bmN0aW9uIHRyaW1TUG9ySFRBQihzdHIpIHtcbiAgbGV0IHN0YXJ0ID0gMDtcbiAgbGV0IGVuZCA9IHN0ci5sZW5ndGg7XG5cbiAgd2hpbGUgKHN0YXJ0IDwgZW5kKSB7XG4gICAgY29uc3QgY29kZSA9IHN0ci5jaGFyQ29kZUF0KHN0YXJ0KTtcblxuICAgIGlmIChjb2RlICE9PSAweDA5ICYmIGNvZGUgIT09IDB4MjApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN0YXJ0ICs9IDE7XG4gIH1cblxuICB3aGlsZSAoZW5kID4gc3RhcnQpIHtcbiAgICBjb25zdCBjb2RlID0gc3RyLmNoYXJDb2RlQXQoZW5kIC0gMSk7XG5cbiAgICBpZiAoY29kZSAhPT0gMHgwOSAmJiBjb2RlICE9PSAweDIwKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBlbmQgLT0gMTtcbiAgfVxuXG4gIHJldHVybiBzdGFydCA9PT0gMCAmJiBlbmQgPT09IHN0ci5sZW5ndGggPyBzdHIgOiBzdHIuc2xpY2Uoc3RhcnQsIGVuZCk7XG59XG5cbi8vIFRoZSBjb250cm9sLWNvZGUgcmFuZ2VzIGFyZSBpbnRlbnRpb25hbDogaGVhZGVyIHNhbml0aXphdGlvbiBzdHJpcHMgQzAvREVMIGJ5dGVzLlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRyb2wtcmVnZXhcbmNvbnN0IElOVkFMSURfVU5JQ09ERV9IRUFERVJfVkFMVUVfQ0hBUlMgPSBuZXcgUmVnRXhwKCdbXFxcXHUwMDAwLVxcXFx1MDAwOFxcXFx1MDAwYS1cXFxcdTAwMWZcXFxcdTAwN2ZdKycsICdnJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udHJvbC1yZWdleFxuY29uc3QgSU5WQUxJRF9CWVRFX1NUUklOR19IRUFERVJfVkFMVUVfQ0hBUlMgPSBuZXcgUmVnRXhwKCdbXlxcXFx1MDAwOVxcXFx1MDAyMC1cXFxcdTAwN2VcXFxcdTAwODAtXFxcXHUwMGZmXSsnLCAnZycpO1xuXG5mdW5jdGlvbiBzYW5pdGl6ZVZhbHVlKHZhbHVlLCBpbnZhbGlkQ2hhcnMpIHtcbiAgaWYgKHV0aWxzLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLm1hcCgoaXRlbSkgPT4gc2FuaXRpemVWYWx1ZShpdGVtLCBpbnZhbGlkQ2hhcnMpKTtcbiAgfVxuXG4gIHJldHVybiB0cmltU1BvckhUQUIoU3RyaW5nKHZhbHVlKS5yZXBsYWNlKGludmFsaWRDaGFycywgJycpKTtcbn1cblxuZXhwb3J0IGNvbnN0IHNhbml0aXplSGVhZGVyVmFsdWUgPSAodmFsdWUpID0+XG4gIHNhbml0aXplVmFsdWUodmFsdWUsIElOVkFMSURfVU5JQ09ERV9IRUFERVJfVkFMVUVfQ0hBUlMpO1xuXG5leHBvcnQgY29uc3Qgc2FuaXRpemVCeXRlU3RyaW5nSGVhZGVyVmFsdWUgPSAodmFsdWUpID0+XG4gIHNhbml0aXplVmFsdWUodmFsdWUsIElOVkFMSURfQllURV9TVFJJTkdfSEVBREVSX1ZBTFVFX0NIQVJTKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvQnl0ZVN0cmluZ0hlYWRlck9iamVjdChoZWFkZXJzKSB7XG4gIGNvbnN0IGJ5dGVTdHJpbmdIZWFkZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMudG9KU09OKCksICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgYnl0ZVN0cmluZ0hlYWRlcnNbaGVhZGVyXSA9IHNhbml0aXplQnl0ZVN0cmluZ0hlYWRlclZhbHVlKHZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGJ5dGVTdHJpbmdIZWFkZXJzO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENhbGN1bGF0ZSBkYXRhIG1heFJhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2FtcGxlc0NvdW50PSAxMF1cbiAqIEBwYXJhbSB7TnVtYmVyfSBbbWluPSAxMDAwXVxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBzcGVlZG9tZXRlcihzYW1wbGVzQ291bnQsIG1pbikge1xuICBzYW1wbGVzQ291bnQgPSBzYW1wbGVzQ291bnQgfHwgMTA7XG4gIGNvbnN0IGJ5dGVzID0gbmV3IEFycmF5KHNhbXBsZXNDb3VudCk7XG4gIGNvbnN0IHRpbWVzdGFtcHMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgbGV0IGhlYWQgPSAwO1xuICBsZXQgdGFpbCA9IDA7XG4gIGxldCBmaXJzdFNhbXBsZVRTO1xuXG4gIG1pbiA9IG1pbiAhPT0gdW5kZWZpbmVkID8gbWluIDogMTAwMDtcblxuICByZXR1cm4gZnVuY3Rpb24gcHVzaChjaHVua0xlbmd0aCkge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cbiAgICBjb25zdCBzdGFydGVkQXQgPSB0aW1lc3RhbXBzW3RhaWxdO1xuXG4gICAgaWYgKCFmaXJzdFNhbXBsZVRTKSB7XG4gICAgICBmaXJzdFNhbXBsZVRTID0gbm93O1xuICAgIH1cblxuICAgIGJ5dGVzW2hlYWRdID0gY2h1bmtMZW5ndGg7XG4gICAgdGltZXN0YW1wc1toZWFkXSA9IG5vdztcblxuICAgIGxldCBpID0gdGFpbDtcbiAgICBsZXQgYnl0ZXNDb3VudCA9IDA7XG5cbiAgICB3aGlsZSAoaSAhPT0gaGVhZCkge1xuICAgICAgYnl0ZXNDb3VudCArPSBieXRlc1tpKytdO1xuICAgICAgaSA9IGkgJSBzYW1wbGVzQ291bnQ7XG4gICAgfVxuXG4gICAgaGVhZCA9IChoZWFkICsgMSkgJSBzYW1wbGVzQ291bnQ7XG5cbiAgICBpZiAoaGVhZCA9PT0gdGFpbCkge1xuICAgICAgdGFpbCA9ICh0YWlsICsgMSkgJSBzYW1wbGVzQ291bnQ7XG4gICAgfVxuXG4gICAgaWYgKG5vdyAtIGZpcnN0U2FtcGxlVFMgPCBtaW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYXNzZWQgPSBzdGFydGVkQXQgJiYgbm93IC0gc3RhcnRlZEF0O1xuXG4gICAgcmV0dXJuIHBhc3NlZCA/IE1hdGgucm91bmQoKGJ5dGVzQ291bnQgKiAxMDAwKSAvIHBhc3NlZCkgOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNwZWVkb21ldGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgY29uc3QgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuIiwiLyoqXG4gKiBUaHJvdHRsZSBkZWNvcmF0b3JcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge051bWJlcn0gZnJlcVxuICogQHJldHVybiB7QXJyYXk8RnVuY3Rpb24+fVxuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmbiwgZnJlcSkge1xuICBsZXQgdGltZXN0YW1wID0gMDtcbiAgbGV0IHRocmVzaG9sZCA9IDEwMDAgLyBmcmVxO1xuICBsZXQgbGFzdEFyZ3M7XG4gIGxldCB0aW1lcjtcblxuICBjb25zdCBpbnZva2UgPSAoYXJncywgbm93ID0gRGF0ZS5ub3coKSkgPT4ge1xuICAgIHRpbWVzdGFtcCA9IG5vdztcbiAgICBsYXN0QXJncyA9IG51bGw7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBudWxsO1xuICAgIH1cbiAgICBmbiguLi5hcmdzKTtcbiAgfTtcblxuICBjb25zdCB0aHJvdHRsZWQgPSAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcGFzc2VkID0gbm93IC0gdGltZXN0YW1wO1xuICAgIGlmIChwYXNzZWQgPj0gdGhyZXNob2xkKSB7XG4gICAgICBpbnZva2UoYXJncywgbm93KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdEFyZ3MgPSBhcmdzO1xuICAgICAgaWYgKCF0aW1lcikge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgICBpbnZva2UobGFzdEFyZ3MpO1xuICAgICAgICB9LCB0aHJlc2hvbGQgLSBwYXNzZWQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBmbHVzaCA9ICgpID0+IGxhc3RBcmdzICYmIGludm9rZShsYXN0QXJncyk7XG4gIGNvbnN0IGZsdXNoV2l0aCA9ICguLi5hcmdzKSA9PiBpbnZva2UoYXJncyk7XG5cbiAgcmV0dXJuIFt0aHJvdHRsZWQsIGZsdXNoLCBmbHVzaFdpdGhdO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0aHJvdHRsZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG4vLyB0ZW1wb3JhcnkgaG90Zml4IHRvIGF2b2lkIGNpcmN1bGFyIHJlZmVyZW5jZXMgdW50aWwgQXhpb3NVUkxTZWFyY2hQYXJhbXMgaXMgcmVmYWN0b3JlZFxuaW1wb3J0IFBsYXRmb3JtRm9ybURhdGEgZnJvbSAnLi4vcGxhdGZvcm0vbm9kZS9jbGFzc2VzL0Zvcm1EYXRhLmpzJztcbmltcG9ydCBQbGF0Zm9ybUJ1ZmZlciBmcm9tICcuLi9wbGF0Zm9ybS9ub2RlL2NsYXNzZXMvQnVmZmVyLmpzJztcblxuLy8gRGVmYXVsdCBuZXN0aW5nIGxpbWl0IHNoYXJlZCB3aXRoIHRoZSBpbnZlcnNlIHRyYW5zZm9ybSAoZm9ybURhdGFUb0pTT04pIHNvXG4vLyB0aGUgRm9ybURhdGEgPC0+IEpTT04gcm91bmQtdHJpcCBzdGF5cyBzeW1tZXRyaWMuXG5leHBvcnQgY29uc3QgREVGQVVMVF9GT1JNX0RBVEFfTUFYX0RFUFRIID0gMTAwO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIGdpdmVuIHRoaW5nIGlzIGEgYXJyYXkgb3IganMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGluZyAtIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gYmUgdmlzaXRlZC5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNWaXNpdGFibGUodGhpbmcpIHtcbiAgcmV0dXJuIHV0aWxzLmlzUGxhaW5PYmplY3QodGhpbmcpIHx8IHV0aWxzLmlzQXJyYXkodGhpbmcpO1xufVxuXG4vKipcbiAqIEl0IHJlbW92ZXMgdGhlIGJyYWNrZXRzIGZyb20gdGhlIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBwYXJhbWV0ZXIuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGtleSB3aXRob3V0IHRoZSBicmFja2V0cy5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQnJhY2tldHMoa2V5KSB7XG4gIHJldHVybiB1dGlscy5lbmRzV2l0aChrZXksICdbXScpID8ga2V5LnNsaWNlKDAsIC0yKSA6IGtleTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhdGgsIGEga2V5LCBhbmQgYSBib29sZWFuLCBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIGN1cnJlbnQgb2JqZWN0IGJlaW5nIGl0ZXJhdGVkIG92ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gZG90cyAtIElmIHRydWUsIHRoZSBrZXkgd2lsbCBiZSByZW5kZXJlZCB3aXRoIGRvdHMgaW5zdGVhZCBvZiBicmFja2V0cy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpIHtcbiAgaWYgKCFwYXRoKSByZXR1cm4ga2V5O1xuICByZXR1cm4gcGF0aFxuICAgIC5jb25jYXQoa2V5KVxuICAgIC5tYXAoZnVuY3Rpb24gZWFjaCh0b2tlbiwgaSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICB0b2tlbiA9IHJlbW92ZUJyYWNrZXRzKHRva2VuKTtcbiAgICAgIHJldHVybiAhZG90cyAmJiBpID8gJ1snICsgdG9rZW4gKyAnXScgOiB0b2tlbjtcbiAgICB9KVxuICAgIC5qb2luKGRvdHMgPyAnLicgOiAnJyk7XG59XG5cbi8qKlxuICogSWYgdGhlIGFycmF5IGlzIGFuIGFycmF5IGFuZCBub25lIG9mIGl0cyBlbGVtZW50cyBhcmUgdmlzaXRhYmxlLCB0aGVuIGl0J3MgYSBmbGF0IGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyIC0gVGhlIGFycmF5IHRvIGNoZWNrXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzRmxhdEFycmF5KGFycikge1xuICByZXR1cm4gdXRpbHMuaXNBcnJheShhcnIpICYmICFhcnIuc29tZShpc1Zpc2l0YWJsZSk7XG59XG5cbmNvbnN0IHByZWRpY2F0ZXMgPSB1dGlscy50b0ZsYXRPYmplY3QodXRpbHMsIHt9LCBudWxsLCBmdW5jdGlvbiBmaWx0ZXIocHJvcCkge1xuICByZXR1cm4gL15pc1tBLVpdLy50ZXN0KHByb3ApO1xufSk7XG5cbi8qKlxuICogQ29udmVydCBhIGRhdGEgb2JqZWN0IHRvIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHs/T2JqZWN0fSBbZm9ybURhdGFdXG4gKiBAcGFyYW0gez9PYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMudmlzaXRvcl1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWV0YVRva2VucyA9IHRydWVdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRvdHMgPSBmYWxzZV1cbiAqIEBwYXJhbSB7P0Jvb2xlYW59IFtvcHRpb25zLmluZGV4ZXMgPSBmYWxzZV1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICoqL1xuXG4vKipcbiAqIEl0IGNvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gZm9ybSBkYXRhLlxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1EYXRhIC0gVGhlIEZvcm1EYXRhIG9iamVjdCB0byBhcHBlbmQgdG8uXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiB0b0Zvcm1EYXRhKG9iaiwgZm9ybURhdGEsIG9wdGlvbnMpIHtcbiAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGFyZ2V0IG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9ybURhdGEgPSBmb3JtRGF0YSB8fCBuZXcgKFBsYXRmb3JtRm9ybURhdGEgfHwgRm9ybURhdGEpKCk7XG5cbiAgY29uc3Qgb3B0aW9uID0gKG5hbWUsIGZhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSB1dGlscy5nZXRTYWZlUHJvcChvcHRpb25zLCBuYW1lKTtcbiAgICByZXR1cm4gdXRpbHMuaXNVbmRlZmluZWQodmFsdWUpID8gZmFsbGJhY2sgOiB2YWx1ZTtcbiAgfTtcblxuICBjb25zdCBtZXRhVG9rZW5zID0gb3B0aW9uKCdtZXRhVG9rZW5zJywgdHJ1ZSk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICBjb25zdCB2aXNpdG9yID0gb3B0aW9uKCd2aXNpdG9yJykgfHwgZGVmYXVsdFZpc2l0b3I7XG4gIGNvbnN0IGRvdHMgPSBvcHRpb24oJ2RvdHMnLCBmYWxzZSk7XG4gIGNvbnN0IGluZGV4ZXMgPSBvcHRpb24oJ2luZGV4ZXMnLCBmYWxzZSk7XG4gIGNvbnN0IF9CbG9iID0gb3B0aW9uKCdCbG9iJykgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBCbG9iKTtcbiAgY29uc3QgbWF4RGVwdGggPSBvcHRpb24oJ21heERlcHRoJywgREVGQVVMVF9GT1JNX0RBVEFfTUFYX0RFUFRIKTtcbiAgY29uc3QgdXNlQmxvYiA9IF9CbG9iICYmIHV0aWxzLmlzU3BlY0NvbXBsaWFudEZvcm0oZm9ybURhdGEpO1xuICBjb25zdCBzdGFjayA9IFtdO1xuXG4gIGlmICghdXRpbHMuaXNGdW5jdGlvbih2aXNpdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3Zpc2l0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBmdW5jdGlvbiBjb252ZXJ0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiAnJztcblxuICAgIGlmICh1dGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNCb29sZWFuKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VCbG9iICYmIHV0aWxzLmlzQmxvYih2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdCbG9iIGlzIG5vdCBzdXBwb3J0ZWQuIFVzZSBhIEJ1ZmZlciBpbnN0ZWFkLicpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyKHZhbHVlKSB8fCB1dGlscy5pc1R5cGVkQXJyYXkodmFsdWUpKSB7XG4gICAgICBpZiAodXNlQmxvYiAmJiB0eXBlb2YgX0Jsb2IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBfQmxvYihbdmFsdWVdKTtcbiAgICAgIH1cbiAgICAgIGlmIChQbGF0Zm9ybUJ1ZmZlciAmJiBQbGF0Zm9ybUJ1ZmZlci5pc0J1ZmZlckF2YWlsYWJsZSgpKSB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybUJ1ZmZlci5mcm9tKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAnQmxvYiBpcyBub3Qgc3VwcG9ydGVkLiBVc2UgYSBCdWZmZXIgaW5zdGVhZC4nLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9OT1RfU1VQUE9SVFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiB0aHJvd0lmTWF4RGVwdGhFeGNlZWRlZChkZXB0aCkge1xuICAgIGlmIChkZXB0aCA+IG1heERlcHRoKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgJ09iamVjdCBpcyB0b28gZGVlcGx5IG5lc3RlZCAoJyArIGRlcHRoICsgJyBsZXZlbHMpLiBNYXggZGVwdGg6ICcgKyBtYXhEZXB0aCxcbiAgICAgICAgQXhpb3NFcnJvci5FUlJfRk9STV9EQVRBX0RFUFRIX0VYQ0VFREVEXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0cmluZ2lmeVdpdGhEZXB0aExpbWl0KHZhbHVlLCBkZXB0aCkge1xuICAgIGlmIChtYXhEZXB0aCA9PT0gSW5maW5pdHkpIHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgYW5jZXN0b3JzID0gW107XG5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUsIGZ1bmN0aW9uIGxpbWl0RGVwdGgoX2tleSwgY3VycmVudFZhbHVlKSB7XG4gICAgICBpZiAoIXV0aWxzLmlzT2JqZWN0KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKGFuY2VzdG9ycy5sZW5ndGggJiYgYW5jZXN0b3JzW2FuY2VzdG9ycy5sZW5ndGggLSAxXSAhPT0gdGhpcykge1xuICAgICAgICBhbmNlc3RvcnMucG9wKCk7XG4gICAgICB9XG5cbiAgICAgIGFuY2VzdG9ycy5wdXNoKGN1cnJlbnRWYWx1ZSk7XG4gICAgICB0aHJvd0lmTWF4RGVwdGhFeGNlZWRlZChkZXB0aCArIGFuY2VzdG9ycy5sZW5ndGggLSAxKTtcblxuICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZpc2l0b3IuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBrZXlcbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmd8TnVtYmVyPn0gcGF0aFxuICAgKiBAdGhpcyB7Rm9ybURhdGF9XG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm4gdHJ1ZSB0byB2aXNpdCB0aGUgZWFjaCBwcm9wIG9mIHRoZSB2YWx1ZSByZWN1cnNpdmVseVxuICAgKi9cbiAgZnVuY3Rpb24gZGVmYXVsdFZpc2l0b3IodmFsdWUsIGtleSwgcGF0aCkge1xuICAgIGxldCBhcnIgPSB2YWx1ZTtcblxuICAgIGlmICh1dGlscy5pc1JlYWN0TmF0aXZlKGZvcm1EYXRhKSAmJiB1dGlscy5pc1JlYWN0TmF0aXZlQmxvYih2YWx1ZSkpIHtcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChyZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSwgY29udmVydFZhbHVlKHZhbHVlKSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlICYmICFwYXRoICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh1dGlscy5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSBtZXRhVG9rZW5zID8ga2V5IDoga2V5LnNsaWNlKDAsIC0yKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIHZhbHVlID0gc3RyaW5naWZ5V2l0aERlcHRoTGltaXQodmFsdWUsIDEpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKHV0aWxzLmlzQXJyYXkodmFsdWUpICYmIGlzRmxhdEFycmF5KHZhbHVlKSkgfHxcbiAgICAgICAgKCh1dGlscy5pc0ZpbGVMaXN0KHZhbHVlKSB8fCB1dGlscy5lbmRzV2l0aChrZXksICdbXScpKSAmJiAoYXJyID0gdXRpbHMudG9BcnJheSh2YWx1ZSkpKVxuICAgICAgKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSByZW1vdmVCcmFja2V0cyhrZXkpO1xuXG4gICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIGVhY2goZWwsIGluZGV4KSB7XG4gICAgICAgICAgISh1dGlscy5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmXG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICAgICAgICAgICAgICBpbmRleGVzID09PSB0cnVlXG4gICAgICAgICAgICAgICAgPyByZW5kZXJLZXkoW2tleV0sIGluZGV4LCBkb3RzKVxuICAgICAgICAgICAgICAgIDogaW5kZXhlcyA9PT0gbnVsbFxuICAgICAgICAgICAgICAgICAgPyBrZXlcbiAgICAgICAgICAgICAgICAgIDoga2V5ICsgJ1tdJyxcbiAgICAgICAgICAgICAgY29udmVydFZhbHVlKGVsKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNWaXNpdGFibGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3JtRGF0YS5hcHBlbmQocmVuZGVyS2V5KHBhdGgsIGtleSwgZG90cyksIGNvbnZlcnRWYWx1ZSh2YWx1ZSkpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgZXhwb3NlZEhlbHBlcnMgPSBPYmplY3QuYXNzaWduKHByZWRpY2F0ZXMsIHtcbiAgICBkZWZhdWx0VmlzaXRvcixcbiAgICBjb252ZXJ0VmFsdWUsXG4gICAgaXNWaXNpdGFibGUsXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkKHZhbHVlLCBwYXRoLCBkZXB0aCA9IDApIHtcbiAgICBpZiAodXRpbHMuaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm47XG5cbiAgICB0aHJvd0lmTWF4RGVwdGhFeGNlZWRlZChkZXB0aCk7XG5cbiAgICBpZiAoc3RhY2suaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiAnICsgcGF0aC5qb2luKCcuJykpO1xuICAgIH1cblxuICAgIHN0YWNrLnB1c2godmFsdWUpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gZWFjaChlbCwga2V5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPVxuICAgICAgICAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiZcbiAgICAgICAgdmlzaXRvci5jYWxsKGZvcm1EYXRhLCBlbCwgdXRpbHMuaXNTdHJpbmcoa2V5KSA/IGtleS50cmltKCkgOiBrZXksIHBhdGgsIGV4cG9zZWRIZWxwZXJzKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBidWlsZChlbCwgcGF0aCA/IHBhdGguY29uY2F0KGtleSkgOiBba2V5XSwgZGVwdGggKyAxKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN0YWNrLnBvcCgpO1xuICB9XG5cbiAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZGF0YSBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvRm9ybURhdGE7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCBvcHRpb25zKSB7XG4gIHJldHVybiB0b0Zvcm1EYXRhKGRhdGEsIG5ldyBwbGF0Zm9ybS5jbGFzc2VzLlVSTFNlYXJjaFBhcmFtcygpLCB7XG4gICAgdmlzaXRvcjogZnVuY3Rpb24gKHZhbHVlLCBrZXksIHBhdGgsIGhlbHBlcnMpIHtcbiAgICAgIGlmIChwbGF0Zm9ybS5pc05vZGUgJiYgdXRpbHMuaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKGtleSwgdmFsdWUudG9TdHJpbmcoJ2Jhc2U2NCcpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVscGVycy5kZWZhdWx0VmlzaXRvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgLi4ub3B0aW9ucyxcbiAgfSk7XG59XG4iLCJleHBvcnQgY29uc3Qgc3RyZWFtQ2h1bmsgPSBmdW5jdGlvbiogKGNodW5rLCBjaHVua1NpemUpIHtcbiAgbGV0IGxlbiA9IGNodW5rLmJ5dGVMZW5ndGg7XG5cbiAgaWYgKCFjaHVua1NpemUgfHwgbGVuIDwgY2h1bmtTaXplKSB7XG4gICAgeWllbGQgY2h1bms7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHBvcyA9IDA7XG4gIGxldCBlbmQ7XG5cbiAgd2hpbGUgKHBvcyA8IGxlbikge1xuICAgIGVuZCA9IHBvcyArIGNodW5rU2l6ZTtcbiAgICB5aWVsZCBjaHVuay5zbGljZShwb3MsIGVuZCk7XG4gICAgcG9zID0gZW5kO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmVhZEJ5dGVzID0gYXN5bmMgZnVuY3Rpb24qIChpdGVyYWJsZSwgY2h1bmtTaXplKSB7XG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgcmVhZFN0cmVhbShpdGVyYWJsZSkpIHtcbiAgICB5aWVsZCogc3RyZWFtQ2h1bmsoY2h1bmssIGNodW5rU2l6ZSk7XG4gIH1cbn07XG5cbmNvbnN0IHJlYWRTdHJlYW0gPSBhc3luYyBmdW5jdGlvbiogKHN0cmVhbSkge1xuICBpZiAoc3RyZWFtW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSkge1xuICAgIHlpZWxkKiBzdHJlYW07XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVhZGVyID0gc3RyZWFtLmdldFJlYWRlcigpO1xuICB0cnkge1xuICAgIGZvciAoOzspIHtcbiAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICBpZiAoZG9uZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHlpZWxkIHZhbHVlO1xuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCByZWFkZXIuY2FuY2VsKCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB0cmFja1N0cmVhbSA9IChzdHJlYW0sIGNodW5rU2l6ZSwgb25Qcm9ncmVzcywgb25GaW5pc2gpID0+IHtcbiAgY29uc3QgaXRlcmF0b3IgPSByZWFkQnl0ZXMoc3RyZWFtLCBjaHVua1NpemUpO1xuXG4gIGxldCBieXRlcyA9IDA7XG4gIGxldCBkb25lO1xuICBsZXQgX29uRmluaXNoID0gKGUpID0+IHtcbiAgICBpZiAoIWRvbmUpIHtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgb25GaW5pc2ggJiYgb25GaW5pc2goZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBuZXcgUmVhZGFibGVTdHJlYW0oXG4gICAge1xuICAgICAgYXN5bmMgcHVsbChjb250cm9sbGVyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgaXRlcmF0b3IubmV4dCgpO1xuXG4gICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgIF9vbkZpbmlzaCgpO1xuICAgICAgICAgICAgY29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCBsZW4gPSB2YWx1ZS5ieXRlTGVuZ3RoO1xuICAgICAgICAgIGlmIChvblByb2dyZXNzKSB7XG4gICAgICAgICAgICBsZXQgbG9hZGVkQnl0ZXMgPSAoYnl0ZXMgKz0gbGVuKTtcbiAgICAgICAgICAgIG9uUHJvZ3Jlc3MobG9hZGVkQnl0ZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250cm9sbGVyLmVucXVldWUobmV3IFVpbnQ4QXJyYXkodmFsdWUpKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgX29uRmluaXNoKGVycik7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2FuY2VsKHJlYXNvbikge1xuICAgICAgICBfb25GaW5pc2gocmVhc29uKTtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yLnJldHVybigpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGhpZ2hXYXRlck1hcms6IDIsXG4gICAgfVxuICApO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gJy4uL2Vudi9kYXRhLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB7fTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblsnb2JqZWN0JywgJ2Jvb2xlYW4nLCAnbnVtYmVyJywgJ2Z1bmN0aW9uJywgJ3N0cmluZycsICdzeW1ib2wnXS5mb3JFYWNoKCh0eXBlLCBpKSA9PiB7XG4gIHZhbGlkYXRvcnNbdHlwZV0gPSBmdW5jdGlvbiB2YWxpZGF0b3IodGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSB0eXBlIHx8ICdhJyArIChpIDwgMSA/ICduICcgOiAnICcpICsgdHlwZTtcbiAgfTtcbn0pO1xuXG5jb25zdCBkZXByZWNhdGVkV2FybmluZ3MgPSB7fTtcblxuLyoqXG4gKiBUcmFuc2l0aW9uYWwgb3B0aW9uIHZhbGlkYXRvclxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb258Ym9vbGVhbj99IHZhbGlkYXRvciAtIHNldCB0byBmYWxzZSBpZiB0aGUgdHJhbnNpdGlvbmFsIG9wdGlvbiBoYXMgYmVlbiByZW1vdmVkXG4gKiBAcGFyYW0ge3N0cmluZz99IHZlcnNpb24gLSBkZXByZWNhdGVkIHZlcnNpb24gLyByZW1vdmVkIHNpbmNlIHZlcnNpb25cbiAqIEBwYXJhbSB7c3RyaW5nP30gbWVzc2FnZSAtIHNvbWUgbWVzc2FnZSB3aXRoIGFkZGl0aW9uYWwgaW5mb1xuICpcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAqL1xudmFsaWRhdG9ycy50cmFuc2l0aW9uYWwgPSBmdW5jdGlvbiB0cmFuc2l0aW9uYWwodmFsaWRhdG9yLCB2ZXJzaW9uLCBtZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2Uob3B0LCBkZXNjKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICdbQXhpb3MgdicgK1xuICAgICAgVkVSU0lPTiArXG4gICAgICBcIl0gVHJhbnNpdGlvbmFsIG9wdGlvbiAnXCIgK1xuICAgICAgb3B0ICtcbiAgICAgIFwiJ1wiICtcbiAgICAgIGRlc2MgK1xuICAgICAgKG1lc3NhZ2UgPyAnLiAnICsgbWVzc2FnZSA6ICcnKVxuICAgICk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gKHZhbHVlLCBvcHQsIG9wdHMpID0+IHtcbiAgICBpZiAodmFsaWRhdG9yID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIGZvcm1hdE1lc3NhZ2Uob3B0LCAnIGhhcyBiZWVuIHJlbW92ZWQnICsgKHZlcnNpb24gPyAnIGluICcgKyB2ZXJzaW9uIDogJycpKSxcbiAgICAgICAgQXhpb3NFcnJvci5FUlJfREVQUkVDQVRFRFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodmVyc2lvbiAmJiAhZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0pIHtcbiAgICAgIGRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdID0gdHJ1ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGZvcm1hdE1lc3NhZ2UoXG4gICAgICAgICAgb3B0LFxuICAgICAgICAgICcgaGFzIGJlZW4gZGVwcmVjYXRlZCBzaW5jZSB2JyArIHZlcnNpb24gKyAnIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5lYXIgZnV0dXJlJ1xuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0b3IgPyB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0cykgOiB0cnVlO1xuICB9O1xufTtcblxudmFsaWRhdG9ycy5zcGVsbGluZyA9IGZ1bmN0aW9uIHNwZWxsaW5nKGNvcnJlY3RTcGVsbGluZykge1xuICByZXR1cm4gKHZhbHVlLCBvcHQpID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUud2FybihgJHtvcHR9IGlzIGxpa2VseSBhIG1pc3NwZWxsaW5nIG9mICR7Y29ycmVjdFNwZWxsaW5nfWApO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xufTtcblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0J3MgcHJvcGVydGllcyB0eXBlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGFsbG93VW5rbm93blxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cblxuZnVuY3Rpb24gYXNzZXJ0T3B0aW9ucyhvcHRpb25zLCBzY2hlbWEsIGFsbG93VW5rbm93bikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnIHx8IG9wdGlvbnMgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICB9XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBjb25zdCBvcHQgPSBrZXlzW2ldO1xuICAgIC8vIFVzZSBoYXNPd25Qcm9wZXJ0eSBzbyBhIHBvbGx1dGVkIE9iamVjdC5wcm90b3R5cGUuPG9wdD4gY2Fubm90IHN1cHBseVxuICAgIC8vIGEgbm9uLWZ1bmN0aW9uIHZhbGlkYXRvciBhbmQgY2F1c2UgYSBUeXBlRXJyb3IuXG4gICAgY29uc3QgdmFsaWRhdG9yID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNjaGVtYSwgb3B0KSA/IHNjaGVtYVtvcHRdIDogdW5kZWZpbmVkO1xuICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uc1tvcHRdO1xuICAgICAgY29uc3QgcmVzdWx0ID0gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0aW9ucyk7XG4gICAgICBpZiAocmVzdWx0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICdvcHRpb24gJyArIG9wdCArICcgbXVzdCBiZSAnICsgcmVzdWx0LFxuICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoYWxsb3dVbmtub3duICE9PSB0cnVlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignVW5rbm93biBvcHRpb24gJyArIG9wdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXNzZXJ0T3B0aW9ucyxcbiAgdmFsaWRhdG9ycyxcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyA/IEJsb2IgOiBudWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnID8gRm9ybURhdGEgOiBudWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9BeGlvc1VSTFNlYXJjaFBhcmFtcy5qcyc7XG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyA/IFVSTFNlYXJjaFBhcmFtcyA6IEF4aW9zVVJMU2VhcmNoUGFyYW1zO1xuIiwiaW1wb3J0IFVSTFNlYXJjaFBhcmFtcyBmcm9tICcuL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzJztcbmltcG9ydCBGb3JtRGF0YSBmcm9tICcuL2NsYXNzZXMvRm9ybURhdGEuanMnO1xuaW1wb3J0IEJsb2IgZnJvbSAnLi9jbGFzc2VzL0Jsb2IuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQnJvd3NlcjogdHJ1ZSxcbiAgY2xhc3Nlczoge1xuICAgIFVSTFNlYXJjaFBhcmFtcyxcbiAgICBGb3JtRGF0YSxcbiAgICBCbG9iLFxuICB9LFxuICBwcm90b2NvbHM6IFsnaHR0cCcsICdodHRwcycsICdmaWxlJywgJ2Jsb2InLCAndXJsJywgJ2RhdGEnXSxcbn07XG4iLCJjb25zdCBoYXNCcm93c2VyRW52ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcblxuY29uc3QgX25hdmlnYXRvciA9ICh0eXBlb2YgbmF2aWdhdG9yID09PSAnb2JqZWN0JyAmJiBuYXZpZ2F0b3IpIHx8IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGhhc1N0YW5kYXJkQnJvd3NlckVudiA9XG4gIGhhc0Jyb3dzZXJFbnYgJiZcbiAgKCFfbmF2aWdhdG9yIHx8IFsnUmVhY3ROYXRpdmUnLCAnTmF0aXZlU2NyaXB0JywgJ05TJ10uaW5kZXhPZihfbmF2aWdhdG9yLnByb2R1Y3QpIDwgMCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIHdlYldvcmtlciBlbnZpcm9ubWVudFxuICpcbiAqIEFsdGhvdWdoIHRoZSBgaXNTdGFuZGFyZEJyb3dzZXJFbnZgIG1ldGhvZCBpbmRpY2F0ZXMgdGhhdFxuICogYGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyYCwgdGhlIFdlYldvcmtlciB3aWxsIHN0aWxsIGJlXG4gKiBmaWx0ZXJlZCBvdXQgZHVlIHRvIGl0cyBqdWRnbWVudCBzdGFuZGFyZFxuICogYHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdgLlxuICogVGhpcyBsZWFkcyB0byBhIHByb2JsZW0gd2hlbiBheGlvcyBwb3N0IGBGb3JtRGF0YWAgaW4gd2ViV29ya2VyXG4gKi9cbmNvbnN0IGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudiA9ICgoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSAmJlxuICAgIHR5cGVvZiBzZWxmLmltcG9ydFNjcmlwdHMgPT09ICdmdW5jdGlvbidcbiAgKTtcbn0pKCk7XG5cbmNvbnN0IG9yaWdpbiA9IChoYXNCcm93c2VyRW52ICYmIHdpbmRvdy5sb2NhdGlvbi5ocmVmKSB8fCAnaHR0cDovL2xvY2FsaG9zdCc7XG5cbmV4cG9ydCB7XG4gIGhhc0Jyb3dzZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudixcbiAgaGFzU3RhbmRhcmRCcm93c2VyRW52LFxuICBfbmF2aWdhdG9yIGFzIG5hdmlnYXRvcixcbiAgb3JpZ2luLFxufTtcbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tICcuL25vZGUvaW5kZXguanMnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi9jb21tb24vdXRpbHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC4uLnV0aWxzLFxuICAuLi5wbGF0Zm9ybSxcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBiaW5kIGZyb20gJy4vaGVscGVycy9iaW5kLmpzJztcblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxuY29uc3QgeyB0b1N0cmluZyB9ID0gT2JqZWN0LnByb3RvdHlwZTtcbmNvbnN0IHsgZ2V0UHJvdG90eXBlT2YgfSA9IE9iamVjdDtcbmNvbnN0IHsgaXRlcmF0b3IsIHRvU3RyaW5nVGFnIH0gPSBTeW1ib2w7XG5cbi8qIENyZWF0aW5nIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNoZWNrIGlmIGFuIG9iamVjdCBoYXMgYSBwcm9wZXJ0eS4gKi9cbmNvbnN0IGhhc093blByb3BlcnR5ID0gKFxuICAoeyBoYXNPd25Qcm9wZXJ0eSB9KSA9PlxuICAob2JqLCBwcm9wKSA9PlxuICAgIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKVxuKShPYmplY3QucHJvdG90eXBlKTtcblxuY29uc3QgaXNVbnNhZmVPYmplY3RLZXkgPSAocHJvcCkgPT5cbiAgdHlwZW9mIHByb3AgPT09ICdzdHJpbmcnICYmXG4gIChwcm9wID09PSAnX19wcm90b19fJyB8fCBwcm9wID09PSAnY29uc3RydWN0b3InIHx8IHByb3AgPT09ICdwcm90b3R5cGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciBhbiBpbmhlcml0ZWQgb2JqZWN0IG11c3QgYmUgdHJlYXRlZCBhcyBhIHNoYXJlZC1wcm90b3R5cGVcbiAqIGJvdW5kYXJ5LiBDcm9zcy1yZWFsbSBPYmplY3QucHJvdG90eXBlIG9iamVjdHMgY2Fubm90IGJlIGRpc3Rpbmd1aXNoZWRcbiAqIHJlbGlhYmx5IGZyb20gYXBwbGljYXRpb24tY3JlYXRlZCBudWxsLXByb3RvdHlwZSBvYmplY3RzIGJlY2F1c2UgdGhlaXJcbiAqIHByb3BlcnRpZXMgYXJlIG11dGFibGUsIHNvIGFsbCBpbmhlcml0ZWQgdGVybWluYWwgcHJvdG90eXBlcyBhcmUgZXhjbHVkZWRcbiAqIGFzIGEgZmFpbC1jbG9zZWQgYm91bmRhcnkuIEEgbnVsbC1wcm90b3R5cGUgc291cmNlIHN0aWxsIGtlZXBzIGl0cyBvd25cbiAqIHByb3BlcnRpZXMsIGFzIHByb2R1Y2VkIGJ5IG1lcmdlQ29uZmlnIGFuZCBvdGhlciBzYWZlIG1hdGVyaWFsaXphdGlvbiBwYXRocy5cbiAqXG4gKiBAcGFyYW0geyp9IG9iaiBUaGUgb2JqZWN0IHRvIGluc3BlY3RcbiAqIEBwYXJhbSB7Kn0gcHJvdG90eXBlIFRoZSBvYmplY3QncyBwcm90b3R5cGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc291cmNlIFdoZXRoZXIgb2JqIGlzIHRoZSBvcmlnaW5hbCB0cmF2ZXJzYWwgc291cmNlXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgd2hlbiBvYmogaXMgYSBzYWZlIHByb3RvdHlwZSB0cmF2ZXJzYWwgYm91bmRhcnlcbiAqL1xuY29uc3QgaXNQcm90b3R5cGVCb3VuZGFyeSA9IChvYmosIHByb3RvdHlwZSwgc291cmNlKSA9PlxuICBvYmogPT09IE9iamVjdC5wcm90b3R5cGUgfHwgKCFzb3VyY2UgJiYgcHJvdG90eXBlID09PSBudWxsKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciBhbiBvYmplY3QgY2FuIHJldGFpbiBpdHMgaWRlbnRpdHkgdGhyb3VnaCBjb2RlIHBhdGhzIHRoYXRcbiAqIGFkZCwgcmVwbGFjZSwgYW5kIHJlbW92ZSBjb25maWcgcHJvcGVydGllcyB3aXRob3V0IGJ5cGFzc2luZyB1bnNhZmUta2V5XG4gKiBmaWx0ZXJpbmcuIEltbXV0YWJsZSBvYmplY3RzLCB1bnNhZmUta2V5LWJlYXJpbmcgb2JqZWN0cywgYW5kIG9iamVjdHMgd2l0aFxuICogYWNjZXNzb3Igb3IgcmVzdHJpY3RlZCBkYXRhIHByb3BlcnRpZXMgbXVzdCBiZSBtYXRlcmlhbGl6ZWQgaW5zdGVhZC5cbiAqXG4gKiBAcGFyYW0geyp9IG9iaiBUaGUgb2JqZWN0IHRvIGluc3BlY3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSB3aGVuIGV2ZXJ5IG93biBwcm9wZXJ0eSBpcyBzYWZlIGFuZCBmdWxseSBtdXRhYmxlXG4gKi9cbmNvbnN0IGlzU2FmZUFuZEZ1bGx5TXV0YWJsZSA9IChvYmopID0+IHtcbiAgaWYgKCFPYmplY3QuaXNFeHRlbnNpYmxlKG9iaikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICBwcm9wcy5wdXNoKC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqKSk7XG4gIH1cblxuICByZXR1cm4gcHJvcHMuZXZlcnkoKHByb3ApID0+IHtcbiAgICBpZiAoaXNVbnNhZmVPYmplY3RLZXkocHJvcCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIHByb3ApO1xuXG4gICAgcmV0dXJuICEhZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSAmJiBkZXNjcmlwdG9yLndyaXRhYmxlID09PSB0cnVlO1xuICB9KTtcbn07XG5cbi8qKlxuICogV2FsayB0aGUgcHJvdG90eXBlIGNoYWluIChleGNsdWRpbmcgdGhlIHNvdXJjZSByZWFsbSdzIE9iamVjdC5wcm90b3R5cGUpXG4gKiBsb29raW5nIGZvciBhbiBvd24gYHByb3BgLiBUaGlzIGRpc3Rpbmd1aXNoZXMgZ2VudWluZSBvd24vaW5oZXJpdGVkIG1lbWJlcnNcbiAqIOKAlCBpbmNsdWRpbmcgY2xhc3MgYWNjZXNzb3JzIGFuZCB0ZW1wbGF0ZSBwcm90b3R5cGVzIOKAlCBmcm9tIG1lbWJlcnMgaW5qZWN0ZWRcbiAqIHZpYSBPYmplY3QucHJvdG90eXBlIHBvbGx1dGlvbiAoZS5nLiBgT2JqZWN0LnByb3RvdHlwZS51c2VybmFtZSA9ICcuLi4nYCksXG4gKiB3aGljaCBsaXZlIG9uIE9iamVjdC5wcm90b3R5cGUgaXRzZWxmIGFuZCBhcmUgdGhlcmVmb3JlIG5ldmVyIG1hdGNoZWQuXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgd2hvc2UgY2hhaW4gdG8gaW5zcGVjdFxuICogQHBhcmFtIHtzdHJpbmd8c3ltYm9sfSBwcm9wIFRoZSBwcm9wZXJ0eSBrZXkgdG8gbG9vayBmb3JcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSB3aGVuIGBwcm9wYCBpcyBvd25lZCBiZWxvdyBPYmplY3QucHJvdG90eXBlXG4gKi9cbmNvbnN0IGhhc093bkluUHJvdG90eXBlQ2hhaW4gPSAodGhpbmcsIHByb3ApID0+IHtcbiAgbGV0IG9iaiA9IHRoaW5nO1xuICBjb25zdCBzZWVuID0gW107XG5cbiAgd2hpbGUgKG9iaiAhPSBudWxsKSB7XG4gICAgaWYgKHNlZW4uaW5kZXhPZihvYmopICE9PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzZWVuLnB1c2gob2JqKTtcblxuICAgIGNvbnN0IHByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKG9iaik7XG5cbiAgICBpZiAoaXNQcm90b3R5cGVCb3VuZGFyeShvYmosIHByb3RvdHlwZSwgb2JqID09PSB0aGluZykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG9iaiA9IHByb3RvdHlwZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIFJlYWQgYG9ialtwcm9wXWAgb25seSB3aGVuIGl0IGlzIHNhZmUgZnJvbSBPYmplY3QucHJvdG90eXBlIHBvbGx1dGlvbi4gT3duXG4gKiBwcm9wZXJ0aWVzIGFuZCBtZW1iZXJzIGluaGVyaXRlZCBmcm9tIGEgbm9uLU9iamVjdC5wcm90b3R5cGUgc291cmNlIChhIGNsYXNzXG4gKiBpbnN0YW5jZSBvciB0ZW1wbGF0ZSBvYmplY3QpIGFyZSBob25vcmVkOyBhIHZhbHVlIHJlYWNoYWJsZSBvbmx5IHRocm91Z2ggYVxuICogcG9sbHV0ZWQgT2JqZWN0LnByb3RvdHlwZSBpcyBpZ25vcmVkIGFuZCBgdW5kZWZpbmVkYCBpcyByZXR1cm5lZC5cbiAqXG4gKiBAcGFyYW0geyp9IG9iaiBUaGUgc291cmNlIG9iamVjdFxuICogQHBhcmFtIHtzdHJpbmd8c3ltYm9sfSBwcm9wIFRoZSBwcm9wZXJ0eSBrZXkgdG8gcmVhZFxuICpcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzb2x2ZWQgdmFsdWUsIG9yIHVuZGVmaW5lZCB3aGVuIHVuc2FmZS9hYnNlbnRcbiAqL1xuY29uc3QgZ2V0U2FmZVByb3AgPSAob2JqLCBwcm9wKSA9PlxuICBvYmogIT0gbnVsbCAmJiBoYXNPd25JblByb3RvdHlwZUNoYWluKG9iaiwgcHJvcCkgPyBvYmpbcHJvcF0gOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogRmxhdHRlbiBhbiBvYmplY3QgYW5kIGl0cyBhcHBsaWNhdGlvbi1kZWZpbmVkIHByb3RvdHlwZSBjaGFpbiBpbnRvIGFcbiAqIG51bGwtcHJvdG90eXBlIG9iamVjdC4gTWVtYmVycyBpbmhlcml0ZWQgb25seSBmcm9tIHRoZSBzb3VyY2UgcmVhbG0nc1xuICogT2JqZWN0LnByb3RvdHlwZSBhcmUgZGVsaWJlcmF0ZWx5IGV4Y2x1ZGVkLCB3aGlsZSBjbGFzcy90ZW1wbGF0ZSBtZW1iZXJzXG4gKiBiZWxvdyB0aGF0IGJvdW5kYXJ5IGFyZSBwcmVzZXJ2ZWQuXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gZmxhdHRlblxuICpcbiAqIEByZXR1cm5zIHsqfSBBIG51bGwtcHJvdG90eXBlIGNvcHksIG9yIHRoZSBvcmlnaW5hbCB2YWx1ZSB3aGVuIGl0IGlzIGFscmVhZHlcbiAqIHN0cnVjdHVyYWxseSBzYWZlIG9yIGlzIG5vdCBhbiBvYmplY3RcbiAqL1xuY29uc3QgdG9TYWZlRmxhdE9iamVjdCA9ICh0aGluZykgPT4ge1xuICBpZiAodGhpbmcgPT0gbnVsbCB8fCAodHlwZW9mIHRoaW5nICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGhpbmcgIT09ICdmdW5jdGlvbicpKSB7XG4gICAgcmV0dXJuIHRoaW5nO1xuICB9XG5cbiAgY29uc3Qgc291cmNlUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YodGhpbmcpO1xuXG4gIGlmIChzb3VyY2VQcm90b3R5cGUgPT09IG51bGwgJiYgaXNTYWZlQW5kRnVsbHlNdXRhYmxlKHRoaW5nKSkge1xuICAgIHJldHVybiB0aGluZztcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGNvbnN0IG1lcmdlZCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGNvbnN0IHNlZW4gPSBbXTtcbiAgbGV0IGN1cnJlbnQgPSB0aGluZztcblxuICB3aGlsZSAoY3VycmVudCAhPSBudWxsKSB7XG4gICAgaWYgKHNlZW4uaW5kZXhPZihjdXJyZW50KSAhPT0gLTEpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHNlZW4ucHVzaChjdXJyZW50KTtcblxuICAgIGNvbnN0IHByb3RvdHlwZSA9IGN1cnJlbnQgPT09IHRoaW5nID8gc291cmNlUHJvdG90eXBlIDogZ2V0UHJvdG90eXBlT2YoY3VycmVudCk7XG5cbiAgICBpZiAoaXNQcm90b3R5cGVCb3VuZGFyeShjdXJyZW50LCBwcm90b3R5cGUsIGN1cnJlbnQgPT09IHRoaW5nKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdXJyZW50KTtcblxuICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgICBwcm9wcy5wdXNoKC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoY3VycmVudCkpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wcykge1xuICAgICAgaWYgKGlzVW5zYWZlT2JqZWN0S2V5KHByb3ApKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWhhc093blByb3BlcnR5KG1lcmdlZCwgcHJvcCkpIHtcbiAgICAgICAgcmVzdWx0W3Byb3BdID0gdGhpbmdbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY3VycmVudCA9IHByb3RvdHlwZTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5jb25zdCBraW5kT2YgPSAoKGNhY2hlKSA9PiAodGhpbmcpID0+IHtcbiAgY29uc3Qgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gIHJldHVybiBjYWNoZVtzdHJdIHx8IChjYWNoZVtzdHJdID0gc3RyLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpKTtcbn0pKE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG5jb25zdCBraW5kT2ZUZXN0ID0gKHR5cGUpID0+IHtcbiAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuICh0aGluZykgPT4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZTtcbn07XG5cbmNvbnN0IHR5cGVPZlRlc3QgPSAodHlwZSkgPT4gKHRoaW5nKSA9PiB0eXBlb2YgdGhpbmcgPT09IHR5cGU7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBub24tbnVsbCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCB7IGlzQXJyYXkgfSA9IEFycmF5O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVW5kZWZpbmVkID0gdHlwZU9mVGVzdCgndW5kZWZpbmVkJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiAoXG4gICAgdmFsICE9PSBudWxsICYmXG4gICAgIWlzVW5kZWZpbmVkKHZhbCkgJiZcbiAgICB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiZcbiAgICAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKSAmJlxuICAgIGlzRnVuY3Rpb24odmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKSAmJlxuICAgIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpXG4gICk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgbGV0IHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgQXJyYXlCdWZmZXIuaXNWaWV3KSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gdmFsICYmIHZhbC5idWZmZXIgJiYgaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyaW5nID0gdHlwZU9mVGVzdCgnc3RyaW5nJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGdW5jdGlvbiA9IHR5cGVPZlRlc3QoJ2Z1bmN0aW9uJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNOdW1iZXIgPSB0eXBlT2ZUZXN0KCdudW1iZXInKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNPYmplY3QgPSAodGhpbmcpID0+IHRoaW5nICE9PSBudWxsICYmIHR5cGVvZiB0aGluZyA9PT0gJ29iamVjdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCb29sZWFuXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCb29sZWFuLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCb29sZWFuID0gKHRoaW5nKSA9PiB0aGluZyA9PT0gdHJ1ZSB8fCB0aGluZyA9PT0gZmFsc2U7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNQbGFpbk9iamVjdCA9ICh2YWwpID0+IHtcbiAgaWYgKCFpc09iamVjdCh2YWwpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgcHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YodmFsKTtcbiAgcmV0dXJuIChcbiAgICAocHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCBnZXRQcm90b3R5cGVPZihwcm90b3R5cGUpID09PSBudWxsKSAmJlxuICAgIC8vIFRyZWF0IHNhZmUgb3duL2luaGVyaXRlZCBTeW1ib2wudG9TdHJpbmdUYWcgb3IgU3ltYm9sLml0ZXJhdG9yIG1lbWJlcnMgYXNcbiAgICAvLyBldmlkZW5jZSB0aGUgdmFsdWUgaXMgdGFnZ2VkL2l0ZXJhYmxlLCB3aGlsZSBpZ25vcmluZyBtZW1iZXJzIHJlYWNoYWJsZVxuICAgIC8vIG9ubHkgdGhyb3VnaCBzaGFyZWQgb3IgdGVybWluYWwgcHJvdG90eXBlIGJvdW5kYXJpZXMuXG4gICAgIWhhc093bkluUHJvdG90eXBlQ2hhaW4odmFsLCB0b1N0cmluZ1RhZykgJiZcbiAgICAhaGFzT3duSW5Qcm90b3R5cGVDaGFpbih2YWwsIGl0ZXJhdG9yKVxuICApO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBlbXB0eSBvYmplY3QgKHNhZmVseSBoYW5kbGVzIEJ1ZmZlcnMpXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBlbXB0eSBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0VtcHR5T2JqZWN0ID0gKHZhbCkgPT4ge1xuICAvLyBFYXJseSByZXR1cm4gZm9yIG5vbi1vYmplY3RzIG9yIEJ1ZmZlcnMgdG8gcHJldmVudCBSYW5nZUVycm9yXG4gIGlmICghaXNPYmplY3QodmFsKSB8fCBpc0J1ZmZlcih2YWwpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5sZW5ndGggPT09IDAgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbCkgPT09IE9iamVjdC5wcm90b3R5cGU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBGYWxsYmFjayBmb3IgYW55IG90aGVyIG9iamVjdHMgdGhhdCBtaWdodCBjYXVzZSBSYW5nZUVycm9yIHdpdGggT2JqZWN0LmtleXMoKVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRGF0ZSA9IGtpbmRPZlRlc3QoJ0RhdGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZSA9IGtpbmRPZlRlc3QoJ0ZpbGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlYWN0IE5hdGl2ZSBCbG9iXG4gKiBSZWFjdCBOYXRpdmUgXCJibG9iXCI6IGFuIG9iamVjdCB3aXRoIGEgYHVyaWAgYXR0cmlidXRlLiBPcHRpb25hbGx5LCBpdCBjYW5cbiAqIGFsc28gaGF2ZSBhIGBuYW1lYCBhbmQgYHR5cGVgIGF0dHJpYnV0ZSB0byBzcGVjaWZ5IGZpbGVuYW1lIGFuZCBjb250ZW50IHR5cGVcbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvYmxvYi8yNjY4NGNmM2FkZjQwOTRlYjZjNDA1ZDM0NWE3NWJmOGM3YzBiZjg4L0xpYnJhcmllcy9OZXR3b3JrL0Zvcm1EYXRhLmpzI0w2OC1MNzFcbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBSZWFjdCBOYXRpdmUgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVhY3ROYXRpdmVCbG9iID0gKHZhbHVlKSA9PiB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUudXJpICE9PSAndW5kZWZpbmVkJyk7XG59O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBlbnZpcm9ubWVudCBpcyBSZWFjdCBOYXRpdmVcbiAqIFJlYWN0TmF0aXZlIGBGb3JtRGF0YWAgaGFzIGEgbm9uLXN0YW5kYXJkIGBnZXRQYXJ0cygpYCBtZXRob2RcbiAqXG4gKiBAcGFyYW0geyp9IGZvcm1EYXRhIFRoZSBmb3JtRGF0YSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgZW52aXJvbm1lbnQgaXMgUmVhY3QgTmF0aXZlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNSZWFjdE5hdGl2ZSA9IChmb3JtRGF0YSkgPT4gZm9ybURhdGEgJiYgdHlwZW9mIGZvcm1EYXRhLmdldFBhcnRzICE9PSAndW5kZWZpbmVkJztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQmxvYiA9IGtpbmRPZlRlc3QoJ0Jsb2InKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVMaXN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGVMaXN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5jb25zdCBpc1NldCA9IGtpbmRPZlRlc3QoJ1NldCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyZWFtID0gKHZhbCkgPT4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gZ2V0R2xvYmFsKCkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZ2xvYmFsVGhpcztcbiAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIHNlbGY7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIHdpbmRvdztcbiAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZ2xvYmFsO1xuICByZXR1cm4ge307XG59XG5cbmNvbnN0IEcgPSBnZXRHbG9iYWwoKTtcbmNvbnN0IEZvcm1EYXRhQ3RvciA9IHR5cGVvZiBHLkZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEcuRm9ybURhdGEgOiB1bmRlZmluZWQ7XG5cbmNvbnN0IGlzRm9ybURhdGEgPSAodGhpbmcpID0+IHtcbiAgaWYgKCF0aGluZykgcmV0dXJuIGZhbHNlO1xuICBpZiAoRm9ybURhdGFDdG9yICYmIHRoaW5nIGluc3RhbmNlb2YgRm9ybURhdGFDdG9yKSByZXR1cm4gdHJ1ZTtcbiAgLy8gUmVqZWN0IHBsYWluIG9iamVjdHMgaW5oZXJpdGluZyBkaXJlY3RseSBmcm9tIE9iamVjdC5wcm90b3R5cGUgc28gcHJvdG90eXBlLXBvbGx1dGlvbiBnYWRnZXRzIGNhbid0IHNwb29mIEZvcm1EYXRhLlxuICBjb25zdCBwcm90byA9IGdldFByb3RvdHlwZU9mKHRoaW5nKTtcbiAgaWYgKCFwcm90byB8fCBwcm90byA9PT0gT2JqZWN0LnByb3RvdHlwZSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoIWlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBraW5kID0ga2luZE9mKHRoaW5nKTtcbiAgcmV0dXJuIChcbiAgICBraW5kID09PSAnZm9ybWRhdGEnIHx8XG4gICAgLy8gZGV0ZWN0IGZvcm0tZGF0YSBpbnN0YW5jZVxuICAgIChraW5kID09PSAnb2JqZWN0JyAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSAnW29iamVjdCBGb3JtRGF0YV0nKVxuICApO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbmNvbnN0IFtpc1JlYWRhYmxlU3RyZWFtLCBpc1JlcXVlc3QsIGlzUmVzcG9uc2UsIGlzSGVhZGVyc10gPSBbXG4gICdSZWFkYWJsZVN0cmVhbScsXG4gICdSZXF1ZXN0JyxcbiAgJ1Jlc3BvbnNlJyxcbiAgJ0hlYWRlcnMnLFxuXS5tYXAoa2luZE9mVGVzdCk7XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmNvbnN0IHRyaW0gPSAoc3RyKSA9PiB7XG4gIHJldHVybiBzdHIudHJpbSA/IHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcbn07XG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheTx1bmtub3duPn0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5hbGxPd25LZXlzID0gZmFsc2VdXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4sIHsgYWxsT3duS2V5cyA9IGZhbHNlIH0gPSB7fSkge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBpO1xuICBsZXQgbDtcblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAoaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gQnVmZmVyIGNoZWNrXG4gICAgaWYgKGlzQnVmZmVyKG9iaikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBjb25zdCBrZXlzID0gYWxsT3duS2V5cyA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikgOiBPYmplY3Qua2V5cyhvYmopO1xuICAgIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBrZXk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRmluZHMgYSBrZXkgaW4gYW4gb2JqZWN0LCBjYXNlLWluc2Vuc2l0aXZlLCByZXR1cm5pbmcgdGhlIGFjdHVhbCBrZXkgbmFtZS5cbiAqIFJldHVybnMgbnVsbCBpZiB0aGUgb2JqZWN0IGlzIGEgQnVmZmVyIG9yIGlmIG5vIG1hdGNoIGlzIGZvdW5kLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBUaGUgb2JqZWN0IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IHRvIGZpbmQgKGNhc2UtaW5zZW5zaXRpdmUpLlxuICogQHJldHVybnMgez9zdHJpbmd9IFRoZSBhY3R1YWwga2V5IG5hbWUgaWYgZm91bmQsIG90aGVyd2lzZSBudWxsLlxuICovXG5mdW5jdGlvbiBmaW5kS2V5KG9iaiwga2V5KSB7XG4gIGlmIChpc0J1ZmZlcihvYmopKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIGxldCBfa2V5O1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIF9rZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgPT09IF9rZXkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIF9rZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBfZ2xvYmFsID0gKCgpID0+IHtcbiAgLyplc2xpbnQgbm8tdW5kZWY6MCovXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBnbG9iYWxUaGlzO1xuICByZXR1cm4gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsO1xufSkoKTtcblxuY29uc3QgaXNDb250ZXh0RGVmaW5lZCA9IChjb250ZXh0KSA9PiAhaXNVbmRlZmluZWQoY29udGV4dCkgJiYgY29udGV4dCAhPT0gX2dsb2JhbDtcblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIGNvbnN0IHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLi4ub2Jqcykge1xuICBjb25zdCB7IGNhc2VsZXNzLCBza2lwVW5kZWZpbmVkIH0gPSAoaXNDb250ZXh0RGVmaW5lZCh0aGlzKSAmJiB0aGlzKSB8fCB7fTtcbiAgY29uc3QgcmVzdWx0ID0ge307XG4gIGNvbnN0IGFzc2lnblZhbHVlID0gKHZhbCwga2V5KSA9PiB7XG4gICAgLy8gU2tpcCBkYW5nZXJvdXMgcHJvcGVydHkgbmFtZXMgdG8gcHJldmVudCBwcm90b3R5cGUgcG9sbHV0aW9uXG4gICAgaWYgKGtleSA9PT0gJ19fcHJvdG9fXycgfHwga2V5ID09PSAnY29uc3RydWN0b3InIHx8IGtleSA9PT0gJ3Byb3RvdHlwZScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBmaW5kS2V5IGxvd2VyY2FzZXMgdGhlIGtleSwgc28gY2FzZWxlc3MgbG9va3VwIG9ubHkgYXBwbGllcyB0byBzdHJpbmdzIOKAlFxuICAgIC8vIHN5bWJvbCBrZXlzIGFyZSBpZGVudGl0eS1tYXRjaGVkLlxuICAgIGNvbnN0IHRhcmdldEtleSA9IChjYXNlbGVzcyAmJiB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBmaW5kS2V5KHJlc3VsdCwga2V5KSkgfHwga2V5O1xuICAgIC8vIFJlYWQgdmlhIG93bi1wcm9wIG9ubHkg4oCUIGEgYmFyZSBgcmVzdWx0W3RhcmdldEtleV1gIHdhbGtzIHRoZSBwcm90b3R5cGVcbiAgICAvLyBjaGFpbiwgc28gYSBwb2xsdXRlZCBPYmplY3QucHJvdG90eXBlIHZhbHVlIGNvdWxkIHN1cmZhY2UgaGVyZSBhbmQgZ2V0XG4gICAgLy8gY29waWVkIGludG8gdGhlIG1lcmdlZCByZXN1bHQuXG4gICAgY29uc3QgZXhpc3RpbmcgPSBoYXNPd25Qcm9wZXJ0eShyZXN1bHQsIHRhcmdldEtleSkgPyByZXN1bHRbdGFyZ2V0S2V5XSA6IHVuZGVmaW5lZDtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChleGlzdGluZykgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKGV4aXN0aW5nLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSBpZiAoIXNraXBVbmRlZmluZWQgfHwgIWlzVW5kZWZpbmVkKHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsO1xuICAgIH1cbiAgfTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IG9ianMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgY29uc3Qgc291cmNlID0gb2Jqc1tpXTtcbiAgICBpZiAoIXNvdXJjZSB8fCBpc0J1ZmZlcihzb3VyY2UpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBmb3JFYWNoKHNvdXJjZSwgYXNzaWduVmFsdWUpO1xuXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnIHx8IGlzQXJyYXkoc291cmNlKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc3Qgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN5bWJvbHMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IHN5bWJvbCA9IHN5bWJvbHNbal07XG4gICAgICBpZiAocHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzb3VyY2UsIHN5bWJvbCkpIHtcbiAgICAgICAgYXNzaWduVmFsdWUoc291cmNlW3N5bWJvbF0sIHN5bWJvbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmFsbE93bktleXNdXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmNvbnN0IGV4dGVuZCA9IChhLCBiLCB0aGlzQXJnLCB7IGFsbE93bktleXMgfSA9IHt9KSA9PiB7XG4gIGZvckVhY2goXG4gICAgYixcbiAgICAodmFsLCBrZXkpID0+IHtcbiAgICAgIGlmICh0aGlzQXJnICYmIGlzRnVuY3Rpb24odmFsKSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYSwga2V5LCB7XG4gICAgICAgICAgLy8gTnVsbC1wcm90byBkZXNjcmlwdG9yIHNvIGEgcG9sbHV0ZWQgT2JqZWN0LnByb3RvdHlwZS5nZXQgY2Fubm90XG4gICAgICAgICAgLy8gaGlqYWNrIGRlZmluZVByb3BlcnR5J3MgYWNjZXNzb3ItdnMtZGF0YSByZXNvbHV0aW9uLlxuICAgICAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgICAgICB2YWx1ZTogYmluZCh2YWwsIHRoaXNBcmcpLFxuICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCBrZXksIHtcbiAgICAgICAgICBfX3Byb3RvX186IG51bGwsXG4gICAgICAgICAgdmFsdWU6IHZhbCxcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICB7IGFsbE93bktleXMgfVxuICApO1xuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmNvbnN0IHN0cmlwQk9NID0gKGNvbnRlbnQpID0+IHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhmZWZmKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59O1xuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ29uc3RydWN0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcHJvcHNdXG4gKiBAcGFyYW0ge29iamVjdH0gW2Rlc2NyaXB0b3JzXVxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBpbmhlcml0cyA9IChjb25zdHJ1Y3Rvciwgc3VwZXJDb25zdHJ1Y3RvciwgcHJvcHMsIGRlc2NyaXB0b3JzKSA9PiB7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2NvbnN0cnVjdG9yJywge1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICB2YWx1ZTogY29uc3RydWN0b3IsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICB9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLCAnc3VwZXInLCB7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIHZhbHVlOiBzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZSxcbiAgfSk7XG4gIHByb3BzICYmIE9iamVjdC5hc3NpZ24oY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm9wcyk7XG59O1xuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufEJvb2xlYW59IFtmaWx0ZXJdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJvcEZpbHRlcl1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5jb25zdCB0b0ZsYXRPYmplY3QgPSAoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIsIHByb3BGaWx0ZXIpID0+IHtcbiAgbGV0IHByb3BzO1xuICBsZXQgaTtcbiAgbGV0IHByb3A7XG4gIGNvbnN0IG1lcmdlZCA9IHt9O1xuXG4gIGRlc3RPYmogPSBkZXN0T2JqIHx8IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgaWYgKHNvdXJjZU9iaiA9PSBudWxsKSByZXR1cm4gZGVzdE9iajtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICgoIXByb3BGaWx0ZXIgfHwgcHJvcEZpbHRlcihwcm9wLCBzb3VyY2VPYmosIGRlc3RPYmopKSAmJiAhbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IGZpbHRlciAhPT0gZmFsc2UgJiYgZ2V0UHJvdG90eXBlT2Yoc291cmNlT2JqKTtcbiAgfSB3aGlsZSAoc291cmNlT2JqICYmICghZmlsdGVyIHx8IGZpbHRlcihzb3VyY2VPYmosIGRlc3RPYmopKSAmJiBzb3VyY2VPYmogIT09IE9iamVjdC5wcm90b3R5cGUpO1xuXG4gIHJldHVybiBkZXN0T2JqO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBzdHJpbmcgZW5kcyB3aXRoIHRoZSBjaGFyYWN0ZXJzIG9mIGEgc3BlY2lmaWVkIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWFyY2hTdHJpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBbcG9zaXRpb249IDBdXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGVuZHNXaXRoID0gKHN0ciwgc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikgPT4ge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQgfHwgcG9zaXRpb24gPiBzdHIubGVuZ3RoKSB7XG4gICAgcG9zaXRpb24gPSBzdHIubGVuZ3RoO1xuICB9XG4gIHBvc2l0aW9uIC09IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gIGNvbnN0IGxhc3RJbmRleCA9IHN0ci5pbmRleE9mKHNlYXJjaFN0cmluZywgcG9zaXRpb24pO1xuICByZXR1cm4gbGFzdEluZGV4ICE9PSAtMSAmJiBsYXN0SW5kZXggPT09IHBvc2l0aW9uO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0IG9yIG51bGwgaWYgZmFpbGVkXG4gKlxuICogQHBhcmFtIHsqfSBbdGhpbmddXG4gKlxuICogQHJldHVybnMgez9BcnJheX1cbiAqL1xuY29uc3QgdG9BcnJheSA9ICh0aGluZykgPT4ge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgaWYgKGlzQXJyYXkodGhpbmcpKSByZXR1cm4gdGhpbmc7XG4gIGxldCBpID0gdGhpbmcubGVuZ3RoO1xuICBpZiAoIWlzTnVtYmVyKGkpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGFycltpXSA9IHRoaW5nW2ldO1xuICB9XG4gIHJldHVybiBhcnI7XG59O1xuXG4vKipcbiAqIENoZWNraW5nIGlmIHRoZSBVaW50OEFycmF5IGV4aXN0cyBhbmQgaWYgaXQgZG9lcywgaXQgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIHRoZVxuICogdGhpbmcgcGFzc2VkIGluIGlzIGFuIGluc3RhbmNlIG9mIFVpbnQ4QXJyYXlcbiAqXG4gKiBAcGFyYW0ge1R5cGVkQXJyYXl9XG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuY29uc3QgaXNUeXBlZEFycmF5ID0gKChUeXBlZEFycmF5KSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiAodGhpbmcpID0+IHtcbiAgICByZXR1cm4gVHlwZWRBcnJheSAmJiB0aGluZyBpbnN0YW5jZW9mIFR5cGVkQXJyYXk7XG4gIH07XG59KSh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2V0UHJvdG90eXBlT2YoVWludDhBcnJheSkpO1xuXG4vKipcbiAqIEZvciBlYWNoIGVudHJ5IGluIHRoZSBvYmplY3QsIGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGtleSBhbmQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggZW50cnkuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGZvckVhY2hFbnRyeSA9IChvYmosIGZuKSA9PiB7XG4gIGNvbnN0IGdlbmVyYXRvciA9IG9iaiAmJiBvYmpbaXRlcmF0b3JdO1xuXG4gIGNvbnN0IF9pdGVyYXRvciA9IGdlbmVyYXRvci5jYWxsKG9iaik7XG5cbiAgbGV0IHJlc3VsdDtcblxuICB3aGlsZSAoKHJlc3VsdCA9IF9pdGVyYXRvci5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgIGNvbnN0IHBhaXIgPSByZXN1bHQudmFsdWU7XG4gICAgZm4uY2FsbChvYmosIHBhaXJbMF0sIHBhaXJbMV0pO1xuICB9XG59O1xuXG4vKipcbiAqIEl0IHRha2VzIGEgcmVndWxhciBleHByZXNzaW9uIGFuZCBhIHN0cmluZywgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgYWxsIHRoZSBtYXRjaGVzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlZ0V4cCAtIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gdG8gbWF0Y2ggYWdhaW5zdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIHNlYXJjaC5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXk8Ym9vbGVhbj59XG4gKi9cbmNvbnN0IG1hdGNoQWxsID0gKHJlZ0V4cCwgc3RyKSA9PiB7XG4gIGxldCBtYXRjaGVzO1xuICBjb25zdCBhcnIgPSBbXTtcblxuICB3aGlsZSAoKG1hdGNoZXMgPSByZWdFeHAuZXhlYyhzdHIpKSAhPT0gbnVsbCkge1xuICAgIGFyci5wdXNoKG1hdGNoZXMpO1xuICB9XG5cbiAgcmV0dXJuIGFycjtcbn07XG5cbi8qIENoZWNraW5nIGlmIHRoZSBraW5kT2ZUZXN0IGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB3aGVuIHBhc3NlZCBhbiBIVE1MRm9ybUVsZW1lbnQuICovXG5jb25zdCBpc0hUTUxGb3JtID0ga2luZE9mVGVzdCgnSFRNTEZvcm1FbGVtZW50Jyk7XG5cbmNvbnN0IHRvQ2FtZWxDYXNlID0gKHN0cikgPT4ge1xuICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWy1fXFxzXShbYS16XFxkXSkoXFx3KikvZywgZnVuY3Rpb24gcmVwbGFjZXIobSwgcDEsIHAyKSB7XG4gICAgcmV0dXJuIHAxLnRvVXBwZXJDYXNlKCkgKyBwMjtcbiAgfSk7XG59O1xuXG5jb25zdCB7IHByb3BlcnR5SXNFbnVtZXJhYmxlIH0gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNSZWdFeHAgPSBraW5kT2ZUZXN0KCdSZWdFeHAnKTtcblxuY29uc3QgcmVkdWNlRGVzY3JpcHRvcnMgPSAob2JqLCByZWR1Y2VyKSA9PiB7XG4gIGNvbnN0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqKTtcbiAgY29uc3QgcmVkdWNlZERlc2NyaXB0b3JzID0ge307XG5cbiAgZm9yRWFjaChkZXNjcmlwdG9ycywgKGRlc2NyaXB0b3IsIG5hbWUpID0+IHtcbiAgICBsZXQgcmV0O1xuICAgIGlmICgocmV0ID0gcmVkdWNlcihkZXNjcmlwdG9yLCBuYW1lLCBvYmopKSAhPT0gZmFsc2UpIHtcbiAgICAgIHJlZHVjZWREZXNjcmlwdG9yc1tuYW1lXSA9IHJldCB8fCBkZXNjcmlwdG9yO1xuICAgIH1cbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMob2JqLCByZWR1Y2VkRGVzY3JpcHRvcnMpO1xufTtcblxuLyoqXG4gKiBNYWtlcyBhbGwgbWV0aG9kcyByZWFkLW9ubHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5jb25zdCBmcmVlemVNZXRob2RzID0gKG9iaikgPT4ge1xuICByZWR1Y2VEZXNjcmlwdG9ycyhvYmosIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgLy8gc2tpcCByZXN0cmljdGVkIHByb3BzIGluIHN0cmljdCBtb2RlXG4gICAgaWYgKGlzRnVuY3Rpb24ob2JqKSAmJiBbJ2FyZ3VtZW50cycsICdjYWxsZXInLCAnY2FsbGVlJ10uaW5jbHVkZXMobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IG9ialtuYW1lXTtcblxuICAgIGlmICghaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybjtcblxuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGZhbHNlO1xuXG4gICAgaWYgKCd3cml0YWJsZScgaW4gZGVzY3JpcHRvcikge1xuICAgICAgZGVzY3JpcHRvci53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBFcnJvcihcIkNhbiBub3QgcmV3cml0ZSByZWFkLW9ubHkgbWV0aG9kICdcIiArIG5hbWUgKyBcIidcIik7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGFuIGFycmF5IG9yIGEgZGVsaW1pdGVkIHN0cmluZyBpbnRvIGFuIG9iamVjdCBzZXQgd2l0aCB2YWx1ZXMgYXMga2V5cyBhbmQgdHJ1ZSBhcyB2YWx1ZXMuXG4gKiBVc2VmdWwgZm9yIGZhc3QgbWVtYmVyc2hpcCBjaGVja3MuXG4gKlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IGFycmF5T3JTdHJpbmcgLSBUaGUgYXJyYXkgb3Igc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gZGVsaW1pdGVyIC0gVGhlIGRlbGltaXRlciB0byB1c2UgaWYgaW5wdXQgaXMgYSBzdHJpbmcuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCBrZXlzIGZyb20gdGhlIGFycmF5IG9yIHN0cmluZywgdmFsdWVzIHNldCB0byB0cnVlLlxuICovXG5jb25zdCB0b09iamVjdFNldCA9IChhcnJheU9yU3RyaW5nLCBkZWxpbWl0ZXIpID0+IHtcbiAgY29uc3Qgb2JqID0ge307XG5cbiAgY29uc3QgZGVmaW5lID0gKGFycikgPT4ge1xuICAgIGFyci5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgb2JqW3ZhbHVlXSA9IHRydWU7XG4gICAgfSk7XG4gIH07XG5cbiAgaXNBcnJheShhcnJheU9yU3RyaW5nKSA/IGRlZmluZShhcnJheU9yU3RyaW5nKSA6IGRlZmluZShTdHJpbmcoYXJyYXlPclN0cmluZykuc3BsaXQoZGVsaW1pdGVyKSk7XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuY29uc3QgdG9GaW5pdGVOdW1iZXIgPSAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBOdW1iZXIuaXNGaW5pdGUoKHZhbHVlID0gK3ZhbHVlKSkgPyB2YWx1ZSA6IGRlZmF1bHRWYWx1ZTtcbn07XG5cbi8qKlxuICogSWYgdGhlIHRoaW5nIGlzIGEgRm9ybURhdGEgb2JqZWN0LCByZXR1cm4gdHJ1ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IHRoaW5nIC0gVGhlIHRoaW5nIHRvIGNoZWNrLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1NwZWNDb21wbGlhbnRGb3JtKHRoaW5nKSB7XG4gIHJldHVybiAhIShcbiAgICB0aGluZyAmJlxuICAgIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJlxuICAgIHRoaW5nW3RvU3RyaW5nVGFnXSA9PT0gJ0Zvcm1EYXRhJyAmJlxuICAgIHRoaW5nW2l0ZXJhdG9yXVxuICApO1xufVxuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IGNvbnZlcnRzIGFuIG9iamVjdCB0byBhIEpTT04tY29tcGF0aWJsZSBvYmplY3QsIGhhbmRsaW5nIGNpcmN1bGFyIHJlZmVyZW5jZXMgYW5kIEJ1ZmZlcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIFRoZSBvYmplY3QgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBKU09OLWNvbXBhdGlibGUgb2JqZWN0LlxuICovXG5jb25zdCB0b0pTT05PYmplY3QgPSAob2JqKSA9PiB7XG4gIGNvbnN0IHZpc2l0ZWQgPSBuZXcgV2Vha1NldCgpO1xuXG4gIGNvbnN0IHZpc2l0ID0gKHNvdXJjZSkgPT4ge1xuICAgIGlmIChpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICBpZiAodmlzaXRlZC5oYXMoc291cmNlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vQnVmZmVyIGNoZWNrXG4gICAgICBpZiAoaXNCdWZmZXIoc291cmNlKSkge1xuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoISgndG9KU09OJyBpbiBzb3VyY2UpKSB7XG4gICAgICAgIC8vIGFkZC1vbiBkZXNjZW50IC8gZGVsZXRlLW9uLWFzY2VudDogcHJlc2VydmVzIHBhdGggc2VtYW50aWNzLCBzbyBEQUcgbm9kZXMgc2VyaWFsaXNlIGF0IGV2ZXJ5IG9jY3VycmVuY2UgKHNlZSAjNzIzMCkuXG4gICAgICAgIHZpc2l0ZWQuYWRkKHNvdXJjZSk7XG5cbiAgICAgICAgbGV0IHRhcmdldDtcblxuICAgICAgICBpZiAoaXNTZXQoc291cmNlKSkge1xuICAgICAgICAgIHRhcmdldCA9IFtdO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2Ygc291cmNlKSB7XG4gICAgICAgICAgICBjb25zdCByZWR1Y2VkVmFsdWUgPSB2aXNpdCh2YWx1ZSk7XG4gICAgICAgICAgICAhaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSAmJiB0YXJnZXQucHVzaChyZWR1Y2VkVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXQgPSBpc0FycmF5KHNvdXJjZSkgPyBbXSA6IHt9O1xuXG4gICAgICAgICAgZm9yRWFjaChzb3VyY2UsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZWR1Y2VkVmFsdWUgPSB2aXNpdCh2YWx1ZSk7XG4gICAgICAgICAgICAhaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSAmJiAodGFyZ2V0W2tleV0gPSByZWR1Y2VkVmFsdWUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmlzaXRlZC5kZWxldGUoc291cmNlKTtcblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH07XG5cbiAgcmV0dXJuIHZpc2l0KG9iaik7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSB2YWx1ZSBpcyBhbiBhc3luYyBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIC0gVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBhc3luYyBmdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlLlxuICovXG5jb25zdCBpc0FzeW5jRm4gPSBraW5kT2ZUZXN0KCdBc3luY0Z1bmN0aW9uJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIHZhbHVlIGlzIHRoZW5hYmxlIChoYXMgdGhlbiBhbmQgY2F0Y2ggbWV0aG9kcykuXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyAtIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgdGhlbmFibGUsIG90aGVyd2lzZSBmYWxzZS5cbiAqL1xuY29uc3QgaXNUaGVuYWJsZSA9ICh0aGluZykgPT5cbiAgdGhpbmcgJiZcbiAgKGlzT2JqZWN0KHRoaW5nKSB8fCBpc0Z1bmN0aW9uKHRoaW5nKSkgJiZcbiAgaXNGdW5jdGlvbih0aGluZy50aGVuKSAmJlxuICBpc0Z1bmN0aW9uKHRoaW5nLmNhdGNoKTtcblxuLy8gb3JpZ2luYWwgY29kZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL0RpZ2l0YWxCcmFpbkpTL0F4aW9zUHJvbWlzZS9ibG9iLzE2ZGVhYjEzNzEwZWMwOTc3OTkyMjEzMWYzZmE1OTU0MzIwZjgzYWIvbGliL3V0aWxzLmpzI0wxMS1MMzRcblxuLyoqXG4gKiBQcm92aWRlcyBhIGNyb3NzLXBsYXRmb3JtIHNldEltbWVkaWF0ZSBpbXBsZW1lbnRhdGlvbi5cbiAqIFVzZXMgbmF0aXZlIHNldEltbWVkaWF0ZSBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBmYWxscyBiYWNrIHRvIHBvc3RNZXNzYWdlIG9yIHNldFRpbWVvdXQuXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBzZXRJbW1lZGlhdGVTdXBwb3J0ZWQgLSBXaGV0aGVyIHNldEltbWVkaWF0ZSBpcyBzdXBwb3J0ZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHBvc3RNZXNzYWdlU3VwcG9ydGVkIC0gV2hldGhlciBwb3N0TWVzc2FnZSBpcyBzdXBwb3J0ZWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdG8gc2NoZWR1bGUgYSBjYWxsYmFjayBhc3luY2hyb25vdXNseS5cbiAqL1xuY29uc3QgX3NldEltbWVkaWF0ZSA9ICgoc2V0SW1tZWRpYXRlU3VwcG9ydGVkLCBwb3N0TWVzc2FnZVN1cHBvcnRlZCkgPT4ge1xuICBpZiAoc2V0SW1tZWRpYXRlU3VwcG9ydGVkKSB7XG4gICAgcmV0dXJuIHNldEltbWVkaWF0ZTtcbiAgfVxuXG4gIHJldHVybiBwb3N0TWVzc2FnZVN1cHBvcnRlZFxuICAgID8gKCh0b2tlbiwgY2FsbGJhY2tzKSA9PiB7XG4gICAgICAgIF9nbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAnbWVzc2FnZScsXG4gICAgICAgICAgKHsgc291cmNlLCBkYXRhIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgPT09IF9nbG9iYWwgJiYgZGF0YSA9PT0gdG9rZW4pIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2tzLmxlbmd0aCAmJiBjYWxsYmFja3Muc2hpZnQoKSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gKGNiKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2tzLnB1c2goY2IpO1xuICAgICAgICAgIF9nbG9iYWwucG9zdE1lc3NhZ2UodG9rZW4sICcqJyk7XG4gICAgICAgIH07XG4gICAgICB9KShgYXhpb3NAJHtNYXRoLnJhbmRvbSgpfWAsIFtdKVxuICAgIDogKGNiKSA9PiBzZXRUaW1lb3V0KGNiKTtcbn0pKHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbicsIGlzRnVuY3Rpb24oX2dsb2JhbC5wb3N0TWVzc2FnZSkpO1xuXG4vKipcbiAqIFNjaGVkdWxlcyBhIG1pY3JvdGFzayBvciBhc3luY2hyb25vdXMgY2FsbGJhY2sgYXMgc29vbiBhcyBwb3NzaWJsZS5cbiAqIFVzZXMgcXVldWVNaWNyb3Rhc2sgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgZmFsbHMgYmFjayB0byBwcm9jZXNzLm5leHRUaWNrIG9yIF9zZXRJbW1lZGlhdGUuXG4gKlxuICogQHR5cGUge0Z1bmN0aW9ufVxuICovXG5jb25zdCBhc2FwID1cbiAgdHlwZW9mIHF1ZXVlTWljcm90YXNrICE9PSAndW5kZWZpbmVkJ1xuICAgID8gcXVldWVNaWNyb3Rhc2suYmluZChfZ2xvYmFsKVxuICAgIDogKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLm5leHRUaWNrKSB8fCBfc2V0SW1tZWRpYXRlO1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKipcblxuY29uc3QgaXNJdGVyYWJsZSA9ICh0aGluZykgPT4gdGhpbmcgIT0gbnVsbCAmJiBpc0Z1bmN0aW9uKHRoaW5nW2l0ZXJhdG9yXSk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgaXRlcmFibGUgdmlhIGFuIGl0ZXJhdG9yIHRoYXQgaXMgTk9UIHNvdXJjZWQgc29sZWx5XG4gKiBmcm9tIGEgcG9sbHV0ZWQgT2JqZWN0LnByb3RvdHlwZS4gVXNlIHRoaXMgaW5zdGVhZCBvZiBgaXNJdGVyYWJsZWAgd2hlbmV2ZXJcbiAqIHRoZSBpdGVyYWJsZSBjb21lcyBmcm9tIHVudHJ1c3RlZCBpbnB1dCAoZS5nLiB1c2VyLXN1cHBsaWVkIGhlYWRlciBzb3VyY2VzKSxcbiAqIHNvIGBPYmplY3QucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSAuLi5gIGNhbm5vdCB0dXJuIGFuIG9yZGluYXJ5IG9iamVjdFxuICogaW50byBhbiBhdHRhY2tlci1jb250cm9sbGVkIGVudHJpZXMgaXRlcmF0b3IuXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGhhcyBhIG5vbi1wb2xsdXRlZCBpdGVyYXRvclxuICovXG5jb25zdCBpc1NhZmVJdGVyYWJsZSA9ICh0aGluZykgPT5cbiAgdGhpbmcgIT0gbnVsbCAmJiBoYXNPd25JblByb3RvdHlwZUNoYWluKHRoaW5nLCBpdGVyYXRvcikgJiYgaXNJdGVyYWJsZSh0aGluZyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXIsXG4gIGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZyxcbiAgaXNOdW1iZXIsXG4gIGlzQm9vbGVhbixcbiAgaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3QsXG4gIGlzRW1wdHlPYmplY3QsXG4gIGlzUmVhZGFibGVTdHJlYW0sXG4gIGlzUmVxdWVzdCxcbiAgaXNSZXNwb25zZSxcbiAgaXNIZWFkZXJzLFxuICBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlLFxuICBpc0ZpbGUsXG4gIGlzUmVhY3ROYXRpdmVCbG9iLFxuICBpc1JlYWN0TmF0aXZlLFxuICBpc0Jsb2IsXG4gIGlzUmVnRXhwLFxuICBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdCxcbiAgZm9yRWFjaCxcbiAgbWVyZ2UsXG4gIGV4dGVuZCxcbiAgdHJpbSxcbiAgc3RyaXBCT00sXG4gIGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3QsXG4gIGtpbmRPZixcbiAga2luZE9mVGVzdCxcbiAgZW5kc1dpdGgsXG4gIHRvQXJyYXksXG4gIGZvckVhY2hFbnRyeSxcbiAgbWF0Y2hBbGwsXG4gIGlzSFRNTEZvcm0sXG4gIGhhc093blByb3BlcnR5LFxuICBoYXNPd25Qcm9wOiBoYXNPd25Qcm9wZXJ0eSwgLy8gYW4gYWxpYXMgdG8gYXZvaWQgRVNMaW50IG5vLXByb3RvdHlwZS1idWlsdGlucyBkZXRlY3Rpb25cbiAgaGFzT3duSW5Qcm90b3R5cGVDaGFpbixcbiAgZ2V0U2FmZVByb3AsXG4gIHRvU2FmZUZsYXRPYmplY3QsXG4gIHJlZHVjZURlc2NyaXB0b3JzLFxuICBmcmVlemVNZXRob2RzLFxuICB0b09iamVjdFNldCxcbiAgdG9DYW1lbENhc2UsXG4gIG5vb3AsXG4gIHRvRmluaXRlTnVtYmVyLFxuICBmaW5kS2V5LFxuICBnbG9iYWw6IF9nbG9iYWwsXG4gIGlzQ29udGV4dERlZmluZWQsXG4gIGlzU3BlY0NvbXBsaWFudEZvcm0sXG4gIHRvSlNPTk9iamVjdCxcbiAgaXNBc3luY0ZuLFxuICBpc1RoZW5hYmxlLFxuICBzZXRJbW1lZGlhdGU6IF9zZXRJbW1lZGlhdGUsXG4gIGFzYXAsXG4gIGlzSXRlcmFibGUsXG4gIGlzU2FmZUl0ZXJhYmxlLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbmNvbnN0IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0Y29uc3QgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdGNvbnN0IG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHRjb25zdCBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0Y29uc3QgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIvdmFsdWUgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc2V0IC5uYW1lIGZvciBhbm9ueW1vdXMgZGVmYXVsdCBleHBvcnRzIHBlciBFUyBzcGVjXG4vLyBza2lwcGVkIHdoZW4gdGhlIHByb3BlcnR5IGlzIG5vbi1jb25maWd1cmFibGUgKHByZS1FUzIwMTUgZW5naW5lcyksXG4vLyB3aGVyZSBPYmplY3QuZGVmaW5lUHJvcGVydHkgd291bGQgdGhyb3dcbl9fd2VicGFja19yZXF1aXJlX18uZG4gPSAoeCkgPT4ge1xuXHR2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoeCwgXCJuYW1lXCIpO1xuXHRpZiAoIWRlc2NyaXB0b3IgfHwgKCFkZXNjcmlwdG9yLndyaXRhYmxlICYmIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlKSkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHgsIFwibmFtZVwiLCB7IHZhbHVlOiBcImRlZmF1bHRcIiwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2luZGV4LmNzc1wiXG5pbXBvcnQge2F4aW9zfSBmcm9tIFwiQC9yZXF1ZXN0LmpzXCJcbmltcG9ydCBcIi4uLy4uL3V0aWxzL2VkaXRvci5qc1wiXG5pbXBvcnQge2F1dGh9ZnJvbSBcIkAvYXV0aC5qc1wiXG5pbXBvcnQgXCIuLi8uLi91dGlscy9hbGVydC5qc1wiXG4vKipcbiAqIOebruaghzHvvJrorr7nva7popHpgZPkuIvmi4noj5zljZVcbiAqICAxLjEg6I635Y+W6aKR6YGT5YiX6KGo5pWw5o2uXG4gKiAgMS4yIOWxleekuuWIsOS4i+aLieiPnOWNleS4rVxuICovXG5cbi8qKlxuICog55uu5qCHMu+8muaWh+eroOWwgemdouiuvue9rlxuICogIDIuMSDlh4blpIfmoIfnrb7nu5PmnoTlkozmoLflvI9cbiAqICAyLjIg6YCJ5oup5paH5Lu25bm25L+d5a2Y5ZyoIEZvcm1EYXRhXG4gKiAgMi4zIOWNleeLrOS4iuS8oOWbvueJh+W5tuW+l+WIsOWbvueJhyBVUkwg572R5Z2AXG4gKiAgMi40IOWbnuaYvuW5tuWIh+aNoiBpbWcg5qCH562+5bGV56S677yI6ZqQ6JePICsg5Y+35LiK5Lyg5qCH562+77yJXG4gKi9cblxuLyoqXG4gKiDnm67moIcz77ya5Y+R5biD5paH56ug5L+d5a2YXG4gKiAgMy4xIOWfuuS6jiBmb3JtLXNlcmlhbGl6ZSDmj5Lku7bmlLbpm4booajljZXmlbDmja7lr7nosaFcbiAqICAzLjIg5Z+65LqOIGF4aW9zIOaPkOS6pOWIsOacjeWKoeWZqOS/neWtmFxuICogIDMuMyDosIPnlKggQWxlcnQg6K2m5ZGK5qGG5Y+N6aaI57uT5p6c57uZ55So5oi3XG4gKiAgMy40IOmHjee9ruihqOWNleW5tui3s+i9rOWIsOWIl+ihqOmhtVxuICovXG5cbi8qKlxuICog55uu5qCHNO+8mue8lui+kS3lm57mmL7mlofnq6BcbiAqICA0LjEg6aG16Z2i6Lez6L2s5Lyg5Y+C77yIVVJMIOafpeivouWPguaVsOaWueW8j++8iVxuICogIDQuMiDlj5HluIPmlofnq6DpobXpnaLmjqXmlLblj4LmlbDliKTmlq3vvIjlhbHnlKjlkIzkuIDlpZfooajljZXvvIlcbiAqICA0LjMg5L+u5pS55qCH6aKY5ZKM5oyJ6ZKu5paH5a2XXG4gKiAgNC40IOiOt+WPluaWh+eroOivpuaDheaVsOaNruW5tuWbnuaYvuihqOWNlVxuICovXG5cbi8qKlxuICog55uu5qCHNe+8mue8lui+kS3kv53lrZjmlofnq6BcbiAqICA1LjEg5Yik5pat5oyJ6ZKu5paH5a2X77yM5Yy65YiG5Lia5Yqh77yI5Zug5Li65YWx55So5LiA5aWX6KGo5Y2V77yJXG4gKiAgNS4yIOiwg+eUqOe8lui+keaWh+eroOaOpeWPo++8jOS/neWtmOS/oeaBr+WIsOacjeWKoeWZqFxuICogIDUuMyDln7rkuo4gQWxlcnQg5Y+N6aaI57uT5p6c5raI5oGv57uZ55So5oi3XG4gKi9cblxuICAgIGNvbnN0IHsgY3JlYXRlRWRpdG9yLCBjcmVhdGVUb29sYmFyIH0gPSB3aW5kb3cud2FuZ0VkaXRvclxuXG4gICAgY29uc3QgZWRpdG9yQ29uZmlnID0ge1xuICAgICAgcGxhY2Vob2xkZXI6ICdUeXBlIGhlcmUuLi4nLFxuICAgICAgb25DaGFuZ2UoZWRpdG9yKSB7XG4gICAgICAgIGNvbnN0IGh0bWwgPSBlZGl0b3IuZ2V0SHRtbCgpXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0ZXh0YXJlYVwiKS52YWx1ZSA9IGh0bWw7XG4gICAgICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0ZXh0YXJlYVwiKS52YWx1ZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBlZGl0b3IgPSBjcmVhdGVFZGl0b3Ioe1xuICAgICAgc2VsZWN0b3I6ICcjZWRpdG9yLWNvbnRhaW5lcicsXG4gICAgICBodG1sOiAnPHA+PGJyPjwvcD4nLFxuICAgICAgY29uZmlnOiBlZGl0b3JDb25maWcsXG4gICAgICBtb2RlOiAnZGVmYXVsdCcsIC8vIG9yICdzaW1wbGUnXG4gICAgfSlcblxuICAgIGNvbnN0IHRvb2xiYXJDb25maWcgPSB7fVxuXG4gICAgY29uc3QgdG9vbGJhciA9IGNyZWF0ZVRvb2xiYXIoe1xuICAgICAgZWRpdG9yLFxuICAgICAgc2VsZWN0b3I6ICcjdG9vbGJhci1jb250YWluZXInLFxuICAgICAgY29uZmlnOiB0b29sYmFyQ29uZmlnLFxuICAgICAgbW9kZTogJ2RlZmF1bHQnLCAvLyBvciAnc2ltcGxlJ1xuICAgIH0pXG5cbiAgICBhdXRoKCk7XG4gICAgZ2V0Q2hhbm5lbExpc3QoKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgYXN5bmMgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwiaW1hZ2VcIiwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0LmltZy1maWxlXCIpLmZpbGVzWzBdKVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBheGlvcyh7XG4gICAgICAgICAgdXJsOiBcIi92MV8wL3VwbG9hZFwiLFxuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgZGF0YTogZm9ybURhdGFcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBkYXRhID0ge307XG4gICAgICAgIGNvbnNvbGUuZGlyKHJlc3VsdClcbiAgICAgICAgJCh0aGlzKS5zZXJpYWxpemVBcnJheSgpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgZGF0YVtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZVxuICAgICAgICB9KVxuXG4gICAgICAgIGRhdGEuY292ZXIgPSB7XG4gICAgICAgICAgdHlwZTogMSxcbiAgICAgICAgICBpbWFnZXM6IFtgJHtyZXN1bHQuZGF0YS5kYXRhLnVybH1gXVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICAgICAgY29uc3QgciA9IGF3YWl0IGF4aW9zKHtcbiAgICAgICAgICB1cmw6IFwiL3YxXzAvbXAvYXJ0aWNsZXNcIixcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgIGRhdGFcbiAgICAgICAgfSlcbiAgICAgICAgY29uc29sZS5sb2cocilcbiAgICAgICAgbG9jYXRpb24uaHJlZiA9IFwiLi8uLi9jb250ZW50L1wiXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIG15QWxlcnQoZmFsc2UsIGUucmVzcG9uc2UuZGF0YS5tZXNzYWdlKVxuICAgICAgfVxuICAgIH0pXG5cblxuXG5mdW5jdGlvbiBnZXRDaGFubmVsTGlzdCgpIHtcbiAgICBheGlvcyh7XG4gICAgICB1cmw6IFwiL3YxXzAvY2hhbm5lbHNcIlxuICAgIH0pLnRoZW4ociA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tc2VsZWN0I2NoYW5uZWxfaWRcIikuaW5uZXJIVE1MID0gJzxvcHRpb24gdmFsdWU9XCJcIiBzZWxlY3RlZD7or7fpgInmi6nmlofnq6DpopHpgZM8L29wdGlvbj4nICsgci5kYXRhLmRhdGEuY2hhbm5lbHMubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gYCA8b3B0aW9uIHZhbHVlPVwiJHtpdGVtLmlkfVwiPiR7aXRlbS5uYW1lfTwvb3B0aW9uPmBcbiAgICAgIH0pLmpvaW4oXCJcIilcbiAgICB9KVxuICB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9