import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as postActions from 'store/example/post';
import { Constants } from 'libs/Constants';

import PostSearch from 'views/example/post/PostSearch';
import PostList from 'views/example/post/PostList';
import Paging from 'views/comn/paging/Paging';
import EditModal from 'views/comn/modal/EditModal';
import PostEditForm from 'views/example/post/PostEditForm';

import InputParser from 'libs/InputParser';

import withPaging from 'containers/comn/hoc/withPaging';
import withEditModal from 'containers/comn/hoc/withEditModal';
import { withRouter } from 'react-router-dom';

class PostContainer extends Component {
  // PostContainer
  componentDidMount() {
    this.getPostList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getPostList(null, nextProps.paging.page);
    }
    return true;
  }

  // PostList
  getPostList = async (tag, page) => {
    const { search, paging, PostActions } = this.props;

    try {
      await PostActions.getPostList({
        tag: tag ? tag : search.tag,
        page: page ? page : paging.page,
      });
    } catch (e) {
      console.error(e);
    }
  };

  // PostSearch
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
    const { PostActions, onEditOpenForRead } = this.props;

    await PostActions.getPost(e.target.id);

    onEditOpenForRead();
  };

  handleItemEdit = async e => {
    const { PostActions, onEditOpenForEdit } = this.props;

    await PostActions.getPost(e.target.id);

    onEditOpenForEdit();
  };

  handleItemDelete = e => {
    const { BaseActions } = this.props;

    BaseActions.showModal({
      modalName: Constants.MODAL.CONFIRM,
      title: '포스트 삭제',
      message: '선택한 포스트를 삭제하시겠습니까?',
      onConfirm: this.deleteItem,
      args: e.target.id,
    });
  };

  deleteItem = async e => {
    const { BaseActions, PostActions, hideConfirm } = this.props;

    await PostActions.removePost(e.target.id);

    BaseActions.hideModal({
      modalName: Constants.MODAL.CONFIRM,
    });

    this.getPostList();
  };

  // PostEdit
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

    const { edit, PostActions, onEditCancel } = this.props;

    const form = e.target;
    const data = new FormData(form);

    InputParser.parseInputData(form, data);

    const post = {
      title: data.get('title'),
      body: data.get('body'),
      tags: data.get('tags') ? data.get('tags').split(',') : [],
    };

    if (edit.mode === Constants.EDIT_MODE.WRITE) {
      await PostActions.writePost(post);
    } else if (edit.mode === Constants.EDIT_MODE.EDIT) {
      await PostActions.editPost({
        ...post,
        id: e.target.id,
      });
    } else {
      console.error('Unknown EditMode:', edit.mode);
    }

    this.getPostList();

    onEditCancel();
  };

  render() {
    const {
      posts,
      post,
      search,
      edit,
      paging,
      onChangePage,
      onEditOpenForWrite,
      onEditCancel,
    } = this.props;

    const {
      handleSearch,
      handleSearchInputChange,
      handleItemClick,
      handleItemEdit,
      handleItemDelete,
      handlePostEditSubmit,
      handlePostEditInputChange,
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
                  onWrite={onEditOpenForWrite}
                />
              </CardHeader>
              <CardBody>
                <PostList
                  posts={posts}
                  onItemClick={handleItemClick}
                  onItemEdit={handleItemEdit}
                  onItemDelete={handleItemDelete}
                />
                <Paging paging={paging} onChangePage={onChangePage} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <EditModal
          title={'포스트'}
          editForm={
            <PostEditForm
              edit={edit}
              post={post}
              onChange={handlePostEditInputChange}
            />
          }
          formId={post.id}
          edit={edit}
          toggle={onEditCancel}
          onSubmit={handlePostEditSubmit}
          onCancel={onEditCancel}
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
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch),
  }),
)(withRouter(withEditModal(withPaging(PostContainer))));
