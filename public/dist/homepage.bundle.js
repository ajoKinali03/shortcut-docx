"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkshortcut_docx"] = self["webpackChunkshortcut_docx"] || []).push([["homepage"],{

/***/ "./public/javascripts/module/main.js":
/*!*******************************************!*\
  !*** ./public/javascripts/module/main.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var _client_save_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client_save.js */ \"./public/javascripts/module/client_save.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = \"function\" == typeof Symbol ? Symbol : {}, a = i.iterator || \"@@iterator\", c = i.asyncIterator || \"@@asyncIterator\", u = i.toStringTag || \"@@toStringTag\"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, \"\"); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, \"_invoke\", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: \"normal\", arg: t.call(e, r) }; } catch (t) { return { type: \"throw\", arg: t }; } } e.wrap = wrap; var h = \"suspendedStart\", l = \"suspendedYield\", f = \"executing\", s = \"completed\", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { [\"next\", \"throw\", \"return\"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if (\"throw\" !== c.type) { var u = c.arg, h = u.value; return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) { invoke(\"next\", t, i, a); }, function (t) { invoke(\"throw\", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke(\"throw\", t, i, a); }); } a(c.arg); } var r; o(this, \"_invoke\", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error(\"Generator is already running\"); if (o === s) { if (\"throw\" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else \"return\" === n.method && n.abrupt(\"return\", n.arg); o = f; var p = tryCatch(e, r, n); if (\"normal\" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y; var i = tryCatch(o, e.iterator, r.arg); if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = \"normal\", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: \"root\" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || \"\" === e) { var r = e[a]; if (r) return r.call(e); if (\"function\" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + \" is not iterable\"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) { var e = \"function\" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () { return this; }), define(g, \"toString\", function () { return \"[object Generator]\"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if (\"throw\" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if (\"root\" === i.tryLoc) return handle(\"end\"); if (i.tryLoc <= this.prev) { var c = n.call(i, \"catchLoc\"), u = n.call(i, \"finallyLoc\"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error(\"try statement without catch or finally\"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) { var i = o; break; } } i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if (\"throw\" === t.type) throw t.arg; return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, \"catch\": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if (\"throw\" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, \"next\" === this.method && (this.arg = t), y; } }, e; }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\n\nfunction init() {\n  // const inputPost = document.getElementById(\"input-post\");\n  // const cntrShwRefHome = document.getElementsByClassName(\"show-ref-home\")[0];\n\n  var inpt = document.getElementById(\"form-input\");\n  var formPost = document.getElementById(\"form-post\");\n  var btnShwRef = document.getElementById(\"btn-showref\");\n  var cntrCntn = document.getElementsByClassName(\"container-home\")[0];\n  var btnPostText = document.getElementById(\"btn-post\");\n  var tglBtn = document.getElementById(\"nav-tgl-btn\");\n  var dropMenu = document.getElementsByClassName(\"drop-menu\")[0];\n  var tglView = document.getElementsByClassName(\"tgl-view\")[0];\n  tglBtn.addEventListener(\"click\", function () {\n    if (tglBtn.checked) {\n      dropMenu.style.display = \"flex\";\n      tglView.childNodes.item(0).style.display = \"block\";\n    } else {\n      tglView.childNodes.item(0).style.display = \"none\";\n      dropMenu.style.display = \"none\";\n    }\n  });\n  document.addEventListener(\"keyup\", function (event) {\n    var cekElementTarget = event.view.location.href.includes(\"home\") ? event.target.attributes.id.nodeValue : false;\n    if (cekElementTarget == \"form-input\") {\n      (0,_client_save_js__WEBPACK_IMPORTED_MODULE_0__.deleteData)(1).then(function (res) {\n        return console.log(res);\n      })[\"catch\"](function (err) {\n        return console.log(err);\n      });\n      (0,_client_save_js__WEBPACK_IMPORTED_MODULE_0__.saveData)(inpt.value, 1, \"txt\").then(function (res) {\n        console.log(res);\n      })[\"catch\"](function (error) {\n        console.error(\"Error saving data:\", error);\n      });\n    }\n  });\n\n  // menempatkan kembali teks yang tersimpan di indexedDB\n  (0,_client_save_js__WEBPACK_IMPORTED_MODULE_0__.displayData)(1).then(function (data) {\n    if (data) {\n      inpt.value = data.txt;\n    } else {\n      console.log(\"Data tidak ditemukan atau kosong.\");\n    }\n  })[\"catch\"](function (error) {\n    console.error(error);\n  });\n\n  // auto set lebar atau responsif dari tampilan home\n  var lebarCntrCntn = document.getElementsByTagName(\"body\").item(0).offsetWidth;\n  // .getBoundingClientRect().width;\n\n  if (lebarCntrCntn >= 1000) {\n    inpt.style.width = \"\".concat(parseInt(0.5 * lebarCntrCntn), \"px\");\n    formPost.style.width = \"\".concat(parseInt(0.22 * lebarCntrCntn), \"px\");\n  }\n  if (lebarCntrCntn <= 1039) {\n    inpt.style.width = \"\".concat(parseInt(0.99 * lebarCntrCntn), \"px\");\n    formPost.style.width = \"\".concat(parseInt(0.99 * lebarCntrCntn), \"px\");\n  }\n\n  // fungsi ketika tombol download ditekan\n  btnPostText.addEventListener(\"click\", function () {\n    (0,_client_save_js__WEBPACK_IMPORTED_MODULE_0__.displayData)(1).then(function (res1) {\n      (0,_client_save_js__WEBPACK_IMPORTED_MODULE_0__.displayData)(2).then(function (res2) {\n        var data = {\n          teks: res1.txt,\n          ref: res2.ref\n        };\n        // akan mengirim data apabila teks ada isi nya\n        if (res1.txt.length > 70) {\n          (0,_client_save_js__WEBPACK_IMPORTED_MODULE_0__.displayData)(3).then(function (res3) {\n            var setuju = persetujuanPrivasi(res3);\n            if (setuju) {\n              // siko wak validasi bagian client\n              downloadDocx(data);\n            } else if (!setuju) {\n              alert(\"| Maaf kami tidak bisa mengolah data anda!.\\n\\n| Jika anda tidak setuju dengan kebijakan privasi kami, anda bisa hubungi kami melalui instagram untuk menyampaikan keluhan-nya.\");\n            }\n          })[\"catch\"](function (err) {\n            return err;\n          });\n        } else {\n          alert(\"Harap isi prompt terlebih dahulu sebelum me-download makalah anda dan tolong diperhatikan untuk mengisi promt lebeh dari 10 KATA atau lebih dari 70 chracter\");\n        }\n      })[\"catch\"](function (err) {\n        return err;\n      });\n    })[\"catch\"](function (err) {\n      return err;\n    });\n  });\n  function downloadDocx(_x) {\n    return _downloadDocx.apply(this, arguments);\n  } // fungsi untuk menampilkan referensi yang tersimpan\n  function _downloadDocx() {\n    _downloadDocx = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {\n      var loadingElement, loadingParentElement, response, blob, url, a;\n      return _regeneratorRuntime().wrap(function _callee$(_context) {\n        while (1) switch (_context.prev = _context.next) {\n          case 0:\n            loadingElement = document.getElementById(\"loading\");\n            loadingParentElement = document.getElementById(\"container-load\");\n            loadingElement.classList.add(\"active\");\n            loadingParentElement.classList.add(\"active-parent\");\n            _context.prev = 4;\n            _context.next = 7;\n            return fetch(\"/home\", {\n              method: \"POST\",\n              headers: {\n                \"Content-Type\": \"application/json\"\n              },\n              body: JSON.stringify({\n                data: data\n              })\n            }).then()[\"catch\"]();\n          case 7:\n            response = _context.sent;\n            _context.next = 10;\n            return response.blob();\n          case 10:\n            blob = _context.sent;\n            url = window.URL.createObjectURL(blob);\n            a = document.createElement(\"a\");\n            a.href = url;\n            a.download = \"Makalah.docx\";\n            document.body.appendChild(a);\n            a.click();\n            a.remove();\n            _context.next = 23;\n            break;\n          case 20:\n            _context.prev = 20;\n            _context.t0 = _context[\"catch\"](4);\n            console.log(_context.t0);\n          case 23:\n            _context.prev = 23;\n            loadingElement.classList.remove(\"active\");\n            loadingParentElement.classList.remove(\"active-parent\");\n            return _context.finish(23);\n          case 27:\n          case \"end\":\n            return _context.stop();\n        }\n      }, _callee, null, [[4, 20, 23, 27]]);\n    }));\n    return _downloadDocx.apply(this, arguments);\n  }\n  btnShwRef.addEventListener(\"click\", function () {\n    (0,_client_save_js__WEBPACK_IMPORTED_MODULE_0__.displayData)(2).then(function (res) {\n      var data = res.ref;\n      if (data.length > 0 && data[0] != null) {\n        crtCntrShwRef(data, true);\n      } else {\n        crtCntrShwRef(\"Referensi Belum Anda Masukan\", false);\n      }\n    })[\"catch\"](function (res) {\n      return res;\n    });\n  });\n  function crtCntrShwRef(respon, bool) {\n    var listItemChild = cntrCntn.children.item(2);\n    if (listItemChild.className == \"none\") {\n      var shwRefHome = document.getElementsByClassName(\"none\")[0];\n      var attrClass = document.createAttribute(\"class\");\n      attrClass.value = \"show-ref-home\";\n      shwRefHome.setAttributeNode(attrClass);\n      if (lebarCntrCntn >= 1000) {\n        shwRefHome.style.height = \"85vh\";\n      }\n\n      // auto set lebar dari tampilan cntr ref\n      if (lebarCntrCntn >= 1000) {\n        shwRefHome.style.width = \"\".concat(parseInt(0.26 * lebarCntrCntn), \"px\");\n      }\n      if (lebarCntrCntn <= 1039) {\n        shwRefHome.style.width = \"\".concat(parseInt(0.99 * lebarCntrCntn), \"px\");\n      }\n      if (bool) {\n        shwRefHome.style.textAlign = \"\";\n        shwRefHome.style.color = \"\";\n        shwRefHome.style.fontWeight = \"\";\n        crtShowDtHome(respon, listItemChild);\n      } else {\n        // shwRefHome.style.textAlign = \"center\";\n        // shwRefHome.style.color = \"red\";\n        // shwRefHome.style.fontWeight = \"bolder\";\n        shwRefHome.innerText = respon;\n      }\n    } else {\n      var _shwRefHome = document.getElementsByClassName(\"show-ref-home\")[0];\n      var _attrClass = document.createAttribute(\"class\");\n      _attrClass.value = \"none\";\n      _shwRefHome.setAttributeNode(_attrClass);\n      _shwRefHome.innerText = \"\";\n    }\n  }\n  function crtShowDtHome(data, cntrRefHome) {\n    data.forEach(function (e, i) {\n      var showRefParent = document.createElement(\"div\");\n      var refClass = document.createAttribute(\"class\");\n      refClass.value = \"ref-home\";\n      showRefParent.setAttributeNode(refClass);\n      var showdFrag = document.createDocumentFragment();\n      for (var key in e) {\n        var shwTextP = document.createElement(\"p\");\n        var idKeyWordBtn = document.createAttribute(\"id\");\n        idKeyWordBtn.value = \"keyword-btn\";\n        shwTextP.setAttributeNode(idKeyWordBtn);\n        if (key == \"ID\") {\n          shwTextP.innerText = \"-(footnote:\".concat(e[key], \")-\");\n        } else {\n          shwTextP.innerText = \"\".concat(key, \": \").concat(e[key]);\n        }\n        showdFrag.appendChild(shwTextP);\n      }\n      showRefParent.appendChild(showdFrag);\n      cntrRefHome.appendChild(showRefParent);\n    });\n  }\n\n  // fitur menyalin keyword footnote\n  document.addEventListener(\"click\", function (event) {\n    var elementClick = event.target.innerText;\n    var btnIdKeyWord = event.target.id;\n    if (btnIdKeyWord == \"keyword-btn\") {\n      navigator.clipboard.writeText(elementClick).then(function () {\n        console.log(elementClick);\n        console.log(\"Teks berhasil disalin ke papan klip!\");\n      })[\"catch\"](function (err) {\n        console.error(\"Gagal menyalin teks:\", err);\n      });\n    }\n  });\n  var persetujuanPrivasi = function persetujuanPrivasi(value) {\n    value = value ? value.setuju : false;\n    if (value) {\n      return true;\n    } else {\n      var setuju = confirm('Apakah sudah membaca Kebijakan Privasi kami?\\n\\n Jika sudah silahkan tekan \"OKE\" untuk setuju dengan kebijakan privasi kami').valueOf();\n      (0,_client_save_js__WEBPACK_IMPORTED_MODULE_0__.saveData)(setuju, 3, \"setuju\");\n      if (setuju) {\n        return setuju;\n      } else {\n        return setuju;\n      }\n    }\n  };\n}\n\n//# sourceURL=webpack://shortcut-docx/./public/javascripts/module/main.js?");

/***/ })

}]);