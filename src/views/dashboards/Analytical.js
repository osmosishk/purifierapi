import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  
  Stats,
  Stats2,
  
  Visits,
  
} from "../../components/dashboard";

import img1 from "../../assets/images/users/1.jpg";
import img4 from "../../assets/images/users/4.jpg";
import img5 from "../../assets/images/users/5.jpg";

const Analytical = () => {
  return (
    <div>
      <Stats2 />
      <Row>
        <Col sm={12} lg={9}>
         
        </Col>
        <Col sm={12} lg={3}>
          <Visits />
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={6}>
          
        </Col>
        <Col sm={12} lg={6}>
         
        </Col>
      </Row>
      <Row>
        <Col md="4">
          
        </Col>
        <Col md="8">
          
            
        </Col>
      </Row>
      <Stats />
      <Row>
        <Col lg={6}>
         
        </Col>
        <Col lg={6}>
         
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
         
        </Col>
        <Col lg={6}>
         
        </Col>
      </Row>

    </div>
  );
};

export default Analytical;
