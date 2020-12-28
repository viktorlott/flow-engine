"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var items = _ref.items,
      setField = _ref.setField,
      selectedKey = _ref.selectedKey,
      readonly = _ref.readonly;

  var renderOptions = function renderOptions(fields) {
    return Object.keys(fields).map(function (fieldKey) {
      var field = fields[fieldKey];
      var items = field.items,
          path = field.path,
          label = field.label,
          disabled = field.disabled;

      if (items) {
        return /*#__PURE__*/_react["default"].createElement("optgroup", {
          disabled: disabled,
          key: path,
          label: label
        }, renderOptions(items));
      } else {
        return /*#__PURE__*/_react["default"].createElement("option", {
          disabled: disabled,
          key: path,
          value: path
        }, label);
      }
    });
  };

  var onChange = function onChange(e) {
    return setField(e.target.value);
  };

  var hasValue = selectedKey != null;
  return /*#__PURE__*/_react["default"].createElement("select", {
    onChange: onChange,
    value: hasValue ? selectedKey : "",
    disabled: readonly
  }, !hasValue && /*#__PURE__*/_react["default"].createElement("option", {
    disabled: true,
    value: ""
  }), renderOptions(items));
};

exports["default"] = _default;