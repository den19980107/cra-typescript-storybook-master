(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "./WebChat", "../utils/WebChatToggleStateObservable", "../utils/DirectLine", "../utils/getRefObject", "../utils/Store", "../utils/Configuration", "./PreviewMessage", "../styles/fabric-icons-inline.css", "../styles/MinimizableWebChat.css"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("./WebChat"), require("../utils/WebChatToggleStateObservable"), require("../utils/DirectLine"), require("../utils/getRefObject"), require("../utils/Store"), require("../utils/Configuration"), require("./PreviewMessage"), require("../styles/fabric-icons-inline.css"), require("../styles/MinimizableWebChat.css"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.WebChat, global.WebChatToggleStateObservable, global.DirectLine, global.getRefObject, global.Store, global.Configuration, global.PreviewMessage, global.fabricIconsInline, global.MinimizableWebChat);
    global.undefined = mod.exports;
  }
})(this, function (exports, _react, _WebChat, _WebChatToggleStateObservable, _DirectLine, _getRefObject, _Store, _Configuration, _PreviewMessage) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _WebChat2 = _interopRequireDefault(_WebChat);

  var _WebChatToggleStateObservable2 = _interopRequireDefault(_WebChatToggleStateObservable);

  var _getRefObject2 = _interopRequireDefault(_getRefObject);

  var _Store2 = _interopRequireDefault(_Store);

  var _Configuration2 = _interopRequireDefault(_Configuration);

  var _PreviewMessage2 = _interopRequireDefault(_PreviewMessage);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  class MinimizableWebChat extends _react2.default.Component {
    constructor(props) {
      super(props);
      this.webChatRef = /*#__PURE__*/_react2.default.createRef();
      this.handleStartDirectLine = this.handleStartDirectLine.bind(this);
      this.handleStopDirectLine = this.handleStopDirectLine.bind(this);
      this.handleMaximizeButtonClick = this.handleMaximizeButtonClick.bind(this);
      this.handleMinimizeButtonClick = this.handleMinimizeButtonClick.bind(this);
      this.handleSwitchButtonClick = this.handleSwitchButtonClick.bind(this);
      this.state = {
        minimized: true,
        side: 'right',
        directLine: this.props.defaultDirectLine,
        messageUnreadCount: 0,
        previewMessage: null
      };
    }

    componentDidMount() {
      const that = this;

      _Store2.default.ActionObservable.subscribe(function subscribe(action) {
        if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
          _WebChatToggleStateObservable2.default.subscribe(async s => {
            const webchat = await (0, _getRefObject2.default)(that.webChatRef);
            const unreadTag = await (0, _getRefObject2.default)(webchat.unreadTagRef);

            if (s === 'open' && that.state.messageUnreadCount > 0) {
              _Store2.default.notifyUserAlreadyRead();

              const unreadTagDom = await (0, _getRefObject2.default)(unreadTag.unreadTagDomRef);
              const logContainer = unreadTagDom.parentElement.closest('div');
              const scrollbarAtTheBottom = logContainer.clientHeight + logContainer.scrollTop >= logContainer.scrollHeight;
              setTimeout(() => unreadTag.toogle(true).scrollToTag(!scrollbarAtTheBottom));
            } else if (s === 'close') {
              unreadTag.moveToBottom().toogle(false);
            }

            that.setState({
              messageUnreadCount: 0
            });
          });

          _Store2.default.ActionObservable.unsubscribe(subscribe);
        }
      });

      const {
        directLineOptions
      } = _Configuration2.default.get();

      if (directLineOptions.webSocket || !directLineOptions.pollingAutoClose) {
        let lastHistoryId = null;

        const subscribeUnReadMessage = () => {
          _Store2.default.ActionObservable.subscribe(function subscribe(action) {
            if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
              var _activity$from, _activity$from$id;

              const {
                activity
              } = action.payload;

              const {
                botId
              } = _Configuration2.default.get();

              if (activity.type === 'message' && ((_activity$from = activity.from) === null || _activity$from === void 0 ? void 0 : (_activity$from$id = _activity$from.id) === null || _activity$from$id === void 0 ? void 0 : _activity$from$id.toLowerCase()) === botId && _WebChatToggleStateObservable2.default.getState() === 'close') {
                var _activity$text;

                var msg = (_activity$text = activity.text) !== null && _activity$text !== void 0 ? _activity$text : '您有一則非純文字訊息，請點選查看';
                that.setState(state => ({
                  messageUnreadCount: state.messageUnreadCount + 1,
                  previewMessage: msg
                }));
              }
            }
          });
        };

        console.log('subscribe UnReadInfo');

        _Store2.default.ActionObservable.subscribe(function subscribe(action) {
          if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
            const {
              activity
            } = action.payload;

            if (activity.type === 'event' && activity.name === 'UnReadInfo') {
              const directLine = (0, _DirectLine.getDirectLine)();
              console.log('directLine.watermark = ' + directLine.watermark);
              directLine.watermark = Math.max(directLine.watermark, 0);
              lastHistoryId = activity.value.lastHistoryId;

              if (lastHistoryId) {
                if (activity.value.count) {
                  if (_WebChatToggleStateObservable2.default.getState() === 'open') {
                    _Store2.default.notifyUserAlreadyRead();
                  } else {
                    that.setState(state => ({
                      messageUnreadCount: state.messageUnreadCount + activity.value.count
                    }));
                  }
                }
              } else {
                console.log('subscribe UnReadMessage');
                subscribeUnReadMessage();

                _Store2.default.ActionObservable.unsubscribe(subscribe);
              }
            } else if (activity.id === lastHistoryId) {
              console.log('subscribe UnReadMessage');
              subscribeUnReadMessage();

              _Store2.default.ActionObservable.unsubscribe(subscribe);
            }
          }
        });
      }
    }

    async handleStartDirectLine() {
      if (!this.state.directLine) {
        const config = this.props.config;
        this.setState({
          directLine: await (0, _DirectLine.createDirectLine)(config.directLineOptions)
        });
      }
    }

    async handleStopDirectLine() {
      if (this.state.directLine) {
        (0, _DirectLine.endDirectLine)();
        this.setState({
          directLine: null
        });
      }
    }

    handleMaximizeButtonClick() {
      this.handleStartDirectLine();
      this.setState(() => ({
        minimized: false,
        previewMessage: null
      }));
      (0, _WebChatToggleStateObservable.notify)('open');
    }

    handleMinimizeButtonClick() {
      const directLineOptions = this.props.config.directLineOptions;

      if (!directLineOptions.webSocket && directLineOptions.pollingAutoClose) {
        this.handleStopDirectLine();
      }

      this.setState(() => ({
        minimized: true
      }));
      (0, _WebChatToggleStateObservable.notify)('close');
    }

    handleSwitchButtonClick() {
      this.setState(({
        side
      }) => ({
        side: side === 'left' ? 'right' : 'left'
      }));
    }

    getMessageUnreadCount() {
      return this.state.messageUnreadCount;
    }

    render() {
      const {
        props: {
          config,
          config: {
            webChatOptions: {
              buttonOptions,
              headerOptions
            }
          }
        },
        state: {
          minimized,
          side,
          directLine,
          messageUnreadCount,
          previewMessage
        }
      } = this;
      const buttonStyle = {
        background: `url(${buttonOptions.iconUrl})`,
        backgroundSize: 'cover'
      };
      return /*#__PURE__*/_react2.default.createElement("div", {
        className: "minimizable-web-chat"
      }, /*#__PURE__*/_react2.default.createElement(_PreviewMessage2.default, {
        message: this.state.previewMessage,
        maximizeButton: this.handleMaximizeButtonClick
      }), /*#__PURE__*/_react2.default.createElement("button", {
        className: `maximize ${buttonOptions.visible && buttonOptions.displayOnTheSide ? 'hide' : ''}`,
        onClick: this.handleMaximizeButtonClick,
        hidden: !minimized || !buttonOptions.visible,
        style: buttonStyle,
        "message-unread-count": messageUnreadCount
      }), /*#__PURE__*/_react2.default.createElement("div", {
        style: {
          display: minimized ? 'none' : ''
        },
        className: side === 'left' ? 'chat-box left' : 'chat-box right'
      }, /*#__PURE__*/_react2.default.createElement("header", null, headerOptions.iconUrl && /*#__PURE__*/_react2.default.createElement("img", {
        className: "header-Icon",
        src: headerOptions.iconUrl,
        onClick: this.handleMinimizeButtonClick
      }), /*#__PURE__*/_react2.default.createElement("div", {
        className: "filler",
        onClick: this.handleMinimizeButtonClick
      }, headerOptions.text), /*#__PURE__*/_react2.default.createElement("button", {
        className: "switch",
        onClick: this.handleSwitchButtonClick
      }, /*#__PURE__*/_react2.default.createElement("span", {
        className: "ms-Icon ms-Icon--Switch"
      })), /*#__PURE__*/_react2.default.createElement("button", {
        className: "minimize",
        onClick: this.handleMinimizeButtonClick
      }, /*#__PURE__*/_react2.default.createElement("span", {
        className: "ms-Icon ms-Icon--ChromeMinimize"
      }))), /*#__PURE__*/_react2.default.createElement(_WebChat2.default, {
        ref: this.webChatRef,
        className: "react-web-chat",
        directLine: directLine,
        config: config
      })));
    }

  }

  exports.default = MinimizableWebChat;
});
//# sourceMappingURL=MinimizableWebChat.js.map