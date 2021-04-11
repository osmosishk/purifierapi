import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import config from '../../config.json';
import Swal from 'sweetalert2';
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

                    
                    selectedfilter:[],
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

    editfilterchange = ({currentTarget:input}) =>{
      const selectedfilter ={...this.state.selectedfilter};
      selectedfilter[input.name] = input.value;
      this.setState({selectedfilter})
     
    }

    showModel = event => 
    {
      
       
        this.setState({ modal : true });
        this.setState({ filterid : event.currentTarget.value});

        const selectedfilter=this.state.filter.filter(f=>f.filtercode ==event.currentTarget.value)[0]
        

        this.setState({selectedfilter})
         
     
          
       
    }
    disableshow(){
        this.setState({ modal : false });
    }

    handleFilterUpdate = event => {
      event.preventDefault();
      
      const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961','Content-Type': 'application/json',}
      const updatefilter = JSON.stringify({...this.state.selectedfilter})
    
  
      axios.put(config.updateFilter, updatefilter , {headers: headers})
        .then(res => {
         
          Swal.fire('Update Filter Successful')
           window.location.reload(false);   
          
       })
       .catch((error) => {console.log(error);})  
      
       
    }


    render() { 
        return ( 
            <div>
                <Modal isOpen={this.state.modal} fade={this.state.fade } >
              <ModalHeader toggle={this.toggle}>Filter </ModalHeader>
              <ModalBody>
                <Form>
                  <Input type="hidden" name="start_registers_address" id="start_registers_address"  />
                  <FormGroup>
                    <Label> Filter Code </Label>
                    <Input
                      type="text"
                      name="filtercode"
                      defaultValue = {this.state.filter.filter(f=>f.filtercode ==this.state.filterid).map(s=>s.filtercode)}
                      onChange={this.editfilterchange}
                      
                      
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label> Filter Name </Label>
                    <Input
                      type="text"
                      name="filtername"
                      defaultValue = {this.state.filter.filter(f=>f.filtercode ==this.state.filterid).map(s=>s.filtername)}
                      onChange={this.editfilterchange}
                      
                      
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label> Filter Detail </Label>
                    <Input
                      type="textarea"
                      name="filterdetail"
                      defaultValue = {this.state.filter.filter(f=>f.filtercode ==this.state.filterid).map(s=>s.filterdetail)}
                      onChange={this.editfilterchange}
                      
                      
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label> Filter Price </Label>
                    <Input
                      type="text"
                      name="price"
                      defaultValue = {this.state.filter.filter(f=>f.filtercode ==this.state.filterid).map(s=>s.price)}
                      onChange={this.editfilterchange}
                      
                      
                    />
                  </FormGroup>
                    
                 
           
                  
                
              
                  <FormGroup>
                    <div className="button-group">
                    <Button
                      color="secondary"
                      className="ml-1"
                      onClick={this.handleFilterUpdate}
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
                        accessor: "price",
                        width: 100
                       
                    },
                   

                    {
                        Header: "Edit",
                        width: 100,
                        Cell: ({ original }) => (
                            <div className="text-center">
                               <Button 
                                onClick={this.showModel}
                                color="inverse"
                                size="sm"
                                round="true"
                                //icon="true"
                                value ={original.filtercode }
                                
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
