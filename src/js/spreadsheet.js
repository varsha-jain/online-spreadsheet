//function to display spread sheet on load of a html page

//var initialRows = 10, initialColumns = 7;
import '../css/spreadsheet.css';
import { initialRows, initialColumns } from './variables.js';

window.onload = function () {
    displaySpreadSheet();
};
function displaySpreadSheet() {
    let div = document.getElementById("spreadsheet");
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //to append header
    let table = document.createElement("table");
    table.setAttribute("id", "table");
    for (var i = 0; i < initialRows; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute("id", "row" + i);
        if (i > 0) {
            for (var j = 0; j < initialColumns; j++) {
                let td = document.createElement("td");
                if (j > 0) {

                    let input = document.createElement("input");
                    input.setAttribute("type", "text");
                    input.setAttribute("name", "input" + i);
                    input.setAttribute("id", str.charAt(j - 1) + i);

                    td.appendChild(input);
                    td.setAttribute("id", str.charAt(j - 1) + i);
                    td.setAttribute("ondblclick", "detectMouseDown(this.id)");
                    //td.setAttribute("onmouseover", "detectMouseOver(this.id)");
                    //td.setAttribute("onmouseup", "detectMouseUp(this.id)");
                    td.setAttribute("onchange", "performArithmeticOperation(this.id)");
                    //input.setAttribute("oninput", "getInput(this.id)");
                    tr.appendChild(td);
                    tr.setAttribute("class", "row-spacing");

                } else {
                    let text = document.createTextNode(i);
                    td.appendChild(text);
                    td.setAttribute("class", "firstColumn");
                    tr.appendChild(td);
                }

            }

        } else {
            //this is for the first row which includes header
            for (var j = 0; j < initialColumns; j++) {
                let th = document.createElement("th");
                th.setAttribute("class", "header");
                if (j > 0) {
                    //all the remaining cells after frist cell should have header
                    let text = document.createTextNode(str.charAt(j - 1));
                    th.appendChild(text);
                } else {
                    //we want the first cell to be empty
                    let text = document.createTextNode("");
                    th.appendChild(text);
                }
                tr.appendChild(th);
            }


        }
        table.appendChild(tr);
    }
    div.appendChild(table);
}
//function to add rows
/** handle addrows when it is called first if no rows are present */
document.addRows = function() {

    var div = document.getElementById("spreadsheet");
    var table = document.getElementById("table"),
        row = table.insertRow(table.rows.length), i;  // append table row
    var totalRows = table.rows.length;
    console.log(totalRows);
    row.setAttribute("id", "row" + parseInt(table.rows.length-1));
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // insert table cells to the new row
    for (i = 0; i < table.rows[0].cells.length; i++) {
        var cell = row.insertCell(i);
        if (i > 0) {

            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("name", "input" + i);
            input.setAttribute("id", str.charAt(i - 1) + (totalRows - 1));
            cell.appendChild(input);
            cell.id= str.charAt(i - 1) + (totalRows - 1);
            cell.setAttribute("ondblclick", "detectMouseDown(this.id)");
            //cell.setAttribute("onmouseover", "detectMouseOver(this.id)");
            //cell.setAttribute("onmouseup", "detectMouseUp(this.id)");
            cell.setAttribute("onchange", "performArithmeticOperation(this.id)");
        }
        else {
            var text = document.createTextNode(totalRows - 1);
            cell.setAttribute("class", "firstColumn");
            cell.appendChild(text);

        }

    }

}

//remove rows dynamically
document.deleteRows = function() {

    var table = document.getElementById("table");
    let td = document.getElementsByTagName("td");
    var highlightedCells = document.getElementsByClassName("highlighted");
    let rowToBeRemoved = highlightedCells[0].parentElement;
    var s = rowToBeRemoved.getAttribute("id");
    let rowID = s.match(/\d/g); //regex to retrieve the integer 
    rowID = rowID.join("");   
    rowID = parseInt(rowID);
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //remove the selected row and update ids of all the remaining rows
    table.removeChild(document.getElementById(s));
    for (var i = rowID + 1; i <= table.rows.length; i++) {
        let tr = document.getElementById("row" + i);
        for (var j = 0; j < table.rows[i - 1].cells.length; j++) {
            if (j > 0) {
                td = document.getElementById(str.charAt(j - 1) + i);
                let input = td.childNodes[0];
                input.setAttribute("type", "text");
                input.setAttribute("name", "input" + i);
                input.id = str.charAt(j - 1) + (i - 1);
                td.id=str.charAt(j - 1) + (i - 1);

            } else {
                var text = tr.childNodes[0].innerText;
                console.log(text);
                tr.childNodes[0].innerText = i - 1;
            }
        }
        tr.id = "row" + (i - 1);
    }

}

