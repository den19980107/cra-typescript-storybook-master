import React, { ReactElement } from 'react'
import ReactWebChat from 'botframework-webchat'

interface Props {
    className?: string,
    config: GSSWebChat.IWebChatConfig,
    directLine: BotFrameworkWebChat.IDirectLine
}

export default function WebChat({ config, directLine, className }: Props): ReactElement {
    let webChatProps: any = {
        ...config
    };
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
