import React from 'react';
import {useDispatch, useSelector} from 'react-redux'; 
import addDepartment from './actions/actions';
import CreateDepartmentReduxComponent from './views/createdpet';
import ListDepartmentsReduxComponent from './views/listdepts';
const MainReduxComponent=()=>{
    let dispatch = useDispatch();
    let depts = useSelector(state=>state.listDepartmentsReducer);
  return (
        <div className="container">
            <h1>The React Redux Application</h1>
            <CreateDepartmentReduxComponent
             AddDepartment= {(department)=> dispatch(addDepartment(department))}></CreateDepartmentReduxComponent>
            <hr />
            <ListDepartmentsReduxComponent
             departments={depts}></ListDepartmentsReduxComponent>
        </div>

  );
};

export default MainReduxComponent;