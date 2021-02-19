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


class Filterlist extends Component {
    state = { filter:[]  }



    async getFilterData()
    {
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961' }
        await axios.get(config.getAllfilter,{ headers: headers})
            .then((response) => {
              
            this.setState({filter:response.data});
        });
       
       
    }  

    componentDidMount() {
        
        this.getFilterData();
      
    }


    render() { 
        return ( 
            <Card>
                
            <CardTitle className="mb-0 p-3 border-bottom bg-light">
                <i className="mdi mdi-border-right mr-2"></i>List of Filter
            </CardTitle>
            <CardBody>
                <ReactTable
                    columns={[
                    
                    {
                        Header: "Filter Code",
                        accessor: "filtercode",
                        width: 100
                       
                    },

                    {
                        Header: "FilterName",
                        accessor: "filtername",
                        width: 150
                       
                    },
                    
                    {
                        Header: "Filter Detail",
                        accessor: "filterdetail",
                       
                    },
                    {
                        Header: "Price",
                        accessor: "Price",
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
                    data={this.state.filter}
                    
                    filterable
                />
            </CardBody>
         </Card>
         );
    }
}
 
export default Filterlist;
