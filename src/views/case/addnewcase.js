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
import MultiSelect from "react-multi-select-component";


class AddCase extends Component {
    constructor(props) {
        super(props);
        this.state ={
               
                fade: false ,
                customerinfo : {id :'',customercode:{username:'',email:''}},
                machinestring : {customer :{id :'',customercode:{username:'',email:''}},machineid:'',installaddress1:'',installaddress2:'',mac:'',installdate:'',nextservicedate:'',machinetype:{
                  productcode: '',
                  producttype: ''}},
                randomid :'',
                
                selectedOption: [],

                filter:[],
                filterselectedOption: [],
                handledby :[],
                handledbyselectedOption: [],
                casetype:[],
                casetypeselectedOption: [],
                
    
        }
       
      }
 
      async getTechData()
      {
          const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961' }
          await axios.get(config.getAlltechnician,{ headers: headers})
              .then((response) => {
                
              this.setState({handledby:response.data});
          });
         
         
      }  

      async getFilterData()
    {
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961' }
        await axios.get(config.getAllfilter,{ headers: headers})
            .then((response) => {
              
            this.setState({filter:response.data});
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
        this.setState({machinestring});
        

       
     
      } 

      componentDidMount() {
        
        this.getFilterData();
        this.getTechData();
      
    }
      
      handleCaseChange = ({currentTarget:input}) =>{
        const machinestring ={...this.state.machinestring};
        machinestring[input.name] = input.value;
        machinestring.customer.id= this.props.customer.id;
        machinestring.customer.customercode.username= this.props.customer.customercode.username;
        machinestring.customer.customercode.email= this.props.customer.customercode.email;
        this.setState({machinestring})
        
       
      }

      handleChange = selectedOption => {
        this.setState(
          { selectedOption },
          () => console.log(`Option selected:`, this.state.selectedOption)
        );
      };

      filterhandleChange = filterselectedOption => {
        this.setState(
          { filterselectedOption },
          () => console.log(`Option selected:`, this.state.filterselectedOption)
        );
      };

      handledbyhandleChange = handledbyselectedOption => {
        this.setState(
          { handledbyselectedOption },
          () => console.log(`Option selected:`, this.state.handledbyselectedOption)
        );
      };

      casetypehandleChange =casetypeselectedOption => {
        this.setState(
          { casetypeselectedOption },
          () => console.log(`Option selected:`, this.state.casetypeselectedOption)
        );
      };
      
    

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

      const ReactSelectStyles = () => ({
        multiValueLabel: (styles, {data: { isToggled }}) => ({
          ...styles,
          backgroundColor: isToggled ? 'hotpink' : null,
          color: isToggled ? 'white' : null
        }),
      });

      const casetype =[{value:'Filter replacement', label:'Filter replacement'},
                       {value:'Urgent Repair', label:'Urgent Repair'},
                       {value:'Installation', label:'Installation'},
                       {value:'Checking', label:'Checking'},
                      
                      
                      
                      ]
     
        return (
              <div>
                 <Modal isOpen={this.props.show} fade={this.state.fade } size="lg" >
                  <ModalHeader>New Case for  {this.props.customer.customercode.username} </ModalHeader>
                  <ModalBody>
                  
                 
                <Form>
                <Row>
                <Col >
                  <FormGroup>
                    <Label >Select Water purifier : </Label>
                     <MultiSelect
                        options={this.props.machine.map(m=>({value: m.machineid, label: m.machineid+" "+m.installaddress1}))}
                        value={this.state.selectedOption}
                        onChange={this.handleChange}
                        labelledBy={"Select water purifier "}
                        styles={ReactSelectStyles()}
                      />
                      </FormGroup>  
                      </Col> 
                   </Row> 
                   <Row>  
                   <Col >              
                  <FormGroup>
                  <Label>Installation Address </Label>
                    <Input
                      type="textarea"
                      name="installaddress1"
                      onChange={this.handleCaseChange} 
                      defaultValue={this.props.customer.installaddress}
                    />
                  </FormGroup>
                  </Col> 
                   </Row> 
                   <Row>  
                   <Col sm="12" md="6">         
                      <FormGroup>
                      <Label>Case type</Label>
                      <MultiSelect
                            options={casetype}
                            value={this.state.casetypeselectedOption}
                            onChange={this.casetypehandleChange}
                            labelledBy={"Select Case Type.."}
                            styles={ReactSelectStyles()}
                          />  
                      </FormGroup>
                    </Col> 
                    <Col sm="12" md="6">     
                      <FormGroup>
                      <Label>Replacement Filter </Label>
                        
                      <MultiSelect
                            options={this.state.filter.map(f=>({value: f.filtercode, label: f.filtername}))}
                            value={this.state.filterselectedOption}
                            onChange={this.filterhandleChange}
                            labelledBy={"Select filter "}
                            styles={ReactSelectStyles()}
                          />  
                      </FormGroup>
                    </Col>   
                  </Row> 
                  <Row>  
                   <Col sm="12" md="6">    
                  <FormGroup>
                  <Label>Handed By </Label>
                  <MultiSelect
                        options={this.state.handledby.map(t=>({value: t.staffcode, label: t.staffname}))}
                        value={this.state.handledbyselectedOption}
                        onChange={this.handledbyhandleChange}
                        labelledBy={"Select techanican"}
                        styles={ReactSelectStyles()}
                      />  
                  </FormGroup>
                  </Col> 
                    <Col sm="12" md="6"> 
                  <FormGroup>
                  <Label>Schedule Date </Label>
                    <Input
                      type="date"
                      name="nextservicedate"
                      onChange={this.handleCaseChange} 
                      defaultValue={this.state.machinestring.installdate}
                    />
                  </FormGroup>
                  </Col>   
                  </Row>
                  <Row>  
                   <Col sm="12" md="6">     
                  <FormGroup>
                  <Label>Schedule Time </Label>
                    <Input
                      type="time"
                      name="nextservicedate"
                      onChange={this.handleCaseChange} 
                      defaultValue={this.state.machinestring.installdate}
                    />
                  </FormGroup>
                  </Col> 
                  <Col sm="12" md="6"> 
                  <FormGroup>
                  <Label>Action  </Label>
                    <Input
                      type="textarea"
                      name="action"
                      onChange={this.handleCaseChange} 
                      
                    />
                  </FormGroup>
                  </Col>   
                  </Row>
                  <Row>  
                  <Col sm="12" md="6">     
                  <FormGroup>
                  <Label>Suggestion  </Label>
                    <Input
                      type="textarea"
                      name="suggestion"
                      onChange={this.handleCaseChange} 
                      
                    />
                  </FormGroup>
                  </Col> 
                  <Col sm="12" md="6"> 
                  <FormGroup>
                  <Label>Comment   </Label>
                    <Input
                      type="textarea"
                      name="comment"
                      onChange={this.handleCaseChange} 
                      
                    />
                  </FormGroup>
                  </Col>   
                  </Row>
                
              
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
 
export default AddCase;