var mydb;
var tab;
var header = ['ProductRowId', 'ProductId', 'ProductName', 'CategoryName', 'Manufacturer', 'Price', 'Description'];
var entries;
//create data base
function dbcreate(){
mydb=window.indexedDB.open("mayur",1);

mydb.onupgradeneeded  = function(e){
    var dbReference = e.target.result;
    var columnConstraints = {unique:false};
    tbl = dbReference.createObjectStore('Info', { keyPath: 'ProductRowId' });
        tbl.createIndex('ProductRowId', 'ProductRowId', { unique: true });
        tbl.createIndex('ProductId', 'ProductId', { unique: true, autoIncrement: true });
        tbl.createIndex('ProductName', 'ProductName', columnConstraints);
        tbl.createIndex('CategoryName', 'CategoryName', columnConstraints);
        tbl.createIndex('Manufacturer', 'Manufacturer', columnConstraints);
        tbl.createIndex('Price', 'Price', columnConstraints);
    document.getElementById('dvstatus').innerHTML = "Database is created and Objectstore is added in it";
};
        mydb.onsuccess =function(e){
            document.getElementById('dvstatus').innerHTML += "Database initial Operations are done";
        }

        // 4. if error occured the subscribe to the on error event
        mydb.onerror = function(e){
            document.getElementById('dvstatus').innerHTML += "Database IS FAILED TO OPEN";
        }

}


function convertToFour(num) {
    num = String(num);
    // console.log(num.length)
    if (num.length < 4) {
        return ('0'.repeat(4 - num.length) + num);
    } else { return (num); }
}

function genratePId(num) {
    return 'Product-' + convertToFour(num);
}

function clear(){
    var inputs = document.getElementsByClassName('c');
    for(var i=0;i<inputs.length;i++){
        inputs[i].value = '';
    } 
}

function saveData(){
    mydb = window.indexedDB.open("InfoDb");
    if(mydb){
        mydb.onsuccess=function(e){
            var tx = e.target.result.transaction("Info", "readwrite");
            tbl = tx.objectStore("Info");    
            var data = {
                "RowId": parseInt(document.getElementById("tid").value),
                "Name": document.getElementById("tname").value,
                "price": document.getElementById("tprice").value,
                "Category":document.getElementById("tcategory".value();
            };

            var operation = tbl.add(data); 
            operation.onsuccess = function(e){
                document.getElementById('dvstatus').innerHTML = "Record is added successfully";
            }
            operation.onerror = function(e){
                document.getElementById('dvstatus').innerHTML = "Save Operation is failed";
            }

        }
    }else {
        document.getElementById('dvstatus').innerHTML = "Unable to Open database";
    }
}