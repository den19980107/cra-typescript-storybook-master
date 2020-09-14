import BasicWebChatComponent from './components/BasicWebChatComponent';
import WebChat from './components/WebChat';
import MinimizableWebChat from './components/MinimizableWebChat';
declare const _default: {
    Components: {
        BasicWebChatComponent: typeof BasicWebChatComponent;
        WebChat: typeof WebChat;
        MinimizableWebChat: typeof MinimizableWebChat;
    };
    Utils: {
        Storage: {
            getUserId: () => string;
            setUserId: (id: string) => void;
            getConversationId: () => string;
            setConversationId: (id: string) => void;
            clear: () => void;
        };
        Store: {
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
        WebChatToggleStateObservable: {
            notify: (notifyState: string) => void;
            getState: () => string;
            subscribe: (f: (s: string) => void) => number;
            unsubscribe: (f: (s: string) => void) => void;
        };
        DirectLine: {
            getWatermark: () => number;
            addMembers: (members: GSSWebChat.IMember[], next: Function) => void;
            removeMembers: (members: GSSWebChat.IMember[], next: Function) => void;
            addCurrentUser: (next: Function) => void;
            removeCurrentUser: (next: Function) => void;
            createDirectLine: (directLineOptions: GSSWebChat.IDirectLineOptions) => Promise<BotFrameworkWebChat.IDirectLine>;
        };
        Configuration: {
            initial: (rawConfig: GSSWebChat.IWebChatConfig) => Promise<GSSWebChat.IWebChatConfig>;
            get: () => GSSWebChat.IWebChatConfig;
        };
    };
};
export default _default;
