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

  const getRefObject = async target => {
    return new Promise(function (resolve, reject) {
      const timer = setInterval(() => {
        if (target.current) {
          clearInterval(timer);
          resolve(target.current);
        }
      }, 100);
    });
  };

  exports.default = getRefObject;
});
//# sourceMappingURL=getRefObject.js.map