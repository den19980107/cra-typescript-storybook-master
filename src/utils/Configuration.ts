import { createStore } from './Store'
import Storage from './Storage'
import jwtDecode from 'jwt-decode';

let config: GSSWebChat.IWebChatConfig

const initial = async (rawConfig: GSSWebChat.IWebChatConfig): Promise<GSSWebChat.IWebChatConfig> => {
    config = { ...rawConfig }

    const directLineOptions = config.directLineOptions = { ...config.directLineOptions }
    const decoded: any = (directLineOptions.token) ? jwtDecode(directLineOptions.token) : {}

    config.botId = (decoded.botId || config.botId).toLowerCase()
    config.userId = decoded.userId || config.userId || Storage.getUserId() || randomUserID()
    config.userName = config.userName || ''

    directLineOptions.domain = decoded.origin || directLineOptions.domain
    const directLinePath = directLineOptions.domain.endsWith('/directline') ? '' : '/directline'
    directLineOptions.domain += `${directLinePath}/${config.botId}`
    directLineOptions.webSocket = !(directLineOptions.webSocket === false) && await checkWebSocketIsOpen(directLineOptions.domain)
    directLineOptions.pollingAutoClose = (directLineOptions.pollingAutoClose === true)
    directLineOptions.conversationId = decoded.conversationId || directLineOptions.conversationId || Storage.getConversationId() || ''
    directLineOptions.watermark = 0

    if (!directLineOptions.webSocket && !directLineOptions.pollingAutoClose) {
        directLineOptions.watermark = -1 //polling watermark 設成 -1 才會先取歷史訊息
    }

    const webChatOptions = config.webChatOptions = { ...config.webChatOptions } as GSSWebChat.IWebChatOptions
    const webChatButtonOptions = webChatOptions.buttonOptions = { ...webChatOptions.buttonOptions } as GSSWebChat.IWebChatButtonOptions
    webChatButtonOptions.iconUrl = webChatButtonOptions.iconUrl || 'https://bot-framework.azureedge.net/bot-icons-v1/bot-framework-default-7.png'
    webChatButtonOptions.visible = !(webChatButtonOptions.visible === false)
    webChatButtonOptions.displayOnTheSide = (webChatButtonOptions.displayOnTheSide === true)

    const webChatHeaderOptions = webChatOptions.headerOptions = { ...webChatOptions.headerOptions } as GSSWebChat.IWebChatHeaderOptions

    // default style.
    const styleOptions = webChatOptions.styleOptions = Object.assign({
        // Bubble
        bubbleBackground: '#eceff1',
        bubbleBorderColor: '#E6E6E6',
        bubbleBorderRadius: '0px 12px 12px 12px',
        bubbleBorderStyle: 'solid',
        bubbleBorderWidth: 1,
        bubbleFromUserBackground: '#0078d7',
        bubbleFromUserBorderColor: '#E6E6E6',
        bubbleFromUserBorderRadius: '12px 0px 12px 12px',
        bubbleFromUserBorderStyle: 'solid',
        bubbleFromUserBorderWidth: 1,
        bubbleFromUserTextColor: '#ffffff',

        // Avatar
        botAvatarImage: webChatButtonOptions.iconUrl,
        botAvatarInitials: config.botName
    }, { ...webChatOptions.styleOptions })

    // createStore.
    webChatOptions.store = createStore()

    return config
}

const get = () => config

const randomUserID = (): string => `r_${Math.random().toString(36).substr(2, 10)}`

/** 檢查 WebSocket 是否有通 (return true = open) */
const checkWebSocketIsOpen = async (domain: string): Promise<boolean> => {
    return new Promise(function (resolve, reject) {
        if (!WebSocket) return resolve(false)

        const ws = new WebSocket(domain.replace('http', 'ws'))

        ws.onopen = function () {
            ws.close()
            resolve(true)
        }
        ws.onerror = function (evt) { resolve(false) }
    })
}

export default {
    initial,
    get
}