document.addColumns = function() {
    var table = document.getElementById("table");
    // open loop for each row and append cell

    for (var i = 0; i < table.rows.length; i++) {
        var cell = table.rows[i].insertCell(table.rows[i].cells.length);
        var totalColumns = table.rows[i].cells.length;
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (i > 0) {

            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("name", "input" + i);
            input.setAttribute("id", str.charAt(totalColumns - 2) + i);
            cell.appendChild(input);
            //cell.setAttribute("class", "cell-spacing");
            cell.setAttribute("id", str.charAt(totalColumns - 2) + i);
            //celId = celId + 1;
            cell.setAttribute("ondblclick", "detectMouseDown(this.id)");
            //cell.setAttribute("onmouseover", "detectMouseOver(this.id)");
            cell.setAttribute("onmouseup", "detectMouseUp(this.id)");
            cell.setAttribute("onchange", "performArithmeticOperation(this.id)");
        } else {
            var text = document.createTextNode(str.charAt(totalColumns - 2));            
            cell.appendChild(text);
        }
    }
}

document.deleteColumns = function() {
    var table = document.getElementById("table");
    var highlightedCells = document.getElementsByClassName("highlighted");
    let colToBeRemoved = highlightedCells[0];
    var s = colToBeRemoved.getAttribute("id");
    let colID = s.match(/[a-zA-Z]+/g);
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let colid = str.indexOf(colID);

    console.log(colid);
    for (var i = 0; i < table.rows.length; i++) {
        if (i == 0) {
            var trow = document.getElementById("row0");
            trow.removeChild(trow.childNodes[colid + 1]);
        }
        if (i > 0) {
            let td = document.getElementById(colID + i);
            var tr = td.parentElement;
            tr.removeChild(td);
            var end = str.indexOf(str.charAt(table.rows[i].cells.length - 1));
            for (var k = colid + 2; k <= (end + 1); k++) {
                var thlist = document.getElementsByClassName("header");
                var th = thlist[k - 1];
                th.childNodes[0].data = str.charAt(k - 2);
                var nextTd = document.getElementById(str.charAt(k - 1) + i);
                nextTd.id = str.charAt(k - 2) + i;
                let input = nextTd.childNodes[0];
                input.setAttribute("type", "text");
                input.setAttribute("name", "input" + i);
                input.id = str.charAt(k - 2) + i;
                nextTd.setAttribute("ondblclick", "detectMouseDown(this.id)");
                nextTd.setAttribute("onchange", "performArithmeticOperation(this.id)");
                tr.setAttribute("class", "row-spacing");

            }
        }
    }
}



var isMouseDown = false;
var isHighlighted;


document.detectMouseDown = function (elemId) {
    var td = document.getElementById(elemId);
    // console.log(elemId);
    isMouseDown = true;
    td.setAttribute("class","highlighted");
    //td.classList.toggle("highlighted");
    if (td.classList.contains("highlighted")) {
        isHighlighted = true;
    } else {
        isHighlighted = false;
    }

    return false;
}

/*function detectMouseOver(elemId) {
    var td = document.getElementById(elemId);
    if (isMouseDown) {
        td.classList.toggle("highlighted", isHighlighted);
    }
}*/

/*document.detectMouseUp = function (elemId) {
    isMouseDown = false;
}*/

document.addition = function () {
    var total = 0;
    var input = document.getElementsByTagName("input");
    console.log(input.length);
    for (var i = 0; i < input.length; i++) {
        var td = input[i].parentElement;
        if (isHighlighted && td.classList.contains("highlighted")) {
            total += parseInt(input[i].value);
        }
    }
    console.log(total);
    document.getElementById("result").innerHTML = "Total sum is: " + total;
}

