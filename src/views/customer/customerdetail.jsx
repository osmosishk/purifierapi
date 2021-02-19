import React, { Component } from 'react';
import axios from "axios";
import config from '../../config.json';
import ReactTable from "react-table";
import Iframe from "react-iframe";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Progress,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import classnames from "classnames";
import "react-table/react-table.css";

import img1 from "../../assets/images/users/7.jpg";
import MachineCard from '../machine/machinecard';

import Swal from 'sweetalert2';
import AddMachine from './../machine/addmachine';


class Customerdetail extends Component {
   
   constructor(props)
   {
       super(props);
       this.toggle = this.toggle.bind(this);
       this.state = { 
        id : this.props.location.state.id,
        customerinfo : {id :'',customercode:{username:'',email:''}, contactname: '',billingaddress: '',installaddress: '',contactno: '',mobile: '',},
        machine :[],
        case :[],
        
        activeTab : '1',
        isFetching: false,
        loading: false,
        machineshow: false
        
     }
     this.showModal = this.showModal.bind(this);
     this.hideModal = this.hideModal.bind(this);
   }
   
   toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
   
  showModal = () => {
    this.setState({ machineshow: true });
       
  };

  hideModal = () => {
    this.setState({ machineshow: false });
  };
   


     async getCustomer()
     {
        
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961' }
        this.setState({isFetching: true });
        await axios.get(config.getAllcustomer+this.state.id+'/',{ headers: headers})
            .then((response) => {
              
            this.setState({customerinfo:response.data,isFetching: false});
        });
       
        
     } 

    componentWillMount() {
            
            this.getCustomer();
            this.getMachine();
            this.getCase();
           
        
        }
     async getMachine()
     {
        
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961' }
        await axios.get(config.getMachineonlyclient, {headers: headers ,params: {cid: this.state.id} })
            .then((response) => {
              
            this.setState({machine:response.data});
        });
        
        
     } 

     async getCase()
     {
        
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961' }
        await axios.get(config.getCaseonlyclient, {headers: headers ,params: {cid: this.state.id} })
            .then((response) => {
              
            this.setState({case:response.data,loading:false});
        });
        
        
     } 

   

     handleCustomerChange = ({currentTarget:input}) =>{
      const customerinfo ={...this.state.customerinfo};
      customerinfo[input.name] = input.value;
      this.setState({customerinfo})
      
      
    }
    addMachineClick= () => {
        console.log("ADd Machine");
        
      
    }
    
