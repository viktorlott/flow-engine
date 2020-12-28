"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(_ref) {
  var id = _ref.id,
      not = _ref.not,
      setNot = _ref.setNot,
      conjunctionOptions = _ref.conjunctionOptions,
      setConjunction = _ref.setConjunction,
      disabled = _ref.disabled,
      readonly = _ref.readonly,
      config = _ref.config;
  var conjsCount = Object.keys(conjunctionOptions).length;
  var lessThenTwo = disabled;

  var renderOptions = function renderOptions() {
    return Object.keys(conjunctionOptions).map(function (key) {
      var _conjunctionOptions$k = conjunctionOptions[key],
          id = _conjunctionOptions$k.id,
          name = _conjunctionOptions$k.name,
          label = _conjunctionOptions$k.label,
          checked = _conjunctionOptions$k.checked;
      var postfix = setConjunction.isDummyFn ? "__dummy" : "";
      return [/*#__PURE__*/_react["default"].createElement("input", {
        key: id + postfix,
        type: "radio",
        id: id + postfix,
        name: name + postfix,
        checked: checked,
        disabled: readonly,
        value: key,
        onChange: onChange
      }), /*#__PURE__*/_react["default"].createElement("label", {
        key: id + postfix + "label",
        htmlFor: id + postfix
      }, label)];
    });
  };

  var renderNot = function renderNot() {
    return [/*#__PURE__*/_react["default"].createElement("input", {
      key: id,
      type: "checkbox",
      id: id + "__not",
      checked: not,
      disabled: readonly,
      onChange: onNotChange
    }), /*#__PURE__*/_react["default"].createElement("label", {
      key: id + "label",
      htmlFor: id + "__not"
    }, config.settings.notLabel || "NOT")];
  };

  var onChange = function onChange(e) {
    return setConjunction(e.target.value);
  };

  var onNotChange = function onNotChange(e) {
    return setNot(e.target.checked);
  };

  return [config.settings.showNot && renderNot(), conjsCount > 1 && !lessThenTwo && renderOptions()];
};

exports["default"] = _default;