import {combineReducers} from 'redux';
export const addDepartmentReducer=(state,action)=>{
    switch(action.type) {
        case 'ADD_DEPARTMENT':
           
            return {
                department: action.department 
            };
        default:
             return state;        
    }
};
export const listDepartmentsReducer=(state=[], action)=>{
    switch(action.type){
        case 'ADD_DEPARTMENT':
            return [...state, addDepartmentReducer(undefined,action)];
        default:
            return state;    
    }   
}
const reducers = combineReducers({listDepartmentsReducer});

export default reducers;