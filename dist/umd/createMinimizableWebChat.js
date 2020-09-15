(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "react-dom", "./components/MinimizableWebChat", "./utils/Configuration", "./utils/getRefObject", "./utils/Container", "./WebChatAPI", "./utils/WebChatToggleStateObservable"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("react-dom"), require("./components/MinimizableWebChat"), require("./utils/Configuration"), require("./utils/getRefObject"), require("./utils/Container"), require("./WebChatAPI"), require("./utils/WebChatToggleStateObservable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactDom, global.MinimizableWebChat, global.Configuration, global.getRefObject, global.Container, global.WebChatAPI, global.WebChatToggleStateObservable);
    global.undefined = mod.exports;
  }
})(this, function (exports, _react, _reactDom, _MinimizableWebChat, _Configuration, _getRefObject, _Container, _WebChatAPI, _WebChatToggleStateObservable) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  var _MinimizableWebChat2 = _interopRequireDefault(_MinimizableWebChat);

  var _Configuration2 = _interopRequireDefault(_Configuration);

  var _getRefObject2 = _interopRequireDefault(_getRefObject);

  var _WebChatAPI2 = _interopRequireDefault(_WebChatAPI);

  var _WebChatToggleStateObservable2 = _interopRequireDefault(_WebChatToggleStateObservable);

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

  const minimizableWebChatRef = /*#__PURE__*/_react2.default.createRef();

  const createMinimizableWebChat = (rawConfig, container, callback) => {
    if (!container) {
      container = document.createElement('div');
      document.body.appendChild(container);
    }

    (0, _Container.setContainer)(container);

    _Configuration2.default.initial(rawConfig).then(config => _reactDom2.default.render( /*#__PURE__*/_react2.default.createElement(_MinimizableWebChat2.default, {
      ref: minimizableWebChatRef,
      config: config
    }), container, callback));

    return _objectSpread(_objectSpread({}, _WebChatAPI2.default), {}, {
      WebChatToggleStateObservable: _WebChatToggleStateObservable2.default,
      openWebChat,
      closeWebChat,
      startConversation,
      endConversation,
      getMessageUnreadCount
    });
  };

  const openWebChat = () => toggleWebChat(true);

  const closeWebChat = () => toggleWebChat(false);

  const startConversation = async () => {
    const minimizableWebChat = await (0, _getRefObject2.default)(minimizableWebChatRef);
    minimizableWebChat.handleStartDirectLine();
  };

  const endConversation = async () => {
    const minimizableWebChat = await (0, _getRefObject2.default)(minimizableWebChatRef);
    minimizableWebChat.handleStopDirectLine();
    closeWebChat();
  };
  /**
   * Display or hide the WebChat.
   * @param display Use true to show the element or false to hide it.
   */


  const toggleWebChat = async display => {
    const minimizableWebChat = await (0, _getRefObject2.default)(minimizableWebChatRef);

    if (display) {
      minimizableWebChat.handleMaximizeButtonClick();
    } else {
      minimizableWebChat.handleMinimizeButtonClick();
    }
  };

  const getMessageUnreadCount = () => {
    const minimizableWebChat = minimizableWebChatRef.current;
    return minimizableWebChat && minimizableWebChat.getMessageUnreadCount() || 0;
  };

  exports.default = createMinimizableWebChat;
});
//# sourceMappingURL=createMinimizableWebChat.js.map