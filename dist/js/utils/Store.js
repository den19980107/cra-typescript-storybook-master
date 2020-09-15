"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeDispatch = exports.getStore = exports.createStore = exports.default = void 0;

var _DirectLine = _interopRequireWildcard(require("./DirectLine"));

var _Storage = _interopRequireDefault(require("./Storage"));

var _Configuration = _interopRequireDefault(require("./Configuration"));

var _Container = _interopRequireDefault(require("./Container"));

var _botframeworkWebchat = require("botframework-webchat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var store = null;

var createStore = function createStore() {
  console.log('==========createStore============');
  var lastHistoryId = '';
  var historyAlredyLoad = false;
  var notifyConnectFulfilledObservers = false;
  store = (0, _botframeworkWebchat.createStore)({}, function (_ref) {
    var dispatch = _ref.dispatch;
    return function (next) {
      return function (action) {
        console.log(action.type);

        if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
          notifyConnectFulfilledObservers = false;

          _Storage.default.setConversationId((0, _DirectLine.getDirectLine)().conversationId);

          _Storage.default.setUserId(_Configuration.default.get().userId);

          console.log('getDirectLine().conversationId: ' + (0, _DirectLine.getDirectLine)().conversationId);
        } else if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
          var activity = action.payload.activity;

          if (activity.type === 'event' && activity.name === 'UnReadInfo') {
            lastHistoryId = activity.value.lastHistoryId;
            historyAlredyLoad = !lastHistoryId;
          } else if (historyAlredyLoad && _Container.default.isWebChatVisible()) {
            setTimeout(notifyUserAlreadyRead);
          } else if (lastHistoryId && activity.id === lastHistoryId) {
            historyAlredyLoad = true;
            lastHistoryId = null;
          }
        }

        if (historyAlredyLoad && !notifyConnectFulfilledObservers) {
          console.log('notify connectFulfilledObservers.');
          notifyConnectFulfilledObservers = true;
          setTimeout(function () {
            return connectFulfilledObservers.forEach(function (observer) {
              return observer();
            });
          });
        }

        actionObservers.forEach(function (observer) {
          return observer(action);
        });
        return next(action);
      };
    };
  });
  return store;
};

exports.createStore = createStore;

var getStore = function getStore() {
  return store;
};
/* actions */
//ref: https://github.com/Microsoft/BotFramework-WebChat/tree/master/packages/core/src/actions


exports.getStore = getStore;

var sendMessage = function sendMessage(text) {
  storeDispatch({
    type: 'WEB_CHAT/SEND_MESSAGE',
    payload: {
      text: text
    }
  });
};

var sendPostback = function sendPostback(value) {
  storeDispatch({
    type: 'WEB_CHAT/SEND_POST_BACK',
    payload: {
      value: value
    }
  });
};

var sendEvent = function sendEvent(_ref2) {
  var name = _ref2.name,
      value = _ref2.value;
  storeDispatch({
    type: 'WEB_CHAT/SEND_EVENT',
    payload: {
      name: name,
      value: value
    }
  });
};

var sendAnalytics = function sendAnalytics(metric, subMetric) {
  sendEvent({
    name: 'bot_analytics',
    value: {
      metric: metric,
      subMetric: subMetric
    }
  });
};

var setSendBox = function setSendBox(text) {
  storeDispatch({
    type: 'WEB_CHAT/SET_SEND_BOX',
    payload: {
      text: text
    }
  });
};

var setLanguage = function setLanguage(language) {
  storeDispatch({
    type: 'WEB_CHAT/SET_LANGUAGE',
    payload: {
      language: language
    }
  });
};

var notifyUserAlreadyRead = function notifyUserAlreadyRead() {
  console.log('notifyUserAlreadyRead watermark: ' + _DirectLine.default.getWatermark());
  sendEvent({
    name: 'UserAlreadyRead',
    value: {
      watermark: _DirectLine.default.getWatermark()
    }
  });
}; // store dispatch.


var storeDispatch = function storeDispatch(_ref3) {
  var type = _ref3.type,
      payload = _ref3.payload,
      meta = _ref3.meta;
  store && store.dispatch({
    type: type,
    payload: payload,
    meta: meta
  });
};

exports.storeDispatch = storeDispatch;
var connectFulfilledObservers = [];

var connectFulfilledSubscribe = function connectFulfilledSubscribe(f) {
  connectFulfilledObservers.push(f);
  var directLine = (0, _DirectLine.getDirectLine)(); //connectionStatus$(2) === Online

  if (directLine && directLine.connectionStatus$.value === 2) f();
};

var connectFulfilledUnsubscribe = function connectFulfilledUnsubscribe(f) {
  return connectFulfilledObservers = connectFulfilledObservers.filter(function (subscriber) {
    return subscriber !== f;
  });
};

var actionObservers = [];

var actionSubscribe = function actionSubscribe(f) {
  return actionObservers.push(f);
};

var actionUnsubscribe = function actionUnsubscribe(f) {
  return actionObservers = actionObservers.filter(function (subscriber) {
    return subscriber !== f;
  });
};

var _default = {
  sendAnalytics: sendAnalytics,
  sendEvent: sendEvent,
  sendMessage: sendMessage,
  sendPostback: sendPostback,
  setLanguage: setLanguage,
  setSendBox: setSendBox,
  notifyUserAlreadyRead: notifyUserAlreadyRead,
  ActionObservable: {
    subscribe: actionSubscribe,
    unsubscribe: actionUnsubscribe
  },
  ConnectFulfilledObservable: {
    subscribe: connectFulfilledSubscribe,
    unsubscribe: connectFulfilledUnsubscribe
  }
};
exports.default = _default;
//# sourceMappingURL=Store.js.map