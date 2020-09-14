import React from 'react';
import ReactDOM from 'react-dom';
import WebChat from './components/WebChat';
import Configuration from './utils/Configuration';
import { createDirectLine } from './utils/DirectLine';
import { setContainer } from './utils/Container';
import WebChatAPI from './WebChatAPI';

const createBasicWebChat = (rawConfig: GSSWebChat.IWebChatConfig, container: HTMLElement, callback?: () => void): GSSWebChat.IBasicWebChatAPI => {
    Configuration.initial(rawConfig).then((config) =>
        createDirectLine(config.directLineOptions).then((directLine) =>
            ReactDOM.render(
                <WebChat
                    directLine={directLine}
                    config={config}
                />,
                container,
                callback
            )
        )
    );

    setContainer(container);

    return WebChatAPI;
}

export default createBasicWebChat;