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
    

class Mainlist extends Component {
    constructor(props)
    {
        super(props);
        
        this.state = { mainlist:[],
                    modal: false,
                    fade: false ,
                    
                    mainid:null,
        }
    }
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

    showModel = event => 
    {
      
       
        this.setState({ modal : true });
        this.setState({ mainid : event.currentTarget.value});
     
          
       
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
                    <Label> Mainetain </Label>
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



            </div>
           
         );
    }
}
 
export default Mainlist;