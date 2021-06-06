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


class DocShow extends Component {
    constructor(props) {
        super(props);
        this.state ={
               
                fade: false ,
                link: props.link,
                
        }
        
      }
 



      
     


     


      
 
    render () {
      
      
    
        return (
              <div>
                 <Modal isOpen={this.props.show} fade={this.state.fade } >
                  <ModalHeader>Water Purifier add for  </ModalHeader>
                  <ModalBody>
                 <div>{this.props.link}</div>
                  </ModalBody>

                    <FormGroup>
                    <div className="button-group">
                   
                    <Button className="btn"  color="danger" onClick={this.props.handleClose}>Cancel</Button>
                    </div>  
                  </FormGroup>
                  
              </Modal>
    
                  
              </div>
            )
        }
}
 
export default DocShow;