import React, { Component } from 'react';
import { Input } from 'reactstrap';

export default class Step3 extends Component {
	constructor(props) {
		super(props);

        this.state = {
			invitationcode: props.getStore().invitationcode,
			joindate: props.getStore().joindate,
            source: props.getStore().source,
            comment: props.getStore().comment,
			formValues: {}
		};
	}

    initStart() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
        var string_length = 8;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
		let formValues = this.state.formValues;

		formValues["invitationcode"]= randomstring
		this.setState({formValues})
	
        this.setState({invitationcode:randomstring})
		
        var curr = new Date();
        curr = curr.toISOString().substr(0,10)
		formValues["joindate"]= curr
		this.setState({formValues})
        this.setState({joindate:curr})

		this.props.updateStore({invitationcode:randomstring});
		this.props.updateStore({source:'Online'});

		this.props.updateStore({joindate:curr});
        
        
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

      componentWillMount()
      {
        this.initStart()
       
        

     
      } 

	render() {
		return (
			<div className="step step3 mt-5">
				<div className="row justify-content-md-center">
					<div className="col-lg-8">
						<form>
                        <div className="form-group row">
							<label htmlFor="pphone" className="col-sm-4 col-form-label">invitationcode</label>
							<div className="col-sm-10">
									<Input type="text" name="invitationcode" className="form-control" defaultValue={this.state.invitationcode} placeholder="invitationcode" onChange={this.handleChange.bind(this)} />
						    </div>
						</div> 

                        <div className="form-group row">
							<label htmlFor="pphone" className="col-sm-4 col-form-label">Join Date</label>
							<div className="col-sm-10">
									<Input type="date" name="joindate" className="form-control" defaultValue={this.state.joindate} placeholder="Join Date" onChange={this.handleChange.bind(this)} />
						    </div>
						</div> 
                        <div className="form-group row">
							<label htmlFor="pphone" className="col-sm-4 col-form-label">source</label>
							<div className="col-sm-10">
									<Input type="select" name="source" className="form-control" defaultValue={this.state.source} placeholder="Source" onChange={this.handleChange.bind(this)} >
									
									<option value='Online'>Online</option>
									<option value='Referral'>Referral</option>
									<option value='Old'>Old Customer</option>
									<option value='Phone'>Phone Call</option>
									</Input>
						    </div>
						</div> 
                        <div className="form-group row">
							<label htmlFor="pphone" className="col-sm-4 col-form-label">Comment</label>
							<div className="col-sm-10">
									<Input type="textarea" name="comment" className="form-control"defaultValue={this.state.comment}  placeholder="comment"  onChange={this.handleChange.bind(this)}/>
						    </div>
						</div> 
						
						
						</form>
					</div>
				</div>
			</div>
		)
	}
}
