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
import { withAlert } from 'react-alert';

class PostContainer extends Component {
  // PostContainer
  componentDidMount() {
    this.initialize();
    this.getPostList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getPostList(null, nextProps.paging.page);
    }

    return true;
  }

  // PostList
  initialize = () => {
    const { PostActions } = this.props;

    PostActions.initialize();
  };

  getPostList = async (tag, page) => {
    const { search, paging, PostActions, alert } = this.props;

    try {
      await PostActions.getPostList({
        tag: tag ? tag : search.tag,
        page: page ? page : paging.page,
      });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
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
  handleItemWrite = e => {
    const { PostActions, onEditOpenForWrite } = this.props;

    PostActions.initializePost();

    onEditOpenForWrite();
  };

  handleItemClick = async e => {
    const { PostActions, onEditOpenForRead, alert } = this.props;

    try {
      await PostActions.getPost(e.target.id);
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }

    onEditOpenForRead();
  };

  handleItemEdit = async e => {
    const { PostActions, onEditOpenForEdit, alert } = this.props;

    try {
      await PostActions.getPost(e.target.id);
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }

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
    const { BaseActions, PostActions, alert } = this.props;

    try {
      await PostActions.removePost(e.target.id);
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    } finally {
      BaseActions.hideModal({
        modalName: Constants.MODAL.CONFIRM,
      });
    }

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

    const { edit, PostActions, onEditCancel, alert } = this.props;

    const form = e.target;
    const data = new FormData(form);

    InputParser.parseInputData(form, data);

    const post = {
      title: data.get('title'),
      body: data.get('body'),
      tags: data.get('tags') ? data.get('tags').split(',') : [],
    };

    try {
      switch (edit.mode) {
        case Constants.EDIT_MODE.WRITE:
          await PostActions.writePost(post);
          break;
        case Constants.EDIT_MODE.EDIT:
          await PostActions.editPost({
            ...post,
            id: e.target.id,
          });
          break;
        default:
          console.error('Unknown EditMode:', edit.mode);
          break;
      }
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
      return;
    } finally {
      onEditCancel();
    }

    this.getPostList();
  };

  render() {
    const {
      posts,
      post,
      search,
      edit,
      paging,
      onChangePage,
      onEditCancel,
    } = this.props;

    const {
      handleSearch,
      handleSearchInputChange,
      handleItemWrite,
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
                  onWrite={handleItemWrite}
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
    error: state.post.get('error'),
    pending: state.post.get('pending'),
    posts: state.post.get('posts').toJS(),
    post: state.post.get('post').toJS(),
    search: state.post.get('search').toJS(),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch),
  }),
)(withRouter(withAlert(withEditModal(withPaging(PostContainer)))));
