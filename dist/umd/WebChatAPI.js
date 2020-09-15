(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./utils/Container", "./utils/DirectLine", "./utils/Store", "./utils/createMessageMutationObserver"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./utils/Container"), require("./utils/DirectLine"), require("./utils/Store"), require("./utils/createMessageMutationObserver"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Container, global.DirectLine, global.Store, global.createMessageMutationObserver);
    global.undefined = mod.exports;
  }
})(this, function (exports, _Container, _DirectLine, _Store, _createMessageMutationObserver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Container2 = _interopRequireDefault(_Container);

  var _DirectLine2 = _interopRequireDefault(_DirectLine);

  var _Store2 = _interopRequireDefault(_Store);

  var _createMessageMutationObserver2 = _interopRequireDefault(_createMessageMutationObserver);

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
  }

  exports.default = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _Container2.default), _DirectLine2.default), _Store2.default), {}, {
    createMessageMutationObserver: _createMessageMutationObserver2.default
  });
});
//# sourceMappingURL=WebChatAPI.js.map