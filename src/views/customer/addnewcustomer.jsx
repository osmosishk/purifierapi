import React, { Component } from 'react';
import StepZilla from 'react-stepzilla';
import {
	Card,
	CardBody,
	CardTitle
} from 'reactstrap';

import Step1 from './addnewstep1';
import Step2 from './addnewstep2';
import Step3 from './addnewstep3';
import Step4 from './addnewstep4';



class AddCustomer extends Component {
    constructor(props) {
		super(props);
		this.state = {};

		this.sampleStore = {
			email: '',
			customercode: '',
            contactname:'',
            companyname:'',
            billingaddress:'',
            installaddress:'',
            contactno:'',
            mobile:'',
            invitationcode:'',
            joindate:'',
            source:'',
            comment:'',
            isconfirm: false,
			savedToCloud: false
		};
		this.customerinfo = {customercode:{username:'',email:''}, contactname: '',billingaddress: '',installaddress: '',contactno: '',mobile: '',};
	}
	

   getStore() {
		return this.sampleStore;
	}

	updateStore(update) {
		this.sampleStore = {
			...this.sampleStore,
			...update,
		}

		
       
	}

	render() {
		const steps =
			[
				{ name: 'Welcome', component: <Step1 getStore={() => (this.getStore())} updateStore={(u) => { this.updateStore(u) }} /> },
				{ name: 'Customer Details', component: <Step2 getStore={() => (this.getStore())} updateStore={(u) => { this.updateStore(u) }} /> },
				{ name: 'Physical Details', component: <Step3 getStore={() => (this.getStore())} updateStore={(u) => { this.updateStore(u) }} /> },
				{ name: 'Done', component: <Step4 getStore={() => (this.getStore())} updateStore={(u) => { this.updateStore(u) }} /> }
			]

		return (
			<Card>
				<CardBody className="border-bottom">
					<CardTitle className="mb-0"><i className="mdi mdi-border-right mr-2"></i>New Customer Registration</CardTitle>
					
				</CardBody>
				<CardBody>
					<div className='example'>
						<div className='step-progress'>
							<StepZilla
								steps={steps}
								nextTextOnFinalActionStep={"Save"}
							/>
						</div>
					</div>
				</CardBody>
			</Card>

		)
	}
}
 
export default AddCustomer;