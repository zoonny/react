import React from 'react';
import { Col, Button, Input, Form, FormGroup } from 'reactstrap';

const PostSearch = ({ search, onChange, onSearch, onWrite }) => (
  <Form action="" method="post" className="form-horizontal">
    <FormGroup row>
      <Col md="2">
        <i className="fa fa-align-justify" /> Posts{' '}
        <small className="text-muted">example</small>
      </Col>
      <Col md="6">
        <Input
          type="text"
          id="tag"
          name="tag"
          placeholder="태그"
          value={search.tag}
          onChange={onChange}
        />
      </Col>
      <Col md="2">
        <Button color="dark" outline size="sm" onClick={onSearch}>
          검색
        </Button>
      </Col>
      <Col md="2" className="float-right">
        <Button color="dark" outline size="sm" onClick={onWrite}>
          등록
        </Button>
      </Col>
    </FormGroup>
  </Form>
);

export default PostSearch;
