function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Configuration from "./Configuration";
import { createDirectLine as BotFrameworkWebChat_createDirectLine } from 'botframework-webchat';
let directLine = null;

const createDirectLine = async directLineOptions => {
  if (directLineOptions.token) {
    directLine = BotFrameworkWebChat_createDirectLine(directLineOptions);
  } else {
    //fetchToken
    const url = directLineOptions.domain + '/tokens/generate/' + directLineOptions.conversationId;
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        userId: Configuration.get().userId
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    const {
      token
    } = await res.json();
    directLine = BotFrameworkWebChat_createDirectLine(_objectSpread(_objectSpread({}, directLineOptions), {}, {
      token
    }));
  }

  console.log('conversationId: ' + directLine.conversationId);
  console.log('createDirectLine');
  return directLine;
};

const getDirectLine = () => directLine;

const endDirectLine = () => {
  directLine && directLine.end();
  directLine = null;
};

const getWatermark = () => directLine && directLine.watermark || 0;
/* post activity */
//Activity types: https://docs.microsoft.com/zh-tw/azure/bot-service/dotnet/bot-builder-dotnet-activities?view=azure-bot-service-3.0


const addCurrentUser = next => {
  const config = Configuration.get();
  directLine && directLine.postActivity({
    from: {
      id: config.userId,
      name: config.userName
    },
    membersAdded: [{
      id: config.userId
    }],
    type: 'conversationUpdate'
  }).subscribe({
    next: id => next && next(id),
    error: err => console.log(`Oops...addCurrentUser: ${err}`),
    complete: () => console.log('addCurrentUser complete.')
  });
};

const removeCurrentUser = next => {
  const config = Configuration.get();
  directLine && directLine.postActivity({
    from: {
      id: config.userId,
      name: config.userName
    },
    membersRemoved: [{
      id: config.userId
    }],
    type: 'conversationUpdate'
  }).subscribe({
    next: id => next && next(id),
    error: err => console.log(`Oops...removeMembers: ${err}`),
    complete: () => console.log('removeMembers complete.')
  });
};

const addMembers = (members, next) => {
  const config = Configuration.get();
  directLine && directLine.postActivity({
    from: {
      id: config.userId,
      name: config.userName
    },
    membersAdded: members,
    type: 'conversationUpdate'
  }).subscribe({
    next: id => next && next(id),
    error: err => console.log(`Oops...addMembers: ${err}`),
    complete: () => console.log('addMembers complete.')
  });
};

const removeMembers = (members, next) => {
  const config = Configuration.get();
  directLine && directLine.postActivity({
    from: {
      id: config.userId,
      name: config.userName
    },
    membersRemoved: members,
    type: 'conversationUpdate'
  }).subscribe({
    next: id => next && next(id),
    error: err => console.log(`Oops...removeMembers: ${err}`),
    complete: () => console.log('removeMembers complete.')
  });
};

export default {
  getWatermark,
  addMembers,
  removeMembers,
  addCurrentUser,
  removeCurrentUser
};
export { createDirectLine, getDirectLine, endDirectLine };
//# sourceMappingURL=DirectLine.js.map