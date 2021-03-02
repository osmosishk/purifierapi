import React, { Component } from 'react';

export default class Step1 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: props.getStore().email,
			customercode: props.getStore().customercode
		};
		this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

		this.validationCheck = this.validationCheck.bind(this);
		this.isValidated = this.isValidated.bind(this);
	}
	isValidated() {
		const userInput = this._grabUserInput(); // grab user entered vals
		const validateNewInput = this._validateData(userInput); // run the new input against the validator
		let isDataValid = false;

		// if full validation passes then save to store and pass as valid
		if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
			if (this.props.getStore().email !== userInput.email || this.props.getStore().customercode !== userInput.customercode) { // only update store of something changed
				this.props.updateStore({
					...userInput,
					savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
				});  // Update store here (this is just an example, in reality you will do it via redux or flux)
			}

			isDataValid = true;
		}
		else {
			// if anything fails then update the UI validation state but NOT the UI Data State
			this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
		}

		return isDataValid;
	}

	validationCheck() {
		if (!this._validateOnDemand)
			return;

		const userInput = this._grabUserInput(); // grab user entered vals
		const validateNewInput = this._validateData(userInput); // run the new input against the validator

		this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
	}

	_validateData(data) {
		return {
			customercodeVal: (data.customercode !== ""), // required: anything besides N/A
			emailVal: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data.email), // required: regex w3c uses in html5
		}
	}

	_validationErrors(val) {
		const errMsgs = {
			customercodeValMsg: val.customercodeVal ? '' : 'A customercode selection is required',
			emailValMsg: val.emailVal ? '' : 'A valid email is required'
		}
		return errMsgs;
	}

	_grabUserInput() {
		return {
			customercode: this.customercode.value,
			email: this.email.value
		};
	}
	render() {
		// explicit class assigning based on validation
		let notValidClasses = {};

		if (typeof this.statecustomercodeVal === 'undefined' || this.state.customercodeVal) {
			notValidClasses.customercodeCls = 'form-control';
		}
		else {
			notValidClasses.customercodeCls = 'is-invalid form-control';
			notValidClasses.customercodeValGrpCls = 'text-danger';
		}

		if (typeof this.state.emailVal === 'undefined' || this.state.emailVal) {
			notValidClasses.emailCls = 'form-control';
		}
		else {
			notValidClasses.emailCls = 'is-invalid form-control';
			notValidClasses.emailValGrpCls = 'text-danger';
		}
		return (
			<div className="step step1 mt-5 ">
				<div className="row justify-content-md-center">
					<div className="col col-lg-6">
						<div className="">
							<h4>Welcome, Customer Code </h4>
							<form id="Form" className="form-horizontal mt-2">
								<div className="form-group content form-block-holder">
									<label className="control-label">
										Customer Code
									</label>
									<div>
                                    <input
											// ref="email"
											ref={(cc) => { this.customercode = cc; }}
											autoComplete="off"
											type="text"
											placeholder="PXX0001"
											className={notValidClasses.customercodeCls}
											required
											defaultValue={this.state.customercode}/>
										<div className={notValidClasses.customercodeValGrpCls}>{this.state.customercodeValMsg}</div>
									</div>
								</div>
								<div className="form-group content form-block-holder">
									<label className="control-label ">
										Email
									</label>
									<div >
										<input
											// ref="email"
											ref={(f) => { this.email = f; }}
											autoComplete="off"
											type="email"
											placeholder="john.smith@example.com"
											className={notValidClasses.emailCls}
											required
											defaultValue={this.state.email}/>
											
										<div className={notValidClasses.emailValGrpCls}>{this.state.emailValMsg}</div>
									</div>
								</div>
							</form>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
