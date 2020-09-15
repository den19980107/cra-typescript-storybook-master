var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Container from './utils/Container';
import DirectLine from './utils/DirectLine';
import Store from './utils/Store';
import createMessageMutationObserver from './utils/createMessageMutationObserver';
export default __assign(__assign(__assign(__assign({}, Container), DirectLine), Store), { createMessageMutationObserver: createMessageMutationObserver });
//# sourceMappingURL=WebChatAPI.js.map