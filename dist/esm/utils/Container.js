let container = null; //TODO 多個 webchat 就要支援多個 container

const getContainer = () => container;

const setContainer = elem => container = elem;

const isWebChatVisible = () => {
  const webchat = container.querySelector('.web-chat');
  return !!(webchat && (webchat.offsetWidth || webchat.offsetHeight || webchat.getClientRects().length));
};

export default {
  isWebChatVisible
};
export { getContainer, setContainer };
//# sourceMappingURL=Container.js.map