import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Constants } from 'libs/Constants';

const ConfirmModal = ({
  visible,
  toggle,
  title,
  message,
  args,
  onConfirm,
  onCancel,
  className,
}) => (
  <Modal isOpen={visible} toggle={toggle} className={'modal-sm ' + className}>
    <ModalHeader toggle={toggle}>{title}</ModalHeader>
    <ModalBody>{message}</ModalBody>
    <ModalFooter>
      {/* <Button id="ok" color="primary" onClick={onConfirm}> */}
      <Button id={args} color="primary" onClick={onConfirm}>
        {Constants.BUTTON.CONFIRM}
      </Button>{' '}
      <Button id="cancel" color="secondary" onClick={onCancel}>
        {Constants.BUTTON.CANCEL}
      </Button>
    </ModalFooter>
  </Modal>
);

export default ConfirmModal;
