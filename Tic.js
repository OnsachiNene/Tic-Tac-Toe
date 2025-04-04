const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const resetButton = document.getElementById('reset-button');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let moves = 0;

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  moves++;

  if (checkWin()) {
    message.textContent = `${currentPlayer} wins!`;
    disableCells();
    return;
  }

  if (checkDraw()) {
    message.textContent = "It's a draw!";
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `${currentPlayer}'s turn`;
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return moves === 9;
}

function disableCells() {
  cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  moves = 0;
  message.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleCellClick);
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

message.textContent = `${currentPlayer}'s turn`;