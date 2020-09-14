"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notify = exports.default = void 0;

/** WebChat open/close state observable */
var observers = [];
var state = 'close';

var getState = function getState() {
  return state;
};

var subscribe = function subscribe(f) {
  return observers.push(f);
};

var unsubscribe = function unsubscribe(f) {
  console.log("WebChatToggleStateObservable unsubscribe.");
  observers = observers.filter(function (subscriber) {
    return subscriber !== f;
  });
  console.log("WebChatToggleStateObservable length: ".concat(observers.length));
};

var notify = function notify(notifyState) {
  state = notifyState;
  console.log("webChatToggleStateObservable notify: ".concat(state));
  observers.forEach(function (observer) {
    return observer(state);
  });
};

exports.notify = notify;
var _default = {
  getState: getState,
  subscribe: subscribe,
  unsubscribe: unsubscribe
};
exports.default = _default;
//# sourceMappingURL=WebChatToggleStateObservable.js.map