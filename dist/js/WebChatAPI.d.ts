import createMessageMutationObserver from './utils/createMessageMutationObserver';
declare const _default: {
    createMessageMutationObserver: typeof createMessageMutationObserver;
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
    getWatermark: () => number;
    addMembers: (members: GSSWebChat.IMember[], next: Function) => void;
    removeMembers: (members: GSSWebChat.IMember[], next: Function) => void;
    addCurrentUser: (next: Function) => void;
    removeCurrentUser: (next: Function) => void;
    createDirectLine: (directLineOptions: GSSWebChat.IDirectLineOptions) => Promise<BotFrameworkWebChat.IDirectLine>;
    isWebChatVisible: () => boolean;
};
export default _default;
