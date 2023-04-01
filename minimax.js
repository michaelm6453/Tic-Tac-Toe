function GetBestMove() {
    var scores = {
        X: (BoardSize*BoardSize + 1),
        O: -(BoardSize*BoardSize + 1),
        tie: 0
    };

    // AI to make its turn
    var bestScore = -Infinity;
    var move;
    for (var i=0; i<BoardSize; i++) {
        for (var j=0; j<BoardSize; j++) {
            // Is the spot available?
            if (Board[i][j] == '') {
                Board[i][j] = ai;
                var score = minimax(scores, 0, false);
                Board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    Board[move.i][move.j] = ai;
    currentPlayer = human;
}


function minimax(scores, depth, isMaximizing) {
    var result = checkWinner();
    // console.log(result);
    if (result !== null) {
        return scores[result];
    }
    if (depth >= 10){
        return scores[result];
    }

    if (isMaximizing) {
        var bestScore = -Infinity;
        for (var i=0; i<BoardSize; i++) {
            for (var j=0; j<BoardSize; j++) {
                // Is the spot available?
                if (Board[i][j] == '') {
                    Board[i][j] = ai;
                    var score = minimax(scores, depth + 1, false);
                    Board[i][j] = '';
                    bestScore = max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        var bestScore = Infinity;
        for (var i=0; i<BoardSize; i++) {
            for (var j=0; j<BoardSize; j++) {
                // Is the spot available?
                if (Board[i][j] == '') {
                    Board[i][j] = human;
                    var score = minimax(scores, depth + 1, true);
                    Board[i][j] = '';
                    bestScore = min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}
