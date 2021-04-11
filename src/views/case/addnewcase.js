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
               
                selectedOption: [],

                filter:[],
                filterselectedOption: [],
                handledby :[],
                handledbyselectedOption: [],
                casetype:[],
                casetypeselectedOption: [],
                addcase:{machines:{machineid:''},handledby:{staffcode:''},filters:{filtercode:''},casetype:'',scheduledate:'',time:'',action:'',suggest:'',comment:'',iscompleted:false},
                
    
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
        const addcase ={...this.state.addcase};
        addcase["scheduledate"] = curr;
        addcase["time"] ="10:00:00";
        this.setState({addcase});
       
     
      } 

      componentDidMount() {
        
        this.getFilterData();
        this.getTechData();
      
    }
      
      handleCaseChange = ({currentTarget:input}) =>{
        const addcase ={...this.state.addcase};
        addcase[input.name] = input.value;
        this.setState({addcase})
     
       
      }

      handleChange = selectedOption => {
        let addcase = Object.assign({}, this.state.addcase);
        let machine =[]
        for(var i=0;i<selectedOption.length;i++)
        {
          machine.push({machineid:selectedOption[i].value})
        }
        addcase.machines = machine;
        this.setState({addcase})
        this.setState({selectedOption})
     
       
      };

      filterhandleChange = filterselectedOption => {

        let addcase = Object.assign({}, this.state.addcase);
        let addfilter =[]
        for(var i=0;i<filterselectedOption.length;i++)
        {
          addfilter.push({filtercode:filterselectedOption[i].value})
        }
        addcase.filters=addfilter
        this.setState({addcase})
        this.setState({ filterselectedOption })
          
      };

      handledbyhandleChange = handledbyselectedOption => {

       
        let addcase = Object.assign({}, this.state.addcase);
        addcase.handledby['staffcode']= handledbyselectedOption[0].value
        
        this.setState({addcase})
        this.setState({handledbyselectedOption})
        
      };

      casetypehandleChange =casetypeselectedOption => {
        const addcase ={...this.state.addcase};
        addcase['casetype'] = casetypeselectedOption[0].value;

        this.setState({addcase})
        this.setState({casetypeselectedOption})
         
      };
      
    

      handleCaseadd = event => {
        event.preventDefault();
        
        const addcase= JSON.stringify({...this.state.addcase})
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961','Content-Type': 'application/json',}

        //console.log("JSON STRING",addcase);
        axios.post(config.getAllCase,addcase,{headers: headers})
         .then(res => {
            //console.log(res);
            //console.log(res.data);
            Swal.fire({
              title:'New Case Successful',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: `Print Job Sheet`,
              denyButtonText: `No need to Print`,
            
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success')
              } else if (result.isDenied) {
                window.location.reload(false);   
              }
            })
          })  
         .catch((error) => {
            console.log(error);
              })  
              
       //   window.location.reload(false);          
     };
     
     handlePrint = event => {
    

      this.props.history.push({
        pathname : "/printjob",
        state: {customercode: this.props.customer.customercode.username }
        
       });

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
                            hasSelectAll={false}
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
                        hasSelectAll={false}
                      />  
                  </FormGroup>
                  </Col> 
                    <Col sm="12" md="6"> 
                  <FormGroup>
                  <Label>Schedule Date </Label>
                    <Input
                      type="date"
                      name="scheduledate"
                      onChange={this.handleCaseChange} 
                      defaultValue={this.state.addcase.scheduledate}
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
                      name="time"
                      onChange={this.handleCaseChange} 
                      defaultValue={this.state.addcase.time}
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
                      name="suggest"
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
                    <Button className="btn"  color="success"onClick={this.handleCaseadd} >Add</Button>
                    <Button className="btn"  color="danger" onClick={this.handlePrint}>Print and Save</Button>
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