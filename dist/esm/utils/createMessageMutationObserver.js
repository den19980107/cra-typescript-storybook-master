import { getContainer } from "./Container";
export default function createMessageMutationObserver(mutationObserver) {
  // select the target node
  const target = getContainer().querySelector('div.unread-tag').closest('ul'); // create an observer instance

  const observer = new MutationObserver(function (mutations) {
    mutations.filter(x => x.addedNodes.length > 0).map(x => Array.prototype.slice.call(x.addedNodes)).reduce((acc, val) => acc.concat(val), []).forEach(n => mutationObserver(n, observer));
  }); // configuration of the observer:

  const config = {
    childList: true
  }; // pass in the target node, as well as the observer options

  observer.observe(target, config);
}
//# sourceMappingURL=createMessageMutationObserver.js.map