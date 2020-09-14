import _pt from "prop-types";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import Store from '../utils/Store';
import createMessageMutationObserver from '../utils/createMessageMutationObserver';
export default class _class extends React.Component {
  constructor(props) {
    super(props);
    console.log('UnreadTag constructor.');
    this.unreadTagDomRef = /*#__PURE__*/React.createRef();
    this.toogle = this.toogle.bind(this);
    this.moveToBottom = this.moveToBottom.bind(this);
    this.scrollToTag = this.scrollToTag.bind(this);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    const that = this;
    let {
      firstUnreadId,
      lastHistoryId
    } = this.props;

    if (firstUnreadId) {
      // 使用 MutationObserver 當 dom rendered 後再調整 scrollbar。
      createMessageMutationObserver((mutation, observer) => {
        if (mutation.hasChildNodes && mutation.firstElementChild.getAttribute('data-key') === this.props.lastHistoryId) {
          observer.disconnect();
          this.scrollToTag(false);
        }
      });
    }

    Store.ActionObservable.subscribe(function subscribe(action) {
      console.log('UnreadTag ActionObservable.');

      if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
        const {
          activity
        } = action.payload;

        if (firstUnreadId && activity.id === firstUnreadId) {
          that.moveToBottom().toogle(true);
          firstUnreadId = null;
          lastHistoryId = null;
        } else if (lastHistoryId && activity.id === lastHistoryId) {
          setTimeout(() => that.moveToBottom());
          lastHistoryId = null;
        }

        if (!firstUnreadId && !lastHistoryId) {
          Store.ActionObservable.unsubscribe(subscribe);
        }
      }
    });
  }

  toogle(display) {
    this.setState({
      visible: display
    });
    return this;
  }

  moveToBottom() {
    const unreadTag = this.unreadTagDomRef.current;
    console.log('moveToBottom');
    unreadTag.closest('ul').append(unreadTag.closest('li'));
    return this;
  }

  scrollToTag(immediatelyInvoked) {
    const unreadTag = this.unreadTagDomRef.current;
    const logContainer = unreadTag.parentElement.closest('div'); //判斷是否有 scrollbar

    if (logContainer.scrollHeight > logContainer.clientHeight) {
      if (immediatelyInvoked) {
        scroll();
      } else {
        logContainer.addEventListener('scroll', function waitHistoryLoaded() {
          // 載完對話後，webchat 會做 scrollToEnd，這時候再將 scrollbar 定位到 unread tag。
          if (logContainer.clientHeight + logContainer.scrollTop >= logContainer.scrollHeight) {
            scroll();
            logContainer.removeEventListener('scroll', waitHistoryLoaded);
          }
        });
      }
    }

    function scroll() {
      logContainer.scrollTop = Math.max(unreadTag.offsetTop - 30, 0);
    }

    return this;
  } //tag style ref: 
  //'border:2px #ccc solidborder-radius:10pxwidth:90%height: 20pxbackground-color:#eeetext-align: centermargin: auto'


  render() {
    const {
      visible
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      ref: this.unreadTagDomRef,
      className: "unread-tag",
      hidden: !visible
    }, "\u4EE5\u4E0B\u7232\u5C1A\u672A\u95B1\u8B80\u7684\u8A0A\u606F");
  }

}

_defineProperty(_class, "propTypes", {
  firstUnreadId: _pt.string.isRequired,
  lastHistoryId: _pt.string.isRequired
});
//# sourceMappingURL=UnreadTag.js.map