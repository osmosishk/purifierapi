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
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961' }
        await axios.get(config.getAllcustomer,{ headers: headers})
            .then((response) => {
              
            this.setState({customers:response.data});
        });
       
       
    }  
    componentDidMount() {
        localStorage.setItem('token','c3c1d72b219561cfe00084d3434f37c3714f5961')
        this.getSlavesData();
      
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
                <li><Link to ="customerdetail"> Todos</Link></li>
            <CardTitle className="mb-0 p-3 border-bottom bg-light">
                <i className="mdi mdi-border-right mr-2"></i>List of Customer
            </CardTitle>
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