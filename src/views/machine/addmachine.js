import React, { Component } from 'react';
import { Card, CardText, Row, Col ,CardTitle,  Button ,
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


class AddMachine extends Component {
    constructor(props) {
        super(props);
        this.state ={
               
                fade: false ,
                customerinfo : {id :'',customercode:{username:'',email:''}},
                machinestring : {customer :{id :'',customercode:{username:'',email:''}},machineid:'',installaddress1:'',installaddress2:'',mac:'',installdate:'',nextservicedate:'',machinetype:{
                  productcode: '',
                  producttype: ''}},
                randomid :'',
                

               
                
        }
        this.handleGenID = this.handleGenID.bind(this);
      }
      async getProduct()
      {
         
         const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961' }
         await axios.get(config.getCaseonlyclient, {headers: headers} )
             .then((response) => {
               
             this.setState({case:response.data,loading:false});
         });
         
         
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
        this.setState({machinestring})

     
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
     


      
 
    render () {
     
      
    
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
                  
                      <Input type="select" name="machinetype" onChange={this.handleMachineTypeChange}  >
                          <option >Select ..</option>
                          <option value='WPU8900CX'>WPU8900CX</option>
                          <option value='WPU8900FX'>WPU8900FX</option>
                          <option value='WPU8900C'>WPU8900C</option>
                          <option value='WPU8900F'>WPU8900F</option>
                          
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