export enum CellState {
    Empty,
    Filled,
}

export class Board {
    width: number;
    height: number;
    grid: CellState[][];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.grid = [];

        for (let row = 0; row < height; row++) {
            this.grid[row] = Array.from({ length: width }, () => CellState.Empty);
        }
    }

    setCell(x: number, y: number, block: CellState) {
        if (this.isValidPosition(x, y)) {
            this.grid[y][x] = block;
        }
    }

    getCell(x: number, y: number): CellState {
        return this.grid[y]?.[x];
    }

    isValidPosition(x: number, y: number): boolean {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    shiftDownFrom(row: number) {
        for (let y = row; y > 1 - 1; y--) {
          this.grid[y] = [...this.grid[y - 1]];
        }
      
        // Create a new array for the last row
        this.grid[0] = Array.from(
          { length: this.width },
          () => CellState.Empty
        );
      }

    isRowFilled(row: number): boolean {
        for (let x = 0; x < this.width; x++) {
            if (this.grid[row][x] === CellState.Empty) {
                return false;
            }
        }

        return true;
    }

    getFilledRows(): number[] {
        const filledRows: number[] = [];

        for (let row = 0; row < this.height; row++) {
            const isRowFilled = this.isRowFilled(row);

            if (isRowFilled) {
                filledRows.push(row);
            }
        }

        return filledRows;
    }

    private getCellElement(x: number, y: number) {
        const rowElement = document.querySelector(
            '.row:nth-child(' + (y + 1) + ')',
        );
        return rowElement?.querySelector('.cell:nth-child(' + (x + 1) + ')');
    }

    clear(){
        for(let row = 0; row < this.height; row++) {
            for(let column = 0; column < this.width; column++){
                const element = this.getCellElement(column, row)
                const classes = [...element.classList].filter(c => c !== 'cell')
                element.classList.remove(...classes)
                this.setCell(column, row, CellState.Empty)
            }
        }
    }

    render() {
        const gameContainer = document.getElementById('game-container');

        for (let y = 0; y < this.height; y++) {
            const rowElement = document.createElement('div');

            rowElement.className = 'row';

            for (let x = 0; x < this.width; x++) {
                const cellElement = document.createElement('div');

                cellElement.className = 'cell';

                rowElement.appendChild(cellElement);
            }

            gameContainer.appendChild(rowElement);
        }
    }

   shake() {
        const gameContainer = document.getElementById('game-container');

        gameContainer.classList.add('shake')

        setTimeout(() => {
            gameContainer.classList.remove('shake')
        }, 500)

   } 
}
