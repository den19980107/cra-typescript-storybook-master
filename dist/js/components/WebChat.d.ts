import { ReactElement } from 'react';
interface Props {
    className?: string;
    config: GSSWebChat.IWebChatConfig;
    directLine: BotFrameworkWebChat.IDirectLine;
}
export default function WebChat({ config, directLine, className }: Props): ReactElement;
export {};
