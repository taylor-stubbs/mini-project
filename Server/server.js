const express = require('express');

const app = express();

app.use(express.static('../Source'));
app.use(express.json());
app.use(express.urlencoded());

const game = {
  players: ['red', 'yellow'],
  board: [],
  turn: 0,
  winner: null,
};

function createBoard(row, col) {
  const boardArray = [];
  for (let i = 0; i < col; i += 1) {
    const colArray = [];
    for (let j = 0; j < row; j += 1) {
      colArray.push(null);
    }
    boardArray.push(colArray);
  }
  return boardArray;
}

app.post('/board', (req, res) => {
  console.log(req.body);
  game.board = createBoard(req.body.row, req.body.col);
  res.send(game.board);
});
app.listen(8080, () => {
  console.log('Server loaded...');
});
