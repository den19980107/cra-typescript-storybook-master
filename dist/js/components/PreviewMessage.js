"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

require("../styles/fabric-icons-inline.css");

require("../styles/PreviewMessage.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var PreviewMessage = /*#__PURE__*/function (_Component) {
  _inherits(PreviewMessage, _Component);

  var _super = _createSuper(PreviewMessage);

  function PreviewMessage(props) {
    var _this;

    _classCallCheck(this, PreviewMessage);

    _this = _super.call(this, props);
    _this.checkIsVisable = _this.checkIsVisable.bind(_assertThisInitialized(_this));
    _this.closeMessage = _this.closeMessage.bind(_assertThisInitialized(_this));
    _this.maximizeButton = _this.maximizeButton.bind(_assertThisInitialized(_this));
    _this.state = {
      isVisable: true
    };
    return _this;
  }

  _createClass(PreviewMessage, [{
    key: "checkIsVisable",
    value: function checkIsVisable() {
      if (this.state.isVisable && this.props.message && this.props.message != "") {
        return "flex";
      }

      return "none";
    }
  }, {
    key: "closeMessage",
    value: function closeMessage(e) {
      e.preventDefault();
      this.setState({
        isVisable: false
      });
    }
    /** 觸發聊天室窗開啟功能 */

  }, {
    key: "maximizeButton",
    value: function maximizeButton() {
      this.props.maximizeButton();
    }
    /** 控制預覽視窗關閉按鈕顯示 */

  }, {
    key: "handleCloseButtonVisbility",
    value: function handleCloseButtonVisbility(e) {
      document.getElementById('close-btn').style.display = e.type === 'mouseenter' ? 'block' : 'none';
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      this.setState({
        isVisable: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var previewMsgStyle = {
        display: this.checkIsVisable(),
        position: "absolute",
        right: "125px",
        bottom: "35px",
        width: "350px",
        justifyContent: "flex-end"
      };
      var buttonStyle = {
        display: 'none'
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        style: previewMsgStyle,
        onMouseEnter: this.handleCloseButtonVisbility,
        onMouseLeave: this.handleCloseButtonVisbility
      }, /*#__PURE__*/_react.default.createElement("button", {
        id: "close-btn",
        onClick: this.closeMessage,
        style: buttonStyle
      }, /*#__PURE__*/_react.default.createElement("div", {
        id: "close-btn-background"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "ms-Icon ms-Icon--Cancel",
        id: "close-btn-icon"
      }))), /*#__PURE__*/_react.default.createElement("div", {
        id: "message-wrapper",
        onClick: this.maximizeButton
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "message-box-bump"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "message-box"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "message"
      }, /*#__PURE__*/_react.default.createElement("span", null, this.props.message)))));
    }
  }]);

  return PreviewMessage;
}(_react.Component);

_defineProperty(PreviewMessage, "propTypes", {
  message: _propTypes.default.string.isRequired
});

var _default = PreviewMessage;
exports.default = _default;
//# sourceMappingURL=PreviewMessage.js.map