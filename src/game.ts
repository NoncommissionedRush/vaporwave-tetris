import { Block, BlockShape } from './block';
import { CellState, Board } from './game-board';

export enum Direction {
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}

export class Game {
    private board: Board;
    private currentBlock: Block;
    private MAX_SPEED = 20;
    private speed = 500;
    private gameLoopInterval: NodeJS.Timeout;
    private score = 0;
    private level = 1;
    private gameOn = false;
    private musicOn = false;

    constructor() {
        this.board = new Board(10, 20);
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    initialize() {
        this.board.render();
        this.updateScoreBoard(this.score);
    }

    private start() {
        if (!this.gameOn) {
            this.board.clear();
            this.updateScoreBoard(this.score);
            this.playAudio();
            this.currentBlock = new Block();
            this.currentBlock.render();
            this.setSpeed(this.speed);
            this.gameOn = true;
        }
    }

    private updateScoreBoard(score: number) {
        const scoreBoard = document.getElementById('scoreboard');

        scoreBoard.textContent = `Score: ${score} 

        Level: ${this.level}`;
    }

    private getCellElement(x: number, y: number) {
        const rowElement = document.querySelector(
            '.row:nth-child(' + (y + 1) + ')',
        );
        return rowElement?.querySelector('.cell:nth-child(' + (x + 1) + ')');
    }

    private update() {
        if (!this.willCollide(Direction.DOWN)) {
            this.currentBlock.moveDown();
        } else {
            for (const cell of this.currentBlock.boardCells) {
                this.board.setCell(cell.x, cell.y, CellState.Filled);
            }

            this.currentBlock = undefined;

            if (this.board.getCell(4, 0) === CellState.Empty) {
                this.currentBlock = new Block();
                this.currentBlock.render();
            } else {
                clearInterval(this.gameLoopInterval);
                this.gameOn = false;
                this.score = 0;
                this.level = 1;
                this.speed = 500;
            }
        }

        // check for and process cleared rows
        this.processClearedRowsIfAny();
    }

    private willCollide(direction: Direction): boolean {
        for (const cell of this.currentBlock.boardCells) {
            let nextX: number;
            let nextY: number;

            switch (direction) {
                case Direction.DOWN:
                    nextX = cell.x;
                    nextY = cell.y + 1;
                    break;
                case Direction.LEFT:
                    nextX = cell.x - 1;
                    nextY = cell.y;
                    break;
                case Direction.RIGHT:
                    nextX = cell.x + 1;
                    nextY = cell.y;
            }

            const boardCell = this.board.getCell(nextX, nextY);

            if (boardCell === undefined || boardCell === CellState.Filled) {
                return true;
            }
        }

        return false;
    }

    private handleKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowLeft':
                this.moveBlockLeft();
                break;
            case 'ArrowRight':
                this.moveBlockRight();
                break;
            case 'ArrowUp':
                this.rotateBlock();
                break;
            case 'ArrowDown':
                if (this.gameOn) {
                    this.setSpeed(this.MAX_SPEED);
                }
                break;
            case 'Space':
                this.start();
                break;
        }
    }

    private setSpeed(speed: number) {
        if (this.gameLoopInterval) {
            clearInterval(this.gameLoopInterval);
        }

        this.gameLoopInterval = setInterval(() => {
            this.update();
        }, speed);
    }

    private handleKeyUp(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowDown':
                if (this.gameOn) {
                    this.setSpeed(this.speed);
                }
                break;
        }
    }

    private moveBlockLeft() {
        if (!this.willCollide(Direction.LEFT)) {
            this.currentBlock.moveLeft();
        }
    }

    private moveBlockRight() {
        if (!this.willCollide(Direction.RIGHT)) {
            this.currentBlock.moveRight();
        }
    }

    private rotateBlock() {
        const nextOrientationIndex =
            (this.currentBlock.currentOrientationIndex + 1) %
            this.currentBlock.type.orientations.length;

        const nextOrientation =
            this.currentBlock.type.orientations[nextOrientationIndex];

        if (!this.canRotate(nextOrientation)) {
            return;
        }

        for (const cell of this.currentBlock.boardCells) {
            cell.element.classList.remove(
                'filled',
                this.currentBlock.type.shape,
            );
        }

        this.currentBlock.boardCells = [];

        nextOrientation.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === 1) {
                    const absoluteX = this.currentBlock.x + colIndex;
                    const absoluteY = this.currentBlock.y + rowIndex;

                    const cellElement = this.getCellElement(
                        absoluteX,
                        absoluteY,
                    );

                    cellElement.classList.add(
                        'filled',
                        this.currentBlock.type.shape,
                    );

                    this.currentBlock.boardCells.push({
                        element: cellElement,
                        x: absoluteX,
                        y: absoluteY,
                    });
                }
            });
        });

        this.currentBlock.currentOrientationIndex = nextOrientationIndex;
    }

    private canRotate(orientation: BlockShape): boolean {
        let result = true;

        for (const [rowIndex, row] of orientation.entries()) {
            for (const [colIndex, col] of row.entries()) {
                const x = this.currentBlock.x + colIndex;
                const y = this.currentBlock.y + rowIndex;

                const boardCell = this.board.getCell(x, y);

                if (boardCell === undefined || boardCell === CellState.Filled) {
                    result = false;
                    break;
                }
            }
        }

        return result;
    }

    private processClearedRowsIfAny() {
        const filledRows = this.board.getFilledRows();

        if (!filledRows.length) return;

        for (const row of filledRows) {
            this.board.shiftDownFrom(row);

            for (let i = 0; i < this.board.width; i++) {
                const cell = this.getCellElement(i, row);
                cell.classList.remove('filled');
            }

            for (let y = row; y > 0; y--) {
                for (let x = 0; x < this.board.width; x++) {
                    const boardCell = this.board.getCell(x, y);
                    if (boardCell !== CellState.Filled) continue;
                    const cellElement = this.getCellElement(x, y);
                    const cellAboveElement = this.getCellElement(x, y - 1);
                    const cellAboveClasses = Array.from(
                        cellAboveElement.classList,
                    ).filter(c => c !== 'cell');

                    if (cellAboveElement.classList.contains('filled')) {
                        cellElement.classList.add(...cellAboveClasses);
                        cellAboveElement.classList.remove(...cellAboveClasses);
                    }
                }
            }
        }

        this.score += filledRows.length * 10;

        this.updateScoreBoard(this.score);

        this.updateLevel();

        const player = new Audio('assets/clear.wav');

        player.volume = 0.4;

        player.play();

        this.board.shake();
    }

    private updateLevel() {
        const hundreds = Math.floor(this.score / 100) + 1;

        if (hundreds > this.level) {
            this.level = hundreds;
            this.speed -= 50;
            this.setSpeed(this.speed);
        }
    }

    private playAudio() {
        if (!this.musicOn) {
            const audioPlayer = new Audio('assets/music.mp3');
            audioPlayer.loop = true;
            audioPlayer.play();
            this.musicOn = true;
        }
    }
}
