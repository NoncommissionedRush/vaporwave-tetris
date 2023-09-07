/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/block.ts":
/*!**********************!*\
  !*** ./src/block.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Block = exports.BlockOrientations = void 0;\nexports.BlockOrientations = [\n    {\n        shape: 'I',\n        orientations: [[[1], [1], [1], [1]], [[1, 1, 1, 1]]],\n    },\n    {\n        shape: 'J',\n        orientations: [\n            [\n                [0, 0, 1],\n                [1, 1, 1],\n            ],\n            [\n                [1, 0],\n                [1, 0],\n                [1, 1],\n            ],\n            [\n                [1, 1, 1],\n                [1, 0, 0],\n            ],\n            [\n                [1, 1],\n                [0, 1],\n                [0, 1],\n            ],\n        ],\n    },\n    {\n        shape: 'L',\n        orientations: [\n            [\n                [1, 0, 0],\n                [1, 1, 1],\n            ],\n            [\n                [1, 1],\n                [1, 0],\n                [1, 0],\n            ],\n            [\n                [1, 1, 1],\n                [0, 0, 1],\n            ],\n            [\n                [0, 1],\n                [0, 1],\n                [1, 1],\n            ],\n        ],\n    },\n    {\n        shape: 'O',\n        orientations: [\n            [\n                [1, 1],\n                [1, 1],\n            ],\n        ],\n    },\n    {\n        shape: 'T',\n        orientations: [\n            [\n                [0, 1, 0],\n                [1, 1, 1],\n            ],\n            [\n                [1, 0],\n                [1, 1],\n                [1, 0],\n            ],\n            [\n                [1, 1, 1],\n                [0, 1, 0],\n            ],\n            [\n                [0, 1],\n                [1, 1],\n                [0, 1],\n            ],\n        ],\n    },\n    {\n        shape: 'S',\n        orientations: [\n            [\n                [0, 1, 1],\n                [1, 1, 0],\n            ],\n            [\n                [1, 0],\n                [1, 1],\n                [0, 1],\n            ],\n        ],\n    },\n    {\n        shape: \"Z\",\n        orientations: [\n            [\n                [1, 1, 0],\n                [0, 1, 1],\n            ],\n            [\n                [0, 1],\n                [1, 1],\n                [1, 0],\n            ],\n        ]\n    }\n];\nclass Block {\n    constructor() {\n        this.currentOrientationIndex = 0;\n        this.boardCells = [];\n        this.x = 4;\n        this.y = 0;\n        const shapeIndex = Math.floor(Math.random() * exports.BlockOrientations.length);\n        this.type = exports.BlockOrientations[shapeIndex];\n        this.currentOrientation =\n            this.type.orientations[this.currentOrientationIndex];\n    }\n    render() {\n        this.currentOrientation.forEach((row, rowIndex) => {\n            row.forEach((cell, colIndex) => {\n                if (cell === 1) {\n                    const absoluteX = this.x + colIndex;\n                    const absoluteY = this.y + rowIndex;\n                    const cellElement = this.getCellElement(absoluteX, absoluteY);\n                    cellElement.classList.add('filled', this.type.shape);\n                    this.boardCells.push({\n                        element: cellElement,\n                        x: absoluteX,\n                        y: absoluteY,\n                    });\n                }\n            });\n        });\n    }\n    moveDown() {\n        for (const cell of this.boardCells) {\n            cell.element.classList.remove('filled', this.type.shape);\n        }\n        for (const cell of this.boardCells) {\n            cell.element = this.getCellElement(cell.x, cell.y + 1);\n            cell.element.classList.add('filled', this.type.shape);\n            cell.y++;\n        }\n        this.y++;\n    }\n    getCellElement(x, y) {\n        const rowElement = document.querySelector('.row:nth-child(' + (y + 1) + ')');\n        return rowElement === null || rowElement === void 0 ? void 0 : rowElement.querySelector('.cell:nth-child(' + (x + 1) + ')');\n    }\n    moveLeft() {\n        for (const cell of this.boardCells) {\n            cell.element.classList.remove('filled', this.type.shape);\n        }\n        for (const cell of this.boardCells) {\n            cell.element = this.getCellElement(cell.x - 1, cell.y);\n            cell.element.classList.add('filled', this.type.shape);\n            cell.x--;\n        }\n        this.x--;\n    }\n    moveRight() {\n        for (const cell of this.boardCells) {\n            cell.element.classList.remove('filled', this.type.shape);\n        }\n        for (const cell of this.boardCells) {\n            cell.element = this.getCellElement(cell.x + 1, cell.y);\n            cell.element.classList.add('filled', this.type.shape);\n            cell.x++;\n        }\n        this.x++;\n    }\n}\nexports.Block = Block;\n\n\n//# sourceURL=webpack://tetris/./src/block.ts?");

/***/ }),

