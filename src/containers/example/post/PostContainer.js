import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as postActions from 'store/example/post';
import { withRouter } from 'react-router-dom';
import PostSearch from 'views/example/post/PostSearch';
import PostList from 'views/example/post/PostList';
import Paging from 'views/comn/paging/Paging';
import PostEditModal from 'views/example/post/PostEditModal';
import { Map, List, fromJS } from 'immutable';

import InputParser from 'libs/InputParser';
import PagingUtils from 'libs/PagingUtils';

class PostContainer extends Component {
  // PostContainer
  componentDidMount() {
    this.getPostList();
  }

  getPostList = async () => {
    const { search, paging, PostActions } = this.props;

    try {
      await PostActions.getPostList({
        tag: search.tag,
        page: paging.page,
      });
    } catch (e) {
      console.error(e);
    }
  };

  handleSearch = e => {
    this.getPostList();
  };

  handleSearchInputChange = e => {
    const { PostActions } = this.props;
    const { name, value } = e.target;

    PostActions.changeSearchInput({
      name,
      value,
    });
  };

  // PostItem
  handleItemClick = async e => {
    const { PostActions } = this.props;

    await PostActions.getPost(e.target.id);

    PostActions.openPostEditModal({
      visible: true,
      mode: 'r',
    });
  };

  handleItemEdit = async e => {
    const { PostActions } = this.props;

    await PostActions.getPost(e.target.id);

    PostActions.openPostEditModal({
      visible: true,
      mode: 'e',
    });
  };

  handleItemDelete = e => {
    const { BaseActions } = this.props;

    BaseActions.showModal({
      modalName: 'confirm',
      title: '포스트 삭제',
      message: '선택한 포스트를 삭제하시겠습니까?',
      onConfirm: this.deleteItem,
      args: e.target.id,
    });
  };

  deleteItem = async e => {
    const { BaseActions, PostActions } = this.props;

    await PostActions.removePost(e.target.id);

    await BaseActions.hideModal({
      modalName: 'confirm',
    });

    this.getPostList();
  };

  // PostEdit
  handlePostEditOpen = async e => {
    const { PostActions } = this.props;

    await PostActions.initializePostEdit();

    PostActions.openPostEditModal({
      visible: true,
      mode: 'w',
    });
  };

  handlePostEditCancel = e => {
    const { PostActions } = this.props;

    PostActions.openPostEditModal({
      visible: false,
    });
  };

  handlePostEditInputChange = e => {
    const { PostActions } = this.props;
    const { name, value } = e.target;

    PostActions.changePostEditInput({
      name,
      value,
    });
  };

  handlePostEditSubmit = async e => {
    e.preventDefault();

    const { edit, PostActions } = this.props;

    const form = e.target;
    const data = new FormData(form);

    InputParser.parseInputData(form, data);

    const post = {
      title: data.get('title'),
      body: data.get('body'),
      tags: data.get('tags') ? data.get('tags').split(',') : [],
    };

    if (edit.mode === 'w') {
      await PostActions.writePost(post);
    } else if (edit.mode === 'e') {
      await PostActions.editPost({
        ...post,
        id: e.target.id,
      });
    }

    this.getPostList();
    this.handlePostEditCancel();
  };

  // Paging
  handleChangePage = async page => {
    const { PostActions } = this.props;

    await PostActions.changePage({
      page,
    });

    this.getPostList();
  };

  render() {
    const { posts, post, search, edit, paging, PostActions } = this.props;

    const {
      handleSearch,
      handleSearchInputChange,
      handleItemClick,
      handleItemEdit,
      handleItemDelete,
      handlePostEditOpen,
      handlePostEditCancel,
      handlePostEditSubmit,
      handlePostEditInputChange,
      handleChangePage,
    } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <PostSearch
                  search={search}
                  onChange={handleSearchInputChange}
                  onSearch={handleSearch}
                  onWrite={handlePostEditOpen}
                />
              </CardHeader>
              <CardBody>
                <PostList
                  posts={posts}
                  onItemClick={handleItemClick}
                  onItemEdit={handleItemEdit}
                  onItemDelete={handleItemDelete}
                />
                <Paging paging={paging} onChangePage={handleChangePage} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <PostEditModal
          edit={edit}
          post={post}
          toggle={handlePostEditCancel}
          onSubmit={handlePostEditSubmit}
          onCancel={handlePostEditCancel}
          onChange={handlePostEditInputChange}
          className={''}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    args: state.base.getIn(['modal', 'confirm', 'args']),
    posts: state.post.get('posts').toJS(),
    post: state.post.get('post').toJS(),
    search: state.post.get('search').toJS(),
    edit: state.post.get('edit').toJS(),
    paging: state.post.get('paging').toJS(),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch),
  }),
)(withRouter(PostContainer));
