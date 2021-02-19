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

class Mainlist extends Component {
    state = { mainlist:[] }
    async getTechData()
    {
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961' }
        await axios.get(config.getAllmainpack,{ headers: headers})
            .then((response) => {
              
            this.setState({mainlist:response.data});
        });
       
       
    }  

    componentDidMount() {
        
        this. getTechData();
      
    }


    render() { 
        return ( 
            <Card>
                
            <CardTitle className="mb-0 p-3 border-bottom bg-light">
                <i className="mdi mdi-border-right mr-2"></i>List of Main Pack
            </CardTitle>
            <CardBody>
                <ReactTable
                    columns={[
                    
                    {
                        Header: "Package Code",
                        accessor: "packagecode",
                        width: 100
                       
                    },

                    {
                        Header: "Detail",
                        accessor: "packagedetail",
                        width: 400
                       
                    },
                    
                    {
                        Header: "Time",
                        accessor: "isbytime",
                        width: 100,
                       
                    },
                    {
                        Header: "Usage",
                        accessor: "isbyusage",
                        width: 100
                       
                    },
                    {
                        Header: "Price",
                        accessor: "price",
                        width: 100
                       
                    },
                    {
                        Header: "Ex.Time",
                        accessor: "exfiltermonth",
                        width: 100
                       
                    },
                    {
                        Header: "Ex.Vol",
                        accessor: "exfiltervolume",
                        width: 100
                       
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
                    data={this.state.mainlist}
                    
                    filterable
                />
            </CardBody>
         </Card>
         );
    }
}
 
export default Mainlist;