import React from 'react';
interface UnreadTagProps {
    firstUnreadId: string;
    lastHistoryId: string;
}
interface UnreadTagState {
    visible: boolean;
}
export default class extends React.Component<UnreadTagProps, UnreadTagState> {
    unreadTagDomRef: React.RefObject<HTMLDivElement>;
    constructor(props: Readonly<UnreadTagProps>);
    componentDidMount(): void;
    toogle(display: boolean): this;
    moveToBottom(): this;
    scrollToTag(immediatelyInvoked: boolean): this;
    render(): JSX.Element;
}
export {};
