import React ,{ useState } from "react";
import {Multiselect} from 'multiselect-react-dropdown';

function SelectCom()
{
    const data=[
       { Country :"TATA"},
       { Country :"IBM"},
       { Country :"INFOSYS"},
       { Country :"HSBC"},
       { Country :"BLAZECLAN"},
    ]
const [options] = useState(data);
return(
        <div style={{width:"90%",justifyContent:"center",display:"flex"}}>
        <div className="SelectCom">
            <h1 style={{color:"red"}}>MULTI SELECT DROP DOWN</h1>
            <Multiselect options={options} displayValue="Country" />
        </div>
        </div>
        );
}
export default SelectCom;