/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ \"./scss/style.scss\");\n/* harmony import */ var _img_open_book_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../img/open-book.svg */ \"./img/open-book.svg\");\n/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/compat/auth */ \"../node_modules/firebase/compat/auth/dist/index.esm.js\");\n/* harmony import */ var firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/compat/firestore */ \"../node_modules/firebase/compat/firestore/dist/index.esm.js\");\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/app */ \"../node_modules/firebase/app/dist/index.esm.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/firestore */ \"../node_modules/firebase/firestore/dist/index.esm.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\nvar firebaseApp = (0,firebase_app__WEBPACK_IMPORTED_MODULE_4__.initializeApp)({\n  apiKey: \"AIzaSyA-a92_xSG8wonlyn-GybUuCTRkwgETsKc\",\n  authDomain: \"book-catalog-29aa4.firebaseapp.com\",\n  projectId: \"book-catalog-29aa4\",\n  storageBucket: \"book-catalog-29aa4.appspot.com\",\n  messagingSenderId: \"999396800830\",\n  appId: \"1:999396800830:web:b35471e5df861622ad146f\",\n  measurementId: \"G-E1926JYJFQ\"\n});\nvar db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.getFirestore)(firebaseApp);\nvar catalogBooksReference = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.collection)(db, \"catalog\");\nvar buttonsDelete, buttonsRedactor, buttonOpenCreateForm;\nvar backDrop = document.querySelector('.backdrop');\nvar forms = document.querySelectorAll('form');\nvar redactorForm = document.querySelector('[data-type=\"redactorForm\"]');\nvar createForm = document.querySelector('[data-type=\"createForm\"]');\nvar inputList = document.querySelectorAll('input');\nvar containerForBooks = document.querySelector('.group');\nvar containerForRecommend = document.querySelector('.recommend__content');\nvar selectForSort = document.querySelector('.select');\nvar selectInput = selectForSort.querySelector('.value');\nvar catalog = [];\nvar keys = ['Name', 'Author', 'Publication year', 'Rating', 'ISBN'];\nvar keysNumberValue = ['Publication year', 'Rating'];\nvar id;\nvar object = {};\nvar thisYear = new Date().getFullYear();\n(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.onSnapshot)(catalogBooksReference, function (snapshot) {\n  snapshot.docChanges().forEach(function (change) {\n    if (change.type === \"added\") {\n      catalog.push(_objectSpread(_objectSpread({}, change.doc.data()), {}, {\n        id: change.doc.id\n      }));\n    }\n\n    if (change.type === \"modified\") {\n      var index = catalog.findIndex(function (item) {\n        return item.id === change.doc.id;\n      });\n      catalog.splice(index, index + 1, _objectSpread(_objectSpread({}, change.doc.data()), {}, {\n        id: change.doc.id\n      }));\n    }\n\n    if (change.type === \"removed\") {\n      var _index = catalog.findIndex(function (item) {\n        return item.id === change.doc.id;\n      });\n\n      catalog.splice(_index, _index + 1);\n    }\n  });\n  renderContent();\n});\n\nfunction setup() {\n  buttonsDelete = document.querySelectorAll('[data-type=\"delete\"]');\n  buttonsRedactor = document.querySelectorAll('[data-type=\"redactor\"]');\n  buttonOpenCreateForm = document.querySelector('[data-type=\"openModal\"]');\n  buttonsRedactor.forEach(function (button) {\n    button.addEventListener('click', fillDataForm);\n  });\n  buttonsDelete.forEach(function (button) {\n    button.addEventListener('click', deleteBook);\n  });\n  buttonOpenCreateForm.addEventListener('click', function () {\n    createForm.classList.add('open');\n    backDrop.classList.add('active');\n  });\n}\n\nselectForSort.addEventListener('click', clickHandler);\nbackDrop.addEventListener('click', function () {\n  createForm.classList.remove('open');\n  redactorForm.classList.remove('open');\n  backDrop.classList.remove('active');\n});\ninputList.forEach(function (item) {\n  item.addEventListener('focusout', function (e) {\n    if (controlValueInput(e.target.value, e.target.name)) {\n      e.target.classList.add('error');\n    } else {\n      e.target.classList.remove('error');\n    }\n  });\n});\nforms.forEach(function (form) {\n  form.addEventListener('reset', function () {\n    form.classList.remove('open');\n    backDrop.classList.remove('active');\n    inputList.forEach(function (item) {\n      item.classList.remove('error');\n    });\n  });\n  form.addEventListener('submit', function (e) {\n    e.preventDefault();\n\n    if (form.dataset.type === 'redactorForm' && validationDateForm(form)) {\n      redactorBook(form);\n    }\n\n    if (form.dataset.type === 'createForm' && validationDateForm(form)) {\n      addBook(form);\n      form.reset();\n    }\n  });\n});\n\nwindow.onload = function () {\n  sessionStorage.removeItem('tipeSort');\n};\n\nfunction isEmpty(object) {\n  for (var key in object) {\n    object[key].length > 0 && object[key] !== ' ' ? object[key] : delete object[key];\n  }\n\n  keysNumberValue.forEach(function (key) {\n    key in object ? object[key] = parseInt(object[key]) : object[key];\n  });\n  return Object.keys(object).length == 0;\n}\n\nfunction controlValueInput(value, key) {\n  if (key === 'Publication year') {\n    var year = parseInt(value);\n    return year < 1800 || year > thisYear;\n  }\n\n  if (key === 'Rating') {\n    var rating = Number(value);\n    return rating < 0 || rating > 10 || !Number.isInteger(rating);\n  }\n\n  if (key === 'Name' || key === 'Author') {\n    return value.length == 0 || value == ' ' || value.length > 100;\n  }\n}\n\nfunction renderContent() {\n  var tipeSort = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Publication year';\n\n  if (sessionStorage.getItem('tipeSort') !== null) {\n    tipeSort = JSON.parse(sessionStorage.getItem('tipeSort'));\n  }\n\n  containerForBooks.innerHTML = '';\n  containerForRecommend.innerHTML = '';\n  containerForBooks.insertAdjacentHTML('afterbegin', getPatternBooks(sortBook(tipeSort), tipeSort));\n  containerForRecommend.insertAdjacentHTML('beforeend', getPatternBooks(recommedBook(), 'recommend'));\n  setup();\n}\n\nfunction getPatternBooks(catalog, tipeSort) {\n  if (tipeSort === 'recommend') {\n    var booksHtml = catalog.map(function (book) {\n      return \" <div class=\\\"card-book\\\">\\n      <img src=\\\"./img/open-book.svg\\\">\\n      <div class=\\\"card-book__text\\\">\\n          <div class=\\\"card-book__title\\\">\".concat(book.Name, \"</div>\\n          <div class=\\\"card-book__author\\\">\").concat(book.Author, \"</div>\\n          <div class=\\\"card-book__year\\\"> <span>Publication year:</span> \").concat(book['Publication year'] === undefined ? '-' : book['Publication year'], \"</div>\\n          <div class=\\\"card-book__raiting\\\"><span>Rating:</span> \").concat(book.Rating === undefined ? '-' : book.Rating, \"</div>\\n          <div class=\\\"card-book__ISBN\\\">ISBN: \").concat(book.ISBN === undefined ? '-' : book.ISBN, \"</div>\\n      </div>\\n      <div class=\\\"card-book__hover\\\" data-index=\").concat(book.id, \">\\n          <div class=\\\"buttons\\\">\\n              <button class=\\\"btn\\\" data-type=\\\"delete\\\">delete</button>\\n              <button class=\\\"btn\\\" data-type=\\\"redactor\\\">edit</button>\\n          </div>\\n      </div>\\n  </div>\");\n    }).join('');\n    return booksHtml;\n  } else {\n    var _booksHtml = catalog.map(function (item) {\n      return item.map(function (book) {\n        return \" <div class=\\\"card-book\\\">\\n      <img src=\\\"./img/open-book.svg\\\">\\n      <div class=\\\"card-book__text\\\">\\n          <div class=\\\"card-book__title\\\">\".concat(book.Name, \"</div>\\n          <div class=\\\"card-book__author\\\">\").concat(book.Author, \"</div>\\n          <div class=\\\"card-book__year\\\"> <span>Publication year:</span> \").concat(book['Publication year'] === undefined ? '-' : book['Publication year'], \"</div>\\n          <div class=\\\"card-book__raiting\\\"><span>Rating:</span>\").concat(book.Rating === undefined ? '-' : book.Rating, \"</div>\\n          <div class=\\\"card-book__ISBN\\\">ISBN: \").concat(book.ISBN === undefined ? '-' : book.ISBN, \"</div>\\n      </div>\\n      <div class=\\\"card-book__hover\\\" data-index=\").concat(book.id, \">\\n          <div class=\\\"buttons\\\">\\n              <button class=\\\"btn\\\" data-type=\\\"delete\\\">delete</button>\\n              <button class=\\\"btn\\\" data-type=\\\"redactor\\\">edit</button>\\n          </div>\\n      </div>\\n  </div>\");\n      }).join('');\n    }).join('');\n\n    var groups = \"<button type=\\\"button\\\" class=\\\"btn btn-create\\\" data-type='openModal'>\\n                  <span class=\\\"material-icons-outlined\\\">add</span></button>\\n                  \".concat(_booksHtml);\n    return groups;\n  }\n}\n\nfunction clickHandler(event) {\n  var type = event.target.dataset.type;\n\n  if (type === 'select-input') {\n    selectForSort.classList.toggle('open');\n  }\n\n  if (type === 'select-item') {\n    sessionStorage.setItem('tipeSort', JSON.stringify(event.target.dataset.value));\n    renderContent(event.target.dataset.value);\n    selectInput.innerHTML = \"group by \".concat(event.srcElement.innerHTML);\n    selectForSort.classList.remove('open');\n  }\n}\n\nfunction deleteBook(event) {\n  var id = event.target.offsetParent.dataset.index;\n  (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.deleteDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.doc)(catalogBooksReference, id));\n}\n\nfunction redactorBook(form) {\n  (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.doc)(catalogBooksReference, id), object).then(function () {\n    form.classList.remove('open');\n    backDrop.classList.remove('active');\n  });\n}\n\nfunction addBook(form) {\n  (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.addDoc)(catalogBooksReference, object).then(function () {\n    form.classList.remove('open');\n    backDrop.classList.remove('active');\n  });\n}\n\nfunction fillDataForm(event) {\n  id = event.target.offsetParent.dataset.index;\n  var book = catalog.find(function (book) {\n    return book.id === id;\n  });\n  keys.forEach(function (key) {\n    if (book[key] !== undefined) {\n      redactorForm[key].value = book[key];\n    }\n  });\n  redactorForm.classList.add('open');\n  backDrop.classList.add('active');\n}\n\nfunction validationDateForm(form) {\n  keys.forEach(function (key) {\n    if (key === 'Author') {\n      object[key] = form[key].value.trim();\n    } else {\n      object[key] = form[key].value;\n    }\n\n    controlValueInput(object[key], key) ? form[key].classList.add('error') : form[key].classList.remove('error');\n  });\n\n  if (!isEmpty(object) && form.querySelector('.error') === null) {\n    return true;\n  } else {\n    false;\n  }\n}\n\nfunction recommedBook() {\n  var maxRating = 0;\n  var recommedBook = catalog.filter(function (item) {\n    return item['Publication year'] >= thisYear - 3;\n  });\n\n  if (recommedBook.length > 1) {\n    recommedBook.forEach(function (item) {\n      return item.Rating >= maxRating ? maxRating = item.Rating : maxRating;\n    });\n    recommedBook = recommedBook.filter(function (item) {\n      return item.Rating >= maxRating;\n    });\n  }\n\n  if (recommedBook.length > 1) {\n    var index = Math.floor(Math.random() * recommedBook.length);\n    return recommedBook.slice(index, index + 1);\n  }\n\n  return recommedBook;\n}\n\nfunction sortBook(tipeSort) {\n  var books = [];\n  var listDate = new Set();\n  catalog.forEach(function (book) {\n    listDate.add(book[tipeSort]);\n  });\n  listDate = tipeSort === 'Author' ? Array.from(listDate).sort(function (a, b) {\n    return a < b ? -1 : 1;\n  }) : Array.from(listDate).sort(function (a, b) {\n    return b - a;\n  });\n  listDate.forEach(function (date) {\n    books.push(catalog.filter(function (item) {\n      return item[tipeSort] === date;\n    }));\n  });\n  books.forEach(function (item) {\n    if (item.length > 1) {\n      item.sort(function (a, b) {\n        if (a.Name < b.Name) return -1;\n        if (a.Name > b.Name) return 1;\n      });\n    }\n  });\n  return books;\n}\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ }),

/***/ "./scss/style.scss":
/*!*************************!*\
  !*** ./scss/style.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./scss/style.scss?");

/***/ }),

/***/ "./img/open-book.svg":
/*!***************************!*\
  !*** ./img/open-book.svg ***!
  \***************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/open-book.svg\";\n\n//# sourceURL=webpack:///./img/open-book.svg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_firebase_app_dist_index_esm_js-node_modules_firebase_compat_auth_dist_in-0e0423"], function() { return __webpack_require__("./js/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;