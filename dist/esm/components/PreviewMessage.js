import _pt from "prop-types";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import '../styles/fabric-icons-inline.css';
import '../styles/PreviewMessage.css';

class PreviewMessage extends Component {
  constructor(props) {
    super(props);
    this.checkIsVisable = this.checkIsVisable.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
    this.maximizeButton = this.maximizeButton.bind(this);
    this.state = {
      isVisable: true
    };
  }

  checkIsVisable() {
    if (this.state.isVisable && this.props.message && this.props.message != "") {
      return "flex";
    }

    return "none";
  }

  closeMessage(e) {
    e.preventDefault();
    this.setState({
      isVisable: false
    });
  }
  /** 觸發聊天室窗開啟功能 */


  maximizeButton() {
    this.props.maximizeButton();
  }
  /** 控制預覽視窗關閉按鈕顯示 */


  handleCloseButtonVisbility(e) {
    document.getElementById('close-btn').style.display = e.type === 'mouseenter' ? 'block' : 'none';
  }

  componentWillReceiveProps() {
    this.setState({
      isVisable: true
    });
  }

  render() {
    const previewMsgStyle = {
      display: this.checkIsVisable(),
      position: "absolute",
      right: "125px",
      bottom: "35px",
      width: "350px",
      justifyContent: "flex-end"
    };
    const buttonStyle = {
      display: 'none'
    };
    return /*#__PURE__*/React.createElement("div", {
      style: previewMsgStyle,
      onMouseEnter: this.handleCloseButtonVisbility,
      onMouseLeave: this.handleCloseButtonVisbility
    }, /*#__PURE__*/React.createElement("button", {
      id: "close-btn",
      onClick: this.closeMessage,
      style: buttonStyle
    }, /*#__PURE__*/React.createElement("div", {
      id: "close-btn-background"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ms-Icon ms-Icon--Cancel",
      id: "close-btn-icon"
    }))), /*#__PURE__*/React.createElement("div", {
      id: "message-wrapper",
      onClick: this.maximizeButton
    }, /*#__PURE__*/React.createElement("span", {
      className: "message-box-bump"
    }), /*#__PURE__*/React.createElement("div", {
      className: "message-box"
    }, /*#__PURE__*/React.createElement("div", {
      className: "message"
    }, /*#__PURE__*/React.createElement("span", null, this.props.message)))));
  }

}

_defineProperty(PreviewMessage, "propTypes", {
  message: _pt.string.isRequired
});

export default PreviewMessage;
//# sourceMappingURL=PreviewMessage.js.map