import React, { Component } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from "qrcode.react";

class pdfg extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          customercode : this.props.location.state.customercode,

         }
     
      }
     
      _exportPdf = () => {

        html2canvas(document.querySelector("#capture")).then(canvas => {
           document.body.appendChild(canvas);  // if you want see your screenshot in body.
           const imgData = canvas.toDataURL('image/jpeg', 1.0);
           const pdf = new jsPDF('p', 'mm', 'a4');
           pdf.addImage(imgData, 'PNG', 3, 2);

           //var iframe = document.createElement('iframe');
	       //iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;');
           //iframe.setAttribute('style','width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 2; border: none;');
            
	       //document.body.appendChild(iframe);
           //iframe.src = pdf.output('datauristring');
      
           var base64string = pdf.output('datauristring');
           debugBase64( base64string );
           //pdf.save("download.pdf"); 

           
       });

       function debugBase64(base64URL){
        var win = window.open();
        win.document.write('<iframe src="' + base64URL  + '"position:absolute; frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:1200; height:100%;" allowfullscreen></iframe>');
    }
   
    }
    
      render() { 
        return ( 


            <div>
            <div className="mb5">
              <button onClick={this._exportPdf}>Print</button>
             <h1> {this.state.customercode}</h1>
            </div>
             <div id="capture">
             <font size="1">______________________________ {this.state.customercode}</font>
             <table border="1" cellspacing="10"  cellpadding="10">
             <thead>
              <tr>
               
                <table border="3" bordercolor="white" cellpadding="12">
                  <thead>
                    <tr>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>

                    </tr>
                    <tr>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>

                    </tr>
                    <tr>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>

                    </tr>

                    <tr>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>

                    </tr>
                    <tr>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>

                    </tr>

                    <tr>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>

                    </tr>

                    <tr>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>

                    </tr>

                    <tr>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>

                    </tr>

                    <tr>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>

                    </tr>
                    <tr>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>

                    </tr>


                    <tr>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>
                      <th class="tg-0lax"> <QRCode value={this.state.customercode} renderAs="svg"  level="H"  size='50'  fgColor="#000" bgColor="#fff"/></th>

                    </tr>

                  

                  </thead>
                </table>  
                </tr>  
                </thead>  
              </table>
           
                         
                         
                         
                         
                          
                        
            </div>
          </div>
                        
            
         );
    }
}
 
export default pdfg;