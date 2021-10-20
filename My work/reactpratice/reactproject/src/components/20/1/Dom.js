import React,{Component} from "react";

class TableDom extends Component {
        state = { 
            data : this.props.body,
            dataCopy : this.props.body,
            headers : this.props.headers,
            selectedId : "",
            selectedName : "",
            selectedManu: "",
            selectedPrice : "",
            pagingArr : ['1'],
            pageSize : this.props.body.length,
         }

    deleteEle = evt =>{
        let temp = this.state.data.findIndex( item => item.ProductId == evt.target.value);
        this.state.data.splice(temp,1)
        this.setState((prevState,prevProp)=>{
            console.log(prevState.data);
            return({data : prevState.data})
        })
    }
    sortOnThis = evt =>{
        this.setState((prevState,prevProp)=>{
            let temp = prevState.data
            console.log(evt.target.innerText)
            console.log(temp.sort((a,b)=>(a[evt.target.innerText] > b[evt.target.innerText]) ? 1 : -1))
            return({data:temp});
        })
    }

    getValues = (items) =>{
        this.setState({selectedId : items.ProductId})
        this.setState({selectedName : items.ProductName})
        this.setState({selectedManu : items.Manufacturer})
        this.setState({selectedPrice : items.Price})
    }

updatePagingArr = evt =>{
    let temp = []
    
    for(let i =1 ; i <= Math.ceil(this.state.dataCopy.length/evt.target.value) ; i++)
    {
        temp.push(i)
    }
    this.setState({pagingArr : temp,pageSize : evt.target.value});
}

changeDataValue = evt =>{
    let temp = []
    let strInd = (parseInt(evt.target.innerText) - 1)*(parseInt(this.state.pageSize))
    console.log(parseInt(this.state.pageSize))
    for(let i =  strInd; i <strInd + parseInt(this.state.pageSize);i++ ){
        if(this.state.dataCopy[i] === undefined)
        {
            break
        }
        temp.push(this.state.dataCopy[i])
    }
    console.log(temp);  
    this.setState({data : temp});
}
    render() { 
        return (
        < >
        <br></br>
        <h1>TABLE DELETE SORT AND PSGINATION</h1>
        <div style={{textAlign :'left'}}>
           <strong> Enter the number of Rows in one Page:-</strong> 
            <input class="text-nowrap" type='number' placeholder='Enter table size' min='1' max = {this.state.dataCopy.length} onChange={this.updatePagingArr}></input><br/>
                {
                this.state.pagingArr.map((item,pos)=>{
                 
                    return(
                        
                        <ul className="pagination" style={{display:"inline-block"}}>
                        <li class="page-item " style={{display:"inline-block"}}>
                        <a style={{display:"inline-block"}} class="page-link" href="#"  onClick={this.changeDataValue}>{item}</a>
                        </li>
                       </ul>
                        )
                })
                
                }
            
        </div>
       
                <table className="table table-bordered table table-hover  " >

                    <thead >
                        {
                            this.props.headers.map((item,pos)=>{
                                return(
                                    <td>
                                    <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                    <li class="page-item"><a href = "#" class="page-link" onClick = {this.sortOnThis} value= {item} > {item}</a></li>
                                    </ul>
                                    </nav>
                                    </td>
                                )
                            })
                        }
                        <td>Delete</td>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((item,pos)=>{
                                return(<tr onClick={()=>this.getValues(item)}>
                                    {this.props.headers.map((it,po)=>{
                                        return(
                                            <td>{item[it]}</td>
                                        )
                                    }
                                    )}
                                    <button className="btn btn-dark" value={item['ProductId']} onClick={this.deleteEle}>Delete</button>
                                    </tr>
                                )
                            }) 
                        }
                    </tbody>
                </table>
                <div className="container" style={{textAlign :'left'}}>
                       <div class="form-control"> Id : - {this.state.selectedId}<br/></div><br></br>
                       <div class="form-control"> Name : - {this.state.selectedName}<br/></div><br></br>
                       <div class="form-control"> Manufacturer : - {this.state.selectedManu}<br/></div><br></br>
                       <div class="form-control">Price : - {this.state.selectedPrice}<br/></div>
                </div>
        </>  
    );
    }
}
 
export default TableDom;