import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import config from '../../config.json';

import {
    Card,
    CardBody,
    CardTitle,
    Button
    

} from 'reactstrap';

class Technicianlist extends Component {
    state = { technician:[]  }



    async getTechData()
    {
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961' }
        await axios.get(config.getAlltechnician,{ headers: headers})
            .then((response) => {
              
            this.setState({technician:response.data});
        });
       
       
    }  

    componentDidMount() {
        
        this. getTechData();
      
    }


    render() { 
        return ( 
            <Card>
                
            <CardTitle className="mb-0 p-3 border-bottom bg-light">
                <i className="mdi mdi-border-right mr-2"></i>List of  Technician
            </CardTitle>
            <CardBody>
                <ReactTable
                    columns={[
                    
                    {
                        Header: "Staff Code",
                        accessor: "staffcode",
                        width: 100
                       
                    },

                    {
                        Header: "Staff Short",
                        accessor: "staffshort",
                        width: 100
                       
                    },
                    
                    {
                        Header: "Staff Name",
                        accessor: "staffname",
                        width: 200,
                       
                    },
                    {
                        Header: "Contact",
                        accessor: "staffcontact",
                        width: 100
                       
                    },
                    {
                        Header: "Email",
                        accessor: "email",
                        width: 200
                       
                    },
                   

                    {
                        Header: "Edit",
                        width: 100,
                        Cell: ({ original }) => (
                            <div className="text-center">
                               <Button 
                                
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
                    data={this.state.technician}
                    
                    filterable
                />
            </CardBody>
         </Card>
         );
    }
}
 
export default Technicianlist;
