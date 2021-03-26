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

class Caselist extends Component {
    state = { 
        case : [],
        redirect: null
     }

    
    async getCaseData()

    {
        console.log(" Cases Listing ")   
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961' }
        await axios.get(config.getAllCase,{ headers: headers})
            .then((response) => {
              
            this.setState({case:response.data});
        });
       
       
    }  
    componentDidMount() {
        
        this.getCaseData();
      
    }
    
    
    
 
    
        render() { 
        return ( 
            <Card>
                
            <CardTitle className="mb-0 p-3 border-bottom bg-light">
                <i className="mdi mdi-border-right mr-2"></i>List of Cases
            </CardTitle>
            <CardBody>
                <ReactTable
                    columns={[
                    
                    {
                        Header: "Case ID",
                        accessor: "case_id",
                        width: 100
                       
                    },
                    {
                        Header: "Customer Code",
                        accessor: "machine.customer.customercode.username",
                        width: 100
                       
                    },
                    {
                        Header: "Type",
                        accessor: "casetype",
                        width: 100
                       
                    },
                    {
                        Header: "Date",
                        accessor: "scheduledate",
                        width: 100
                       
                    },
                    {
                        Header: "Time",
                        accessor: "time",
                        width: 100
                       
                    },

                    

                    
                   
                  
                  
                    ]}
                    defaultPageSize={15}
                    showPaginationBottom={true}
                    className="-striped -highlight"
                    data={this.state.case}
                    loading = {this.state.loading}
                    filterable
                />
            </CardBody>
         </Card>
        
            );
    }
}
 
export default Caselist;