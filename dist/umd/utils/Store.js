(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./DirectLine", "./Storage", "./Configuration", "./Container"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./DirectLine"), require("./Storage"), require("./Configuration"), require("./Container"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.DirectLine, global.Storage, global.Configuration, global.Container);
    global.undefined = mod.exports;
  }
})(this, function (exports, _DirectLine, _Storage, _Configuration, _Container) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.storeDispatch = exports.getStore = exports.createStore = undefined;

  var _DirectLine2 = _interopRequireDefault(_DirectLine);

  var _Storage2 = _interopRequireDefault(_Storage);

  var _Configuration2 = _interopRequireDefault(_Configuration);

  var _Container2 = _interopRequireDefault(_Container);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  let store = null;

  const createStore = () => {
    console.log('==========createStore============');
    let lastHistoryId = '';
    let historyAlredyLoad = false;
    let notifyConnectFulfilledObservers = false;
    store = window.WebChat.createStore({}, ({
      dispatch
    }) => next => action => {
      console.log(action.type);

      if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
        notifyConnectFulfilledObservers = false;

        _Storage2.default.setConversationId((0, _DirectLine.getDirectLine)().conversationId);

        _Storage2.default.setUserId(_Configuration2.default.get().userId);

        console.log('getDirectLine().conversationId: ' + (0, _DirectLine.getDirectLine)().conversationId);
      } else if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
        const {
          activity
        } = action.payload;

        if (activity.type === 'event' && activity.name === 'UnReadInfo') {
          lastHistoryId = activity.value.lastHistoryId;
          historyAlredyLoad = !lastHistoryId;
        } else if (historyAlredyLoad && _Container2.default.isWebChatVisible()) {
          setTimeout(notifyUserAlreadyRead);
        } else if (lastHistoryId && activity.id === lastHistoryId) {
          historyAlredyLoad = true;
          lastHistoryId = null;
        }
      }

      if (historyAlredyLoad && !notifyConnectFulfilledObservers) {
        console.log('notify connectFulfilledObservers.');
        notifyConnectFulfilledObservers = true;
        setTimeout(() => connectFulfilledObservers.forEach(observer => observer()));
      }

      actionObservers.forEach(observer => observer(action));
      return next(action);
    });
    return store;
  };

  const getStore = () => store;
  /* actions */
  //ref: https://github.com/Microsoft/BotFramework-WebChat/tree/master/packages/core/src/actions


  const sendMessage = text => {
    storeDispatch({
      type: 'WEB_CHAT/SEND_MESSAGE',
      payload: {
        text
      }
    });
  };

  const sendPostback = value => {
    storeDispatch({
      type: 'WEB_CHAT/SEND_POST_BACK',
      payload: {
        value
      }
    });
  };

  const sendEvent = ({
    name,
    value
  }) => {
    storeDispatch({
      type: 'WEB_CHAT/SEND_EVENT',
      payload: {
        name,
        value
      }
    });
  };

  const sendAnalytics = (metric, subMetric) => {
    sendEvent({
      name: 'bot_analytics',
      value: {
        metric,
        subMetric
      }
    });
  };

  const setSendBox = text => {
    storeDispatch({
      type: 'WEB_CHAT/SET_SEND_BOX',
      payload: {
        text
      }
    });
  };

  const setLanguage = language => {
    storeDispatch({
      type: 'WEB_CHAT/SET_LANGUAGE',
      payload: {
        language
      }
    });
  };

  const notifyUserAlreadyRead = () => {
    console.log('notifyUserAlreadyRead watermark: ' + _DirectLine2.default.getWatermark());
    sendEvent({
      name: 'UserAlreadyRead',
      value: {
        watermark: _DirectLine2.default.getWatermark()
      }
    });
  }; // store dispatch.


  const storeDispatch = ({
    type,
    payload,
    meta
  }) => {
    store && store.dispatch({
      type,
      payload,
      meta
    });
  };

  let connectFulfilledObservers = [];

  const connectFulfilledSubscribe = f => {
    connectFulfilledObservers.push(f);
    const directLine = (0, _DirectLine.getDirectLine)(); //connectionStatus$(2) === Online

    if (directLine && directLine.connectionStatus$.value === 2) f();
  };

  const connectFulfilledUnsubscribe = f => connectFulfilledObservers = connectFulfilledObservers.filter(subscriber => subscriber !== f);

  let actionObservers = [];

  const actionSubscribe = f => actionObservers.push(f);

  const actionUnsubscribe = f => actionObservers = actionObservers.filter(subscriber => subscriber !== f);

  exports.default = {
    sendAnalytics,
    sendEvent,
    sendMessage,
    sendPostback,
    setLanguage,
    setSendBox,
    notifyUserAlreadyRead,
    ActionObservable: {
      subscribe: actionSubscribe,
      unsubscribe: actionUnsubscribe
    },
    ConnectFulfilledObservable: {
      subscribe: connectFulfilledSubscribe,
      unsubscribe: connectFulfilledUnsubscribe
    }
  };
  exports.createStore = createStore;
  exports.getStore = getStore;
  exports.storeDispatch = storeDispatch;
});
//# sourceMappingURL=Store.js.map