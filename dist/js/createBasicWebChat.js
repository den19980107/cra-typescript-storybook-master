"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _WebChat = _interopRequireDefault(require("./components/WebChat"));

var _Configuration = _interopRequireDefault(require("./utils/Configuration"));

var _DirectLine = require("./utils/DirectLine");

var _Container = require("./utils/Container");

var _WebChatAPI = _interopRequireDefault(require("./WebChatAPI"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createBasicWebChat = function createBasicWebChat(rawConfig, container, callback) {
  _Configuration.default.initial(rawConfig).then(function (config) {
    return (0, _DirectLine.createDirectLine)(config.directLineOptions).then(function (directLine) {
      return _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_WebChat.default, {
        directLine: directLine,
        config: config
      }), container, callback);
    });
  });

  (0, _Container.setContainer)(container);
  return _WebChatAPI.default;
};

var _default = createBasicWebChat;
exports.default = _default;
//# sourceMappingURL=createBasicWebChat.js.map