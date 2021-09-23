var str = "While the Modi government is tight-lipped about the entire operations, the C-17 with all the evacuees will cross into Indian air space around 11am (IST) and land at Jamnagar. The IAF aircraft, which has a passenger capacity of nearly 800, is expected to reach Delhi around 1pm. India is now waiting for US forces to allow civilian flights to Kabul for further evacuation. The first batch of Indians came on Sunday via an Air India flight.na Jones is an American media franchise based on the adventures of Dr. Henry Walton 'Indiana' Jones, Jr., a fictional professor of archaeology, that began in 1981 with the film Raiders of the Lost Ark. In 1984, a prequel, The Temple of Doom, was released, and in 1989, a sequel, The Last Crusade. A fourth film followed in 2008, titled The Kingdom of the Crystal Skull. A fifth film is in production and is provisionally scheduled to be released in 2022. The series was created by George Lucas and stars Harrison Ford as Indiana Jones.";

function getIndexofChar(c){
    var count = [];
    for(var i=0;i<str.length;i++){
        if(str[i]==c) count.push(i+1);
    }
    return count;
}
function getNoOfStatements(){
    var count = 0;
    for(var i=0;i<str.length;i++){
        if(str[i]=='.') 
          count++;
    }
    return count;
}

function vowelCount(){
    var count = 0
    for(var i=0;i<str.length;i++){
        if((str[i]=='a')||(str[i]=='e')||(str[i]=='i')||(str[i]=='o')||(str[i]=='u')||(str[i]=='A')||(str[i]=='E')||(str[i]=='I')||(str[i]=='O')||(str[i]=='U')){
            count++;
        }
    }
    return count;
}

function getCharCount(){
    return str.length;
}

function changeCase(c){
    if(c == 'U' || c == 'u') return str.toUpperCase();
    if(c == 'L' || c == 'l') return str.toLocaleLowerCase();
    return str;
  }