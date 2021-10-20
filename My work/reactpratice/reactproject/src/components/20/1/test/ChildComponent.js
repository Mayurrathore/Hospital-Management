import React, { Component } from "react";
// import ReuseRadio from "../Assignment3(20-09)/RadioComponent";

class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHiddenTable: true,
            isHiddenDelete: true,
            isHiddenSort: true,
            isHiddenPages: true,
            No_of_data: 0,
            Start: 0,
            deleteButton: "Show Delete Option",
            sortButton: "Show Sort Option",
            pageShow: "Show Pages Option",
            ProductId: 0,
            ProductName: '',
            CategoryName: '',
            No_of_pages: 0,
            Price: 0,
            columnHeaders: [],
            Products: [
                { ProductId: 105, ProductName: "Laptop", CategoryName: "Electronics", Price: 70000 },
                { ProductId: 121, ProductName: "television", CategoryName: "Electronics", Price: 40000 },
                { ProductId: 113, ProductName: "Speaker", CategoryName: "Electronics", Price: 20000 },
                { ProductId: 104, ProductName: "Printer", CategoryName: "Electronics", Price: 55000 },
                { ProductId: 107, ProductName: "Camera", CategoryName: "Electronics", Price: 80000 },
                { ProductId: 106, ProductName: "Copper Wire", CategoryName: "Electrical", Price: 1000 },
                { ProductId: 101, ProductName: "Socket", CategoryName: "Electrical", Price: 500 },
                { ProductId: 108, ProductName: "Switch", CategoryName: "Electrical", Price: 300 },
                { ProductId: 119, ProductName: "Wallet", CategoryName: "Fashion", Price: 1000 },
                { ProductId: 110, ProductName: "Shoes", CategoryName: "Fashion", Price: 10000 },
                { ProductId: 116, ProductName: "Wrist Watch", CategoryName: "Fashion", Price: 10000 },
                { ProductId: 112, ProductName: "Formal shirt", CategoryName: "Fashion", Price: 1500 },
                { ProductId: 103, ProductName: "Jeans", CategoryName: "Fashion", Price: 3000 },
                { ProductId: 114, ProductName: "Sun Glasses", CategoryName: "Fashion", Price: 2500 },
                { ProductId: 115, ProductName: "Bread", CategoryName: "Food", Price: 50 },
                { ProductId: 111, ProductName: "Cheese", CategoryName: "Food", Price: 250 },
                { ProductId: 117, ProductName: "Rice", CategoryName: "Food", Price: 50 },
                { ProductId: 118, ProductName: "Wheat", CategoryName: "Food", Price: 30 },
                { ProductId: 109, ProductName: "Pulses", CategoryName: "Food", Price: 800 },
                { ProductId: 120, ProductName: "Pasta", CategoryName: "Food", Price: 50 },
                { ProductId: 102, ProductName: "Cereal", CategoryName: "Food", Price: 300 },
            ],
        };
        this.state.columnHeaders = Object.keys(this.state.Products[0]);
        this.state.No_of_data = this.state.Products.length;
        this.state.No_of_pages = this.state.Products.length;
    }

    //show details of particular product on click
    getSelectedProductFromTable = (prd) => {
        this.state.isHiddenTable = false;
        this.setState({ ProductId: prd.ProductId });
        this.setState({ ProductName: prd.ProductName });
        this.setState({ CategoryName: prd.CategoryName });
        this.setState({ Price: prd.Price });
    }

    //hide the product details 
    handleClose = () => {
        this.state.isHiddenTable = true;
        this.setState({ isHiddenTable: this.state.isHiddenTable });
    }

    //delete product
    handleDelete = (evt) => {
        let prd = this.state.Products;
        prd.splice(evt.target.value, 1);
        this.setState({ Products: prd });

    }

    //show delete button
    handleShowDelete = (evt) => {
        if (evt.target.value === "Show Delete Option") {
            this.state.isHiddenDelete = false;
            this.state.deleteButton = "Hide Delete Option";
        }
        else {
            this.state.isHiddenDelete = true;
            this.state.deleteButton = "Show Delete Option";
        }
        this.setState({ isHiddenDelete: this.state.isHiddenDelete });
    }

    //show sort options
    handleShowSort = (evt) => {
        if (evt.target.value === "Show Sort Option") {
            this.state.isHiddenSort = false;
            this.state.sortButton = "Hide Sort Option";
        }
        else {
            this.state.isHiddenSort = true;
            this.state.sortButton = "Show Sort Option";
        }
        this.setState({ isHiddenSort: this.state.isHiddenSort });
    }

    //logic for sort according to key
    sortProduct = (key) => {
        const types = {
            ProductId: 'ProductId',
            ProductName: 'ProductName',
            CategoryName: 'CategoryName',
            Price: 'Price'
        }
        const p = types[key];
        if (key === "Price" || key === "ProductId") {
            this.state.Products.sort((a, b) => a[p] - b[p])
        }
        else {
            this.state.Products.sort((a, b) => {
                let fa = a[p].toLowerCase(),
                    fb = b[p].toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
        }
        this.setState({ Products: this.state.Products });
    }

    //call sort logic on click on key
    handleSort = (evt) => {
        this.sortProduct(evt.target.value);
    }

    //show pagination
    handlePagination = (evt) => {
        if (evt.target.value === "Show Pages Option") {
            this.state.isHiddenPages = false;
            this.state.pageShow = "Hide Pages Option";
        }
        else {
            this.state.isHiddenPages = true;
            this.state.pageShow = "Show Pages Option";
        }
        this.setState({ isHiddenPages: this.state.isHiddenPages });
    }

    //take input from text box for how many rows will show
    handlePageInput = (evt) => {
        this.setState({ No_of_pages: evt.target.value })
    }

    //logic for showing table
    showTable = (s, p) => {
        let clone = this.state.Products.slice(0);
        let new_arr = clone.splice(s, p);
        console.log(new_arr);
        let arr = [];
        arr.push(
            new_arr.map((prd, idx) => (

                <tr key={idx} onClick={() => this.getSelectedProductFromTable(prd)}>
                    {
                        this.state.columnHeaders.map((head, i) => (
                            <td key={i}>
                                {prd[head]}
                            </td>
                        ))
                    }
                    <td hidden={this.state.isHiddenDelete} key="d">
                        <button value={idx} onClick={this.handleDelete.bind(this)} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )));

        return arr;


    }

    //set starting value for every page
    handleRoutePages = (evt) => {
        this.state.Start = (evt.target.id - 1) * this.state.No_of_pages;
        this.setState({ Start: this.state.Start });
    }

    //code for pagination
    paginationCode = () => {
        let arr = [];
        let p = parseInt(this.state.No_of_data / this.state.No_of_pages);
        if (this.state.No_of_data % this.state.No_of_pages !== 0)
            p += 1;
        for (let i = 1; i <= p; i++) {
            arr.push(
                <li class="page-item"><a onClick={this.handleRoutePages.bind(this)} class="page-link" href="#" key={i} id={i}>{i}</a></li>
            )
        }
        return arr;
    }

    render() {
        return (
            <div className="container-fluid">
                {/* Show buttons for operations */}
                <div>
                    <button className="btn btn-primary btn-sm" value={this.state.deleteButton} onClick={this.handleShowDelete.bind(this)}>{this.state.deleteButton}</button>
                    <br /><br />
                    <button className="btn btn-primary btn-sm" value={this.state.sortButton} onClick={this.handleShowSort.bind(this)}>{this.state.sortButton}</button>

                    {/* Show sort options */}
                    <div hidden={this.state.isHiddenSort}>
                        <br />
                        <strong>Choose Option to Sort Accoringly</strong>
                        {
                            this.state.columnHeaders.map((rec, idx) => (
                                <div key={idx}>
                                    <input type="radio" onChange={this.handleSort.bind(this)} id={idx} value={rec} name="check" />
                                    {rec}
                                </div>
                            ))
                        }
                    </div>
                    <br /><br />
                    <button className="btn btn-primary btn-sm" value={this.state.pageShow} onClick={this.handlePagination.bind(this)}>{this.state.pageShow}</button>

                    {/* Show pages */}
                    <div hidden={this.state.isHiddenPages}>
                        <br />
                        <strong>Enter No.Of rows want to show in single Page</strong> &nbsp;
                        <input type="number" onChange={this.handlePageInput.bind(this)} />
                        <ul class="pagination">
                            {this.paginationCode()}
                        </ul>
                    </div>
                </div>

                {/* Show table */}
                <div>
                    <hr />
                    <h1 style={{ color: "blue", textAlign: "center" }}>Product Details</h1>
                    <br />
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                {this.state.columnHeaders.map((head, idx) => (
                                    <th key={idx}>{head}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {/* Call a method and pass data to it */}
                            {
                                this.showTable(this.state.Start, this.state.No_of_pages)
                            }
                        </tbody>
                    </table>
                </div>
                <br />

                {/* Show details of product on click */}
                <div hidden={this.state.isHiddenTable}>
                    <hr />
                    <center>
                        <h2 style={{ color: "blue" }}>Selected Product details from table</h2>
                        <br />
                        <table className="table-bordered">
                            <tr>
                                <td><strong>Product ID</strong></td>
                                <td><input type="text" value={this.state.ProductId} /></td>
                            </tr>
                            <tr>
                                <td><strong>Product Name</strong></td>
                                <td><input type="text" value={this.state.ProductName} /></td>
                            </tr>
                            <tr>
                                <td><strong>Category Name</strong></td>
                                <td><input type="text" value={this.state.CategoryName} /></td>
                            </tr>
                            <tr>
                                <td><strong>Price</strong></td>
                                <td><input type="text" value={this.state.Price} /></td>
                            </tr>
                            <tr>
                                <td>To close this click on Close</td>
                                <td><button className="btn btn-primary btn-sm" onClick={this.handleClose.bind(this)}>Close</button></td>
                            </tr>
                        </table>
                    </center>
                    <br />
                </div>
            </div>
        );
    }
}

export default TableComponent;






// import React from 'react';
// import employ from './employ.json'
// import { TablePagination } from 'react-pagination-table';
// const columnHeader =["Id","firstName","lastName","email","gender"];




// export default class ChildComponent extends React.Component{
//    constructor(props){
//        super(props);
//        this.state={
//            tableData:employ.data,
//            switchSort:false,
//        }
//        this.generateHeader = this.generateHeader.bind(this);
//        this.generateTableData = this.generateTableData.bind(this);
//        this.compareByDesc  =  this.compareByDesc.bind(this);
//    }
//    handleSort(key){
//         this.setState({
//             switchSort:!this.state.switchSort
//         })
//        let copyTableData =[...this.state.tableData];
//        copyTableData.sort(this.compareByDesc(key));
//        this.setState({
//         tableData:copyTableData
//        })
//    }
//    compareByDesc(key){
//     if(this.state.switchSort){
//         return function(a,b){
//             if (a[key] < b[key]) return -1; 
//             if (a[key] > b[key]) return 1;  
//             return 0;
//         };
//     }else{
//         return function(a,b){
//             if (a[key] > b[key]) return -1; 
//             if (a[key] < b[key]) return 1; 
//             return 0;
//         };
//     }
//    }
// popTheElement = (res) => {
//     let temp=parseInt(res.target.id-1);
//     this.state.tableData.splice(temp,1)
//     this.setState((prevState,prevProp)=>{
//         console.log(prevState.tableData);
//         return({tableData : prevState.tableData})
//     })
   
// }
//    generateHeader(){
//     let res=[];
//      for(var i = 0; i < columnHeader.length; i++){
//          res.push(<th key={columnHeader[i]}>
//              <a href="#" id={columnHeader[i]} key={columnHeader[i]} 
//                onClick={(e)=>this.handleSort(e.target.id)}>{columnHeader[i]}</a>
//              </th>)
//      }
//      return res;
//    }
//    generateTableData() {
//        let res=[];
//        let tableData = this.state.tableData;
//        for(var i =0; i < tableData.length; i++){
//            res.push(
//             <tr key={i}>
//            <td key={tableData[i].id}>{tableData[i].id}</td>
//            <td key={tableData[i].firstName}>{tableData[i].firstName}</td>
//            <td key= {tableData[i].lastName}>{tableData[i].lastName}</td>
//            <td key={tableData[i].email}>{tableData[i].email}</td>
//            <td key={tableData[i].gender}>{tableData[i].gender}</td>
//            <td><button value='Delete' id={tableData[i].id} onClick={this.popTheElement}>Delete</button></td>
//            </tr>
//            )
//        }
//        return res;
//    }
//    render(){
//        return(
//            <>
//            <center>
//             <h1>Table Pagination Update and Delete</h1>
       
//     <div >
//         <table className="table  table-hover ">
//         <thead>
//             <tr>
//             {this.generateHeader()}
//             </tr>
//         </thead>
//         <tbody >
//             {this.generateTableData()}
//         </tbody>
//         </table>
//      </div>
//         </center>
//         </>
//        )
//    }
// }