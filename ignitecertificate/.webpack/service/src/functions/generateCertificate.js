/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions/generateCertificate.ts":
/*!**********************************************!*\
  !*** ./src/functions/generateCertificate.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handle\": () => (/* binding */ handle)\n/* harmony export */ });\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chrome-aws-lambda */ \"chrome-aws-lambda\");\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! handlebars */ \"handlebars\");\n/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(handlebars__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dayjs */ \"dayjs\");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _utils_dynamodbClient__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/dynamodbClient */ \"./src/utils/dynamodbClient.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst compile = async function (data) {\r\n    const filePath = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), \"src\", \"templates\", \"certificate.hbs\");\r\n    const html = fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync(filePath, \"utf-8\");\r\n    return handlebars__WEBPACK_IMPORTED_MODULE_2___default().compile(html)(data);\r\n};\r\nconst handle = async (event) => {\r\n    const { id, name, grade } = JSON.parse(event.body);\r\n    const response = await _utils_dynamodbClient__WEBPACK_IMPORTED_MODULE_6__.document.query({\r\n        TableName: \"users_certificates\",\r\n        KeyConditionExpression: \"id = :id\",\r\n        ExpressionAttributeValues: {\r\n            \":id\": id,\r\n        },\r\n    }).promise();\r\n    const userAlreadyExists = response.Items[0];\r\n    if (!userAlreadyExists) {\r\n        await _utils_dynamodbClient__WEBPACK_IMPORTED_MODULE_6__.document.put({\r\n            TableName: \"users_certificates\",\r\n            Item: {\r\n                id,\r\n                name,\r\n                grade\r\n            },\r\n        }).promise();\r\n    }\r\n    const medalPath = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), \"src\", \"templates\", \"selo.png\");\r\n    const medal = fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync(medalPath, \"base64\");\r\n    const data = {\r\n        date: dayjs__WEBPACK_IMPORTED_MODULE_4___default()().format(\"DD/MM/YYYY\"),\r\n        grade,\r\n        name,\r\n        id,\r\n        medal,\r\n    };\r\n    const content = await compile(data);\r\n    const browser = await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default().puppeteer.launch({\r\n        headless: true,\r\n        args: (chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default().args),\r\n        defaultViewport: (chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default().defaultViewport),\r\n        executablePath: await (chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_0___default().executablePath)\r\n    });\r\n    const page = await browser.newPage();\r\n    await page.setContent(content);\r\n    const pdf = await page.pdf({\r\n        format: \"a4\",\r\n        landscape: true,\r\n        path: process.env.IS_OFFLINE ? \"certificate.pdf\" : null,\r\n        printBackground: true,\r\n        preferCSSPageSize: true\r\n    });\r\n    await browser.close();\r\n    const s3 = new aws_sdk__WEBPACK_IMPORTED_MODULE_5__.S3();\r\n    await s3.putObject({\r\n        Bucket: \"certificatesignitenodeserverless\",\r\n        Key: `${id}.pdf`,\r\n        ACL: \"public-read\",\r\n        Body: pdf,\r\n        ContentType: \"application/pdf\"\r\n    }).promise();\r\n    return {\r\n        statusCode: 201,\r\n        body: JSON.stringify({\r\n            message: \"Certificate created!\",\r\n            url: `https://certificatesignitenodeserverless.s3.amazonaws.com/${id}.pdf`\r\n        }),\r\n        headers: {\r\n            \"Content-type\": \"application/json\",\r\n        },\r\n    };\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL2dlbmVyYXRlQ2VydGlmaWNhdGUudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQWtCQTtBQUdBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFHQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2lnbml0ZWNlcnRpZmljYXRlLy4vc3JjL2Z1bmN0aW9ucy9nZW5lcmF0ZUNlcnRpZmljYXRlLnRzP2E1YWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNocm9taXVtIGZyb20gXCJjaHJvbWUtYXdzLWxhbWJkYVwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgaGFuZGxlYmFycyBmcm9tIFwiaGFuZGxlYmFyc1wiO1xyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCBkYXlqcyBmcm9tIFwiZGF5anNcIjtcclxuaW1wb3J0IHsgUzMgfSBmcm9tIFwiYXdzLXNka1wiO1xyXG5cclxuaW1wb3J0IHsgZG9jdW1lbnQgfSBmcm9tIFwiLi4vdXRpbHMvZHluYW1vZGJDbGllbnRcIjtcclxuXHJcblxyXG5cclxuaW50ZXJmYWNlIElDcmVhdGVDZXJ0aWZpY2F0ZSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgZ3JhZGU6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIElUZW1wbGF0ZSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgZ3JhZGU6IHN0cmluZztcclxuICBkYXRlOiBzdHJpbmc7XHJcbiAgbWVkYWw6IHN0cmluZztcclxufVxyXG5cclxuY29uc3QgY29tcGlsZSA9IGFzeW5jIGZ1bmN0aW9uIChkYXRhOiBJVGVtcGxhdGUpIHtcclxuXHJcbiAgLy9wZWdhbmRvIGNlcnRpZmljYXRlLmhic1xyXG4gIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwic3JjXCIsIFwidGVtcGxhdGVzXCIsIFwiY2VydGlmaWNhdGUuaGJzXCIpO1xyXG5cclxuICBjb25zdCBodG1sID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCBcInV0Zi04XCIpO1xyXG5cclxuICByZXR1cm4gaGFuZGxlYmFycy5jb21waWxlKGh0bWwpKGRhdGEpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlID0gYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgLy9yZWNlYmUgaWQsIG5vbWUgZSBub3RhXHJcbiAgY29uc3QgeyBpZCwgbmFtZSwgZ3JhZGUgfSA9IEpTT04ucGFyc2UoZXZlbnQuYm9keSkgYXMgSUNyZWF0ZUNlcnRpZmljYXRlO1xyXG5cclxuICAvL3ZlcmlmaWNhciBzZSB1c2VyIGV4aXN0ZVxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZG9jdW1lbnQucXVlcnkoe1xyXG4gICAgVGFibGVOYW1lOiBcInVzZXJzX2NlcnRpZmljYXRlc1wiLFxyXG4gICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogXCJpZCA9IDppZFwiLFxyXG4gICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xyXG4gICAgICBcIjppZFwiOiBpZCxcclxuICAgIH0sXHJcbiAgfSkucHJvbWlzZSgpO1xyXG5cclxuICBjb25zdCB1c2VyQWxyZWFkeUV4aXN0cyA9IHJlc3BvbnNlLkl0ZW1zWzBdO1xyXG5cclxuICBpZiAoIXVzZXJBbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAvL2luc2VyaXIgbmEgdGFiZWxhXHJcbiAgICBhd2FpdCBkb2N1bWVudC5wdXQoe1xyXG4gICAgICBUYWJsZU5hbWU6IFwidXNlcnNfY2VydGlmaWNhdGVzXCIsXHJcbiAgICAgIEl0ZW06IHsgLy8gZnVuY2lvbmEgY29tbyB1bWEgY29sdW5hIGRvIGJhbmNvIHJlbGFjaW9uYWxcclxuICAgICAgICBpZCxcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIGdyYWRlXHJcbiAgICAgIH0sXHJcbiAgICB9KS5wcm9taXNlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtZWRhbFBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJzcmNcIiwgXCJ0ZW1wbGF0ZXNcIiwgXCJzZWxvLnBuZ1wiKVxyXG4gIGNvbnN0IG1lZGFsID0gZnMucmVhZEZpbGVTeW5jKG1lZGFsUGF0aCwgXCJiYXNlNjRcIik7XHJcblxyXG4gIGNvbnN0IGRhdGE6IElUZW1wbGF0ZSA9IHtcclxuICAgIGRhdGU6IGRheWpzKCkuZm9ybWF0KFwiREQvTU0vWVlZWVwiKSxcclxuICAgIGdyYWRlLFxyXG4gICAgbmFtZSxcclxuICAgIGlkLFxyXG4gICAgbWVkYWwsXHJcbiAgfVxyXG4gIC8vR2VyYSBvIGNlcnRpZmljYWRvXHJcbiAgLy9jb21waWxhciB0ZW1wbGF0ZSBodG1sIHN1YnN0aXR1aW5kbyB2YXJpw6F2ZWlzIC0gaGFubGRlYmFyc1xyXG4gIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBjb21waWxlKGRhdGEpO1xyXG5cclxuICAvL0luc2VyaXIgdGVtcGxhdGUgbm8gY2hyb21pdW0gcGFyYSBjb252ZXJ0ZXIgcGRmXHJcbiAgLy9jcmlhbmRvIHVtIGJyb3dzZXJcclxuICBjb25zdCBicm93c2VyID0gYXdhaXQgY2hyb21pdW0ucHVwcGV0ZWVyLmxhdW5jaCh7XHJcbiAgICBoZWFkbGVzczogdHJ1ZSxcclxuICAgIGFyZ3M6IGNocm9taXVtLmFyZ3MsXHJcbiAgICBkZWZhdWx0Vmlld3BvcnQ6IGNocm9taXVtLmRlZmF1bHRWaWV3cG9ydCxcclxuICAgIGV4ZWN1dGFibGVQYXRoOiBhd2FpdCBjaHJvbWl1bS5leGVjdXRhYmxlUGF0aFxyXG4gIH0pO1xyXG5cclxuICAvL2NyaWFuZG8gcGFnaW5hXHJcbiAgY29uc3QgcGFnZSA9IGF3YWl0IGJyb3dzZXIubmV3UGFnZSgpO1xyXG5cclxuICAvL2NvbG9jYW5kbyBjb250ZXVkbyBuYSBww6FnaW5hXHJcbiAgYXdhaXQgcGFnZS5zZXRDb250ZW50KGNvbnRlbnQpO1xyXG5cclxuICAvL2dlcmFyIHBkZlxyXG4gIGNvbnN0IHBkZiA9IGF3YWl0IHBhZ2UucGRmKHtcclxuICAgIGZvcm1hdDogXCJhNFwiLFxyXG4gICAgbGFuZHNjYXBlOiB0cnVlLFxyXG4gICAgcGF0aDogcHJvY2Vzcy5lbnYuSVNfT0ZGTElORSA/IFwiY2VydGlmaWNhdGUucGRmXCIgOiBudWxsLFxyXG4gICAgcHJpbnRCYWNrZ3JvdW5kOiB0cnVlLFxyXG4gICAgcHJlZmVyQ1NTUGFnZVNpemU6IHRydWVcclxuICB9KVxyXG5cclxuICAvL2ZlY2hhciBicm93c2VyXHJcbiAgYXdhaXQgYnJvd3Nlci5jbG9zZSgpO1xyXG5cclxuICAvL0luc2VyaXIgcGRmIGdlcmFkbyBubyBhbWF6b24gczNcclxuICBjb25zdCBzMyA9IG5ldyBTMygpO1xyXG5cclxuICBhd2FpdCBzMy5wdXRPYmplY3Qoe1xyXG4gICAgQnVja2V0OiBcImNlcnRpZmljYXRlc2lnbml0ZW5vZGVzZXJ2ZXJsZXNzXCIsXHJcbiAgICBLZXk6IGAke2lkfS5wZGZgLFxyXG4gICAgQUNMOiBcInB1YmxpYy1yZWFkXCIsXHJcbiAgICBCb2R5OiBwZGYsXHJcbiAgICBDb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9wZGZcIlxyXG4gIH0pLnByb21pc2UoKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN0YXR1c0NvZGU6IDIwMSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgbWVzc2FnZTogXCJDZXJ0aWZpY2F0ZSBjcmVhdGVkIVwiLFxyXG4gICAgICB1cmw6IGBodHRwczovL2NlcnRpZmljYXRlc2lnbml0ZW5vZGVzZXJ2ZXJsZXNzLnMzLmFtYXpvbmF3cy5jb20vJHtpZH0ucGRmYFxyXG4gICAgfSksXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgfSxcclxuICB9O1xyXG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/functions/generateCertificate.ts\n");

