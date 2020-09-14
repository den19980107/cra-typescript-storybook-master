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

export default {
  getState,
  subscribe,
  unsubscribe
};
export { notify };
//# sourceMappingURL=WebChatToggleStateObservable.js.map