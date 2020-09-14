(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "prop-types", "react", "botframework-webchat"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("prop-types"), require("react"), require("botframework-webchat"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.propTypes, global.react, global.botframeworkWebchat);
    global.undefined = mod.exports;
  }
})(this, function (exports, _propTypes, _react, _botframeworkWebchat) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = WebChat;

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _react2 = _interopRequireDefault(_react);

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
    config,
    directLine,
    className
  }) {
    let webChatProps = _objectSpread({}, config);

    return directLine ? /*#__PURE__*/_react2.default.createElement(_botframeworkWebchat2.default, webChatProps) : /*#__PURE__*/_react2.default.createElement("div", {
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