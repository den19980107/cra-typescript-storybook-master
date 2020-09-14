/** WebChat open/close state observable */
let observers: ((s: string) => void)[] = [];
let state = 'close';

const getState = () => state;
const subscribe = (f: (s: string) => void) => observers.push(f);
const unsubscribe = (f: (s: string) => void) => {
    console.log(`WebChatToggleStateObservable unsubscribe.`);
    observers = observers.filter(subscriber => subscriber !== f);
    console.log(`WebChatToggleStateObservable length: ${observers.length}`);
}

const notify = (notifyState: string) => {
    state = notifyState;
    console.log(`webChatToggleStateObservable notify: ${state}`);
    observers.forEach(observer => observer(state));
}

export default {
    getState,
    subscribe,
    unsubscribe
};

export {
    notify
}