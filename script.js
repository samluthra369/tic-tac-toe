class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        
        this.statusElement = document.getElementById('status');
        this.cells = document.querySelectorAll('[data-cell]');
        this.restartBtn = document.getElementById('restartBtn');
        this.scoreXElement = document.getElementById('scoreX');
        this.scoreOElement = document.getElementById('scoreO');
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.updateStatus();
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.board[index] = this.currentPlayer;
        this.cells[index].textContent = this.currentPlayer;
        this.cells[index].classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWin()) {
            this.handleGameEnd('win');
        } else if (this.checkDraw()) {
            this.handleGameEnd('draw');
        } else {
            this.switchPlayer();
        }
    }
    
    checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                
                // Highlight winning cells
                this.cells[a].classList.add('winning');
                this.cells[b].classList.add('winning');
                this.cells[c].classList.add('winning');
                
                return true;
            }
        }
        return false;
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    handleGameEnd(result) {
        this.gameActive = false;
        
        if (result === 'win') {
            this.scores[this.currentPlayer]++;
            this.updateScores();
            this.statusElement.textContent = `Player ${this.currentPlayer} wins!`;
            this.statusElement.style.background = 'linear-gradient(45deg, #48bb78, #38a169)';
            
            setTimeout(() => {
                this.showGameOverModal(`Player ${this.currentPlayer} wins!`);
            }, 1000);
        } else {
            this.statusElement.textContent = "It's a draw!";
            this.statusElement.style.background = 'linear-gradient(45deg, #ed8936, #dd6b20)';
            
            setTimeout(() => {
                this.showGameOverModal("It's a draw!");
            }, 1000);
        }
    }
    
    showGameOverModal(message) {
        const modal = document.createElement('div');
        modal.className = 'game-over';
        modal.innerHTML = `
            <div class="game-over-content">
                <h2>${message}</h2>
                <p>Final Score:</p>
                <p>Player X: ${this.scores.X} | Player O: ${this.scores.O}</p>
                <button class="restart-btn" onclick="this.parentElement.parentElement.remove(); game.restartGame();">Play Again</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus();
    }
    
    updateStatus() {
        this.statusElement.textContent = `Player ${this.currentPlayer}'s turn`;
        this.statusElement.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
    }
    
    updateScores() {
        this.scoreXElement.textContent = this.scores.X;
        this.scoreOElement.textContent = this.scores.O;
    }
    
    restartGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
        });
        
        this.updateStatus();
    }
    
    resetScores() {
        this.scores = { X: 0, O: 0 };
        this.updateScores();
    }
}

// Initialize the game when the page loads
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new TicTacToe();
});

// Add keyboard support for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        game.restartGame();
    }
});

// Add touch support for mobile devices
document.addEventListener('touchstart', (e) => {
    if (e.target.classList.contains('cell')) {
        e.preventDefault();
    }
}, { passive: false }); 