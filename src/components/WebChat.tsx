import React, { ReactElement, useEffect } from 'react'
import memoize from 'memoize-one';
import UnreadTag from './UnreadTag';
import ReactWebChat_Package, { createStyleSet as BotFrameworkWebChat_createStyleSet } from 'botframework-webchat'
import '../styles/WebChat.css';

interface Props {
  className?: string,
  config: GSSWebChat.IWebChatConfig,
  directLine: BotFrameworkWebChat.IDirectLine
}

export default function WebChat({ className, config, directLine }: Props): ReactElement {
  let createStyleSet: (styleOptions: BotFrameworkWebChat.IStyleOptions) => any;
  let activityMiddleware: any
  let unreadTagRef: React.RefObject<UnreadTag>;

  createStyleSet = memoize((styleOptions: BotFrameworkWebChat.IStyleOptions) => {
    console.log('createStyleSet');

    return BotFrameworkWebChat_createStyleSet(styleOptions);
  });


  useEffect(() => {
    unreadTagRef = React.createRef();

    let lastHistoryId: string | null | undefined = null;

    activityMiddleware = () => (next: (arg0: any) => (arg0: any) => React.ReactNode) => (card: { activity: { name: string; type: string; id: string; value: any; }; }) => {
      const {
        activity: { name, type, id, value }
      } = card;

      if (type === 'event' && name === 'UnReadInfo') {
        lastHistoryId = value.lastHistoryId;
        return () => <UnreadTag key={id} ref={unreadTagRef} firstUnreadId={value.firstUnreadId} lastHistoryId={value.lastHistoryId} />;
      } else if (lastHistoryId && id === lastHistoryId) {
        return (children: any) => (
          <div
            key={id}
            data-key={id}
          >
            {next(card)(children)}
          </div>
        );
      } else {
        return next(card);
      }
    };
  }, [])

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
    ...config,
    userID: config.userId,
    username: config.userName,
    className: `${className || ''} web-chat`,
    directLine: directLine,
    store: config.webChatOptions.store,
    styleSet: createStyleSet(config.webChatOptions.styleOptions),
    activityMiddleware: activityMiddleware
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
