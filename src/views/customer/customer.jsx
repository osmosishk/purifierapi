import React, { Component ,Fragment } from 'react';
import ContactsFilter from "../../components/contacts/ContactsFilter";
import ContactsSearch from "../../components/contacts/ContactsSearch";
import ContactsList from "../../components/contacts/ContactsList";
import ContactsDetails from "../../components/contacts/ContactsDetails";

class Customerdashboard extends Component {
    state = { 
        showLeft : false,
        showRight: false


     }

    showLeftPart() {
        
        this.setState({showLeft: !this.state.showLeft});
      };
    
    showRightPart(){
        
        this.setState({showRight: !this.state.showRight});
      };

      
    render() { 
        return (
      <Fragment>
      <div className="app-drawer">
      <div className="left-part bg-white show-panel">
          <ContactsFilter />
      </div> 
     
      <div className="right-left-part show-right-left-panel">
        <span className="bg-primary show-left-part text-white d-block d-lg-none " >
        <i className="fas fa-chevron-left"></i>  
        </span>
                <h1>hello world</h1>
        
        
       </div>       

      </div>
    </Fragment>
    );
    }
}
 
export default Customerdashboard;