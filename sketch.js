

var Board = [];
const BoardSize = 3;

var ai = 'X';
var human = 'O';
var currentPlayer = human;



// setup() and draw() required by p5.js
function setup() {
    createCanvas(400, 400);

    // build Board
    for (var i=0; i<BoardSize; i++) {
        Board.push([]);
        for (var j=0; j<BoardSize; j++) {
            Board[i][j] = '';
        }
    }

    GetBestMove();
}

function draw() {
    background(255);
    strokeWeight(7);

    var w = width / BoardSize;
    var h = height / BoardSize;

    for (let i = 1; i < BoardSize; i++) {
        stroke(0);
        line(w * i, 0, w * i, height);
        line(0, h * i, width, h * i);
    }

    for (let j = 0; j < BoardSize; j++) {
        for (let i = 0; i < BoardSize; i++) {
            let x = w * i + w / 2;
            let y = h * j + h / 2;
            let spot = Board[i][j];
            textSize(32);
            let r = w / 4;
            if (spot == human) {
                noFill();
                stroke(255, 64, 32);
                ellipse(x, y, r * 2);
            } else if (spot == ai) {
                stroke(64, 32, 255);
                line(x - r, y - r, x + r, y + r);
                line(x + r, y - r, x - r, y + r);
            }
        }
    }

    let result = checkWinner();
    if (result != null) {
        noLoop();
        let resultP = createP('');
        resultP.style('font-size', '32pt');
        resultP.style('font-family', 'Arial, Helvetica, sans-serif');
        if (result == 'tie') {
            resultP.html("It's a tie!");
        } else {
            resultP.html(`${result} won this game!`);
        }
    }
}





function noequal(a, b){
    return a != b || a == '';
}




function checkWinner() {
    var winner = null;
    var res;

    // vertical
    for (var i=0; i<BoardSize; i++){
        res = true;
        for (var j=1; j<BoardSize; ++j){
            if (noequal(Board[i][j], Board[i][0])){
                res = false;
                break;
            }
        }
        if (res){
            winner = Board[i][0];
        }
    }

    // horizontal
    for (var i=0; i<BoardSize; i++){
        res = true;
        for (var j=1; j<BoardSize; ++j){
            if (noequal(Board[j][i], Board[0][i])){
                res = false;
                break;
            }
        }
        if (res){
            winner = Board[0][i];
        }
    }

    // diagonal, left to right
    for (var i=1, res=true; i<BoardSize; i++){
        if (noequal(Board[0][0], Board[i][i])){
            res = false;
        }
    }
    if (res){ winner = Board[0][0]; }

    // diagonal, right to left
    for (var i=1, res=true; i<BoardSize; i++){
        if (noequal(Board[BoardSize-1][0], Board[BoardSize-i-1][i])){
            res = false;
        }
    }
    if (res){ winner = Board[BoardSize-1][0]; }


    // check for tie
    var emptySpots = 0;
    for (var i=0; i<BoardSize; i++) {
        for (var j=0; j<BoardSize; j++) {
            if (Board[i][j] == '') {
                emptySpots++;
            }
        }
    }

    if (winner == null && emptySpots == 0) {
        return 'tie';
    }

    return winner;
}




function mousePressed() {
    if (currentPlayer == human) {
        var w = width / BoardSize;
        var h = height / BoardSize;

        // its Human's turn
        let i = floor(mouseX / w);
        let j = floor(mouseY / h);
        // If valid turn
        if (Board[i][j] == '') {
            Board[i][j] = human;
            currentPlayer = ai;
            GetBestMove();
        }
    }
}