document.subtraction = function () {
    let diff = 0;
    let initValue = 0;
    let isFirstFlag = false;
    var input = document.getElementsByTagName("input");
    for (var i = 0; i < input.length; i++) {
        var td = input[i].parentElement;
        if (isHighlighted && td.classList.contains("highlighted") && (isFirstFlag == false)) {
            initValue += parseInt(input[i].value);
            diff = initValue;
            isFirstFlag = true;
        }
        if (isHighlighted && td.classList.contains("highlighted")) {
            diff -= parseInt(input[i].value);
        }
    }
    diff += initValue;
    console.log(diff);
    document.getElementById("result").innerHTML = "Difference is : " + diff;
}

document.multiplication = function () {
    let diff = 1;
    let initValue = 1;
    let isFirstFlag = false;
    var input = document.getElementsByTagName("input");
    for (var i = 0; i < input.length; i++) {
        var td = input[i].parentElement;
        if (isHighlighted && td.classList.contains("highlighted") && (isFirstFlag == false)) {
            initValue += parseInt(input[i].value);
            diff = initValue;
            isFirstFlag = true;
        }
        if (isHighlighted && td.classList.contains("highlighted")) {
            diff *= parseInt(input[i].value);
        }
    }
    diff /= initValue;
    console.log(diff);
    document.getElementById("result").innerHTML = "Product is: " + diff;
}

document.division = function () {
    let diff = 1.0;
    let initValue = 1.0;
    let isFirstFlag = false;
    var input = document.getElementsByTagName("input");
    for (var i = 0; i < input.length; i++) {
        var td = input[i].parentElement;
        if (isHighlighted && td.classList.contains("highlighted") && (isFirstFlag == false)) {
            initValue += parseInt(input[i].value);
            diff = initValue;
            isFirstFlag = true;
        }
        if (isHighlighted && td.classList.contains("highlighted")) {
            diff /= parseInt(input[i].value);
        }
    }
    diff *= initValue;
    console.log(diff);
    document.getElementById("result").innerHTML = "Division output is: " + diff;
}

document.downloadCSV = function(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}
//form a csv of the data given in the table
document.exportTableToCSV = function(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [];
        if (i > 0) {
          var  cols = rows[i].querySelectorAll("td");
            for (var j = 0; j < cols.length; j++) {
                if (j > 0) {
                    cols = rows[i].querySelectorAll("td input");
                    row.push(cols[j - 1].value);
                } else {
                    row.push(cols[j].innerText);
                }
            }
        } else {
            cols = rows[i].querySelectorAll("th");
            for (var j = 0; j < cols.length; j++) {
                row.push(cols[j].innerText);

            }

        }



        csv.push(row.join(","));
    }

    // Download CSV file
    document.downloadCSV(csv.join("\n"), filename);
}
//calculate sum and display result in the same cell
document.calculateSum = function(elemId, firstInput, secondInput) {
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    console.log("first input: " + firstInput);
    console.log("second input: " + secondInput);
    var char1 = firstInput.charAt(0);
    var num1 = firstInput.substr(1, firstInput.length);
    var char2 = secondInput.charAt(0);
    var num2 = secondInput.substr(1, secondInput.length);
    var total = 0;
    console.log(char1);
    console.log(num1);
    console.log(char2);
    console.log(num2);
    var index1 = str.indexOf(char1);
    var index2 = str.indexOf(char2);
    let table = document.getElementById("table");
    if (num1 == num2) { //same row
        var totalColumns = table.rows[num1].cells.length;
        for (var i = index1; i <= index2; i++) {
            var input1 = document.getElementById(str.charAt(i) + num1).childNodes[0].value;
            if(input1!= null){
                total = total + parseInt(input1);
            }
               
        }
        document.getElementById(elemId).childNodes[0].value = total;
        //console.log(total);
    }
    if (char1 == char2) { //same col
        var totalRows = table.rows.length;
        for (var i = num1; i <= num2; i++) {
            var input1 = document.getElementById(char1 + i).childNodes[0].value;
            //if(!isNaN(input1)){
                total = total + parseInt(input1);
            //}
        }
        document.getElementById(elemId).childNodes[0].value = total;
        //console.log(total);
    }
}
//clculate subtraction
document.calculateDiff = function(elemId, firstInput, secondInput) {
    let diff = 0;
    let initValue = 0;
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var char1 = firstInput.charAt(0);
    var num1 = firstInput.substr(1, firstInput.length);
    var char2 = secondInput.charAt(0);
    var num2 = secondInput.substr(1, secondInput.length);
    var total = 0;
    console.log(char1);
    console.log(num1);
    console.log(char2);
    console.log(num2);
    var index1 = str.indexOf(char1);
    var index2 = str.indexOf(char2);
    let table = document.getElementById("table");
    let isFirstFlag = false;
    if (num1 == num2) { //same row
        var totalColumns = table.rows[num1].cells.length;
        for (var i = index1; i <= index2; i++) {
            var input = document.getElementById(str.charAt(i) + num1).childNodes[0].value;
            if ((isFirstFlag == false)) {
                initValue += parseInt(input);
                diff = initValue;
                isFirstFlag = true;
            }
            if (isFirstFlag) {
                diff -= parseInt(input);
            }

        }
        diff += initValue;
        document.getElementById(elemId).childNodes[0].value = diff;
        console.log(diff);
    }
    if (char1 == char2) { //same col
        var totalRows = table.rows.length;
        for (var i = num1; i <= num2; i++) {
            var input = document.getElementById(char1 + i).childNodes[0].value;
            if ((isFirstFlag == false)) {
                initValue += parseInt(input);
                diff = initValue;
                isFirstFlag = true;
            }
            if (isFirstFlag) {
                diff -= parseInt(input);
            }
        }
        diff += initValue;
        document.getElementById(elemId).childNodes[0].value = diff;
        console.log(diff);
    }

}

