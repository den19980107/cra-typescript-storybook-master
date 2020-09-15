var conversationIdKey = 'GSSWebChat_ConversationId';
var userIdKey = 'GSSWebChat_UserId';
var getUserId = function () { return sessionStorage.getItem(userIdKey); };
var setUserId = function (id) { return sessionStorage.setItem(userIdKey, id); };
var getConversationId = function () { return sessionStorage.getItem(conversationIdKey); };
var setConversationId = function (id) { return sessionStorage.setItem(conversationIdKey, id); };
var clear = function () {
    sessionStorage.removeItem(conversationIdKey);
    sessionStorage.removeItem(userIdKey);
};
export default {
    getUserId: getUserId,
    setUserId: setUserId,
    getConversationId: getConversationId,
    setConversationId: setConversationId,
    clear: clear
};
//# sourceMappingURL=Storage.js.map