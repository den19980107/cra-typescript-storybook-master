"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Store = require("./Store");

var _Storage = _interopRequireDefault(require("./Storage"));

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var config;

var initial = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(rawConfig) {
    var directLineOptions, decoded, directLinePath, webChatOptions, webChatButtonOptions, webChatHeaderOptions, styleOptions;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = _objectSpread({}, rawConfig);
            directLineOptions = config.directLineOptions = _objectSpread({}, config.directLineOptions);
            decoded = directLineOptions.token ? (0, _jwtDecode.default)(directLineOptions.token) : {};
            config.botId = (decoded.botId || config.botId).toLowerCase();
            config.userId = decoded.userId || config.userId || _Storage.default.getUserId() || randomUserID();
            config.userName = config.userName || '';
            directLineOptions.domain = decoded.origin || directLineOptions.domain;
            directLinePath = directLineOptions.domain.endsWith('/directline') ? '' : '/directline';
            directLineOptions.domain += "".concat(directLinePath, "/").concat(config.botId);
            _context.t0 = !(directLineOptions.webSocket === false);

            if (!_context.t0) {
              _context.next = 14;
              break;
            }

            _context.next = 13;
            return checkWebSocketIsOpen(directLineOptions.domain);

          case 13:
            _context.t0 = _context.sent;

          case 14:
            directLineOptions.webSocket = _context.t0;
            directLineOptions.pollingAutoClose = directLineOptions.pollingAutoClose === true;
            directLineOptions.conversationId = decoded.conversationId || directLineOptions.conversationId || _Storage.default.getConversationId() || '';
            directLineOptions.watermark = 0;

            if (!directLineOptions.webSocket && !directLineOptions.pollingAutoClose) {
              directLineOptions.watermark = -1; //polling watermark 設成 -1 才會先取歷史訊息
            }

            webChatOptions = config.webChatOptions = _objectSpread({}, config.webChatOptions);
            webChatButtonOptions = webChatOptions.buttonOptions = _objectSpread({}, webChatOptions.buttonOptions);
            webChatButtonOptions.iconUrl = webChatButtonOptions.iconUrl || 'https://bot-framework.azureedge.net/bot-icons-v1/bot-framework-default-7.png';
            webChatButtonOptions.visible = !(webChatButtonOptions.visible === false);
            webChatButtonOptions.displayOnTheSide = webChatButtonOptions.displayOnTheSide === true;
            webChatHeaderOptions = webChatOptions.headerOptions = _objectSpread({}, webChatOptions.headerOptions); // default style.

            styleOptions = webChatOptions.styleOptions = Object.assign({
              // Bubble
              bubbleBackground: '#eceff1',
              bubbleBorderColor: '#E6E6E6',
              bubbleBorderRadius: '0px 12px 12px 12px',
              bubbleBorderStyle: 'solid',
              bubbleBorderWidth: 1,
              bubbleFromUserBackground: '#0078d7',
              bubbleFromUserBorderColor: '#E6E6E6',
              bubbleFromUserBorderRadius: '12px 0px 12px 12px',
              bubbleFromUserBorderStyle: 'solid',
              bubbleFromUserBorderWidth: 1,
              bubbleFromUserTextColor: '#ffffff',
              // Avatar
              botAvatarImage: webChatButtonOptions.iconUrl,
              botAvatarInitials: config.botName
            }, _objectSpread({}, webChatOptions.styleOptions)); // createStore.

            webChatOptions.store = (0, _Store.createStore)();
            return _context.abrupt("return", config);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initial(_x) {
    return _ref.apply(this, arguments);
  };
}();

var get = function get() {
  return config;
};

var randomUserID = function randomUserID() {
  return "r_".concat(Math.random().toString(36).substr(2, 10));
};
/** 檢查 WebSocket 是否有通 (return true = open) */


var checkWebSocketIsOpen = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(domain) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              if (!WebSocket) return resolve(false);
              var ws = new WebSocket(domain.replace('http', 'ws'));

              ws.onopen = function () {
                ws.close();
                resolve(true);
              };

              ws.onerror = function (evt) {
                resolve(false);
              };
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function checkWebSocketIsOpen(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  initial: initial,
  get: get
};
exports.default = _default;
//# sourceMappingURL=Configuration.js.map