import React from "react";
import { Row, Col } from "reactstrap";
import {
  
  Stats,
  Stats2,
  
  Visits,
  
} from "../../components/dashboard";



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
