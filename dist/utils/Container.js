var container = null;
//TODO 多個 webchat 就要支援多個 container
var getContainer = function () { return container; };
var setContainer = function (elem) { return container = elem; };
var isWebChatVisible = function () {
    var webchat = container.querySelector('.web-chat');
    return !!(webchat && (webchat.offsetWidth || webchat.offsetHeight || webchat.getClientRects().length));
};
export default {
    isWebChatVisible: isWebChatVisible
};
export { getContainer, setContainer };
//# sourceMappingURL=Container.js.map