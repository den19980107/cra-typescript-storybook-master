declare const createDirectLine: (directLineOptions: GSSWebChat.IDirectLineOptions) => Promise<BotFrameworkWebChat.IDirectLine>;
declare const getDirectLine: () => BotFrameworkWebChat.IDirectLine;
declare const endDirectLine: () => void;
declare const _default: {
    getWatermark: () => number;
    addMembers: (members: GSSWebChat.IMember[], next: Function) => void;
    removeMembers: (members: GSSWebChat.IMember[], next: Function) => void;
    addCurrentUser: (next: Function) => void;
    removeCurrentUser: (next: Function) => void;
    createDirectLine: (directLineOptions: GSSWebChat.IDirectLineOptions) => Promise<BotFrameworkWebChat.IDirectLine>;
};
export default _default;
export { createDirectLine, getDirectLine, endDirectLine };
