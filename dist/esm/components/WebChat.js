import _pt from "prop-types";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import memoize from 'memoize-one';
import React from 'react';
import UnreadTag from './UnreadTag';
import WebChat, { createStyleSet } from 'botframework-webchat';
import '../styles/WebChat.css';
export default class _class extends React.Component {
  constructor(props) {
    super(props);
    this.createStyleSet = memoize(styleOptions => {
      console.log('createStyleSet');
      return createStyleSet(styleOptions);
    });
    this.unreadTagRef = /*#__PURE__*/React.createRef();
    let lastHistoryId = null;

    this.activityMiddleware = () => next => card => {
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
          ref: this.unreadTagRef,
          firstUnreadId: value.firstUnreadId,
          lastHistoryId: value.lastHistoryId
        });
      } else if (lastHistoryId && id === lastHistoryId) {
        return (...renderArgs) => /*#__PURE__*/React.createElement("div", {
          key: id,
          "data-key": id
        }, next(card)(...renderArgs));
      } else {
        return next(card);
      }
    };
  }

  render() {
    const {
      props: {
        className,
        directLine,
        config: {
          userId,
          userName,
          webChatOptions: {
            store,
            styleOptions
          }
        }
      },
      state: {}
    } = this;
    const ReactWebChat = WebChat.ReactWebChat || WebChat;

    let webChatProps = _objectSpread(_objectSpread({}, this.props.config), {}, {
      userID: userId,
      username: userName,
      className: `${className || ''} web-chat`,
      directLine: directLine,
      store: store,
      styleSet: this.createStyleSet(styleOptions),
      activityMiddleware: this.activityMiddleware
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

}

_defineProperty(_class, "propTypes", {
  className: _pt.string
});
//# sourceMappingURL=WebChat.js.map