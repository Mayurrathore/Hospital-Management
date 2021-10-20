import React, { Component } from "react";

class RadioDom extends Component{
    state = {
        res : []
    }
    // console.log(this.props)
    resDiv = evt =>{
        this.setState((prevState,prevProp)=>{
            return ({res : evt.target.value})
        })
    }
    render(){
        return(
            <>
        <div>
            {this.props.val.map((item,pos)=>{
                return(
                    <><input type='radio' name={this.props.name} key={pos} value={item} onClick = {this.resDiv}/>{item}<br></br></>
                )
            })}
            
        </div>
        <div>
            {this.state.res.length > 0 ? <>Selected Item :- {this.state.res} </>: null}
        </div>
        </>
    )
}
}

export default RadioDom