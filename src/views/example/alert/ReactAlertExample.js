import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { withAlert, Alert } from 'react-alert';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ReactAlertExample extends Component {
  handleOpenAlert = () => {
    this.props.alert.show('Alert Message!!');
  };

  notify = () => toast('Wow so easy !');

  render() {
    const { handleOpenAlert, notify } = this;

    return (
      <>
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                {/* <Button
                  block
                  color="primary"
                  onClick={handleOpenAlert}
                  className="mr-1"
                >
                  Alert
                </Button> */}
                <Alert>
                  {alert => (
                    <Button
                      block
                      color="primary"
                      className="mr-1"
                      onClick={() => {
                        alert.show('Alert Message!!');
                      }}
                    >
                      Show Alert
                    </Button>
                  )}
                </Alert>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button onClick={notify}>react-toastify</Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody />
        </Card>
        <ToastContainer />
      </>
    );
  }
}

// export default withAlert(ReactAlertExample);
export default ReactAlertExample;
