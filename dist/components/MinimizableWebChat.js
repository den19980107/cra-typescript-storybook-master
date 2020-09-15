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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var MinimizableWebChat = /** @class */ (function (_super) {
    __extends(MinimizableWebChat, _super);
    function MinimizableWebChat(props) {
        var _this = _super.call(this, props) || this;
        _this.webChatRef = React.createRef();
        _this.handleStartDirectLine = _this.handleStartDirectLine.bind(_this);
        _this.handleStopDirectLine = _this.handleStopDirectLine.bind(_this);
        _this.handleMaximizeButtonClick = _this.handleMaximizeButtonClick.bind(_this);
        _this.handleMinimizeButtonClick = _this.handleMinimizeButtonClick.bind(_this);
        _this.handleSwitchButtonClick = _this.handleSwitchButtonClick.bind(_this);
        _this.state = {
            minimized: true,
            side: 'right',
            directLine: _this.props.defaultDirectLine,
            messageUnreadCount: 0,
            previewMessage: null
        };
        return _this;
    }
    MinimizableWebChat.prototype.componentDidMount = function () {
        var that = this;
        Store.ActionObservable.subscribe(function subscribe(action) {
            var _this = this;
            if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
                WebChatToggleStateObservable.subscribe(function (s) { return __awaiter(_this, void 0, void 0, function () {
                    var webchat, unreadTag, unreadTagDom, logContainer, scrollbarAtTheBottom_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, getRefObject(that.webChatRef)];
                            case 1:
                                webchat = _a.sent();
                                return [4 /*yield*/, getRefObject(webchat.unreadTagRef)];
                            case 2:
                                unreadTag = _a.sent();
                                if (!(s === 'open' && that.state.messageUnreadCount > 0)) return [3 /*break*/, 4];
                                Store.notifyUserAlreadyRead();
                                return [4 /*yield*/, getRefObject(unreadTag.unreadTagDomRef)];
                            case 3:
                                unreadTagDom = _a.sent();
                                logContainer = unreadTagDom.parentElement.closest('div');
                                scrollbarAtTheBottom_1 = logContainer.clientHeight + logContainer.scrollTop >= logContainer.scrollHeight;
                                setTimeout(function () { return unreadTag.toogle(true).scrollToTag(!scrollbarAtTheBottom_1); });
                                return [3 /*break*/, 5];
                            case 4:
                                if (s === 'close') {
                                    unreadTag.moveToBottom().toogle(false);
                                }
                                _a.label = 5;
                            case 5:
                                that.setState({
                                    messageUnreadCount: 0
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                Store.ActionObservable.unsubscribe(subscribe);
            }
        });
        var directLineOptions = Configuration.get().directLineOptions;
        if (directLineOptions.webSocket || !directLineOptions.pollingAutoClose) {
            var lastHistoryId_1 = null;
            var subscribeUnReadMessage_1 = function () {
                Store.ActionObservable.subscribe(function subscribe(action) {
                    var _a, _b, _c;
                    if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
                        var activity = action.payload.activity;
                        var botId = Configuration.get().botId;
                        if (activity.type === 'message'
                            && ((_b = (_a = activity.from) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === botId
                            && WebChatToggleStateObservable.getState() === 'close') {
                            var msg = (_c = activity.text) !== null && _c !== void 0 ? _c : '您有一則非純文字訊息，請點選查看';
                            that.setState(function (state) { return ({
                                messageUnreadCount: state.messageUnreadCount + 1,
                                previewMessage: msg
                            }); });
                        }
                    }
                });
            };
            console.log('subscribe UnReadInfo');
            Store.ActionObservable.subscribe(function subscribe(action) {
                if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
                    var activity_1 = action.payload.activity;
                    if (activity_1.type === 'event' && activity_1.name === 'UnReadInfo') {
                        var directLine = getDirectLine();
                        console.log('directLine.watermark = ' + directLine.watermark);
                        directLine.watermark = Math.max(directLine.watermark, 0);
                        lastHistoryId_1 = activity_1.value.lastHistoryId;
                        if (lastHistoryId_1) {
                            if (activity_1.value.count) {
                                if (WebChatToggleStateObservable.getState() === 'open') {
                                    Store.notifyUserAlreadyRead();
                                }
                                else {
                                    that.setState(function (state) { return ({
                                        messageUnreadCount: state.messageUnreadCount + activity_1.value.count
                                    }); });
                                }
                            }
                        }
                        else {
                            console.log('subscribe UnReadMessage');
                            subscribeUnReadMessage_1();
                            Store.ActionObservable.unsubscribe(subscribe);
                        }
                    }
                    else if (activity_1.id === lastHistoryId_1) {
                        console.log('subscribe UnReadMessage');
                        subscribeUnReadMessage_1();
                        Store.ActionObservable.unsubscribe(subscribe);
                    }
                }
            });
        }
    };
    MinimizableWebChat.prototype.handleStartDirectLine = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this.state.directLine) return [3 /*break*/, 2];
                        config = this.props.config;
                        _a = this.setState;
                        _b = {};
                        return [4 /*yield*/, createDirectLine(config.directLineOptions)];
                    case 1:
                        _a.apply(this, [(_b.directLine = _c.sent(), _b)]);
                        _c.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    MinimizableWebChat.prototype.handleStopDirectLine = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.state.directLine) {
                    endDirectLine();
                    this.setState({ directLine: null });
                }
                return [2 /*return*/];
            });
        });
    };
    MinimizableWebChat.prototype.handleMaximizeButtonClick = function () {
        this.handleStartDirectLine();
        this.setState(function () { return ({
            minimized: false,
            previewMessage: null
        }); });
        notify('open');
    };
    MinimizableWebChat.prototype.handleMinimizeButtonClick = function () {
        var directLineOptions = this.props.config.directLineOptions;
        if (!directLineOptions.webSocket && directLineOptions.pollingAutoClose) {
            this.handleStopDirectLine();
        }
        this.setState(function () { return ({
            minimized: true
        }); });
        notify('close');
    };
    MinimizableWebChat.prototype.handleSwitchButtonClick = function () {
        this.setState(function (_a) {
            var side = _a.side;
            return ({
                side: side === 'left' ? 'right' : 'left'
            });
        });
    };
    MinimizableWebChat.prototype.getMessageUnreadCount = function () {
        return this.state.messageUnreadCount;
    };
    MinimizableWebChat.prototype.render = function () {
        var _a = this, _b = _a.props, config = _b.config, _c = _b.config.webChatOptions, buttonOptions = _c.buttonOptions, headerOptions = _c.headerOptions, _d = _a.state, minimized = _d.minimized, side = _d.side, directLine = _d.directLine, messageUnreadCount = _d.messageUnreadCount, previewMessage = _d.previewMessage;
        var buttonStyle = {
            background: "url(" + buttonOptions.iconUrl + ")",
            backgroundSize: 'cover'
        };
        return (React.createElement("div", { className: "minimizable-web-chat" },
            React.createElement(PreviewMessage, { message: this.state.previewMessage, maximizeButton: this.handleMaximizeButtonClick }),
            React.createElement("button", { className: "maximize " + ((buttonOptions.visible && buttonOptions.displayOnTheSide) ? 'hide' : ''), onClick: this.handleMaximizeButtonClick, hidden: !minimized || !buttonOptions.visible, style: buttonStyle, "message-unread-count": messageUnreadCount }),
            React.createElement("div", { style: { display: minimized ? 'none' : '' }, className: side === 'left' ? 'chat-box left' : 'chat-box right' },
                React.createElement("header", null,
                    headerOptions.iconUrl &&
                        React.createElement("img", { className: "header-Icon", src: headerOptions.iconUrl, onClick: this.handleMinimizeButtonClick }),
                    React.createElement("div", { className: "filler", onClick: this.handleMinimizeButtonClick }, headerOptions.text),
                    React.createElement("button", { className: "switch", onClick: this.handleSwitchButtonClick },
                        React.createElement("span", { className: "ms-Icon ms-Icon--Switch" })),
                    React.createElement("button", { className: "minimize", onClick: this.handleMinimizeButtonClick },
                        React.createElement("span", { className: "ms-Icon ms-Icon--ChromeMinimize" }))),
                React.createElement(WebChat, { ref: this.webChatRef, className: "react-web-chat", directLine: directLine, config: config }))));
    };
    return MinimizableWebChat;
}(React.Component));
export default MinimizableWebChat;
//# sourceMappingURL=MinimizableWebChat.js.map