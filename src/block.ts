export type BlockShape = number[][];

export type BlockCell = {
    element: Element;
    x: number;
    y: number;
};

export type BlockType = {
    shape: 'I' | 'J' | 'L' | 'O' | 'T' | 'S' | 'Z';
    orientations: BlockShape[];
};

export const BlockOrientations: BlockType[] = [
    {
        shape: 'I',
        orientations: [[[1], [1], [1], [1]], [[1, 1, 1, 1]]],
    },
    {
        shape: 'J',
        orientations: [
            [
                [0, 0, 1],
                [1, 1, 1],
            ],
            [
                [1, 0],
                [1, 0],
                [1, 1],
            ],
            [
                [1, 1, 1],
                [1, 0, 0],
            ],
            [
                [1, 1],
                [0, 1],
                [0, 1],
            ],
        ],
    },
    {
        shape: 'L',
        orientations: [
            [
                [1, 0, 0],
                [1, 1, 1],
            ],
            [
                [1, 1],
                [1, 0],
                [1, 0],
            ],
            [
                [1, 1, 1],
                [0, 0, 1],
            ],
            [
                [0, 1],
                [0, 1],
                [1, 1],
            ],
        ],
    },

    {
        shape: 'O',
        orientations: [
            [
                [1, 1],
                [1, 1],
            ],
        ],
    },
    {
        shape: 'T',
        orientations: [
            [
                [0, 1, 0],
                [1, 1, 1],
            ],
            [
                [1, 0],
                [1, 1],
                [1, 0],
            ],
            [
                [1, 1, 1],
                [0, 1, 0],
            ],
            [
                [0, 1],
                [1, 1],
                [0, 1],
            ],
        ],
    },
    {
        shape: 'S',
        orientations: [
            [
                [0, 1, 1],
                [1, 1, 0],
            ],
            [
                [1, 0],
                [1, 1],
                [0, 1],
            ],
        ],
    },
    {
      shape: "Z",
      orientations: [
        [
            [1, 1, 0],
            [0, 1, 1],
        ],
        [
            [0, 1],
            [1, 1],
            [1, 0],
        ],
    ]
    }
];

export class Block {
    type: BlockType;
    currentOrientation: BlockShape;
    currentOrientationIndex = 0;
    boardCells: BlockCell[] = [];
    x = 4;
    y = 0;

    constructor() {
        const shapeIndex = Math.floor(Math.random() * BlockOrientations.length);
        this.type = BlockOrientations[shapeIndex];
        this.currentOrientation =
            this.type.orientations[this.currentOrientationIndex];
    }

    render() {
        this.currentOrientation.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === 1) {
                    const absoluteX = this.x + colIndex;
                    const absoluteY = this.y + rowIndex;

                    const cellElement = this.getCellElement(
                        absoluteX,
                        absoluteY,
                    );

                    cellElement.classList.add('filled', this.type.shape);

                    this.boardCells.push({
                        element: cellElement,
                        x: absoluteX,
                        y: absoluteY,
                    });
                }
            });
        });
    }

    moveDown() {
        for (const cell of this.boardCells) {
            cell.element.classList.remove('filled', this.type.shape);
        }

        for (const cell of this.boardCells) {
            cell.element = this.getCellElement(cell.x, cell.y + 1);
            cell.element.classList.add('filled', this.type.shape);
            cell.y++;
        }

        this.y++;
    }

    private getCellElement(x: number, y: number) {
        const rowElement = document.querySelector(
            '.row:nth-child(' + (y + 1) + ')',
        );
        return rowElement?.querySelector('.cell:nth-child(' + (x + 1) + ')');
    }

    moveLeft() {
        for (const cell of this.boardCells) {
            cell.element.classList.remove('filled', this.type.shape);
        }

        for (const cell of this.boardCells) {
            cell.element = this.getCellElement(cell.x - 1, cell.y);
            cell.element.classList.add('filled', this.type.shape);
            cell.x--;
        }
        this.x--;
    }

    moveRight() {
        for (const cell of this.boardCells) {
            cell.element.classList.remove('filled', this.type.shape);
        }

        for (const cell of this.boardCells) {
            cell.element = this.getCellElement(cell.x + 1, cell.y);
            cell.element.classList.add('filled', this.type.shape);
            cell.x++;
        }

        this.x++;
    }
}
