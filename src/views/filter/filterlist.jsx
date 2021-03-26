import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import config from '../../config.json';

import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Label,
   Input,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody} from 'reactstrap';
    


class Filterlist extends Component {
    constructor(props)
    {
        super(props);
        
        this.state = { filter:[],
                    modal: false,
                    fade: false ,
                    
                    filterid:null,
        }
    }



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

    showModel = event => 
    {
      
       
        this.setState({ modal : true });
        this.setState({ filterid : event.currentTarget.value});
     
          
       
    }
    disableshow(){
        this.setState({ modal : false });
    }


    render() { 
        return ( 
            <div>
                <Modal isOpen={this.state.modal} fade={this.state.fade } >
              <ModalHeader toggle={this.toggle}>Product </ModalHeader>
              <ModalBody>
                <Form>
                  <Input type="hidden" name="start_registers_address" id="start_registers_address"  />
                  <FormGroup>
                    <Label> Filter </Label>
                    <Input
                      type="text"
                      name="machineid"
                     // defaultValue = {machineid}
                      
                      
                    />
                  </FormGroup>
                    
                 
           
                  
                
              
                  <FormGroup>
                    <div className="button-group">
                    <Button
                      color="secondary"
                      className="ml-1"
                      onClick={this.handleMachineUpdate}
                    >
                      Save 
                    </Button>
                    <Button color="primary" onClick={() => this.disableshow()} >
                      Cancel
                    </Button>
                    </div>  
                  </FormGroup>
                </Form>
              </ModalBody>
              </Modal>

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


            </div>
            
         );
    }
}
 
export default Filterlist;
