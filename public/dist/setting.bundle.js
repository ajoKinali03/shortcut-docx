"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkshortcut_docx"] = self["webpackChunkshortcut_docx"] || []).push([["setting"],{

/***/ "./public/javascripts/module/setting.js":
/*!**********************************************!*\
  !*** ./public/javascripts/module/setting.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\nfunction init() {\n  document.querySelectorAll(\".scroll-link\").forEach(function (anchor) {\n    anchor.addEventListener(\"click\", function (e) {\n      e.preventDefault();\n      var target = document.querySelector(this.getAttribute(\"href\"));\n      var offset = 60; // Height of the fixed header\n      var bodyRect = document.body.getBoundingClientRect().top;\n      var elementRect = target.getBoundingClientRect().top;\n      var elementPosition = elementRect - bodyRect;\n      var offsetPosition = elementPosition - offset;\n      window.scrollTo({\n        top: offsetPosition,\n        behavior: \"smooth\"\n      });\n    });\n  });\n}\n\n//# sourceURL=webpack://shortcut-docx/./public/javascripts/module/setting.js?");

/***/ })

}]);