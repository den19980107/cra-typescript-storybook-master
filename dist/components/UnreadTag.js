var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import Store from '../utils/Store';
import createMessageMutationObserver from '../utils/createMessageMutationObserver';
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1(props) {
        var _this = _super.call(this, props) || this;
        console.log('UnreadTag constructor.');
        _this.unreadTagDomRef = React.createRef();
        _this.toogle = _this.toogle.bind(_this);
        _this.moveToBottom = _this.moveToBottom.bind(_this);
        _this.scrollToTag = _this.scrollToTag.bind(_this);
        _this.state = {
            visible: false
        };
        return _this;
    }
    default_1.prototype.componentDidMount = function () {
        var _this = this;
        var that = this;
        var _a = this.props, firstUnreadId = _a.firstUnreadId, lastHistoryId = _a.lastHistoryId;
        if (firstUnreadId) {
            // 使用 MutationObserver 當 dom rendered 後再調整 scrollbar。
            createMessageMutationObserver(function (mutation, observer) {
                if (mutation.hasChildNodes && mutation.firstElementChild.getAttribute('data-key') === _this.props.lastHistoryId) {
                    observer.disconnect();
                    _this.scrollToTag(false);
                }
            });
        }
        Store.ActionObservable.subscribe(function subscribe(action) {
            console.log('UnreadTag ActionObservable.');
            if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
                var activity = action.payload.activity;
                if (firstUnreadId && activity.id === firstUnreadId) {
                    that.moveToBottom().toogle(true);
                    firstUnreadId = null;
                    lastHistoryId = null;
                }
                else if (lastHistoryId && activity.id === lastHistoryId) {
                    setTimeout(function () { return that.moveToBottom(); });
                    lastHistoryId = null;
                }
                if (!firstUnreadId && !lastHistoryId) {
                    Store.ActionObservable.unsubscribe(subscribe);
                }
            }
        });
    };
    default_1.prototype.toogle = function (display) {
        this.setState({ visible: display });
        return this;
    };
    default_1.prototype.moveToBottom = function () {
        var unreadTag = this.unreadTagDomRef.current;
        console.log('moveToBottom');
        unreadTag.closest('ul').append(unreadTag.closest('li'));
        return this;
    };
    default_1.prototype.scrollToTag = function (immediatelyInvoked) {
        var unreadTag = this.unreadTagDomRef.current;
        var logContainer = unreadTag.parentElement.closest('div');
        //判斷是否有 scrollbar
        if (logContainer.scrollHeight > logContainer.clientHeight) {
            if (immediatelyInvoked) {
                scroll();
            }
            else {
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
    };
    //tag style ref: 
    //'border:2px #ccc solidborder-radius:10pxwidth:90%height: 20pxbackground-color:#eeetext-align: centermargin: auto'
    default_1.prototype.render = function () {
        var visible = this.state.visible;
        return React.createElement("div", { ref: this.unreadTagDomRef, className: "unread-tag", hidden: !visible }, "\u4EE5\u4E0B\u7232\u5C1A\u672A\u95B1\u8B80\u7684\u8A0A\u606F");
    };
    return default_1;
}(React.Component));
export default default_1;
//# sourceMappingURL=UnreadTag.js.map