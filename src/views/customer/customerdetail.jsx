import React, { Component } from 'react';
import axios from "axios";
import config from '../../config.json';
class Customerdetail extends Component {
    state = { 
        id : this.props.location.state.id,
        
        customerinfo : [],
        machine :[],
        case :[]

     }

     async getCustomer()
     {
        
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961' }
        await axios.get(config.getAllcustomer+this.state.id+'/',{ headers: headers})
            .then((response) => {
              
            this.setState({customerinfo:response.data});
        });
        
        
     } 
    componentWillMount() {
            this.getMachine();
            this.getCustomer();
            this.getCase();
        
        }
     async getMachine()
     {
        
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961' }
        await axios.get(config.getMachineonlyclient, {headers: headers ,params: {cid: this.state.id} })
            .then((response) => {
              
            this.setState({machine:response.data});
        });
        
        
     } 

     async getCase()
     {
        
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961' }
        await axios.get(config.getCaseonlyclient, {headers: headers ,params: {cid: this.state.id} })
            .then((response) => {
              
            this.setState({case:response.data});
        });
        
        
     } 

    
    render() { 
        
        console.log(this.state.customerinfo)
        console.log(this.state.machine)
        console.log(this.state.case)

        return ( 
             <div><h1>Customer Detail {this.state.id}</h1></div>

             <div className="details-table px-4">
            <Table responsive borderless size="sm" className="mt-4">
              <tbody>
                <tr className="d-flex">
                  <td className="col-3 font-bold">First Name</td>
                  <td className="col-9">
                    {editContactFlag ? (
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        defaultValue={selectedContacts.firstname}
                        onChange={(e) =>
                          dispatch(
                            updateContact(
                              selectedContacts.id,
                              "firstname",
                              e.target.value
                            )
                          )
                        }
                      />
                    ) : (
                      ": " + selectedContacts.firstname
                    )}
                  </td>
                </tr>
                <tr className="d-flex">
                  <td className="col-3 font-bold">Last Name</td>
                  <td className="col-9">
                    {editContactFlag ? (
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        defaultValue={selectedContacts.lastname}
                        onChange={(e) =>
                          dispatch(
                            updateContact(
                              selectedContacts.id,
                              "lastname",
                              e.target.value
                            )
                          )
                        }
                      />
                    ) : (
                      ": " + selectedContacts.lastname
                    )}
                  </td>
                </tr>
                <tr className="d-flex">
                  <td className="col-3 font-bold">Company</td>
                  <td className="col-9">
                    {editContactFlag ? (
                      <Input
                        type="text"
                        name="company"
                        id="company"
                        defaultValue={selectedContacts.company}
                        onChange={(e) =>
                          dispatch(
                            updateContact(
                              selectedContacts.id,
                              "company",
                              e.target.value
                            )
                          )
                        }
                      />
                    ) : (
                      ": " + selectedContacts.company
                    )}
                  </td>
                </tr>
                <tr className="d-flex">
                  <td className="col-3 font-bold">Department</td>
                  <td className="col-9">
                    {editContactFlag ? (
                      <Input
                        type="text"
                        name="department"
                        id="department"
                        defaultValue={selectedContacts.department}
                        onChange={(e) =>
                          dispatch(
                            updateContact(
                              selectedContacts.id,
                              "department",
                              e.target.value
                            )
                          )
                        }
                      />
                    ) : (
                      ": " + selectedContacts.department
                    )}
                  </td>
                </tr>
                <tr className="d-flex">
                  <td className="col-3 font-bold">Email</td>
                  <td className="col-9">
                    {editContactFlag ? (
                      <Input
                        type="text"
                        name="email"
                        id="email"
                        defaultValue={selectedContacts.email}
                        onChange={(e) =>
                          dispatch(
                            updateContact(
                              selectedContacts.id,
                              "email",
                              e.target.value
                            )
                          )
                        }
                      />
                    ) : (
                      ": " + selectedContacts.email
                    )}
                  </td>
                </tr>
                <tr className="d-flex">
                  <td className="col-3 font-bold">Phone</td>
                  <td className="col-9">
                    {editContactFlag ? (
                      <Input
                        type="text"
                        name="phone"
                        id="phone"
                        defaultValue={selectedContacts.phone}
                        onChange={(e) =>
                          dispatch(
                            updateContact(
                              selectedContacts.id,
                              "phone",
                              e.target.value
                            )
                          )
                        }
                      />
                    ) : (
                      ": " + selectedContacts.phone
                    )}
                  </td>
                </tr>
                <tr className="d-flex">
                  <td className="col-3 font-bold">Address</td>
                  <td className="col-9">
                    {editContactFlag ? (
                      <Input
                        type="text"
                        name="address"
                        id="address"
                        defaultValue={selectedContacts.address}
                        onChange={(e) =>
                          dispatch(
                            updateContact(
                              selectedContacts.id,
                              "address",
                              e.target.value
                            )
                          )
                        }
                      />
                    ) : (
                      ": " + selectedContacts.address
                    )}
                  </td>
                </tr>
                
              </tbody>
            </Table>
          </div>
       
        );
    }
}
 
export default Customerdetail;