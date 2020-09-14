import _pt from "prop-types";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useEffect } from 'react';
import memoize from 'memoize-one';
import UnreadTag from './UnreadTag';
import ReactWebChat_Package, { createStyleSet as BotFrameworkWebChat_createStyleSet } from 'botframework-webchat';
import '../styles/WebChat.css';
export default function WebChat({
  className,
  config,
  directLine
}) {
  let createStyleSet;
  let activityMiddleware;
  let unreadTagRef;
  createStyleSet = memoize(styleOptions => {
    console.log('createStyleSet');
    return BotFrameworkWebChat_createStyleSet(styleOptions);
  });
  useEffect(() => {
    unreadTagRef = /*#__PURE__*/React.createRef();
    let lastHistoryId = null;

    activityMiddleware = () => next => card => {
      const {
        activity: {
          name,
          type,
          id,
          value
        }
      } = card;

      if (type === 'event' && name === 'UnReadInfo') {
        lastHistoryId = value.lastHistoryId;
        return () => /*#__PURE__*/React.createElement(UnreadTag, {
          key: id,
          ref: unreadTagRef,
          firstUnreadId: value.firstUnreadId,
          lastHistoryId: value.lastHistoryId
        });
      } else if (lastHistoryId && id === lastHistoryId) {
        return children => /*#__PURE__*/React.createElement("div", {
          key: id,
          "data-key": id
        }, next(card)(children));
      } else {
        return next(card);
      }
    };
  }, []);
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

  let {
    ReactWebChat
  } = window.WebChat;

  if (!ReactWebChat) {
    // 2. 使用 rollup.js build 出可以在其他 react 專案中以 component 引入的 gss-webchat-component.js
    ReactWebChat = ReactWebChat_Package;
  }

  let webChatProps = _objectSpread(_objectSpread({}, config), {}, {
    userID: config.userId,
    username: config.userName,
    className: `${className || ''} web-chat`,
    directLine: directLine,
    store: config.webChatOptions.store,
    styleSet: createStyleSet(config.webChatOptions.styleOptions),
    activityMiddleware: activityMiddleware
  });

  ['botId', 'botName', 'userId', 'userName', 'directLineOptions', 'webChatOptions'].forEach(k => delete webChatProps[k]);
  return directLine ? /*#__PURE__*/React.createElement(ReactWebChat, webChatProps) : /*#__PURE__*/React.createElement("div", {
    className: `${className || ''} connect-spinner`
  }, /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ms-Icon ms-Icon--Robot"
  })), /*#__PURE__*/React.createElement("p", null, "\u9023\u7DDA\u4E2D\uFF0C\u8ACB\u7A0D\u7B49\u3002")));
}
WebChat.propTypes = {
  className: _pt.string
};
//# sourceMappingURL=WebChat.js.map