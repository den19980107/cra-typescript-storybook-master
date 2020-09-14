(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.undefined = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
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

  exports.default = {
    getUserId,
    setUserId,
    getConversationId,
    setConversationId,
    clear
  };
});
//# sourceMappingURL=Storage.js.map