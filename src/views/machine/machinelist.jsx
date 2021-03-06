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

class Machinelist extends Component {
    state = { 
        machine:[]
     }
   
    async getMachineData()
    {
        const token =  localStorage.getItem('token')
       await axios.get(config.getAllmachine,{ headers:  {"Authorization" : `token ${token}`,'Content-Type': 'application/json'}})
            .then((response) => {
              
            this.setState({machine:response.data});
        });
       
       
    }  

    editmachine()
    {
        console.log(" Machine Edit ")
    }
    componentDidMount() {
       
        this. getMachineData()
      
    }
   
    render() { 
        return ( 
            <Card>
                
            <CardTitle className="mb-0 p-3 border-bottom bg-light">
                <i className="mdi mdi-border-right mr-2"></i>List of Machine
            </CardTitle>
            <CardBody>
                <ReactTable
                    columns={[
                    
                    {
                        Header: "Customer Code",
                        accessor: "customer.customercode.username",
                        width: 100
                       
                    },

                    {
                        Header: "Machine ID",
                        accessor: "machineid",
                        width: 100
                       
                    },
                    {
                        Header: "Machine Type",
                        accessor: "machinetype.productcode",
                        width: 120
                       
                    },
                    
                    {
                        Header: "Address",
                        accessor: "installaddress1",
                       
                    },
                    {
                        Header: "Install Date.",
                        accessor: "installdate",
                        width: 100
                       
                    },
                    {
                        Header: "Next Service Date",
                        accessor: "nextservicedate",
                        width: 100
                       
                    },

                    

                    {
                        Header: "Edit",
                        width: 100,
                        Cell: ({ original }) => (
                            <div className="text-center">
                               <Button 
                                onClick={this.editmachine}
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
                    data={this.state.machine}
                    loading = {this.state.loading}
                    filterable
                />
            </CardBody>
         </Card>

         );
    }
}
 
export default Machinelist;