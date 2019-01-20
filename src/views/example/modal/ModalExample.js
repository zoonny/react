import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import ConfirmModal from 'views/comn/modal/ConfirmModal';

class ModalExample extends Component {
  state = {
    visible: false,
  };

  handleOpenModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleConfirm = () => {
    console.log('confirm');
  };

  render() {
    const { visible } = this.state;
    const { handleOpenModal, handleConfirm, handleCancel } = this;

    return (
      <>
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button
                  block
                  color="primary"
                  onClick={handleOpenModal}
                  className="mr-1"
                >
                  Modal
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody />
        </Card>
        <ConfirmModal
          visible={visible}
          toggle={handleCancel}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          className={null}
        />
      </>
    );
  }
}

export default ModalExample;
