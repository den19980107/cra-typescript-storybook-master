"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createMessageMutationObserver;

var _Container = require("./Container");

function createMessageMutationObserver(mutationObserver) {
  // select the target node
  var target = (0, _Container.getContainer)().querySelector('div.unread-tag').closest('ul'); // create an observer instance

  var observer = new MutationObserver(function (mutations) {
    mutations.filter(function (x) {
      return x.addedNodes.length > 0;
    }).map(function (x) {
      return Array.prototype.slice.call(x.addedNodes);
    }).reduce(function (acc, val) {
      return acc.concat(val);
    }, []).forEach(function (n) {
      return mutationObserver(n, observer);
    });
  }); // configuration of the observer:

  var config = {
    childList: true
  }; // pass in the target node, as well as the observer options

  observer.observe(target, config);
}
//# sourceMappingURL=createMessageMutationObserver.js.map