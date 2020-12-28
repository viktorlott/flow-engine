"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(props) {
  var value = props.value,
      setValue = props.setValue,
      config = props.config,
      readonly = props.readonly,
      placeholder = props.placeholder;

  var onChange = function onChange(e) {
    var val = e.target.value;
    if (val === "") val = undefined; // don't allow empty value

    setValue(val);
  };

  var textValue = value || "";
  return /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: textValue,
    placeholder: placeholder,
    disabled: readonly,
    onChange: onChange
  });
};

exports["default"] = _default;