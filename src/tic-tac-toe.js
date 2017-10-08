class TicTacToe {
    constructor() {
        this.field = [];
        
        for (var i = 0; i < 3; i++)
            this.field.push([]);

        for (var i = 0; i < 3; i++)
            for (var j = 0; j < 3; j++)
                this.field[i].push(null);

        this.symbol = 'x';
    }

    getCurrentPlayerSymbol() {
        return this.symbol;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.field[rowIndex][columnIndex] !== null)
            return;

        this.field[rowIndex][columnIndex] = this.symbol;
        this.symbol = this.symbol === 'x' ? 'o' : 'x';
    }

    isFinished() {
        return this.getWinner() !== null || this.isDraw();
    }

    getWinner() {
        var symb = null;

        //testing lines
        this.field.forEach(function(line) {
            if ((symb === null) && line.every(function(element, index, array) {
                return line[0] !== null && element === line[0];
            })) {
                symb = line[0];
            }

        });

        if (symb !== null)
            return symb;

        //testing columns
        var isEqual;
        for (var i = 0; i < 3; i++)
        {
            isEqual = true;
            for (var j = 0; j < 3; j++)
                if (this.field[j][i] === null || this.field[j][i] !== this.field[0][i]) {
                    isEqual = false;
                    break;
                }

            if (isEqual)
                return this.field[0][i];
        }

        //testing diagonales
        isEqual = true;
        for (var i = 0; i < 3; i++) {
            if (this.field[i][i] === null || this.field[i][i] !== this.field[0][0]) {
                isEqual = false;
                break;
            }
        }

        if (isEqual)
            return this.field[0][0];

        isEqual = true;
        for (var i = 0; i < 3; i++) {
            if (this.field[i][2 - i] === null || this.field[i][2 - i] !== this.field[0][2]) {
                isEqual = false;
                break;
            }
        }

        return isEqual ? this.field[0][2] : null;
    }

    noMoreTurns() {
        return this.field.every(function(line, indexLine, arrayLine) {
            return line.every(function(element, index, array){
                return element !== null;
            }); 
        });
    }

    isDraw() {
        return this.getWinner() === null && this.noMoreTurns();
    }

    getFieldValue(rowIndex, colIndex) {
        return this.field[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
