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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import memoize from 'memoize-one';
import React from 'react';
import UnreadTag from './UnreadTag';
import WebChat, { createStyleSet } from 'botframework-webchat';
import '../styles/WebChat.css';
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1(props) {
        var _this = _super.call(this, props) || this;
        _this.createStyleSet = memoize(function (styleOptions) {
            console.log('createStyleSet');
            return createStyleSet(styleOptions);
        });
        _this.unreadTagRef = React.createRef();
        var lastHistoryId = null;
        _this.activityMiddleware = function () { return function (next) { return function (card) {
            var _a = card.activity, name = _a.name, type = _a.type, id = _a.id, value = _a.value;
            if (type === 'event' && name === 'UnReadInfo') {
                lastHistoryId = value.lastHistoryId;
                return function () { return React.createElement(UnreadTag, { key: id, ref: _this.unreadTagRef, firstUnreadId: value.firstUnreadId, lastHistoryId: value.lastHistoryId }); };
            }
            else if (lastHistoryId && id === lastHistoryId) {
                return function () {
                    var renderArgs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        renderArgs[_i] = arguments[_i];
                    }
                    return (React.createElement("div", { key: id, "data-key": id }, next(card).apply(void 0, renderArgs)));
                };
            }
            else {
                return next(card);
            }
        }; }; };
        return _this;
    }
    default_1.prototype.render = function () {
        var _a = this, _b = _a.props, className = _b.className, directLine = _b.directLine, _c = _b.config, userId = _c.userId, userName = _c.userName, _d = _c.webChatOptions, store = _d.store, styleOptions = _d.styleOptions, _e = _a.state;
        var ReactWebChat = WebChat.ReactWebChat || WebChat;
        var webChatProps = __assign(__assign({}, this.props.config), { userID: userId, username: userName, className: (className || '') + " web-chat", directLine: directLine, store: store, styleSet: this.createStyleSet(styleOptions), activityMiddleware: this.activityMiddleware });
        ['botId', 'botName', 'userId', 'userName', 'directLineOptions', 'webChatOptions']
            .forEach(function (k) { return delete webChatProps[k]; });
        return (directLine ?
            React.createElement(ReactWebChat, webChatProps)
            :
                React.createElement("div", { className: (className || '') + " connect-spinner" },
                    React.createElement("div", { className: "content" },
                        React.createElement("div", { className: "icon" },
                            React.createElement("span", { className: "ms-Icon ms-Icon--Robot" })),
                        React.createElement("p", null, "\u9023\u7DDA\u4E2D\uFF0C\u8ACB\u7A0D\u7B49\u3002"))));
    };
    return default_1;
}(React.Component));
export default default_1;
//# sourceMappingURL=WebChat.js.map