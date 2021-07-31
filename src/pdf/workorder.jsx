import React, { Component } from 'react';
import axios from "axios";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from "qrcode.react";
import './workstyle.css';
import config from '../config.json';


class workorder extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          customercode : this.props.location.state.customercode,
          caseid : this.props.location.state.caseid,
          case:{case_id:'', machines:{machineid:'',machinetype:{productcode: '', producttype: '', price: ''}},handledby:{staffcode:'',staffshort:''},filters:{filtercode:''},casetype:'',scheduledate:'',time:'',action:'',suggest:'',comment:'',iscompleted:false},
          customerinfo :[]
          //case:{case_id:'', machines:{machineid:'xxx',machinetype:{productcode: '', producttype: '', price: ''}},handledby:{staffcode:'',staffshort:''},filters:{filtercode:''},casetype:'',scheduledate:'',time:'',action:'',suggest:'',comment:'',iscompleted:''},
         }
     
      }

      async getSingleCase()
     {
        const token =  localStorage.getItem('token')
        
        await axios.get(config.getAllCase+this.state.caseid+'/', {headers: {"Authorization" : `token ${token}`}})
            .then((response) => {
              
            this.setState({case:response.data});
           
        });
        
        
     } 

     async getCustomer()
     {
        
        const token =  localStorage.getItem('token')
        await axios.get(config.getClientbyCode, {headers: {"Authorization" : `token ${token}`} ,params: {customercode: this.state.customercode}})
            .then((response) => {
              
            this.setState({customerinfo:response.data});
           
        });
        
        
     } 

     componentDidMount()
     {
         
        this.getSingleCase();
        this.getCustomer();
        

     }
     
      _exportPdf = () => {
        const options = { scale: 1 }
        const card = document.querySelector("#capture");
        
        html2canvas(card, options).then(canvas => {
           //document.body.appendChild(canvas);  // if you want see your screenshot in body.
           
           const imgData = canvas.toDataURL('image/jpeg', 1.0);
           const pdf = new jsPDF('l', 'pt', 'a4' );

           var width = pdf.internal.pageSize.getWidth();
           var height = pdf.internal.pageSize.getHeight();

           console.log(width)
           pdf.addImage(imgData, 'JPEG', 270,180 ,1571,850  );

          // var iframe = document.createElement('iframe');
	      // iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;');
           //iframe.setAttribute('style','width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 2; border: none;');
            
	       //document.body.appendChild(iframe);
           //iframe.src = pdf.output('datauristring');
      
           var base64string = pdf.output('datauristring');
           debugBase64( base64string );
          // pdf.save("download.pdf"); 

           
       });

       function debugBase64(base64URL){
        var win = window.open();
        win.document.write('<iframe src="' + base64URL  + '"position:absolute; frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
    }
   

    
   
    }
    
      render() { 

        var machine = this.state.case.machines
        
        var filter = this.state.case.filters 
     
   
     
        const Mach = () => (
            <div className='rowC'>
              {Object.keys(machine).map(obj => <div key={obj}>{ machine[obj].machineid} </div>)}
              {Object.keys(machine).map(obj => <div key={obj}>{ Object.keys(machine[obj]).map(k=>machine[obj][k].productcode)} </div>)}
             
            </div>
           

          );

        

         

          const Filter = () => (
            <div className='rowC' >
              {Object.keys(filter).map(obj => <div key={obj}>{filter[obj].filtercode}</div>)}
            </div>
          );


          
          
        return ( 


            <div>
                <div >
                    <button onClick={this._exportPdf}>Print</button>
                    <h1> {this.state.customercode}/{this.state.caseid}</h1>
                    
                    
                    
                </div>
                <div id="capture">
                    <table>
                    <tbody>   
                        <tr>
                            <th><div className="invoice-box">
                                <table cellPadding="0" cellSpacing="0"  width="400">
                                <tbody>
                                    <tr className="top">
                                        <td colSpan="2">
                                        <table>
                                         <tbody>
                                                <tr>
                                                    <td className="title">

                                                        <img src="https://www.osmosis.com.hk/wp-content/uploads/2017/10/new_logo_straight_s.png"  width ="180" height="35" alt="Osmosis"/><br/>
                                                        Company copy
                                                    </td>

                                                    <td>
                                                        Service Report No. #:{this.state.case.case_id} <br/>
                                                        Date :{this.state.case.scheduledate} <br/>
                                                        Time : {this.state.case.time} to <br/>
                                                        Serviced by:  {this.state.case.handledby.staffshort}<br/>
                                                    </td>
                                                </tr>
                                            </tbody>    
                                            </table>
                                        </td>
                                    </tr>

                                    <tr className="information">
                                        <td colSpan="2">
                                            <table>
                                            <tbody>
                                                <tr>

                                                    <td>
                                                        Name: {this.state.customerinfo.contactname}  <br/>
                                                        Contact : {this.state.customerinfo.contactno} <br/>
                                                        Tel : {this.state.customerinfo.mobile}<br/>
                                                        Address : {this.state.customerinfo.billingaddress}/<br/>
                                                        Customer Code : {this.state.customercode}
                                                    </td>

                                                    <td>
                                                      <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#333" bgColor="#fff"/>
                                                    </td>

                                                </tr>
                                             </tbody>     
                                            </table>
                                        </td>
                                    </tr>

                                    <tr className="heading">
                                        <td width="400">
                                            Machine Model
                                        </td>
                                        
                                        <td >
                                            Next Service Date
                                        </td>
                                    </tr>

                                    <tr className="details">

                                    <td>< Mach /></td>
                                    <td>30 JUN 2021</td>
                                    </tr>

                                    <tr className="heading">
                                        <td>
                                            Nature of Problem & Service Details
                                        </td>

                                        <td>
                                            Filter
                                        </td>
                                    </tr>

                                    <tr className="item">
                                         <td>
                                        Case Type : {this.state.case.casetype}
                                        </td>

                                        <td>
                                            <Filter/>
                                        </td>
                                    </tr>

                                    <tr className="item">
                                        <td>
                                            Action : 
                                        </td>

                                        <td>
                                        {this.state.case.action}
                                        </td>
                                    </tr>
                                    <tr className="item">
                                        <td>
                                            Comment : 
                                        </td>

                                        <td>
                                        {this.state.case.comment}
                                        </td>
                                    </tr>
                                    <tr className="heading">
                                        <td width="400">
                                        Next Service Date
                                        </td>

                                        <td >
                                            Date : JUL 2021
                                        </td>
                                    </tr>

                                    <tr className="details">

                                    <td>
                                            Case Type : {this.state.case.casetype}
                                       
                                        </td>

                                        <td>

                                        </td>
                                    </tr>
                                    </tbody>    
                                </table>
                                <div id="thanks">Osmosis have performed  today , We certify that the service is satisfactorily completed</div>
                                <div id="thanks1">Notice :    </div>


                                <div id="thanks2"> Signature X</div>
                                    <div id="notices">

                                        <div className="notice">Hotline : +852 8333 8118 </div>
                                        <div className="notice">Room F, 9/F, Block 1 , Golden Dragon Industrial Center, 152-160, Tai Lin Pai Road, Kwai Chung, N.T., HK</div>
                                        <div><a href="mailto:">info@osmosis.com.hk</a></div>
                                        <div><a href="www.osmosis.com.hk">www.osmosis.com.hk</a></div>
                                    </div>
                                </div>
                            </th>
                            <th><div className="invoice-box">
                                <table cellPadding="0" cellSpacing="0"  width="400">
                                <tbody>
                                    <tr className="top">
                                        <td colSpan="2">
                                        <table>
                                         <tbody>
                                                <tr>
                                                    <td className="title">

                                                        <img src="https://www.osmosis.com.hk/wp-content/uploads/2017/10/new_logo_straight_s.png" width ="180" height="35" alt="Osmosis"/><br/>
                                                        Customer Copy
                                                    </td>

                                                    <td>
                                                        Service Report No. #:{this.state.case.case_id} <br/>
                                                        Date :{this.state.case.scheduledate} <br/>
                                                        Time : {this.state.case.time} to <br/>
                                                        Serviced by:  {this.state.case.handledby.staffshort}<br/>
                                                    </td>
                                                </tr>
                                            </tbody>    
                                            </table>
                                        </td>
                                    </tr>

                                    <tr className="information">
                                        <td colSpan="2">
                                            <table>
                                            <tbody>
                                                <tr>

                                                <td>
                                                        Name: {this.state.customerinfo.contactname}  <br/>
                                                        Contact : {this.state.customerinfo.contactno} <br/>
                                                        Tel : {this.state.customerinfo.mobile}<br/>
                                                        Address : {this.state.customerinfo.billingaddress}/<br/>
                                                        Customer Code : {this.state.customercode}
                                                    </td>

                                                    <td>
                                                      <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#333" bgColor="#fff"/>
                                                    </td>

                                                </tr>
                                             </tbody>     
                                            </table>
                                        </td>
                                    </tr>

                                    <tr className="heading">
                                        <td width="400">
                                            Machine Model
                                        </td>

                                        <td >
                                            Next Service Date
                                        </td>
                                    </tr>

                                    <tr className="details">

                                    <td>< Mach /></td>
                                    <td>30 JUN 2021</td>
                                    </tr>

                                    <tr className="heading">
                                        <td>
                                            Nature of Problem & Service Details
                                        </td>

                                        <td>
                                            Filter
                                        </td>
                                    </tr>

                                    <tr className="item">
                                <td>
                                         Case Type : {this.state.case.casetype}
                                        </td>

                                        <td>
                                            Filter Replacement
                                        </td>
                                    </tr>

                                    <tr className="item">
                                        <td>
                                            Action : 
                                        </td>

                                        <td>
                                             {this.state.case.action}
                                        </td>
                                    </tr>
                                    <tr className="item">
                                        <td>
                                            Comment : 
                                        </td>

                                        <td>
                                            {this.state.case.comment}
                                        </td>
                                    </tr>
                                    <tr className="heading">
                                        <td width="400">
                                        Next Service Date
                                        </td>

                                        <td >
                                            Date : JUL 2021
                                        </td>
                                    </tr>

                                    <tr className="details">

                                        <td>
                                        Case Type : {this.state.case.casetype}
                                        </td>

                                        <td>
                                            <Filter/>
                                        </td>
                                    </tr>
                                    </tbody>    
                                </table>
                                <div id="thanks">Osmosis have performed  today , We certify that the service is satisfactorily completed</div>
                                <div id="thanks1">Notice :    </div>


                                <div id="thanks2"> Signature X</div>
                                    <div id="notices">

                                        <div className="notice">Hotline : +852 8333 8118 </div>
                                        <div className="notice">Room F, 9/F, Block 1 , Golden Dragon Industrial Center, 152-160, Tai Lin Pai Road, Kwai Chung, N.T., HK</div>
                                        <div><a href="mailto:">info@osmosis.com.hk</a></div>
                                        <div><a href="www.osmosis.com.hk">www.osmosis.com.hk</a></div>
                                    </div>
                                </div>
                            </th>

                            


                           
                        </tr>
                    </tbody>   
                    </table>



                </div>    
                
                            
          </div>
                        
            
         );
    }
}
 
export default workorder;