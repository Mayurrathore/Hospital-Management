let PatientData = [
    { Patient_Id: 1, Patient_Name: "palkesh",  Ward: "General" },
    { Patient_Id: 2, Patient_Name: "Mayur",  Ward: "Cadiology" },
    { Patient_Id: 3, Patient_Name: "Nayan",  Ward: "General" },
    { Patient_Id: 4, Patient_Name: "shruti",  Ward: "General" },
    { Patient_Id: 5, Patient_Name: "harh",  Ward: "Neurology" },
    { Patient_Id: 6, Patient_Name: "aayushi",  Ward: "Dialysis" }
];

function* dataGenerator(start,step,end=Infinity){
    for(let i=start;i<end;i+=step){
    
        if(PatientData[i].Ward=='General')
            yield PatientData[i]; 
    } 
}

const generator = dataGenerator(0, 1,PatientData.length);
let dataReader = generator.next();
while(!dataReader.done){
    console.log(`The Current Value is = ${JSON.stringify(dataReader.value)}`);
    dataReader = generator.next();
}


