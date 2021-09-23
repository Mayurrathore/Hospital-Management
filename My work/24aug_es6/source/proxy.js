class PersonInfo {
    constructor() {
        this.PersonName = "Mayur Rathore";
        this.Email1 = "mayurrathore422@gmail.com";
        this.Email2 = "mayurrathore@gmail.co.in";
        this.Occupation = "Clan Fellow";
        this._Secret = "9111441314";
    }
}
const masterHandler = {
    ownKeys(target) {
        let properties = Object.keys(target).filter((p, i) => {
            return p[0] !== '_';
        });
        return properties;
    },
    ownValues(target, prop) {
        return target[prop];
    }
}


const handler1 = {
    get(target, prop) {
        if (prop.startsWith("Email")) {
            if (target[prop].endsWith('.co.in')) {  
                return target[prop]
            }
            else {
                return "Access Denied";
            }
        }
        else {
            return target[prop];
        }
    },
    set(target, prop, val) {
        target[prop] = val;
        return true;
    },
   
    ...masterHandler
}


const handler2 = {
    get(target, prop) {
        if (prop.startsWith("Email")) {
            if (target[prop].endsWith('.com')) {
                
                return target[prop]
            }
            else {
                return "Access Denied";
            }
        }
        else {
            return target[prop];
        }
    },
    set(target, prop, val) {
        target[prop] = val;
        return true;
    },
   
    ...masterHandler
}



const handler3 = {
    get(target, prop) {
        if (prop.startsWith("Occupation") || prop.startsWith("Email")) {
            return "Access Denied";
        }
        else {
            return target[prop];
        }
    },
    set(target, prop, val) {
        target[prop] = val;
        return true;
    },
   
    ...masterHandler
}



const handler4 = {
    get(target, prop) {
        return target[prop];
    },
    set(target, prop, val) {
        if (prop.startsWith('_Secret')) {
            throw new Error("consumer 4 have only read only Access");
        }
        else {
            target[prop] = val;
            return true;
        }
    },
   
    ...masterHandler
}


let proxy1 = new Proxy(new PersonInfo(), handler1);
let proxy2 = new Proxy(new PersonInfo(), handler2);
let proxy3 = new Proxy(new PersonInfo(), handler3);
let proxy4 = new Proxy(new PersonInfo(), handler4);

function Consumer1() {
    console.log(Object.keys(proxy1));
    console.log(Object.values(proxy1));
    console.log(`Calling personName:- ${proxy1.PersonName}`);
    console.log(`Calling Email1:- ${proxy1.Email1}`);
    console.log(`Calling Email2:- ${proxy1.Email2}`);
    console.log(`Calling Occupation:- ${proxy1.Occupation}`);
    console.log(`Calling _Secret:- ${proxy1._Secret}`);
    proxy1._Secret = "Unknown";
}
try { Consumer1(); }
catch (e) { console.log(e.message); }



function Consumer2() {
    console.log(Object.keys(proxy2));
    console.log(Object.values(proxy2));
    console.log(`Calling personName:- ${proxy2.PersonName}`);
    console.log(`Calling Email1:- ${proxy2.Email1}`);
    console.log(`Calling Email2:- ${proxy2.Email2}`);
    console.log(`Calling Occupation:- ${proxy2.Occupation}`);
    console.log(`Calling _Secret:- ${proxy2._Secret}`);
}
try { Consumer2(); }
catch (e) { console.log(e.message); }



function Consumer3() {
    console.log(Object.keys(proxy3));
    console.log(Object.values(proxy3));
    console.log(`Calling personName:- ${proxy3.PersonName}`);
    console.log(`Calling Email1:- ${proxy3.Email1}`);
    console.log(`Calling Email2:- ${proxy3.Email2}`);
    console.log(`Calling Occupation:- ${proxy3.Occupation}`);
    console.log(`Calling _Secret:- ${proxy3._Secret}`);
}
try { Consumer3(); }
catch (e) { console.log(e.message); }


function Consumer4() {
    console.log(Object.keys(proxy4));
    console.log(Object.values(proxy4));
    console.log(`Calling personName:- ${proxy4.PersonName}`);
    console.log(`Calling Email1:- ${proxy4.Email1}`);
    console.log(`Calling Email2:- ${proxy4.Email2}`);
    console.log(`Calling Occupation:- ${proxy4.Occupation}`);
    console.log(`Calling _Secret:- ${proxy4._Secret}`);
    proxy4._Secret = "Unknown";
}
try { Consumer4(); }
catch (e) { console.log(e.message); }