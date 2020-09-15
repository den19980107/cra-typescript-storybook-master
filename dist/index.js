//ES5 Polyfill.
// import 'core-js/features/string/ends-with';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
//DOM elements Polyfill.
// import './polyfill/domElementsPolyfill';
//Utils.
import Storage from './utils/Storage';
import Store from './utils/Store';
import WebChatToggleStateObservable, { notify } from './utils/WebChatToggleStateObservable';
import DirectLine from './utils/DirectLine';
import Configuration from './utils/Configuration';
//Components.
import BasicWebChatComponent from './components/BasicWebChatComponent';
import WebChat from './components/WebChat';
import MinimizableWebChat from './components/MinimizableWebChat';
//create component API.
import createBasicWebChat from './createBasicWebChat';
import createMinimizableWebChat from './createMinimizableWebChat';
var Components = {
    BasicWebChatComponent: BasicWebChatComponent,
    WebChat: WebChat,
    MinimizableWebChat: MinimizableWebChat
};
var Utils = {
    Storage: Storage,
    Store: Store,
    WebChatToggleStateObservable: __assign(__assign({}, WebChatToggleStateObservable), { notify: notify }),
    DirectLine: DirectLine,
    Configuration: Configuration
};
export default {
    Components: Components,
    Utils: Utils
};
window.GSSWebChat = {
    createBasicWebChat: createBasicWebChat,
    createMinimizableWebChat: createMinimizableWebChat,
    clearStorage: Storage.clear
};
//# sourceMappingURL=index.js.map