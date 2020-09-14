import React from 'react';
import '../styles/WebChat.css';
interface WebChatProps {
    className?: string;
    config: GSSWebChat.IWebChatConfig;
    directLine: BotFrameworkWebChat.IDirectLine;
}
interface WebChatState {
}
export default class extends React.Component<WebChatProps, WebChatState> {
    createStyleSet: (styleOptions: BotFrameworkWebChat.IStyleOptions) => any;
    activityMiddleware: any;
    constructor(props: Readonly<WebChatProps>);
    render(): any;
}
export {};
