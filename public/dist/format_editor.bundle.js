"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkshortcut_docx"] = self["webpackChunkshortcut_docx"] || []).push([["format_editor"],{

/***/ "./public/javascripts/module/format_editor.js":
/*!****************************************************!*\
  !*** ./public/javascripts/module/format_editor.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\nfunction init() {\n  // code untuk otomatis merubah ukuran textarea\n  function addAutoResize() {\n    document.querySelectorAll(\"[data-autoresize]\").forEach(function (element) {\n      element.style.boxSizing = \"border-box\";\n      var offset = element.offsetHeight - element.clientHeight;\n      element.addEventListener(\"input\", function (event) {\n        event.target.style.height = \"auto\";\n        event.target.style.height = event.target.scrollHeight + offset + \"px\";\n      });\n      element.removeAttribute(\"data-autoresize\");\n    });\n  }\n  addAutoResize();\n}\n// untuk menjalankan panggil fungsi addAutoResize() setalah pemanggilan DOM textarea tsb\n// masukan attr data-autoresize di dalam kurang untuk mengetik atribut di jade\n// masukan style box-sizing: border-box; dan resize: none; pada te araea dituju\n\n//# sourceURL=webpack://shortcut-docx/./public/javascripts/module/format_editor.js?");

/***/ })

}]);