(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "prop-types", "react", "memoize-one", "./UnreadTag", "botframework-webchat", "../styles/WebChat.css"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("prop-types"), require("react"), require("memoize-one"), require("./UnreadTag"), require("botframework-webchat"), require("../styles/WebChat.css"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.propTypes, global.react, global.memoizeOne, global.UnreadTag, global.botframeworkWebchat, global.WebChat);
    global.undefined = mod.exports;
  }
})(this, function (exports, _propTypes, _react, _memoizeOne, _UnreadTag, _botframeworkWebchat) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = WebChat;

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _react2 = _interopRequireDefault(_react);

  var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

  var _UnreadTag2 = _interopRequireDefault(_UnreadTag);

  var _botframeworkWebchat2 = _interopRequireDefault(_botframeworkWebchat);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function WebChat({
    className,
    config,
    directLine
  }) {
    let createStyleSet;
    let activityMiddleware;
    let unreadTagRef;
    createStyleSet = (0, _memoizeOne2.default)(styleOptions => {
      console.log('createStyleSet');
      return (0, _botframeworkWebchat.createStyleSet)(styleOptions);
    });
    (0, _react.useEffect)(() => {
      unreadTagRef = /*#__PURE__*/_react2.default.createRef();
      let lastHistoryId = null;

      activityMiddleware = () => next => card => {
        const {
          activity: {
            name,
            type,
            id,
            value
          }
        } = card;

        if (type === 'event' && name === 'UnReadInfo') {
          lastHistoryId = value.lastHistoryId;
          return () => /*#__PURE__*/_react2.default.createElement(_UnreadTag2.default, {
            key: id,
            ref: unreadTagRef,
            firstUnreadId: value.firstUnreadId,
            lastHistoryId: value.lastHistoryId
          });
        } else if (lastHistoryId && id === lastHistoryId) {
          return children => /*#__PURE__*/_react2.default.createElement("div", {
            key: id,
            "data-key": id
          }, next(card)(children));
        } else {
          return next(card);
        }
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

    let {
      ReactWebChat
    } = window.WebChat;

    if (!ReactWebChat) {
      // 2. 使用 rollup.js build 出可以在其他 react 專案中以 component 引入的 gss-webchat-component.js
      ReactWebChat = _botframeworkWebchat2.default;
    }

    let webChatProps = _objectSpread(_objectSpread({}, config), {}, {
      userID: config.userId,
      username: config.userName,
      className: `${className || ''} web-chat`,
      directLine: directLine,
      store: config.webChatOptions.store,
      styleSet: createStyleSet(config.webChatOptions.styleOptions),
      activityMiddleware: activityMiddleware
    });

    ['botId', 'botName', 'userId', 'userName', 'directLineOptions', 'webChatOptions'].forEach(k => delete webChatProps[k]);
    return directLine ? /*#__PURE__*/_react2.default.createElement(ReactWebChat, webChatProps) : /*#__PURE__*/_react2.default.createElement("div", {
      className: `${className || ''} connect-spinner`
    }, /*#__PURE__*/_react2.default.createElement("div", {
      className: "content"
    }, /*#__PURE__*/_react2.default.createElement("div", {
      className: "icon"
    }, /*#__PURE__*/_react2.default.createElement("span", {
      className: "ms-Icon ms-Icon--Robot"
    })), /*#__PURE__*/_react2.default.createElement("p", null, "\u9023\u7DDA\u4E2D\uFF0C\u8ACB\u7A0D\u7B49\u3002")));
  }

  WebChat.propTypes = {
    className: _propTypes2.default.string
  };
});
//# sourceMappingURL=WebChat.js.map