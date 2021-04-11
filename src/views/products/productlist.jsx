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



class Productlist extends Component {
    constructor(props)
    {
        super(props);
        
        this.state = { product:[],
                    modal: false,
                    fade: false ,
                    
                    productid:null,
                    selectedproduct:[],
        }
    }
    

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

    editproductchange = ({currentTarget:input}) =>{
      const selectedproduct ={...this.state.selectedproduct};
      selectedproduct[input.name] = input.value;
      this.setState({selectedproduct})
      console.log(this.state.selectedproduct)
    }

  
    showModel = event => 
    {
      
       
        this.setState({ modal : true });
        this.setState({ productid : event.currentTarget.value });
        const selectedproduct=this.state.product.filter(p=>p.productcode ==event.currentTarget.value)[0]
        

        this.setState({selectedproduct})
         
       
    }
    disableshow(){
        this.setState({ modal : false });
    }

    handleProductUpdate = event => {
      event.preventDefault();
      
      const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961','Content-Type': 'application/json',}
      const updateproduct = JSON.stringify({...this.state.selectedproduct})
     
  
      axios.put(config.updateProduct, updateproduct , {headers: headers})
        .then(res => {
         
          Swal.fire('Update Product Successful')
           window.location.reload(false);   
          
       })
       .catch((error) => {console.log(error);})  
      
       
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
                    <Label >Product  </Label>
                    <Input
                      type="text"
                      name="productcode"
                      defaultValue = {this.state.product.filter(p=>p.productcode ==this.state.productid).map(s=>s.productcode)}
                      onChange={this.editproductchange}
                      
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label >Type</Label>
                    <Input
                      type="text"
                      name="producttype"
                      defaultValue = {this.state.product.filter(p=>p.productcode ==this.state.productid).map(s=>s.producttype)}
                      onChange={this.editproductchange}
                      
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label >Price</Label>
                    <Input
                      type="text"
                      name="price"
                      defaultValue = {this.state.product.filter(p=>p.productcode ==this.state.productid).map(s=>s.price)}
                      onChange={this.editproductchange}
                      
                    />
                  </FormGroup>
                    
                    
                 
           
                  
                
              
                  <FormGroup>
                    <div className="button-group">
                    <Button
                      color="secondary"
                      className="ml-1"
                      onClick={this.handleProductUpdate}
                    >
                      Update 
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
                                onClick={this.showModel}
                                color="inverse"
                                size="sm"
                                round="true"
                                //icon="true"
                                value ={original.productcode }
                                
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
         </div>
         );
    }
}
 
export default Productlist;
