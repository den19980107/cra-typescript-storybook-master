function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { createStore } from './Store';
import Storage from './Storage';
import jwtDecode from 'jwt-decode';
let config;

const initial = async rawConfig => {
  config = _objectSpread({}, rawConfig);

  const directLineOptions = config.directLineOptions = _objectSpread({}, config.directLineOptions);

  const decoded = directLineOptions.token ? jwtDecode(directLineOptions.token) : {};
  config.botId = (decoded.botId || config.botId).toLowerCase();
  config.userId = decoded.userId || config.userId || Storage.getUserId() || randomUserID();
  config.userName = config.userName || '';
  directLineOptions.domain = decoded.origin || directLineOptions.domain;
  const directLinePath = directLineOptions.domain.endsWith('/directline') ? '' : '/directline';
  directLineOptions.domain += `${directLinePath}/${config.botId}`;
  directLineOptions.webSocket = !(directLineOptions.webSocket === false) && (await checkWebSocketIsOpen(directLineOptions.domain));
  directLineOptions.pollingAutoClose = directLineOptions.pollingAutoClose === true;
  directLineOptions.conversationId = decoded.conversationId || directLineOptions.conversationId || Storage.getConversationId() || '';
  directLineOptions.watermark = 0;

  if (!directLineOptions.webSocket && !directLineOptions.pollingAutoClose) {
    directLineOptions.watermark = -1; //polling watermark 設成 -1 才會先取歷史訊息
  }

  const webChatOptions = config.webChatOptions = _objectSpread({}, config.webChatOptions);

  const webChatButtonOptions = webChatOptions.buttonOptions = _objectSpread({}, webChatOptions.buttonOptions);

  webChatButtonOptions.iconUrl = webChatButtonOptions.iconUrl || 'https://bot-framework.azureedge.net/bot-icons-v1/bot-framework-default-7.png';
  webChatButtonOptions.visible = !(webChatButtonOptions.visible === false);
  webChatButtonOptions.displayOnTheSide = webChatButtonOptions.displayOnTheSide === true;

  const webChatHeaderOptions = webChatOptions.headerOptions = _objectSpread({}, webChatOptions.headerOptions); // default style.


  const styleOptions = webChatOptions.styleOptions = Object.assign({
    // Bubble
    bubbleBackground: '#eceff1',
    bubbleBorderColor: '#E6E6E6',
    bubbleBorderRadius: '0px 12px 12px 12px',
    bubbleBorderStyle: 'solid',
    bubbleBorderWidth: 1,
    bubbleFromUserBackground: '#0078d7',
    bubbleFromUserBorderColor: '#E6E6E6',
    bubbleFromUserBorderRadius: '12px 0px 12px 12px',
    bubbleFromUserBorderStyle: 'solid',
    bubbleFromUserBorderWidth: 1,
    bubbleFromUserTextColor: '#ffffff',
    // Avatar
    botAvatarImage: webChatButtonOptions.iconUrl,
    botAvatarInitials: config.botName
  }, _objectSpread({}, webChatOptions.styleOptions)); // createStore.

  webChatOptions.store = createStore();
  return config;
};

const get = () => config;

const randomUserID = () => `r_${Math.random().toString(36).substr(2, 10)}`;
/** 檢查 WebSocket 是否有通 (return true = open) */


const checkWebSocketIsOpen = async domain => {
  return new Promise(function (resolve, reject) {
    if (!WebSocket) return resolve(false);
    const ws = new WebSocket(domain.replace('http', 'ws'));

    ws.onopen = function () {
      ws.close();
      resolve(true);
    };

    ws.onerror = function (evt) {
      resolve(false);
    };
  });
};

export default {
  initial,
  get
};
//# sourceMappingURL=Configuration.js.map