const conversationIdKey = 'GSSWebChat_ConversationId';
const userIdKey = 'GSSWebChat_UserId';

const getUserId = () => sessionStorage.getItem(userIdKey);

const setUserId = id => sessionStorage.setItem(userIdKey, id);

const getConversationId = () => sessionStorage.getItem(conversationIdKey);

const setConversationId = id => sessionStorage.setItem(conversationIdKey, id);

const clear = () => {
  sessionStorage.removeItem(conversationIdKey);
  sessionStorage.removeItem(userIdKey);
};

export default {
  getUserId,
  setUserId,
  getConversationId,
  setConversationId,
  clear
};
//# sourceMappingURL=Storage.js.map