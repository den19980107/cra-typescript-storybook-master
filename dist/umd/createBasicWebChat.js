(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "react-dom", "./components/WebChat", "./utils/Configuration", "./utils/DirectLine", "./utils/Container", "./WebChatAPI"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("react-dom"), require("./components/WebChat"), require("./utils/Configuration"), require("./utils/DirectLine"), require("./utils/Container"), require("./WebChatAPI"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactDom, global.WebChat, global.Configuration, global.DirectLine, global.Container, global.WebChatAPI);
    global.undefined = mod.exports;
  }
})(this, function (exports, _react, _reactDom, _WebChat, _Configuration, _DirectLine, _Container, _WebChatAPI) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  var _WebChat2 = _interopRequireDefault(_WebChat);

  var _Configuration2 = _interopRequireDefault(_Configuration);

  var _WebChatAPI2 = _interopRequireDefault(_WebChatAPI);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const createBasicWebChat = (rawConfig, container, callback) => {
    _Configuration2.default.initial(rawConfig).then(config => (0, _DirectLine.createDirectLine)(config.directLineOptions).then(directLine => _reactDom2.default.render( /*#__PURE__*/_react2.default.createElement(_WebChat2.default, {
      directLine: directLine,
      config: config
    }), container, callback)));

    (0, _Container.setContainer)(container);
    return _WebChatAPI2.default;
  };

  exports.default = createBasicWebChat;
});
//# sourceMappingURL=createBasicWebChat.js.map