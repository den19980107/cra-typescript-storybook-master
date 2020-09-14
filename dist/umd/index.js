(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./components/BasicWebChatComponent"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./components/BasicWebChatComponent"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.BasicWebChatComponent);
    global.undefined = mod.exports;
  }
})(this, function (exports, _BasicWebChatComponent) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BasicWebChatComponent = undefined;

  var _BasicWebChatComponent2 = _interopRequireDefault(_BasicWebChatComponent);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.BasicWebChatComponent = _BasicWebChatComponent2.default;
});
//# sourceMappingURL=index.js.map