import React,{Component} from "react";
import TableDom from "./Dom";
class Table extends Component {
state = {
    headers : ['ProductId','ProductName','Manufacturer', 'Price'],
data : [
    {ProductId : 11 , ProductName : 'car' , Manufacturer : 'TATA' , Price : 10000},
    {ProductId : 2 , ProductName : 'BUs' , Manufacturer : 'TATA' , Price : 90000},
    {ProductId : 3 , ProductName : 'burger' , Manufacturer : 'MACDI' , Price : 70000},
    {ProductId : 4 , ProductName : 'bike' , Manufacturer : 'BAJAJ' , Price : 20000},
    {ProductId : 5 , ProductName : 'pizza' , Manufacturer : 'DOMINOS' , Price : 40000},
    {ProductId : 6 , ProductName : 'phone' , Manufacturer : 'oneplus' , Price : 50000},
    {ProductId : 7 , ProductName : 'headphone' , Manufacturer : 'MI' , Price : 80000},
    {ProductId : 8 , ProductName : 'charger' , Manufacturer : 'BOAT' , Price : 60000},
    {ProductId : 9 , ProductName : 'cabel' , Manufacturer : 'ERD' , Price : 30000},
    {ProductId : 10 , ProductName : 'BOOKS' , Manufacturer : 'CBS' , Price : 20000},
    
]
}
popTheElement=(ele)=>{
    console.log(parseInt(ele.target.id)+1)
}
render(){
    return(
        <div>
            <center>
                <TableDom headers = {this.state.headers} body={this.state.data}/>
            </center>
        </div>
    )
}
}
 
export default Table;