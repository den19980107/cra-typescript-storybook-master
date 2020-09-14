import React from 'react';
import ReactDOM from 'react-dom';
import MinimizableWebChat from './components/MinimizableWebChat';
import Configuration from './utils/Configuration';
import getRefObject from './utils/getRefObject';
import { setContainer } from './utils/Container';
import WebChatAPI from './WebChatAPI';
import WebChatToggleStateObservable from './utils/WebChatToggleStateObservable';

const minimizableWebChatRef: React.RefObject<MinimizableWebChat> = React.createRef();

const createMinimizableWebChat = (rawConfig: GSSWebChat.IWebChatConfig, container?: HTMLElement, callback?: () => void): GSSWebChat.IMinimizableWebChatAPI => {
    if (!container) {
        container = document.createElement('div');
        document.body.appendChild(container);
    }

    setContainer(container);

    Configuration.initial(rawConfig).then((config) =>
        ReactDOM.render(
            <MinimizableWebChat
                ref={minimizableWebChatRef}
                config={config}
            />,
            container,
            callback
        )
    );

    return {
        ...WebChatAPI,
        WebChatToggleStateObservable,
        openWebChat,
        closeWebChat,
        startConversation,
        endConversation,
        getMessageUnreadCount
    };
}

const openWebChat = () => toggleWebChat(true);
const closeWebChat = () => toggleWebChat(false);

const startConversation = async () => {
    const minimizableWebChat = await getRefObject(minimizableWebChatRef);

    minimizableWebChat.handleStartDirectLine();
}

const endConversation = async () => {
    const minimizableWebChat = await getRefObject(minimizableWebChatRef);

    minimizableWebChat.handleStopDirectLine();
    closeWebChat();
}

/**
 * Display or hide the WebChat.
 * @param display Use true to show the element or false to hide it.
 */
const toggleWebChat = async (display: boolean) => {
    const minimizableWebChat = await getRefObject(minimizableWebChatRef);

    if (display) {
        minimizableWebChat.handleMaximizeButtonClick();
    } else {
        minimizableWebChat.handleMinimizeButtonClick();
    }
}

const getMessageUnreadCount = () => {
    const minimizableWebChat = minimizableWebChatRef.current;

    return minimizableWebChat && minimizableWebChat.getMessageUnreadCount() || 0;
}

export default createMinimizableWebChat;