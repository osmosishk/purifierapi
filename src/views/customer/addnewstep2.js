import React, { Component } from 'react';
import { Input } from 'reactstrap';
import Contact from './../../components/contacts/Contact';

export default class Step2 extends Component {
	constructor(props) {
		super(props);

        this.state = {
			contactname: props.getStore().contactname,
			companyname: props.getStore().companyname,
			billingaddress: props.getStore().billingaddress,
			installaddress: props.getStore().installaddress,
			contactno: props.getStore().contactno,
			mobile: props.getStore().mobile,
			formValues: {}
		};
	}

    handleChange(event) {
		event.preventDefault();
		let formValues = this.state.formValues;
		let name = event.target.name;
        let value = event.target.value;
		formValues[name] = value;
		this.setState({formValues})
	
		this.props.updateStore({
			...formValues,
			savedToCloud: false 
		});
    }

	
	
    
	render() {
		return (
			<div className="step step2 mt-5">
				<div className="row justify-content-md-center">
					<div className="col-lg-8">
						<form>
                            <div className="form-group row">
								<label htmlFor="pphone" className="col-sm-4 col-form-label">Contact Person Name</label>
								<div className="col-sm-10">
									<Input type="text" name ="contactname" className="form-control" defaultValue={this.state.contactname} placeholder="Contact Person Name" onChange={this.handleChange.bind(this)} />
								</div>
							</div>
                            <div className="form-group row">
								<label htmlFor="pphone" className="col-sm-4 col-form-label">Company Name</label>
								<div className="col-sm-10">
									<Input type="text" name ="companyname" className="form-control" defaultValue={this.state.companyname} placeholder="Company Name" onChange={this.handleChange.bind(this)}/>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="pphone" className="col-sm-4 col-form-label">Installation Address</label>
								<div className="col-sm-10">
									<Input type="textarea"  name ="installaddress" className="form-control"  defaultValue={this.state.installaddress} placeholder="Installation Address" onChange={this.handleChange.bind(this)}/>
								</div>
							</div>

                            <div className="form-group row">
								<label htmlFor="pphone" className="col-sm-4 col-form-label">Billing Address</label>
								<div className="col-sm-10">
									<Input type="textarea" name ="billingaddress" className="form-control"  defaultValue={this.state.billingaddress} placeholder="Billing Address" onChange={this.handleChange.bind(this)}/>
								</div>
							</div>

				
							<div className="form-group row">
								<label htmlFor="pphone" className="col-sm-4 col-form-label">Contact Phone</label>
								<div className="col-sm-10">
									<Input type="text" name ="contactno" className="form-control" defaultValue={this.state.contactno} placeholder="contact phone" onChange={this.handleChange.bind(this)} />
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="ophone" className="col-sm-4 col-form-label">mobile</label>
								<div className="col-sm-10">
									<Input type="text" name ="mobile" className="form-control" defaultValue={this.state.mobile} placeholder="mobile" onChange={this.handleChange.bind(this)}/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}
