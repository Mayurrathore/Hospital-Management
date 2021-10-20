const addDepartment=(department)=>{
    console.log(`In addDepartment action ${JSON.stringify(department)}`);
    department.DeptName = department.DeptName.toUpperCase(); 
    return {
        type: 'ADD_DEPARTMENT',  
        department 
    };
};

export default addDepartment;