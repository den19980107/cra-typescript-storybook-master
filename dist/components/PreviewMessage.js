var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { Component } from 'react';
import '../styles/fabric-icons-inline.css';
import '../styles/PreviewMessage.css';
var PreviewMessage = /** @class */ (function (_super) {
    __extends(PreviewMessage, _super);
    function PreviewMessage(props) {
        var _this = _super.call(this, props) || this;
        _this.checkIsVisable = _this.checkIsVisable.bind(_this);
        _this.closeMessage = _this.closeMessage.bind(_this);
        _this.maximizeButton = _this.maximizeButton.bind(_this);
        _this.state = {
            isVisable: true
        };
        return _this;
    }
    PreviewMessage.prototype.checkIsVisable = function () {
        if (this.state.isVisable && this.props.message && this.props.message != "") {
            return "flex";
        }
        return "none";
    };
    PreviewMessage.prototype.closeMessage = function (e) {
        e.preventDefault();
        this.setState({ isVisable: false });
    };
    /** 觸發聊天室窗開啟功能 */
    PreviewMessage.prototype.maximizeButton = function () {
        this.props.maximizeButton();
    };
    /** 控制預覽視窗關閉按鈕顯示 */
    PreviewMessage.prototype.handleCloseButtonVisbility = function (e) {
        document.getElementById('close-btn').style.display = (e.type === 'mouseenter') ? 'block' : 'none';
    };
    PreviewMessage.prototype.componentWillReceiveProps = function () {
        this.setState({ isVisable: true });
    };
    PreviewMessage.prototype.render = function () {
        var previewMsgStyle = {
            display: this.checkIsVisable(),
            position: "absolute",
            right: "125px",
            bottom: "35px",
            width: "350px",
            justifyContent: "flex-end"
        };
        var buttonStyle = {
            display: 'none'
        };
        return (React.createElement("div", { style: previewMsgStyle, onMouseEnter: this.handleCloseButtonVisbility, onMouseLeave: this.handleCloseButtonVisbility },
            React.createElement("button", { id: "close-btn", onClick: this.closeMessage, style: buttonStyle },
                React.createElement("div", { id: "close-btn-background" },
                    React.createElement("span", { className: "ms-Icon ms-Icon--Cancel", id: "close-btn-icon" }))),
            React.createElement("div", { id: "message-wrapper", onClick: this.maximizeButton },
                React.createElement("span", { className: "message-box-bump" }),
                React.createElement("div", { className: "message-box" },
                    React.createElement("div", { className: "message" },
                        React.createElement("span", null, this.props.message))))));
    };
    return PreviewMessage;
}(Component));
export default PreviewMessage;
//# sourceMappingURL=PreviewMessage.js.map