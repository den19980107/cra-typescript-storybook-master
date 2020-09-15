import DirectLine, { getDirectLine } from './DirectLine';
import Storage from './Storage';
import Configuration from './Configuration';
import Container from './Container';
import { createStore as BotFrameworkWebChat_createStore } from 'botframework-webchat';
var store = null;
var createStore = function () {
    console.log('==========createStore============');
    var lastHistoryId = '';
    var historyAlredyLoad = false;
    var notifyConnectFulfilledObservers = false;
    store = BotFrameworkWebChat_createStore({}, function (_a) {
        var dispatch = _a.dispatch;
        return function (next) { return function (action) {
            console.log(action.type);
            if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
                notifyConnectFulfilledObservers = false;
                Storage.setConversationId(getDirectLine().conversationId);
                Storage.setUserId(Configuration.get().userId);
                console.log('getDirectLine().conversationId: ' + getDirectLine().conversationId);
            }
            else if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
                var activity = action.payload.activity;
                if (activity.type === 'event' && activity.name === 'UnReadInfo') {
                    lastHistoryId = activity.value.lastHistoryId;
                    historyAlredyLoad = !lastHistoryId;
                }
                else if (historyAlredyLoad && Container.isWebChatVisible()) {
                    setTimeout(notifyUserAlreadyRead);
                }
                else if (lastHistoryId && activity.id === lastHistoryId) {
                    historyAlredyLoad = true;
                    lastHistoryId = null;
                }
            }
            if (historyAlredyLoad && !notifyConnectFulfilledObservers) {
                console.log('notify connectFulfilledObservers.');
                notifyConnectFulfilledObservers = true;
                setTimeout(function () { return connectFulfilledObservers.forEach(function (observer) { return observer(); }); });
            }
            actionObservers.forEach(function (observer) { return observer(action); });
            return next(action);
        }; };
    });
    return store;
};
var getStore = function () { return store; };
/* actions */
//ref: https://github.com/Microsoft/BotFramework-WebChat/tree/master/packages/core/src/actions
var sendMessage = function (text) {
    storeDispatch({
        type: 'WEB_CHAT/SEND_MESSAGE',
        payload: { text: text }
    });
};
var sendPostback = function (value) {
    storeDispatch({
        type: 'WEB_CHAT/SEND_POST_BACK',
        payload: { value: value }
    });
};
var sendEvent = function (_a) {
    var name = _a.name, value = _a.value;
    storeDispatch({
        type: 'WEB_CHAT/SEND_EVENT',
        payload: { name: name, value: value }
    });
};
var sendAnalytics = function (metric, subMetric) {
    sendEvent({ name: 'bot_analytics', value: { metric: metric, subMetric: subMetric } });
};
var setSendBox = function (text) {
    storeDispatch({
        type: 'WEB_CHAT/SET_SEND_BOX',
        payload: { text: text }
    });
};
var setLanguage = function (language) {
    storeDispatch({
        type: 'WEB_CHAT/SET_LANGUAGE',
        payload: { language: language }
    });
};
var notifyUserAlreadyRead = function () {
    console.log('notifyUserAlreadyRead watermark: ' + DirectLine.getWatermark());
    sendEvent({
        name: 'UserAlreadyRead',
        value: {
            watermark: DirectLine.getWatermark()
        }
    });
};
// store dispatch.
var storeDispatch = function (_a) {
    var type = _a.type, payload = _a.payload, meta = _a.meta;
    store && store.dispatch({
        type: type,
        payload: payload,
        meta: meta
    });
};
var connectFulfilledObservers = [];
var connectFulfilledSubscribe = function (f) {
    connectFulfilledObservers.push(f);
    var directLine = getDirectLine();
    //connectionStatus$(2) === Online
    if (directLine && directLine.connectionStatus$.value === 2)
        f();
};
var connectFulfilledUnsubscribe = function (f) { return connectFulfilledObservers = connectFulfilledObservers.filter(function (subscriber) { return subscriber !== f; }); };
var actionObservers = [];
var actionSubscribe = function (f) { return actionObservers.push(f); };
var actionUnsubscribe = function (f) { return actionObservers = actionObservers.filter(function (subscriber) { return subscriber !== f; }); };
export default {
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
export { createStore, getStore, storeDispatch };
//# sourceMappingURL=Store.js.map