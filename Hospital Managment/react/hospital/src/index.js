import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import Masterroute from './component/Mainroute';
import Home from './component/subcomponent/Homepage';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Masterroute/>
      {/* <Home/> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

