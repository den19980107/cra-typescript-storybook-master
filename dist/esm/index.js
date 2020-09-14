function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//ES5 Polyfill.
// import 'core-js/features/string/ends-with';
//DOM elements Polyfill.
// import './polyfill/domElementsPolyfill';
//Utils.
import Storage from './utils/Storage';
import Store from './utils/Store';
import WebChatToggleStateObservable, { notify } from './utils/WebChatToggleStateObservable';
import DirectLine from './utils/DirectLine';
import Configuration from './utils/Configuration'; //Components.

import BasicWebChatComponent from './components/BasicWebChatComponent';
import WebChat from './components/WebChat';
import MinimizableWebChat from './components/MinimizableWebChat'; //create component API.

import createBasicWebChat from './createBasicWebChat';
import createMinimizableWebChat from './createMinimizableWebChat';
export default {
  Components: {
    BasicWebChatComponent,
    WebChat,
    MinimizableWebChat
  },
  Utils: {
    Storage,
    Store,
    WebChatToggleStateObservable: _objectSpread(_objectSpread({}, WebChatToggleStateObservable), {}, {
      notify
    }),
    DirectLine,
    Configuration
  }
};
window.GSSWebChat = {
  createBasicWebChat,
  createMinimizableWebChat,
  clearStorage: Storage.clear
};
//# sourceMappingURL=index.js.map