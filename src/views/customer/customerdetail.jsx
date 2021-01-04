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
        );
    }
}
 
export default Customerdetail;