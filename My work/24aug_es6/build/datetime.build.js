"use strict";

window.onload = function () {
  var btnSubmit = document.getElementById('submit');
  btnSubmit.addEventListener('click', function () {
    var fromDate = new Date(document.getElementById('fromDate').value);
    var toDate = new Date(document.getElementById('toDate').value);
    var fromDateSec = fromDate.getTime();
    var toDateSec = toDate.getTime();
    var dateDifSec = toDate - fromDateSec;
    var yearDiff = 0;
    var monthDiff = 0;
    var daysDiff = Math.floor(dateDifSec / (1000 * 60 * 60 * 24));
    var hrDiff = Math.floor((dateDifSec - daysDiff * (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minDiff = Math.floor((dateDifSec - daysDiff * (1000 * 60 * 60 * 24) - hrDiff * 1000 * 60 * 60) / (1000 * 60));
    var secDiff = Math.floor((dateDifSec - daysDiff * (1000 * 60 * 60 * 24) - hrDiff * (1000 * 60 * 60) - minDiff * 1000 * 60) / 1000);
    var resHTML = "";

    if (daysDiff > 365) {
      yearDiff = Math.floor(daysDiff / 365);
      daysDiff = daysDiff - yearDiff * 365;
      resHTML += "".concat(yearDiff, " Years, ");
    }

    if (daysDiff > 30) {
      monthDiff = Math.floor(daysDiff / 30);
      daysDiff -= monthDiff * 30;
      resHTML += "".concat(monthDiff, " Month, ");
    }

    if (daysDiff > 0) {
      console.log(daysDiff);
    }

    resHTML += "".concat(daysDiff, " Days, ").concat(hrDiff, " Hours, ").concat(minDiff, " Minutes, ").concat(secDiff, " Seconds");
    document.getElementById('res').innerHTML = resHTML;
  }, false);
};
