"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _MinimizableWebChat = _interopRequireDefault(require("./components/MinimizableWebChat"));

var _Configuration = _interopRequireDefault(require("./utils/Configuration"));

var _getRefObject = _interopRequireDefault(require("./utils/getRefObject"));

var _Container = require("./utils/Container");

var _WebChatAPI = _interopRequireDefault(require("./WebChatAPI"));

var _WebChatToggleStateObservable = _interopRequireDefault(require("./utils/WebChatToggleStateObservable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var minimizableWebChatRef = /*#__PURE__*/_react.default.createRef();

var createMinimizableWebChat = function createMinimizableWebChat(rawConfig, container, callback) {
  if (!container) {
    container = document.createElement('div');
    document.body.appendChild(container);
  }

  (0, _Container.setContainer)(container);

  _Configuration.default.initial(rawConfig).then(function (config) {
    return _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_MinimizableWebChat.default, {
      ref: minimizableWebChatRef,
      config: config
    }), container, callback);
  });

  return _objectSpread(_objectSpread({}, _WebChatAPI.default), {}, {
    WebChatToggleStateObservable: _WebChatToggleStateObservable.default,
    openWebChat: openWebChat,
    closeWebChat: closeWebChat,
    startConversation: startConversation,
    endConversation: endConversation,
    getMessageUnreadCount: getMessageUnreadCount
  });
};

var openWebChat = function openWebChat() {
  return toggleWebChat(true);
};

var closeWebChat = function closeWebChat() {
  return toggleWebChat(false);
};

var startConversation = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var minimizableWebChat;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getRefObject.default)(minimizableWebChatRef);

          case 2:
            minimizableWebChat = _context.sent;
            minimizableWebChat.handleStartDirectLine();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function startConversation() {
    return _ref.apply(this, arguments);
  };
}();

var endConversation = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var minimizableWebChat;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _getRefObject.default)(minimizableWebChatRef);

          case 2:
            minimizableWebChat = _context2.sent;
            minimizableWebChat.handleStopDirectLine();
            closeWebChat();

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function endConversation() {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Display or hide the WebChat.
 * @param display Use true to show the element or false to hide it.
 */


var toggleWebChat = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(display) {
    var minimizableWebChat;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _getRefObject.default)(minimizableWebChatRef);

          case 2:
            minimizableWebChat = _context3.sent;

            if (display) {
              minimizableWebChat.handleMaximizeButtonClick();
            } else {
              minimizableWebChat.handleMinimizeButtonClick();
            }

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function toggleWebChat(_x) {
    return _ref3.apply(this, arguments);
  };
}();

var getMessageUnreadCount = function getMessageUnreadCount() {
  var minimizableWebChat = minimizableWebChatRef.current;
  return minimizableWebChat && minimizableWebChat.getMessageUnreadCount() || 0;
};

var _default = createMinimizableWebChat;
exports.default = _default;
//# sourceMappingURL=createMinimizableWebChat.js.map