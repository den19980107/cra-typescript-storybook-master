import _pt from "prop-types";
import React from 'react';
import WebChat from './WebChat';
import WebChatToggleStateObservable, { notify } from '../utils/WebChatToggleStateObservable';
import { createDirectLine, endDirectLine, getDirectLine } from '../utils/DirectLine';
import getRefObject from '../utils/getRefObject';
import Store from '../utils/Store';
import Configuration from '../utils/Configuration';
import '../styles/fabric-icons-inline.css';
import '../styles/MinimizableWebChat.css';
import PreviewMessage from './PreviewMessage';
export default class MinimizableWebChat extends React.Component {
  constructor(props) {
    super(props);
    this.webChatRef = /*#__PURE__*/React.createRef();
    this.handleStartDirectLine = this.handleStartDirectLine.bind(this);
    this.handleStopDirectLine = this.handleStopDirectLine.bind(this);
    this.handleMaximizeButtonClick = this.handleMaximizeButtonClick.bind(this);
    this.handleMinimizeButtonClick = this.handleMinimizeButtonClick.bind(this);
    this.handleSwitchButtonClick = this.handleSwitchButtonClick.bind(this);
    this.state = {
      minimized: true,
      side: 'right',
      directLine: this.props.defaultDirectLine,
      messageUnreadCount: 0,
      previewMessage: null
    };
  }

  componentDidMount() {
    const that = this;
    Store.ActionObservable.subscribe(function subscribe(action) {
      if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
        WebChatToggleStateObservable.subscribe(async s => {
          const webchat = await getRefObject(that.webChatRef);
          const unreadTag = await getRefObject(webchat.unreadTagRef);

          if (s === 'open' && that.state.messageUnreadCount > 0) {
            Store.notifyUserAlreadyRead();
            const unreadTagDom = await getRefObject(unreadTag.unreadTagDomRef);
            const logContainer = unreadTagDom.parentElement.closest('div');
            const scrollbarAtTheBottom = logContainer.clientHeight + logContainer.scrollTop >= logContainer.scrollHeight;
            setTimeout(() => unreadTag.toogle(true).scrollToTag(!scrollbarAtTheBottom));
          } else if (s === 'close') {
            unreadTag.moveToBottom().toogle(false);
          }

          that.setState({
            messageUnreadCount: 0
          });
        });
        Store.ActionObservable.unsubscribe(subscribe);
      }
    });
    const {
      directLineOptions
    } = Configuration.get();

    if (directLineOptions.webSocket || !directLineOptions.pollingAutoClose) {
      let lastHistoryId = null;

      const subscribeUnReadMessage = () => {
        Store.ActionObservable.subscribe(function subscribe(action) {
          if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
            const {
              activity
            } = action.payload;
            const {
              botId
            } = Configuration.get();

            if (activity.type === 'message' && activity.from?.id?.toLowerCase() === botId && WebChatToggleStateObservable.getState() === 'close') {
              var msg = activity.text ?? '您有一則非純文字訊息，請點選查看';
              that.setState(state => ({
                messageUnreadCount: state.messageUnreadCount + 1,
                previewMessage: msg
              }));
            }
          }
        });
      };

      console.log('subscribe UnReadInfo');
      Store.ActionObservable.subscribe(function subscribe(action) {
        if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
          const {
            activity
          } = action.payload;

          if (activity.type === 'event' && activity.name === 'UnReadInfo') {
            const directLine = getDirectLine();
            console.log('directLine.watermark = ' + directLine.watermark);
            directLine.watermark = Math.max(directLine.watermark, 0);
            lastHistoryId = activity.value.lastHistoryId;

            if (lastHistoryId) {
              if (activity.value.count) {
                if (WebChatToggleStateObservable.getState() === 'open') {
                  Store.notifyUserAlreadyRead();
                } else {
                  that.setState(state => ({
                    messageUnreadCount: state.messageUnreadCount + activity.value.count
                  }));
                }
              }
            } else {
              console.log('subscribe UnReadMessage');
              subscribeUnReadMessage();
              Store.ActionObservable.unsubscribe(subscribe);
            }
          } else if (activity.id === lastHistoryId) {
            console.log('subscribe UnReadMessage');
            subscribeUnReadMessage();
            Store.ActionObservable.unsubscribe(subscribe);
          }
        }
      });
    }
  }

  async handleStartDirectLine() {
    if (!this.state.directLine) {
      const config = this.props.config;
      this.setState({
        directLine: await createDirectLine(config.directLineOptions)
      });
    }
  }

  async handleStopDirectLine() {
    if (this.state.directLine) {
      endDirectLine();
      this.setState({
        directLine: null
      });
    }
  }

  handleMaximizeButtonClick() {
    this.handleStartDirectLine();
    this.setState(() => ({
      minimized: false,
      previewMessage: null
    }));
    notify('open');
  }

  handleMinimizeButtonClick() {
    const directLineOptions = this.props.config.directLineOptions;

    if (!directLineOptions.webSocket && directLineOptions.pollingAutoClose) {
      this.handleStopDirectLine();
    }

    this.setState(() => ({
      minimized: true
    }));
    notify('close');
  }

  handleSwitchButtonClick() {
    this.setState(({
      side
    }) => ({
      side: side === 'left' ? 'right' : 'left'
    }));
  }

  getMessageUnreadCount() {
    return this.state.messageUnreadCount;
  }

  render() {
    const {
      props: {
        config,
        config: {
          webChatOptions: {
            buttonOptions,
            headerOptions
          }
        }
      },
      state: {
        minimized,
        side,
        directLine,
        messageUnreadCount,
        previewMessage
      }
    } = this;
    const buttonStyle = {
      background: `url(${buttonOptions.iconUrl})`,
      backgroundSize: 'cover'
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "minimizable-web-chat"
    }, /*#__PURE__*/React.createElement(PreviewMessage, {
      message: this.state.previewMessage,
      maximizeButton: this.handleMaximizeButtonClick
    }), /*#__PURE__*/React.createElement("button", {
      className: `maximize ${buttonOptions.visible && buttonOptions.displayOnTheSide ? 'hide' : ''}`,
      onClick: this.handleMaximizeButtonClick,
      hidden: !minimized || !buttonOptions.visible,
      style: buttonStyle,
      "message-unread-count": messageUnreadCount
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: minimized ? 'none' : ''
      },
      className: side === 'left' ? 'chat-box left' : 'chat-box right'
    }, /*#__PURE__*/React.createElement("header", null, headerOptions.iconUrl && /*#__PURE__*/React.createElement("img", {
      className: "header-Icon",
      src: headerOptions.iconUrl,
      onClick: this.handleMinimizeButtonClick
    }), /*#__PURE__*/React.createElement("div", {
      className: "filler",
      onClick: this.handleMinimizeButtonClick
    }, headerOptions.text), /*#__PURE__*/React.createElement("button", {
      className: "switch",
      onClick: this.handleSwitchButtonClick
    }, /*#__PURE__*/React.createElement("span", {
      className: "ms-Icon ms-Icon--Switch"
    })), /*#__PURE__*/React.createElement("button", {
      className: "minimize",
      onClick: this.handleMinimizeButtonClick
    }, /*#__PURE__*/React.createElement("span", {
      className: "ms-Icon ms-Icon--ChromeMinimize"
    }))), /*#__PURE__*/React.createElement(WebChat, {
      ref: this.webChatRef,
      className: "react-web-chat",
      directLine: directLine,
      config: config
    })));
  }

}
//# sourceMappingURL=MinimizableWebChat.js.map