/***/ }),

/***/ "./src/utils/dynamodbClient.ts":
/*!*************************************!*\
  !*** ./src/utils/dynamodbClient.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"document\": () => (/* binding */ document)\n/* harmony export */ });\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);\n\r\nconst options = {\r\n    region: \"localhost\",\r\n    endpoint: \"http://localhost:8000\"\r\n};\r\nconst isOffline = () => {\r\n    return process.env.IS_OFFLINE;\r\n};\r\nconst document = isOffline()\r\n    ? new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.DynamoDB.DocumentClient(options)\r\n    : new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.DynamoDB.DocumentClient();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdXRpbHMvZHluYW1vZGJDbGllbnQudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2lnbml0ZWNlcnRpZmljYXRlLy4vc3JjL3V0aWxzL2R5bmFtb2RiQ2xpZW50LnRzPzQ1MTMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHluYW1vREIgfSBmcm9tIFwiYXdzLXNka1wiO1xyXG5cclxuY29uc3Qgb3B0aW9ucyA9IHtcclxuICByZWdpb246IFwibG9jYWxob3N0XCIsXHJcbiAgZW5kcG9pbnQ6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDAwXCJcclxufVxyXG5cclxuY29uc3QgaXNPZmZsaW5lID0gKCkgPT4ge1xyXG4gIHJldHVybiBwcm9jZXNzLmVudi5JU19PRkZMSU5FO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZG9jdW1lbnQgPSBpc09mZmxpbmUoKVxyXG4gID8gbmV3IER5bmFtb0RCLkRvY3VtZW50Q2xpZW50KG9wdGlvbnMpXHJcbiAgOiBuZXcgRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/utils/dynamodbClient.ts\n");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),

/***/ "chrome-aws-lambda":
/*!************************************!*\
  !*** external "chrome-aws-lambda" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("chrome-aws-lambda");

/***/ }),

/***/ "dayjs":
/*!************************!*\
  !*** external "dayjs" ***!
  \************************/
/***/ ((module) => {

module.exports = require("dayjs");

/***/ }),

/***/ "handlebars":
/*!*****************************!*\
  !*** external "handlebars" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("handlebars");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

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
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/generateCertificate.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;