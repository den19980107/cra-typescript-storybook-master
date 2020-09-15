import Configuration from "./Configuration"
import { createDirectLine as BotFrameworkWebChat_createDirectLine } from 'botframework-webchat'
let directLine: BotFrameworkWebChat.IDirectLine = null

const createDirectLine = async (directLineOptions: GSSWebChat.IDirectLineOptions): Promise<BotFrameworkWebChat.IDirectLine> => {
    if (directLineOptions.token) {
        directLine = BotFrameworkWebChat_createDirectLine(directLineOptions)
    }
    else {
        //fetchToken
        const url = directLineOptions.domain + '/tokens/generate/' + directLineOptions.conversationId
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ userId: Configuration.get().userId }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        const { token } = await res.json()

        directLine = BotFrameworkWebChat_createDirectLine({ ...directLineOptions, token })
    }

    console.log('conversationId: ' + directLine.conversationId)
    console.log('createDirectLine')

    return directLine
}

const getDirectLine = () => directLine

const endDirectLine = () => {
    directLine && directLine.end()
    directLine = null
}

const getWatermark = () => directLine && directLine.watermark || 0

/* post activity */
//Activity types: https://docs.microsoft.com/zh-tw/azure/bot-service/dotnet/bot-builder-dotnet-activities?view=azure-bot-service-3.0

const addCurrentUser = (next: Function) => {
    const config = Configuration.get()

    directLine && directLine.postActivity({
        from: { id: config.userId, name: config.userName },
        membersAdded: [{ id: config.userId }],
        type: 'conversationUpdate'
    }).subscribe({
        next: (id: any) => next && next(id),
        error: (err: any) => console.log(`Oops...addCurrentUser: ${err}`),
        complete: () => console.log('addCurrentUser complete.')
    })
}

const removeCurrentUser = (next: Function) => {
    const config = Configuration.get()

    directLine && directLine.postActivity({
        from: { id: config.userId, name: config.userName },
        membersRemoved: [{ id: config.userId }],
        type: 'conversationUpdate'
    }).subscribe({
        next: (id: any) => next && next(id),
        error: (err: any) => console.log(`Oops...removeMembers: ${err}`),
        complete: () => console.log('removeMembers complete.')
    })
}

const addMembers = (members: Array<GSSWebChat.IMember>, next: Function) => {
    const config = Configuration.get()

    directLine && directLine.postActivity({
        from: { id: config.userId, name: config.userName },
        membersAdded: members,
        type: 'conversationUpdate'
    }).subscribe({
        next: (id: any) => next && next(id),
        error: (err: any) => console.log(`Oops...addMembers: ${err}`),
        complete: () => console.log('addMembers complete.')
    })
}

const removeMembers = (members: Array<GSSWebChat.IMember>, next: Function) => {
    const config = Configuration.get()

    directLine && directLine.postActivity({
        from: { id: config.userId, name: config.userName },
        membersRemoved: members,
        type: 'conversationUpdate'
    }).subscribe({
        next: (id: any) => next && next(id),
        error: (err: any) => console.log(`Oops...removeMembers: ${err}`),
        complete: () => console.log('removeMembers complete.')
    })
}

export default {
    getWatermark,
    addMembers,
    removeMembers,
    addCurrentUser,
    removeCurrentUser
}

export {
    createDirectLine,
    getDirectLine,
    endDirectLine
}