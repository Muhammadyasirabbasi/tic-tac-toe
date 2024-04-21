document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-button');
    const board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameEnded = false;

    function handleCellClick(index) {
        if (!gameEnded && board[index] === '') {
             cells[index].innerText = currentPlayer;
            cells[index].style.backgroundColor = currentPlayer === 'X' ? '#ffcccc' : '#cceeff'; // Change background color based on current player
             board[index] = currentPlayer;
            if (checkWinner(currentPlayer)) {
                gameEnded = true;
                setTimeout(function() {
                    alert(currentPlayer + ' wins!');
                }, 100);
            } else if (board.every(cell => cell !== '')) {
                gameEnded = true;
                setTimeout(function() {
                    alert('It\'s a draw!');
                }, 100);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function checkWinner(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        return winPatterns.some(pattern =>
            pattern.every(index => board[index] === player)
        );
    }

    function resetGame() {
        board.fill('');
        cells.forEach(cell => {
            cell.innerText = '';
            cell.style.backgroundColor = ''; // Reset background color
        });
        currentPlayer = 'X';
        gameEnded = false;
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    resetButton.addEventListener('click', resetGame);
});
