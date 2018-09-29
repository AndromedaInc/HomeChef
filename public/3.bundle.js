(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./src/app/auth/ChefAuth.jsx":
/*!***********************************!*\
  !*** ./src/app/auth/ChefAuth.jsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar ChefAuth = function ChefAuth() {\n  return _react2.default.createElement(\n    _react.Fragment,\n    null,\n    _react2.default.createElement(\n      'div',\n      null,\n      'Chef Login Here'\n    ),\n    _react2.default.createElement(\n      _reactRouterDom.Link,\n      { to: '/public/userauth' },\n      _react2.default.createElement(\n        'button',\n        { type: 'button' },\n        'Go to login as a User'\n      )\n    ),\n    _react2.default.createElement(\n      _reactRouterDom.Link,\n      { to: '/public/chef' },\n      _react2.default.createElement(\n        'button',\n        { type: 'button' },\n        'Login'\n      )\n    )\n  );\n};\n\nexports.default = ChefAuth;\n\n//# sourceURL=webpack:///./src/app/auth/ChefAuth.jsx?");

/***/ })

}]);