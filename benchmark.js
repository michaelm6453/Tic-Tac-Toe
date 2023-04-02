var RowsNum;
var ColumnsNum;
var rows = [];
var cols = [];
var data = [];


function initJSON(){
    RowsNum = rows.length;
    ColumnsNum = 1;

    cols = ["Empty_Space"];

    // for (var i=0; i<RowsNum; rows[i]=_rows[i], ++i);
    // for (var i=0; i<ColumnsNum; cols[i]=_cols[i], ++i);
    // for (var i=0; i<RowsNum; ++i){
    //     data.push([]);
    //     for (var j=0; j<ColumnsNum; data[i][j]=0.0, ++j);
    // }
}


var outputStream;
function flush(){
    outputStream = "";
    outputStream += "{";

    /// write columns
    outputStream += "\"columns\":[\"columns\",";
    for (var i=0; i<ColumnsNum-1; ++i){
        outputStream += "\"" + cols[i] + "\",";
    }
    outputStream += "\"" + cols[ColumnsNum-1] + "\"" + "],";

    /// write rows
    outputStream += "\"index\":[";
    for (var i=0; i<RowsNum-1; ++i){
        outputStream += "\"" + i + "\",";
    }
    outputStream += "\"" + (RowsNum-1) + "\"" + "],";

    /// write data
    outputStream += "\"data\":[";
    for (var i=0; i<RowsNum; ++i){
        outputStream += "[" + "\"" + rows[i] + "\",";
        for (var j=0; j<ColumnsNum; ++j){
            outputStream += "\"" + data[i][j] + "\"";
            if (j < ColumnsNum-1){ outputStream += ","; };
        }
        outputStream += "]";
        if (i < RowsNum-1){ outputStream += ","; };
    }
    outputStream += "]";
    outputStream += "}";

    console.log(outputStream);
}

var rowIndex = 0;
function insertRow(v){
    rows.push(v.rowVal);
    data.push([v.data]);
    rowIndex++;
}
