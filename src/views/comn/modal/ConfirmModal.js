import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ConfirmModal = ({ visible, toggle, onConfirm, onCancel, className }) => (
  <Modal isOpen={visible} toggle={toggle} className={className}>
    <ModalHeader toggle={toggle}>타이틀</ModalHeader>
    <ModalBody>메시지</ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={onConfirm}>
        확인
      </Button>{' '}
      <Button color="secondary" onClick={onCancel}>
        취소
      </Button>
    </ModalFooter>
  </Modal>
);

export default ConfirmModal;