//calculate multiplication
document.calculateMul = function(elemId, firstInput, secondInput) {
    let diff = 0;
    let initValue = 0;
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var char1 = firstInput.charAt(0);
    var num1 = firstInput.substr(1, firstInput.length);
    var char2 = secondInput.charAt(0);
    var num2 = secondInput.substr(1, secondInput.length);
    var total = 0;
    console.log(char1);
    console.log(num1);
    console.log(char2);
    console.log(num2);
    var index1 = str.indexOf(char1);
    var index2 = str.indexOf(char2);
    let table = document.getElementById("table");
    let isFirstFlag = false;
    if (num1 == num2) { //same row
        var totalColumns = table.rows[num1].cells.length;
        for (var i = index1; i <= index2; i++) {
            var input = document.getElementById(str.charAt(i) + num1).childNodes[0].value;
            if ((isFirstFlag == false)) {
                initValue += parseInt(input);
                diff = initValue;
                isFirstFlag = true;
            }
            if (isFirstFlag) {
                diff *= parseInt(input);
            }

        }
        diff /= initValue;
        document.getElementById(elemId).childNodes[0].value = diff;
        console.log(diff);
    }
    if (char1 == char2) { //same col
        var totalRows = table.rows.length;
        for (var i = num1; i <= num2; i++) {
            var input = document.getElementById(char1 + i).childNodes[0].value;
            if ((isFirstFlag == false)) {
                initValue += parseInt(input);
                diff = initValue;
                isFirstFlag = true;
            }
            if (isFirstFlag) {
                diff *= parseInt(input);
            }
        }
        diff /= initValue;
        document.getElementById(elemId).childNodes[0].value = diff;
        console.log(diff);
    }

}

