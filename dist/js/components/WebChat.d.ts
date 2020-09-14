import { ReactElement } from 'react';
import '../styles/WebChat.css';
interface Props {
    className?: string;
    config: GSSWebChat.IWebChatConfig;
    directLine: BotFrameworkWebChat.IDirectLine;
}
export default function WebChat({ className, config, directLine }: Props): ReactElement;
export {};
