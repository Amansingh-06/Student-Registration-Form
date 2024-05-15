// Declaring Global Variable
var table = document.getElementById("table");
var row = null;

// Retrieve and display data from local storage when the page is loaded
window.onload = function () {
    var storedData = JSON.parse(localStorage.getItem("studentData"));
    if (storedData) {
        for (var i = 0; i < storedData.length; i++) {
            insertData(storedData[i]);
        }
    }
}
// submit a fuction is a fuction that what happen when the button is clicked
function submit() {
    var enteredData = retrieveData();
    if (!enteredData) {
        alert("All fields are mandatory");
    } else {
        if (row == null) {
            if (!isDuplicateData(enteredData)) {
                insertData(enteredData);
                msg.innerHTML = "Data Inserted!";
            } else {
                alert("Duplicate data cannot be added");
            }
        } else {
            update();
            msg.innerHTML = "Data Updated!";
        }
    }
    document.getElementById("form").reset();
}
// Retrive data from input

function retrieveData() {
    var studentname = document.getElementById("studentname").value;
    var studentid = document.getElementById("studentid").value;
    var email = document.getElementById("email").value;
    var contactno = document.getElementById("contactno").value;

    var arr = [studentname, studentid, email, contactno];
    if (arr.includes("")) {
        return false;
    } else {
        return arr;
    }
}
//Inser data in a table
function insertData(enteredData) {
    if (!isDuplicateData(enteredData)) {
        var newRow = table.insertRow();
        newRow.insertCell(0).innerHTML = enteredData[0];
        newRow.insertCell(1).innerHTML = enteredData[1];
        newRow.insertCell(2).innerHTML = enteredData[2];
        newRow.insertCell(3).innerHTML = enteredData[3];
        newRow.insertCell(4).innerHTML = `<button onclick="Edit(this)">Edit</button> <button onclick="Delete(this)">Delete</button>`;

        // Store the data in local storage
        var storedData = localStorage.getItem("studentData");
        if (!storedData) {
            storedData = [];
        } else {
            storedData = JSON.parse(storedData);
        }
        storedData.push(enteredData);
        localStorage.setItem("studentData", JSON.stringify(storedData));
    }


}
//reset function

function Edit(td) {
    row = td.parentElement.parentElement;
    document.getElementById("studentname").value = row.cells[0].innerHTML;
    document.getElementById("studentid").value = row.cells[1].innerHTML;
    document.getElementById("email").value = row.cells[2].innerHTML;
    document.getElementById("contactno").value = row.cells[3].innerHTML;
}
//update function
function update() {
    row.cells[0].innerHTML = document.getElementById("studentname").value;
    row.cells[1].innerHTML = document.getElementById("studentid").value;
    row.cells[2].innerHTML = document.getElementById("email").value;
    row.cells[3].innerHTML = document.getElementById("contactno").value;
    row = null;
}
//Delete function

function Delete(td) {
    var ans = confirm("Are you sure you want to delete this data?");
    if (ans) {
        row = td.parentElement.parentElement;
        table.deleteRow(row.rowIndex);

        // Remove the data from local storage
        var storedData = JSON.parse(localStorage.getItem("studentData"));
        storedData.splice(row.rowIndex - 1, 1);
        localStorage.setItem("studentData", JSON.stringify(storedData));

        row = null;
    }
}
//Duplicate value checking function

function isDuplicateData(enteredData) {
    var rows = table.rows;
    for (var i = 1; i < rows.length; i++) {
        var rowData = [
            rows[i].cells[0].innerHTML,
            rows[i].cells[1].innerHTML,
            rows[i].cells[2].innerHTML,
            rows[i].cells[3].innerHTML
        ];
        if (JSON.stringify(rowData) === JSON.stringify(enteredData)) {
            return true;
        }
    }
    return false;
}
// this function is cheackin a input to enterd a valid name
function validateInput(input) {
    var regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
        alert("Fill a valid name")
    }
}