//calculate division
document.calculateDiv = function(elemId, firstInput, secondInput) {
    let diff = 0.0;
    let initValue = 0.0;
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var char1 = firstInput.charAt(0);
    var num1 = firstInput.substr(1, firstInput.length);
    var char2 = secondInput.charAt(0);
    var num2 = secondInput.substr(1, secondInput.length);

    console.log(char1);
    console.log(num1);
    console.log(char2);
    console.log(num2);
    var index1 = str.indexOf(char1);
    var index2 = str.indexOf(char2);
    let table = document.getElementById("table");
    let isFirstFlag = false;
    if (num1 == num2) { //same row
        var totalColumns = table.rows[num1].cells.length;
        for (var i = index1; i <= index2; i++) {
            var input = document.getElementById(str.charAt(i) + num1).childNodes[0].value;
            if ((isFirstFlag == false)) {
                initValue += parseFloat(input);
                diff = initValue;
                isFirstFlag = true;
            }
            if (isFirstFlag) {
                diff /= parseFloat(input);
            }

        }
        diff *= initValue;
        document.getElementById(elemId).childNodes[0].value = diff;
        console.log(diff);
    }
    if (char1 == char2) { //same col
        var totalRows = table.rows.length;
        for (var i = num1; i <= num2; i++) {
            var input = document.getElementById(char1 + i).childNodes[0].value;
            if ((isFirstFlag == false)) {
                initValue += parseFloat(input);
                diff = initValue;
                isFirstFlag = true;
            }
            if (isFirstFlag) {
                diff /= parseFloat(input);
            }
        }
        diff *= initValue;
        document.getElementById(elemId).childNodes[0].value = diff;
        console.log(diff);
    }
}
document.performArithmeticOperation = function (elemId) {
    //check the operation and call corresponding maths function
    var input = document.getElementById(elemId).childNodes[0];
    var string = input.value;
    string = string.toUpperCase();
    //console.log("string inside td: " + string);
    var init = string.indexOf('(');
    var fin = string.indexOf(')');
    var td = document.getElementById(elemId);
    //calculate sum
    if (string.startsWith("=SUM")) {
        td.setAttribute("data-attribute", string);
        var substring = string.substr(init + 1, fin - init - 1);
        // console.log(substring);
        var substri = substring.split(',');
        var firstInput = substri[0];
        var secondInput = substri[1];
        document.calculateSum(elemId, firstInput, secondInput);
    }
    //calculate difference
    if (string.startsWith("=SUB")) {
        td.setAttribute("data-attribute", string);
        var substring = string.substr(init + 1, fin - init - 1);
        console.log(substring);
        var substri = substring.split(',');
        var firstInput = substri[0];
        var secondInput = substri[1];
        document.calculateDiff(elemId, firstInput, secondInput);
    }
    //calculate product
    if (string.startsWith("=MUL")) {

        td.setAttribute("data-attribute", string);
        var substring = string.substr(init + 1, fin - init - 1);
        console.log(substring);
        var substri = substring.split(',');
        var firstInput = substri[0];
        var secondInput = substri[1];
        document.calculateMul(elemId, firstInput, secondInput);
    }
    //calculate division result
    if (string.startsWith("=DIV")) {

        td.setAttribute("data-attribute", string);
        var substring = string.substr(init + 1, fin - init - 1);
        //console.log(substring);
        var substri = substring.split(',');
        var firstInput = substri[0];
        var secondInput = substri[1];
        document.calculateDiv(elemId, firstInput, secondInput);
    }

    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //loop to update result on any change
    for (var i = 0; i < table.rows.length; i++) {
        if (i > 0) {
            for (var j = 0; j < table.rows[i].cells.length; j++) {
                if (j > 0) {
                    var td = document.getElementById(str.charAt(j - 1) + i);

                    if (td.hasAttribute("data-attribute")) {
                        console.log(td);
                        var id = td.getAttribute("id");
                        var attrString = td.getAttribute("data-attribute");
                        var init1 = attrString.indexOf('(');
                        var fin1 = attrString.indexOf(')');
                        if (attrString.startsWith("=SUM")) {
                            var substring = attrString.substr(init1 + 1, fin1 - init1 - 1);
                            //console.log("******" + substring);
                            var substri = substring.split(',');
                            var firstInput = substri[0];
                            var secondInput = substri[1];
                            document.calculateSum(id, firstInput, secondInput);
                        }
                        //update subtraction result
                        if (attrString.startsWith("=SUB")) {
                            var substring = attrString.substr(init1 + 1, fin1 - init1 - 1);
                            //console.log(substring);
                            var substri = substring.split(',');
                            var firstInput = substri[0];
                            var secondInput = substri[1];
                            document.calculateDiff(id, firstInput, secondInput);
                        }
                        //update multiplication result
                        if (attrString.startsWith("=MUL")) {
                            var substring = attrString.substr(init1 + 1, fin1 - init1 - 1);
                            //console.log(substring);
                            var substri = substring.split(',');
                            var firstInput = substri[0];
                            var secondInput = substri[1];
                            document.calculateMul(id, firstInput, secondInput);
                        }
                        //update division result
                        if (attrString.startsWith("=DIV")) {
                            var substring = attrString.substr(init1 + 1, fin1 - init1 - 1);
                            //console.log(substring);
                            var substri = substring.split(',');
                            var firstInput = substri[0];
                            var secondInput = substri[1];
                            document.calculateDiv(id, firstInput, secondInput);
                        }

                    }


                }
            }

        }
    }
}

