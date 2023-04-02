// This function calculates the best move for the computer player
function GetBestMove() {
    // scores for each possible outcome of the game
    var scores = {
        X: (BoardSize*BoardSize + 1),
        O: -(BoardSize*BoardSize + 1),
        tie: 0
    };

    // The computer player makes its turn by finding the best score
    var bestScore = -Infinity;
    var move;
    for (var i=0; i<BoardSize; i++) {
        for (var j=0; j<BoardSize; j++) {
            // Is the spot available?
            if (Board[i][j] == '') {
                // Try out the move
                Board[i][j] = ai;
                // Calculate the score for this move
                var score = minimax(scores, 0, false);
                // Undo the move
                Board[i][j] = '';
                // Check if this is the best score so far
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    // Apply the best move
    Board[move.i][move.j] = ai;
    // Switch to the human player's turn
    currentPlayer = human;
}

// This function uses the minimax algorithm to calculate the best score for a given player
function minimax(scores, depth, isMaximizing) {
    // Check if there is a winner
    var result = checkWinner();
    if (result !== null) {
        // Return the score for the winner
        return scores[result];
    }
    // Check if we have reached the maximum depth of the tree
    if (depth >= 10){
        return scores[result];
    }

    if (isMaximizing) {
        // If it is the computer player's turn, find the maximum score
        var bestScore = -Infinity;
        for (var i=0; i<BoardSize; i++) {
            for (var j=0; j<BoardSize; j++) {
                // Is the spot available?
                if (Board[i][j] == '') {
                    // Try out the move
                    Board[i][j] = ai;
                    // Calculate the score for this move
                    var score = minimax(scores, depth + 1, false);
                    // Undo the move
                    Board[i][j] = '';
                    // Check if this is the best score so far
                    bestScore = max(score, bestScore);
                }
            }
        }
        // Return the best score
        return bestScore;
    } else {
        // If it is the human player's turn, find the minimum score
        var bestScore = Infinity;
        for (var i=0; i<BoardSize; i++) {
            for (var j=0; j<BoardSize; j++) {
                // Is the spot available?
                if (Board[i][j] == '') {
                    // Try out the move
                    Board[i][j] = human;
                    // Calculate the score for this move
                    var score = minimax(scores, depth + 1, true);
                    // Undo the move
                    Board[i][j] = '';
                    // Check if this is the best score so far
                    bestScore = min(score, bestScore);
                }
            }
        }
        // Return the best score
        return bestScore;
    }
}
