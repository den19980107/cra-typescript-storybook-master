import memoize from 'memoize-one';
import React from 'react';
import UnreadTag from './UnreadTag';
import WebChat, { createStyleSet } from 'botframework-webchat'
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
  unreadTagRef: React.RefObject<UnreadTag>;

  constructor(props: Readonly<WebChatProps>) {
    super(props);

    this.createStyleSet = memoize((styleOptions: BotFrameworkWebChat.IStyleOptions) => {
      console.log('createStyleSet');

      return createStyleSet(styleOptions);
    });

    this.unreadTagRef = React.createRef();

    let lastHistoryId: string = null;

    this.activityMiddleware = () => (next: any) => (card: { activity: { name: string; type: string; id: string; value: any; }; }) => {
      const {
        activity: { name, type, id, value }
      } = card;

      if (type === 'event' && name === 'UnReadInfo') {
        lastHistoryId = value.lastHistoryId;
        return () => <UnreadTag key={id} ref={this.unreadTagRef} firstUnreadId={value.firstUnreadId} lastHistoryId={value.lastHistoryId} />;
      } else if (lastHistoryId && id === lastHistoryId) {
        return (...renderArgs: any) => (
          <div
            key={id}
            data-key={id}
          >
            {next(card)(...renderArgs)}
          </div>
        );
      } else {
        return next(card);
      }
    };
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

    let ReactWebChat = WebChat.ReactWebChat || WebChat
    if (typeof ReactWebChat !== "function") {
      ReactWebChat = <div>Fuck!</div>
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