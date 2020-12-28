"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(props) {
  var value = props.value,
      setValue = props.setValue,
      config = props.config,
      valueFormat = props.valueFormat,
      use12Hours = props.use12Hours,
      readonly = props.readonly;

  var onChange = function onChange(e) {
    var value = e.target.value;
    if (value == "") value = undefined;else value = (0, _moment["default"])(new Date(value)).format(valueFormat);
    setValue(value);
  };

  var dtValue = value;
  if (!value) dtValue = "";else dtValue = (0, _moment["default"])(value).format("YYYY-MM-DDTHH:mm");
  return /*#__PURE__*/_react["default"].createElement("input", {
    type: "datetime-local",
    value: dtValue,
    disabled: readonly,
    onChange: onChange
  });
};

exports["default"] = _default;