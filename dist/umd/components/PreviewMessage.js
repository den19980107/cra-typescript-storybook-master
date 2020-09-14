(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "prop-types", "react", "../styles/fabric-icons-inline.css", "../styles/PreviewMessage.css"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("prop-types"), require("react"), require("../styles/fabric-icons-inline.css"), require("../styles/PreviewMessage.css"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.propTypes, global.react, global.fabricIconsInline, global.PreviewMessage);
    global.undefined = mod.exports;
  }
})(this, function (exports, _propTypes, _react) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  class PreviewMessage extends _react.Component {
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
      return /*#__PURE__*/_react2.default.createElement("div", {
        style: previewMsgStyle,
        onMouseEnter: this.handleCloseButtonVisbility,
        onMouseLeave: this.handleCloseButtonVisbility
      }, /*#__PURE__*/_react2.default.createElement("button", {
        id: "close-btn",
        onClick: this.closeMessage,
        style: buttonStyle
      }, /*#__PURE__*/_react2.default.createElement("div", {
        id: "close-btn-background"
      }, /*#__PURE__*/_react2.default.createElement("span", {
        className: "ms-Icon ms-Icon--Cancel",
        id: "close-btn-icon"
      }))), /*#__PURE__*/_react2.default.createElement("div", {
        id: "message-wrapper",
        onClick: this.maximizeButton
      }, /*#__PURE__*/_react2.default.createElement("span", {
        className: "message-box-bump"
      }), /*#__PURE__*/_react2.default.createElement("div", {
        className: "message-box"
      }, /*#__PURE__*/_react2.default.createElement("div", {
        className: "message"
      }, /*#__PURE__*/_react2.default.createElement("span", null, this.props.message)))));
    }

  }

  _defineProperty(PreviewMessage, "propTypes", {
    message: _propTypes2.default.string.isRequired
  });

  exports.default = PreviewMessage;
});
//# sourceMappingURL=PreviewMessage.js.map