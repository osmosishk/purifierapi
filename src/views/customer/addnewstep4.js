import React, { Component } from 'react';
import {
    Collapse,
    Button,
    Card,
    CardBody,
    CardTitle,
    UncontrolledCollapse,
    Fade,
    Row,
    Col
} from 'reactstrap';
export default class Step4 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			savedToCloud: props.getStore().savedToCloud ,
            addstring : props.getStore(),
			collapse : false
		};
	}

	
	handleNewCustomer() {
        
       
        const addcustomer = JSON.stringify({...this.state.addstring})
        const headers = {'Authorization': 'token c3c1d72b219561cfe00084d3434f37c3714f5961','Content-Type': 'application/json',}

        console.log(addcustomer);
        //axios.post(config.getAllmachine, addmachine,{headers: headers})
        // .then(res => {
        //    console.log(res);
        //    console.log(res.data);
         //   Swal.fire('Add Water purifier Successful')
        //    })
        // .catch((error) => {
        //    console.log(error);
        //      })  
              
              
     };
	 componentWillMount()
	 {
	   this.handleNewCustomer()
	  
	  
	 } 
    
	showMachineAdd()
	{
	  this.setState({collapse: !this.state.collapse});
	}

	render() {
		return (
			<div className="step step4 mt-5">
				<div className="row justify-content-md-center">
					<div className="col-lg-8">
						<form id="Form" className="form-horizontal">
							<div className="form-group">
								<label className="col-md-12 control-label">
									{
										(this.state.savedToCloud)
											?
											<div>
												<h1>New Customer Registration Completed</h1>
												<h2>Data was successfully saved to cloud...</h2>
											</div>
											:
											<div>
												<h1>Thanks</h1>
												<h2>Data was successfully saved to cloud...</h2>
												<span className="btn btn-info text-white" onClick={() => { this.props.jumpToStep(4) }}>No Thanks!</span>
												<span className="btn btn-info text-white" onClick={() => { this.showMachineAdd() }}>Add Watter purifier</span>
												
                                                
											</div>

                                            
                                            

									}
									
									<Card>
                                          
                                        <CardBody className="">
                                            
                                            <Collapse isOpen={this.state.collapse}>
                                                <Card className="border">
                                                    <CardBody>
                                                        Anim pariatur cliche reprehenderit, enim eiusmod high life
                                                        accusamus terry richardson ad squid. Nihil anim keffiyeh
                                                        helvetica, craft beer labore wes anderson cred nesciunt
                                                        sapiente ea proident.
                                                    </CardBody>
                                                </Card>
                                            </Collapse>
                                        </CardBody>
                                    </Card>
                                      
                                          

                                   
								</label>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}
