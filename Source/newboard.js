/* eslint-disable max-classes-per-file */
class Player {
  constructor(name, colour) {
    this.name = name;
    this.colour = colour;
    this.winCount = 0;
  }

  win() {
    this.winCount += 1;
  }
}

class Board {
    constructor(row, column) {

    }

    createBoard(row, column) {
        for(let i = 0; i < column; i++) {
          
        }
    }
}