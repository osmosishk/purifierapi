import React, { Component } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from "qrcode.react";
import './workstyle.css';
class workorder extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          customercode : this.props.location.state.customercode,

         }
     
      }
     
      _exportPdf = () => {
        const options = { scale: 1 }
        const card = document.querySelector("#capture")

        html2canvas(card, options).then(canvas => {
           document.body.appendChild(canvas);  // if you want see your screenshot in body.
           
           const imgData = canvas.toDataURL('image/jpeg', 1.0);
           const pdf = new jsPDF('l', 'mm', 'a4');;
           pdf.addImage(imgData, 'PNG', 0, 0);

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
        return ( 


            <div>
                <div >
                    <button onClick={this._exportPdf}>Print</button>
                    <h1> {this.state.customercode}</h1>
                </div>
                <div id="capture">
                    <table>
                    <tbody>   
                        <tr>
                            <th><div className="invoice-box">
                                <table cellPadding="0" cellSpacing="0">
                                <tbody>
                                    <tr className="top">
                                        <td colSpan="2">
                                        <table>
                                         <tbody>
                                                <tr>
                                                    <td className="title">

                                                        <img src="https://www.osmosis.com.hk/wp-content/uploads/2017/10/new_logo_straight_s.png" width ="40" height="8" alt="Osmosis"/><br/>
                                                        Company copy
                                                    </td>

                                                    <td>
                                                        Service Report No. #: <br/>
                                                        Date : <br/>
                                                        Time :  to <br/>
                                                        Serviced by: <br/>
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
                                                        Name:   <br/>
                                                        Contact : <br/>
                                                        Tel : <br/>
                                                        Address :   /<br/>
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
                                        <td width="500">
                                            Machine Model
                                        </td>

                                        <td >
                                            Next Service Date
                                        </td>
                                    </tr>

                                    <tr className="details">

                                    <td>
                                        

                                        </td>

                                        <td>
                                            
                                        </td>
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
                                        Case Type : 
                                        </td>

                                        <td>
                                        
                                        </td>
                                    </tr>

                                    <tr className="item">
                                        <td>
                                            Action : 
                                        </td>

                                        <td>

                                        </td>
                                    </tr>
                                    <tr className="item">
                                        <td>
                                            Comment : 
                                        </td>

                                        <td>

                                        </td>
                                    </tr>
                                    <tr className="heading">
                                        <td width="500">
                                        Company Copy
                                        </td>

                                        <td >
                                            Date : 
                                        </td>
                                    </tr>

                                    <tr className="details">

                                    <td>
                                            Case Type : 
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


                            <th>
                                <div className="invoice-box">
                                <table cellPadding="0" cellSpacing="0">
                                <tbody>
                                    <tr className="top">
                                        <td colSpan="2">
                                            <table>
                                            <tbody> 
                                                <tr>
                                                    <td className="title">
                                                        <img src="https://www.osmosis.com.hk/wp-content/uploads/2017/10/new_logo_straight_s.png" width ="40" height="8" alt="Osmosis"/><br/>
                                                        Client copy
                                                    </td>

                                                    <td>
                                                        Service Report No. #: <br/>
                                                        Date : <br/>
                                                        Time :  to <br/>
                                                        Serviced by:  <br/>
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
                                                        Name:   <br/>
                                                        Contact :<br/>
                                                        Tel : <br/>
                                                        Address :   / <br/>
                                                        Customer Code : <br/> 
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
                                        <td width="500">
                                            Machine Model
                                        </td>

                                        <td >
                                            Next Service Date
                                        </td>
                                    </tr>

                                    <tr className="details">

                                    <td>
                                        

                                        </td>

                                        <td>
                                        
                                        </td>
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
                                        Case Type : 
                                        </td>

                                        <td>
                                        
                                        </td>
                                    </tr>

                                    <tr className="item">
                                        <td>
                                            Action : 
                                        </td>

                                        <td>

                                        </td>
                                    </tr>
                                    <tr className="item">
                                        <td>
                                            Comment : 
                                        </td>

                                        <td>

                                        </td>
                                    </tr>
                                    <tr className="heading">
                                        <td width="500">
                                        Client Copy
                                        </td>

                                        <td >
                                            Date : 
                                        </td>
                                    </tr>

                                    <tr className="details">

                                    <td>
                                            Case Type : 
                                        </td>

                                        <td>

                                        </td>
                                    </tr>
                                    </tbody>    
                                </table>
                                <div id="thanks">Osmosis have performed  today , We certify that the service is satisfactorily completed</div>
                                <div id="thanks1">Notice :    </div>


                            <div id="thanks2"></div>
                            <div id="notices">

                                <div className="notice">Hotline : +852 8333 8118 </div>
                                <div className="notice">Room F, 9/F, Block 1 , Golden Dragon Industrial Center, 152-160, Tai Lin Pai Road, Kwai Chung, N.T., HK</div>
                                <div><a href="mailto:">info@osmosis.com.hk</a></div>
                                <div><a href="www.osmosis.com.hk">www.osmosis.com.hk</a></div>
                            </div>
                            </div></th>
                           
                        </tr>
                        </tbody>   
                    </table>



                </div>    
                
                            
          </div>
                        
            
         );
    }
}
 
export default workorder;