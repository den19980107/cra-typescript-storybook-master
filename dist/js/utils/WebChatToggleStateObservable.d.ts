declare const notify: (notifyState: string) => void;
declare const _default: {
    getState: () => string;
    subscribe: (f: (s: string) => void) => number;
    unsubscribe: (f: (s: string) => void) => void;
};
export default _default;
export { notify };
