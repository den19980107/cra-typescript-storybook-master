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
import { createStore } from './Store';
import Storage from './Storage';
import jwtDecode from 'jwt-decode';
var config;
var initial = function (rawConfig) { return __awaiter(void 0, void 0, void 0, function () {
    var directLineOptions, decoded, directLinePath, _a, _b, webChatOptions, webChatButtonOptions, webChatHeaderOptions, styleOptions;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                config = __assign({}, rawConfig);
                directLineOptions = config.directLineOptions = __assign({}, config.directLineOptions);
                decoded = (directLineOptions.token) ? jwtDecode(directLineOptions.token) : {};
                config.botId = (decoded.botId || config.botId).toLowerCase();
                config.userId = decoded.userId || config.userId || Storage.getUserId() || randomUserID();
                config.userName = config.userName || '';
                directLineOptions.domain = decoded.origin || directLineOptions.domain;
                directLinePath = directLineOptions.domain.endsWith('/directline') ? '' : '/directline';
                directLineOptions.domain += directLinePath + "/" + config.botId;
                _a = directLineOptions;
                _b = !(directLineOptions.webSocket === false);
                if (!_b) return [3 /*break*/, 2];
                return [4 /*yield*/, checkWebSocketIsOpen(directLineOptions.domain)];
            case 1:
                _b = (_c.sent());
                _c.label = 2;
            case 2:
                _a.webSocket = _b;
                directLineOptions.pollingAutoClose = (directLineOptions.pollingAutoClose === true);
                directLineOptions.conversationId = decoded.conversationId || directLineOptions.conversationId || Storage.getConversationId() || '';
                directLineOptions.watermark = 0;
                if (!directLineOptions.webSocket && !directLineOptions.pollingAutoClose) {
                    directLineOptions.watermark = -1; //polling watermark 設成 -1 才會先取歷史訊息
                }
                webChatOptions = config.webChatOptions = __assign({}, config.webChatOptions);
                webChatButtonOptions = webChatOptions.buttonOptions = __assign({}, webChatOptions.buttonOptions);
                webChatButtonOptions.iconUrl = webChatButtonOptions.iconUrl || 'https://bot-framework.azureedge.net/bot-icons-v1/bot-framework-default-7.png';
                webChatButtonOptions.visible = !(webChatButtonOptions.visible === false);
                webChatButtonOptions.displayOnTheSide = (webChatButtonOptions.displayOnTheSide === true);
                webChatHeaderOptions = webChatOptions.headerOptions = __assign({}, webChatOptions.headerOptions);
                styleOptions = webChatOptions.styleOptions = Object.assign({
                    // Bubble
                    bubbleBackground: '#eceff1',
                    bubbleBorderColor: '#E6E6E6',
                    bubbleBorderRadius: '0px 12px 12px 12px',
                    bubbleBorderStyle: 'solid',
                    bubbleBorderWidth: 1,
                    bubbleFromUserBackground: '#0078d7',
                    bubbleFromUserBorderColor: '#E6E6E6',
                    bubbleFromUserBorderRadius: '12px 0px 12px 12px',
                    bubbleFromUserBorderStyle: 'solid',
                    bubbleFromUserBorderWidth: 1,
                    bubbleFromUserTextColor: '#ffffff',
                    // Avatar
                    botAvatarImage: webChatButtonOptions.iconUrl,
                    botAvatarInitials: config.botName
                }, __assign({}, webChatOptions.styleOptions));
                // createStore.
                webChatOptions.store = createStore();
                return [2 /*return*/, config];
        }
    });
}); };
var get = function () { return config; };
var randomUserID = function () { return "r_" + Math.random().toString(36).substr(2, 10); };
/** 檢查 WebSocket 是否有通 (return true = open) */
var checkWebSocketIsOpen = function (domain) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                if (!WebSocket)
                    return resolve(false);
                var ws = new WebSocket(domain.replace('http', 'ws'));
                ws.onopen = function () {
                    ws.close();
                    resolve(true);
                };
                ws.onerror = function (evt) { resolve(false); };
            })];
    });
}); };
export default {
    initial: initial,
    get: get
};
//# sourceMappingURL=Configuration.js.map