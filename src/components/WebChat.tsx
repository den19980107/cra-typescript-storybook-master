import memoize from 'memoize-one';
import React from 'react';
import ReactWebChat_Package from 'botframework-webchat'
import '../styles/WebChat.css';

interface WebChatProps {
    className?: string,
    config: GSSWebChat.IWebChatConfig,
    directLine: BotFrameworkWebChat.IDirectLine
}

interface WebChatState {
}

export default class extends React.Component<WebChatProps, WebChatState> {
    createStyleSet: (styleOptions: BotFrameworkWebChat.IStyleOptions) => any;
    activityMiddleware: any;

    constructor(props: Readonly<WebChatProps>) {
        super(props);

        this.createStyleSet = memoize((styleOptions: BotFrameworkWebChat.IStyleOptions) => {
            console.log('createStyleSet');

            return window.WebChat.createStyleSet(styleOptions);
        });

    }

    render() {
        const {
            props: { className, directLine,
                config: { userId, userName,
                    webChatOptions: { store, styleOptions }
                }
            },
            state: { }
        } = this;

        /**
         * 引入 ReactWebChat 有分兩種狀況：
         * 
         * 1. 使用 webpack build 出來的 gss-webchat.js：
         *    如果是使用 gss-webchat.js 需要在 html 中引入 botframework webchat-es5.js 的 cdn
         *    所以 ReactWebChat 會從 window 中拿取
         * 
         * 2. 使用 rollup.js build 出可以在其他 react 專案中以 component 引入的 gss-webchat-component.js：
         *    使用 gss-webchat-component.js 則是需要 user 在自己的專案中安裝 botframework-webchat 的 npm 套件
         *    所以 ReactWebChat 會從 package 中拿取
         */

        // 1. 使用 webpack build 出來的 gss-webchat.js
        let { ReactWebChat } = window.WebChat;
        if (!ReactWebChat) {
            // 2. 使用 rollup.js build 出可以在其他 react 專案中以 component 引入的 gss-webchat-component.js
            ReactWebChat = ReactWebChat_Package
        }


        let webChatProps: any = {
            ...this.props.config,
            userID: userId,
            username: userName,
            className: `${className || ''} web-chat`,
            directLine: directLine,
            store: store,
            styleSet: this.createStyleSet(styleOptions),
            activityMiddleware: this.activityMiddleware
        };

        ['botId', 'botName', 'userId', 'userName', 'directLineOptions', 'webChatOptions']
            .forEach(k => delete webChatProps[k])

        return (
            directLine ?
                React.createElement(ReactWebChat, webChatProps)
                :
                <div className={`${className || ''} connect-spinner`}>
                    <div className="content">
                        <div className="icon">
                            <span className="ms-Icon ms-Icon--Robot" />
                        </div>
                        <p>連線中，請稍等。</p>
                    </div>
                </div>
        );
    }
}