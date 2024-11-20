let currentPlayer = 'X'; // Start with 'X'

const cells = document.querySelectorAll('.cell');
const winningMessage = document.createElement('div'); // Create a message div
winningMessage.setAttribute('id', 'winningMessage');
document.body.appendChild(winningMessage);

cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        if (!cell.textContent) { // Only allow placing if the cell is empty
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer === 'X' ? 'player-x' : 'player-o'); // Add styles
            if (checkWin(currentPlayer)) {
                showWinner(currentPlayer);
            } else if (isBoardFull()) {
                showWinner('Draw');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
            }
        }
    });
});

// Function to check for a winner
function checkWin(player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombos.some(combo => {
        return combo.every(index => cells[index].textContent === player);
    });
}

// Function to check if the board is full
function isBoardFull() {
    return Array.from(cells).every(cell => cell.textContent);
}

// Function to show the winner
function showWinner(winner) {
    if (winner === 'Draw') {
        winningMessage.textContent = "It's a Draw!";
        winningMessage.style.color = '#ff9800';
    } else {
        winningMessage.textContent = `${winner} Wins!`;
        winningMessage.style.color = winner === 'X' ? '#ff4c4c' : '#4c9eff';
    }
    winningMessage.style.fontSize = '2rem';
    winningMessage.style.marginTop = '20px';

    setTimeout(resetBoard, 3000); // Reset after 3 seconds
}

// Function to reset the board
function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('player-x', 'player-o'); // Clear styles
    });
    currentPlayer = 'X'; // Reset to 'X'
    winningMessage.textContent = ''; // Clear winning message
}
