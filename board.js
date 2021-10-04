class board {
    constructor(game) {
        this.game = game;
        this.isGameOver = false;
        this.data = [
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
        ];
    }

    isEmptyCell(row, col) {
        return this.data[row][col] == _;
    }
    isRowFull(row) {
        let full = true;
        for (let col = 0; col < NUM_COLS; col++) {
            if (this.isEmptyCell(row, col)) {
                full = false;
            }
        }
        return full;
    }
    checkFullRows() {
        let tempScore = 0;
        for (let row = NUM_ROWS - 1; row >= 0; row--) {
            if (this.isRowFull(row)) {
                tempScore++;
                this.removeRow(row);
            }
        }
        SCORE += tempScore * 2;
        renderScore();
    }

    checkGameOver() {
        for (let col = 0; col < NUM_COLS; col++) {
            if (this.data[0][col] == x) {
                this.isGameOver = true;
            }
        }
    }

    removeRow(row) {
        this.data.splice(row, 1);
        this.data.unshift([_, _, _, _, _, _, _, _, _, _]);
        this.createDots();
    }

    createDots() {
        this.dots = [];
        for (let row = 0; row < NUM_ROWS; row++) {
            for (let col = 0; col < NUM_COLS; col++) {
                if (this.data[row][col] == x) {
                    let newDot = new dot(this.game, row, col);
                    this.dots.push(newDot);
                }
            }
        }
    }

    clearBoard() {
        for (let row = 0; row < NUM_ROWS; row++) {
            for (let col = 0; col < NUM_COLS; col++) {
                this.data[row][col] = _;
            }
        }
        this.draw();
    }

    draw() {
        this.createDots();
        this.dots.forEach((dot) => dot.draw());
        this.checkGameOver();
    }
}