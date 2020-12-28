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
      min = props.min,
      max = props.max,
      step = props.step,
      placeholder = props.placeholder;

  var onChange = function onChange(e) {
    var val = e.target.value;
    if (val === "" || val === null) val = undefined;else val = Number(val);
    setValue(val);
  };

  var numberValue = value == undefined ? "" : value;
  return /*#__PURE__*/_react["default"].createElement("input", {
    type: "number",
    value: numberValue,
    placeholder: placeholder,
    disabled: readonly,
    min: min,
    max: max,
    step: step,
    onChange: onChange
  });
};

exports["default"] = _default;