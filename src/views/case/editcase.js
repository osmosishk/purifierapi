import React, { Component } from 'react';

import { Row, Col , Button ,
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



class EditCase extends Component {



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
                case :[],
                filter:[],
                filterselectedOption: [],
                handledby :[],
                handledbyselectedOption: [],
                casetype:[],
                casetypeselectedOption: [],
                selectedcaseid : props.caseid,
                history : props.history,

                editcase:{case_id:'', machines:{machineid:''},handledby:{staffcode:'',staffname:''},filters:{filtercode:''},casetype:'',scheduledate:'',time:'',action:'',suggest:'',comment:'',iscompleted:''},
              
                

                
    
        }
       
      }
 
      async getTechData()
      {
        const token =  localStorage.getItem('token')
          await axios.get(config.getAlltechnician,{ headers: {"Authorization" : `token ${token}`}})
              .then((response) => {
                
              this.setState({handledby:response.data});
          });
         
      
      }  


      async getFilterData()
    {
        const token =  localStorage.getItem('token')
        await axios.get(config.getAllfilter,{ headers: {"Authorization" : `token ${token}`}})
            .then((response) => {
              
            this.setState({filter:response.data});
         
        });
       
       
    }  

   

    

      componentWillMount()
      {
        var curr = new Date();
        curr = curr.toISOString().substr(0,10)
        const editcase ={...this.state.editcase};
        //addcase["scheduledate"] = curr;
        //addcase["time"] ="10:00:00";
       // this.setState({addcase});
     
      }  


      componentDidMount()
      {
        this.getFilterData();
        this.getTechData();
      
        
      }


   
      
      handleCaseChange = ({currentTarget:input}) =>{
        const editcase ={...this.state.editcase};

        editcase[input.name] = input.value;
       
        this.setState({editcase})
        
       
      }

      handleChange = selectedOption => {
        let editcase = Object.assign({}, this.state.editcase);
        let machine =[]
        for(var i=0;i<selectedOption.length;i++)
        {
          machine.push({machineid:selectedOption[i].value})
        }
        editcase.machines = machine;
        this.setState({editcase})
        this.setState({selectedOption})
      };

      filterhandleChange = filterselectedOption => {

        let editcase = Object.assign({}, this.state.editcase);
        let editfilter =[]
        for(var i=0;i<filterselectedOption.length;i++){
          editfilter.push({filtercode:filterselectedOption[i].value})
        }
        editcase.filters= editfilter
        this.setState({editcase})
        
        this.setState({filterselectedOption });


      };

      completeChange = () => {
        let pstatus  = this.state.editcase.iscompleted;

        let editcase = this.state.editcase;
        editcase['iscompleted'] = !pstatus
        this.setState({editcase})
        
      }

      handledbyhandleChange = handledbyselectedOption => {
        let editcase = Object.assign({}, this.state.editcase);
        editcase.handledby['staffcode']= handledbyselectedOption[0].value
        editcase.handledby['staffname']= handledbyselectedOption[0].label
        
        this.setState({editcase} ,()=> console.log(this.state.editcase))

        this.setState({handledbyselectedOption})
      };

      casetypehandleChange =casetypeselectedOption => {
        const editcase ={...this.state.editcase};
        editcase['casetype'] = casetypeselectedOption[0].value;

        this.setState({editcase})
        this.setState({casetypeselectedOption})
      };
      
      

      componentDidUpdate(prevProps, prevState) {
        
        if(prevProps.caseid  !== this.state.selectedcaseid){
        const singlecase = this.props.casestring.filter(c=>c.case_id==this.props.caseid)
        const editcase = this.state.editcase
        editcase['case_id']=this.props.caseid
        editcase['scheduledate']=singlecase.map(s=>s.scheduledate)[0]
        editcase['time']=singlecase.map(s=>s.time)[0]
        editcase['suggest']=singlecase.map(s=>s.suggest)[0]
        editcase['action']=singlecase.map(s=>s.action)[0]
        editcase['comment']=singlecase.map(s=>s.comment)[0]
        editcase['casetype']=singlecase.map(s=>s.casetype)[0]
        editcase['machines']=singlecase.map(s=>s.machines)[0]
        editcase['filters']=singlecase.map(s=>s.filters)[0]
        editcase['handledby']=singlecase.map(s=>s.handledby)[0]
        editcase['iscompleted']=singlecase.map(s=>s.iscompleted)[0]
        this.setState({editcase})
        
        }
      }

      static getDerivedStateFromProps(props, state) {
        
        const singlecase = props.casestring.filter(c=>c.case_id==props.caseid)
        
        let value1 = props.casestring.filter(c=>c.case_id==props.caseid).map(s=>s.handledby.staffcode)
        let label1 = props.casestring.filter(c=>c.case_id==props.caseid).map(s=>s.handledby.staffname)
        let value2 = props.casestring.filter(c=>c.case_id==props.caseid).map(s=>s.casetype)
        let machine = props.casestring.filter(c=>c.case_id==props.caseid).map(s=>s.machines)
        let filter = props.casestring.filter(c=>c.case_id==props.caseid).map(s=>s.filters)
        let machinestring =[]
        let filterstring =[]

        
        if(machine.length>0)
        {
          let tempmachinestring= machine[0].map(m=>m.machineid);
          let tempmachinetype= machine[0].map(m=>m.machinetype.productcode);
          
          for(var i=0;i<tempmachinestring.length;i++){
            
            machinestring.push({value:tempmachinestring[i], label:tempmachinetype[i]+" "+tempmachinestring[i]})
           
          }

        }

        if(filter.length>0)
        {
          let tempfilterstring= filter[0].map(f=>f.filtercode);
        
          for(i=0;i<tempfilterstring.length;i++){
            filterstring.push({value:tempfilterstring[i], label:tempfilterstring[i]})
        
          }
         
        }
      
     
        let samplestring=[{value:value1[0], label:label1[0]}]
        let samplestring1=[{value:value2[0], label:value2[0]}]
    
       
        if (props.caseid !== state.selectedcaseid) {
           
          return {
            selectedcaseid: props.caseid,
            handledbyselectedOption: samplestring,
            casetypeselectedOption:samplestring1,
            filterselectedOption: filterstring,
            selectedOption: machinestring,
            case:singlecase
          };
        }
        
        return null;

       
      }
 
    

      handleCaseUpdate = event => {
        event.preventDefault();
        const token =  localStorage.getItem('token')
        const editcase = JSON.stringify({...this.state.editcase})
      

        //console.log("JOSN" ,editcase);
       
        axios.put(config.updateCase, editcase,{headers: {"Authorization" : `token ${token}` ,'Content-Type': 'application/json'}  })
        .then(res => {
            //console.log(res);
            //console.log(res.data);

           Swal.fire('Edit Case Successful')
           window.location.reload(false);   
           })
        .catch((error) => {
           console.log(error);
             })  
              
                
     };

     handleCasePrint = (value1 , value2 ) =>() => 
     {
       
        this.state.history.push({
          pathname : "/printjob",
          state: {customercode:  value1 , caseid :value2}
      });
       
    
        
     }
     
    
     

     handleCaseDelete = event => {
      event.preventDefault();
      
      const token =  localStorage.getItem('token')
      
      Swal.fire({
        title: 'Are you sure to delete Cases?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Delete`,
        denyButtonText: `Cancel`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.delete(config.getAllCase+this.props.caseid+'/',{headers: {"Authorization" : `token ${token}` ,'Content-Type': 'application/json'}  })
          .then(res => {
            console.log(res);
            console.log(res.data);
            Swal.fire('Delete', '', 'success')
            window.location.reload(false);    
            })
         .catch((error) => {
            console.log(error);
             })  
          
        } else if (result.isDenied) {
          Swal.fire('Case is kept', '', 'info')
        }
      })
      
        
              
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
                  <ModalHeader>Edit Case for  {this.props.customer.customercode.username} Case ID {this.props.caseid}</ModalHeader>
                  <ModalBody>
                  
                 
                <Form>
                <Row>
                <Col >
                  <FormGroup>
                    <Label >Select Water purifier : </Label>
                     <MultiSelect
                        options={this.props.machine.map(m=>({value: m.machineid, label: m.machinetype.productcode+" "+m.machineid+" "+m.installaddress1}))}
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
                            //defaultValue={singlecase.map(s=>s.casetype)}
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
                        placeholder={"techanican"}
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
                      defaultValue={this.state.case.map(s=>s.scheduledate)}
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
                      defaultValue={this.state.case.map(s=>s.time)}
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
                      defaultValue={this.state.case.map(s=>s.action)}
                      
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
                      defaultValue={this.state.case.map(s=>s.suggest)}
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
                      defaultValue={this.state.case.map(s=>s.comment)}
                    />
                  </FormGroup>
                  </Col>
                  <Col sm="12" md="6"> 
                  <FormGroup>
                 
                         <div className="form-check form-check-inline">
                                <Input className="form-check-input" type="checkbox" id="iscompleted" defaultChecked={this.state.editcase.iscompleted} onChange={this.completeChange} />
                                <Label for="inlineCheckbox1">Completed</Label>
                            </div>
                  </FormGroup>
                  </Col>   

                  </Row>
                
              
                  <FormGroup>
                    <div className="button-group">
                    <Button className="btn"  color="success"onClick={this.handleCaseUpdate} >Update</Button>
                    <Button className="btn"  color="danger" onClick={this.handleCaseDelete}>Delete </Button>
                    <Button className="btn"  color="danger" onClick={this.handleCasePrint(this.props.customer.customercode.username ,this.props.caseid )}  >Print Job </Button>
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
 
export default EditCase;