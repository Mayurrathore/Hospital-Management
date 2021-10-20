import React, {Component} from 'react';
import './cal.css'
class Calculator extends Component {
     constructor(props) {
        super(props);
        this.state = { getstring: ''}
    }
    getdata = (evt) => {
        const data = evt.target.value;
        
        // if(data === 'Del'){
        //     this.setState((prevstate) => ({
        //         getstring: prevstate.getstring + data,
        //     }));
        // }

        if(data === '%'){
            this.setState({
                getstring: (this.state.getstring / 100),
            });
            return;
        }
        if(data === '1/x'){
            this.setState({
                getstring: (1/this.state.getstring),
            });
            return;
        }
        
        if (data === 'x^2') {
            
            this.setState({
                getstring: Math.pow(this.state.getstring, 2),
            });
            
            return;
               
        }
        
        if (data === 'x^3') {
            
            this.setState({
                getstring: Math.pow(this.state.getstring, 3),
            });
            
            return;
               
        }

        if (data === 'sin') {
            
            this.setState({
                getstring: Math.sin(this.state.getstring * Math.PI / 180),
            });
            
            return;
               
        }

        if (data === 'cos') {
            
            this.setState({
                getstring: Math.cos(this.state.getstring * Math.PI / 180),
            });
            
            return;
               
        }

        if (data === 'tan') {
            
            this.setState({
                getstring: Math.tan(this.state.getstring * Math.PI / 180),
            });
            
            return;
               
        }

        if (data === 'ln') {
            
            this.setState({
                getstring: Math.log(this.state.getstring),
            });
            
            return;
               
        }

        if (data === 'log') {
            
            this.setState({
                getstring: Math.log10(this.state.getstring),
            });
            
            return;
               
        }

        if(data === '√'){
            this.setState({
                getstring: Math.sqrt(this.state.getstring),
            });
            return;
        }

        if(data === 'π'){
            this.setState({
                getstring: 3.141592653589793238,
            });
            return;
        }
                

        if( data === 'C'){
            this.setState({ getstring:"" });
            return;
        }
        if(data === "="){
            this.setState((prevstate) => ({
                getstring: eval(prevstate.getstring),
            }));      
            return;     
        }

        this.setState((prevstate) => ({
            getstring: prevstate.getstring + data,
        }));
        return;
    };

    render(){
        return(
          
                <div id='table'  class="calculator card">
                    <h2 id="title">Scientific Calculator</h2>
                    <hr />
                    <input type="text" value={this.state.getstring} class="calculator-screen z-depth-1"/>&nbsp;
                    <div class="calculator-keys">
                        <div >
                            <input type="button" onClick={this.getdata}  value="7" class="btn btn-primary me-2" />&nbsp;
                            <input type="button" onClick={this.getdata}  value="8" class="btn btn-primary me-2"/>&nbsp;
                            <input type="button" onClick={this.getdata}  value="9" class="btn btn-primary me-2"/>&nbsp;
                            <input type="button" onClick={this.getdata}  value="0" class="btn btn-primary me-2"/>   
                        </div>
                        
                        <div>
                            
                            <input type="button" onClick={this.getdata}  value="4" class="btn btn-primary me-2"/>&nbsp;
                            <input type="button" onClick={this.getdata}  value="5" class="btn btn-primary me-2"/>&nbsp;
                            <input type="button" onClick={this.getdata}  value="6" class="btn btn-primary me-2"/>&nbsp;
                            <input type="button" onClick={this.getdata}  value="/" class="operator btn btn-info"/>
                            
                        </div>


                        <div >
                            
                            <input type="button" onClick={this.getdata}  value="1" class="btn btn-primary me-2"/>&nbsp;
                            <input type="button" onClick={this.getdata}  value="2" class="btn btn-primary me-2"/>&nbsp;
                            <input type="button" onClick={this.getdata}  value="3" class="btn btn-primary me-2"/>&nbsp;
                            <input type="button" onClick={this.getdata}  value="*" class="operator btn btn-info"/>
                        </div>

                        <div >
                            <input type="button" onClick={this.getdata}  value="C" class="operator btn btn-info"/>&nbsp;
                            <input type="button" onClick={this.getdata}  value="." class="operator btn btn-info"/>&nbsp;
                            <input type="button" onClick={this.getdata}  value="-" class="operator btn btn-info"/>&nbsp;
                            <input type="button" onClick={this.getdata}  size="2" value="+" class="operator btn btn-info" />  
                        </div>

                        <div >
                            <input type="button" onClick={this.getdata}  value="sin" class="operator btn btn-info"/>&nbsp;
                            <input type="button" onClick={this.getdata}  value="cos" class="operator btn btn-info"/>&nbsp;
                            <input type="button" onClick={this.getdata}  value="tan" class="operator btn btn-info"/>
                            
                            
                        </div>

                        <div >
                            
                            <input type="button" onClick={this.getdata}  value="√" class="operator btn btn-info"/>&nbsp;
                            <input type="button" onClick={this.getdata}  value="π" class="operator btn btn-info" />&nbsp;
                            <input type="button" onClick={this.getdata}  value="x^2" class="operator btn btn-info"/>
                            
                        </div>

                        <div >
                            <input type="button" onClick={this.getdata}  value="1/x" class="operator btn btn-info"/>&nbsp;
                            <input type="button" onClick={this.getdata}  value="ln" class="operator btn btn-info"/>&nbsp;
                            <input type="button" onClick={this.getdata}  value="log10" class="operator btn btn-info"/>
                            <br />
                           
                        </div>
                        <div>
                                <input type="button" onClick={this.getdata}  value="%" class="operator btn btn-info"/>&nbsp;
                                <input type="button" onClick={this.getdata}  value="x^3" class="operator btn btn-info"/>&nbsp;
                                <input type="button" id="result" onClick={this.getdata}   value="=" class="operator btn btn-info"/>&nbsp;
                        </div>
                        </div>
                        
                    
  
                </div>                
                
                    
            
        )
    }
}

export default Calculator;