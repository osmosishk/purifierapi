import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import config from '../../config.json';
import { Link , Redirect } from 'react-router-dom';

import {
    Card,
    CardBody,
    CardTitle,
    Button
    

} from 'reactstrap';

class Customerlist extends Component {
    state = { 
        customers : [],
        redirect: null
     }

    
    async getSlavesData()
    {
        const token =  localStorage.getItem('token')
       
        await axios.get(config.getAllcustomer,{ headers:  {"Authorization" : `token ${token}`}})
            .then((response) => {
              
            this.setState({customers:response.data});
        });
       
       
    }  
    componentDidMount() {
        localStorage.setItem('token', config.token)
        this.getSlavesData();
      
    }
    
    addcustomer= event => 
    {
      
        this.props.history.push({
            pathname : "/addnewcustomer",
            //state: { id: event.currentTarget.value }
            
        });
       
    }

    editcustomer= event => 
    {
      
        this.props.history.push({
            pathname : "/customerdetail",
            state: { id: event.currentTarget.value }
            
        });
       
    }
    
 
    
        render() { 
        return ( 
            <Card>
                
            <CardTitle className="mb-0 p-3 border-bottom bg-light">
                <i className="mdi mdi-border-right mr-2"></i>List of Customer
            </CardTitle>
                <div className="button-group">
                    <Button className="btn" color="warning" size="sm" onClick={this.addcustomer} >Add New Customer</Button>
                </div>
            <CardBody>
                <ReactTable
                    columns={[
                    
                    {
                        Header: "Code",
                        accessor: "customercode.username",
                        width: 100
                       
                    },

                    {
                        Header: "Name",
                        accessor: "contactname",
                        width: 150
                       
                    },
                    
                    {
                        Header: "Address",
                        accessor: "installaddress",
                       
                    },
                    {
                        Header: "Contact No.",
                        accessor: "contactno",
                        width: 100
                       
                    },
                    {
                        Header: "mobile.",
                        accessor: "mobile",
                        width: 100
                       
                    },

                    {
                        Header: "Edit",
                        width: 100,
                        Cell: ({ original }) => (
                            <div className="text-center">
                               <Button 
                                onClick={this.editcustomer}
                                color="inverse"
                                size="sm"
                                round="true"
                                //icon="true"
                                value ={original.id }
                                
                                ><i className="fa fa-edit" /></Button>
                                  
                            </div>
                          ),
                          sortable: false,
                          filterable: false,    
                    },
                   
                  
                  
                    ]}
                    defaultPageSize={15}
                    showPaginationBottom={true}
                    className="-striped -highlight"
                    data={this.state.customers}
                    loading = {this.state.loading}
                    filterable
                />
            </CardBody>
         </Card>
        
            );
    }
}
 
export default Customerlist;