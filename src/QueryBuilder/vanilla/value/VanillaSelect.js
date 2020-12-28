"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _stuff = require("../../../../utils/stuff");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var listValues = _ref.listValues,
      value = _ref.value,
      setValue = _ref.setValue,
      allowCustomValues = _ref.allowCustomValues,
      readonly = _ref.readonly;

  var renderOptions = function renderOptions() {
    return (0, _stuff.mapListValues)(listValues, function (_ref2) {
      var title = _ref2.title,
          value = _ref2.value;
      return /*#__PURE__*/_react["default"].createElement("option", {
        key: value,
        value: value
      }, title);
    });
  };

  var onChange = function onChange(e) {
    return setValue(e.target.value);
  };

  var hasValue = value != null;
  return /*#__PURE__*/_react["default"].createElement("select", {
    onChange: onChange,
    value: hasValue ? value : "",
    disabled: readonly
  }, !hasValue && /*#__PURE__*/_react["default"].createElement("option", {
    disabled: true,
    value: ""
  }), renderOptions());
};

exports["default"] = _default;