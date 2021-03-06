"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var HamburgerButton = (function (_super) {
    __extends(HamburgerButton, _super);
    function HamburgerButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getTransformValue = function (isOpen, basePos, rotate, halfHeight) {
            return "translate3d(0," + (isOpen ? halfHeight + "px" : basePos + "px") + ",0) rotate(" + (isOpen ? rotate + "deg" : "0") + ")";
        };
        return _this;
    }
    HamburgerButton.prototype.render = function () {
        var props = this.props;
        var width = props.width || 40;
        var height = props.height || 30;
        var halfHeight = Math.round(height / 2);
        var isOpen = props.open || false;
        var strokeWidth = props.strokeWidth || 2;
        var halfStrokeWidth = Math.round(strokeWidth / 2);
        var animationDuration = props.animationDuration || 0.4;
        var containerStyle = {
            width: width,
            height: height,
            position: "fixed",
            right : "30px",
            zIndex : 1,
            top:"7rem"
        };
        var baseStyle = {
            display: "block",
            height: strokeWidth + "px",
            width: "100%",
            background: props.color || "#000",
            transitionTimingFunction: "ease",
            transitionDuration: animationDuration + "s",
            transformOrigin: "center",
            position: "absolute",
            marginTop: -halfStrokeWidth
        };
        var firstLineStyle = {
            transform: this.getTransformValue(isOpen, 0, "45", halfHeight),
        };
        var secondLineStyle = {
            transitionTimingFunction: "ease-out",
            transitionDuration: animationDuration / 4 + "s",
            opacity: isOpen ? 0 : 1,
            top: halfHeight
        };
        var thirdLineStyle = {
            transform: this.getTransformValue(isOpen, height, "-45", halfHeight)
        };
        return (React.createElement("div", { style: containerStyle, onClick: props.onClick },
            React.createElement("span", { style: Object.assign({}, baseStyle, firstLineStyle) }),
            React.createElement("span", { style: Object.assign({}, baseStyle, secondLineStyle) }),
            React.createElement("span", { style: Object.assign({}, baseStyle, thirdLineStyle) })));
    };
    return HamburgerButton;
}(React.PureComponent));
exports.HamburgerButton = HamburgerButton;
