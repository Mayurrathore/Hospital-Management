import React,{Component} from "react";
import DD from "./deoplist";
// import './App.css'
class Drop extends Component {

        state = {
            selectOptions : [
                'antifungal','antifungals','bifunctional','cofunction','cofunctions','Vapid', 'Carson', 'Kitano', 'Dabver', 'Ibex', 'Morello', 'Akira', 'Titan', 'Dover', 'Norma','Black', 'White', 'Red', 'Blue', 'Silver', 'Green', 'Yellow'
            ],
            res : []
        }
    render() {
        return (
            <center>
                <DD val={this.state.selectOptions}/ >
            <br/>
            </center>
        )
    }
}
 
export default Drop;