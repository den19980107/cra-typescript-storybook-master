"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _react = _interopRequireDefault(require("react"));

var _botframeworkWebchat = _interopRequireDefault(require("botframework-webchat"));

require("../styles/WebChat.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = /*#__PURE__*/function (_React$Component) {
  _inherits(_default, _React$Component);

  var _super = _createSuper(_default);

  function _default(props) {
    var _this;

    _classCallCheck(this, _default);

    _this = _super.call(this, props);
    _this.createStyleSet = (0, _memoizeOne.default)(function (styleOptions) {
      console.log('createStyleSet');
      return window.WebChat.createStyleSet(styleOptions);
    });
    return _this;
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          directLine = _this$props.directLine,
          _this$props$config = _this$props.config,
          userId = _this$props$config.userId,
          userName = _this$props$config.userName,
          _this$props$config$we = _this$props$config.webChatOptions,
          store = _this$props$config$we.store,
          styleOptions = _this$props$config$we.styleOptions;

      _objectDestructuringEmpty(this.state);
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

      var webChatProps = _objectSpread(_objectSpread({}, this.props.config), {}, {
        userID: userId,
        username: userName,
        className: "".concat(className || '', " web-chat"),
        directLine: directLine,
        store: store,
        styleSet: this.createStyleSet(styleOptions),
        activityMiddleware: this.activityMiddleware
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
  }]);

  return _default;
}(_react.default.Component);

exports.default = _default;

_defineProperty(_default, "propTypes", {
  className: _propTypes.default.string
});
//# sourceMappingURL=WebChat.js.map