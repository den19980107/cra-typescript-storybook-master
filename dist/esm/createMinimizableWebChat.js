function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import ReactDOM from 'react-dom';
import MinimizableWebChat from './components/MinimizableWebChat';
import Configuration from './utils/Configuration';
import getRefObject from './utils/getRefObject';
import { setContainer } from './utils/Container';
import WebChatAPI from './WebChatAPI';
import WebChatToggleStateObservable from './utils/WebChatToggleStateObservable';
const minimizableWebChatRef = /*#__PURE__*/React.createRef();

const createMinimizableWebChat = (rawConfig, container, callback) => {
  if (!container) {
    container = document.createElement('div');
    document.body.appendChild(container);
  }

  setContainer(container);
  Configuration.initial(rawConfig).then(config => ReactDOM.render( /*#__PURE__*/React.createElement(MinimizableWebChat, {
    ref: minimizableWebChatRef,
    config: config
  }), container, callback));
  return _objectSpread(_objectSpread({}, WebChatAPI), {}, {
    WebChatToggleStateObservable,
    openWebChat,
    closeWebChat,
    startConversation,
    endConversation,
    getMessageUnreadCount
  });
};

const openWebChat = () => toggleWebChat(true);

const closeWebChat = () => toggleWebChat(false);

const startConversation = async () => {
  const minimizableWebChat = await getRefObject(minimizableWebChatRef);
  minimizableWebChat.handleStartDirectLine();
};

const endConversation = async () => {
  const minimizableWebChat = await getRefObject(minimizableWebChatRef);
  minimizableWebChat.handleStopDirectLine();
  closeWebChat();
};
/**
 * Display or hide the WebChat.
 * @param display Use true to show the element or false to hide it.
 */


const toggleWebChat = async display => {
  const minimizableWebChat = await getRefObject(minimizableWebChatRef);

  if (display) {
    minimizableWebChat.handleMaximizeButtonClick();
  } else {
    minimizableWebChat.handleMinimizeButtonClick();
  }
};

const getMessageUnreadCount = () => {
  const minimizableWebChat = minimizableWebChatRef.current;
  return minimizableWebChat && minimizableWebChat.getMessageUnreadCount() || 0;
};

export default createMinimizableWebChat;
//# sourceMappingURL=createMinimizableWebChat.js.map