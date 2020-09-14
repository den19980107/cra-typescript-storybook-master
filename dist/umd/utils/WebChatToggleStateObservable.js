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

  /** WebChat open/close state observable */
  let observers = [];
  let state = 'close';

  const getState = () => state;

  const subscribe = f => observers.push(f);

  const unsubscribe = f => {
    console.log(`WebChatToggleStateObservable unsubscribe.`);
    observers = observers.filter(subscriber => subscriber !== f);
    console.log(`WebChatToggleStateObservable length: ${observers.length}`);
  };

  const notify = notifyState => {
    state = notifyState;
    console.log(`webChatToggleStateObservable notify: ${state}`);
    observers.forEach(observer => observer(state));
  };

  exports.default = {
    getState,
    subscribe,
    unsubscribe
  };
  exports.notify = notify;
});
//# sourceMappingURL=WebChatToggleStateObservable.js.map