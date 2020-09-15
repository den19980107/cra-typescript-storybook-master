"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var conversationIdKey = 'GSSWebChat_ConversationId';
var userIdKey = 'GSSWebChat_UserId';

var getUserId = function getUserId() {
  return sessionStorage.getItem(userIdKey);
};

var setUserId = function setUserId(id) {
  return sessionStorage.setItem(userIdKey, id);
};

var getConversationId = function getConversationId() {
  return sessionStorage.getItem(conversationIdKey);
};

var setConversationId = function setConversationId(id) {
  return sessionStorage.setItem(conversationIdKey, id);
};

var clear = function clear() {
  sessionStorage.removeItem(conversationIdKey);
  sessionStorage.removeItem(userIdKey);
};

var _default = {
  getUserId: getUserId,
  setUserId: setUserId,
  getConversationId: getConversationId,
  setConversationId: setConversationId,
  clear: clear
};
exports.default = _default;
//# sourceMappingURL=Storage.js.map