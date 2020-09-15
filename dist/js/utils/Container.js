"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setContainer = exports.getContainer = exports.default = void 0;
var container = null; //TODO 多個 webchat 就要支援多個 container

var getContainer = function getContainer() {
  return container;
};

exports.getContainer = getContainer;

var setContainer = function setContainer(elem) {
  return container = elem;
};

exports.setContainer = setContainer;

var isWebChatVisible = function isWebChatVisible() {
  var webchat = container.querySelector('.web-chat');
  return !!(webchat && (webchat.offsetWidth || webchat.offsetHeight || webchat.getClientRects().length));
};

var _default = {
  isWebChatVisible: isWebChatVisible
};
exports.default = _default;
//# sourceMappingURL=Container.js.map