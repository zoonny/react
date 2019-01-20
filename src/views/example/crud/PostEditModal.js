import React, { Component } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

const PostEditModal = ({ visible, toggle, onConfirm, onCancel, className }) => (
  <Modal isOpen={visible} toggle={toggle} className={className}>
    <Card>
      <CardHeader>
        <strong>포스트</strong> 등록
      </CardHeader>
      <CardBody>
        <Form action="" method="post" className="form-horizontal">
          <FormGroup row>
            <Col md="3">
              <Label>제목</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="제목을 입력하세요."
              />
              <FormText color="muted">제목을 입력하세요.</FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="textarea-input">내용</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                type="textarea"
                name="body"
                id="body"
                rows="6"
                placeholder="내용을 입력하세요."
              />
              <FormText color="muted">내용을 입력하세요.</FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label>태그</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                type="text"
                id="tags"
                name="tags"
                placeholder="태그를 입력하세요."
              />
              <FormText color="muted">
                태그는 쉼표(,)로 구분하여 입력하세요.
              </FormText>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
      <CardFooter>
        <Button type="submit" size="sm" color="primary" onClick={onConfirm}>
          <i className="fa fa-dot-circle-o" /> 확인
        </Button>{' '}
        <Button type="reset" size="sm" color="danger" onClick={onCancel}>
          <i className="fa fa-ban" /> 취소
        </Button>
      </CardFooter>
    </Card>
  </Modal>
);

export default PostEditModal;
