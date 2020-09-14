"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _WebChat = _interopRequireDefault(require("./WebChat"));

var _WebChatToggleStateObservable = _interopRequireWildcard(require("../utils/WebChatToggleStateObservable"));

var _DirectLine = require("../utils/DirectLine");

var _getRefObject = _interopRequireDefault(require("../utils/getRefObject"));

var _Store = _interopRequireDefault(require("../utils/Store"));

var _Configuration = _interopRequireDefault(require("../utils/Configuration"));

require("../styles/fabric-icons-inline.css");

require("../styles/MinimizableWebChat.css");

var _PreviewMessage = _interopRequireDefault(require("./PreviewMessage"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var MinimizableWebChat = /*#__PURE__*/function (_React$Component) {
  _inherits(MinimizableWebChat, _React$Component);

  var _super = _createSuper(MinimizableWebChat);

  function MinimizableWebChat(props) {
    var _this;

    _classCallCheck(this, MinimizableWebChat);

    _this = _super.call(this, props);
    _this.webChatRef = /*#__PURE__*/_react.default.createRef();
    _this.handleStartDirectLine = _this.handleStartDirectLine.bind(_assertThisInitialized(_this));
    _this.handleStopDirectLine = _this.handleStopDirectLine.bind(_assertThisInitialized(_this));
    _this.handleMaximizeButtonClick = _this.handleMaximizeButtonClick.bind(_assertThisInitialized(_this));
    _this.handleMinimizeButtonClick = _this.handleMinimizeButtonClick.bind(_assertThisInitialized(_this));
    _this.handleSwitchButtonClick = _this.handleSwitchButtonClick.bind(_assertThisInitialized(_this));
    _this.state = {
      minimized: true,
      side: 'right',
      directLine: _this.props.defaultDirectLine,
      messageUnreadCount: 0,
      previewMessage: null
    };
    return _this;
  }

  _createClass(MinimizableWebChat, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var that = this;

      _Store.default.ActionObservable.subscribe(function subscribe(action) {
        if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
          _WebChatToggleStateObservable.default.subscribe( /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(s) {
              var webchat, unreadTag, unreadTagDom, logContainer, scrollbarAtTheBottom;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _getRefObject.default)(that.webChatRef);

                    case 2:
                      webchat = _context.sent;
                      _context.next = 5;
                      return (0, _getRefObject.default)(webchat.unreadTagRef);

                    case 5:
                      unreadTag = _context.sent;

                      if (!(s === 'open' && that.state.messageUnreadCount > 0)) {
                        _context.next = 16;
                        break;
                      }

                      _Store.default.notifyUserAlreadyRead();

                      _context.next = 10;
                      return (0, _getRefObject.default)(unreadTag.unreadTagDomRef);

                    case 10:
                      unreadTagDom = _context.sent;
                      logContainer = unreadTagDom.parentElement.closest('div');
                      scrollbarAtTheBottom = logContainer.clientHeight + logContainer.scrollTop >= logContainer.scrollHeight;
                      setTimeout(function () {
                        return unreadTag.toogle(true).scrollToTag(!scrollbarAtTheBottom);
                      });
                      _context.next = 17;
                      break;

                    case 16:
                      if (s === 'close') {
                        unreadTag.moveToBottom().toogle(false);
                      }

                    case 17:
                      that.setState({
                        messageUnreadCount: 0
                      });

                    case 18:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }());

          _Store.default.ActionObservable.unsubscribe(subscribe);
        }
      });

      var _Configuration$get = _Configuration.default.get(),
          directLineOptions = _Configuration$get.directLineOptions;

      if (directLineOptions.webSocket || !directLineOptions.pollingAutoClose) {
        var lastHistoryId = null;

        var subscribeUnReadMessage = function subscribeUnReadMessage() {
          _Store.default.ActionObservable.subscribe(function subscribe(action) {
            if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
              var _activity$from, _activity$from$id;

              var activity = action.payload.activity;

              var _Configuration$get2 = _Configuration.default.get(),
                  botId = _Configuration$get2.botId;

              if (activity.type === 'message' && ((_activity$from = activity.from) === null || _activity$from === void 0 ? void 0 : (_activity$from$id = _activity$from.id) === null || _activity$from$id === void 0 ? void 0 : _activity$from$id.toLowerCase()) === botId && _WebChatToggleStateObservable.default.getState() === 'close') {
                var _activity$text;

                var msg = (_activity$text = activity.text) !== null && _activity$text !== void 0 ? _activity$text : '您有一則非純文字訊息，請點選查看';
                that.setState(function (state) {
                  return {
                    messageUnreadCount: state.messageUnreadCount + 1,
                    previewMessage: msg
                  };
                });
              }
            }
          });
        };

        console.log('subscribe UnReadInfo');

        _Store.default.ActionObservable.subscribe(function subscribe(action) {
          if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
            var activity = action.payload.activity;

            if (activity.type === 'event' && activity.name === 'UnReadInfo') {
              var directLine = (0, _DirectLine.getDirectLine)();
              console.log('directLine.watermark = ' + directLine.watermark);
              directLine.watermark = Math.max(directLine.watermark, 0);
              lastHistoryId = activity.value.lastHistoryId;

              if (lastHistoryId) {
                if (activity.value.count) {
                  if (_WebChatToggleStateObservable.default.getState() === 'open') {
                    _Store.default.notifyUserAlreadyRead();
                  } else {
                    that.setState(function (state) {
                      return {
                        messageUnreadCount: state.messageUnreadCount + activity.value.count
                      };
                    });
                  }
                }
              } else {
                console.log('subscribe UnReadMessage');
                subscribeUnReadMessage();

                _Store.default.ActionObservable.unsubscribe(subscribe);
              }
            } else if (activity.id === lastHistoryId) {
              console.log('subscribe UnReadMessage');
              subscribeUnReadMessage();

              _Store.default.ActionObservable.unsubscribe(subscribe);
            }
          }
        });
      }
    }
  }, {
    key: "handleStartDirectLine",
    value: function () {
      var _handleStartDirectLine = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var config;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.state.directLine) {
                  _context2.next = 8;
                  break;
                }

                config = this.props.config;
                _context2.t0 = this;
                _context2.next = 5;
                return (0, _DirectLine.createDirectLine)(config.directLineOptions);

              case 5:
                _context2.t1 = _context2.sent;
                _context2.t2 = {
                  directLine: _context2.t1
                };

                _context2.t0.setState.call(_context2.t0, _context2.t2);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleStartDirectLine() {
        return _handleStartDirectLine.apply(this, arguments);
      }

      return handleStartDirectLine;
    }()
  }, {
    key: "handleStopDirectLine",
    value: function () {
      var _handleStopDirectLine = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.state.directLine) {
                  (0, _DirectLine.endDirectLine)();
                  this.setState({
                    directLine: null
                  });
                }

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function handleStopDirectLine() {
        return _handleStopDirectLine.apply(this, arguments);
      }

      return handleStopDirectLine;
    }()
  }, {
    key: "handleMaximizeButtonClick",
    value: function handleMaximizeButtonClick() {
      this.handleStartDirectLine();
      this.setState(function () {
        return {
          minimized: false,
          previewMessage: null
        };
      });
      (0, _WebChatToggleStateObservable.notify)('open');
    }
  }, {
    key: "handleMinimizeButtonClick",
    value: function handleMinimizeButtonClick() {
      var directLineOptions = this.props.config.directLineOptions;

      if (!directLineOptions.webSocket && directLineOptions.pollingAutoClose) {
        this.handleStopDirectLine();
      }

      this.setState(function () {
        return {
          minimized: true
        };
      });
      (0, _WebChatToggleStateObservable.notify)('close');
    }
  }, {
    key: "handleSwitchButtonClick",
    value: function handleSwitchButtonClick() {
      this.setState(function (_ref2) {
        var side = _ref2.side;
        return {
          side: side === 'left' ? 'right' : 'left'
        };
      });
    }
  }, {
    key: "getMessageUnreadCount",
    value: function getMessageUnreadCount() {
      return this.state.messageUnreadCount;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          _this$props$config$we = _this$props.config.webChatOptions,
          buttonOptions = _this$props$config$we.buttonOptions,
          headerOptions = _this$props$config$we.headerOptions,
          _this$state = this.state,
          minimized = _this$state.minimized,
          side = _this$state.side,
          directLine = _this$state.directLine,
          messageUnreadCount = _this$state.messageUnreadCount,
          previewMessage = _this$state.previewMessage;
      var buttonStyle = {
        background: "url(".concat(buttonOptions.iconUrl, ")"),
        backgroundSize: 'cover'
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "minimizable-web-chat"
      }, /*#__PURE__*/_react.default.createElement(_PreviewMessage.default, {
        message: this.state.previewMessage,
        maximizeButton: this.handleMaximizeButtonClick
      }), /*#__PURE__*/_react.default.createElement("button", {
        className: "maximize ".concat(buttonOptions.visible && buttonOptions.displayOnTheSide ? 'hide' : ''),
        onClick: this.handleMaximizeButtonClick,
        hidden: !minimized || !buttonOptions.visible,
        style: buttonStyle,
        "message-unread-count": messageUnreadCount
      }), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: minimized ? 'none' : ''
        },
        className: side === 'left' ? 'chat-box left' : 'chat-box right'
      }, /*#__PURE__*/_react.default.createElement("header", null, headerOptions.iconUrl && /*#__PURE__*/_react.default.createElement("img", {
        className: "header-Icon",
        src: headerOptions.iconUrl,
        onClick: this.handleMinimizeButtonClick
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "filler",
        onClick: this.handleMinimizeButtonClick
      }, headerOptions.text), /*#__PURE__*/_react.default.createElement("button", {
        className: "switch",
        onClick: this.handleSwitchButtonClick
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "ms-Icon ms-Icon--Switch"
      })), /*#__PURE__*/_react.default.createElement("button", {
        className: "minimize",
        onClick: this.handleMinimizeButtonClick
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "ms-Icon ms-Icon--ChromeMinimize"
      }))), /*#__PURE__*/_react.default.createElement(_WebChat.default, {
        ref: this.webChatRef,
        className: "react-web-chat",
        directLine: directLine,
        config: config
      })));
    }
  }]);

  return MinimizableWebChat;
}(_react.default.Component);

exports.default = MinimizableWebChat;
//# sourceMappingURL=MinimizableWebChat.js.map