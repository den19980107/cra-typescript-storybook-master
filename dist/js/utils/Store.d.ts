declare const createStore: () => BotFrameworkWebChat.IStore;
declare const getStore: () => BotFrameworkWebChat.IStore;
declare const storeDispatch: ({ type, payload, meta }: {
    type: string;
    payload: object;
    meta?: object;
}) => void;
declare const _default: {
    sendAnalytics: (metric: string, subMetric?: string) => void;
    sendEvent: ({ name, value }: {
        name: string;
        value: any;
    }) => void;
    sendMessage: (text: string) => void;
    sendPostback: (value: any) => void;
    setLanguage: (language: string) => void;
    setSendBox: (text: string) => void;
    notifyUserAlreadyRead: () => void;
    ActionObservable: {
        subscribe: (f: (action: any) => void) => number;
        unsubscribe: (f: (action: any) => void) => ((action: any) => void)[];
    };
    ConnectFulfilledObservable: {
        subscribe: (f: () => void) => void;
        unsubscribe: (f: () => void) => (() => void)[];
    };
};
export default _default;
export { createStore, getStore, storeDispatch };
