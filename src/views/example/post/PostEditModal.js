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
  FormGroup,
  FormText,
  FormFeedback,
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
import {
  Form,
  Input,
  Button as V_Button,
} from 'views/comn/validation/FormValidation';
import * as v from 'libs/Validations';

class PostEditModal extends Component {
  render() {
    const {
      visible,
      editMode,
      opts,
      post,
      toggle,
      onSubmit,
      onCancel,
      onChange,
      className,
    } = this.props;

    return (
      <Modal isOpen={visible} toggle={toggle} className={className}>
        <Card>
          <CardHeader>
            <strong>포스트</strong> {editMode === 'w' && ' 등록'}
            {editMode === 'r' && ' 조회'}
            {editMode === 'e' && ' 수정'}
          </CardHeader>
          <CardBody>
            <Form
              id={post.id}
              action=""
              method="post"
              className="form-horizontal"
              onSubmit={onSubmit}
            >
              <FormGroup row>
                <Col md="3">
                  <Label>제목</Label>
                </Col>
                <Col xs="12" md="9">
                  {/*value 입력 시 반드시 onChange 구현 필요*/}
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="제목을 입력하세요."
                    data-parse="uppercase"
                    value={post.title}
                    onChange={onChange}
                    {...opts}
                    validations={[v.required]}
                  />
                  {/* <FormText>제목을 입력하세요.</FormText> */}
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
                    value={post.body}
                    onChange={onChange}
                    {...opts}
                    validations={[v.required]}
                  />
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
                    value={post.tags}
                    onChange={onChange}
                    {...opts}
                    validations={[v.required]}
                  />
                </Col>
              </FormGroup>
              {editMode === 'w' && (
                <>
                  <V_Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o" /> 등록
                  </V_Button>
                </>
              )}{' '}
              {editMode === 'e' && (
                <>
                  <V_Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o" /> 수정
                  </V_Button>
                </>
              )}{' '}
              <Button type="reset" size="sm" color="danger" onClick={onCancel}>
                <i className="fa fa-ban" /> 닫기
              </Button>
            </Form>
          </CardBody>
          {/* <CardFooter /> */}
        </Card>
      </Modal>
    );
  }
}

export default PostEditModal;
