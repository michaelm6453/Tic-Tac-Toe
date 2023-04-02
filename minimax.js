const MAX_DEPTH = 12;


function GetEmptySpaces(){
    var sp = 0;
    for (var i=0; i<BoardSize; i++) {
        for (var j=0; j<BoardSize; j++) {
            if (Board[i][j] == ''){
                sp++;
            }
        }
    }
    return sp;
}

// This function starts minimax from each empty cell on the board
// each iteration views the board as if the ai had just played in the currently empty cell
function GetBestMove() {
    var scores = {
        X: 10,
        O: -10,
        tie: 0
    };

    let start = window.performance.now();
    var emptySpaces = GetEmptySpaces();

    var bestScore = -Number.MIN_VALUE;
    var move;
    for (var i=0; i<BoardSize; i++) {
        for (var j=0; j<BoardSize; j++) {
            // if cell is free
            if (Board[i][j] == '') {
                // play make the ai play at that spot
                Board[i][j] = ai;
                // then search all possible outcomes from playing there
                var score = minimax(scores, MAX_DEPTH, Number.MIN_VALUE, Number.MAX_VALUE, false);
                // when done searching, revert the cell back to empty
                // and return the move
                Board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }

    // play the move and give turn back to human player
    Board[move.i][move.j] = ai;
    currentPlayer = human;

    let timeTaken = window.performance.now() - start;
    console.log(timeTaken);
    return {rowVal: emptySpaces, data: timeTaken};
}





// This function uses the minimax algorithm to calculate the best score for a given player
function minimax(scores, depth, alpha, beta, isMaximizing) {
    // evaluate the board to check for a winner
    var result = checkWinner();

    if (result !== null || depth == 0) {
        var r = scores[result];
        // because he depth of tree is evaluated backwards
        // we can favour the depth of the maximizing part
        if (r == 10){ return 10 + depth; }
        if (r == -10){ return -10 - depth; }
    }

    if (isMaximizing) {
        // If it is the computer player's turn, find the maximum score
        var highestScore = -Number.MIN_VALUE;
        for (var i=0; i<BoardSize; i++) {
            for (var j=0; j<BoardSize; j++) {
                // if cell is free
                if (Board[i][j] == '') {
                    // play make the ai play at that spot
                    Board[i][j] = ai;
                    // then recursively search all possible outcomes from playing there
                    // and get the maximum value from the search tree, i.e. the best outcome
                    // to represent the X's win
                    highestScore = max(highestScore, minimax(scores, depth - 1, alpha, beta, false));
                    // when done searching, revert the cell back to empty
                    Board[i][j] = '';
                    alpha = Math.max(alpha, highestScore);
                    if (alpha >= beta) {
                        return highestScore;
                    }
                }
            }
        }

        // Return the best score
        return highestScore;

    } else {
        // If it is the human player's turn, find the minimum score
        var lowestScore = Number.MAX_VALUE;
        for (var i=0; i<BoardSize; i++) {
            for (var j=0; j<BoardSize; j++) {
                if (Board[i][j] == '') {
                    // play make the ai play at that spot
                    Board[i][j] = human;
                    // then recursively search all possible outcomes from playing there
                    // and get the minimum value from the search tree, i.e. the worst outcome
                    // to represent human's win
                    lowestScore = min(lowestScore, minimax(scores, depth - 1, alpha, beta, true));
                    // when done searching, revert the cell back to empty
                    Board[i][j] = '';
                    beta = Math.min(beta, lowestScore);
                    if (beta <= alpha) {
                        return lowestScore;
                    }
                }
            }
        }

        // Return the best score
        return lowestScore;
    }
}
