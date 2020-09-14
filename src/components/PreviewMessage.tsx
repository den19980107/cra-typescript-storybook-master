import React, { Component } from 'react';
import '../styles/fabric-icons-inline.css';
import '../styles/PreviewMessage.css'

interface PreviewMessageProps {
   message: string,
   maximizeButton: Function
}

interface PreviewMessageState {
   isVisable: boolean
}

class PreviewMessage extends Component<PreviewMessageProps, PreviewMessageState> {
   constructor(props: Readonly<PreviewMessageProps>) {
      super(props)
      this.checkIsVisable = this.checkIsVisable.bind(this);
      this.closeMessage = this.closeMessage.bind(this);
      this.maximizeButton = this.maximizeButton.bind(this);

      this.state = {
         isVisable: true
      }
   }

   checkIsVisable() {
      if (this.state.isVisable && this.props.message && this.props.message != "") {
         return "flex";
      }
      
      return "none";
   }

   closeMessage(e: any) {
      e.preventDefault();
      this.setState({ isVisable: false })
   }

   /** 觸發聊天室窗開啟功能 */
   maximizeButton() {
      this.props.maximizeButton();
   }

   /** 控制預覽視窗關閉按鈕顯示 */
   handleCloseButtonVisbility(e: any) {
      document.getElementById('close-btn').style.display = (e.type === 'mouseenter') ? 'block' : 'none';
   }

   componentWillReceiveProps() {
      this.setState({ isVisable: true })
   }

   render() {
      const previewMsgStyle = {
         display: this.checkIsVisable(), 
         position: "absolute", 
         right: "125px", 
         bottom: "35px", 
         width: "350px", 
         justifyContent: "flex-end"
      } as React.CSSProperties;

      const buttonStyle = {
         display: 'none'
      };

      return (
         <div style={previewMsgStyle} onMouseEnter={this.handleCloseButtonVisbility} onMouseLeave={this.handleCloseButtonVisbility}>
            <button id="close-btn" onClick={this.closeMessage} style={buttonStyle}>
               <div id="close-btn-background">
                  <span className="ms-Icon ms-Icon--Cancel" id="close-btn-icon"></span>
               </div>
            </button>
            <div id="message-wrapper" onClick={this.maximizeButton}>
               <span className="message-box-bump"></span>
               <div className="message-box">
                  <div className="message">
                     <span>{this.props.message}</span>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default PreviewMessage;