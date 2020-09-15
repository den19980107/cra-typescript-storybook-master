import React from 'react';
import ReactDOM from 'react-dom';
import WebChat from './components/WebChat';
import Configuration from './utils/Configuration';
import { createDirectLine } from './utils/DirectLine';
import { setContainer } from './utils/Container';
import WebChatAPI from './WebChatAPI';
var createBasicWebChat = function (rawConfig, container, callback) {
    Configuration.initial(rawConfig).then(function (config) {
        return createDirectLine(config.directLineOptions).then(function (directLine) {
            return ReactDOM.render(React.createElement(WebChat, { directLine: directLine, config: config }), container, callback);
        });
    });
    setContainer(container);
    return WebChatAPI;
};
export default createBasicWebChat;
//# sourceMappingURL=createBasicWebChat.js.map