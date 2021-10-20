import React, { useState } from 'react'

function Pratice() {
    const [A, setA] = useState(0)
    const [B,setB]=useState(0)
    

    var setprop=()=>{
        setemail='Mayur@123'
    };
    
    return (
         
        <div>
        <h1>Home page </h1>
        <div className="container">
        <form>
  <div class="form-group">
    <label for="exampleFormControlInput1">ENTER VALUE OF A</label>
    <input  class="form-control"  onchange={setprop} />
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">ENTER VALUE OF B</label>
    <input  class="form-control"  onchange={setprop}/>
  </div>
<br/>
  <div  className="container">
      <button className="bt btn-primary">click ME </button>
  </div>
  <div>
      <strong>

      </strong>
  </div>
 
</form>
        </div>
        </div>
    )
}

export default Pratice
