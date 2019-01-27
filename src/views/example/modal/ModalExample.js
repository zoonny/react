import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import ConfirmModal from 'views/comn/modal/ConfirmModal';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { form, control, button } from 'react-validation';
import './ModalExample.scss';

const required = value => {
  if (!value.toString().trim().length) {
    return <div className="validate">require</div>;
  }
};

const ButtonWrapper = ({ hasErrors, ...props }) => {
  return <Button {...props} disabled={hasErrors} />;
};

const ValidationButton = button(ButtonWrapper);

class ModalExample extends Component {
  state = {
    visible: false,
    title: '타이틀',
    message: '메시지',
    args: 'id',
  };

  handleOpenModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleConfirm = e => {
    console.log('confirm', e.target);
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log('handleSubmit');

    this.form.validateAll();
  };

  componentDidMount() {}

  render() {
    const { visible, title, message, args } = this.state;
    const { handleOpenModal, handleConfirm, handleCancel, handleSubmit } = this;

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
          <CardBody>
            <Form
              ref={c => {
                this.form = c;
              }}
              onSubmit={handleSubmit}
            >
              <h3>Login</h3>
              <div>
                <label>
                  Email*
                  <Input
                    // value="email@email.com"
                    type="text"
                    name="email"
                    // validations={[required, email]}
                    validations={[required]}
                  />
                </label>
              </div>
              <div>
                <label>
                  Password*
                  <Input
                    type="password"
                    name="password"
                    validations={[required]}
                  />
                </label>
              </div>
              <div>
                <ValidationButton>Submit</ValidationButton>
              </div>
            </Form>
          </CardBody>
        </Card>
        <ConfirmModal
          visible={visible}
          title={title}
          message={message}
          args={args}
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
