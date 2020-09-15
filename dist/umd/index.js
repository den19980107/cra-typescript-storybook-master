(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./utils/Storage", "./utils/Store", "./utils/WebChatToggleStateObservable", "./utils/DirectLine", "./utils/Configuration", "./components/BasicWebChatComponent", "./components/WebChat", "./components/MinimizableWebChat", "./createBasicWebChat", "./createMinimizableWebChat"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./utils/Storage"), require("./utils/Store"), require("./utils/WebChatToggleStateObservable"), require("./utils/DirectLine"), require("./utils/Configuration"), require("./components/BasicWebChatComponent"), require("./components/WebChat"), require("./components/MinimizableWebChat"), require("./createBasicWebChat"), require("./createMinimizableWebChat"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Storage, global.Store, global.WebChatToggleStateObservable, global.DirectLine, global.Configuration, global.BasicWebChatComponent, global.WebChat, global.MinimizableWebChat, global.createBasicWebChat, global.createMinimizableWebChat);
    global.undefined = mod.exports;
  }
})(this, function (exports, _Storage, _Store, _WebChatToggleStateObservable, _DirectLine, _Configuration, _BasicWebChatComponent, _WebChat, _MinimizableWebChat, _createBasicWebChat, _createMinimizableWebChat) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Utils = exports.Components = undefined;

  var _Storage2 = _interopRequireDefault(_Storage);

  var _Store2 = _interopRequireDefault(_Store);

  var _WebChatToggleStateObservable2 = _interopRequireDefault(_WebChatToggleStateObservable);

  var _DirectLine2 = _interopRequireDefault(_DirectLine);

  var _Configuration2 = _interopRequireDefault(_Configuration);

  var _BasicWebChatComponent2 = _interopRequireDefault(_BasicWebChatComponent);

  var _WebChat2 = _interopRequireDefault(_WebChat);

  var _MinimizableWebChat2 = _interopRequireDefault(_MinimizableWebChat);

  var _createBasicWebChat2 = _interopRequireDefault(_createBasicWebChat);

  var _createMinimizableWebChat2 = _interopRequireDefault(_createMinimizableWebChat);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  } //ES5 Polyfill.
  // import 'core-js/features/string/ends-with';
  //DOM elements Polyfill.
  // import './polyfill/domElementsPolyfill';
  //Utils.


  const Components = {
    BasicWebChatComponent: _BasicWebChatComponent2.default,
    WebChat: _WebChat2.default,
    MinimizableWebChat: _MinimizableWebChat2.default
  };
  const Utils = {
    Storage: _Storage2.default,
    Store: _Store2.default,
    WebChatToggleStateObservable: _objectSpread(_objectSpread({}, _WebChatToggleStateObservable2.default), {}, {
      notify: _WebChatToggleStateObservable.notify
    }),
    DirectLine: _DirectLine2.default,
    Configuration: _Configuration2.default
  };
  exports.Components = Components;
  exports.Utils = Utils;
  window.GSSWebChat = {
    createBasicWebChat: _createBasicWebChat2.default,
    createMinimizableWebChat: _createMinimizableWebChat2.default,
    clearStorage: _Storage2.default.clear
  };
});
//# sourceMappingURL=index.js.map