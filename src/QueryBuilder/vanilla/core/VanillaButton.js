"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var type = _ref.type,
      label = _ref.label,
      onClick = _ref.onClick,
      config = _ref.config;
  var typeToLabel = {
    "addRuleGroup": "+",
    "delGroup": "x",
    "delRule": "x"
  };
  var btnLabel = typeToLabel[type] || label;
  return /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onClick,
    type: "button"
  }, btnLabel);
};

exports["default"] = _default;