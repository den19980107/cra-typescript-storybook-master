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
import Configuration from "./Configuration";
import { createDirectLine as BotFrameworkWebChat_createDirectLine } from 'botframework-webchat';
var directLine = null;
var createDirectLine = function (directLineOptions) { return __awaiter(void 0, void 0, void 0, function () {
    var url, res, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!directLineOptions.token) return [3 /*break*/, 1];
                directLine = BotFrameworkWebChat_createDirectLine(directLineOptions);
                return [3 /*break*/, 4];
            case 1:
                url = directLineOptions.domain + '/tokens/generate/' + directLineOptions.conversationId;
                return [4 /*yield*/, fetch(url, {
                        method: 'POST',
                        body: JSON.stringify({ userId: Configuration.get().userId }),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    })];
            case 2:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 3:
                token = (_a.sent()).token;
                directLine = BotFrameworkWebChat_createDirectLine(__assign(__assign({}, directLineOptions), { token: token }));
                _a.label = 4;
            case 4:
                console.log('conversationId: ' + directLine.conversationId);
                console.log('createDirectLine');
                return [2 /*return*/, directLine];
        }
    });
}); };
var getDirectLine = function () { return directLine; };
var endDirectLine = function () {
    directLine && directLine.end();
    directLine = null;
};
var getWatermark = function () { return directLine && directLine.watermark || 0; };
/* post activity */
//Activity types: https://docs.microsoft.com/zh-tw/azure/bot-service/dotnet/bot-builder-dotnet-activities?view=azure-bot-service-3.0
var addCurrentUser = function (next) {
    var config = Configuration.get();
    directLine && directLine.postActivity({
        from: { id: config.userId, name: config.userName },
        membersAdded: [{ id: config.userId }],
        type: 'conversationUpdate'
    }).subscribe({
        next: function (id) { return next && next(id); },
        error: function (err) { return console.log("Oops...addCurrentUser: " + err); },
        complete: function () { return console.log('addCurrentUser complete.'); }
    });
};
var removeCurrentUser = function (next) {
    var config = Configuration.get();
    directLine && directLine.postActivity({
        from: { id: config.userId, name: config.userName },
        membersRemoved: [{ id: config.userId }],
        type: 'conversationUpdate'
    }).subscribe({
        next: function (id) { return next && next(id); },
        error: function (err) { return console.log("Oops...removeMembers: " + err); },
        complete: function () { return console.log('removeMembers complete.'); }
    });
};
var addMembers = function (members, next) {
    var config = Configuration.get();
    directLine && directLine.postActivity({
        from: { id: config.userId, name: config.userName },
        membersAdded: members,
        type: 'conversationUpdate'
    }).subscribe({
        next: function (id) { return next && next(id); },
        error: function (err) { return console.log("Oops...addMembers: " + err); },
        complete: function () { return console.log('addMembers complete.'); }
    });
};
var removeMembers = function (members, next) {
    var config = Configuration.get();
    directLine && directLine.postActivity({
        from: { id: config.userId, name: config.userName },
        membersRemoved: members,
        type: 'conversationUpdate'
    }).subscribe({
        next: function (id) { return next && next(id); },
        error: function (err) { return console.log("Oops...removeMembers: " + err); },
        complete: function () { return console.log('removeMembers complete.'); }
    });
};
export default {
    getWatermark: getWatermark,
    addMembers: addMembers,
    removeMembers: removeMembers,
    addCurrentUser: addCurrentUser,
    removeCurrentUser: removeCurrentUser
};
export { createDirectLine, getDirectLine, endDirectLine };
//# sourceMappingURL=DirectLine.js.map