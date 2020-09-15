import React, { ReactElement, useState, useEffect } from 'react'
import WebChat from './WebChat'
import Configuration from '../utils/Configuration'
import { createDirectLine } from '../utils/DirectLine'

interface Props {
    rawConfig: GSSWebChat.IWebChatConfig
}

export default function BasicWebChatComponent({ rawConfig }: Props): ReactElement {
    const [directLine, setDirectline] = useState(null)

    useEffect(() => {
        if (!directLine) {
            initialDirectLine()
        }
    }, [directLine])

    const generateDirectLine = async (rawConfig: GSSWebChat.IWebChatConfig): Promise<BotFrameworkWebChat.IDirectLine> => {
        const config = await Configuration.initial(rawConfig)
        const directline = await createDirectLine(config.directLineOptions)
        return directline
    }

    const initialDirectLine = async () => {
        const directline = await generateDirectLine(rawConfig)
        setDirectline(directline)
    }

    return <WebChat
        config={rawConfig}
        directLine={directLine}
    ></WebChat>
}
