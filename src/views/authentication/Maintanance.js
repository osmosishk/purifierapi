import React from 'react';
import {
    Button
} from 'reactstrap';

import img1 from '../../assets/images/logo-icon.png';

const Maintanance = () => {
    return <div className="">
        <div className="error-box">
            <div className="error-body text-center">
                <img src={img1} alt="" />
                <h4 className="text-dark font-24">Osmosis Admin System</h4>
                <div className="mt-4">
                    <h3>Your page in under maintenance</h3>
                    <h5 className="mb-0 text-muted font-medium">Something wrong going on this page.</h5>
                    <h5 className="text-muted font-medium">Please Check back again.</h5>
                </div>
                <div className="mt-4 mb-4"><i className="ti-settings font-24"></i></div>
                
            </div>
        </div>
    </div>;
}

export default Maintanance;
