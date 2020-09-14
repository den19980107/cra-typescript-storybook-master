"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endDirectLine = exports.getDirectLine = exports.createDirectLine = exports.default = void 0;

var _Configuration = _interopRequireDefault(require("./Configuration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var directLine = null;

var createDirectLine = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(directLineOptions) {
    var url, res, _yield$res$json, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!directLineOptions.token) {
              _context.next = 4;
              break;
            }

            directLine = window.WebChat.createDirectLine(directLineOptions);
            _context.next = 13;
            break;

          case 4:
            //fetchToken
            url = directLineOptions.domain + '/tokens/generate/' + directLineOptions.conversationId;
            _context.next = 7;
            return fetch(url, {
              method: 'POST',
              body: JSON.stringify({
                userId: _Configuration.default.get().userId
              }),
              headers: new Headers({
                'Content-Type': 'application/json'
              })
            });

          case 7:
            res = _context.sent;
            _context.next = 10;
            return res.json();

          case 10:
            _yield$res$json = _context.sent;
            token = _yield$res$json.token;
            directLine = window.WebChat.createDirectLine(_objectSpread(_objectSpread({}, directLineOptions), {}, {
              token: token
            }));

          case 13:
            console.log('conversationId: ' + directLine.conversationId);
            console.log('createDirectLine');
            return _context.abrupt("return", directLine);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createDirectLine(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createDirectLine = createDirectLine;

var getDirectLine = function getDirectLine() {
  return directLine;
};

exports.getDirectLine = getDirectLine;

var endDirectLine = function endDirectLine() {
  directLine && directLine.end();
  directLine = null;
};

exports.endDirectLine = endDirectLine;

var getWatermark = function getWatermark() {
  return directLine && directLine.watermark || 0;
};
/* post activity */
//Activity types: https://docs.microsoft.com/zh-tw/azure/bot-service/dotnet/bot-builder-dotnet-activities?view=azure-bot-service-3.0


var addCurrentUser = function addCurrentUser(_next2) {
  var currentUserId = _Configuration.default.get().userId;

  directLine && directLine.postActivity({
    from: {
      id: currentUserId
    },
    membersAdded: [{
      id: currentUserId
    }],
    type: 'conversationUpdate'
  }).subscribe({
    next: function next(id) {
      return _next2 && _next2(id);
    },
    error: function error(err) {
      return console.log("Oops...addCurrentUser: ".concat(err));
    },
    complete: function complete() {
      return console.log('addCurrentUser complete.');
    }
  });
};

var removeCurrentUser = function removeCurrentUser(_next3) {
  var currentUserId = _Configuration.default.get().userId;

  directLine && directLine.postActivity({
    from: {
      id: currentUserId
    },
    membersRemoved: [{
      id: currentUserId
    }],
    type: 'conversationUpdate'
  }).subscribe({
    next: function next(id) {
      return _next3 && _next3(id);
    },
    error: function error(err) {
      return console.log("Oops...removeMembers: ".concat(err));
    },
    complete: function complete() {
      return console.log('removeMembers complete.');
    }
  });
};

var addMembers = function addMembers(members, _next4) {
  directLine && directLine.postActivity({
    from: {
      id: _Configuration.default.get().userId
    },
    membersAdded: members,
    type: 'conversationUpdate'
  }).subscribe({
    next: function next(id) {
      return _next4 && _next4(id);
    },
    error: function error(err) {
      return console.log("Oops...addMembers: ".concat(err));
    },
    complete: function complete() {
      return console.log('addMembers complete.');
    }
  });
};

var removeMembers = function removeMembers(members, _next5) {
  directLine && directLine.postActivity({
    from: {
      id: _Configuration.default.get().userId
    },
    membersRemoved: members,
    type: 'conversationUpdate'
  }).subscribe({
    next: function next(id) {
      return _next5 && _next5(id);
    },
    error: function error(err) {
      return console.log("Oops...removeMembers: ".concat(err));
    },
    complete: function complete() {
      return console.log('removeMembers complete.');
    }
  });
};

var _default = {
  getWatermark: getWatermark,
  addMembers: addMembers,
  removeMembers: removeMembers,
  addCurrentUser: addCurrentUser,
  removeCurrentUser: removeCurrentUser,
  createDirectLine: createDirectLine
};
exports.default = _default;
//# sourceMappingURL=DirectLine.js.map