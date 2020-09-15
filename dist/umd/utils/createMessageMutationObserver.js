(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Container"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Container"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Container);
    global.undefined = mod.exports;
  }
})(this, function (exports, _Container) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createMessageMutationObserver;

  function createMessageMutationObserver(mutationObserver) {
    // select the target node
    const target = (0, _Container.getContainer)().querySelector('div.unread-tag').closest('ul'); // create an observer instance

    const observer = new MutationObserver(function (mutations) {
      mutations.filter(x => x.addedNodes.length > 0).map(x => Array.prototype.slice.call(x.addedNodes)).reduce((acc, val) => acc.concat(val), []).forEach(n => mutationObserver(n, observer));
    }); // configuration of the observer:

    const config = {
      childList: true
    }; // pass in the target node, as well as the observer options

    observer.observe(target, config);
  }
});
//# sourceMappingURL=createMessageMutationObserver.js.map