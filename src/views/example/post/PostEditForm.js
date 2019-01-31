import React from 'react';
import { Col, FormGroup, Label } from 'reactstrap';
import { Input } from 'views/comn/validation/FormValidation';
import * as v from 'libs/Validations';

const PostEditForm = ({ edit, post, onChange }) => {
  return (
    <>
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
            validations={[v.required]}
            {...edit.opts}
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
            validations={[v.required]}
            {...edit.opts}
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
            validations={[v.required]}
            {...edit.opts}
          />
        </Col>
      </FormGroup>
    </>
  );
};

export default PostEditForm;
