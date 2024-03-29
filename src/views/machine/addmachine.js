import React, { Component } from 'react';
import {   Button ,
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
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


class AddMachine extends Component {
    constructor(props) {
        super(props);
        this.state ={
               
                fade: false ,
                customerinfo : {id :'',customercode:{username:'',email:''}},
                machinestring : {customer :{id :'',customercode:{username:'',email:''}},machineid:'',installaddress1:'',installaddress2:'',mac:'',installdate:'',nextservicedate:'',machinetype:{
                  productcode: '',
                  producttype: ''},maintenance:{packagecode:''}},
                randomid :'',
                product: props.product,
                mainpack: props.mainpack,
    
        }
        this.handleGenID = this.handleGenID.bind(this);
      }
 


      componentWillMount()
      {
        var curr = new Date();
        curr = curr.toISOString().substr(0,10)
        var nextdate = new Date();
        nextdate.setDate(nextdate.getDate() + 183);
        nextdate = nextdate.toISOString().substr(0,10);
        const machinestring ={...this.state.machinestring};
        machinestring["installdate"] = curr;
        machinestring["nextservicedate"] = nextdate;
        this.setState({machinestring});
        

     
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

      handleMainTypeChange = ({currentTarget:input}) =>{
        let statusCopy = Object.assign({}, this.state.machinestring);
        console.log(statusCopy)
        statusCopy.maintenance["packagecode"]=input.value
     
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
        //console.log(this.state.machinestring);
        const addmachine = JSON.stringify({...this.state.machinestring})
        const token =  localStorage.getItem('token')
        //console.log(addmachine);
        axios.post(config.getAllmachine, addmachine,{headers: {"Authorization" : `token ${token}`,'Content-Type': 'application/json'}})
         .then(res => {
            console.log(res);
            console.log(res.data);
            Swal.fire('Add Water purifier Successful')
            })
         .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '${error}'
            })
          })
              
         // window.location.reload(false);          
     };
     

     


      
 
    render () {
     
      
       //console.log(this.state.mainpack)
        return (
              <div>
                 <Modal isOpen={this.props.show} fade={this.state.fade } >
                  <ModalHeader>Water Purifier add for {this.props.customer.customercode.username} </ModalHeader>
                  <ModalBody>
                <Form>
                  <Input type="hidden" name="start_registers_address" id="start_registers_address"  />
                  <FormGroup>
                  <Label >Machine ID : </Label>
                  <Button className="btn" color="primary" size="sm"onClick={this.handleGenID.bind(this)}>Generate ID</Button>
                    <Input
                      type="text"
                      name="machineid"
                      onChange={this.handleMachineChange} 
                      value={this.state.randomid}
                    
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
                      defaultValue={this.state.machinestring.installdate}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label >Main Package: </Label>
                  
                      <Input type="select" name="mainpack" onChange={this.handleMainTypeChange} >
                      <option >Select ..</option>
                      {  
                            this.state.mainpack.map(m => {
                             return(
                              <option key ={m.packagecode} value={m.packagecode}>{m.packagecode}</option>
                            )})
                      }
                          
                      </Input>
                  </FormGroup>               

                  <FormGroup>
                  <Label>Next Date </Label>
                    <Input
                      type="date"
                      name="nextservicedate"
                      onChange={this.handleMachineChange} 
                      defaultValue={this.state.machinestring.nextservicedate}
                    />
                  </FormGroup>
                  
                
              
                  <FormGroup>
                    <div className="button-group">
                    <Button className="btn"  color="success"onClick={this.handleMachineadd} >Add</Button>
                    <Button className="btn"  color="danger" onClick={this.props.handleClose}>Cancel</Button>
                    </div>  
                  </FormGroup>
                </Form>
              </ModalBody>
                  
              </Modal>
    
                  
              </div>
            )
        }
}
 
export default AddMachine;