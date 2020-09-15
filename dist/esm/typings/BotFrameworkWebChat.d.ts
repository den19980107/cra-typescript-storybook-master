interface Window {
    WebChat: BotFrameworkWebChat.IBotFrameworkWebChat;
}

declare namespace BotFrameworkWebChat {
    interface IBotFrameworkWebChat {
        createStore(initialState: any, ...middlewares: any[]): IStore,
        createStyleSet(options: IStyleOptions): any,
        renderWebChat(options: IBotFrameworkWebChatOptions, element: HTMLElement): void,
        createDirectLine(tokenData: IDirectLineToken): IDirectLine,
        connectToWebChat: any,
        ReactWebChat: any
    }

    interface IDirectLineToken {
        token: string
    }

    interface IBotFrameworkWebChatOptions {
        directLine: IDirectLine,
        store?: IStore,
        styleOptions?: IStyleOptions,
        userID: string,
        username?: string,
        locale?: string,
    }

    interface IStyleOptions {
        [index: string]: number | string | boolean;

        // Color and paddings
        backgroundColor?: string,

        botAvatarInitials?: string,
        botAvatarBackground?: string,
        botAvatarImage?: string,
        bubbleBorderRadius?: string,
        bubbleTextColor?: string,
        bubbleFromUserBackground?: string,
        bubbleFromUserTextColor?: string,
        bubbleFromUserBorderRadius?: string,
        hideUploadButton?: boolean
    }

    interface IDirectLine {
        conversationId: string,
        watermark: number,
        activity$: any,
        connectionStatus$: any,
        end(): void,
        postActivity(activity: IActivity): any
    }

    interface IDispatchPayload {
        text: string
    }

    interface IDispatchAction {
        type: string,
        payload: IDispatchPayload
    }

    interface IStore {
        (action: IDispatchAction): void,
        dispatch(options: any): void
    }

    interface IActivity {
        type: string,
        channelData?: any,
        channelId?: string,
        conversation?: { id: string },
        eTag?: string,
        from: User,
        id?: string,
        timestamp?: string,
        membersAdded?: Array<GSSWebChat.IMember>,
        membersRemoved?: Array<GSSWebChat.IMember>
    }

    type UserRole = "bot" | "channel" | "user";

    interface User {
        id: string,
        name?: string,
        iconUrl?: string,
        role?: UserRole
    }
}