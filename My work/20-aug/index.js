var mydb, tbl;
var tempCount;
var dbEntries;
var categoryList = ['Electrical', 'Electronics', 'Food', 'Fashion', 'Software', 'Hardware'];
var manufacturerList = ['Tata', 'IBM', 'MacD', 'Bajaj', 'Google', 'Microsoft', 'Amazon'];
var header = ['ProductRowId', 'ProductId', 'ProductName', 'CategoryName', 'Manufacturer', 'Price', 'Description'];

function createDb() {
    mydb = window.indexedDB.open('newdb', 1);
    mydb.onupgradeneeded = function (e) {
        var dbReference = e.target.result;
        var columnConstraints = { unique: false };
        tbl = dbReference.createObjectStore('newdbobj', { keyPath: 'ProductRowId' });
        tbl.createIndex('ProductRowId', 'ProductRowId', { unique: true });
        tbl.createIndex('ProductId', 'ProductId', { unique: true, autoIncrement: true });
        tbl.createIndex('ProductName', 'ProductName', columnConstraints);
        tbl.createIndex('CategoryName', 'CategoryName', columnConstraints);
        tbl.createIndex('Manufacturer', 'Manufacturer', columnConstraints);
        tbl.createIndex('Price', 'Price', columnConstraints);
        tbl.createIndex('Description', 'Description', columnConstraints);
        console.log("Database has been created successfully");
    }
}


function convertToFour(num) {
    num = String(num);

    if (num.length < 4) {
        return ('0'.repeat(4 - num.length) + num);
    } else { return (num); }
}


function genratePId(num) {
    return 'Prd-' + convertToFour(num);
}


function getData() {
    totalEnteries();
    var rpId = tempCount + 1;
    console.log("rpId:- " + rpId);
    console.log("rpId:- " + typeof (rpId));
    var pId = genratePId(rpId);
    var data = {
        ProductRowId: rpId,
        ProductId: pId
    }
    for (var ind = 2; ind < header.length; ind++) {
        let temp = document.getElementById(header[ind]).value;
        temp = temp[0].toUpperCase() + temp.substring(1);
        data[header[ind]] = temp;
        temp = '';
    }
    return (data);
}

function storeData(Update = false) {
    var data = getData();
    mydb = window.indexedDB.open('newdb');
    if (mydb) {
        mydb.onsuccess = function (e) {
            var tx = e.target.result.transaction('newdbobj', 'readwrite');
            tbl = tx.objectStore('newdbobj');
            var operation = tbl.add(data);
            operation.onsuccess = function (e) {
                console.log("Data has store successfully.....");
            }
            operation.onerror = function (e) {
                console.log("Their is some error in storing the data.....");
            }
        }
    }
    else {
        console.log("Unable to open DataBase...");
    }
}


function totalEnteries() {
    mydb = window.indexedDB.open('newdb');
    if (mydb) {
        mydb.onsuccess = function (e) {
            var tx = e.target.result.transaction('newdbobj', 'readonly');
            tbl = tx.objectStore('newdbobj');
            var objTotal = tbl.count();

            objTotal.onsuccess = function (e) {
                tempCount = e.target.result;
                console.log("Total Entries in DataBase:-  " + tempCount);

            }

        }

    }
    else {
        console.log("Unable to load database...");
    }
}

// get all entries stored in database
function getAllEntries() {
    mydb = window.indexedDB.open('newdb');
    if (mydb) {
        mydb.onsuccess = function (e) {
            var tx = e.target.result.transaction('newdbobj', 'readonly');
            tbl = tx.objectStore('newdbobj');
            var objTotal = tbl.getAll();

            objTotal.onsuccess = function (e) {
                dbEntries = e.target.result;


            }

        }

    }
    else {
        console.log("Unable to load database...");
    }
}


// function to delete entry from database

function deleteEntry(ProductRId) {
    console.log(ProductRId);
    mydb = window.indexedDB.open('newdb');
    if (mydb) {
        mydb.onsuccess = function (e) {
            var tx = e.target.result.transaction('newdbobj', 'readwrite');
            tbl = tx.objectStore('newdbobj');
            var objTotal = tbl.delete(ProductRId, 1);

            objTotal.onsuccess = function (e) {
                getAllEntries();
            }

        }

    }
    else {
        console.log("Unable to load database...");
    }
}

