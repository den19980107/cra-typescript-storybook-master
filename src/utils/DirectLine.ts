import Configuration from "./Configuration"

let directLine: BotFrameworkWebChat.IDirectLine = null

const createDirectLine = async (directLineOptions: GSSWebChat.IDirectLineOptions): Promise<BotFrameworkWebChat.IDirectLine> => {
    if (directLineOptions.token) {
        directLine = window.WebChat.createDirectLine(directLineOptions)
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

        directLine = window.WebChat.createDirectLine({ ...directLineOptions, token })
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
    const currentUserId = Configuration.get().userId

    directLine && directLine.postActivity({
        from: { id: currentUserId },
        membersAdded: [{ id: currentUserId }],
        type: 'conversationUpdate'
    }).subscribe({
        next: (id: any) => next && next(id),
        error: (err: any) => console.log(`Oops...addCurrentUser: ${err}`),
        complete: () => console.log('addCurrentUser complete.')
    })
}

const removeCurrentUser = (next: Function) => {
    const currentUserId = Configuration.get().userId

    directLine && directLine.postActivity({
        from: { id: currentUserId },
        membersRemoved: [{ id: currentUserId }],
        type: 'conversationUpdate'
    }).subscribe({
        next: (id: any) => next && next(id),
        error: (err: any) => console.log(`Oops...removeMembers: ${err}`),
        complete: () => console.log('removeMembers complete.')
    })
}

const addMembers = (members: Array<GSSWebChat.IMember>, next: Function) => {
    directLine && directLine.postActivity({
        from: { id: Configuration.get().userId },
        membersAdded: members,
        type: 'conversationUpdate'
    }).subscribe({
        next: (id: any) => next && next(id),
        error: (err: any) => console.log(`Oops...addMembers: ${err}`),
        complete: () => console.log('addMembers complete.')
    })
}

const removeMembers = (members: Array<GSSWebChat.IMember>, next: Function) => {
    directLine && directLine.postActivity({
        from: { id: Configuration.get().userId },
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
    removeCurrentUser,
    createDirectLine
}

export {
    createDirectLine,
    getDirectLine,
    endDirectLine
}