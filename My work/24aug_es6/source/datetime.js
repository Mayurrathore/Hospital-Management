window.onload = function(){
    let btnSubmit = document.getElementById('submit');
    btnSubmit.addEventListener('click',()=>{
        let fromDate = new Date(document.getElementById('fromDate').value);
        let toDate = new Date(document.getElementById('toDate').value);
        let fromDateSec = fromDate.getTime();
        let toDateSec = toDate.getTime();
        let dateDifSec = toDate - fromDateSec;  
        let yearDiff = 0;
        let monthDiff = 0;
        let daysDiff = Math.floor(dateDifSec / (1000 * 60 * 60 * 24));
        let hrDiff = Math.floor((dateDifSec - daysDiff*(1000 * 60 * 60 * 24))/(1000*60*60));
        let minDiff = Math.floor((dateDifSec - daysDiff*(1000 * 60 * 60 * 24) - hrDiff*1000*60*60)/(1000*60));
        let secDiff = Math.floor((dateDifSec - daysDiff*(1000 * 60 * 60 * 24) - hrDiff*(1000 * 60 * 60) -minDiff*1000*60)/(1000));
        let resHTML = ``;
        if(daysDiff>365){
            yearDiff = Math.floor(daysDiff/365);
            daysDiff = daysDiff - yearDiff*365;
            resHTML+= `${yearDiff} Years, `;
        }
        if(daysDiff > 30)
        {
            monthDiff = Math.floor(daysDiff / 30);
            daysDiff-= monthDiff*30;
            resHTML+= `${monthDiff} Month, `;
        }
        if(daysDiff > 0)
        {
            console.log(daysDiff);
        }
        resHTML += `${daysDiff} Days, ${hrDiff} Hours, ${minDiff} Minutes, ${secDiff} Seconds`;
        document.getElementById('res').innerHTML = resHTML;
    },
    false)
}