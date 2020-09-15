"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Utils = exports.Components = void 0;

var _Storage = _interopRequireDefault(require("./utils/Storage"));

var _Store = _interopRequireDefault(require("./utils/Store"));

var _WebChatToggleStateObservable = _interopRequireWildcard(require("./utils/WebChatToggleStateObservable"));

var _DirectLine = _interopRequireDefault(require("./utils/DirectLine"));

var _Configuration = _interopRequireDefault(require("./utils/Configuration"));

var _BasicWebChatComponent = _interopRequireDefault(require("./components/BasicWebChatComponent"));

var _WebChat = _interopRequireDefault(require("./components/WebChat"));

var _MinimizableWebChat = _interopRequireDefault(require("./components/MinimizableWebChat"));

var _createBasicWebChat = _interopRequireDefault(require("./createBasicWebChat"));

var _createMinimizableWebChat = _interopRequireDefault(require("./createMinimizableWebChat"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Components = {
  BasicWebChatComponent: _BasicWebChatComponent.default,
  WebChat: _WebChat.default,
  MinimizableWebChat: _MinimizableWebChat.default
};
exports.Components = Components;
var Utils = {
  Storage: _Storage.default,
  Store: _Store.default,
  WebChatToggleStateObservable: _objectSpread(_objectSpread({}, _WebChatToggleStateObservable.default), {}, {
    notify: _WebChatToggleStateObservable.notify
  }),
  DirectLine: _DirectLine.default,
  Configuration: _Configuration.default
};
exports.Utils = Utils;
window.GSSWebChat = {
  createBasicWebChat: _createBasicWebChat.default,
  createMinimizableWebChat: _createMinimizableWebChat.default,
  clearStorage: _Storage.default.clear
};
//# sourceMappingURL=index.js.map