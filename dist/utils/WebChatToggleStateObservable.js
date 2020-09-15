/** WebChat open/close state observable */
var observers = [];
var state = 'close';
var getState = function () { return state; };
var subscribe = function (f) { return observers.push(f); };
var unsubscribe = function (f) {
    console.log("WebChatToggleStateObservable unsubscribe.");
    observers = observers.filter(function (subscriber) { return subscriber !== f; });
    console.log("WebChatToggleStateObservable length: " + observers.length);
};
var notify = function (notifyState) {
    state = notifyState;
    console.log("webChatToggleStateObservable notify: " + state);
    observers.forEach(function (observer) { return observer(state); });
};
export default {
    getState: getState,
    subscribe: subscribe,
    unsubscribe: unsubscribe
};
export { notify };
//# sourceMappingURL=WebChatToggleStateObservable.js.map