// Delete whole DataBase:- 
function deleteDb() {
    var dbDeleteRequest = window.indexedDB.deleteDatabase("newdb");
    dbDeleteRequest.onsuccess = function () {
        console.log("Database is deleted succesfully");
    }
}

function getUpdatedData(ProductRId) {

    var data = {
        ProductRowId: ProductRId,
        ProductId: genratePId(ProductRId),
        PersonName: document.getElementById('UpdatedProductName').value,
        CategoryName: document.getElementById('UpdatedCategoryName').value,
        Manufacturer: document.getElementById('UpdatedManufacturer').value,
        Price: document.getElementById('UpdatedPrice').value,
        Description: document.getElementById('UpdatedDescription').value
    }
    return data;
}


function storeUpdatedData(data) {

    mydb = window.indexedDB.open('newdb');
    if (mydb) {
        mydb.onsuccess = function (e) {
            var tx = e.target.result.transaction('newdbobj', 'readwrite');
            tbl = tx.objectStore('newdbobj');
            var operation = tbl.put(data);
            operation.onsuccess = function (e) {
                console.log("Data has Updated successfully.....");
            }
            operation.onerror = function (e) {
                console.log("Their is some error in updating the data.....");
            }
        }
    }
    else {
        console.log("Unable to open DataBase...");
    }
}

// function editEntry(ProductRId) {
//     getAllEntries();
//     var tempProductName = 'entry' + (ProductRId - 1) + "ProductName";
//     var tempCategoryName = 'entry' + (ProductRId - 1) + "CategoryName";
//     var tempManufacturer = 'entry' + (ProductRId - 1) + "Manufacturer";
//     var tempPrice = 'entry' + (ProductRId - 1) + "Price";
//     var tempDescription = 'entry' + (ProductRId - 1) + "Description";
//     console.log(dbEntries[ProductRId]);
//     document.getElementById(tempProductName).innerHTML = "<input type = 'text' id = 'UpdatedProductName' value = '" + dbEntries[ProductRId - 1]['ProductName'] + "'>";
//     document.getElementById(tempCategoryName).innerHTML = "<select id = 'UpdatedCategoryName'>" + dropDownFunc(categoryList) + "</select>";
//     document.getElementById(tempManufacturer).innerHTML = "<select id= 'UpdatedManufacturer'>" + dropDownFunc(manufacturerList) + "</select>";
//     document.getElementById(tempDescription).innerHTML = "<input type = 'text' id='UpdatedDescription' value = '" + dbEntries[ProductRId - 1]['Description'] + "'>";
//     document.getElementById(tempPrice).innerHTML = "<input type = 'number' id= 'UpdatedPrice' min='0' value = '" + dbEntries[ProductRId - 1]['Price'] + "'>";
//     document.getElementById('edit' + ProductRId).innerHTML = "Done";

// }




function generateHeading() {
    var headHTML = "<tr>";
    for (var ind in header) {
        headHTML += "<th>" + header[ind] + "</th>";
    }
    headHTML += "<th>Edit</th><th>Delete</th></tr>"
    return headHTML;
}
function generateBody() {
    console.log("Inside generate body function...");
    var bodyHTML = "";
    for (var ind in dbEntries) {
        var rowHTML = "<tr>"
        console.log(dbEntries[ind]);
        for (var ind2 in header) {
            rowHTML += "<td id ='entry" + ind + header[ind2] + "'>" + dbEntries[ind][header[ind2]] + "</td>"

            console.log("entry" + ind + header[ind2])
        }
        rowHTML += "<td><button id = 'edit" + dbEntries[ind]['ProductRowId'] + "' value = '" + dbEntries[ind]['ProductRowId'] + "' onclick = 'editEntry(" + dbEntries[ind]['ProductRowId'] + ")'>Edit</button></td><td><button id='dlt" + dbEntries[ind]['ProductRowId'] + "' value = '" + dbEntries[ind]['ProductRowId'] + "' onclick = 'deleteEntry(" + dbEntries[ind]['ProductRowId'] + ")'>Delete</button></td></tr>"

        bodyHTML += rowHTML;
    }
    return bodyHTML;
}



function dropDownFunc(dropDownList) {
    var temp = "<option value=''>--Select--</option>";
    for (var i in dropDownList) {
        temp += "<option value='" + dropDownList[i] + "'>" + dropDownList[i] + "</option>";
    }
    return temp;
}



function clear() {
    var inputs = document.getElementsByClassName('c');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}