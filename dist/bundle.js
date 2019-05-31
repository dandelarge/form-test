/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/StringTester.js":
/*!*****************************!*\
  !*** ./src/StringTester.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return StringTester; });\n/**\n * This function is where the shared code converges for both, the consecutive chars\n * and the non-overlaping one.\n * @param {string} word\n * @param {number} requiredLength\n * @param {function} callback\n *\n * @return {boolean}\n */\nfunction stringReducer(word, requiredLength, callback, times =  1) {\n    // length Counter starts at one since the first character is always counted as part of the length\n    let counter = 1;\n    // Taking advantage of the iterable nature of Strings. Starting at index one, so I can try agaist\n    // the previous value\n    for(let i = 1; i < word.length; i++) {\n        // Getting both, the value at the current index and the one before\n        let currentChar = word.charCodeAt(i);\n        let previousChar = word.charCodeAt(i -1);\n\n        // Moment of truth; If the value returned by the callback is true then we update our counter\n        if(callback(currentChar, previousChar)) {\n            counter++;\n        } else {\n            // in case the chars are not consecutive, we reset the counter\n            counter = 1;\n        }\n        // Once the counter gets to the required length of consecutiveCharacters,\n        // we diminish the times to execute counter\n        if(counter === requiredLength) {\n            times--;\n        }\n        // If the times counter reaches 0, then it shortcircuits and returns true immediately\n        if(times === 0) {\n            return true;\n        }\n    }\n    // if we got at this point, there are no consecutive chars in the string\n    return false;\n}\n\n/**\n * Passwords must include one increasing straight of at least three letters, like abc , cde , fgh ,\n * and so on, up to xyz . They cannot skip letters; acd doesn't count.\n**/\n/**\n *\n * @param {String} word\n * @param {number} requiredLength\n *\n * @return {boolean}\n */\nfunction hasConsecutiveChars(word, requiredLength = 3, times) {\n    return stringReducer(word, requiredLength, (curr, prev) => curr - 1  === prev, times);\n}\n\n/**\n * Passwords must contain at least two non-overlapping pairs of letters, like aa, bb, or cc.\n**/\n/**\n *\n * @param {String} word\n * @param {number} requiredLength\n *\n * @return {boolean}\n */\nfunction hasNonOverlappingLetters(word, requiredLength = 2, times) {\n    return stringReducer(word, requiredLength, (curr, prev) => curr === prev, times);\n}\n\n/**\n * Passwords may not contain the letters i, O, or l, as these letters can be mistaken for other characters\n * and are therefore confusing.\n**/\n/**\n *\n * @param {String} word\n * @param {String} forbidenChars a string containing all forbiden chars\n *\n * @return {boolean}\n */\nfunction hasNotForbidenChars(word, forbidenChars = 'ilO') {\n    // Let's build a regex from a word with forbidenChars\n    let regex = '[';\n    for(let i = 0; i < forbidenChars.length; i++) {\n        regex += (i+1 < forbidenChars.length) ? `${forbidenChars[i]}|` : forbidenChars[i];\n    }\n    regex += ']';\n\n    // Now let's test it against the word! If we find it, we get true, and then the test is not passed,\n    // so let's negate the output\n    return !(new RegExp(regex).test(word));\n}\n\n/**\n * Passwords cannot be longer than 32 characters.\n **/\nfunction isNoLongerThan(word, length) {\n    return word.length <= length;\n}\n\n/**\n * Passwords can only contain lower case alphabetic characters.\n**/\nfunction hasOnlyLowerCaseChars(word = '') {\n    return new RegExp('^[a-z]+$', 'g').test(word);\n}\n\n// Good old function constructor, just to make sure I still remember how to do this\n// this exposes the rules so they can be chained and customized.\n// ie:\n// tester = new StringTester('word').testConsecutiveChars(4) will test against 4 consecutive chars like \"abcd\"\n// tester = new StringTester('word').testConsecutiveChars(4, 2), or\n// tester = new StringTester('word').testConsecutiveChars(4).times(2) will test for two ocurrences of\n// four consecutive chars, like: 'abcdabcd' or 'abcdefgh' or 'abcdhgsabcd'\n//\n// Please note that only testsConsecutiveChars and testNonOverlappingChars can be performed multiple times,\n// this is due to the content nature of the validation. Ideally, I'd make classes and let the testing methods\n// inherit from them; Say, a TestContentClass that can be chained with times(). But I already started using this\n// OOP interface / pure functions approach and can't make much time to refactor\nfunction StringTester(word) {\n    this.word = word;\n    this.valid = true;\n    this.ruleSet = {};\n    let lastCalled, passedParam;\n\n    this.testConsecutiveChars = (lengthRequired, times) => {\n        lastCalled = this.testConsecutiveChars;\n        passedParam = lengthRequired;\n        this.ruleSet.consecutiveChars = hasConsecutiveChars(this.word, lengthRequired, times);\n        this.valid = this.ruleSet.consecutiveChars && this.valid;\n        return this;\n    }\n\n    this.testNonOverlappingChars = (lengthRequired, times) => {\n        lastCalled = this.testNonOverlappingChars;\n        passedParam = lengthRequired;\n        this.ruleSet.nonOverlappingChars = hasNonOverlappingLetters(this.word, lengthRequired, times);\n        this.valid = this.ruleSet.nonOverlappingChars && this.valid;\n        return this;\n    }\n\n    this.testForbidenChars = forbidenChars => {\n        this.ruleSet.forbidenChars = hasNotForbidenChars(this.word, forbidenChars);\n        this.valid = this.ruleSet.forbidenChars && this.valid;\n        return this;\n    }\n\n    this.testLength = length => {\n        this.ruleSet.textLength = isNoLongerThan(this.word, length);\n        this.valid = this.ruleSet.textLength && this.valid;\n        return this;\n    }\n\n    this.testOnlyLowerCaseChars = () => {\n        this.ruleSet.onlyLowerCase = hasOnlyLowerCaseChars(this.word);\n        this.valid = this.ruleSet.onlyLowerCase && this.valid;\n        return this;\n    }\n\n    this.times = times => {\n        this.valid = lastCalled(passedParam, times) && (this.valid === true);\n        return this;\n    }\n}\n\n//# sourceURL=webpack:///./src/StringTester.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _StringTester__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StringTester */ \"./src/StringTester.js\");\n\n\nfunction onInputChange(event) {\n    const tester = new _StringTester__WEBPACK_IMPORTED_MODULE_0__[\"default\"](event.target.value);\n\n    tester\n        .testConsecutiveChars(3)\n        .testForbidenChars('iOl')\n        .testNonOverlappingChars(2).times(2)\n        .testLength(32)\n        .testOnlyLowerCaseChars();\n\n    updateChecks(tester.ruleSet);\n    enableSendButton(tester.valid);\n}\n\nfunction toggleCheckbox(checkbox, checked) {\n    checked ? checkbox.setAttribute('checked', checked): checkbox.removeAttribute('checked');\n}\n\nfunction updateChecks(ruleSet) {\n    for(let rule in ruleSet) {\n        toggleCheckbox(document.getElementById(rule), ruleSet[rule])\n    }\n}\n\nfunction enableSendButton(valid) {\n    console.log(valid);\n    const sendButton = document.getElementById('sendForm');\n    valid ? sendButton.removeAttribute('disabled') : sendButton.setAttribute('disabled', valid);\n}\n\nwindow.onload = function() {\n    const passwordField = document.getElementById('pass');\n    passwordField.addEventListener('keyup', onInputChange);\n}\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });