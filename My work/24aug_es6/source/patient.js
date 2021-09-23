let gender = ["Male","Female","Transgender"]
let ward = ["General","Private","Special"]
let disease = ["General","Cancer","Heart","Sugar","Pneuomonia","Skin Care","Bone"];
let field = ['PatientId','PatientName','DoctorName','Age','Gender','Disease','Ward','RoomNo']
let data = [];
let count = 0;
let dName = new Set();

function dropDownList(ddList,id,flag = 0,value=""){
    let temp = "";
    if(flag ==1 )
    {
        temp = `<select id = '${id}' onchange = "filterCat()" required><option value = ''>--Select--</option>`;    
    }
    else if(flag == 2 )
    {
        temp = `<select id = '${id}' onchange = "filteredCat(${id})" required><option value = ''>--Select--</option>`;    
    }
    else
    temp = `<select id = '${id}' required><option value = ''>--Select--</option>`;
    ddList.map(item=>{
            temp+= `<option value='${item}'>${item}</option>`;
        }
    )
    temp+= "</select>"
    return temp;
}
window.onload = function(){
    document.getElementById('gender').innerHTML = dropDownList(gender,"Gender");
    document.getElementById('ward').innerHTML = dropDownList(ward,"Ward");
    document.getElementById('disease').innerHTML = dropDownList(disease,"Disease");
    document.getElementById('submit').addEventListener('click',()=>{
        storeData();
    },false)
}

function filteredCat(onVal)
{
    filterData(document.getElementById('filter').value,onVal);
}
function filterCat(){
    let raioBt = document.getElementById('filter');
    let radioBtval = raioBt.value;
    if(radioBtval == 'Doctor')
    {
        document.getElementById('dvfilter2').innerHTML = dropDownList(Array.from(dName),'filterDoctor',2);
    }
    else if(radioBtval == "Disease")
    {
        document.getElementById('dvfilter2').innerHTML = dropDownList(disease,'filterDisease',2);
    }
    else{
        document.getElementById('dvfilter2').innerHTML = dropDownList(ward,'filterWard',2);
    }
}
let filterData = (onAtt , attVal) =>{
    if(onAtt == 'Doctor')
    onAtt = onAtt + 'Name';
    let filteredData = [];
    data.map((item) =>{
        if(item[onAtt] == attVal.value)
        {
            filteredData.push(item);
        }
    })

    document.getElementById('tableData').innerHTML =  generateHeading() + generateBody(filteredData);
}

let showTable = () =>{
    document.getElementById('dvfilter').innerHTML = dropDownList(['Doctor','Disease','Ward'],'filter',1);
    document.getElementById('tableData').innerHTML = generateHeading() + generateBody();
}
let storeData =()=>{
    let temp = {};
    temp[field[0]] = "Pt-"+String(count+1);
    for(let i=1; i<field.length; i++){
        if(field[i] == "DoctorName")
        dName.add(document.getElementById(field[i]).value);
        let te = document.getElementById(field[i]).value;
        te = te[0].toUpperCase() + te.substring(1);
        temp[field[i]] = document.getElementById(field[i]).value;
        document.getElementById(field[i]).value = "";
    }
    count++;
    data.push(temp);
  showTable();
}



let generateHeading = () => {
    let headHTML = "<tr>";
    for (let ind in field) {
        headHTML += "<th>" + field[ind] + "</th>";
    }
    headHTML += "</tr>"
    return headHTML;
}
let generateBody = (DataVal = data) => {
  let bodyHTML = "";
    for(let ind in DataVal)
    {
        let rowHTML = "<tr>"
        for(let ind2 in field)
        {
            rowHTML += "<td id ='entry"+ind+field[ind2]+"'>"+DataVal[ind][field[ind2]]+"</td>"
        }
        bodyHTML += rowHTML;
    }
    return bodyHTML;
}
