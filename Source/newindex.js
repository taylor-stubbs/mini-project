/* eslint-disable max-classes-per-file */

// Stores data regarding the Player
class Player {
  constructor(name, colour) {
    this.name = name;
    this.colour = colour;
    this.winCount = 0;
  }

  addWin() {
    this.winCount += 1;
  }
}

// Stores state of the game
class State {
  turn = 0
  players = []
  board;
  winner = null

  
  constructor(player1, player2, row, col) {
    this.players.push(player1);
    this.players.push(player2);
    this.createBoard();
  }

  createBoard(row, col) {
    let boardArray = [];
    for (let i = 0; i < col; i += 1) {
      const colArray = [];
      for (let j = 0; j < row; j += 1) {
        colArray.push(null)
      }
      boardArray.push(colArray);
    }
  this.board = boardArray;
  }
  
  switchTurn() {
    currentPlayer = Math.abs(this.currentPlayer - 1)
  }

  
  // W.I.P. - can we make more efficient by simplifying into one for loop?
  checkWin(row, col) {
    currentPlayer = this.players[turn];
    let count = 0;
    let win = false;

    // Check win for column.
    for (let rowPointer = 0; rowPointer < this.rowMax; rowPointer += 1) {
      if (this.grid[col][rowPointer] === currentPlayer) {
        count +=1;
      } else {
        count = 0;
      }
      if (count >= 4) {
        win = true;
      }
    }
    count = 0;
    for(let colPointer = 0; colPointer < this.colMax; colPointer++) {
      if(this.grid[colPointer, row] === player) {
        count += 1;
      } else {
        count = 0;
      }
      if (count >= 4) {
        win = true;
      }
    }
    if (win) {
      this.winner = currentPlayer
    }
  }

   // W.I.P. - can we make more efficient by checking if column full first?
  placeCounter(col) {
    currentPlayer = this.players[this.turn];
    let placed = false; // Has the counter been placed?
    let rowPointer = this.grid[col].length - 1;
    for (rowPointer; rowPointer >= 0; rowPointer -= 1) {
      if (this.grid[col][rowPointer] === null) { // If current position is empty place counter
        grid[col][rowPointer] = currentPlayer;
        placed = true;
      }
    }
    return placed;
  }

  get winner() {
    return this.winner
  }

  render() {
    for (let i = 0; i < this.board[0].length; i += 1) {
      $('#game-board').append(`<div id = "${i}" class = "column flex-container"></div>`);
      $(`#${i}`).on('click', () => {
        placeCounter(i);
      });
      for (let j = 0; j < this.board.length; j += 1) {
        $(`#${i}`).append(`<div id = "${i}-${j}" class = "row"></div>`);
      }
    }
  }
}

function startGame() {
  let p1 = new Player('Taylor', 'red');
  let p2 = new Player('Gregg', 'yellow');
  
  let game = new State(p1, p2, rowInput, colInput);
  game.render();
}

function init() {
  
}


document.onload = init()
