import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './redux/reducers/reducers';
import MainReduxComponent from './redux/main';
// import Table from './components/Table'
// import Calculator from './components/1/Calculator'
// import Drop from './components/20/2/drop';
// import Radio from './components/20/3/radio'
// import SelectCom from './components/Multiselect,'
// import Table from './components/20/1/table'
import Form from './components/22/1/form'
//import Pratice from './components/pratice'
// import SecureHttpCallComponent from './hospitaltest/httpsecurecomponent'
let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());
ReactDOM.render( 
  <React.StrictMode>
   <Provider store={store}>
        <MainReduxComponent></MainReduxComponent>
      </Provider>
       {/* <Calculator /> */}
       {/* <Table/> */}
       {/* <SelectCom/> */}
       {/* <Radio /> */}
       {/* <Drop /> */}
       {/* <ChildComponent /> */}
       {/* <Table /> */}
       <Form />
       {/* <SecureHttpCallComponent /> */}
       {/* <TableComponent /> */}
       {/* <SecureHttpCallComponent/> */}
      
     
      
  </React.StrictMode>,
  document.getElementById('root')
);
