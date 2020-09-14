import { Component } from 'react';
import '../styles/fabric-icons-inline.css';
import '../styles/PreviewMessage.css';
interface PreviewMessageProps {
    message: string;
    maximizeButton: Function;
}
interface PreviewMessageState {
    isVisable: boolean;
}
declare class PreviewMessage extends Component<PreviewMessageProps, PreviewMessageState> {
    constructor(props: Readonly<PreviewMessageProps>);
    checkIsVisable(): "flex" | "none";
    closeMessage(e: any): void;
    /** 觸發聊天室窗開啟功能 */
    maximizeButton(): void;
    /** 控制預覽視窗關閉按鈕顯示 */
    handleCloseButtonVisbility(e: any): void;
    componentWillReceiveProps(): void;
    render(): JSX.Element;
}
export default PreviewMessage;
