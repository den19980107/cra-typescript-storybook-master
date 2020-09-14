(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.undefined = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  let container = null; //TODO 多個 webchat 就要支援多個 container

  const getContainer = () => container;

  const setContainer = elem => container = elem;

  const isWebChatVisible = () => {
    const webchat = container.querySelector('.web-chat');
    return !!(webchat && (webchat.offsetWidth || webchat.offsetHeight || webchat.getClientRects().length));
  };

  exports.default = {
    isWebChatVisible
  };
  exports.getContainer = getContainer;
  exports.setContainer = setContainer;
});
//# sourceMappingURL=Container.js.map