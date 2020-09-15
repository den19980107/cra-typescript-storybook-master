//ES5 Polyfill.
// import 'core-js/features/string/ends-with';

//DOM elements Polyfill.
// import './polyfill/domElementsPolyfill';
//Utils.
import Storage from './utils/Storage';
import Store from './utils/Store';
import WebChatToggleStateObservable, { notify } from './utils/WebChatToggleStateObservable';
import DirectLine from './utils/DirectLine'
import Configuration from './utils/Configuration'
//Components.
import BasicWebChatComponent from './components/BasicWebChatComponent'
import WebChat from './components/WebChat';
import MinimizableWebChat from './components/MinimizableWebChat';
//create component API.
import createBasicWebChat from './createBasicWebChat';
import createMinimizableWebChat from './createMinimizableWebChat';

const Components = {
  BasicWebChatComponent,
  WebChat,
  MinimizableWebChat
}

const Utils = {
  Storage,
  Store,
  WebChatToggleStateObservable: {
    ...WebChatToggleStateObservable,
    notify
  },
  DirectLine,
  Configuration
}

export default {
  Components,
  Utils
};

window.GSSWebChat = {
  createBasicWebChat,
  createMinimizableWebChat,
  clearStorage: Storage.clear
};