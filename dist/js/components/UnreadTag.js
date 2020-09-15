"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Store = _interopRequireDefault(require("../utils/Store"));

var _createMessageMutationObserver = _interopRequireDefault(require("../utils/createMessageMutationObserver"));

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

var _default = /*#__PURE__*/function (_React$Component) {
  _inherits(_default, _React$Component);

  var _super = _createSuper(_default);

  function _default(props) {
    var _this;

    _classCallCheck(this, _default);

    _this = _super.call(this, props);
    console.log('UnreadTag constructor.');
    _this.unreadTagDomRef = /*#__PURE__*/_react.default.createRef();
    _this.toogle = _this.toogle.bind(_assertThisInitialized(_this));
    _this.moveToBottom = _this.moveToBottom.bind(_assertThisInitialized(_this));
    _this.scrollToTag = _this.scrollToTag.bind(_assertThisInitialized(_this));
    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(_default, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var that = this;
      var _this$props = this.props,
          firstUnreadId = _this$props.firstUnreadId,
          lastHistoryId = _this$props.lastHistoryId;

      if (firstUnreadId) {
        // 使用 MutationObserver 當 dom rendered 後再調整 scrollbar。
        (0, _createMessageMutationObserver.default)(function (mutation, observer) {
          if (mutation.hasChildNodes && mutation.firstElementChild.getAttribute('data-key') === _this2.props.lastHistoryId) {
            observer.disconnect();

            _this2.scrollToTag(false);
          }
        });
      }

      _Store.default.ActionObservable.subscribe(function subscribe(action) {
        console.log('UnreadTag ActionObservable.');

        if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
          var activity = action.payload.activity;

          if (firstUnreadId && activity.id === firstUnreadId) {
            that.moveToBottom().toogle(true);
            firstUnreadId = null;
            lastHistoryId = null;
          } else if (lastHistoryId && activity.id === lastHistoryId) {
            setTimeout(function () {
              return that.moveToBottom();
            });
            lastHistoryId = null;
          }

          if (!firstUnreadId && !lastHistoryId) {
            _Store.default.ActionObservable.unsubscribe(subscribe);
          }
        }
      });
    }
  }, {
    key: "toogle",
    value: function toogle(display) {
      this.setState({
        visible: display
      });
      return this;
    }
  }, {
    key: "moveToBottom",
    value: function moveToBottom() {
      var unreadTag = this.unreadTagDomRef.current;
      console.log('moveToBottom');
      unreadTag.closest('ul').append(unreadTag.closest('li'));
      return this;
    }
  }, {
    key: "scrollToTag",
    value: function scrollToTag(immediatelyInvoked) {
      var unreadTag = this.unreadTagDomRef.current;
      var logContainer = unreadTag.parentElement.closest('div'); //判斷是否有 scrollbar

      if (logContainer.scrollHeight > logContainer.clientHeight) {
        if (immediatelyInvoked) {
          scroll();
        } else {
          logContainer.addEventListener('scroll', function waitHistoryLoaded() {
            // 載完對話後，webchat 會做 scrollToEnd，這時候再將 scrollbar 定位到 unread tag。
            if (logContainer.clientHeight + logContainer.scrollTop >= logContainer.scrollHeight) {
              scroll();
              logContainer.removeEventListener('scroll', waitHistoryLoaded);
            }
          });
        }
      }

      function scroll() {
        logContainer.scrollTop = Math.max(unreadTag.offsetTop - 30, 0);
      }

      return this;
    } //tag style ref: 
    //'border:2px #ccc solidborder-radius:10pxwidth:90%height: 20pxbackground-color:#eeetext-align: centermargin: auto'

  }, {
    key: "render",
    value: function render() {
      var visible = this.state.visible;
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: this.unreadTagDomRef,
        className: "unread-tag",
        hidden: !visible
      }, "\u4EE5\u4E0B\u7232\u5C1A\u672A\u95B1\u8B80\u7684\u8A0A\u606F");
    }
  }]);

  return _default;
}(_react.default.Component);

exports.default = _default;

_defineProperty(_default, "propTypes", {
  firstUnreadId: _propTypes.default.string.isRequired,
  lastHistoryId: _propTypes.default.string.isRequired
});
//# sourceMappingURL=UnreadTag.js.map