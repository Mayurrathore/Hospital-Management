import React, { Component } from "react";


class CheckBoxDom extends Component{
    state = {
        res : []
    }
    resDiv = evt =>{
        let temp = []
        for (var option of document.getElementsByClassName('cbName'))
        {
            if (option.checked) {
                temp.push(option.value);
            }
        }
        this.setState((prevState , prevProp)=>{
            return ({res : JSON.stringify(temp)});
        })
    }
    ren
    render(){
        return(
        <>
        {
        this.props.val.map((item,pos)=>{
            return (
                <><input type='checkbox' value={item} className = 'cbName' key = {pos} onChange = {this.resDiv}/>{item}<br></br></>
            )
        })}
        <div>
            {this.state.res.length > 0 ? <>Selected Item :- {this.state.res} </>: ""}
        </div>
        </>
    )
}
}
export default CheckBoxDom;