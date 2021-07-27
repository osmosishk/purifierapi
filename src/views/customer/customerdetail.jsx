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
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import classnames from "classnames";
import "react-table/react-table.css";

import MachineCard from '../machine/machinecard';


import Swal from 'sweetalert2';
import AddMachine from './../machine/addmachine';
import AddCase from './../case/addnewcase';
import EditCase from './../case/editcase';
import DocShow from './../case/docshow';

import QRCode from "qrcode.react";
import SlideShow from 'react-image-show';

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
        product:[],
        mainpack:[],
        jobsheet:{ customer:'',casetype:'',date:'',doctype:'',filename:'',image_path:'',scandate:''},
      
        activeTab : '1',
        isFetching: false,
        loading: false,
        machineshow: false,
        caseshow : false,
        editcaseshow : false,
        docshow:false,
        docshowlink :''
       
      
     }
     this.showModal = this.showModal.bind(this);
     this.hideModal = this.hideModal.bind(this);

     this.showCaseModal = this.showCaseModal.bind(this);
     this.hideCaseModal = this.hideCaseModal.bind(this);

     this.showDocModal = this.showDocModal.bind(this);
     this.hideDocModal = this.hideDocModal.bind(this);
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

  showCaseModal = () => {
    this.setState({ caseshow : true });
       
  };

  hideCaseModal = () => {
    this.setState({ caseshow : false });
  };


  showEditCaseModal = () => {
    this.setState({ editcaseshow : true });
       
  };

  hideEditCaseModal = () => {
    this.setState({ editcaseshow : false });
  };

  showDocModal = () => {
    this.setState({ docshow : true });
       
  };

  hideDocModal = () => {
    this.setState({ docshow : false });
  };

  
    
  async getProductData()
      {
        const token =  localStorage.getItem('token')
          await axios.get(config.getAllproduct,{ headers: {"Authorization" : `token ${token}`}})
              .then((response) => {
                
              this.setState({product:response.data});
          });
         
         
      }  


     async getCustomer()
     {
        const token =  localStorage.getItem('token')
        
        this.setState({isFetching: true });
        await axios.get(config.getAllcustomer+this.state.id+'/',{ headers:  {"Authorization" : `token ${token}`}})
            .then((response) => {
              
            this.setState({customerinfo:response.data,isFetching: false});
        });
       
        
     } 

    componentWillMount() {
            
            
            this.getCustomer();
            this.getMachine();
            this.getCase();
            this.getProductData();
            this.getDoc();
            this.getMainPack();
           
        
        }
     async getMachine()
     {
        
      const token =  localStorage.getItem('token')
        await axios.get(config.getMachineonlyclient, {headers: {"Authorization" : `token ${token}`} ,params: {cid: this.state.id} })
            .then((response) => {
              
            this.setState({machine:response.data});
        });
        
        
     } 

     async getDoc()
     {
        
      const token =  localStorage.getItem('token')
        await axios.get(config.getDoc, {headers: {"Authorization" : `token ${token}`} ,params: {customer: this.state.id} })
            .then((response) => {
              
            this.setState({jobsheet:response.data});
        });
        
        
     } 

     async getCase()
     {
        
      const token =  localStorage.getItem('token')
        await axios.get(config.getCaseonlyclient, {headers: {"Authorization" : `token ${token}`} ,params: {cid: this.state.id} })
            .then((response) => {
              
            this.setState({case:response.data,loading:false});
        });
        
        
     } 

     async getMainPack()
     {
         const token =  localStorage.getItem('token')
         await axios.get(config.getAllmainpack,{ headers: {"Authorization" : `token ${token}`,'Content-Type': 'application/json'}})
             .then((response) => {
               
             this.setState({mainpack:response.data});
         });
        
        
     }      
   

     handleCustomerChange = ({currentTarget:input}) =>{
      const customerinfo ={...this.state.customerinfo};
      customerinfo[input.name] = input.value;
      this.setState({customerinfo})
      
      
    }
 
    handleCustomerUpdate = event => {
      event.preventDefault();
      this.toggle.bind(null)
      const token =  localStorage.getItem('token')
      const updatecustomer = JSON.stringify({...this.state.customerinfo})
     
     // console.log(updatecustomer)
     
      axios.put(config.updateCustomer, updatecustomer , {headers: {"Authorization" : `token ${token}`,'Content-Type': 'application/json'}})
        .then(res => {
          //this.setState({modal: !this.state.modal});
          //this.setState({...this.state.currentaddress});
          Swal.fire('Update Customer Successful')
          
        })
        .catch((error) => {console.log(error);})  
      
        window.location.reload(false);    
    }

    showcase = event => 
    {
        
       
        this.setState({ editcaseshow : true });
        this.setState({ caseid : event.currentTarget.value});
       
       
    }

    markascompleted = event => 
    {
        
        let changecase = this.state.case.filter(c=>c.case_id==event.currentTarget.value)
        let status = changecase[0].iscompleted

        if (!status)
        {
          changecase[0].iscompleted =!status
          

          const token =  localStorage.getItem('token')

         
          axios.put(config.updateCase, changecase[0],{headers: {"Authorization" : `token ${token}`}})
          .then(res => {
             Swal.fire('Mark as Completed ')
             window.location.reload(false);   
             })
          .catch((error) => {
             console.log(error);
               })  
        }
        
       
       
    }


    imageclick = event => 
    {
       
          this.setState({ docshowlink : event.currentTarget.innerHTML },() => {
          this.showDocModal();
         
       });
  
    }

    printqr = event => 
    {
      
        this.props.history.push({
            pathname : "/printqr",
            state: {customercode: event.currentTarget.value }
            
        });
       
    }

  

    


    
    render() { 
       
       // console.log(this.state.case)
        let image = this.state.jobsheet;
        let tempurl = Object.keys(image).map(m=>image[m].image_path)
        let server ='http://139.162.46.17/'
        let urlArray=[]
        for ( var i = 0; i <  tempurl.length; i++) {
         
          urlArray.push(server.concat(tempurl[i]));
        }
       
        
        let conurl ='https://maps.google.com/maps?t=&z=13&ie=UTF8&iwloc=&output=embed&'
        let googleulr = conurl.concat(this.state.customerinfo.installaddress)
      

        if(this.state.isFetching){ return <div>Loading...</div>;}
        return(
        
         
            <div>
            <Row>
              <Col xs="12" md="12" lg="4">
                <Card>
                  <CardBody>
                    <div className="text-center mt-4">
                    <CardSubtitle>{this.state.customerinfo.id}</CardSubtitle>
                    <QRCode
                          value={this.state.customerinfo.customercode.username}
                          renderAs="svg"
                          level="H"
                          size="50"
                          fgColor="#333"
                          bgColor="#fff"
                          key={this.state.customerinfo.customercode.username}
                        />
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
                        url={googleulr}
                        width="280"
                        height="150"
                        frameborder="0"
                        allowfullscreen
                       />     

                        

                        </div>

                        <div className="button-group">
                          <Button className="btn"  color="primary" onClick={this.printqr} value={this.state.customerinfo.customercode.username} >Print QR Code</Button>
                         
                         
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
                    <Button className="btn"  color="primary" onClick={this.showCaseModal} >Add New Case</Button>
                    <AddCase show={this.state.caseshow} handleClose={this.hideCaseModal} customer={this.state.customerinfo} machine={this.state.machine}/>
                    <EditCase show={this.state.editcaseshow} handleClose={this.hideEditCaseModal} customer={this.state.customerinfo} machine={this.state.machine}  caseid={this.state.caseid} casestring={this.state.case} history ={this.props.history} />
                <ReactTable
                    columns={[
                    
                   
                    {
                        Header: " Case Type",
                        accessor: "casetype",
                        width: 180
                       
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
                      Header: "Water Purifier",
                      id:'machines',
                      width: 300,
                      accessor: d=> d.machines.map(m=>m.machinetype.productcode).join("\n"),
                     
                     
                    },
                    {
                      Header: "By ",
                      accessor: "handledby.staffshort",
                      width: 50
                     
                  },
                    {
                        id: 'iscompleted',
                        Header: "Status",
                        accessor:  d => { return d.iscompleted ? 'Completed' : 'Not Yet' },
                        
                        width: 80
                       
                    },
                    {
                        Header: "Detail",
                        width: 80,
                        Cell: ({ original }) => (
                            <div className="text-center">
                               <Button 
                                onClick={this.showcase}
                                
                                color="inverse"
                                size="sm"
                                round="true"
                                //icon="true"
                                value ={original.case_id }
                                
                                ><i className="far fa-folder" /></Button>
                                  
                            </div>
                          ),
                          sortable: false,
                          filterable: false,    
                    },
                    {
                        Header: "Mark as Com",
                        width: 50,
                        Cell: ({ original }) => (
                            <div className="text-center">
                               <Button 
                                onClick={this.markascompleted}
                                color="inverse"
                                size="sm"
                                round="true"
                                //icon="true"
                                value ={original.case_id }
                                
                                ><i className=" ti-thumb-up" /></Button>
                                  
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
                        <AddMachine show={this.state.machineshow} handleClose={this.hideModal} customer={this.state.customerinfo} product={this.state.product} mainpack={this.state.mainpack}/>
                        </div>  
                         {  
                            this.state.machine.map(machine => {
                             return(
                                 <div key={machine.machineid}>
                                
                                 <Col sm="12" >
                                         <MachineCard key={machine.machineid} machine={machine} product={this.state.product} mainpack={this.state.mainpack}/>
                                 </Col>
                                 </div>

                             )})
                         }
      
                    </TabPane>
                    <TabPane tabId="3">
                    <div>
                    <DocShow show={this.state.docshow} link={this.state.docshowlink} doc={this.state.jobsheet} handleClose={this.hideDocModal}/>
                    <SlideShow
                          images={urlArray}
                          width="920px"
                          imagesWidth="800px" 
                          imagesHeight="450px"
                          imagesHeightMobile="56vw"
                          thumbnailsWidth="920px"
                          thumbnailsHeight="6vw"
                          indicators thumbnails fixedImagesHeight
                          onImageClick={this.imageclick}
                        />
                      </div>
                       
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