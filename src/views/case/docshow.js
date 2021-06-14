import React, { Component } from 'react';
import {   Button ,
    Label,
    Col,
    Row,
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
import { link } from 'fs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


class DocShow extends Component {
    constructor(props) {
        super(props);
       
        this.state ={
               
                fade: false ,
                link: props.link,
                doc: props.doc,
                filterdoc:[],
                casetypeselectedOption: [],
                doctypeselectedOption:[],
                datechange:[],
                imgsrc:'',
                
                
        };
        this.removeItem = this.removeItem.bind(this);

        
        
        
      }


      casetypehandleChange =casetypeselectedOption => {
       
        const filterdoc={...this.state.filterdoc};
        let samplestring=[{value:casetypeselectedOption[1].value, label:casetypeselectedOption[1].label}]
        filterdoc['casetype'] = casetypeselectedOption[1].value;
        this.setState({casetypeselectedOption:samplestring})
        this.setState({filterdoc})
     
      };

      doctypehandleChange =doctypeselectedOption => {
        const filterdoc={...this.state.filterdoc};
        
        let samplestring=[{value:doctypeselectedOption[1].value, label:doctypeselectedOption[1].label}]
     
        filterdoc['doctype'] = doctypeselectedOption[1].value;
        this.setState({filterdoc})
        this.setState({doctypeselectedOption:samplestring})
         
      };

      handleChange = ({currentTarget:input}) =>{
        const filterdoc  ={...this.state.filterdoc};
        
        filterdoc[input.name] = input.value;
        this.setState({filterdoc})
     
       
      }
      
      removeItem = () => {
        this.props.handleClose();
      }

 
      
      static getDerivedStateFromProps(props, state) {
        
        let match1 ='';
        let something2 ='';
        let filedoc2='';
        let samplestring ='';
        let samplestring1='';
        
        if (props.link)
          {
            
            var myRegex1 = /<img[^>]+src="(http:\/\/[^">]+)"/g;
           
            match1 = myRegex1.exec(props.link);
            
         
           
            var sfilename = match1[1].substring(match1[1].lastIndexOf('/')+1);
            filedoc2 = props.doc.filter(x => x.filename ===sfilename )
           
        
            something2=filedoc2[0].casetype;
            
           
            samplestring=[{value:filedoc2[0].casetype, label:filedoc2[0].casetype}]
            samplestring1=[{value:filedoc2[0].doctype, label:filedoc2[0].doctype}]
            
            
          }
  

          if ( state.link !== props.link ) {
            
            return {

              
              imgsrc:match1[1],
              datechange: filedoc2[0].date,
              casetypeselectedOption:samplestring,
              doctypeselectedOption:samplestring1,
              filterdoc:filedoc2[0],
              link:props.link,
              
           

            };
          
        }
    
        return null;
          

         
      }
      

      handleDocUpdate = event => {
        event.preventDefault();
        
        const filedoc = JSON.stringify({...this.state.filterdoc})
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961','Content-Type': 'application/json',}

      
       axios.put(config.updateDoc, filedoc,{headers: headers})
        .then(res => {
          
           Swal.fire('Doc Change Successful')
           this.removeItem();
           })
        .catch((error) => {
           console.log(error);
             })  
              
                
     };



      
 
    render () {
   
      
       const style = {
        height: '150px',
        width: '150px',
      };

      

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
                       {value:'Other', label:'Other'},
                  
                      ] 

      const doctype =[{value:'Job Sheet', label:'Job Sheet'},
                      {value:'Renewal Letter', label:'Renewal Letter'},
                      {value:'Table', label:'Table'},
                      {value:'Others', label:'Others'},
                 
                     ]                
                   
    
        return (
              <div>
                 <Modal isOpen={this.props.show} fade={this.state.fade } size="lg">
                  <ModalHeader>Case for   </ModalHeader>
                  <ModalBody>
                  <table >
                    <tbody>
                      <tr>
                        <td><div><img src={this.state.imgsrc}  width="550" height="750"  /></div> </td>
                        <tr> 
                          
                              <tr>
                                <td> 
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
                                </td>
                              </tr>
                              <tr>
                                <td> 
                                  <FormGroup>
                                  <Label>Doc type</Label>
                                  <MultiSelect
                                        options={doctype}
                                        value={this.state.doctypeselectedOption}
                                        onChange={this.doctypehandleChange}
                                        labelledBy={"Select Doc Type.."}
                                        styles={ReactSelectStyles()}
                                        hasSelectAll={false}
                                      />  
                                  </FormGroup>
                                </td>
                              </tr>

                              <tr>
                                <td>
                                  <FormGroup>
                                      <Label>Case Date </Label>
                                        <Input
                                          type="date"
                                          name="date"
                                          onChange={this.handleChange}
                                          defaultValue={this.state.datechange}
                                        />
                                  </FormGroup> 
                                </td>
                                <td>
                                 

                                </td>
                              </tr>
                          
      
                        </tr>
                        
                      </tr>
                    </tbody>
                  </table>
                
                  </ModalBody>

                    <FormGroup>
                    <div className="button-group">
                    <Button className="btn"  color="success"onClick={this.handleDocUpdate} >Save</Button>
                    <Button className="btn"  color="danger" onClick={this.props.handleClose}>Cancel</Button>
                    </div>  
                  </FormGroup>
                  
              </Modal>
    
                  
              </div>
            )
        }
      
}
 
export default DocShow;