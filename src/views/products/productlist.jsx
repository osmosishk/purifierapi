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

class Productlist extends Component {

    state = { product:[]  }


    async getProductData()
    {
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961' }
        await axios.get(config.getAllproduct,{ headers: headers})
            .then((response) => {
              
            this.setState({product:response.data});
        });
       
       
    }  

    componentDidMount() {
        
        this.getProductData();
      
    }


    render() { 
        return ( 
            <Card>
                
            <CardTitle className="mb-0 p-3 border-bottom bg-light">
                <i className="mdi mdi-border-right mr-2"></i>List of Product
            </CardTitle>
            <CardBody>
                <ReactTable
                    columns={[
                    
                    {
                        Header: "Product Code",
                        accessor: "productcode",
                        width: 200
                       
                    },

                    {
                        Header: "Type ",
                        accessor: "producttype",
                        width: 150
                       
                    },
                  
                    {
                        Header: "Price",
                        accessor: "price",
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
                    data={this.state.product}
                    
                    filterable
                />
            </CardBody>
         </Card>
         );
    }
}
 
export default Productlist;
