"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WebChat;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _UnreadTag = _interopRequireDefault(require("./UnreadTag"));

var _botframeworkWebchat = _interopRequireWildcard(require("botframework-webchat"));

require("../styles/WebChat.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function WebChat(_ref) {
  var className = _ref.className,
      config = _ref.config,
      directLine = _ref.directLine;
  var createStyleSet;
  var activityMiddleware;
  var unreadTagRef;
  createStyleSet = (0, _memoizeOne.default)(function (styleOptions) {
    console.log('createStyleSet');
    return (0, _botframeworkWebchat.createStyleSet)(styleOptions);
  });
  (0, _react.useEffect)(function () {
    unreadTagRef = /*#__PURE__*/_react.default.createRef();
    var lastHistoryId = null;

    activityMiddleware = function activityMiddleware() {
      return function (next) {
        return function (card) {
          var _card$activity = card.activity,
              name = _card$activity.name,
              type = _card$activity.type,
              id = _card$activity.id,
              value = _card$activity.value;

          if (type === 'event' && name === 'UnReadInfo') {
            lastHistoryId = value.lastHistoryId;
            return function () {
              return /*#__PURE__*/_react.default.createElement(_UnreadTag.default, {
                key: id,
                ref: unreadTagRef,
                firstUnreadId: value.firstUnreadId,
                lastHistoryId: value.lastHistoryId
              });
            };
          } else if (lastHistoryId && id === lastHistoryId) {
            return function (children) {
              return /*#__PURE__*/_react.default.createElement("div", {
                key: id,
                "data-key": id
              }, next(card)(children));
            };
          } else {
            return next(card);
          }
        };
      };
    };
  }, []);
  /**
   * 引入 ReactWebChat 有分兩種狀況：
   * 
   * 1. 使用 webpack build 出來的 gss-webchat.js：
   *    如果是使用 gss-webchat.js 需要在 html 中引入 botframework webchat-es5.js 的 cdn
   *    所以 ReactWebChat 會從 window 中拿取
   * 
   * 2. 使用 rollup.js build 出可以在其他 react 專案中以 component 引入的 gss-webchat-component.js：
   *    使用 gss-webchat-component.js 則是需要 user 在自己的專案中安裝 botframework-webchat 的 npm 套件
   *    所以 ReactWebChat 會從 package 中拿取
   */
  // 1. 使用 webpack build 出來的 gss-webchat.js

  var ReactWebChat = window.WebChat.ReactWebChat;

  if (!ReactWebChat) {
    // 2. 使用 rollup.js build 出可以在其他 react 專案中以 component 引入的 gss-webchat-component.js
    ReactWebChat = _botframeworkWebchat.default;
  }

  var webChatProps = _objectSpread(_objectSpread({}, config), {}, {
    userID: config.userId,
    username: config.userName,
    className: "".concat(className || '', " web-chat"),
    directLine: directLine,
    store: config.webChatOptions.store,
    styleSet: createStyleSet(config.webChatOptions.styleOptions),
    activityMiddleware: activityMiddleware
  });

  ['botId', 'botName', 'userId', 'userName', 'directLineOptions', 'webChatOptions'].forEach(function (k) {
    return delete webChatProps[k];
  });
  return directLine ? /*#__PURE__*/_react.default.createElement(ReactWebChat, webChatProps) : /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(className || '', " connect-spinner")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ms-Icon ms-Icon--Robot"
  })), /*#__PURE__*/_react.default.createElement("p", null, "\u9023\u7DDA\u4E2D\uFF0C\u8ACB\u7A0D\u7B49\u3002")));
}

WebChat.propTypes = {
  className: _propTypes.default.string
};
//# sourceMappingURL=WebChat.js.map