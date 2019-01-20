import React, { Component } from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button,
} from 'reactstrap';
import PostList from 'views/example/crud/PostList';
import Paging from 'views/example/crud/Paging';
import PostEditModal from 'views/example/crud/PostEditModal';

import * as api from 'apis/example/api';

class ListContainer extends Component {
  state = {
    posts: null,
    visible: false,
  };

  getPostList = async () => {
    let res = null;
    try {
      res = await api.getPostList({});
    } catch (e) {
      console.error(e);
    }

    if (res && res.data) {
      this.setState({
        posts: res.data,
      });
    }
  };

  componentDidMount() {
    this.getPostList();
  }

  handleOpenModal = () => {
    this.setState({ visible: true });
    console.log('handleOpenModal');
  };

  handleCancel = () => {
    this.setState({ visible: false });
    console.log('handleCancel');
  };

  handleConfirm = () => {
    console.log('handleConfirm');
  };

  handleItemClick = e => {
    console.log(e.target);
    console.log(e.target.id);
    // view
    console.log('handleItemClick');
  };

  handleItemEdit = e => {
    console.log(e.target);
    console.log(e.target.id);
    // edit
    console.log('handleItemEdit');
  };

  handleItemDelete = e => {
    console.log(e.target);
    console.log(e.target.id);
    // delete
    console.log('handleItemDelete');
  };

  render() {
    const { posts, visible } = this.state;
    const {
      handleOpenModal,
      handleCancel,
      handleConfirm,
      handleItemClick,
      handleItemEdit,
      handleItemDelete,
    } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Posts{' '}
                <small className="text-muted">example</small>{' '}
                <Button
                  color="dark"
                  outline
                  size="sm"
                  onClick={handleOpenModal}
                >
                  등록
                </Button>
              </CardHeader>
              <CardBody>
                {/* <Paging page={page} lastPage={lastPage} tag={tag} /> */}
                <PostList
                  posts={posts}
                  onItemClick={handleItemClick}
                  onItemEdit={handleItemEdit}
                  onItemDelete={handleItemDelete}
                />
                <Paging />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <PostEditModal
          visible={visible}
          toggle={handleCancel}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          className={null}
        />
      </div>
    );
  }
}

export default ListContainer;
