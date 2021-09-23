"use strict";

var gender = ["Male", "Female", "Transgender"];
var ward = ["General", "Private", "Special"];
var disease = ["General", "Cancer", "Heart", "Sugar", "Pneuomonia", "Skin Care", "Bone"];
var field = ['PatientId', 'PatientName', 'DoctorName', 'Age', 'Gender', 'Disease', 'Ward', 'RoomNo'];
var data = [];
var count = 0;
var dName = new Set();

function dropDownList(ddList, id) {
  var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var temp = "";

  if (flag == 1) {
    temp = "<select id = '".concat(id, "' onchange = \"filterCat()\" required><option value = ''>--Select--</option>");
  } else if (flag == 2) {
    temp = "<select id = '".concat(id, "' onchange = \"filteredCat(").concat(id, ")\" required><option value = ''>--Select--</option>");
  } else temp = "<select id = '".concat(id, "' required><option value = ''>--Select--</option>");

  ddList.map(function (item) {
    temp += "<option value='".concat(item, "'>").concat(item, "</option>");
  });
  temp += "</select>";
  return temp;
}

window.onload = function () {
  document.getElementById('gender').innerHTML = dropDownList(gender, "Gender");
  document.getElementById('ward').innerHTML = dropDownList(ward, "Ward");
  document.getElementById('disease').innerHTML = dropDownList(disease, "Disease");
  document.getElementById('submit').addEventListener('click', function () {
    storeData();
  }, false);
};

function filteredCat(onVal) {
  filterData(document.getElementById('filter').value, onVal);
}

function filterCat() {
  var raioBt = document.getElementById('filter');
  var radioBtval = raioBt.value;

  if (radioBtval == 'Doctor') {
    document.getElementById('dvfilter2').innerHTML = dropDownList(Array.from(dName), 'filterDoctor', 2);
  } else if (radioBtval == "Disease") {
    document.getElementById('dvfilter2').innerHTML = dropDownList(disease, 'filterDisease', 2);
  } else {
    document.getElementById('dvfilter2').innerHTML = dropDownList(ward, 'filterWard', 2);
  }
}

var filterData = function filterData(onAtt, attVal) {
  if (onAtt == 'Doctor') onAtt = onAtt + 'Name';
  var filteredData = [];
  data.map(function (item) {
    if (item[onAtt] == attVal.value) {
      filteredData.push(item);
    }
  });
  document.getElementById('tableData').innerHTML = generateHeading() + generateBody(filteredData);
};

var showTable = function showTable() {
  document.getElementById('dvfilter').innerHTML = dropDownList(['Doctor', 'Disease', 'Ward'], 'filter', 1);
  document.getElementById('tableData').innerHTML = generateHeading() + generateBody();
};

var storeData = function storeData() {
  var temp = {};
  temp[field[0]] = "Pt-" + String(count + 1);

  for (var i = 1; i < field.length; i++) {
    if (field[i] == "DoctorName") dName.add(document.getElementById(field[i]).value);
    var te = document.getElementById(field[i]).value;
    te = te[0].toUpperCase() + te.substring(1);
    temp[field[i]] = document.getElementById(field[i]).value;
    document.getElementById(field[i]).value = "";
  }

  count++;
  data.push(temp);
  showTable();
};

var generateHeading = function generateHeading() {
  var headHTML = "<tr>";

  for (var ind in field) {
    headHTML += "<th>" + field[ind] + "</th>";
  }

  headHTML += "</tr>";
  return headHTML;
};

var generateBody = function generateBody() {
  var DataVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : data;
  var bodyHTML = "";

  for (var ind in DataVal) {
    var rowHTML = "<tr>";

    for (var ind2 in field) {
      rowHTML += "<td id ='entry" + ind + field[ind2] + "'>" + DataVal[ind][field[ind2]] + "</td>";
    }

    bodyHTML += rowHTML;
  }

  return bodyHTML;
};
