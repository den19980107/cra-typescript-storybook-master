interface Window {
    GSSWebChat: GSSWebChat.IGSSWebChat;
}

declare namespace GSSWebChat {
    /** IGSSWebChat */
    interface IGSSWebChat {
        /** create basic webChat. */
        createBasicWebChat(config: GSSWebChat.IWebChatConfig, container: HTMLElement, callback?: () => void): IBasicWebChatAPI;

        /** create minimizable webChat. */
        createMinimizableWebChat(config: GSSWebChat.IWebChatConfig, container: HTMLElement, callback?: () => void): IMinimizableWebChatAPI;

        /** clear Storage item. */
        clearStorage(): void;
    }

    interface IBasicWebChatAPI {
        ActionObservable: IActionObservable;

        ConnectFulfilledObservable: IConnectFulfilledObservable;

        /**
         * Notify bot to add members.
         * @param members [...{ id, name }]
         * @param next callback function
         */
        addMembers(members: Array<IMember>, next: Function): void;

        /**
         * Notify bot to remove members.
         * @param members [...{ id, name }]
         * @param next callback function
         */
        removeMembers(members: Array<IMember>, next: Function): void;

        /**
         * Notify bot to add current user.
         * @param next callback function
         */
        addCurrentUser(next: Function): void;

        /**
         * Notify bot to remove current user.
         * @param next callback function
         */
        removeCurrentUser(next: Function): void;

        /**
         * Send a message to bot.
         * @param text message.
         */
        sendMessage(text: string): void;

        /**
         * Send a postback to bot.
         * @param value postback value.
         */
        sendPostback(value: any): void;
        
        /**
         * Send a analytics to bot connector.
         * @param param0 metric and subMetric.
         */
        sendAnalytics(metric: string, subMetric?: string): void;
        
        /**
         * Send a event to bot.
         * @param param0 event name and value. ex: { name: string, value: any }
         */
        sendEvent({ name, value }: { name: string, value: any }): void;

        /**
         * Set sendbox(webchat 文字輸入列) text.
         * @param text message.
         */
        setSendBox(text: string): void;

        /**
         * Set webchat ui language.
         * @param language language code. ex: zh-tw
         */
        setLanguage(language: string): void;

        /** Get watermark. */
        getWatermark(): number;

        /** Check webchat is visible. */
        isWebChatVisible(): boolean;

        /** notify Bot Connector user already read message. */
        notifyUserAlreadyRead(): void;

        /** Create a mutation observer for message. */
        createMessageMutationObserver(f: (mutation: HTMLLIElement, observer: MutationObserver) => void): void;
    }

    interface IMinimizableWebChatAPI extends IBasicWebChatAPI {
        WebChatToggleStateObservable: IWebChatToggleStateObservable;

        /** Open webchat window. */
        openWebChat(): void;

        /** Close webchat window. */
        closeWebChat(): void;

        /** Start conversation. */
        startConversation(): void;

        /** End conversation. */
        endConversation(): void;

        /** 取得訊息未讀數量 */
        getMessageUnreadCount(): number;
    }

    /** WebChat Config. */
    interface IWebChatConfig {
        botId: string,
        botName: string,
        userId: string,
        userName: string,
        directLineOptions: IDirectLineOptions,
        webChatOptions: IWebChatOptions
    }

    /** DirectLine 設定項目。 */
    interface IDirectLineOptions {
        token: string,
        domain: string,
        pollingInterval: number,
        pollingAutoClose: boolean,
        webSocket: boolean,
        conversationId: string,
        watermark: number
    }

    /** WebChat 設定項目。 */
    interface IWebChatOptions {
        headerOptions: IWebChatHeaderOptions,
        buttonOptions: IWebChatButtonOptions,
        styleOptions: BotFrameworkWebChat.IStyleOptions,
        store: BotFrameworkWebChat.IStore
    }

    /** WebChatHeader 設定項目。 */
    interface IWebChatHeaderOptions {
        iconUrl: string,
        /** 標題。 */
        text: string
    }

    /** WebChat 按鈕(下方的機器人圖示)設定項目。 */
    interface IWebChatButtonOptions {
        iconUrl: string,
        /** 顯示縮在側邊，滑鼠過去再跳出來。(default: false) */
        displayOnTheSide: boolean,
        /** 是否顯示。(default: true) */
        visible: boolean
    }

    /** Member data. */
    interface IMember {
        id: string,
        name?: string
    }

    /** 可 subscribe WebChat 所有的 Action。 */
    interface IActionObservable {
        subscribe(f: () => void): void;
        unsubscribe(f: () => void): void;
    }

    /** subscribe WebChat 狀態爲連線完成的時候。 */
    interface IConnectFulfilledObservable {
        subscribe(f: () => void): void;
        unsubscribe(f: () => void): void;
    }

    /** subscribe `MinimizableWebChat` open/close 的狀態改變。 */
    interface IWebChatToggleStateObservable {
        getState(): string;
        subscribe(f: (s: string) => void): void;
        unsubscribe(f: (s: string) => void): void;
    }
}