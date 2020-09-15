(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "prop-types", "memoize-one", "react", "./UnreadTag", "botframework-webchat", "../styles/WebChat.css"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("prop-types"), require("memoize-one"), require("react"), require("./UnreadTag"), require("botframework-webchat"), require("../styles/WebChat.css"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.propTypes, global.memoizeOne, global.react, global.UnreadTag, global.botframeworkWebchat, global.WebChat);
    global.undefined = mod.exports;
  }
})(this, function (exports, _propTypes, _memoizeOne, _react, _UnreadTag, _botframeworkWebchat) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

  var _react2 = _interopRequireDefault(_react);

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

  class _class extends _react2.default.Component {
    constructor(props) {
      super(props);
      this.createStyleSet = (0, _memoizeOne2.default)(styleOptions => {
        console.log('createStyleSet');
        return (0, _botframeworkWebchat.createStyleSet)(styleOptions);
      });
      this.unreadTagRef = /*#__PURE__*/_react2.default.createRef();
      let lastHistoryId = null;

      this.activityMiddleware = () => next => card => {
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
            ref: this.unreadTagRef,
            firstUnreadId: value.firstUnreadId,
            lastHistoryId: value.lastHistoryId
          });
        } else if (lastHistoryId && id === lastHistoryId) {
          return (...renderArgs) => /*#__PURE__*/_react2.default.createElement("div", {
            key: id,
            "data-key": id
          }, next(card)(...renderArgs));
        } else {
          return next(card);
        }
      };
    }

    render() {
      const {
        props: {
          className,
          directLine,
          config: {
            userId,
            userName,
            webChatOptions: {
              store,
              styleOptions
            }
          }
        },
        state: {}
      } = this;
      let ReactWebChat = _botframeworkWebchat2.default.ReactWebChat || _botframeworkWebchat2.default;

      if (typeof ReactWebChat !== "function") {
        ReactWebChat = /*#__PURE__*/_react2.default.createElement("div", null, "Fuck!");
      }

      let webChatProps = _objectSpread(_objectSpread({}, this.props.config), {}, {
        userID: userId,
        username: userName,
        className: `${className || ''} web-chat`,
        directLine: directLine,
        store: store,
        styleSet: this.createStyleSet(styleOptions),
        activityMiddleware: this.activityMiddleware
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

  }

  exports.default = _class;

  _defineProperty(_class, "propTypes", {
    className: _propTypes2.default.string
  });
});
//# sourceMappingURL=WebChat.js.map