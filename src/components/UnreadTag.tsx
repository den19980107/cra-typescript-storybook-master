import React from 'react'
import Store from '../utils/Store'
import createMessageMutationObserver from '../utils/createMessageMutationObserver'

interface UnreadTagProps {
    firstUnreadId: string,
    lastHistoryId: string
}

interface UnreadTagState {
    visible: boolean
}

export default class extends React.Component<UnreadTagProps, UnreadTagState> {
    unreadTagDomRef: React.RefObject<HTMLDivElement>

    constructor(props: Readonly<UnreadTagProps>) {
        super(props)
        console.log('UnreadTag constructor.')

        this.unreadTagDomRef = React.createRef()

        this.toogle = this.toogle.bind(this)
        this.moveToBottom = this.moveToBottom.bind(this)
        this.scrollToTag = this.scrollToTag.bind(this)

        this.state = {
            visible: false
        }
    }

    componentDidMount() {
        const that = this
        let { firstUnreadId, lastHistoryId } = this.props

        if (firstUnreadId) {
            // 使用 MutationObserver 當 dom rendered 後再調整 scrollbar。
            createMessageMutationObserver((mutation: HTMLLIElement, observer: MutationObserver) => {
                if (mutation.hasChildNodes && mutation.firstElementChild.getAttribute('data-key') === this.props.lastHistoryId) {
                    observer.disconnect()
                    this.scrollToTag(false)
                }
            })
        }

        Store.ActionObservable.subscribe(function subscribe(action) {
            console.log('UnreadTag ActionObservable.')

            if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
                const { activity } = action.payload

                if (firstUnreadId && activity.id === firstUnreadId) {
                    that.moveToBottom().toogle(true)
                    firstUnreadId = null
                    lastHistoryId = null
                }
                else if (lastHistoryId && activity.id === lastHistoryId) {
                    setTimeout(() => that.moveToBottom())
                    lastHistoryId = null
                }

                if (!firstUnreadId && !lastHistoryId) {
                    Store.ActionObservable.unsubscribe(subscribe)
                }
            }
        })
    }

    toogle(display: boolean) {
        this.setState({ visible: display })

        return this
    }

    moveToBottom() {
        const unreadTag = this.unreadTagDomRef.current
        console.log('moveToBottom')
        unreadTag.closest('ul').append(unreadTag.closest('li'))

        return this
    }

    scrollToTag(immediatelyInvoked: boolean) {
        const unreadTag = this.unreadTagDomRef.current
        const logContainer = unreadTag.parentElement.closest('div')

        //判斷是否有 scrollbar
        if (logContainer.scrollHeight > logContainer.clientHeight) {
            if (immediatelyInvoked) {
                scroll()
            }
            else {
                logContainer.addEventListener('scroll', function waitHistoryLoaded() {
                    // 載完對話後，webchat 會做 scrollToEnd，這時候再將 scrollbar 定位到 unread tag。
                    if (logContainer.clientHeight + logContainer.scrollTop >= logContainer.scrollHeight) {
                        scroll()
                        logContainer.removeEventListener('scroll', waitHistoryLoaded)
                    }
                })
            }
        }

        function scroll() {
            logContainer.scrollTop = Math.max(unreadTag.offsetTop - 30, 0)
        }

        return this
    }

    //tag style ref: 
    //'border:2px #ccc solidborder-radius:10pxwidth:90%height: 20pxbackground-color:#eeetext-align: centermargin: auto'

    render() {
        const { visible } = this.state

        return <div ref={this.unreadTagDomRef} className="unread-tag" hidden={!visible}>以下爲尚未閱讀的訊息</div>
    }
}