/***/ "./src/game-board.ts":
/*!***************************!*\
  !*** ./src/game-board.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Board = exports.CellState = void 0;\nvar CellState;\n(function (CellState) {\n    CellState[CellState[\"Empty\"] = 0] = \"Empty\";\n    CellState[CellState[\"Filled\"] = 1] = \"Filled\";\n})(CellState || (exports.CellState = CellState = {}));\nclass Board {\n    constructor(width, height) {\n        this.width = width;\n        this.height = height;\n        this.grid = [];\n        for (let row = 0; row < height; row++) {\n            this.grid[row] = Array.from({ length: width }, () => CellState.Empty);\n        }\n    }\n    setCell(x, y, block) {\n        if (this.isValidPosition(x, y)) {\n            this.grid[y][x] = block;\n        }\n    }\n    getCell(x, y) {\n        var _a;\n        return (_a = this.grid[y]) === null || _a === void 0 ? void 0 : _a[x];\n    }\n    isValidPosition(x, y) {\n        return x >= 0 && x < this.width && y >= 0 && y < this.height;\n    }\n    shiftDownFrom(row) {\n        for (let y = row; y > 1 - 1; y--) {\n            this.grid[y] = [...this.grid[y - 1]];\n        }\n        // Create a new array for the last row\n        this.grid[0] = Array.from({ length: this.width }, () => CellState.Empty);\n    }\n    isRowFilled(row) {\n        for (let x = 0; x < this.width; x++) {\n            if (this.grid[row][x] === CellState.Empty) {\n                return false;\n            }\n        }\n        return true;\n    }\n    getFilledRows() {\n        const filledRows = [];\n        for (let row = 0; row < this.height; row++) {\n            const isRowFilled = this.isRowFilled(row);\n            if (isRowFilled) {\n                filledRows.push(row);\n            }\n        }\n        return filledRows;\n    }\n    getCellElement(x, y) {\n        const rowElement = document.querySelector('.row:nth-child(' + (y + 1) + ')');\n        return rowElement === null || rowElement === void 0 ? void 0 : rowElement.querySelector('.cell:nth-child(' + (x + 1) + ')');\n    }\n    clear() {\n        for (let row = 0; row < this.height; row++) {\n            for (let column = 0; column < this.width; column++) {\n                const element = this.getCellElement(column, row);\n                const classes = [...element.classList].filter(c => c !== 'cell');\n                element.classList.remove(...classes);\n                this.setCell(column, row, CellState.Empty);\n            }\n        }\n    }\n    render() {\n        const gameContainer = document.getElementById('game-container');\n        for (let y = 0; y < this.height; y++) {\n            const rowElement = document.createElement('div');\n            rowElement.className = 'row';\n            for (let x = 0; x < this.width; x++) {\n                const cellElement = document.createElement('div');\n                cellElement.className = 'cell';\n                rowElement.appendChild(cellElement);\n            }\n            gameContainer.appendChild(rowElement);\n        }\n    }\n    shake() {\n        const gameContainer = document.getElementById('game-container');\n        gameContainer.classList.add('shake');\n        setTimeout(() => {\n            gameContainer.classList.remove('shake');\n        }, 500);\n    }\n}\nexports.Board = Board;\n\n\n//# sourceURL=webpack://tetris/./src/game-board.ts?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Game = exports.Direction = void 0;\nconst block_1 = __webpack_require__(/*! ./block */ \"./src/block.ts\");\nconst game_board_1 = __webpack_require__(/*! ./game-board */ \"./src/game-board.ts\");\nvar Direction;\n(function (Direction) {\n    Direction[\"DOWN\"] = \"DOWN\";\n    Direction[\"LEFT\"] = \"LEFT\";\n    Direction[\"RIGHT\"] = \"RIGHT\";\n})(Direction || (exports.Direction = Direction = {}));\nclass Game {\n    constructor() {\n        this.MAX_SPEED = 20;\n        this.speed = 500;\n        this.score = 0;\n        this.level = 1;\n        this.gameOn = false;\n        this.musicOn = false;\n        this.board = new game_board_1.Board(10, 20);\n        window.addEventListener('keydown', this.handleKeyDown.bind(this));\n        window.addEventListener('keyup', this.handleKeyUp.bind(this));\n    }\n    initialize() {\n        this.board.render();\n        this.updateScoreBoard(this.score);\n    }\n    start() {\n        if (!this.gameOn) {\n            this.board.clear();\n            this.updateScoreBoard(this.score);\n            this.playAudio();\n            this.currentBlock = new block_1.Block();\n            this.currentBlock.render();\n            this.setSpeed(this.speed);\n            this.gameOn = true;\n        }\n    }\n    updateScoreBoard(score) {\n        const scoreBoard = document.getElementById('scoreboard');\n        scoreBoard.textContent = `Score: ${score} \n\n        Level: ${this.level}`;\n    }\n    getCellElement(x, y) {\n        const rowElement = document.querySelector('.row:nth-child(' + (y + 1) + ')');\n        return rowElement === null || rowElement === void 0 ? void 0 : rowElement.querySelector('.cell:nth-child(' + (x + 1) + ')');\n    }\n    update() {\n        if (!this.willCollide(Direction.DOWN)) {\n            this.currentBlock.moveDown();\n        }\n        else {\n            for (const cell of this.currentBlock.boardCells) {\n                this.board.setCell(cell.x, cell.y, game_board_1.CellState.Filled);\n            }\n            this.currentBlock = undefined;\n            if (this.board.getCell(4, 0) === game_board_1.CellState.Empty) {\n                this.currentBlock = new block_1.Block();\n                this.currentBlock.render();\n            }\n            else {\n                clearInterval(this.gameLoopInterval);\n                this.gameOn = false;\n                this.score = 0;\n                this.level = 1;\n                this.speed = 500;\n            }\n        }\n        // check for and process cleared rows\n        this.processClearedRowsIfAny();\n    }\n    willCollide(direction) {\n        for (const cell of this.currentBlock.boardCells) {\n            let nextX;\n            let nextY;\n            switch (direction) {\n                case Direction.DOWN:\n                    nextX = cell.x;\n                    nextY = cell.y + 1;\n                    break;\n                case Direction.LEFT:\n                    nextX = cell.x - 1;\n                    nextY = cell.y;\n                    break;\n                case Direction.RIGHT:\n                    nextX = cell.x + 1;\n                    nextY = cell.y;\n            }\n            const boardCell = this.board.getCell(nextX, nextY);\n            if (boardCell === undefined || boardCell === game_board_1.CellState.Filled) {\n                return true;\n            }\n        }\n        return false;\n    }\n    handleKeyDown(event) {\n        switch (event.code) {\n            case 'ArrowLeft':\n                this.moveBlockLeft();\n                break;\n            case 'ArrowRight':\n                this.moveBlockRight();\n                break;\n            case 'ArrowUp':\n                this.rotateBlock();\n                break;\n            case 'ArrowDown':\n                if (this.gameOn) {\n                    this.setSpeed(this.MAX_SPEED);\n                }\n                break;\n            case 'Space':\n                this.start();\n                break;\n        }\n    }\n    setSpeed(speed) {\n        if (this.gameLoopInterval) {\n            clearInterval(this.gameLoopInterval);\n        }\n        this.gameLoopInterval = setInterval(() => {\n            this.update();\n        }, speed);\n    }\n    handleKeyUp(event) {\n        switch (event.code) {\n            case 'ArrowDown':\n                if (this.gameOn) {\n                    this.setSpeed(this.speed);\n                }\n                break;\n        }\n    }\n    moveBlockLeft() {\n        if (!this.willCollide(Direction.LEFT)) {\n            this.currentBlock.moveLeft();\n        }\n    }\n    moveBlockRight() {\n        if (!this.willCollide(Direction.RIGHT)) {\n            this.currentBlock.moveRight();\n        }\n    }\n    rotateBlock() {\n        const nextOrientationIndex = (this.currentBlock.currentOrientationIndex + 1) %\n            this.currentBlock.type.orientations.length;\n        const nextOrientation = this.currentBlock.type.orientations[nextOrientationIndex];\n        if (!this.canRotate(nextOrientation)) {\n            return;\n        }\n        for (const cell of this.currentBlock.boardCells) {\n            cell.element.classList.remove('filled', this.currentBlock.type.shape);\n        }\n        this.currentBlock.boardCells = [];\n        nextOrientation.forEach((row, rowIndex) => {\n            row.forEach((cell, colIndex) => {\n                if (cell === 1) {\n                    const absoluteX = this.currentBlock.x + colIndex;\n                    const absoluteY = this.currentBlock.y + rowIndex;\n                    const cellElement = this.getCellElement(absoluteX, absoluteY);\n                    cellElement.classList.add('filled', this.currentBlock.type.shape);\n                    this.currentBlock.boardCells.push({\n                        element: cellElement,\n                        x: absoluteX,\n                        y: absoluteY,\n                    });\n                }\n            });\n        });\n        this.currentBlock.currentOrientationIndex = nextOrientationIndex;\n    }\n    canRotate(orientation) {\n        let result = true;\n        for (const [rowIndex, row] of orientation.entries()) {\n            for (const [colIndex, col] of row.entries()) {\n                const x = this.currentBlock.x + colIndex;\n                const y = this.currentBlock.y + rowIndex;\n                const boardCell = this.board.getCell(x, y);\n                if (boardCell === undefined || boardCell === game_board_1.CellState.Filled) {\n                    result = false;\n                    break;\n                }\n            }\n        }\n        return result;\n    }\n    processClearedRowsIfAny() {\n        const filledRows = this.board.getFilledRows();\n        if (!filledRows.length)\n            return;\n        for (const row of filledRows) {\n            this.board.shiftDownFrom(row);\n            for (let i = 0; i < this.board.width; i++) {\n                const cell = this.getCellElement(i, row);\n                cell.classList.remove('filled');\n            }\n            for (let y = row; y > 0; y--) {\n                for (let x = 0; x < this.board.width; x++) {\n                    const boardCell = this.board.getCell(x, y);\n                    if (boardCell !== game_board_1.CellState.Filled)\n                        continue;\n                    const cellElement = this.getCellElement(x, y);\n                    const cellAboveElement = this.getCellElement(x, y - 1);\n                    const cellAboveClasses = Array.from(cellAboveElement.classList).filter(c => c !== 'cell');\n                    if (cellAboveElement.classList.contains('filled')) {\n                        cellElement.classList.add(...cellAboveClasses);\n                        cellAboveElement.classList.remove(...cellAboveClasses);\n                    }\n                }\n            }\n        }\n        this.score += filledRows.length * 10;\n        this.updateScoreBoard(this.score);\n        this.updateLevel();\n        const player = new Audio('assets/clear.wav');\n        player.volume = 0.4;\n        player.play();\n        this.board.shake();\n    }\n    updateLevel() {\n        const hundreds = Math.floor(this.score / 100) + 1;\n        if (hundreds > this.level) {\n            this.level = hundreds;\n            this.speed -= 50;\n            this.setSpeed(this.speed);\n        }\n    }\n    playAudio() {\n        if (!this.musicOn) {\n            const audioPlayer = new Audio('assets/music.mp3');\n            audioPlayer.loop = true;\n            audioPlayer.play();\n            this.musicOn = true;\n        }\n    }\n}\nexports.Game = Game;\n\n\n//# sourceURL=webpack://tetris/./src/game.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst game_1 = __webpack_require__(/*! ./game */ \"./src/game.ts\");\nconst game = new game_1.Game();\ngame.initialize();\n\n\n//# sourceURL=webpack://tetris/./src/index.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;