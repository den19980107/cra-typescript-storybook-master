(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "./WebChat", "../utils/Configuration", "../utils/DirectLine"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("./WebChat"), require("../utils/Configuration"), require("../utils/DirectLine"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.WebChat, global.Configuration, global.DirectLine);
    global.undefined = mod.exports;
  }
})(this, function (exports, _react, _WebChat, _Configuration, _DirectLine) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = BasicWebChatComponent;

  var _react2 = _interopRequireDefault(_react);

  var _WebChat2 = _interopRequireDefault(_WebChat);

  var _Configuration2 = _interopRequireDefault(_Configuration);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function BasicWebChatComponent({
    rawConfig
  }) {
    const [directLine, setDirectline] = (0, _react.useState)(null);
    (0, _react.useEffect)(() => {
      if (!directLine) {
        initialDirectLine();
      }
    }, [directLine]);

    const generateDirectLine = async rawConfig => {
      const config = await _Configuration2.default.initial(rawConfig);
      const directline = await (0, _DirectLine.createDirectLine)(config.directLineOptions);
      return directline;
    };

    const initialDirectLine = async () => {
      const directline = await generateDirectLine(rawConfig);
      setDirectline(directline);
    };

    return /*#__PURE__*/_react2.default.createElement(_WebChat2.default, {
      config: rawConfig,
      directLine: directLine
    });
  }
});
//# sourceMappingURL=BasicWebChatComponent.js.map