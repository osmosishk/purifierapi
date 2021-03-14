import React, { Component } from 'react';
import {
    Collapse,
    Button,
    Card,
    CardBody,
    CardTitle,
    UncontrolledCollapse,
    Fade,
    Row,
    Col
} from 'reactstrap';

import { CardText, 
    Label,
    Input,
    Form,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody} from 'reactstrap';
  
import Swal from 'sweetalert2';
import axios from "axios";
import config from '../../config.json';

export default class Step4 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			savedToCloud: props.getStore().savedToCloud ,
            addstring : props.getStore(),
			collapse : false,
			customerinfo : {customercode:{username:'',email:''}, contactname: '',billingaddress: '',installaddress: '',contactno: '',mobile: '',},

			machinestring : {customer :{id :'',customercode:{username:'',email:''}},machineid:'',installaddress1:'',installaddress2:'',mac:'',installdate:'',nextservicedate:'',machinetype:{
				productcode: '',
				producttype: ''}}, 
         
        errorMessage: '',
        randomid :'',
      
        product:[],
		};
		
	}
	updateState(){

		const customerinfo ={...this.state.customerinfo};
		let statusCopy = Object.assign({}, this.state.customerinfo);
		const treat={...this.state.addstring};
		statusCopy.customercode["username"]=treat["customercode"];
		statusCopy.customercode["email"]=treat["email"];
		
		customerinfo["contactname"] = treat["contactname"];
		customerinfo["billingaddress"] = treat["billingaddress"];
		customerinfo["installaddress"] = treat["contactname"];
		customerinfo["contactno"] = treat["contactno"];
		customerinfo["mobile"] = treat["mobile"];
    customerinfo["email"] = treat["email"];
    customerinfo["invitationcode"] = treat["invitationcode"];
    customerinfo["joindate"] = treat["joindate"];
    customerinfo["source"] = treat["source"];
    customerinfo["comment"] = treat["comment"];
	   
    this.setState({statusCopy});
    this.setState({customerinfo});
	
	}

  async getProductData()
      {
          const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961' }
          await axios.get(config.getAllproduct,{ headers: headers})
              .then((response) => {
                
              this.setState({product:response.data});
          });
         
         
      }  

	

	handleNewCustomer() {
     
        const addcustomer = JSON.stringify({...this.state.customerinfo})
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961','Content-Type': 'application/json',}
		    console.log(addcustomer);
        
        axios.post(config.getAllcustomer, addcustomer,{headers: headers})
          .then(res => {
             console.log(res);
            console.log(res.data);
            Swal.fire('New Customer added Successful')
            })
          .catch((error) => {
            console.log(error);
            this.setState({errorMessage:error.message})
            this.setState({savedToCloud:!this.state.savedToCloud})
        })  
              
              
     };
	componentDidMount()
	 {
	   
		
		this.handleNewCustomer();
	  
	  
	 } 

	 componentWillMount()
	 {
	   
		this.getProductData()
		this.updateState();
		
	  
	  
	 } 

	 handleMachineChange = ({currentTarget:input}) =>{
        const machinestring ={...this.state.machinestring};
        machinestring[input.name] = input.value;
        machinestring.customer.id= this.props.customer.id;
        machinestring.customer.customercode.username= this.props.customer.customercode.username;
        machinestring.customer.customercode.email= this.props.customer.customercode.email;
        this.setState({machinestring})
        
       
      }

      handleMachineTypeChange = ({currentTarget:input}) =>{
        let statusCopy = Object.assign({}, this.state.machinestring);
        statusCopy.machinetype["productcode"]=input.value
        statusCopy.machinetype["producttype"]="WPU"
        this.setState(statusCopy);
        
              
       
      }
      
      handleGenID() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
        var string_length = 8;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        const machinestring ={...this.state.machinestring};
        machinestring["machineid"] = randomstring;
        machinestring["mac"] = randomstring;
        this.setState({machinestring})
        this.setState({randomid:randomstring});
        
      }

      handleMachineadd = event => {
        event.preventDefault();
        console.log(this.state.machinestring);
        const addmachine = JSON.stringify({...this.state.machinestring})
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961','Content-Type': 'application/json',}

        console.log(addmachine);
        axios.post(config.getAllmachine, addmachine,{headers: headers})
         .then(res => {
            console.log(res);
            console.log(res.data);
            Swal.fire('Add Water purifier Successful')
            })
         .catch((error) => {
            console.log(error);
              })  
              
          window.location.reload(false);          
     };
     
    
	showMachineAdd()
	{
	  this.setState({collapse: !this.state.collapse});
	}

	render() {
    
		return (
			<div className="step step4 mt-5">
				<div className="row justify-content-md-center">
					<div className="col-lg-8">
						<form id="Form" className="form-horizontal">
							<div className="form-group">
								<label className="col-md-12 control-label">
									{
										(this.state.savedToCloud)
											?
											<div>
												<h1>Something was wrong !</h1>
											  <h3>{ this.state.errorMessage } </h3>
											</div>
											:
											<div>
												<h1>New Customer Registration Completed</h1>
												<h2>Data was successfully saved to cloud...</h2>
												<span className="btn btn-info text-white" onClick={() => { this.props.jumpToStep(4) }}>No Thanks!</span>
												<span className="btn btn-info text-white" onClick={() => { this.showMachineAdd() }}>Add Watter purifier</span>
												
                                                
											</div>

									}
									
									<Card>
                                          
                     <CardBody className="">
         
                        <Collapse isOpen={this.state.collapse}>
                        <Card className="border">
                      <CardBody>
												<Form>
                  <Input type="hidden" name="start_registers_address" id="start_registers_address"  />
                  <FormGroup>
                  <Label >Machine ID : </Label>
                  <Button className="btn" color="primary" size="sm"onClick={this.handleGenID.bind(this)}>Generate ID</Button>
                    <Input
                      type="text"
                      name="machineid"
                      onChange={this.handleMachineChange} 
                      defaultValue={this.state.randomid}
                    
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label >Model : </Label>
                  
                      <Input type="select" name="machinetype" onChange={this.handleMachineTypeChange} >
                          <option >Select ..</option>
                          {  
                                this.state.product.map(product => {
                                return(
                                  <option value={product.productcode}>{product.productcode}</option>
                                )})
                          }
                          
                      </Input>
                      </FormGroup>                 
                  <FormGroup>
                  <Label>Installation Address </Label>
                    <Input
                      type="textarea"
                      name="installaddress1"
                      onChange={this.handleMachineChange} 
                      defaultValue= {this.state.customerinfo.installaddress}    
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label>Mac </Label>
                    <Input
                      type="text"
                      name="mac"
                      onChange={this.handleMachineChange} 
                      defaultValue={this.state.randomid}
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label>Installation Date </Label>
                    <Input
                      type="date"
                      name="installdate"
                      onChange={this.handleMachineChange} 
                      defaultValue= {this.state.customerinfo.joindate}   
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label>Next Date </Label>
                    <Input
                      type="date"
                      name="nextservicedate"
                      onChange={this.handleMachineChange} 
                          
                    />
                  </FormGroup>
                  
                
              
                  <FormGroup>
                    <div className="button-group">
                    <Button className="btn"  color="success"onClick={this.handleMachineadd} >Add</Button>
                    <Button className="btn"  color="danger" onClick={this.showMachineAdd}>Cancel</Button>
                    </div>  
                  </FormGroup>
                </Form>
                                                    </CardBody>
                                                </Card>
                                     
                        </Collapse>
                     </CardBody>
                  </Card>
                                      
                                          

                                   
								</label>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}
