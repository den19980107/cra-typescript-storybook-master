/// <reference types="react" />
declare const getRefObject: <T extends {}>(target: import("react").RefObject<T>) => Promise<T>;
export default getRefObject;
