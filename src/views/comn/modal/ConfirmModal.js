import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

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
        확인
      </Button>{' '}
      <Button id="cancel" color="secondary" onClick={onCancel}>
        취소
      </Button>
    </ModalFooter>
  </Modal>
);

export default ConfirmModal;