    handleCustomerUpdate = event => {
      event.preventDefault();
      this.toggle.bind(null)
      const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961','Content-Type': 'application/json',}
      const updatecustomer = JSON.stringify({...this.state.customerinfo})
     
     // console.log(updatecustomer)
     
      axios.put(config.updateCustomer, updatecustomer , {headers: headers})
        .then(res => {
          //this.setState({modal: !this.state.modal});
          //this.setState({...this.state.currentaddress});
          Swal.fire('Update Customer Successful')
          
        })
        .catch((error) => {console.log(error);})  
      
        window.location.reload(false);    
    }

    
    render() { 
       
        //console.log(this.state.customerinfo)
       
        //console.log(this.state.case)
       


        if(this.state.isFetching){ return <div>Loading...</div>;}
        return(
        
         
            <div>
            <Row>
              <Col xs="12" md="12" lg="4">
                <Card>
                  <CardBody>
                    <div className="text-center mt-4">
                    <CardSubtitle>{this.state.customerinfo.id}</CardSubtitle>
                    <CardTitle className="mt-2">Customer Code: {this.state.customerinfo.customercode.username}</CardTitle>
                      
                      <CardTitle className="mt-2">Contact : {this.state.customerinfo.contactname}</CardTitle>
                      
                      <Row className="text-center justify-content-md-center">
                       
                      </Row>
                    </div>
                  </CardBody>
                  <CardBody className="border-top">
                    <div>
                      <small className="text-muted">Email address </small>
                      <h6>{this.state.customerinfo.customercode.email}</h6>
                      <small className="text-muted pt-4 db">Phone</small>
                      <h6>{this.state.customerinfo.contactno}</h6>
                      <small className="text-muted pt-4 db">Mobile</small>
                      <h6>{this.state.customerinfo.mobile}</h6>
                      <small className="text-muted pt-4 db">Installation Address</small>
                      <h6>{this.state.customerinfo.installaddress}</h6>
                      <small className="text-muted pt-4 db">Billing Address</small>
                      <h6>{this.state.customerinfo.billingaddress}</h6>
                      <div>
                          <Iframe
                        className="position-relative"
                        url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470029.1604841957!2d72.29955005258641!3d23.019996818380896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C+Gujarat!5e0!3m2!1sen!2sin!4v1493204785508"
                        width="280"
                        height="150"
                        frameborder="0"
                        allowfullscreen
                       />
                        </div>
                     
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" md="12" lg="8">
                <Card>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === "1" })}
                        onClick={() =>{this.toggle('1');}}
                       >
                        Cases
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === "2" })}
                        onClick={() =>{this.toggle('2');}}
                      >
                        Water Purifier List
                      
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === "3" })}
                        onClick={() =>{this.toggle('3');}}
                      >
                        Document
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === "4" })}
                        onClick={() =>{this.toggle('4');}}
                      >
                        Profile Update
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                    <CardBody>
                <ReactTable
                    columns={[
                    
                    {
                        Header: "ID",
                        accessor: "case_id",
                        width: 50
                       
                    },
                    {
                        Header: " Case Type",
                        accessor: "casetype",
                        width: 200
                       
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
                    {
                        Header: "Status",
                        accessor: "iscompleted",
                        width: 50
                       
                    },
                    {
                        Header: "Detail",
                        width: 100,
                        Cell: ({ original }) => (
                            <div className="text-center">
                               <Button 
                                //onClick={}
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
                    {
                        Header: "Mark as Com",
                        width: 100,
                        Cell: ({ original }) => (
                            <div className="text-center">
                               <Button 
                                //onClick={}
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
                    data={this.state.case}
                    loading = {this.state.loading}
                    filterable
                />
              </CardBody>
                    </TabPane>
                    <TabPane tabId="2">
                        <div className="button-group">
                        
                        <Button className="btn"  color="danger" onClick={this.showModal} >Add Water purifier</Button>
                        <AddMachine show={this.state.machineshow} handleClose={this.hideModal} customer={this.state.customerinfo}/>
                        </div>  
                         {  
                            this.state.machine.map(machine => {
                             return(
                                 <div>
                                
                                 <Col sm="12">
                                         <MachineCard key={machine.id} machine={machine} />
                                 </Col>
                                 </div>

                             )})
                         }
      
                    </TabPane>
                    <TabPane tabId="3">
                         <h5>Page3</h5>
                    </TabPane>
                    <TabPane tabId="4">
                    <Row>
                  <Col sm="12">
                    <Card>
                      <CardBody>
                        <Form>
                          <FormGroup>
                            <Label>Contact Name :</Label>
                            <Input 
                              type="text" 
                              name="contactname" 
                              defaultValue={this.state.customerinfo.contactname}
                              onChange={this.handleCustomerChange} /> 
                          </FormGroup>
                          <FormGroup>
                            <Label>Email</Label>
                            <Input
                              type="email"
                              name="email"
                              defaultValue={this.state.customerinfo.email}
                              onChange={this.handleCustomerChange} /> 
                          </FormGroup>
                          <FormGroup>
                            <Label>Mobile</Label>
                            <Input 
                              type="text" 
                              name="mobile"
                              defaultValue={this.state.customerinfo.mobile}
                              onChange={this.handleCustomerChange} /> 
                          </FormGroup>
                          <FormGroup>
                            <Label>Phone No</Label>
                            <Input 
                              type="text" 
                              name="contactno"
                              defaultValue={this.state.customerinfo.contactno}
                              onChange={this.handleCustomerChange} /> 
                          
                          </FormGroup>
                          <FormGroup>
                            <Label>Installation Address</Label>
                            <Input 
                            type="textarea"
                            name="installaddress"
                            defaultValue={this.state.customerinfo.installaddress}
                            onChange={this.handleCustomerChange} /> 
                          </FormGroup>
                          <FormGroup>
                            <Label>Billgin Address Address</Label>
                            <Input 
                            type="textarea"
                            name="billingaddress"
                            defaultValue={this.state.customerinfo.billingaddress} 
                            onChange={this.handleCustomerChange} /> 
                          </FormGroup>
                          <div className="button-group">
                            <Button color="success"  type="submit" onClick={this.handleCustomerUpdate}>  Update Profile</Button>
                            <Button color="secondary" type="reset" >Reset</Button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                    </TabPane>
                  </TabContent>
                </Card>
              </Col>
            </Row>
          </div>
       
        );
    }
}
 
export default Customerdetail;