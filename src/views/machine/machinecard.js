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

class MachineCard extends Component {
  constructor(props) {
    super(props);
    this.state ={
            modal: false,
            fade: false ,
            oading : false,
            machineinfo : {machineid :'',installaddress1: '',installaddress2: '',mac: '',installdate: '',nextservicedate: '',},
            testmachine : props.machine
    }
  }
  handleMachineChange = ({currentTarget:input}) =>{
     
    
    const testmachine ={...this.state.testmachine};
    testmachine[input.name] = input.value;
    this.setState({testmachine})
    
    
  }
  
  
  
  showMachineModal()
  {
    this.setState({modal: !this.state.modal});
  }

  disableMachineModal()
  {
    this.setState({modal: !this.state.modal});
  }
  handleMachineUpdate = event => {
    event.preventDefault();
    
    const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961','Content-Type': 'application/json',}
    const updatemachine = JSON.stringify({...this.state.testmachine})
   
    axios.put(config.updateMachine, updatemachine , {headers: headers})
      .then(res => {
        //this.setState({modal: !this.state.modal});
        //this.setState({...this.state.currentaddress});
        Swal.fire('Update Machine Successful')
        
      })
      .catch((error) => {console.log(error);})  
    
    window.location.reload(false);    
  }

  deleteMachine()
  {
    console.log("Del MAchine")
  }
  render () {
    let { machineid,installaddress1,installaddress2,installdate,nextservicedate , mac ,machinetype} = this.props.machine;
   
    
    return (
          <div>
             <Modal isOpen={this.state.modal} fade={this.state.fade } toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Water Purifier </ModalHeader>
              <ModalBody>
                <Form>
                  <Input type="hidden" name="start_registers_address" id="start_registers_address"  />
                  <FormGroup>
                    <Label >Machine {machineid}</Label>
                    <Input
                      type="text"
                      name="machineid"
                      defaultValue = {machineid}
                      
                      
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label >Model : </Label>
                    <Input
                      type="text"
                      name="productcode"
                      defaultValue = {machinetype.productcode}
                      
                      
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label>Installation Address </Label>
                    <Input
                      type="textarea"
                      name="installaddress1"
                      defaultValue= {installaddress1}
                      onChange={this.handleMachineChange} 
                    
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label>Mac </Label>
                    <Input
                      type="text"
                      name="mac"
                      defaultValue= {mac}
                      onChange={this.handleMachineChange} 
                    
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label>Installation Date </Label>
                    <Input
                      type="date"
                      name="installdate"
                      defaultValue= {installdate}
                      onChange={this.handleMachineChange} 
                    
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label>Next Date </Label>
                    <Input
                      type="date"
                      name="nextservicedate"
                      value= {nextservicedate}
                      onChange={this.handleMachineChange} 
                    
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
                    <Button color="primary" onClick={() => this.disableMachineModal()} >
                      Cancel
                    </Button>
                    </div>  
                  </FormGroup>
                </Form>
              </ModalBody>
              </Modal>

              <Card body outline color="success" className="border">
                    <CardTitle>Machine ID : {machineid}</CardTitle>
                    <CardText>Model : {machinetype.productcode}</CardText>
                    <CardText>Installation Address  :{installaddress1}</CardText>
                    <CardText>                      :{installaddress2}</CardText>
                    <CardText>Next Service Date : {nextservicedate}</CardText>
                    <CardText>Installation Date : {installdate}</CardText>
                    <Col sm={12} lg={3}>
                        <div className="button-group">
                          <Button className="btn"  color="success" onClick={() => this.showMachineModal()}>Edit</Button>
                          <Button className="btn"  color="danger" onClick={() => this.deleteMachine()}>Delete</Button>
                        </div>  
                    </Col>
                </Card>
          </div>
        )
    }
   
  
}

export default MachineCard;