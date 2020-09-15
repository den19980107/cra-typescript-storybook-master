import DirectLine, { getDirectLine } from './DirectLine';
import Storage from './Storage';
import Configuration from './Configuration';
import Container from './Container';
import { createStore as BotFrameworkWebChat_createStore } from 'botframework-webchat'
let store: BotFrameworkWebChat.IStore = null;

const createStore = (): BotFrameworkWebChat.IStore => {
    console.log('==========createStore============');

    let lastHistoryId = '';
    let historyAlredyLoad = false;
    let notifyConnectFulfilledObservers = false;

    store = BotFrameworkWebChat_createStore({}, ({ dispatch }: { dispatch: any }) => (next: (arg0: any) => void) => (action: { type: string; payload: any; }) => {
        console.log(action.type);

        if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
            notifyConnectFulfilledObservers = false;
            Storage.setConversationId(getDirectLine().conversationId);
            Storage.setUserId(Configuration.get().userId);
            console.log('getDirectLine().conversationId: ' + getDirectLine().conversationId);
        }
        else if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
            const { activity } = action.payload;

            if (activity.type === 'event' && activity.name === 'UnReadInfo') {
                lastHistoryId = activity.value.lastHistoryId;
                historyAlredyLoad = !lastHistoryId;
            }
            else if (historyAlredyLoad && Container.isWebChatVisible()) {
                setTimeout(notifyUserAlreadyRead)
            }
            else if (lastHistoryId && activity.id === lastHistoryId) {
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
}

const getStore = () => store;

/* actions */
//ref: https://github.com/Microsoft/BotFramework-WebChat/tree/master/packages/core/src/actions

const sendMessage = (text: string) => {
    storeDispatch({
        type: 'WEB_CHAT/SEND_MESSAGE',
        payload: { text }
    });
}

const sendPostback = (value: any) => {
    storeDispatch({
        type: 'WEB_CHAT/SEND_POST_BACK',
        payload: { value }
    });
}

const sendEvent = ({ name, value }: { name: string, value: any }) => {
    storeDispatch({
        type: 'WEB_CHAT/SEND_EVENT',
        payload: { name, value }
    });
}

const sendAnalytics = (metric: string, subMetric?: string) => {
    sendEvent({ name: 'bot_analytics', value: { metric, subMetric } })
}

const setSendBox = (text: string) => {
    storeDispatch({
        type: 'WEB_CHAT/SET_SEND_BOX',
        payload: { text }
    });
}

const setLanguage = (language: string) => {
    storeDispatch({
        type: 'WEB_CHAT/SET_LANGUAGE',
        payload: { language }
    });
}

const notifyUserAlreadyRead = () => {
    console.log('notifyUserAlreadyRead watermark: ' + DirectLine.getWatermark());
    sendEvent({
        name: 'UserAlreadyRead',
        value: {
            watermark: DirectLine.getWatermark()
        }
    });
}

// store dispatch.
const storeDispatch = ({ type, payload, meta }: { type: string, payload: object, meta?: object }) => {
    store && store.dispatch({
        type,
        payload,
        meta
    });
}

let connectFulfilledObservers: (() => void)[] = [];
const connectFulfilledSubscribe = (f: () => void) => {
    connectFulfilledObservers.push(f);

    const directLine = getDirectLine();

    //connectionStatus$(2) === Online
    if (directLine && directLine.connectionStatus$.value === 2) f();
}

const connectFulfilledUnsubscribe = (f: () => void) => connectFulfilledObservers = connectFulfilledObservers.filter(subscriber => subscriber !== f);

let actionObservers: ((action: any) => void)[] = [];
const actionSubscribe = (f: (action: any) => void) => actionObservers.push(f);
const actionUnsubscribe = (f: (action: any) => void) => actionObservers = actionObservers.filter(subscriber => subscriber !== f);

export default {
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

export {
    createStore,
    getStore,
    storeDispatch
};